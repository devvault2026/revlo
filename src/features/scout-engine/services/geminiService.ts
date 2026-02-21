import { GoogleGenAI } from "@google/genai";
import { Lead, LeadStage } from "../types";
import { safeJsonParse } from "../../../utils/safeJson";

const generateId = () => Math.random().toString(36).substr(2, 9);

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper for concurrent streams
async function* mergeStreams<T>(streams: AsyncGenerator<T>[]): AsyncGenerator<T> {
  const queue: Promise<{ value: IteratorResult<T>, index: number }>[] = streams.map((s, i) =>
    s.next().then(result => ({ value: result, index: i }))
  );

  const activeStreams = new Set(streams.map((_, i) => i));

  while (activeStreams.size > 0) {
    const { value, index } = await Promise.race(queue.filter((_, i) => activeStreams.has(i)));

    if (value.done) {
      activeStreams.delete(index);
    } else {
      yield value.value;
      // Replenish the promise for this stream
      queue[index] = streams[index].next().then(result => ({ value: result, index }));
    }
  }
}

const sanitizeUrl = (url: string | null): string | null => {
  if (!url || url.toLowerCase() === 'null' || url === '#') return null;
  if (!url.startsWith('http')) return `https://${url}`;
  return url;
};

// Generates smart search vectors to maximize coverage
async function generateSearchVectors(apiKey: string, query: string): Promise<string[]> {
  const ai = new GoogleGenAI({ apiKey });

  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{
        role: "user",
        parts: [{
          text: `
            Generate 3 distinct, high-yield Google Search queries to find leads for: "${query}".
            Strategy:
            1. The original query.
            2. A "Near Me" or specific neighborhood variation.
            3. A specific high-value sub-niche variation (e.g. instead of "Contractors", try "Commercial General Contractors").
            
            Return ONLY the 3 queries separated by "|||". No numbering.
            `
        }]
      }]
    });

    const text = result.text;
    if (!text) return [query, `${query} businesses`, `Best ${query}`];

    return text.split("|||").map((s: string) => s.trim()).filter((s: string) => s.length > 5);
  } catch (e) {
    return [query, `${query} businesses`, `Best ${query}`];
  }
}

async function* tryStreamLeads(query: string, limit: number, retryCount = 0): AsyncGenerator<Lead, void, unknown> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const ai = new GoogleGenAI({ apiKey });

  const systemInstruction = `You are the REVLO APEX SCOUT (GEMINI 3 PRO ARCHITECTURE). 
Your mission: EXTRACT HIGH-VALUE LEADS for: "${query}".

OPERATIONAL PROTOCOLS:
1. QUANTITY & QUALITY: Find at least ${limit} leads.
2. MANDATORY DATA: Business Name, Phone, Location.
3. "DIGITAL UNDERDOGS": Prioritize companies with valid phones but weak/missing websites.
4. FORMAT: Return JSON objects ONE BY ONE separated by "|||".

JSON STRUCTURE:
{
  "businessName": "string",
  "industry": "string",
  "location": "string",
  "website": "url or null",
  "phoneNumber": "string",
  "email": "string or null", 
  "estimatedOwnerName": "string or null",
  "gmbRating": number,
  "gmbReviewCount": number,
  "digitalMaturity": "Critical" | "Weak" | "Average" | "Strong",
  "leadScore": number,
  "onlinePresenceAnalysis": "Brief string analzying their web status",
  "serviceFit": "Marketing" | "AI Automation" | "Web Design" | "Full Stack",
  "suggestedWorkflow": "Detailed step-by-step internal plan on how we will do the work (e.g. '1. Rebuild site on Next.js. 2. Implement AI Auto-Responder.').",
  "competitorAdvantages": ["string"],
  "revenueLossEstimate": "string ($ amount)"
}`;

  try {
    let modelName = "gemini-2.0-flash";

    if (retryCount > 1) {
      console.warn(`[Thread: ${query}] Retrying with Flash (Attempt ${retryCount + 1})...`);
    }

    const stream = await ai.models.generateContentStream({
      model: modelName,
      contents: [
        {
          role: "user",
          parts: [{
            text: `EXECUTE "OPERATION DEEP SWEEP" FOR: ${query}.
            
            GOALS: 
            1. Find ${limit} LEADS.
            2. For each lead, analyze their digital footprint.
            3. If they have no website -> Suggest "Web Design".
            4. If they have a website but no chat -> Suggest "AI Automation".
            5. If they have good tech but low reviews -> Suggest "Marketing".
            6. GENERATE A "SUGGESTED WORKFLOW" FOR EACH. TELL US HOW TO FIX THEIR BUSINESS.
            7. RETURN DATA IMMEDIATELY AS YOU FIND IT.`
          }]
        }
      ],
      config: {
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        },
        tools: [{ googleSearch: {} }],
        temperature: 0.2, // Slightly higher for creativity in workflow generation
      }
    });

    let buffer = "";
    for await (const chunk of stream) {
      if (chunk.text) {
        buffer += chunk.text;
        let delimiterIndex;
        while ((delimiterIndex = buffer.indexOf("|||")) !== -1) {
          const jsonStr = buffer.slice(0, delimiterIndex).trim();
          buffer = buffer.slice(delimiterIndex + 3);
          const lead = await processJsonLead(jsonStr);
          if (lead && lead.businessName) yield lead;
        }
      }
    }

    if (buffer.trim().startsWith('{')) {
      const lead = await processJsonLead(buffer.trim());
      if (lead && lead.businessName) yield lead;
    }
  } catch (error: any) {
    if (retryCount < 4) {
      // Jitter backoff to avoid thundering herd on concurrent threads
      const waitTime = (5000 * (retryCount + 1)) + (Math.random() * 2000);
      console.log(`Gemini Thread Error (${query}). Retrying in ${waitTime}ms...`);
      // Simple delay before retry
      await new Promise(r => setTimeout(r, waitTime));
      yield* tryStreamLeads(query, limit, retryCount + 1);
    } else {
      console.error(`Gemini Thread (${query}) Failed.`);
    }
  }
}

async function processJsonLead(jsonStr: string): Promise<Lead | null> {
  try {
    const cleanJson = jsonStr.replace(/```json/g, '').replace(/```/g, '').trim();
    const startIdx = cleanJson.indexOf('{');
    const endIdx = cleanJson.lastIndexOf('}');
    if (startIdx === -1 || endIdx === -1) return null;

    const leadData = safeJsonParse<any>(cleanJson.substring(startIdx, endIdx + 1), null);
    if (!leadData) return null;
    return {
      ...leadData,
      id: generateId(),
      website: sanitizeUrl(leadData.website),
      websitePreviewUrl: sanitizeUrl(leadData.website),
      phoneNumber: leadData.phoneNumber?.toLowerCase() === 'null' ? null : leadData.phoneNumber,
      email: leadData.email?.toLowerCase() === 'null' ? null : leadData.email,
      socials: {
        facebook: sanitizeUrl(leadData.socials?.facebook),
        instagram: sanitizeUrl(leadData.socials?.instagram),
        linkedin: sanitizeUrl(leadData.socials?.linkedin),
        tiktok: sanitizeUrl(leadData.socials?.tiktok),
        x: sanitizeUrl(leadData.socials?.x),
      },
      gmbRating: Number(leadData.gmbRating) || 0,
      gmbReviewCount: Number(leadData.gmbReviewCount) || 0,
      painPoints: Array.isArray(leadData.painPoints) ? leadData.painPoints : [],
      suggestedWorkflow: leadData.suggestedWorkflow || "Conduct Audit -> Proposal -> Execute.",
      serviceFit: leadData.serviceFit || "Full Stack",
      competitiveInsights: {
        competitorAdvantages: Array.isArray(leadData.competitiveInsights?.competitorAdvantages) ? leadData.competitiveInsights.competitorAdvantages : [],
        missedOpportunities: Array.isArray(leadData.competitiveInsights?.missedOpportunities) ? leadData.competitiveInsights.missedOpportunities : [],
      },
      currentStage: LeadStage.SCOUTED
    };
  } catch (e) {
    return null;
  }
}

export async function* streamLeads(query: string, limit: number = 20): AsyncGenerator<Lead, void, unknown> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error("API Key missing.");

  // THREADING ARCHITECTURE:
  // 1. Generate 3 Search Vectors (Variations of the query)
  // 2. Launch 3 Concurrent "Scout Threads"
  // 3. Merge results into a single stream for the UI

  const vectors = await generateSearchVectors(apiKey, query);

  // Create a generator for each vector
  // Distribute the 'limit' across threads to ensure we get roughly the total requested
  // but slightly request more to handle dupes/failures.
  const leadsPerThread = Math.ceil(limit / vectors.length) + 5;

  const threadStreams = vectors.map(vector => tryStreamLeads(vector, leadsPerThread));

  // Yield from merged stream
  yield* mergeStreams(threadStreams);
}

export async function enrichLeadData(lead: Lead): Promise<Partial<Lead>> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) return {};
  const ai = new GoogleGenAI({ apiKey });

  try {
    const prompt = `FORENSIC IDENTITY EXTRACTION for: "${lead.businessName}" in "${lead.location}".
    
    MISSION: Verify and Recover missing Contact Points.
    
    CURRENT INTEL:
    - Phone: ${lead.phoneNumber || 'MISSING'}
    - Email: ${lead.email || 'MISSING'}
    - Owner: ${lead.estimatedOwnerName || 'MISSING'}
    - Website: ${lead.website || 'MISSING'}
    
    DIRECTIVES:
    1. Search widely for the OWNER's NAME.
    2. Find a DIRECT EMAIL address (look for 'mailto', business directories, FB About).
    3. Verify the PHONE NUMBER.
    4. Find exact SOCIAL MEDIA URLs (Facebook, Instagram, LinkedIn).
    
    Output JSON ONLY:
    {
      "email": "...",
      "phoneNumber": "...",
      "estimatedOwnerName": "...",
      "socials": { "facebook": "...", "instagram": "...", "linkedin": "..." }
    }`;

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.1
      }
    });

    const responseText = result.text || '{}';
    const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const startIdx = cleanJson.indexOf('{');
    const endIdx = cleanJson.lastIndexOf('}');

    interface EnrichedData {
      email?: string;
      phoneNumber?: string;
      estimatedOwnerName?: string;
      socials?: {
        facebook?: string;
        instagram?: string;
        linkedin?: string;
        tiktok?: string;
        x?: string;
      };
    }

    const jsonCandidate = cleanJson.substring(startIdx, endIdx + 1);
    const enriched = safeJsonParse<EnrichedData>(jsonCandidate, {});

    return {
      email: enriched.email?.includes('@') ? enriched.email : lead.email,
      phoneNumber: enriched.phoneNumber && enriched.phoneNumber.length > 5 ? enriched.phoneNumber : lead.phoneNumber,
      estimatedOwnerName: enriched.estimatedOwnerName && enriched.estimatedOwnerName.length > 2 ? enriched.estimatedOwnerName : lead.estimatedOwnerName,
      socials: {
        ...lead.socials,
        ...enriched.socials
      },
      isEnriched: true,
      enrichmentStatus: 'complete'
    };
  } catch (e) {
    console.error("Enrichment Failed:", e);
    return { enrichmentStatus: 'failed' };
  }
}

export async function deepScanLead(lead: Lead): Promise<Partial<Lead>> {
  return enrichLeadData(lead);
}
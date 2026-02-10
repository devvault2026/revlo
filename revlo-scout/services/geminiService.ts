import { GoogleGenAI } from "@google/genai";
import { Lead } from "../types";

// Helper to generate IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Helper to validate contact info
const hasValidContact = (lead: Lead): boolean => {
  // Check phone: must exist, not be "not found", and have at least some digits
  const hasPhone = lead.phoneNumber && 
                   lead.phoneNumber.toLowerCase() !== "not found" && 
                   lead.phoneNumber.replace(/\D/g, '').length > 5;
  
  // Check email: must exist, not be "not found", and look like an email
  const hasEmail = lead.email && 
                   lead.email.toLowerCase() !== "not found" && 
                   lead.email.includes("@");

  return !!(hasPhone || hasEmail);
};

export async function* streamLeads(query: string, limit: number = 10): AsyncGenerator<Lead, void, unknown> {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please check your environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  // Ask for more candidates than needed because we will filter out the bad ones
  const internalLimit = Math.ceil(limit * 1.5); 

  const systemInstruction = `
    You are an elite Lead Generation Specialist.
    
    MISSION: Find exactly ${limit} leads for "${query}".
    
    CRITICAL REQUIREMENT: 
    Every lead MUST have at least one DIRECT contact method: 
    1. A valid PHONE NUMBER
    OR 
    2. A valid EMAIL ADDRESS.
    
    If a business has NO phone and NO email, DO NOT RETURN IT. Skip it and find another one.
    
    Scoring Logic (Lead Score 0-100):
    - 90-100: Has Contact Info + (No Website OR Bad Reviews).
    - < 50: Good online presence or Missing Contact Info.

    STRICT OUTPUT RULES:
    - Stream results one by one.
    - Format: Single valid JSON object followed by "|||".
    - Use Google Search aggressively to find emails and phone numbers.
    
    JSON FIELDS:
    {
      "businessName": "Name",
      "industry": "Niche",
      "location": "City, State",
      "website": "URL or null",
      "phoneNumber": "Phone or null",
      "email": "Email or null",
      "socialProfiles": ["url1"],
      "estimatedOwnerName": "Name or 'Owner'",
      "gmbStatus": "Weak" | "Average" | "Strong" | "Non-Existent",
      "leadScore": 95,
      "onlinePresenceAnalysis": "Analysis string...",
      "painPoints": ["Point 1"],
      "suggestedPitch": "Pitch string..."
    }
  `;

  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    try {
      const responseStream = await ai.models.generateContentStream({
        model: "gemini-3-flash-preview",
        contents: `Find ${internalLimit} high-quality leads for "${query}". Ensure every single one has a phone number or email. Use Google Search to dig deep.`,
        config: {
          systemInstruction: systemInstruction,
          tools: [{ googleSearch: {} }],
          responseMimeType: "text/plain", 
        }
      });

      let buffer = "";

      for await (const chunk of responseStream) {
        const text = chunk.text; 
        if (!text) continue;
        
        buffer += text;
        
        let delimiterIndex;
        while ((delimiterIndex = buffer.indexOf("|||")) !== -1) {
          const jsonStr = buffer.slice(0, delimiterIndex).trim();
          buffer = buffer.slice(delimiterIndex + 3);

          if (jsonStr) {
            try {
              const cleanJson = jsonStr.replace(/```json/g, '').replace(/```/g, '').trim();
              const rawLead = JSON.parse(cleanJson);
              
              const lead: Lead = {
                id: generateId(),
                businessName: rawLead.businessName || "Unknown Business",
                industry: rawLead.industry || "General",
                location: rawLead.location || "Unknown Location",
                website: rawLead.website || null,
                phoneNumber: (!rawLead.phoneNumber || rawLead.phoneNumber === "Not Found") ? null : rawLead.phoneNumber,
                email: (!rawLead.email || rawLead.email === "Not Found") ? null : rawLead.email,
                socialProfiles: rawLead.socialProfiles || [],
                estimatedOwnerName: rawLead.estimatedOwnerName || "Owner",
                gmbStatus: rawLead.gmbStatus || "Weak",
                leadScore: rawLead.leadScore || 50,
                onlinePresenceAnalysis: rawLead.onlinePresenceAnalysis || "Analysis pending...",
                painPoints: rawLead.painPoints || ["Weak Online Presence"],
                suggestedPitch: rawLead.suggestedPitch || "Hey, I noticed your online presence needs work."
              };

              // CLIENT-SIDE FILTER: Strict enforcement
              // We rely on the generator loop to keep going until we get enough leads
              if (hasValidContact(lead)) {
                yield lead;
              } else {
                console.log("Skipping lead due to missing contact info:", lead.businessName);
              }
              
            } catch (e) {
              console.warn("Failed to parse lead chunk:", jsonStr, e);
            }
          }
        }
      }
      
      // If we completed the stream successfully (even if we didn't get enough leads, the model finished),
      // we return. The UI will just show what we got.
      return; 

    } catch (error) {
      attempts++;
      console.error(`Gemini Stream Error (Attempt ${attempts}/${maxAttempts}):`, error);
      
      // If it's the last attempt, throw it to be handled by the UI
      if (attempts === maxAttempts) {
        throw error;
      }
      
      // Wait before retrying (exponential backoff)
      // 1s, 2s, 3s...
      await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
    }
  }
}

// Deep Scan function for a single lead
export async function deepScanLead(lead: Lead): Promise<Partial<Lead>> {
  if (!process.env.API_KEY) throw new Error("No API Key");
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Perform a DEEP OSINT search for contact details for the business: "${lead.businessName}" in "${lead.location}".
    Current Phone: ${lead.phoneNumber}
    Current Website: ${lead.website}

    GOAL: Find the Owner's Name, a direct Phone Number, Email Address, and Social Media Links (Facebook, Instagram, LinkedIn).
    
    Return a JSON object with only the fields you found or updated:
    {
      "email": "found_email@gmail.com",
      "phoneNumber": "555-0192",
      "estimatedOwnerName": "Jane Doe",
      "socialProfiles": ["url1", "url2"]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) return {};
    return JSON.parse(text);
  } catch (e) {
    console.error("Deep scan failed", e);
    return {};
  }
}
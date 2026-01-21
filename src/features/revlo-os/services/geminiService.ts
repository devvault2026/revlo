
import { GoogleGenAI, Type } from "@google/genai";
import { Lead, Competitor, AgentProfile } from "../types";

const getAiClient = (apiKey: string) => {
    return new GoogleGenAI({ apiKey });
};

// --- USAGE TRACKING ---
import { SystemUsage } from "../types";

let globalUsage: SystemUsage = {
    totalApiCalls: 0,
    totalTokens: 0,
    promptTokens: 0,
    completionTokens: 0,
    callsByModel: {}
};

type UsageListener = (usage: SystemUsage) => void;
const listeners: UsageListener[] = [];

export const onUsageUpdate = (listener: UsageListener) => {
    listeners.push(listener);
    listener(globalUsage);
    return () => {
        const index = listeners.indexOf(listener);
        if (index > -1) listeners.splice(index, 1);
    };
};

const trackUsage = (model: string, usage?: any) => {
    globalUsage.totalApiCalls++;
    globalUsage.callsByModel[model] = (globalUsage.callsByModel[model] || 0) + 1;

    if (usage) {
        const prompt = usage.promptTokenCount || 0;
        const completion = usage.candidatesTokenCount || 0;
        const total = usage.totalTokenCount || prompt + completion;

        globalUsage.promptTokens += prompt;
        globalUsage.completionTokens += completion;
        globalUsage.totalTokens += total;
    }

    listeners.forEach(l => l({ ...globalUsage }));
};

// --- AGENT COMPILER ---

export const compileAgentInstruction = (agent: AgentProfile): string => {
    if (!agent.mandate) return `You are ${agent.name}, a ${agent.role}.`; // Fallback for old agents

    return `
    IDENTITY PROTOCOL:
    Designation: ${agent.name}
    Role Class: ${agent.role.toUpperCase()}
    Authority Level: ${agent.mandate.authority.toUpperCase()}
    Neural Persistence: ${agent.memoryType.toUpperCase()}

    CAPABILITY MATRIX (Enabled Tools & Skills):
    ${agent.capabilities.length > 0 ? agent.capabilities.map(c => `- ${c}`).join('\n') : '- Standard LLM Intelligence ONLY'}

    ORCHESTRATION CHAIN (Downstream Operatives):
    ${agent.chaining.length > 0 ? agent.chaining.map(l => `- Trigger: "${l.trigger}" -> Deploy: ${l.nextAgentId}`).join('\n') : '- End-of-Line Operative (No further chaining)'}

    PRIMARY MANDATE:
    "${agent.mandate.objective}"

    STRICT NON-GOALS (Do NOT do these):
    ${agent.mandate.nonGoals.map(g => `- ${g}`).join('\n')}

    RESPONSIBILITY MATRIX:
    ${agent.responsibilities.filter(r => r.enabled).map(r => `[${r.priority.toUpperCase()}] ${r.description} (Failure Severity: ${r.severity.toUpperCase()})`).join('\n')}

    OUTPUT CONTRACT:
    - Allowed Formats: ${agent.outputContract.allowedFormats.join(', ')}
    - Required Sections: ${agent.outputContract.requiredSections.join(', ')}
    - Forbidden Patterns: ${agent.outputContract.forbiddenPatterns.join(', ')}

    BEHAVIORAL PARAMETERS:
    - Creativity: ${agent.behavior.creativity}/100
    - Verbosity: ${agent.behavior.verbosity.toUpperCase()}
    - Tone Signature: "${agent.behavior.tone}"
  `;
};

// --- SCOUTING & ENRICHMENT ---

export const scoutLeads = async (apiKey: string, niche: string, location: string, limit: number = 5, scanMode: 'niche' | 'zone' = 'niche'): Promise<Partial<Lead>[]> => {
    const ai = getAiClient(apiKey);
    let prompt = '';

    if (scanMode === 'zone') {
        prompt = `List ${limit} distinct local businesses located in the Zip Code/Area: "${location}".
      Goal: Create a diverse directory of local businesses across different categories (e.g., Retail, Professional Services, Dining, Auto Repair, Medical).
      Instructions:
      1. Identify valid local businesses.
      2. Use Google Search to find public business emails.
      Return ONLY a JSON array (no markdown) where each item has: name, type (industry), address, rating, userRatingCount, website (or null), phone, email.`;
    } else {
        prompt = `Find ${limit} local ${niche} businesses in ${location}. 
      Instructions:
      1. Identify businesses.
      2. Use Google Search to find public contact emails.
      3. Prioritize businesses with poor digital presence.
      Return ONLY a JSON array (no markdown) where each item has: name, type (industry), address, rating, userRatingCount, website (or null), phone, email.`;
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: prompt,
            config: { tools: [{ googleMaps: {} }, { googleSearch: {} }] }
        });

        trackUsage("gemini-2.5-pro", response.usageMetadata);

        let text = response.text || "[]";
        if (text.trim().toLowerCase().startsWith("i cannot") || text.trim().toLowerCase().startsWith("i'm unable")) return [];
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const data = JSON.parse(text);
        if (!Array.isArray(data)) return [];

        return data.map((item: any) => ({
            ...item,
            id: crypto.randomUUID(),
            status: 'SCOUTED',
            createdAt: new Date().toISOString()
        }));
    } catch (e) {
        console.error("Scout error:", e);
        return [];
    }
};

export const enrichLead = async (apiKey: string, query: string): Promise<Partial<Lead> | null> => {
    const ai = getAiClient(apiKey);
    const prompt = `Research business: "${query}". Find official name, industry type, address, website, email, phone, rating. Return raw JSON.`;
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: prompt,
            config: { tools: [{ googleMaps: {} }, { googleSearch: {} }] }
        });
        trackUsage("gemini-2.5-pro", response.usageMetadata);
        let text = response.text || "null";
        if (text.trim().toLowerCase().startsWith("i cannot")) return null;
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        if (text === "null" || text === "{}") return null;
        const data = JSON.parse(text);
        if (!data.name) data.name = query;
        return { ...data, id: crypto.randomUUID(), status: 'SCOUTED', createdAt: new Date().toISOString() };
    } catch (e) { return null; }
};

// --- ANALYSIS & SCORING ---

export const scoreLead = async (apiKey: string, lead: Lead): Promise<{ score: number, psychology: string }> => {
    const ai = getAiClient(apiKey);
    const prompt = `Act as a Behavioral Psychologist. Analyze lead: ${lead.name} (${lead.type}). Rating: ${lead.rating}. Website: ${lead.website}.
    Task: Search reviews and owner replies. Analyze digital gap.
    Return JSON: { score: number(0-100), psychology: "string summary" }`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: prompt,
            config: { tools: [{ googleSearch: {} }] }
        });
        trackUsage("gemini-2.5-pro", response.usageMetadata);
        let text = response.text || "{}";
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(text);
        return { score: data.score || 50, psychology: data.psychology || "Analysis failed." };
    } catch (e) {
        return { score: 50, psychology: "Could not analyze." };
    }
};

export const generateDossier = async (apiKey: string, lead: Lead): Promise<Partial<Lead>> => {
    const ai = getAiClient(apiKey);
    const prompt = `Analyze business: "${lead.name}" at "${lead.address}". Find owner name/email. Summarize core business. Identify 3 digital pain points. Estimate revenue loss. Return JSON: {ownerName, ownerEmail, businessCore, revenueEstimate, painPoints[]}`;
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: { tools: [{ googleSearch: {} }] }
        });
        trackUsage("gemini-3-flash-preview", response.usageMetadata);
        let text = response.text || "{}";
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(text);
    } catch (e) { return {}; }
};

export const analyzeCompetitors = async (apiKey: string, niche: string, location: string): Promise<Competitor[]> => {
    const ai = getAiClient(apiKey);
    const prompt = `Identify 3 top competitors for ${niche} in ${location}. Return JSON array: {name, website, strengths[], weaknesses[], whyWinning}`;
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: { tools: [{ googleSearch: {} }] }
        });
        trackUsage("gemini-3-flash-preview", response.usageMetadata);
        let text = response.text || "[]";
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(text);
    } catch (e) { return []; }
};

export const createPRD = async (apiKey: string, lead: Lead, competitors: Competitor[], agent?: AgentProfile): Promise<string> => {
    const ai = getAiClient(apiKey);
    const systemInstruction = agent ? compileAgentInstruction(agent) : "Act as a Senior Product Manager.";

    const prompt = `Create a PRD for "${lead.name}".
    Goal: Beat these competitors: ${competitors.map(c => c.name).join(', ')}.
    Context: ${lead.businessCore}
    Output Format: Markdown.`;

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: { systemInstruction }
    });
    trackUsage("gemini-3-flash-preview", response.usageMetadata);
    return response.text || "";
};

export const refinePRD = async (apiKey: string, currentPrd: string, instruction: string, agent?: AgentProfile): Promise<string> => {
    const ai = getAiClient(apiKey);
    const systemInstruction = agent ? compileAgentInstruction(agent) : "Act as a Senior Product Lead.";

    const prompt = `TASK: Refine the following Product Requirements Document (PRD) based on this objective: "${instruction}".
    
    RULES:
    1. Maintain the existing high-quality markdown structure.
    2. Incorporate Mermaid graphs (using \`\`\`mermaid\`\`\` blocks) for any complex flows, architecture, or timelines requested.
    3. Ensure the tone remains tactical and premium.
    
    CURRENT PRD:
    ${currentPrd}
    
    RETURN THE FULL REFINED MARKDOWN CONTENT.`;

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: { systemInstruction }
    });
    trackUsage("gemini-3-flash-preview", response.usageMetadata);

    return response.text || currentPrd;
};

// --- MULTI-PAGE BUILDER & EDITING ---

export const generateWebsiteCode = async (apiKey: string, lead: Lead, prd: string, agent?: AgentProfile): Promise<{ [key: string]: string }> => {
    const ai = getAiClient(apiKey);
    const systemInstruction = agent ? compileAgentInstruction(agent) : "Act as an Award-Winning Developer.";

    // Nudge for 5-7 pages if it's a high-tier agent
    const pageRequirement = agent?.mandate.objective.includes('5-7 page') ? 'a GUARANTEED 5-7 page award-winning architecture' : 'a multi-page website';
    const requiredSections = agent?.outputContract.requiredSections.join(', ') || 'Hero, Services, Contact';

    const prompt = `Based on the PRD for ${lead.name}, generate ${pageRequirement}.
    
    REQUIRED COMPONENTS/SECTIONS TO INTEGRATE:
    ${requiredSections}

    TECH STACK: Tailwind CSS (CDN), FontAwesome (CDN), Google Fonts.
    
    DELIVERY PROTOCOL:
    1. Return ONLY valid JSON where keys are filenames and values are the full HTML strings.
    2. Ensure content is value-rich, professional, and reflects a $25,000 market value.
    3. Include 5-7 distinct files (e.g. index.html, services.html, portfolio.html, about.html, news.html, contact.html) if requested.
    4. Maintain absolute design consistency across all files.

    Example Output Format: { "index.html": "<!DOCTYPE html>...", "services.html": "..." }
    Do NOT use markdown. Return the raw JSON object.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                systemInstruction
            }
        });
        trackUsage("gemini-3-flash-preview", response.usageMetadata);
        return JSON.parse(response.text || "{}");
    } catch (e) {
        console.error("Site Gen Failed", e);
        return {};
    }
};

export const editWebsiteElement = async (apiKey: string, currentHtml: string, instruction: string, agent?: AgentProfile): Promise<string> => {
    const ai = getAiClient(apiKey);
    const systemInstruction = agent ? compileAgentInstruction(agent) : "Act as a Senior Developer.";

    const prompt = `TASK: Edit the following HTML code based strictly on this instruction: "${instruction}".
    
    RULES:
    1. Do NOT regenerate the whole page if not needed, but return the FULL valid HTML string with the changes applied.
    2. Maintain all existing scripts and CDNs.
    
    CURRENT HTML:
    ${currentHtml.substring(0, 20000)}... 
    
    RETURN ONLY RAW HTML string.`;

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: { systemInstruction }
    });
    trackUsage("gemini-3-flash-preview", response.usageMetadata);

    let text = response.text || currentHtml;
    text = text.replace(/```html/g, '').replace(/```/g, '');
    return text;
};

export const generateOutreach = async (apiKey: string, lead: Lead, agent?: AgentProfile): Promise<{ emailSubject: string, emailBody: string, smsBody: string }> => {
    const ai = getAiClient(apiKey);
    const systemInstruction = agent ? compileAgentInstruction(agent) : "Act as a Sales Expert.";

    const prompt = `Write a cold email and SMS for ${lead.name}.
    Context: We built a custom site (worth $25k) for $750.
    Return JSON: { emailSubject, emailBody, smsBody }`;

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            systemInstruction
        }
    });
    trackUsage("gemini-3-flash-preview", response.usageMetadata);

    return JSON.parse(response.text || "{}");
}

export const streamTestAgent = async (apiKey: string, agent: AgentProfile, testInput: string, onChunk: (chunk: string) => void): Promise<string> => {
    const ai = getAiClient(apiKey);
    const systemInstruction = compileAgentInstruction(agent);

    try {
        const result = await ai.models.generateContentStream({
            model: "gemini-3-flash-preview",
            contents: testInput,
            config: { systemInstruction }
        });

        let fullText = "";
        for await (const chunk of result) {
            const text = chunk.text || "";
            fullText += text;
            onChunk(text);
        }
        // Metadata usually available at end of stream result in some SDKs, 
        // but for now we track as one call. Tokens are harder in stream without responseMetadata.
        trackUsage("gemini-3-flash-preview");
        return fullText;
    } catch (e) {
        console.error("Streaming failed", e);
        throw e;
    }
}

// --- VAULT RESEARCH ---

export const conductResearch = async (apiKey: string, query: string): Promise<{ title: string, content: string }> => {
    const ai = getAiClient(apiKey);
    const prompt = `Research Topic: "${query}"
    
    Instructions:
    1. Search Google for the latest information, statistics, and trends related to this topic.
    2. Synthesize a comprehensive research report in Markdown format.
    3. Include a Title, Executive Summary, Key Findings, Strategic Opportunities, and References.
    
    The output should be high-quality, professional, and dense with information suitable for an agency strategy vault.`;

    const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: prompt,
        config: { tools: [{ googleSearch: {} }] }
    });
    trackUsage("gemini-3-pro-preview", response.usageMetadata);

    return {
        title: query.charAt(0).toUpperCase() + query.slice(1),
        content: response.text || "# Research Failed\nCould not generate content."
    };
};

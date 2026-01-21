
import { GoogleGenAI } from "@google/genai";
import { Lead, Competitor, AgentProfile } from "../types";

const getAiClient = (apiKey: string) => {
    // This specific SDK version (1.38.0) requires the object wrapper
    return new GoogleGenAI({ apiKey });
};

// --- USAGE TRACKING ---
import { SystemUsage } from "../types";

export interface IncrementalUsage {
    model: string;
    calls: number;
    totalTokens: number;
    promptTokens: number;
    completionTokens: number;
}

type UsageListener = (usage: IncrementalUsage) => void;
const listeners: UsageListener[] = [];

export const onUsageUpdate = (listener: UsageListener) => {
    listeners.push(listener);
    return () => {
        const index = listeners.indexOf(listener);
        if (index > -1) listeners.splice(index, 1);
    };
};

const trackUsage = (model: string, usageMetadata?: any) => {
    const incremental: IncrementalUsage = {
        model,
        calls: 1,
        totalTokens: 0,
        promptTokens: 0,
        completionTokens: 0
    };

    if (usageMetadata) {
        incremental.promptTokens = usageMetadata.promptTokenCount || 0;
        incremental.completionTokens = usageMetadata.candidatesTokenCount || 0;
        incremental.totalTokens = usageMetadata.totalTokenCount || (incremental.promptTokens + incremental.completionTokens);
    }

    listeners.forEach(l => l(incremental));
    return incremental;
};

// --- AGENT COMPILER ---

export const compileAgentInstruction = (agent: AgentProfile): string => {
    if (!agent.mandate) return `You are ${agent.name}, a ${agent.role}.`;

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
        Return ONLY a JSON array where each item has: name, type, address, rating, userRatingCount, website, phone, email.`;
    } else {
        prompt = `Find ${limit} local ${niche} businesses in ${location}. 
        Return ONLY a JSON array where each item has: name, type, address, rating, userRatingCount, website, phone, email.`;
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: { tools: [{ googleMaps: {} }, { googleSearch: {} } as any] }
        });

        trackUsage("gemini-2.5-flash", response.usageMetadata);

        let text = response.text || "[]";
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
            model: "gemini-2.5-flash",
            contents: prompt,
            config: { tools: [{ googleMaps: {} }, { googleSearch: {} } as any] }
        });
        trackUsage("gemini-2.5-flash", response.usageMetadata);
        let text = response.text || "null";
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
    const prompt = `Act as a Behavioral Psychologist. Analyze lead: ${lead.name}. Search reviews and owner replies. Return JSON: { score: number(0-100), psychology: "string summary" }`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: { tools: [{ googleSearch: {} } as any] }
        });
        trackUsage("gemini-2.5-flash", response.usageMetadata);
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
    const prompt = `Analyze business: "${lead.name}" at "${lead.address}". Return JSON: {ownerName, ownerEmail, businessCore, revenueEstimate, painPoints[]}`;
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: { tools: [{ googleSearch: {} } as any] }
        });
        trackUsage("gemini-2.5-flash", response.usageMetadata);
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
            model: "gemini-2.5-flash",
            contents: prompt,
            config: { tools: [{ googleSearch: {} } as any] }
        });
        trackUsage("gemini-2.5-flash", response.usageMetadata);
        let text = response.text || "[]";
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(text);
    } catch (e) { return []; }
};

export const createPRD = async (apiKey: string, lead: Lead, competitors: Competitor[], agent?: AgentProfile): Promise<string> => {
    const ai = getAiClient(apiKey);
    const systemInstruction = agent ? compileAgentInstruction(agent) : "Act as a Senior Product Manager.";

    const prompt = `Create a PRD for "${lead.name}". Beat: ${competitors.map(c => c.name).join(', ')}. Context: ${lead.businessCore}. Output: Markdown.`;

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

    const prompt = `TASK: Refine PRD based on: "${instruction}". CURRENT PRD: ${currentPrd}. RETURN FULL REFINED MARKDOWN.`;

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: { systemInstruction }
    });
    trackUsage("gemini-3-flash-preview", response.usageMetadata);
    return response.text || currentPrd;
};

export const generateWebsiteCode = async (apiKey: string, lead: Lead, prd: string, agent?: AgentProfile): Promise<{ [key: string]: string }> => {
    const ai = getAiClient(apiKey);
    const systemInstruction = agent ? compileAgentInstruction(agent) : "Act as an Award-Winning Developer.";

    const prompt = `Generate a multi-page website based on PRD. Return ONLY valid JSON where keys are filenames and values are full HTML strings.`;

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

    const prompt = `Edit HTML based on: "${instruction}". CURRENT HTML: ${currentHtml.substring(0, 20000)}. RETURN ONLY RAW HTML.`;

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

    const prompt = `Write cold email and SMS for ${lead.name}. Context: $25k site for $750. Return JSON: { emailSubject, emailBody, smsBody }`;

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

    const enhancedPrompt = `${testInput}\n\nOUTPUT RAW HTML ONLY starting with <!DOCTYPE html>. NO MARKDOWN. NO FENCES. NO EXPLANATIONS.`;

    try {
        const result = await ai.models.generateContentStream({
            model: "gemini-3-flash-preview",
            contents: enhancedPrompt,
            config: { systemInstruction }
        });

        let fullText = "";
        for await (const chunk of result) {
            let text = chunk.text || "";
            if (fullText.length === 0) {
                text = text.replace(/^```html\s*/i, '').replace(/^```\s*/i, '');
            }
            text = text.replace(/```$/g, '');
            fullText += text;
            onChunk(text);
        }
        trackUsage("gemini-3-flash-preview");
        return fullText.trim();
    } catch (e) {
        console.error("Streaming failed", e);
        throw e;
    }
}

export const conductResearch = async (apiKey: string, query: string): Promise<{ title: string, content: string }> => {
    const ai = getAiClient(apiKey);
    const prompt = `Research Topic: "${query}". Synthesize a Markdown report based on current web data.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: { tools: [{ googleSearch: {} } as any] }
        });
        trackUsage("gemini-3-flash-preview", response.usageMetadata);
        return {
            title: query.charAt(0).toUpperCase() + query.slice(1),
            content: response.text || "# Research Failed"
        };
    } catch (e) { return { title: query, content: "Research failed." }; }
};

export const validateApiKey = async (apiKey: string): Promise<boolean> => {
    try {
        const ai = getAiClient(apiKey);
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Connection test. Respond only with 'OK'."
        });
        return !!response.text;
    } catch (e) {
        console.error("API Validation failed:", e);
        return false;
    }
};

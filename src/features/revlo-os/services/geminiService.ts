
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Lead, Competitor, AgentProfile, LeadStatus } from "../types";

const getGenAI = (apiKey: string) => {
    return new GoogleGenerativeAI(apiKey);
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
    const genAI = getGenAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        tools: [{ googleSearch: {} }] as any,
        generationConfig: {
            responseMimeType: "application/json"
        }
    });

    let prompt = `ROLE: Local Business Data Scraper.
    TASK: Find ${limit} ${scanMode === 'zone' ? 'businesses' : niche + ' businesses'} in "${location}".
    OUTPUT: A valid JSON array of objects.
    SCHEMA: { name: string, type: string, address: string, rating: number, userRatingCount: number, website: string, phone: string, email: string }
    
    IMPORTANT: If you cannot find data, return an empty array []. Do NOT explain why. Do NOT say "I am sorry".`;

    try {
        const result = await model.generateContent(prompt);
        const response = result.response;

        trackUsage("gemini-2.0-flash", response.usageMetadata);

        let text = response.text() || "[]";

        // Robust Extraction
        try {
            // Remove markdown blocks if present
            const jsonMatch = text.match(/\[[\s\S]*\]/);
            const cleanText = jsonMatch ? jsonMatch[0] : text;
            const data = JSON.parse(cleanText);

            if (!Array.isArray(data)) return [];

            return data.map((item: any): Partial<Lead> => ({
                id: crypto.randomUUID(),
                name: item.name || "Unknown Business",
                type: item.type || niche,
                address: item.address || location,
                rating: item.rating || 0,
                userRatingCount: item.userRatingCount || 0,
                website: item.website || "",
                phone: item.phone || "",
                email: item.email || "",
                status: LeadStatus.SCOUTED as LeadStatus,
                createdAt: new Date().toISOString()
            }));
        } catch (parseErr) {
            console.warn("SYSTEM: AI Output Parse Failure. Raw text was:", text.substring(0, 100));
            return [];
        }
    } catch (e: any) {
        if (e?.message?.includes("signal is aborted") || e?.name === 'AbortError') return [];
        console.error("Scout error:", e);
        return [];
    }
};

export const enrichLead = async (apiKey: string, query: string): Promise<Partial<Lead> | null> => {
    const genAI = getGenAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        tools: [{ googleSearch: {} }] as any
    });

    const prompt = `Research business: "${query}". Find official name, industry type, address, website, email, phone, rating. Return raw JSON.`;
    try {
        const result = await model.generateContent(prompt);
        const response = result.response;

        trackUsage("gemini-2.0-flash", response.usageMetadata);
        let text = response.text() || "null";
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        if (text === "null" || text === "{}") return null;
        const data = JSON.parse(text);
        if (!data.name) data.name = query;
        return { ...data, id: crypto.randomUUID(), status: 'SCOUTED', createdAt: new Date().toISOString() };
    } catch (e) { return null; }
};

// --- ANALYSIS & SCORING ---

export const scoreLead = async (apiKey: string, lead: Lead): Promise<{ score: number, psychology: string }> => {
    const genAI = getGenAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        tools: [{ googleSearch: {} }] as any
    });

    const prompt = `Act as a Behavioral Psychologist. Analyze lead: ${lead.name}. Search reviews and owner replies. Return JSON: { score: number(0-100), psychology: "string summary" }`;

    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        trackUsage("gemini-2.0-flash", response.usageMetadata);
        let text = response.text() || "{}";
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(text);
        return { score: data.score || 50, psychology: data.psychology || "Analysis failed." };
    } catch (e) {
        return { score: 50, psychology: "Could not analyze." };
    }
};

export const generateDossier = async (apiKey: string, lead: Lead): Promise<Partial<Lead>> => {
    const genAI = getGenAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        tools: [{ googleSearch: {} }] as any
    });

    const prompt = `Analyze business: "${lead.name}" at "${lead.address}". Return JSON: {ownerName, ownerEmail, businessCore, revenueEstimate, painPoints[]}`;
    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        trackUsage("gemini-2.0-flash", response.usageMetadata);
        let text = response.text() || "{}";
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(text);
    } catch (e) { return {}; }
};

export const analyzeCompetitors = async (apiKey: string, niche: string, location: string): Promise<Competitor[]> => {
    const genAI = getGenAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        tools: [{ googleSearch: {} }] as any
    });

    const prompt = `Identify 3 top competitors for ${niche} in ${location}. Return JSON array: {name, website, strengths[], weaknesses[], whyWinning}`;
    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        trackUsage("gemini-2.0-flash", response.usageMetadata);
        let text = response.text() || "[]";
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(text);
    } catch (e) { return []; }
};

export const createPRD = async (apiKey: string, lead: Lead, competitors: Competitor[], agent?: AgentProfile): Promise<string> => {
    const genAI = getGenAI(apiKey);
    const systemInstruction = agent ? compileAgentInstruction(agent) : "Act as a Senior Product Manager.";

    const model = genAI.getGenerativeModel({
        model: "gemini-3-flash-preview",
        systemInstruction
    });

    const prompt = `Create a PRD for "${lead.name}". Beat: ${competitors.map(c => c.name).join(', ')}. Context: ${lead.businessCore}. Output: Markdown.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    trackUsage("gemini-3-flash-preview", response.usageMetadata);
    return response.text() || "";
};

export const refinePRD = async (apiKey: string, currentPrd: string, instruction: string, agent?: AgentProfile): Promise<string> => {
    const genAI = getGenAI(apiKey);
    const systemInstruction = agent ? compileAgentInstruction(agent) : "Act as a Senior Product Lead.";

    const model = genAI.getGenerativeModel({
        model: "gemini-3-flash-preview",
        systemInstruction
    });

    const prompt = `TASK: Refine PRD based on: "${instruction}". CURRENT PRD: ${currentPrd}. RETURN FULL REFINED MARKDOWN.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    trackUsage("gemini-3-flash-preview", response.usageMetadata);
    return response.text() || currentPrd;
};

export const generateWebsiteCode = async (apiKey: string, lead: Lead, prd: string, agent?: AgentProfile): Promise<{ [key: string]: string }> => {
    const genAI = getGenAI(apiKey);
    const systemInstruction = agent ? compileAgentInstruction(agent) : "Act as an Award-Winning Developer.";

    const model = genAI.getGenerativeModel({
        model: "gemini-3-flash-preview",
        systemInstruction,
        generationConfig: {
            responseMimeType: "application/json"
        }
    });

    const prompt = `Generate a multi-page website based on PRD. Return ONLY valid JSON where keys are filenames and values are full HTML strings.`;

    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        trackUsage("gemini-3-flash-preview", response.usageMetadata);
        return JSON.parse(response.text() || "{}");
    } catch (e) {
        console.error("Site Gen Failed", e);
        return {};
    }
};

export const editWebsiteElement = async (apiKey: string, currentHtml: string, instruction: string, agent?: AgentProfile): Promise<string> => {
    const genAI = getGenAI(apiKey);
    const systemInstruction = agent ? compileAgentInstruction(agent) : "Act as a Senior Developer.";

    const model = genAI.getGenerativeModel({
        model: "gemini-3-flash-preview",
        systemInstruction
    });

    const prompt = `Edit HTML based on: "${instruction}". CURRENT HTML: ${currentHtml.substring(0, 20000)}. RETURN ONLY RAW HTML.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    trackUsage("gemini-3-flash-preview", response.usageMetadata);
    let text = response.text() || currentHtml;
    text = text.replace(/```html/g, '').replace(/```/g, '');
    return text;
};

export const generateOutreach = async (apiKey: string, lead: Lead, agent?: AgentProfile): Promise<{ emailSubject: string, emailBody: string, smsBody: string }> => {
    const genAI = getGenAI(apiKey);
    const systemInstruction = agent ? compileAgentInstruction(agent) : "Act as a Sales Expert.";

    const model = genAI.getGenerativeModel({
        model: "gemini-3-flash-preview",
        systemInstruction,
        generationConfig: {
            responseMimeType: "application/json"
        }
    });

    const prompt = `Write cold email and SMS for ${lead.name}. Context: $25k site for $750. Return JSON: { emailSubject, emailBody, smsBody }`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    trackUsage("gemini-3-flash-preview", response.usageMetadata);
    return JSON.parse(response.text() || "{}");
}

export const streamTestAgent = async (apiKey: string, agent: AgentProfile, testInput: string, onChunk: (chunk: string) => void): Promise<string> => {
    const genAI = getGenAI(apiKey);
    const systemInstruction = compileAgentInstruction(agent);

    const model = genAI.getGenerativeModel({
        model: "gemini-3-flash-preview",
        systemInstruction
    });

    const enhancedPrompt = `${testInput}\n\nOUTPUT RAW HTML ONLY starting with <!DOCTYPE html>. NO MARKDOWN. NO FENCES. NO EXPLANATIONS.`;

    try {
        const result = await model.generateContentStream(enhancedPrompt);

        let fullText = "";
        for await (const chunk of result.stream) {
            let text = chunk.text() || "";
            if (fullText.length === 0) {
                text = text.replace(/^```html\s*/i, '').replace(/^```\s*/i, '');
            }
            text = text.replace(/```$/g, '');
            fullText += text;
            onChunk(text);
        }
        trackUsage("gemini-3-flash-preview");
        return fullText.trim();
    } catch (e: any) {
        if (e?.message?.includes("signal is aborted") || e?.name === 'AbortError') return ""; // Return empty string on abort
        console.error("Streaming failed", e);
        throw e;
    }
}

export const conductResearch = async (apiKey: string, query: string): Promise<{ title: string, content: string }> => {
    const genAI = getGenAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        tools: [{ googleSearch: {} }] as any
    });

    const prompt = `Research Topic: "${query}". Synthesize a Markdown report based on current web data.`;

    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        trackUsage("gemini-3-flash-preview", response.usageMetadata);
        return {
            title: query.charAt(0).toUpperCase() + query.slice(1),
            content: response.text() || "# Research Failed"
        };
    } catch (e) { return { title: query, content: "Research failed." }; }
};

export const validateApiKey = async (apiKey: string): Promise<boolean> => {
    try {
        const genAI = getGenAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent("Connection test. Respond only with 'OK'.");
        return !!result.response.text();
    } catch (e: any) {
        if (e?.message?.includes("signal is aborted") || e?.name === 'AbortError') return false; // Return false on abort
        console.error("API Validation failed:", e);
        return false;
    }
};

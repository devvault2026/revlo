
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Lead, Competitor, AgentProfile, LeadStatus, Settings } from "../types";

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

// --- CHATBOT AGENT SERVICE ---

export interface ChatMessage {
    role: 'user' | 'model';
    parts: { text: string }[];
}

export const chatWithAgent = async (
    apiKey: string,
    history: ChatMessage[],
    message: string,
    modelName: string = "gemini-2.0-flash",
    onChunk?: (chunk: string) => void
): Promise<string> => {
    if (!apiKey) {
        console.error("REVLO AGENT ERROR: No API Key provided to chatWithAgent.");
        throw new Error("API Key missing. Please check your .env file and restart the development server.");
    }

    // Diagnostic: Verify key stability (Masked)
    console.log(`REVLO AGENT: Key signature detected [${apiKey.substring(0, 6)}...${apiKey.slice(-4)}] (Length: ${apiKey.length})`);

    const genAI = getGenAI(apiKey);

    // AI Agent System Instruction
    const systemInstruction = `
    ROLE: Revlo Partner Agent (Elite AI Growth Consultant)
    IDENTITY: You are a elite business growth consultant for Revlo Agency.
    TONE: Professional, sophisticated, results-oriented, human-centric.
    GOAL: Assist visitors, explain Revlo's value, and guide them to book a strategy call.
    
    CAPABILITIES:
    1. Full Markdown rendering (bold, italics, tables, etc.)
    2. Mermaid Diagram Generation: ALWAYS visualize strategic processes, lead lifecycles, or growth roadmaps using Mermaid diagrams. High-fidelity rendering is supported and encouraged for clarity.
       Format: \`\`\`mermaid \n graph TD; A-->B; \n \`\`\`
    3. Business Intelligence: Deep knowledge of Brand Strategy, Acquisition Systems, and Sales Automation.
    
    REVLO PARTNERSHIP SERVICES:
    - Digital Foundation: Authority branding & conversion engines ($2,500+).
    - Managed Growth: Omnichannel acquisition and scaling ($1,750/mo+).
    - Sales Automation: AI-driven follow-ups and CRM operations ($3,000/mo+).
    
    STRATEGY:
    - Lead with value. Be strategic. 
    - Invite them to a Strategy Session for personalized roadmaps.
    - Mention success metrics: Avg. 347% growth within 6 months.
    
    IMPORTANT: Every conversation should nurture the lead towards booking a call.
    `;

    // Precise model mapping
    let actualModel = modelName;

    // Support for user-friendly "gemini-3" alias mapping
    if (modelName === "gemini-3-pro") {
        actualModel = "gemini-2.0-pro-exp-02-05";
    } else if (modelName === "gemini-3-flash") {
        actualModel = "gemini-2.0-flash";
    } else if (modelName === "gemini-thinking") {
        actualModel = "gemini-2.0-flash-thinking-exp";
    }

    console.log(`REVLO AGENT: Strategic attempt with [${actualModel}]`);

    try {
        const model = genAI.getGenerativeModel({
            model: actualModel,
            systemInstruction: systemInstruction
        });

        const chat = model.startChat({
            history: history as any,
            generationConfig: {
                maxOutputTokens: 4000,
                temperature: 0.7,
            },
        });

        if (onChunk) {
            const result = await chat.sendMessageStream(message);
            let fullText = "";
            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                fullText += chunkText;
                onChunk(chunkText);
            }
            trackUsage(actualModel);
            return fullText;
        } else {
            const result = await chat.sendMessage(message);
            const response = result.response;
            trackUsage(actualModel, response.usageMetadata);
            return response.text();
        }
    } catch (e: any) {
        console.error("REVLO AGENT CONNECTION FAILED:", e);

        const isKeyError = e?.message?.includes('403') || e?.message?.includes('API_KEY_INVALID') || e?.message?.includes('400');
        const isModelError = e?.message?.includes('404') || e?.message?.includes('not found') || e?.message?.includes('not allowed');

        // Fallback Logic: Only fallback if we are NOT already trying the safety model
        if (actualModel !== "gemini-1.5-flash") {
            console.warn(`REVLO AGENT: Error with ${actualModel}. Falling back to gemini-1.5-flash...`);
            return chatWithAgent(apiKey, history, message, "gemini-1.5-flash", onChunk);
        }

        throw new Error(e?.message || "Strategic connection timed out.");
    }
};

// --- DATA SERVICES ---
export const scoutLeads = async (apiKey: string, niche: string, location: string, limit: number = 5, scanMode: 'niche' | 'zone' = 'niche'): Promise<Partial<Lead>[]> => {
    const genAI = getGenAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash", // Stabilized to Flash
        tools: [{ googleSearch: {} }] as any
    });

    try {
        const result = await model.generateContent(`Find ${limit} ${scanMode === 'zone' ? 'businesses' : niche + ' businesses'} in "${location}". Return JSON array with name, website, phone.`);
        const text = result.response.text();
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        return jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    } catch (e: any) {
        console.warn("Scout with Pro failed, falling back to Flash...", e);
        try {
            // Fallback to Flash if Pro fails (e.g. Rate Limit)
            const fallbackModel = genAI.getGenerativeModel({
                model: "gemini-2.0-flash",
                tools: [{ googleSearch: {} }] as any
            });
            const result = await fallbackModel.generateContent(`Find ${limit} ${scanMode === 'zone' ? 'businesses' : niche + ' businesses'} in "${location}". Return JSON array with name, website, phone.`);
            const text = result.response.text();
            const jsonMatch = text.match(/\[[\s\S]*\]/);
            return jsonMatch ? JSON.parse(jsonMatch[0]) : [];
        } catch (fallbackError) {
            return [];
        }
    }
};

export const enrichLeadData = async (apiKey: string, lead: Partial<Lead>): Promise<Partial<Lead>> => {
    const genAI = getGenAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    try {
        const result = await model.generateContent(`Analyze lead: ${JSON.stringify(lead)}. Return JSON with pain_points and revenue_scale.`);
        const text = result.response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        return jsonMatch ? { ...lead, ...JSON.parse(jsonMatch[0]) } : lead;
    } catch (e) { return lead; }
};

export const analyzeCompetitors = async (apiKey: string, niche: string, location: string): Promise<Competitor[]> => {
    const genAI = getGenAI(apiKey);
    // Use Flash for stability, Pro Exp was failing
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        tools: [{ googleSearch: {} }] as any
    });

    try {
        const prompt = `Research 3 key competitors for a ${niche} business in ${location}. 
        Return a JSON array of objects with these exact keys: "name" (string), "website" (string), "whyWinning" (string).
        Ensure the "whyWinning" field explains their market edge.`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        return jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    } catch (e) {
        // Fallback to Flash
        try {
            const fallback = genAI.getGenerativeModel({ model: "gemini-2.0-flash", tools: [{ googleSearch: {} }] as any });
            const result = await fallback.generateContent(`Research 3 competitors for ${niche} in ${location}. Return JSON array.`);
            const text = result.response.text();
            const jsonMatch = text.match(/\[[\s\S]*\]/);
            return jsonMatch ? JSON.parse(jsonMatch[0]) : [];
        } catch (ex) {
            console.error("Competitor analysis failed:", ex);
            return [];
        }
    }
};

export const generateDossier = async (apiKey: string, lead: Lead): Promise<Partial<Lead>> => {
    const genAI = getGenAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    try {
        const prompt = `Create a business dossier for ${lead.name} (${lead.website || 'No website'}).
        Identify:
        1. Core pain points based on their industry (${lead.type || 'unknown'}).
        2. Expected revenue scale.
        3. Tech stack indicators.
        
        Return JSON with: { "pain_points": string[], "revenue_scale": string, "tech_stack": string[] }`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        return jsonMatch ? JSON.parse(jsonMatch[0]) : {};
    } catch (e) { return {}; }
};

export const scoreLead = async (apiKey: string, lead: Lead): Promise<{ score: number; psychology: string }> => {
    const genAI = getGenAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    try {
        const prompt = `Score the business potential for ${lead.name} in their niche.
        Provide a numeric score from 0-100 and a 1-sentence psychology profile of the owner.
        Return JSON: { "score": number, "psychology": string }`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        return jsonMatch ? JSON.parse(jsonMatch[0]) : { score: 50, psychology: "Standard business owner profile." };
    } catch (e) { return { score: 50, psychology: "Analysis pending." }; }
};

export const createPRD = async (apiKey: string, lead: Lead, competitors: Competitor[], agent?: AgentProfile): Promise<string> => {
    const genAI = getGenAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    try {
        const system = agent ? compileAgentInstruction(agent) : "You are a professional business strategist.";
        const prompt = `Create a high-impact Product Requirements Document (PRD) for ${lead.name}.
        Competition: ${JSON.stringify(competitors)}
        Dossier: ${JSON.stringify(lead)}
        Format as Markdown. Include sections for Brand Strategy, Conversion Metrics, and Growth Roadmap.`;

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            systemInstruction: system
        });
        return result.response.text();
    } catch (e) { return "# Strategy Generation Failed\n\nPlease try again."; }
};

export const generateWebsiteCode = async (apiKey: string, lead: Lead, prd: string, agent?: AgentProfile): Promise<Record<string, string>> => {
    const genAI = getGenAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    try {
        const system = agent ? compileAgentInstruction(agent) : "You are an elite web developer.";
        const prompt = `Based on this PRD: ${prd.substring(0, 2000)}...
        Generate a multi-page website for ${lead.name}. 
        Return a JSON object where keys are filenames and values are the HTML/CSS/JS content.
        REQUIRED: index.html (with full styling), about.html, services.html, contact.html.
        Use modern, high-conversion layouts.`;

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            systemInstruction: system
        });
        const text = result.response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        return jsonMatch ? JSON.parse(jsonMatch[0]) : { 'index.html': '<html><body><h1>Generation Error</h1></body></html>' };
    } catch (e) { return { 'index.html': '<html><body><h1>Generation Error</h1></body></html>' }; }
};

export const generateOutreach = async (apiKey: string, lead: Lead, agent?: AgentProfile): Promise<{ emailSubject: string; emailBody: string; smsBody: string }> => {
    const genAI = getGenAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    try {
        const system = agent ? compileAgentInstruction(agent) : "You are an elite copywriter.";
        const prompt = `Create a hyper-personalized outreach package for ${lead.name}.
        Dossier: ${JSON.stringify(lead)}
        Return JSON: { "emailSubject": string, "emailBody": string, "smsBody": string }`;

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            systemInstruction: system
        });
        const text = result.response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        return jsonMatch ? JSON.parse(jsonMatch[0]) : { emailSubject: "Strategic Partnership", emailBody: "Hello...", smsBody: "Hi..." };
    } catch (e) { return { emailSubject: "Partnership Opportunity", emailBody: "Hello...", smsBody: "Hi..." }; }
};

export const scoutLeadsStreaming = async (
    apiKey: string,
    niche: string,
    location: string,
    limit: number,
    scanMode: string,
    onLead: (lead: Partial<Lead>) => void
): Promise<Partial<Lead>[]> => {
    const genAI = getGenAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash", // Reverted to Flash for stability (Pro Exp was 404ing)
        tools: [{ googleSearch: {} }] as any
    });

    try {
        const prompt = `Search for ${limit} ${niche} businesses in ${location}. 
        For each, return a JSON object with: id (random string), name, website, phone, type, location.
        Stream the results one by one if possible, or return the whole array.
        ALWAYS return valid JSON array.`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        const leads: Partial<Lead>[] = jsonMatch ? JSON.parse(jsonMatch[0]) : [];

        // Simulate streaming behavior since the model usually returns the whole block for JSON
        for (const lead of leads) {
            onLead(lead);
            await new Promise(r => setTimeout(r, 200));
        }

        return leads;
    } catch (e: any) {
        console.warn("Streaming Scout with Pro failed, falling back to Flash...", e);
        try {
            const fallbackModel = genAI.getGenerativeModel({
                model: "gemini-2.0-flash",
                tools: [{ googleSearch: {} }] as any
            });
            const result = await fallbackModel.generateContent(`Search for ${limit} ${niche} businesses in ${location}. Return JSON array.`);
            const text = result.response.text();
            const jsonMatch = text.match(/\[[\s\S]*\]/);
            const leads: Partial<Lead>[] = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
            for (const lead of leads) {
                onLead(lead);
                await new Promise(r => setTimeout(r, 200));
            }
            return leads;
        } catch (finalError) {
            console.error("Scout failed completely:", finalError);
            return [];
        }
    }
};

export const refinePRD = async (apiKey: string, currentPrd: string, instruction: string, agent?: AgentProfile): Promise<string> => {
    const genAI = getGenAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    try {
        const system = agent ? compileAgentInstruction(agent) : "You are a business strategist.";
        const prompt = `Current PRD: ${currentPrd}\n\nREFINEMENT REQUEST: ${instruction}\n\nOutput the UPDATED PRD in full Markdown.`;

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            systemInstruction: system
        });
        return result.response.text();
    } catch (e) { return currentPrd; }
};

export const editWebsiteElement = async (apiKey: string, currentHtml: string, instruction: string, agent?: AgentProfile): Promise<string> => {
    const genAI = getGenAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    try {
        const system = agent ? compileAgentInstruction(agent) : "You are an elite web developer.";
        const prompt = `Current HTML: ${currentHtml}\n\nEDIT REQUEST: ${instruction}\n\nOutput the UPDATED index.html in full.`;

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            systemInstruction: system
        });
        return result.response.text();
    } catch (e) { return currentHtml; }
};

export const streamTestAgent = async (
    apiKey: string,
    agent: AgentProfile,
    message: string,
    onChunk: (chunk: string) => void
): Promise<void> => {
    const genAI = getGenAI(apiKey);
    const system = compileAgentInstruction(agent);

    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            systemInstruction: system
        });

        const result = await model.generateContentStream(message);
        for await (const chunk of result.stream) {
            onChunk(chunk.text());
        }
    } catch (e) {
        console.error("Agent test failed:", e);
        throw e;
    }
};

export const generateCode = async (apiKey: string, prompt: string, language: string = 'typescript'): Promise<string> => {
    const genAI = getGenAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    try {
        const result = await model.generateContent(`Code: ${prompt}. Return raw code only.`);
        return result.response.text();
    } catch (e) { return "// Code generation failed."; }
};

export const refineContent = async (apiKey: string, content: string, tone: string): Promise<string> => {
    const genAI = getGenAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    try {
        const result = await model.generateContent(`Rewrite (${tone}): ${content}`);
        return result.response.text();
    } catch (e) { return content; }
};

export const marketResearch = async (apiKey: string, query: string): Promise<{ title: string; content: string }> => {
    const genAI = getGenAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        tools: [{ googleSearch: {} }] as any
    });
    try {
        const result = await model.generateContent(`Research: ${query}`);
        return { title: query, content: result.response.text() };
    } catch (e) {
        // Fallback
        try {
            const fallback = genAI.getGenerativeModel({ model: "gemini-1.5-flash", tools: [{ googleSearch: {} }] as any });
            const res = await fallback.generateContent(`Research: ${query}`);
            return { title: query, content: res.response.text() };
        } catch (ex) {
            return { title: query, content: "Research failed." };
        }
    }
};

export const validateApiKey = async (apiKey: string): Promise<boolean> => {
    try {
        const genAI = getGenAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent("OK");
        return !!result.response.text();
    } catch (e) { return false; }
};

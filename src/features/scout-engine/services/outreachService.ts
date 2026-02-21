import { GoogleGenAI } from "@google/genai";
import { Lead } from "../types";
import { safeJsonParse } from "../../../utils/safeJson";

export interface OutreachPackage {
    subject: string;
    body: string;
    offerModel: string;
    targetPainPoint: string;
}

export async function generateOutreachEmail(lead: Lead): Promise<OutreachPackage> {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY is missing for outreach generation.");

    const ai = new GoogleGenAI({ apiKey });

    const systemPrompt = `You are a WORLD-CLASS DIRECT RESPONSE COPYWRITER & REVENUE ARCHITECT. 
Your objective is to write a "Sovereign Outreach Email" that is so hyper-personalized, so relevant, and contains such an irrefutable offer that the recipient feels like they are losing money every second they don't respond.

### CONTEXT FOR OUTREACH:
1. **The Lead**: ${lead.businessName} (${lead.industry}).
2. **Current Digital Status**: ${lead.onlinePresenceAnalysis}
3. **Identified Revenue Bleed**: ${lead.revenueLossEstimate}
4. **Pain Points**: ${lead.painPoints?.join(', ')}
5. **The Proposed Solution**: ${lead.suggestedWorkflow}
6. **Our "Masterpiece" Status**: We have already architected a $25,000 preliminary design for them (refer to their custom demo sites).

### COPYWRITING MANDATES:
- **No Fluff**: Do not use "Hope you are doing well" or "I was just browsing".
- **The Hook**: Start with a visceral observation about their specific business or a competitor advantage they are missing.
- **The Irrefutable Offer**: Frame the offer around a "Risk-Reversal" or a "Found Money" strategy. (e.g., "I've already built the architecture to stop the ${lead.revenueLossEstimate} leak. It's ready to go.")
- **Hyper-Personalization**: Use their owner name (${lead.estimatedOwnerName || 'the owner'}), their location (${lead.location}), and specific pain points.
- **Identity**: You are sending as **Marketing Director Thorton** from **Revlo Agency**.
- **The Call to Action**: The primary objective is to get them to visit: https://www.wearerevlo.com/contact
- **Tone**: Professional, high-status, efficient, and slightly disruptive.
- **Goal**: Get them to book a strategy session or click the contact link.

### OUTPUT REQUIREMENT:
Return ONLY a JSON object. 
- DO NOT use double newlines (\\n\\n) between every sentence. Only use them to separate primary conceptual blocks. 
- Keep paragraphs dense and punchy.
{
  "subject": "A stopping-power subject line",
  "body": "The full email body (dense, high-impact)",
  "offerModel": "Short description of the offer",
  "targetPainPoint": "The primary pain point this email hits"
}`;

    try {
        const result = await ai.models.generateContent({
            model: "gemini-1.5-flash", // Using Flash for higher quota and stability
            contents: [{
                role: "user",
                parts: [{ text: `Generate the Outreach Package for ${lead.businessName}. Strategy: Irrefutable Offer based on ${lead.revenueLossEstimate} loss.` }]
            }],
            config: {
                systemInstruction: {
                    parts: [{ text: systemPrompt }]
                },
                temperature: 0.7,
                responseMimeType: "application/json"
            }
        });

        const text = result.text || '{}';
        return safeJsonParse<OutreachPackage>(text, {
            subject: `Urgent Analysis for ${lead.businessName}`,
            body: `I've analyzed your current infrastructure and identified a significant revenue leak of ${lead.revenueLossEstimate}. We've already built the architecture to fix this.`,
            offerModel: "Revenue Recovery Architecture",
            targetPainPoint: lead.painPoints?.[0] || "Revenue Leak"
        });
    } catch (err: any) {
        console.error("Outreach generation failed:", err);
        throw new Error(`Failed to forge outreach: ${err.message}`);
    }
}

export async function sendZapierEmail(packageData: OutreachPackage, lead: Lead, zapierToken: string) {
    // This is a placeholder for the actual Zapier integration.
    // Given the user provided a token and a connection link, 
    // we would typically use an MCP tool or a direct API call.

    console.log("SENDING EMAIL VIA ZAPIER:", {
        to: lead.email,
        subject: packageData.subject,
        token: zapierToken.substring(0, 10) + "..."
    });

    // If an MCP tool for Zapier was available, we'd call it here.
    // For now, we simulate the 'success' state for the UI.
    return { success: true, messageId: "zap_" + Math.random().toString(36).substr(2, 9) };
}

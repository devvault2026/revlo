import { Lead, AgentProfile, VapiConfig } from "../types";
import { compileAgentInstruction } from "./geminiService";

const VAPI_BASE_URL = "https://api.vapi.ai";

export const initiateOutboundCall = async (
    vapiConfig: VapiConfig, 
    lead: Lead, 
    agent: AgentProfile
): Promise<{ success: boolean; callId?: string; error?: string }> => {
    
    if (!vapiConfig.privateApiKey || !vapiConfig.phoneNumberId) {
        return { success: false, error: "Missing VAPI Configuration (Key or Phone ID)" };
    }

    if (!lead.phone) {
        return { success: false, error: "Lead has no phone number" };
    }

    // 1. Construct the Dynamic System Prompt for the Voice Agent
    const baseInstruction = compileAgentInstruction(agent);
    
    // The specific script requested by user
    const contextInstruction = `
    CONTEXT:
    You are calling ${lead.name}. The owner's name might be ${lead.ownerName || 'there'}.
    Their website is ${lead.website || 'missing'}.
    We noticed it is "wonky" or sub-optimal.
    
    YOUR GOAL:
    Say exactly this essence (naturalize it): "Hey, we found your site and noticed its a little wonky... we went ahead and took the initiative and built you out a demo to offer a new facelift. We fired you off an email a few minutes ago with all the info. You can call us back here anytime or check the link to book a time if you want us to claim it for you."
    
    You are helpful, professional, but casual.
    If they ask for the link, say it is in the email we just sent.
    `;

    const systemMessage = `${baseInstruction}\n\n${contextInstruction}`;

    // 2. Construct VAPI Payload
    // We create a "transient" assistant config on the fly so we don't need to pre-configure it in VAPI dashboard
    const payload = {
        phoneNumberId: vapiConfig.phoneNumberId,
        customer: {
            number: lead.phone
        },
        assistant: {
            transcriber: {
                provider: "deepgram",
                model: "nova-2",
                language: "en"
            },
            model: {
                provider: "openai",
                model: "gpt-3.5-turbo", // Fast and cheap for voice
                messages: [
                    {
                        role: "system",
                        content: systemMessage
                    }
                ]
            },
            voice: {
                provider: agent.voiceConfig?.provider || "11labs",
                voiceId: agent.voiceConfig?.voiceId || "burt", // Default 11labs voice
                stability: agent.voiceConfig?.stability || 0.5,
                similarityBoost: agent.voiceConfig?.similarityBoost || 0.75
            },
            firstMessage: `Hey is this the owner of ${lead.name}?`,
            recordingEnabled: true
        }
    };

    try {
        const response = await fetch(`${VAPI_BASE_URL}/call/phone`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${vapiConfig.privateApiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const err = await response.json();
            return { success: false, error: err.message || response.statusText };
        }

        const data = await response.json();
        return { success: true, callId: data.id };

    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const getCallStatus = async (vapiConfig: VapiConfig, callId: string) => {
    try {
        const response = await fetch(`${VAPI_BASE_URL}/call/${callId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${vapiConfig.privateApiKey}`
            }
        });
        return await response.json();
    } catch (e) {
        return null;
    }
};
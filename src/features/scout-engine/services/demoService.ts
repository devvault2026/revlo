import { GoogleGenAI } from "@google/genai";
import { Lead, WebsitePRD } from "../types";
import { supabase } from "../../../lib/supabase";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

/**
 * GEMINI 3 PRO ARCHITECTURE - UNSTOPPABLE WEBSITE BUILDER
 * 
 * Takes a generated WebsitePRD and transforms it into a fully immersive,
 * high-conversion, single-page static HTML masterpiece.
 */
export async function generateDemoWebsite(lead: Lead, prd: WebsitePRD): Promise<string> {
    if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is missing in environment.");

    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    const systemPrompt = `You are a SENIOR PRINCIPAL DESIGNER & LEAD FULL-STACK ENGINEER at a World-Class Creative Agency specializing in \$25,000+ custom deployments.
Your objective is to forge a "Sovereign Digital Masterpiece" for the provided client. 

### THE SOVEREIGN DESIGN SOP (Standard Operating Procedure):

1. **ARCHITECTURAL MANDATE (No White Spaces)**: 
   - Output a single, self-contained HTML file. 
   - Use Tailwind CSS (CDN) and Lucide Icons (CDN). 
   - FORBID UNPLANNED WHITE SPACE. Every section must be full-bleed or meticulously framed. Use complex "Bento Grids", overlapping layers, and multi-dimensional backgrounds.
   - Use "Kinetic Stacking": Layers that feel deep and alive. Use 'z-index' aggressively with relative and absolute positioning to create depth.

2. **AESTHETIC PROTOCOLS (The $25k Status)**:
   - **High-Density IA**: PRIORITY #1. Do not use 'h-screen' or 'min-h-screen' unless the content is massive. Every section should be 'h-auto' with tight leading and compact margins. No empty voids.
   - **Atmospheric Depth**: Use glassmorphism extensively ('backdrop-blur-2xl' + subtle 'border-white/5').
   - **Typography**: Import "Syne" (for headers) and "Outfit" (for body) from Google Fonts. Use 'leading-tight' (1.1 - 1.2) for headers to maintain high-status density.

3. **INTERACTION ENGINE (Pro-Level UX)**:
   - **Cinematic Reveals**: Every section MUST have a scroll-triggered entrance animation. Use an inline script with 'IntersectionObserver' to toggle 'opacity-100 translate-y-0' from 'opacity-0 translate-y-10'.
   - **Hover Magnetism**: Cards and buttons must have sophisticated hover states (scale, shadow expansion, border color shifts).
   - **Magnetic Smooth-Scroll**: Ensure all internal links are butter-smooth.

4. **HYPER-PERSONALIZED CONTENT**:
   - **NO PLACEHOLDERS**: Write the copy yourself. Use the Client Context to mention the owner (${lead.estimatedOwnerName || 'the owner'}), their location (${lead.location}), and specific competitor flaws analyzed in the PRD.
   - **Revenue-Focused Hook**: The hero section must address the \$${lead.revenueLossEstimate || 'massive'} revenue bleed directly.
   - **Section Density**: Each section must be rich with content, trust marks, and specific value points. 

5. **TECHNICAL RIGOR**:
   - Semantic HTML5. 
   - Flawless Mobile Responsiveness (absolute necessity).
   - SEO & Social Graph (OG/Schema) perfection.

CLIENT PRD DATA:
${JSON.stringify(prd, null, 2)}

CLIENT CONTEXT:
Business: ${lead.businessName}
Industry: ${lead.industry}
Location: ${lead.location}
Specific Bleed: ${lead.revenueLossEstimate}
Pain Points: ${lead.painPoints?.join(', ')}

OUTPUT REQUIREMENT:
Generate ONLY the raw HTML code. Do not include markdown blocks like \\\`\\\`\\\`html. Start directly with <!DOCTYPE html>.`;

    try {
        const result = await ai.models.generateContent({
            model: "gemini-3-pro-preview",
            contents: [{ role: "user", parts: [{ text: systemPrompt }] }]
        });
        const html = result.text;
        if (!html) throw new Error("Gemini returned empty intelligence profile.");

        // Basic cleanup in case Gemini includes markdown wrappers
        return html.replace(/```html/g, '').replace(/```/g, '').trim();
    } catch (error: any) {
        console.error("Gemini Demo Generation Failed:", error);
        throw new Error(`Failed to generate irrefutable demo: ${error.message}`);
    }
}

/**
 * Saves the generated code and assigns a slug for hosting
 */
export async function saveDemoWebsite(leadId: string, businessName: string, html: string, userId?: string): Promise<string> {
    const shortId = Math.random().toString(36).substring(2, 6);
    const slug = `${businessName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')}-${shortId}`;

    const updatePayload: any = {
        generated_site_code: html,
        slug: slug,
        status: 'DESIGN'
    };

    if (userId) updatePayload.user_id = userId;

    const { error: uuidError } = await supabase
        .from('leads')
        .update(updatePayload)
        .match({ id: leadId });

    // FAILSAFE: If update failed due to UUID mismatch or not found, try by name
    if (uuidError) {
        console.warn(`UUID update failed for ${businessName}, attempting failsafe search by name.`);
        const { error: nameError } = await supabase
            .from('leads')
            .update(updatePayload)
            .match({ name: businessName });

        if (nameError) {
            console.error("Error saving demo (both ID and Name match failed):", nameError);
            throw new Error(`Failed to secure demo in cloud storage: ${nameError.message}`);
        }
    }

    return slug;
}

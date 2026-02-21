/**
 * REVLO SCOUT — WEBSITE PRD GENERATION SERVICE
 * 
 * Takes enrichment dossier data + competitor analysis via Brave Search,
 * feeds it all into Deepseek V3 to generate comprehensive website design PRDs.
 * 
 * Pipeline:
 * 1. Brave Search: Find top competitors in the lead's industry + location
 * 2. Brave Search: Deep-dive each competitor's website (design, features, tech)
 * 3. Brave Search: Research industry-specific web design trends
 * 4. Brave Search: Find best-in-class website examples for inspiration
 * 5. Deepseek V3: Synthesize everything into a comprehensive Website PRD
 * 
 * The output PRD is detailed enough to one-shot develop a $25k-quality website.
 */

import { Lead, WebsitePRD, EnrichmentDossier, EnrichmentJob, PRDPage, PRDSection } from '../types';
import { safeJsonParse } from '../../../utils/safeJson';

// === CONFIGURATION ===
const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY || 'sk-908e1afa07e646e38cfd3599b46ad1b5';
const DEEPSEEK_API_URL = '/api/deepseek/v1/chat/completions';
const BRAVE_SEARCH_API_KEY = import.meta.env.VITE_BRAVE_SEARCH_API_KEY || 'BSAmedYHRIYKEvYgNpqDKMtLH_M73bh';
const BRAVE_SEARCH_URL = '/api/brave/res/v1/web/search';

// === JOB TRACKING (reuse the same pattern from enrichmentService) ===
type JobCallback = (jobs: EnrichmentJob[]) => void;
let activeJobs: EnrichmentJob[] = [];
let jobListeners: JobCallback[] = [];

export function subscribeToPRDJobs(callback: JobCallback): () => void {
    jobListeners.push(callback);
    callback([...activeJobs]);
    return () => { jobListeners = jobListeners.filter(cb => cb !== callback); };
}

function notifyJobListeners() {
    jobListeners.forEach(cb => cb([...activeJobs]));
}

function addJob(lead: Lead): EnrichmentJob {
    const job: EnrichmentJob = {
        id: `prd_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        leadId: lead.id,
        leadName: lead.businessName,
        status: 'queued',
        progress: 0,
        startedAt: Date.now(),
        steps: []
    };
    activeJobs.push(job);
    notifyJobListeners();
    return job;
}

function updateJob(jobId: string, updates: Partial<EnrichmentJob>) {
    activeJobs = activeJobs.map(j => j.id === jobId ? { ...j, ...updates } : j);
    notifyJobListeners();
}

function addJobStep(jobId: string, step: string) {
    activeJobs = activeJobs.map(j => j.id === jobId ? { ...j, steps: [...j.steps, step] } : j);
    notifyJobListeners();
}

export function dismissPRDJob(jobId: string) {
    activeJobs = activeJobs.filter(j => j.id !== jobId);
    notifyJobListeners();
}

// === BRAVE SEARCH ===
async function braveSearch(query: string, count: number = 10): Promise<string> {
    try {
        const params = new URLSearchParams({
            q: query,
            count: String(count),
            text_decorations: 'false',
            search_lang: 'en'
        });
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout for search

        const response = await fetch(`${BRAVE_SEARCH_URL}?${params}`, {
            method: 'GET',
            signal: controller.signal,
            headers: {
                'Accept': 'application/json',
                'Accept-Encoding': 'gzip',
                'X-Subscription-Token': BRAVE_SEARCH_API_KEY
            }
        });
        clearTimeout(timeoutId);
        if (!response.ok) return `Search failed: ${response.statusText}`;
        const data = await response.json();
        const webResults = data.web?.results || [];
        return webResults.map((r: any, i: number) => `[${i + 1}] ${r.title}\nURL: ${r.url}\n${r.description || ''}\n`).join('\n') || 'No results';
    } catch (error: any) {
        return `Search error: ${error.message}`;
    }
}

// === DEEPSEEK V3 ===
async function deepseekReason(systemPrompt: string, userMessage: string, maxTokens: number = 8192): Promise<string> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 90000); // 90s timeout for reasoning

    const response = await fetch(DEEPSEEK_API_URL, {
        method: 'POST',
        signal: controller.signal,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userMessage }
            ],
            temperature: 0.4,
            max_tokens: maxTokens,
            stream: false
        })
    });
    clearTimeout(timeoutId);
    if (!response.ok) throw new Error(`Deepseek API error: ${response.status}`);
    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
}

// === MAIN PRD GENERATION PIPELINE ===
export async function generateWebsitePRD(lead: Lead): Promise<WebsitePRD> {
    const job = addJob(lead);
    const dossier = lead.dossier;

    try {
        // ===================================================
        // PHASE 1: COMPETITOR RESEARCH
        // ===================================================
        updateJob(job.id, { status: 'running', progress: 5 });
        addJobStep(job.id, 'Initiating competitor website reconnaissance...');

        // Search for top competitors by industry+location
        const competitorSearchQuery = `best ${lead.industry} companies ${lead.location} top rated websites`;
        const competitorResults = await braveSearch(competitorSearchQuery, 15);

        updateJob(job.id, { progress: 10 });
        addJobStep(job.id, 'Competitor roster acquired. Analyzing winning websites...');

        // Search for competitor websites design analysis
        const designSearchQuery = `best ${lead.industry} website designs examples ${new Date().getFullYear()} modern professional`;
        const designResults = await braveSearch(designSearchQuery, 10);

        updateJob(job.id, { progress: 15 });

        // Search for industry-specific web design trends
        const trendsQuery = `${lead.industry} website design trends ${new Date().getFullYear()} best practices conversion`;
        const trendsResults = await braveSearch(trendsQuery, 10);

        updateJob(job.id, { progress: 20 });
        addJobStep(job.id, 'Design trends mapped. Researching best-in-class examples...');

        // Search for what makes winning websites in this industry
        const winningQuery = `what makes a great ${lead.industry} website high converting features must have`;
        const winningResults = await braveSearch(winningQuery, 10);

        updateJob(job.id, { progress: 25 });

        // Search for color palettes and design systems for this industry
        const paletteQuery = `${lead.industry} website color palette typography design system modern premium`;
        const paletteResults = await braveSearch(paletteQuery, 8);

        updateJob(job.id, { progress: 30 });
        addJobStep(job.id, 'Brand research complete. Analyzing chatbot and form patterns...');

        // Search for chatbot & contact form best practices
        const chatbotQuery = `best ${lead.industry} website chatbot contact form design conversion optimization`;
        const chatbotResults = await braveSearch(chatbotQuery, 8);

        updateJob(job.id, { progress: 35 });

        // If the lead has a website, search specifically for their competitor's sites
        let competitorSiteAnalysis = '';
        if (dossier?.competitorBenchmark?.topCompetitors?.length) {
            const competitorNames = dossier.competitorBenchmark.topCompetitors.slice(0, 3);
            for (const comp of competitorNames) {
                const compSearch = await braveSearch(`"${comp}" ${lead.location} website features services`, 5);
                competitorSiteAnalysis += `\n=== ${comp} ===\n${compSearch}\n`;
            }
        }

        updateJob(job.id, { progress: 40 });
        addJobStep(job.id, 'All research gathered. Running Deepseek competitor analysis...');

        // ===================================================
        // PHASE 2: DEEPSEEK COMPETITOR ANALYSIS
        // ===================================================
        const competitorAnalysisPrompt = `You are an elite web design strategist. Analyze competitors in the ${lead.industry} industry in ${lead.location}.

Based on the search results below, identify the TOP 3-5 competitors and deeply analyze their websites.

For each competitor, provide:
- What they do well (design, UX, features, content)
- What they do poorly (gaps, missing features, outdated design)
- Their conversion tactics (CTAs, forms, chatbots, popups)
- Their tech stack (if identifiable)
- Why they are winning (specific revenue-driving strategies)

Output ONLY valid JSON:
{
  "competitors": [
    {
      "name": "Company Name",
      "url": "https://...",
      "strengths": ["..."],
      "weaknesses": ["..."],
      "designStyle": "Modern minimalist with bold typography...",
      "keyFeatures": ["..."],
      "estimatedTraffic": "Medium-High",
      "techStack": ["WordPress", "Elementor", "etc"],
      "conversionTactics": ["..."],
      "whyTheyWin": "..."
    }
  ],
  "industryTrends": ["trend 1", "trend 2"],
  "designTrends": ["design trend 1", "design trend 2"],
  "whatWinnersDoDifferently": "Summary paragraph...",
  "strategyForClient": "Strategy for ${lead.businessName} to outperform competitors..."
}`;

        const competitorAnalysisInput = `
LEAD: ${lead.businessName} (${lead.industry}, ${lead.location})
Current Website: ${lead.website || 'NONE'}
Digital Maturity: ${lead.digitalMaturity || 'Unknown'}

=== COMPETITOR SEARCH RESULTS ===
${competitorResults}

=== TOP WEBSITE DESIGN EXAMPLES ===
${designResults}

=== INDUSTRY DESIGN TRENDS ===
${trendsResults}

=== WHAT MAKES WINNERS WIN ===
${winningResults}

=== KNOWN COMPETITOR DEEP DIVES ===
${competitorSiteAnalysis || 'No specific competitor data available'}

=== DOSSIER COMPETITOR INTEL ===
${dossier?.competitorBenchmark ? JSON.stringify(dossier.competitorBenchmark) : 'No prior competitor data'}

Analyze everything. Be specific and actionable.`;

        const rawCompetitorAnalysis = await deepseekReason(competitorAnalysisPrompt, competitorAnalysisInput, 4096);

        updateJob(job.id, { progress: 50 });
        addJobStep(job.id, 'Competitor analysis synthesized. Generating full website PRD...');

        // Parse competitor analysis
        let competitorData;
        try {
            let clean = rawCompetitorAnalysis.trim();
            if (clean.startsWith('```json')) clean = clean.slice(7);
            if (clean.startsWith('```')) clean = clean.slice(3);
            if (clean.endsWith('```')) clean = clean.slice(0, -3);
            const s = clean.indexOf('{'); const e = clean.lastIndexOf('}');
            if (s !== -1 && e !== -1) clean = clean.substring(s, e + 1);
            competitorData = JSON.parse(clean);
        } catch {
            competitorData = {
                competitors: [],
                industryTrends: [],
                designTrends: [],
                whatWinnersDoDifferently: 'Analysis pending',
                strategyForClient: 'Strategy pending'
            };
        }

        // ===================================================
        // PHASE 3: DEEPSEEK FULL WEBSITE PRD GENERATION
        // ===================================================
        updateJob(job.id, { progress: 55 });
        addJobStep(job.id, 'Designing full website architecture...');

        const prdSystemPrompt = `You are a WORLD-CLASS website designer and product strategist at a premium $25,000+ web design agency. You create websites that are so beautiful, so well-thought-out, and so effective that clients are blown away.

Your job: Generate a COMPLETE, EXHAUSTIVE Website Design PRD (Product Requirements Document) for a client. This PRD must be tailored for a high-performance SINGLE PAGE APPLICATION (SPA) / STATIC HTML website. It must be SO DETAILED that a developer can one-shot build the entire website from it — no guessing, no ambiguity.

THIS IS NOT A SIMPLE TEMPLATE. This is a premium, high-conversion masterpiece designed for modern static performance. WEAPONIZE the competitor research. If a competitor has slow load times, outdated design, or poor mobile UX, specifically design the client's site to EXPLOIT those weaknesses.

DESIGN MANDATES:
- Apple.com / Stripe.com / Linear.app level design quality.
- NO ACCIDENTAL WHITE SPACE: Every section must feel intentional and full. Use bento grids, overlapping elements, full-bleed images, and dense, high-value information architecture.
- HIGH-STATUS TYPOGRAPHY: Demand Syne, Outfit, or Bricolage Grotesque.
- CONVERSION-CENTRIC: Every section must serve a psychological purpose (Authority, Scarcity, Proof, Transformation).
- COMPETITOR RECON: Explicitly bridge the client's new site features to specific voids in the competitor's current offerings.

REQUIREMENTS:
1. SPA / Static Focus: The structure should be optimized for a Single Page Application or a collection of high-performance static HTML pages.
2. Minimum 1 massive 'Home' page with 7-10 detailed, immersive sections.
3. Every section specifies: layout, colors, animations, responsive behavior, content.
4. All CTAs are strategically placed for maximum conversion.
5. Contact forms with smart fields relevant to the industry.
6. Chatbot configuration with industry-specific welcome and suggested questions.
7. Full color palette with specific hex codes (NO generic colors - high-status agency palettes only).
8. Typography from Google Fonts (specific font names and weights).
9. Image descriptions with FULL AI generation prompts for mock photos.
10. Micro-animations, scroll effects, parallax, hover states — EVERYTHING specified.
11. Mobile-first responsive breakpoints for every section.
12. SEO strategy with keywords for local dominance.

The website should look like it costs $25,000 but we're building it as a premium demo to wow the client.

OUTPUT: Valid JSON only. No markdown, no explanation. Just the JSON structure.`;

        const prdUserMessage = `
=== CLIENT INFORMATION ===
Business: ${lead.businessName}
Industry: ${lead.industry}
Location: ${lead.location}
Current Website: ${lead.website || 'NONE - Starting from scratch'}
Owner: ${dossier?.ownerName || lead.estimatedOwnerName || 'Unknown'}
Phone: ${dossier?.phoneFound || lead.phoneNumber || 'Unknown'}
Email: ${dossier?.emailFound || lead.email || 'Unknown'}

=== BUSINESS INTELLIGENCE ===
${dossier?.companyOverview || lead.onlinePresenceAnalysis || 'No additional intel'}

=== PAIN POINTS ===
${(dossier?.painPoints || lead.painPoints || []).join('\n- ')}

=== COMPETITOR ANALYSIS ===
${JSON.stringify(competitorData, null, 2)}

=== DESIGN PALETTE RESEARCH ===
${paletteResults}

=== CHATBOT & FORMS RESEARCH ===
${chatbotResults}

=== WHAT WINNING WEBSITES DO ===
${winningResults}

Generate a COMPLETE WebsitePRD JSON with all of the following top-level keys:

{
  "generatedAt": ${Date.now()},
  "version": "1.0",
  "projectName": "${lead.businessName} Website Redesign",
  "clientName": "${lead.businessName}",
  "industry": "${lead.industry}",
  "location": "${lead.location}",
  
  "executiveSummary": "3-5 sentence executive summary of the project vision",
  "projectGoals": ["goal1", "goal2", "goal3", "goal4", "goal5"],
  "targetAudience": "Detailed target audience description",
  "uniqueValueProposition": "What makes this business special",
  
  "competitorAnalysis": { ... from above analysis ... },
  
  "designSystem": {
    "designPhilosophy": "Overall design philosophy description",
    "colorPalette": {
      "primary": "#hex", "secondary": "#hex", "accent": "#hex",
      "background": "#hex", "surface": "#hex", "text": "#hex",
      "textSecondary": "#hex", "success": "#hex", "warning": "#hex",
      "error": "#hex", "gradient": "linear-gradient(...)"
    },
    "typography": {
      "headingFont": "Google Font Name",
      "bodyFont": "Google Font Name", 
      "headingWeight": "700-900",
      "bodyWeight": "400",
      "baseSize": "16px-18px",
      "scaleRatio": "e.g. 1.25 Major Third",
      "lineHeight": "1.5-1.7",
      "letterSpacing": "normal or tight"
    },
    "spacing": { "sectionPadding": "...", "componentGap": "...", "containerMaxWidth": "..." },
    "borderRadius": "...",
    "shadows": "...",
    "iconStyle": "...",
    "imageStyle": "...",
    "buttonStyle": { "primary": "...", "secondary": "...", "ghost": "...", "sizing": "..." }
  },
  
  "pages": [
    {
      "id": "home",
      "name": "Home",
      "slug": "/",
      "title": "SEO Title",
      "metaDescription": "SEO meta description",
      "purpose": "Why this page exists",
      "navigation": { "showInHeader": true, "showInFooter": true, "label": "Home" },
      "sections": [
        {
          "id": "hero",
          "name": "Hero Section",
          "purpose": "First impression, value proposition",
          "layout": "Full-width split layout, text left (60%), image right (40%)",
          "height": "auto min-h-[80vh]",
          "background": { "type": "gradient", "value": "...", "overlay": "..." },
          "content": {
            "headline": { "text": "...", "tag": "h1", "style": "...", "animation": "..." },
            "subheadline": { "text": "...", "style": "..." },
            "bodyText": "...",
            "images": [{ "description": "...", "generationPrompt": "Full detailed prompt for AI image gen", "placement": "...", "dimensions": "...", "style": "..." }]
          },
          "cta": { "primaryText": "...", "primaryAction": "...", "primaryStyle": "...", "secondaryText": "...", "secondaryAction": "...", "placement": "..." },
          "animations": { "entrance": "...", "hover": "...", "scroll": "...", "parallax": true/false, "microInteractions": ["..."] },
          "responsive": { "mobile": "...", "tablet": "...", "desktop": "..." }
        }
        // ... 5-10 more sections PER PAGE
      ]
    }
    // ... minimum 5 pages total
  ],
  
  "globalComponents": {
    "header": { "style": "...", "sticky": true, "transparent": true, "logo": "...", "navItems": [...], "ctaButton": "...", "mobileMenu": "...", "animation": "..." },
    "footer": { "style": "...", "columns": [...], "socialLinks": [...], "copyright": "...", "newsletter": true },
    "chatbot": { "enabled": true, "position": "...", "triggerText": "...", "welcomeMessage": "...", "brandColor": "#hex", "avatar": "...", "suggestedQuestions": [...] },
    "cookieBanner": { "enabled": true, "text": "...", "style": "..." }
  },
  
  "forms": [
    { "id": "contact", "name": "Contact Form", "page": "contact", "fields": [...], "submitButton": "...", "successMessage": "...", "style": "..." },
    { "id": "quote", "name": "Get a Quote", "page": "home", "fields": [...], "submitButton": "...", "successMessage": "...", "style": "..." }
  ],
  
  "seoStrategy": { "primaryKeywords": [...], "secondaryKeywords": [...], "localSEO": true, "schemaMarkup": [...], "ogImage": "...", "twitterCard": "..." },
  "performanceSpecs": { "targetLoadTime": "...", "lazyLoading": true, "imageOptimization": "...", "caching": "...", "cdn": true },
  
  "imagePrompts": [
    { "id": "hero-main", "page": "Home", "section": "Hero", "description": "...", "prompt": "Professional ${lead.industry} photo, ...", "dimensions": "1920x1080", "style": "..." }
    // ... 8-15 image prompts covering all pages
  ],
  
  "techStack": { "framework": "...", "styling": "...", "hosting": "...", "analytics": "...", "forms": "...", "chatbot": "..." },
  "launchChecklist": ["item1", "item2", ...],
  "researchSources": ["source1", "source2", ...]
}

CRITICAL: Every section must have SPECIFIC, ACTIONABLE details. No placeholders like "TBD" or "insert here". Every color is a real hex code. Every font is a real Google Font. Every image prompt is detailed enough to generate a usable image. Every animation is specifically described. This PRD must be production-ready.

Generate the COMPLETE JSON now.`;

        // Use max tokens for this massive generation - Deepseek V3 typically caps output at 8k
        const rawPRD = await deepseekReason(prdSystemPrompt, prdUserMessage, 8192);

        updateJob(job.id, { progress: 85 });
        addJobStep(job.id, 'PRD core generated. Parsing and validating...');

        // ===================================================
        // PHASE 4: PARSE AND VALIDATE
        // ===================================================
        let prd: WebsitePRD;
        try {
            let clean = rawPRD.trim();
            // Handle markdown code blocks
            clean = clean.replace(/^```json\n?/, '').replace(/```$/, '');

            const s = clean.indexOf('{');
            const e = clean.lastIndexOf('}');
            if (s !== -1 && e !== -1) {
                clean = clean.substring(s, e + 1);
            }

            // ADVANCED RECOVERY: Balance braces for truncated JSON
            let openBraces = 0;
            let bracketLevel = 0;
            let balanced = "";
            for (let i = 0; i < clean.length; i++) {
                const char = clean[i];
                if (char === '{') openBraces++;
                if (char === '}') openBraces--;
                if (char === '[') bracketLevel++;
                if (char === ']') bracketLevel--;
                balanced += char;
                if (openBraces === 0 && bracketLevel === 0 && i > 0) break;
            }

            // If still open, try to force close it
            if (openBraces > 0) {
                balanced = balanced.trim();
                // If it ends mid-string or mid-property, this is risky but better than failing
                while (openBraces > 0) {
                    balanced += " }";
                    openBraces--;
                }
            }

            const parsed = safeJsonParse<any>(balanced, {});

            // Ensure competitor analysis is merged
            if (!parsed.competitorAnalysis || !parsed.competitorAnalysis.competitors?.length) {
                parsed.competitorAnalysis = competitorData;
            }

            // Validate and fill defaults
            prd = {
                generatedAt: parsed.generatedAt || Date.now(),
                version: parsed.version || '1.0',
                projectName: parsed.projectName || `${lead.businessName} Website`,
                clientName: parsed.clientName || lead.businessName,
                industry: parsed.industry || lead.industry,
                location: parsed.location || lead.location,
                executiveSummary: parsed.executiveSummary || 'PRD generation in progress...',
                projectGoals: parsed.projectGoals || [],
                targetAudience: parsed.targetAudience || `${lead.industry} customers in ${lead.location}`,
                uniqueValueProposition: parsed.uniqueValueProposition || '',
                competitorAnalysis: {
                    competitors: (parsed.competitorAnalysis?.competitors || competitorData.competitors || []).map((c: any) => ({
                        name: c.name || 'Unknown',
                        url: c.url || '',
                        strengths: c.strengths || [],
                        weaknesses: c.weaknesses || [],
                        designStyle: c.designStyle || '',
                        keyFeatures: c.keyFeatures || [],
                        estimatedTraffic: c.estimatedTraffic || 'Unknown',
                        techStack: c.techStack || [],
                        conversionTactics: c.conversionTactics || [],
                        whyTheyWin: c.whyTheyWin || ''
                    })),
                    industryTrends: parsed.competitorAnalysis?.industryTrends || competitorData.industryTrends || [],
                    designTrends: parsed.competitorAnalysis?.designTrends || competitorData.designTrends || [],
                    whatWinnersDoDifferently: parsed.competitorAnalysis?.whatWinnersDoDifferently || competitorData.whatWinnersDoDifferently || '',
                    strategyForClient: parsed.competitorAnalysis?.strategyForClient || competitorData.strategyForClient || ''
                },
                designSystem: parsed.designSystem || buildDefaultDesignSystem(lead),
                pages: (parsed.pages || []).map((p: any) => ({
                    id: p.id || `page_${Math.random().toString(36).substr(2, 6)}`,
                    name: p.name || 'Untitled Page',
                    slug: p.slug || '/',
                    title: p.title || p.name || 'Untitled',
                    metaDescription: p.metaDescription || '',
                    purpose: p.purpose || '',
                    navigation: p.navigation || { showInHeader: true, showInFooter: true, label: p.name || 'Page' },
                    sections: (p.sections || []).map((s: any) => ({
                        id: s.id || `section_${Math.random().toString(36).substr(2, 6)}`,
                        name: s.name || 'Section',
                        purpose: s.purpose || '',
                        layout: s.layout || 'Full width centered',
                        height: s.height || 'auto',
                        background: s.background || { type: 'solid', value: '#ffffff' },
                        content: s.content || {},
                        cta: s.cta || undefined,
                        animations: s.animations || { entrance: 'fade-up', parallax: false },
                        responsive: s.responsive || { mobile: 'Stack vertically', tablet: 'Two columns', desktop: 'Full layout' }
                    }))
                })),
                globalComponents: parsed.globalComponents || buildDefaultGlobalComponents(lead),
                forms: parsed.forms || [],
                seoStrategy: parsed.seoStrategy || { primaryKeywords: [], secondaryKeywords: [], localSEO: true, schemaMarkup: [], ogImage: '', twitterCard: '' },
                performanceSpecs: parsed.performanceSpecs || { targetLoadTime: '<3s', lazyLoading: true, imageOptimization: 'WebP + AVIF', caching: 'Service Worker', cdn: true },
                imagePrompts: parsed.imagePrompts || [],
                techStack: parsed.techStack || { framework: 'Vanilla Static HTML + Tailwind CSS', styling: 'Tailwind CSS JIT', hosting: 'Static Storage + Global CDN (Orgo)', analytics: 'Privacy-focused Static', forms: 'API-driven Serverless', chatbot: 'Lightweight Static Overlay' },
                launchChecklist: parsed.launchChecklist || [],
                researchSources: [competitorSearchQuery, designSearchQuery, trendsQuery, winningQuery, paletteQuery, chatbotQuery]
            };

            // CRITICAL DEFENSE: If AI returned < 4 sections, trigger the hyper-personalized fallback
            // We need at least 4 sections to constitute a "premium demo".
            if (!prd.pages || prd.pages.length === 0 || (prd.pages[0].sections?.length || 0) < 4) {
                console.warn('PRD output too brief or missing content. Triggering personalized fallback.');
                prd = buildFallbackPRD(lead, competitorData, rawPRD);
            }
        } catch (parseError) {
            console.error('Failed to parse PRD JSON:', parseError, '\nRaw:', rawPRD.substring(0, 500));
            prd = buildFallbackPRD(lead, competitorData, rawPRD);
        }

        updateJob(job.id, { status: 'complete', progress: 100, completedAt: Date.now() });
        addJobStep(job.id, '✓ Website Design PRD generated successfully.');
        setTimeout(() => dismissPRDJob(job.id), 30000);

        return prd;

    } catch (error: any) {
        console.error('PRD generation pipeline failed:', error);
        updateJob(job.id, { status: 'failed', progress: 0 });
        addJobStep(job.id, `✗ PRD generation failed: ${error.message}`);
        setTimeout(() => dismissPRDJob(job.id), 15000);
        throw error;
    }
}

// === DEFAULT BUILDERS ===
function buildDefaultDesignSystem(lead: Lead) {
    return {
        designPhilosophy: `Premium, modern, and trustworthy design for ${lead.industry}`,
        colorPalette: {
            primary: '#6366F1',
            secondary: '#4338CA',
            accent: '#F43F5E',
            background: '#020617',
            surface: '#0F172A',
            text: '#F8FAFC',
            textSecondary: '#94A3B8',
            success: '#10B981',
            warning: '#F59E0B',
            error: '#EF4444',
            gradient: 'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)'
        },
        typography: {
            headingFont: 'Syne',
            bodyFont: 'Outfit',
            headingWeight: '800',
            bodyWeight: '400',
            baseSize: '16px',
            scaleRatio: '1.25 Major Third',
            lineHeight: '1.6',
            letterSpacing: '-0.02em'
        },
        spacing: {
            sectionPadding: '80px 0',
            componentGap: '24px',
            containerMaxWidth: '1280px'
        },
        borderRadius: '12px',
        shadows: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
        iconStyle: 'Lucide, outlined, 24px stroke-width-2',
        imageStyle: 'rounded-2xl, subtle shadow, object-cover',
        buttonStyle: {
            primary: 'bg-primary text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all',
            secondary: 'border-2 border-primary text-primary px-8 py-4 rounded-xl font-bold hover:bg-primary hover:text-white',
            ghost: 'text-primary hover:bg-primary/10 px-6 py-3 rounded-lg font-medium',
            sizing: 'min-height 48px, min-width 160px'
        }
    };
}

function buildDefaultGlobalComponents(lead: Lead) {
    return {
        header: {
            style: 'Glassmorphism navbar with backdrop blur',
            sticky: true,
            transparent: true,
            logo: `${lead.businessName} logo, left-aligned`,
            navItems: ['Home', 'About', 'Services', 'Portfolio', 'Contact'],
            ctaButton: 'Get a Free Quote',
            mobileMenu: 'Slide-in from right with overlay',
            animation: 'Shrink on scroll, bg becomes solid white'
        },
        footer: {
            style: 'Dark footer with 4-column layout',
            columns: [
                { title: 'Company', links: ['About Us', 'Our Team', 'Careers'] },
                { title: 'Services', links: ['Service 1', 'Service 2', 'Service 3'] },
                { title: 'Resources', links: ['Blog', 'FAQ', 'Support'] },
                { title: 'Contact', links: ['Phone', 'Email', 'Location'] }
            ],
            socialLinks: ['Facebook', 'Instagram', 'LinkedIn', 'Google Business'],
            copyright: `© ${new Date().getFullYear()} ${lead.businessName}. All rights reserved.`,
            newsletter: true
        },
        chatbot: {
            enabled: true,
            position: 'bottom-right',
            triggerText: `👋 Hi! How can ${lead.businessName} help you today?`,
            welcomeMessage: `Welcome to ${lead.businessName}! I'm here to answer your questions and help you get started.`,
            brandColor: '#2563EB',
            avatar: 'Friendly professional avatar matching brand colors',
            suggestedQuestions: [
                'What services do you offer?',
                'How much does it cost?',
                'Can I get a free estimate?',
                'What areas do you serve?'
            ]
        },
        cookieBanner: {
            enabled: true,
            text: 'We use cookies to enhance your experience. By continuing, you agree to our cookie policy.',
            style: 'Bottom bar, subtle dark style, accept/decline buttons'
        }
    };
}

function buildFallbackPRD(lead: Lead, competitorData: any, rawPRD: string): WebsitePRD {
    const industry = lead.industry || 'Service-Based';
    const location = lead.location || 'Local Market';
    const name = lead.businessName;
    const dossier = lead.dossier;

    // Build a more personalized fallback if the AI fails
    const sections: PRDSection[] = [
        {
            id: 'hero',
            name: 'Hero Section',
            purpose: 'Capture attention and establish UVP',
            layout: 'Premium centered split-layout with glassmorphism',
            height: 'auto min-h-[70vh]',
            background: { type: 'gradient', value: 'linear-gradient(135deg, #020617 0%, #0F172A 100%)' },
            content: {
                headline: { text: `The Premier ${industry} Authority in ${location}`, tag: 'h1', style: 'text-7xl font-black italic tracking-tighter text-white' },
                subheadline: { text: lead.onlinePresenceAnalysis?.substring(0, 150) || `Elevating ${industry} standards through expert infrastructure and dedicated service in ${location}.`, style: 'text-xl text-slate-400 max-w-2xl mx-auto' },
                bodyText: `Experience why ${name} is the most trusted name in the industry.`
            },
            cta: { primaryText: 'Initialize Protocol', primaryAction: '#contact', primaryStyle: 'btn-tactical-purple', placement: 'Center' },
            animations: { entrance: 'fade-up', parallax: true },
            responsive: { mobile: 'Stacked View', tablet: 'Split Layout', desktop: 'Full Wide immersive' }
        },
        {
            id: 'social-proof',
            name: 'Social Proof Ecosystem',
            purpose: 'Build immediate trust via reviews and partners',
            layout: 'Infinite marquee for logos + Grid for testimonials',
            height: 'auto',
            background: { type: 'solid', value: '#08090B' },
            content: {
                headline: { text: 'Market Dominance Certified', tag: 'h2', style: 'text-xs font-black uppercase tracking-[0.4em] text-slate-600' },
                bodyText: `Join 1,000+ satisfied clients who trust ${name} for their ${industry} needs.`
            },
            animations: { entrance: 'fade-in' },
            responsive: { mobile: 'Single Column', tablet: 'Grid 2-col', desktop: 'Full Marquee' }
        }
    ];

    // Add Pain Point Section if we have data
    const painPoints = dossier?.painPoints || lead.painPoints || [];
    if (painPoints.length > 0) {
        sections.push({
            id: 'solutions',
            name: 'The Problem-Solution Matrix',
            purpose: 'Address market deficits and offer relief',
            layout: 'Bento-style 3-column grid with hover transformations',
            height: 'auto',
            background: { type: 'pattern', value: 'Subtle blueprint grid' },
            content: {
                headline: { text: 'Eradicating Sectoral Inefficiency', tag: 'h2', style: 'text-4xl font-black' },
                cards: painPoints.slice(0, 3).map((p, i) => ({
                    title: `Solving: ${p.substring(0, 30)}`,
                    description: 'Our proprietary methodology ensures these historical bottlenecks are solved permanently.',
                    icon: ['Zap', 'Shield', 'TrendingUp'][i % 3],
                    style: 'Glass Bento'
                }))
            },
            animations: { entrance: 'stagger-up' },
            responsive: { mobile: 'Vertically Stacked', tablet: '2-Col Grid', desktop: '3-Col Interactive Grid' }
        });
    }

    // Add Core Services
    sections.push({
        id: 'capabilities',
        name: 'Strategic Capabilities',
        purpose: 'Detailed service offering breakdown',
        layout: 'Vertical stack with sticky imagery and side content',
        height: 'auto',
        background: { type: 'solid', value: '#0A0A0C' },
        content: {
            headline: { text: `Comprehensive ${industry} Modules`, tag: 'h2', style: 'text-4xl font-bold' },
            bodyText: `Direct, expert execution of all ${industry} protocols required for market leadership.`
        },
        animations: { entrance: 'slide-left' },
        responsive: { mobile: 'Stacked', tablet: 'Alternating Rows', desktop: 'Alternating Rows with parallax' }
    });

    // Add FAQ
    sections.push({
        id: 'faq',
        name: 'Intelligence Node (FAQ)',
        purpose: 'Answer common questions and reduce friction',
        layout: 'Accordion-style list with minimalist borders',
        height: 'auto',
        background: { type: 'solid', value: '#08090B' },
        content: {
            headline: { text: 'Common Clarifications', tag: 'h3', style: 'text-2xl font-bold' },
            bodyText: 'Transparency is our standard protocol.'
        },
        animations: { entrance: 'fade-in' },
        responsive: { mobile: 'Full Width', tablet: 'Centered Max-Width', desktop: 'Two-Column Grid' }
    });

    // Add Final Conversion
    sections.push({
        id: 'contact',
        name: 'The Nexus (Conversion)',
        purpose: 'Capture leads and initiate engagement',
        layout: 'High-contrast split layout: Global HQ Info + Contact Interface',
        height: 'auto',
        background: { type: 'gradient', value: 'linear-gradient(to bottom, #0A0A0C, #020617)' },
        content: {
            headline: { text: 'Initiate Your Transformation', tag: 'h2', style: 'text-5xl font-black' },
            bodyText: `Ready to dominate ${location}? Secure your session with ${name} today.`
        },
        cta: { primaryText: 'Send Transmission', primaryAction: 'submit', primaryStyle: 'btn-tactical-purple', placement: 'Form Footer' },
        animations: { entrance: 'fade-up' },
        responsive: { mobile: 'Stacked Form', tablet: 'Split Content/Form', desktop: 'High-Focus Centered' }
    });

    return {
        generatedAt: Date.now(),
        version: '1.2-personalized-fallback',
        projectName: `${lead.businessName} Website Strategy`,
        clientName: lead.businessName,
        industry: lead.industry,
        location: lead.location,
        executiveSummary: `Hyper-personalized website blueprint for ${lead.businessName}. This SPA architecture is surgically designed to solve ${industry}-specific challenges in ${location}, leveraging existing market data and dossier intelligence.`,
        projectGoals: [
            `Establish absolute digital authority for ${name} in ${location}`,
            `Solve market pain points: ${painPoints.slice(0, 2).join(', ')}`,
            'High-conversion SPA funnel for rapid lead generation',
            'Mobile-first responsive excellence',
            'Direct local SEO dominance'
        ],
        targetAudience: `Decision makers seeking professional ${industry} services in ${location}.`,
        uniqueValueProposition: dossier?.tailoredPitch?.substring(0, 200) || `${lead.businessName} provides superior ${industry} solutions in ${location} with an emphasis on reliability and proven ROI.`,
        competitorAnalysis: competitorData,
        designSystem: buildDefaultDesignSystem(lead),
        pages: [
            {
                id: 'home',
                name: 'Landing Page',
                slug: '/',
                title: `${lead.businessName} | ${industry} Authority in ${location}`,
                metaDescription: `Surgically optimized landing page for ${lead.businessName}. The most trusted name in ${industry} across ${location}.`,
                purpose: 'Primary conversion environment',
                navigation: { showInHeader: true, showInFooter: true, label: 'Home' },
                sections
            }
        ],
        globalComponents: buildDefaultGlobalComponents(lead),
        forms: [
            { id: 'nexus-form', name: 'Strategic Protocol Form', page: 'home', fields: [{ name: 'name', type: 'text', placeholder: 'Identity', required: true }, { name: 'email', type: 'email', placeholder: 'Encrypted Email', required: true }, { name: 'intel', type: 'textarea', placeholder: 'Inquiry Details', required: true }], submitButton: 'Initiate Link', successMessage: 'Intelligence received. Standing by.', style: 'Tactical Glass' }
        ],
        seoStrategy: { primaryKeywords: [lead.industry, lead.location, lead.businessName], secondaryKeywords: [], localSEO: true, schemaMarkup: ['LocalBusiness'], ogImage: '', twitterCard: '' },
        performanceSpecs: { targetLoadTime: '<800ms', lazyLoading: true, imageOptimization: 'Static WebP', caching: 'Edge Network', cdn: true },
        imagePrompts: [],
        techStack: { framework: 'Static HTML + Tailwind (SPA Architecture)', styling: 'Tailwind CSS JIT', hosting: 'Orgo Cloud Storage', analytics: 'Zero-JS Privacy Analytics', forms: 'Severless API Handlers', chatbot: 'Custom Lightweight UI' },
        launchChecklist: ['Domain DNS validation', 'SSL certificate deployment', 'Form functionality QA', 'Local SEO schema audit', 'Mobile performance verify'],
        researchSources: []
    };
}

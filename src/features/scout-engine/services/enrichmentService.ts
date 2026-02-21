/**
 * REVLO SCOUT — DEEP ENRICHMENT SERVICE
 * 
 * Uses Deepseek V3 as the reasoning engine with Brave Search API as its research tool.
 * Each enrichment job performs multi-step deep research:
 * 1. Search for the business
 * 2. Analyze their web presence, reviews, competitors
 * 3. Find decision makers & contact info
 * 4. Build an enriched dossier with tailored Revlo offer
 */

import { Lead, EnrichmentDossier, RevloOffer, EnrichmentJob } from '../types';
import { safeJsonParse } from '../../../utils/safeJson';

// === CONFIGURATION ===
const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY || 'sk-908e1afa07e646e38cfd3599b46ad1b5';
const DEEPSEEK_API_URL = '/api/deepseek/v1/chat/completions';
const BRAVE_SEARCH_API_KEY = import.meta.env.VITE_BRAVE_SEARCH_API_KEY || 'BSAmedYHRIYKEvYgNpqDKMtLH_M73bh';
const BRAVE_SEARCH_URL = '/api/brave/res/v1/web/search';

// === REVLO SERVICE CATALOG (Used for offer matching) ===
const REVLO_SERVICES: RevloOffer[] = [
    {
        id: 'openclaw',
        name: 'OpenClaw — Autonomous AI Agents',
        url: 'https://www.wearerevlo.com/openclaw',
        description: 'Deploy fully autonomous AI agents (OpenClaw) that operate your business systems 24/7. Revenue-generating browser automation, operational dominance, and wealth generation with ZERO human intervention. Custom AI agents built under RevloClaw infrastructure.',
        idealFor: ['Businesses drowning in repetitive tasks', 'Companies needing 24/7 operations', 'Businesses wanting AI-powered automation', 'Companies looking to scale without hiring', 'Businesses needing autonomous browser control'],
        priceRange: '$2,500 - $15,000+/mo',
        keyBenefits: ['Zero human intervention needed', 'Revenue generation on autopilot', 'Autonomous browser control', 'Custom AI agent deployment', 'Orgo Cloud infrastructure']
    },
    {
        id: 'ghl-automation',
        name: 'GHL Automation — AI-Powered CRM & Marketing',
        url: 'https://www.wearerevlo.com/ghl-automation',
        description: 'Full GoHighLevel CRM setup with AI automation. Automated follow-ups, AI appointment booking, reputation management, review generation, and complete sales pipeline automation. Turn leads into customers on autopilot.',
        idealFor: ['Service businesses with no CRM', 'Companies losing leads to slow follow-up', 'Businesses with poor review management', 'Companies needing automated appointment booking', 'Businesses wanting AI chatbots for lead capture'],
        priceRange: '$997 - $2,500/mo',
        keyBenefits: ['AI-powered follow-up sequences', 'Automated appointment booking', 'Reputation management & review generation', 'Sales pipeline automation', 'AI chatbot for lead capture']
    },
    {
        id: 'elite-development',
        name: 'Elite Development Lab — Custom Software & AI',
        url: 'https://www.wearerevlo.com/elite-development',
        description: 'IPO-grade AI development lab. Deploy market-ready AI systems in 3-5 weeks. Custom software, AI integrations, SaaS platforms, and enterprise solutions. Direct founder access, zero technical debt, 100% IP ownership.',
        idealFor: ['Startups needing custom AI solutions', 'Businesses wanting proprietary software', 'Companies needing SaaS platforms built', 'Enterprise clients needing custom integrations', 'Businesses wanting to productize their service'],
        priceRange: '$1,500 - $25,000+',
        keyBenefits: ['3-5 week delivery', '100% IP ownership', 'Direct founder access', 'Institutional-grade code', 'AI-first architecture']
    },
    {
        id: 'websites',
        name: 'Website Design & Development',
        url: 'https://www.wearerevlo.com/websites',
        description: 'Premium website design and development. High-converting landing pages, full business websites, e-commerce stores, and web applications. SEO-optimized, mobile-first, blazing fast performance.',
        idealFor: ['Businesses with no website', 'Companies with outdated websites', 'Businesses with poor mobile experience', 'Companies needing landing pages', 'Businesses wanting e-commerce capabilities'],
        priceRange: '$500 - $5,000',
        keyBenefits: ['SEO-optimized from day one', 'Mobile-first responsive design', 'Blazing fast performance', 'Conversion-optimized layouts', 'Modern premium aesthetics']
    }
];

// === JOB MANAGEMENT ===
type JobCallback = (jobs: EnrichmentJob[]) => void;
let activeJobs: EnrichmentJob[] = [];
let jobListeners: JobCallback[] = [];

export function subscribeToJobs(callback: JobCallback): () => void {
    jobListeners.push(callback);
    callback([...activeJobs]);
    return () => {
        jobListeners = jobListeners.filter(cb => cb !== callback);
    };
}

function notifyJobListeners() {
    const snapshot = [...activeJobs];
    jobListeners.forEach(cb => cb(snapshot));
}

function addJob(lead: Lead): EnrichmentJob {
    const job: EnrichmentJob = {
        id: `job_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
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
    activeJobs = activeJobs.map(j => {
        if (j.id === jobId) {
            return { ...j, steps: [...j.steps, step] };
        }
        return j;
    });
    notifyJobListeners();
}

export function getActiveJobs(): EnrichmentJob[] {
    return [...activeJobs];
}

export function dismissJob(jobId: string) {
    activeJobs = activeJobs.filter(j => j.id !== jobId);
    notifyJobListeners();
}

// === BRAVE SEARCH ===
async function braveSearch(query: string): Promise<string> {
    try {
        const params = new URLSearchParams({
            q: query,
            count: '10',
            text_decorations: 'false',
            search_lang: 'en'
        });

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 45000); // 45s search timeout

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

        if (!response.ok) {
            console.error(`Brave Search failed: ${response.status} ${response.statusText}`);
            return `Search failed: ${response.statusText}`;
        }

        const data = await response.json();

        // Extract web results
        const webResults = data.web?.results || [];
        const formattedResults = webResults.map((r: any, i: number) => {
            return `[${i + 1}] ${r.title}\nURL: ${r.url}\n${r.description || ''}\n`;
        }).join('\n');

        // Extract news if available
        const newsResults = data.news?.results || [];
        const formattedNews = newsResults.length > 0
            ? '\n--- RECENT NEWS ---\n' + newsResults.map((n: any) => `• ${n.title}: ${n.description || ''}`).join('\n')
            : '';

        return formattedResults + formattedNews || 'No results found';
    } catch (error: any) {
        console.error('Brave Search error:', error);
        return `Search error: ${error.message}`;
    }
}

// === DEEPSEEK V3 REASONING ===
async function deepseekReason(systemPrompt: string, userMessage: string): Promise<string> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 90000); // 90s reasoning timeout

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
                temperature: 0.3,
                max_tokens: 4096,
                stream: false
            })
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            const errText = await response.text();
            console.error('Deepseek API error:', errText);
            throw new Error(`Deepseek API error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices?.[0]?.message?.content || '';
    } catch (error: any) {
        console.error('Deepseek reasoning error:', error);
        throw error;
    }
}

// === MAIN ENRICHMENT PIPELINE ===
export async function deepEnrichLead(lead: Lead): Promise<EnrichmentDossier> {
    const job = addJob(lead);

    try {
        // STEP 1: Initial Business Research
        updateJob(job.id, { status: 'running', progress: 10 });
        addJobStep(job.id, 'Initiating Brave Search reconnaissance...');

        const businessQuery = `"${lead.businessName}" ${lead.location} business`;
        const businessResults = await braveSearch(businessQuery);

        updateJob(job.id, { progress: 20 });
        addJobStep(job.id, 'Business intelligence acquired. Scanning web presence...');

        // STEP 2: Website & Reviews Analysis
        const reviewQuery = `"${lead.businessName}" ${lead.location} reviews rating`;
        const reviewResults = await braveSearch(reviewQuery);

        updateJob(job.id, { progress: 35 });
        addJobStep(job.id, 'Review data collected. Searching for decision makers...');

        // STEP 3: Find Owner / Decision Maker
        const ownerQuery = `"${lead.businessName}" ${lead.location} owner founder CEO contact`;
        const ownerResults = await braveSearch(ownerQuery);

        updateJob(job.id, { progress: 50 });
        addJobStep(job.id, 'Decision maker intel gathered. Analyzing competitors...');

        // STEP 4: Competitor Analysis
        const competitorQuery = `${lead.industry} ${lead.location} top companies competitors`;
        const competitorResults = await braveSearch(competitorQuery);

        updateJob(job.id, { progress: 65 });
        addJobStep(job.id, 'Competitor landscape mapped. Running Deepseek analysis...');

        // STEP 5: Social Media Presence
        const socialQuery = `"${lead.businessName}" site:facebook.com OR site:instagram.com OR site:linkedin.com`;
        const socialResults = await braveSearch(socialQuery);

        updateJob(job.id, { progress: 75 });
        addJobStep(job.id, 'Social profiles identified. Generating deep dossier...');

        // STEP 6: DEEPSEEK REASONING — Analyze everything and generate dossier
        const analysisSystemPrompt = `You are an elite business intelligence analyst for REVLO — a premium AI development agency specializing in \$25,000+ custom deployments.
Your task is to deeply analyze a business lead and produce a "Scarily-Specific" enrichment dossier.

REVLO'S SERVICE CATALOG:
${REVLO_SERVICES.map(s => `
SERVICE: ${s.name}
URL: ${s.url}
DESCRIPTION: ${s.description}
IDEAL FOR: ${s.idealFor.join(', ')}
PRICE: ${s.priceRange}
KEY BENEFITS: ${s.keyBenefits.join(', ')}
`).join('\n---\n')}

YOU MUST output ONLY a valid JSON object. No markdown, no explanation, just JSON.
Your analysis must be FORENSIC. Do not be generic. If you find a competitor, find their URL. If you find a pain point, explain the REVENUE IMPACT.

The JSON must follow this exact structure:
{
  "companyOverview": "A detailed 3-5 sentence overview. Mention their specific niche and what makes them unique in ${lead.location}.",
  "ownerName": "Full name of the owner/decision maker if found. Check 'About Us' or LinkedIn results.",
  "ownerTitle": "Exact title found.",
  "ownerLinkedIn": "LinkedIn URL if found.",
  "emailFound": "Direct email if found.",
  "phoneFound": "Phone number if found.",
  "websiteAnalysis": {
    "hasWebsite": true/false,
    "websiteQuality": "None" | "Poor" | "Average" | "Good" | "Excellent",
    "mobileOptimized": true/false/null,
    "hasSSL": true/false/null,
    "loadSpeed": "Fast" | "Average" | "Slow" | "Unknown",
    "seoScore": "Weak" | "Average" | "Strong" | "Unknown",
    "issues": ["Forensic list of specific technical or design flaws (e.g., 'Broken nav on iPhone 14', 'Zero meta descriptions', 'No HTTPS')"]
  },
  "socialPresence": {
    "facebook": "URL or null",
    "instagram": "URL or null",
    "linkedin": "URL or null",
    "tiktok": "URL or null",
    "googleBusiness": "URL or null",
    "socialScore": 0-100,
    "issues": ["Specific social flaws (e.g., 'Last post in 2021', 'Unanswered negative reviews in top 3 positions')"]
  },
  "reviewAnalysis": {
    "googleRating": number or null,
    "googleReviewCount": number or null,
    "yelpRating": number or null,
    "averageSentiment": "Positive" | "Mixed" | "Negative" | "No Reviews",
    "commonComplaints": ["Exact recurring phrases from customers"],
    "commonPraises": ["Exact recurring phrases from customers"]
  },
  "competitorBenchmark": {
    "topCompetitors": ["Names of specific local competitors found"],
    "competitorUrls": ["Exact URLs of competitors"],
    "competitorAdvantages": ["Specific features/strategies where they are outperforming the lead"],
    "competitorFlaws": ["Specific weaknesses in competitor sites/presence that we can EXPLOIT in our design"],
    "marketGaps": ["Winning strategies currently missing from this entire local market"]
  },
  "painPoints": ["Surgical list of pain points with estimated REVENUE BLEED (e.g., 'Missing \$4k/mo due to no online booking')"],
  "opportunityScore": 0-100,
  "revloRecommendation": {
    "primaryService": "openclaw" | "ghl-automation" | "elite-development" | "websites",
    "primaryServiceName": "Full service name from catalog",
    "secondaryService": "optional secondary service id or null",
    "reasoning": "Data-backed explanation for the choice.",
    "estimatedImpact": "Measurable revenue or efficiency gain.",
    "urgency": "Critical" | "High" | "Medium" | "Low"
  },
  "tailoredPitch": "A high-status, personal pitch based on these findings. Reference the owner by name (${lead.estimatedOwnerName || 'the owner'}), mention a specific competitor by name, and highlight the exact revenue bleed identified.",
  "coldEmailSubject": "A compelling, high-open-rate subject line.",
  "followUpAngles": ["3 different follow-up conversation angles."]
}`;

        const analysisUserMessage = `
LEAD DATA:
- Business Name: ${lead.businessName}
- Industry: ${lead.industry}
- Location: ${lead.location}
- Current Website: ${lead.website || 'NONE'}
- Current Phone: ${lead.phoneNumber || 'UNKNOWN'}
- Current Email: ${lead.email || 'UNKNOWN'}
- Current Owner: ${lead.estimatedOwnerName || 'UNKNOWN'}
- Current Digital Maturity: ${lead.digitalMaturity || 'Unknown'}
- Current Lead Score: ${lead.leadScore}

BRAVE SEARCH INTELLIGENCE:

=== BUSINESS SEARCH RESULTS ===
${businessResults}

=== REVIEW DATA ===
${reviewResults}

=== OWNER / DECISION MAKER SEARCH ===
${ownerResults}

=== COMPETITOR LANDSCAPE ===
${competitorResults}

=== SOCIAL MEDIA PRESENCE ===
${socialResults}

Analyze ALL of the above data carefully. Cross-reference results. Build a comprehensive dossier.
Match the best REVLO service to this lead's specific needs. Be specific and data-driven.
Output ONLY valid JSON.`;

        const rawAnalysis = await deepseekReason(analysisSystemPrompt, analysisUserMessage);

        updateJob(job.id, { progress: 90 });
        addJobStep(job.id, 'Dossier compiled. Finalizing intelligence report...');

        // Parse the Deepseek response
        let dossier: EnrichmentDossier;
        try {
            // Clean any markdown wrapping and extract the main object
            let cleanJson = rawAnalysis.trim();
            cleanJson = cleanJson.replace(/^```json\n?/, '').replace(/```$/, '');

            const startIdx = cleanJson.indexOf('{');
            const endIdx = cleanJson.lastIndexOf('}');
            if (startIdx !== -1 && endIdx !== -1) {
                cleanJson = cleanJson.substring(startIdx, endIdx + 1);
            }

            const parsed = safeJsonParse<any>(cleanJson, {});

            // Map the recommended service to include the full offer details
            const recommendedService = REVLO_SERVICES.find(s => s.id === parsed.revloRecommendation?.primaryService) || REVLO_SERVICES[3];
            const secondaryService = parsed.revloRecommendation?.secondaryService
                ? REVLO_SERVICES.find(s => s.id === parsed.revloRecommendation.secondaryService)
                : null;

            dossier = {
                companyOverview: parsed.companyOverview || 'Research in progress...',
                ownerName: parsed.ownerName || lead.estimatedOwnerName,
                ownerTitle: parsed.ownerTitle || null,
                ownerLinkedIn: parsed.ownerLinkedIn || null,
                emailFound: parsed.emailFound || lead.email,
                phoneFound: parsed.phoneFound || lead.phoneNumber,
                websiteAnalysis: parsed.websiteAnalysis || {
                    hasWebsite: !!lead.website,
                    websiteQuality: 'Unknown',
                    mobileOptimized: null,
                    hasSSL: null,
                    loadSpeed: 'Unknown',
                    seoScore: 'Unknown',
                    issues: []
                },
                socialPresence: parsed.socialPresence || {
                    facebook: lead.socials?.facebook || null,
                    instagram: lead.socials?.instagram || null,
                    linkedin: lead.socials?.linkedin || null,
                    tiktok: lead.socials?.tiktok || null,
                    googleBusiness: null,
                    socialScore: 0,
                    issues: []
                },
                reviewAnalysis: parsed.reviewAnalysis || {
                    googleRating: lead.gmbRating,
                    googleReviewCount: lead.gmbReviewCount,
                    yelpRating: null,
                    averageSentiment: 'No Reviews',
                    commonComplaints: [],
                    commonPraises: []
                },
                competitorBenchmark: parsed.competitorBenchmark || {
                    topCompetitors: [],
                    competitorAdvantages: [],
                    leadAdvantages: [],
                    marketGaps: []
                },
                painPoints: parsed.painPoints || lead.painPoints,
                opportunityScore: parsed.opportunityScore || lead.leadScore,
                revloRecommendation: {
                    primaryService: recommendedService,
                    secondaryService: secondaryService || undefined,
                    reasoning: parsed.revloRecommendation?.reasoning || 'Analysis in progress',
                    estimatedImpact: parsed.revloRecommendation?.estimatedImpact || 'To be determined',
                    urgency: parsed.revloRecommendation?.urgency || 'Medium'
                },
                tailoredPitch: parsed.tailoredPitch || lead.suggestedPitch,
                coldEmailSubject: parsed.coldEmailSubject || `Quick question about ${lead.businessName}`,
                followUpAngles: parsed.followUpAngles || [],
                enrichedAt: Date.now(),
                dataSourcesUsed: ['Brave Search Web', 'Brave Search Reviews', 'Brave Search Social', 'Deepseek V3 Analysis'],
                researchQueries: [businessQuery, reviewQuery, ownerQuery, competitorQuery, socialQuery]
            };

        } catch (parseError) {
            console.error('Failed to parse Deepseek dossier:', parseError, '\nRaw:', rawAnalysis);
            // Fallback dossier with whatever we can extract
            dossier = buildFallbackDossier(lead, businessResults, rawAnalysis);
        }

        updateJob(job.id, { status: 'complete', progress: 100, completedAt: Date.now() });
        addJobStep(job.id, '✓ Deep enrichment complete. Dossier ready.');

        // Auto-dismiss completed jobs after 30 seconds
        setTimeout(() => dismissJob(job.id), 30000);

        return dossier;

    } catch (error: any) {
        console.error('Deep enrichment pipeline failed:', error);
        updateJob(job.id, { status: 'failed', progress: 0 });
        addJobStep(job.id, `✗ Enrichment failed: ${error.message}`);

        // Auto-dismiss failed jobs after 15 seconds
        setTimeout(() => dismissJob(job.id), 15000);

        throw error;
    }
}

// === FALLBACK DOSSIER ===
function buildFallbackDossier(lead: Lead, rawSearch: string, rawAnalysis: string): EnrichmentDossier {
    const defaultService = lead.website
        ? (lead.digitalMaturity === 'Critical' || lead.digitalMaturity === 'Weak' ? REVLO_SERVICES[3] : REVLO_SERVICES[1])
        : REVLO_SERVICES[3];

    return {
        companyOverview: `${lead.businessName} is a ${lead.industry} business located in ${lead.location}. Further research is needed for a complete profile.`,
        ownerName: lead.estimatedOwnerName,
        ownerTitle: null,
        ownerLinkedIn: null,
        emailFound: lead.email,
        phoneFound: lead.phoneNumber,
        websiteAnalysis: {
            hasWebsite: !!lead.website,
            websiteQuality: lead.website ? 'Unknown' : 'None',
            mobileOptimized: null,
            hasSSL: null,
            loadSpeed: 'Unknown',
            seoScore: 'Unknown',
            issues: lead.website ? [] : ['No website detected']
        },
        socialPresence: {
            facebook: lead.socials?.facebook || null,
            instagram: lead.socials?.instagram || null,
            linkedin: lead.socials?.linkedin || null,
            tiktok: lead.socials?.tiktok || null,
            googleBusiness: null,
            socialScore: 20,
            issues: ['Limited social presence data gathered']
        },
        reviewAnalysis: {
            googleRating: lead.gmbRating,
            googleReviewCount: lead.gmbReviewCount,
            yelpRating: null,
            averageSentiment: 'No Reviews',
            commonComplaints: [],
            commonPraises: []
        },
        competitorBenchmark: {
            topCompetitors: [],
            competitorAdvantages: [],
            leadAdvantages: [],
            marketGaps: []
        },
        painPoints: lead.painPoints || ['Further research needed'],
        opportunityScore: lead.leadScore,
        revloRecommendation: {
            primaryService: defaultService,
            reasoning: `Based on initial data, ${defaultService.name} appears to be the best fit for ${lead.businessName}.`,
            estimatedImpact: 'Detailed impact analysis pending further research.',
            urgency: 'Medium'
        },
        tailoredPitch: lead.suggestedPitch || `Hi, I noticed ${lead.businessName} could benefit from our services. Would love to chat.`,
        coldEmailSubject: `Quick question about ${lead.businessName}`,
        followUpAngles: ['Reference industry trends', 'Mention competitor activity', 'Share a relevant case study'],
        enrichedAt: Date.now(),
        dataSourcesUsed: ['Brave Search (partial)', 'Deepseek V3 (fallback)'],
        researchQueries: []
    };
}

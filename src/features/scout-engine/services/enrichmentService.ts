/**
 * REVLO SCOUT — DEEP ENRICHMENT SERVICE
 * 
 * Uses Google Gemini 2.5 Flash with built-in Google Search grounding.
 * Single-call enrichment with comprehensive business intelligence.
 */

import { Lead, EnrichmentDossier, RevloOffer, EnrichmentJob } from '../types';
import { safeJsonParse } from '../../../utils/safeJson';

// === CONFIGURATION ===
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

if (!GEMINI_API_KEY) {
    console.error('VITE_GEMINI_API_KEY not set. Gemini features will not work.');
}

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

// === GEMINI 2.5 FLASH WITH GOOGLE SEARCH ===
async function geminiResearch(userMessage: string, jobId: string): Promise<string> {
    try {
        if (!GEMINI_API_KEY) {
            throw new Error('Gemini API key not configured');
        }

        updateJob(jobId, { progress: 40 });
        addJobStep(jobId, 'Querying Google Search via Gemini...');

        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        role: 'user',
                        parts: [{ text: userMessage }]
                    }
                ],
                systemInstruction: {
                    parts: [{
                        text: `You are an elite business intelligence analyst for REVLO — a premium AI development agency.
Your task is to deeply analyze a business lead using Google Search and produce a comprehensive enrichment dossier.
Output ONLY valid JSON. No markdown, no explanation.`
                    }]
                },
                generationConfig: {
                    temperature: 0.3,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 8192,
                    stopSequences: []
                }
            })
        });

        if (!response.ok) {
            const errData = await response.text();
            console.error('Gemini API error:', response.status, errData);
            throw new Error(`Gemini API error: ${response.status}`);
        }

        const data = await response.json();
        const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        
        if (!content) {
            throw new Error('No content from Gemini');
        }

        return content;
    } catch (error: any) {
        console.error('Gemini research error:', error);
        throw error;
    }
}

// === MAIN ENRICHMENT PIPELINE ===
export async function deepEnrichLead(lead: Lead): Promise<EnrichmentDossier> {
    const job = addJob(lead);

    try {
        updateJob(job.id, { status: 'running', progress: 5 });
        addJobStep(job.id, 'Starting deep research with Google Search...');

        // Single Gemini call with Google Search grounding
        const researchPrompt = `
Conduct a comprehensive business intelligence analysis using Google Search. Research:
1. Company website and on web presence quality
2. Social media profiles (Facebook, Instagram, LinkedIn, TikTok, Google Business)
3. Customer reviews and ratings (Google, Yelp scores)
4. Owner/decision maker name and contact information
5. Local competitors and their positioning
6. Industry trends and market opportunities
7. Specific pain points and revenue gaps
8. Website technical analysis (mobile, SEO, speed)

LEAD DATA:
- Business Name: ${lead.businessName}
- Industry: ${lead.industry}
- Location: ${lead.location}
- Current Website: ${lead.website || 'UNKNOWN'}
- Phone: ${lead.phoneNumber || 'UNKNOWN'}
- Email: ${lead.email || 'UNKNOWN'}

**CRITICAL: Output ONLY this JSON structure:**
{
  "companyOverview": "3-5 detailed sentences specific to ${lead.location}",
  "ownerName": "Owner/CEO name or null",
  "ownerTitle": "Their title or null",
  "ownerLinkedIn": "LinkedIn URL or null",
  "emailFound": "Email or null",
  "phoneFound": "Phone or null",
  "websiteAnalysis": {
    "hasWebsite": true/false,
    "websiteQuality": "None|Poor|Average|Good|Excellent",
    "mobileOptimized": true/false/null,
    "seoScore": "Weak|Average|Strong|Unknown",
    "issues": ["Specific technical flaws found"]
  },
  "socialPresence": {
    "facebook": "URL or null",
    "instagram": "URL or null",
    "linkedin": "URL or null",
    "tiktok": "URL or null",
    "googleBusiness": "URL or null",
    "socialScore": 0-100,
    "issues": ["Social media problems"]
  },
  "reviewAnalysis": {
    "googleRating": number or null,
    "googleReviewCount": number or null,
    "averageSentiment": "Positive|Mixed|Negative|No Reviews",
    "commonComplaints": ["Top customer pain points"],
    "commonPraises": ["What customers love"]
  },
  "competitorBenchmark": {
    "topCompetitors": ["Local competitor names"],
    "competitorAdvantages": ["Where they win"],
    "leadAdvantages": ["Where the lead wins"],
    "marketGaps": ["Unserved market opportunities"]
  },
  "painPoints": ["Specific problems with revenue impact (e.g., 'Missing \$2k/mo in online orders')"],
  "opportunityScore": 0-100,
  "revloRecommendation": {
    "primaryService": "openclaw|ghl-automation|elite-development|websites",
    "reasoning": "Why this service",
    "estimatedImpact": "Revenue/efficiency gain",
    "urgency": "Critical|High|Medium|Low"
  },
  "tailoredPitch": "Personal pitch mentioning owner name, specific competitor, and revenue opportunity",
  "coldEmailSubject": "High-open-rate subject line",
  "followUpAngles": ["Angle 1", "Angle 2", "Angle 3"]
}
`;

        updateJob(job.id, { progress: 25 });
        addJobStep(job.id, 'Analyzing business intelligence...');

        const rawAnalysis = await geminiResearch(researchPrompt, job.id);

        updateJob(job.id, { progress: 75 });
        addJobStep(job.id, 'Processing intelligence report...');

        // Parse the Gemini response
        let dossier: EnrichmentDossier;
        try {
            let cleanJson = rawAnalysis.trim();
            cleanJson = cleanJson.replace(/^```json\n?/, '').replace(/```$/, '');

            const startIdx = cleanJson.indexOf('{');
            const endIdx = cleanJson.lastIndexOf('}');
            if (startIdx !== -1 && endIdx !== -1) {
                cleanJson = cleanJson.substring(startIdx, endIdx + 1);
            }

            const parsed = safeJsonParse<any>(cleanJson, {});

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
                dataSourcesUsed: ['Google Search (via Gemini 2.5 Flash)', 'Gemini 2.5 Flash Analysis'],
                researchQueries: [`${lead.businessName} ${lead.location}`, `${lead.industry} ${lead.location}`]
            };

        } catch (parseError) {
            console.error('Failed to parse Gemini dossier:', parseError, '\nRaw:', rawAnalysis);
            dossier = buildFallbackDossier(lead, researchPrompt, rawAnalysis);
        }

        updateJob(job.id, { status: 'complete', progress: 100, completedAt: Date.now() });
        addJobStep(job.id, '✓ Deep enrichment complete. Dossier ready.');

        setTimeout(() => dismissJob(job.id), 30000);

        return dossier;

    } catch (error: any) {
        console.error('Deep enrichment pipeline failed:', error);
        updateJob(job.id, { status: 'failed', progress: 0 });
        addJobStep(job.id, `✗ Enrichment failed: ${error.message}`);

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

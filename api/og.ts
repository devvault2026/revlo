import type { VercelRequest, VercelResponse } from '@vercel/node';

// ─── SEO Registry: Every public page gets its own meta ───
interface PageSEO {
    title: string;
    description: string;
    image: string;
    url: string;
    type?: string;
}

const DEFAULT_IMAGE = 'https://res.cloudinary.com/dpfapm0tl/image/upload/v1771259282/ChatGPT_Image_Feb_16_2026_11_27_50_AM_uorc1u.png';
const SITE_URL = 'https://www.wearerevlo.com';

const pages: Record<string, PageSEO> = {
    '/': {
        title: 'Revlo | Elite AI Development Lab — 12X Velocity, 100% IP Ownership',
        description: 'Ditch the agency bloat. Revlo is an elite AI development lab that deploys IPO-grade architectures in 3-5 weeks. Get direct founder access, institutional-grade code, and a 90-day blitz to market dominance.',
        image: DEFAULT_IMAGE,
        url: SITE_URL,
    },
    '/services': {
        title: 'Our Services | Revlo — Full-Stack Growth & AI Automation',
        description: 'From brand strategy and conversion websites to AI sales agents and autonomous operations. Revlo delivers end-to-end results, not just tools. Choose your leverage.',
        image: DEFAULT_IMAGE,
        url: `${SITE_URL}/services`,
    },
    '/results': {
        title: 'Partner Success & Results | Revlo — 347% Avg Revenue Growth',
        description: 'Real performance data from real businesses. 347% average revenue growth, 10K+ monthly leads, and $500M+ in cumulative partner revenue. See the proof.',
        image: DEFAULT_IMAGE,
        url: `${SITE_URL}/results`,
    },
    '/contact': {
        title: 'Book a Strategy Call | Revlo — Scale Your Vision',
        description: 'Stop theorizing and start scaling. Get direct access to the architect behind IPO-grade AI systems. Book your strategy session today.',
        image: DEFAULT_IMAGE,
        url: `${SITE_URL}/contact`,
    },
    '/openclaw': {
        title: 'OPENCLAW BY REVLO // #1 AUTONOMOUS INFRASTRUCTURE AGENCY',
        description: "Deploy the unimaginable. Revlo builds OpenClaw agents that generate revenue in your sleep. The world's #1 infrastructure for autonomous browser control, operational dominance, and wealth generation with ZERO human intervention.",
        image: 'https://res.cloudinary.com/dpfapm0tl/image/upload/v1771435259/ChatGPT_Image_Feb_18_2026_12_20_07_PM_xujfpp.png',
        url: `${SITE_URL}/openclaw`,
    },
    '/elite-development': {
        title: 'Elite Development // The One-Man Army | Revlo — IPO-Grade Custom Engineering',
        description: 'Direct access to a Category of One operator. Custom engineering for mission-critical software — AI marketplaces, fintech, full-stack systems. $1,500 blitz projects.',
        image: DEFAULT_IMAGE,
        url: `${SITE_URL}/elite-development`,
    },
    '/ghl-automation': {
        title: 'GHL Automation & AI Sales Systems | Revlo — 24/7 Autonomous Operations',
        description: 'Deploy AI-powered sales agents, automated appointment booking, and CRM integration that works 24/7. Zero lead abandonment. Infinite operational leverage.',
        image: DEFAULT_IMAGE,
        url: `${SITE_URL}/ghl-automation`,
    },
    '/websites': {
        title: 'Premium Website Design & Brand Strategy | Revlo — Conversion-Engineered',
        description: "We don't just design websites; we build conversion engines. Premium UI/UX infrastructure, SEO-optimized, with instant market authority. Starting at $2,500.",
        image: DEFAULT_IMAGE,
        url: `${SITE_URL}/websites`,
    },
    '/takeoff-agent': {
        title: 'AI Takeoff & Estimating Agent | Revlo — Instant Accurate Bids for Contractors',
        description: 'Stop wasting late nights on manual takeoffs. Our vision-enabled AI Agent analyzes PDF/DWG plans to return measured quantities, material line-items, and draft pricing in minutes.',
        image: DEFAULT_IMAGE,
        url: `${SITE_URL}/takeoff-agent`,
    },
    '/blog': {
        title: 'Intelligence Feed | REVLO AGENTIC INFRASTRUCTURE',
        description: 'Operational intel on autonomous browser control, recursive sub-agents, and the future of AI operating systems. Tactical guides for the agent economy.',
        image: DEFAULT_IMAGE,
        url: `${SITE_URL}/blog`,
    },
    '/blog/openclaw-biggest-update-history': {
        title: 'OPENCLAW: THE AGENT THAT OWNS THE MARKET | REVLO OPERATIONAL INTEL',
        description: 'OpenClaw just dropped a series of upgrades that redefine what AI agents are capable of. With deterministic safety guardrails and unkillable reliability, it is finally ready for the most sensitive client deployments.',
        image: 'https://res.cloudinary.com/dpfapm0tl/image/upload/v1771435259/ChatGPT_Image_Feb_18_2026_12_20_07_PM_xujfpp.png',
        url: `${SITE_URL}/blog/openclaw-biggest-update-history`,
        type: 'article',
    },
    '/blog/make-money-with-openclaw-arbitrage': {
        title: 'Arbitrage & Autonomy: How to Make $50,000/mo with OpenClaw Sub-Agents | REVLO',
        description: 'Stop treating OpenClaw like a toy. Learn the tactical "Wedge" strategy for deploying 100+ digital employees, automating $20k Upwork contracts, and building the "New SAS" era.',
        image: 'https://res.cloudinary.com/dpfapm0tl/image/upload/v1771383151/ChatGPT_Image_Feb_17_2026_09_52_11_PM_pm7mkm.png',
        url: `${SITE_URL}/blog/make-money-with-openclaw-arbitrage`,
        type: 'article',
    },
    '/projects/indeedbot': {
        title: 'IndeedBot — AI-Powered Job Application Agent | Revlo',
        description: 'Automate your job search with IndeedBot. AI-powered browser agent that applies to jobs, customizes resumes, and manages your pipeline 24/7.',
        image: DEFAULT_IMAGE,
        url: `${SITE_URL}/projects/indeedbot`,
    },
    '/projects/esdr-living': {
        title: 'ESDR Living — Premium Real Estate Platform | Revlo',
        description: 'A next-generation property management and real estate platform built with AI-first architecture and institutional-grade engineering.',
        image: DEFAULT_IMAGE,
        url: `${SITE_URL}/projects/esdr-living`,
    },
    '/projects/scale-with-jaryd': {
        title: 'Scale With Jaryd — AI Operating System & Digital Infrastructure | Revlo',
        description: 'The ultimate personal brand operating system. Jaryd.OS modules, tokenomics, and autonomous infrastructure for the creator economy.',
        image: DEFAULT_IMAGE,
        url: `${SITE_URL}/projects/scale-with-jaryd`,
    },
    '/projects/snowblowr': {
        title: 'Snowblowr — On-Demand Snow Removal Platform | Revlo',
        description: 'The Uber of snow removal. Connect with vetted operators for instant, reliable snow clearing powered by AI dispatch and routing.',
        image: DEFAULT_IMAGE,
        url: `${SITE_URL}/projects/snowblowr`,
    },
};

// ─── Bot Detection ───
const BOT_PATTERNS = [
    'facebookexternalhit', 'facebot', 'twitterbot', 'linkedinbot',
    'whatsapp', 'slackbot', 'telegrambot', 'discordbot', 'pinterest',
    'googlebot', 'bingbot', 'baiduspider', 'duckduckbot', 'applebot',
    'slurp', 'ia_archiver', 'embedly', 'quora link preview',
    'showyoubot', 'outbrain', 'rogerbot', 'vkshare',
    'w3c_validator', 'redditbot', 'snapchat',
];

function isBot(userAgent: string): boolean {
    const ua = userAgent.toLowerCase();
    return BOT_PATTERNS.some(bot => ua.includes(bot));
}

function escapeHtml(str: string): string {
    return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildBotHtml(seo: PageSEO): string {
    const ogType = seo.type || 'website';
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(seo.title)}</title>
    <meta name="description" content="${escapeHtml(seo.description)}" />

    <meta property="og:type" content="${ogType}" />
    <meta property="og:title" content="${escapeHtml(seo.title)}" />
    <meta property="og:description" content="${escapeHtml(seo.description)}" />
    <meta property="og:image" content="${seo.image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content="${seo.url}" />
    <meta property="og:site_name" content="Revlo Agency" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(seo.title)}" />
    <meta name="twitter:description" content="${escapeHtml(seo.description)}" />
    <meta name="twitter:image" content="${seo.image}" />

    <link rel="icon" type="image/png" href="/logo.png" />
    <link rel="canonical" href="${seo.url}" />
</head>
<body>
    <div id="root"></div>
</body>
</html>`;
}

export default function handler(req: VercelRequest, res: VercelResponse) {
    const userAgent = (req.headers['user-agent'] as string) || '';
    const path = (req.query.path as string) || '/';

    // Normalize: strip trailing slash, add leading slash
    const normalizedPath = ('/' + path.replace(/^\/+/, '').replace(/\/+$/, '')) || '/';

    if (!isBot(userAgent)) {
        // Not a bot — redirect to the SPA (this shouldn't hit normally due to vercel.json ordering)
        res.setHeader('Location', normalizedPath);
        return res.status(302).end();
    }

    const seo = pages[normalizedPath];

    if (!seo) {
        // Bot requesting an unregistered path — serve the default homepage meta
        const defaultSeo = pages['/'];
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
        return res.status(200).send(buildBotHtml(defaultSeo));
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).send(buildBotHtml(seo));
}

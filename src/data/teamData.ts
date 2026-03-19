export interface TeamMember {
    name: string;
    role: string;
    title: string;
    bio: string;
    extendedBio: string;
    expertise: string[];
    achievements: string[];
    gradient: string;
    initial: string;
    image: string;
    id: string;
    slug: string;
    socials?: {
        linkedin?: string;
        email?: string;
        twitter?: string;
    };
}

export const teamMembers: TeamMember[] = [
    {
        name: 'JARYD',
        role: 'Strategy & Growth Lead',
        title: 'FOUNDER // CHIEF ARCHITECT',
        bio: 'Master of strategic branding, market positioning, and direct-response media buying. Jaryd turns unknown brands into market leaders through high-impact strategy.',
        extendedBio: `With over 15 years of experience in the digital marketing landscape, Jaryd has pioneered growth strategies for both startups and established businesses. His focus is on high-level market positioning and building sustainable growth engines that stand out in crowded markets. Jaryd believes that a strong brand foundation is the most valuable asset any modern business can own.`,
        expertise: ['MARKET POSITIONING', 'GROWTH STRATEGY', 'MEDIA BUYING', 'AI INTEGRATION', 'CONVERSION OPTIMIZATION', 'VIRAL STRATEGY'],
        achievements: [
            'Scaled 20+ brands to 7-figure revenue',
            'Consistent 5-10X ROI for partners',
            'Generated $50M+ in partner revenue',
            'Built global audience networks',
        ],
        gradient: 'from-purple-500 to-purple-400',
        initial: 'J',
        image: '/619228587_1473924384299979_5558935500619533353_n.jpg',
        id: 'LEAD-001',
        slug: 'jaryd',
        socials: {
            linkedin: 'https://linkedin.com/in/jaryd',
            email: 'jaryd@revlo.com'
        }
    },
    {
        name: 'PAUL CARPENTER, THE AI MAGICIAN',
        role: 'Autonomous AI Architect & Mindset Innovator',
        title: 'OPENCLAW VISIONARY // AUTONOMOUS SYSTEMS ARCHITECT',
        bio: 'A former celebrity magician who turned his stagecraft mindset into AI mastery. Paul orchestrates autonomous systems and multi-agent orchestration with theatrical precision.',
        extendedBio: 'Paul Carpenter is the visionary architect behind our most transformative AI integrations. As a previous air talent and celebrity magician who performed alongside major acts, Paul brings a unique perspective to autonomous systems—he understands that true magic happens when the impossible becomes inevitable. He now applies his mastery of mindset, presence, and orchestration to build AI agents and autonomous systems that execute with flawless precision. His work doesn\'t just deploy technology; it transforms how businesses think about automation and intelligence.',
        expertise: ['AUTONOMOUS ORCHESTRATION', 'MULTI-AGENT SYSTEMS', 'AI MINDSET', 'AGENT ARCHITECTURE', 'AUTONOMOUS WORKFLOWS', 'STRATEGIC AUTOMATION'],
        achievements: [
            'Architected next-generation autonomous agent frameworks',
            'Transformed business operations through agent autonomy',
            'Engineered multi-agent coordination systems',
            'Revolutionized AI implementation strategy and mindset',
        ],
        gradient: 'from-purple-500 to-pink-400',
        initial: 'P',
        image: 'https://res.cloudinary.com/dpfapm0tl/image/upload/v1773685997/509359683_10162901278796718_4130707908931625304_n_dbzhj0.jpg',
        id: 'MAGIC-002',
        slug: 'paul-carpenter',
        socials: {
            linkedin: 'https://linkedin.com/in/paulcarpenter',
            email: 'paul@revlo.com'
        }
    },
    {
        name: 'THORTON',
        role: 'Marketing Director (AI Agent)',
        title: 'REVLOCLAW MARKETING ENGINE // AUTONOMOUS OPERATOR',
        bio: 'Our custom AI Agent built under RevloClaw (OpenClaw) that fully automates Revlo\'s marketing ecosystem.',
        extendedBio: 'Thorton is the heartbeat of our autonomous marketing strategy. Engineered on the OpenClaw framework, he manages end-to-end campaign orchestration, lead generation, and brand positioning with 24/7 efficiency. He doesn\'t just process data—he executes high-impact marketing initiatives that scale without human intervention.',
        expertise: ['CAMPAIGN AUTONOMY', 'OPENCLAW LOGIC', 'DYNAMIC TARGETING', 'AI COPYWRITING', 'REAL-TIME ANALYTICS', 'MARKET SENSING'],
        achievements: [
            'Fully automating Revlo marketing',
            'Self-optimizing campaign structures',
            'Real-time market trend adaptation',
            'Autonomous lead qualification',
        ],
        gradient: 'from-emerald-500 to-teal-400',
        initial: 'T',
        image: 'https://res.cloudinary.com/dpfapm0tl/image/upload/v1771553045/ChatGPT_Image_Feb_19_2026_02_07_51_PM_u8fmn7.png',
        id: 'AI-MARK-003',
        slug: 'thorton'
    },
    {
        name: 'VLASTIMIL VRSKOVY',
        role: 'Fullstack Developer & OpenClaw Setups Pro',
        title: 'DEPLOYMENT ARCHITECT // OPENCLAW SPECIALIST',
        bio: 'Expert in fullstack development and OpenClaw infrastructure deployment. Vlastimil specializes in architecting and executing production-grade system setups.',
        extendedBio: 'Vlastimil brings deep expertise in fullstack development and the complete OpenClaw deployment pipeline. He is responsible for architecting robust infrastructure implementations, ensuring every system is optimized for scale and reliability. With a focus on production-grade quality and meticulous execution, Vlastimil transforms complex requirements into elegant, performant solutions.',
        expertise: ['FULLSTACK DEV', 'OPENCLAW DEPLOYMENT', 'INFRASTRUCTURE SETUP', 'SYSTEM ARCHITECTURE', 'PRODUCTION OPTIMIZATION', 'TECHNICAL LEADERSHIP'],
        achievements: [
            'Deployed OpenClaw across multiple verticals',
            'Architected scalable infrastructure solutions',
            'Led high-complexity integration projects',
            'Optimized production systems for 99.9% uptime',
        ],
        gradient: 'from-orange-500 to-red-400',
        initial: 'V',
        image: 'https://res.cloudinary.com/dpfapm0tl/image/upload/v1773617573/547292508_10162777298947479_1451578536619261068_n_rrb8va.jpg',
        id: 'TECH-004',
        slug: 'vlastimil',
        socials: {
            linkedin: 'https://linkedin.com/in/vlastimil',
            email: 'vlastimil@revlo.com'
        }
    },
];

export const getTeamMemberBySlug = (slug: string) => {
    return teamMembers.find(member => member.slug === slug);
};

export const getTeamMemberById = (id: string) => {
    return teamMembers.find(member => member.id === id);
};

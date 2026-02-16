import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useAnimationFrame } from 'framer-motion';
import {
    Cpu,
    Shield,
    Zap,
    Target,
    Code,
    ArrowRight,
    CheckCircle2,
    Layers,
    Rocket,
    Terminal,
    Database,
    Fingerprint,
    Activity,
    Lock,
    Globe,
    MessageSquare,
    Clock,
    BarChart3,
    Search,
    Wifi,
    Server,
    Layout,
    Workflow,
    TrendingUp,
    ShieldAlert,
    Bug,
    LineChart,
    Users,
    ChevronLeft,
    ChevronRight,
    Play,
    Pause,
    ExternalLink,
    Quote,
    ShieldCheck,
    XCircle,
    X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

// Reactive Mini Bubble - Interactive energy particles
const ReactiveBubble = React.memo(({ mouseX, mouseY }: { mouseX: any, mouseY: any }) => {
    const config = React.useMemo(() => ({
        xPercent: Math.random() * 100,
        startY: 110 + (Math.random() * 30),
        speed: Math.random() * 0.15 + 0.1,
        size: Math.random() * 8 + 4,
        brightness: 0.3 + Math.random() * 0.4
    }), []);

    const bubbleXOffset = useMotionValue(0);
    const bubbleYPos = useMotionValue(config.startY);
    const springX = useSpring(bubbleXOffset, { damping: 25, stiffness: 150 });

    useAnimationFrame(() => {
        const currentY = bubbleYPos.get();
        if (currentY < -20) {
            bubbleYPos.set(110 + Math.random() * 20);
        } else {
            bubbleYPos.set(currentY - config.speed);
        }

        const bubbleRealX = (window.innerWidth * (config.xPercent / 100)) + bubbleXOffset.get();
        const bubbleRealY = (window.innerHeight * (currentY / 100));

        const dx = mouseX.get() - bubbleRealX;
        const dy = mouseY.get() - bubbleRealY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180) {
            const force = (180 - dist) / 180;
            bubbleXOffset.set(-dx * force * 0.7);
        } else {
            bubbleXOffset.set(0);
        }
    });

    return (
        <motion.div
            style={{
                position: 'absolute',
                left: `${config.xPercent}%`,
                top: useTransform(bubbleYPos, (v) => `${v}%`),
                x: springX,
                width: config.size,
                height: config.size,
                borderRadius: '50%',
                backgroundColor: `rgba(168, 85, 247, ${config.brightness})`,
                boxShadow: `0 0 10px rgba(168, 85, 247, ${config.brightness})`,
                zIndex: 0
            }}
        />
    );
});

const EliteDevelopmentPage: React.FC = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);
    const fadeIn = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    const protocolSteps = [
        {
            phase: "PHASE 00",
            title: "THE EXTRACTION",
            duration: "WEEK 01",
            desc: "We dive deep into your business DNA. I don't just take requirements; I extract the vision that you can't yet put into words.",
            deliverables: ["Technical Audit", "Market Gap Analysis", "System Blueprint", "GTM Hypothesis"],
            icon: <Search className="w-6 h-6" />
        },
        {
            phase: "PHASE 01",
            title: "ARCHITECTURAL FOUNDATION",
            duration: "WEEK 02-03",
            desc: "Setting up the heavy artillery. IPO-grade infrastructure, database schemas, and the security perimeter.",
            deliverables: ["Cloud Infrastructure Setup", "DB Schema Design", "Security Protocols", "Core API Routes"],
            icon: <Layers className="w-6 h-6" />
        },
        {
            phase: "PHASE 02",
            title: "THE 90-DAY BLITZ",
            duration: "WEEK 04-12",
            desc: "Hyper-speed execution. Daily commits, weekly functional prototypes, and live feedback loops.",
            deliverables: ["Responsive UI/UX", "Complex Feature Build", "AI Orchestration", "Real-time Systems"],
            icon: <Zap className="w-6 h-6" />
        },
        {
            phase: "PHASE 03",
            title: "MARKET DOMINATION",
            duration: "ONGOING",
            desc: "The launch isn't the finish line. We optimize for revenue, user retention, and viral growth loops.",
            deliverables: ["Conversion Optimization", "Scale Analytics", "Viral Growth Hooks", "Fractional CTO Support"],
            icon: <Target className="w-6 h-6" />
        }
    ];

    const techArsenal = [
        { category: "Frontend", tools: ["React", "Next.js", "Framer Motion"], reason: "Fluidity & Conversion Performance" },
        { category: "Backend", tools: ["TypeScript", "NestJS", "Node.js"], reason: "Scalable Infrastructure Architecture" },
        { category: "Intelligence", tools: ["OpenAI", "Anthropic", "LangChain"], reason: "Cognitive Automation Workflows" },
        { category: "Data", tools: ["Postgres", "Redis", "Prisma"], reason: "Transactional Integrity & Speed" },
        { category: "Ops", tools: ["Docker", "AWS", "GitHub Actions"], reason: "Zero-Downtime Deployment Cycles" }
    ];

    const engagementExperience = [
        {
            title: "Direct Founder Access",
            desc: "Skip the account managers. You have a direct line to my private Discord. We move at the speed of your business, with zero filters.",
            icon: <MessageSquare className="w-5 h-5" />
        },
        {
            title: "Visible Velocity",
            desc: "Weekly video walkthroughs and live test environments. You see exactly what is being built and how it functions every 7 days.",
            icon: <Activity className="w-5 h-5" />
        },
        {
            title: "100% IP Transfer",
            desc: "I build institutional-grade systems that you own entirely. No vendor lock-in, no hidden code—your business, your assets.",
            icon: <Shield className="w-5 h-5" />
        }
    ];

    const testimonials = [
        {
            url: "https://res.cloudinary.com/dpfapm0tl/video/upload/v1769023688/URGENT_Agency_Owners_and_Entrepreneurs_-_Emotional_Testimonial_Video_Will_Blow_Your_Mind_1_ipz5cc.mp4",
            poster: "https://res.cloudinary.com/dpfapm0tl/video/upload/v1769023688/URGENT_Agency_Owners_and_Entrepreneurs_-_Emotional_Testimonial_Video_Will_Blow_Your_Mind_1_ipz5cc.jpg",
            title: "Emotional Growth",
            client: "Ecom Founder",
            id: "v1"
        },
        {
            url: "https://res.cloudinary.com/dpfapm0tl/video/upload/v1769023665/482268807_28714239028190908_2106583740464026710_n_fwvrem.mp4",
            poster: "https://res.cloudinary.com/dpfapm0tl/video/upload/v1769023665/482268807_28714239028190908_2106583740464026710_n_fwvrem.jpg",
            title: "Scale Success",
            client: "Agency Owner",
            id: "v2"
        },
        {
            url: "https://res.cloudinary.com/dpfapm0tl/video/upload/v1769023844/Check_Out_Our_1_Testimonial___You_Cannot_Pay_For_Something_This_Good_1_okr5b6.mp4",
            poster: "https://res.cloudinary.com/dpfapm0tl/video/upload/v1769023844/Check_Out_Our_1_Testimonial___You_Cannot_Pay_For_Something_This_Good_1_okr5b6.jpg",
            title: "7-Figure Exit",
            client: "Patient Boost",
            id: "v3"
        }
    ];

    const eliteProjects = [
        {
            id: 'snowblowr',
            name: 'SNOWBLOWR',
            tagline: 'Uber-style marketplace. $0 → $50k+ Blitz.',
            image: 'https://res.cloudinary.com/dpfapm0tl/image/upload/v1771218296/snowblowr_bcrgjb.png',
            desc: "Real-time on-demand marketplace for residential snow clearing. Built a scalable operator network and a surge-dynamic pricing engine in 90 days.",
            tech: ["Geospatial Queries", "Surge Algorithms", "React Native"],
            metrics: ["$50k+ Revenue Blitz", "90-Day Buildout", "IPO-Ready Infrastructure"]
        },
        {
            id: 'indeedbot',
            name: 'IndeedBot 2026',
            tagline: 'AI Career Intelligence Platform',
            image: 'https://res.cloudinary.com/dpfapm0tl/image/upload/v1771259926/3f5aa298-f0d8-45fc-80bc-bb27928b8873_jpkdug.png',
            desc: "Multi-agent search engine that bridges the gap between labor and intelligence. Automates application cycles and analyzes ATS risk in real-time.",
            tech: ["Multi-Agent Reasoning", "ATS Optimized", "Enterprise Security"],
            metrics: ["Zero-Trust Architecture", "Real-time Auditing", "Market Category Creator"]
        },
        {
            id: 'esdr',
            name: 'ESDR Living',
            tagline: 'Luxury Real Estate Ecosystem',
            image: 'https://res.cloudinary.com/dpfapm0tl/image/upload/v1771214488/esdr_dowjzk.png',
            desc: "High-performance ecosystem for luxury property portfolios. Combines Airbnb-style UX with military-grade security and inventory management.",
            tech: ["Airbnb Style UX", "Tenant Portal", "Property Showcase"],
            metrics: ["Luxury UX Design", "Tenant Automation", "Management Hub"]
        }
    ];

    const comparisons = [
        { label: "Feedback Loop", agency: "2-Week Sprints / 3 Meetings", revlo: "Instant Discord Clips / Daily Commits" },
        { label: "Execution", agency: "Junior Devs & Interns", revlo: "The Founder. 100% Skin in the Game" },
        { label: "Pricing", agency: "Retainers for 'Account Management'", revlo: "Lumped into Raw Development Power" },
        { label: "Technical Speed", agency: "Locked into Legacy Frameworks", revlo: "Bleeding Edge AI & Real-time Systems" },
        { label: "Ownership", agency: "Vague IP Clauses / Dependent Support", revlo: "100% Clean Code / Independent Infrastructure" }
    ];

    const faqs = [
        {
            q: "WHY NOT JUST HIRE A TRADITIONAL AGENCY?",
            a: "Because you're paying for their rent, their HR department, and their account managers. With me, you pay for raw code and tactical strategy. Agencies give you a project manager; I give you a partner."
        },
        {
            q: "HOW FAST CAN WE DEPLOY?",
            a: "We follow the 90-Day Blitz. We aim for a functional, market-ready MVP in 30 days, followed by 60 days of aggressive feature expansion and scaling."
        },
        {
            q: "WHO OWNS THE INTELLECTUAL PROPERTY?",
            a: "You. 100%. I provide the documentation and the architecture, but you hold the keys. No vendor lock-in. No hidden bullshit."
        },
        {
            q: "WHAT IF THE SCOPE CHANGES?",
            a: "In the 2026 economy, if your scope isn't changing, you're dead. I build modular architectures that are designed to pivot and expand as the market shifts."
        }
    ];

    const [activeVideo, setActiveVideo] = useState(0);
    const [playingId, setPlayingId] = useState<string | null>(null);
    const videoRefs = React.useRef<{ [key: string]: HTMLVideoElement | null }>({});

    const togglePlay = (id: string) => {
        const video = videoRefs.current[id];
        if (!video) return;

        if (video.paused) {
            Object.keys(videoRefs.current).forEach(key => {
                if (key !== id && videoRefs.current[key]) {
                    videoRefs.current[key]!.pause();
                }
            });
            video.play();
            setPlayingId(id);
        } else {
            video.pause();
            setPlayingId(null);
        }
    };

    return (
        <div className="min-h-screen bg-[#020408] text-white selection:bg-red-500/30">
            <Navigation />

            {/* HERO SECTION - TACTICAL COMMAND CENTER */}
            <section className="relative h-screen overflow-hidden flex flex-col justify-center">
                {/* Live Tactical Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Interactive Purple Bubbles (from Scout Page) */}
                    {[...Array(150)].map((_, i) => (
                        <ReactiveBubble key={`bubble-${i}`} mouseX={mouseX} mouseY={mouseY} />
                    ))}

                    {/* Animated Grid & Scanlines */}
                    <div className="absolute inset-0 bg-grid-white opacity-[0.03]" />
                    <div className="absolute inset-0 bg-dot-white opacity-[0.05]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent h-[50%] w-full animate-scan-v pointer-events-none" />

                    {/* Pulsing Energy Cores */}
                    <motion.div
                        animate={{
                            opacity: [0.03, 0.1, 0.03],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-600/15 blur-[120px] rounded-full"
                    />
                    <motion.div
                        animate={{
                            opacity: [0.03, 0.08, 0.03],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full"
                    />

                    {/* Drifting Technical Crosshairs & Markers */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={`cross-${i}`}
                            initial={{
                                x: Math.random() * 100 + "%",
                                y: Math.random() * 100 + "%",
                                opacity: 0
                            }}
                            animate={{
                                x: [null, (Math.random() * 10 - 5) + "%"],
                                y: [null, (Math.random() * 10 - 5) + "%"],
                                opacity: [0, 0.2, 0],
                                rotate: [0, 90]
                            }}
                            transition={{
                                duration: 15 + Math.random() * 10,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute text-purple-500/20 select-none"
                        >
                            <svg width="40" height="40" viewBox="0 0 40 40">
                                <path d="M20 0v40M0 20h40" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3" />
                                <circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.1" />
                            </svg>
                        </motion.div>
                    ))}

                    {/* Noise Overlay */}
                    <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-[0.9fr,1.1fr] gap-12 lg:gap-16 items-center">
                        {/* LEFT: LTR TYPOGRAPHY */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="flex flex-col items-start text-left"
                        >
                            <div className="inline-flex items-center gap-3 px-4 py-2 glass rounded-full mb-8 border border-red-500/20 animate-flicker">
                                <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.5em]">
                                    ARCHITECT // THE ELITE OPERATOR
                                </span>
                            </div>

                            <h1 className="text-4xl sm:text-6xl lg:text-[6.5rem] font-black font-display italic tracking-tight mb-6 leading-[0.85] lg:leading-[0.8] uppercase text-white text-left relative z-10">
                                <span className="relative inline-block group/impossible">
                                    {/* The Word - Base Layer */}
                                    <span className="relative z-10 text-white">IMPOSSIBLE</span>

                                    {/* The Electric Border Trace (SVG Text Outlines) */}
                                    <div className="absolute inset-0 pointer-events-none z-0 overflow-visible">
                                        <svg
                                            className="w-full h-full overflow-visible"
                                        >
                                            <defs>
                                                {/* High-frequency 'electric hum' for the base outline */}
                                                <filter id="electric-hum">
                                                    <feTurbulence type="fractalNoise" baseFrequency="0.45" numOctaves="2" result="noise">
                                                        <animate attributeName="seed" from="1" to="100" dur="0.8s" repeatCount="indefinite" />
                                                    </feTurbulence>
                                                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
                                                </filter>

                                                {/* Violent electric arc for the traveling bolts */}
                                                <filter id="electric-arc">
                                                    <feTurbulence type="fractalNoise" baseFrequency="0.12" numOctaves="3" result="noise">
                                                        <animate attributeName="seed" from="1" to="100" dur="1.5s" repeatCount="indefinite" />
                                                    </feTurbulence>
                                                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
                                                </filter>

                                                <filter id="glow-purple-clean">
                                                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                                                    <feMerge>
                                                        <feMergeNode in="blur" />
                                                        <feMergeNode in="SourceGraphic" />
                                                    </feMerge>
                                                </filter>
                                            </defs>

                                            {/* Style 1: The Traveling Bolt (The Loop) */}
                                            <motion.text
                                                x="0"
                                                y="0.82em"
                                                className="font-black font-display italic text-4xl sm:text-6xl lg:text-[6.5rem] uppercase select-none"
                                                fill="none"
                                                stroke="#d8b4fe"
                                                strokeWidth="3.5"
                                                strokeDasharray="150 2000"
                                                animate={{
                                                    strokeDashoffset: [0, -2150]
                                                }}
                                                transition={{
                                                    duration: 3,
                                                    repeat: Infinity,
                                                    ease: "linear"
                                                }}
                                                filter="url(#electric-arc) url(#glow-purple-clean)"
                                                style={{ letterSpacing: '-0.05em', paintOrder: 'stroke' }}
                                                aria-hidden="true"
                                            >
                                                IMPOSSIBLE
                                            </motion.text>

                                            {/* Style 2: The Global Shock (The Zap) */}
                                            <motion.text
                                                x="0"
                                                y="0.82em"
                                                className="font-black font-display italic text-4xl sm:text-6xl lg:text-[6.5rem] uppercase select-none"
                                                fill="none"
                                                stroke="#d8b4fe"
                                                strokeWidth="1.5"
                                                animate={{
                                                    opacity: [0, 0, 1, 0, 0.8, 0],
                                                    scale: [1, 1, 1.02, 1, 1.01, 1],
                                                    strokeWidth: [1.5, 1.5, 6, 1.5, 4, 1.5]
                                                }}
                                                transition={{
                                                    duration: 4,
                                                    repeat: Infinity,
                                                    times: [0, 0.8, 0.82, 0.84, 0.86, 1],
                                                    ease: "easeInOut"
                                                }}
                                                filter="url(#electric-arc) url(#glow-purple-clean)"
                                                style={{ letterSpacing: '-0.05em', paintOrder: 'stroke', transformOrigin: 'center' }}
                                                aria-hidden="true"
                                            >
                                                IMPOSSIBLE
                                            </motion.text>
                                        </svg>
                                    </div>

                                    {/* Optional: Subtle background glow for the word */}
                                    <div className="absolute -inset-4 bg-purple-500/10 blur-2xl opacity-0 group-hover/impossible:opacity-100 transition-opacity rounded-full z-0" />
                                </span>
                                <br />
                                <span className="gradient-text-alt tracking-[-0.02em]">INEVITABLE.</span>
                            </h1>

                            <p className="text-lg lg:text-2xl text-slate-400 font-medium leading-tight mb-10 max-w-xl text-left">
                                Where others see roadblocks, I see blueprints. <br />
                                <span className="text-white font-bold">I architect market dominance through single-operator efficiency.</span>
                            </p>

                            <div className="hidden lg:flex flex-col gap-4">
                                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 flex items-center gap-4 py-2 px-6 glass rounded-full border border-white/5">
                                    <ShieldCheck className="w-4 h-4 text-green-500" />
                                    <span>INFRASTRUCTURE: <span className="text-white italic">SCALABLE</span></span>
                                </div>
                                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-4 py-2 px-6 glass rounded-full border border-white/5">
                                    <Clock className="w-3 h-3 text-red-500" />
                                    <span>DEVELOPMENT SLOT: <span className="text-white">Q1 ACTIVE (2 LEFT)</span></span>
                                </div>
                            </div>
                        </motion.div>

                        {/* RIGHT: BANGER CTA */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, x: 50 }}
                            whileInView={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative group lg:pl-12 max-w-[680px] lg:ml-auto w-full mt-12 lg:mt-0"
                        >
                            {/* Ambient Glows */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-red-500/30 to-blue-500/30 blur-3xl opacity-40 group-hover:opacity-100 transition-opacity duration-700" />

                            <div className="relative glass-dark rounded-[24px] border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col items-stretch">
                                {/* Vertical Scanline */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent h-1/2 w-full animate-scan-v pointer-events-none z-20" />

                                {/* Targeting Grid Overlay */}
                                <div className="absolute inset-0 opacity-20 pointer-events-none"
                                    style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '24px 24px' }} />

                                {/* Top Status Bar */}
                                <div className="bg-white/5 border-b border-white/5 px-6 py-3 flex justify-between items-center relative z-30">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                        <span className="text-[9px] font-black text-white uppercase tracking-[0.4em]">PRIORITY_FOCUS: PERFORMANCE_MAX</span>
                                    </div>
                                    <div className="text-[7px] font-mono text-white/40">SYS_TIME: {new Date().toLocaleTimeString()}</div>
                                </div>

                                <div className="p-6 lg:p-8 flex flex-col gap-4 relative z-30">
                                    {/* Authorization Header */}
                                    <div className="flex justify-between items-end">
                                        <div className="space-y-1">
                                            <div className="text-[9px] font-black text-blue-500 uppercase tracking-[0.5em]">FOUNDER_DIRECT</div>
                                            <div className="text-xl font-black text-white italic tracking-tighter uppercase leading-none">EXECUTIVE_ACCESS</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[7px] font-black text-white/40 uppercase tracking-widest">MARKET_RISK</div>
                                            <div className="text-[10px] font-black text-red-500 uppercase">MITIGATED</div>
                                        </div>
                                    </div>

                                    {/* Main Tactical Header */}
                                    <div className="space-y-2">
                                        <h3 className="text-2xl lg:text-4xl font-black italic tracking-tighter text-white uppercase leading-[0.8] text-left">
                                            READY TO <br />
                                            <span className="text-red-500 text-glow">LEAD?</span>
                                        </h3>
                                        <p className="text-[9px] text-slate-400 font-medium tracking-tight max-w-[220px]">
                                            Initiate full-stack market growth. <br />
                                            Targeting <span className="text-white">unrivaled category leadership.</span>
                                        </p>
                                    </div>

                                    {/* CTA Button */}
                                    <div className="relative group/btn">
                                        <Link to="/contact">
                                            <motion.button
                                                whileHover={{ scale: 1.02, boxShadow: "0 0 60px rgba(255,255,255,0.15)" }}
                                                whileTap={{ scale: 0.98 }}
                                                className="group w-full py-6 bg-white text-black text-[14px] font-black uppercase tracking-[0.4em] rounded-2xl flex items-center justify-center gap-4 italic relative overflow-hidden transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                INITIATE BUILD
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
                                            </motion.button>
                                        </Link>
                                        {/* Under-button technical text */}
                                        <div className="absolute -bottom-5 left-0 right-0 flex justify-between px-2 opacity-40">
                                            <span className="text-[5px] font-mono text-white">READY_FOR_HANDSHAKE: [OK]</span>
                                            <span className="text-[5px] font-mono text-white">UPLINK_SECURE: [100%]</span>
                                        </div>
                                    </div>

                                    {/* Trust/Live Section */}
                                    <div className="mt-4 flex items-center justify-between bg-white/[0.02] p-3 rounded-xl border border-white/5">
                                        <div className="flex items-center gap-3">
                                            <div className="flex -space-x-3">
                                                {[
                                                    "https://res.cloudinary.com/dpfapm0tl/image/upload/v1770747933/ChatGPT_Image_Feb_10_2026_01_25_10_PM_azsx64.png",
                                                    "https://res.cloudinary.com/dpfapm0tl/image/upload/v1771260637/280035b5-28eb-46de-afb9-34e98fdc48cb_ijq1zm.jpg",
                                                    "https://res.cloudinary.com/dpfapm0tl/image/upload/v1771260716/ChatGPT_Image_Feb_16_2026_11_51_38_AM_elz0tz.png"
                                                ].map((url, i) => (
                                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-slate-800 flex items-center justify-center overflow-hidden ring-1 ring-red-500/30">
                                                        <img src={url} alt={`Project ${i + 1}`} className="w-full h-full object-cover" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black text-white italic leading-none">127+ PROJECTS_DELIVERED</span>
                                                <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest leading-none mt-1">SUCCESS_RATE: 100%</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[7px] font-black text-green-500 uppercase tracking-widest animate-pulse">LIVE_CONNECTION</div>
                                            <div className="flex gap-1 mt-1 justify-end">
                                                {[...Array(5)].map((_, i) => (
                                                    <div key={i} className={`w-1 h-2 rounded-full ${i < 4 ? 'bg-green-500' : 'bg-white/10'}`} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Authority Seal */}
                            <motion.div
                                animate={{
                                    y: [0, -10, 0],
                                    rotate: [3, -3, 3]
                                }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-8 -right-8 w-28 h-28 bg-[#020408] rounded-3xl flex items-center justify-center border border-white/20 shadow-[0_0_50px_rgba(239,68,68,0.4)] z-40 pointer-events-none backdrop-blur-3xl group-hover:scale-110 transition-transform duration-500"
                            >
                                <div className="absolute inset-2 border border-white/5 rounded-2xl" />
                                <div className="absolute top-0 right-0 p-2 flex gap-1">
                                    <div className="w-1 h-1 rounded-full bg-red-500" />
                                    <div className="w-1 h-1 rounded-full bg-white/10" />
                                </div>
                                <div className="text-center relative">
                                    <div className="text-[8px] font-black text-red-500 uppercase tracking-[0.2em] mb-1">CORE STATUS</div>
                                    <div className="text-4xl font-black text-white italic tracking-tighter leading-none">ACTIVE</div>
                                    <div className="text-[7px] font-black text-slate-500 uppercase tracking-[0.5em] mt-1 italic">PREMIUM_QUALITY</div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* THE TACTICAL DATA RIBBON - BOXING OFF HERO */}
                <div className="absolute bottom-8 left-0 w-full z-40 -rotate-1 skew-x-[0.2deg]">
                    {/* Thin technical data strip (Top) */}
                    <div className="w-full bg-red-500/10 border-y border-white/5 py-1 overflow-hidden backdrop-blur-sm">
                        <div className="flex animate-marquee whitespace-nowrap gap-20 items-center opacity-40">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="flex gap-10 text-[7px] font-mono font-black text-red-500 uppercase tracking-widest">
                                    <span>COORD: 40.7128° N, 74.0060° W</span>
                                    <span>STATUS: OPTIMIZING_SCALE</span>
                                    <span>LATENCY: 12.00ms</span>
                                    <span>UID: ARCHITECT_01_REVLO</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main Authority Strip - Extreme Slim & Technical */}
                    <div className="w-full border-b border-white/10 py-3 overflow-hidden bg-black/95 relative shadow-[0_0_100px_rgba(0,0,0,1)]">
                        <div className="absolute inset-x-0 inset-y-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.02)_50%,transparent_100%)] w-1/4 h-full animate-scan pointer-events-none" />

                        <div className="flex animate-marquee whitespace-nowrap gap-40 items-center relative z-10">
                            {[1, 2, 3, 4].map(i => (
                                <React.Fragment key={i}>
                                    <div className="flex items-center gap-6 group">
                                        <div className="w-2 h-2 bg-red-500 rounded-sm rotate-45 group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                                        <span className="text-lg lg:text-xl font-black italic uppercase tracking-[0.2em] text-white text-glow">UNRIVALED_EXECUTION</span>
                                    </div>
                                    <div className="flex items-center gap-6 group">
                                        <div className="w-2 h-2 bg-blue-500 rounded-sm rotate-45 group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                                        <span className="text-lg lg:text-xl font-black italic uppercase tracking-[0.2em] text-blue-400">CATEGORY_OF_ONE</span>
                                    </div>
                                    <div className="flex items-center gap-6 group">
                                        <div className="w-2 h-2 bg-white rounded-sm rotate-45 group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                                        <span className="text-lg lg:text-xl font-black italic uppercase tracking-[0.2em] text-white">MAX_EFFICIENCY</span>
                                    </div>
                                    <div className="flex items-center gap-6 group">
                                        <div className="w-2 h-2 bg-red-500 rounded-sm rotate-45 group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                                        <span className="text-lg lg:text-xl font-black italic uppercase tracking-[0.2em] text-red-500 text-glow">MARKET_LEADERSHIP</span>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Technical Strip (Bottom) */}
                    <div className="w-full bg-blue-500/10 border-b border-white/5 py-1 overflow-hidden backdrop-blur-sm">
                        <div className="flex animate-marquee whitespace-nowrap gap-20 items-center opacity-40 justify-end" style={{ animationDirection: 'reverse' }}>
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="flex gap-10 text-[7px] font-mono font-black text-blue-500 uppercase tracking-widest">
                                    <span>ENCRYPTION: AES-256-GCM</span>
                                    <span>PROTOCOL: GROWTH_VELOCITY</span>
                                    <span>NODE: {Math.random().toString(36).substring(7).toUpperCase()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* COMBAT READINESS - GLOBAL METRICS */}
            <section className="py-16 lg:py-32 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-white/0 via-red-500/20 to-white/0" />
                    <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-white/0 via-blue-500/20 to-white/0" />
                    <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-white/0 via-purple-500/20 to-white/0" />
                </div>

                <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
                    <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-12">
                        <div className="max-w-4xl">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-px w-12 bg-red-500" />
                                <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.6em]">ELITE_PERFORMANCE_METRICS</span>
                            </div>
                            <h2 className="text-4xl sm:text-6xl lg:text-8xl font-black font-display italic tracking-tight mb-0 uppercase text-white leading-[0.8] lg:leading-[0.75]">
                                PERFORMANCE <br />
                                <span className="gradient-text italic tracking-[-0.05em]">STANDARDS.</span>
                            </h2>
                        </div>
                        <div className="max-w-md lg:pb-10">
                            <p className="text-xl text-slate-400 font-medium leading-tight italic border-l-2 border-white/10 pl-8">
                                "These metrics represent the elimination of market friction and the acceleration of your business vision."
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-2 glass border border-white/5 rounded-[32px] lg:rounded-[48px] bg-white/[0.02]">
                        {[
                            { label: "Security & Resilience", value: "100%", sub: "CRITICAL VULNERABILITIES ELIMINATED", icon: <ShieldAlert className="w-6 h-6" />, color: "text-red-500" },
                            { label: "Execution Speed", value: "12X", sub: "FASTER THAN TRADITIONAL AGENCIES", icon: <Zap className="w-6 h-6" />, color: "text-blue-500" },
                            { label: "Revenue Impact", value: "8-FIG", sub: "SCALABLE SYSTEMS ARCHITECTURE", icon: <Target className="w-6 h-6" />, color: "text-purple-500" },
                            { label: "System Uptime", value: "99.9%", sub: "INSTITUTIONAL RELIABILITY", icon: <Activity className="w-6 h-6" />, color: "text-green-500" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10, backgroundColor: 'rgba(255,255,255,0.04)' }}
                                className="p-6 lg:p-10 rounded-[24px] lg:rounded-[40px] transition-all relative group overflow-hidden"
                            >
                                <div className={`absolute top-6 right-6 lg:top-10 lg:right-10 opacity-20 group-hover:opacity-100 transition-opacity ${stat.color}`}>
                                    {stat.icon}
                                </div>
                                <div className="text-[8px] lg:text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] lg:tracking-[0.4em] mb-4 lg:mb-8">{stat.label}</div>
                                <div className="text-5xl lg:text-7xl font-black italic tracking-tighter text-white mb-4 lg:mb-6 group-hover:scale-110 transition-transform origin-left">{stat.value}</div>
                                <div className={`text-[9px] lg:text-[11px] font-black uppercase tracking-widest ${stat.color} flex items-center gap-2 lg:gap-3`}>
                                    <div className={`w-1.5 h-1.5 rounded-full animate-pulse bg-current`} />
                                    {stat.sub}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TACTICAL ARCHIVE - VERIFIED DEBRIEFS */}
            <section className="py-16 lg:py-32 relative border-y border-white/5 bg-[#020408] overflow-hidden">
                {/* Background HUD Layer */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[3] blur-3xl text-[12rem] font-black text-white italic tracking-tighter uppercase whitespace-nowrap">
                        DECLASSIFIED // ARCHIVE
                    </div>
                </div>

                <div className="max-w-[1800px] mx-auto px-6 lg:px-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-32 items-start">
                        <div className="relative order-1">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeVideo}
                                    initial={{ opacity: 0, x: -40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 40 }}
                                    className="relative aspect-video rounded-[40px] overflow-hidden glass border border-white/10 shadow-[0_0_100px_rgba(30,58,138,0.2)] group cursor-pointer"
                                    onClick={() => togglePlay(testimonials[activeVideo].id)}
                                >
                                    <video
                                        ref={el => videoRefs.current[testimonials[activeVideo].id] = el}
                                        src={testimonials[activeVideo].url}
                                        poster={testimonials[activeVideo].poster}
                                        playsInline
                                        preload="metadata"
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                        onEnded={() => setPlayingId(null)}
                                    />

                                    <div className={`absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${playingId === testimonials[activeVideo].id ? 'opacity-0' : 'opacity-100'}`}>
                                        <div className="relative">
                                            <div className="absolute -inset-10 bg-blue-500/20 blur-3xl animate-pulse" />
                                            <div className="w-32 h-32 rounded-full bg-white/5 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <Play className="w-12 h-12 text-white fill-white ml-2" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Overlay Tactical HUD - Hidden on Mobile */}
                                    <div className="hidden sm:flex absolute top-12 left-12 flex-col gap-2 pointer-events-none">
                                        <div className="flex items-center gap-3 px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl">
                                            <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                                            <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">REPLAYING_INTEL: CLIENT_{activeVideo + 1}</span>
                                        </div>
                                    </div>

                                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none">
                                        <div className="text-[10px] sm:text-[12px] font-black text-blue-500 uppercase tracking-[0.2em] sm:tracking-[0.4em] mb-2 sm:mb-4">{testimonials[activeVideo].client}</div>
                                        <div className="text-2xl sm:text-4xl font-black italic text-white uppercase tracking-tighter mb-0 sm:mb-4 leading-none">{testimonials[activeVideo].title}</div>
                                        <div className="hidden sm:flex gap-4 items-center">
                                            <div className="h-px w-20 bg-white/20" />
                                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">AUTHENTICATED_TRANSMISSION</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Decorative Floating Status - Desktop Only */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 6, repeat: Infinity }}
                                className="hidden lg:block absolute -bottom-10 -right-10 glass p-6 rounded-[32px] border border-white/10 shadow-2xl z-20 max-w-[280px]"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                                        <Activity className="w-6 h-6 text-blue-500" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">MISSION_OUTCOME</div>
                                        <div className="text-lg font-black text-white italic uppercase tracking-tighter leading-tight">"$50K REVENUE GENERATED IN 90 DAYS."</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <div className="order-2">
                            <span className="text-[10px] sm:text-[12px] font-black text-red-500 uppercase tracking-[0.4em] lg:tracking-[0.6em] mb-6 lg:mb-12 block font-mono">// TACTICAL_DEBRIEFING_UNIT</span>
                            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display italic tracking-tight mb-8 lg:mb-16 uppercase text-white leading-[0.8]">
                                VERIFIED <br />
                                <span className="gradient-text italic tracking-[-0.03em]">INTEL.</span>
                            </h2>

                            <div className="space-y-12">
                                {testimonials.map((t, i) => (
                                    <button
                                        key={t.id}
                                        onClick={() => {
                                            setActiveVideo(i);
                                            setPlayingId(null);
                                        }}
                                        className={`flex items-center gap-6 sm:gap-10 w-full text-left transition-all p-5 sm:p-8 rounded-[24px] lg:rounded-[32px] border ${activeVideo === i ? 'bg-white/5 border-white/10 scale-102 lg:scale-105' : 'border-transparent opacity-40 hover:opacity-100 hover:bg-white/[0.02]'}`}
                                    >
                                        <div className="text-3xl sm:text-5xl font-black italic tracking-tighter text-white opacity-20">0{i + 1}</div>
                                        <div className="flex-1">
                                            <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-1 sm:mb-2">{t.client}</div>
                                            <div className="text-lg sm:text-2xl font-black italic uppercase tracking-tight text-white leading-none">{t.title}</div>
                                        </div>
                                        {activeVideo === i && (
                                            <motion.div layoutId="videoIndicator" className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_15px_#3b82f6]" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            <p className="mt-12 lg:mt-20 text-base sm:text-xl text-slate-400 font-medium leading-relaxed italic border-l-4 border-red-500 pl-6 lg:pl-10 max-w-lg">
                                "In this game, there are those who talk about growth, and there are those who build the engines that force it. These are the engines."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE BLITZ PROTOCOL - MISSION TIMELINE */}
            <section className="py-16 lg:py-24 relative border-y border-white/5 overflow-hidden bg-[#020408]">
                {/* Tactical Background Overlay */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-dot-white opacity-[0.03]" />
                    <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/10 to-transparent" />
                </div>

                <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10">
                    <div className="flex flex-col items-center text-center mb-24">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-3 px-6 py-3 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-full mb-8"
                        >
                            <div className="w-2.5 h-2.5 rounded-full bg-fuchsia-500 animate-pulse" />
                            <span className="text-[10px] font-black text-fuchsia-400 uppercase tracking-[0.5em]">MISSION_EXECUTION_STAGES</span>
                        </motion.div>
                        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display italic tracking-tight uppercase leading-[0.8] text-white">
                            THE BLITZ <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-red-400">PROTOCOL.</span>
                        </h2>
                    </div>

                    <div className="relative">
                        {/* Subtler Timeline Line */}
                        <div className="absolute left-[31px] lg:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-fuchsia-500/50 to-red-500/0" />

                        <div className="space-y-12 relative">
                            {protocolSteps.map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: i * 0.1 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    className="relative pl-16 lg:pl-24 group"
                                >
                                    {/* NODE MARKER */}
                                    <div className="absolute left-0 top-0 flex items-center justify-center w-[64px] h-[64px] rounded-2xl bg-[#0a0c10] border border-white/10 z-20 group-hover:border-purple-500/50 transition-colors shadow-2xl">
                                        <div className="text-xl font-black text-white italic tracking-tighter">{i + 1}</div>
                                        <div className="absolute -inset-2 bg-purple-500/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>

                                    {/* UNIFIED MISSION CARD */}
                                    <div className="glass-dark border border-white/5 rounded-[24px] lg:rounded-[32px] p-6 lg:p-10 hover:border-white/10 transition-all bg-white/[0.01]">
                                        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12">
                                            {/* LEFT SIDE: INTEL */}
                                            <div>
                                                <div className="flex flex-wrap items-center gap-3 lg:gap-4 mb-4 lg:mb-6">
                                                    <span className="text-[9px] lg:text-[10px] font-black text-purple-400 uppercase tracking-[0.3em] font-mono px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-md">
                                                        {step.phase}
                                                    </span>
                                                    <span className="text-[9px] lg:text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] font-mono px-3 py-1 bg-white/5 border border-white/10 rounded-md">
                                                        DURATION: {step.duration}
                                                    </span>
                                                </div>

                                                <h3 className="text-2xl lg:text-3xl xl:text-4xl font-black italic uppercase tracking-tighter text-white mb-4 lg:mb-6 leading-none group-hover:text-purple-400 transition-colors">
                                                    {step.title}
                                                </h3>
                                                <p className="text-sm lg:text-lg text-slate-400 font-medium italic leading-relaxed mb-6 border-l-2 border-white/5 pl-4 lg:pl-6">
                                                    "{step.desc}"
                                                </p>
                                            </div>

                                            {/* RIGHT SIDE: MISSION MANIFEST (Deliverables) */}
                                            <div className="bg-black/40 rounded-2xl p-4 lg:p-6 border border-white/5">
                                                <div className="flex items-center gap-2 mb-4 lg:mb-6">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">MISSION_MANIFEST</span>
                                                </div>
                                                <ul className="space-y-3 lg:space-y-4">
                                                    {step.deliverables.map((d, idx) => (
                                                        <li key={idx} className="flex items-center gap-3 group/item">
                                                            <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover/item:border-purple-500/30 transition-colors">
                                                                <CheckCircle2 className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-purple-500/50 group-hover/item:text-purple-400 transition-colors" />
                                                            </div>
                                                            <span className="text-[10px] lg:text-xs font-black uppercase tracking-tight text-slate-300 group-hover/item:text-white transition-colors">{d}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* THE EXPERIENCE - SYSTEM SYNCHRONIZATION */}
            <section className="py-16 lg:py-32 relative overflow-hidden">
                <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
                    <div className="glass border border-white/5 rounded-[32px] lg:rounded-[48px] p-6 lg:p-24 relative overflow-hidden bg-white/[0.01]">
                        {/* Background Overlay */}
                        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-blue-500/5 blur-[200px] rounded-full pointer-events-none" />

                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-32 items-center">
                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="h-px w-8 bg-blue-500" />
                                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">STRATEGIC_TECH_STACK</span>
                                </div>
                                <h2 className="text-4xl lg:text-6xl font-black font-display italic tracking-tight mb-8 uppercase text-white leading-none">
                                    THE TECH <br />
                                    <span className="gradient-text italic tracking-[-0.03em]">ARSENAL.</span>
                                </h2>
                                <p className="text-xl text-slate-400 leading-relaxed font-medium italic max-w-xl border-l border-white/5 pl-8">
                                    "I select technologies not based on hype, but on their ability to provide a sustainable competitive advantage for your business."
                                </p>

                                <div className="grid gap-12">
                                    {engagementExperience.map((item, i) => (
                                        <motion.div
                                            key={i}
                                            whileHover={{ x: 20 }}
                                            className="flex flex-col sm:flex-row gap-6 sm:gap-10 group cursor-default"
                                        >
                                            <div className="flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 glass rounded-[24px] lg:rounded-[32px] flex items-center justify-center text-blue-400 border border-white/10 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500 shadow-xl">
                                                {React.cloneElement(item.icon as React.ReactElement, { className: "w-6 h-6 lg:w-8 lg:h-8" })}
                                            </div>
                                            <div>
                                                <h3 className="text-2xl lg:text-3xl font-black uppercase italic mb-3 tracking-tighter text-white group-hover:text-blue-400 transition-colors uppercase">{item.title}</h3>
                                                <p className="text-sm lg:text-lg text-slate-500 font-medium leading-relaxed max-w-lg">{item.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative">
                                {/* Visual representation of the "Tactical Dashboard" */}
                                <div className="relative glass border border-white/10 rounded-[40px] p-4 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                                    <div className="bg-[#020408] rounded-[32px] p-12 border border-white/5 relative">
                                        {/* HUD Indicators */}
                                        <div className="absolute top-10 right-10 flex gap-4">
                                            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                                            <div className="w-3 h-3 rounded-full bg-white/10" />
                                        </div>

                                        <div className="flex justify-between items-center mb-16 border-b border-white/5 pb-10">
                                            <div className="space-y-2">
                                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">CURRENT_MISSION_LOG</div>
                                                <div className="text-2xl font-black text-white italic uppercase tracking-tighter">PROJECT_VULCAN: ACTIVE</div>
                                            </div>
                                            <span className="text-[10px] font-mono text-white/20">UPLINK_STABLE: 99.9%</span>
                                        </div>

                                        <div className="space-y-6">
                                            {[
                                                { time: "09:00 AM", status: "VERIFIED", msg: "MARKET STRATEGY & BLUEPRINT FINALIZED.", color: "text-blue-500" },
                                                { time: "01:30 PM", status: "LIVE", msg: "FRONTEND INFRASTRUCTURE DEPLOYED TO EDGE.", color: "text-green-500" },
                                                { time: "04:45 PM", status: "OPTIMIZED", msg: "AI CORE INTEGRATED & LATENCY NEUTRALIZED.", color: "text-purple-500" }
                                            ].map((log, i) => (
                                                <div key={i} className="flex gap-6 items-start">
                                                    <span className="text-slate-700 font-mono text-[11px] mt-1 shrink-0">[{log.time}]</span>
                                                    <div className="flex-1">
                                                        <span className={`${log.color} text-[10px] font-black uppercase tracking-widest block mb-1`}>{log.status}:</span>
                                                        <span className="text-slate-400 text-xs font-black uppercase tracking-tight leading-tight">{log.msg}</span>
                                                    </div>
                                                </div>
                                            ))}

                                            <div className="pt-10 mt-10 border-t border-white/5">
                                                <div className="flex justify-between mb-4">
                                                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">MISSION_PROGRESS_BLITZ</span>
                                                    <span className="text-[11px] font-black text-white uppercase tracking-widest">88% COMPLETION</span>
                                                </div>
                                                <div className="w-full bg-white/5 h-4 rounded-full overflow-hidden p-1">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: "88%" }}
                                                        transition={{ duration: 3, ease: "circOut" }}
                                                        className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 rounded-full shadow-[0_0_20px_rgba(30,58,138,0.5)]"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Floating Elements inside the Dashboard */}
                                        <div className="absolute -bottom-10 -left-10 glass-dark p-6 rounded-3xl border border-white/10 z-20">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
                                                    <ShieldCheck className="w-5 h-5 text-green-500" />
                                                </div>
                                                <div className="text-[12px] font-black text-white uppercase tracking-widest leading-none">SECURITY_LOCK: ON</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Main Floating Authority Badge */}
                                <motion.div
                                    animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -top-16 -right-16 glass border border-white/20 p-10 rounded-[48px] shadow-3xl z-40 bg-black max-w-[280px]"
                                >
                                    <div className="flex flex-col gap-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-500">
                                                <Zap className="w-8 h-8" />
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">REALTIME_LATENCY</div>
                                                <div className="text-4xl font-black font-display italic leading-none text-white text-glow">12MS</div>
                                            </div>
                                        </div>
                                        <div className="h-px w-full bg-white/5" />
                                        <div className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] leading-relaxed italic">
                                            "SYSTEM PERFORMANCE IS AT 100% OPERATIONAL CAPACITY."
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE ARCHITECT'S DOSSIER - SOUL TRANSMISSION */}
            <section className="py-16 lg:py-32 relative overflow-hidden bg-white/[0.01]">
                {/* Massive Watermark Background */}
                <div className="absolute top-1/2 left-0 w-full text-center opacity-[0.01] pointer-events-none select-none">
                    <div className="text-[20rem] font-black italic tracking-tighter uppercase leading-none text-white whitespace-nowrap">
                        MANIFESTO // MANIFESTO
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                        {/* Column 1: The Narrative */}
                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, x: -15 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-4 mb-8"
                            >
                                <div className="w-8 h-px bg-red-500" />
                                <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em]">FOUNDER_VISION // THE_PURPOSE</span>
                            </motion.div>

                            <h2 className="text-5xl lg:text-7xl font-black font-display italic tracking-tight mb-12 uppercase text-white leading-none">
                                STRATEGY <br />
                                <span className="gradient-text italic tracking-[-0.02em]">& PHILOSOPHY.</span>
                            </h2>

                            <div className="space-y-10 relative">
                                <div className="absolute left-[-24px] top-0 bottom-0 w-px bg-gradient-to-b from-red-500/50 via-white/10 to-transparent hidden lg:block" />
                                <p className="text-xl lg:text-2xl text-slate-300 font-medium leading-tight italic border-l-2 border-red-500 pl-6 lg:pl-10 py-6 rounded-r-[32px] bg-red-500/[0.02]">
                                    "Architecture is more than code. It is the calculated removal of friction between a visionary idea and market dominance."
                                </p>
                                <p className="text-base lg:text-lg text-slate-400 leading-relaxed font-light italic max-w-xl">
                                    I don't just build systems; I build foundations for the next decade of your enterprise. My philosophy is simple: Eliminate complexity, prioritize velocity, and maintain absolute quality.
                                </p>
                            </div>

                            {/* STRATEGIC DIAGNOSTIC */}
                            <div className="mt-20 p-10 glass border border-white/5 rounded-[40px] relative overflow-hidden bg-black/40">
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <Target className="w-32 h-32 text-red-500" />
                                </div>
                                <div className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mb-8 font-mono">// STRATEGIC_DIAGNOSTIC //</div>
                                <div className="grid md:grid-cols-2 gap-10">
                                    <div className="space-y-4">
                                        <div className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em]">01. MARKET FRICTION</div>
                                        <div className="text-sm text-slate-300 italic font-medium leading-relaxed">
                                            Identifying bottlenecks that prevent rapid scaling and user adoption.
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">02. SCALABLE ARCHITECTURE</div>
                                        <div className="text-sm text-slate-300 italic font-medium leading-relaxed">
                                            Building the cognitive and technical systems required for global expansion.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column 2: The Action & Manifesto */}
                        <div className="relative lg:pt-24">
                            <div className="space-y-20">
                                <div className="glass border border-white/10 rounded-[32px] lg:rounded-[40px] p-6 lg:p-12 relative overflow-hidden bg-white/[0.02]">
                                    <div className="absolute -right-10 -top-10 w-[200px] h-[200px] bg-red-500/5 blur-[100px] rounded-full" />
                                    <h3 className="text-2xl lg:text-3xl font-black italic uppercase tracking-tight mb-8 lg:mb-10 text-white flex items-center gap-4">
                                        <Zap className="w-6 h-6 lg:w-8 lg:h-8 text-yellow-500" />
                                        THE UGLY WORK.
                                    </h3>
                                    <div className="grid gap-4 lg:gap-6">
                                        {[
                                            { label: "Boredom Over Chaos", desc: "Doing the reps even when my mind begged for distraction." },
                                            { label: "Discipline Over Dopamine", desc: "Setting standards no one sees and doing the work no one praises." },
                                            { label: "Full Responsibility", desc: "Making brutally honest choices instead of spinning stories." },
                                            { label: "Embodiment", desc: "Walking every day as if I’m already the man I want to become." }
                                        ].map((work, i) => (
                                            <motion.div
                                                key={i}
                                                whileHover={{ scale: 1.02, x: 10 }}
                                                className="flex gap-4 lg:gap-6 items-start p-4 lg:p-6 bg-white/[0.02] border border-white/5 rounded-2xl lg:rounded-3xl hover:border-red-500/30 transition-all group"
                                            >
                                                <div className="text-red-500 font-black text-lg lg:text-xl pt-0.5 group-hover:scale-110 transition-transform">{i + 1}.</div>
                                                <div>
                                                    <div className="text-[10px] lg:text-[11px] font-black text-white uppercase tracking-[0.2em] mb-1">{work.label}</div>
                                                    <div className="text-xs lg:text-sm text-slate-500 uppercase font-medium tracking-tight leading-relaxed italic">{work.desc}</div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="flex items-center gap-4">
                                        <div className="h-px bg-white/10 flex-1" />
                                        <h3 className="text-[9px] font-black italic uppercase text-slate-500 tracking-[0.4em] font-mono">THE_MANIFESTO.LOG</h3>
                                        <div className="h-px bg-white/10 flex-1" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            "I am not cursed. Suffering was a choice.",
                                            "I bend reality with intent.",
                                            "I walk into challenges as if I hold the solution.",
                                            "I suffer on purpose to build.",
                                            "I will write new stories.",
                                            "I will tune into clarity.",
                                            "Gratitude and grit are the path.",
                                            "I act like the man I want to be."
                                        ].map((point, i) => (
                                            <div key={i} className="flex gap-4 p-5 border border-white/5 rounded-2xl text-[9px] font-bold text-slate-400 uppercase tracking-widest hover:bg-white/[0.05] hover:text-white transition-all cursor-default group">
                                                <span className="text-red-500 font-black">I.{i + 1}</span>
                                                {point}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    className="p-10 bg-white text-black rounded-[40px] relative overflow-hidden group shadow-2xl"
                                >
                                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
                                        <Rocket className="w-24 h-24 lg:w-32 lg:h-32 text-black" />
                                    </div>
                                    <h4 className="text-2xl lg:text-3xl font-black italic uppercase mb-4 tracking-tighter">THE PATH FORWARD</h4>
                                    <p className="text-sm font-bold leading-relaxed mb-6 uppercase tracking-tight max-w-md">
                                        You’re not lost – you’re in transit. The discomfort means you’re shedding an old skin.
                                    </p>
                                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 italic font-mono">
                                        I CHOOSE ACTION. // START.
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE PROPRIETARY SYSTEM - REVLO.OS */}
            <section className="py-16 lg:py-24 bg-red-500/[0.01] relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-center">
                        <div className="relative">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border-[10px] border-dashed border-red-500/5 rounded-[60px] scale-110"
                            />
                            <div className="aspect-square glass border border-white/10 rounded-[60px] p-12 flex items-center justify-center relative overflow-hidden bg-black/40">
                                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-blue-500/10 opacity-30" />
                                <div className="text-center relative z-10">
                                    <Cpu className="w-32 h-32 text-red-500 mx-auto mb-8 animate-pulse" />
                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.6em] mb-4 font-mono">// CORE_ARCH //</div>
                                    <h3 className="text-4xl lg:text-5xl font-black italic uppercase tracking-tighter text-white mb-6">REVLO.OS V4</h3>
                                    <div className="flex flex-wrap justify-center gap-3">
                                        {["REAL-TIME", "MODULAR", "AI-NATIVE"].map(tech => (
                                            <div key={tech} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black text-white uppercase tracking-[0.2em] font-mono">{tech}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Floating Technical Labels */}
                            <motion.div
                                animate={{ x: [0, 10, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute top-10 -left-8 p-6 glass border border-green-500/20 rounded-2xl z-20 shadow-xl"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <span className="text-[9px] font-black text-white uppercase tracking-[0.2em] font-mono">AGENTS: ACTIVE</span>
                                </div>
                            </motion.div>
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-px w-8 bg-red-500" />
                                <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em] font-mono">PROPRIETARY_ADVANTAGE</span>
                            </div>
                            <h2 className="text-5xl lg:text-7xl font-black font-display italic tracking-tight mb-8 uppercase text-white leading-none">
                                BUILT ON <br />
                                <span className="gradient-text italic tracking-[-0.04em]">REVLO.OS.</span>
                            </h2>
                            <p className="text-xl text-slate-400 font-medium leading-relaxed italic mb-12 max-w-xl border-l-2 border-white/10 pl-10">
                                "I build your vision on top of Revlo.OS—a proprietary suite of internal modules that shave months off development time."
                            </p>

                            <div className="grid gap-6">
                                {[
                                    { title: "Universal Auth Module", desc: "Enterprise-grade identity management.", icon: <Fingerprint className="w-6 h-6" /> },
                                    { title: "Neural Orchestrator", desc: "Pre-built connectors for AI clusters.", icon: <Workflow className="w-6 h-6" /> },
                                    { title: "Elastic Data Pipe", desc: "Modular database adapters.", icon: <Target className="w-6 h-6" /> }
                                ].map((sys, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ x: 20, backgroundColor: 'rgba(255,255,255,0.03)' }}
                                        className="flex flex-col sm:flex-row gap-6 sm:gap-8 p-6 lg:p-8 glass border border-white/5 rounded-3xl transition-all group cursor-default"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all shadow-lg">
                                            {sys.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-black uppercase italic tracking-tight text-white mb-2">{sys.title}</h4>
                                            <p className="text-sm text-slate-500 uppercase font-medium tracking-wide font-mono">{sys.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE ARSENAL - TECH STACK */}
            {/* THE INFRASTRUCTURE - TECH ARSENAL */}
            <section className="py-16 lg:py-32 relative">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-12 items-end mb-16">
                        <div className="max-w-2xl">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4 block font-mono">THE_INFRASTRUCTURE</span>
                            <h2 className="text-4xl lg:text-6xl font-black font-display italic tracking-tight mb-6 uppercase text-white leading-none">
                                THE HEAVY <br />
                                <span className="gradient-text-alt tracking-[-0.02em]">ARTILLERY.</span>
                            </h2>
                        </div>
                        <p className="text-lg text-slate-400 font-medium max-w-sm mb-4 leading-relaxed italic border-l border-white/10 pl-6">Full-stack fluency across the entire digital landscape.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {techArsenal.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                viewport={{ once: true }}
                                className="p-6 glass border border-white/5 rounded-3xl hover:border-red-500/20 transition-all group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/5 blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6 group-hover:text-red-500 transition-colors">{item.category}</h3>
                                <div className="space-y-2 mb-8">
                                    {item.tools.map(tool => (
                                        <div key={tool} className="text-[11px] font-black italic text-slate-300 uppercase tracking-tight hover:text-white transition-colors cursor-default">{tool}</div>
                                    ))}
                                </div>
                                <div className="pt-4 border-t border-white/5">
                                    <div className="text-[7px] font-black text-slate-600 uppercase tracking-widest leading-tight italic">ADVANTAGE:</div>
                                    <div className="text-[9px] font-black text-white uppercase mt-1 tracking-tight">{item.reason}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* MISSION STATUS - URGENCY */}
            <section className="py-12 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="glass border border-red-500/20 rounded-3xl py-4 px-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                        <div className="absolute inset-0 bg-red-500/5 animate-pulse -z-10" />
                        <div className="flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                            <div className="text-lg font-black italic uppercase tracking-tight text-white">
                                MISSION STATUS: <span className="text-red-500">LIMITED CAPACITY_OPEN</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-8">
                            <div className="hidden lg:block text-right">
                                <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-0.5 italic">NEXT_SLOT</div>
                                <div className="text-base font-black text-white italic uppercase tracking-tight">MARCH 2026</div>
                            </div>
                            <div className="h-8 w-px bg-white/10 hidden md:block" />
                            <div className="text-right">
                                <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-0.5 italic">OPERATIONS</div>
                                <div className="text-base font-black text-white italic uppercase tracking-tight">2/3 SLOTS FILLED</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE OFFERS - DEFINITIVE TIERS */}
            <section className="py-16 lg:py-24 bg-white/[0.01] border-y border-white/5 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 blur-[150px] rounded-full" />

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-5xl lg:text-7xl font-black font-display italic tracking-tight mb-6 uppercase leading-none">
                            ENGAGEMENT <br />
                            <span className="gradient-text">MODELS.</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Offer 01 */}
                        <motion.div
                            {...fadeIn}
                            className="group p-1 bg-white/5 border border-white/10 rounded-[48px] hover:border-blue-500/30 transition-all"
                        >
                            <div className="bg-[#020408] rounded-[44px] p-8 lg:p-14 relative overflow-hidden h-full flex flex-col">
                                <div className="absolute top-0 right-0 p-10 opacity-5 scale-125 group-hover:scale-100 transition-transform duration-700">
                                    <Rocket className="w-48 h-48 text-blue-500" />
                                </div>
                                <div className="mb-10 relative">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                        <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest">BLITZ_MODE.EXE</span>
                                    </div>
                                    <h3 className="text-4xl font-black italic uppercase tracking-tight mb-3 text-white">THE BLITZ BUILD</h3>
                                    <p className="text-lg text-slate-400 font-medium italic">Vision-to-market buildouts.</p>
                                </div>

                                <div className="space-y-4 mb-12 flex-1">
                                    {[
                                        "End-to-End System Architecture",
                                        "Complex AI Agent Orchestration",
                                        "90-Day Vision-to-Market Blitz",
                                        "Direct Discord Access",
                                        "Ownership of All IP & Assets"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-4 h-4 glass rounded flex items-center justify-center text-blue-500 border border-blue-500/20">
                                                <CheckCircle2 className="w-2.5 h-2.5" />
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-300">{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                                    <div>
                                        <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Entry Protocol</div>
                                        <div className="text-4xl font-black text-white italic tracking-tighter">$5,000+</div>
                                    </div>
                                    <Link to="/contact">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            className="px-8 py-4 bg-white text-black text-[11px] font-black uppercase tracking-widest rounded-xl italic flex items-center gap-3"
                                        >
                                            RESERVE SLOT
                                            <ArrowRight className="w-4 h-4" />
                                        </motion.button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>

                        {/* Offer 02 */}
                        <motion.div
                            {...fadeIn}
                            transition={{ delay: 0.2 }}
                            className="group p-1 bg-white/10 border border-red-500/20 rounded-[48px] hover:border-red-500/50 transition-all relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-red-500/5 blur-3xl opacity-50 pointer-events-none" />
                            <div className="bg-[#020408] rounded-[44px] p-8 lg:p-14 relative overflow-hidden h-full flex flex-col">
                                <div className="absolute top-0 right-0 p-10 opacity-10 scale-125 group-hover:scale-100 transition-transform duration-700">
                                    <Target className="w-48 h-48 text-red-500" />
                                </div>
                                <div className="mb-10 relative">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full mb-4">
                                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444]" />
                                        <span className="text-[8px] font-black text-red-500 uppercase tracking-widest">MISSION_RETAINER.EXE</span>
                                    </div>
                                    <h3 className="text-4xl font-black italic uppercase tracking-tight mb-3 text-white">THE DOMINATION</h3>
                                    <p className="text-lg text-slate-400 font-medium italic">Fractional CTO/CMO ownership.</p>
                                </div>

                                <div className="space-y-4 mb-12 flex-1">
                                    {[
                                        "Full-Cycle Product Evolution",
                                        "Revenue Guarantees (Skin-in-game)",
                                        "GTM & Community Hacking Strategy",
                                        "Continuous Security & Scale Audits",
                                        "Strategic Board-Level Reporting"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-4 h-4 glass rounded flex items-center justify-center text-red-500 border border-red-500/20">
                                                <CheckCircle2 className="w-2.5 h-2.5" />
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-300">{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                                    <div>
                                        <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Strategic Retainer</div>
                                        <div className="text-4xl font-black text-white italic tracking-tighter">CUSTOM</div>
                                    </div>
                                    <Link to="/contact">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            className="px-8 py-4 bg-red-500 text-white text-[11px] font-black uppercase tracking-widest rounded-xl italic flex items-center gap-3 shadow-[0_0_30px_rgba(239,68,68,0.2)]"
                                        >
                                            INQUIRE FAST
                                            <ArrowRight className="w-4 h-4" />
                                        </motion.button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Guarantees Section */}
                    <div className="mt-24 grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Revenue Guarantee", desc: "For retention partners, we map code to bank balances. If we don't hit the target, I keep working." },
                            { title: "IP Protection", desc: "You own 100% of the code, documentation, and infrastructure. Forever. No lock-in." },
                            { title: "Velocity Standard", desc: "No feature takes longer than a week without a visual prototype. We move fast." }
                        ].map((g, i) => (
                            <div key={i} className="text-center group p-6 glass border border-white/5 rounded-3xl">
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 group-hover:text-red-500 transition-all">
                                    <Shield className="w-5 h-5" />
                                </div>
                                <h4 className="text-base font-black uppercase italic mb-2 tracking-tight">{g.title}</h4>
                                <p className="text-[9px] text-slate-500 leading-relaxed font-black uppercase tracking-widest">{g.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* THE MISSIONS - TACTICAL ARCHIVE SHOWCASE */}
            <section className="py-16 lg:py-32 relative overflow-hidden bg-[#020408]">
                {/* Tactical Background Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-dot-white opacity-[0.02]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[400px] bg-red-600/5 blur-[150px] rounded-full opacity-30" />
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-4xl mx-auto mb-20">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="inline-flex items-center gap-3 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full mb-6"
                        >
                            <Terminal className="w-4 h-4 text-red-500" />
                            <span className="text-[10px] font-black text-red-400 uppercase tracking-[0.3em]">MISSION_ARCHIVE // DECLASSIFIED</span>
                        </motion.div>
                        <h2 className="text-5xl lg:text-8xl font-black font-display italic tracking-tighter mb-6 uppercase leading-none text-white">
                            ELITE <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-blue-500">SHOWCASE.</span>
                        </h2>
                    </div>

                    <div className="space-y-16 lg:space-y-32">
                        {eliteProjects.map((project, i) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="group relative"
                            >
                                <div className={`grid grid-cols-1 gap-8 lg:gap-20 items-start ${i % 2 === 0 ? 'lg:grid-cols-[1.2fr,0.8fr]' : 'lg:grid-cols-[0.8fr,1.2fr]'}`}>
                                    {/* Project Visual Container */}
                                    <div className={`relative ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                                        <div className="relative aspect-video rounded-3xl overflow-hidden glass border border-white/10 group-hover:border-purple-500/30 transition-all duration-700">
                                            <div
                                                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                                                style={{ backgroundImage: `url(${project.image})` }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#020408] via-transparent to-transparent opacity-80" />

                                            <div className="absolute bottom-6 left-6 right-6">
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {project.tech.map(t => (
                                                        <span key={t} className="px-2 py-0.5 bg-black/40 backdrop-blur-md border border-white/10 rounded text-[7px] font-black text-white uppercase tracking-widest">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                                <h3 className="text-3xl lg:text-5xl font-black text-white italic tracking-tighter uppercase leading-none">
                                                    {project.name}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Project Intel Summary */}
                                    <div className={`flex flex-col justify-center ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                                        <div className="inline-flex items-center gap-3 px-4 py-1.5 glass-dark border border-purple-500/10 rounded-xl mb-6 w-fit">
                                            <Target className="w-3.5 h-3.5 text-purple-500" />
                                            <span className="text-[8px] font-black text-purple-400 uppercase tracking-[0.2em] italic">{project.tagline}</span>
                                        </div>
                                        <p className="text-xl lg:text-2xl text-slate-300 font-medium leading-[1.3] mb-8 italic border-l-2 border-purple-500 pl-6 bg-purple-500/[0.02] py-4 rounded-r-2xl">
                                            "{project.desc}"
                                        </p>

                                        <div className="grid gap-3 mb-10">
                                            {project.metrics.map((m, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center gap-4 p-4 glass-dark rounded-2xl border border-white/5 transition-all group/item"
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-purple-400 border border-white/5 group-hover/item:border-purple-500/30 transition-all">
                                                        <Activity className="w-4 h-4" />
                                                    </div>
                                                    <div className="text-sm font-black text-white italic uppercase tracking-tight">{m}</div>
                                                </div>
                                            ))}
                                        </div>

                                        <Link to={`/projects/${project.id}`}>
                                            <motion.button
                                                whileHover={{ scale: 1.02, x: 10 }}
                                                className="w-full lg:w-fit px-8 py-4 bg-white text-black text-[11px] font-black uppercase tracking-[0.2em] rounded-xl italic flex items-center justify-center gap-3"
                                            >
                                                ACCESS FULL DOSSIER
                                                <ArrowRight className="w-4 h-4" />
                                            </motion.button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* THE COMPARISON - TACTICAL AUDIT */}
            <section className="py-16 lg:py-32 relative bg-[#020408] overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-grid-white opacity-[0.01] pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-24">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full mb-8"
                        >
                            <ShieldAlert className="w-4 h-4 text-red-500" />
                            <span className="text-[10px] font-black text-red-400 uppercase tracking-[0.4em]">SYSTEMS_AUDIT // VS_TRADITIONAL</span>
                        </motion.div>
                        <h2 className="text-5xl lg:text-7xl font-black font-display italic tracking-tight mb-8 uppercase text-white leading-none">
                            THE <span className="text-red-500">GAP.</span>
                        </h2>
                        <p className="text-lg text-slate-500 font-medium italic max-w-2xl mx-auto uppercase tracking-tighter">
                            "Most agencies are built on overhead and billable hours. Revlo is built on execution and velocity."
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                        {/* TRADITIONAL AGENCY - THE OBSOLETE */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="glass-dark border border-white/5 rounded-[40px] p-8 lg:p-16 relative overflow-hidden group bg-white/[0.01]"
                        >
                            <div className="absolute top-0 left-0 p-8 opacity-5 scale-125 rotate-12">
                                <XCircle className="w-32 h-32 text-slate-500" />
                            </div>
                            <div className="relative z-10">
                                <div className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] mb-8 font-mono">STATUS: OBSOLETE</div>
                                <h3 className="text-3xl lg:text-4xl font-black italic uppercase text-slate-500 mb-10 tracking-tight">TRADITIONAL <br />AGENCIES.</h3>
                                <div className="space-y-8">
                                    {[
                                        { label: "Execution Time", value: "3-9 MONTHS", desc: "Bloated by meetings, bureaucracy, and project managers." },
                                        { label: "Cost & Margin", value: "5-10X OVERHEAD", desc: "You pay for their office, their perks, and their juniors." },
                                        { label: "Ownership", value: "CLOUD LOCK-IN", desc: "Proprietary code that keeps you tethered to their billing." },
                                        { label: "Incentive", value: "BILLABLE HOURS", desc: "Slow work is profitable work for them. Conflict of interest." }
                                    ].map((item, i) => (
                                        <div key={i} className="group/item pb-8 border-b border-white/5 last:border-0">
                                            <div className="flex justify-between items-baseline mb-2">
                                                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{item.label}</span>
                                                <span className="text-xl font-black text-slate-400 italic tracking-tight">{item.value}</span>
                                            </div>
                                            <p className="text-sm text-slate-600 italic font-medium">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* REVLO - THE ADVANTAGE */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-[40px] p-8 lg:p-16 relative overflow-hidden group shadow-[0_30px_60px_rgba(255,255,255,0.03)]"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10 scale-125 -rotate-12 group-hover:rotate-0 transition-transform duration-700">
                                <Rocket className="w-32 h-32 text-red-600" />
                            </div>
                            <div className="relative z-10">
                                <div className="text-[9px] font-black text-red-600 uppercase tracking-[0.4em] mb-8 font-mono">STATUS: SUPERIOR</div>
                                <h3 className="text-3xl lg:text-4xl font-black italic uppercase text-black mb-10 tracking-tight">THE REVLO <br />PROTOCOL.</h3>
                                <div className="space-y-8">
                                    {[
                                        { label: "Execution Time", value: "3-5 WEEKS", desc: "Blitz methodology. Zero fat. Only raw development power." },
                                        { label: "Cost & Margin", value: "ELITE PRICING", desc: "No juniors. No office. You pay for pure architectural talent." },
                                        { label: "Ownership", value: "100% IP TRANSFER", desc: "Clean, documented code that you own entirely on day one." },
                                        { label: "Incentive", value: "REVENUE TARGETS", desc: "I only succeed when you scale. Total alignment of goals." }
                                    ].map((item, i) => (
                                        <div key={i} className="group/item pb-8 border-b border-black/5 last:border-0">
                                            <div className="flex justify-between items-baseline mb-2">
                                                <span className="text-[10px] font-black text-red-600/60 uppercase tracking-widest">{item.label}</span>
                                                <span className="text-xl font-black text-black italic tracking-tight">{item.value}</span>
                                            </div>
                                            <p className="text-sm text-slate-700 italic font-medium">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* COMPARISON METRICS - THE BOTTOM LINE */}
                    <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {comparisons.slice(0, 4).map((c, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-dark border border-white/5 p-8 rounded-3xl relative overflow-hidden group"
                            >
                                <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4 font-mono">{c.label}</div>
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-3 text-slate-500 line-through opacity-40">
                                        <X className="w-3 h-3" />
                                        <span className="text-sm font-black uppercase italic tracking-tight">{c.agency}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-white">
                                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                                        <span className="text-2xl font-black italic uppercase tracking-tight text-glow-white">{c.revlo}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* COMMANDER'S INTEL - FAQ DEBRIEF */}
            <section className="py-16 lg:py-24 relative overflow-hidden bg-[#020408]">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-600/[0.02] blur-[200px] rounded-full -z-10 opacity-60" />
                <div className="absolute inset-0 bg-grid-white opacity-[0.01]" />

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_1.3fr] gap-12 lg:gap-24">
                        <motion.div {...fadeIn}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8"
                            >
                                <MessageSquare className="w-4 h-4 text-slate-400" />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">MISSION_DEBRIEFING_UNIT</span>
                            </motion.div>
                            <h2 className="text-4xl lg:text-6xl font-black font-display italic tracking-tight mb-8 uppercase text-white leading-none">
                                FREQUENT <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-500">OBJECTIONS.</span>
                            </h2>
                            <p className="text-xl text-slate-500 font-medium italic mb-12 max-w-lg leading-relaxed border-l-2 border-red-500/50 pl-10">
                                "The only thing standing between you and market dominance is a lack of clarity. Let's resolve the intel gaps."
                            </p>

                            <div className="p-8 lg:p-10 glass-dark border border-white/5 rounded-[32px] relative overflow-hidden group bg-white/[0.01]">
                                <Quote className="absolute -top-6 -right-6 w-32 h-32 text-red-500/5 group-hover:text-red-500/10 transition-all rotate-12" />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shadow-lg group-hover:scale-105 transition-transform">
                                            <ShieldCheck className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-2xl font-black italic uppercase text-white tracking-tight">The Solo Edge</h3>
                                    </div>
                                    <p className="text-lg text-slate-300 font-medium italic leading-relaxed">
                                        "When you hire me, you aren't just getting a developer. You're getting a military-grade executor personally responsible for every single commit. Zero handoffs. Zero excuses."
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <div className="space-y-6 lg:pt-16">
                            {faqs.map((f, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group p-8 glass-dark rounded-3xl border border-white/5 hover:border-red-500/30 transition-all relative overflow-hidden bg-white/[0.01]"
                                >
                                    <div className="flex items-start gap-6">
                                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[11px] font-black text-red-500 border border-white/10 group-hover:bg-red-500 group-hover:text-white transition-all shadow-md font-mono">
                                            0{i + 1}
                                        </div>
                                        <div className="flex-1 pt-1">
                                            <h4 className="text-xl font-black uppercase italic tracking-tight text-white mb-4">
                                                {f.q}
                                            </h4>
                                            <p className="text-base text-slate-500 font-medium leading-relaxed italic border-t border-white/5 pt-6 group-hover:text-slate-300 transition-colors">
                                                "{f.a}"
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ZERO-RISK MISSION PROTOCOL */}
            <section className="py-32 relative bg-[#020408] overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="bg-red-500/[0.02] rounded-[48px] border border-red-500/10 p-8 lg:p-14 overflow-hidden relative group">
                        <div className="absolute inset-0 bg-grid-white opacity-[0.01] pointer-events-none" />
                        <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-red-500/10 blur-[150px] rounded-full group-hover:bg-red-500/15 transition-all duration-1000" />

                        <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
                            <div>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/15 border border-red-500/30 rounded-full mb-8"
                                >
                                    <ShieldAlert className="w-4 h-4 text-red-500" />
                                    <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em] italic">MISSION_GUARANTEED</span>
                                </motion.div>
                                <h2 className="text-4xl lg:text-6xl font-black font-display italic tracking-tight uppercase text-white mb-8 leading-none">
                                    THE ZERO <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">DRAG POLICY.</span>
                                </h2>
                                <p className="text-xl text-slate-300 font-medium leading-relaxed italic mb-8 max-w-lg border-l border-red-500/50 pl-8">
                                    "I don't bill hours. I ship results. If we don't hit the agreed-upon milestones in the first 30 days, I refund 100% of your deposit."
                                </p>
                            </div>

                            <div className="grid gap-6">
                                {[
                                    { title: "Ownership Guarantee", desc: "You own every single commit. Full IP transfer.", icon: <Lock className="w-6 h-6" /> },
                                    { title: "Response Protocol", desc: "Direct Discord access. Under 4-hour response times.", icon: <Activity className="w-6 h-6" /> },
                                    { title: "Quality Attestation", desc: "12-point security and performance audits.", icon: <Bug className="w-6 h-6" /> }
                                ].map((g, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ x: 10, backgroundColor: 'rgba(239, 68, 68, 0.03)' }}
                                        className="p-6 lg:p-8 glass-dark border border-white/5 rounded-3xl transition-all flex items-start gap-4 lg:gap-8 group/item shadow-xl bg-white/[0.01]"
                                    >
                                        <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20 group-hover/item:scale-105 transition-all">
                                            {g.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-black uppercase italic mb-2 tracking-tight text-white group-hover/item:text-red-400 transition-colors">{g.title}</h4>
                                            <p className="text-sm text-slate-500 font-medium uppercase tracking-wider group-hover/item:text-slate-400 transition-colors italic">{g.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FINAL MISSION CONTROL - CTA */}
            <section className="py-16 lg:py-32 relative overflow-hidden bg-[#020408]">
                {/* Massive Animated Background Text */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.01] pointer-events-none select-none overflow-hidden" >
                    <span className="text-[25vw] font-black italic tracking-tighter uppercase whitespace-nowrap animate-pulse text-white/5">DEPLOY_NOW.</span>
                </div >

                <div className="max-w-7xl mx-auto px-6 text-center relative z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center"
                    >
                        <div className="w-20 h-20 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-12 shadow-xl animate-pulse">
                            <Rocket className="w-10 h-10" />
                        </div>
                        <h2 className="text-5xl lg:text-6xl font-black font-display italic tracking-tight uppercase text-white mb-12 leading-none">
                            READY FOR <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-300 to-white">TAKEOFF?</span>
                        </h2>
                        <p className="text-xl lg:text-2xl text-slate-500 font-medium italic mb-16 max-w-3xl leading-relaxed uppercase tracking-tighter">
                            "The mission clock is ticking. You can stay in the planning phase, or you can deploy and dominate. The choice is binary."
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full max-w-4xl">
                            <Link to="/contact" className="w-full sm:w-auto">
                                <motion.button
                                    whileHover={{ scale: 1.02, boxShadow: '0 0 50px rgba(239, 68, 68, 0.2)' }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full px-16 py-7 bg-red-600 text-white text-[15px] font-black uppercase tracking-[0.4em] rounded-[24px] italic flex items-center justify-center gap-6 shadow-2xl transition-all"
                                >
                                    INITIATE MISSION
                                    <ArrowRight className="w-6 h-6" />
                                </motion.button>
                            </Link>

                            <Link to="/faq" className="w-full sm:w-auto">
                                <motion.button
                                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
                                    className="w-full px-12 py-7 glass text-white text-[13px] font-black uppercase tracking-[0.3em] rounded-[24px] italic border border-white/10 flex items-center justify-center"
                                >
                                    VIEW PROTOCOL FAQ
                                </motion.button>
                            </Link>
                        </div>

                        <div className="mt-24 flex flex-col items-center gap-4 opacity-10">
                            <div className="flex items-center gap-3">
                                {[...Array(6)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-red-500 rounded-full" />)}
                            </div>
                            <span className="text-[10px] font-mono tracking-[0.6em] uppercase text-white font-black">AUTONOMOUS_OPERATIONAL_STATE: ACTIVE</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div >
    );
};

export default EliteDevelopmentPage;

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
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
    X,
    Monitor,
    Smartphone,
    Eye
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
                backgroundColor: `rgba(147, 51, 234, ${config.brightness})`, // Purple base for Websites
                boxShadow: `0 0 10px rgba(147, 51, 234, ${config.brightness})`,
                zIndex: 0
            }}
        />
    );
});

const WebsitesPage: React.FC = () => {
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

    const protocolSteps = [
        {
            phase: "PHASE 01",
            title: "AUTHORITY AUDIT",
            duration: "WEEK 01",
            desc: "We analyze your market positioning. We don't just look at design; we look at psychology, competitor weakness, and conversion gaps.",
            deliverables: ["Competitor Analysis", "Brand Positioning", "User Journey Map", "Conversion Strategy"],
            icon: <Search className="w-6 h-6" />
        },
        {
            phase: "PHASE 02",
            title: "VISUAL ARCHITECTURE",
            duration: "WEEK 02",
            desc: "Designing the interface of a market leader. High-end aesthetics meets military-grade UX. Every pixel is engineered for trust.",
            deliverables: ["High-Fidelity Mockups", "Interactive Prototypes", "Asset Production", "Mobile-First UI"],
            icon: <Layout className="w-6 h-6" />
        },
        {
            phase: "PHASE 03",
            title: "ENGINEERING",
            duration: "WEEK 03",
            desc: "Building the engine. Clean, semantic code optimized for speed and SEO. No bloated builders, just raw performance.",
            deliverables: ["Next.js Integration", "Animation Physics", "CMS Setup", "Speed Optimization"],
            icon: <Code className="w-6 h-6" />
        },
        {
            phase: "PHASE 04",
            title: "DEPLOY & DOMINATE",
            duration: "WEEK 04",
            desc: "Launch day. We push to the edge, index on Google, and verify analytics. Your digital real estate is now open for business.",
            deliverables: ["Global CDN Deploy", "SEO Indexing", "Analytics Dashboard", "Handover Training"],
            icon: <Rocket className="w-6 h-6" />
        }
    ];

    const techArsenal = [
        { category: "Framework", tools: ["Next.js", "React", "TypeScript"], reason: "Google's Preferred Architecture" },
        { category: "Styling", tools: ["Tailwind CSS", "Sass", "PostCSS"], reason: "Pixel-Perfect Responsive Design" },
        { category: "Motion", tools: ["Framer Motion", "GSAP", "Three.js"], reason: "Premium 'Feel' & User Retention" },
        { category: "Content", tools: ["Sanity.io", "Strapi", "MDX"], reason: "Headless CMS for Instant Edits" },
        { category: "Deploy", tools: ["Vercel", "AWS Cloudfront", "Edge"], reason: "Sub-100ms Global Load Times" }
    ];

    const testimonials = [
        {
            url: "https://res.cloudinary.com/dpfapm0tl/video/upload/v1769023688/URGENT_Agency_Owners_and_Entrepreneurs_-_Emotional_Testimonial_Video_Will_Blow_Your_Mind_1_ipz5cc.mp4",
            poster: "https://res.cloudinary.com/dpfapm0tl/video/upload/v1769023688/URGENT_Agency_Owners_and_Entrepreneurs_-_Emotional_Testimonial_Video_Will_Blow_Your_Mind_1_ipz5cc.jpg",
            title: "Instant Authority",
            client: "Ecom Founder",
            id: "v1"
        },
        {
            url: "https://res.cloudinary.com/dpfapm0tl/video/upload/v1769023665/482268807_28714239028190908_2106583740464026710_n_fwvrem.mp4",
            poster: "https://res.cloudinary.com/dpfapm0tl/video/upload/v1769023665/482268807_28714239028190908_2106583740464026710_n_fwvrem.jpg",
            title: "Market Leader",
            client: "Agency Owner",
            id: "v2"
        },
        {
            url: "https://res.cloudinary.com/dpfapm0tl/video/upload/v1769023844/Check_Out_Our_1_Testimonial___You_Cannot_Pay_For_Something_This_Good_1_okr5b6.mp4",
            poster: "https://res.cloudinary.com/dpfapm0tl/video/upload/v1769023844/Check_Out_Our_1_Testimonial___You_Cannot_Pay_For_Something_This_Good_1_okr5b6.jpg",
            title: "Conversion Spike",
            client: "Patient Boost",
            id: "v3"
        }
    ];

    const comparisons = [
        { label: "Performance", agency: "Bloated Wordpress Plugins", revlo: "Hand-Coded Next.js Optimization" },
        { label: "Design", agency: "Generic Templates / Cookie Cutter", revlo: "Custom 'Category of One' Identity" },
        { label: "SEO", agency: "Basic Meta Tags Plugin", revlo: "Semantic HTML & Technical SEO Core" },
        { label: "Security", agency: "Vulnerable to common hacks", revlo: "Enterprise-Grade Static Security" },
        { label: "Ownership", agency: "Dependent on their platform", revlo: "You Own The Code 100%" }
    ];

    const faqs = [
        {
            q: "WHY NOT USE SQUARESPACE OR WIX?",
            a: "Because templates are for hobbyists. To dominate a market, you need a digital asset that you own, that loads instantly, and that is engineered to convert. You don't build a skyscraper on rented land."
        },
        {
            q: "HOW LONG DOES IT TAKE?",
            a: "Our typical timeline is 4 weeks from Kickoff to Launch. We move fast because your market isn't waiting. Week 1 Audit, Week 2 Design, Week 3 Build, Week 4 Launch."
        },
        {
            q: "WILL I BE ABLE TO EDIT CONTENT?",
            a: "Yes. We implement Headless CMS systems (like Sanity.io) that give you a beautiful dashboard to update text, images, and blogs without touching a line of code."
        },
        {
            q: "DO YOU HANDLE COPYWRITING?",
            a: "We provide the strategic framework and headlines that drive conversion. For full content writing, we can partner with your team or bring in our specialist copywriters."
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
        <div className="min-h-screen bg-[#020408] text-white selection:bg-purple-500/30">
            <Helmet>
                <title>Premium Website Design & Brand Strategy | Revlo — Conversion-Engineered</title>
                <meta name="description" content="We don't just design websites; we build conversion engines. Premium UI/UX infrastructure, SEO-optimized, with instant market authority. Starting at $2,500." />
                <meta property="og:title" content="Premium Website Design & Brand Strategy | Revlo" />
                <meta property="og:description" content="We build conversion engines. Premium UI/UX infrastructure, SEO-optimized, with instant market authority." />
                <meta property="og:image" content="https://res.cloudinary.com/dpfapm0tl/image/upload/v1771259282/ChatGPT_Image_Feb_16_2026_11_27_50_AM_uorc1u.png" />
                <meta property="og:url" content="https://www.wearerevlo.com/websites" />
                <meta name="twitter:card" content="summary_large_image" />
                <link rel="canonical" href="https://www.wearerevlo.com/websites" />
            </Helmet>
            <Navigation />

            {/* HERO SECTION */}
            <section className="relative h-screen overflow-hidden flex flex-col justify-center">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(150)].map((_, i) => (
                        <ReactiveBubble key={`bubble-${i}`} mouseX={mouseX} mouseY={mouseY} />
                    ))}
                    <div className="absolute inset-0 bg-grid-white opacity-[0.03]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/[0.05] to-transparent h-[50%] w-full animate-scan-v pointer-events-none" />
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-[0.9fr,1.1fr] gap-12 lg:gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="flex flex-col items-start text-left"
                        >
                            <div className="inline-flex items-center gap-3 px-4 py-2 glass rounded-full mb-8 border border-purple-500/20 animate-flicker">
                                <span className="text-[10px] font-black text-purple-500 uppercase tracking-[0.5em]">
                                    FOUNDATION // DIGITAL REAL ESTATE
                                </span>
                            </div>

                            <h1 className="text-4xl sm:text-6xl lg:text-[6.5rem] font-black font-display italic tracking-tight mb-6 leading-[0.85] lg:leading-[0.8] uppercase text-white text-left relative z-10">
                                <span className="relative inline-block group/impossible">
                                    <span className="relative z-10 text-white">DIGITAL</span>
                                    {/* Electric effects similar to Elite page */}
                                    <div className="absolute inset-0 pointer-events-none z-0 overflow-visible">
                                        <svg className="w-full h-full overflow-visible">
                                            <defs>
                                                <filter id="electric-hum">
                                                    <feTurbulence type="fractalNoise" baseFrequency="0.45" numOctaves="2" result="noise">
                                                        <animate attributeName="seed" from="1" to="100" dur="0.8s" repeatCount="indefinite" />
                                                    </feTurbulence>
                                                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
                                                </filter>

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
                                                DIGITAL
                                            </motion.text>

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
                                                DIGITAL
                                            </motion.text>
                                        </svg>
                                    </div>
                                </span>
                                <br />
                                <span className="gradient-text-alt tracking-[-0.02em]">AUTHORITY.</span>
                            </h1>

                            <p className="text-lg lg:text-2xl text-slate-400 font-medium leading-tight mb-10 max-w-xl text-left">
                                Your website is your headquarters. <br />
                                <span className="text-white font-bold">We build conversion engines that position you as the only logical choice.</span>
                            </p>

                            <div className="hidden lg:flex flex-col gap-4">
                                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 flex items-center gap-4 py-2 px-6 glass rounded-full border border-white/5">
                                    <ShieldCheck className="w-4 h-4 text-green-500" />
                                    <span>TRUST INDEX: <span className="text-white italic">MAXIMIZED</span></span>
                                </div>
                                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-4 py-2 px-6 glass rounded-full border border-white/5">
                                    <Activity className="w-3 h-3 text-purple-500" />
                                    <span>CONVERSION RATE: <span className="text-white">OPTIMIZED</span></span>
                                </div>
                            </div>
                        </motion.div>

                        {/* CTA / VISUAL */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, x: 50 }}
                            whileInView={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative group lg:pl-12 max-w-[680px] lg:ml-auto w-full mt-12 lg:mt-0"
                        >
                            <div className="relative glass-dark rounded-[24px] border border-white/10 shadow-[0_0_80px_rgba(168,85,247,0.2)] overflow-hidden flex flex-col items-stretch">
                                <div className="bg-white/5 border-b border-white/5 px-6 py-3 flex justify-between items-center relative z-30">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                                        <span className="text-[9px] font-black text-white uppercase tracking-[0.4em]">STATUS: ONLINE</span>
                                    </div>
                                    <div className="text-[7px] font-mono text-white/40">LATENCY: 12ms</div>
                                </div>

                                <div className="p-6 lg:p-8 flex flex-col gap-8 relative z-30">
                                    <div className="space-y-4">
                                        <h3 className="text-2xl lg:text-4xl font-black italic tracking-tighter text-white uppercase leading-[0.8] text-left">
                                            CLAIM YOUR <br />
                                            <span className="text-purple-500 text-glow">TERRITORY.</span>
                                        </h3>
                                        <p className="text-[10px] text-slate-400 font-medium tracking-tight max-w-[280px]">
                                            Stop losing leads to competitors with better branding.
                                            It's time to look like the market leader you are.
                                        </p>
                                    </div>

                                    <div className="relative group/btn">
                                        <Link to="/contact">
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="group w-full py-6 bg-white text-black text-[14px] font-black uppercase tracking-[0.4em] rounded-2xl flex items-center justify-center gap-4 italic relative overflow-hidden transition-all shadow-[0_20px_40px_rgba(168,85,247,0.2)]"
                                            >
                                                START THE BUILD
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
                                            </motion.button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* TACTICAL RIBBON */}
                <div className="absolute bottom-8 left-0 w-full z-40 -rotate-1 skew-x-[0.2deg]">
                    <div className="w-full border-b border-white/10 py-3 overflow-hidden bg-black/95 relative shadow-[0_0_100px_rgba(0,0,0,1)]">
                        <div className="flex animate-marquee whitespace-nowrap gap-40 items-center relative z-10">
                            {[1, 2, 3].map(i => (
                                <React.Fragment key={i}>
                                    <div className="flex items-center gap-6 group">
                                        <div className="w-2 h-2 bg-purple-500 rounded-sm rotate-45" />
                                        <span className="text-lg lg:text-xl font-black italic uppercase tracking-[0.2em] text-white">SPEED_OPTIMIZED</span>
                                    </div>
                                    <div className="flex items-center gap-6 group">
                                        <div className="w-2 h-2 bg-white rounded-sm rotate-45" />
                                        <span className="text-lg lg:text-xl font-black italic uppercase tracking-[0.2em] text-slate-400">SEO_DOMINANCE</span>
                                    </div>
                                    <div className="flex items-center gap-6 group">
                                        <div className="w-2 h-2 bg-purple-500 rounded-sm rotate-45" />
                                        <span className="text-lg lg:text-xl font-black italic uppercase tracking-[0.2em] text-white">CONVERSION_ENGINE</span>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* METRICS SECTION */}
            <section className="py-16 lg:py-32 relative overflow-hidden">
                <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
                    <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-12">
                        <div className="max-w-4xl">
                            <h2 className="text-4xl sm:text-6xl lg:text-8xl font-black font-display italic tracking-tight mb-0 uppercase text-white leading-[0.8]">
                                PERFORMANCE <br />
                                <span className="gradient-text-alt italic tracking-[-0.05em]">CORE.</span>
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-2 glass border border-white/5 rounded-[32px] lg:rounded-[48px] bg-white/[0.02]">
                        {[
                            { label: "Page Speed", value: "<200ms", sub: "INSTANT LOAD TIME", icon: <Zap className="w-6 h-6" />, color: "text-yellow-500" },
                            { label: "SEO Score", value: "100/100", sub: "GOOGLE ELITE STATUS", icon: <Search className="w-6 h-6" />, color: "text-blue-500" },
                            { label: "Uptime", value: "99.99%", sub: "GLOBAL EDGE NETWORK", icon: <Globe className="w-6 h-6" />, color: "text-green-500" },
                            { label: "Conversion", value: "3X", sub: "ABOVE INDUSTRY AVERAGE", icon: <TrendingUp className="w-6 h-6" />, color: "text-purple-500" }
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

            {/* TESTIMONIALS (Tactical Archive) */}
            <section className="py-16 lg:py-32 relative border-y border-white/5 bg-[#020408] overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[3] blur-3xl text-[12rem] font-black text-white italic tracking-tighter uppercase whitespace-nowrap">
                        SOCIAL // PROOF
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
                                    className="relative aspect-video rounded-[40px] overflow-hidden glass border border-white/10 shadow-[0_0_100px_rgba(168,85,247,0.2)] group cursor-pointer"
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
                                        <div className="w-32 h-32 rounded-full bg-white/5 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Play className="w-12 h-12 text-white fill-white ml-2" />
                                        </div>
                                    </div>

                                    {/* Overlay Tactical HUD - Hidden on Mobile */}
                                    <div className="hidden sm:flex absolute top-12 left-12 flex-col gap-2 pointer-events-none">
                                        <div className="flex items-center gap-3 px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl">
                                            <div className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
                                            <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">CLIENT_INTEL: {testimonials[activeVideo].client}</span>
                                        </div>
                                    </div>

                                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none">
                                        <div className="text-[10px] sm:text-[12px] font-black text-purple-500 uppercase tracking-[0.2em] sm:tracking-[0.4em] mb-2 sm:mb-4">{testimonials[activeVideo].client}</div>
                                        <div className="text-2xl sm:text-4xl font-black italic text-white uppercase tracking-tighter mb-0 sm:mb-4 leading-none">{testimonials[activeVideo].title}</div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <div className="order-2">
                            <span className="text-[10px] sm:text-[12px] font-black text-purple-500 uppercase tracking-[0.4em] lg:tracking-[0.6em] mb-6 lg:mb-12 block font-mono">// SUCCESS_STORIES</span>
                            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display italic tracking-tight mb-8 lg:mb-16 uppercase text-white leading-[0.8]">
                                REAL <br />
                                <span className="gradient-text-alt italic tracking-[-0.03em]">RESULTS.</span>
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
                                            <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-purple-500 mb-1 sm:mb-2">{t.client}</div>
                                            <div className="text-lg sm:text-2xl font-black italic uppercase tracking-tight text-white leading-none">{t.title}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MISSION PROTOCOL STEPS */}
            <section className="py-24 relative">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="mb-24 md:text-center max-w-3xl mx-auto">
                        <span className="text-[10px] font-black text-purple-500 uppercase tracking-[0.4em] mb-4 block">THE BLUEPRINT</span>
                        <h2 className="text-5xl md:text-7xl font-black font-display italic tracking-tighter text-white uppercase leading-[0.85] mb-8">
                            LAUNCH <span className="text-slate-700">SEQUENCE</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 relative">
                        {/* Central Line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 hidden md:block" />

                        {protocolSteps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`relative ${i % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16 md:mt-24'}`}
                            >
                                {/* Center Node */}
                                <div className={`absolute top-0 w-4 h-4 rounded-full border-2 border-purple-500 bg-[#020408] hidden md:block z-10 ${i % 2 === 0 ? '-right-[9px]' : '-left-[9px]'}`}>
                                    <div className="absolute inset-0 bg-purple-500/50 animate-ping rounded-full" />
                                </div>

                                <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group">
                                    <div className={`mb-6 flex items-center gap-4 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                        <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500 group-hover:scale-110 transition-transform duration-500">
                                            {step.icon}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] leading-tight">{step.phase}</span>
                                            <span className="text-[9px] font-black text-white uppercase tracking-[0.2em] leading-tight opacity-50">{step.duration}</span>
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-black italic text-white uppercase tracking-tight mb-4">{step.title}</h3>
                                    <p className="text-slate-400 font-medium leading-relaxed mb-6">{step.desc}</p>
                                    <div className={`flex flex-wrap gap-2 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                                        {step.deliverables.map((item, d) => (
                                            <span key={d} className="px-3 py-1 rounded-full border border-white/5 bg-white/[0.02] text-[9px] font-bold text-slate-300 uppercase tracking-wider">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TECH/ARSENAL */}
            <section className="py-24 bg-[#050505] relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                        <div>
                            <span className="text-[10px] font-black text-purple-500 uppercase tracking-[0.4em] mb-4 block">THE ARSENAL</span>
                            <h2 className="text-5xl md:text-8xl font-black font-display italic tracking-tighter text-white uppercase leading-[0.8]">
                                TECH <span className="text-slate-800">STACK.</span>
                            </h2>
                        </div>
                        <p className="max-w-md text-slate-400 font-medium italic border-l border-white/10 pl-6">
                            "We don't use drag-and-drop builders. We write clean, high-performance code that Google loves."
                        </p>
                    </div>

                    <div className="space-y-4">
                        {techArsenal.map((tech, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all duration-500"
                            >
                                <div className="flex flex-col md:flex-row items-center p-6 md:p-8 gap-6 md:gap-12">
                                    <div className="w-full md:w-32 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">{tech.category}</div>
                                    <div className="flex-1 flex flex-wrap gap-3">
                                        {tech.tools.map((tool, t) => (
                                            <span key={t} className="px-4 py-2 rounded-lg bg-black/40 border border-white/5 text-white font-bold uppercase tracking-wider text-xs group-hover:border-purple-500/30 transition-colors">
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="w-full md:w-auto text-right text-[10px] font-bold text-purple-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                        {tech.reason}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* COMPARISON */}
            <section className="py-24 relative overflow-hidden">
                <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="bg-gradient-to-br from-white/[0.03] to-transparent rounded-[48px] border border-white/5 p-8 lg:p-16 overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-20">
                            <Shield className="w-32 h-32 text-white" />
                        </div>

                        <div className="mb-16">
                            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white leading-none mb-6">
                                VS THE <span className="text-slate-700">COMPETITION.</span>
                            </h2>
                            <p className="text-slate-400 max-w-xl text-lg">Why businesses switch from Wix/Squarespace to Revlo Custom builds.</p>
                        </div>

                        <div className="space-y-4">
                            {comparisons.map((item, i) => (
                                <div key={i} className="grid grid-cols-1 lg:grid-cols-[1fr,auto,1fr] gap-4 items-center p-4 rounded-2xl bg-black/20 hover:bg-white/[0.02] transition-colors border border-white/5">
                                    <div className="text-right pr-4 hidden lg:block">
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider line-through decoration-red-500/50">{item.agency}</span>
                                    </div>

                                    {/* Mobile View: Stacked */}
                                    <div className="flex flex-col lg:hidden gap-1 mb-2">
                                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">OLD WAY</span>
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider line-through decoration-red-500/50">{item.agency}</span>
                                    </div>

                                    <div className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-[9px] font-black text-white uppercase tracking-[0.2em] text-center w-full lg:w-48 mx-auto">
                                        {item.label}
                                    </div>

                                    <div className="text-left pl-4">
                                        <span className="text-xs font-black text-purple-400 uppercase tracking-wider shadow-glow">{item.revlo}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 relative">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter text-center mb-16 text-white">Debrief & <span className="text-purple-500">FAQ</span></h2>
                    <div className="space-y-6">
                        {faqs.map((faq, i) => (
                            <div key={i} className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-all group">
                                <h3 className="text-xl font-black italic text-white uppercase tracking-tight mb-4 flex items-center gap-4">
                                    <span className="text-purple-500 opacity-50">0{i + 1} //</span>
                                    {faq.q}
                                </h3>
                                <p className="text-slate-400 font-medium leading-relaxed pl-12 border-l-2 border-white/10 group-hover:border-purple-500 transition-colors">
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-24 relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-5xl md:text-9xl font-black font-display italic uppercase tracking-tighter text-white leading-[0.8] mb-12">
                        OWN YOUR <br />
                        <span className="gradient-text-alt">FUTURE.</span>
                    </h2>

                    <Link to="/contact">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-12 py-8 bg-white text-black text-lg font-black uppercase tracking-[0.3em] rounded-3xl shadow-[0_0_80px_rgba(255,255,255,0.3)] hover:shadow-[0_0_120px_rgba(255,255,255,0.5)] transition-all flex items-center gap-6 mx-auto group"
                        >
                            Start The Project
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </motion.button>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default WebsitesPage;

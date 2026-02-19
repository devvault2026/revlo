import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence, useTransform, useMotionValue, useSpring, useAnimationFrame } from 'framer-motion';
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
    Settings,
    Database,
    Activity,
    MessageSquare,
    Globe,
    Layout,
    Workflow,
    TrendingUp,
    LineChart,
    Users,
    Search,
    Monitor,
    Phone,
    Mail,
    Palette,
    BarChart3,
    Clock,
    Briefcase,
    Play,
    Check,
    ChevronRight,
    Smartphone,
    Bot,
    Terminal,
    Lock,
    Eye,
    ChevronDown,
    Quote,
    ExternalLink,
    XCircle,
    ShieldCheck,
    Fingerprint,
    Mic,
    Globe2,
    HardDrive,
    Server,
    Wifi,
    BarChart
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
        brightness: 0.25 + Math.random() * 0.35
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
                backgroundColor: `rgba(59, 130, 246, ${config.brightness})`,
                boxShadow: `0 0 8px rgba(59, 130, 246, ${config.brightness})`,
                zIndex: 0
            }}
        />
    );
});

const GHLAutomationPage = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const ghlCapabilities = [
        {
            title: "Autonomous Sales Agents",
            subtitle: "Voice & SMS Automated Closing",
            description: "HighLevel's native chat is a toy. We build multi-agent systems that handle real human objections via Voice & SMS, booking 24/7 without a single human touch.",
            howItWorks: "Using GHL V2 API + LLM reasoning models. We train agents on your proven sales scripts to handle outbound qualification and inbound booking at a 300% faster clip.",
            goal: "Zero lead decay. Every single lead is touched within 20 seconds. Increased booking rates by 40%.",
            features: ["Outbound Voice Callers", "Context-Aware SMS agents", "Real-time Sentiment Scoring", "Automated CRM Dispositioning"],
            icon: <Phone className="w-5 h-5" />,
            color: "blue"
        },
        {
            title: "Digital Flagships",
            subtitle: "Custom UI/UX CRM Architecture",
            description: "Templates look cheap. We inject custom CSS/JS layers to transform generic GHL pages into high-luxury digital experiences that outperform boutiques in speed and conversion.",
            howItWorks: "Boutique frontend architecture built directly inside the GHL builder, but supercharged with custom design tokens, premium animations, and mobile-optimized flows.",
            goal: "Instant Authority. Create a brand that justifies premium pricing and elite positioning in your market.",
            features: ["Custom CSS Design Tokens", "Premium GSAP Animations", "High-Performance Mobile Flow", "Dynamic Pricing Calculators"],
            icon: <Palette className="w-5 h-5" />,
            color: "purple"
        },
        {
            title: "Recursive 'Guts'",
            subtitle: "Mission-Critical Workflow Engine",
            description: "Workflows are the brain. Most are broken. We build complex, recursive systems that manage massive lead volumes across hundreds of locations without ever missing a trigger.",
            howItWorks: "Master snapshot architecture featuring recursive automation logic, self-healing data triggers, and bi-directional sync across your entire sub-account network.",
            goal: "Absolute Scalability. The infrastructure that allows you to manage 1,000 locations with the same effort as 1.",
            features: ["Recursive Multi-Step logic", "Self-Healing Workflows", "Master Snapshot Packaging", "Global Lead Routing"],
            icon: <Workflow className="w-5 h-5" />,
            color: "green"
        },
        {
            title: "API Sovereignty",
            subtitle: "Custom Sidebar Apps & Extension",
            description: "When GHL hits its limit, we go around it. Custom internal apps and sidebars that bring your proprietary data and external tools into one unified command center.",
            howItWorks: "OAuth 2.0 secure middleware hosted on Vercel. We build custom Dashboards and Sidebar Apps that look and feel like a native part of the GHL UI.",
            goal: "Proprietary IP Assets. Build a platform your clients can never leave because your tools are irreplaceable.",
            features: ["Sidebar Iframe Dashboards", "OAuth 2.0 Bi-directional Sync", "Custom Middleware Apps", "Client Data Portals"],
            icon: <Layers className="w-5 h-5" />,
            color: "red"
        }
    ];

    const protocolSteps = [
        {
            phase: "PHASE 00",
            title: "Operational Recon & Audit",
            duration: "WEEK 01",
            desc: "We deconstruct the mess. We audit your existing GHL account to find data leaks, broken workflows, and missed revenue.",
            deliverables: ["Sub-Account Friction Audit", "Custom API Blueprint", "Conversion Path Analysis"],
            icon: <Search className="w-5 h-5" />
        },
        {
            phase: "PHASE 01",
            title: "The Build-Out",
            duration: "WEEKS 02-03",
            desc: "The heavy heavy. We develop your custom funnels, train the AI agents on your scripts, and install the recursive workflow 'guts'.",
            deliverables: ["Custom Funnel Infrastructure", "AI Agent Logic Training", "Master Workflow Deployment"],
            icon: <Settings className="w-5 h-5" />
        },
        {
            phase: "PHASE 02",
            title: "Full-Force Launch",
            duration: "WEEK 04",
            desc: "Live deployment. We push the systems into the wild. We monitor all triggers and tune the conversion dial for maximum ROI.",
            deliverables: ["Live Environment Sync", "Stress-Test Monitoring", "90-Day Scaling Roadmap"],
            icon: <Rocket className="w-5 h-5" />
        }
    ];

    return (
        <div className="min-h-screen bg-[#020408] text-white selection:bg-blue-500/30 overflow-x-hidden font-sans">
            <Helmet>
                <title>GHL Automation & AI Sales Systems | Revlo — 24/7 Autonomous Operations</title>
                <meta name="description" content="Deploy AI-powered sales agents, automated appointment booking, and CRM integration that works 24/7. Zero lead abandonment. Infinite operational leverage." />
                <meta property="og:title" content="GHL Automation & AI Sales Systems | Revlo" />
                <meta property="og:description" content="Deploy AI-powered sales agents and CRM integration that works 24/7. Zero lead abandonment." />
                <meta property="og:image" content="https://res.cloudinary.com/dpfapm0tl/image/upload/v1771259282/ChatGPT_Image_Feb_16_2026_11_27_50_AM_uorc1u.png" />
                <meta property="og:url" content="https://www.wearerevlo.com/ghl-automation" />
                <meta name="twitter:card" content="summary_large_image" />
                <link rel="canonical" href="https://www.wearerevlo.com/ghl-automation" />
            </Helmet>
            <Navigation />

            {/* CINEMATIC HERO - SCALE ADJUSTED */}
            <section className="relative min-h-[90vh] flex flex-col justify-center pt-24 pb-32">
                {/* Background Tactical Layer */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <svg className="hidden">
                        <defs>
                            <filter id="electric-ghl">
                                <feTurbulence type="fractalNoise" baseFrequency="0.45" numOctaves="2" result="noise">
                                    <animate attributeName="seed" from="1" to="100" dur="0.8s" repeatCount="indefinite" />
                                </feTurbulence>
                                <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
                            </filter>
                            <filter id="arc-ghl">
                                <feTurbulence type="fractalNoise" baseFrequency="0.12" numOctaves="3" result="noise">
                                    <animate attributeName="seed" from="1" to="100" dur="1.5s" repeatCount="indefinite" />
                                </feTurbulence>
                                <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
                            </filter>
                            <filter id="glow-ghl">
                                <feGaussianBlur stdDeviation="2.5" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                    </svg>

                    {[...Array(120)].map((_, i) => (
                        <ReactiveBubble key={`bubble-${i}`} mouseX={mouseX} mouseY={mouseY} />
                    ))}

                    <div className="absolute inset-0 bg-grid-white opacity-[0.02]" />
                    <div className="absolute inset-0 bg-dot-white opacity-[0.03]" />
                    <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/5 blur-[120px] rounded-full" />
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
                    <div className="grid lg:grid-cols-[0.9fr,1.1fr] gap-12 items-center">
                        {/* LEFT: REFINED TYPOGRAPHY */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col items-start"
                        >
                            <div className="inline-flex items-center gap-3 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8">
                                <span className="text-[9px] font-black text-blue-500 uppercase tracking-[0.4em] font-mono">
                                    // ARCHITECTING_DOMINANCE
                                </span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-[6.5rem] font-black font-display italic tracking-tight mb-8 leading-[0.85] lg:leading-[0.8] uppercase text-white relative z-10">
                                <span className="relative inline-block group/infinite">
                                    <span className="relative z-10 text-white">ELITE</span>
                                    <div className="absolute inset-0 pointer-events-none z-0 overflow-visible">
                                        <svg className="w-full h-full overflow-visible">
                                            <motion.text
                                                x="0" y="0.82em"
                                                className="font-black font-display italic text-4xl sm:text-5xl lg:text-[6.5rem] uppercase select-none"
                                                fill="none" stroke="#60a5fa" strokeWidth="3" strokeDasharray="150 1500"
                                                animate={{ strokeDashoffset: [0, -1650] }}
                                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                                filter="url(#arc-ghl) url(#glow-ghl)"
                                                style={{ letterSpacing: '-0.02em' }}
                                            >ELITE</motion.text>
                                        </svg>
                                    </div>
                                </span>
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-800 tracking-tight">AUTOMATION.</span>
                            </h1>

                            <p className="text-lg sm:text-xl lg:text-2xl text-slate-400 font-medium italic leading-tight mb-10 max-w-xl border-l-4 border-blue-600 pl-6 lg:pl-8 text-left">
                                HighLevel is just a database. <br />
                                <span className="text-white font-black uppercase tracking-tight">We build the custom machine that forces growth.</span>
                            </p>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-4 w-full">
                                {[
                                    { val: "20s", l: "RESPONSE" },
                                    { val: "100%", l: "OWNERSHIP" },
                                    { val: "8.4X", l: "SCALE" },
                                    { val: "24/7", l: "REASONING" }
                                ].map((stat, i) => (
                                    <div key={i} className="flex flex-col group">
                                        <div className="text-3xl font-black italic text-white tracking-tighter">{stat.val}</div>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <div className="w-1 h-1 rounded-full bg-blue-500/50" />
                                            <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">{stat.l}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* RIGHT: COMPACT HUD */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, x: 30 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            className="relative group block lg:block max-w-[680px] lg:ml-auto w-full mt-12 lg:mt-0"
                        >
                            <div className="absolute -inset-6 bg-blue-600/10 blur-[80px] opacity-30 group-hover:opacity-60 transition-opacity duration-1000" />

                            <div className="glass-dark border border-white/10 rounded-[40px] overflow-hidden shadow-2xl relative z-10">
                                <div className="bg-white/5 border-b border-white/5 px-8 py-4 flex justify-between items-center backdrop-blur-3xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
                                        <span className="text-[9px] font-black text-white uppercase tracking-[0.4em] font-mono">MISSION_LOG: GHL_ACTIVE</span>
                                    </div>
                                    <div className="text-[7px] font-mono text-white/40">{new Date().toLocaleTimeString()}</div>
                                </div>

                                <div className="p-10 space-y-10">
                                    <div className="flex justify-between items-end">
                                        <div className="space-y-1">
                                            <div className="text-[9px] font-black text-blue-500 uppercase tracking-[0.4em]">DIRECT_ACCESS</div>
                                            <div className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">GHL_CORE</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[8px] font-black text-white/40 uppercase tracking-widest leading-none">CLIENT_STATUS</div>
                                            <div className="text-xl font-black text-green-500 uppercase mt-1">ACTIVE</div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h3 className="text-3xl lg:text-4xl font-black italic tracking-tight text-white uppercase leading-[0.8]">
                                            READY TO <br />
                                            <span className="text-blue-500 text-glow-blue">SCALE UP?</span>
                                        </h3>
                                        <p className="text-[12px] text-slate-400 font-medium leading-relaxed max-w-[240px]">
                                            Stop using basic templates. Secure an <span className="text-white font-bold">Elite GHL Scale-Up slot</span> for Q1.
                                        </p>
                                    </div>

                                    <div className="relative group/btn">
                                        <Link to="/contact">
                                            <motion.button
                                                whileHover={{ scale: 1.02, x: 5, boxShadow: "0 0 40px rgba(59,130,246,0.3)" }}
                                                className="w-full py-6 bg-white text-black text-[13px] font-black uppercase tracking-[0.3em] rounded-[20px] flex items-center justify-center gap-4 italic shadow-2xl transition-all relative overflow-hidden"
                                            >
                                                BOOK OUR GHL AUDIT
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                            </motion.button>
                                        </Link>
                                    </div>

                                    <div className="pt-8 flex items-center justify-between border-t border-white/5">
                                        <div className="flex gap-4 items-center">
                                            <div className="flex -space-x-3">
                                                <div className="w-10 h-10 rounded-full border-2 border-[#020408] overflow-hidden bg-slate-900 shadow-xl">
                                                    <img src="https://res.cloudinary.com/dpfapm0tl/image/upload/v1771260716/ChatGPT_Image_Feb_16_2026_11_51_38_AM_elz0tz.png" alt="Client 1" className="w-full h-full object-cover" />
                                                </div>
                                                <div className="w-10 h-10 rounded-full border-2 border-[#020408] overflow-hidden bg-slate-900 shadow-xl">
                                                    <img src="https://res.cloudinary.com/dpfapm0tl/image/upload/v1771260637/280035b5-28eb-46de-afb9-34e98fdc48cb_ijq1zm.jpg" alt="Client 2" className="w-full h-full object-cover" />
                                                </div>
                                                <div className="w-10 h-10 rounded-full border-2 border-[#020408] overflow-hidden bg-slate-900 shadow-xl">
                                                    <img src="https://res.cloudinary.com/dpfapm0tl/image/upload/v1770163492/icon_x6kgnr.png" alt="Client 3" className="w-full h-full object-cover" />
                                                </div>
                                            </div>
                                            <span className="text-[9px] font-black text-white italic uppercase tracking-widest ml-2">127+ GHL BUILDS</span>
                                        </div>
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-1 h-3 rounded-sm ${i < 5 ? 'bg-green-500' : 'bg-white/10'}`} />)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* THE TACTICAL DATA RIBBON SYSTEM - 3 PARTS - BOXING OFF HERO */}
                <div className="absolute bottom-[-60px] left-0 w-full z-40 -rotate-1 skew-x-[0.2deg]">
                    {/* Part 1: Top Technical Strip (Slim & Subtle) */}
                    <div className="w-full bg-blue-500/5 border-y border-white/5 py-1 overflow-hidden backdrop-blur-sm">
                        <div className="flex animate-marquee whitespace-nowrap gap-16 items-center opacity-30">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="flex gap-10 text-[7px] font-mono font-black text-blue-400 uppercase tracking-widest items-center">
                                    <span>COORD: 34.0522° N, 118.2437° W</span>
                                    <span>ENCRYPTION: AES-256</span>
                                    <span>STATUS: OPTIMIZING_FORCE</span>
                                    <span>UID: ARCHITECT_01_GHL</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Part 2: Main Authority Strip (Bold & Dark) */}
                    <div className="w-full bg-black/95 border-b border-white/10 py-5 overflow-hidden relative shadow-[0_0_100px_rgba(0,0,0,1)]">
                        <div className="absolute inset-x-0 inset-y-0 bg-[linear-gradient(90deg,transparent_0%,rgba(59,130,246,0.05)_50%,transparent_100%)] w-1/4 h-full animate-scan pointer-events-none" />
                        <div className="flex animate-marquee whitespace-nowrap gap-48 items-center relative z-10">
                            {[1, 2, 3, 4].map(i => (
                                <React.Fragment key={i}>
                                    <div className="flex items-center gap-8 group">
                                        <div className="w-2.5 h-2.5 bg-blue-500 rounded-sm rotate-45 group-hover:scale-150 transition-transform shadow-[0_0_20px_rgba(59,130,246,1)]" />
                                        <span className="text-2xl lg:text-3xl font-black italic uppercase tracking-[0.2em] text-white">RECURSIVE_AUTOMATION</span>
                                    </div>
                                    <div className="flex items-center gap-8 group">
                                        <div className="w-2.5 h-2.5 bg-indigo-500 rounded-sm rotate-45 group-hover:scale-150 transition-transform shadow-[0_0_20px_rgba(79,70,229,1)]" />
                                        <span className="text-2xl lg:text-3xl font-black italic uppercase tracking-[0.2em] text-blue-400">AUTONOMOUS_SALES_AGENTS</span>
                                    </div>
                                    <div className="flex items-center gap-8 group">
                                        <div className="w-2.5 h-2.5 bg-white rounded-sm rotate-45 group-hover:scale-150 transition-transform shadow-[0_0_20px_rgba(255,255,255,1)]" />
                                        <span className="text-2xl lg:text-3xl font-black italic uppercase tracking-[0.2em] text-white">ELITE_GHL_SNAP_SHOTS</span>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Part 3: Bottom Technical Strip (Reverse Scrolling) */}
                    <div className="w-full bg-indigo-500/5 border-b border-white/5 py-1 overflow-hidden backdrop-blur-sm">
                        <div className="flex animate-marquee whitespace-nowrap gap-20 items-center opacity-30 justify-end" style={{ animationDirection: 'reverse' }}>
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="flex gap-12 text-[7px] font-mono font-black text-indigo-400 uppercase tracking-widest items-center">
                                    <span>VERSION: GHL_FORCE_V12</span>
                                    <span>LATENCY: 8.00ms</span>
                                    <span>UPTIME: 99.99%</span>
                                    <span>PROTOCOL: SOVEREIGN_ASSET</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* TOTAL SHEBANG - BEYOND THE TEMPLATE */}
            <section className="py-20 lg:py-32 relative overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <div className="flex flex-col lg:flex-row items-end justify-between mb-16 lg:mb-24 gap-8">
                        <div>
                            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.6em] mb-4 block font-mono">// GHL_CAPABILITIES</span>
                            <h2 className="text-5xl sm:text-6xl lg:text-9xl font-black font-display italic tracking-tight mb-0 uppercase text-white leading-[0.8]">
                                THE TOTAL <br />
                                <span className="gradient-text italic tracking-[-0.05em]">SHEBANG.</span>
                            </h2>
                        </div>
                        <p className="text-lg lg:text-2xl text-slate-400 font-medium leading-tight max-w-md italic border-l-2 border-white/10 pl-8 lg:pb-12 text-left">
                            "Templates are for beginners. We build custom engines into GHL that your competitors can't even conceptualize."
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {ghlCapabilities.map((cap, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-dark p-8 lg:p-12 rounded-[40px] border border-white/5 relative group hover:border-blue-500/30 transition-all duration-500"
                            >
                                <div className="absolute top-0 right-0 p-12 opacity-[0.01]">
                                    {React.cloneElement(cap.icon as React.ReactElement, { className: "w-64 h-64" })}
                                </div>

                                <div className="relative z-10 space-y-10">
                                    <div className="flex items-center gap-6">
                                        <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-${cap.color}-500 group-hover:scale-110 transition-transform`}>
                                            {React.cloneElement(cap.icon as React.ReactElement, { className: "w-6 h-6" })}
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-1 font-mono">{cap.subtitle}</div>
                                            <h3 className="text-3xl font-black italic uppercase text-white tracking-tighter leading-none">{cap.title}</h3>
                                        </div>
                                    </div>

                                    <p className="text-xl text-slate-400 italic font-medium leading-relaxed">
                                        "{cap.description}"
                                    </p>

                                    <div className="grid md:grid-cols-2 gap-10 pt-10 border-t border-white/5">
                                        <div className="space-y-4">
                                            <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-3">
                                                <Terminal className="w-4 h-4" />
                                                ENGINEERING
                                            </h4>
                                            <p className="text-xs text-slate-500 italic font-medium leading-relaxed">
                                                {cap.howItWorks}
                                            </p>
                                        </div>
                                        <div className="space-y-4">
                                            <h4 className="text-[10px] font-black text-green-500 uppercase tracking-widest flex items-center gap-3">
                                                <Target className="w-4 h-4" />
                                                THE_GOAL
                                            </h4>
                                            <p className="text-xs text-slate-300 font-bold italic leading-relaxed">
                                                {cap.goal}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-3 pt-6">
                                        {cap.features.map((f, idx) => (
                                            <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-[9px] font-black text-slate-500 uppercase tracking-widest group/item hover:bg-blue-600/10 hover:border-blue-500/20 transition-all cursor-default">
                                                <Check className="w-3 h-3 text-blue-500" />
                                                {f}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SCALE BLITZ - REFINED TIMELINE */}
            <section className="py-32 relative border-t border-white/5 overflow-hidden">
                <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col items-center text-center mb-32">
                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.6em] mb-8 block font-mono">// FORCE_PROTOCOL</span>
                        <h2 className="text-5xl lg:text-7xl font-black font-display italic tracking-tight uppercase text-white leading-none">
                            THE 90-DAY <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-700">BLITZ.</span>
                        </h2>
                    </div>

                    <div className="relative">
                        <div className="absolute left-[39px] lg:left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-white/5 to-transparent lg:-translate-x-1/2" />

                        <div className="space-y-32">
                            {protocolSteps.map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className={`relative flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}
                                >
                                    <div className="absolute left-0 lg:left-1/2 top-0 w-20 h-20 rounded-[28px] bg-[#020408] border-2 border-blue-500 flex items-center justify-center lg:-translate-x-1/2 z-20 shadow-2xl">
                                        <span className="text-3xl font-black text-white italic tracking-tighter">0{i}</span>
                                    </div>

                                    <div className="w-full lg:w-[45%] pl-24 lg:pl-0">
                                        <div className="glass-dark border border-white/5 rounded-[40px] p-10 lg:p-14 hover:border-blue-500/20 transition-all duration-700 relative overflow-hidden">
                                            <div className="flex items-center gap-6 mb-8">
                                                <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full font-mono">{step.phase}</span>
                                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono italic">{step.duration}</span>
                                            </div>
                                            <h3 className="text-3xl lg:text-4xl font-black italic uppercase text-white mb-6 tracking-tighter leading-none">{step.title}</h3>
                                            <p className="text-lg text-slate-400 italic font-medium leading-[1.2] mb-10 border-l-4 border-white/5 pl-8">"{step.desc}"</p>

                                            <div className="grid sm:grid-cols-2 gap-8 pt-8 border-t border-white/5">
                                                {step.deliverables.map((d, idx) => (
                                                    <div key={idx} className="flex items-center gap-3">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                                                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{d}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden lg:block lg:w-[45%]" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* COMPARISON - BALANCED */}
            <section className="py-32 relative border-t border-white/5 bg-[#020408]">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-32 max-w-4xl mx-auto">
                        <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.8em] mb-8 block font-mono">// MARKET_AUDIT</span>
                        <h2 className="text-5xl lg:text-8xl font-black font-display italic tracking-tight uppercase text-white leading-none">
                            DOMINATE THE <span className="text-red-500">STANDARD.</span>
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* TRADITIONAL AGENCY CARD */}
                        <div className="p-8 lg:p-12 bg-white/[0.02] border border-white/10 rounded-[32px] lg:rounded-[48px] space-y-10 lg:space-y-16 opacity-60 hover:opacity-100 transition-all duration-700 group cursor-default">
                            <div>
                                <div className="text-[9px] font-black text-slate-500 uppercase tracking-[0.6em] mb-8 lg:mb-12 font-mono">STATUS: OBSOLETE</div>
                                <h3 className="text-3xl lg:text-4xl font-black italic uppercase text-slate-400 leading-[0.85] lg:leading-[0.8]">THE TYPICAL <br />SaaS AGENCY.</h3>
                            </div>
                            <ul className="space-y-8 lg:space-y-10">
                                {[
                                    { l: "Automations", v: "Fragile Loops", d: "Breaks with lead volume." },
                                    { l: "AI Sales", v: "Static Chatbots", d: "Zero reasoning capability." },
                                    { l: "Platform", v: "Templates", d: "Generic brand authority." },
                                    { l: "Philosophy", v: "Monthly Rent", d: "You own nothing." }
                                ].map((item, i) => (
                                    <li key={i} className="space-y-2 pl-6 lg:pl-8 border-l border-white/10">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-0">
                                            <span className="text-[9px] lg:text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.l}</span>
                                            <span className="text-xl lg:text-2xl font-black text-slate-300 italic tracking-tight uppercase opacity-50 bg-clip-text text-transparent bg-gradient-to-r from-slate-200 to-slate-500">{item.v}</span>
                                        </div>
                                        <p className="text-[11px] lg:text-xs text-slate-500 italic font-medium">{item.d}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* REVLO FORCE LAB CARD */}
                        <div className="p-8 lg:p-12 bg-blue-600/[0.02] border border-blue-500/20 rounded-[32px] lg:rounded-[48px] space-y-10 lg:space-y-16 shadow-2xl relative overflow-hidden transition-all duration-700 hover:border-blue-400/40">
                            <div className="absolute top-0 right-0 p-8 lg:p-16 opacity-[0.02]">
                                <ShieldCheck className="w-48 h-48 lg:w-64 lg:h-64 text-blue-500" />
                            </div>
                            <div className="relative z-10">
                                <div className="text-[9px] font-black text-blue-500 uppercase tracking-[0.6em] mb-8 lg:mb-12 font-mono">STATUS: ELITE</div>
                                <h3 className="text-3xl lg:text-4xl font-black italic uppercase text-white leading-[0.85] lg:leading-[0.8]">THE REVLO <br />FORCE LAB.</h3>
                            </div>
                            <ul className="space-y-8 lg:space-y-10 relative z-10">
                                {[
                                    { l: "Automations", v: "Recursive Logic", d: "Built for infinite scale." },
                                    { l: "AI Sales", v: "Reasoning Agents", d: "Voice & SMS context-aware." },
                                    { l: "Platform", v: "Digital Flagship", d: "Injected custom-code design." },
                                    { l: "Philosophy", v: "Sovereign Assets", d: "100% Transfer. You own it." }
                                ].map((item, i) => (
                                    <li key={i} className="space-y-2 pl-6 lg:pl-8 border-l border-blue-500/30">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-0">
                                            <span className="text-[9px] lg:text-[10px] font-black text-blue-500 uppercase tracking-widest">{item.l}</span>
                                            <span className="text-xl lg:text-2xl font-black text-blue-400 italic tracking-tight uppercase">{item.v}</span>
                                        </div>
                                        <p className="text-[11px] lg:text-xs text-slate-400 italic font-medium">{item.d}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* FINAL CTA - MEASURED SCALE */}
            <section className="py-24 lg:py-48 relative overflow-hidden bg-[#020408]">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
                <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-5xl lg:text-[10rem] font-black font-display italic tracking-tight mb-16 uppercase leading-[0.8] text-white">
                        THE FUTURE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-700 to-indigo-950 drop-shadow-[0_0_40px_rgba(59,130,246,0.3)]">IS ACTIVE.</span>
                    </h2>
                    <p className="text-xl lg:text-4xl text-slate-500 font-medium italic mb-20 max-w-3xl mx-auto leading-tight">
                        "Stop building on shifting templates. Secure the <span className="text-white">Elite GHL Infrastructure</span> your business needs."
                    </p>
                    <Link to="/contact">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 0 100px rgba(59,130,246,0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-6 lg:px-24 lg:py-10 bg-blue-600 text-white text-[15px] lg:text-[18px] font-black uppercase tracking-[0.3em] lg:tracking-[0.5em] rounded-[24px] lg:rounded-[36px] italic shadow-2xl hover:bg-blue-500 transition-all flex items-center gap-4 lg:gap-8 mx-auto"
                        >
                            INITIATE BLITZ
                            <ChevronRight className="w-8 h-8" />
                        </motion.button>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default GHLAutomationPage;

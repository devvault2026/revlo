import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useAnimationFrame } from 'framer-motion';
import {
    Cpu,
    Shield,
    Zap,
    Target,
    ArrowRight,
    CheckCircle2,
    Layers,
    Rocket,
    Terminal,
    Activity,
    Lock,
    MessageSquare,
    Clock,
    Search,
    ShieldAlert,
    Bug,
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    Quote,
    ShieldCheck,
    XCircle,
    X,
    Smartphone,
    Globe,
    Database,
    Bot
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
                backgroundColor: `rgba(239, 68, 68, ${config.brightness})`, // Red for OpenClaw/Lobster theme? Or keep purple? Let's go Red/Orange for Lobster
                boxShadow: `0 0 10px rgba(239, 68, 68, ${config.brightness})`,
                zIndex: 0
            }}
        />
    );
});

// The Animated Mascot - "The Claw"
const OpenClawMascot = () => {
    return (
        <motion.div
            className="absolute -top-20 -right-2 lg:-top-28 lg:-right-12 z-50 pointer-events-none select-none w-32 h-32 lg:w-40 lg:h-40 block"
            animate={{
                y: [0, -12, 0],
                rotate: [0, 2, -2, 0]
            }}
            transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            <div className="relative w-full h-full scale-90">
                {/* Antennas - SVG Curves */}
                <svg className="absolute -top-6 w-full h-24 overflow-visible" viewBox="0 0 100 50">
                    <motion.path
                        d="M35 50 Q 25 10 10 20"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="4"
                        strokeLinecap="round"
                        animate={{ d: ["M35 50 Q 25 10 10 20", "M35 50 Q 20 15 5 25", "M35 50 Q 25 10 10 20"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.path
                        d="M65 50 Q 75 10 90 20"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="4"
                        strokeLinecap="round"
                        animate={{ d: ["M65 50 Q 75 10 90 20", "M65 50 Q 80 15 95 25", "M65 50 Q 75 10 90 20"] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    />
                </svg>

                {/* Arms - Behind Body */}
                <motion.div
                    className="absolute top-[45%] -left-3 w-8 h-8 bg-[#dc2626] rounded-full"
                    animate={{ rotate: [0, -15, 0], x: [0, -2, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                    className="absolute top-[45%] -right-3 w-8 h-8 bg-[#dc2626] rounded-full"
                    animate={{ rotate: [0, 15, 0], x: [0, 2, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />

                {/* Legs */}
                <div className="absolute bottom-0 left-[35%] w-3 h-6 bg-[#b91c1c] rounded-b-md z-0" />
                <div className="absolute bottom-0 right-[35%] w-3 h-6 bg-[#b91c1c] rounded-b-md z-0" />

                {/* Main Body */}
                <div className="absolute inset-2 bg-[#ef4444] rounded-full shadow-[inset_-4px_-4px_20px_rgba(0,0,0,0.3),0_0_40px_rgba(239,68,68,0.4)] flex items-center justify-center border-t border-white/20 z-10">
                    <div className="relative w-full h-full">
                        {/* Eyes */}
                        <div className="absolute top-[35%] left-[28%] w-4 h-5 bg-black rounded-full shadow-inner flex items-center justify-center">
                            <motion.div
                                className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)]"
                                animate={{ opacity: [1, 0.6, 1] }}
                                transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
                            />
                        </div>
                        <div className="absolute top-[35%] right-[28%] w-4 h-5 bg-black rounded-full shadow-inner flex items-center justify-center">
                            <motion.div
                                className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)]"
                                animate={{ opacity: [1, 0.6, 1] }}
                                transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const OpenClawPage: React.FC = () => {
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

    // Social Sharing & SEO Metadata
    // React.useEffect removed - replaced by Helmet below
    const fadeIn = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    const protocolSteps = [
        {
            phase: "PHASE 01",
            title: "THE INSTALLATION",
            duration: "HOUR 01",
            desc: "We install OpenClaw on your machine. Mac, Windows, or Linux. Private by default—your data stays yours.",
            deliverables: ["Environment Setup", "Node.js Configuration", "Privacy Hardening", "Local LLM Connection"],
            icon: <Terminal className="w-6 h-6" />
        },
        {
            phase: "PHASE 02",
            title: "NEURAL CONNECTION",
            duration: "HOUR 02",
            desc: "Connecting the brain. We link OpenClaw to your preferred chat apps—WhatsApp, Telegram, Discord, or Slack.",
            deliverables: ["Comms Integration", "Authorized User Setup", "Secure Tunneling", "Real-time Response"],
            icon: <MessageSquare className="w-6 h-6" />
        },
        {
            phase: "PHASE 03",
            title: "SKILL INJECTION",
            duration: "HOUR 03-04",
            desc: "We configure the autonomous skills. Browser control, file access, calendar management, and custom workflows.",
            deliverables: ["Browser Automation", "File System Access", "Calendar Sync", "Email Management"],
            icon: <Zap className="w-6 h-6" />
        },
        {
            phase: "PHASE 04",
            title: "AUTONOMOUS OPERATIONS",
            duration: "PERMANENT",
            desc: "The system runs itself. Zero human intervention. It learns, remembers, and acts on your behalf 24/7.",
            deliverables: ["Persistent Memory", "Self-Healing Workflows", "Proactive Tasks", "24/7 Availability"],
            icon: <Bot className="w-6 h-6" />
        }
    ];

    const techArsenal = [
        { category: "Comms", tools: ["WhatsApp", "Telegram", "Discord"], reason: "Universal Control Interface" },
        { category: "Brain", tools: ["Claude", "GPT-4", "Local LLMs"], reason: "Cognitive Reasoning Core" },
        { category: "Vision", tools: ["Browser", "Screen Analysis", "OCR"], reason: "Visual Context Understanding" },
        { category: "Memory", tools: ["Vector DB", "JSON Storage", "Context Window"], reason: "Persistent Long-term Recall" },
        { category: "Action", tools: ["Shell", "File System", "API Calls"], reason: "Full System Agency" }
    ];

    const testimonials = [
        {
            handle: "@jonahships_",
            content: "Setup @openclaw yesterday. All I have to say is, wow. First I was using my Claude Max sub and I used all of my limit quickly, so today I had my claw bot setup a proxy... The future is already here",
            role: "Early Adopter"
        },
        {
            handle: "@danpeguine",
            content: "Why @openclaw is nuts: your context and skills live on YOUR computer, not a walled garden. 'Personal AI assistant' undersells it — it's a company assistant, family assistant, team tool.",
            role: "Founder"
        },
        {
            handle: "@lycfyi",
            content: "After years of AI hype, I thought nothing could faze me. Then I installed @openclaw. From nervous 'hi what can you do?' to full throttle - design, code review, taxes, PM... AI as teammate, not tool.",
            role: "Digital Native"
        },
        {
            handle: "@nateliason",
            content: "Yeah this was 1,000% worth it. Separate Claude subscription + Claw, managing Claude Code sessions I can kick off anywhere... The future is here.",
            role: "Writer & Investor"
        },
        {
            handle: "@rovensky",
            content: "It will actually be the thing that nukes a ton of startups. The fact that it's hackable and hostable on-prem will make sure tech like this DOMINATES conventional SaaS.",
            role: "Tech Analyst"
        },
        {
            handle: "@snopoke",
            content: "Honestly it feels like it did to run Linux Vs windows 20 years ago. You're in control, you can hack it and make it yours instead of relying on some tech giant.",
            role: "Developer"
        }
    ];

    const faqs = [
        {
            q: "DOES IT REALLY REQUIRE ZERO HUMAN INTERVENTION?",
            a: "Once configured, yes. It has persistent memory and autonomous loops. It checks your calendar, sorts your email, and executes tasks without you needing to hold its hand."
        },
        {
            q: "IS MY DATA SAFE?",
            a: "OpenClaw runs on YOUR machine or YOUR private cloud instance. Your data never leaves your control. No middleman, no walled gardens."
        },
        {
            q: "WHAT IF I WANT TO ADD NEW SKILLS?",
            a: "The system is hackable. We can install new community skills or you can ask it to write its own skills. It's designed to evolve."
        },
        {
            q: "CAN IT REALLY CONTROL MY BROWSER?",
            a: "Yes. It can open browsers, click buttons, fill forms, and scrape data. It interacts with the web just like a human user would."
        }
    ];

    return (
        <div className="min-h-screen bg-[#020408] text-white selection:bg-red-500/30">
            <Helmet>
                <title>OPENCLAW: THE AGENT THAT OWNS THE MARKET // REVLO</title>
                <meta name="description" content="Deploy the unimaginable. OpenClaw is the world #1 autonomous infrastructure OS. From Sonnet 4.6 reasoning to 1M token context, we build the agents that dominate your market while you sleep." />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.wearerevlo.com/openclaw" />
                <meta property="og:title" content="OPENCLAW: THE AGENT THAT OWNS THE MARKET // REVLO" />
                <meta property="og:description" content="Deploy the unimaginable. OpenClaw is the world #1 autonomous infrastructure OS. From Sonnet 4.6 reasoning to 1M token context, we build the agents that dominate your market while you sleep." />
                <meta property="og:image" content="https://res.cloudinary.com/dpfapm0tl/image/upload/v1771383151/ChatGPT_Image_Feb_17_2026_09_52_11_PM_pm7mkm.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content="https://www.wearerevlo.com/openclaw" />
                <meta name="twitter:title" content="OPENCLAW: THE AGENT THAT OWNS THE MARKET // REVLO" />
                <meta name="twitter:description" content="Deploy the unimaginable. OpenClaw is the world #1 autonomous infrastructure OS. From Sonnet 4.6 reasoning to 1M token context, we build the agents that dominate your market while you sleep." />
                <meta name="twitter:image" content="https://res.cloudinary.com/dpfapm0tl/image/upload/v1771383151/ChatGPT_Image_Feb_17_2026_09_52_11_PM_pm7mkm.png" />
            </Helmet>
            <Navigation />

            {/* HERO SECTION - TACTICAL COMMAND CENTER */}
            <section className="relative min-h-screen lg:h-screen overflow-hidden flex flex-col justify-center py-24 lg:py-0">
                {/* Live Tactical Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Interactive Bubbles */}
                    {[...Array(150)].map((_, i) => (
                        <ReactiveBubble key={`bubble-${i}`} mouseX={mouseX} mouseY={mouseY} />
                    ))}

                    <div className="absolute inset-0 bg-grid-white opacity-[0.03]" />
                    <div className="absolute inset-0 bg-dot-white opacity-[0.05]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/[0.02] to-transparent h-[50%] w-full animate-scan-v pointer-events-none" />

                    {/* Pulsing Energy Cores */}
                    <motion.div
                        animate={{
                            opacity: [0.03, 0.1, 0.03],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-red-600/15 blur-[120px] rounded-full"
                    />

                    <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr,0.8fr] gap-12 lg:gap-16 items-center">
                        {/* LEFT: TYPOGRAPHY */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="flex flex-col items-start text-left"
                        >
                            <div className="inline-flex items-center gap-3 px-4 py-2 glass rounded-full mb-8 border border-red-500/20 animate-flicker">
                                <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.5em]">
                                    AGENT // AUTONOMOUS_SYSTEM
                                </span>
                            </div>

                            <h1 className="text-5xl sm:text-6xl lg:text-[7rem] font-black font-display italic tracking-tight mb-6 leading-[0.85] lg:leading-[0.8] uppercase text-white text-left relative z-10">
                                <span className="relative inline-block group/impossible">
                                    {/* Layout Placeholder - Invisible but dictates size */}
                                    <span className="relative z-10 text-transparent select-none" aria-hidden="true">OPENCLAW</span>

                                    {/* Graphic Layer - Absolute positioning guarantees perfect overlap */}
                                    <div className="absolute inset-0 z-0 overflow-visible">
                                        <svg className="w-full h-full overflow-visible">
                                            <defs>
                                                <filter id="electric-arc" x="-50%" y="-50%" width="200%" height="200%">
                                                    <feTurbulence type="fractalNoise" baseFrequency="0.12" numOctaves="3" result="noise">
                                                        <animate attributeName="seed" from="1" to="100" dur="1.5s" repeatCount="indefinite" />
                                                    </feTurbulence>
                                                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
                                                </filter>
                                                <filter id="glow-red-clean" x="-50%" y="-50%" width="200%" height="200%">
                                                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                                                    <feMerge>
                                                        <feMergeNode in="blur" />
                                                        <feMergeNode in="SourceGraphic" />
                                                    </feMerge>
                                                </filter>
                                            </defs>

                                            {/* 1. Electric Stroke Layer (Behind) */}
                                            <motion.text
                                                x="50%"
                                                y="80%"
                                                textAnchor="middle"
                                                className="font-black font-display italic text-5xl sm:text-6xl lg:text-[7rem] uppercase select-none"
                                                fill="none"
                                                stroke="#ef4444"
                                                strokeWidth="3"
                                                animate={{
                                                    strokeDashoffset: [0, -2150]
                                                }}
                                                filter="url(#electric-arc) url(#glow-red-clean)"
                                                style={{ letterSpacing: '-0.05em' }}
                                            >
                                                OPENCLAW
                                            </motion.text>

                                            {/* 2. Clean Text Layer (Front) */}
                                            <text
                                                x="50%"
                                                y="80%"
                                                textAnchor="middle"
                                                className="font-black font-display italic text-5xl sm:text-6xl lg:text-[7rem] uppercase select-none"
                                                fill="white"
                                                style={{ letterSpacing: '-0.05em' }}
                                            >
                                                OPENCLAW
                                            </text>
                                        </svg>
                                    </div>
                                    <div className="absolute -inset-4 bg-red-500/10 blur-2xl opacity-0 group-hover/impossible:opacity-100 transition-opacity rounded-full z-0" />
                                </span>
                                <br />
                                <span className="gradient-text-alt tracking-[-0.02em] text-4xl sm:text-5xl lg:text-6xl text-slate-300">ACTUALLY DOES THINGS.</span>
                            </h1>

                            <p className="text-lg lg:text-2xl text-slate-400 font-medium leading-tight mb-10 max-w-2xl text-left">
                                Clears your inbox, sends emails, manages your calendar, checks you in for flights.<br />
                                <span className="text-white font-bold">All from WhatsApp, Telegram, or any chat app you already use.</span>
                            </p>

                            <div className="flex flex-col gap-4 mt-8 lg:mt-0">
                                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 flex items-center gap-4 py-2 px-6 glass rounded-full border border-white/5">
                                    <Smartphone className="w-4 h-4 text-green-500" />
                                    <span>INTERFACE: <span className="text-white italic">ANY CHAT APP</span></span>
                                </div>
                                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-4 py-2 px-6 glass rounded-full border border-white/5">
                                    <Globe className="w-3 h-3 text-red-500" />
                                    <span>BROWSER CONTROL: <span className="text-white">FULL AUTONOMY</span></span>
                                </div>
                            </div>
                        </motion.div>

                        {/* RIGHT: CTA CARD */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, x: 50 }}
                            whileInView={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative group lg:pl-12 max-w-[680px] lg:ml-auto w-full mt-12 lg:mt-0"
                        >
                            {/* The Animated Mascot */}
                            <OpenClawMascot />

                            <div className="absolute -inset-4 bg-gradient-to-r from-red-500/30 to-orange-500/30 blur-3xl opacity-40 group-hover:opacity-100 transition-opacity duration-700" />

                            <div className="relative glass-dark rounded-[24px] border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col items-stretch">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent h-1/2 w-full animate-scan-v pointer-events-none z-20" />
                                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '24px 24px' }} />

                                <div className="bg-white/5 border-b border-white/5 px-6 py-3 flex justify-between items-center relative z-30">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                        <span className="text-[9px] font-black text-white uppercase tracking-[0.4em]">SYSTEM_READY</span>
                                    </div>
                                    <div className="text-[7px] font-mono text-white/40">SYS_TIME: {new Date().toLocaleTimeString()}</div>
                                </div>

                                <div className="p-6 lg:p-8 flex flex-col gap-4 relative z-30">
                                    <div className="flex justify-between items-end">
                                        <div className="space-y-1">
                                            <div className="text-[9px] font-black text-red-500 uppercase tracking-[0.5em]">FULL_CONFIG</div>
                                            <div className="text-xl font-black text-white italic tracking-tighter uppercase leading-none">ZERO_INTERVENTION</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[7px] font-black text-white/40 uppercase tracking-widest">SETUP_COST</div>
                                            <div className="text-[14px] font-black text-white uppercase">$500.00</div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-2xl lg:text-4xl font-black italic tracking-tighter text-white uppercase leading-[0.8] text-left">
                                            DEPLOY YOUR <br />
                                            <span className="text-red-500 text-glow">DREAM TEAM.</span>
                                        </h3>
                                        <p className="text-[9px] text-slate-400 font-medium tracking-tight max-w-[220px]">
                                            Fully autonomous systems. <br />
                                            Running <span className="text-white">24/7 operations.</span>
                                        </p>
                                    </div>

                                    <div className="relative group/btn">
                                        <Link to="/contact">
                                            <motion.button
                                                whileHover={{ scale: 1.02, boxShadow: "0 0 60px rgba(239, 68, 68, 0.15)" }}
                                                whileTap={{ scale: 0.98 }}
                                                className="group w-full py-6 bg-red-600 text-white text-[14px] font-black uppercase tracking-[0.4em] rounded-2xl flex items-center justify-center gap-4 italic relative overflow-hidden transition-all shadow-[0_20px_40px_rgba(239,68,68,0.2)]"
                                            >
                                                INITIATE SETUP
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
                                            </motion.button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
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
                                    <span>UID: OPENCLAW_CORE_V1</span>
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
                                        <span className="text-lg lg:text-xl font-black italic uppercase tracking-[0.2em] text-white text-glow">ZERO_HUMAN_INTERVENTION</span>
                                    </div>
                                    <div className="flex items-center gap-6 group">
                                        <div className="w-2 h-2 bg-blue-500 rounded-sm rotate-45 group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                                        <span className="text-lg lg:text-xl font-black italic uppercase tracking-[0.2em] text-blue-400">FULLY_AUTONOMOUS</span>
                                    </div>
                                    <div className="flex items-center gap-6 group">
                                        <div className="w-2 h-2 bg-white rounded-sm rotate-45 group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                                        <span className="text-lg lg:text-xl font-black italic uppercase tracking-[0.2em] text-white">SYSTEM_ACCESS</span>
                                    </div>
                                    <div className="flex items-center gap-6 group">
                                        <div className="w-2 h-2 bg-red-500 rounded-sm rotate-45 group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                                        <span className="text-lg lg:text-xl font-black italic uppercase tracking-[0.2em] text-red-500 text-glow">MARKET_DOMINANCE</span>
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
                                    <span>PROTOCOL: AUTOMATION_VELOCITY</span>
                                    <span>NODE: {Math.random().toString(36).substring(7).toUpperCase()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* METRICS */}
            <section className="py-16 lg:py-32 relative overflow-hidden">
                <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
                    <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-12">
                        <div className="max-w-4xl">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-px w-12 bg-red-500" />
                                <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.6em]">SYSTEM_CAPABILITIES</span>
                            </div>
                            <h2 className="text-4xl sm:text-6xl lg:text-8xl font-black font-display italic tracking-tight mb-0 uppercase text-white leading-[0.8] lg:leading-[0.75]">
                                PERFORMANCE <br />
                                <span className="gradient-text italic tracking-[-0.05em]">UNLEASHED.</span>
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-2 glass border border-white/5 rounded-[32px] lg:rounded-[48px] bg-white/[0.02]">
                        {[
                            { label: "Human Intervention", value: "0%", sub: "FULLY AUTONOMOUS LOOPS", icon: <Bot className="w-6 h-6" />, color: "text-red-500" },
                            { label: "System Uptime", value: "24/7", sub: "ALWAYS ACTIVE", icon: <Clock className="w-6 h-6" />, color: "text-blue-500" },
                            { label: "Integration", value: "100%", sub: "WORKS WITH EVERYTHING", icon: <Layers className="w-6 h-6" />, color: "text-purple-500" },
                            { label: "Data Privacy", value: "LOCAL", sub: "YOUR DATA STAYS YOURS", icon: <ShieldCheck className="w-6 h-6" />, color: "text-green-500" }
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

            {/* OPERATIONAL MATRIX - USE CASES */}
            <section className="py-24 lg:py-32 bg-[#020408] border-t border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-end justify-between mb-24 gap-12">
                        <div>
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
                                <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em]">TACTICAL_APPLICATION</span>
                            </div>
                            <h2 className="text-4xl sm:text-6xl lg:text-8xl font-black font-display italic tracking-tight uppercase text-white leading-[0.85]">
                                DEPLOYMENT <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">VECTORS.</span>
                            </h2>
                        </div>
                        <p className="text-lg text-slate-400 font-medium italic max-w-xl text-right lg:text-right leading-relaxed">
                            OpenClaw isn't just a chat bot. It's a full-stack employee capable of executing complex, multi-step business operations across any vertical.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {[
                            {
                                title: "SALES_INTELLIGENCE",
                                icon: <Target className="w-8 h-8 text-red-500" />,
                                desc: "Automate your entire outreach pipeline. OpenClaw scrapes leads, enriches data via APIs, and sends hyper-personalized DMs on LinkedIn or cold emails.",
                                skills: ["LinkedIn Scraping", "Email Enrichment", "CRM Sync", "Outbound Seq."]
                            },
                            {
                                title: "FINANCIAL_OPS",
                                icon: <Database className="w-8 h-8 text-blue-500" />,
                                desc: "Log into bank portals, download PDF statements, extract transaction data, and reconcile invoices in Xero or QuickBooks automatically.",
                                skills: ["PDF Extraction", "Bank Login", "Invoice Parsing", "Ledger Reconcile"]
                            },
                            {
                                title: "RECRUITING_SCOUT",
                                icon: <Search className="w-8 h-8 text-purple-500" />,
                                desc: "Scan thousands of candidate profiles. Filter by niche skills that standard filters miss. Send personalized interview invites and schedule calls.",
                                skills: ["Profile Analysis", "Skill Matching", "Calendar Avg.", "Interview Prep"]
                            },
                            {
                                title: "MARKET_RESEARCH",
                                icon: <Globe className="w-8 h-8 text-green-500" />,
                                desc: "Deep dive competitor analysis. Aggregating pricing, features, and sentiment from across the web into a daily executive briefing PDF.",
                                skills: ["SERP Scraping", "Sentiment Analysis", "Report Gen", "Trend Spotting"]
                            }
                        ].map((vector, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group p-1 rounded-[40px] bg-gradient-to-br from-white/10 to-transparent hover:from-red-500/20 hover:to-orange-500/20 transition-all duration-500"
                            >
                                <div className="bg-[#05070a] rounded-[38px] p-8 lg:p-12 h-full relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />

                                    <div className="flex justify-between items-start mb-10">
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 group-hover:bg-red-500/10 group-hover:border-red-500/20 transition-colors">
                                            {vector.icon}
                                        </div>
                                        <div className="text-[10px] font-black text-white/20 uppercase tracking-widest">VECTOR_{i + 1}</div>
                                    </div>

                                    <h3 className="text-3xl font-black italic uppercase tracking-tight text-white mb-6 group-hover:text-red-500 transition-colors">{vector.title}</h3>
                                    <p className="text-slate-400 font-medium leading-relaxed mb-10 border-l-2 border-white/5 pl-6">{vector.desc}</p>

                                    <div className="flex flex-wrap gap-2">
                                        {vector.skills.map(skill => (
                                            <span key={skill} className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 group-hover:text-white group-hover:border-white/10 transition-colors">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* SKILL INJECTION PROTOCOL */}
                <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-32 relative z-10">
                    <div className="bg-[#080a10] rounded-[48px] border border-white/10 overflow-hidden relative">
                        <div className="absolute inset-0 bg-grid-white opacity-[0.02]" />
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

                        <div className="grid lg:grid-cols-2">
                            <div className="p-12 lg:p-20 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/5">
                                <div className="inline-flex items-center gap-2 mb-6">
                                    <Terminal className="w-4 h-4 text-red-500" />
                                    <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em]">TECHNICAL_DEEP_DIVE</span>
                                </div>
                                <h3 className="text-4xl lg:text-6xl font-black italic uppercase tracking-tight text-white mb-8 leading-[0.85]">
                                    THE SKILL <br />
                                    INJECTION <br />
                                    PROTOCOL.
                                </h3>
                                <p className="text-lg text-slate-400 font-medium italic mb-10 leading-relaxed">
                                    OpenClaw isn't just "prompted." It's programmed. We inject custom Python/Node.js scripts directly into its cognitive architecture.
                                    <br /><br />
                                    This means when you ask it to "Process Payroll," it doesn't just guess—it executes a 500-line hardened script that validates every cent.
                                </p>
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/5">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">DETERMINISTIC_ACTION</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/5">
                                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">SANDBOXED_ENV</span>
                                    </div>
                                </div>
                            </div>
                            <div className="relative bg-black/40 p-12 lg:p-20 font-mono text-sm leading-relaxed overflow-hidden">
                                <div className="absolute top-4 right-4 text-[9px] text-slate-600 uppercase tracking-widest">SKILL: INVOICE_PROCESSOR.JS</div>
                                <div className="opacity-60 text-blue-400">
                                    <span className="text-purple-400">async function</span> <span className="text-yellow-400">processInvoices</span>(userId) {'{'}<br />
                                    &nbsp;&nbsp;<span className="text-slate-500">// 1. Secure Bank Connection</span><br />
                                    &nbsp;&nbsp;<span className="text-purple-400">const</span> session = <span className="text-purple-400">await</span> bank.connect(SECURE_ENC_KEY);<br />
                                    <br />
                                    &nbsp;&nbsp;<span className="text-slate-500">// 2. Download & Parse PDF</span><br />
                                    &nbsp;&nbsp;<span className="text-purple-400">const</span> pdfs = <span className="text-purple-400">await</span> session.getStatements('current_month');<br />
                                    &nbsp;&nbsp;<span className="text-purple-400">const</span> data = <span className="text-purple-400">await</span> ocr.extract(pdfs);<br />
                                    <br />
                                    &nbsp;&nbsp;<span className="text-slate-500">// 3. Cross-Reference ERP</span><br />
                                    &nbsp;&nbsp;<span className="text-purple-400">for</span> (<span className="text-purple-400">let</span> txn <span className="text-purple-400">of</span> data) {'{'}<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">if</span> (!erp.exists(txn.id)) {'{'}<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">await</span> erp.createEntry(txn);<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(<span className="text-green-400">`Reconciled: ${'{'}txn.id{'}'}`</span>);<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br />
                                    &nbsp;&nbsp;{'}'}<br />
                                    {'}'}
                                </div>
                                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#05070a] to-transparent" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS - WALL OF LOVE */}
            <section className="py-16 lg:py-32 relative border-y border-white/5 bg-[#020408] overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[3] blur-3xl text-[12rem] font-black text-white italic tracking-tighter uppercase whitespace-nowrap">
                        VERIFIED // USERS
                    </div>
                </div>

                <div className="max-w-[1800px] mx-auto px-6 lg:px-12 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display italic tracking-tight mb-8 uppercase text-white leading-[0.8]">
                            WHAT PEOPLE <br />
                            <span className="gradient-text italic tracking-[-0.03em]">SAY.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="p-8 glass border border-white/5 rounded-3xl hover:border-red-500/20 transition-all group"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <div className="text-[11px] font-black text-red-500 uppercase tracking-widest mb-1">{t.handle}</div>
                                        <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{t.role}</div>
                                    </div>
                                    <Quote className="w-6 h-6 text-white/10 group-hover:text-red-500/50 transition-colors" />
                                </div>
                                <p className="text-lg text-slate-300 font-medium italic leading-relaxed">"{t.content}"</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* THE PROTOCOL */}
            <section className="py-16 lg:py-24 relative border-y border-white/5 overflow-hidden bg-[#020408]">
                <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10">
                    <div className="flex flex-col items-center text-center mb-24">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-3 px-6 py-3 bg-red-500/10 border border-red-500/20 rounded-full mb-8"
                        >
                            <span className="text-[10px] font-black text-red-400 uppercase tracking-[0.5em]">SETUP_SEQUENCE</span>
                        </motion.div>
                        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display italic tracking-tight uppercase leading-[0.8] text-white">
                            THE DEPLOYMENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400">PROTOCOL.</span>
                        </h2>
                    </div>

                    <div className="space-y-12 relative">
                        {protocolSteps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                                className="relative pl-16 lg:pl-24 group"
                            >
                                <div className="absolute left-0 top-0 flex items-center justify-center w-[64px] h-[64px] rounded-2xl bg-[#0a0c10] border border-white/10 z-20 group-hover:border-red-500/50 transition-colors shadow-2xl">
                                    <div className="text-xl font-black text-white italic tracking-tighter">{i + 1}</div>
                                    <div className="absolute -inset-2 bg-red-500/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="glass-dark border border-white/5 rounded-[24px] lg:rounded-[32px] p-6 lg:p-10 hover:border-white/10 transition-all bg-white/[0.01]">
                                    <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12">
                                        <div>
                                            <div className="flex flex-wrap items-center gap-3 lg:gap-4 mb-4 lg:mb-6">
                                                <span className="text-[9px] lg:text-[10px] font-black text-red-400 uppercase tracking-[0.3em] font-mono px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-md">
                                                    {step.phase}
                                                </span>
                                                <span className="text-[9px] lg:text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] font-mono px-3 py-1 bg-white/5 border border-white/10 rounded-md">
                                                    DURATION: {step.duration}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl lg:text-3xl xl:text-4xl font-black italic uppercase tracking-tighter text-white mb-4 lg:mb-6 leading-none group-hover:text-red-400 transition-colors">
                                                {step.title}
                                            </h3>
                                            <p className="text-sm lg:text-lg text-slate-400 font-medium italic leading-relaxed mb-6 border-l-2 border-white/5 pl-4 lg:pl-6">
                                                "{step.desc}"
                                            </p>
                                        </div>
                                        <div className="bg-black/40 rounded-2xl p-4 lg:p-6 border border-white/5">
                                            <ul className="space-y-3 lg:space-y-4">
                                                {step.deliverables.map((d, idx) => (
                                                    <li key={idx} className="flex items-center gap-3 group/item">
                                                        <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover/item:border-red-500/30 transition-colors">
                                                            <CheckCircle2 className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-red-500/50 group-hover/item:text-red-400 transition-colors" />
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
            </section>



            {/* 16 REVENUE VECTORS */}
            <section className="py-24 lg:py-32 bg-[#020408] border-t border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02]" />

                <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
                    <div className="text-center mb-24">
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-8">
                            <span className="text-[10px] font-black text-green-500 uppercase tracking-[0.4em]">PROFIT_GENERATION_MODELS</span>
                        </div>
                        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display italic tracking-tight uppercase text-white leading-[0.85] mb-8">
                            16 WAYS TO <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">PRINT REVENUE.</span>
                        </h2>
                        <p className="text-lg text-slate-400 font-medium italic max-w-2xl mx-auto leading-relaxed">
                            Stop paying humans to do robot work. Deploy OpenClaw to execute high-value revenue generating activities 24/7.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                id: "01",
                                title: "OUTBOUND_ORCHESTRATOR",
                                category: "SALES",
                                desc: "Scrapes leads from LinkedIn/Apollo. Enriches emails. Sends personalized DMs. Follows up forever until they reply."
                            },
                            {
                                id: "02",
                                title: "INBOUND_QUALIFIER",
                                category: "SALES",
                                desc: "Responds to website leads instantly (Speed to Lead < 5s). Qualifies budget/authority. Books the meeting on your Calendly."
                            },
                            {
                                id: "03",
                                title: "PRICING_WARFARE",
                                category: "STRATEGY",
                                desc: "Monitors competitor pricing pages daily. Alerts you if they undercut. Can auto-adjust your Stripe prices dynamicially."
                            },
                            {
                                id: "04",
                                title: "CONTENT_FACTORIZATION",
                                category: "MARKETING",
                                desc: "Takes one YouTube video. Transcribes it. Writes 10 Tweets, 3 LinkedIn posts, and 1 Blog article. Schedules them all."
                            },
                            {
                                id: "05",
                                title: "SEO_DOMINANCE",
                                category: "MARKETING",
                                desc: "Finds low-competition keywords. Writes 2,000-word programmatic SEO pages. Internal links them. Publishes to CMS."
                            },
                            {
                                id: "06",
                                title: "LOCAL_DOMINATION",
                                category: "SALES",
                                desc: "Scrapes Google Maps for every 'Plumber in [City]'. Extracts phones/emails.  Initiates cold call/email sequences."
                            },
                            {
                                id: "07",
                                title: "REPUTATION_DEFENSE",
                                category: "BRAND",
                                desc: "Monitors G2, Capterra, Google Reviews. Auto-replies to 5-star reviews. Flags 1-star reviews for human intervention instantly."
                            },
                            {
                                id: "08",
                                title: "INFLUENCER_ACQUISITION",
                                category: "MARKETING",
                                desc: "Identifies micro-influencers in your niche. Sends collaboration offers. Negotiates rates based on your playbook."
                            },
                            {
                                id: "09",
                                title: "AFFILIATE_OPTIMIZER",
                                category: "REVENUE",
                                desc: "Scans your blog for dead affiliate links. Replaces them with high-converting offers. Rotates offers based on click yield."
                            },
                            {
                                id: "10",
                                title: "CHURN_PREVENTION",
                                category: "RETENTION",
                                desc: "Detects 'cancel' intent keywords in support tickets. Auto-offers discounts or calls a 'Save Team' human immediately."
                            },
                            {
                                id: "11",
                                title: "CASHFLOW_ACCELERATION",
                                category: "FINANCE",
                                desc: "The polite but persistent debt collector. Auto-emails clients with overdue invoices every 48h until payment clears."
                            },
                            {
                                id: "12",
                                title: "OPEX_KILLER",
                                category: "OPS",
                                desc: "Audits your SaaS subscriptions. Finds cheaper alternatives. Negotiates renewals by generating competitor quote emails."
                            },
                            {
                                id: "13",
                                title: "VIRALITY_SNIPER",
                                category: "MARKETING",
                                desc: "Monitors Twitter/X trends. Identifies topics relevant to your niche. Drafts 'hot take' content for you to approve instantly."
                            },
                            {
                                id: "14",
                                title: "CONTRACT_HUNTER",
                                category: "SALES",
                                desc: "Scrapes government RFP sites (Upwork, etc). Matches your skills. Drafts huge proposal documents customized to the tender."
                            },
                            {
                                id: "15",
                                title: "OMNICHANNEL_SYNC",
                                category: "SALES",
                                desc: "Takes your Shopify product. Lists it on Amazon, eBay, Etsy, and TikTok Shop. Syncs inventory across all channels."
                            },
                            {
                                id: "16",
                                title: "AUDIENCE_SIPHON",
                                category: "GROWTH",
                                desc: "Scrapes followers of your competitors. Engages with their reliable posts. Soft-pitches your solution in the replies."
                            }
                        ].map((model, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{ y: -5 }}
                                className="group relative p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] hover:border-green-500/30 transition-all duration-300"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest group-hover:text-green-500 transition-colors">MODEL_{model.id}</span>
                                    <span className="text-[8px] font-bold text-white/20 uppercase px-2 py-1 bg-white/5 rounded-md">{model.category}</span>
                                </div>
                                <h3 className="text-xl font-black italic uppercase tracking-tighter text-white mb-3 leading-none group-hover:text-green-400 transition-colors">
                                    {model.title}
                                </h3>
                                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                                    {model.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </section>

            {/* SYSTEM ARCHITECTURE - EXPERTISE */}
            <section className="py-24 relative bg-[#020408] overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]"
                        >
                            INFRASTRUCTURE
                        </motion.span>
                        <h2 className="text-4xl lg:text-7xl font-black font-display italic tracking-tight mt-6 uppercase text-white leading-[0.85]">
                            THE ARCHITECTURE <br /> OF <span className="text-red-500">AUTONOMY.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 border-l border-white/10 hover:border-red-500/50 transition-colors group">
                            <div className="mb-6 opacity-50 group-hover:opacity-100 transition-opacity">
                                <Cpu className="w-10 h-10 text-white" />
                            </div>
                            <h4 className="text-xl font-black italic uppercase tracking-tight text-white mb-4">LOCAL_FIRST COMPUTE</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                We prefer bare-metal execution. Your agent runs on your hardware or a private, isolated VPS. This means 0ms latency and zero reliance on congested public API queues.
                            </p>
                        </div>
                        <div className="p-8 border-l border-white/10 hover:border-red-500/50 transition-colors group">
                            <div className="mb-6 opacity-50 group-hover:opacity-100 transition-opacity">
                                <ShieldAlert className="w-10 h-10 text-white" />
                            </div>
                            <h4 className="text-xl font-black italic uppercase tracking-tight text-white mb-4">ANTI_FRAGILE MESH</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                If one LLM provider goes down (e.g., OpenAI), OpenClaw automatically reroutes reasoning to Claude, Gemini, or a local Llama instance. The mission never stops.
                            </p>
                        </div>
                        <div className="p-8 border-l border-white/10 hover:border-red-500/50 transition-colors group">
                            <div className="mb-6 opacity-50 group-hover:opacity-100 transition-opacity">
                                <Rocket className="w-10 h-10 text-white" />
                            </div>
                            <h4 className="text-xl font-black italic uppercase tracking-tight text-white mb-4">INFINITE HORIZON</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Traditional SaaS tools box you in. OpenClaw accesses the browser, the file system, and the terminal. If a human can do it on a computer, OpenClaw can do it.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* WORKS WITH EVERYTHING */}
            <section className="py-16 lg:py-32 relative overflow-hidden bg-[#020408]">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl lg:text-7xl font-black font-display italic tracking-tight mb-8 uppercase text-white leading-none">
                            WORKS WITH <br />
                            <span className="text-red-500">EVERYTHING.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {techArsenal.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="p-6 glass border border-white/5 rounded-3xl hover:border-red-500/20 transition-all group relative overflow-hidden"
                            >
                                <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6 group-hover:text-red-500 transition-colors">{item.category}</h3>
                                <div className="space-y-2 mb-8">
                                    {item.tools.map(tool => (
                                        <div key={tool} className="text-[11px] font-black italic text-slate-300 uppercase tracking-tight hover:text-white transition-colors cursor-default">{tool}</div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECURITY */}
            <section className="py-16 bg-[#020408] border-t border-white/5 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8">
                        <ShieldCheck className="w-4 h-4 text-blue-400" />
                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">SECURITY_VERIFIED</span>
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-black italic tracking-tight uppercase text-white mb-6">
                        PARTNERED WITH <span className="text-blue-500">VIRUSTOTAL.</span>
                    </h2>
                    <p className="text-lg text-slate-400 font-medium italic max-w-2xl mx-auto mb-12">
                        Every file operation, every script, and every download is scanned in real-time. OpenClaw operates with a military-grade security perimeter.
                    </p>

                    <div className="flex justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="flex items-center gap-2">
                            <Shield className="w-6 h-6 text-blue-500" />
                            <span className="text-xl font-black text-white italic tracking-tighter">VIRUSTOTAL</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Lock className="w-6 h-6 text-green-500" />
                            <span className="text-xl font-black text-white italic tracking-tighter">LOCAL_ENCRYPTION</span>
                        </div>
                    </div>
                </div>
            </section>


            <section className="py-16 lg:py-24 bg-[#020408] border-t border-white/5 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8">
                            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">FINANCIAL_IMPACT_ASSESSMENT</span>
                        </div>
                        <h2 className="text-4xl lg:text-7xl font-black font-display italic tracking-tight uppercase text-white leading-[0.85]">
                            THE MATH IS <br />
                            <span className="text-blue-500">SIMPLE.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
                        {/* THE OLD WAY */}
                        <div className="p-8 lg:p-12 rounded-[40px] border border-white/5 bg-white/[0.02] relative group">
                            <div className="absolute top-6 right-6 text-[10px] font-black text-slate-600 uppercase tracking-widest">LEGACY_OPEX</div>
                            <h3 className="text-3xl font-black italic uppercase tracking-tight text-slate-500 mb-8 decoration-slate-700/50 line-through decoration-2">HUMAN TEAM</h3>

                            <div className="space-y-6 mb-12">
                                <div className="flex justify-between items-center py-4 border-b border-white/5">
                                    <div className="text-lg text-slate-400 font-medium italic">Sales Development Rep</div>
                                    <div className="text-xl font-bold text-red-400 font-mono">$3,500<span className="text-xs text-slate-600">/mo</span></div>
                                </div>
                                <div className="flex justify-between items-center py-4 border-b border-white/5">
                                    <div className="text-lg text-slate-400 font-medium italic">Virtual Assistant</div>
                                    <div className="text-xl font-bold text-red-400 font-mono">$1,800<span className="text-xs text-slate-600">/mo</span></div>
                                </div>
                                <div className="flex justify-between items-center py-4 border-b border-white/5">
                                    <div className="text-lg text-slate-400 font-medium italic">Data Researcher</div>
                                    <div className="text-xl font-bold text-red-400 font-mono">$2,200<span className="text-xs text-slate-600">/mo</span></div>
                                </div>
                            </div>

                            <div className="flex justify-between items-end">
                                <span className="text-xs font-black text-slate-600 uppercase tracking-widest">MONTHLY BURN</span>
                                <span className="text-4xl font-black text-white italic tracking-tighter">$7,500<span className="text-lg text-slate-600">/mo</span></span>
                            </div>
                        </div>

                        {/* THE OPENCLAW WAY */}
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-[42px] blur opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
                            <div className="p-8 lg:p-12 rounded-[40px] border border-green-500/20 bg-[#05070a] relative z-10">
                                <div className="absolute top-6 right-6 text-[10px] font-black text-green-500 uppercase tracking-widest animate-pulse">AUTONOMOUS_CAPEX</div>
                                <h3 className="text-3xl font-black italic uppercase tracking-tight text-white mb-8">OPENCLAW UNIT</h3>

                                <div className="space-y-6 mb-12">
                                    <div className="flex justify-between items-center py-4 border-b border-white/5">
                                        <div className="text-lg text-white font-medium italic">SDR Capabilities</div>
                                        <div className="flex items-center gap-2 text-green-400 font-bold font-mono"><CheckCircle2 className="w-4 h-4" /> INCLUDED</div>
                                    </div>
                                    <div className="flex justify-between items-center py-4 border-b border-white/5">
                                        <div className="text-lg text-white font-medium italic">VA Capabilities</div>
                                        <div className="flex items-center gap-2 text-green-400 font-bold font-mono"><CheckCircle2 className="w-4 h-4" /> INCLUDED</div>
                                    </div>
                                    <div className="flex justify-between items-center py-4 border-b border-white/5">
                                        <div className="text-lg text-white font-medium italic">Research Capabilities</div>
                                        <div className="flex items-center gap-2 text-green-400 font-bold font-mono"><CheckCircle2 className="w-4 h-4" /> INCLUDED</div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-end">
                                    <span className="text-xs font-black text-green-600 uppercase tracking-widest">ONE-TIME SETUP</span>
                                    <span className="text-5xl font-black text-white italic tracking-tighter">$500</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRICING - THE OFFER */}
            <section className="py-24 lg:py-32 bg-white/[0.01] border-y border-white/5 relative overflow-hidden" id="pricing">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">INFRASTRUCTURE_LEVELS</span>
                        </div>
                        <h2 className="text-4xl lg:text-7xl font-black font-display italic tracking-tight uppercase text-white leading-[0.85]">
                            CHOOSE YOUR <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">LETHALITY.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                        {/* TIER 1: SCOUT */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-[#05070a] border border-white/5 rounded-[32px] p-8 lg:p-10 relative group hover:border-white/10 transition-all"
                        >
                            <div className="mb-8">
                                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-500 mb-2">TIER_01</h3>
                                <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-6">SCOUT</h2>
                                <div className="text-5xl font-black text-white italic tracking-tighter mb-2">$500</div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-slate-600">ONE-TIME SETUP</div>
                            </div>

                            <p className="text-sm text-slate-400 font-medium leading-relaxed mb-8 border-b border-white/5 pb-8">
                                The entry point. A single, local OpenClaw unit running on your machine. Perfect for automating personal workflows and basic scraping.
                            </p>

                            <ul className="space-y-4 mb-10">
                                {[
                                    "Local Machine Deployment",
                                    "Standard Web Serching",
                                    "Basic Desktop Control",
                                    "Single Workflow Setup",
                                    "1 Hour Guidance Call"
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                                        <span className="text-slate-300 text-sm font-bold uppercase tracking-tight">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link to="/contact">
                                <button className="w-full py-4 bg-white/5 text-white text-xs font-black uppercase tracking-[0.2em] rounded-xl hover:bg-white/10 transition-colors border border-white/5">
                                    DEPLOY SCOUT
                                </button>
                            </Link>
                        </motion.div>

                        {/* TIER 2: VANGUARD */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-[#05070a] border border-red-500/20 rounded-[32px] p-8 lg:p-10 relative group shadow-[0_0_50px_rgba(239,68,68,0.1)]"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[60px] rounded-full pointer-events-none" />
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-red-500 text-white text-[9px] font-black uppercase tracking-widest rounded-full">Recommended</div>

                            <div className="mb-8 relative z-10">
                                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-red-500 mb-2">TIER_02</h3>
                                <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-6">VANGUARD</h2>
                                <div className="text-5xl font-black text-white italic tracking-tighter mb-2">$2,000</div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-red-400">ONE-TIME BUILD</div>
                            </div>

                            <p className="text-sm text-slate-400 font-medium leading-relaxed mb-8 border-b border-white/5 pb-8 relative z-10">
                                Serious infrastructure. We set up a multi-agent swarm that integrates with your CRM and databases. Built for growth-stage companies.
                            </p>

                            <ul className="space-y-4 mb-10 relative z-10">
                                {[
                                    "Cloud VPS Deployment",
                                    "Multi-Agent Orchestration",
                                    "3 Custom Skill Injections",
                                    "CRM Integration (HubSpot/GHL)",
                                    "Database Persistence (Supabase)",
                                    "Slack/Discord Bot Interface"
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <Zap className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                                        <span className="text-white text-sm font-bold uppercase tracking-tight">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link to="/contact" className="relative z-10">
                                <button className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white text-xs font-black uppercase tracking-[0.2em] rounded-xl hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-all shadow-lg">
                                    BUILD VANGUARD
                                </button>
                            </Link>
                        </motion.div>

                        {/* TIER 3: DOMINION */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-[#05070a] border border-white/5 rounded-[32px] p-8 lg:p-10 relative group hover:border-white/10 transition-all"
                        >
                            <div className="mb-8">
                                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-500 mb-2">TIER_03</h3>
                                <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-6">DOMINION</h2>
                                <div className="text-5xl font-black text-white italic tracking-tighter mb-2">$5,000</div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-slate-600">ENTERPRISE INFRA</div>
                            </div>

                            <p className="text-sm text-slate-400 font-medium leading-relaxed mb-8 border-b border-white/5 pb-8">
                                Total autonomy. A private server cluster running uncensored models, voice agents, and infinite context. You own the metal.
                            </p>

                            <ul className="space-y-4 mb-10">
                                {[
                                    "Private Server Cluster Setup",
                                    "Uncensored Local LLM Hosting",
                                    "Voice/Phone Agent Capabilities",
                                    "Unlimited Custom Skills",
                                    "Anti-Detect Browser Fingerprinting",
                                    "Dedicated Solutions Architect"
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-4 h-4 text-white mt-0.5 shrink-0" />
                                        <span className="text-slate-300 text-sm font-bold uppercase tracking-tight">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link to="/contact">
                                <button className="w-full py-4 bg-white text-black text-xs font-black uppercase tracking-[0.2em] rounded-xl hover:bg-slate-200 transition-colors">
                                    INITIATE DOMINION
                                </button>
                            </Link>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 lg:py-24 relative overflow-hidden bg-[#020408]">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <h2 className="text-4xl lg:text-6xl font-black font-display italic tracking-tight mb-16 uppercase text-white leading-none text-center">
                        FAQ.
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {faqs.map((f, i) => (
                            <div key={i} className="p-8 glass border border-white/5 rounded-3xl">
                                <h4 className="text-xl font-black uppercase italic tracking-tight text-white mb-4">{f.q}</h4>
                                <p className="text-slate-500 font-medium italic leading-relaxed">{f.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div >
    );
};

export default OpenClawPage;

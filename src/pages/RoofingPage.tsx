import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useTransform, useMotionValue, useSpring, useAnimationFrame } from 'framer-motion';
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
    BarChart,
    Map,
    Camera,
    FileText,
    Hammer,
    CloudLightning,
    ZapOff
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
                backgroundColor: `rgba(249, 115, 22, ${config.brightness})`, // Orange-500
                boxShadow: `0 0 8px rgba(249, 115, 22, ${config.brightness})`,
                zIndex: 0
            }}
        />
    );
});

const RoofingPage = () => {
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

    const roofingModules = [
        {
            title: "Module A: The 'Hunter'",
            subtitle: "Autonomous Lead Agent",
            description: "A LangGraph agent that wakes at 3 AM. When storms hit your territory, it detects, maps, and assigns leads automatically. Zero human intervention.",
            howItWorks: "Supabase Edge Functions hook into NOAA & HailTrace in real-time. When hail exceeds 1.5\", the Hunter agent spins up, queries Regrid/Atom for every property in the storm swath, and auto-carves 'Lasso' territories for reps. Pre-intel loads instantly (owner name, roof age, street view).",
            goal: "YOU GET: 5-second lead response time. No lead decay. Your team is first on the ground with data advantage. While competitors are still reading emails, you're already quoting.",
            features: ["🤖 Autonomous Storm Detection", "⚡ 5-Second Lead Response", "🗺️ Auto Territory Carving", "📍 Property Pre-Intel Loaded"],
            icon: <Target className="w-5 h-5" />,
            color: "orange"
        },
        {
            title: "Module B: The 'Closer'",
            subtitle: "Autonomous Sales Agent",
            description: "A LangGraph agent that runs pricing, detects damage, and generates proposals in 90 seconds. The rep takes a photo. The agent closes.",
            howItWorks: "Rep uploads 5 photos. The Closer agent pings Roofr/EagleView for aerial measurements, runs your custom pricing logic (GAF vs Owens Corning margins), and Gemini 1.5 Pro vision-scans for hail impact and wind-lift markers. Glassmorphic UI updates in real-time as the homeowner chooses tiers.",
            goal: "YOU GET: Contracts signed 2X faster. Homeowners see AI damage markers, not verbal claims. No office admin time spent on estimates. Your rep spends more time with more leads.",
            features: ["🤖 AI Damage Detection", "⚡ 90-Second Proposals", "💰 Dynamic Pricing", "📋 DocuSign Auto-Sync"],
            icon: <Zap className="w-5 h-5" />,
            color: "amber"
        },
        {
            title: "Module C: The 'Orchestrator'",
            subtitle: "Autonomous Ops Agent",
            description: "A LangGraph agent that watches your entire operation in real-time. Reps move. The Orchestrator tracks. Contracts sign. Material takeoffs auto-generate.",
            howItWorks: "The 'Pulse' map shows real-time dots for every rep's location and knock history. Upon e-signature, a webhook fires automatically—the Orchestrator generates Material Takeoff lists and notifies production via Slack/email. No manual data entry. Revenue velocity ticker updates live.",
            goal: "YOU GET: Zero administrative friction between sales and production. Your office doesn't bottleneck. Field reps stay in the field. Production gets materials before the crew arrives. One dashboard. Total visibility.",
            features: ["🤖 Autonomous Workflow", "📊 Real-time 'Pulse' Map", "💵 Revenue Velocity Ticker", "📦 Auto Material Takeoff"],
            icon: <Activity className="w-5 h-5" />,
            color: "yellow"
        },
        {
            title: "Module D: The 'Sales Clone'",
            subtitle: "24/7 Autonomous Voice Agent",
            description: "A LangGraph agent trained on YOUR closing scripts. Handles every inbound call, every web chat. Never misses a lead. Runs 24/7.",
            howItWorks: "Neural models trained on your elite reps' call recordings and closing tactics. The agent handles objections, qualifies leads, and books appointments directly into your calendar. It learns from your outcomes. Next week it closes better.",
            goal: "YOU GET: Zero lead abandonment. Every call answered. Every chat engaged. Every lead followed up within 20 seconds, 24/7/365. Sales velocity that never sleeps. Leads that would have called your competitor the next day are already in your system.",
            features: ["🤖 24/7 Autonomous Calls", "🎤 Human-Grade Voice", "💬 Web Chat + SMS", "📞 Calendar Auto-Book"],
            icon: <Phone className="w-5 h-5" />,
            color: "blue"
        }
    ];

    const comparisons = [
        { label: "Infrastructure", legacy: "Disconnected SaaS Apps", revlo: "Unified Proprietary Engine" },
        { label: "Lead Response", legacy: "Manual Entry (15m - 2h)", revlo: "Storm-Triggered (5 Seconds)" },
        { label: "Trust Factor", legacy: "Verbal Damage Claims", revlo: "AI Vision Damage Overlay" },
        { label: "Ownership", legacy: "Monthly Per-User Fees", revlo: "100% IP & Asset Ownership" },
        { label: "Speed", legacy: "Office-Dependent Proposals", revlo: "Instant Field-Ready Proposals" }
    ];

    const protocolSteps = [
        {
            phase: "PHASE 00",
            title: "OPERATIONAL RECON",
            duration: "WEEK 01",
            desc: "We audit your current tech stack to identify 'Data Tax' leaks. We map your pricing logic and storm-response protocols into a technical blueprint.",
            deliverables: ["Stack Friction Audit", "Custom API Blueprint", "Pricing Logic Mapping"],
            icon: <Search className="w-5 h-5" />
        },
        {
            phase: "PHASE 01",
            title: "THE ENGINE BUILD",
            duration: "WEEKS 02-05",
            desc: "Heavy engineering. We deploy your Supabase backend, integrate Mapbox for territory carving, and build the Vision AI damage simulator.",
            deliverables: ["FEE Core Deployment", "AI Model Training", "Mapbox/NOAA Sync"],
            icon: <Settings className="w-5 h-5" />
        },
        {
            phase: "PHASE 02",
            title: "FIELD DEPLOYMENT",
            duration: "WEEKS 06-08",
            desc: "Your reps go live. We stress-test the 'Pulse' map and the proposal engine in real-world conditions. Onboarding and live tuning.",
            deliverables: ["Field UI Activation", "Rep Training Clips", "Real-time Data Tuning"],
            icon: <Rocket className="w-5 h-5" />
        },
        {
            phase: "PHASE 03",
            title: "SCALING SOVEREIGNTY",
            duration: "ONGOING",
            desc: "The system is yours. We provide fractional support to expand your FEE into new territories and optimize revenue velocity.",
            deliverables: ["90-Day Scale Roadmap", "Feature Expansion", "Asset Handover"],
            icon: <TrendingUp className="w-5 h-5" />
        }
    ];

    const faqs = [
        {
            q: "WHAT IS LANGGRAPH? HOW DOES SUBGRAPH STATE ISOLATION HELP ROOFERS?",
            a: "LangGraph is a framework that lets independent AI agents work in parallel. Your Hunter agent negotiates territory (State A), your Closer agent runs pricing (State B), and your Orchestrator tracks production (State C)—all simultaneously on the same project. They never collide. Zero data overlap. This is the 'isolating subgraph state' you need for autonomous scale."
        },
        {
            q: "DO I REALLY OWN 100% OF THIS?",
            a: "Yes, 100%. We deploy Supabase (your DB), Vercel (your compute), and Cloudflare (your storage) under YOUR AWS/personal accounts. You own the code, the data, the IP. No vendor lock-in. No monthly per-seat tax. If we disappear tomorrow, your system runs forever."
        },
        {
            q: "HOW MUCH WILL THIS ACTUALLY SAVE ME?",
            a: "Math: Typical roofing ops spending $80-200k/year on JobNimbus ($200/seat × 5 reps), Twilio per-message fees, EagleView per-estimate, plus a $50-70k/year office manager. With Revlo: $25-99k/year depending on tier, one flat fee, all autonomous. You're looking at 40-70% savings PLUS faster closures and zero lead decay."
        },
        {
            q: "WHAT IF MY REPS AREN'T TECH-SAVVY?",
            a: "The UI is dead simple. Reps see a map, tap a territory, take 5 photos. The agents handle everything else. We provide onboarding videos and live support during your 90-day deployment. By week 4, your team is fluent."
        },
        {
            q: "HOW LONG IS DEPLOYMENT?",
            a: "90 days from signed contract to live. Week 1: Recon. Week 2-5: Build & training. Week 6-8: Field deployment & tuning. Week 9-12: Scale & optimization. Most teams hit their first ROI within 30 days of going live (storm hits, system detects, leads flow)."
        },
        {
            q: "WHAT IF THERE'S A BUG OR THE SYSTEM BREAKS?",
            a: "You get fractional support included with every tier. Our team monitors production 24/7. We have SLA guarantees and redundancy built in (Supabase handles DB failover). No agent is running on a single thread—everything is architected for resilience."
        },
        {
            q: "CAN I INTEGRATE THIS WITH MY EXISTING CRM?",
            a: "Yes. The system can write to JobNimbus, Acculynx, Pipedrive, or any CRM with an API. Or we replace your CRM entirely and you get even more savings. Your choice."
        },
        {
            q: "WHAT ABOUT DATA PRIVACY AND SECURITY?",
            a: "Bank-level encryption (AES-256), row-level security on Supabase, Vercel serverless isolation, and GDPR/CCPA compliance built-in. Your data never leaves your Supabase instance. We never touch it."
        }
    ];

    const techStack = [
        {
            title: "Frontend",
            desc: "Next.js 15 (App Router) with a 'Command Center' UI—glassmorphism, dark mode, and high-visibility accents.",
            icon: <Layout className="w-5 h-5" />
        },
        {
            title: "Backend & Auth",
            desc: "Supabase (PostgreSQL) for real-time row-level security and lightning-fast data syncing.",
            icon: <Database className="w-5 h-5" />
        },
        {
            title: "Storage",
            desc: "Cloudflare R2 for high-resolution drone footage, site photos, and generated PDF contracts.",
            icon: <Server className="w-5 h-5" />
        },
        {
            title: "Intelligence",
            desc: "DeepSeek-V3 or Gemini 1.5 Pro via API for sales logic and automated damage assessment.",
            icon: <Cpu className="w-5 h-5" />
        }
    ];

    const automationHooks = [
        {
            title: "Lead Decay Alert",
            desc: "If a lead isn't contacted within 5 minutes of a storm-entry, a bot pings the rep to force action.",
            icon: <Clock className="w-4 h-4" />
        },
        {
            title: "The 'Review' Loop",
            desc: "Automated SMS via Twilio API asking for a Google Review the moment the crew arrives on site.",
            icon: <MessageSquare className="w-4 h-4" />
        },
        {
            title: "Finance-First",
            desc: "In-app 'Check Eligibility' button for soft credit pulls via GreenSky or Sunlight Financial API.",
            icon: <ShieldCheck className="w-4 h-4" />
        }
    ];

    return (
        <div className="min-h-screen bg-[#020408] text-white selection:bg-orange-500/30 overflow-x-hidden font-sans">
            <Helmet>
                <title>Storm-Triggered Roofing Leads | AI-Powered Damage Assessment | Revlo</title>
                <meta name="description" content="Capture 100% of roofing opportunities with AI-powered storm detection, automated damage assessment, and field-ready estimates. Replace manual workflows with ROI-crushing automation. See 3-4X more leads." />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Storm-Triggered Roofing Leads | AI-Powered Damage Assessment | Revlo" />
                <meta property="og:description" content="Capture 100% of roofing opportunities. AI detects storms + damage. Auto-generates estimates. Field teams execute flawlessly. Zero manual work. Pure ROI." />
                <meta property="og:image" content="https://res.cloudinary.com/dpfapm0tl/image/upload/v1773620304/Gemini_Generated_Image_38f8as38f8as38f8_e76fin.png" />
                <meta property="og:url" content="https://www.wearerevlo.com/roofing" />
                <meta property="og:site_name" content="Revlo" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Storm-Triggered Roofing Leads | AI-Powered Damage Assessment | Revlo" />
                <meta name="twitter:description" content="Capture 100% of roofing opportunities. AI detects storms + damage. Auto-generates estimates. Zero manual work. Pure ROI." />
                <meta name="twitter:image" content="https://res.cloudinary.com/dpfapm0tl/image/upload/v1773620304/Gemini_Generated_Image_38f8as38f8as38f8_e76fin.png" />
                <link rel="canonical" href="https://www.wearerevlo.com/roofing" />
            </Helmet>
            <Navigation />

            {/* CINEMATIC HERO */}
            <section className="relative py-20 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <svg className="hidden">
                        <defs>
                            <filter id="electric-roofing">
                                <feTurbulence type="fractalNoise" baseFrequency="0.45" numOctaves="2" result="noise">
                                    <animate attributeName="seed" from="1" to="100" dur="0.8s" repeatCount="indefinite" />
                                </feTurbulence>
                                <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
                            </filter>
                            <filter id="arc-roofing">
                                <feTurbulence type="fractalNoise" baseFrequency="0.12" numOctaves="3" result="noise">
                                    <animate attributeName="seed" from="1" to="100" dur="1.5s" repeatCount="indefinite" />
                                </feTurbulence>
                                <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
                            </filter>
                            <filter id="glow-roofing">
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
                    <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-orange-600/5 blur-[120px] rounded-full" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-600/5 blur-[120px] rounded-full" />
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col items-start space-y-4 lg:space-y-6"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full">
                                <span className="text-[8px] sm:text-[9px] lg:text-[10px] font-black text-orange-500 uppercase tracking-[0.25em] font-mono">
                                    AUTONOMOUS_AGENTS
                                </span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black font-display italic tracking-tight leading-[0.95] uppercase text-white relative z-10">
                                <span className="relative inline-block group/infinite">
                                    <span className="relative z-10 text-white">ROOFER</span>
                                    <div className="absolute inset-0 pointer-events-none z-0 overflow-visible">
                                        <svg className="w-full h-full overflow-visible">
                                            <motion.text
                                                x="0" y="0.82em"
                                                className="font-black font-display italic uppercase select-none"
                                                style={{ fontSize: 'inherit' }}
                                                fill="none" stroke="#f97316" strokeWidth="2.5" strokeDasharray="100 1100"
                                                animate={{ strokeDashoffset: [0, -1200] }}
                                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                                filter="url(#arc-roofing) url(#glow-roofing)"
                                            >ROOFER</motion.text>
                                        </svg>
                                    </div>
                                </span>
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-600 to-amber-800">AUTONOMOUS EMPIRE.</span>
                            </h1>

                            <p className="text-sm sm:text-base lg:text-lg text-slate-400 font-medium italic leading-tight max-w-lg border-l-4 border-orange-600 pl-3 py-0">
                                Your <span className="text-white font-black">Hunter agent wakes at 3 AM.</span> Storms hit. Leads flow in.<br />
                                Your <span className="text-white font-black">Closer agent quotes while you sleep.</span> Contracts land.
                            </p>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 w-full pt-2 lg:pt-4">
                                {[
                                    { val: "24/7", l: "AUTONOMOUS" },
                                    { val: "100%", l: "OWNERSHIP" },
                                    { val: "0", l: "DECAY" },
                                    { val: "60%", l: "SAVINGS" }
                                ].map((stat, i) => (
                                    <div key={i} className="flex flex-col">
                                        <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black italic text-white tracking-tighter leading-none">{stat.val}</div>
                                        <div className="flex items-center gap-1 mt-1 lg:mt-2">
                                            <div className="w-0.5 h-0.5 rounded-full bg-orange-500/50" />
                                            <span className="text-[7px] lg:text-[8px] font-black text-slate-600 uppercase tracking-widest">{stat.l}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, x: 30 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative group w-full mt-6 lg:mt-0"
                        >
                            <div className="absolute -inset-4 lg:-inset-6 bg-orange-600/10 blur-[80px] opacity-30 group-hover:opacity-60 transition-opacity duration-1000" />

                            <div className="glass-dark border border-white/10 rounded-[28px] lg:rounded-[40px] overflow-hidden shadow-2xl relative z-10">
                                <div className="bg-white/5 border-b border-white/5 px-5 lg:px-8 py-3 lg:py-4 flex justify-between items-center backdrop-blur-3xl">
                                    <div className="flex items-center gap-2 lg:gap-3">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
                                        <span className="text-[7px] lg:text-[8px] font-black text-white uppercase tracking-[0.2em] lg:tracking-[0.3em] font-mono">MISSION_LOG: FEE_ACTIVE</span>
                                    </div>
                                    <div className="text-[6px] font-mono text-white/40 hidden sm:block">{new Date().toLocaleTimeString()}</div>
                                </div>

                                <div className="p-5 lg:p-8 space-y-5 lg:space-y-8">
                                    <div className="flex justify-between items-end gap-3 lg:gap-4">
                                        <div className="space-y-1">
                                            <div className="text-[8px] lg:text-[9px] font-black text-orange-500 uppercase tracking-[0.2em] lg:tracking-[0.3em]">PROPRIETARY_CORE</div>
                                            <div className="text-xl lg:text-3xl font-black text-white italic tracking-tighter uppercase leading-none">REVLO_EDGE</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[7px] lg:text-[8px] font-black text-white/40 uppercase tracking-widest leading-none">STATUS</div>
                                            <div className="text-base lg:text-xl font-black text-green-500 uppercase">OPTIMIZED</div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 lg:space-y-4">
                                        <h3 className="text-3xl lg:text-4xl font-black italic tracking-tight text-white uppercase leading-tight">
                                            AGENTS THAT <br />
                                            <span className="text-orange-500 text-glow-orange">NEVER SLEEP.</span>
                                        </h3>
                                        <p className="text-[10px] lg:text-base text-slate-400 font-medium leading-relaxed">
                                            Built with LangGraph. Four agents, parallel state, zero overlap. All at your ownership.
                                        </p>
                                    </div>

                                    <Link to="/contact" className="block">
                                        <motion.button
                                            whileHover={{ scale: 1.02, x: 3, boxShadow: "0 0 40px rgba(249,115,22,0.3)" }}
                                            className="w-full py-4 lg:py-6 bg-white text-black text-[12px] lg:text-base font-black uppercase tracking-[0.1em] lg:tracking-[0.2em] rounded-[16px] flex items-center justify-center gap-2 italic shadow-2xl transition-all relative overflow-hidden"
                                        >
                                            SEE PRICING
                                            <ArrowRight className="w-4 lg:w-5 h-4 lg:h-5 group-hover:translate-x-1 transition-transform" />
                                        </motion.button>
                                    </Link>

                                    <div className="pt-3 lg:pt-5 flex items-center justify-between border-t border-white/5">
                                        <div className="text-[8px] lg:text-[9px] font-black text-white italic uppercase tracking-widest">
                                            💰 Save 60%
                                        </div>
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-0.5 h-2 lg:h-2.5 rounded-sm ${i < 5 ? 'bg-orange-500' : 'bg-white/10'}`} />)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* THE TACTICAL DATA RIBBON SYSTEM */}
                <div className="absolute bottom-0 left-0 w-full z-40 -rotate-1 skew-x-[0.2deg]">
                    <div className="w-full bg-orange-500/5 border-y border-white/5 py-1 overflow-hidden backdrop-blur-sm">
                        <div className="flex animate-marquee whitespace-nowrap gap-16 items-center opacity-30">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="flex gap-10 text-[7px] font-mono font-black text-orange-400 uppercase tracking-widest items-center">
                                    <span>COORD: STORM_CENTER_ACTIVE</span>
                                    <span>ENCRYPTION: AES-256</span>
                                    <span>STATUS: FIELD_SYNC_OK</span>
                                    <span>UID: ROOFER_CORE_01</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full bg-black/95 border-b border-white/10 py-5 overflow-hidden relative shadow-[0_0_100px_rgba(0,0,0,1)]">
                        <div className="absolute inset-x-0 inset-y-0 bg-[linear-gradient(90deg,transparent_0%,rgba(249,115,22,0.05)_50%,transparent_100%)] w-1/4 h-full animate-scan pointer-events-none" />
                        <div className="flex animate-marquee whitespace-nowrap gap-48 items-center relative z-10">
                            {[1, 2, 3, 4].map(i => (
                                <React.Fragment key={i}>
                                    <div className="flex items-center gap-8 group">
                                        <div className="w-2.5 h-2.5 bg-orange-500 rounded-sm rotate-45 group-hover:scale-150 transition-transform shadow-[0_0_20px_rgba(249,115,22,1)]" />
                                        <span className="text-2xl lg:text-3xl font-black italic uppercase tracking-[0.2em] text-white">STORM_TRIGGERED_TERRITORY</span>
                                    </div>
                                    <div className="flex items-center gap-8 group">
                                        <div className="w-2.5 h-2.5 bg-amber-500 rounded-sm rotate-45 group-hover:scale-150 transition-transform shadow-[0_0_20px_rgba(245,158,11,1)]" />
                                        <span className="text-2xl lg:text-3xl font-black italic uppercase tracking-[0.2em] text-orange-400">AI_DAMAGE_ASSESSMENT</span>
                                    </div>
                                    <div className="flex items-center gap-8 group">
                                        <div className="w-2.5 h-2.5 bg-white rounded-sm rotate-45 group-hover:scale-150 transition-transform shadow-[0_0_20px_rgba(255,255,255,1)]" />
                                        <span className="text-2xl lg:text-3xl font-black italic uppercase tracking-[0.2em] text-white">PROPRIETARY_FEE_ENGINE</span>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    <div className="w-full bg-amber-500/5 border-b border-white/5 py-1 overflow-hidden backdrop-blur-sm">
                        <div className="flex animate-marquee whitespace-nowrap gap-20 items-center opacity-30 justify-end" style={{ animationDirection: 'reverse' }}>
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="flex gap-12 text-[7px] font-mono font-black text-amber-400 uppercase tracking-widest items-center">
                                    <span>VERSION: FEE_OS_V2</span>
                                    <span>LATENCY: 12.4ms</span>
                                    <span>UPTIME: 99.9%</span>
                                    <span>PROTOCOL: FULL_CUSTOM</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 1: THE PROBLEM - SaaS-TAPE & THE DATA TAX */}
            <section className="py-32 relative border-t border-white/5 bg-[#020408]">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-12"
                        >
                            <div className="space-y-4">
                                <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.6em] block font-mono">
                                    // OPERATIONAL_AUDIT
                                </span>
                                <h2 className="text-5xl lg:text-7xl font-black italic uppercase text-white tracking-tighter leading-[0.9]">
                                    THE TRAP OF <br />
                                    <span className="text-red-500">SaaS-TAPE.</span>
                                </h2>
                            </div>

                            <div className="space-y-8">
                                <p className="text-xl text-slate-400 font-medium italic leading-relaxed border-l-2 border-red-500 pl-8">
                                    "Most roofing companies aren't businesses; they are a collection of disparate apps held together by manual labor and prayer."
                                </p>
                                <div className="space-y-6 text-slate-500 text-sm font-medium leading-relaxed">
                                    <p>
                                        You pay for <span className="text-white font-bold">Roofr</span> for measurements. You pay for <span className="text-white font-bold">JobNimbus</span> for CRM. You pay for <span className="text-white font-bold">HailTrace</span> for data. You pay for <span className="text-white font-bold">DocuSign</span> for contracts.
                                    </p>
                                    <p>
                                        This is the <span className="text-red-500 font-black">DATA TAX</span>. Every time your rep moves a lead from one app to another, data is lost, response time slows, and your margins evaporate.
                                    </p>
                                    <p>
                                        By building a <span className="text-white font-bold italic underline">Proprietary Field Execution Engine (FEE)</span>, you eliminate the friction. You move from a 'hustle' to a unified custom machine that you own—forever.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8 pt-8">
                                {[
                                    { val: "$2k+", l: "MONTHLY SaaS FEES" },
                                    { val: "15m", l: "DATA TRANSFER LAG" },
                                    { val: "100%", l: "DEPENDENCY RISK" },
                                    { val: "0%", l: "ASSET EQUITY" }
                                ].map((stat, i) => (
                                    <div key={i} className="flex flex-col group">
                                        <div className="text-2xl font-black italic text-red-500 tracking-tighter group-hover:scale-110 transition-transform">{stat.val}</div>
                                        <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest mt-1">{stat.l}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <div className="relative">
                            <div className="absolute -inset-10 bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />
                            <div className="glass-dark border border-white/10 rounded-[40px] p-12 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-20">
                                    <ZapOff className="w-24 h-24 text-red-500" />
                                </div>
                                <h3 className="text-2xl font-black italic uppercase text-white mb-10 tracking-tight">THE FRAGMENTED FLOW</h3>
                                <div className="space-y-8 relative">
                                    <div className="absolute left-6 top-0 bottom-0 w-px bg-white/5" />
                                    {[
                                        { step: "01", app: "HailTrace", action: "Identify Storm", loss: "30m Delay" },
                                        { step: "02", app: "Manual", action: "Assign Territory", loss: "Human Error" },
                                        { step: "03", app: "JobNimbus", action: "Input Lead Info", loss: "Double Entry" },
                                        { step: "04", app: "Roofr", action: "Order Report", loss: "Wait Time" },
                                        { step: "05", app: "Docusign", action: "Generate PDF", loss: "Broken Links" }
                                    ].map((s, i) => (
                                        <div key={i} className="flex gap-8 items-center relative z-10">
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black text-slate-500 group-hover:text-red-500 transition-colors">
                                                {s.step}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-white">{s.app}</span>
                                                    <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">{s.loss}</span>
                                                </div>
                                                <div className="text-sm font-medium italic text-slate-500">{s.action}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE BLUEPRINT */}
            <section className="py-20 lg:py-32 relative overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <div className="flex flex-col lg:flex-row items-end justify-between mb-16 lg:mb-24 gap-8">
                        <div>
                            <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.6em] mb-4 block font-mono">// TECHNICAL_BLUEPRINT</span>
                            <h2 className="text-5xl sm:text-6xl lg:text-9xl font-black font-display italic tracking-tight mb-0 uppercase text-white leading-[0.8]">
                                THE REVLO <br />
                                <span className="gradient-text italic tracking-[-0.05em] from-orange-400 to-amber-600">EDGE.</span>
                            </h2>
                        </div>
                        <p className="text-lg lg:text-2xl text-slate-400 font-medium leading-tight max-w-md italic border-l-2 border-white/10 pl-8 lg:pb-12 text-left">
                            "SaaS apps are for the average. We build the unified engine that gives you the tactical advantage in any territory."
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {roofingModules.map((mod, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-dark p-8 lg:p-12 rounded-[40px] border border-white/5 relative group hover:border-orange-500/30 transition-all duration-500"
                            >
                                <div className="relative z-10 space-y-10">
                                    <div className="flex items-center gap-6">
                                        <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform`}>
                                            {mod.icon}
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-1 font-mono">{mod.subtitle}</div>
                                            <h3 className="text-3xl font-black italic uppercase text-white tracking-tighter leading-none">{mod.title}</h3>
                                        </div>
                                    </div>

                                    <p className="text-xl text-slate-400 italic font-medium leading-relaxed">
                                        "{mod.description}"
                                    </p>

                                    <div className="space-y-6 pt-10 border-t border-white/5">
                                        <div className="space-y-4">
                                            <h4 className="text-[10px] font-black text-orange-500 uppercase tracking-widest flex items-center gap-3">
                                                <Terminal className="w-4 h-4" />
                                                THE LOGIC
                                            </h4>
                                            <p className="text-xs text-slate-500 italic font-medium leading-relaxed">
                                                {mod.howItWorks}
                                            </p>
                                        </div>
                                        <div className="space-y-4">
                                            <h4 className="text-[10px] font-black text-green-500 uppercase tracking-widest flex items-center gap-3">
                                                <Target className="w-4 h-4" />
                                                THE IMPACT
                                            </h4>
                                            <p className="text-xs text-slate-300 font-bold italic leading-relaxed">
                                                {mod.goal}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 pt-6">
                                        {mod.features.map((f, idx) => (
                                            <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/5 rounded-xl text-[8px] font-black text-slate-500 uppercase tracking-widest hover:bg-orange-600/10 hover:border-orange-500/20 transition-all cursor-default">
                                                <Check className="w-2.5 h-2.5 text-orange-500" />
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

            {/* SECTION 2: MODULE A DEEP DIVE - THE DYNAMIC BATTLEFIELD */}
            <section className="py-32 relative overflow-hidden border-t border-white/5 bg-black">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <div className="order-2 lg:order-1 relative">
                            <div className="glass-dark border border-white/10 rounded-[40px] aspect-square lg:aspect-video relative overflow-hidden shadow-2xl">
                                {/* Visual placeholder for Mapbox Interface */}
                                <div className="absolute inset-0 bg-[#0a0c10]">
                                    <div className="absolute inset-0 bg-grid-white opacity-[0.05]" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-orange-500/20 rounded-full animate-pulse" />
                                    <div className="absolute top-[30%] left-[40%] w-3 h-3 bg-orange-500 rounded-full shadow-[0_0_20px_rgba(249,115,22,1)]" />
                                    <div className="absolute top-[50%] left-[60%] w-3 h-3 bg-orange-500 rounded-full shadow-[0_0_20px_rgba(249,115,22,1)] animate-bounce" />
                                    <div className="absolute top-[20%] left-[70%] w-3 h-3 bg-orange-500 rounded-full shadow-[0_0_20px_rgba(249,115,22,1)]" />
                                    
                                    <div className="absolute bottom-8 left-8 right-8 glass-dark p-6 rounded-2xl border border-white/10">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-[9px] font-black uppercase tracking-widest text-orange-500">TERRITORY_RECON</span>
                                            <span className="text-[7px] font-mono text-white/40">HAIL: 1.75" DEPTH</span>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                <div className="h-full w-[65%] bg-orange-500" />
                                            </div>
                                            <div className="flex justify-between text-[8px] font-black uppercase tracking-widest">
                                                <span>124 PROPERTIES IN SWATH</span>
                                                <span className="text-orange-500">REPS_ASSIGNED</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-1 lg:order-2 space-y-12"
                        >
                            <div className="space-y-4">
                                <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.6em] block font-mono">
                                    // MODULE_A: HUNTER
                                </span>
                                <h2 className="text-5xl lg:text-7xl font-black italic uppercase text-white tracking-tighter leading-[0.9]">
                                    THE DYNAMIC <br />
                                    <span className="text-orange-500 italic">BATTLEFIELD.</span>
                                </h2>
                            </div>

                            <p className="text-xl text-slate-400 font-medium italic leading-relaxed">
                                "Winning the storm is a game of minutes. Our Mapbox GL JS engine turns property data into a physical claim zone."
                            </p>

                            <div className="space-y-10">
                                {[
                                    { title: "Storm-Triggered Edge Functions", desc: "The moment a storm hits, a Supabase Edge Function triggers. No manual monitoring required." },
                                    { title: "Physical 'Lasso' Territories", desc: "Reps physically draw their claimed neighborhood on the map. The system locks it to their UID for the day." },
                                    { title: "Property Pre-Intel", desc: "Instantly see the homeowner's name, property history, and roof type before you even park the truck." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 group">
                                        <div className="w-px h-12 bg-orange-500/20 group-hover:bg-orange-500 transition-colors" />
                                        <div className="space-y-2">
                                            <h4 className="text-lg font-black italic uppercase text-white tracking-tight">{item.title}</h4>
                                            <p className="text-sm text-slate-500 font-medium italic leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: MODULE B DEEP DIVE - AI DAMAGE SIMULATOR */}
            <section className="py-32 relative overflow-hidden bg-[#05070a]">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-[1fr,1.2fr] gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-12"
                        >
                            <div className="space-y-4">
                                <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.6em] block font-mono">
                                    // MODULE_B: CLOSER
                                </span>
                                <h2 className="text-5xl lg:text-7xl font-black italic uppercase text-white tracking-tighter leading-[0.9]">
                                    AI-POWERED <br />
                                    <span className="text-amber-500 italic">TRUST.</span>
                                </h2>
                            </div>

                            <p className="text-xl text-slate-400 font-medium italic leading-relaxed">
                                "Homeowners don't trust roofers. They trust what they can see. Our AI vision highlights what their naked eye misses."
                            </p>

                            <div className="space-y-10">
                                {[
                                    { title: "Vision LLM Assessment", desc: "Rep uploads 5 photos. Gemini 1.5 Pro scans for granular loss and wind-lift in seconds." },
                                    { title: "Dynamic Proposal UI", desc: "Pricing updates in real-time as the homeowner toggles between shingle tiers on a glassmorphic tablet interface." },
                                    { title: "Aerial measurements Sync", desc: "Direct API hooks to Roofr/EagleView mean the measurements are accurate down to the square inch." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 group">
                                        <div className="w-px h-12 bg-amber-500/20 group-hover:bg-amber-500 transition-colors" />
                                        <div className="space-y-2">
                                            <h4 className="text-lg font-black italic uppercase text-white tracking-tight">{item.title}</h4>
                                            <p className="text-sm text-slate-500 font-medium italic leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <div className="relative">
                            <div className="absolute -inset-10 bg-amber-600/5 blur-[120px] rounded-full pointer-events-none" />
                            <div className="glass-dark border border-white/10 rounded-[40px] p-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <Camera className="w-24 h-24 text-amber-500" />
                                </div>
                                <div className="space-y-8">
                                    <div className="aspect-[4/3] rounded-2xl bg-slate-900 overflow-hidden relative border border-white/5">
                                        <img src="https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&q=80&w=800" alt="Roof Damage" className="w-full h-full object-cover opacity-60" />
                                        {/* AI Vision Markers Overlays */}
                                        <div className="absolute top-[40%] left-[30%] w-8 h-8 border-2 border-amber-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(245,158,11,1)]">
                                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[7px] font-black bg-amber-500 text-black px-1.5 py-0.5 rounded">HAIL_IMPACT</div>
                                        </div>
                                        <div className="absolute top-[60%] left-[55%] w-10 h-10 border-2 border-amber-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(245,158,11,1)]">
                                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[7px] font-black bg-amber-500 text-black px-1.5 py-0.5 rounded">WIND_LIFT</div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">AI_DIAGNOSTIC_REPORT</span>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-green-500 font-mono italic">CONFIDENCE: 98.4%</span>
                                        </div>
                                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "98.4%" }}
                                                transition={{ duration: 1.5, delay: 0.5 }}
                                                className="h-full bg-amber-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: MODULE C DEEP DIVE - THE COMMAND CENTER */}
            <section className="py-32 relative overflow-hidden bg-black">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <div className="text-center mb-24 max-w-3xl mx-auto space-y-6">
                        <span className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.8em] block font-mono">
                            // MODULE_C: ORCHESTRATOR
                        </span>
                        <h2 className="text-6xl lg:text-9xl font-black italic uppercase text-white tracking-tighter leading-none">
                            THE COMMAND <br />
                            <span className="text-yellow-500 italic">CENTER.</span>
                        </h2>
                        <p className="text-xl text-slate-500 font-medium italic">
                            Your roofing business, visualized in 16:9 real-time operational clarity.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {[
                            { title: "The 'Pulse' Map", desc: "Real-time dots showing where every rep is, where they've knocked in the last hour, and their lead status.", icon: <Map className="w-6 h-6" /> },
                            { title: "Revenue Velocity", desc: "A live ticker of signed contracts vs pending insurance approvals, updated the second a rep hits 'Submit'.", icon: <TrendingUp className="w-6 h-6" /> },
                            { title: "Production Sync", desc: "Automated Material Takeoff lists generated and sent to production as soon as the contract is signed.", icon: <Workflow className="w-6 h-6" /> }
                        ].map((box, i) => (
                            <div key={i} className="glass-dark border border-white/5 p-12 rounded-[40px] space-y-8 hover:border-yellow-500/20 transition-all group">
                                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-yellow-500 group-hover:scale-110 transition-transform">
                                    {box.icon}
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-3xl font-black italic uppercase text-white tracking-tight leading-none">{box.title}</h3>
                                    <p className="text-sm text-slate-500 font-medium italic leading-relaxed">{box.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 4.5: AUTOMATION HOOKS - THE DIFFERENTIATION */}
            <section className="py-32 relative overflow-hidden bg-[#020408] border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-24 items-center">
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <span className="text-[10px] font-black text-green-500 uppercase tracking-[0.6em] block font-mono">
                                    // SYSTEM_DRIVEN_TRIGGERS
                                </span>
                                <h2 className="text-5xl lg:text-7xl font-black italic uppercase text-white tracking-tighter leading-[0.9]">
                                    THE REVLO <br />
                                    <span className="text-green-500 italic">DIFFERENTIATION.</span>
                                </h2>
                            </div>

                            <p className="text-xl text-slate-400 font-medium italic leading-relaxed">
                                "To move from a 'hustle' to a system, you need Automated Triggers. We build the hooks that force your business to grow without you touching a button."
                            </p>

                            <div className="grid md:grid-cols-2 gap-8">
                                {[
                                    { title: "Lead Decay Bot", desc: "If a lead isn't touched within 5 minutes of a storm-entry, a bot pings the rep to force action. No lead is left behind." },
                                    { title: "The 'Review' Loop", desc: "Twilio API integration sends a personalized SMS for a Google Review the moment the crew arrives. Strike while the iron is hot." },
                                    { title: "Finance-First Prequal", desc: "Direct soft credit pull via GreenSky or Sunlight Financial API inside the UI. Know the budget before you pitch." },
                                    { title: "Production Webhooks", desc: "Signature fires a webhook that generates material takeoffs and orders directly. Zero office-to-field friction." }
                                ].map((hook, i) => (
                                    <div key={i} className="glass-dark border border-white/5 p-8 rounded-3xl space-y-4 hover:border-green-500/20 transition-all">
                                        <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500">
                                            <Zap className="w-5 h-5" />
                                        </div>
                                        <h4 className="text-lg font-black italic uppercase text-white tracking-tight">{hook.title}</h4>
                                        <p className="text-xs text-slate-500 font-medium italic leading-relaxed">{hook.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-10 bg-green-600/5 blur-[120px] rounded-full pointer-events-none" />
                            <div className="glass-dark border border-white/10 rounded-[40px] p-10 relative overflow-hidden">
                                <div className="space-y-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-[10px] font-black text-white uppercase tracking-[0.4em] font-mono">LIVE_AUTOMATION_STREAM</span>
                                    </div>
                                    <div className="space-y-4">
                                        {[
                                            { t: "14:02", m: "Storm Pulse > 1.5\" detected in Dallas, TX" },
                                            { t: "14:02", m: "34 Properties mapped & assigned to Rep: J. Miller" },
                                            { t: "14:05", m: "Lead Decay Alert: Property #12 (Miller notified)" },
                                            { t: "14:15", m: "AI Vision Scan: 4 Hail Impacts detected" },
                                            { t: "14:18", m: "Contract Signed: $18,450 (GAF Timberline)" },
                                            { t: "14:18", m: "Webhook: Material Takeoff sent to Supplier" }
                                        ].map((log, i) => (
                                            <div key={i} className="flex gap-4 text-[9px] font-mono">
                                                <span className="text-slate-600">[{log.t}]</span>
                                                <span className="text-slate-400">{log.m}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TECH STACK SECTION */}
            <section className="py-20 bg-white/[0.01] border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.6em] mb-8 block font-mono">// CORE_INFRASTRUCTURE</span>
                            <h2 className="text-4xl lg:text-6xl font-black italic uppercase text-white mb-8 tracking-tighter leading-[0.9]">
                                THE HIGH-PERFORMANCE <br />
                                <span className="text-orange-500">ROOFING STACK.</span>
                            </h2>
                            <p className="text-lg text-slate-400 italic font-medium mb-12 max-w-xl">
                                We utilize your preferred stack for maximum leverage and zero vendor lock-in. Your business, your assets.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-8">
                                {techStack.map((tech, i) => (
                                    <div key={i} className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
                                                {tech.icon}
                                            </div>
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-white">{tech.title}</h4>
                                        </div>
                                        <p className="text-[11px] text-slate-500 italic font-medium leading-relaxed">{tech.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="glass-dark border border-white/10 rounded-[40px] p-12 relative z-10 overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <Shield className="w-32 h-32 text-orange-500" />
                                </div>
                                <h3 className="text-2xl font-black italic uppercase text-white mb-8 tracking-tight">AUTOMATION HOOKS</h3>
                                <div className="space-y-8">
                                    {automationHooks.map((hook, i) => (
                                        <div key={i} className="flex gap-6 items-start group">
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 group-hover:text-orange-500 group-hover:border-orange-500/30 transition-all shrink-0">
                                                {hook.icon}
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className="text-sm font-black italic uppercase text-white tracking-tight">{hook.title}</h4>
                                                <p className="text-xs text-slate-500 italic font-medium leading-relaxed">{hook.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4.7: VOICE AI AGENTS - THE 1-CLICK SALES FORCE */}
            <section className="py-32 relative overflow-hidden bg-[#05070a] border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-12"
                        >
                            <div className="space-y-4">
                                <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.6em] block font-mono">
                                    // ELITE_VOICE_INFRASTRUCTURE
                                </span>
                                <h2 className="text-5xl lg:text-7xl font-black italic uppercase text-white tracking-tighter leading-[0.9]">
                                    THE 1-CLICK <br />
                                    <span className="text-blue-500 italic text-glow-blue">SALES CLONE.</span>
                                </h2>
                            </div>

                            <p className="text-xl text-slate-400 font-medium italic leading-relaxed border-l-2 border-blue-500 pl-8">
                                "Stop relying on humans to answer the phone at 8 PM. Deploy a fleet of AI sales agents that handle your entire sales pipeline autonomously."
                            </p>

                            <div className="grid sm:grid-cols-2 gap-8">
                                {[
                                    { title: "Outbound Qualification", desc: "The second a lead hits, the AI calls them. No more 'I'll call them back in an hour'." },
                                    { title: "Website Voice Chat", desc: "Customers can talk directly to your site. An interactive voice experience that books leads." },
                                    { title: "24/7 Phone Desk", desc: "Handle inbound inquiries, job scheduling, and support without an expensive office admin." },
                                    { title: "Scripted Mastery", desc: "Your agents never have a 'bad day'. They follow your winning script with 100% consistency." }
                                ].map((item, i) => (
                                    <div key={i} className="space-y-3 group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                                                <Mic className="w-4 h-4" />
                                            </div>
                                            <h4 className="text-sm font-black italic uppercase text-white tracking-tight">{item.title}</h4>
                                        </div>
                                        <p className="text-xs text-slate-500 font-medium italic leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-8">
                                <Link to="/contact">
                                    <motion.button
                                        whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(59,130,246,0.3)" }}
                                        className="px-8 py-4 bg-blue-600 text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-xl flex items-center gap-4 italic"
                                    >
                                        DEPLOY YOUR VOICE CLONE
                                        <ArrowRight className="w-4 h-4" />
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>

                        <div className="relative">
                            <div className="absolute -inset-10 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
                            <div className="glass-dark border border-white/10 rounded-[40px] overflow-hidden shadow-2xl">
                                <div className="bg-white/5 border-b border-white/5 px-8 py-4 flex justify-between items-center backdrop-blur-3xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                        <span className="text-[9px] font-black text-white uppercase tracking-[0.4em] font-mono">NEURAL_VOICE_LINK: ACTIVE</span>
                                    </div>
                                    <div className="text-[7px] font-mono text-white/40">LATENCY: 420ms</div>
                                </div>

                                <div className="p-10 space-y-8">
                                    {/* Simulation of a Voice UI */}
                                    <div className="flex flex-col items-center justify-center py-12 space-y-8">
                                        <div className="relative">
                                            <motion.div
                                                animate={{
                                                    scale: [1, 1.2, 1],
                                                    opacity: [0.3, 0.6, 0.3],
                                                }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className="absolute inset-0 bg-blue-500 rounded-full blur-2xl"
                                            />
                                            <div className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center relative z-10 border-4 border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.5)]">
                                                <Mic className="w-12 h-12 text-white" />
                                            </div>
                                        </div>
                                        <div className="text-center space-y-4">
                                            <div className="text-2xl font-black italic uppercase text-white tracking-tighter">"I CAN HANDLE THAT FOR YOU."</div>
                                            <div className="flex gap-1 justify-center">
                                                {[...Array(24)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        animate={{
                                                            height: [4, Math.random() * 20 + 10, 4]
                                                        }}
                                                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
                                                        className="w-1 bg-blue-500 rounded-full"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        {[
                                            { label: "PHONE", status: "ONLINE" },
                                            { label: "WEB", status: "SYNCED" },
                                            { label: "CHAT", status: "LEARNING" }
                                        ].map((stat, i) => (
                                            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                                                <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</div>
                                                <div className="text-[10px] font-black text-blue-500 uppercase">{stat.status}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 5: WHAT YOU'RE ACTUALLY GETTING - WIIFM */}
            <section className="py-32 relative border-t border-white/5 bg-black">
                <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-32 max-w-3xl mx-auto space-y-6">
                        <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.8em] block font-mono">// YOU GET</span>
                        <h2 className="text-5xl lg:text-8xl font-black font-display italic tracking-tight uppercase text-white leading-none">
                            A <span className="text-orange-500">DIGITAL TWIN</span> OF YOUR <br />BEST OPS MANAGER.
                        </h2>
                        <p className="text-xl text-slate-400 italic font-medium">Not just software. A system that thinks, adapts, and executes like your elite team.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="glass-dark border border-white/5 p-12 rounded-[40px] space-y-8 hover:border-orange-500/30 transition-all">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0 text-orange-500 mt-1">
                                    <Target className="w-6 h-6" />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-black italic uppercase text-white">Lead Hunts Itself</h3>
                                    <p className="text-sm text-slate-400 italic leading-relaxed">Your 'Hunter' agent wakes up at 3 AM when hail hits. Storms are detected, properties are mapped, reps are alerted. All while you sleep. No leads go cold.</p>
                                    <div className="flex items-center gap-2 text-[11px] font-black text-orange-500 uppercase tracking-wider pt-2">
                                        <Check className="w-4 h-4" />
                                        5-SECOND RESPONSE TIME
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-dark border border-white/5 p-12 rounded-[40px] space-y-8 hover:border-orange-500/30 transition-all">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0 text-orange-500 mt-1">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-black italic uppercase text-white">Sales Closes on Demand</h3>
                                    <p className="text-sm text-slate-400 italic leading-relaxed">Your 'Closer' agent runs pricing logic, uploads photos, and AI-detects damage markers in 90 seconds. Homeowners see proof, not promises. Contracts land faster.</p>
                                    <div className="flex items-center gap-2 text-[11px] font-black text-orange-500 uppercase tracking-wider pt-2">
                                        <Check className="w-4 h-4" />
                                        2X FASTER PROPOSALS
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-dark border border-white/5 p-12 rounded-[40px] space-y-8 hover:border-orange-500/30 transition-all">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0 text-orange-500 mt-1">
                                    <Activity className="w-6 h-6" />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-black italic uppercase text-white">Operations Runs Itself</h3>
                                    <p className="text-sm text-slate-400 italic leading-relaxed">Your 'Orchestrator' agent watches every rep in real-time, auto-generates material takeoffs, syncs with production. No office manager needed for the execution layer.</p>
                                    <div className="flex items-center gap-2 text-[11px] font-black text-orange-500 uppercase tracking-wider pt-2">
                                        <Check className="w-4 h-4" />
                                        ZERO ADMINISTRATIVE FRICTION
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-dark border border-white/5 p-12 rounded-[40px] space-y-8 hover:border-orange-500/30 transition-all">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0 text-orange-500 mt-1">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-black italic uppercase text-white">24/7 Sales Agents</h3>
                                    <p className="text-sm text-slate-400 italic leading-relaxed">Calls don't get missed. Chats don't go unanswered. Your Voice AI agent quotes jobs at 2 AM with zero latency. Every lead gets followed up that same day.</p>
                                    <div className="flex items-center gap-2 text-[11px] font-black text-orange-500 uppercase tracking-wider pt-2">
                                        <Check className="w-4 h-4" />
                                        NEVER LOSE A LEAD TO SILENCE
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-24 p-12 bg-gradient-to-r from-orange-600/5 to-amber-600/5 border border-orange-500/20 rounded-[40px] text-center space-y-4">
                        <p className="text-lg font-black italic uppercase text-orange-500">YOU OWN 100% OF THIS</p>
                        <p className="text-2xl font-black italic uppercase text-white max-w-3xl mx-auto">Built on your Supabase database, your Vercel infrastructure, your Cloudflare storage. No vendor lock-in. No monthly per-user taxes. This is your asset forever.</p>
                    </div>
                </div>
            </section>

            {/* SECTION 5.5: COMPARISON - DOMINANCE VS THE STANDARD */}
            <section className="py-32 relative border-t border-white/5 bg-[#020408]">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-32 max-w-4xl mx-auto">
                        <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.8em] mb-8 block font-mono">// MARKET_AUDIT</span>
                        <h2 className="text-5xl lg:text-8xl font-black font-display italic tracking-tight uppercase text-white leading-none">
                            OWN THE <span className="text-red-500 italic">SYSTEM.</span>
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* LEGACY SaaS STACK */}
                        <div className="p-12 bg-white/[0.02] border border-white/10 rounded-[48px] space-y-16 opacity-60 hover:opacity-100 transition-all duration-700 group cursor-default">
                            <div>
                                <div className="text-[9px] font-black text-slate-500 uppercase tracking-[0.6em] mb-12 font-mono">STATUS: FRAGMENTED</div>
                                <h3 className="text-4xl font-black italic uppercase text-slate-400 leading-[0.8]">THE LEGACY <br />SaaS-TAPE STACK.</h3>
                            </div>
                            <ul className="space-y-10">
                                {comparisons.map((item, i) => (
                                    <li key={i} className="space-y-2 pl-8 border-l border-white/10">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-0">
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.label}</span>
                                            <span className="text-2xl font-black text-slate-300 italic tracking-tight uppercase opacity-50">{item.legacy}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* REVLO CUSTOM ENGINE */}
                        <div className="p-12 bg-orange-600/[0.03] border-2 border-orange-500/30 rounded-[48px] space-y-16 relative overflow-hidden group shadow-[0_0_80px_rgba(249,115,22,0.1)]">
                            <div className="absolute top-0 right-0 p-12 opacity-10">
                                <Rocket className="w-48 h-48 text-orange-500" />
                            </div>
                            <div>
                                <div className="text-[9px] font-black text-orange-500 uppercase tracking-[0.6em] mb-12 font-mono">STATUS: OPTIMIZED</div>
                                <h3 className="text-4xl font-black italic uppercase text-white leading-[0.8]">THE PROPRIETARY <br /><span className="text-orange-500 text-glow-orange italic">FEE ENGINE.</span></h3>
                            </div>
                            <ul className="space-y-10">
                                {comparisons.map((item, i) => (
                                    <li key={i} className="space-y-2 pl-8 border-l border-orange-500/30">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-0">
                                            <span className="text-[10px] font-black text-orange-500/60 uppercase tracking-widest">{item.label}</span>
                                            <span className="text-2xl font-black text-white italic tracking-tight uppercase text-glow-orange">{item.revlo}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 6.5: PRICING - CUT 60% FROM INDUSTRY STANDARD */}
            <section id="pricing" className="py-32 relative border-t border-white/5 overflow-hidden bg-black">
                <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-32 max-w-3xl mx-auto space-y-6">
                        <span className="text-[10px] font-black text-green-500 uppercase tracking-[0.8em] block font-mono">// INVESTMENT</span>
                        <h2 className="text-5xl lg:text-8xl font-black font-display italic tracking-tight uppercase text-white leading-none">
                            AGGRESSIVE <span className="text-green-500">PRICING.</span>
                        </h2>
                        <p className="text-xl text-slate-400 italic font-medium">60-70% cheaper than hiring another office manager or paying SaaS per-seat fees. You get sovereign ownership, zero per-user tax.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {/* TIER 1: HUNTER ONLY */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="glass-dark border border-white/5 rounded-[40px] overflow-hidden group hover:border-green-500/30 transition-all"
                        >
                            <div className="p-8 lg:p-10 space-y-12 h-full flex flex-col">
                                <div className="space-y-4">
                                    <h3 className="text-2xl lg:text-3xl font-black italic uppercase text-white tracking-tight">HUNTER TIER</h3>
                                    <p className="text-sm text-slate-400">Storm detection + lead mapping only. Manual closing.</p>
                                </div>

                                <div className="space-y-2">
                                    <div className="text-5xl font-black text-green-500 italic">$2,500</div>
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">/month (billed annually at $25k/year)</p>
                                </div>

                                <ul className="space-y-4 flex-1">
                                    {[
                                        "Storm-triggered lead detection",
                                        "Mapbox territory carving",
                                        "Property pre-intel (owner name, roof age)",
                                        "Rep assignment logic",
                                        "5-minute lead response time"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                                            <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link to="/contact" className="mt-auto">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        className="w-full px-8 py-4 bg-white/5 border border-green-500/30 text-white text-sm font-black uppercase tracking-[0.3em] rounded-[24px] italic hover:bg-green-500/10 transition-all"
                                    >
                                        EXPLORE
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>

                        {/* TIER 2: HUNTER + CLOSER (POPULAR) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="glass-dark border-2 border-green-500/50 rounded-[40px] overflow-hidden group shadow-[0_0_60px_rgba(34,197,94,0.15)] relative"
                        >
                            <div className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-black text-[9px] font-black uppercase tracking-widest rounded-full">
                                MOST POPULAR
                            </div>
                            <div className="p-8 lg:p-10 space-y-12 h-full flex flex-col">
                                <div className="space-y-4">
                                    <h3 className="text-2xl lg:text-3xl font-black italic uppercase text-white tracking-tight">HUNTER + CLOSER</h3>
                                    <p className="text-sm text-slate-400">Full storm-to-signature automation.</p>
                                </div>

                                <div className="space-y-2">
                                    <div className="text-5xl font-black text-green-500 italic">$5,900</div>
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">/month (billed annually at $59k/year)</p>
                                </div>

                                <ul className="space-y-4 flex-1">
                                    {[
                                        "Everything in Hunter Tier",
                                        "AI damage detection (Vision LLM)",
                                        "Dynamic proposal engine",
                                        "Custom pricing tiers (Good/Better/Best)",
                                        "Aerial measurements sync (Roofr/EagleView)",
                                        "Real-time proposal UI on tablets",
                                        "DocuSign e-signature integration"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                                            <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link to="/contact" className="mt-auto">
                                    <motion.button
                                        whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(34,197,94,0.3)" }}
                                        className="w-full px-8 py-4 bg-green-500 text-black text-sm font-black uppercase tracking-[0.3em] rounded-[24px] italic hover:bg-green-600 transition-all"
                                    >
                                        GET STARTED
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>

                        {/* TIER 3: FULL SUITE + AGENTS */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="glass-dark border border-white/5 rounded-[40px] overflow-hidden group hover:border-green-500/30 transition-all"
                        >
                            <div className="p-8 lg:p-10 space-y-12 h-full flex flex-col">
                                <div className="space-y-4">
                                    <h3 className="text-2xl lg:text-3xl font-black italic uppercase text-white tracking-tight">SOVEREIGN SUITE</h3>
                                    <p className="text-sm text-slate-400">Full automation + 24/7 voice agents.</p>
                                </div>

                                <div className="space-y-2">
                                    <div className="text-5xl font-black text-green-500 italic">$9,900</div>
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">/month (billed annually at $99k/year)</p>
                                </div>

                                <ul className="space-y-4 flex-1">
                                    {[
                                        "Everything in Hunter + Closer",
                                        "Command Center dashboard",
                                        "Rep real-time location tracking ('Pulse')",
                                        "Revenue velocity ticker",
                                        "Automated material takeoff generation",
                                        "24/7 voice AI agents (inbound/outbound)",
                                        "Website voice interface",
                                        "Auto-review request SMS loop (Twilio)",
                                        "Finance pre-qualification (GreenSky/Sunlight)"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                                            <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link to="/contact" className="mt-auto">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        className="w-full px-8 py-4 bg-white/5 border border-green-500/30 text-white text-sm font-black uppercase tracking-[0.3em] rounded-[24px] italic hover:bg-green-500/10 transition-all"
                                    >
                                        EXPLORE
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* PRICING CONTEXT */}
                    <div className="grid lg:grid-cols-2 gap-8 text-center lg:text-left">
                        <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] space-y-4">
                            <h4 className="text-xl font-black italic uppercase text-white">❌ What You're Paying NOW</h4>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li>JobNimbus/Acculynx: $150-300/mo per user (× field reps)</li>
                                <li>Twilio SMS fees: $0.01-0.03 per message (× 1000s/month)</li>
                                <li>Roofr/EagleView: Custom per-estimate pricing</li>
                                <li>Office manager salary: $45-70k/year</li>
                                <li className="font-black text-orange-500 pt-2">TOTAL: $80k-250k+ annually (no ownership)</li>
                            </ul>
                        </div>

                        <div className="p-8 bg-green-600/[0.05] border border-green-500/20 rounded-[32px] space-y-4">
                            <h4 className="text-xl font-black italic uppercase text-green-500">✅ What You Pay With Revlo</h4>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li>Hunter Tier: $25k/year (you run proposals manually)</li>
                                <li>Hunter + Closer: $59k/year (full workflow automation)</li>
                                <li>Sovereign Suite: $99k/year (+ 24/7 voice agents)</li>
                                <li>No per-user seats. No per-message fees.</li>
                                <li className="font-black text-green-500 pt-2">SAVINGS: 40-70% annual cost reduction (+ 100% ownership)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 6: THE 90-DAY BLITZ */}
            <section className="py-32 relative border-t border-white/5 overflow-hidden">
                <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col items-center text-center mb-32">
                        <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.6em] mb-8 block font-mono">// FORCE_PROTOCOL</span>
                        <h2 className="text-5xl lg:text-7xl font-black font-display italic tracking-tight uppercase text-white leading-none">
                            THE 90-DAY <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-700">BLITZ.</span>
                        </h2>
                    </div>

                    <div className="relative">
                        <div className="absolute left-[39px] lg:left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-orange-500/50 via-white/5 to-transparent lg:-translate-x-1/2" />

                        <div className="space-y-32">
                            {protocolSteps.map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className={`relative flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}
                                >
                                    <div className="absolute left-0 lg:left-1/2 top-0 w-20 h-20 rounded-[28px] bg-[#020408] border-2 border-orange-500 flex items-center justify-center lg:-translate-x-1/2 z-20 shadow-2xl">
                                        <span className="text-3xl font-black text-white italic tracking-tighter">0{i}</span>
                                    </div>

                                    <div className="w-full lg:w-[45%] pl-24 lg:pl-0">
                                        <div className="glass-dark border border-white/5 rounded-[40px] p-10 lg:p-14 hover:border-orange-500/20 transition-all duration-700 relative overflow-hidden">
                                            <div className="flex items-center gap-6 mb-8">
                                                <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.4em] px-4 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full font-mono">{step.phase}</span>
                                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono italic">{step.duration}</span>
                                            </div>
                                            <h3 className="text-3xl lg:text-4xl font-black italic uppercase text-white mb-6 tracking-tighter leading-none">{step.title}</h3>
                                            <p className="text-lg text-slate-400 italic font-medium leading-[1.2] mb-10 border-l-4 border-white/5 pl-8">"{step.desc}"</p>

                                            <div className="grid sm:grid-cols-2 gap-8 pt-8 border-t border-white/5">
                                                {step.deliverables.map((d, idx) => (
                                                    <div key={idx} className="flex items-center gap-3">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500/50" />
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

            {/* SECTION 7: FAQ */}
            <section className="py-32 relative bg-black">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-24">
                        <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.6em] mb-8 block font-mono">// INTEL_CLEARANCE</span>
                        <h2 className="text-5xl lg:text-7xl font-black italic uppercase text-white tracking-tighter leading-none">
                            FREQUENTLY ASKED <br /><span className="text-orange-500">OBJECTIONS.</span>
                        </h2>
                    </div>

                    <div className="space-y-6">
                        {faqs.map((faq, i) => (
                            <div key={i} className="glass-dark border border-white/5 rounded-[32px] overflow-hidden group">
                                <div className="p-8 lg:p-10 space-y-6">
                                    <h3 className="text-xl lg:text-2xl font-black italic uppercase text-white tracking-tight flex gap-6">
                                        <span className="text-orange-500 font-mono">Q.</span>
                                        {faq.q}
                                    </h3>
                                    <div className="flex gap-6">
                                        <span className="text-slate-700 font-mono font-black shrink-0">A.</span>
                                        <p className="text-slate-400 font-medium italic leading-relaxed">{faq.a}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA - CLEAR CALL-TO-ACTION */}
            <section className="py-32 relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-12"
                    >
                        <h2 className="text-5xl lg:text-7xl font-black italic uppercase text-white tracking-tighter leading-none">
                            READY FOR <br />
                            <span className="text-orange-500">AUTONOMOUS SCALE.</span>
                        </h2>
                        <p className="text-lg lg:text-2xl text-slate-400 italic font-medium max-w-3xl mx-auto">
                            Your Hunter agent. Your Closer agent. Your Orchestrator. Your 24/7 Voice Clone. All built on YOUR infrastructure. All owned by YOU forever. Starting at $25k/year (60% cheaper than hiring a manager).
                        </p>
                        <div className="space-y-4 text-sm text-slate-400 italic max-w-2xl mx-auto">
                            <p>💬 Questions? Let's talk about how autonomous subgraph state isolation works for your roofing operation.</p>
                            <p>📅 Most sales close within 90 days of first deployment.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
                            <Link to="/contact">
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(249,115,22,0.4)" }}
                                    className="px-12 py-6 bg-orange-500 text-black text-sm font-black uppercase tracking-[0.4em] rounded-[24px] italic"
                                >
                                    BOOK STRATEGY CALL
                                </motion.button>
                            </Link>
                            <a href="#pricing">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="px-12 py-6 bg-white/5 border border-white/10 text-white text-sm font-black uppercase tracking-[0.4em] rounded-[24px] italic backdrop-blur-xl"
                                >
                                    SEE PRICING
                                </motion.button>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default RoofingPage;

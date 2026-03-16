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
            subtitle: "Intelligence & Prospecting",
            description: "This isn't just a map; it's a Dynamic Battlefield. We move beyond simple pins and into storm-triggered territory sovereignty.",
            howItWorks: "Supabase Edge Functions hook into NOAA & HailTrace. When hail exceeds 1.5\", the system auto-queries Regrid/Atom to map every home in the swath and auto-assigns 'Lasso' territories to reps based on proximity and closing weight.",
            goal: "Eliminate lead decay. Be the first on the ground with property pre-intel (owner name, roof age, street view) before the rep even steps out of the truck.",
            features: ["Storm-Triggered Carving", "NOAA/HailTrace API Hook", "Mapbox GL JS 'Lasso' UI", "Property Pre-Intel Search"],
            icon: <Target className="w-5 h-5" />,
            color: "orange"
        },
        {
            title: "Module B: The 'Closer'",
            subtitle: "High-Velocity Sales",
            description: "Contract signed before the ladder is back on the truck. We replace generic PDF estimates with a custom Glassmorphic Proposal Engine.",
            howItWorks: "Backend pings Roofr/EagleView for dimensions. AI pricing logic applies your specific margins for GAF vs Owens Corning. Gemini 1.5 Pro scans rep-uploaded photos for granular loss, overlaying AI-detected markers to build instant homeowner trust.",
            goal: "Accelerated Closing. The homeowner chooses a tier (Good/Better/Best) in a stunning UI, and the price updates in real-time. Justify the claim with AI precision.",
            features: ["AI Damage Simulator", "Custom Aerial Estimator", "Dynamic Proposal Logic", "Glassmorphic Sales UI"],
            icon: <Zap className="w-5 h-5" />,
            color: "amber"
        },
        {
            title: "Module C: The 'Orchestrator'",
            subtitle: "Owner Infrastructure",
            description: "Transition from a 'hustle' to a scalable system. A 16:9 responsive Command Center for total operational visibility.",
            howItWorks: "The 'Pulse' map shows real-time dots of every rep's location and knock history. Upon e-signature (DocuSign/PandaDoc API), a webhook automatically generates a Material Takeoff list and notifies the production team.",
            goal: "Operational Sovereignty. Monitor revenue velocity and production handoffs from a single dashboard. Turn your field reps into a precision-guided sales force.",
            features: ["'Pulse' Real-time Map", "Revenue Velocity Ticker", "Automated Material Takeoff", "Production Webhook Hooks"],
            icon: <Activity className="w-5 h-5" />,
            color: "yellow"
        },
        {
            title: "Module D: The 'Sales Clone'",
            subtitle: "Voice & SMS AI Agents",
            description: "Replace your entire sales front-line with 24/7 autonomous agents. 1-click installable voice bots that handle inbound/outbound calls and web chat.",
            howItWorks: "Neural models trained on your elite closing scripts. These agents handle objections, qualify leads, and book appointments directly into your calendar with near-human empathy and zero latency.",
            goal: "Zero lead abandonment. Every phone call answered, every website visitor engaged, and every lead followed up within 20 seconds, 24/7.",
            features: ["Inbound/Outbound AI Calls", "Website Voice Interface", "Context-Aware Chatbots", "1-Click Site Embedding"],
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
            q: "WHY NOT JUST USE JOBNIMBUS OR ACCULYNX?",
            a: "Those are great CRMs, but they are 'SaaS-tape'. You're paying per-user fees for a platform you don't own. We build the layer on top that automates the prospecting and sales—integrating with your CRM or replacing it entirely."
        },
        {
            q: "HOW ACCURATE IS THE AI DAMAGE DETECTION?",
            a: "We use Gemini 1.5 Pro's Vision capabilities. While it doesn't replace a physical inspection, it provides a visual 'trust layer' by highlighting granular loss and wind-lift markers that homeowners (and adjusters) find undeniable."
        },
        {
            q: "DO WE OWN THE CODE?",
            a: "100%. We build this on your own Supabase, Cloudflare, and Vercel accounts. You own the Intellectual Property, the data, and the engine. No vendor lock-in."
        },
        {
            q: "WHAT APIS DO YOU CONNECT TO?",
            a: "NOAA/HailTrace for weather, Regrid/Atom for property data, Mapbox for geospatial, Roofr/EagleView for measurements, and Twilio for automated SMS hooks."
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
            <section className="relative h-screen flex flex-col justify-center pt-24 overflow-hidden">
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
                    <div className="grid lg:grid-cols-[0.9fr,1.1fr] gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col items-start"
                        >
                            <div className="inline-flex items-center gap-3 px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full mb-8">
                                <span className="text-[9px] font-black text-orange-500 uppercase tracking-[0.4em] font-mono">
                                    // ELIMINATE_SaaS_TAPE
                                </span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-[6.5rem] font-black font-display italic tracking-tight mb-8 leading-[0.85] lg:leading-[0.8] uppercase text-white relative z-10">
                                <span className="relative inline-block group/infinite">
                                    <span className="relative z-10 text-white">ROOFER</span>
                                    <div className="absolute inset-0 pointer-events-none z-0 overflow-visible">
                                        <svg className="w-full h-full overflow-visible">
                                            <motion.text
                                                x="0" y="0.82em"
                                                className="font-black font-display italic text-4xl sm:text-5xl lg:text-[6.5rem] uppercase select-none"
                                                fill="none" stroke="#f97316" strokeWidth="3" strokeDasharray="150 1500"
                                                animate={{ strokeDashoffset: [0, -1650] }}
                                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                                filter="url(#arc-roofing) url(#glow-roofing)"
                                                style={{ letterSpacing: '-0.02em' }}
                                            >ROOFER</motion.text>
                                        </svg>
                                    </div>
                                </span>
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-600 to-amber-800 tracking-tight">EXECUTION.</span>
                            </h1>

                            <p className="text-lg sm:text-xl lg:text-2xl text-slate-400 font-medium italic leading-tight mb-10 max-w-xl border-l-4 border-orange-600 pl-6 lg:pl-8 text-left">
                                Move away from disparate apps. <br />
                                <span className="text-white font-black uppercase tracking-tight">Build the proprietary engine that eliminates the Data Tax.</span>
                            </p>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-4 w-full">
                                {[
                                    { val: ">1.5\"", l: "STORM RADIUS" },
                                    { val: "100%", l: "OWNERSHIP" },
                                    { val: "5 MIN", l: "LEAD CONTACT" },
                                    { val: "AI", l: "DAMAGE SCAN" }
                                ].map((stat, i) => (
                                    <div key={i} className="flex flex-col group">
                                        <div className="text-3xl font-black italic text-white tracking-tighter">{stat.val}</div>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <div className="w-1 h-1 rounded-full bg-orange-500/50" />
                                            <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">{stat.l}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, x: 30 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            className="relative group block lg:block max-w-[680px] lg:ml-auto w-full mt-12 lg:mt-0"
                        >
                            <div className="absolute -inset-6 bg-orange-600/10 blur-[80px] opacity-30 group-hover:opacity-60 transition-opacity duration-1000" />

                            <div className="glass-dark border border-white/10 rounded-[40px] overflow-hidden shadow-2xl relative z-10">
                                <div className="bg-white/5 border-b border-white/5 px-8 py-4 flex justify-between items-center backdrop-blur-3xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
                                        <span className="text-[9px] font-black text-white uppercase tracking-[0.4em] font-mono">MISSION_LOG: FEE_ACTIVE</span>
                                    </div>
                                    <div className="text-[7px] font-mono text-white/40">{new Date().toLocaleTimeString()}</div>
                                </div>

                                <div className="p-10 space-y-10">
                                    <div className="flex justify-between items-end">
                                        <div className="space-y-1">
                                            <div className="text-[9px] font-black text-orange-500 uppercase tracking-[0.4em]">PROPRIETARY_CORE</div>
                                            <div className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">REVLO_EDGE</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[8px] font-black text-white/40 uppercase tracking-widest leading-none">SYSTEM_STATUS</div>
                                            <div className="text-xl font-black text-green-500 uppercase mt-1">OPTIMIZED</div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h3 className="text-3xl lg:text-4xl font-black italic tracking-tight text-white uppercase leading-[0.8]">
                                            STOP THE <br />
                                            <span className="text-orange-500 text-glow-orange">DATA TAX.</span>
                                        </h3>
                                        <p className="text-[12px] text-slate-400 font-medium leading-relaxed max-w-[240px]">
                                            Full Custom Field Execution Engine (FEE) built for maximum leverage.
                                        </p>
                                    </div>

                                    <div className="relative group/btn">
                                        <Link to="/contact">
                                            <motion.button
                                                whileHover={{ scale: 1.02, x: 5, boxShadow: "0 0 40px rgba(249,115,22,0.3)" }}
                                                className="w-full py-6 bg-white text-black text-[13px] font-black uppercase tracking-[0.3em] rounded-[20px] flex items-center justify-center gap-4 italic shadow-2xl transition-all relative overflow-hidden"
                                            >
                                                REQUEST BLUEPRINT
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                            </motion.button>
                                        </Link>
                                    </div>

                                    <div className="pt-8 flex items-center justify-between border-t border-white/5">
                                        <div className="flex gap-4 items-center">
                                            <div className="flex -space-x-3">
                                                <div className="w-10 h-10 rounded-full border-2 border-[#020408] overflow-hidden bg-slate-900 shadow-xl">
                                                    <img src="https://res.cloudinary.com/dpfapm0tl/image/upload/v1771260716/ChatGPT_Image_Feb_16_2026_11_51_38_AM_elz0tz.png" alt="Rep 1" className="w-full h-full object-cover" />
                                                </div>
                                                <div className="w-10 h-10 rounded-full border-2 border-[#020408] overflow-hidden bg-slate-900 shadow-xl">
                                                    <img src="https://res.cloudinary.com/dpfapm0tl/image/upload/v1771260637/280035b5-28eb-46de-afb9-34e98fdc48cb_ijq1zm.jpg" alt="Rep 2" className="w-full h-full object-cover" />
                                                </div>
                                                <div className="w-10 h-10 rounded-full border-2 border-[#020408] overflow-hidden bg-slate-900 shadow-xl">
                                                    <img src="https://res.cloudinary.com/dpfapm0tl/image/upload/v1770163492/icon_x6kgnr.png" alt="Rep 3" className="w-full h-full object-cover" />
                                                </div>
                                            </div>
                                            <span className="text-[9px] font-black text-white italic uppercase tracking-widest ml-2">FIELD OPS ACTIVE</span>
                                        </div>
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-1 h-3 rounded-sm ${i < 5 ? 'bg-orange-500' : 'bg-white/10'}`} />)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* THE TACTICAL DATA RIBBON SYSTEM */}
                <div className="absolute bottom-10 left-0 w-full z-40 -rotate-1 skew-x-[0.2deg]">
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

            {/* SECTION 5: COMPARISON - DOMINANCE VS THE STANDARD */}
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

            {/* CALL TO ACTION */}
            <section className="py-32 relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-12"
                    >
                        <h2 className="text-5xl lg:text-8xl font-black italic uppercase text-white tracking-tighter leading-none">
                            BUILD YOUR <br />
                            <span className="text-orange-500">LEGACY ASSET.</span>
                        </h2>
                        <p className="text-xl lg:text-3xl text-slate-400 italic font-medium max-w-2xl mx-auto">
                            Stop paying monthly per-user fees for legacy software. Build a proprietary engine that you own forever.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link to="/contact">
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(249,115,22,0.4)" }}
                                    className="px-12 py-6 bg-orange-500 text-black text-sm font-black uppercase tracking-[0.4em] rounded-[24px] italic"
                                >
                                    GET STARTED
                                </motion.button>
                            </Link>
                            <Link to="/services">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="px-12 py-6 bg-white/5 border border-white/10 text-white text-sm font-black uppercase tracking-[0.4em] rounded-[24px] italic backdrop-blur-xl"
                                >
                                    VIEW SOLUTIONS
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default RoofingPage;

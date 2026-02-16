import React, { useState } from 'react';
import { motion, AnimatePresence, useTransform, useMotionValue } from 'framer-motion';
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
    ShieldAlert,
    LineChart,
    Users,
    Search,
    Wifi,
    Server,
    ExternalLink,
    ShieldCheck,
    XCircle,
    Palette,
    Terminal,
    Lock,
    BarChart3,
    Clock,
    Share2,
    MousePointer2,
    Briefcase,
    Play
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

// Reactive Mini Bubble - Interactive energy particles
const ReactiveBubble = React.memo(({ mouseX, mouseY }: { mouseX: any, mouseY: any }) => {
    const config = React.useMemo(() => ({
        xPercent: Math.random() * 100,
        startY: 110 + (Math.random() * 30),
        duration: 20 + (Math.random() * 20),
        delay: Math.random() * -20,
        scale: 0.1 + (Math.random() * 0.3),
        opacity: 0.05 + (Math.random() * 0.1),
        blur: 2 + (Math.random() * 4),
        drift: (Math.random() - 0.5) * 60
    }), []);

    return (
        <motion.div
            style={{ x: `${config.xPercent}%`, y: `${config.startY}%`, opacity: config.opacity, scale: config.scale }}
            animate={{
                y: ["110%", "-10%"],
                x: [`${config.xPercent}%`, `${config.xPercent + config.drift}%`],
            }}
            transition={{
                duration: config.duration,
                repeat: Infinity,
                delay: config.delay,
                ease: "linear"
            }}
            className="absolute w-24 h-24 bg-blue-500 rounded-full blur-2xl pointer-events-none"
        />
    );
});

const GHLAutomationPage = () => {
    const [mouseX, setMouseX] = useState(useMotionValue(0));
    const [mouseY, setMouseY] = useState(useMotionValue(0));

    const handleMouseMove = (e: React.MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    const ghlCapabilities = [
        {
            title: "Custom API & Middleware",
            desc: "Native GHL integrations only go so far. I build custom Node.js/Python middleware to bridge GHL with legacy ERPs, custom databases, and high-frequency external APIs via OAuth 2.0.",
            details: [
                "Bi-directional Lead/Order Sync",
                "Custom Webhook Processing Layers",
                "Advanced CRM Data Normalization",
                "Multi-Source Attribution Logic"
            ],
            icon: <Code className="w-6 h-6" />,
            color: "text-blue-500"
        },
        {
            title: "Autonomous AI Agents",
            desc: "Replacing standard bot-responses with Multi-Agent Reasoning. I deploy AI that understands context, handles complex objections, and manages the entire appointment cycle inside GHL.",
            details: [
                "Context-Aware Lead Qualification",
                "Dynamic Calendar Integration",
                "Multi-Platform Persistence (SMS/DM)",
                "Sentiment-Based Trigger Logic"
            ],
            icon: <Cpu className="w-6 h-6" />,
            color: "text-purple-500"
        },
        {
            title: "Proprietary GHL Apps",
            desc: "I build and host custom 'internal apps' that live inside your GHL sidebar. Add features GHL doesn't native support: custom calculators, external data views, or proprietary CMS layers.",
            details: [
                "Custom Sidebar Iframe Apps",
                "GHL Marketplace Ready builds",
                "Internal Tooling Dashboards",
                "Secure Client Data Portals"
            ],
            icon: <Layers className="w-6 h-6" />,
            color: "text-red-400"
        },
        {
            title: "S-Tier Web Experience",
            desc: "Standard GHL funnels look like GHL. Mine don't. I inject custom CSS/JS layers to create high-performance, agency-grade experiences that convert at 3x the industry standard.",
            details: [
                "Premium UI/UX Injectors",
                "Custom Dynamic Elements",
                "Advanced Animation Layers",
                "Mobile-First Speed Optimization"
            ],
            icon: <Palette className="w-6 h-6" />,
            color: "text-fuchsia-400"
        },
        {
            title: "Architecture & Snapshots",
            desc: "Building for massive scale. I design database-driven snapshots and recursive workflow logic that remains stable whether you have 10 clients or 10,000.",
            details: [
                "Recursive Workflow Logic",
                "Enterprise Data Architecture",
                "Rapid Multi-Account Deployment",
                "System-Wide Logic Sync"
            ],
            icon: <Workflow className="w-6 h-6" />,
            color: "text-green-400"
        },
        {
            title: "Deep Intel & Ops",
            desc: "Eliminating the 'Black Box' of agency data. I build custom API-driven reporting dashboards that pull from GHL, Stripe, and Ad-Networks for a single source of truth.",
            details: [
                "Real-time ROI Dashboards",
                "Custom Attribution Engines",
                "LTV & Churn Predictive Logic",
                "Automated Financial Audits"
            ],
            icon: <LineChart className="w-6 h-6" />,
            color: "text-yellow-400"
        }
    ];

    const commonMissions = [
        {
            mission: "The Shadow Sync",
            problem: "Client had two separated CRM instances that needed real-time, bi-directional sync of custom fields and notes without using Zapier due to cost and latency.",
            solution: "Built a custom Node.js middleware on Vercel using GHL V2 API webhooks to handle 50,000+ monthly syncs with zero latency.",
            impact: "99% Reduction in data drift, $2,400/mo saved in Zapier costs."
        },
        {
            mission: "The AI Closer",
            problem: "Lead response time was 8+ hours, resulting in a 40% loss in potential appointments.",
            solution: "Deployed a persistent AI Agent via GHL SMS/Email that maintains context over weeks. Integrated with custom lead-scoring logic to prioritize elite leads.",
            impact: "600% Increase in qualified bookings within 30 days."
        },
        {
            mission: "Enterprise Snapshot",
            problem: "A franchise group needed to deploy identical custom logic, API bridges, and UI skins across 150 new locations instantly.",
            solution: "Designed a 'Master Snapshot' architecture with external API-driven config files, allowing for global logic updates in one click.",
            impact: "Deployment time reduced from 2 weeks per location to 10 seconds."
        }
    ];

    const protocolSteps = [
        {
            phase: "PHASE 01",
            title: "STRATEGIC RECON",
            duration: "DAYS 01-05",
            desc: "We dive deep into your current GHL mess. I audit your workflows, identify data-latency issues, and map out the custom API/App requirements for dominance.",
            deliverables: ["Full Architecture Audit", "Technical Requirement Doc (TRD)", "API Mapping & OAuth planning", "Blueprint Finalization"],
            icon: <Search className="w-6 h-6" />
        },
        {
            phase: "PHASE 02",
            title: "LAB EXECUTION",
            duration: "DAYS 06-20",
            desc: "Code-heavy development. I build the custom middleware, inject the UI skins, and train the AI Agents specifically on your business data and tonality.",
            deliverables: ["Custom Middleware (Beta)", "AI Agent Logic Training", "UI/UX Injector Layer", "Workflow Logic Buildout"],
            icon: <Terminal className="w-6 h-6" />
        },
        {
            phase: "PHASE 03",
            title: "FORCE DEPLOYMENT",
            duration: "DAYS 21-30",
            desc: "Live market testing. We push the systems to an 'Alpha' account, monitor data flow, optimize AI performance, and prepare the Master Snapshot for scale.",
            deliverables: ["Live Environment (UAT)", "Master Snapshot Packaging", "System Documentation", "Final Scalability Audit"],
            icon: <Rocket className="w-6 h-6" />
        }
    ];

    return (
        <div className="min-h-screen bg-[#020408] text-white selection:bg-blue-500/30 font-sans" onMouseMove={handleMouseMove}>
            <Navigation />

            {/* HERO SECTION - TACTICAL SETUP */}
            <section className="relative min-h-screen flex flex-col justify-center overflow-hidden py-32">
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(40)].map((_, i) => (
                        <ReactiveBubble key={`bubble-${i}`} mouseX={mouseX} mouseY={mouseY} />
                    ))}
                    <div className="absolute inset-0 bg-grid-white opacity-[0.03]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#020408] via-transparent to-[#020408]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse" />
                </div>

                <div className="max-w-[1800px] mx-auto px-6 lg:px-12 relative z-10 w-full">
                    <div className="grid lg:grid-cols-[1fr,0.8fr] gap-20 items-center">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-4 px-6 py-3 bg-blue-500/10 border border-blue-500/20 rounded-full mb-10"
                            >
                                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                                <span className="text-[11px] font-black text-blue-400 uppercase tracking-[0.6em]">GHL_ENGINEERING_LAB</span>
                            </motion.div>

                            <h1 className="text-7xl lg:text-[11rem] font-black font-display italic tracking-tight mb-8 uppercase leading-[0.7] text-white">
                                SCALE <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">WITHOUT LIMITS.</span>
                            </h1>

                            <p className="text-2xl text-slate-400 font-medium italic leading-[1.2] max-w-2xl mb-14 border-l-4 border-blue-600 pl-10">
                                "HighLevel is a tool. This is an ecosystem. I build the custom apps, AI Agents, and API bridges that GHL native tools can't touch. Elite automation for elite operators."
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                                {[
                                    { val: "12X", label: "SPEED_TO_MARKET" },
                                    { val: "100%", label: "IP_OWNERSHIP" },
                                    { val: "O-AUTH", label: "ENTERPRISE_SECURITY" },
                                    { val: "V2_API", label: "DEEP_INTEGRATION" }
                                ].map((stat, i) => (
                                    <div key={i} className="flex flex-col">
                                        <span className="text-4xl font-black italic text-white leading-none tracking-tighter">{stat.val}</span>
                                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-3 whitespace-nowrap">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA DASHBOARD PANEL */}
                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                className="glass-dark border border-white/10 rounded-[60px] overflow-hidden relative shadow-2xl"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
                                <div className="p-12 lg:p-16 relative z-10">
                                    <div className="flex justify-between items-start mb-16">
                                        <div className="space-y-2">
                                            <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em]">SYSTEM_INITIALIZATION</div>
                                            <div className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">CORE_AUTOMATION_HUB</div>
                                        </div>
                                        <div className="text-[9px] font-mono text-blue-500/50 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                            SECURE_UPLINK_READY
                                        </div>
                                    </div>

                                    <div className="space-y-12">
                                        <div className="space-y-4">
                                            <h3 className="text-4xl font-black italic text-white uppercase tracking-tighter leading-none">
                                                START THE <br />
                                                <span className="text-blue-500 text-glow">90-DAY BLITZ.</span>
                                            </h3>
                                            <p className="text-xs text-slate-400 font-medium tracking-tight max-w-sm">
                                                Initiate full custom stack deployment. <br />
                                                Targeting <span className="text-white italic">Category Dominance & Operational Freedom.</span>
                                            </p>
                                        </div>

                                        <Link to="/contact">
                                            <motion.button
                                                whileHover={{ scale: 1.02, boxShadow: "0 0 80px rgba(59,130,246,0.3)" }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-full py-8 bg-white text-black text-[16px] font-black uppercase tracking-[0.5em] rounded-[30px] flex items-center justify-center gap-6 italic shadow-2xl"
                                            >
                                                INITIATE SETUP
                                                <ArrowRight className="w-6 h-6" />
                                            </motion.button>
                                        </Link>

                                        <div className="flex items-center justify-between pt-8 border-t border-white/5">
                                            <div className="flex items-center gap-5">
                                                <div className="flex -space-x-4">
                                                    {[
                                                        "https://res.cloudinary.com/dpfapm0tl/image/upload/v1770747933/ChatGPT_Image_Feb_10_2026_01_25_10_PM_azsx64.png",
                                                        "https://res.cloudinary.com/dpfapm0tl/image/upload/v1771260637/280035b5-28eb-46de-afb9-34e98fdc48cb_ijq1zm.jpg",
                                                        "https://res.cloudinary.com/dpfapm0tl/image/upload/v1771260716/ChatGPT_Image_Feb_16_2026_11_51_38_AM_elz0tz.png"
                                                    ].map((url, i) => (
                                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-black overflow-hidden relative z-10 shadow-xl bg-slate-900">
                                                            <img src={url} alt={`Client ${i + 1}`} className="w-full h-full object-cover" />
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[11px] font-black text-white italic">TRUSTED BY THE TOP 1% AGENCIES</span>
                                                    <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest mt-1">UPLINK_SECURE: [OK_V2_ENCRYPTION]</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE ARSENAL - DETAILED CAPABILITIES */}
            <section className="py-32 relative border-y border-white/5 bg-white/[0.01]">
                <div className="max-w-[1500px] mx-auto px-6 lg:px-12">
                    <div className="text-center mb-32 max-w-4xl mx-auto">
                        <span className="text-[11px] font-black text-blue-500 uppercase tracking-[0.8em] mb-8 block">THE_GHL_FORCE_MULTIPLIERS</span>
                        <h2 className="text-6xl lg:text-8xl font-black font-display italic tracking-tight uppercase text-white leading-[0.85] mb-8">
                            TECHNICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">ARTILLERY.</span>
                        </h2>
                        <p className="text-xl text-slate-400 italic font-medium leading-relaxed">
                            "Most agencies 'configure' GHL. I re-engineer it. I build the custom infrastructure that makes your competition look like they're operating in 2018."
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {ghlCapabilities.map((cap, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="glass-dark border border-white/5 p-12 rounded-[50px] hover:border-blue-500/40 transition-all duration-500 group relative overflow-hidden flex flex-col h-full bg-white/[0.02]"
                            >
                                <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-500/5 blur-[80px] rounded-full group-hover:bg-blue-500/10 transition-colors" />

                                <div className={`w-16 h-16 rounded-[24px] bg-white/5 flex items-center justify-center mb-10 border border-white/10 group-hover:scale-110 transition-transform duration-500 ${cap.color}`}>
                                    {cap.icon}
                                </div>

                                <div className="flex-grow">
                                    <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-6 group-hover:text-blue-400 transition-colors">
                                        {cap.title}
                                    </h3>
                                    <p className="text-slate-400 font-medium italic leading-relaxed text-base mb-8 border-l-2 border-white/10 pl-6">
                                        {cap.desc}
                                    </p>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-white/5">
                                    {cap.details.map((detail, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <CheckCircle2 className={`w-4 h-4 ${cap.color} opacity-50`} />
                                            <span className="text-[10px] font-black uppercase text-slate-300 tracking-wider font-mono">{detail}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* DEEP INTEL - HOW WE BUILD */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <div className="space-y-12">
                            <div>
                                <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em] mb-6 block">DEEP_STACK_INTEL</span>
                                <h2 className="text-5xl lg:text-7xl font-black italic uppercase text-white tracking-tighter leading-none mb-8">
                                    THE <br />FOUNDER'S <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">HANDSHAKE.</span>
                                </h2>
                                <p className="text-xl text-slate-400 font-medium italic leading-relaxed border-l-4 border-blue-500/30 pl-10">
                                    "When you partner with Revlo, you don't get a junior VA. You get an engineer. Every API bridge, every AI agent, and every UI injector is hand-coded to institutional standards."
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {[
                                    { label: "Direct Founder Access", icon: <Users className="w-5 h-5 text-blue-500" />, text: "No middle-men. No lag. Just pure, direct execution." },
                                    { label: "Weekly Video Demos", icon: <Play className="w-5 h-5 text-blue-500" />, text: "You see the evolution of your build every 7 days." },
                                    { label: "Independent IP", icon: <ShieldCheck className="w-5 h-5 text-blue-500" />, text: "You own the middleware. You hold the keys. No lock-ins." },
                                    { label: "Bulletproof Documentation", icon: <FileText className="w-5 h-5 text-blue-500" />, text: "Full technical hand-off docs for your team." }
                                ].map((item, i) => (
                                    <div key={i} className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            {item.icon}
                                            <span className="text-xs font-black uppercase tracking-widest text-white">{item.label}</span>
                                        </div>
                                        <p className="text-sm text-slate-500 font-medium italic">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass-dark border border-white/10 rounded-[60px] p-12 relative overflow-hidden">
                            <div className="absolute inset-0 bg-blue-500/[0.03]" />
                            <div className="relative z-10 space-y-10">
                                <div className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-4">INSTITUTIONAL_TECH_STACK</div>
                                <div className="space-y-8">
                                    {[
                                        { tech: "Custom Middleware", detail: "Node.js / Express / Python (FastAPI)", i: "01" },
                                        { tech: "AI Reasoning", detail: "OpenAI o1 / Claude 3.5 Sonnet / Multi-Agent Frameworks", i: "02" },
                                        { tech: "API Protocols", detail: "GHL V2 API / OAuth 2.0 / Persistent Webhooks", i: "03" },
                                        { tech: "UI/UX Injection", detail: "Advanced CSS / JS Layers / Tailwind / Framer", i: "04" },
                                        { tech: "Infrastructure", detail: "Vercel / AWS / Supabase / Upstash (Redis)", i: "05" }
                                    ].map((t, idx) => (
                                        <div key={idx} className="flex gap-8 group">
                                            <span className="text-[10px] font-mono text-blue-500/50 font-black pt-1">{t.i}</span>
                                            <div>
                                                <div className="text-lg font-black text-white uppercase italic tracking-tighter group-hover:text-blue-400 transition-colors">{t.tech}</div>
                                                <div className="text-xs text-slate-500 font-mono mt-1 opacity-70">{t.detail}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* COMMON MISSIONS - CASE STUDIES */}
            <section className="py-32 relative bg-white/[0.01] border-y border-white/5 overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
                    <div className="text-center mb-32">
                        <span className="text-[10px] font-black text-purple-500 uppercase tracking-[0.8em] mb-8 block">MISSION_ARCHIVES // DECLASSIFIED</span>
                        <h2 className="text-6xl lg:text-8xl font-black italic uppercase tracking-tight text-white leading-none">
                            TACTICAL <span className="text-purple-500">VICTORIES.</span>
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {commonMissions.map((mission, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="glass-dark border border-white/5 rounded-[50px] p-12 relative overflow-hidden group hover:border-purple-500/30 transition-all duration-700 bg-white/[0.01]"
                            >
                                <div className="text-[10px] font-black text-purple-500 uppercase tracking-[0.4em] mb-10 pb-4 border-b border-white/5">MISSION: {mission.mission}</div>

                                <div className="space-y-10">
                                    <div className="space-y-4">
                                        <div className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">01. THE PROBLEM</div>
                                        <p className="text-sm text-slate-300 font-medium italic leading-relaxed">{mission.problem}</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="text-[9px] font-black text-blue-400 uppercase tracking-[0.2em]">02. THE REACTION</div>
                                        <p className="text-sm text-slate-400 font-medium italic leading-relaxed">{mission.solution}</p>
                                    </div>

                                    <div className="p-6 bg-purple-500/5 border border-purple-500/10 rounded-3xl">
                                        <div className="text-[9px] font-black text-purple-400 uppercase tracking-[0.2em] mb-2">03. COMMAND IMPACT</div>
                                        <p className="text-sm text-white font-black italic tracking-tight">{mission.impact}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROTOCOL - TIMELINE */}
            <section className="py-32 relative">
                <div className="max-w-[1300px] mx-auto px-6 lg:px-12 relative z-10">
                    <div className="flex flex-col items-center text-center mb-32">
                        <div className="inline-flex items-center gap-4 px-8 py-4 bg-blue-500/10 border border-blue-500/20 rounded-full mb-10">
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                            <span className="text-[11px] font-black text-blue-400 uppercase tracking-[0.6em]">DEEPER_GHL_SPECIFICATION</span>
                        </div>
                        <h2 className="text-6xl lg:text-[10rem] font-black font-display italic tracking-tight uppercase leading-[0.7] text-white">
                            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">90-DAY BLITZ.</span>
                        </h2>
                    </div>

                    <div className="relative">
                        <div className="absolute left-[39px] lg:left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/80 via-indigo-600 to-transparent lg:-translate-x-1/2" />

                        <div className="space-y-24">
                            {protocolSteps.map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    className={`relative flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-20 items-center`}
                                >
                                    {/* Timeline Marker */}
                                    <div className="absolute left-0 lg:left-1/2 top-0 w-20 h-20 rounded-[28px] bg-[#020408] border border-white/20 flex items-center justify-center lg:-translate-x-1/2 z-20 group">
                                        <div className="text-2xl font-black text-blue-500 italic tracking-tighter">{step.phase.split(' ')[1]}</div>
                                    </div>

                                    <div className="w-full lg:w-[45%] pl-24 lg:pl-0">
                                        <div className="glass-dark border border-white/5 rounded-[60px] p-12 lg:p-14 hover:border-blue-500/30 transition-all duration-500 bg-white/[0.01] group h-full">
                                            <div className="flex flex-wrap items-center gap-4 mb-10">
                                                <span className="text-[11px] font-black text-blue-400 uppercase tracking-[0.4em] font-mono px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                                                    {step.phase}
                                                </span>
                                                <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em] font-mono px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                                                    {step.duration}
                                                </span>
                                            </div>

                                            <h3 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-8 group-hover:text-blue-400 transition-colors leading-none">
                                                {step.title}
                                            </h3>

                                            <p className="text-xl text-slate-400 font-medium italic leading-[1.3] mb-12 border-l-4 border-white/10 pl-10">
                                                "{step.desc}"
                                            </p>

                                            <div className="bg-black/50 rounded-[40px] p-10 border border-white/10">
                                                <div className="flex items-center gap-3 mb-8">
                                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">MISSION_MANIFEST_DELIVERABLES</span>
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                                                    {step.deliverables.map((d, idx) => (
                                                        <li key={idx} className="flex items-center gap-4 list-none group/item">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40 group-hover/item:bg-blue-400 transition-colors" />
                                                            <span className="text-xs font-black uppercase tracking-tight text-slate-400 group-hover/item:text-white transition-colors">{d}</span>
                                                        </li>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Empty space for alternating layout */}
                                    <div className="hidden lg:block lg:w-[45%]" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* COMPARISON - VS THE NORM */}
            <section className="py-32 relative bg-[#020408] border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-32">
                        <span className="text-[11px] font-black text-red-500 uppercase tracking-[0.5em] mb-6 block">SYSTEM_GAP_ANALYSIS</span>
                        <h2 className="text-6xl lg:text-[8rem] font-black font-display italic tracking-tight uppercase text-white leading-none">
                            THE <span className="text-red-500">REALITY.</span>
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-10">
                        <div className="glass-dark border border-white/5 rounded-[60px] p-16 bg-white/[0.01] relative overflow-hidden group opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                            <div className="absolute top-0 left-0 p-12 opacity-5">
                                <XCircle className="w-48 h-48 text-slate-500" />
                            </div>
                            <div className="text-[11px] font-black text-slate-600 uppercase tracking-[0.6em] mb-12">STATUS: OBSOLETE</div>
                            <h3 className="text-4xl font-black italic uppercase text-slate-500 mb-14 tracking-tight leading-none">THE TYPICAL <br />SaaS AGENCY.</h3>
                            <ul className="space-y-12">
                                {[
                                    { label: "Automation", val: "Zapier Glue", desc: "Fragile, high-cost loops that break whenever a field is renamed." },
                                    { label: "AI Integration", val: "Chatbot APIs", desc: "Generic scripts that lead to confused prospects and zero conversions." },
                                    { label: "IP Ownership", val: "License Renters", desc: "You pay forever just to keep your snapshots and workflows active." },
                                    { label: "Tech Depth", val: "No Backend", desc: "Locked into whatever GHL native buttons allow. Zero custom code." }
                                ].map((item, idx) => (
                                    <li key={idx} className="space-y-4">
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest">{item.label}</span>
                                            <span className="text-2xl font-black text-slate-400 italic tracking-tight uppercase">{item.val}</span>
                                        </div>
                                        <p className="text-base text-slate-600 italic font-medium leading-relaxed">{item.desc}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="glass-dark border border-blue-500/20 rounded-[60px] p-16 bg-blue-500/[0.03] relative overflow-hidden group shadow-2xl">
                            <div className="absolute top-0 right-0 p-12 opacity-5">
                                <ShieldCheck className="w-48 h-48 text-blue-500" />
                            </div>
                            <div className="text-[11px] font-black text-blue-500 uppercase tracking-[0.6em] mb-12">STATUS: ELITE</div>
                            <h3 className="text-4xl font-black italic uppercase text-white mb-14 tracking-tight leading-none">THE REVLO <br />GHL LAB.</h3>
                            <ul className="space-y-12">
                                {[
                                    { label: "Automation", val: "Custom API Bridges", desc: "Hard-coded Node.js middleware. Institutional uptime. Zero Zapier bloat." },
                                    { label: "AI Integration", val: "Multi-Agent Systems", desc: "Persistent AI that reasons, objections-handles, and closes the gap." },
                                    { label: "IP Ownership", val: "100% Asset Transfer", desc: "You own the middleware source code. You own the assets. Forever." },
                                    { label: "Tech Depth", val: "Full Stack Control", desc: "Custom apps, sidebar injectors, and complex external integrations." }
                                ].map((item, idx) => (
                                    <li key={idx} className="space-y-4">
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-[11px] font-black text-blue-500 uppercase tracking-widest">{item.label}</span>
                                            <span className="text-2xl font-black text-blue-400 italic tracking-tight uppercase">{item.val}</span>
                                        </div>
                                        <p className="text-base text-slate-400 italic font-medium leading-relaxed">{item.desc}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* PERFORMANCE METRICS */}
            <section className="py-32 relative border-b border-white/5 bg-[#020408]">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <div className="grid lg:grid-cols-4 gap-8">
                        {[
                            { label: "API UPTIME", val: "99.98%", sub: "INSTITUTIONAL GRADE" },
                            { label: "AI CONVERSION", val: "3.4X", sub: "VS STANDARD BOTS" },
                            { label: "DEPLOYMENT", val: "30D", sub: "FULL CUSTOM STACK" },
                            { label: "DATA DRIFT", val: "0.0%", sub: "REAL-TIME SYNC" }
                        ].map((metric, i) => (
                            <div key={i} className="glass-dark border border-white/5 p-10 rounded-[40px] text-center group hover:border-blue-500/20 transition-all">
                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4">{metric.label}</div>
                                <div className="text-6xl font-black text-white italic tracking-tighter mb-2 group-hover:text-blue-500 transition-colors">{metric.val}</div>
                                <div className="text-[9px] font-black text-blue-500/50 uppercase tracking-widest">{metric.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL COMMAND CTA */}
            <section className="py-40 relative overflow-hidden bg-[#020408]">
                <div className="absolute inset-0 bg-grid-white opacity-[0.02]" />
                <div className="max-w-[1300px] mx-auto px-6 lg:px-12 text-center relative z-10">
                    <h2 className="text-6xl lg:text-[11rem] font-black font-display italic tracking-tight mb-16 uppercase leading-[0.75] text-white">
                        COMMAND THE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-600 to-purple-500">CURVE.</span>
                    </h2>
                    <p className="text-3xl text-slate-400 font-medium italic mb-20 max-w-3xl mx-auto leading-tight">
                        "GoHighLevel is just the beginning. Secure the elite infrastructure that turns a CRM into a revenue-generating machine."
                    </p>
                    <Link to="/contact">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 0 100px rgba(59,130,246,0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-24 py-10 bg-blue-600 text-white text-[18px] font-black uppercase tracking-[0.6em] rounded-[30px] italic shadow-2xl hover:bg-blue-500 transition-all"
                        >
                            INITIATE PARTNERSHIP
                        </motion.button>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
};

// Mock FileText icon since it's used in the deep intel section but might be missing from the lucide-react list above
const FileText = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
);

export default GHLAutomationPage;

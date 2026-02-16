import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const EliteDevelopmentPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);

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
        { category: "Frontend", tools: ["React", "Next.js", "React Native", "Framer Motion", "TailwindCSS"] },
        { category: "Backend", tools: ["TypeScript", "NestJS", "Node.js", "Trpc", "Python"] },
        { category: "Intelligence", tools: ["OpenAI", "Anthropic", "LangChain", "Vector DBs", "PyTorch"] },
        { category: "Data", tools: ["Postgres", "Redis", "PostGIS", "Prisma", "Supabase"] },
        { category: "Ops", tools: ["Docker", "AWS/Vercel", "Inngest", "GitHub Actions", "Terraform"] }
    ];

    const engagementExperience = [
        {
            title: "Real-Time Transparency",
            desc: "You have direct access to my private Discord. No account managers. No filters. Just me and the mission.",
            icon: <MessageSquare className="w-5 h-5" />
        },
        {
            title: "Verifiable Velocity",
            desc: "Weekly video walk-throughs and functional test-environments. You see the product evolve every 7 days.",
            icon: <Activity className="w-5 h-5" />
        },
        {
            title: "IPO-Grade Quality",
            desc: "Clean code, detailed documentation, and security audits. I build as if an acquisition is due tomorrow.",
            icon: <Shield className="w-5 h-5" />
        }
    ];

    return (
        <div className="min-h-screen bg-[#020408] text-white selection:bg-red-500/30">
            <Navigation />

            {/* HERO SECTION - TACTICAL COMMAND CENTER */}
            <section className="relative pt-44 pb-40 overflow-hidden">
                <div className="absolute inset-0 bg-grid-white opacity-[0.03] pointer-events-none" />

                {/* Tactical Status Bar */}
                <div className="absolute top-32 left-0 w-full border-y border-white/5 py-3 overflow-hidden bg-white/[0.01]">
                    <div className="flex animate-marquee whitespace-nowrap gap-12 items-center">
                        {[1, 2, 3, 4, 5].map(i => (
                            <React.Fragment key={i}>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">SYSTEM STATUS: OPERATIONAL</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">BLITZ FREQUENCY: HIGH</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">AUTHORITY: CATEGORY OF ONE</span>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Tactical Ambient Effects */}
                <div className="absolute top-0 right-[-10%] w-[80%] h-[80%] bg-red-900/10 blur-[180px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-900/10 blur-[180px] rounded-full" />

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="max-w-5xl"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 glass rounded-full mb-10 border border-red-500/20">
                            <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.5em]">
                                DOSSIER // THE ONE-MAN ARMY
                            </span>
                        </div>

                        <h1 className="text-7xl lg:text-[11rem] font-black font-display italic tracking-[ -0.05em] mb-12 leading-[0.8] uppercase">
                            IMPOSSIBLE <br />
                            <span className="gradient-text-alt tracking-[-0.02em]">INEVITABLE.</span>
                        </h1>

                        <p className="text-2xl lg:text-4xl text-slate-400 font-medium leading-tight mb-16 max-w-3xl">
                            Where others see roadblocks, I see blueprints. <br />
                            <span className="text-white">I don't build projects. I architect market dominance.</span>
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-8">
                            <Link to="/contact">
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255,255,255,0.1)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group px-14 py-8 bg-white text-black text-[14px] font-black uppercase tracking-[0.4em] rounded-2xl flex items-center gap-5 italic"
                                >
                                    ENGAGE THE ARMY
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                </motion.button>
                            </Link>

                            <div className="flex flex-col gap-2">
                                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-3">
                                    <Clock className="w-3 h-3 text-red-500" />
                                    Currently: <span className="text-white">2 Slots Remaining for Q1</span>
                                </div>
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-[#020408] bg-slate-800 flex items-center justify-center overflow-hidden grayscale hover:grayscale-0 transition-all cursor-crosshair">
                                            <div className="w-full h-full bg-gradient-to-br from-slate-600 to-slate-900" />
                                        </div>
                                    ))}
                                    <div className="w-8 h-8 rounded-full border-2 border-[#020408] bg-red-500 flex items-center justify-center text-[10px] font-black">
                                        +
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* THE PROBLEM - THE AGENCY BLOAT */}
            <section className="py-32 relative border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <motion.div {...fadeIn}>
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-6 block">THE CHALLENGE</span>
                            <h2 className="text-5xl lg:text-7xl font-black font-display italic tracking-tighter mb-10 uppercase text-white leading-none">
                                WHY HIGH-STAKES SOFTWARE <br />
                                <span className="text-red-500">USUALLY FAILS.</span>
                            </h2>
                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <div className="flex-shrink-0 w-12 h-12 glass rounded-2xl flex items-center justify-center text-red-500 border border-red-500/20">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black uppercase italic mb-2 tracking-tighter">Agency Bloat</h3>
                                        <p className="text-slate-400 font-medium">You pay for account managers, junior devs, and fancy offices instead of raw execution. Communication is filtered through 4 people before hitting code.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="flex-shrink-0 w-12 h-12 glass rounded-2xl flex items-center justify-center text-red-500 border border-red-500/20">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black uppercase italic mb-2 tracking-tighter">Glacial Velocity</h3>
                                        <p className="text-slate-400 font-medium">A simple feature takes 3 meetings and 2 weeks. In the AI era, that's not just slow—it's fatal.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="flex-shrink-0 w-12 h-12 glass rounded-2xl flex items-center justify-center text-red-500 border border-red-500/20">
                                        <ShieldAlert className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black uppercase italic mb-2 tracking-tighter">No Skin in the Game</h3>
                                        <p className="text-slate-400 font-medium">When the project stalls, they still get paid. I lean into guarantees because I'm built for results, not billed hours.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="relative group">
                            <div className="absolute inset-0 bg-red-500/10 blur-[100px] group-hover:bg-red-500/20 transition-all" />
                            <div className="relative glass border border-white/5 rounded-[64px] p-12 lg:p-20 overflow-hidden">
                                <div className="absolute top-0 right-0 p-12">
                                    <Fingerprint className="w-32 h-32 opacity-5 text-red-500" />
                                </div>
                                <h3 className="text-3xl font-black italic uppercase italic tracking-tight mb-8 text-white">THE CONTRAST</h3>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 text-slate-500 line-through decoration-red-500/50">
                                        <div className="w-2 h-2 rounded-full bg-slate-700" />
                                        <span className="text-xs uppercase font-black tracking-widest">Slow Feedback Loops</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-green-400">
                                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
                                        <span className="text-xs uppercase font-black tracking-widest">Instant Commits & Direct Discord Access</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-slate-500 line-through decoration-red-500/50">
                                        <div className="w-2 h-2 rounded-full bg-slate-700" />
                                        <span className="text-xs uppercase font-black tracking-widest">Generic Templates</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-green-400">
                                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
                                        <span className="text-xs uppercase font-black tracking-widest">IPO-Grade Custom Architectures</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-slate-500 line-through decoration-red-500/50">
                                        <div className="w-2 h-2 rounded-full bg-slate-700" />
                                        <span className="text-xs uppercase font-black tracking-widest">Vague Timeline Estimates</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-green-400">
                                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
                                        <span className="text-xs uppercase font-black tracking-widest">The 90-Day Blitz Protocol</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE PROTOCOL - STEP BY STEP */}
            <section className="py-40 relative">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-32">
                        <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.5em] mb-6 block">THE EXECUTION STANDARD</span>
                        <h2 className="text-6xl lg:text-8xl font-black font-display italic tracking-tighter mb-8 uppercase leading-none">
                            THE BLITZ <br />
                            <span className="gradient-text-alt tracking-[-0.02em]">PROTOCOL.</span>
                        </h2>
                        <p className="text-xl text-slate-400 font-medium italic">How we transform a wild vision into a production-grade asset in record time.</p>
                    </div>

                    <div className="grid lg:grid-cols-4 gap-4 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 hidden lg:block" />

                        {protocolSteps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.15 }}
                                viewport={{ once: true }}
                                className="group relative z-10"
                            >
                                <div className="p-10 glass rounded-[48px] border border-white/5 hover:border-red-500/20 transition-all h-full flex flex-col group-hover:bg-white/[0.02]">
                                    <div className="mb-10 flex justify-between items-start">
                                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white border border-white/10 group-hover:scale-110 group-hover:text-red-500 transition-all">
                                            {step.icon}
                                        </div>
                                        <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">{step.phase}</span>
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-xl font-black uppercase italic mb-2 tracking-tighter leading-none">{step.title}</h3>
                                        <div className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-6">{step.duration}</div>
                                        <p className="text-sm text-slate-400 font-medium mb-8 leading-relaxed italic">"{step.desc}"</p>
                                    </div>

                                    <div className="space-y-2 pt-8 border-t border-white/5">
                                        {step.deliverables.map((d, idx) => (
                                            <div key={idx} className="flex items-center gap-2">
                                                <div className="w-1 h-1 bg-white/20 rounded-full" />
                                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{d}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* THE EXPERIENCE - COMMAND CENTER */}
            <section className="py-32 bg-white/[0.01]">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="glass border border-white/5 rounded-[64px] p-12 lg:p-24 overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-12 lg:p-24 opacity-5">
                            <Workflow className="w-[400px] h-[400px] text-blue-500" />
                        </div>

                        <div className="grid lg:grid-cols-2 gap-24 items-center">
                            <div>
                                <h2 className="text-5xl lg:text-7xl font-black font-display italic tracking-tighter mb-10 uppercase text-white leading-none">
                                    THE COMMAND <br />
                                    <span className="gradient-text">EXPERIENCE.</span>
                                </h2>
                                <p className="text-xl text-slate-400 leading-relaxed font-medium mb-12">
                                    Hiring me isn't like hiring an agency. It's like gaining a tactical partner who is as obsessed with your revenue as you are.
                                </p>

                                <div className="space-y-10">
                                    {engagementExperience.map((item, i) => (
                                        <div key={i} className="flex gap-8 group">
                                            <div className="flex-shrink-0 w-14 h-14 glass rounded-2xl flex items-center justify-center text-blue-400 border border-blue-400/20 group-hover:scale-110 transition-transform">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black uppercase italic mb-2 tracking-tighter text-white">{item.title}</h3>
                                                <p className="text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative">
                                {/* Visual representation of the "Dashboard" */}
                                <div className="relative glass border border-white/5 rounded-[40px] p-2 overflow-hidden shadow-2xl">
                                    <div className="bg-[#020408] rounded-[32px] p-8 border border-white/5">
                                        <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                            </div>
                                            <div className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600">MISSION_LOGS.EXE</div>
                                        </div>

                                        <div className="space-y-6 font-mono text-[11px]">
                                            <div className="flex gap-4">
                                                <span className="text-slate-700">[14:22:04]</span>
                                                <span className="text-green-500 uppercase tracking-widest font-black">Success:</span>
                                                <span className="text-slate-400">Deployed v1.2 Security Perimeters</span>
                                            </div>
                                            <div className="flex gap-4">
                                                <span className="text-slate-700">[15:45:12]</span>
                                                <span className="text-blue-500 uppercase tracking-widest font-black">Commit:</span>
                                                <span className="text-slate-400">Optimized Dynamic Pricing Engine (32ms lat)</span>
                                            </div>
                                            <div className="flex gap-4">
                                                <span className="text-slate-700">[17:30:55]</span>
                                                <span className="text-purple-500 uppercase tracking-widest font-black">Deploy:</span>
                                                <span className="text-slate-400">Live Walk-through Uploaded to Discord</span>
                                            </div>
                                            <div className="pt-4 mt-4 border-t border-white/5">
                                                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: "85%" }}
                                                        transition={{ duration: 2, delay: 0.5 }}
                                                        className="h-full bg-gradient-to-r from-red-500 to-blue-500"
                                                    />
                                                </div>
                                                <div className="flex justify-between mt-3">
                                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Blitz Progress</span>
                                                    <span className="text-[9px] font-black text-white uppercase tracking-widest tracking-widest">85% complete</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Floating Badges */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -top-10 -right-10 glass border border-white/10 p-6 rounded-3xl shadow-3xl z-20"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-500">
                                            <Activity className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Live Latency</div>
                                            <div className="text-lg font-black font-display italic leading-none">12MS</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE ARSENAL - TECH STACK */}
            <section className="py-40 relative">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-20 items-end mb-32">
                        <div className="max-w-2xl">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] mb-6 block">THE INFRASTRUCTURE</span>
                            <h2 className="text-5xl lg:text-7xl font-black font-display italic tracking-tighter mb-10 uppercase text-white leading-none">
                                THE HEAVY <br />
                                <span className="gradient-text-alt tracking-[-0.02em]">ARTILLERY.</span>
                            </h2>
                        </div>
                        <p className="text-xl text-slate-400 font-medium max-w-sm mb-4 leading-relaxed italic">The tools change. The standard doesn't. Full-stack fluency across the entire digital landscape.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {techArsenal.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 glass border border-white/5 rounded-[40px] hover:border-white/10 transition-all group"
                            >
                                <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] mb-8 group-hover:text-red-500 transition-colors uppercase">{item.category}</h3>
                                <div className="space-y-3">
                                    {item.tools.map(tool => (
                                        <div key={tool} className="text-sm font-black italic text-slate-300 uppercase tracking-tighter hover:text-white transition-colors cursor-default">{tool}</div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* THE OFFERS - DEFINITIVE TIERS */}
            <section className="py-40 bg-white/[0.01] border-y border-white/5 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 blur-[200px] rounded-full" />

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-32">
                        <h2 className="text-6xl lg:text-[6rem] font-black font-display italic tracking-tight mb-8 uppercase leading-none">
                            ENGAGEMENT <br />
                            <span className="gradient-text">MODELS.</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                        {/* Offer 01 */}
                        <motion.div
                            {...fadeIn}
                            className="group p-1 bg-white/5 border border-white/10 rounded-[64px] hover:border-blue-500/30 transition-all"
                        >
                            <div className="bg-[#020408] rounded-[60px] p-12 lg:p-20 relative overflow-hidden h-full flex flex-col">
                                <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 group-hover:scale-110 transition-transform duration-700">
                                    <Rocket className="w-64 h-64 text-blue-500" />
                                </div>
                                <div className="mb-12 relative">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                        <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest">BLITZ_MODE.EXE</span>
                                    </div>
                                    <h3 className="text-5xl font-black italic uppercase italic tracking-tight mb-4 text-white">THE BLITZ BUILD</h3>
                                    <p className="text-xl text-slate-400 font-medium italic">Mission-critical execution for 0-to-1 buildouts.</p>
                                </div>

                                <div className="space-y-6 mb-16 flex-1">
                                    {[
                                        "End-to-End System Architecture",
                                        "Complex AI Agent Orchestration",
                                        "90-Day Vision-to-Market Blitz",
                                        "Direct Discord Access",
                                        "Ownership of All IP & Assets"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="w-5 h-5 glass rounded-lg flex items-center justify-center text-blue-500 border border-blue-500/20">
                                                <CheckCircle2 className="w-3 h-3" />
                                            </div>
                                            <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-200">{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-8">
                                    <div>
                                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Entry Protocol</div>
                                        <div className="text-5xl font-black text-white italic tracking-tighter">$5,000+</div>
                                    </div>
                                    <Link to="/contact">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            className="px-10 py-6 bg-white text-black text-[12px] font-black uppercase tracking-widest rounded-2xl italic flex items-center gap-4"
                                        >
                                            RESERVE SLOT
                                            <ArrowRight className="w-5 h-5" />
                                        </motion.button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>

                        {/* Offer 02 */}
                        <motion.div
                            {...fadeIn}
                            transition={{ delay: 0.2 }}
                            className="group p-1 bg-white/10 border border-red-500/20 rounded-[64px] hover:border-red-500/50 transition-all relative overflow-hidden"
                        >
                            {/* Premium Glow */}
                            <div className="absolute inset-0 bg-red-500/5 blur-3xl opacity-50 pointer-events-none" />

                            <div className="bg-[#020408] rounded-[60px] p-12 lg:p-20 relative overflow-hidden h-full flex flex-col">
                                <div className="absolute top-0 right-0 p-12 opacity-10 scale-150 group-hover:scale-110 transition-transform duration-700">
                                    <Target className="w-64 h-64 text-red-500" />
                                </div>
                                <div className="mb-12 relative">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full mb-6">
                                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444]" />
                                        <span className="text-[8px] font-black text-red-500 uppercase tracking-widest">MISSION_RETAINER.EXE</span>
                                    </div>
                                    <h3 className="text-5xl font-black italic uppercase italic tracking-tight mb-4 text-white">THE DOMINATION</h3>
                                    <p className="text-xl text-slate-400 font-medium italic">Fractional CTO/CMO ownership for hyper-scale.</p>
                                </div>

                                <div className="space-y-6 mb-16 flex-1">
                                    {[
                                        "Full-Cycle Product Evolution",
                                        "Revenue Guarantees (Skin-in-game)",
                                        "GTM & Community Hacking Strategy",
                                        "Continuous Security & Scale Audits",
                                        "Strategic Board-Level Reporting"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="w-5 h-5 glass rounded-lg flex items-center justify-center text-red-500 border border-red-500/20">
                                                <CheckCircle2 className="w-3 h-3" />
                                            </div>
                                            <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-200">{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-8">
                                    <div>
                                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Strategic Retainer</div>
                                        <div className="text-5xl font-black text-white italic tracking-tighter">CUSTOM</div>
                                    </div>
                                    <Link to="/contact">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            className="px-10 py-6 bg-red-500 text-white text-[12px] font-black uppercase tracking-widest rounded-2xl italic flex items-center gap-4 shadow-[0_0_30px_rgba(239,68,68,0.2)]"
                                        >
                                            INQUIRE FAST
                                            <ArrowRight className="w-5 h-5" />
                                        </motion.button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Guarantees Section */}
                    <div className="mt-40 grid md:grid-cols-3 gap-12">
                        {[
                            { title: "Revenue Guarantee", desc: "For retention partners, we map code to bank balances. If we don't hit the target, I keep working until we do." },
                            { title: "IP Protection", desc: "You own 100% of the code, documentation, and infrastructure. Forever. I'm the architect, you're the owner." },
                            { title: "Velocity Standard", desc: "No feature takes longer than a week without a visual prototype. We move at the speed of thought." }
                        ].map((g, i) => (
                            <div key={i} className="text-center group">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:text-red-500 transition-all">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <h4 className="text-lg font-black uppercase italic mb-3 tracking-tighter">{g.title}</h4>
                                <p className="text-xs text-slate-500 leading-relaxed font-medium uppercase tracking-widest">{g.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TRACK RECORD - DEEP HISTORY */}
            <section className="py-40 relative">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-32 border-b border-white/5 pb-16">
                        <div className="max-w-2xl">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] mb-6 block">MISSIONS ACCOMPLISHED</span>
                            <h2 className="text-7xl lg:text-9xl font-black font-display italic tracking-tight uppercase leading-none">
                                VERIFIED <br /><span className="gradient-text">HISTORY.</span>
                            </h2>
                        </div>
                        <div className="max-w-sm text-right">
                            <p className="text-xl text-slate-400 font-medium italic mb-6">"These aren't side projects. They are industry-shifting assets that I built from the ground up."</p>
                            <div className="text-[10px] font-black text-red-500 uppercase tracking-[0.5em]">OPERATOR_CERTIFIED</div>
                        </div>
                    </div>

                    <div className="grid gap-12">
                        {[
                            {
                                name: "SNOWBLOWR",
                                tag: "MARKETPLACE REVOLUTION",
                                desc: "Uber-style real-time marketplace. Dynamic pricing, geospatial matching, and native mobile apps.",
                                tech: ["Geospatial Queries", "Surge Algorithms", "React Native"],
                                stats: ["$0 → $50k+ Revenue Blitz", "90-Day Buildout", "IPO-Ready Infrastructure"]
                            },
                            {
                                name: "AI PENTESTING",
                                tag: "CYBERSECURITY INTELLIGENCE",
                                desc: "Automated AI security copilot with remote attestation to verify integrity before sensitive data sharing.",
                                tech: ["Cryptographic Proofs", "LLM Orchestration", "TEE Enforcement"],
                                stats: ["Zero-Trust Architecture", "Real-time Auditing", "Market Category Creator"]
                            },
                            {
                                name: "HYDE PROTOCOL",
                                tag: "OPPORTUNITY ARBITRAGE",
                                desc: "A revenue guarantee engine that utilizes AI-driven data alchemy to scale high-ticket offers with precision.",
                                tech: ["Data Alchemy", "Predictive Analytics", "Growth Loops"],
                                stats: ["$10k in 30 Days Guaranteed", "95% Conversion Lift", "Algorithmic Nurturing"]
                            }
                        ].map((m, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="group relative glass border border-white/5 rounded-[48px] p-12 lg:p-16 hover:border-white/20 transition-all overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-16 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <span className="text-[12rem] font-black italic tracking-tighter opacity-10">{m.name.charAt(0)}</span>
                                </div>

                                <div className="grid lg:grid-cols-[1.5fr,2fr,1fr] gap-12 items-center relative z-10">
                                    <div>
                                        <div className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-2">{m.tag}</div>
                                        <h3 className="text-5xl font-black italic uppercase italic tracking-tight mb-6 text-white leading-none">{m.name}</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {m.tech.map(t => (
                                                <span key={t} className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[8px] font-black text-slate-500 uppercase tracking-widest">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="border-l border-white/10 pl-12">
                                        <p className="text-2xl text-slate-400 font-medium italic leading-relaxed">"{m.desc}"</p>
                                    </div>

                                    <div className="space-y-4">
                                        {m.stats.map((s, idx) => (
                                            <div key={idx} className="flex flex-col">
                                                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">METRIC_{idx + 1}</span>
                                                <span className="text-sm font-black text-white italic uppercase tracking-tighter">{s}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL COMMAND - CTA */}
            <section className="py-60 relative overflow-hidden">
                {/* Massive Animated Background Text */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
                    <span className="text-[25vw] font-black italic tracking-tighter uppercase whitespace-nowrap animate-pulse">DEPLOY NOW</span>
                </div>

                <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-6xl lg:text-[10rem] font-black font-display italic tracking-[ -0.05em] mb-12 uppercase leading-none">
                            ARE YOU READY <br />
                            <span className="gradient-text-alt tracking-[-0.02em]">TO WIN?</span>
                        </h2>

                        <p className="text-2xl text-slate-400 font-medium mb-20 max-w-3xl mx-auto leading-tight italic">
                            In a world of noise, specialists, and managers, there is only one strategy that consistently works: <br />
                            <span className="text-white text-3xl font-black uppercase not-italic block mt-4">OVERWHELMING EXECUTION.</span>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                            <Link to="/contact">
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(255, head, 0.2)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-20 py-10 bg-white text-black text-[16px] font-black uppercase tracking-[0.5em] rounded-2xl flex items-center justify-center gap-6 italic shadow-2xl transition-all"
                                >
                                    BOOK STRATEGY CALL
                                    <ArrowRight className="w-8 h-8" />
                                </motion.button>
                            </Link>
                        </div>

                        <div className="mt-12 text-[10px] font-black text-slate-600 uppercase tracking-[0.6em]">
                            // CONNECTION SECURE // ENCRYPTION: AES-256 //
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default EliteDevelopmentPage;

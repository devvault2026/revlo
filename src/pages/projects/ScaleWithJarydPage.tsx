import React from 'react';
import { motion } from 'framer-motion';
import {
    Cpu,
    Globe,
    Zap,
    TrendingUp,
    Layout,
    ArrowLeft,
    ExternalLink,
    Shield,
    Target,
    Activity,
    Lock,
    Coins,
    Gem,
    Binary,
    Milestone,
    Database,
    ShieldAlert,
    FastForward,
    Terminal,
    Code,
    Network,
    Key,
    UserCheck,
    Briefcase,
    FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

const ScaleWithJarydPage: React.FC = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8 }
    };

    const modules = [
        {
            title: 'Clarity Trigger',
            desc: 'Forces binary decisions in under four seconds using a "knife-edge" logic framework.',
            icon: <Zap className="w-5 h-5 text-yellow-400" />
        },
        {
            title: 'Rage Alchemy',
            desc: 'Validates anger and converts it into specific, high-leverage tactical actions.',
            icon: <Activity className="w-5 h-5 text-red-500" />
        },
        {
            title: 'Iron Mindset',
            desc: 'Identifies limiting beliefs and context-shatters them with encoded evidence-based logic.',
            icon: <Lock className="w-5 h-5 text-blue-400" />
        },
        {
            title: 'Mission Optimizer',
            desc: 'Aligns daily tactics with the 2026 sovereign state vector, ensuring zero drift.',
            icon: <Target className="w-5 h-5 text-green-500" />
        }
    ];

    const archives = [
        {
            id: 'stealth',
            name: 'Stealth Protocol',
            desc: 'Headless-browser swarm managing 500+ LinkedIn profiles, auto-generating content and booking meetings.',
            impact: '+400% Lead Volume',
            tech: 'Puppeteer, Node.js, OpenAI'
        },
        {
            id: 'unicorn',
            name: 'Unicorn Titan',
            desc: 'Super-intelligence framework measuring agent coherence to create soul-bound artificial entities.',
            impact: 'Agent Identity Proof',
            tech: 'Rust, TEE, Cryptography'
        },
        {
            id: 'vortex',
            name: 'Vortex Core',
            desc: 'Sub-millisecond arbitrage bot scanning exchange discrepancies, processing $2.4M monthly.',
            impact: '82.35% Success Rate',
            tech: 'Rust, WebSockets, AWS'
        }
    ];

    const tiers = [
        { name: 'Solo Consultant', price: '$497/mo', setup: '$2,500', target: '100 Active Users' },
        { name: 'Growth Clinic', price: '$1,497/mo', setup: '$5,000', target: '5,000 Active Users' },
        { name: 'Enterprise', price: 'Custom', setup: 'Revenue Share', target: 'Unlimited Scale' }
    ];

    return (
        <div className="min-h-screen bg-[#020408] text-white">
            <Navigation />

            {/* Hero Section */}
            <section className="relative pt-40 pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-grid-white opacity-5 pointer-events-none" />
                <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-indigo-900/20 blur-[150px] rounded-full" />

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back to Infrastructure</span>
                    </Link>

                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                        <motion.div
                            {...fadeIn}
                            className="lg:col-span-7"
                        >
                            <div className="flex flex-wrap items-center gap-3 mb-8">
                                <div className="px-4 py-2 glass rounded-full shadow-lg shadow-indigo-500/10">
                                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em]">
                                        Project // Jaryd.OS
                                    </span>
                                </div>
                                <div className="px-4 py-2 bg-red-500/5 border border-red-500/20 rounded-full">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                        <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em]">
                                            SOVEREIGN STATE
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-display italic tracking-tighter mb-8 leading-[0.9]">
                                BROADCAST <br />
                                <span className="gradient-text">ACTUAL.</span>
                            </h1>

                            <p className="text-xl lg:text-2xl text-slate-400 max-w-xl font-medium leading-relaxed mb-12 italic border-l-2 border-indigo-500/30 pl-6">
                                "The world’s first psychological operating system for founders. Born from collapse, engineered for dominance."
                            </p>

                            <div className="flex flex-wrap gap-6">
                                <a href="https://www.scalewithjaryd.com/" target="_blank" rel="noopener noreferrer">
                                    <motion.button
                                        whileHover={{ scale: 1.05, x: 5 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-12 py-6 bg-white text-black text-[12px] font-black uppercase tracking-[0.4em] rounded-2xl flex items-center gap-4 italic shadow-2xl shadow-indigo-500/20 group"
                                    >
                                        INSTALL OS FREE
                                        <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                    </motion.button>
                                </a>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="lg:col-span-5 bg-[#0A0F1A]/80 backdrop-blur-3xl border border-white/5 rounded-[48px] p-8 lg:p-12 relative overflow-hidden group shadow-[0_0_100px_rgba(79,70,229,0.1)]"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
                                <Shield className="w-64 h-64 text-white" />
                            </div>

                            <div className="flex items-center justify-between mb-12">
                                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">The Origin File</h3>
                                <div className="px-2 py-1 bg-white/5 rounded text-[8px] font-black text-slate-600 tracking-widest uppercase">CLASSIFIED</div>
                            </div>

                            <div className="space-y-8 relative z-10">
                                <div className="group/item">
                                    <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2 opacity-50 group-hover/item:opacity-100 transition-opacity italic">01 // COLLAPSE</div>
                                    <p className="text-slate-200 font-bold text-sm leading-relaxed">
                                        Hack destroyed a $100k/month agency. Triggered descent into survival programming.
                                    </p>
                                </div>

                                <div className="group/item">
                                    <div className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-2 opacity-50 group-hover/item:opacity-100 transition-opacity italic">02 // FABRICATION</div>
                                    <p className="text-slate-200 font-bold text-sm leading-relaxed">
                                        Coded the OS to survived. Replaced traditional therapy with kinetic, deterministic logic modules.
                                    </p>
                                </div>

                                <div className="group/item">
                                    <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2 opacity-50 group-hover/item:opacity-100 transition-opacity italic">03 // DEPLOYMENT</div>
                                    <p className="text-slate-200 font-bold text-sm leading-relaxed">
                                        Weaponized personal branding generating $100k in 90 days. Systems proofed for global scale.
                                    </p>
                                </div>

                                <div className="pt-8 border-t border-white/5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-white/50 italic">STATUS: SELF-SOVEREIGN</span>
                                        </div>
                                        <Lock className="w-4 h-4 text-slate-700" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Interface Telemetry */}
            <section className="py-20 relative overflow-hidden bg-black">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="relative rounded-[48px] overflow-hidden border border-white/10 shadow-2xl"
                    >
                        <div className="absolute top-0 left-0 w-full p-8 z-20 flex justify-between items-start pointer-events-none">
                            <div className="px-4 py-2 glass rounded-xl">
                                <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.4em]">LIVE INTERFACE TELEMETRY // JARYD.OS</span>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <div className="w-2 h-2 rounded-full bg-white/20" />
                                <div className="w-2 h-2 rounded-full bg-white/20" />
                            </div>
                        </div>
                        <img
                            src="https://res.cloudinary.com/dpfapm0tl/image/upload/v1771216503/swj_mvygic.png"
                            alt="Jaryd.OS Interface"
                            className="w-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                    </motion.div>
                </div>
            </section>

            {/* The Arsenal (OS Modules) */}
            <section className="py-32 relative bg-white/[0.02]">
                <div className="absolute inset-0 bg-grid-white opacity-5 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <motion.div {...fadeIn} className="text-center mb-24">
                        <h2 className="text-5xl lg:text-7xl font-black font-display italic tracking-tighter mb-8 uppercase">
                            The <span className="gradient-text">Arsenal.</span>
                        </h2>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium">
                            The Jaryd.OS arsenal supplants traditional human helpers—therapists, coaches, and journals—with kinetic, deterministic logic modules.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {modules.map((m, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="p-10 glass rounded-[40px] border border-white/5 group hover:border-indigo-500/50 transition-all hover:bg-indigo-500/5"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform shadow-lg">
                                    {m.icon}
                                </div>
                                <h3 className="text-xl font-black mb-4 italic uppercase tracking-tight text-white">{m.title}</h3>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed">{m.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-20 grid lg:grid-cols-3 gap-8">
                        {[
                            { title: 'No Sympathy', content: 'Specifically engineered for those who detect trauma loops and seek military-grade solutions over discussions.' },
                            { title: 'Decision Velocity', content: 'Detects cognitive distortions in sub-seconds and prescribes actionable directives to close tabs and execute.' },
                            { title: 'Persistent Patterns', content: 'Remembers every word, connects patterns across months, and holds users to absolute accountability.' }
                        ].map((box, i) => (
                            <div key={i} className="p-8 border-l border-white/10 italic text-slate-400">
                                <div className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-4">{box.title}</div>
                                <p className="text-sm leading-relaxed">{box.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* $JARYD Tokenomics Section */}
            <section className="py-32 relative overflow-hidden bg-[#020408]">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-indigo-900/40 via-purple-900/20 to-transparent rounded-[64px] border border-white/10 p-12 lg:p-24 overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-12 opacity-5">
                            <Coins className="w-96 h-96" />
                        </div>

                        <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
                            <motion.div {...fadeIn}>
                                <div className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6">
                                    <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest">Web3 Infrastructure</span>
                                </div>
                                <h2 className="text-5xl lg:text-7xl font-black font-display italic tracking-tighter mb-8 uppercase text-white">$JARYD COIN</h2>
                                <p className="text-xl text-slate-300 leading-relaxed font-medium mb-12">
                                    A Founder-Bound utility token serving as key and currency inside Jaryd.OS. Built on Solana SPL, fixed at 1,000,000 units with zero inflation.
                                </p>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="group">
                                        <div className="text-4xl font-black italic text-white tracking-tighter mb-1 group-hover:text-indigo-400 transition-colors">1.00M</div>
                                        <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">STRICT CAPACITY</div>
                                    </div>
                                    <div className="group">
                                        <div className="text-4xl font-black italic text-white tracking-tighter mb-1 group-hover:text-purple-400 transition-colors">36 MO</div>
                                        <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">FOUNDER LOCK</div>
                                    </div>
                                    <div className="group">
                                        <div className="text-4xl font-black italic text-white tracking-tighter mb-1 group-hover:text-blue-400 transition-colors">SOL</div>
                                        <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">NEURAL LINK SYNC</div>
                                    </div>
                                    <div className="flex items-center gap-2 pt-4">
                                        <Gem className="w-4 h-4 text-indigo-500" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300">UTILITY OVER SPECULATION</span>
                                    </div>
                                </div>
                            </motion.div>

                            <div className="space-y-4">
                                <h3 className="text-[10px] font-black text-slate-500 tracking-[0.5em] uppercase mb-8 ml-4">Token Utility Stack</h3>
                                {[
                                    { label: 'Direct Access', value: 'Guardian Oracle & Private Community', icon: <UserCheck className="w-4 h-4" /> },
                                    { label: 'Economic Privilege', value: 'Revenue Share & Priority Discounts', icon: <TrendingUp className="w-4 h-4" /> },
                                    { label: 'Network Effect', value: 'High-Impact Deployment Access', icon: <Network className="w-4 h-4" /> }
                                ].map((stat, i) => (
                                    <div key={i} className="p-8 glass rounded-3xl border border-white/5 hover:border-white/10 transition-all flex items-start gap-6 group">
                                        <div className="w-12 h-12 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-indigo-400">
                                            {stat.icon}
                                        </div>
                                        <div>
                                            <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</div>
                                            <div className="text-sm font-black text-white italic uppercase">{stat.value}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Intelligence Archive (Work Projects) */}
            <section className="py-32 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div {...fadeIn} className="mb-20">
                        <h2 className="text-4xl lg:text-5xl font-black font-display italic tracking-tighter mb-8 uppercase">INTELLIGENCE <span className="gradient-text">ARCHIVE.</span></h2>
                        <p className="text-xl text-slate-400 max-w-2xl font-medium">Classified project deployments managed through the Jaryd.OS infrastructure.</p>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {archives.map((project, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-10 bg-white/[0.03] border border-white/5 rounded-[48px] relative overflow-hidden group hover:border-white/20 transition-all"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Terminal className="w-32 h-32" />
                                </div>
                                <div className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-6">{project.impact}</div>
                                <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-6 underline decoration-indigo-500/50 underline-offset-8 decoration-4">{project.name}</h3>
                                <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">{project.desc}</p>
                                <div className="flex items-center gap-3">
                                    <Code className="w-4 h-4 text-slate-500" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">{project.tech}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Whitelabel / Licensing */}
            <section className="py-32 relative bg-indigo-950/20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center mb-24">
                    <motion.div {...fadeIn}>
                        <h2 className="text-5xl lg:text-7xl font-black font-display italic tracking-tighter mb-8 uppercase leading-none">
                            LICENSING <span className="gradient-text-alt">PROTOCOLS.</span>
                        </h2>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium">
                            Scale the Jaryd.OS cognitive warfare suite under your own flag. Three tiers of elite whitelabel infrastructure.
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-3 gap-8">
                    {tiers.map((tier, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-10 glass rounded-[40px] border border-white/10 flex flex-col items-center text-center group hover:scale-105 transition-all duration-500"
                        >
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-8">{tier.name}</h4>
                            <div className="text-4xl font-black italic text-white tracking-tighter mb-2">{tier.price}</div>
                            <div className="text-sm font-bold text-slate-500 mb-10">+{tier.setup} Setup</div>
                            <div className="w-full h-px bg-white/5 mb-10" />
                            <div className="text-xs font-black uppercase text-slate-400 tracking-widest mb-12">{tier.target}</div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full py-5 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-2xl italic group-hover:bg-indigo-400 transition-colors"
                            >
                                REQUEST ACCESS
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Technical Documents (The Blueprint) */}
            <section className="py-32 relative">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <motion.div {...fadeIn}>
                            <h2 className="text-4xl lg:text-5xl font-black font-display italic tracking-tighter mb-8 uppercase text-white leading-none">SYSTEM <span className="gradient-text">BLUEPRINT.</span></h2>
                            <p className="text-xl text-slate-400 leading-relaxed font-medium mb-12">
                                Access the classified documentation housing the whitepaper, alpha specifications, and protocol dissections of the Jaryd.OS neural stack.
                            </p>

                            <div className="grid gap-6">
                                {[
                                    { title: 'SWJ Whitepaper', desc: 'Sovereign stack architecture & risk/reward summary.' },
                                    { title: 'Protocol May 1', desc: 'Accountability system disguised as a Next.js component.' },
                                    { title: 'DeepSeek Integration', desc: 'Real-time psychographic persona instructions & API specs.' }
                                ].map((doc, i) => (
                                    <div key={i} className="flex gap-6 items-center p-6 glass rounded-2xl border border-white/5 hover:border-white/20 transition-all cursor-pointer group">
                                        <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-black transition-all">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black italic uppercase text-white group-hover:text-indigo-400 transition-colors">{doc.title}</h4>
                                            <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">{doc.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <div className="p-12 glass rounded-[48px] border border-white/10 relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                                <Binary className="w-48 h-48" />
                            </div>
                            <h3 className="text-xs font-black text-indigo-400 uppercase tracking-[0.4em] mb-10">Security Protocol May 1</h3>
                            <div className="space-y-8 font-mono text-[10px] text-slate-400 leading-relaxed uppercase tracking-widest">
                                <div className="flex gap-4">
                                    <span className="text-indigo-400">[01]</span>
                                    <span>6-Digit PIN Security Gate with Glitch Transitions</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-indigo-400">[02]</span>
                                    <span>Dynamic Sound/Visual "War Engine" Initializers</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-indigo-400">[03]</span>
                                    <span>"Paradise Actual" Visual Anchorage Layer</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-indigo-400">[04]</span>
                                    <span>CopilotClient DeepSeek v3 Integration</span>
                                </div>
                                <div className="pt-8 text-center text-indigo-500 font-black animate-pulse">
                                    ENCRYPTED ARCHIVE ACCESS ONLY
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tactical SOPs (The Codex) */}
            <section className="py-32 relative bg-black">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-12 items-center bg-white/[0.02] border border-white/10 rounded-[64px] p-12 lg:p-20 overflow-hidden relative">
                        <div className="lg:w-1/2">
                            <h2 className="text-4xl lg:text-5xl font-black font-display italic tracking-tighter mb-8 uppercase text-white leading-none">THE <span className="gradient-text-alt">CODEX.</span></h2>
                            <p className="text-xl text-slate-400 leading-relaxed font-medium mb-12 italic">
                                "The source code of dominance. Every system, every automation, every weapon I’ve built over four years, archived for $10."
                            </p>
                            <div className="grid grid-cols-2 gap-6 mb-12">
                                <div className="flex items-center gap-3">
                                    <Terminal className="w-5 h-5 text-indigo-500" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Source Code (DIY)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Binary className="w-5 h-5 text-purple-500" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Zapier SOPs</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Globe className="w-5 h-5 text-blue-500" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Hijack Protocols</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Briefcase className="w-5 h-5 text-indigo-400" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Whitelabel Ready</span>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 flex justify-center">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-20 py-8 bg-indigo-600 text-white font-black uppercase tracking-[0.5em] text-xs rounded-3xl italic shadow-2xl shadow-indigo-500/40 relative overflow-hidden group"
                            >
                                <span className="relative z-10 font-display italic">GET THE CODEX // $10</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Strategic Call (Strategy Call) */}
            <section className="py-32 relative">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="relative h-[600px] flex items-center justify-center">
                            <motion.div
                                initial={{ opacity: 0, rotate: -10 }}
                                whileInView={{ opacity: 1, rotate: 0 }}
                                transition={{ duration: 1 }}
                                className="p-12 glass rounded-[64px] border border-white/10 shadow-2xl relative z-10 max-w-lg"
                            >
                                <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-10 text-center italic">"Highest ROI 30 minutes of the year"</div>
                                <div className="flex justify-between items-center mb-12 border-b border-white/5 pb-12">
                                    <div className="text-center">
                                        <div className="text-4xl font-black text-white italic tracking-tighter mb-1">$2.7M</div>
                                        <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">REV GENERATED</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-black text-white italic tracking-tighter mb-1">23%</div>
                                        <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">CONV LIFT</div>
                                    </div>
                                </div>
                                <p className="text-slate-400 italic font-medium leading-relaxed mb-12 text-center">
                                    "Jaryd mapped a system replacing three employees and adding $250k in revenue."
                                </p>
                                <div className="px-8 py-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-center">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">UNREASONABLE GUARANTEE: $100 REFUND IF TALK WASTE OF TIME</span>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div {...fadeIn}>
                            <h2 className="text-4xl lg:text-5xl font-black font-display italic tracking-tighter mb-8 uppercase leading-none">STRATEGY <span className="gradient-text-alt">SESSION.</span></h2>
                            <p className="text-xl text-slate-400 leading-relaxed font-medium mb-12">
                                reserved for founders doing $20k+ / month. a 30-minute dissection of your infrastructure to map your architecture and integration roadmap.
                            </p>
                            <div className="space-y-6">
                                {[
                                    '14-Day Sprint Execution',
                                    'Zero Lengthy Strategy Sessions',
                                    'High-Leverage Scaling Infrastructure',
                                    'Validated Offer Qualification Required'
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-400">
                                        <div className="w-6 h-6 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-500">
                                            <Zap className="w-3 h-3" />
                                        </div>
                                        {item}
                                    </div>
                                ))}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="mt-12 px-12 py-6 bg-white text-black font-black uppercase tracking-[0.4em] text-[10px] rounded-2xl italic shadow-2xl"
                                >
                                    BOOK DISSECTION
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Final Sovereign Section */}
            <section className="py-32 relative overflow-hidden bg-[#020408]">
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <motion.div {...fadeIn}>
                        <h2 className="text-5xl lg:text-7xl font-black font-display italic tracking-tighter mb-12 uppercase leading-none">
                            BUILD <span className="gradient-text">SOVEREIGNTY.</span>
                        </h2>

                        <p className="text-xl text-slate-400 leading-relaxed font-medium mb-16 italic">
                            "The system is not a website. It is a psychological exosuit designed to turn discipline into an engineering problem."
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
                            <div>
                                <div className="text-4xl font-black text-white italic mb-2 tracking-tighter">01</div>
                                <div className="text-[8px] font-black text-slate-500 tracking-widest uppercase">INFILTRATE</div>
                            </div>
                            <div>
                                <div className="text-4xl font-black text-white italic mb-2 tracking-tighter">02</div>
                                <div className="text-[8px] font-black text-slate-500 tracking-widest uppercase">BLUEPRINT</div>
                            </div>
                            <div>
                                <div className="text-4xl font-black text-white italic mb-2 tracking-tighter">03</div>
                                <div className="text-[8px] font-black text-slate-500 tracking-widest uppercase">FABRICATE</div>
                            </div>
                            <div>
                                <div className="text-4xl font-black text-white italic mb-2 tracking-tighter">04</div>
                                <div className="text-[8px] font-black text-slate-500 tracking-widest uppercase">DEPLOY</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ScaleWithJarydPage;

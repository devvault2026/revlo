import React from 'react';
import { motion } from 'framer-motion';
import {
    Cpu,
    Shield,
    Zap,
    CheckCircle2,
    AlertTriangle,
    Target,
    LineChart,
    Globe,
    ArrowLeft,
    ExternalLink,
    Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

const IndeedBotPage: React.FC = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8 }
    };

    return (
        <div className="min-h-screen bg-[#020408] text-white">
            <Navigation />

            {/* Hero Section */}
            <section className="relative pt-40 pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-grid-white opacity-5 pointer-events-none" />
                <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-blue-900/20 blur-[150px] rounded-full" />

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back to Research</span>
                    </Link>

                    <motion.div {...fadeIn}>
                        <div className="inline-block px-4 py-2 glass rounded-full mb-8">
                            <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">
                                Project // 001
                            </span>
                        </div>

                        <h1 className="text-6xl lg:text-9xl font-black font-display italic tracking-tighter mb-8 leading-none">
                            INDEEDBOT <span className="gradient-text">2026.</span>
                        </h1>

                        <p className="text-2xl lg:text-3xl text-slate-400 max-w-3xl font-medium leading-tight mb-12">
                            A production-grade AI career intelligence platform designed to turn the modern job search into a strategic, data-driven decision process.
                        </p>

                        <div className="flex flex-wrap gap-6">
                            <a href="https://www.indeedbot.xyz/" target="_blank" rel="noopener noreferrer">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-12 py-6 bg-white text-black text-[12px] font-black uppercase tracking-[0.4em] rounded-2xl flex items-center gap-4 italic shadow-2xl shadow-blue-500/10"
                                >
                                    ACCESS PLATFORM
                                    <ExternalLink className="w-5 h-5" />
                                </motion.button>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Overview / Problem Section */}
            <section className="py-32 relative">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-20 items-start">
                        <motion.div {...fadeIn}>
                            <h2 className="text-4xl font-black font-display italic tracking-tighter mb-8 uppercase">Overview</h2>
                            <p className="text-xl text-slate-400 leading-relaxed font-medium mb-12">
                                IndeedBot 2026 is built from the ground up as a multi-agent reasoning system. It analyzes live job listings, ATS behavior, market demand, and institutional signals before a candidate ever applies.
                                <br /><br />
                                Rather than automating applications, the platform focuses on decision quality—helping users determine which opportunities are worth pursuing, how to position themselves, and when negotiation leverage exists.
                            </p>

                            <div className="p-8 glass rounded-3xl border border-white/5 space-y-6">
                                <div className="flex items-start gap-4">
                                    <Shield className="w-6 h-6 text-blue-400 mt-1" />
                                    <div>
                                        <h4 className="text-sm font-black uppercase tracking-widest mb-1">Enterprise-Grade Security</h4>
                                        <p className="text-xs text-slate-500">Prioritizing privacy, transparency, and jurisdictional compliance (GDPR, PIPEDA, CCPA).</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Lock className="w-6 h-6 text-purple-400 mt-1" />
                                    <div>
                                        <h4 className="text-sm font-black uppercase tracking-widest mb-1">Zero Data Tracking</h4>
                                        <p className="text-xs text-slate-500">Zero data resale model. Your career intelligence belongs to you.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
                            <h2 className="text-4xl font-black font-display italic tracking-tighter mb-8 uppercase text-red-500/80">The Problem</h2>
                            <p className="text-slate-500 font-medium mb-10 italic">"The modern hiring market is noisy, opaque, and algorithm-driven."</p>

                            <ul className="space-y-6">
                                {[
                                    'Applicants apply blindly without understanding ATS filters',
                                    'Job listings hide real budget, urgency, and role intent',
                                    'High-value candidates waste time on low-probability opportunities',
                                    'Negotiation decisions are made without market intelligence'
                                ].map((item, idx) => (
                                    <li key={idx} className="flex gap-4 p-6 bg-red-500/5 border border-red-500/10 rounded-2xl items-center">
                                        <AlertTriangle className="w-5 h-5 text-red-500/50 flex-shrink-0" />
                                        <span className="text-sm text-slate-300 font-medium tracking-wide">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-12 p-8 bg-white/5 rounded-3xl border border-white/10 text-center">
                                <p className="text-xl font-black italic tracking-tighter text-white uppercase">
                                    Traditional tools optimize volume. <br />
                                    <span className="text-blue-400">IndeedBot optimizes probability.</span>
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Solutions / Agents Grid */}
            <section className="py-32 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div {...fadeIn} className="text-center mb-24">
                        <h2 className="text-5xl lg:text-7xl font-black font-display italic tracking-tighter mb-8 uppercase">
                            The <span className="gradient-text-alt">Intelligence Layer.</span>
                        </h2>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium">
                            A controlled multi-agent reasoning framework that performs deep analysis across every stage of the hiring funnel.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                icon: <Globe className="w-8 h-8" />,
                                title: 'Market Intelligence Engine',
                                desc: 'Analyzes live job postings to extract hidden signals including role urgency, salary bands, and hiring patterns—surfacing opportunity quality beyond what is publicly visible.',
                                color: 'blue'
                            },
                            {
                                icon: <Target className="w-8 h-8" />,
                                title: 'Candidate Positioning Engine',
                                desc: 'Reconstructs resumes and professional narratives to align with ATS parsing logic and hiring manager expectations, ensuring semantic accuracy.',
                                color: 'purple'
                            },
                            {
                                icon: <Shield className="w-8 h-8" />,
                                title: 'Risk & Signal Analysis',
                                desc: 'Evaluates institutional legitimacy, market stability, and opportunity risk by analyzing company signals and hiring consistency.',
                                color: 'red'
                            },
                            {
                                icon: <LineChart className="w-8 h-8" />,
                                title: 'Negotiation Intelligence',
                                desc: 'Simulates negotiation outcomes using real-world compensation data and market benchmarks, helping candidates enter discussions with clarity.',
                                color: 'green'
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="p-10 glass rounded-[40px] border border-white/5 hover:border-white/10 transition-all group"
                            >
                                <div className={`w-16 h-16 rounded-2xl bg-${item.color}-500/10 flex items-center justify-center mb-8 border border-${item.color}-500/20 group-hover:scale-110 transition-transform`}>
                                    {React.cloneElement(item.icon as React.ReactElement, { className: `w-8 h-8 text-${item.color}-400` })}
                                </div>
                                <h3 className="text-2xl font-black mb-4 italic uppercase tracking-tight">{item.title}</h3>
                                <p className="text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Architecture Details */}
            <section className="py-32 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-transparent rounded-[64px] border border-white/5 p-16 lg:p-24 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 opacity-10">
                            <Cpu className="w-64 h-64" />
                        </div>

                        <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
                            <motion.div {...fadeIn}>
                                <h2 className="text-4xl lg:text-5xl font-black font-display italic tracking-tighter mb-8 uppercase">System Architecture</h2>
                                <ul className="space-y-6">
                                    {[
                                        'Multi-Agent Reasoning Framework',
                                        'Client-Side Processing & Encryption',
                                        'Real-Time DOM & Context Analysis',
                                        'ATS-Optimized Output Generation',
                                        'Zero Data Resale / Zero Tracking Model'
                                    ].map((li, i) => (
                                        <li key={i} className="flex items-center gap-4 text-slate-300 font-black uppercase tracking-[0.2em] text-[10px]">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                            {li}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="p-12 glass rounded-3xl border border-white/10">
                                <h3 className="text-xl font-black italic mb-6 uppercase tracking-widest text-blue-400">Ethical AI Design</h3>
                                <p className="text-slate-400 font-medium mb-8">IndeedBot 2026 is designed to optimize truthfully, not deceive.</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-[8px] font-black text-slate-500 tracking-widest uppercase"><CheckCircle2 className="w-3 h-3 text-green-500" /> HUMAN VALIDATED</div>
                                        <div className="flex items-center gap-2 text-[8px] font-black text-slate-500 tracking-widest uppercase"><CheckCircle2 className="w-3 h-3 text-green-500" /> NO FABRICATION</div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-[8px] font-black text-slate-500 tracking-widest uppercase"><CheckCircle2 className="w-3 h-3 text-green-500" /> NO DECEPTION</div>
                                        <div className="flex items-center gap-2 text-[8px] font-black text-slate-500 tracking-widest uppercase"><CheckCircle2 className="w-3 h-3 text-green-500" /> PRIVACY FIRST</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final Outcome CTA */}
            <section className="py-32 bg-[#020408] relative">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <motion.div {...fadeIn}>
                        <h2 className="text-5xl lg:text-7xl font-black font-display italic tracking-tighter mb-12 uppercase leading-none">
                            BUILT BY <span className="gradient-text-alt">REVLO.</span>
                        </h2>

                        <p className="text-xl text-slate-400 leading-relaxed font-medium mb-16">
                            IndeedBot 2026 was fully designed and engineered by Revlo—from system architecture and agent orchestration to UI, security, and deployment strategy. It represents our ability to build complex, real-world AI systems that operate reliably at scale.
                        </p>

                        <div className="p-12 glass rounded-[48px] border border-white/5 relative group">
                            <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                            <h3 className="text-2xl font-black italic mb-8 uppercase tracking-widest">Apply with Intent. Not Volume.</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                                <div>
                                    <div className="text-4xl font-black text-white italic mb-2 tracking-tighter">01</div>
                                    <div className="text-[8px] font-black text-slate-500 tracking-widest uppercase">STRATEGIC INTENT</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-black text-white italic mb-2 tracking-tighter">02</div>
                                    <div className="text-[8px] font-black text-slate-500 tracking-widest uppercase">HI-PROBABILITY</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-black text-white italic mb-2 tracking-tighter">03</div>
                                    <div className="text-[8px] font-black text-slate-500 tracking-widest uppercase">MARKET LEVERAGE</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-black text-white italic mb-2 tracking-tighter">04</div>
                                    <div className="text-[8px] font-black text-slate-500 tracking-widest uppercase">ZERO WASTE</div>
                                </div>
                            </div>

                            <a href="https://www.indeedbot.xyz/" target="_blank" rel="noopener noreferrer">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full py-6 bg-blue-600 text-white text-[12px] font-black uppercase tracking-[0.4em] rounded-2xl flex items-center justify-center gap-4 italic"
                                >
                                    SURVIVE THE CURVE
                                    <ExternalLink className="w-5 h-5" />
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

export default IndeedBotPage;

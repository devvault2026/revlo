import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
    Cpu, 
    Rocket, 
    Target, 
    Code2, 
    Zap, 
    ShieldCheck, 
    ChevronRight, 
    ArrowRight,
    Search,
    Brain,
    Bot,
    Network,
    Terminal,
    Database
} from 'lucide-react';

interface Position {
    id: string;
    title: string;
    type: string;
    compensation: string;
    status: string;
    description: string;
    tags: string[];
    details: {
        philosophy?: string;
        model?: string;
        roles: string[];
        benchmarks?: string[];
        stack?: string[];
        mission?: string;
        kpis?: string[];
    };
}

const positions: Position[] = [
    {
        id: 'openclaw-partner',
        title: 'PARTNERSHIP PROTOCOL: OpenClaw Developer & Revlo Agency',
        type: 'Profit-Sharing & Performance-Based Compensation',
        compensation: '60/40 Split (Revlo / Developer)',
        status: 'Active',
        description: 'Revlo does not hire employees for the OpenClaw initiative; we partner with System Architects and system architects engineer autonomous dominance.',
        tags: ['Autonomous Systems', 'Playwright', 'Supabase', 'DeepSeek', 'Gemini'],
        details: {
            philosophy: 'Our model is designed to remove the freelancer\'s burden (finding clients, paying for servers, managing ads) so the Developer can focus on engineering autonomous dominance.',
            model: 'All revenue generated from OpenClaw setups, Elite Development contracts, and recurring maintenance is split 60/40. Revlo covers Cloud Infrastructure, API Overhead, Marketing Budget, and Sales/Legal.',
            mission: 'Autonomous Agency Scaling ($0 to $100k in 90 Days) with recursive learning and persistent market dominance. System Overview: The OpenClaw Marketing Director is a high-leverage autonomous agent deployed 24/7 on Orgo.ai cloud VMs. Technology: Raspberry Pi 5 / Cloudflare R2 / Supabase (PostgreSQL + Vector) / Playwright (Stealth) / DeepSeek-v3 / Gemini 1.5 Pro.',
            roles: [
                'System Deployment: Configure OpenClaw Marketing Director and Sales SDR agents for clients.',
                'Maintenance: Operate and improve the Yesterday Protocol to prevent drift.',
                'Architecture Evolution: Improve stealth-mode Playwright scripts and Supabase enrichment.',
                'Discovery: Extract leads (LinkedIn, Apollo, directories), enrich data, and tag by service fit.',
                'Outreach: Drive LinkedIn + cold email lanes with dynamic follow-ups and Discord sync.',
                'Reporting: Share technical updates to Revlo Command Center (Discord).'
            ],
            benchmarks: [
                'Deployment Speed: MVP setup within 72 hours of contract signing.',
                'System Uptime: 98%+ autonomous uptime (excluding scheduled maintenance).',
                'Data Integrity: 0% lead duplication in Supabase.',
                'Optimization: Weekly prompt improvement based on conversion data.',
                'Persistence: 5+ days of uptime without manual restart.',
                'Closing Signal: 5+ booked strategy sessions per week per agent.',
            ],
            stack: [
                'Engine: OpenClaw Autonomous Agentic Loop',
                'Infrastructure: Orgo Cloud Desktops + Cloudflare R2',
                'Data Lake: Supabase (PostgreSQL + Vector Memory)',
                'Browser Control: Playwright stealth scripts',
                'LLMs: DeepSeek-v3 / Gemini 1.5 Pro',
                'Command Center: Discord webhooks & logs',
            ],
            kpis: [
                'Zero Manual Sourcing: 100% agent-driven lead acquisition.',
                'Hyper-Personalization: No repeated outreach copy.',
                'Scale to 100k: 90-day revenue path executed reliably.',
            ]
        }
    }
];

const CareersPage: React.FC = () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <div className="bg-[#020408] min-h-screen pt-32 pb-24">
            <Helmet>
                <title>CAREERS | REVLO AGENCY - PROTOCOL ACTIVATION</title>
                <meta name="description" content="We don't hire employees. We activate partners. Join the OpenClaw initiative and scale at machine speed." />
            </Helmet>

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Hero Section */}
                <div className="mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6"
                    >
                        <Zap className="w-3 h-3" />
                        Protocol Activation
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black font-display text-white italic tracking-tighter mb-6"
                    >
                        JOIN THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">ARCHITECTS</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-lg max-w-2xl mx-auto italic font-medium"
                    >
                        "Revlo provides the fuel (Capital, Leads, Infra); the Developer provides the engine (Code, Autonomy, Logic). Together, we scale at machine speed."
                    </motion.p>
                </div>

                {/* Job Board Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {positions.map((job, index) => (
                        <motion.div
                            key={job.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                            className="group relative bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-blue-500/50 transition-all cursor-pointer flex flex-col justify-between"
                            onClick={() => setSelectedId(job.id)}
                        >
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-black text-white italic uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                                            {job.title}
                                        </h3>
                                        <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em]">
                                            {job.type}
                                        </p>
                                    </div>
                                    <div className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        {job.status}
                                    </div>
                                </div>

                                <p className="text-slate-400 text-sm mb-8 italic leading-relaxed">
                                    {job.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {job.tags.map(tag => (
                                        <span key={tag} className="text-[9px] font-black uppercase tracking-wider px-2 py-1 bg-white/5 border border-white/10 text-slate-500 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                <div className="text-xs font-black text-white tracking-tight italic">
                                    {job.compensation}
                                </div>
                                <div className="flex items-center gap-2 text-blue-400 group-hover:gap-4 transition-all">
                                    <span className="text-[10px] font-black uppercase tracking-widest">Protocol Details</span>
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Culture/Philosophy Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-32 p-12 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent border border-white/5 rounded-3xl relative overflow-hidden"
                >
                    <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                        <div>
                            <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-6">
                                The "Yesterday" <span className="text-blue-400">Protocol</span>
                            </h2>
                            <p className="text-slate-400 italic mb-8 leading-relaxed">
                                We don't build software—we deploy autonomy. Our systems are designed to learn from their own performance, pivoting strategies in real-time based on engagement metrics. We're looking for architects who can maintain this edge.
                            </p>
                            <div className="space-y-4">
                                {[
                                    { icon: Brain, text: "Recursive Intelligence Optimization" },
                                    { icon: Bot, text: "Stealth-Mode Browser Control" },
                                    { icon: Network, text: "Distributed Agent Architecture" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 text-white">
                                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                                            <item.icon className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <span className="text-sm font-black uppercase tracking-widest italic">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square rounded-2xl bg-[#0a0c10] border border-white/10 p-8 flex flex-col justify-center gap-6">
                                <div className="space-y-2">
                                    <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest">90-Day Mission</div>
                                    <div className="text-4xl font-black text-white italic tracking-tighter">$100,000 / mo</div>
                                    <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Revenue Goal via Agent Scaling</div>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '100%' }}
                                            transition={{ duration: 2, ease: "easeOut" }}
                                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 text-[8px] font-black uppercase tracking-widest text-slate-500">
                                        <div>Foundation</div>
                                        <div className="text-center">Expansion</div>
                                        <div className="text-right">Dominance</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Details Modal */}
                <AnimatePresence>
                    {selectedId && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-[#020408]/95 backdrop-blur-xl"
                                onClick={() => setSelectedId(null)}
                            />
                            
                            <motion.div
                                layoutId={selectedId}
                                className="relative bg-[#0a0c10] border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 lg:p-12 shadow-2xl"
                            >
                                <button 
                                    onClick={() => setSelectedId(null)}
                                    className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"
                                >
                                    <ArrowRight className="w-6 h-6 rotate-180" />
                                </button>

                                {positions.find(p => p.id === selectedId) && (() => {
                                    const job = positions.find(p => p.id === selectedId)!;
                                    return (
                                        <div className="space-y-12">
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="px-3 py-1 rounded-md bg-blue-500/20 border border-blue-500/30 text-[10px] font-black text-blue-400 uppercase tracking-widest">
                                                        {job.type}
                                                    </span>
                                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">
                                                        Effective Date: March 2026
                                                    </span>
                                                </div>
                                                <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter">
                                                    {job.title}
                                                </h2>
                                                <p className="text-xl text-blue-400 font-black italic tracking-tight underline decoration-blue-500/30 underline-offset-8">
                                                    {job.compensation}
                                                </p>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-12">
                                                <div className="space-y-8">
                                                    {job.details.philosophy && (
                                                        <section>
                                                            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                                                                <Target className="w-3 h-3 text-blue-400" />
                                                                Philosophy
                                                            </h4>
                                                            <p className="text-slate-400 italic leading-relaxed">
                                                                {job.details.philosophy}
                                                            </p>
                                                        </section>
                                                    )}

                                                    {job.details.mission && (
                                                        <section>
                                                            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                                                                <Rocket className="w-3 h-3 text-blue-400" />
                                                                Mission
                                                            </h4>
                                                            <p className="text-slate-400 italic leading-relaxed">
                                                                {job.details.mission}
                                                            </p>
                                                        </section>
                                                    )}

                                                    <section>
                                                        <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                                                            <Code2 className="w-3 h-3 text-blue-400" />
                                                            Core Responsibilities
                                                        </h4>
                                                        <ul className="space-y-4">
                                                            {job.details.roles.map((role, i) => (
                                                                <li key={i} className="flex gap-4">
                                                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                                                                    <span className="text-slate-300 text-sm italic">{role}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </section>
                                                </div>

                                                <div className="space-y-8 p-8 bg-white/5 border border-white/10 rounded-2xl">
                                                    {job.details.benchmarks && (
                                                        <section>
                                                            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
                                                                <ShieldCheck className="w-3 h-3 text-blue-400" />
                                                                Performance Benchmarks
                                                            </h4>
                                                            <div className="space-y-6">
                                                                {job.details.benchmarks.map((b, i) => (
                                                                    <div key={i} className="flex flex-col gap-1">
                                                                        <span className="text-white text-xs font-black italic uppercase">{b.split(':')[0]}</span>
                                                                        <span className="text-slate-500 text-[11px] font-medium">{b.split(':')[1]}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </section>
                                                    )}

                                                    {job.details.stack && (
                                                        <section>
                                                            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
                                                                <Terminal className="w-3 h-3 text-blue-400" />
                                                                Technical Stack
                                                            </h4>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                {job.details.stack.map((s, i) => (
                                                                    <div key={i} className="flex flex-col gap-1">
                                                                        <span className="text-white text-[10px] font-black italic uppercase leading-tight">{s.split(':')[0]}</span>
                                                                        <span className="text-slate-500 text-[9px] font-medium">{s.split(':')[1]}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </section>
                                                    )}

                                                    <div className="pt-6 border-t border-white/10">
                                                        <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-6">Onboarding Activation</h4>
                                                        <div className="space-y-4">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-6 h-6 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] font-black">1</div>
                                                                <span className="text-slate-400 text-[11px] font-medium italic">Technical Review (OpenClaw & Playwright)</span>
                                                            </div>
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-6 h-6 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] font-black">2</div>
                                                                <span className="text-slate-400 text-[11px] font-medium italic">Shadow Phase (Internal Agent Logic)</span>
                                                            </div>
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-6 h-6 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] font-black">3</div>
                                                                <span className="text-slate-400 text-[11px] font-medium italic">Full Activation (#operator-vault)</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-center gap-6 pt-12 border-t border-white/5">
                                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Ready for Transmission?</p>
                                                <a 
                                                    href="mailto:jaryd@wearerevlo.com?subject=PROTOCOL ACTIVATION: OpenClaw Developer"
                                                    className="group relative px-12 py-4 bg-white text-black font-black uppercase tracking-widest text-xs italic hover:bg-blue-400 transition-all flex items-center gap-3 overflow-hidden"
                                                >
                                                    <span className="relative z-10">Initialize Application</span>
                                                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-2 transition-transform" />
                                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </a>
                                            </div>
                                        </div>
                                    );
                                })()}
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CareersPage;

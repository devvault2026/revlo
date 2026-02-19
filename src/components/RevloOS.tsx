import React from 'react';
import { motion } from 'framer-motion';
import { Search, Zap, Target, Layout, DollarSign, TrendingUp, Cpu } from 'lucide-react';

const RevloOS: React.FC = () => {
    const features = [
        {
            title: 'AUTONOMOUS SOURCING',
            tag: 'SIGNAL_INTEL',
            description: 'AI agents that scan the global market 24/7, detecting high-intent signals and enriching prospects with data humans can\'t find.',
            icon: <Search className="w-6 h-6" />
        },
        {
            title: 'NEURAL ENRICHMENT',
            tag: 'DATA_MAP',
            description: 'Real-time intelligence mapping that builds a complete psychological and business profile of every lead before engagement.',
            icon: <Zap className="w-6 h-6" />
        },
        {
            title: 'DYNAMIC POSITIONING',
            tag: 'VAL_PROP',
            description: 'Customized outreach engines that adapt their value proposition per prospect, ensuring a 90% higher resonance than manual copy.',
            icon: <Target className="w-6 h-6" />
        },
        {
            title: 'AUTONOMOUS ASSETS',
            tag: 'GEN_OPS',
            description: 'Self-generating landing pages, marketing assets, and sequences that iterate based on live conversion data.',
            icon: <Layout className="w-6 h-6" />
        },
        {
            title: 'AUTONOMOUS CLOSING',
            tag: 'NEGOTIATION',
            description: 'Human-grade voice agents and chat bots that handle negotiation, objection handling, and contract deployment.',
            icon: <DollarSign className="w-6 h-6" />
        },
        {
            title: 'OVERSIGHT-FREE GROWTH',
            tag: 'SELF_EVOLVE',
            description: 'The entire pipeline evolves based on performance. It learns what works and scales itself while you focus on the vision.',
            icon: <TrendingUp className="w-6 h-6" />
        }
    ];

    return (
        <section id="revlo-os" className="py-60 bg-black relative overflow-hidden">
            {/* Complex Technical Underlay */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-red-600 via-transparent to-transparent" />
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5" />
                <div className="absolute inset-0 bg-grid-white/[0.02]" />
            </div>

            <div className="relative z-10 max-w-[1800px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col gap-24">
                    {/* Centered Tactical Title */}
                    <div className="text-center space-y-8 max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-3 px-6 py-2 bg-white/[0.03] border border-white/10"
                        >
                            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                            <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.5em]">OPERATING_SYSTEM_V4.2</span>
                        </motion.div>

                        <h2 className="text-[clamp(3.5rem,8vw,9rem)] font-black uppercase leading-[0.8] tracking-tighter text-white">
                            THE CENTRAL <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">COMMAND.</span>
                        </h2>

                        <p className="text-xl lg:text-2xl text-slate-500 font-bold uppercase tracking-tight max-w-3xl mx-auto">
                            REVLO OS is the backbone of the <span className="text-white">Autonomous Era.</span> A deep-tech infrastructure that replaces human overhead with machine precision.
                        </p>
                    </div>

                    {/* Technical Grid of Features */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, filter: 'blur(10px)' }}
                                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative group p-10 bg-white/[0.02] border border-white/5 hover:border-red-600/30 transition-all duration-700"
                            >
                                {/* Active corner decor */}
                                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/10 group-hover:border-red-600 transition-colors" />

                                <div className="space-y-8 relative z-10">
                                    <div className="flex justify-between items-center text-red-600">
                                        <div className="p-3 bg-red-600/10 rounded-none border border-red-600/20 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                                            {feature.icon}
                                        </div>
                                        <span className="text-[10px] font-mono text-white/20 tracking-[0.3em] font-black uppercase italic">{feature.tag}</span>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-slate-400 font-medium leading-relaxed group-hover:text-slate-200 transition-colors">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Background Number Overlay */}
                                <span className="absolute bottom-4 right-4 text-7xl font-black text-white/[0.02] pointer-events-none group-hover:text-red-600/[0.05] transition-colors">0{index + 1}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Critical Action Banner */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="relative p-1 bg-gradient-to-r from-red-600 via-red-400 to-red-600 group cursor-pointer overflow-hidden"
                    >
                        <div className="bg-black p-12 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
                            {/* Scanning Pulse */}
                            <motion.div
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-red-600/10 to-transparent skew-x-12"
                            />

                            <div className="relative z-10 space-y-4">
                                <div className="flex items-center gap-3">
                                    <Cpu className="w-5 h-5 text-red-500 animate-spin-slow" />
                                    <span className="text-[11px] font-black text-red-500 uppercase tracking-[0.6em]">PHASE_3_INTEGRATION</span>
                                </div>
                                <h3 className="text-4xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-none">
                                    DEPLOY THE <br /> <span className="text-red-600">CENTRAL CORE.</span>
                                </h3>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05, letterSpacing: '0.4em' }}
                                whileTap={{ scale: 0.95 }}
                                className="relative z-10 px-12 py-6 bg-red-600 text-white font-black uppercase tracking-[0.3em] text-xs hover:bg-white hover:text-black transition-all duration-500 shadow-[0_0_50px_rgba(220,38,38,0.5)]"
                            >
                                INITIATE_OS_SETUP
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default RevloOS;

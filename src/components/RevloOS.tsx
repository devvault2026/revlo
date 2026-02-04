import React from 'react';
import { motion } from 'framer-motion';
import { Search, Database, BarChart3, FileText, MessageSquare, Zap, Target, Activity, Share2, ShieldCheck, TrendingUp, Handshake } from 'lucide-react';

const RevloOS: React.FC = () => {
    const features = [
        {
            icon: <Search className="w-6 h-6" />,
            title: 'Strategic Discovery',
            description: 'AI-powered sourcing engines that scan multiple market layers to identify high-intent prospects before they enter the public market.',
            color: 'text-purple-400',
        },
        {
            icon: <Activity className="w-6 h-6" />,
            title: 'Market Intelligence',
            description: 'Proprietary data enrichment that transforms surface-level signals into comprehensive, high-resolution business profiles.',
            color: 'text-blue-400',
        },
        {
            icon: <Target className="w-6 h-6" />,
            title: 'Competitive Analysis',
            description: 'Continuous market benchmarking to ensure your brand positioning remains the undisputed leader in your category.',
            color: 'text-red-400',
        },
        {
            icon: <Share2 className="w-6 h-6" />,
            title: 'Creative Production',
            description: 'Dynamic generation of multi-channel outreach assets, personalized at the core for maximum conversion and engagement.',
            color: 'text-purple-400',
        },
        {
            icon: <Handshake className="w-6 h-6" />,
            title: 'Sales Automation',
            description: 'Managed AI systems handling the entire qualification loop, from initial touch to finalized appointment scheduling.',
            color: 'text-blue-400',
        },
        {
            icon: <TrendingUp className="w-6 h-6" />,
            title: 'Omnichannel Growth',
            description: 'Coordinated execution across email, social, and mobile channels with real-time feedback and performance optimization.',
            color: 'text-red-400',
        },
    ];

    const scrollToContact = () => {
        const element = document.getElementById('contact');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="revlo-os" className="py-32 bg-[#020408] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -ml-64 -mb-64" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-4xl mx-auto mb-20"
                >
                    <div className="inline-block px-4 py-2 glass rounded-full mb-8">
                        <span className="text-[10px] font-black text-purple-400 uppercase tracking-[0.4em]">
                            Our Growth Architecture
                        </span>
                    </div>

                    <h2 className="text-5xl lg:text-8xl font-black font-display mb-8 tracking-tighter italic text-white leading-none uppercase">
                        REVLO <span className="gradient-text-alt underline decoration-purple-500/30">PORTAL.</span>
                    </h2>

                    <p className="text-xl text-slate-400 leading-relaxed font-medium">
                        The underlying system for high-performance agency results. An integrated
                        intelligence platform that manages your entire growth cycle while you focus on vision.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="h-full bg-white/5 backdrop-blur-3xl rounded-[32px] p-8 border border-white/5 hover:border-white/10 transition-all duration-300 relative overflow-hidden flex flex-col items-center lg:items-start">
                                <div className={`w-14 h-14 glass rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform duration-500 shadow-xl ${feature.color}`}>
                                    {feature.icon}
                                </div>

                                <h3 className="text-xl font-black mb-4 italic text-white tracking-tight uppercase">
                                    {feature.title}
                                </h3>

                                <p className="text-slate-400 text-sm font-medium leading-relaxed group-hover:text-slate-300 transition-colors text-center lg:text-left italic">
                                    &quot;{feature.description}&quot;
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Integration Banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative p-12 lg:p-20 bg-white/5 backdrop-blur-3xl rounded-[48px] border border-white/10 overflow-hidden group shadow-2xl"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="max-w-2xl text-center lg:text-left">
                            <h3 className="text-3xl lg:text-6xl font-black font-display mb-6 italic text-white tracking-tighter uppercase leading-none">
                                JOIN THE <span className="gradient-text-alt">PORTAL.</span>
                            </h3>
                            <p className="text-xl text-slate-400 font-medium leading-relaxed">
                                Experience the power of dedicated growth systems. Schedule a mapping session
                                to see how our portal can automate your predictable growth engine.
                            </p>
                        </div>

                        <motion.button
                            onClick={scrollToContact}
                            className="group px-12 py-6 bg-white text-black font-black uppercase tracking-widest text-[11px] rounded-2xl hover:bg-slate-200 transition-all duration-300 flex items-center gap-4 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] italic"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            PARTNER NOW
                            <Zap className="w-4 h-4 fill-current" />
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};


export default RevloOS;

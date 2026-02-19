import React from 'react';
import { motion } from 'framer-motion';
import { Star, Shield, Zap, Target, Cpu, Code, TrendingUp } from 'lucide-react';

const FounderOperator: React.FC = () => {
    const operators = [
        {
            name: 'JARYD',
            role: 'ARCHITECT',
            status: 'Operator Active // J-2026',
            image: '/619228587_1473924384299979_5558935500619533353_n.jpg',
            initial: 'J',
            color: 'text-red-500'
        },
        {
            name: 'AUSTYN',
            role: 'WIZARD',
            status: 'Node Online // A-2026',
            image: 'https://res.cloudinary.com/dpfapm0tl/image/upload/v1771518723/440322966_122102586140298307_3460827367128600753_n_nhr5s1.jpg',
            initial: 'A',
            color: 'text-blue-500'
        }
    ];

    const skills = [
        { name: 'Elite Engineering', desc: 'Full-stack systems that scale to IPO levels.', icon: <Code className="w-4 h-4" /> },
        { name: 'Product Architecture', desc: 'Turning "Impossible" ideas into market leaders.', icon: <Cpu className="w-4 h-4" /> },
        { name: 'Growth Orchestration', desc: 'Neural-driven acquisition and scale strategy.', icon: <TrendingUp className="w-4 h-4" /> },
    ];

    return (
        <section id="founder" className="py-40 bg-[#020408] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    {/* Left: Operators Grid */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 gap-6"
                    >
                        {operators.map((op, idx) => (
                            <div key={idx} className="relative aspect-[3/4] group">
                                {/* Rotating Ring for the active operator */}
                                {idx === 0 && (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="absolute -inset-4 border border-white/5 rounded-[48px] border-dashed"
                                    />
                                )}

                                {/* Inner Glass Box */}
                                <div className="absolute inset-0 glass rounded-[32px] border border-white/10 overflow-hidden shadow-2xl transition-all duration-500 group-hover:border-white/30">
                                    {op.image ? (
                                        <img
                                            src={op.image}
                                            alt={op.name}
                                            className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-white/5 flex items-center justify-center text-6xl font-black italic text-white opacity-20 group-hover:opacity-100 transition-opacity">
                                            {op.initial}
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                                    {/* Status Overlay */}
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${idx === 0 ? 'bg-red-500' : 'bg-blue-500'}`} />
                                            <span className="text-[8px] font-black text-white/50 uppercase tracking-[0.3em]">{op.status}</span>
                                        </div>
                                        <div className="text-lg font-black italic text-white uppercase tracking-tighter">
                                            {op.name} <span className={`block text-[10px] not-italic ${op.color}`}>{op.role}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Floating Tech Badges */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute -top-6 left-1/2 -translate-x-1/2 p-4 glass rounded-2xl border border-white/10 backdrop-blur-3xl shadow-2xl z-20"
                        >
                            <Target className="w-6 h-6 text-red-500" />
                        </motion.div>
                    </motion.div>

                    {/* Right: Narrative */}
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-block px-4 py-2 glass rounded-full mb-8">
                                <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em]">
                                    Founders & Lead Operators
                                </span>
                            </div>

                            <h2 className="text-5xl lg:text-8xl font-black font-display mb-8 tracking-tighter italic text-white leading-[0.85] uppercase">
                                THE <span className="gradient-text-alt">ELITE</span> <br />ENGINE.
                            </h2>

                            <p className="text-xl text-slate-400 leading-relaxed font-medium mb-12">
                                We don't hide behind a "team" of entry-level developers or account managers.
                                When you partner with Revlo, you get direct access to the core team.
                                We build the code, we design the systems, and we orchestrate the growth.
                                Total ownership. Total accountability. Irrefutable results.
                            </p>

                            <div className="grid gap-6">
                                {skills.map((skill, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        viewport={{ once: true }}
                                        className="p-6 glass rounded-2xl border border-white/5 hover:border-white/10 transition-colors flex items-start gap-6 group"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                            {skill.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-white font-black italic uppercase tracking-tight mb-1">{skill.name}</h4>
                                            <p className="text-sm text-slate-500 font-medium">{skill.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Philosophy */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 p-12 glass rounded-[48px] border border-white/10 text-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-blue-500/5" />
                    <h3 className="text-3xl lg:text-5xl font-black font-display mb-8 text-white italic tracking-tighter uppercase relative z-10">
                        "AGENCY BLOAT IS <span className="text-red-600">POISON.</span> SPEED IS THE ANTIDOTE."
                    </h3>
                    <p className="text-xl text-slate-400 leading-relaxed max-w-4xl mx-auto font-medium relative z-10">
                        We are the category of one. Our expertise is amplified by Revlo OS, a proprietary stack of systems designed
                        to outperform entire departments. You aren't just buying services; you're securing a strategic advantage
                        that your competitors literally cannot replicate.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default FounderOperator;

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldAlert, Zap, Cpu, Globe, BarChart3, Rocket, XCircle, CheckCircle2, TrendingUp, Users } from 'lucide-react';

const steps = [
    {
        title: "THE MANUAL GRIND",
        subtitle: "The Business Ceiling",
        status: "critical",
        icon: <XCircle className="w-8 h-8 text-red-500" />,
        points: [
            "Losing money on slow lead response",
            "Drained human labor doing busy work",
            "Unable to grow without more hiring",
            "Inconsistent sales and high stress"
        ],
        alignment: "left"
    },
    {
        title: "THE AI PARTNERSHIP",
        subtitle: "Integrated Intelligence",
        status: "active",
        icon: <Users className="w-8 h-8 text-purple-400" />,
        points: [
            "We deploy agents that never sleep",
            "Every lead is called in 30 seconds",
            "Real human-grade voice interaction",
            "Your calendar fills while you focus"
        ],
        alignment: "right"
    },
    {
        title: "IRREFUTABLE SCALE",
        subtitle: "The Elite Enterprise",
        status: "optimized",
        icon: <TrendingUp className="w-8 h-8 text-blue-400" />,
        points: [
            "Unlimited capacity for new clients",
            "Radically lower operating costs",
            "Market dominance through speed",
            "A business that runs like clockwork"
        ],
        alignment: "left"
    }
];

const Process: React.FC = () => {
    return (
        <section id="process" className="relative py-32 bg-[#020408] overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-purple-600/5 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-grid-white opacity-[0.02]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 px-4 py-2 glass rounded-full mb-6"
                    >
                        <Zap className="w-4 h-4 text-purple-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400">
                            Roadmap to Scale
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl lg:text-7xl font-black font-display tracking-tighter italic text-white mb-6 uppercase"
                    >
                        THE EVOLUTION OF <span className="gradient-text-alt underline decoration-purple-500/30">GROWTH.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-xl text-slate-400 max-w-2xl mx-auto font-medium"
                    >
                        From the friction of manual operations to the precision of an automated enterprise.
                        This is how Revlo transforms your business journey.
                    </motion.p>
                </div>

                {/* Vertical Roadmap */}
                <div className="relative">
                    {/* Central Line */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-red-500/20 via-purple-500/50 to-blue-500/20 hidden lg:block">
                        <motion.div
                            className="absolute top-0 left-[-2px] w-[5px] h-32 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full blur-sm"
                            animate={{ y: ['0%', '1000%'] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        />
                    </div>

                    <div className="space-y-32">
                        {steps.map((step, index) => (
                            <div key={index} className={`relative flex flex-col items-center ${step.alignment === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                                {/* Card */}
                                <motion.div
                                    initial={{ opacity: 0, x: step.alignment === 'left' ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    className="w-full lg:w-[45%] group"
                                >
                                    <div className={`p-8 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border ${step.status === 'critical' ? 'border-red-500/20 hover:border-red-500/40' : step.status === 'active' ? 'border-purple-500/30 hover:border-purple-500/60' : 'border-blue-500/30 hover:border-blue-500/60'} transition-all duration-500 relative overflow-hidden shadow-2xl shadow-black/50`}>
                                        {/* Glow Background */}
                                        <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity ${step.status === 'critical' ? 'bg-red-500' : step.status === 'active' ? 'bg-purple-500' : 'bg-blue-500'}`} />

                                        <div className="relative z-10">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="p-3 glass rounded-2xl border border-white/10 group-hover:scale-110 transition-transform">
                                                    {step.icon}
                                                </div>
                                                <div>
                                                    <div className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${step.status === 'critical' ? 'text-red-400' : step.status === 'active' ? 'text-purple-400' : 'text-blue-400'}`}>
                                                        {step.subtitle}
                                                    </div>
                                                    <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase">
                                                        {step.title}
                                                    </h3>
                                                </div>
                                            </div>

                                            <ul className="space-y-4">
                                                {step.points.map((point, i) => (
                                                    <li key={i} className="flex items-center gap-3 text-slate-300 font-medium">
                                                        <div className={`w-1.5 h-1.5 rounded-full ${step.status === 'critical' ? 'bg-red-500' : step.status === 'active' ? 'bg-purple-500' : 'bg-blue-500'}`} />
                                                        {point}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Central Node Indicator */}
                                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        className={`w-12 h-12 rounded-full glass border flex items-center justify-center z-20 ${step.status === 'critical' ? 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : step.status === 'active' ? 'border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.3)]' : 'border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.3)]'}`}
                                    >
                                        <div className={`w-3 h-3 rounded-full animate-pulse ${step.status === 'critical' ? 'bg-red-500' : step.status === 'active' ? 'bg-purple-500' : 'bg-blue-500'}`} />
                                    </motion.div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Final CTA Bridge */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-40 p-12 glass rounded-[3rem] border border-white/10 text-center relative overflow-hidden group shadow-2xl"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative z-10 space-y-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl border border-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                            <Rocket className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-4xl lg:text-6xl font-black text-white tracking-tighter italic uppercase">
                            THE LAST PARTNER <br />YOU&apos;LL EVER <span className="gradient-text-alt">NEED.</span>
                        </h3>
                        <p className="text-xl text-slate-400 max-w-xl mx-auto font-medium">
                            Don&apos;t just survive the digital shift. Lead it. Join the elite network of partners scaling at the speed of thought.
                        </p>
                        <button
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-12 py-6 bg-white text-black font-black uppercase tracking-[0.2em] text-sm rounded-2xl hover:bg-slate-200 transition-colors shadow-2xl italic"
                        >
                            BOOK A STRATEGY SESSION
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Process;

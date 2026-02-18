import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Bot, Terminal, Shield, Zap, ArrowRight, Crosshair } from 'lucide-react';
import { Link } from 'react-router-dom';

const OpenClawIntro: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={sectionRef} className="relative py-32 overflow-hidden bg-[#020408]">
            {/* Background Grids & effects */}
            <div className="absolute inset-0 bg-grid-white opacity-[0.03] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#020408] via-transparent to-[#020408] pointer-events-none" />

            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Tactical Visuals */}
                    <div className="relative">
                        <motion.div
                            style={{ y, opacity }}
                            className="relative z-10"
                        >
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                                <div className="relative glass-dark p-8 rounded-2xl border border-white/10 overflow-hidden">
                                    {/* Scanline */}
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%] opacity-20 pointer-events-none" />

                                    {/* Header */}
                                    <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                            <span className="text-xs font-mono text-red-400 tracking-widest">SYSTEM_ACTIVE</span>
                                        </div>
                                        <div className="text-[10px] font-mono text-white/40">V.1.0.4</div>
                                    </div>

                                    {/* Terminal Content */}
                                    <div className="space-y-4 font-mono text-sm">
                                        <div className="flex gap-3 text-slate-400">
                                            <span className="text-red-500">➜</span>
                                            <span>detect_inefficiency --all</span>
                                        </div>
                                        <div className="text-green-500/80 pl-6">
                                            [SUCCESS] 4,203 email threads analyzed
                                        </div>
                                        <div className="flex gap-3 text-slate-400">
                                            <span className="text-red-500">➜</span>
                                            <span>deploy_agent --context="inbox_zero"</span>
                                        </div>
                                        <div className="text-green-500/80 pl-6">
                                            [RUNNING] Autonomous response loops active...
                                        </div>
                                        <div className="flex gap-3 text-slate-400 animate-pulse">
                                            <span className="text-red-500">➜</span>
                                            <span className="border-r-2 border-red-500 pr-1">awaiting_command</span>
                                        </div>
                                    </div>

                                    {/* Decorative UI Elements */}
                                    <div className="mt-8 flex gap-2">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-red-500/50 w-2/3 animate-scan-fast" style={{ animationDelay: `${i * 0.2}s` }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Background Elements */}
                        <div className="absolute top-10 -right-10 w-40 h-40 bg-red-500/20 blur-[60px] rounded-full" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 blur-[60px] rounded-full" />
                    </div>

                    {/* Right: Copy & CTA */}
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest">
                            <Zap className="w-3 h-3" />
                            <span>New Release</span>
                        </div>

                        <h2 className="text-5xl lg:text-7xl font-black font-display italic uppercase leading-[0.85] tracking-tight text-white">
                            THE AGENT THAT
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-500">DOES THINGS.</span>
                        </h2>

                        <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-lg">
                            Stop chatting with AI. Start employing it. OpenClaw connects to your browser, email, and calendar to execute complex workflows 24/7 without you lifting a finger.
                        </p>

                        <ul className="space-y-4">
                            {[
                                "Zero Human Intervention Required",
                                "Runs Locally on Your Machine",
                                "Controls Browser & Desktop Apps"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm font-bold text-white uppercase tracking-wider">
                                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40">
                                        <Crosshair className="w-3 h-3 text-red-500" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className="pt-4">
                            <Link to="/openclaw">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group relative px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest text-sm rounded-xl overflow-hidden transition-colors shadow-[0_0_40px_rgba(220,38,38,0.4)]"
                                >
                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                                    <span className="relative z-10 flex items-center gap-3">
                                        Deploy OpenClaw
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OpenClawIntro;

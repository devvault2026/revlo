import React from 'react';
import { motion } from 'framer-motion';
import { Skull, Zap, ArrowRight, ShieldCheck } from 'lucide-react';

const TakeoffInevitability: React.FC = () => {
    return (
        <section className="py-20 bg-[#020408] relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

            <div className="max-w-[1400px] mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl">

                    {/* The Obsolete Past */}
                    <div className="relative p-12 md:p-20 bg-[#05070a] group overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                            <Skull size={180} className="text-red-900" />
                        </div>

                        <div className="relative z-10 space-y-10">
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full">
                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-red-500">The Obsolete Path</span>
                            </div>

                            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-none italic uppercase">
                                MANUAL<br />
                                <span className="text-red-600">OBSOLESCENCE.</span>
                            </h2>

                            <p className="text-lg text-slate-500 leading-relaxed font-medium italic">
                                "The contractor who stays up until 2 AM squinting at blueprint scales is no longer 'Hardworking'. They are <span className="text-red-500 font-black uppercase">Dangerous</span> to their own margins. One missed count equals 15% margin leak—automatically."
                            </p>

                            <div className="relative h-64 rounded-3xl overflow-hidden grayscale brightness-50 border border-white/5">
                                <img
                                    src="/manual_estimation_pain_1770762460741.png"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                    alt="Manual Error"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] to-transparent" />
                            </div>
                        </div>
                    </div>

                    {/* The Agentic Future */}
                    <div className="relative p-12 md:p-20 bg-[#080a10] group overflow-hidden border-l border-white/5">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px]" />

                        <div className="relative z-10 space-y-10">
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full">
                                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">The Agentic Edge</span>
                            </div>

                            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-none italic uppercase">
                                PREDATORY<br />
                                <span className="gradient-text">DOMINANCE.</span>
                            </h2>

                            <p className="text-lg text-slate-300 leading-relaxed font-medium italic">
                                "While you sleep, your agent iterates. It finds every stud, every socket, every linear foot with machine precision. It doesn't get tired. It doesn't miss. It turns your bidding into a <span className="text-white font-black">Weapon of Certainty</span>."
                            </p>

                            <div className="relative h-64 rounded-3xl overflow-hidden border border-purple-500/20 shadow-[0_0_30px_rgba(147,51,234,0.2)]">
                                <img
                                    src="/ai_blueprint_analysis_1770762495522.png"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                    alt="AI Dominance"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#080a10] to-transparent" />
                                <div className="absolute bottom-6 right-6">
                                    <div className="px-5 py-2.5 bg-purple-600 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/20">
                                        <Zap size={16} className="text-white fill-white" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Active Ingestion</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Authority Strip */}
                <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 px-12 py-8 bg-white/5 border border-white/5 rounded-[2rem] backdrop-blur-xl">
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                            <ShieldCheck className="text-slate-400" />
                        </div>
                        <div>
                            <p className="text-sm font-black text-white uppercase italic tracking-widest">The "No-Guesswork" Protocol</p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Verification Layer 2.0 Enabled</p>
                        </div>
                    </div>
                    <div className="flex gap-12">
                        <div className="text-center">
                            <p className="text-2xl font-black text-white italic">0.02%</p>
                            <p className="text-[8px] text-slate-500 uppercase font-black tracking-[0.2em]">Error Rate</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-black text-white italic">24/7</p>
                            <p className="text-[8px] text-slate-500 uppercase font-black tracking-[0.2em]">Deployment</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TakeoffInevitability;

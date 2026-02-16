import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Zap, MessageSquare, Headphones } from 'lucide-react';

const TakeoffFuture: React.FC = () => {
    return (
        <section className="py-24 bg-[#05070a] border-y border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">

                    <div className="space-y-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
                            <Mic className="w-4 h-4 text-blue-400" />
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-300">FUTURE STACK PREVIEW</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white leading-none">
                            COMING NEXT:<br />
                            <span className="gradient-text italic text-blue-400">HANDS-FREE ESTIMATING.</span>
                        </h2>

                        <div className="space-y-4">
                            {[
                                "Ask questions on site",
                                "Log notes by voice",
                                "Trigger estimates without a laptop"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-5 p-5 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-blue-500/20 transition-all">
                                    <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                                        <MessageSquare className="text-blue-500" size={18} />
                                    </div>
                                    <p className="text-xl font-black text-slate-300 italic uppercase tracking-tight">{item}</p>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6">
                            <p className="text-lg md:text-xl font-black italic text-white uppercase tracking-tight opacity-40">
                                REVLO IS BUILDING THE CONTRACTOR OS.
                            </p>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-10 bg-blue-500/5 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative aspect-square glass-dark rounded-[4rem] border border-white/10 flex flex-col items-center justify-center space-y-8 overflow-hidden">
                            <div className="relative">
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl"
                                />
                                <div className="relative w-24 h-24 bg-blue-500/10 border border-blue-500/30 rounded-full flex items-center justify-center text-blue-400 shadow-[0_0_50px_rgba(59,130,246,0.2)]">
                                    <Headphones size={40} strokeWidth={3} />
                                </div>
                            </div>

                            <div className="text-center space-y-4 px-8">
                                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500/60 italic animate-pulse">VOICE ENGINE INITIALIZING...</p>
                                <h4 className="text-2xl font-black italic uppercase tracking-tight text-white">"AGENT, GENERATE ELECTRICAL QUOTE FOR 502 OAK ST."</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TakeoffFuture;

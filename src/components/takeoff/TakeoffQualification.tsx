import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, AlertCircle } from 'lucide-react';

const TakeoffQualification: React.FC = () => {
    return (
        <section className="py-24 bg-[#0a0c10] relative">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter text-white">
                        IS THIS FOR <span className="text-orange-500">YOUR CREW?</span>
                    </h2>
                    <p className="text-zinc-500 font-bold uppercase tracking-[0.4em] text-xs italic">WE AREN'T FOR EVERYONE. JUST THE ONES WHO WANT TO SCALE.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                    {/* For You */}
                    <div className="p-12 bg-[#0c1219] border border-orange-500/20 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] grayscale group-hover:opacity-[0.07] transition-all">
                            <Check size={150} className="text-orange-500" strokeWidth={4} />
                        </div>

                        <h3 className="text-xl md:text-2xl font-black italic uppercase tracking-widest text-white mb-10 border-b border-zinc-800 pb-6 italic">YES. DEPLOY TODAY IF:</h3>
                        <ul className="space-y-8 relative z-10">
                            {[
                                "You bid 2+ jobs every single week",
                                "You are tired of 2 A.M. estimating sessions",
                                "You want to grow without hiring a new estimator",
                                "You value precision and professional proposals"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4 text-zinc-300 text-lg md:text-xl font-black italic uppercase tracking-tight leading-tight">
                                    <div className="w-7 h-7 bg-orange-500/10 rounded-lg flex items-center justify-center border border-orange-500/30 shrink-0 mt-0.5">
                                        <Check className="text-orange-500" size={16} strokeWidth={4} />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Not For You */}
                    <div className="p-12 bg-zinc-900/50 border border-zinc-800 rounded-[3rem] opacity-60 group">
                        <h3 className="text-xl md:text-2xl font-black italic uppercase tracking-widest text-zinc-600 mb-10 border-b border-zinc-800 pb-6 italic">NO. PASS ON THIS IF:</h3>
                        <ul className="space-y-8 relative z-10">
                            {[
                                "You actually enjoy manual counts by hand",
                                "You only bid one small job a month",
                                "You don't care if you miss line items",
                                "You want to keep your business's revenue capped"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4 text-zinc-600 text-lg md:text-xl font-bold italic uppercase tracking-tight leading-tight">
                                    <div className="w-7 h-7 bg-zinc-800 rounded-lg flex items-center justify-center border border-zinc-700 shrink-0 mt-0.5">
                                        <X className="text-zinc-600" size={16} strokeWidth={4} />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-orange-500/5 border border-orange-500/10 rounded-full italic">
                        <AlertCircle size={14} className="text-orange-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 italic">Fair Warning: Speed is addictive. Once you use it, you never go back.</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TakeoffQualification;

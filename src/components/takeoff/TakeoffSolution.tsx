import React from 'react';
import { motion } from 'framer-motion';
import { Check, Briefcase } from 'lucide-react';

const TakeoffSolution: React.FC = () => {
    return (
        <section className="py-24 bg-[#020408] relative">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* RTL Image First on Mobile, Right on Desktop - wait user wants LTR RTL pattern */}
                    <div className="relative order-2 lg:order-1">
                        <div className="absolute -inset-10 bg-purple-600/5 rounded-3xl blur-[120px] opacity-20" />
                        <div className="relative aspect-square glass rounded-3xl p-8 overflow-hidden border border-white/10 shadow-2xl group">
                            <img
                                src="/estimating_dashboard_preview_1770761806008.png"
                                className="w-full h-full object-cover rounded-2xl opacity-60 group-hover:scale-110 transition-transform duration-1000 group-hover:opacity-100"
                                alt="Revlo Dashboard"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#020408] via-transparent to-transparent opacity-80" />
                        </div>
                    </div>

                    <div className="space-y-10 order-1 lg:order-2">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none text-white">
                                THIS REPLACES AN<br />
                                <span className="gradient-text italic">ESTIMATOR.</span>
                            </h2>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest italic">Not just a tool. A strategic asset.</p>
                        </div>

                        <div className="space-y-4">
                            {[
                                "No salary",
                                "No training",
                                "No sick days",
                                "No missed line items"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 group">
                                    <div className="w-8 h-8 bg-purple-500/10 rounded-full flex items-center justify-center border border-purple-500/20 group-hover:bg-purple-500/20 transition-all">
                                        <Check className="text-purple-400 w-4 h-4" />
                                    </div>
                                    <span className="text-xl md:text-2xl font-black text-white italic uppercase tracking-tight">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-3xl shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform pointer-events-none">
                                <Briefcase size={60} className="text-white" />
                            </div>
                            <p className="text-lg md:text-xl font-black italic text-white uppercase tracking-tight leading-relaxed relative z-10">
                                "Most contractors recover the cost in their <span className="text-purple-400">first won job.</span>"
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TakeoffSolution;

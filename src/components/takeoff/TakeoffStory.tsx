import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const TakeoffStory: React.FC = () => {
    return (
        <section className="py-24 bg-[#05070a] border-y border-white/5 relative">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-[120px]" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-16 items-center">

                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
                            <BookOpen className="w-4 h-4 text-blue-400" />
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-300">The Mission Manifest</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-6 leading-[0.9] text-white">
                            BUILT BY CONTRACTORS,<br />
                            <span className="gradient-text italic">NOT COUCH TECHIES.</span>
                        </h2>

                        <div className="space-y-6 text-slate-400 text-lg font-medium leading-relaxed italic">
                            <p>
                                I didn't build a software company. I built a weapon for the guys in the trucks, the ones who are tired of staying up late counting tiles.
                            </p>
                            <p className="text-white font-black uppercase tracking-tight text-sm">
                                THE TAKEOFF SYSTEM IS MY RESPONSE TO THE "ESTIMATING BOTTLENECK".
                            </p>
                            <p className="text-sm">
                                You're not just buying a tool; you're hiring an autonomous agent that works 24/7 to ensure your bids are accurate and your margins are protected.
                            </p>

                            <div className="pt-6">
                                <div className="inline-block px-6 py-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
                                        THE END OF MANUAL ESTIMATING.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-10 bg-blue-500/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative space-y-6">
                            <div className="relative h-[400px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0c12]">
                                <img
                                    src="/estimating_dashboard_preview_1770761806008.png"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] opacity-60 grayscale hover:grayscale-0"
                                    alt="Revlo Takeoff Intelligence"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020408] via-transparent to-transparent" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl backdrop-blur-md">
                                    <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Processing Speed</p>
                                    <p className="text-base font-black text-white italic uppercase tracking-tighter">UNDER 10 MINS</p>
                                </div>
                                <div className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl backdrop-blur-md">
                                    <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Reliability</p>
                                    <p className="text-base font-black text-white italic uppercase tracking-tighter">99.9% ACCURACY</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TakeoffStory;

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertTriangle, TrendingDown, Target } from 'lucide-react';

const TakeoffProblem: React.FC = () => {
    return (
        <section className="py-20 bg-[#020408] relative">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none text-white uppercase italic">
                                THE ESTIMATING<br />
                                <span className="text-red-600">BLOOD-BATH.</span>
                            </h2>
                            <p className="text-lg text-slate-400 leading-relaxed font-medium">
                                Manual takeoffs are the "silent killer" of construction margins. One missed socket, one miscounted joist, and your profit evaporates.
                            </p>
                        </div>

                        <div className="space-y-3">
                            {[
                                { icon: Clock, title: "15+ Hours Lost / Week", detail: "Burned on plans while your family sleeps." },
                                { icon: AlertTriangle, title: "12.4% Margin Leakage", detail: "The average cost of 'human error' in bidding." },
                                { icon: TrendingDown, title: "Velocity Bottleneck", detail: "If you can't bid fast, you can't grow. Period." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-5 bg-white/5 border border-white/5 rounded-2xl group hover:border-red-500/20 transition-all">
                                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-red-500/10 group-hover:border-red-500/20">
                                        <item.icon className="text-slate-400 group-hover:text-red-500" size={18} />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-black text-white italic uppercase tracking-tight">{item.title}</h4>
                                        <p className="text-xs text-slate-500 font-medium">{item.detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-10 bg-red-500/5 rounded-3xl blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity" />
                        <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                            <img
                                src="/stressed_contractor_night_1770761693628.png"
                                className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
                                alt="Manual Grind"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#020408] via-transparent to-transparent opacity-80" />

                            <div className="absolute bottom-8 left-8 right-8">
                                <div className="p-6 bg-black/80 backdrop-blur-2xl rounded-2xl border border-red-500/20 max-w-sm">
                                    <div className="flex gap-3 mb-2">
                                        <Target className="text-red-900" size={18} />
                                        <p className="text-[8px] font-black uppercase tracking-[0.3em] text-red-500 italic mt-0.5">Terminal Stress Event Observed</p>
                                    </div>
                                    <p className="text-sm font-bold text-white italic leading-relaxed">
                                        "I stayed up until 3 AM bidding this electrical package. If I missed a conduit run, I'm working for free."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TakeoffProblem;

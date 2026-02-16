import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, Moon, AlertOctagon, Ban } from 'lucide-react';

const TakeoffFailureTax: React.FC = () => {
    const losses = [
        { icon: Ban, label: "Lost bids to faster competitors" },
        { icon: AlertOctagon, label: "Underpriced jobs killing margin" },
        { icon: Moon, label: "Nights/weekends burned on takeoffs" },
        { icon: TrendingDown, label: "Growth capped by bandwidth" }
    ];

    return (
        <section className="py-24 bg-[#020408] relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[120px]" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="bg-red-500/5 border border-red-500/10 rounded-[3rem] p-8 md:p-20 overflow-hidden relative shadow-2xl">
                    <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                        <Ban size={250} className="text-red-500" />
                    </div>

                    <div className="max-w-3xl space-y-10">
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white leading-none">
                                WHAT SLOW ESTIMATES<br />
                                <span className="text-red-500">ACTUALLY COST YOU.</span>
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {losses.map((loss, i) => (
                                <div key={i} className="flex items-center gap-4 p-6 bg-black/40 border border-white/5 rounded-2xl group hover:border-red-500/20 transition-all">
                                    <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center border border-red-500/20">
                                        <loss.icon className="text-red-500" size={20} />
                                    </div>
                                    <p className="text-base font-black text-white italic uppercase tracking-tight">{loss.label}</p>
                                </div>
                            ))}
                        </div>

                        <div className="pt-8 space-y-6 border-t border-red-500/10 text-center md:text-left">
                            <p className="text-xl md:text-3xl font-black text-white italic leading-tight">
                                "If you bid slower than your competitors, you lose — <span className="text-red-500 underline decoration-red-500/40 decoration-2 underline-offset-4">even if you’re better.</span>"
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TakeoffFailureTax;

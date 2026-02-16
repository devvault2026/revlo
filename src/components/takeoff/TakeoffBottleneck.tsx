import React from 'react';
import { motion } from 'framer-motion';

const TakeoffBottleneck: React.FC = () => {
    return (
        <section className="py-24 bg-[#0a0b0e] border-y border-zinc-900/50 overflow-hidden text-left">
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="max-w-4xl"
                >
                    <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-20 leading-none">
                        WHAT SLOW ESTIMATES<br />
                        <span className="text-red-600">COST YOU.</span>
                    </h2>

                    <div className="space-y-6 mb-20">
                        {[
                            "Lost bids to faster contractors",
                            "Jobs priced too low because you rushed",
                            "Growth capped by how many nights you can stay up"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-6">
                                <div className="w-8 h-[2px] bg-red-900/30" />
                                <span className="text-xl md:text-3xl font-bold text-zinc-500 italic uppercase italic leading-none">{item}</span>
                            </div>
                        ))}
                    </div>

                    <div className="p-12 bg-red-600/5 border-l-4 border-red-600 rounded-r-2xl">
                        <p className="text-2xl md:text-4xl font-black text-white italic uppercase tracking-tighter italic leading-snug">
                            "If you bid slower than your competitors, you lose — <span className="text-red-500">even if you’re better.</span>"
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TakeoffBottleneck;

import React from 'react';
import { motion } from 'framer-motion';

const TakeoffSplitReality: React.FC = () => {
    return (
        <section className="py-24 bg-[#0c0d10] border-y border-zinc-900 overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-20 text-left"
                >
                    HERE'S THE DIFFERENCE
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-12 md:gap-24">
                    {/* Without Revlo */}
                    <div className="space-y-12">
                        <div className="space-y-2 border-b border-zinc-800 pb-6">
                            <h3 className="text-xl font-black uppercase text-red-500 italic tracking-[0.25em]">WITHOUT REVLO</h3>
                        </div>

                        <ul className="space-y-8">
                            {[
                                "Estimating at night",
                                "Rushing takeoffs",
                                "Missing line items",
                                "Underpricing jobs",
                                "Losing bids to speed"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-6 group">
                                    <div className="w-1.5 h-1.5 bg-red-900 rounded-full" />
                                    <span className="text-xl font-bold text-zinc-500 italic uppercase italic group-hover:text-zinc-300 transition-colors">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* With Revlo */}
                    <div className="space-y-12 md:border-l md:border-zinc-800 md:pl-24">
                        <div className="space-y-2 border-b border-zinc-800 pb-6">
                            <h3 className="text-xl font-black uppercase text-orange-500 italic tracking-[0.25em]">WITH REVLO</h3>
                        </div>

                        <ul className="space-y-8">
                            {[
                                "Upload plans once",
                                "Takeoff done for you",
                                "Clean quantities",
                                "Confident pricing",
                                "Bids sent same day"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-6 group">
                                    <div className="w-2.5 h-2.5 bg-orange-600 rounded-full shadow-[0_0_15px_rgba(234,88,12,0.4)]" />
                                    <span className="text-xl font-black text-white italic uppercase italic group-hover:text-orange-500 transition-colors transition-all duration-300">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TakeoffSplitReality;

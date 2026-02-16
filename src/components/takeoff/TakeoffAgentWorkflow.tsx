import React from 'react';
import { motion } from 'framer-motion';

const TakeoffAgentWorkflow: React.FC = () => {
    return (
        <section className="py-24 bg-[#0c0d10] border-t border-zinc-900 overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 text-left">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-20 leading-none"
                >
                    WHAT HAPPENS WHEN<br />
                    <span className="text-orange-600">YOU UPLOAD PLANS.</span>
                </motion.h2>

                <div className="space-y-20 max-w-4xl">
                    <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                        <span className="text-8xl font-black text-white/5 italic italic leading-none shrink-0">1.</span>
                        <div className="space-y-4">
                            <h3 className="text-3xl font-black italic uppercase italic text-white tracking-tight">You upload the plans</h3>
                            <p className="text-xl font-bold text-zinc-500 italic uppercase italic leading-relaxed">PDF or drawings — whatever you already have.</p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                        <span className="text-8xl font-black text-white/5 italic italic leading-none shrink-0">2.</span>
                        <div className="space-y-4">
                            <h3 className="text-3xl font-black italic uppercase italic text-white tracking-tight">Our estimating agent takes over</h3>
                            <p className="text-xl font-bold text-zinc-500 italic uppercase italic leading-relaxed">Measures walls, openings, rooms, and pulls all quantities into a clean document.</p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                        <span className="text-8xl font-black text-white/5 italic italic leading-none shrink-0">3.</span>
                        <div className="space-y-4">
                            <h3 className="text-3xl font-black italic uppercase italic text-white tracking-tight">You get a clean takeoff + draft estimate</h3>
                            <p className="text-xl font-bold text-zinc-500 italic uppercase italic leading-relaxed">Ready to review, adjust, and send to your client.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-24 inline-flex items-center gap-6 px-10 py-6 bg-zinc-900 border border-zinc-800 rounded-xl">
                    <div className="w-3 h-3 bg-orange-600 rounded-full animate-pulse shadow-[0_0_15px_rgba(234,88,12,0.4)]" />
                    <p className="text-xl font-black text-white italic uppercase italic tracking-tight">Most estimates come back in under 10 minutes.</p>
                </div>
            </div>
        </section>
    );
};

export default TakeoffAgentWorkflow;

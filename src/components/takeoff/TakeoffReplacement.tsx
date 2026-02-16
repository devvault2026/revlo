import React from 'react';
import { motion } from 'framer-motion';

const TakeoffReplacement: React.FC = () => {
    return (
        <section className="py-24 bg-[#0c0d10] overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 text-left">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl"
                >
                    <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-16 leading-none underline decoration-zinc-800 underline-offset-8">
                        THIS REPLACES AN ESTIMATOR.
                    </h2>

                    <div className="space-y-6 mb-24">
                        {[
                            "No salary",
                            "No training",
                            "No missed items",
                            "No burnout",
                            "No excuses"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-6 group">
                                <div className="w-1.5 h-1.5 bg-zinc-800 rounded-full group-hover:bg-orange-600 transition-colors" />
                                <span className="text-2xl md:text-3xl font-black text-zinc-400 italic uppercase italic group-hover:text-white transition-colors">{item}</span>
                            </div>
                        ))}
                    </div>

                    <div className="p-12 bg-zinc-900 border border-zinc-800 rounded-2xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <p className="text-2xl md:text-4xl font-black text-white italic uppercase tracking-tighter italic leading-snug">
                                Most contractors make back the monthly cost on their first won job.
                            </p>
                        </div>
                        {/* Gritty Industrial Texture in background */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05] pointer-events-none" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TakeoffReplacement;

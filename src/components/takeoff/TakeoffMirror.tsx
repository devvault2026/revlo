import React from 'react';
import { motion } from 'framer-motion';

const TakeoffMirror: React.FC = () => {
    return (
        <section className="py-24 bg-[#0a0b0e] border-t border-zinc-900 overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 text-left">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl"
                >
                    <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-16 underline decoration-orange-600/30 underline-offset-[12px]">
                        THIS IS WHAT ESTIMATING REALLY LOOKS LIKE
                    </h2>

                    <div className="space-y-4 mb-20">
                        {[
                            "On site all day",
                            "Home late",
                            "Kids already asleep",
                            "Laptop back open",
                            "Guessing quantities because you’re tired",
                            "Sending a bid you don’t feel great about"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-6">
                                <div className="w-8 h-[2px] bg-zinc-800" />
                                <span className="text-xl md:text-3xl font-bold text-zinc-400 italic uppercase italic leading-none">{item}</span>
                            </div>
                        ))}
                    </div>

                    <p className="text-2xl md:text-4xl font-black text-white italic uppercase tracking-tighter border-l-4 border-orange-600 pl-8 py-2">
                        This is where good contractors burn out.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default TakeoffMirror;

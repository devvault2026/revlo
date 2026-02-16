import React from 'react';
import { motion } from 'framer-motion';

const TakeoffRelief: React.FC = () => {
    return (
        <section className="py-24 bg-[#0a0b0e] overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 text-left">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl"
                >
                    <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-10 leading-none">
                        THIS IS NOT SOFTWARE<br />
                        <span className="text-zinc-600">YOU HAVE TO LEARN.</span>
                    </h2>

                    <div className="space-y-4 mb-16">
                        <p className="text-2xl font-bold text-zinc-500 italic uppercase italic leading-tight">
                            You don’t log in every day. <br />
                            You don’t configure anything. <br />
                            You don’t “learn AI.”
                        </p>
                    </div>

                    <div className="space-y-8 border-l-4 border-orange-600 pl-10 py-4">
                        <div className="space-y-2">
                            <p className="text-3xl font-black text-white italic uppercase italic">You upload plans.</p>
                            <p className="text-3xl font-black text-white italic uppercase italic">We send back the takeoff and estimate.</p>
                        </div>
                        <p className="text-xl font-black text-zinc-600 italic uppercase italic tracking-widest mt-8">That’s it.</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TakeoffRelief;

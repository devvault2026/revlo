import React from 'react';
import { motion } from 'framer-motion';

const Manifesto: React.FC = () => {
    return (
        <section className="relative min-h-[120vh] flex items-center justify-center bg-black overflow-hidden py-40">
            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1)_0%,transparent_70%)] opacity-50" />
                <motion.div
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 pointer-events-none"
                />
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 text-center space-y-24">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <div className="inline-block px-6 py-1.5 border border-white/10 rounded-none mb-4">
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-[1em]">The Revelation</span>
                    </div>

                    <h2 className="text-[clamp(2.5rem,8vw,8rem)] font-black uppercase leading-[0.85] tracking-tighter text-white">
                        THE FUTURE <br />
                        IS <span className="text-red-600">FULLY</span> <br />
                        AUTONOMOUS.
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-start text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="text-[10px] font-black text-red-600 uppercase tracking-widest">01 // THE PROBLEM</div>
                        <p className="text-2xl lg:text-4xl font-black text-white/40 uppercase leading-none tracking-tighter">
                            MANUAL SCALE <br /> IS <span className="text-white">EXTINCTION.</span>
                        </p>
                        <p className="text-base lg:text-lg text-slate-400 font-medium leading-relaxed">
                            Relying on human-intensive processes and manual effort is the baseline for failure. in 2026, if your business depends on "working harder," you have already lost.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="text-[10px] font-black text-red-600 uppercase tracking-widest">02 // THE SOLUTION</div>
                        <p className="text-2xl lg:text-4xl font-black text-white/40 uppercase leading-none tracking-tighter">
                            AUTONOMOUS <br /><span className="text-white">DOMINANCE.</span>
                        </p>
                        <p className="text-base lg:text-lg text-slate-400 font-medium leading-relaxed">
                            We deploy self-selling entities. Systems that detect, engage, and close without a single keystroke from you. Irrefutable elite performance at machine speed.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    viewport={{ once: true }}
                    className="pt-24 border-t border-white/5"
                >
                    <p className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter max-w-4xl mx-auto leading-[0.9]">
                        "MEDIOCRE IS DEAD. <br />
                        DEPLOYS THE <span className="gradient-text-alt pr-4">UNSTOPPABLE.</span>"
                    </p>
                </motion.div>
            </div>

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-grid-black" />
        </section>
    );
};

export default Manifesto;

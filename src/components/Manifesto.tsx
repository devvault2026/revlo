import React from 'react';
import { motion } from 'framer-motion';

const Manifesto: React.FC = () => {
    return (
        <section className="py-40 bg-white text-black relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <span className="text-[12px] font-black uppercase tracking-[0.5em] text-black/40">
                        The Revlo Manifesto
                    </span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl lg:text-7xl font-black font-display tracking-tight leading-[0.9] italic uppercase"
                >
                    MEDIOCRE IS <span className="bg-black text-white px-4">DEAD.</span>
                    <br />THE FUTURE IS
                    <br /><span className="text-red-600">IRREFUTABLE.</span> I AM THE EDGE.
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="mt-16 max-w-2xl mx-auto"
                >
                    <p className="text-xl lg:text-3xl font-bold leading-tight text-black/60">
                        In a world of noise, I provide the signal. I don't just build websites or agents; I build the absolute, undisputed standard for how your business should operate and scale in 2026.
                    </p>
                </motion.div>
            </div>

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-grid-black" />
        </section>
    );
};

export default Manifesto;

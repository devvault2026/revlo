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
                    SOFTWARE PROVIDES <span className="bg-black text-white px-4">TOOLS.</span>
                    <br />PARTNERS PROVIDE
                    <br /><span className="text-red-600">RESULTS.</span> WE ARE YOUR TEAM.
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="mt-16 max-w-2xl mx-auto"
                >
                    <p className="text-xl lg:text-3xl font-bold leading-tight text-black/60">
                        The AI revolution isn&apos;t about replacing humans—it&apos;s about empowering them.
                        We don&apos;t just sell you a platform; we join your mission as your dedicated AI growth department.
                    </p>
                </motion.div>
            </div>

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-grid-black" />
        </section>
    );
};

export default Manifesto;

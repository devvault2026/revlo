import React from 'react';
import { motion } from 'framer-motion';

const Results: React.FC = () => {
    const results = [
        {
            number: '347%',
            label: 'Average Growth',
            description: 'The standard revenue increase partners experience within the first 6 months of partnership.',
            color: 'text-purple-400',
        },
        {
            number: '40+',
            label: 'Hours Saved / Wk',
            description: 'I handle the repetitive grind of lead management and sales, giving you your time back to lead.',
            color: 'text-blue-400',
        },
        {
            number: '100%',
            label: 'Design Perfection',
            description: 'Elite, high-performance web architecture starting at $750. I build digital assets that outshine the top 1% of your niche.',
            color: 'text-red-400',
        },
        {
            number: 'Infinite',
            label: 'Scalability',
            description: 'Your growth is no longer limited by your headcount. I provide the leverage to scale to the moon.',
            color: 'text-purple-400',
        },
    ];

    return (
        <section id="results" className="py-32 bg-[#020408] relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <div className="inline-block px-4 py-2 glass rounded-full mb-8">
                        <span className="text-[10px] font-black text-purple-400 uppercase tracking-[0.4em]">
                            Performance Metrics
                        </span>
                    </div>

                    <h2 className="text-5xl lg:text-7xl font-black font-display mb-8 tracking-tighter italic">
                        TOTAL <span className="gradient-text-alt">DOMINANCE.</span>
                    </h2>

                    <p className="text-xl text-slate-400 leading-relaxed font-medium">
                        My systematic approach delivers results that aren't just incremental—they
                        are transformational. I build market leaders.
                    </p>
                </motion.div>

                {/* Results Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {results.map((result, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="h-full bg-white/5 backdrop-blur-3xl rounded-[32px] p-10 border border-white/5 hover:border-white/10 transition-all duration-300 relative overflow-hidden">
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                                    viewport={{ once: true }}
                                    className={`text-6xl lg:text-7xl font-black font-display mb-6 tracking-tighter italic ${result.color}`}
                                >
                                    {result.number}
                                </motion.div>

                                <h3 className="text-lg font-black mb-4 uppercase tracking-widest text-white italic">
                                    {result.label}
                                </h3>

                                <p className="text-slate-500 text-sm font-medium leading-relaxed group-hover:text-slate-300 transition-colors">
                                    {result.description}
                                </p>

                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-20 transition-opacity" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};


export default Results;

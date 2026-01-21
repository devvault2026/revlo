import React from 'react';
import { motion } from 'framer-motion';

const Results: React.FC = () => {
    const results = [
        {
            number: '7+',
            label: 'Figure ARR Scaling',
            description: 'Consistent track record of taking businesses from low revenue to 7-figure annual recurring revenue and beyond.',
            gradient: 'text-purple-600',
        },
        {
            number: '40+',
            label: 'Years Combined Experience',
            description: 'Decades of expertise across all marketing channels, industries, and growth tactics working for you.',
            gradient: 'text-red-600',
        },
        {
            number: '24/7',
            label: 'AI Automation',
            description: 'Enterprise-grade AI systems that never sleep, continuously optimizing and scaling your operations.',
            gradient: 'text-blue-600',
        },
        {
            number: '100%',
            label: 'In-House Team',
            description: 'No outsourcing. No contractors. Full-stack expertise under one roof, dedicated to your success.',
            gradient: 'text-purple-600',
        },
    ];

    return (
        <section id="results" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200 rounded-full mb-6">
                        <span className="text-sm font-bold text-purple-700 uppercase tracking-wide">
                            Proven Track Record
                        </span>
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-black font-display mb-6">
                        Scale to <span className="gradient-text-alt">7-Figure ARR</span>
                    </h2>

                    <p className="text-xl text-slate-600 leading-relaxed">
                        Not a pipe dream. Our systematic approach consistently delivers results that
                        transform businesses and create lasting market dominance.
                    </p>
                </motion.div>

                {/* Results Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {results.map((result, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -4 }}
                        >
                            <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-xl transition-all duration-300 text-center">
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                                    viewport={{ once: true }}
                                    className={`text-6xl font-black font-display mb-4 ${result.gradient}`}
                                >
                                    {result.number}
                                </motion.div>

                                <h3 className="text-lg font-bold mb-4">
                                    {result.label}
                                </h3>

                                <p className="text-slate-600 leading-relaxed">
                                    {result.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Results;

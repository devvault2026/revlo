import React from 'react';
import { motion } from 'framer-motion';
import { Search, Database, BarChart3, FileText, MessageSquare, Zap, Calendar } from 'lucide-react';

const RevloOS: React.FC = () => {
    const features = [
        {
            icon: <Search className="w-7 h-7" />,
            title: 'Intelligent Sourcing',
            description: 'AI-powered lead discovery across multiple channels. Revlo OS identifies your ideal prospects before your competitors even know they exist.',
            gradient: 'from-purple-500 to-purple-400',
        },
        {
            icon: <Database className="w-7 h-7" />,
            title: 'Data Enrichment',
            description: 'Transform basic contact info into comprehensive profiles. Every lead comes with behavioral data, intent signals, and actionable insights.',
            gradient: 'from-red-500 to-red-400',
        },
        {
            icon: <BarChart3 className="w-7 h-7" />,
            title: 'Competitor Analysis',
            description: 'Cross-reference your prospects with competitor data. Know exactly what\'s working in your market and position yourself strategically.',
            gradient: 'from-blue-500 to-blue-400',
        },
        {
            icon: <FileText className="w-7 h-7" />,
            title: 'Asset Creation',
            description: 'Automatically generate personalized outreach assets, email sequences, and content tailored to each prospect\'s pain points and interests.',
            gradient: 'from-purple-500 to-purple-400',
        },
        {
            icon: <MessageSquare className="w-7 h-7" />,
            title: 'Agent Nurturing',
            description: 'AI agents handle inbound and outbound communication. Smart follow-ups, objection handling, and meeting scheduling—all automated.',
            gradient: 'from-red-500 to-red-400',
        },
        {
            icon: <Zap className="w-7 h-7" />,
            title: 'Omnichannel Outreach',
            description: 'Coordinate email, SMS, LinkedIn, and more from one platform. Revlo OS ensures consistent messaging and perfect timing across all touchpoints.',
            gradient: 'from-blue-500 to-blue-400',
        },
    ];

    const scrollToContact = () => {
        const element = document.getElementById('contact');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="revlo-os" className="py-24 bg-slate-50">
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
                            Proprietary Technology
                        </span>
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-black font-display mb-6">
                        Introducing <span className="gradient-text">Revlo OS</span>
                    </h2>

                    <p className="text-xl text-slate-600 leading-relaxed">
                        The engine behind agencies. Our in-house AI-powered operating system that sources,
                        enriches, analyzes, and automates your entire growth stack.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -4 }}
                            className="group"
                        >
                            <div className="h-full bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-xl transition-all duration-300">
                                <div className={`inline-flex p-3.5 bg-gradient-to-br ${feature.gradient} rounded-xl text-white shadow-lg mb-6`}>
                                    {feature.icon}
                                </div>

                                <h3 className="text-xl font-bold mb-4">
                                    {feature.title}
                                </h3>

                                <p className="text-slate-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-2xl p-12 flex flex-col md:flex-row items-center justify-between gap-8"
                >
                    <div className="flex-1">
                        <h3 className="text-3xl font-black font-display mb-4">
                            Ready to See Revlo OS in Action?
                        </h3>
                        <p className="text-lg text-slate-700 leading-relaxed">
                            Schedule a personalized demo and discover how our proprietary technology can
                            transform your agency's operations.
                        </p>
                    </div>

                    <motion.button
                        onClick={scrollToContact}
                        className="group px-8 py-4 bg-gradient-rainbow text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Schedule Demo
                        <Calendar className="w-5 h-5" />
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default RevloOS;

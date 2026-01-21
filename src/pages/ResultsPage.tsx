import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Clock, DollarSign, Award, Target, Zap, BarChart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ResultsPage: React.FC = () => {
    const mainResults = [
        {
            number: '7+',
            label: 'Figure ARR Scaling',
            description: 'Consistent track record of taking businesses from low revenue to 7-figure annual recurring revenue and beyond.',
            gradient: 'text-purple-600',
            icon: <DollarSign className="w-12 h-12" />,
        },
        {
            number: '40+',
            label: 'Years Combined Experience',
            description: 'Decades of expertise across all marketing channels, industries, and growth tactics working for you.',
            gradient: 'text-red-600',
            icon: <Award className="w-12 h-12" />,
        },
        {
            number: '24/7',
            label: 'AI Automation',
            description: 'Enterprise-grade AI systems that never sleep, continuously optimizing and scaling your operations.',
            gradient: 'text-blue-600',
            icon: <Zap className="w-12 h-12" />,
        },
        {
            number: '100%',
            label: 'In-House Team',
            description: 'No outsourcing. No contractors. Full-stack expertise under one roof, dedicated to your success.',
            gradient: 'text-purple-600',
            icon: <Users className="w-12 h-12" />,
        },
    ];

    const detailedMetrics = [
        {
            category: 'Revenue Growth',
            icon: <TrendingUp className="w-8 h-8" />,
            gradient: 'from-purple-500 to-purple-400',
            stats: [
                { metric: 'Average Revenue Increase', value: '347%', period: 'First 12 months' },
                { metric: 'Client Retention Rate', value: '94%', period: 'Year over year' },
                { metric: 'Portfolio Companies at 7-Figs', value: '20+', period: 'And counting' },
                { metric: 'Total Client Revenue Generated', value: '$500M+', period: 'Lifetime' },
            ],
        },
        {
            category: 'Lead Generation',
            icon: <Target className="w-8 h-8" />,
            gradient: 'from-red-500 to-red-400',
            stats: [
                { metric: 'Leads Generated Monthly', value: '10K+', period: 'Per client average' },
                { metric: 'Lead-to-Customer Rate', value: '40%', period: 'Qualified leads' },
                { metric: 'Cost Per Lead Reduction', value: '65%', period: 'vs. industry avg' },
                { metric: 'Total Leads Delivered', value: '500K+', period: 'All-time' },
            ],
        },
        {
            category: 'Marketing Performance',
            icon: <BarChart className="w-8 h-8" />,
            gradient: 'from-blue-500 to-blue-400',
            stats: [
                { metric: 'Average ROAS', value: '8.5X', period: 'Across all channels' },
                { metric: 'Conversion Rate Improvement', value: '3X', period: 'Average increase' },
                { metric: 'Ad Spend Managed', value: '$50M+', period: 'Lifetime' },
                { metric: 'Campaign Success Rate', value: '92%', period: 'Hit or exceed goals' },
            ],
        },
        {
            category: 'Operational Efficiency',
            icon: <Clock className="w-8 h-8" />,
            gradient: 'from-purple-500 to-purple-400',
            stats: [
                { metric: 'Time to First Sale', value: '-60%', period: 'Reduction' },
                { metric: 'Operational Cost Savings', value: '55%', period: 'Through automation' },
                { metric: 'Sales Cycle Reduction', value: '45%', period: 'Average' },
                { metric: 'Team Productivity Increase', value: '300%', period: 'With AI tools' },
            ],
        },
    ];

    const caseStudies = [
        {
            industry: 'SaaS',
            challenge: 'Struggling at $80K MRR with high churn and expensive CAC',
            solution: 'Implemented AI-driven lead gen + retention automation',
            results: [
                '$1.2M MRR in 18 months',
                'CAC reduced by 70%',
                'Churn decreased from 8% to 2%',
                'Profitability increased 5X',
            ],
            gradient: 'from-purple-500 to-purple-400',
        },
        {
            industry: 'E-commerce',
            challenge: 'Plateaued at $2M annual revenue, poor ad performance',
            solution: 'Complete ad strategy overhaul + conversion optimization',
            results: [
                '$8M annual revenue in 12 months',
                'ROAS improved from 2X to 12X',
                'Customer LTV increased 300%',
                'Expanded to 3 new markets',
            ],
            gradient: 'from-red-500 to-red-400',
        },
        {
            industry: 'Professional Services',
            challenge: 'Inconsistent pipeline, relying on referrals only',
            solution: 'Built automated outbound system + content marketing',
            results: [
                'Consistent 50+ qualified leads/month',
                'Went from 0 to $3M ARR',
                'Close rate improved to 85%',
                'Scaled team from 3 to 25',
            ],
            gradient: 'from-blue-500 to-blue-400',
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-white pt-32 pb-20"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-4xl mx-auto mb-20"
                >
                    <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200 rounded-full mb-6">
                        <span className="text-sm font-bold text-purple-700 uppercase tracking-wide">
                            Proven Track Record
                        </span>
                    </div>

                    <h1 className="text-5xl lg:text-6xl font-black font-display mb-6">
                        Scale to <span className="gradient-text-alt">7-Figure ARR</span>
                    </h1>

                    <p className="text-xl text-slate-600 leading-relaxed">
                        Not a pipe dream. Our systematic approach consistently delivers results that
                        transform businesses and create lasting market dominance. The numbers speak for themselves.
                    </p>
                </motion.div>

                {/* Main Results Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {mainResults.map((result, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -4 }}
                        >
                            <div className="bg-slate-50 rounded-2xl p-8 border-2 border-slate-200 hover:shadow-xl transition-all duration-300 text-center h-full">
                                <div className={`${result.gradient} mb-4 inline-block`}>
                                    {result.icon}
                                </div>
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

                {/* Detailed Metrics */}
                <div className="mb-20">
                    <h2 className="text-3xl font-black font-display text-center mb-12">
                        Detailed <span className="gradient-text">Performance Metrics</span>
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {detailedMetrics.map((category, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-slate-50 rounded-2xl p-8 border-2 border-slate-200 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`p-3 bg-gradient-to-br ${category.gradient} rounded-xl text-white`}>
                                        {category.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold">{category.category}</h3>
                                </div>

                                <div className="space-y-4">
                                    {category.stats.map((stat, i) => (
                                        <div key={i} className="bg-white rounded-xl p-4 border border-slate-200">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-semibold text-slate-600">{stat.metric}</span>
                                                <span className="text-2xl font-black gradient-text">{stat.value}</span>
                                            </div>
                                            <div className="text-xs text-slate-500">{stat.period}</div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Case Studies */}
                <div className="mb-20">
                    <h2 className="text-3xl font-black font-display text-center mb-12">
                        Real <span className="gradient-text-alt">Case Studies</span>
                    </h2>

                    <div className="space-y-8">
                        {caseStudies.map((study, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-slate-50 rounded-2xl p-8 lg:p-10 border-2 border-slate-200 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="grid lg:grid-cols-3 gap-8">
                                    <div>
                                        <div className={`inline-block px-4 py-2 bg-gradient-to-br ${study.gradient} text-white rounded-lg font-bold mb-4`}>
                                            {study.industry}
                                        </div>
                                        <h3 className="text-xl font-bold mb-4">The Challenge</h3>
                                        <p className="text-slate-600 leading-relaxed mb-6">{study.challenge}</p>
                                        <h3 className="text-xl font-bold mb-4">Our Solution</h3>
                                        <p className="text-slate-600 leading-relaxed">{study.solution}</p>
                                    </div>

                                    <div className="lg:col-span-2">
                                        <h3 className="text-xl font-bold mb-6">The Results</h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {study.results.map((result, i) => (
                                                <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-slate-200">
                                                    <div className={`p-2 bg-gradient-to-br ${study.gradient} rounded-lg text-white flex-shrink-0`}>
                                                        <TrendingUp className="w-5 h-5" />
                                                    </div>
                                                    <span className="text-slate-700 font-semibold">{result}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-3xl p-12 text-center"
                >
                    <h2 className="text-4xl font-black font-display mb-6">
                        Ready to Become Our Next Success Story?
                    </h2>
                    <p className="text-xl text-slate-700 mb-8 max-w-2xl mx-auto">
                        Join the growing list of businesses we've scaled to 7-figure ARR and beyond.
                        Your transformation starts with a conversation.
                    </p>
                    <Link to="/contact">
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gradient-rainbow text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-2"
                        >
                            Start Your Growth Journey
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ResultsPage;

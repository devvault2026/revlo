import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Clock, DollarSign, Award, Target, Zap, BarChart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ResultsPage: React.FC = () => {
    const mainResults = [
        {
            number: '347%',
            label: 'AVERAGE REVENUE GROWTH',
            description: 'The standard revenue increase partners experience within the first 6 months of partnership.',
            gradient: 'text-purple-400',
            icon: <TrendingUp className="w-12 h-12" />,
        },
        {
            number: '15+',
            label: 'YEARS EXPERTISE',
            description: 'Over 15 years of deep expertise in business strategy, operations, and customer acquisition systems.',
            gradient: 'text-red-400',
            icon: <Award className="w-12 h-12" />,
        },
        {
            number: '24/7',
            label: 'MANAGED OPERATIONS',
            description: 'AI-driven systems that manage your sales and support round-the-clock while you focus on vision.',
            gradient: 'text-blue-400',
            icon: <Zap className="w-12 h-12" />,
        },
        {
            number: '100%',
            label: 'DEDICATED PARTNER',
            description: 'No outsourcing. You work directly with The Architect on every aspect of your growth.',
            gradient: 'text-purple-400',
            icon: <Users className="w-12 h-12" />,
        },
    ];

    const detailedMetrics = [
        {
            category: 'Revenue & Growth',
            icon: <TrendingUp className="w-8 h-8" />,
            gradient: 'from-purple-500/20 to-purple-400/20',
            color: 'text-purple-400',
            stats: [
                { metric: 'Avg Revenue Velocity', value: '+347%', period: 'ANNUALIZED' },
                { metric: 'Partner Retention Rate', value: '94%', period: 'YOY' },
                { metric: '7-Fig Success Stories', value: '20+', period: 'VERIFIED' },
                { metric: 'Total Partner Revenue', value: '$500M+', period: 'CUMULATIVE' },
            ],
        },
        {
            category: 'Customer Acquisition',
            icon: <Target className="w-8 h-8" />,
            gradient: 'from-red-500/20 to-red-400/20',
            color: 'text-red-400',
            stats: [
                { metric: 'Monthly Intent Leads', value: '10K+', period: 'AVERAGE' },
                { metric: 'Lead-to-Call Rate', value: '40%', period: 'QUALIFIED' },
                { metric: 'Acquisition Cost Reduction', value: '-65%', period: 'VS INDUSTRY' },
                { metric: 'Total Leads Generated', value: '500K+', period: 'ALL-TIME' },
            ],
        },
        {
            category: 'Sales Performance',
            icon: <BarChart className="w-8 h-8" />,
            gradient: 'from-blue-500/20 to-blue-400/20',
            color: 'text-blue-400',
            stats: [
                { metric: 'Average ROAS', value: '8.5X', period: 'OMNI-CHANNEL' },
                { metric: 'Conversion Lift', value: '3X', period: 'AVERAGE' },
                { metric: 'Ad Spend Managed', value: '$50M+', period: 'TOTAL' },
                { metric: 'System Efficiency', value: '92%', period: 'ACTIVE' },
            ],
        },
        {
            category: 'Process Efficiency',
            icon: <Clock className="w-8 h-8" />,
            gradient: 'from-purple-500/20 to-purple-400/20',
            color: 'text-purple-400',
            stats: [
                { metric: 'Time Saved per Week', value: '40+', period: 'PARTNER AVERAGE' },
                { metric: 'Operational Overhead', value: '-55%', period: 'VIA AI' },
                { metric: 'Sales Cycle Speed', value: '+45%', period: 'VELOCITY LIFT' },
                { metric: 'Employee Productivity', value: '300%', period: 'LEVERAGE' },
            ],
        },
    ];

    const caseStudies = [
        {
            industry: 'SaaS PARTNERSHIP',
            challenge: 'Struggling at $80K MRR with high churn and expensive acquisition costs.',
            solution: 'Implemented AI-driven lead nurturing and customer retention systems.',
            results: [
                '$1.2M MRR in 18 months',
                'CAC reduced by 70%',
                'Churn decreased to 2%',
                'Profitability increased 5X',
            ],
            gradient: 'from-purple-500/20 to-purple-400/20',
        },
        {
            industry: 'E-COMMERCE SCALE',
            challenge: 'Plateaued at $2M annual revenue with poor ad performance and inconsistent flow.',
            solution: 'Complete ad strategy overhaul combined with AI-driven conversion optimization.',
            results: [
                '$8M annual revenue in 12 months',
                'ROAS improved to 12X',
                'Customer LTV increased 300%',
                'International market expansion',
            ],
            gradient: 'from-red-500/20 to-red-400/20',
        },
        {
            industry: 'PROFESSIONAL SERVICES',
            challenge: 'Inconsistent pipeline and relying solely on manual referrals and word of mouth.',
            solution: 'Built an automated outbound system combined with strategic content marketing.',
            results: [
                '50+ Qualified Leads/Month',
                'Zero to $3M ARR Scaling',
                'Close Rate 85% Efficiency',
                'Operational Scaling Success',
            ],
            gradient: 'from-blue-500/20 to-blue-400/20',
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-[#020408] pt-40 pb-20 relative overflow-hidden"
        >
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-grid-white opacity-5 pointer-events-none" />
            <div className="absolute top-[20%] left-[10%] w-[50%] h-[50%] bg-purple-900/10 blur-[150px] rounded-full" />
            <div className="absolute bottom-[20%] right-[10%] w-[50%] h-[50%] bg-blue-900/10 blur-[150px] rounded-full" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-4xl mx-auto mb-32"
                >
                    <div className="inline-block px-4 py-2 glass rounded-full mb-8">
                        <span className="text-[10px] font-black text-purple-400 uppercase tracking-[0.4em]">
                            Performance Data
                        </span>
                    </div>

                    <h1 className="text-6xl lg:text-8xl font-black font-display mb-10 tracking-tighter italic text-white leading-tight">
                        PARTNER <span className="gradient-text-alt">SUCCESS.</span>
                    </h1>

                    <p className="text-xl text-slate-400 leading-relaxed font-medium">
                        My results aren&apos;t just numbers on a screen. They represent real businesses
                        transformed through strategic partnership and elite execution.
                    </p>
                </motion.div>

                {/* Main Results Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-40">
                    {mainResults.map((result, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="bg-white/5 backdrop-blur-3xl rounded-[32px] p-8 border border-white/5 hover:border-white/20 transition-all duration-500 text-center h-full relative overflow-hidden flex flex-col items-center">
                                <div className="absolute top-0 right-0 p-4">
                                    <div className="text-[8px] font-black text-slate-700 uppercase tracking-[0.3em]">METRIC {index + 1}</div>
                                </div>

                                <div className={`${result.gradient} mb-8 inline-block group-hover:scale-110 transition-transform duration-500`}>
                                    {result.icon}
                                </div>
                                <div className={`text-5xl font-black font-display mb-4 ${result.gradient} tracking-tighter italic`}>
                                    {result.number}
                                </div>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-6">
                                    {result.label}
                                </h3>
                                <p className="text-slate-500 text-xs font-medium leading-relaxed">
                                    {result.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Detailed Metrics */}
                <div className="mb-40">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl lg:text-6xl font-black font-display italic text-white tracking-tighter uppercase mb-6">
                            PERFORMANCE <span className="gradient-text-alt">BENCHMARKS</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                        {detailedMetrics.map((category, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="bg-white/5 backdrop-blur-3xl rounded-[48px] p-10 border border-white/5 group"
                            >
                                <div className="flex items-center gap-6 mb-12">
                                    <div className={`p-4 glass rounded-2xl ${category.color} border border-white/10`}>
                                        {category.icon}
                                    </div>
                                    <h3 className="text-2xl font-black font-display italic text-white uppercase tracking-tight">{category.category}</h3>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    {category.stats.map((stat, i) => (
                                        <div key={i} className="glass rounded-2xl p-6 border border-white/5 hover:border-white/20 transition-all group/item">
                                            <div className="text-[8px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4">{stat.period}</div>
                                            <div className="text-3xl font-black font-display italic text-white mb-2 group-hover:scale-110 transition-transform origin-left">{stat.value}</div>
                                            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.metric}</div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Case Studies */}
                <div className="mb-40">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl lg:text-6xl font-black font-display italic text-white tracking-tighter uppercase mb-6">
                            SUCCESS <span className="gradient-text-alt">STORIES</span>
                        </h2>
                    </div>

                    <div className="space-y-12">
                        {caseStudies.map((study, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="bg-white/5 backdrop-blur-3xl rounded-[48px] p-12 lg:p-16 border border-white/5 relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 p-12">
                                    <div className="text-[10px] font-black text-slate-700 uppercase tracking-[0.5em]">PARTNER ID: {1000 + index}</div>
                                </div>

                                <div className="grid lg:grid-cols-3 gap-16 relative z-10">
                                    <div>
                                        <div className="inline-block px-4 py-2 glass border border-white/10 text-white rounded-lg text-[10px] font-black uppercase tracking-[0.4em] mb-8 italic">
                                            {study.industry}
                                        </div>
                                        <div className="space-y-8">
                                            <div>
                                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-4">STARTING CHALLENGE</h3>
                                                <p className="text-white font-black italic tracking-tight">{study.challenge}</p>
                                            </div>
                                            <div>
                                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-500 mb-4">THE STRATEGY</h3>
                                                <p className="text-slate-400 font-medium text-sm leading-relaxed">{study.solution}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="lg:col-span-2">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-green-500 mb-8">PARTNERSHIP OUTCOMES</h3>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            {study.results.map((result, i) => (
                                                <div key={i} className="flex items-center gap-6 p-6 glass rounded-2xl border border-white/5 hover:border-white/20 transition-all">
                                                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                                                        <TrendingUp className="w-5 h-5 text-green-400" />
                                                    </div>
                                                    <span className="text-white text-[12px] font-black uppercase tracking-widest">{result}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative group"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-[100px] opacity-30 group-hover:opacity-60 transition-opacity" />

                    <div className="bg-white/5 backdrop-blur-3xl border border-white/5 rounded-[64px] p-16 lg:p-24 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-grid-white opacity-5" />

                        <div className="relative z-10 max-w-4xl mx-auto">
                            <h2 className="text-5xl lg:text-7xl font-black font-display mb-10 tracking-tighter italic text-white leading-tight">
                                BE THE NEXT <span className="gradient-text-alt">SUCCESS STORY.</span>
                            </h2>
                            <p className="text-xl text-slate-400 mb-12 font-medium">
                                Join the elite circle of businesses I&apos;ve scaled to 7-figure revenue and beyond.
                                Your growth journey starts with a simple conversation.
                            </p>
                            <Link to="/contact">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-12 py-6 bg-white text-black text-[12px] font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-slate-200 transition-all duration-300 flex items-center gap-4 mx-auto italic"
                                >
                                    BOOK YOUR STRATEGY CALL
                                    <ArrowRight className="w-5 h-5" />
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ResultsPage;

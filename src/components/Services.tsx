import React from 'react';
import { motion } from 'framer-motion';
import { Layers, TrendingUp, Cpu, Users, Briefcase, DollarSign } from 'lucide-react';

const Services: React.FC = () => {
    const services = [
        {
            icon: <Layers className="w-8 h-8" />,
            title: 'Brand Identity & Growth Hacking',
            description: 'Guerrilla growth tactics that explode your brand\'s visibility. Strategic positioning, viral campaigns, and unconventional marketing that gets you noticed.',
            features: [
                'Brand Strategy & Positioning',
                'Guerrilla Marketing Campaigns',
                'Viral Content Creation',
                'Community Building',
            ],
            gradient: 'from-purple-500 to-purple-400',
            shadow: 'shadow-purple',
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: 'Ads & Media Buying',
            description: 'Strategic ad campaigns across all channels. We optimize every dollar to deliver maximum ROI and scale your acquisition exponentially.',
            features: [
                'Multi-Channel Ad Campaigns',
                'Performance Optimization',
                'Advanced Audience Targeting',
                'Creative Testing & Iteration',
            ],
            gradient: 'from-red-500 to-red-400',
            shadow: 'shadow-red',
        },
        {
            icon: <Cpu className="w-8 h-8" />,
            title: 'AI Infrastructure & Automation',
            description: 'Enterprise-grade AI systems working in perfect symbiosis. Automated outreach, nurturing, and conversion systems that never sleep.',
            features: [
                'Custom AI Agent Development',
                'Automated Lead Nurturing',
                'Multi-Channel Outreach',
                'Intelligent CRM Integration',
            ],
            gradient: 'from-blue-500 to-blue-400',
            shadow: 'shadow-blue',
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: 'Strategic Lead Generation',
            description: 'Targeted multi-channel campaigns that fill your pipeline with qualified leads. We know the strategic channels to manipulate for perfect outcomes.',
            features: [
                'Omnichannel Outreach',
                'Advanced Data Enrichment',
                'Competitor Analysis',
                'Precision Targeting',
            ],
            gradient: 'from-purple-500 to-purple-400',
            shadow: 'shadow-purple',
        },
        {
            icon: <Briefcase className="w-8 h-8" />,
            title: 'Sales Infrastructure',
            description: 'Airtight sales systems with comprehensive documentation, client VOCs, and data-rich profiles that ensure nothing is left out.',
            features: [
                'Sales Process Optimization',
                'Client Voice of Customer Analysis',
                'Comprehensive Documentation',
                'Performance Analytics',
            ],
            gradient: 'from-red-500 to-red-400',
            shadow: 'shadow-red',
        },
        {
            icon: <DollarSign className="w-8 h-8" />,
            title: 'Revenue Optimization',
            description: 'Data-driven strategies to maximize every revenue stream. We optimize funnels, pricing, upsells, and lifetime value for exponential growth.',
            features: [
                'Conversion Rate Optimization',
                'Funnel Analysis & Refinement',
                'Pricing Strategy',
                'Lifetime Value Maximization',
            ],
            gradient: 'from-blue-500 to-blue-400',
            shadow: 'shadow-blue',
        },
    ];

    return (
        <section id="services" className="py-24 bg-slate-50">
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
                            What We Do
                        </span>
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-black font-display mb-6">
                        End-to-End <span className="gradient-text">Brand Takeover</span>
                    </h2>

                    <p className="text-xl text-slate-600 leading-relaxed">
                        We literally take your low-revenue producing assets and scale them behind the scenes
                        to the numbers you imagined in a perfect world.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8 }}
                            className="group"
                        >
                            <div className={`h-full bg-white rounded-2xl p-8 border border-slate-200 hover:border-transparent hover:${service.shadow} transition-all duration-300`}>
                                {/* Icon */}
                                <div className={`inline-flex p-4 bg-gradient-to-br ${service.gradient} rounded-xl text-white shadow-lg mb-6`}>
                                    {service.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold mb-4 group-hover:gradient-text transition-all">
                                    {service.title}
                                </h3>

                                {/* Description */}
                                <p className="text-slate-600 leading-relaxed mb-6">
                                    {service.description}
                                </p>

                                {/* Features */}
                                <ul className="space-y-2">
                                    {service.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-start gap-2 text-sm text-slate-600">
                                            <span className="text-purple-600 font-bold mt-0.5">✓</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, TrendingUp, Cpu, Users, Briefcase, DollarSign, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesPage: React.FC = () => {
    const services = [
        {
            icon: <Layers className="w-8 h-8" />,
            title: 'Brand Identity & Growth Hacking',
            shortDesc: 'Guerrilla growth tactics that explode your brand\'s visibility.',
            description: 'We don\'t just build brands—we engineer viral movements. Our guerrilla growth hacking approach combines unconventional marketing tactics with strategic positioning to create explosive brand awareness. From viral campaigns to community-driven growth, we position your brand where it matters most.',
            features: [
                'Brand Strategy & Positioning',
                'Guerrilla Marketing Campaigns',
                'Viral Content Creation',
                'Community Building',
                'Brand Voice Development',
                'Competitive Differentiation',
                'Social Media Strategy',
                'Influencer Partnerships',
            ],
            gradient: 'from-purple-500 to-purple-400',
            shadow: 'shadow-purple',
            benefits: [
                'Stand out in crowded markets',
                'Create memorable brand experiences',
                'Build passionate communities',
                'Generate organic word-of-mouth growth',
            ],
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: 'Ads & Media Buying',
            shortDesc: 'Strategic ad campaigns that maximize ROI across all channels.',
            description: 'Every dollar matters. Our performance-driven media buying approach combines deep platform expertise with continuous optimization to deliver exceptional returns. We don\'t just run ads—we engineer acquisition systems that scale profitably.',
            features: [
                'Multi-Channel Ad Campaigns',
                'Performance Optimization',
                'Advanced Audience Targeting',
                'Creative Testing & Iteration',
                'Conversion Rate Optimization',
                'Attribution Modeling',
                'Budget Management',
                'Real-time Analytics',
            ],
            gradient: 'from-red-500 to-red-400',
            shadow: 'shadow-red',
            benefits: [
                '5-10X ROAS consistently',
                'Rapid scaling without quality loss',
                'Data-driven creative decisions',
                'Predictable customer acquisition costs',
            ],
        },
        {
            icon: <Cpu className="w-8 h-8" />,
            title: 'AI Infrastructure & Automation',
            shortDesc: 'Enterprise-grade AI systems that work 24/7 for your business.',
            description: 'Welcome to the future of business operations. Our custom AI infrastructure works in perfect symbiosis with your team, automating complex workflows, personalizing customer interactions, and scaling your operations without adding headcount.',
            features: [
                'Custom AI Agent Development',
                'Automated Lead Nurturing',
                'Multi-Channel Outreach',
                'Intelligent CRM Integration',
                'Predictive Analytics',
                'Personalization Engine',
                'Workflow Automation',
                'Performance Monitoring',
            ],
            gradient: 'from-blue-500 to-blue-400',
            shadow: 'shadow-blue',
            benefits: [
                'Never miss a follow-up',
                'Personalized at scale',
                'Reduce operational costs by 60%',
                'Increase conversion rates by 3X',
            ],
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: 'Strategic Lead Generation',
            shortDesc: 'Fill your pipeline with qualified, ready-to-convert prospects.',
            description: 'We know the channels. We know the tactics. Our omnichannel lead generation system fills your pipeline with prospects who are already primed to convert. Through strategic channel manipulation and advanced targeting, we deliver quality over quantity.',
            features: [
                'Omnichannel Outreach',
                'Advanced Data Enrichment',
                'Competitor Analysis',
                'Precision Targeting',
                'Lead Scoring',
                'Intent Signal Detection',
                'Multi-Touch Campaigns',
                'Pipeline Analytics',
            ],
            gradient: 'from-purple-500 to-purple-400',
            shadow: 'shadow-purple',
            benefits: [
                '10K+ qualified leads per month',
                '40% higher conversion rates',
                'Reduced sales cycle time',
                'Predictable revenue pipeline',
            ],
        },
        {
            icon: <Briefcase className="w-8 h-8" />,
            title: 'Sales Infrastructure',
            shortDesc: 'Airtight systems with comprehensive documentation and intelligence.',
            description: 'Sales shouldn\'t be an art—it should be a science. We build systematic, data-rich sales infrastructures that ensure nothing falls through the cracks. Every interaction is documented, analyzed, and optimized for maximum conversion.',
            features: [
                'Sales Process Optimization',
                'Client Voice of Customer Analysis',
                'Comprehensive Documentation',
                'Performance Analytics',
                'Sales Enablement',
                'Objection Handling Framework',
                'Deal Pipeline Management',
                'Revenue Forecasting',
            ],
            gradient: 'from-red-500 to-red-400',
            shadow: 'shadow-red',
            benefits: [
                'Increase close rates by 50%',
                'Reduce sales cycle by 30%',
                'Eliminate lost opportunities',
                'Scale team performance',
            ],
        },
        {
            icon: <DollarSign className="w-8 h-8" />,
            title: 'Revenue Optimization',
            shortDesc: 'Maximize every revenue stream with data-driven strategies.',
            description: 'Revenue optimization isn\'t about working harder—it\'s about working smarter. We analyze every touchpoint in your customer journey to identify and eliminate friction, optimize pricing, and maximize lifetime value.',
            features: [
                'Conversion Rate Optimization',
                'Funnel Analysis & Refinement',
                'Pricing Strategy',
                'Lifetime Value Maximization',
                'Upsell & Cross-sell Systems',
                'Retention Optimization',
                'Revenue Attribution',
                'Growth Modeling',
            ],
            gradient: 'from-blue-500 to-blue-400',
            shadow: 'shadow-blue',
            benefits: [
                'Increase revenue per customer by 3X',
                'Improve retention by 40%',
                'Optimize pricing for maximum profit',
                'Predictable revenue growth',
            ],
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
                            Our Services
                        </span>
                    </div>

                    <h1 className="text-5xl lg:text-6xl font-black font-display mb-6">
                        End-to-End <span className="gradient-text">Brand Takeover</span>
                    </h1>

                    <p className="text-xl text-slate-600 leading-relaxed mb-8">
                        We literally take your low-revenue producing assets and scale them behind the scenes
                        to the numbers you imagined in a perfect world. No fluff, no excuses—just results.
                    </p>

                    <Link to="/contact">
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gradient-rainbow text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-2"
                        >
                            Get Started Today
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Services Grid */}
                <div className="space-y-16">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`bg-slate-50 rounded-3xl p-8 lg:p-12 border-2 border-slate-200 hover:border-transparent hover:${service.shadow} transition-all duration-300`}
                        >
                            <div className="grid lg:grid-cols-2 gap-12">
                                {/* Left Column */}
                                <div>
                                    <div className={`inline-flex p-4 bg-gradient-to-br ${service.gradient} rounded-xl text-white shadow-lg mb-6`}>
                                        {service.icon}
                                    </div>

                                    <h2 className="text-3xl font-black font-display mb-4">
                                        {service.title}
                                    </h2>

                                    <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                        {service.description}
                                    </p>

                                    <div className="space-y-4">
                                        <h3 className="font-bold text-lg">Key Benefits:</h3>
                                        {service.benefits.map((benefit, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                                <span className="text-slate-700">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div>
                                    <h3 className="font-bold text-lg mb-6">What's Included:</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {service.features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-2">
                                                <span className="text-purple-600 font-bold mt-1">✓</span>
                                                <span className="text-slate-600 text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-20 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-3xl p-12 text-center"
                >
                    <h2 className="text-4xl font-black font-display mb-6">
                        Ready to Scale Your Brand?
                    </h2>
                    <p className="text-xl text-slate-700 mb-8 max-w-2xl mx-auto">
                        Let's discuss which services will deliver the biggest impact for your business.
                        Book a free strategy call today.
                    </p>
                    <Link to="/contact">
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gradient-rainbow text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-2"
                        >
                            Schedule Free Strategy Call
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ServicesPage;

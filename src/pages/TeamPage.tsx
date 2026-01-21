import React from 'react';
import { motion } from 'framer-motion';
import { Star, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TeamPage: React.FC = () => {
    const teamMembers = [
        {
            name: 'Jaryd',
            role: 'Brand Identity & Growth Hacker',
            title: 'Co-Founder & Chief Growth Officer',
            bio: 'Master of guerrilla growth hacking, brand positioning, and strategic media buying. Jaryd turns unknown brands into household names through unconventional tactics and precision targeting. His ad campaigns consistently deliver 5-10X ROAS.',
            extendedBio: `With over 15 years in the trenches of digital marketing, Jaryd has pioneered growth strategies for startups and Fortune 500 companies alike. His guerrilla marketing campaigns have generated millions in revenue while operating on shoestring budgets. Jaryd's superpower is seeing opportunities where others see obstacles—turning constraints into competitive advantages.

When he's not crafting viral campaigns, Jaryd is obsessed with A/B testing, behavioral psychology, and finding the next untapped channel before it becomes saturated. He believes the best marketing doesn't feel like marketing at all.`,
            expertise: ['Brand Identity', 'Growth Hacking', 'Media Buying', 'AI Integration', 'Conversion Optimization', 'Viral Marketing'],
            achievements: [
                'Scaled 20+ brands from 0 to 7-figures',
                '5-10X ROAS across all campaigns',
                'Generated $50M+ in client revenue',
                'Built viral campaigns with 100M+ impressions',
            ],
            gradient: 'from-purple-500 to-purple-400',
            initial: 'J',
        },
        {
            name: 'Eric',
            role: 'Head of Sales & Public Appearance',
            title: 'Co-Founder & Chief Revenue Officer',
            bio: 'The face of operations and the architect of airtight sales systems. Eric ensures every client interaction is documented, analyzed, and optimized. He feeds the team with rich VOC data and comprehensive profiles that guarantee no opportunity is missed.',
            extendedBio: `Eric's philosophy is simple: sales is a science, not an art. With a background in enterprise SaaS and consultative selling, he's built repeatable systems that consistently convert prospects into raving fans. His meticulous approach to documentation and client intelligence has become the secret weapon behind Revlo's success.

Eric's Voice of Customer framework captures nuances that most sales teams miss—enabling hyper-personalized outreach that resonates. His mantra: "Every conversation is data. Every objection is an opportunity. Every client is a case study."`,
            expertise: ['Sales Strategy', 'Client Relations', 'Documentation', 'VOC Analysis', 'Enterprise Sales', 'Negotiation'],
            achievements: [
                'Closed $100M+ in total contract value',
                '85% close rate on qualified leads',
                'Built sales systems for 50+ companies',
                'Trained 200+ sales professionals',
            ],
            gradient: 'from-red-500 to-red-400',
            initial: 'E',
        },
        {
            name: 'Noufal',
            role: 'Lead Generation Specialist',
            title: 'Co-Founder & Chief Strategy Officer',
            bio: 'The lead generation mastermind who knows every strategic channel inside and out. Noufal manipulates omnichannel touchpoints to create perfect outcomes, filling pipelines with qualified, ready-to-convert prospects at scale.',
            extendedBio: `Noufal is a data-driven strategist obsessed with pipeline efficiency. His omnichannel approach isn't about being everywhere—it's about being in the right place at the right time with the right message. Through advanced data enrichment and competitor analysis, he identifies and activates leads before they even know they need you.

His secret? Treating lead generation like reconnaissance. Every data point tells a story. Every channel has a rhythm. Every prospect leaves digital breadcrumbs. Noufal's systems follow those breadcrumbs to deliver leads that close.`,
            expertise: ['Lead Generation', 'Channel Strategy', 'Data Enrichment', 'Outreach Automation', 'ABM', 'Analytics'],
            achievements: [
                'Generated 500K+ qualified leads',
                'Built pipelines worth $500M+',
                'Achieved 40% conversion rates',
                'Mastered 15+ outreach channels',
            ],
            gradient: 'from-blue-500 to-blue-400',
            initial: 'N',
        },
    ];

    const gradientColors = {
        'from-purple-500 to-purple-400': 'bg-purple-600',
        'from-red-500 to-red-400': 'bg-red-600',
        'from-blue-500 to-blue-400': 'bg-blue-600',
    };

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
                            The Dream Team
                        </span>
                    </div>

                    <h1 className="text-5xl lg:text-6xl font-black font-display mb-6">
                        Meet The <span className="gradient-text-alt">Perfect System</span>
                    </h1>

                    <p className="text-xl text-slate-600 leading-relaxed">
                        40+ years combined experience across all marketing lanes, industries, and tactics.
                        Each member is a specialist in their domain, working in perfect harmony to scale your business.
                    </p>
                </motion.div>

                {/* Team Members */}
                <div className="space-y-20">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-slate-50 rounded-3xl p-8 lg:p-12 border-2 border-slate-200 hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="grid lg:grid-cols-3 gap-12">
                                {/* Left Column - Profile */}
                                <div className="text-center lg:text-left">
                                    <div className={`w-32 h-32 mx-auto lg:mx-0 mb-6 bg-gradient-to-br ${member.gradient} rounded-full flex items-center justify-center text-white text-5xl font-black shadow-lg`}>
                                        {member.initial}
                                    </div>

                                    <h2 className="text-3xl font-black font-display mb-2">
                                        {member.name}
                                    </h2>
                                    <p className="text-lg text-slate-600 font-semibold mb-1">
                                        {member.role}
                                    </p>
                                    <p className="text-sm text-slate-500 mb-6">
                                        {member.title}
                                    </p>

                                    {/* Expertise Tags */}
                                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
                                        {member.expertise.map((skill, skillIndex) => (
                                            <span
                                                key={skillIndex}
                                                className={`px-3 py-1.5 text-xs font-semibold text-white ${gradientColors[member.gradient as keyof typeof gradientColors]} rounded-lg`}
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Contact Buttons */}
                                    <div className="flex gap-3 justify-center lg:justify-start">
                                        <button className="p-3 bg-white border-2 border-slate-200 rounded-xl hover:border-slate-300 transition-all">
                                            <Linkedin className="w-5 h-5 text-slate-600" />
                                        </button>
                                        <button className="p-3 bg-white border-2 border-slate-200 rounded-xl hover:border-slate-300 transition-all">
                                            <Mail className="w-5 h-5 text-slate-600" />
                                        </button>
                                    </div>
                                </div>

                                {/* Middle Column - Bio */}
                                <div className="lg:col-span-2 space-y-6">
                                    <p className="text-lg text-slate-700 leading-relaxed whitespace-pre-line">
                                        {member.extendedBio}
                                    </p>

                                    {/* Achievements */}
                                    <div>
                                        <h3 className="font-bold text-lg mb-4">Key Achievements:</h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {member.achievements.map((achievement, i) => (
                                                <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-slate-200">
                                                    <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-slate-700">{achievement}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Team Philosophy */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-20 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-3xl p-12"
                >
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex p-4 bg-gradient-rainbow rounded-full text-white shadow-lg mb-6">
                            <Star className="w-8 h-8" />
                        </div>

                        <h2 className="text-4xl font-black font-display mb-6">
                            Combined, We're the Perfect System
                        </h2>

                        <p className="text-lg text-slate-700 leading-relaxed mb-8">
                            Our synergy isn't accidental—it's engineered. Jaryd's growth hacking feeds Eric's sales
                            intelligence, which informs Noufal's targeting strategy, creating a self-reinforcing cycle
                            of exponential growth. Add our proprietary Revlo OS to the mix, and you have an unstoppable
                            force that consistently scales businesses well above 7-figure ARR.
                        </p>

                        <p className="text-xl font-bold text-slate-900 mb-8">
                            And that's not a pipe dream—it's our track record.
                        </p>

                        <Link to="/contact">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-gradient-rainbow text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-2"
                            >
                                Work With Our Team
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default TeamPage;

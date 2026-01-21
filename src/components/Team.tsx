import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const Team: React.FC = () => {
    const teamMembers = [
        {
            name: 'Jaryd',
            role: 'Brand Identity & Growth Hacker',
            bio: 'Master of guerrilla growth hacking, brand positioning, and strategic media buying. Jaryd turns unknown brands into household names through unconventional tactics and precision targeting. His ad campaigns consistently deliver 5-10X ROAS.',
            expertise: ['Brand Identity', 'Growth Hacking', 'Media Buying', 'AI Integration'],
            gradient: 'from-purple-500 to-purple-400',
            initial: 'J',
        },
        {
            name: 'Eric',
            role: 'Head of Sales & Public Appearance',
            bio: 'The face of operations and the architect of airtight sales systems. Eric ensures every client interaction is documented, analyzed, and optimized. He feeds the team with rich VOC data and comprehensive profiles that guarantee no opportunity is missed.',
            expertise: ['Sales Strategy', 'Client Relations', 'Documentation', 'VOC Analysis'],
            gradient: 'from-red-500 to-red-400',
            initial: 'E',
        },
        {
            name: 'Noufal',
            role: 'Lead Generation Specialist',
            bio: 'The lead generation mastermind who knows every strategic channel inside and out. Noufal manipulates omnichannel touchpoints to create perfect outcomes, filling pipelines with qualified, ready-to-convert prospects at scale.',
            expertise: ['Lead Generation', 'Channel Strategy', 'Data Enrichment', 'Outreach Automation'],
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
        <section id="team" className="py-24 bg-white">
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
                            The Dream Team
                        </span>
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-black font-display mb-6">
                        Meet The <span className="gradient-text-alt">Perfect System</span>
                    </h2>

                    <p className="text-xl text-slate-600 leading-relaxed">
                        40+ years combined experience across all marketing lanes, industries, and tactics.
                        Each member is a specialist in their domain, working in perfect harmony.
                    </p>
                </motion.div>

                {/* Team Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8 }}
                            className="group"
                        >
                            <div className="h-full bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-2xl transition-all duration-300">
                                {/* Avatar */}
                                <div className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-br ${member.gradient} rounded-full flex items-center justify-center text-white text-4xl font-black shadow-lg`}>
                                    {member.initial}
                                </div>

                                {/* Name & Role */}
                                <h3 className="text-2xl font-bold text-center mb-2">
                                    {member.name}
                                </h3>
                                <p className="text-slate-600 text-center font-semibold mb-4">
                                    {member.role}
                                </p>

                                {/* Bio */}
                                <p className="text-slate-600 leading-relaxed mb-6">
                                    {member.bio}
                                </p>

                                {/* Expertise Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {member.expertise.map((skill, skillIndex) => (
                                        <span
                                            key={skillIndex}
                                            className={`px-3 py-1.5 text-xs font-semibold text-white ${gradientColors[member.gradient as keyof typeof gradientColors]} rounded-lg`}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Philosophy Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-2xl p-12 text-center"
                >
                    <div className="inline-flex p-4 bg-gradient-rainbow rounded-full text-white shadow-lg mb-6">
                        <Star className="w-8 h-8" />
                    </div>

                    <h3 className="text-3xl font-black font-display mb-6">
                        Combined, We're the Perfect System
                    </h3>

                    <p className="text-lg text-slate-700 leading-relaxed max-w-4xl mx-auto">
                        Our synergy isn't accidental—it's engineered. Jaryd's growth hacking feeds Eric's sales
                        intelligence, which informs Noufal's targeting strategy, creating a self-reinforcing cycle
                        of exponential growth. Add our proprietary Revlo OS to the mix, and you have an unstoppable
                        force that consistently scales businesses well above 7-figure ARR. And that's not a pipe
                        dream—it's our track record.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Team;

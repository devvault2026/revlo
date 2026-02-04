import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const Team: React.FC = () => {
    const teamMembers = [
        {
            name: 'Jaryd',
            role: 'Strategy & Growth Lead',
            bio: 'A master of building sustainable growth engines. Jaryd focuses on high-level strategy and market positioning to ensure your business stands out and scales rapidly.',
            expertise: ['Growth Strategy', 'Market Analysis', 'Brand Positioning'],
            color: 'text-purple-400',
            initial: 'JS',
            image: '/619228587_1473924384299979_5558935500619533353_n.jpg',
        },
        {
            name: 'Eric',
            role: 'Operations & Partner Lead',
            bio: 'Dedicated to ensuring your operations run like clockwork. Eric manages the systems and communication protocols that keep our partnership efficient and results-oriented.',
            expertise: ['Partner Relations', 'Operations', 'Systems Design'],
            color: 'text-red-400',
            initial: 'EO',
            image: '/515437137_761690583348698_3741883148247296552_n (1).jpg',
        },
        {
            name: 'Noufal',
            role: 'Acquisition & Marketing Lead',
            bio: 'The lead generation specialist. Noufal manages the customer acquisition channels that bring high-quality leads directly to your business every single day.',
            expertise: ['Lead Generation', 'Digital Marketing', 'Market Expansion'],
            color: 'text-blue-400',
            initial: 'NM',
            image: '/594075087_122104441749139887_4262439585304172783_n.jpg',
        },
    ];

    return (
        <section id="team" className="py-32 bg-[#020408] relative">
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
                            Our Core Team
                        </span>
                    </div>

                    <h2 className="text-5xl lg:text-7xl font-black font-display mb-8 tracking-tighter italic text-white leading-none">
                        YOUR GROWTH <span className="gradient-text-alt">PARTNERS.</span>
                    </h2>

                    <p className="text-xl text-slate-400 leading-relaxed font-medium">
                        40+ years of combined experience in business development. We are not just service providers;
                        we are an extension of your own team dedicated to your success.
                    </p>
                </motion.div>

                {/* Team Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="h-full bg-white/5 backdrop-blur-3xl rounded-[32px] p-8 border border-white/5 hover:border-white/10 transition-all duration-500 relative overflow-hidden">
                                {/* Operator Badge */}
                                <div className="absolute top-6 right-6 text-[10px] font-black text-slate-600 group-hover:text-slate-400 transition-colors uppercase tracking-widest">
                                    {member.initial} / TEAM
                                </div>

                                {/* Avatar Circle */}
                                <div className={`w-24 h-24 mb-8 bg-black/40 rounded-3xl flex items-center justify-center border border-white/5 group-hover:scale-105 transition-all duration-500 relative overflow-hidden`}>
                                    <div className={`absolute inset-0 rounded-3xl blur-[20px] opacity-20 bg-current ${member.color}`} />
                                    {member.image ? (
                                        <img src={member.image} alt={member.name} className="w-full h-full object-cover relative z-10" />
                                    ) : (
                                        <span className={`text-4xl font-black italic relative z-10 ${member.color}`}>
                                            {member.name.charAt(0)}
                                        </span>
                                    )}
                                </div>

                                {/* Name & Role */}
                                <h3 className="text-2xl font-black mb-1 text-white italic tracking-tight">
                                    {member.name}
                                </h3>
                                <div className={`text-[10px] font-black uppercase tracking-[0.2em] mb-6 ${member.color}`}>
                                    {member.role}
                                </div>

                                {/* Bio */}
                                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 h-20 overflow-hidden">
                                    {member.bio}
                                </p>

                                {/* Expertise Tags */}
                                <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                                    {member.expertise.map((skill, skillIndex) => (
                                        <span
                                            key={skillIndex}
                                            className="px-3 py-1 text-[8px] font-black text-slate-400 border border-white/5 rounded-full uppercase tracking-tighter"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* High-Level Philosophy */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mt-20 p-12 glass rounded-[48px] border border-white/10 text-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-red-500/5 animate-pulse" />

                    <div className="relative z-10">
                        <h3 className="text-3xl lg:text-5xl font-black font-display mb-8 text-white italic tracking-tighter">
                            THE <span className="gradient-text">POWER OF THREE.</span>
                        </h3>
                        <p className="text-xl text-slate-400 leading-relaxed max-w-4xl mx-auto font-medium">
                            Our collective expertise ensures that every aspect of your growth is covered.
                            From the initial strategy and branding to the daily operations and lead acquisition,
                            we work in sync to turn your business into a market leader. This isn&apos;t just
                            consulting. This is a dedicated partnership built for scale.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};


export default Team;

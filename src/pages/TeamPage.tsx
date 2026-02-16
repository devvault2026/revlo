import React from 'react';
import { motion } from 'framer-motion';
import { Star, Linkedin, Mail, ArrowRight, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const TeamPage: React.FC = () => {
    const teamMembers = [
        {
            name: 'JARYD',
            role: 'Strategy & Growth Lead',
            title: 'FOUNDER // CHIEF ARCHITECT',
            bio: 'Master of strategic branding, market positioning, and direct-response media buying. Jaryd turns unknown brands into market leaders through high-impact strategy.',
            extendedBio: `With over 15 years of experience in the digital marketing landscape, Jaryd has pioneered growth strategies for both startups and established businesses. His focus is on high-level market positioning and buildling sustainable growth engines that stand out in crowded markets. Jaryd believes that a strong brand foundation is the most valuable asset any modern business can own.`,
            expertise: ['MARKET POSITIONING', 'GROWTH STRATEGY', 'MEDIA BUYING', 'AI INTEGRATION', 'CONVERSION OPTIMIZATION', 'VIRAL STRATEGY'],
            achievements: [
                'Scaled 20+ brands to 7-figure revenue',
                'Consistent 5-10X ROI for partners',
                'Generated $50M+ in partner revenue',
                'Built global audience networks',
            ],
            gradient: 'from-purple-500 to-purple-400',
            initial: 'J',
            image: '/619228587_1473924384299979_5558935500619533353_n.jpg',
            id: 'LEAD-001'
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-[#020408] pt-40 pb-20 relative overflow-hidden"
        >
            {/* Background complexity */}
            <div className="absolute top-0 left-0 w-full h-full bg-grid-white opacity-5 pointer-events-none" />
            <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-900/20 blur-[150px] rounded-full" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-900/20 blur-[150px] rounded-full" />

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
                            The Architect
                        </span>
                    </div>

                    <h1 className="text-6xl lg:text-8xl font-black font-display mb-10 tracking-tighter italic text-white leading-tight">
                        YOUR GROWTH <span className="gradient-text-alt">PARTNER.</span>
                    </h1>

                    <p className="text-xl text-slate-400 leading-relaxed font-medium">
                        Deep expertise across high-impact growth channels. I don't just provide a service—I build
                        the proprietary systems that turn your business into a market leader.
                    </p>
                </motion.div>

                {/* Team Members */}
                <div className="space-y-40">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="grid lg:grid-cols-3 gap-20 items-center">
                                {/* Left Column - Lead Profile */}
                                <div className="text-center lg:text-left">
                                    <div className="relative inline-block mb-8 text-center lg:text-left">
                                        <div className="absolute -inset-4 bg-gradient-to-br from-white/10 to-transparent blur-2xl opacity-50" />
                                        <div className={`w-48 h-48 mx-auto lg:mx-0 bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 flex items-center justify-center text-white text-6xl font-black italic relative overflow-hidden group`}>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                            {member.image ? (
                                                <img src={member.image} alt={member.name} className="w-full h-full object-cover relative z-10" />
                                            ) : (
                                                <span className="relative z-10 group-hover:scale-110 transition-transform duration-500">
                                                    {member.initial}
                                                </span>
                                            )}
                                            {/* Glow effect */}
                                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-8">
                                        <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] mb-2">{member.id}</div>
                                        <h2 className="text-5xl font-black font-display italic text-white tracking-tighter uppercase">
                                            {member.name}
                                        </h2>
                                        <p className="text-xl text-purple-400 font-black italic tracking-tight uppercase">
                                            {member.role}
                                        </p>
                                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">
                                            {member.title}
                                        </p>
                                    </div>

                                    {/* Expertise Tags */}
                                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-10">
                                        {member.expertise.map((skill, skillIndex) => (
                                            <span
                                                key={skillIndex}
                                                className="px-3 py-1.5 text-[8px] font-black text-white bg-white/5 border border-white/10 rounded-lg uppercase tracking-widest hover:bg-white/10 transition-colors"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Social Node Links */}
                                    <div className="flex gap-4 justify-center lg:justify-start">
                                        <button className="w-12 h-12 glass rounded-2xl flex items-center justify-center border border-white/10 hover:border-white/30 transition-all text-slate-400 hover:text-white">
                                            <Linkedin className="w-5 h-5" />
                                        </button>
                                        <button className="w-12 h-12 glass rounded-2xl flex items-center justify-center border border-white/10 hover:border-white/30 transition-all text-slate-400 hover:text-white">
                                            <Mail className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Right 2 Columns - Info */}
                                <div className="lg:col-span-2">
                                    <div className="bg-white/5 backdrop-blur-3xl rounded-[48px] p-8 lg:p-12 border border-white/5 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-8">
                                            <div className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em]">PARTNERSHIP FOCUS</div>
                                        </div>

                                        <p className="text-xl text-slate-400 leading-relaxed font-medium mb-12 italic">
                                            &quot;{member.extendedBio}&quot;
                                        </p>

                                        {/* Achievements Grid */}
                                        <div className="grid md:grid-cols-2 gap-6">
                                            {member.achievements.map((achievement, i) => (
                                                <div key={i} className="flex items-center gap-6 p-6 glass rounded-2xl border border-white/5 group-hover:border-white/10 transition-all">
                                                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                                        <UserCheck className="w-4 h-4 text-purple-400" />
                                                    </div>
                                                    <span className="text-white text-xs font-black uppercase tracking-widest leading-loose">{achievement}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Synergy Block */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-40 relative group"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-[100px] opacity-30" />

                    <div className="bg-white/5 backdrop-blur-3xl border border-white/5 rounded-[64px] p-16 lg:p-24 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-grid-white opacity-5" />

                        <div className="relative z-10 max-w-4xl mx-auto">
                            <h2 className="text-5xl lg:text-7xl font-black font-display mb-10 tracking-tighter italic text-white leading-tight">
                                THE ARCHITECT&apos;S <span className="gradient-text-alt">SYSTEM.</span>
                            </h2>

                            <p className="text-xl text-slate-400 leading-relaxed mb-12 font-medium">
                                My branding and growth strategies are amplified by the proprietary Revlo OS orchestration.
                                I build the system, deploy the intelligence, and scale your business with surgical precision.
                            </p>

                            <Link to="/contact">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-12 py-6 bg-white text-black text-[12px] font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-slate-200 transition-all duration-300 flex items-center gap-4 mx-auto italic"
                                >
                                    BOOK A STRATEGY CALL
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

export default TeamPage;

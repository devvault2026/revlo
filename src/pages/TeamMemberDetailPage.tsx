import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Linkedin, Mail, ArrowLeft, ArrowRight, UserCheck } from 'lucide-react';
import { getTeamMemberBySlug } from '../data/teamData';
import NotFoundPage from './NotFoundPage';

const TeamMemberDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const member = getTeamMemberBySlug(slug || '');

    if (!member) {
        return <NotFoundPage />;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-[#020408] pt-40 pb-20 relative overflow-hidden"
        >
            {/* Background effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-grid-white opacity-5 pointer-events-none" />
            <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-900/20 blur-[150px] rounded-full" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-900/20 blur-[150px] rounded-full" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Back Navigation */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-20"
                >
                    <button
                        onClick={() => navigate('/team')}
                        className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-black uppercase tracking-[0.2em]">Back to Team</span>
                    </button>
                </motion.div>

                {/* Main Profile Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="grid lg:grid-cols-3 gap-20 items-start mb-40"
                >
                    {/* Left Column - Profile */}
                    <div className="text-center lg:text-left sticky top-40">
                        <div className="relative inline-block mb-8 text-center lg:text-left">
                            <div className="absolute -inset-4 bg-gradient-to-br from-white/10 to-transparent blur-2xl opacity-50" />
                            <div className={`w-64 h-64 mx-auto lg:mx-0 bg-gradient-to-br ${member.gradient} rounded-3xl p-1 relative overflow-hidden group`}>
                                <div className="w-full h-full bg-black rounded-3xl flex items-center justify-center overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                    {member.image ? (
                                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-8xl font-black italic text-white/80">
                                            {member.initial}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 mb-12 mt-12">
                            <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] mb-4">{member.id}</div>
                            <h1 className="text-5xl font-black font-display italic text-white tracking-tighter uppercase leading-tight">
                                {member.name}
                            </h1>
                            <p className="text-2xl text-purple-400 font-black italic tracking-tight">
                                {member.role}
                            </p>
                            <p className="text-[11px] text-slate-500 font-black uppercase tracking-[0.2em]">
                                {member.title}
                            </p>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-4 justify-center lg:justify-start mb-12">
                            {member.socials?.linkedin && (
                                <a
                                    href={member.socials.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 glass rounded-2xl flex items-center justify-center border border-white/10 hover:border-white/30 transition-all text-slate-400 hover:text-white"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            )}
                            {member.socials?.email && (
                                <a
                                    href={`mailto:${member.socials.email}`}
                                    className="w-12 h-12 glass rounded-2xl flex items-center justify-center border border-white/10 hover:border-white/30 transition-all text-slate-400 hover:text-white"
                                >
                                    <Mail className="w-5 h-5" />
                                </a>
                            )}
                        </div>

                        {/* Expertise Tags */}
                        <div className="space-y-3">
                            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Key Expertise</p>
                            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                                {member.expertise.map((skill, skillIndex) => (
                                    <span
                                        key={skillIndex}
                                        className="px-3 py-1.5 text-[7px] font-black text-white bg-white/5 border border-white/10 rounded-lg uppercase tracking-widest hover:bg-white/10 transition-colors"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Columns - Full Bio & Details */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Bio Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="bg-white/5 backdrop-blur-3xl rounded-[48px] p-8 lg:p-12 border border-white/5 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8">
                                <div className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em]">ABOUT</div>
                            </div>
                            <p className="text-lg text-slate-400 leading-relaxed font-medium mt-8">
                                {member.extendedBio}
                            </p>
                        </motion.div>

                        {/* Bio Short */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="bg-white/5 backdrop-blur-3xl rounded-[48px] p-8 lg:p-12 border border-white/5 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8">
                                <div className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em]">OVERVIEW</div>
                            </div>
                            <p className="text-lg text-slate-300 leading-relaxed font-medium italic mt-8">
                                &quot;{member.bio}&quot;
                            </p>
                        </motion.div>

                        {/* Achievements */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="bg-white/5 backdrop-blur-3xl rounded-[48px] p-8 lg:p-12 border border-white/5 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8">
                                <div className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em]">ACHIEVEMENTS</div>
                            </div>
                            <div className="space-y-4 mt-8">
                                {member.achievements.map((achievement, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + i * 0.1 }}
                                        className="flex items-center gap-4 p-6 glass rounded-2xl border border-white/5 hover:border-white/10 transition-all"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                                            <UserCheck className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <span className="text-white text-sm font-black uppercase tracking-widest">{achievement}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* CTA Section */}
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
                                READY TO <span className="gradient-text-alt">SCALE?</span>
                            </h2>

                            <p className="text-xl text-slate-400 leading-relaxed mb-12 font-medium">
                                Let&apos;s build your growth engine together with {member.name.split(',')[0]}&apos;s expertise.
                            </p>

                            <div className="flex gap-6 justify-center flex-wrap">
                                <Link to="/contact">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-12 py-6 bg-white text-black text-[12px] font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-slate-200 transition-all duration-300 flex items-center gap-4 italic"
                                    >
                                        Book Strategy Call
                                        <ArrowRight className="w-5 h-5" />
                                    </motion.button>
                                </Link>
                                <Link to="/team">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-12 py-6 bg-white/10 text-white text-[12px] font-black uppercase tracking-[0.4em] rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center gap-4 italic"
                                    >
                                        View Full Team
                                        <ArrowRight className="w-5 h-5" />
                                    </motion.button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default TeamMemberDetailPage;

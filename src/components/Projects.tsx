import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Cpu, Shield, Zap, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Projects: React.FC = () => {
    const projects = [
        {
            id: 'indeedbot',
            name: 'IndeedBot 2026',
            tagline: 'AI Career Intelligence Platform',
            description: 'Built a production-grade, multi-agent AI system that analyzes live job listings, ATS behavior, market demand, and offer risk before application. IndeedBot transforms the job search into a data-driven decision engine.',
            image: 'https://www.indeedbot.xyz/og-image.png',
            link: '/projects/indeedbot',
            externalLink: 'https://www.indeedbot.xyz/',
            stats: ['Multi-Agent Reasoning', 'ATS Optimized', 'Enterprise Security'],
            color: 'from-blue-500 to-indigo-500'
        },
        {
            id: 'elite-design',
            name: 'Elite Digital Front',
            tagline: 'World-Class Web Design',
            description: 'Crafting high-performance digital identities that command authority. We deliver premium, custom-coded web architectures for brands that need world-class quality at disruptive efficiency.',
            image: 'https://res.cloudinary.com/dpfapm0tl/image/upload/v1769023912/ChatGPT_Image_Jan_21_2026_02_07_55_AM_yv9lxy.png',
            link: '/projects/design',
            externalLink: '#',
            stats: ['Premium UI/UX', 'Starts at $750', 'Framer Motionified', 'SEO Domination'],
            color: 'from-purple-600 to-red-600'
        }
    ];

    return (
        <section id="projects" className="py-32 bg-[#020408] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <div className="inline-block px-4 py-2 glass rounded-full mb-8">
                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">
                            Case Studies
                        </span>
                    </div>

                    <h2 className="text-5xl lg:text-7xl font-black font-display mb-8 tracking-tighter italic text-white leading-none">
                        BUILT BY <span className="gradient-text">REVLO.</span>
                    </h2>

                    <p className="text-xl text-slate-400 leading-relaxed font-medium max-w-3xl">
                        We don't just consult—we build. From high-end, conversion-heavy web design to complex multi-agent AI systems, we provide the elite infrastructure for the 2026 digital economy.
                    </p>
                </motion.div>

                <div className="grid gap-12">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="group relative"
                        >
                            <div className="bg-white/5 backdrop-blur-3xl rounded-[48px] border border-white/5 overflow-hidden hover:border-white/10 transition-all duration-500">
                                <div className="grid lg:grid-cols-2">
                                    {/* Project Info */}
                                    <div className="p-12 lg:p-16 flex flex-col justify-center">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                                                <Cpu className="w-6 h-6 text-blue-400" />
                                            </div>
                                            <span className="text-xs font-black text-blue-400 uppercase tracking-widest">{project.tagline}</span>
                                        </div>

                                        <h3 className="text-4xl lg:text-6xl font-black text-white italic tracking-tighter mb-8 uppercase">
                                            {project.name}
                                        </h3>

                                        <p className="text-xl text-slate-400 leading-relaxed font-medium mb-10">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-3 mb-12">
                                            {project.stats.map(stat => (
                                                <span key={stat} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-white uppercase tracking-widest">
                                                    {stat}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex flex-wrap gap-6">
                                            <Link to={project.link}>
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl flex items-center gap-3 italic"
                                                >
                                                    VIEW CASE STUDY
                                                    <ArrowUpRight className="w-4 h-4" />
                                                </motion.button>
                                            </Link>

                                            <a href={project.externalLink} target="_blank" rel="noopener noreferrer">
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="px-8 py-4 glass text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl flex items-center gap-3 italic border border-white/10"
                                                >
                                                    LIVE SITE
                                                    <ExternalLink className="w-4 h-4" />
                                                </motion.button>
                                            </a>
                                        </div>
                                    </div>

                                    {/* Visual Representation */}
                                    <div className="relative h-[400px] lg:h-auto bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-700 overflow-hidden">
                                        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dpfapm0tl/image/upload/v1769023912/ChatGPT_Image_Jan_21_2026_02_07_55_AM_yv9lxy.png')] bg-cover bg-center mix-blend-overlay opacity-40 group-hover:scale-110 transition-transform duration-700" />

                                        {/* Floating Elements/Mockup look */}
                                        <div className="absolute inset-x-8 bottom-0 top-12 bg-black/40 backdrop-blur-xl border-t border-x border-white/10 rounded-t-[32px] translate-y-24 group-hover:translate-y-12 transition-transform duration-700 shadow-2xl">
                                            <div className="p-6 border-b border-white/5 flex items-center justify-between">
                                                <div className="flex gap-2">
                                                    <div className="w-3 h-3 rounded-full bg-red-500/20" />
                                                    <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                                                    <div className="w-3 h-3 rounded-full bg-green-500/20" />
                                                </div>
                                                <div className="text-[8px] font-black text-slate-500 tracking-[0.3em] uppercase">SYSTEM ANALYSIS IN PROGRESS...</div>
                                            </div>
                                            <div className="p-8 space-y-6">
                                                <div className="h-4 w-2/3 bg-blue-500/20 rounded animate-pulse" />
                                                <div className="h-4 w-full bg-slate-500/10 rounded" />
                                                <div className="h-4 w-full bg-slate-500/10 rounded" />
                                                <div className="grid grid-cols-3 gap-4 pt-4">
                                                    <div className="h-20 rounded-2xl bg-white/5 border border-white/5" />
                                                    <div className="h-20 rounded-2xl bg-white/5 border border-white/5" />
                                                    <div className="h-20 rounded-2xl bg-white/5 border border-white/5" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;

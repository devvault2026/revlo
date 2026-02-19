import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Cpu, Shield, Zap, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Projects: React.FC = () => {
    const projects = [
        {
            id: 'snowblowr',
            name: 'SNOWBLOWR',
            tagline: 'On-Demand Snow Clearing Ecosystem',
            description: 'The Snow Removal Revolution. Your driveway. Cleared on demand. Every. Single. Storm. SNOWBLOWR connects you to verified local operators with guaranteed service times using our proprietary Revlo matching engine.',
            image: 'https://res.cloudinary.com/dpfapm0tl/image/upload/v1771218296/snowblowr_bcrgjb.png',
            link: '/projects/snowblowr',
            externalLink: 'https://www.snowblowr.com/',
            stats: ['On-Demand Clearing', 'Storm Pass Priority', 'Operator Hub', 'Stripe Security'],
            color: 'from-blue-600 to-indigo-600',
            bgPosition: 'bg-left'
        },
        {
            id: 'indeedbot',
            name: 'IndeedBot 2026',
            tagline: 'AI Career Intelligence Platform',
            description: 'Built a production-grade, multi-agent AI system that analyzes live job listings, ATS behavior, market demand, and offer risk before application. IndeedBot transforms the job search into a data-driven decision engine.',
            image: 'https://res.cloudinary.com/dpfapm0tl/image/upload/v1771201324/indeedbotxyz_sw842o.png',
            link: '/projects/indeedbot',
            externalLink: 'https://www.indeedbot.xyz/',
            stats: ['Multi-Agent Reasoning', 'ATS Optimized', 'Enterprise Security'],
            color: 'from-blue-500 to-indigo-500',
            bgPosition: 'bg-left'
        },
        {
            id: 'esdr-living',
            name: 'ESDR Living',
            tagline: 'Custom Real Estate Platform',
            description: 'Strategically engineered a high-performance real estate ecosystem for a local investor. ESDR Living combines an elite, Airbnb-style property showcase with a sophisticated tenant management portal, bridging the gap between luxury marketing and functional logistics.',
            image: 'https://res.cloudinary.com/dpfapm0tl/image/upload/v1771214488/esdr_dowjzk.png',
            link: '/projects/esdr-living',
            externalLink: 'https://esdr-group.vercel.app/',
            stats: ['Airbnb Style UX', 'Tenant Portal', 'Property Showcase', 'Management Hub'],
            color: 'from-purple-600 to-indigo-500',
            bgPosition: 'bg-center'
        },
        {
            id: 'scale-with-jaryd',
            name: 'Scale with Jaryd',
            tagline: 'Psychological Operating System',
            description: 'The world\'s first "War Machine for the Psyche." A sovereign digital ecosystem that replaces traditional coaches and therapists with military-grade strategy, psychographic sales agents (The Oracle), and $JARYD tokenomics.',
            image: 'https://res.cloudinary.com/dpfapm0tl/image/upload/v1771216503/swj_mvygic.png',
            link: '/projects/scale-with-jaryd',
            externalLink: 'https://www.scalewithjaryd.com/',
            stats: ['Jaryd.OS Architecture', 'The Oracle Sales AI', '$JARYD Tokenomics', 'Time Collapse Protocol'],
            color: 'from-indigo-600 to-purple-600',
            bgPosition: 'bg-center'
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
                                    <div className="relative h-[400px] lg:h-auto overflow-hidden bg-black group/img">
                                        <motion.div
                                            className={`absolute inset-0 bg-cover ${project.bgPosition} transition-all duration-700 group-hover/img:scale-105`}
                                            style={{ backgroundImage: `url(${project.image})` }}
                                        />

                                        {/* Premium Glass Overlay on Hover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                                        {/* Subtle Border Glow */}
                                        <div className="absolute inset-0 border border-white/5 group-hover:border-white/20 transition-colors duration-500 pointer-events-none" />
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

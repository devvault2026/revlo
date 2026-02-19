import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layers, TrendingUp, Cpu, ArrowRight } from 'lucide-react';

const Services: React.FC = () => {
    const services = [
        {
            id: "01",
            icon: <Layers className="w-8 h-8" />,
            title: 'SELF-SELLING APPS',
            label: 'AUTONOMOUS GROWTH',
            description: 'We build digital entities that don\'t just exist—they compete. "Autonomy-First" engineering means your project handles its own marketing, conversion, and operations. You don\'t launch an app; you deploy a market leader.',
            features: ['AUTONOMOUS GROWTH ENGINES', 'MARKET-DOMINANT UX', 'NEURAL CONVERSION PATHS'],
            color: 'text-red-500',
            link: '/websites'
        },
        {
            id: "02",
            icon: <Cpu className="w-8 h-8" />,
            title: 'AUTONOMOUS OPS',
            label: 'CORE INFRASTRUCTURE',
            description: 'Fully autonomous systems that replace expensive human overhead. We map your entire business logic into a self-evolving neural pipeline that manages sales, support, and execution 24/7 with zero error.',
            features: ['TOTAL WORKFLOW AUTONOMY', 'LMM-POWERED EXECUTION', 'SELF-OPTIMIZING LOGIC'],
            color: 'text-white',
            link: '/takeoff-agent'
        },
        {
            id: "03",
            icon: <TrendingUp className="w-8 h-8" />,
            title: 'RECURSIVE REVENUE',
            label: 'WEALTH ENGINES',
            description: 'The ultimate business objective. We build the proprietary AI infrastructure that acts as your company\'s central brain, orchestrating high-value operations that generate consistent revenue.',
            features: ['ELITE NEURAL INFRA', 'RECURSIVE GROWTH LOOPS', 'DATA-FIRST DECISIONING'],
            color: 'text-blue-500',
            link: '/elite-development'
        }
    ];

    return (
        <section id="services" className="py-60 bg-black relative overflow-hidden border-t border-white/5">
            {/* Tactical Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

            <div className="max-w-[1800px] mx-auto px-6 lg:px-12 relative z-10">
                <div className="flex flex-col gap-32">
                    {/* Header with tactical feel */}
                    <div className="flex flex-col lg:flex-row items-start justify-between gap-16">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="max-w-4xl space-y-8"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-[1px] bg-red-600" />
                                <span className="text-xs font-black text-red-500 uppercase tracking-[1em]">SYSTEM_CAPABILITIES</span>
                            </div>
                            <h2 className="text-[clamp(3.5rem,10vw,10rem)] font-black tracking-tighter text-white uppercase leading-[0.85]">
                                THE AI <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">ARSENAL.</span>
                            </h2>
                        </motion.div>

                        <div className="max-w-sm lg:pt-32">
                            <p className="text-sm font-bold text-white/40 uppercase tracking-[0.3em] italic border-l-2 border-red-600/30 pl-6">
                                "DEBUNKING THE AGENCY MYTH: WE DON'T BUILD SOFTWARE, WE DEPLOY AUTONOMY."
                            </p>
                        </div>
                    </div>

                    {/* Services Grid - High Fidelity Cards */}
                    <div className="grid lg:grid-cols-3 gap-0 border border-white/5 bg-white/[0.02]">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative border-r last:border-r-0 border-white/5 p-12 lg:p-16 hover:bg-white/[0.03] transition-all duration-700 overflow-hidden"
                            >
                                {/* Glass Highlight */}
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />

                                <div className="relative z-10 space-y-12">
                                    <div className="flex justify-between items-start">
                                        <div className={`p-4 bg-white/[0.03] border border-white/5 ${service.color} group-hover:border-red-500/30 group-hover:bg-red-600/5 transition-all duration-500`}>
                                            {service.icon}
                                        </div>
                                        <span className="text-4xl font-black text-white/5 group-hover:text-red-600/20 transition-colors uppercase italic tracking-tighter">{service.id}</span>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em]">{service.label}</div>
                                        <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-tight">
                                            {service.title}
                                        </h3>
                                    </div>

                                    <p className="text-sm text-slate-400 font-medium leading-relaxed group-hover:text-slate-200 transition-colors">
                                        {service.description}
                                    </p>

                                    <ul className="space-y-3 pt-4">
                                        {service.features.map((feature, fIndex) => (
                                            <li key={fIndex} className="flex items-center gap-4 text-[9px] font-black text-white/30 tracking-[0.2em] group-hover:text-white/60 transition-colors">
                                                <div className="w-1.5 h-1.5 bg-red-600 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="pt-8">
                                        <Link to={service.link}>
                                            <motion.button
                                                whileHover={{ x: 10 }}
                                                className="flex items-center gap-4 text-[11px] font-black text-white uppercase tracking-[0.3em] group/btn"
                                            >
                                                ACCESS_NODE
                                                <ArrowRight className="w-4 h-4 text-red-600 group-hover/btn:scale-125 transition-transform" />
                                            </motion.button>
                                        </Link>
                                    </div>
                                </div>

                                {/* Animated Corner Accent */}
                                <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 border-red-600" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Section Gradient */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-red-600/[0.03] to-transparent pointer-events-none" />
        </section>
    );
};
export default Services;

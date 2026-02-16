import React from 'react';
import { motion } from 'framer-motion';
import { Layers, TrendingUp, Cpu, Users, Briefcase, DollarSign } from 'lucide-react';

const Services: React.FC = () => {
    const services = [
        {
            icon: <Layers className="w-8 h-8" />,
            title: 'I: ELITE WEB DESIGN',
            description: 'Top-tier digital presence for brands that refuse to be second best. We deliver fully-realized, high-performance websites built to convert and scale from day one.',
            features: ['MODERN ARCHITECTURE', 'FROM $750 TOTAL', 'CONVERSION OPTIMIZED', 'MOBILE-FIRST DESIGN'],
            color: 'text-purple-400',
            glow: 'group-hover:shadow-[0_0_50px_rgba(139,92,246,0.3)]',
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: 'II: VOICE AI AGENTS',
            description: 'Human-grade voice intelligence that handles your sales, support, and appointments 24/7. It sounds like you, works like your best employee, and never takes a day off.',
            features: ['INSTANT RESPONSE', 'FLAWLESS ACCEENT/TONE', 'COLD CALL AUTOMATION', 'CALENDLY INTEGRATION'],
            color: 'text-blue-400',
            glow: 'group-hover:shadow-[0_0_50px_rgba(59,130,246,0.3)]',
        },
        {
            icon: <Cpu className="w-8 h-8" />,
            title: 'III: AI AGENT DEV',
            description: 'The ultimate operating system for your business. We build custom AI agents that manage your workflows, sales pipelines, and customer data with irrefutable precision.',
            features: ['CUSTOM WORKFLOWS', 'SYSTEM INTEGRATION', '24/7 OPERATIONS', 'ZERO TECH JARGON'],
            color: 'text-red-400',
            glow: 'group-hover:shadow-[0_0_50px_rgba(239,68,68,0.3)]',
        }
    ];

    return (
        <section id="services" className="py-32 bg-[#020408] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-2 glass rounded-full mb-8"
                    >
                        <span className="text-[10px] font-black text-purple-400 uppercase tracking-[0.4em]">
                            The Revlo Standard
                        </span>
                    </motion.div>

                    <h2 className="text-5xl lg:text-7xl font-black font-display mb-8 tracking-tighter italic text-white uppercase">
                        UNRIVALED <span className="gradient-text">SOLUTIONS.</span>
                    </h2>

                    <p className="text-xl text-slate-400 leading-relaxed font-medium italic">
                        "We don't just provide services. We deploy specialized intelligence to solve
                        complex growth challenges at the highest level of execution."
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className={`h-full p-10 rounded-[48px] glass-dark border border-white/5 hover:border-white/10 transition-all duration-500 relative overflow-hidden ${service.glow}`}>
                                {/* Inner Background Glow */}
                                <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-current ${service.color}`} />

                                {/* Icon */}
                                <div className={`w-14 h-14 glass rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform duration-500 ${service.color}`}>
                                    {service.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-black mb-4 tracking-tighter text-white italic uppercase">
                                    {service.title}
                                </h3>

                                {/* Description */}
                                <p className="text-slate-500 leading-relaxed mb-8 text-sm font-medium">
                                    {service.description}
                                </p>

                                {/* Features */}
                                <ul className="space-y-4">
                                    {service.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 group-hover:text-slate-400 transition-colors">
                                            <div className={`w-1.5 h-1.5 rounded-sm bg-current rotate-45 ${service.color}`} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Ambient Background Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-grid-white opacity-5 pointer-events-none" />
        </section>
    );
};



export default Services;

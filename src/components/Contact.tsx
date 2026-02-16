import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Handshake } from 'lucide-react';
import CalEmbed from './CalEmbed';

interface FormData {
    name: string;
    email: string;
    company: string;
    revenue: string;
    message: string;
}

const Contact: React.FC = () => {

    const features = [
        {
            title: 'Strategy Session',
            description: 'A dedicated deep dive into your current market position.',
            color: 'text-purple-400',
            icon: <Target className="w-5 h-5" />
        },
        {
            title: 'Growth Roadmap',
            description: 'A clear, custom-built execution plan for scaling your revenue.',
            color: 'text-blue-400',
            icon: <TrendingUp className="w-5 h-5" />
        },
        {
            title: 'Strategic Leverage',
            description: 'Identify the exact points of leverage to multiply your results.',
            color: 'text-red-400',
            icon: <Handshake className="w-5 h-5" />
        },
    ];

    return (
        <section id="contact" className="py-32 bg-[#020408] relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    {/* Left Column - Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-block px-4 py-2 glass rounded-full mb-8">
                            <span className="text-[10px] font-black text-purple-400 uppercase tracking-[0.4em]">
                                Partner Inquiry
                            </span>
                        </div>

                        <h2 className="text-5xl lg:text-7xl font-black font-display mb-8 tracking-tighter italic text-white leading-tight uppercase">
                            PARTNER <span className="gradient-text-alt">WITH US.</span>
                        </h2>

                        <p className="text-xl text-slate-400 leading-relaxed mb-12 font-medium">
                            Stop speculating about your growth potential. Let&apos;s build a system that delivers predictable revenue.
                            Your journey as a Revlo partner starts here.
                        </p>

                        <div className="space-y-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-start gap-6 group"
                                >
                                    <div className={`w-12 h-12 glass rounded-2xl flex items-center justify-center border border-white/5 transition-transform group-hover:scale-110 ${feature.color}`}>
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-xl mb-1 text-white italic tracking-tight uppercase">{feature.title}</h4>
                                        <p className="text-slate-500 text-sm font-medium">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column - Booking Embed */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="h-full"
                    >
                        <CalEmbed />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

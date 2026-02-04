import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { CheckCircle2, Loader2, ArrowRight, Zap, Target, TrendingUp, Handshake } from 'lucide-react';
import { upsertLead } from '../lib/supabase';

interface FormData {
    name: string;
    email: string;
    company: string;
    revenue: string;
    message: string;
}

const Contact: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            await upsertLead({
                name: data.name,
                email: data.email,
                business_core: data.company,
                revenue_estimate: data.revenue,
                notes: data.message,
                type: 'inbound',
            } as any);
            setIsSuccess(true);
            reset();
            setTimeout(() => setIsSuccess(false), 5000);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Submission failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

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

                    {/* Right Column - Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-white/5 backdrop-blur-3xl rounded-[48px] p-8 lg:p-12 border border-white/5 relative overflow-hidden group">
                            {/* Animated Border */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                            <div className="relative z-10">
                                {isSuccess ? (
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="text-center py-20"
                                    >
                                        <div className="w-20 h-20 glass rounded-3xl flex items-center justify-center mx-auto mb-8 border border-green-500/20">
                                            <CheckCircle2 className="w-10 h-10 text-green-400" />
                                        </div>
                                        <h3 className="text-3xl font-black text-white italic mb-4 uppercase">Thank You.</h3>
                                        <p className="text-slate-400 font-medium font-display uppercase tracking-widest text-xs">
                                            We have received your message. <br /> A growth lead will be in touch shortly.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            {/* Name */}
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Full Name</label>
                                                <input
                                                    {...register('name', { required: true })}
                                                    className="w-full px-6 py-4 glass-dark rounded-2xl border border-white/5 text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 transition-all font-medium"
                                                    placeholder="John Doe"
                                                />
                                            </div>

                                            {/* Email */}
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Email Address</label>
                                                <input
                                                    {...register('email', { required: true })}
                                                    className="w-full px-6 py-4 glass-dark rounded-2xl border border-white/5 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                                                    placeholder="john@company.com"
                                                />
                                            </div>
                                        </div>

                                        {/* Company */}
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Company Name</label>
                                            <input
                                                {...register('company', { required: true })}
                                                className="w-full px-6 py-4 glass-dark rounded-2xl border border-white/5 text-white placeholder:text-slate-600 focus:outline-none focus:border-red-500/50 transition-all font-medium"
                                                placeholder="TechCorp Global"
                                            />
                                        </div>

                                        {/* Revenue */}
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Current Monthly Revenue</label>
                                            <select
                                                {...register('revenue', { required: true })}
                                                className="w-full px-6 py-4 glass-dark rounded-2xl border border-white/5 text-white focus:outline-none focus:border-purple-500/50 transition-all font-medium appearance-none"
                                            >
                                                <option value="" className="bg-[#020408]">Select Revenue Range...</option>
                                                <option value="0-10k" className="bg-[#020408] font-medium">$0 - $10K</option>
                                                <option value="10k-50k" className="bg-[#020408] font-medium">$10K - $50K</option>
                                                <option value="50k-100k" className="bg-[#020408] font-medium">$50K - $100K</option>
                                                <option value="100k+" className="bg-[#020408] font-medium">$100K+</option>
                                            </select>
                                        </div>

                                        {/* Message */}
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">How Can We Help?</label>
                                            <textarea
                                                {...register('message', { required: true })}
                                                rows={4}
                                                className="w-full px-6 py-4 glass-dark rounded-2xl border border-white/5 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all font-medium resize-none"
                                                placeholder="Describe your goals and current bottlenecks..."
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <motion.button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-6 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-2xl hover:bg-slate-200 transition-all duration-300 flex items-center justify-center gap-4 disabled:opacity-50"
                                            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                        >
                                            {isSubmitting ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <>
                                                    Access Strategy Session
                                                    <ArrowRight className="w-4 h-4" />
                                                </>
                                            )}
                                        </motion.button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { insertLead } from '../lib/supabase';

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
            // Insert lead into Supabase
            await insertLead({
                name: data.name,
                email: data.email,
                company: data.company,
                revenue_range: data.revenue,
                message: data.message,
                source: 'website',
            });

            setIsSuccess(true);
            reset();

            // Reset success message after 5 seconds
            setTimeout(() => {
                setIsSuccess(false);
            }, 5000);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting your request. Please try again or contact us directly.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const features = [
        {
            icon: '✓',
            title: 'Free Strategy Session',
            description: '60-minute deep dive into your growth potential',
            gradient: 'from-purple-500 to-purple-400',
        },
        {
            icon: '✓',
            title: 'Custom Growth Plan',
            description: 'Tailored roadmap to 7-figure ARR',
            gradient: 'from-red-500 to-red-400',
        },
        {
            icon: '✓',
            title: 'No Obligation',
            description: 'Just pure value and actionable insights',
            gradient: 'from-blue-500 to-blue-400',
        },
    ];

    return (
        <section id="contact" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left Column - Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="lg:sticky lg:top-32"
                    >
                        <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200 rounded-full mb-6">
                            <span className="text-sm font-bold text-purple-700 uppercase tracking-wide">
                                Let's Scale Together
                            </span>
                        </div>

                        <h2 className="text-4xl lg:text-5xl font-black font-display mb-6">
                            Ready to Transform Your Brand?
                        </h2>

                        <p className="text-xl text-slate-600 leading-relaxed mb-12">
                            Stop dreaming about 7-figure ARR. Let's make it your reality. Book a strategy
                            call with our team and discover exactly how we'll scale your business.
                        </p>

                        <div className="space-y-6">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-start gap-4"
                                >
                                    <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-br ${feature.gradient} rounded-full flex items-center justify-center text-white font-bold shadow-lg`}>
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">{feature.title}</h4>
                                        <p className="text-slate-600">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column - Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-2xl border border-slate-200">
                            {isSuccess ? (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="inline-flex p-4 bg-green-100 rounded-full mb-6">
                                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">Success!</h3>
                                    <p className="text-slate-600 text-lg">
                                        We'll be in touch soon to schedule your strategy call.
                                    </p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    {/* Name */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            {...register('name', { required: 'Name is required' })}
                                            type="text"
                                            id="name"
                                            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
                                            placeholder="John Doe"
                                        />
                                        {errors.name && (
                                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            {...register('email', {
                                                required: 'Email is required',
                                                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
                                            })}
                                            type="email"
                                            id="email"
                                            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
                                            placeholder="john@company.com"
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                        )}
                                    </div>

                                    {/* Company */}
                                    <div>
                                        <label htmlFor="company" className="block text-sm font-semibold text-slate-700 mb-2">
                                            Company Name
                                        </label>
                                        <input
                                            {...register('company', { required: 'Company name is required' })}
                                            type="text"
                                            id="company"
                                            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
                                            placeholder="Your Company"
                                        />
                                        {errors.company && (
                                            <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
                                        )}
                                    </div>

                                    {/* Revenue */}
                                    <div>
                                        <label htmlFor="revenue" className="block text-sm font-semibold text-slate-700 mb-2">
                                            Current Monthly Revenue
                                        </label>
                                        <select
                                            {...register('revenue', { required: 'Please select a revenue range' })}
                                            id="revenue"
                                            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
                                        >
                                            <option value="">Select range</option>
                                            <option value="0-10k">$0 - $10K</option>
                                            <option value="10k-50k">$10K - $50K</option>
                                            <option value="50k-100k">$50K - $100K</option>
                                            <option value="100k+">$100K+</option>
                                        </select>
                                        {errors.revenue && (
                                            <p className="text-red-500 text-sm mt-1">{errors.revenue.message}</p>
                                        )}
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                                            Tell Us About Your Goals
                                        </label>
                                        <textarea
                                            {...register('message', { required: 'Please tell us about your goals' })}
                                            id="message"
                                            rows={4}
                                            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none resize-none"
                                            placeholder="Describe your current situation and where you want to be..."
                                        />
                                        {errors.message && (
                                            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full px-8 py-4 bg-gradient-rainbow text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                Book Strategy Call
                                                <ArrowRight className="w-5 h-5" />
                                            </>
                                        )}
                                    </motion.button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

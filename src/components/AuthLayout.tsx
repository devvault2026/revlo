import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, Star } from 'lucide-react';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
    features?: string[];
    testimonial?: {
        text: string;
        author: string;
        role: string;
    };
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle, features, testimonial }) => {
    return (
        <div className="min-h-screen flex bg-white">
            {/* Left Side - Brand & Info (1/3) */}
            <div className="hidden lg:flex w-1/3 bg-slate-900 relative overflow-hidden flex-col justify-between p-12 text-white">
                {/* Background Gradients */}
                <div className="absolute top-0 left-0 w-full h-full opacity-20 z-0">
                    <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-purple-600 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-blue-600 rounded-full blur-[120px]" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-3xl font-black font-display text-white">REVLO</span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">OS</span>
                    </Link>

                    {/* Main text */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h1 className="text-4xl font-black font-display mb-4 leading-tight">
                                {title}
                            </h1>
                            <p className="text-lg text-slate-300 leading-relaxed font-light">
                                {subtitle}
                            </p>
                        </motion.div>

                        {features && (
                            <motion.ul
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="space-y-4"
                            >
                                {features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3 text-slate-300">
                                        <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </motion.ul>
                        )}
                    </div>

                    {/* Testimonial or Bottom Element */}
                    {testimonial ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10"
                        >
                            <div className="flex gap-1 text-yellow-400 mb-3">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                            </div>
                            <p className="text-slate-200 italic mb-4">"{testimonial.text}"</p>
                            <div>
                                <p className="font-bold text-white">{testimonial.author}</p>
                                <p className="text-xs text-slate-400">{testimonial.role}</p>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="text-xs text-slate-500">
                            © {new Date().getFullYear()} Revlo Agency. All rights reserved.
                        </div>
                    )}
                </div>
            </div>

            {/* Right Side - Form (2/3) */}
            <div className="w-full lg:w-2/3 flex flex-col items-center justify-center p-6 lg:p-24 relative">
                <div className="absolute top-6 right-6 lg:hidden">
                    <Link to="/" className="text-sm font-bold text-slate-500">Back to Home</Link>
                </div>

                <div className="absolute top-0 right-0 w-full h-2 bg-gradient-rainbow" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    {children}
                </motion.div>
            </div>
        </div>
    );
};

export default AuthLayout;

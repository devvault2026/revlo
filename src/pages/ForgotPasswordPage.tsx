import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowLeft, ShieldCheck, RefreshCw, Loader2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AuthLayout from '../components/AuthLayout';

const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });

            if (error) throw error;
            setIsSubmitted(true);
        } catch (err: any) {
            console.error('Reset error:', err);
            setError(err.message || 'Failed to dispatch recovery signal. Verify your terminal address.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            title="System Recovery"
            subtitle="Initiate security protocols to regain access to your growth terminal."
            testimonial={{
                text: "Security is non-negotiable at our scale. Revlo's recovery protocols are streamlined yet incredibly secure.",
                author: "David Miller",
                role: "VP of Engineering at CloudNet"
            }}
        >
            <AnimatePresence mode="wait">
                {!isSubmitted ? (
                    <motion.div
                        key="request"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <div className="mb-12">
                            <div className="flex items-center gap-2 mb-4">
                                <ShieldCheck className="w-5 h-5 text-purple-600" />
                                <span className="text-[10px] font-black text-purple-600 uppercase tracking-[0.2em]">Security Protocol 44-B</span>
                            </div>
                            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-3">Forgot Password?</h2>
                            <p className="text-slate-500 font-medium">No problem. Enter your identifier to receive a recovery link.</p>
                        </div>

                        {error && (
                            <div className="mb-8 bg-red-50 border border-red-100 text-red-600 p-5 rounded-2xl flex items-start gap-4">
                                <p className="text-sm font-bold uppercase tracking-widest leading-relaxed">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Identifier</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-purple-500 transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100 transition-all outline-none font-bold text-slate-900 placeholder:text-slate-300"
                                        placeholder="you@company.com"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-5 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-xl shadow-slate-200 hover:shadow-2xl hover:bg-slate-800 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:translate-y-0 group"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        Dispatch Link
                                        <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-12 text-center pt-8 border-t border-slate-100">
                            <Link to="/login" className="inline-flex items-center gap-2 text-slate-400 font-bold text-sm tracking-tight uppercase hover:text-purple-600 transition-colors group">
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Back to Access Portal
                            </Link>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-10"
                    >
                        <div className="w-24 h-24 bg-gradient-rainbow rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-2xl relative">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], rotate: [0, 360, 0] }}
                                transition={{ duration: 10, repeat: Infinity }}
                                className="absolute inset-0 bg-white/20 rounded-[32px] blur-xl"
                            />
                            <Mail className="w-10 h-10 text-white relative z-10" />
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 }}
                                className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-purple-100"
                            >
                                <Sparkles className="w-6 h-6 text-purple-600" />
                            </motion.div>
                        </div>

                        <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Signal Dispatched</h2>
                        <p className="text-slate-500 font-medium mb-10 max-w-sm mx-auto">
                            Protocol initiated. Check <span className="text-slate-900 font-black">{email}</span> for your secure recovery parameters.
                        </p>

                        <Link
                            to="/login"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-slate-50 text-slate-600 font-black uppercase tracking-[0.2em] text-xs rounded-2xl border border-slate-200 hover:border-purple-200 hover:bg-white hover:text-purple-600 transition-all active:scale-95 shadow-sm"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Return to Login
                        </Link>

                        <p className="mt-12 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Didn't receive it? Check your spam filter or <button onClick={() => setIsSubmitted(false)} className="text-purple-600 hover:underline">retry dispatch</button>
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </AuthLayout>
    );
};

export default ForgotPasswordPage;

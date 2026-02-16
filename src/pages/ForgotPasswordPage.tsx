import React, { useState } from 'react';
import { useSignIn } from '@clerk/clerk-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowLeft, ShieldCheck, RefreshCw, Loader2, Sparkles, Key, Lock, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

const ForgotPasswordPage: React.FC = () => {
    const { isLoaded, signIn, setActive } = useSignIn();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [step, setStep] = useState<'request' | 'reset'>('request');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Step 1: Request Password Reset Code
    const handleRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return;
        setIsLoading(true);
        setError(null);

        try {
            await signIn.create({
                strategy: 'reset_password_email_code',
                identifier: email,
            });
            setStep('reset');
        } catch (err: any) {
            console.error('Reset Request Error:', err);
            setError(err.errors?.[0]?.message || 'Failed to dispatch recovery code. Please verify email.');
        } finally {
            setIsLoading(false);
        }
    };

    // Step 2: Reset Password with Code
    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return;
        setIsLoading(true);
        setError(null);

        try {
            const result = await signIn.attemptFirstFactor({
                strategy: 'reset_password_email_code',
                code,
                password,
            });

            if (result.status === 'complete') {
                await setActive({ session: result.createdSessionId });
                navigate('/revlo-os');
            } else {
                console.log('Reset Result:', result);
                setError('Reset incomplete. Please check your verification code.');
            }
        } catch (err: any) {
            console.error('Reset Error:', err);
            setError(err.errors?.[0]?.message || 'Failed to reset password. Invalid code or password.');
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
                {step === 'request' ? (
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
                            <p className="text-slate-500 font-medium">No problem. Enter your identifier to receive a recovery code.</p>
                        </div>

                        {error && (
                            <div className="mb-8 bg-red-50 border border-red-100 text-red-600 p-5 rounded-2xl flex items-start gap-4">
                                <p className="text-sm font-bold uppercase tracking-widest leading-relaxed">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleRequest} className="space-y-6">
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
                                        Dispatch Code
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
                        key="reset"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-4">
                                <Key className="w-5 h-5 text-green-600" />
                                <span className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em]">Reset Authority Granted</span>
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2 font-display">Set New Credentials</h2>
                            <p className="text-slate-500 font-medium">Enter the code sent to {email} and your new password.</p>
                        </div>

                        {error && (
                            <div className="mb-6 bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl flex items-start gap-4">
                                <p className="text-xs font-bold uppercase tracking-widest">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleReset} className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-xs font-black text-slate-900 uppercase tracking-widest ml-1">Verification Code</label>
                                <input
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-900 font-black text-2xl tracking-[0.5em] text-center placeholder:text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-mono"
                                    placeholder="000000"
                                    maxLength={6}
                                    autoFocus
                                    required
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-black text-slate-900 uppercase tracking-widest ml-1">New Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all"
                                        placeholder="New secure password"
                                        required
                                        minLength={8}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-black text-lg tracking-wide shadow-xl shadow-green-500/20 hover:shadow-2xl hover:shadow-green-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                            >
                                {isLoading ? <Loader2 className="animate-spin" /> : (
                                    <>
                                        Update Credentials <Lock size={20} />
                                    </>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => setStep('request')}
                                className="w-full py-2 text-slate-400 font-bold hover:text-slate-600 transition-colors text-sm"
                            >
                                Back to Email Entry
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </AuthLayout>
    );
};

export default ForgotPasswordPage;

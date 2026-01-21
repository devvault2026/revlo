import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowRight, Loader2, Mail, Lock, ShieldCheck, AlertCircle } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import { signIn } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const LoginPage: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            navigate('/revlo-os', { replace: true });
        }
    }, [user, navigate]);

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        setAuthError(null);
        try {
            const result = await signIn(data.email, data.password);
            if (!result.user) throw new Error("Login failed - no user returned");
        } catch (error: any) {
            console.error('Login error:', error);
            setAuthError(error.message || 'Failed to sign in. Please check your credentials.');
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Accelerate Growth"
            subtitle="Access the world's most advanced AI growth protocol and scale with REVLO OS."
            testimonial={{
                text: "Revlo OS actually delivers. Our outreach efficiency quadrupled in months.",
                author: "Marcus Chen",
                role: "CRO at SaaS Flow"
            }}
            features={[
                "AI Lead Sourcing",
                "Neural Content",
                "Real-time Pipeline",
                "Guardian Security"
            ]}
        >
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-4 h-4 text-purple-600" />
                    <span className="text-[9px] font-black text-purple-600 uppercase tracking-[0.2em]">Secure Portal</span>
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Welcome Back</h2>
                <p className="text-sm text-slate-500 font-medium">Initialize your session to continue.</p>
            </div>

            {authError && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl flex items-start gap-3 shadow-sm"
                >
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 opacity-80" />
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-wider mb-0.5 text-red-800">Auth Breach</p>
                        <p className="text-xs opacity-90 leading-tight">{authError}</p>
                    </div>
                </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Identifier</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-purple-500 transition-colors" />
                        <input
                            type="email"
                            {...register('email', { required: 'Required' })}
                            className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100 transition-all outline-none font-bold text-slate-900 text-sm placeholder:text-slate-300"
                            placeholder="you@company.com"
                        />
                    </div>
                    {errors.email && <p className="text-red-500 text-[9px] font-black uppercase tracking-widest mt-1 ml-1">Required</p>}
                </div>

                <div className="space-y-1.5">
                    <div className="flex justify-between items-center ml-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Security Phrase</label>
                        <Link to="/forgot-password" size="sm" className="text-[9px] font-black text-purple-600 hover:text-purple-700 uppercase tracking-widest transition-colors">
                            Lost?
                        </Link>
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-purple-500 transition-colors" />
                        <input
                            type="password"
                            {...register('password', { required: 'Required' })}
                            className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100 transition-all outline-none font-bold text-slate-900 text-sm placeholder:text-slate-300"
                            placeholder="••••••••"
                        />
                    </div>
                    {errors.password && <p className="text-red-500 text-[9px] font-black uppercase tracking-widest mt-1 ml-1">Required</p>}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-xl shadow-lg border border-slate-800 hover:shadow-xl hover:bg-slate-800 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0 group"
                >
                    {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <>
                            Initialize OS
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-8 text-center pt-6 border-t border-slate-100">
                <p className="text-slate-400 font-bold text-[10px] tracking-tight uppercase">
                    New to Protocol?{' '}
                    <Link to="/register" className="text-purple-600 hover:text-purple-700 font-black">
                        Apply for Access
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
};

export default LoginPage;
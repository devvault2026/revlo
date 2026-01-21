import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowRight, Loader2, User, Briefcase, Mail, Lock, ShieldPlus, AlertCircle } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import { signUp } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const RegisterPage: React.FC = () => {
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
            const result = await signUp(data.email, data.password, {
                full_name: data.fullName,
                company_name: data.company
            });

            if (!result.user && !result.session) {
                setAuthError("Check inbox. Verification dispatched to terminal.");
                setIsLoading(false);
            }
        } catch (error: any) {
            console.error('Registration error:', error);
            setAuthError(error.message || 'Transmission failed.');
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Join the Elite"
            subtitle="Secure your position within the ecosystem and unlock autonomous scaling."
            features={[
                "AI Ingestion Nodes",
                "Omni-channel Reach",
                "Intelligence Streams",
                "Exclusive Access"
            ]}
            testimonial={{
                text: "Scaling to $1M ARR used to take years. We're seeing it in months.",
                author: "Sarah Jenkins",
                role: "CEO at Pulse"
            }}
        >
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <ShieldPlus className="w-4 h-4 text-purple-600" />
                    <span className="text-[9px] font-black text-purple-600 uppercase tracking-[0.2em]">Deployment Protocol</span>
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Request Access</h2>
                <p className="text-sm text-slate-500 font-medium leading-tight">Initialize your profile within the network.</p>
            </div>

            {authError && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-4 bg-blue-50 border border-blue-100 text-blue-600 p-3 rounded-xl flex items-start gap-3 shadow-sm"
                >
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-80" />
                    <div>
                        <p className="text-[9px] font-black uppercase tracking-wider mb-0.5 text-blue-800">Notification</p>
                        <p className="text-xs opacity-90 leading-tight">{authError}</p>
                    </div>
                </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Identity</label>
                        <div className="relative group">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-purple-500 transition-colors" />
                            <input
                                type="text"
                                {...register('fullName', { required: true })}
                                className="w-full pl-9 pr-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:border-purple-500 focus:bg-white transition-all outline-none font-bold text-slate-900 text-xs placeholder:text-slate-300"
                                placeholder="Full Name"
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Entity</label>
                        <div className="relative group">
                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-purple-500 transition-colors" />
                            <input
                                type="text"
                                {...register('company', { required: true })}
                                className="w-full pl-9 pr-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:border-purple-500 focus:bg-white transition-all outline-none font-bold text-slate-900 text-xs placeholder:text-slate-300"
                                placeholder="Acme Inc"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Mail Terminal</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-purple-500 transition-colors" />
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:border-purple-500 focus:bg-white transition-all outline-none font-bold text-slate-900 text-xs placeholder:text-slate-300"
                            placeholder="you@company.com"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Phrase</label>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-purple-500 transition-colors" />
                        <input
                            type="password"
                            {...register('password', { required: true, minLength: 8 })}
                            className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:border-purple-500 focus:bg-white transition-all outline-none font-bold text-slate-900 text-xs placeholder:text-slate-300"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-xl shadow-lg border border-slate-800 hover:shadow-xl hover:bg-slate-800 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                    {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <>
                            Deploy Profile
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-6 text-center pt-4 border-t border-slate-100">
                <p className="text-slate-400 font-bold text-[10px] tracking-tight uppercase">
                    Already within?{' '}
                    <Link to="/login" className="text-purple-600 hover:text-purple-700 font-black">
                        Sign In
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
};

export default RegisterPage;

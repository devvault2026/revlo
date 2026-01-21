import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import { signUp } from '../lib/supabase';
import { useAppStore } from '../store/appStore';

const RegisterPage: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);
    const navigate = useNavigate();
    const setUser = useAppStore((state) => state.setUser);

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        setAuthError(null);
        try {
            // Include metadata like name and company in the sign up
            const result = await signUp(data.email, data.password, {
                full_name: data.fullName,
                company_name: data.company
            });

            if (result.user) {
                setUser(result.user);
                // Optional: You might want to redirect to an onboarding flow or directly to dashboard
                // For now, let's go to admin
                navigate('/admin');
            } else if (result.session === null && !result.user && !authError) {
                // Sometimes supabase requires email verification, so user might not be logged in immediately
                // Check if session is established.
                setAuthError("Please check your email to verify your account.");
            }

        } catch (error: any) {
            console.error('Registration error:', error);
            setAuthError(error.message || 'Failed to create account. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Join the Elite"
            subtitle="Secure your spot in the Revlo OS ecosystem. Applications are processed within 24 hours."
            features={[
                "AI-Powered Lead Sourcing",
                "Automated Multi-channel Outreach",
                "Real-time Competitor Intelligence",
                "Dedicated Growth Strategist"
            ]}
        >
            <div className="mb-10 text-center lg:text-left">
                <Link to="/" className="lg:hidden inline-flex items-center gap-2 mb-8">
                    <span className="text-2xl font-black font-display gradient-text">REVLO</span>
                </Link>
                <h2 className="text-3xl font-bold mb-2">Create Account</h2>
                <p className="text-slate-600">Start your journey to 7-figure scaling today.</p>
            </div>

            {authError && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{authError}</p>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700">Full Name</label>
                        <input
                            type="text"
                            {...register('fullName', { required: 'Name is required' })}
                            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
                            placeholder="John Doe"
                        />
                        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message as string}</p>}
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700">Company</label>
                        <input
                            type="text"
                            {...register('company', { required: 'Company is required' })}
                            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
                            placeholder="Acme Inc"
                        />
                        {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company.message as string}</p>}
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Email Address</label>
                    <input
                        type="email"
                        {...register('email', { required: 'Email is required' })}
                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
                        placeholder="you@company.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message as string}</p>}
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Password</label>
                    <input
                        type="password"
                        {...register('password', { required: 'Password is required', minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
                        placeholder="••••••••"
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message as string}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-gradient-rainbow text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
                >
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            Create Account
                            <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-slate-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-bold text-purple-600 hover:text-purple-700">
                        Sign In
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
};

export default RegisterPage;

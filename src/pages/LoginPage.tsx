import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import { signIn } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);
    const navigate = useNavigate();
    // We rely on AuthContext for state, not useAppStore manual setting to ensure synchronization
    const { user } = useAuth(); // Import useAuth from context

    // Redirect when user state is confirmed
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
            // No manual navigation here; useEffect will handle it when AuthContext updates
        } catch (error: any) {
            console.error('Login error:', error);
            window.alert(`Login Failed: ${error.message || 'Unknown error'}`);
            setAuthError(error.message || 'Failed to sign in. Please check your credentials.');
            setIsLoading(false); // Stop loading only on error
        }
        // If success, we keep loading state true until redirect happens or component unmounts
    };

    return (
        <AuthLayout
            title="Log in to Revlo OS"
            subtitle="Access your growth engine and monitor your campaign performance in real-time."
            testimonial={{
                text: "Since using Revlo OS, our pipeline visibility has increased by 400%. It's the only tool we log into every single day.",
                author: "Marcus Chen",
                role: "CRO at SaaS Flow"
            }}
        >
            <div className="mb-10 text-center lg:text-left">
                <Link to="/" className="lg:hidden inline-flex items-center gap-2 mb-8">
                    <span className="text-2xl font-black font-display gradient-text">REVLO</span>
                </Link>
                <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                <p className="text-slate-600">Enter your credentials to access your dashboard.</p>
            </div>

            {authError && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{authError}</p>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                    <div className="flex justify-between">
                        <label className="text-sm font-semibold text-slate-700">Password</label>
                        <Link to="/forgot-password" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                            Forgot password?
                        </Link>
                    </div>
                    <input
                        type="password"
                        {...register('password', { required: 'Password is required' })}
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
                            Sign In
                            <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-slate-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-bold text-purple-600 hover:text-purple-700">
                        Apply for Access
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
};

export default LoginPage;

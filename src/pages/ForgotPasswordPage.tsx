import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import { supabase } from '../lib/supabase';

const ForgotPasswordPage: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        setError(null);
        setMessage(null);

        try {
            const { error: resetError } = await supabase.auth.resetPasswordForEmail(data.email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });
            if (resetError) throw resetError;
            setMessage("Password reset link has been sent to your email.");
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Failed to send reset email.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Reset Password"
            subtitle="Enter your email to receive instructions to reset your password."
            testimonial={{
                text: "Revlo's security is top notch. Resetting access was seamless and secure.",
                author: "Sarah J.",
                role: "CTO"
            }}
        >
            <div className="mb-10 text-center lg:text-left">
                <Link to="/" className="lg:hidden inline-flex items-center gap-2 mb-8">
                    <span className="text-2xl font-black font-display gradient-text">REVLO</span>
                </Link>
                <h2 className="text-3xl font-bold mb-2">Forgot Password</h2>
                <p className="text-slate-600">We'll help you get back in.</p>
            </div>

            {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{error}</p>
                </div>
            )}
            {message && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{message}</p>
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

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-gradient-rainbow text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
                >
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            Send Reset Link
                            <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-slate-600">
                    <Link to="/login" className="font-bold text-gray-600 hover:text-purple-700 flex items-center justify-center gap-2">
                        Back to Login
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
};

export default ForgotPasswordPage;

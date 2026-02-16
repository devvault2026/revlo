import React, { useState } from 'react';
import { useSignUp } from '@clerk/clerk-react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { Loader2, AlertCircle, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RegisterPage: React.FC = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const navigate = useNavigate();

    // Form State
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [code, setCode] = useState('');

    // UI State
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // OAuth Handlers
    const handleOAuthSignUp = async (strategy: 'oauth_google' | 'oauth_facebook' | 'oauth_linkedin_oidc') => {
        if (!isLoaded) return;
        try {
            await signUp.authenticateWithRedirect({
                strategy,
                redirectUrl: '/sso-callback',
                redirectUrlComplete: '/revlo-os'
            });
        } catch (err: any) {
            console.error('OAuth Error:', err);
            setError(err.errors?.[0]?.message || `Failed to initiate ${strategy} registration`);
        }
    };

    // Initial Registration
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return;
        setLoading(true);
        setError('');

        try {
            await signUp.create({
                firstName,
                lastName,
                emailAddress: email,
                password,
            });

            // Send email verification code
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
            setVerifying(true);
        } catch (err: any) {
            console.error('Registration Error:', err);
            setError(err.errors?.[0]?.message || 'Failed to initiate registration.');
        } finally {
            setLoading(false);
        }
    };

    // Code Verification
    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return;
        setLoading(true);
        setError('');

        try {
            const result = await signUp.attemptEmailAddressVerification({
                code,
            });

            if (result.status === 'complete') {
                await setActive({ session: result.createdSessionId });
                navigate('/revlo-os');
            } else {
                console.log('Verification Result:', result);
                setError('Verification incomplete. Please check your code.');
            }
        } catch (err: any) {
            console.error('Verification Error:', err);
            setError(err.errors?.[0]?.message || 'Invalid verification code.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Partner for Growth"
            subtitle="Gain access to our partner portal and managed growth systems designed to scale your business."
            testimonial={{
                text: "Partnering with Revlo was the best decision for our scale. Transparent, effective, and results-driven.",
                author: "Sarah Jenkins",
                role: "CEO at Pulse"
            }}
            features={[
                "Managed Growth",
                "Market Expansion",
                "Sales Intelligence",
                "Direct Support"
            ]}
        >
            <div className="w-full relative">
                <AnimatePresence mode="wait">
                    {!verifying ? (
                        <motion.div
                            key="register-form"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="w-full"
                        >
                            <div className="mb-8 text-center">
                                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2 font-display">Create your account</h2>
                                <p className="text-slate-500 font-medium">Join the partner network to get started.</p>
                            </div>

                            {/* Social Login */}
                            <div className="grid grid-cols-3 gap-4 mb-8">
                                <button
                                    type="button"
                                    onClick={() => handleOAuthSignUp('oauth_facebook')}
                                    className="flex items-center justify-center py-3.5 border-2 border-slate-100 hover:border-purple-100 bg-white rounded-2xl text-slate-600 font-bold transition-all hover:bg-slate-50 hover:shadow-lg hover:shadow-purple-500/5 group"
                                    title="Continue with Facebook"
                                >
                                    <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="Facebook" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleOAuthSignUp('oauth_google')}
                                    className="flex items-center justify-center py-3.5 border-2 border-slate-100 hover:border-purple-100 bg-white rounded-2xl text-slate-600 font-bold transition-all hover:bg-slate-50 hover:shadow-lg hover:shadow-purple-500/5 group"
                                    title="Continue with Google"
                                >
                                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="Google" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleOAuthSignUp('oauth_linkedin_oidc')}
                                    className="flex items-center justify-center py-3.5 border-2 border-slate-100 hover:border-purple-100 bg-white rounded-2xl text-slate-600 font-bold transition-all hover:bg-slate-50 hover:shadow-lg hover:shadow-purple-500/5 group"
                                    title="Continue with LinkedIn"
                                >
                                    <img src="https://www.svgrepo.com/show/475661/linkedin-color.svg" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="LinkedIn" />
                                </button>
                            </div>

                            <div className="relative mb-8">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-100"></div>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white/95 px-4 text-slate-400 font-black tracking-widest">Or continue with email</span>
                                </div>
                            </div>

                            <form onSubmit={handleRegister} className="space-y-5">
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-600"
                                    >
                                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                        <p className="text-sm font-bold">{error.includes('is invalid') ? `Registration attempt ${error}` : error}</p>
                                    </motion.div>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-black text-slate-900 uppercase tracking-widest ml-1">First Name</label>
                                        <input
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all"
                                            placeholder="Jane"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-black text-slate-900 uppercase tracking-widest ml-1">Last Name</label>
                                        <input
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all"
                                            placeholder="Doe"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-black text-slate-900 uppercase tracking-widest ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all"
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-black text-slate-900 uppercase tracking-widest ml-1">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all"
                                            placeholder="••••••••••••"
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
                                    disabled={loading}
                                    className="w-full py-4 bg-[#0a0c12] hover:bg-slate-900 text-white rounded-2xl font-black text-lg tracking-wide shadow-xl shadow-purple-500/20 hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : (
                                        <>
                                            Continue <ArrowRight size={20} />
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="mt-8 text-center">
                                <p className="text-slate-400 text-sm font-medium">
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-purple-600 font-black hover:text-purple-700 transition-colors">
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="verification-form"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="w-full"
                        >
                            <div className="mb-8 text-center">
                                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2 font-display">Verify your email</h2>
                                <p className="text-slate-500 font-medium">We sent a verification code to <span className="font-bold text-slate-900">{email}</span></p>
                            </div>

                            <form onSubmit={handleVerify} className="space-y-6">
                                {error && (
                                    <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-600">
                                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                        <p className="text-sm font-bold">{error}</p>
                                    </div>
                                )}

                                <div className="space-y-1.5">
                                    <label className="text-xs font-black text-slate-900 uppercase tracking-widest ml-1">Verification Code</label>
                                    <input
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-900 font-black text-3xl tracking-[0.5em] text-center placeholder:text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-mono"
                                        placeholder="000000"
                                        maxLength={6}
                                        autoFocus
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-[#0a0c12] hover:bg-slate-900 text-white rounded-2xl font-black text-lg tracking-wide shadow-xl shadow-purple-500/20 hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : (
                                        <>
                                            Verify Access <ArrowRight size={20} />
                                        </>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setVerifying(false)}
                                    className="w-full py-2 text-slate-400 font-bold hover:text-slate-600 transition-colors text-sm"
                                >
                                    Back to Registration
                                </button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </AuthLayout>
    );
};

export default RegisterPage;

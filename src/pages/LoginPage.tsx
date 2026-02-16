import React, { useState } from 'react';
import { useSignIn } from '@clerk/clerk-react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { Loader2, AlertCircle, Eye, EyeOff, ArrowRight, Github, Chrome } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage: React.FC = () => {
    const { isLoaded, signIn, setActive } = useSignIn();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // OAuth Handlers
    const handleOAuthLogin = async (strategy: 'oauth_google' | 'oauth_facebook' | 'oauth_linkedin_oidc') => {
        if (!isLoaded) return;
        try {
            await signIn.authenticateWithRedirect({
                strategy,
                redirectUrl: '/sso-callback',
                redirectUrlComplete: '/revlo-os'
            });
        } catch (err: any) {
            console.error('OAuth Error:', err);
            setError(err.errors?.[0]?.message || `Failed to initiate ${strategy} login`);
        }
    };

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return;
        setLoading(true);
        setError('');

        try {
            const result = await signIn.create({
                identifier: email,
                password,
            });

            if (result.status === 'complete') {
                await setActive({ session: result.createdSessionId });
                navigate('/revlo-os');
            } else {
                console.log('SignIn Result:', result);
                setError('Additional verification required. This custom flow only supports standard login currently.');
            }
        } catch (err: any) {
            console.error('Login Error:', err);
            setError(err.errors?.[0]?.message || 'Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Scale Your Potential"
            subtitle="Access our partner portal to manage your growth strategy and track real-time sales intelligence."
            testimonial={{
                text: "The Revlo Partner Portal gives us total transparency. Our revenue has never been more predictable.",
                author: "Marcus Chen",
                role: "CRO at SaaS Flow"
            }}
            features={[
                "Managed Growth",
                "Brand Authority",
                "Sales Intelligence",
                "Data Privacy"
            ]}
        >
            <div className="w-full">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2 font-display">Welcome back</h2>
                    <p className="text-slate-500 font-medium">Enter your credentials to access the terminal.</p>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <button
                        type="button"
                        onClick={() => handleOAuthLogin('oauth_facebook')}
                        className="flex items-center justify-center py-3.5 border-2 border-slate-100 hover:border-purple-100 bg-white rounded-2xl text-slate-600 font-bold transition-all hover:bg-slate-50 hover:shadow-lg hover:shadow-purple-500/5 group"
                        title="Continue with Facebook"
                    >
                        <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="Facebook" />
                    </button>
                    <button
                        type="button"
                        onClick={() => handleOAuthLogin('oauth_google')}
                        className="flex items-center justify-center py-3.5 border-2 border-slate-100 hover:border-purple-100 bg-white rounded-2xl text-slate-600 font-bold transition-all hover:bg-slate-50 hover:shadow-lg hover:shadow-purple-500/5 group"
                        title="Continue with Google"
                    >
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="Google" />
                    </button>
                    <button
                        type="button"
                        onClick={() => handleOAuthLogin('oauth_linkedin_oidc')}
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

                <form onSubmit={handleEmailLogin} className="space-y-5">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-600"
                        >
                            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <p className="text-sm font-bold">{error.includes('is invalid') ? `Login attempt ${error}` : error}</p>
                        </motion.div>
                    )}

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
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-xs font-black text-slate-900 uppercase tracking-widest">Password</label>
                            <Link to="/forgot-password" className="text-[10px] font-black text-purple-600 uppercase tracking-widest hover:text-purple-700">Forgot?</Link>
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all"
                                placeholder="••••••••••••"
                                required
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
                                Sign In <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-slate-400 text-sm font-medium">
                        Don't have access?{' '}
                        <Link to="/register" className="text-purple-600 font-black hover:text-purple-700 transition-colors">
                            Apply for Partner Portal
                        </Link>
                    </p>
                </div>
            </div>
        </AuthLayout>
    );
};

export default LoginPage;
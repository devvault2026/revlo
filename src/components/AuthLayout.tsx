import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, Star, ShieldCheck, Zap, Globe, Sparkles } from 'lucide-react';

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
        <div className="h-screen w-full flex items-center justify-center bg-[#020408] font-sans selection:bg-purple-500/30 selection:text-white overflow-hidden relative">

            {/* FULL SCREEN DYNAMIC MESH GRADIENT BACKGROUND */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Brand Blobs - Red, Blue, Purple */}
                <motion.div
                    animate={{
                        x: [0, 100, -50, 0],
                        y: [0, -100, 50, 0],
                        scale: [1, 1.2, 0.8, 1],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-purple-600/20 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        x: [0, -150, 100, 0],
                        y: [0, 100, -150, 0],
                        scale: [1, 1.3, 0.9, 1],
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[-20%] right-[-10%] w-[90%] h-[90%] bg-blue-600/15 rounded-full blur-[140px]"
                />
                <motion.div
                    animate={{
                        x: [0, 120, -100, 0],
                        y: [0, 80, -120, 0],
                        scale: [1, 1.1, 1.2, 1],
                    }}
                    transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[20%] right-[10%] w-[60%] h-[60%] bg-red-600/10 rounded-full blur-[110px]"
                />

                {/* Animated Grid Lines */}
                <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay">
                    <motion.div
                        animate={{ y: ["0%", "-50%"] }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="w-full h-[200%] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:100%_60px]"
                    />
                </div>

                {/* Noise Overaly */}
                <div className="absolute inset-0 opacity-[0.1] mix-blend-multiply" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
            </div>

            <div className="w-full h-full flex relative z-10 max-w-[1600px] mx-auto overflow-hidden">
                {/* Left Side - Brand Narrative (Visible on Desktop) */}
                <div className="hidden lg:flex w-[40%] flex-col justify-between p-12 text-white">
                    {/* Header Logo */}
                    <Link to="/" className="flex items-center gap-4 group">
                        <div className="w-10 h-10 bg-gradient-rainbow p-[1px] rounded-[14px] shadow-2xl shadow-purple-500/20 group-hover:scale-110 transition-transform duration-500">
                            <div className="w-full h-full bg-[#020408] rounded-[13px] flex items-center justify-center">
                                <img src="/logo.png" alt="R" className="w-5 h-5 object-contain brightness-0 invert" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-black font-display tracking-tight text-white uppercase italic">REVLO</span>
                                <span className="text-[10px] font-black bg-white/10 backdrop-blur-md text-white border border-white/10 px-2 py-0.5 rounded-full leading-none tracking-widest">OS</span>
                            </div>
                        </div>
                    </Link>

                    {/* Content Section */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-px w-8 bg-gradient-to-r from-purple-500 to-transparent" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-400">Status: Operational</span>
                            </div>
                            <h1 className="text-5xl font-black font-display mb-4 leading-tight tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40 italic">
                                {title}
                            </h1>
                            <p className="text-lg text-slate-400 leading-relaxed font-medium max-w-sm">
                                {subtitle}
                            </p>
                        </motion.div>

                        {features && (
                            <div className="grid grid-cols-1 gap-4">
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + (index * 0.1) }}
                                        className="flex items-center gap-4 group"
                                    >
                                        <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-purple-500/20 group-hover:border-purple-500/50 transition-all duration-300 shadow-inner overflow-hidden relative">
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <CheckCircle2 className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                                        </div>
                                        <span className="font-bold text-sm tracking-wide text-slate-300 group-hover:text-white transition-colors">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Bottom Testimonial / Social Proof */}
                    <div className="flex flex-col gap-6">
                        {testimonial && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                                className="bg-white/5 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                                    <Sparkles className="w-12 h-12 text-white" />
                                </div>
                                <div className="flex gap-1 text-yellow-400 mb-4">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                                </div>
                                <p className="text-slate-200 text-sm font-medium leading-relaxed mb-6">"{testimonial.text}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-2xl bg-gradient-rainbow p-[1px]">
                                        <div className="w-full h-full bg-[#020408] rounded-[11px] flex items-center justify-center text-white text-sm font-black italic">
                                            {testimonial.author.charAt(0)}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-black text-white text-xs tracking-tight">{testimonial.author}</p>
                                        <p className="text-[9px] font-black text-purple-400 uppercase tracking-[0.2em]">{testimonial.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        <div className="flex items-center gap-6 pt-4 border-t border-white/5 opacity-40">
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="w-4 h-4" />
                                <span className="text-[9px] font-black uppercase tracking-[0.2em]">AES-256 System</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Zap className="w-4 h-4" />
                                <span className="text-[9px] font-black uppercase tracking-[0.2em]">Instant Sync</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form Interaction */}
                <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 relative overflow-hidden">
                    <div className="absolute top-8 right-12 z-50">
                        <Link to="/" className="flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 hover:border-white/20 shadow-2xl transition-all group active:scale-95">
                            Terminal Mode
                            <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                                <ArrowRightIcon className="w-3 h-3" />
                            </motion.div>
                        </Link>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full max-w-lg relative"
                    >
                        {/* Glowing Background Ring for the Card */}
                        <div className="absolute -inset-4 bg-gradient-rainbow blur-3xl opacity-10 animate-pulse" />

                        <div className="bg-white/95 backdrop-blur-3xl rounded-[48px] p-10 lg:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.3)] border border-white relative overflow-hidden">
                            {/* Inner Decorative Elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />

                            <div className="relative z-10">
                                {children}
                            </div>
                        </div>
                    </motion.div>

                    <div className="mt-12 flex items-center justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Google_Cloud_logo.svg" alt="Google" className="h-4 brightness-0 invert" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" className="h-5 brightness-0 invert" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-4 brightness-0 invert" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const ArrowRightIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);

export default AuthLayout;

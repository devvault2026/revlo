import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileUp, Loader2, CheckCircle, Lock, ArrowRight, UserPlus } from 'lucide-react';
import { supabase, getCurrentUser, getDemoUsage, incrementDemoUsage } from '../../lib/supabase';

interface TakeoffDemoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TakeoffDemoModal: React.FC<TakeoffDemoModalProps> = ({ isOpen, onClose }) => {
    const [user, setUser] = useState<any>(null);
    const [usage, setUsage] = useState<any>(null);
    const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'ready' | 'limit_reached'>('idle');
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUser();
    }, [isOpen]);

    const checkUser = async () => {
        setLoading(true);
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        if (currentUser) {
            const usageData = await getDemoUsage(currentUser.id);
            setUsage(usageData);
            if (usageData && (usageData.usage_count ?? 0) >= 3) {
                setStatus('limit_reached');
            }
        }
        setLoading(false);
    };

    const startDemo = async () => {
        if (!user) return; // Should show sign up

        setStatus('uploading');
        let p = 0;
        const interval = setInterval(() => {
            p += 15;
            setProgress(Math.min(p, 100));
            if (p >= 100) {
                clearInterval(interval);
                setStatus('processing');

                // Finalize usage in background
                incrementDemoUsage(user.id).then(newUsage => {
                    setUsage(newUsage);
                });

                setTimeout(() => setStatus('ready'), 2000);
            }
        }, 80);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="relative w-full max-w-4xl bg-[#0c0d10] border border-zinc-800 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(234,88,12,0.15)]"
            >
                {/* Header */}
                <div className="flex justify-between items-center p-8 border-b border-zinc-900 bg-zinc-950/50">
                    <div>
                        <h3 className="text-2xl font-black italic uppercase italic text-white tracking-tighter">
                            PERFORMANCE <span className="text-orange-600">TEST CENTER</span>
                        </h3>
                        {user && (
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-1">
                                DEMO ACCESS: <span className={usage?.usage_count >= 3 ? 'text-red-500' : 'text-orange-500'}>
                                    {usage?.usage_count || 0} / 3 USED
                                </span>
                            </p>
                        )}
                    </div>
                    <button onClick={onClose} className="p-2 text-zinc-500 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-10 md:p-16">
                    {loading ? (
                        <div className="py-20 flex flex-col items-center gap-4">
                            <Loader2 className="animate-spin text-orange-600" size={32} />
                            <p className="text-xs font-black text-zinc-600 uppercase tracking-[0.3em]">AUTHENTICATING...</p>
                        </div>
                    ) : !user ? (
                        /* AUTH STATE */
                        <div className="text-center space-y-12">
                            <div className="space-y-4">
                                <h2 className="text-4xl md:text-6xl font-black italic uppercase italic text-white tracking-tighter">
                                    SIGN UP TO <br />
                                    START THE DEMO.
                                </h2>
                                <p className="text-xl font-bold text-zinc-500 italic uppercase">
                                    You get 3 free blueprint takeoffs after registration.
                                </p>
                            </div>

                            <div className="flex flex-col items-center gap-6">
                                <button
                                    onClick={() => window.location.href = '/register'}
                                    className="px-12 py-8 bg-orange-600 text-white font-black uppercase tracking-[0.2em] italic rounded-lg hover:bg-orange-500 active:scale-95 transition-all shadow-xl flex items-center gap-6 group text-xl"
                                >
                                    <UserPlus className="w-6 h-6" />
                                    CREATE FREE ACCOUNT
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
                                </button>
                                <p className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">
                                    NO CREDIT CARD REQUIRED • INSTANT ACCESS
                                </p>
                            </div>
                        </div>
                    ) : status === 'limit_reached' ? (
                        /* LIMIT REACHED */
                        <div className="text-center space-y-12 py-10">
                            <div className="w-20 h-20 bg-red-600/10 border-2 border-red-600/20 rounded-full flex items-center justify-center mx-auto text-red-600">
                                <Lock size={40} strokeWidth={2.5} />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-4xl md:text-5xl font-black italic uppercase italic text-white tracking-tighter">
                                    DEMO LIMIT <span className="text-red-600 text-6xl">REACHED.</span>
                                </h2>
                                <p className="text-xl font-bold text-zinc-500 italic uppercase">
                                    You've used all 3 free demo takeoffs.
                                </p>
                            </div>
                            <button
                                className="px-12 py-8 bg-white text-black font-black uppercase tracking-[0.2em] italic rounded-lg hover:scale-105 active:scale-95 transition-all shadow-xl text-xl"
                            >
                                UPGRADE TO UNLIMITED
                            </button>
                        </div>
                    ) : (
                        /* ACTIVE DEMO STATE */
                        <AnimatePresence mode="wait">
                            {status === 'idle' && (
                                <motion.div
                                    key="idle"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    onClick={startDemo}
                                    className="group flex flex-col items-center justify-center border-4 border-dashed border-zinc-800 rounded-3xl py-24 bg-zinc-950/20 cursor-pointer hover:border-orange-600/50 hover:bg-orange-600/5 transition-all px-8 text-center"
                                >
                                    <div className="w-24 h-24 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 group-hover:border-orange-600 transition-all shadow-2xl">
                                        <FileUp className="text-zinc-600 group-hover:text-orange-600 transition-colors" size={48} />
                                    </div>
                                    <h4 className="text-3xl font-black italic uppercase italic text-white mb-4 tracking-tighter leading-none">
                                        UPLOAD TEST BLUEPRINTS
                                    </h4>
                                    <p className="text-[11px] font-black text-zinc-600 uppercase tracking-[0.4em] italic leading-relaxed">
                                        CLICK OR DRAG YOUR PDF HERE <br />
                                        <span className="text-zinc-800">(MAX 25 SHEETS)</span>
                                    </p>
                                </motion.div>
                            )}

                            {(status === 'uploading' || status === 'processing') && (
                                <motion.div
                                    key="processing"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="py-24 flex flex-col items-center"
                                >
                                    <div className="w-full max-w-sm h-3 bg-zinc-900 rounded-full overflow-hidden mb-12 border border-zinc-800 shadow-inner">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            className="h-full bg-orange-600 shadow-[0_0_20px_rgba(234,88,12,0.5)]"
                                        />
                                    </div>
                                    <div className="flex flex-col items-center gap-8">
                                        <Loader2 className="animate-spin text-orange-600" size={48} />
                                        <div className="text-center">
                                            <span className="text-3xl font-black italic uppercase italic tracking-tighter text-white">
                                                {status === 'uploading' ? 'UPLOADING...' : 'ANALYZING SPECS...'}
                                            </span>
                                            <p className="text-[10px] font-black text-orange-600 uppercase tracking-[0.5em] mt-3">DO NOT CLOSE THIS TAB</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {status === 'ready' && (
                                <motion.div
                                    key="ready"
                                    className="space-y-10"
                                >
                                    <div className="p-10 bg-orange-600/5 border border-orange-600/30 rounded-3xl flex flex-col md:flex-row items-center gap-10 shadow-[0_0_50px_rgba(234,88,12,0.1)]">
                                        <div className="w-20 h-20 bg-orange-600 text-white flex items-center justify-center shrink-0 rounded-2xl shadow-xl">
                                            <CheckCircle size={40} strokeWidth={3} />
                                        </div>
                                        <div className="text-center md:text-left">
                                            <h5 className="text-4xl font-black italic uppercase italic text-white leading-none tracking-tighter">
                                                SPECIFICATION READY.
                                            </h5>
                                            <p className="text-xl font-bold text-orange-500 uppercase italic mt-2 tracking-tight">
                                                Complete takeoff generated from {Math.floor(Math.random() * 20) + 1} sheets.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <button className="group p-10 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col items-start gap-8 hover:border-orange-600/50 hover:bg-zinc-800 transition-all text-left">
                                            <div className="w-16 h-16 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <FileUp className="text-orange-600" size={32} />
                                            </div>
                                            <div>
                                                <p className="text-xl font-black italic uppercase italic text-white tracking-tight">VIEW MATERIAL LIST</p>
                                                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mt-2">DOWNLOAD .XLSX</p>
                                            </div>
                                        </button>
                                        <button className="group p-10 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col items-start gap-8 hover:border-orange-600/50 hover:bg-zinc-800 transition-all text-left">
                                            <div className="w-16 h-16 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <CheckCircle className="text-orange-600" size={32} strokeWidth={2} />
                                            </div>
                                            <div>
                                                <p className="text-xl font-black italic uppercase italic text-white tracking-tight">VIEW MARKED-UP PDF</p>
                                                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mt-2">DOWNLOAD .PDF</p>
                                            </div>
                                        </button>
                                    </div>

                                    <div className="text-center pt-10">
                                        <p className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.5em] italic">
                                            DEMO RUN COMPLETED • {3 - (usage?.usage_count || 0)} RUNS REMAINING
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    )
                    }
                </div>

                {/* Footer Grit Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-orange-600 via-zinc-800 to-orange-600 opacity-20" />
            </motion.div>
        </div>
    );
};

export default TakeoffDemoModal;

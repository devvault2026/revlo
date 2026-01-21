import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Terminal, AlertTriangle, ShieldX } from 'lucide-react';

const NotFoundPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#020408] flex items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[160px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[160px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'linear-gradient(to right, #ffffff10 1px, transparent 1px), linear-gradient(to bottom, #ffffff10 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

            <div className="relative z-10 max-w-4xl w-full text-center">
                {/* Error Code */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-8 inline-flex items-center gap-3 px-6 py-2 bg-red-500/10 border border-red-500/20 rounded-full"
                >
                    <ShieldX className="w-4 h-4 text-red-500" />
                    <span className="text-xs font-black text-red-500 uppercase tracking-[0.3em]">Protocol Error: 404 - Node Missing</span>
                </motion.div>

                {/* Big 404 Text with Glow */}
                <div className="relative mb-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-[180px] lg:text-[260px] font-black text-white/5 leading-none select-none"
                    >
                        404
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <div className="max-w-xl">
                            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight leading-[1.1]">
                                You've reached an <span className="text-transparent bg-clip-text bg-gradient-rainbow">Unmapped Sector</span>
                            </h2>
                            <p className="text-slate-400 text-lg font-medium leading-relaxed mb-12">
                                The requested coordinate does not exist within the REVLO OS infrastructure.
                                It may have been decommissioned or never authorized.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Control Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <Link
                        to="/revlo-os"
                        className="w-full sm:w-auto px-10 py-5 bg-gradient-rainbow p-[1px] rounded-2xl group transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(139,92,246,0.3)]"
                    >
                        <div className="w-full h-full bg-[#020408] rounded-[15px] px-8 py-4 flex items-center justify-center gap-3 text-white font-black uppercase tracking-widest text-xs transition-colors group-hover:bg-transparent">
                            <Home className="w-4 h-4" />
                            Return to Dashboard
                        </div>
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center gap-3 text-white font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all active:scale-95"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Previous Sequence
                    </button>
                </motion.div>

                {/* Terminal Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 opacity-30 italic font-mono text-[10px] text-slate-500 uppercase tracking-widest"
                >
                    <div className="flex items-center gap-2">
                        <Terminal className="w-3 h-3" />
                        <span>System ID: REVLO-OS-CORE-001</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span>Status: Operational</span>
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    </div>
                </motion.div>
            </div>

            {/* Floating Debris / Orbs (Visuals) */}
            <motion.div
                animate={{
                    y: [0, -40, 0],
                    rotate: [0, 45, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 right-1/4 w-32 h-32 bg-purple-500/5 rounded-[40px] border border-white/5 backdrop-blur-3xl"
            />
            <motion.div
                animate={{
                    y: [0, 60, 0],
                    rotate: [0, -30, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-blue-500/5 rounded-full border border-white/5 backdrop-blur-3xl"
            />
        </div>
    );
};

export default NotFoundPage;

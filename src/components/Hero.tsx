import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, TrendingUp, Rocket, Zap, ShieldCheck, Activity, Bell, MessageSquare, PhoneIncoming, DollarSign, Calendar } from 'lucide-react';

const Hero: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [stats, setStats] = useState({
        calls: 142402,
        leads: 894320,
        revenue: 42450000,
        uptime: 99.99
    });

    interface Notification {
        id: number;
        app: string;
        title: string;
        body: string;
        icon: React.ReactNode;
        color: string;
        time: string;
    }

    const [activeNotifications, setActiveNotifications] = useState<Notification[]>([]);

    const notificationPool: Omit<Notification, 'id'>[] = [
        { app: 'Stripe', title: 'Payment Received', body: '$85,750.00 from HyperScale Corp.', icon: <DollarSign className="w-4 h-4 text-white" />, color: 'bg-indigo-600', time: 'now' },
        { app: 'RevloClaw', title: 'Task Completed', body: 'Neural lead extraction for EMEA finished (12,402 leads).', icon: <Zap className="w-4 h-4 text-white" />, color: 'bg-red-600', time: 'just now' },
        { app: 'Messages', title: 'Jaryd OS', body: 'Q1 revenue just crossed the $4.2M mark. Scale up.', icon: <MessageSquare className="w-4 h-4 text-white" />, color: 'bg-green-500', time: 'now' },
        { app: 'Discord', title: 'Operations Node', body: 'Deployment of 150 AI sales clones complete.', icon: <Activity className="w-4 h-4 text-white" />, color: 'bg-[#5865F2]', time: 'just now' },
        { app: 'Mail', title: 'Contract Signed', body: 'Global Logistics partnership sealed ($500k ARR).', icon: <ShieldCheck className="w-4 h-4 text-white" />, color: 'bg-emerald-500', time: '2m ago' },
        { app: 'Stripe', title: 'Payout Scheduled', body: '$412,000.00 arriving in 24 hours.', icon: <DollarSign className="w-4 h-4 text-white" />, color: 'bg-indigo-600', time: 'now' },
        { app: 'Discord', title: 'Market Pulse', body: 'High-intent signal cluster detected in Fintech.', icon: <Activity className="w-4 h-4 text-white" />, color: 'bg-[#5865F2]', time: 'just now' },
        { app: 'RevloClaw', title: 'Scrape Success', body: 'Competitor alpha sources successfully mapped.', icon: <Zap className="w-4 h-4 text-white" />, color: 'bg-red-600', time: '5m ago' },
        { app: 'Messages', title: 'The Core', body: 'Autonomous marketing ROI is currently 1,420%.', icon: <PhoneIncoming className="w-4 h-4 text-white" />, color: 'bg-green-500', time: 'now' },
        { app: 'Stripe', title: 'New Multi-Year Deal', body: '$250,000.00 upfront payment verified.', icon: <DollarSign className="w-4 h-4 text-white" />, color: 'bg-indigo-600', time: 'now' },
        { app: 'Mail', title: 'Strategic Intro', body: 'Managing Director at Sequoia requested a call.', icon: <Bell className="w-4 h-4 text-white" />, color: 'bg-red-500', time: '12m ago' },
        { app: 'RevloClaw', title: 'Neural Update', body: 'Model weights optimized. Closing rate +14%.', icon: <Zap className="w-4 h-4 text-white" />, color: 'bg-red-600', time: 'just now' },
        { app: 'Discord', title: 'Global Sync', body: '9 nodes expanded to 42. Infinite horizontal scale.', icon: <Activity className="w-4 h-4 text-white" />, color: 'bg-[#5865F2]', time: 'now' },
        { app: 'Messages', title: 'Alpha Strategist', body: 'Market dominance achieved in Real Estate vertical.', icon: <MessageSquare className="w-4 h-4 text-white" />, color: 'bg-green-500', time: 'now' },
        { app: 'Stripe', title: 'Transfer Complete', body: '$1,200,000.00 successfully bridged to treasury.', icon: <DollarSign className="w-4 h-4 text-white" />, color: 'bg-indigo-600', time: 'now' },
        { app: 'Mail', title: 'Acquisition Inquiry', body: 'T1 Private Equity firm scoping Revlo assets.', icon: <Bell className="w-4 h-4 text-white" />, color: 'bg-red-500', time: '1h ago' },
        { app: 'RevloClaw', title: 'Automation Win', body: 'Closed Alpha Corp ($50k) without human input.', icon: <ShieldCheck className="w-4 h-4 text-white" />, color: 'bg-emerald-500', time: 'now' },
        { app: 'Discord', title: 'Neural Core', body: 'LLM pass #84 finalized. Sentiment accuracy: 99.8%.', icon: <Activity className="w-4 h-4 text-white" />, color: 'bg-[#5865F2]', time: 'now' },
        { app: 'Messages', title: 'Growth Vault', body: 'Viral loop initiated. Users +14,000 in 2 hours.', icon: <Rocket className="w-4 h-4 text-white" />, color: 'bg-green-500', time: 'now' },
        { app: 'Stripe', title: 'Partner Payout', body: '$62,400.00 commission distributed to nodes.', icon: <DollarSign className="w-4 h-4 text-white" />, color: 'bg-indigo-600', time: '2h ago' },
        { app: 'Mail', title: 'Gov. Contract', body: 'Preliminary approval for agency-wide deployment.', icon: <Bell className="w-4 h-4 text-white" />, color: 'bg-red-500', time: 'now' },
        { app: 'RevloClaw', title: 'Task Completed', body: 'Competitor 10-K analysis finished. Arbitrage found.', icon: <Zap className="w-4 h-4 text-white" />, color: 'bg-red-600', time: 'now' },
        { app: 'Discord', title: 'Infrastructure', body: 'Auto-scaling triggered. Cluster capacity +400%.', icon: <Activity className="w-4 h-4 text-white" />, color: 'bg-[#5865F2]', time: 'now' },
        { app: 'Messages', title: 'Strategic Op', body: 'Signal-to-close ratio hit all-time high of 42%.', icon: <TrendingUp className="w-4 h-4 text-white" />, color: 'bg-green-500', time: 'now' },
        { app: 'Stripe', title: 'Revenue Surge', body: 'Last hour: $142,500.00 in new MRR processed.', icon: <DollarSign className="w-4 h-4 text-white" />, color: 'bg-indigo-600', time: 'now' },
        { app: 'Mail', title: 'White Label Op', body: 'Global Agency requesting enterprise license.', icon: <Bell className="w-4 h-4 text-white" />, color: 'bg-red-500', time: 'now' },
        { app: 'RevloClaw', title: 'Scrape Success', body: 'LinkedIn database sync complete (8M records).', icon: <Zap className="w-4 h-4 text-white" />, color: 'bg-red-600', time: 'just now' },
        { app: 'Discord', title: 'Security Node', body: 'Attempted breach neutralized. Zero data loss.', icon: <ShieldCheck className="w-4 h-4 text-white" />, color: 'bg-[#5865F2]', time: '3h ago' },
        { app: 'Messages', title: 'Empire Core', body: 'Wealth generation metrics are off the charts.', icon: <MessageSquare className="w-4 h-4 text-white" />, color: 'bg-green-500', time: 'now' },
        { app: 'Stripe', title: 'Payment Success', body: '$25,000.00 from Fintech Vanguard.', icon: <DollarSign className="w-4 h-4 text-white" />, color: 'bg-indigo-600', time: 'now' }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                ...prev,
                calls: prev.calls + Math.floor(Math.random() * 2),
                leads: prev.leads + Math.floor(Math.random() * 3),
                revenue: prev.revenue + Math.floor(Math.random() * 100),
            }));

            // Randomly push a new notification
            if (Math.random() > 0.6) {
                const randomItem = notificationPool[Math.floor(Math.random() * notificationPool.length)];
                const randomNotif = { ...randomItem, id: Date.now() };
                setActiveNotifications(prev => [randomNotif, ...prev].slice(0, 5));
            }
        }, 2500);

        const clockTimer = setInterval(() => setCurrentTime(new Date()), 1000);

        // Initial set of notifications
        const initialNotifs = notificationPool.slice(0, 4).map((n, i) => ({ ...n, id: i }));
        setActiveNotifications(initialNotifs);

        return () => {
            clearInterval(interval);
            clearInterval(clockTimer);
        };
    }, []);

    const scrollToContact = () => {
        const element = document.getElementById('contact');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-black">
            {/* HYPER-TECH BACKGROUND */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1)_0%,rgba(0,0,0,1)_100%)]" />

                {/* Visualizing "The Core" */}
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3],
                        rotate: [0, 90, 180, 270, 360]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-red-500/20 rounded-full blur-[2px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.1, 0.2, 0.1],
                        rotate: [360, 270, 180, 90, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-purple-500/10 rounded-full"
                />

                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50" />
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
            </div>

            <div className="relative z-10 max-w-[1800px] mx-auto px-6 lg:px-12 w-full">
                <div className="grid lg:grid-cols-12 gap-16 items-start">

                    {/* LEFT COLUMN: THE OFFER */}
                    <div className="lg:col-span-12 xl:col-span-7 space-y-12 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col items-start gap-6"
                        >
                            <div className="inline-flex items-center gap-4 px-6 py-2 bg-red-600/10 border border-red-600/30 rounded-full backdrop-blur-md">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                </span>
                                <span className="text-[12px] font-black uppercase tracking-[0.4em] text-red-500">
                                    DEBUNKING THE AGENCY MYTH: WE ARE THE CORE ENGINE.
                                </span>
                            </div>
                        </motion.div>

                        <div className="space-y-8">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="text-[clamp(2.5rem,8vw,7.5rem)] font-black leading-[0.9] tracking-[-0.04em] uppercase"
                            >
                                <span className="block text-white opacity-40">FULLY</span>
                                <span className="block text-white">AUTONOMOUS</span>
                                <span className="inline-block gradient-text-alt pb-4">EMPIRES.</span>
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="max-w-3xl"
                            >
                                <p className="text-lg lg:text-2xl font-bold text-slate-400 uppercase tracking-tight leading-tight">
                                    We don't build software. we deploy <span className="text-white">self-selling, self-operating, self-evolving</span> digital machines that generate irrefutable market dominance.
                                </p>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-wrap gap-8 items-center"
                        >
                            <motion.button
                                onClick={scrollToContact}
                                className="group relative px-10 py-6 bg-white text-black font-black uppercase tracking-[0.2em] text-base rounded-none hover:bg-red-600 hover:text-white transition-all duration-500 shadow-[15px_15px_0px_rgba(255,255,255,0.1)] hover:shadow-[0px_0px_40px_rgba(239,68,68,0.4)]"
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                INITIATE DEPLOYMENT
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500" />
                                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-red-500" />
                            </motion.button>

                            <div className="space-y-1">
                                <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Starting from</div>
                                <div className="text-xl font-black text-white tracking-widest uppercase italic">$15k / mo partnerships</div>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: THE IPHONE 17 PRO COMMAND CENTER */}
                    <div className="lg:col-span-12 xl:col-span-5 flex justify-end items-center lg:mt-24 xl:mt-0 xl:translate-x-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotateY: 15, x: 100 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0, x: 0 }}
                            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                            className="relative"
                        >
                            <motion.div
                                animate={{
                                    y: [0, -20, 0],
                                    rotateZ: [0, 1, 0],
                                    rotateY: [0, 5, 0]
                                }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                className="relative z-10"
                            >
                                {/* THE IPHONE 17 PRO (ZERO BEZEL) */}
                                <div className="relative w-[360px] h-[740px] bg-zinc-950 rounded-[4.5rem] p-[2px] shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden border border-white/10 group">
                                    {/* Titanium Frame Layer */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-zinc-800 via-zinc-400/20 to-zinc-800" />

                                    {/* Glass Screen */}
                                    <div className="absolute inset-[4px] rounded-[4.3rem] overflow-hidden bg-black flex flex-col items-center shadow-inner">
                                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
                                        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 via-black to-black" />

                                        {/* Dynamic Island V2 - Floating Glass */}
                                        <div className="absolute top-4 w-28 h-7 bg-black/60 backdrop-blur-3xl rounded-full z-50 flex items-center justify-between px-3 border border-white/10">
                                            <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
                                            <div className="w-8 h-1 bg-white/10 rounded-full" />
                                            <div className="w-1.5 h-1.5 bg-zinc-800 rounded-full" />
                                        </div>

                                        {/* iOS 22 Interface */}
                                        <div className="w-full h-full flex flex-col items-center pt-28 px-4 z-10 relative overflow-hidden">
                                            {/* Clock */}
                                            <motion.div
                                                className="text-7xl font-thin text-white tracking-widest mb-1 font-sans"
                                                animate={{ opacity: [0.8, 1, 0.8] }}
                                                transition={{ duration: 4, repeat: Infinity }}
                                            >
                                                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </motion.div>
                                            <div className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 mb-12">
                                                Wednesday, February 18
                                            </div>

                                            {/* Notifications */}
                                            <div className="w-full space-y-3 px-2 overflow-y-auto max-h-[420px] scrollbar-none pb-12">
                                                <AnimatePresence mode="popLayout">
                                                    {activeNotifications.map((notif) => (
                                                        <motion.div
                                                            key={notif.id}
                                                            initial={{ opacity: 0, y: 30, scale: 0.9, filter: 'blur(10px)' }}
                                                            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                                                            exit={{ opacity: 0, scale: 0.95, filter: 'blur(5px)' }}
                                                            transition={{ type: "spring", damping: 20, stiffness: 100 }}
                                                            className="w-full bg-white/[0.05] backdrop-blur-[50px] border border-white/10 rounded-[2.2rem] p-5 flex flex-col gap-1 shadow-2xl relative overflow-hidden"
                                                        >
                                                            {/* Apple Glass Highlight */}
                                                            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />

                                                            <div className="flex items-center justify-between mb-1.5">
                                                                <div className="flex items-center gap-3">
                                                                    <div className={`w-9 h-9 ${notif.color} rounded-[1rem] flex items-center justify-center shadow-lg transform rotate-2 relative overflow-hidden`}>
                                                                        {notif.app === 'RevloClaw' ? (
                                                                            <div className="relative w-full h-full flex items-center justify-center bg-red-600">
                                                                                {/* Animated OpenClaw Mascot Figure */}
                                                                                <div className="relative w-6 h-6">
                                                                                    {/* Antennas */}
                                                                                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-full flex justify-center gap-1.5">
                                                                                        <motion.div
                                                                                            animate={{ height: [2, 4, 2], y: [0, -1, 0] }}
                                                                                            transition={{ duration: 1.5, repeat: Infinity }}
                                                                                            className="w-[1.5px] bg-white/60 rounded-full"
                                                                                        />
                                                                                        <motion.div
                                                                                            animate={{ height: [4, 2, 4], y: [0, -1, 0] }}
                                                                                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                                                                                            className="w-[1.5px] bg-white/60 rounded-full"
                                                                                        />
                                                                                    </div>
                                                                                    {/* Head/Body */}
                                                                                    <div className="absolute inset-0 bg-black rounded-full flex items-center justify-center border border-white/20 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                                                                                        {/* Eyes */}
                                                                                        <div className="flex gap-1">
                                                                                            <motion.div
                                                                                                animate={{ opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }}
                                                                                                transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
                                                                                                className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,1)]"
                                                                                            />
                                                                                            <motion.div
                                                                                                animate={{ opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }}
                                                                                                transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3.1 }}
                                                                                                className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,1)]"
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                    {/* Scanline Effect */}
                                                                                    <motion.div
                                                                                        animate={{ y: [-4, 24] }}
                                                                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                                                        className="absolute inset-x-0 h-[1px] bg-cyan-400/20 blur-[0.5px] z-20"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        ) : notif.icon}
                                                                    </div>
                                                                    <div className="flex flex-col">
                                                                        <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.1em]">{notif.app}</span>
                                                                        <span className="text-[13px] font-black text-white truncate max-w-[140px]">{notif.title}</span>
                                                                    </div>
                                                                </div>
                                                                <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest">{notif.time}</span>
                                                            </div>
                                                            <div className="text-[11px] font-medium text-white/60 leading-snug px-1 line-clamp-2 italic font-mono">
                                                                {notif.body}
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </AnimatePresence>
                                            </div>

                                            {/* Lock Screen Tools */}
                                            <div className="absolute bottom-10 left-0 w-full px-10 flex justify-between z-20">
                                                <div className="w-14 h-14 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10 flex items-center justify-center text-white/40 group-hover:text-red-500 transition-colors">
                                                    <Zap className="w-6 h-6" />
                                                </div>
                                                <div className="w-14 h-14 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10 flex items-center justify-center text-white/40 group-hover:text-red-500 transition-colors">
                                                    <ShieldCheck className="w-6 h-6" />
                                                </div>
                                            </div>

                                            {/* Home Indicator */}
                                            <div className="absolute bottom-3 w-40 h-1 bg-white/20 rounded-full" />
                                        </div>
                                    </div>

                                    {/* Screen Reflection Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none z-50 opacity-40" />
                                </div>
                            </motion.div>

                            {/* Massive Ambient Glow */}
                            <div className="absolute -inset-60 bg-red-600/[0.02] blur-[150px] -z-10 animate-pulse" />
                            <div className="absolute -inset-40 bg-blue-600/[0.01] blur-[150px] -z-10" />
                        </motion.div>
                    </div>

                </div>

                {/* BOTTOM TIER INFO */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="mt-32 grid md:grid-cols-4 gap-12 border-t border-white/5 pt-12"
                >
                    {[
                        { label: 'Core Philosophy', value: 'AUTONOMY FIRST' },
                        { label: 'Market Positioning', value: 'TOP TIER AGENCY' },
                        { label: 'Technology Stack', value: 'NEURAL INFRA' },
                        { label: 'Business Model', value: 'SELF-SELLING ASSETS' }
                    ].map((item, i) => (
                        <div key={i} className="space-y-2 group cursor-crosshair">
                            <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em] group-hover:text-red-500 transition-colors">
                                {item.label}
                            </div>
                            <div className="text-xl font-black text-white tracking-widest uppercase italic">
                                {item.value}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, TrendingUp, Rocket, Zap, ShieldCheck, Activity, Bell, MessageSquare, PhoneIncoming, DollarSign, Calendar } from 'lucide-react';

const leadNotifications = [
    { type: 'message', sender: 'Sarah Johnson', content: "Just saw your ad, can we talk about the project?", time: 'NOW', color: 'text-green-400', icon: '💬' },
    { type: 'call', sender: 'Unknown (404)', content: "Missed Call", time: '2m ago', color: 'text-red-400', icon: '📞' },
    { type: 'message', sender: 'Michael Chen', content: "The proposal looks amazing. Sending the deposit now.", time: '5m ago', color: 'text-blue-400', icon: '💬' },
    { type: 'payment', sender: 'STRIPE', content: "Payment received: $2,500.00", time: '12m ago', color: 'text-purple-400', icon: '💰' },
    { type: 'calendar', sender: 'CALENDLY', content: "New Lead Booked: 2:30 PM Tomorrow", time: '15m ago', color: 'text-blue-400', icon: '📅' },
    { type: 'message', sender: 'David K.', content: "Found your company on LinkedIn, let's connect.", time: '22m ago', color: 'text-green-400', icon: '💬' },
];

const Hero: React.FC = () => {
    const [currentNotificationIndex, setCurrentNotificationIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentNotificationIndex((prev) => (prev + 1) % leadNotifications.length);
        }, 3500);
        const clockTimer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => {
            clearInterval(timer);
            clearInterval(clockTimer);
        };
    }, []);

    const scrollToContact = () => {
        const element = document.getElementById('contact');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToRevloOS = () => {
        const element = document.getElementById('revlo-os');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#020408]">
            {/* DYNAMIC MESH BACKGROUND */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{
                        x: [0, 100, -50, 0],
                        y: [0, -100, 50, 0],
                        scale: [1, 1.2, 0.8, 1],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-purple-600/10 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        x: [0, -150, 100, 0],
                        y: [0, 100, -150, 0],
                        scale: [1, 1.3, 0.9, 1],
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[-20%] right-[-10%] w-[90%] h-[90%] bg-blue-600/10 rounded-full blur-[140px]"
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
                <div className="absolute inset-0 bg-grid-white opacity-[0.02]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div className="space-y-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-3 px-4 py-2 glass rounded-full"
                        >
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400">
                                Status: Building the Future
                            </span>
                        </motion.div>

                        <div className="space-y-8">
                            <motion.h1
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="text-6xl lg:text-8xl font-black font-display leading-[0.85] tracking-tighter italic overflow-visible py-4"
                            >
                                <span className="block text-white">IRREFUTABLE</span>
                                <span className="inline-block gradient-text pr-24 pb-4 whitespace-nowrap">ELITE SCALE.</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-xl lg:text-3xl text-slate-400 leading-tight max-w-2xl font-bold tracking-tight"
                            >
                                The New Standard in AI Agents & Digital Design. <br />
                                <span className="text-white/80">I build the systems that build your business—from Human-Grade Voice AI to World-Class Web Design starting at $750. No jargon. Just scale.</span>
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-wrap gap-6"
                        >
                            <motion.button
                                onClick={scrollToContact}
                                className="group px-12 py-6 bg-white text-black font-black uppercase tracking-widest text-sm rounded-2xl shadow-2xl hover:bg-slate-200 transition-all duration-300 flex items-center gap-3"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                PARTNER WITH ME
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </motion.button>

                            <motion.button
                                onClick={scrollToRevloOS}
                                className="px-12 py-6 glass text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-white/10 transition-all duration-300"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                OUR STRATEGY
                            </motion.button>
                        </motion.div>

                        {/* Interactive Stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="flex gap-12 pt-10 border-t border-white/5"
                        >
                            {[
                                { label: 'Revenue Growth', value: '347%' },
                                { label: 'Leads / Mo', value: '12,500' },
                                { label: 'System Uptime', value: '99.9%' }
                            ].map((stat, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="text-3xl font-black font-display text-white tracking-tighter">
                                        {stat.value}
                                    </div>
                                    <div className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Enhanced iPhone Mockup */}
                    <div className="relative h-[800px] flex items-center justify-center lg:justify-end">
                        {/* Floating Interaction Nodes */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-10 -left-10 z-20 p-5 glass rounded-3xl shadow-2xl backdrop-blur-3xl border border-white/20"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                                    <Activity className="text-white w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Neural Load</div>
                                    <div className="text-2xl font-black text-white leading-none tracking-tighter text-glow">89.4%</div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 15, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="absolute bottom-40 -right-10 z-20 p-5 glass rounded-3xl shadow-2xl backdrop-blur-3xl border border-white/20"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <Zap className="text-white w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Deployments</div>
                                    <div className="text-2xl font-black text-white leading-none tracking-tighter text-glow">1,402</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Phone Container */}
                        <motion.div
                            initial={{ rotateY: -15, rotateX: 5, y: -30, x: -10, opacity: 0 }}
                            animate={{ rotateY: -5, rotateX: 0, y: -60, x: -30, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="relative"
                        >
                            {/* Outer Glow */}
                            <div className="absolute inset-0 bg-purple-500/10 blur-[100px] rounded-full animate-pulse" />

                            {/* Device Frame */}
                            <div className="relative w-[300px] h-[620px] bg-slate-900 rounded-[3.5rem] p-3 shadow-[0_0_100px_rgba(139,92,246,0.2)] border border-white/10">
                                <div className="w-full h-full bg-black rounded-[2.8rem] overflow-hidden relative">
                                    {/* Dynamic Island */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-black rounded-b-3xl z-50 flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse mr-2" />
                                        <div className="text-[8px] font-black text-white/40 tracking-[0.2em] uppercase">SYSTEM ONLINE</div>
                                    </div>

                                    {/* UI Screen Content */}
                                    <div className="absolute inset-0 bg-[#020408] pt-14 p-4 flex flex-col">
                                        {/* Clock Area */}
                                        <div className="text-center mt-4 mb-8">
                                            <div className="text-5xl font-light text-white tracking-tighter">
                                                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                                            </div>
                                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mt-2">
                                                {currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
                                            </div>
                                        </div>

                                        {/* Incoming Load Feed */}
                                        <div className="flex-1 relative overflow-hidden px-1">
                                            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-[#020408]/20 via-transparent to-[#020408]/80" />

                                            <div className="space-y-2 pt-4">
                                                <AnimatePresence mode="popLayout">
                                                    {leadNotifications.map((lead, i) => {
                                                        const isCurrent = i === currentNotificationIndex;
                                                        const isNext = i === (currentNotificationIndex + 1) % leadNotifications.length;
                                                        if (!isCurrent && !isNext) return null;

                                                        return (
                                                            <motion.div
                                                                key={`${lead.sender}-${i}`}
                                                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                exit={{ opacity: 0, y: -20, scale: 0.95, filter: 'blur(10px)' }}
                                                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                                                className="p-4 bg-white/[0.08] backdrop-blur-2xl rounded-[24px] border border-white/10 relative overflow-hidden group shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                                                            >
                                                                <div className="flex items-start gap-3">
                                                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-xl shadow-lg border border-white/10`}>
                                                                        {lead.type === 'message' && <MessageSquare className="w-5 h-5 text-green-400" />}
                                                                        {lead.type === 'call' && <PhoneIncoming className="w-5 h-5 text-red-400" />}
                                                                        {lead.type === 'payment' && <DollarSign className="w-5 h-5 text-purple-400" />}
                                                                        {lead.type === 'calendar' && <Calendar className="w-5 h-5 text-blue-400" />}
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="flex justify-between items-center mb-0.5">
                                                                            <span className="text-[11px] font-bold text-white/90 truncate tracking-tight">
                                                                                {lead.type === 'message' ? 'Messages' :
                                                                                    lead.type === 'call' ? 'Phone' :
                                                                                        lead.type === 'payment' ? 'Stripe' : 'Calendar'}
                                                                            </span>
                                                                            <span className="text-[9px] font-medium text-white/40 uppercase">{lead.time}</span>
                                                                        </div>
                                                                        <div className="text-[12px] font-bold text-white leading-tight mb-0.5">{lead.sender}</div>
                                                                        <div className="text-[12px] text-white/70 leading-snug line-clamp-2 font-medium">
                                                                            {lead.content}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        );
                                                    })}
                                                </AnimatePresence>
                                            </div>
                                        </div>

                                        {/* Bottom Action Area */}
                                        <div className="mt-auto py-6 flex flex-col items-center gap-4">
                                            <div className="flex gap-12 text-white/40">
                                                <Zap className="w-6 h-6" />
                                                <Activity className="w-6 h-6" />
                                            </div>
                                            <div className="w-32 h-1 bg-white/20 rounded-full" />
                                        </div>

                                        {/* Scanline Effect */}
                                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%] opacity-10" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

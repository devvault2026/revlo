import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Rocket, Zap, ShieldCheck, Activity } from 'lucide-react';

const Hero: React.FC = () => {
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

    const floatingCards = [
        {
            icon: <TrendingUp className="w-6 h-6" />,
            title: 'Revenue Growth',
            value: '+347%',
            gradient: 'from-purple-500 to-purple-400',
            delay: 0,
        },
        {
            icon: <Rocket className="w-6 h-6" />,
            title: 'Lead Generation',
            value: '10K+/mo',
            gradient: 'from-blue-500 to-blue-400',
            delay: 0.2,
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: 'AI Automation',
            value: '24/7',
            gradient: 'from-red-500 to-red-400',
            delay: 0.4,
        },
    ];

    return (
        <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50" />
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-300/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200 rounded-full"
                        >
                            <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" />
                            <span className="text-sm font-semibold text-purple-700">
                                Scaling Brands to 7-Figure ARR
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <div className="space-y-4">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-5xl lg:text-6xl xl:text-7xl font-black font-display leading-tight"
                            >
                                Turn Your{' '}
                                <span className="gradient-text">
                                    Low-Revenue Assets
                                </span>
                                <br />
                                Into{' '}
                                <span className="gradient-text-alt">
                                    7-Figure Machines
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-xl text-slate-600 leading-relaxed max-w-2xl"
                            >
                                We don't just consult. We execute. End-to-end brand takeover with 40+ years combined
                                expertise, proprietary AI infrastructure, and a proven growth system that scales
                                businesses beyond your imagination.
                            </motion.p>
                        </div>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-wrap gap-4"
                        >
                            <motion.button
                                onClick={scrollToContact}
                                className="group px-8 py-4 bg-gradient-rainbow text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Scale My Brand
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>

                            <motion.button
                                onClick={scrollToRevloOS}
                                className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-900 font-bold rounded-xl hover:border-slate-300 hover:shadow-lg transition-all duration-300"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Explore Revlo OS
                            </motion.button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap gap-8 pt-8 border-t border-slate-200"
                        >
                            {['40+ Years Combined', '100% In-House Team', '7+ Figure ARR'].map((stat, index) => (
                                <div key={index} className="space-y-1">
                                    <div className="text-3xl font-black font-display gradient-text">
                                        {stat.split(' ')[0]}
                                    </div>
                                    <div className="text-sm text-slate-500 font-medium">
                                        {stat.split(' ').slice(1).join(' ')}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* iPhone 16 Pro Mockup with Notifications */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative h-[750px] w-full max-w-[500px] hidden lg:flex items-center justify-center mx-auto"
                    >
                        {/* Floating Card: ROI (Top Left) */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
                            transition={{ delay: 1, duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-24 -left-12 z-30 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-4 flex items-center gap-3 border border-white/50"
                        >
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                <TrendingUp size={20} />
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 font-medium">Avg. ROI</div>
                                <div className="text-xl font-bold text-slate-900">24x</div>
                            </div>
                        </motion.div>

                        {/* Floating Card: Verified (Bottom Left) */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0, y: [0, 10, 0] }}
                            transition={{ delay: 1.2, duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-32 -left-16 z-30 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-3 flex items-center gap-3 border border-white/50 pr-6"
                        >
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 font-medium">Verified System</div>
                                <div className="text-sm font-bold text-slate-900">7-Figure Scale</div>
                            </div>
                        </motion.div>

                        {/* Floating Card: Live Leads (Bottom Right) */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
                            transition={{ delay: 1.4, duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-24 -right-12 z-30 bg-slate-900/95 backdrop-blur-md shadow-2xl rounded-2xl p-4 border border-slate-800"
                        >
                            <div className="flex items-center gap-3 mb-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Live Activity</span>
                            </div>
                            <div className="text-2xl font-bold text-white">142 Leads</div>
                            <div className="text-xs text-slate-400">Generated in last 24h</div>
                        </motion.div>

                        {/* iPhone 16 Pro Frame */}
                        <motion.div
                            initial={{ rotateY: -20, rotateX: 15, rotateZ: -12 }}
                            animate={{
                                rotateY: [-20, -15, -20],
                                rotateX: [15, 10, 15],
                                y: [0, -20, 0]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
                            className="relative"
                        >
                            {/* Phone Body */}
                            <div className="relative w-[280px] h-[580px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-[3rem] p-3 shadow-2xl">
                                {/* Notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-900 rounded-b-3xl z-10" />

                                {/* Screen */}
                                <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 rounded-[2.5rem] overflow-hidden">
                                    {/* Status Bar */}
                                    <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white/50 to-transparent backdrop-blur-sm flex items-center justify-between px-8 text-xs font-semibold text-slate-700 z-20">
                                        <span>9:41</span>
                                        <span>100%</span>
                                    </div>

                                    {/* Animated Notifications */}
                                    <div className="absolute inset-0 pt-14 px-3 space-y-3 overflow-hidden">
                                        {/* Gradient overlay to fade bottom */}
                                        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/90 to-transparent z-10" />

                                        {Array.from({ length: 20 }).map((_, index) => {
                                            const types = [
                                                { name: 'John Doe', msg: 'Ready to proceed!', color: 'from-green-400 to-green-600', initials: 'JD' },
                                                { name: 'Sarah Miller', msg: 'Sent the signed contract.', color: 'from-purple-400 to-purple-600', initials: 'SM' },
                                                { name: 'Mike Chen', msg: 'Payment received: $5,000', color: 'from-blue-400 to-blue-600', initials: 'MC' },
                                                { name: 'Emma Davis', msg: 'New Lead: TechCorp', color: 'from-red-400 to-red-600', initials: 'ED' },
                                                { name: 'Alex Lee', msg: 'Call scheduled for tomorrow.', color: 'from-indigo-400 to-indigo-600', initials: 'AL' }
                                            ];
                                            const item = types[index % types.length];
                                            return (
                                                <motion.div
                                                    key={index}
                                                    initial={{ y: -50, opacity: 0, scale: 0.9 }}
                                                    animate={{ y: 0, opacity: 1, scale: 1 }}
                                                    transition={{
                                                        delay: index * 0.8,
                                                        type: 'spring',
                                                        stiffness: 300,
                                                        damping: 20
                                                    }}
                                                    className="relative bg-white/95 backdrop-blur-xl rounded-2xl p-3 shadow-lg border border-slate-200"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm`}>
                                                            {item.initials}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center justify-between mb-1">
                                                                <span className="font-bold text-sm text-slate-900">{item.name}</span>
                                                                <span className="text-xs text-slate-500">now</span>
                                                            </div>
                                                            <p className="text-xs text-slate-600 line-clamp-1">
                                                                {item.msg}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Phone Buttons */}
                                <div className="absolute right-0 top-24 w-1 h-16 bg-slate-700 rounded-l" />
                                <div className="absolute right-0 top-44 w-1 h-12 bg-slate-700 rounded-l" />
                                <div className="absolute left-0 top-32 w-1 h-8 bg-slate-700 rounded-r" />
                            </div>
                        </motion.div>

                        {/* Floating notification badges */}
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-black text-xl shadow-xl"
                        >
                            99+
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

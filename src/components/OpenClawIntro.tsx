import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Bot, Terminal, Shield, Zap, ArrowRight, Crosshair } from 'lucide-react';
import { Link } from 'react-router-dom';

const OpenClawMascot = () => {
    return (
        <motion.div
            className="absolute -top-20 -right-4 lg:-top-28 lg:-right-12 z-50 pointer-events-none select-none w-24 h-24 lg:w-40 lg:h-40"
            animate={{
                y: [0, -12, 0],
                rotate: [0, 2, -2, 0]
            }}
            transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            <div className="relative w-full h-full scale-90">
                {/* Antennas */}
                <svg className="absolute -top-6 w-full h-24 overflow-visible" viewBox="0 0 100 50">
                    <motion.path
                        d="M35 50 Q 25 10 10 20"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="4"
                        strokeLinecap="round"
                        animate={{ d: ["M35 50 Q 25 10 10 20", "M35 50 Q 20 15 5 25", "M35 50 Q 25 10 10 20"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.path
                        d="M65 50 Q 75 10 90 20"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="4"
                        strokeLinecap="round"
                        animate={{ d: ["M65 50 Q 75 10 90 20", "M65 50 Q 80 15 95 25", "M65 50 Q 75 10 90 20"] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    />
                </svg>

                {/* Arms */}
                <motion.div
                    className="absolute top-[45%] -left-3 w-8 h-8 bg-[#dc2626] rounded-full"
                    animate={{ rotate: [0, -15, 0], x: [0, -2, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                    className="absolute top-[45%] -right-3 w-8 h-8 bg-[#dc2626] rounded-full"
                    animate={{ rotate: [0, 15, 0], x: [0, 2, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />

                {/* Legs */}
                <div className="absolute bottom-0 left-[35%] w-3 h-6 bg-[#b91c1c] rounded-b-md z-0" />
                <div className="absolute bottom-0 right-[35%] w-3 h-6 bg-[#b91c1c] rounded-b-md z-0" />

                {/* Main Body */}
                <div className="absolute inset-2 bg-[#ef4444] rounded-full shadow-[inset_-4px_-4px_20px_rgba(0,0,0,0.3),0_0_40px_rgba(239,68,68,0.4)] flex items-center justify-center border-t border-white/20 z-10">
                    <div className="relative w-full h-full">
                        {/* Eyes */}
                        <div className="absolute top-[35%] left-[28%] w-4 h-5 bg-black rounded-full shadow-inner flex items-center justify-center">
                            <motion.div
                                className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)]"
                                animate={{ opacity: [1, 0.6, 1] }}
                                transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
                            />
                        </div>
                        <div className="absolute top-[35%] right-[28%] w-4 h-5 bg-black rounded-full shadow-inner flex items-center justify-center">
                            <motion.div
                                className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)]"
                                animate={{ opacity: [1, 0.6, 1] }}
                                transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const terminalActions = [
    { cmd: "init_market_siege --target='FINTECH'", result: "[ACTIVE] Scoped 4,203 high-value targets", color: "text-red-500", delay: 2400 },
    { cmd: "deploy_voice_clone --campaign='q1_scale'", result: "[RUNNING] 142 AI agents dialling now...", color: "text-blue-400", delay: 3600 },
    { cmd: "execute_autonomous_close --limit=none", result: "[SUCCESS] 3 contracts sent & signed", color: "text-green-400", delay: 3000 },
    { cmd: "scrape_competitor_alpha", result: "[FOUND] Pricing and lead sources extracted", color: "text-yellow-400", delay: 4500 },
    { cmd: "generate_revenue --mode='recursive'", result: "[ALERT] ROI increased by 342% in 24hrs", color: "text-red-400", delay: 3300 },
    { cmd: "autopilot_marketing_spend", result: "[OPTIMIZED] $5k waste redirected to high-intent", color: "text-green-400", delay: 2700 },
    { cmd: "system_dominance --status", result: "[STABLE] Market share expanding at 14%/day", color: "text-green-400", delay: 2400 },
];

const OpenClawIntro: React.FC = () => {
    const [logs, setLogs] = useState<typeof terminalActions>([]);
    const [currentActionIndex, setCurrentActionIndex] = useState(0);

    // Terminal Animation Loop
    useEffect(() => {
        const action = terminalActions[currentActionIndex];

        // Add action to logs immediately
        setLogs(prev => {
            // Prevent duplicate logs if strict mode runs effect twice
            if (prev.length > 0 && prev[prev.length - 1] === action) return prev;

            const newLogs = [...prev, action];
            if (newLogs.length > 5) return newLogs.slice(newLogs.length - 5);
            return newLogs;
        });

        // Schedule moving to the next action
        const timeout = setTimeout(() => {
            setCurrentActionIndex(prev => (prev + 1) % terminalActions.length);
        }, action.delay);

        return () => clearTimeout(timeout);
    }, [currentActionIndex]);

    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={sectionRef} className="relative py-24 lg:py-40 overflow-hidden bg-black">
            {/* Background Grids & effects */}
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

            {/* Mobile Flare */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[100px] rounded-full pointer-events-none lg:hidden" />

            <div className="max-w-[1800px] mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-12 gap-24 items-center">

                    {/* Left: Tactical Visuals */}
                    <div className="lg:col-span-12 xl:col-span-6 relative order-2 xl:order-1">
                        <motion.div
                            style={{ y, opacity }}
                            className="relative z-10"
                        >
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-purple-600 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                                <div className="relative bg-zinc-950 p-6 md:p-12 rounded-none border border-white/10 overflow-hidden">
                                    {/* Scanline */}
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%] opacity-20 pointer-events-none" />

                                    {/* Header */}
                                    <div className="flex justify-between items-center mb-8 md:mb-12 border-b border-white/5 pb-4 md:pb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
                                            <span className="text-sm font-black text-red-500 tracking-[0.5em] uppercase">Tactical_Overseer</span>
                                        </div>
                                        <div className="text-[10px] font-mono text-white/20 tracking-widest uppercase italic">DEPLOYMENT: ACTIVE</div>
                                    </div>

                                    {/* Terminal Content - Dynamic Stream */}
                                    <div className="space-y-4 md:space-y-6 font-mono text-[10px] md:text-sm min-h-[250px] md:min-h-[300px]">
                                        {logs.map((log, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="border-l-2 border-red-600/30 pl-6"
                                            >
                                                <div className="flex gap-4 text-slate-500 text-[10px] mb-1 md:mb-2">
                                                    <span className="text-red-600">EXEC //</span>
                                                    <span className="font-black italic uppercase tracking-widest">{log.cmd}</span>
                                                </div>
                                                <div className={`${log.color} font-black text-sm md:text-lg uppercase tracking-tight`}>
                                                    {log.result}
                                                </div>
                                            </motion.div>
                                        ))}

                                        {/* Cursor Line */}
                                        <div className="flex gap-4 text-slate-600 animate-pulse pl-6 pt-4 text-[10px] md:text-xs">
                                            <span className="text-red-700 font-black tracking-tighter">WAITING_FOR_MARKET_SIGNAL_</span>
                                        </div>
                                    </div>

                                    {/* Decorative UI Elements */}
                                    <div className="mt-8 flex gap-2">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-red-500/50 w-2/3 animate-scan-fast" style={{ animationDelay: `${i * 0.2}s` }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <OpenClawMascot />
                            </div>
                        </motion.div>

                        {/* Background Elements */}
                        <div className="absolute top-10 -right-10 w-40 h-40 bg-red-500/20 blur-[60px] rounded-full" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 blur-[60px] rounded-full" />
                    </div>

                    {/* Right: Copy & CTA */}
                    <div className="lg:col-span-12 xl:col-span-6 space-y-12 order-1 xl:order-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-4 px-6 py-2 bg-red-600 border border-red-500 text-white text-[10px] font-black uppercase tracking-[0.4em]"
                        >
                            <Zap className="w-4 h-4" />
                            <span>PHASE 2 DEPLOYMENT</span>
                        </motion.div>

                        <h2 className="text-[clamp(2.5rem,8vw,7rem)] font-black uppercase leading-[0.9] tracking-tighter text-white">
                            THE AGENT THAT
                            <span className="block text-red-600">OWNS THE MARKET.</span>
                        </h2>

                        <div className="space-y-6 max-w-2xl">
                            <p className="text-xl lg:text-3xl text-slate-400 font-black leading-tight uppercase tracking-tighter">
                                Stop Chatting. <span className="text-white">Deploy Autonomy.</span>
                            </p>
                            <p className="text-lg lg:text-xl text-slate-500 font-medium leading-relaxed">
                                OpenClaw isn't just an AI; it's a proprietary neural weapon. It detects high-value signals, negotiates without emotion, and closes with 100% precision—while you sleep. This is the new standard of scale.
                            </p>
                        </div>

                        <ul className="grid md:grid-cols-1 gap-4 md:gap-8">
                            {[
                                { title: "0-MANUAL INTERVETION", subtitle: "End-to-end autonomous decision loops." },
                                { title: "NEURAL LEAD ENRICHMENT", subtitle: "Human-grade psychological profiling at scale." },
                                { title: "UNIVERSAL EXECUTION", subtitle: "Direct integration into legal, ops, and sales." }
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4 md:gap-6 group p-4 bg-white/[0.02] border border-white/5 rounded-none md:bg-transparent md:border-none md:p-0">
                                    <div className="mt-1 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-white/[0.03] border border-white/5 group-hover:bg-red-600 group-hover:border-red-500 transition-all duration-500 flex-shrink-0">
                                        <Crosshair className="w-5 h-5 text-red-500 group-hover:text-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-lg font-black text-white uppercase tracking-tight">{item.title}</div>
                                        <div className="text-xs text-slate-600 font-bold uppercase tracking-widest">{item.subtitle}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="pt-4">
                            <Link to="/openclaw">
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group relative px-10 py-5 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest text-xs rounded-none transition-all shadow-[0_0_50px_rgba(220,38,38,0.3)]"
                                >
                                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-20 transition-opacity" />
                                    <span className="relative z-10 flex items-center gap-3">
                                        Deploy OpenClaw
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OpenClawIntro;

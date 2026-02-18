import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Bot, Terminal, Shield, Zap, ArrowRight, Crosshair } from 'lucide-react';
import { Link } from 'react-router-dom';

const OpenClawMascot = () => {
    return (
        <motion.div
            className="absolute -top-28 -right-12 z-50 pointer-events-none select-none w-40 h-40 hidden lg:block"
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
    { cmd: "detect_inefficiency --all", result: "[SUCCESS] 4,203 email threads analyzed", color: "text-green-400", delay: 2400 },
    { cmd: "deploy_agent --context='inbox_zero'", result: "[RUNNING] Autonomous response loops active...", color: "text-blue-400", delay: 3600 },
    { cmd: "scan_calendar --conflict_mode='aggressive'", result: "[RESOLVED] 3 meetings rescheduled seamlessly", color: "text-purple-400", delay: 3000 },
    { cmd: "scrape_linkedin --target='CTO' --geo='NYC'", result: "[FOUND] 142 qualified leads extracted", color: "text-yellow-400", delay: 4500 },
    { cmd: "analyze_pnl --q3_forecast", result: "[ALERT] Revenue opportunity detected in SaaS vertical", color: "text-red-400", delay: 3300 },
    { cmd: "generate_invoice --client='Acme Corp'", result: "[SENT] Invoice #4429 sent via Stripe", color: "text-green-400", delay: 2700 },
    { cmd: "book_travel --dest='SF' --pref='business'", result: "[BOOKED] United Flight 492 - Seat 3A", color: "text-blue-400", delay: 4200 },
    { cmd: "monitor_server_logs --error_rate", result: "[STABLE] 99.99% uptime maintained", color: "text-green-400", delay: 2400 },
    { cmd: "draft_contract --template='nda_v2'", result: "[READY] Contrast sent for e-signature", color: "text-purple-400", delay: 3000 },
    { cmd: "optimize_ad_spend --platform='meta'", result: "[SAVED] $1,200/mo in waste removed", color: "text-green-400", delay: 3900 },
    { cmd: "enrich_data --source='clearbit'", result: "[UPDATED] 5,000+ CRM records enriched", color: "text-blue-400", delay: 3300 },
    { cmd: "slack_summary --channel='#dev'", result: "[POSTED] Daily standup summary to #general", color: "text-yellow-400", delay: 2700 },
    { cmd: "git_push --force", result: "[DEPLOYED] Production hotfix live", color: "text-red-400", delay: 2100 },
    { cmd: "check_competitor_pricing", result: "[INSIGHT] Competitor lowered prices by 15%", color: "text-orange-400", delay: 3600 },
    { cmd: "schedule_zoom --attendees='all_hands'", result: "[INVITE] Calendar invite sent to 45 people", color: "text-blue-400", delay: 3000 },
    { cmd: "notion_sync --db='tasks'", result: "[SYNCED] 24 tasks moved to 'Done'", color: "text-purple-400", delay: 2400 },
    { cmd: "order_supplies --coffee='bulk'", result: "[ORDERED] 50lbs coffee arriving Tuesday", color: "text-green-400", delay: 2700 },
    { cmd: "audit_security --level='paranoid'", result: "[SECURE] No vulnerabilities detected", color: "text-green-400", delay: 4500 },
    { cmd: "run_payroll --cycle='bi-weekly'", result: "[PROCESSED] $124,000 disbursed", color: "text-green-400", delay: 3300 },
    { cmd: "tweet_thread --topic='AI_Agent_Future'", result: "[PUBLISHED] Thread gaining traction (120 likes)", color: "text-blue-400", delay: 3900 },
    { cmd: "research_topic --query='quantum_computing'", result: "[COMPLETED] 30-page briefing doc generated", color: "text-purple-400", delay: 6000 },
    { cmd: "negotiate_contract --vendor='aws'", result: "[SUCCESS] Rate reduced by 12%", color: "text-green-400", delay: 4200 },
    { cmd: "organize_files --folder='downloads'", result: "[CLEANED] 430 files archived", color: "text-yellow-400", delay: 1800 },
    { cmd: "ping_server --latency", result: "[FAST] 12ms response time", color: "text-green-400", delay: 1500 },
    { cmd: "transcribe_meeting --audio='zoom_rec.mp3'", result: "[DONE] Transcript uploaded to Drive", color: "text-blue-400", delay: 4800 },
    { cmd: "generate_logo --style='minimal'", result: "[CREATED] 4 variations exported", color: "text-purple-400", delay: 3300 },
    { cmd: "check_crypto_portfolio", result: "[UPDATE] Portfolio up 4.2% today", color: "text-green-400", delay: 2400 },
    { cmd: "find_email --name='Sam Altman'", result: "[FOUND] sam@openai.com (verified)", color: "text-red-400", delay: 3000 },
    { cmd: "summarize_pdf --file='annual_report.pdf'", result: "[SUMMARY] Key points extracted to Notion", color: "text-blue-400", delay: 3600 },
    { cmd: "system_status --full", result: "[OPTIMAL] Systems operating at 100%", color: "text-green-400", delay: 3000 }
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
        <section ref={sectionRef} className="relative py-32 overflow-hidden bg-[#020408]">
            {/* Background Grids & effects */}
            <div className="absolute inset-0 bg-grid-white opacity-[0.03] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#020408] via-transparent to-[#020408] pointer-events-none" />

            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Tactical Visuals */}
                    <div className="relative">
                        <motion.div
                            style={{ y, opacity }}
                            className="relative z-10"
                        >
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                                <div className="relative glass-dark p-8 rounded-2xl border border-white/10 overflow-hidden">
                                    {/* Scanline */}
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%] opacity-20 pointer-events-none" />

                                    {/* Header */}
                                    <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                            <span className="text-xs font-mono text-red-400 tracking-widest">SYSTEM_ACTIVE</span>
                                        </div>
                                        <div className="text-[10px] font-mono text-white/40">V.1.0.4</div>
                                    </div>

                                    {/* Terminal Content - Dynamic Stream */}
                                    <div className="space-y-4 font-mono text-sm min-h-[220px]">
                                        {logs.map((log, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="border-l-2 border-white/5 pl-3"
                                            >
                                                <div className="flex gap-3 text-slate-400 text-xs mb-1">
                                                    <span className="text-red-500">➜</span>
                                                    <span>{log.cmd}</span>
                                                </div>
                                                <div className={`${log.color} font-bold text-[13px] pl-4`}>
                                                    {log.result}
                                                </div>
                                            </motion.div>
                                        ))}

                                        {/* Cursor Line */}
                                        <div className="flex gap-3 text-slate-400 animate-pulse pl-3 pt-2">
                                            <span className="text-red-500">➜</span>
                                            <span className="border-r-2 border-red-500 pr-1">awaiting_command</span>
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
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest">
                            <Zap className="w-3 h-3" />
                            <span>New Release</span>
                        </div>

                        <h2 className="text-5xl lg:text-7xl font-black font-display italic uppercase leading-[0.85] tracking-tight text-white">
                            THE AGENT THAT
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-500">DOES THINGS.</span>
                        </h2>

                        <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-lg">
                            Stop chatting with AI. Start employing it. OpenClaw connects to your browser, email, and calendar to execute complex workflows 24/7 without you lifting a finger.
                        </p>

                        <ul className="space-y-4">
                            {[
                                "Zero Human Intervention Required",
                                "Runs Locally on Your Machine",
                                "Controls Browser & Desktop Apps"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm font-bold text-white uppercase tracking-wider">
                                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40">
                                        <Crosshair className="w-3 h-3 text-red-500" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className="pt-4">
                            <Link to="/openclaw">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group relative px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest text-sm rounded-xl overflow-hidden transition-colors shadow-[0_0_40px_rgba(220,38,38,0.4)]"
                                >
                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
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

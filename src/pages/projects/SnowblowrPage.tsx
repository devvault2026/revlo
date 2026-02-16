import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, ArrowRight, CheckCircle2, Zap, Shield, Phone,
    Mail, Globe, Clock, Star, Users, MapPin,
    ChevronDown, ChevronUp, Smartphone, Download,
    ExternalLink, Play, CreditCard, Lock, Activity,
    CloudSnow, BarChart3, Rocket, MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SnowblowrShowcase from '../../components/SnowblowrShowcase';

const SnowblowrPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-[#020408] min-h-screen pt-24"
        >
            {/* Project Header */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-20">
                <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Back to Hub</span>
                </Link>

                <div className="grid lg:grid-cols-2 gap-20">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-3 px-4 py-2 glass rounded-full">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Case Study: 2026 Deployment</span>
                        </div>

                        <h1 className="text-6xl lg:text-9xl font-black italic tracking-tighter text-white uppercase leading-[0.8]">
                            SNOW <br />
                            <span className="gradient-text">BLOWR.</span>
                        </h1>

                        <p className="text-2xl text-slate-400 font-medium leading-relaxed max-w-xl">
                            How we solved the $100B seasonal labor gap with a high-frequency, on-demand matching engine and hyper-local logistics.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        {[
                            { label: 'Role', value: 'Prime Contractor' },
                            { label: 'Architecture', value: 'Hyper-Local Logistics' },
                            { label: 'Intelligence', value: 'Predictive Matching' },
                            { label: 'Status', value: 'Operational' }
                        ].map((item, i) => (
                            <div key={i} className="space-y-2 p-8 glass rounded-3xl border-white/5">
                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.label}</div>
                                <div className="text-xl font-black text-white italic tracking-tighter uppercase">{item.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Reusing the high-impact showcase inside the page */}
            <SnowblowrShowcase />

            {/* Technical Case Study Section */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-40 border-t border-white/5">
                <div className="grid lg:grid-cols-2 gap-24 items-center mb-40">
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <h2 className="text-4xl lg:text-6xl font-black text-white italic tracking-tighter uppercase">THE CHALLENGE</h2>
                            <p className="text-xl text-slate-400 font-medium leading-relaxed">
                                Traditional snow removal relies on rigid seasonal contracts. If it doesn't snow, customers feel robbed. If it dumps, operators are overwhelmed. There was no real-time elastic supply for the most volatile weather events.
                            </p>
                        </div>

                        <div className="grid gap-6">
                            {[
                                { title: 'Seasonal Friction', desc: 'Removing the need for 5-month binding contracts.' },
                                { title: 'Operator Under-utilization', desc: 'Connecting residential neighbors with equipment to those in need.' },
                                { title: 'Logistical Blindness', desc: 'Zero real-time tracking for homeowners buried in snow.' }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 p-6 glass rounded-2xl border-white/5">
                                    <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                                        <Activity className="w-6 h-6 text-red-500" />
                                    </div>
                                    <div>
                                        <div className="font-black text-white uppercase italic tracking-tighter mb-1">{item.title}</div>
                                        <div className="text-sm text-slate-500 font-medium">{item.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-500/10 blur-[120px] rounded-full animate-pulse" />
                        <div className="relative glass p-12 rounded-[64px] border-white/10 space-y-12 shadow-2xl">
                            <div className="flex items-center gap-4 border-b border-white/5 pb-8">
                                <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center">
                                    <Rocket className="text-white w-8 h-8" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Our Solution</div>
                                    <div className="text-2xl font-black text-white italic uppercase tracking-tighter">ELASTIC INFRASTRUCTURE</div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Matching Efficiency</span>
                                        <span className="text-xl font-black text-white italic">99.4%</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '99.4%' }}
                                            className="h-full bg-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payout Velocity</span>
                                        <span className="text-xl font-black text-white italic">INSTANT</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '100%' }}
                                            className="h-full bg-emerald-500"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Labor Scalability</span>
                                        <span className="text-xl font-black text-white italic">INFINITE</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '90%' }}
                                            className="h-full bg-purple-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Final Vision */}
                <div className="p-20 glass rounded-[64px] border-blue-500/20 bg-blue-500/5 text-center relative overflow-hidden">
                    <div className="relative z-10 space-y-8">
                        <h2 className="text-5xl lg:text-7xl font-black text-white italic tracking-tighter uppercase leading-none">
                            BUILDING THE FUTURE OF <br />
                            <span className="text-blue-500">LOCAL LOGISTICS.</span>
                        </h2>
                        <p className="text-xl text-slate-400 font-medium max-w-3xl mx-auto italic leading-relaxed">
                            Snowblowr isn't just a snow removal app. It's the blueprint for how Revlo deploys high-frequency matching engines to traditionally "un-scalable" local service industries.
                        </p>
                        <div className="flex justify-center gap-6 pt-8">
                            <a href="https://www.snowblowr.com/" target="_blank" rel="noopener noreferrer" className="px-12 py-6 bg-white text-black font-black uppercase tracking-widest text-sm rounded-2xl flex items-center gap-3 hover:scale-105 transition-all italic">
                                VIEW LIVE DEPLOYMENT
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pagination */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 border-t border-white/5">
                <div className="flex justify-between items-center bg-white/5 p-12 rounded-[48px] border border-white/5">
                    <div className="text-left">
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 italic">Next Protocol</div>
                        <Link to="/projects/indeedbot" className="group flex flex-col items-start gap-4">
                            <div className="text-3xl lg:text-5xl font-black text-white uppercase italic tracking-tighter group-hover:text-purple-400 transition-colors">IndeedBot 2026</div>
                            <div className="flex items-center gap-2 text-purple-400 text-xs font-black uppercase tracking-widest group-hover:translate-x-2 transition-transform italic">
                                System Overview <ArrowRight className="w-4 h-4" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.main>
    );
};

export default SnowblowrPage;

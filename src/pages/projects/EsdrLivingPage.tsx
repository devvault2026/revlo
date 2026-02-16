import React from 'react';
import { motion } from 'framer-motion';
import {
    Home,
    Users,
    MessageSquare,
    ShieldCheck,
    ArrowLeft,
    ExternalLink,
    Building2,
    Calendar,
    Zap,
    LayoutDashboard,
    Globe,
    Smartphone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

const EsdrLivingPage: React.FC = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8 }
    };

    return (
        <div className="min-h-screen bg-[#020408] text-white">
            <Navigation />

            {/* Hero Section */}
            <section className="relative pt-40 pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-grid-white opacity-5 pointer-events-none" />
                <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-purple-900/10 blur-[150px] rounded-full" />

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back to Systems</span>
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div {...fadeIn}>
                            <div className="inline-block px-4 py-2 glass rounded-full mb-8">
                                <span className="text-[10px] font-black text-purple-400 uppercase tracking-[0.4em]">
                                    Project // 002
                                </span>
                            </div>

                            <h1 className="text-6xl lg:text-9xl font-black font-display italic tracking-tighter mb-8 leading-none">
                                ESDR <span className="gradient-text">LIVING.</span>
                            </h1>

                            <p className="text-2xl lg:text-3xl text-slate-400 max-w-xl font-medium leading-tight mb-12">
                                An elite real estate ecosystem built for local investors to manage, showcase, and scale their property portfolios with disruptive efficiency.
                            </p>

                            <div className="flex flex-wrap gap-6">
                                <a href="https://esdr-group.vercel.app/" target="_blank" rel="noopener noreferrer">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-12 py-6 bg-white text-black text-[12px] font-black uppercase tracking-[0.4em] rounded-2xl flex items-center gap-4 italic shadow-2xl shadow-purple-500/10"
                                    >
                                        LIVE SITE PREVIEW
                                        <ExternalLink className="w-5 h-5" />
                                    </motion.button>
                                </a>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2 }}
                            className="relative group h-[500px] rounded-[48px] overflow-hidden border border-white/10 shadow-2xl"
                        >
                            <img
                                src="https://res.cloudinary.com/dpfapm0tl/image/upload/v1771214488/esdr_dowjzk.png"
                                alt="ESDR Living Dashboard"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Strategy Section */}
            <section className="py-32 relative">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-20 items-start">
                        <motion.div {...fadeIn}>
                            <h2 className="text-4xl font-black font-display italic tracking-tighter mb-8 uppercase text-purple-400">The Mission</h2>
                            <p className="text-xl text-slate-400 leading-relaxed font-medium mb-12">
                                A local real estate investor needed a bridge between high-quality marketing and operational logistics. ESDR Living was built to solve two critical problems:
                                <br /><br />
                                1. The need for an elite, Airbnb-style UI to showcase properties and attract high-value tenants.
                                <br />
                                2. A centralized platform where current tenants can seamlessly contact property managers and handle requests.
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-6 glass rounded-3xl border border-white/5 space-y-3">
                                    <Globe className="w-6 h-6 text-purple-400" />
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Full-Stack Hub</h4>
                                    <p className="text-[10px] text-slate-500">End-to-end property lifecycle management.</p>
                                </div>
                                <div className="p-6 glass rounded-3xl border border-white/5 space-y-3">
                                    <Smartphone className="w-6 h-6 text-blue-400" />
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Mobile-First UI</h4>
                                    <p className="text-[10px] text-slate-500">Tactical access for tenants on the move.</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
                            <h2 className="text-4xl font-black font-display italic tracking-tighter mb-8 uppercase text-indigo-400">System architecture</h2>

                            <ul className="space-y-6">
                                {[
                                    {
                                        title: 'Airbnb-Style Property Engine',
                                        desc: 'A dynamic, high-conversion showcase designed to highlight property features and layouts with premium visuals.',
                                        icon: <Building2 className="w-5 h-5 text-indigo-500" />
                                    },
                                    {
                                        title: 'Tenant Communication Portal',
                                        desc: 'Direct, real-time messaging pipeline between tenants and managers, eliminating slow email threads.',
                                        icon: <MessageSquare className="w-5 h-5 text-purple-500" />
                                    },
                                    {
                                        title: 'Investor Management Dashboard',
                                        desc: 'A backend hub to track property statuses, tenant requests, and portfolio growth at a glance.',
                                        icon: <LayoutDashboard className="w-5 h-5 text-blue-500" />
                                    }
                                ].map((item, idx) => (
                                    <li key={idx} className="flex gap-6 p-8 bg-white/5 border border-white/10 rounded-[32px] group hover:bg-white/[0.08] transition-all">
                                        <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-110 transition-transform">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black italic uppercase tracking-tight mb-2 text-white">{item.title}</h4>
                                            <p className="text-sm text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Architecture Details Grid */}
            <section className="py-32 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div {...fadeIn} className="text-center mb-24">
                        <h2 className="text-5xl lg:text-7xl font-black font-display italic tracking-tighter mb-8 uppercase">
                            Elite <span className="gradient-text">Functionality.</span>
                        </h2>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium">
                            I didn't just build a website—I built an operational asset that saves time and maximizes property value.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <Zap className="w-8 h-8" />,
                                title: 'FAST LOADING',
                                desc: 'Optimized image delivery for lightning-fast property browsing.',
                                color: 'purple'
                            },
                            {
                                icon: <Users className="w-8 h-8" />,
                                title: 'TENANT CRM',
                                desc: 'Built-in management for tenant requests and communication history.',
                                color: 'indigo'
                            },
                            {
                                icon: <Calendar className="w-8 h-8" />,
                                title: 'AVAILABILITY',
                                desc: 'Real-time property status system for prospective renters.',
                                color: 'blue'
                            },
                            {
                                icon: <ShieldCheck className="w-8 h-8" />,
                                title: 'SECURE PORTAL',
                                desc: 'Encrypted communication pipelines for manager privacy.',
                                color: 'teal'
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="p-10 glass rounded-[40px] border border-white/5 hover:border-white/10 transition-all text-center group"
                            >
                                <div className={`w-16 h-16 rounded-2xl bg-${item.color}-500/10 flex items-center justify-center mb-8 border border-${item.color}-500/20 mx-auto group-hover:scale-110 transition-transform`}>
                                    {React.cloneElement(item.icon as React.ReactElement, { className: `text-${item.color}-400` })}
                                </div>
                                <h3 className="text-xl font-black mb-4 italic uppercase tracking-tight">{item.title}</h3>
                                <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Built by Revlo Section */}
            <section className="py-32 bg-[#020408] relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <motion.div {...fadeIn}>
                        <h2 className="text-5xl lg:text-7xl font-black font-display italic tracking-tighter mb-12 uppercase leading-none">
                            BUILT BY <span className="gradient-text-alt">REVLO.</span>
                        </h2>

                        <p className="text-xl text-slate-400 leading-relaxed font-medium mb-16">
                            ESDR Living represents the fusion of premium design systems and practical industrial utility. It proves that even traditional sectors like local real estate can benefit from world-class tech infrastructure.
                        </p>

                        <div className="flex justify-center flex-wrap gap-8">
                            <div className="flex flex-col items-center gap-2">
                                <div className="text-4xl font-black text-white italic tracking-tighter">100%</div>
                                <div className="text-[8px] font-black text-slate-500 tracking-widest uppercase">CUSTOM CODE</div>
                            </div>
                            <div className="w-px h-12 bg-white/10 hidden md:block" />
                            <div className="flex flex-col items-center gap-2">
                                <div className="text-4xl font-black text-white italic tracking-tighter">ELITE</div>
                                <div className="text-[8px] font-black text-slate-500 tracking-widest uppercase">USER EXPERIENCE</div>
                            </div>
                            <div className="w-px h-12 bg-white/10 hidden md:block" />
                            <div className="flex flex-col items-center gap-2">
                                <div className="text-4xl font-black text-white italic tracking-tighter">ZERO</div>
                                <div className="text-[8px] font-black text-slate-500 tracking-widest uppercase">AGENCY BLOAT</div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Background Decoration */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
            </section>

            <Footer />
        </div>
    );
};

export default EsdrLivingPage;

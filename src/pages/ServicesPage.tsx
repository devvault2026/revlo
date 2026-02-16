import React from 'react';
import { motion } from 'framer-motion';
import {
    Layers,
    TrendingUp,
    Cpu,
    ArrowRight,
    CheckCircle2,
    Star,
    Shield,
    Zap,
    Search,
    Monitor,
    Activity,
    Code,
    Users,
    MessageSquare,
    Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesPage: React.FC = () => {
    const services = [
        {
            icon: <Layers className="w-8 h-8" />,
            title: 'Digital Foundation & Brand Strategy',
            shortDesc: 'Establish authority and command attention in your market.',
            description: 'We don\'t just design websites; we build conversion engines. Our foundation phase ensures your business is positioned as the obvious choice, with a premium identity that builds instant trust and authority.',
            process: [
                {
                    step: '01. COMPETITIVE AUDIT',
                    desc: 'We analyze your market landscape to identify gaps and define your "Category of One" positioning.'
                },
                {
                    step: '02. BRAND ARCHITECTURE',
                    desc: 'Development of visual identity, voice, and messaging that resonates with high-value clients.'
                },
                {
                    step: '03. CONVERSION UI/UX',
                    desc: 'Engineering a high-performance digital asset built for speed, SEO, and user psychological triggers.'
                },
                {
                    step: '04. ECOSYSTEM LAUNCH',
                    desc: 'Final deployment with full conversion tracking and search engine indexing for immediate visibility.'
                }
            ],
            features: [
                'Brand Strategy & Positioning',
                'High-Conversion Website Design',
                'Premium UI/UX Infrastructure',
                'Search Engine Optimization',
                'Market Competitor Analysis',
                'Social Architecture Design',
                'Content Strategy Roadmap',
                'Conversion Tracking Setup'
            ],
            price: 'Starting at $2,500',
            duration: 'One-Time Setup',
            color: 'text-purple-400',
            bg: 'bg-purple-500/10',
            benefits: [
                'Instant Market Authority',
                'Higher Conversion Rates',
                'Clear Competitive Edge',
                'Airtight Brand Consistency',
            ],
            customLink: '/contact'
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: 'Managed Growth & Acquisition Systems',
            shortDesc: 'Scale your revenue with predictable, high-quality lead flow.',
            description: 'We manage your entire customer acquisition journey. By leveraging data-driven insights and elite media buying tactics, we bring high-intent customers directly to your business.',
            process: [
                {
                    step: '01. AUDIENCE SYNTHESIS',
                    desc: 'Pinpointing your ideal customers using advanced demographic and psychographic data points.'
                },
                {
                    step: '02. CREATIVE STRATEGY',
                    desc: 'Producing high-impact creative assets designed to stop the scroll and drive action.'
                },
                {
                    step: '03. CHANNEL DEPLOYMENT',
                    desc: 'Omnichannel ad distribution across Meta, Google, and LinkedIn with precision targeting.'
                },
                {
                    step: '04. ROI OPTIMIZATION',
                    desc: 'Daily monitoring and scaling of winners to maximize your return on ad spend.'
                }
            ],
            features: [
                'Omni-Channel Ad Management',
                'Viral Content Syndication',
                'Lead Generation Systems',
                'Performance ROI Monitoring',
                'Creative Asset Production',
                'A/B Testing & Optimization',
                'Market Expansion Tactics',
                'Real-Time Lead Dashboard'
            ],
            price: 'Starting at $1,750/mo',
            duration: 'Monthly Partnership',
            color: 'text-red-400',
            bg: 'bg-red-500/10',
            benefits: [
                'Predictable Revenue Growth',
                'Lower Acquisition Costs',
                'High-Intent Lead Flow',
                'Scale Beyond Local Markets',
            ],
            customLink: '/contact'
        },
        {
            icon: <Cpu className="w-8 h-8" />,
            title: 'Autonomous Operations & Sales Automation',
            shortDesc: 'The ultimate leverage for your business operations.',
            description: 'The final stage of scale. We deploy and manage custom AI agents that handle your sales follow-ups, customer support, and appointment setting—working for you 24/7.',
            process: [
                {
                    step: '01. SYSTEMS AUDIT',
                    desc: 'Mapping your current manual bottlenecks and identifying opportunities for AI leverage.'
                },
                {
                    step: '02. AGENT TRAINING',
                    desc: 'Ingesting your business knowledge into custom AI models for sales and support roles.'
                },
                {
                    step: '03. CRM INTEGRATION',
                    desc: 'Connecting our AI agents directly into your sales pipeline for seamless data flow.'
                },
                {
                    step: '04. LIVE DEPLOYMENT',
                    desc: 'Activating 24/7 autonomous agents to manage lead nurture and scheduling.'
                }
            ],
            features: [
                'AI Sales & Closing Agents',
                'Automated Appointment Booking',
                'SMS & Email Nurture Flow',
                'Database Reactivation',
                'Workflow Efficiency Audit',
                'CRM Custom Integration',
                '24/7 Customer Support AI',
                'Predictable Sales Velocity'
            ],
            price: 'Starting at $3,000/mo',
            duration: 'Monthly Partnership',
            color: 'text-blue-400',
            bg: 'bg-blue-500/10',
            benefits: [
                'Infinite Operational Leverage',
                'No Extra Headcount Needed',
                'Zero Lead Abandonment',
                '24/7 Sales Persistence',
            ],
            customLink: '/contact'
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: 'AI Takeoff & Estimating Agent',
            shortDesc: 'Instant, accurate bids for contractors & trades.',
            description: 'Stop wasting late nights on manual takeoffs. Our vision-enabled AI Agent analyzes your PDF/DWG plans to return measured quantities, material line-items, and draft pricing in minutes instead of hours.',
            process: [
                {
                    step: '01. PLAN UPLOAD',
                    desc: 'Drop your blueprints (PDF/DWG) into our secure portal for immediate vision-language processing.'
                },
                {
                    step: '02. AGENT ANALYSIS',
                    desc: 'The agent identifies walls, symbols, and openings, calculating exact quantities with 99.8% precision.'
                },
                {
                    step: '03. LINE-ITEM MAPPING',
                    desc: 'Automated conversion of measurements into specific material lists and labor requirements.'
                },
                {
                    step: '04. BID GENERATION',
                    desc: 'Export professional, downloadable Excel and PDF bids ready for procurement or client sign-off.'
                }
            ],
            features: [
                'Automated Measured Quantities',
                'Line-Item Material Breakdown',
                'Complex Assembly Calculations',
                'Visual Markup & Verification',
                'Contextual Market Pricing',
                'Multi-Format Export (Excel/PDF)',
                'Historical Project Database',
                'Real-Time Scope Summaries'
            ],
            price: 'Starting at $1,250/mo',
            duration: 'Monthly Performance',
            color: 'text-fuchsia-400',
            bg: 'bg-fuchsia-500/10',
            benefits: [
                'Win More High-Value Bids',
                'Zero Manual Count Errors',
                'Reclaim 15+ Hours Weekly',
                'Instant Procurement Lists',
            ],
            customLink: '/takeoff-agent'
        },
        {
            icon: <Code className="w-8 h-8" />,
            title: 'Elite Development // The One-Man Army',
            shortDesc: 'Custom engineering for mission-critical software.',
            description: 'The ultimate leverage. Direct access to a Category of One operator to build complex, IPO-grade systems—from AI marketplaces to secure fintech. If you can dream it, I can build it. With or without AI.',
            process: [
                {
                    step: '01. MISSION BRIEF',
                    desc: 'We define the objectives, complexity, and technical requirements for your custom build.'
                },
                {
                    step: '02. RAPID PROTOTYPE',
                    desc: 'I deploy a functional MVP in weeks, not months, focusing on core value and architectural robustness.'
                },
                {
                    step: '03. HARDENING & SCALE',
                    desc: 'Implementing security, optimization, and scaling layers to ensure the system is production-ready.'
                },
                {
                    step: '04. DEPLOYMENT & HANDOFF',
                    desc: 'Launching the system with full documentation and a 90-day execution standard.'
                }
            ],
            features: [
                'Full-Stack Architecture',
                'Custom AI Instrumentations',
                'Mobile App (iOS/Android)',
                'Real-Time Systems (WS)',
                'Dynamic Logic & Algorithms',
                'Security Auditing & Hardening',
                'Fractional CTO Strategy',
                'Performance Optimization'
            ],
            price: 'Starting at $5,000',
            duration: 'Blitz Project',
            color: 'text-red-500',
            bg: 'bg-red-500/10',
            benefits: [
                'Impossible Build Velocity',
                'Direct Expert Access',
                'No Agency Bloat/Noise',
                'IPO-Grade System Quality',
            ],
            customLink: '/elite-development'
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-[#020408] pt-40 pb-20 relative overflow-hidden"
        >
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-grid-white opacity-[0.03] pointer-events-none" />
            <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-[10%] right-[30%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-4xl mx-auto mb-32"
                >
                    <div className="inline-block px-4 py-2 glass rounded-full mb-8">
                        <span className="text-[10px] font-black text-purple-400 uppercase tracking-[0.4em]">
                            Our Specializations
                        </span>
                    </div>

                    <h1 className="text-6xl lg:text-9xl font-black font-display mb-10 tracking-tighter italic text-white leading-none uppercase">
                        OUR <span className="gradient-text-alt block lg:inline">SERVICES.</span>
                    </h1>

                    <p className="text-xl text-slate-400 leading-relaxed mb-12 font-medium max-w-2xl mx-auto">
                        We don&apos;t just provide tools; we deliver end-to-end results. From establishing your brand&apos;s
                        authority to automating your entire sales machine, we are your growth department.
                    </p>

                    <Link to="/contact">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-12 py-6 bg-white text-black font-black uppercase tracking-widest text-sm rounded-2xl shadow-2xl hover:bg-slate-200 transition-all duration-300 flex items-center gap-3 mx-auto"
                        >
                            PARTNER WITH US
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Services/E2E Grid */}
                <div className="space-y-32">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="grid lg:grid-cols-2 gap-20 items-stretch">
                                {/* Left Column - Service Overview */}
                                <div className="space-y-12">
                                    <div className="space-y-6 text-center lg:text-left">
                                        <div className={`w-20 h-20 glass rounded-3xl flex items-center justify-center border border-white/5 mx-auto lg:ml-0 ${service.color}`}>
                                            {service.icon}
                                        </div>
                                        <h2 className="text-4xl lg:text-5xl font-black text-white italic uppercase tracking-tighter leading-tight">
                                            {service.title}
                                        </h2>
                                        <p className="text-xl text-slate-400 font-medium leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>

                                    {/* Pricing & Benefits */}
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="p-8 bg-white/5 backdrop-blur-3xl rounded-[32px] border border-white/5">
                                            <div className={`text-3xl font-black mb-1 ${service.color}`}>{service.price}</div>
                                            <div className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-500">{service.duration}</div>
                                        </div>
                                        <div className="p-8 bg-white/5 backdrop-blur-3xl rounded-[32px] border border-white/5">
                                            <div className="space-y-2">
                                                {service.benefits.map((benefit, i) => (
                                                    <div key={i} className="flex items-center gap-3 text-[10px] font-black text-white uppercase tracking-widest">
                                                        <CheckCircle2 className={`w-3 h-3 ${service.color}`} />
                                                        {benefit}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Feature List */}
                                    <div className="bg-white/5 backdrop-blur-3xl rounded-[32px] p-8 border border-white/5">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-6">Service Deliverables</h3>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {service.features.map((feature, i) => (
                                                <div key={i} className="flex items-center gap-3 text-[9px] font-black text-slate-300 uppercase tracking-widest">
                                                    <div className={`w-1 h-1 rounded-full ${service.color.replace('text', 'bg')}`} />
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - E2E Roadmap */}
                                <div className="bg-white/5 backdrop-blur-3xl rounded-[48px] p-8 lg:p-16 border border-white/5 relative flex flex-col justify-center overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8">
                                        <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em]">E2E ROADMAP</span>
                                    </div>

                                    <div className="space-y-12 relative">
                                        {/* Roadmap Line */}
                                        <div className="absolute left-6 top-4 bottom-4 w-px bg-white/10" />

                                        {service.process.map((p, i) => (
                                            <div key={i} className="relative pl-16 group">
                                                {/* Dot */}
                                                <div className={`absolute left-[21px] top-1 w-2.5 h-2.5 rounded-full border-2 border-[#020408] group-hover:scale-150 transition-transform duration-300 ${service.color.replace('text', 'bg')}`} />

                                                <h4 className={`text-sm font-black italic mb-2 tracking-widest ${service.color}`}>{p.step}</h4>
                                                <p className="text-slate-400 text-sm font-medium leading-relaxed italic">
                                                    &quot;{p.desc}&quot;
                                                </p>
                                            </div>
                                        ))}

                                        <Link to={service.customLink}>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="mt-8 ml-11 px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-all italic flex items-center gap-3"
                                            >
                                                Start Phase 01
                                                <ArrowRight className="w-4 h-4" />
                                            </motion.button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Final CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-40 relative group"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-red-500/10 to-blue-500/10 blur-[100px] opacity-30" />
                    <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[64px] p-16 lg:p-24 text-center relative overflow-hidden">
                        <div className="max-w-3xl mx-auto space-y-10">
                            <h2 className="text-4xl lg:text-7xl font-black italic text-white uppercase leading-tight tracking-tighter">
                                CHOOSE YOUR <span className="gradient-text-alt">LEVERAGE.</span>
                            </h2>
                            <p className="text-xl text-slate-400 font-medium leading-relaxed">
                                Whether you need a stronger foundation or a fully autonomous sales machine,
                                we are ready to partner with you. Let&apos;s build your legacy together.
                            </p>
                            <Link to="/contact">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-12 py-6 bg-white text-black text-[12px] font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-slate-200 transition-all duration-300 italic flex items-center gap-4 mx-auto"
                                >
                                    BOOK A STRATEGY CALL
                                    <ArrowRight className="w-5 h-5" />
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ServicesPage;

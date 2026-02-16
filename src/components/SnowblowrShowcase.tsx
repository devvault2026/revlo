import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight, CheckCircle2, Zap, Shield, Phone,
    Mail, Globe, Clock, Star, Users, MapPin,
    ChevronDown, ChevronUp, Smartphone, Download,
    ExternalLink, Play, CreditCard, Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SnowblowrShowcase: React.FC = () => {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    const faqs = [
        {
            q: "How fast can you clear my driveway?",
            a: "Response time can be as low as minutes. Service time: 2 hours on premium/priority, up to 12 hours on same-day service, and up to 24 hours on flexible same-day service."
        },
        {
            q: "Do I need a seasonal contract?",
            a: "No contracts. No surprises. No BS. Pay per storm or get a Storm Pass for priority matching. You only pay when it snows."
        },
        {
            q: "What if the operator misses a spot?",
            a: "Every job comes with timestamped before/after photos. If it's not done right, we'll make it right with our 'Snowfund' guarantee."
        },
        {
            q: "How is pricing calculated?",
            a: "Pricing is transparent and based on driveway size and snow depth. You see the exact price upfront before you book."
        }
    ];

    return (
        <section id="snowblowr" className="relative py-24 bg-[#05060A] overflow-hidden">
            {/* BRANDING DECAL */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 px-6 py-2 glass rounded-b-3xl border-t-0 z-50">
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.5em]">LATEST DEPLOYMENT: SNOWBLOWR</span>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* HERO SECTION */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                            <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">The Snow Removal Revolution</span>
                        </div>

                        <h2 className="text-6xl lg:text-8xl font-black italic tracking-tighter text-white leading-[0.85] uppercase">
                            Your driveway. <br />
                            <span className="text-blue-500">Cleared on demand.</span>
                        </h2>

                        <p className="text-xl text-slate-400 leading-relaxed font-medium max-w-xl">
                            Stop gambling with weather. SNOWBLOWR connects you to verified local operators. Response time as low as minutes. No contracts. No BS.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#05060A] bg-slate-800 flex items-center justify-center text-[10px] font-black">U{i}</div>
                                ))}
                            </div>
                            <div className="flex flex-col justify-center">
                                <div className="flex items-center gap-1 text-yellow-500">
                                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                                    <span className="text-xs font-black text-white ml-2">4.9/5</span>
                                </div>
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">100+ NEIGHBOURS SIGNED UP</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-6">
                            <button className="px-10 py-5 bg-blue-600 text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-blue-500 transition-all transform hover:scale-105 flex items-center gap-3">
                                GET SNOWBLOWR NOW
                                <ArrowRight className="w-4 h-4" />
                            </button>
                            <div className="flex gap-4 items-center">
                                <Smartphone className="w-10 h-10 text-slate-700" />
                                <div className="text-left">
                                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Available on</div>
                                    <div className="text-xs font-bold text-white uppercase">App Store & Play</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Main Screenshot with focal point on left side as requested */}
                        <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(59,130,246,0.2)] aspect-[4/3] lg:aspect-auto h-[600px]">
                            <div
                                className="absolute inset-0 bg-cover bg-left"
                                style={{ backgroundImage: 'url(https://res.cloudinary.com/dpfapm0tl/image/upload/v1771218296/snowblowr_bcrgjb.png)' }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                            {/* Floating Live Overlay */}
                            <div className="absolute top-8 right-8 glass p-4 rounded-2xl border-white/20 animate-bounce">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                    <span className="text-[10px] font-black text-white uppercase tracking-widest">LIVE NOW: 8 OPERATORS</span>
                                </div>
                            </div>

                            {/* Price Point Overlay */}
                            <div className="absolute bottom-8 left-8 glass p-6 rounded-3xl border-blue-500/30">
                                <div className="text-[9px] font-black text-blue-400 uppercase tracking-[0.3em] mb-2">Estimate</div>
                                <div className="text-5xl font-black text-white italic tracking-tighter">$42</div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase mt-1">Your Price</div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* STATS STRIP */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-40">
                    {[
                        { label: 'Neighbours Signed Up', value: '100+', icon: Users },
                        { label: 'Avg. Service Time', value: '2HR', icon: Clock },
                        { label: 'App Store Rating', value: '4.9', icon: Star },
                        { label: 'Operator Vetting', value: '100%', icon: Shield },
                    ].map((stat, i) => (
                        <div key={i} className="p-8 glass rounded-[32px] border-white/5 hover:border-blue-500/30 transition-all group">
                            <stat.icon className="w-6 h-6 text-blue-500 mb-6 group-hover:scale-110 transition-transform" />
                            <div className="text-4xl font-black text-white italic tracking-tighter mb-1">{stat.value}</div>
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* PROCESS SECTION */}
                <div className="mb-40">
                    <div className="text-center mb-20 space-y-4">
                        <h3 className="text-4xl lg:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
                            From buried in Snow to <br />
                            <span className="text-blue-500">'Thanks Snowblowrr!'</span> in 4 taps
                        </h3>
                        <p className="text-slate-400 text-lg font-medium max-w-2xl mx-auto">
                            No phone tag. No paperwork. No waiting around. Just fast, tracked, photo-verified snow removal that actually works.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            {
                                step: '1',
                                title: 'Drop your pin',
                                desc: 'Enter your address, confirm on the map. Set your driveway size once—we remember it.'
                            },
                            {
                                step: '2',
                                title: 'See price instantly',
                                desc: 'Full cost breakdown upfront. Add walkways or stairs if needed. Zero surprises.'
                            },
                            {
                                step: '3',
                                title: 'Get matched',
                                desc: 'We find the best local operator with the right equipment. Verified, insured, ready.'
                            },
                            {
                                step: '4',
                                title: 'Track & done',
                                desc: 'Watch real-time progress. Review before/after photos. Approve and tip in-app.'
                            }
                        ].map((step, i) => (
                            <div key={i} className="relative group">
                                <div className="text-8xl font-black text-white/5 absolute -top-10 left-0 group-hover:text-blue-500/10 transition-colors">{step.step}</div>
                                <div className="relative pt-8">
                                    <h4 className="text-xl font-black text-white uppercase tracking-tighter mb-4 italic">{step.title}</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed font-medium">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* PRICING SECTION */}
                <div className="mb-40">
                    <div className="text-center mb-20">
                        <h3 className="text-5xl lg:text-7xl font-black text-white italic tracking-tighter uppercase mb-6 leading-none">
                            Crystal <span className="text-blue-500">Clear</span> Pricing
                        </h3>
                        <p className="text-slate-400 text-lg font-medium">Transparent pricing that makes sense. Finally.</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        {/* Pay-Per-Storm */}
                        <div className="p-12 glass rounded-[48px] border-white/5 relative group hover:border-blue-500/20 transition-all">
                            <div className="mb-8">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Perfect for Flexibility</span>
                                <h4 className="text-3xl font-black text-white uppercase italic tracking-tighter mt-2">PAY-PER-STORM</h4>
                            </div>

                            <div className="mb-8 p-10 bg-blue-600/5 rounded-3xl border border-blue-500/10 text-center">
                                <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">From</div>
                                <div className="text-8xl font-black text-white italic tracking-tighter leading-none">$30</div>
                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">per clear</div>
                            </div>

                            <ul className="space-y-4 mb-12">
                                {['Pay only when it snows', 'Zero commitment', 'Cancel anytime', 'Instant quote upfront'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-300 font-medium italic">
                                        <CheckCircle2 className="w-5 h-5 text-blue-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <button className="w-full py-6 glass text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-white/10 transition-all italic border-white/10">
                                SEE YOUR PRICE FIRST
                            </button>
                        </div>

                        {/* Storm Pass */}
                        <div className="p-12 bg-blue-600 rounded-[48px] relative group overflow-hidden shadow-[0_0_100px_rgba(37,99,235,0.3)]">
                            <div className="absolute top-8 right-8 glass bg-white/10 px-4 py-2 rounded-full border-white/20">
                                <span className="text-[9px] font-black text-white uppercase tracking-widest">LIMITED SPOTS</span>
                            </div>

                            <div className="mb-8">
                                <span className="text-[10px] font-black text-blue-200 uppercase tracking-[0.3em]">Priority Protocol</span>
                                <h4 className="text-3xl font-black text-white uppercase italic tracking-tighter mt-2">STORM PASS</h4>
                            </div>

                            <div className="mb-8 space-y-4">
                                <div className="text-5xl font-black text-white italic tracking-tighter leading-tight">Never shovel again.</div>
                                <p className="text-blue-100 font-medium">Set it and forget it. Auto-clear every storm with priority matching and locked-in rates.</p>
                            </div>

                            <ul className="space-y-4 mb-12">
                                {[
                                    'Priority operator matching',
                                    'Auto-book on snowfall',
                                    'Locked-in seasonal pricing',
                                    'Premium 24/7 support'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-white font-bold italic">
                                        <CheckCircle2 className="w-5 h-5 text-blue-200" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <button className="w-full py-6 bg-white text-blue-600 font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-slate-100 transition-all italic shadow-2xl">
                                JOIN WAITLIST
                            </button>
                            <p className="text-center mt-6 text-[10px] font-black text-blue-100 uppercase tracking-widest animate-pulse">
                                🔥 86 spots claimed in your area this week
                            </p>
                        </div>
                    </div>
                </div>

                {/* OPERATORS SECTION */}
                <div className="grid lg:grid-cols-2 gap-20 items-center mb-40">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="order-2 lg:order-1"
                    >
                        <div className="p-12 glass rounded-[48px] border-white/5 space-y-10 relative overflow-hidden">
                            {/* Background Decorative */}
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Users className="w-48 h-48" />
                            </div>

                            <div className="space-y-4 relative z-10">
                                <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">For Operators</span>
                                <h3 className="text-4xl lg:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
                                    Turn equipment into <br />
                                    <span className="text-blue-500">Revenue Machine</span>
                                </h3>
                                <p className="text-xl text-slate-400 font-medium">Own a snowblower, plow, or even just a shovel? Keep 75-85% of every dollar.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-6 relative z-10">
                                <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                                    <div className="text-3xl font-black text-white italic tracking-tighter mb-1">75-85%</div>
                                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Payout per job</div>
                                </div>
                                <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                                    <div className="text-3xl font-black text-white italic tracking-tighter mb-1">Instant</div>
                                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Payout Available</div>
                                </div>
                            </div>

                            <button className="w-full py-6 bg-blue-600 text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-blue-500 transition-all transform hover:scale-105 italic flex items-center justify-center gap-3">
                                START EARNING TODAY
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="order-1 lg:order-2 space-y-8"
                    >
                        <h3 className="text-2xl font-black text-white italic uppercase tracking-widest border-l-4 border-blue-500 pl-6">THIS WEEK'S TOP EARNERS</h3>
                        <div className="space-y-4">
                            {[
                                { name: 'Mike D.', jobs: '18 jobs', score: '4.9★', earned: '$678' },
                                { name: 'Sarah L.', jobs: '14 jobs', score: '5.0★', earned: '$542' },
                                { name: 'Tom R.', jobs: '11 jobs', score: '4.8★', earned: '$455' },
                            ].map((earner, i) => (
                                <div key={i} className="flex items-center justify-between p-6 glass rounded-2xl border-white/5 hover:border-blue-500/20 transition-all">
                                    <div className="flex items-center gap-6">
                                        <span className="text-xl font-black text-slate-700 italic">#{i + 1}</span>
                                        <div>
                                            <div className="text-lg font-black text-white uppercase italic tracking-tighter">{earner.name}</div>
                                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{earner.jobs} • {earner.score}</div>
                                        </div>
                                    </div>
                                    <div className="text-2xl font-black text-blue-500 italic tracking-tighter">{earner.earned}</div>
                                </div>
                            ))}
                        </div>
                        <p className="text-slate-400 italic font-medium px-6">
                            "No flyers. No door-knocking. I went from chasing clients to having them delivered to my phone. Game changer." — Jason M., Operator
                        </p>
                    </motion.div>
                </div>

                {/* FAQ SECTION */}
                <div className="mb-40 max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <h3 className="text-4xl lg:text-6xl font-black text-white italic tracking-tighter uppercase mb-4">FAQ</h3>
                        <p className="text-slate-400 font-medium uppercase tracking-widest text-sm">Everything you need to know</p>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="glass rounded-[32px] border-white/5 overflow-hidden">
                                <button
                                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                    className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                                >
                                    <span className="text-lg font-black text-white italic uppercase tracking-tighter">{faq.q}</span>
                                    {activeFaq === i ? <ChevronUp className="w-5 h-5 text-blue-500" /> : <ChevronDown className="w-5 h-5 text-slate-600" />}
                                </button>
                                <AnimatePresence>
                                    {activeFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="px-8 pb-8 text-slate-400 font-medium leading-relaxed"
                                        >
                                            {faq.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ENTERPRISE SECURITY STRIP */}
                <div className="mb-40 p-12 glass rounded-[64px] border-white/5 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-blue-600/[0.02] pointer-events-none" />
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <Lock className="w-8 h-8 text-blue-500" />
                                <span className="text-sm font-black text-blue-400 uppercase tracking-[0.5em]">Enterprise-Grade Security</span>
                            </div>
                            <h3 className="text-4xl lg:text-5xl font-black text-white italic tracking-tighter uppercase mb-6 leading-none">
                                Because <span className="text-blue-500">trust</span> isn't optional.
                            </h3>
                            <p className="text-lg text-slate-400 font-medium mb-10">
                                We take security, payments, and operator vetting as seriously as your bank does. All payments processed through Stripe with bank-level encryption.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                {['Stripe Identity Vetted', 'SOC 2 Infrastructure', 'PCI DSS Compliant', 'AES-256 Encryption'].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-widest">
                                        <CheckCircle2 className="w-3 h-3 text-blue-500" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-4">
                                <div className="flex items-center gap-3 text-blue-500 mb-2">
                                    <Smartphone className="w-5 h-5" />
                                    <span className="font-black italic uppercase tracking-tighter">Real-Time Updates</span>
                                </div>
                                <p className="text-[11px] font-medium text-slate-500 leading-relaxed italic">
                                    "Powered by Twilio. Get instant SMS and push notifications when matched, en route, arrived, and completed. Always know what's happening."
                                </p>
                            </div>
                            <div className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-4">
                                <div className="flex items-center gap-3 text-emerald-500 mb-2">
                                    <CreditCard className="w-5 h-5" />
                                    <span className="font-black italic uppercase tracking-tighter">Verified Payouts</span>
                                </div>
                                <p className="text-[11px] font-medium text-slate-500 leading-relaxed italic">
                                    "We never see your card details. All payments processed through Stripe with bank-level encryption trusted by Amazon and Shopify."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FINAL CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center space-y-12"
                >
                    <div className="space-y-6">
                        <h3 className="text-5xl lg:text-8xl font-black text-white italic tracking-tighter uppercase leading-[0.85]">
                            Stop shoveling. <br />
                            <span className="text-blue-500">Start living.</span>
                        </h3>
                        <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto italic">
                            Join thousands of Canadians who just tap SNOWBLOWR when it dumps outside.
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-8">
                        <button className="px-16 py-8 bg-white text-blue-600 font-black uppercase tracking-[0.2em] text-lg rounded-[2.5rem] hover:bg-slate-100 transition-all transform hover:scale-105 shadow-[0_0_60px_rgba(255,255,255,0.2)]">
                            INITIALIZE ACCESS
                        </button>
                        <div className="flex gap-4">
                            <img src="/apple-store.svg" alt="App Store" className="h-12 opacity-50 hover:opacity-100 transition-opacity cursor-pointer" />
                            <img src="/google-play.svg" alt="Google Play" className="h-12 opacity-50 hover:opacity-100 transition-opacity cursor-pointer" />
                        </div>
                    </div>

                    <div className="pt-20 border-t border-white/5 grid lg:grid-cols-4 gap-12 text-left opacity-30">
                        <div className="space-y-4">
                            <div className="text-xl font-black italic text-white tracking-widest">SNOWBLOWR</div>
                            <p className="text-xs font-medium text-slate-500 uppercase leading-relaxed tracking-wider">Never shovel again. On-demand snow clearing that actually works—in minutes, not hours.</p>
                        </div>
                        <div>
                            <div className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-6">Service Area</div>
                            <ul className="text-[10px] font-black text-slate-500 space-y-3 uppercase tracking-widest italic">
                                <li>Ottawa</li>
                                <li>Montreal</li>
                                <li>Toronto</li>
                                <li>Calgary</li>
                            </ul>
                        </div>
                        <div>
                            <div className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-6">Legal</div>
                            <ul className="text-[10px] font-black text-slate-500 space-y-3 uppercase tracking-widest italic">
                                <li>Privacy Policy</li>
                                <li>Terms of Service</li>
                                <li>Security Protocol</li>
                            </ul>
                        </div>
                        <div>
                            <div className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-6">Support</div>
                            <ul className="text-[10px] font-black text-slate-500 space-y-3 uppercase tracking-widest italic">
                                <li>hello@snowblowr.com</li>
                                <li>24/7 Season Center</li>
                                <li>FAQ Database</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* BACKGROUND DECORATIVE ELEMENTS */}
            <div className="absolute top-0 right-0 w-full h-[1000px] bg-gradient-to-b from-blue-900/5 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-[1000px] bg-gradient-to-t from-blue-900/5 to-transparent pointer-events-none" />
        </section>
    );
};

export default SnowblowrShowcase;

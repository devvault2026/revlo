import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Check,
    Bot,
    FileText,
    Search,
    Building2,
    Smartphone,
    ArrowRight,
    Shield,
    Rocket,
    Crown,
    CheckCircle2
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import TestimonialSection from '../features/revlo-os/components/TestimonialSection';

const EsdrOfferPage = () => {
    const navigate = useNavigate();
    const [selectedTier, setSelectedTier] = useState<number | null>(null);

    const handleSelectPackage = (pkg: { name: string; amount: number; description: string }) => {
        navigate('/offer/esdr/payment', { state: pkg });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    const features = [
        {
            icon: <Building2 className="w-6 h-6 text-purple-600" />,
            title: "Centralized Digital HQ",
            description: "A unified home for ESDR Group. Apartments, Storage, and Airbnb properties all under one professional roof."
        },
        {
            icon: <Bot className="w-6 h-6 text-blue-600" />,
            title: "24/7 AI Leasing Agent",
            description: "An intelligent chatbot that never sleeps. Captures leads, answers questions instantly, and notifies you via SMS."
        },
        {
            icon: <FileText className="w-6 h-6 text-red-600" />,
            title: "Smart Application System",
            description: "Interactive digital forms that feel like an app, automatically converting applicant data into readable PDFs."
        },
        {
            icon: <Search className="w-6 h-6 text-purple-600" />,
            title: "The 'Vault' Knowledge Base",
            description: "Intelligent search allows tenants to find documents, policies, and info instantly without calling you."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-white pt-20 pb-32">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
                    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-purple-200 blur-3xl"></div>
                    <div className="absolute top-1/2 -left-24 w-72 h-72 rounded-full bg-blue-100 blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-100 mb-8">
                            <span className="flex h-2 w-2 rounded-full bg-purple-600 animate-pulse"></span>
                            <span className="text-sm font-bold text-purple-700 tracking-wide uppercase">Exclusive Proposal</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
                                ESDR Group
                            </span>
                            <span className="block text-4xl md:text-5xl mt-2 text-slate-500 font-medium">
                                x Revlo Agency
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-12">
                            Transforming your physical assets into a <span className="text-purple-600 font-semibold">digital empire.</span> <br />
                            I build the "Brain" of your business so you can focus on the growth.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* The Vision Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={containerVariants}
                        >
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-6">
                                The "Base Sponge" Strategy
                            </h2>
                            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                                You mentioned wanting a "base" for all your ideas—a place to absorb and organize your vision. I am not just building a website; I am building that <strong>Digital Infrastructure</strong>.
                            </p>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                From <strong>Navin to Russell</strong>, from rentals to storage units, your digital presence needs to be as robust as your physical properties. I provide the trust, the automation, and the professional polish that attracts high-quality tenants.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-purple-200 transition-colors"
                                    >
                                        <div className="mb-3">{feature.icon}</div>
                                        <h3 className="font-bold text-slate-900 mb-1">{feature.title}</h3>
                                        <p className="text-sm text-slate-600">{feature.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-rainbow opacity-10 blur-3xl rounded-full"></div>
                            <div className="relative bg-white border border-slate-200 shadow-2xl rounded-2xl overflow-hidden">
                                <div className="bg-slate-50 border-b border-slate-100 p-4 flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    <div className="ml-4 h-6 w-64 bg-slate-200 rounded-full opacity-50"></div>
                                </div>
                                <div className="p-8">
                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                                <Bot className="w-6 h-6 text-purple-600" />
                                            </div>
                                            <div className="bg-slate-100 rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                                                <p className="text-sm font-medium text-slate-900 mb-1">ESDR Assistant</p>
                                                <p className="text-slate-600">Bonjour! I notice you're looking at the 2-bedroom unit in Russell. Would you like to schedule a viewing or see the floor plan?</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4 justify-end">
                                            <div className="bg-purple-600 text-white rounded-2xl rounded-tr-none p-4 max-w-[80%]">
                                                <p className="text-white">Yes, please send me the floor plan!</p>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-center py-2">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Lead Captured • SMS Sent to Emmanuelle</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-24 bg-slate-50 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6">
                            Choose Your Infrastructure
                        </h2>
                        <p className="text-xl text-slate-600">
                            There are two paths forward. A tailored <strong>Launch</strong> to get you live, or a comprehensive <strong>Partnership</strong> to fuel your growth.
                        </p>
                    </div>

                    {/* Main Offer - Standalone */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden max-w-4xl mx-auto mb-20"
                    >
                        <div className="p-8 md:p-12">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                                        The Launch Foundation
                                        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wide">One-Time Build</span>
                                    </h3>
                                    <p className="text-slate-500 mt-2">Everything you need to go live with a premium, automated presence.</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-4xl font-black text-slate-900">$2,500</div>
                                    <div className="text-slate-500 text-sm">One-time investment</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    <span className="text-slate-700"><strong>Custom ESDR Group Website</strong> (5-7 Pages)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    <span className="text-slate-700"><strong>AI Chatbot Integration</strong> (Lead Capture + SMS)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    <span className="text-slate-700"><strong>Smart Application Forms</strong> (Web to PDF)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    <span className="text-slate-700"><strong>"The Vault"</strong> Document Search System</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    <span className="text-slate-700"><strong>Google Business Profile</strong> Setup & Optimization</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    <span className="text-slate-700"><strong>Mobile Responsive</strong> & SEO Optimized</span>
                                </div>
                            </div>

                            <div className="mt-10 pt-8 border-t border-slate-100 flex justify-end">
                                <button
                                    onClick={() => handleSelectPackage({
                                        name: "The Launch Foundation",
                                        amount: 2500,
                                        description: "Standard Infrastructure Build (One-Time)"
                                    })}
                                    className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2"
                                >
                                    Select Launch Package <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Partnership Tiers - Intro */}
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-display font-bold text-slate-900">
                            Or Partner With Me & Save
                        </h3>
                        <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
                            Join a monthly support tier and I'll lower your initial build cost to <span className="text-green-600 font-bold">$1,750</span>. I become your dedicated architect.
                        </p>
                    </div>

                    {/* Tiers Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Tier 1 */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden flex flex-col"
                        >
                            <div className="p-8 flex-1">
                                <div className="flex items-center gap-2 mb-4">
                                    <Shield className="w-6 h-6 text-blue-500" />
                                    <h4 className="font-bold text-lg text-slate-900">The Caretaker</h4>
                                </div>
                                <div className="mb-6">
                                    <span className="text-3xl font-black text-slate-900">$250</span>
                                    <span className="text-slate-500">/mo</span>
                                </div>
                                <p className="text-sm text-slate-500 mb-8">
                                    Perfect for peace of mind. I ensure your digital assets are always live, secure, and up-to-date.
                                </p>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-start gap-3 text-sm text-slate-700">
                                        <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                        <span>Secure Hosting & Maintenance</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-slate-700">
                                        <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                        <span>Chatbot Fine-tuning & Updates</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-slate-700">
                                        <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                        <span>Basic Content Updates (Photos/Text)</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="p-4 bg-slate-50 border-t border-slate-100">
                                <button
                                    onClick={() => handleSelectPackage({
                                        name: "The Caretaker Bundle",
                                        amount: 2000,
                                        description: "Discounted Build ($1,750) + Month 1 Caretaker ($250)"
                                    })}
                                    className="w-full py-3 rounded-lg border-2 border-slate-200 text-slate-700 font-bold hover:border-blue-500 hover:text-blue-600 transition-all"
                                >
                                    Start Caretaker
                                </button>
                            </div>
                        </motion.div>

                        {/* Tier 2 */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-2xl shadow-xl border-2 border-purple-500 overflow-hidden flex flex-col relative"
                        >
                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-purple"></div>
                            <div className="p-8 flex-1">
                                <div className="flex items-center gap-2 mb-4">
                                    <Rocket className="w-6 h-6 text-purple-600" />
                                    <h4 className="font-bold text-lg text-slate-900">The Growth Engine</h4>
                                </div>
                                <div className="mb-6">
                                    <span className="text-3xl font-black text-slate-900">$550</span>
                                    <span className="text-slate-500">/mo</span>
                                </div>
                                <p className="text-sm text-slate-500 mb-8">
                                    For active expansion. I automate your marketing presence to keep ESDR top-of-mind.
                                </p>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-start gap-3 text-sm text-slate-700">
                                        <Check className="w-5 h-5 text-purple-500 flex-shrink-0" />
                                        <span className="font-semibold">Everything in Caretaker</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-slate-700">
                                        <Check className="w-5 h-5 text-purple-500 flex-shrink-0" />
                                        <span><strong>Automated Social Posting</strong> (FB/Insta)</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-slate-700">
                                        <Check className="w-5 h-5 text-purple-500 flex-shrink-0" />
                                        <span>Rental Listing Optimization</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-slate-700">
                                        <Check className="w-5 h-5 text-purple-500 flex-shrink-0" />
                                        <span>Monthly Performance Reporting</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="p-4 bg-purple-50 border-t border-purple-100">
                                <button
                                    onClick={() => handleSelectPackage({
                                        name: "The Growth Engine Bundle",
                                        amount: 2300,
                                        description: "Discounted Build ($1,750) + Month 1 Growth ($550)"
                                    })}
                                    className="w-full py-3 rounded-lg bg-purple-600 text-white font-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-200"
                                >
                                    Start Growth
                                </button>
                            </div>
                        </motion.div>

                        {/* Tier 3 */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col text-white"
                        >
                            <div className="p-8 flex-1">
                                <div className="flex items-center gap-2 mb-4">
                                    <Crown className="w-6 h-6 text-yellow-400" />
                                    <h4 className="font-bold text-lg text-white">The Partner</h4>
                                </div>
                                <div className="mb-6">
                                    <span className="text-3xl font-black text-white">$950</span>
                                    <span className="text-slate-400">/mo</span>
                                </div>
                                <p className="text-sm text-slate-300 mb-8">
                                    Your dedicated architect. I handle all technical operations so you focus on the properties.
                                </p>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-start gap-3 text-sm text-slate-300">
                                        <Check className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                                        <span className="font-semibold">Everything in Growth</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-slate-300">
                                        <Check className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                                        <span><strong>Priority "Red Phone" Access</strong></span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-slate-300">
                                        <Check className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                                        <span>Insurance & Finance Integrations</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-slate-300">
                                        <Check className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                                        <span>Quarterly Strategy Workshops</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-slate-300">
                                        <Check className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                                        <span>Complete Tech Management</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="p-4 bg-slate-800 border-t border-slate-700">
                                <button
                                    onClick={() => handleSelectPackage({
                                        name: "The Partner Bundle",
                                        amount: 2700,
                                        description: "Discounted Build ($1,750) + Month 1 Partner ($950)"
                                    })}
                                    className="w-full py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 text-slate-900 font-bold hover:opacity-90 transition-all"
                                >
                                    Become a Partner
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <TestimonialSection />

            {/* Final CTA */}
            <section className="py-20 bg-white border-t border-slate-100">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to Digitalize ESDR Group?</h2>
                    <p className="text-lg text-slate-600 mb-8">
                        Let's get the keys to your new digital property. Select a package above to get started immediately, or text me to discuss the best fit.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => handleSelectPackage({
                                name: "The Launch Foundation",
                                amount: 2500,
                                description: "Standard Infrastructure Build (One-Time)"
                            })}
                            className="px-8 py-4 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-all shadow-lg shadow-purple-200"
                        >
                            Secure Your Build
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EsdrOfferPage;

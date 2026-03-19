import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    ArrowLeft, CheckCircle2, ShoppingCart, Rocket, Code2, 
    ShieldCheck, Zap, Globe, Sparkles, MessageSquare, 
    Cpu, Layers, Database, Layout, Share2, Loader2
} from 'lucide-react';
import { marketplaceItems as localItems } from '../data/marketplaceData';
import { MarketplaceService } from '../services/marketplaceService';
import { MarketplaceItem } from '../types/marketplace';
import { useAuth } from '../context/AuthContext';

const MarketplaceDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [item, setItem] = useState<MarketplaceItem | null>(localItems.find(i => i.slug === slug) || null);
    const [isLoading, setIsLoading] = useState(true);
    const [isPurchasing, setIsPurchasing] = useState(false);

    useEffect(() => {
        const fetchItem = async () => {
            if (!slug) return;
            setIsLoading(true);
            try {
                const dbItem = await MarketplaceService.getItemBySlug(slug);
                if (dbItem) {
                    setItem(dbItem);
                }
            } catch (err) {
                console.error('Failed to fetch item details', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchItem();
        window.scrollTo(0, 0);
    }, [slug]);

    const handlePurchase = async () => {
        if (!item) return;
        
        if (!user) {
            navigate('/login', { state: { from: `/marketplace/${slug}` } });
            return;
        }

        setIsPurchasing(true);
        try {
            // In a real app, this would redirect to Stripe
            await MarketplaceService.createCheckoutSession(item.id, user.id);
            alert('Checkout initiated! In a production environment, you would now be redirected to Stripe.');
        } catch (err) {
            console.error('Purchase failed', err);
        } finally {
            setIsPurchasing(false);
        }
    };

    if (isLoading) {
        return (
            <div className="pt-32 pb-24 min-h-screen bg-[#020408] flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
            </div>
        );
    }

    if (!item) return null;

    return (
        <div className="pt-32 pb-24 min-h-screen bg-[#020408]">
            {/* Background Decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] -translate-y-1/2" />
                <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[140px] translate-y-1/2" />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Back Button */}
                <Link
                    to="/marketplace"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white hover:bg-white/10 transition-all mb-12"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Marketplace
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left Column: Product Info */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="px-3 py-1 bg-purple-600 rounded text-[10px] font-black text-white uppercase tracking-[0.2em]">
                                    {item.category}
                                </div>
                                <div className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <Sparkles className="w-3 h-3" />
                                    {item.launchTime} Launch Ready
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white mb-6">
                                {item.title}
                            </h1>

                            <p className="text-2xl font-medium text-slate-400 mb-12 leading-relaxed">
                                {item.tagline}
                            </p>

                            <div className="aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 mb-12 bg-white/5">
                                <img 
                                    src={item.image} 
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="prose prose-invert max-w-none mb-16">
                                <h2 className="text-2xl font-black italic text-white mb-6 uppercase tracking-tighter">
                                    THE OVERVIEW
                                </h2>
                                <p className="text-slate-400 text-lg whitespace-pre-line leading-relaxed">
                                    {item.longDescription}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div>
                                    <h3 className="text-lg font-black italic text-white mb-6 uppercase tracking-tighter flex items-center gap-2">
                                        <Layers className="w-5 h-5 text-purple-400" />
                                        Core Features
                                    </h3>
                                    <ul className="space-y-4">
                                        {item.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-slate-400">
                                                <CheckCircle2 className="w-5 h-5 text-purple-500 mt-0.5" />
                                                <span className="text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-lg font-black italic text-white mb-6 uppercase tracking-tighter flex items-center gap-2">
                                        <Code2 className="w-5 h-5 text-fuchsia-400" />
                                        Tech Stack
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {item.techStack.map((tech, idx) => (
                                            <div key={idx} className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                                {tech}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Pricing & CTA */}
                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="sticky top-32"
                        >
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden backdrop-blur-xl">
                                <div className="absolute top-0 right-0 p-8 text-white/5">
                                    <ShoppingCart className="w-32 h-32 rotate-12" />
                                </div>

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                                            One-time Purchase
                                        </div>
                                        <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">
                                            Instant Access
                                        </div>
                                    </div>

                                    <div className="flex items-baseline gap-2 mb-8">
                                        <span className="text-5xl font-black italic text-white tracking-tighter">${item.price}</span>
                                        <span className="text-slate-500 text-sm font-medium uppercase tracking-widest">USD</span>
                                    </div>

                                    <div className="space-y-4 mb-8 border-y border-white/5 py-8">
                                        <div className="flex items-center gap-4 text-slate-300">
                                            <ShieldCheck className="w-5 h-5 text-purple-500" />
                                            <span className="text-sm font-medium">Clean, Documented Codebase</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-slate-300">
                                            <Zap className="w-5 h-5 text-purple-500" />
                                            <span className="text-sm font-medium">Lifetime Updates & Support</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-slate-300">
                                            <Globe className="w-5 h-5 text-purple-500" />
                                            <span className="text-sm font-medium">Commercial License Included</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        <button 
                                            onClick={handlePurchase}
                                            disabled={isPurchasing}
                                            className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 rounded-2xl text-[12px] font-black uppercase tracking-[0.3em] text-white transition-all shadow-xl shadow-purple-600/30 group disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isPurchasing ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : (
                                                <>
                                                    Purchase Template
                                                    <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                        
                                        <Link
                                            to="/contact"
                                            className="w-full flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[12px] font-black uppercase tracking-[0.3em] text-white transition-all"
                                        >
                                            Hire Us to Launch
                                            <Rocket className="w-5 h-5" />
                                        </Link>
                                    </div>

                                    <div className="mt-8 text-center">
                                        <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest flex items-center justify-center gap-2">
                                            <MessageSquare className="w-4 h-4" />
                                            Questions? <Link to="/contact" className="text-purple-400 hover:underline">Chat with our team</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Info Cards */}
                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                    <Database className="w-5 h-5 text-slate-500 mb-3" />
                                    <div className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Infrastructure</div>
                                    <div className="text-[10px] font-black text-white uppercase">Cloud Ready</div>
                                </div>
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                    <Layout className="w-5 h-5 text-slate-500 mb-3" />
                                    <div className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">UX/UI</div>
                                    <div className="text-[10px] font-black text-white uppercase">Modern / Sleek</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketplaceDetailPage;

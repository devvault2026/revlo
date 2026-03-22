import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Filter, ArrowRight, CheckCircle2, Star, Sparkles, Zap, Rocket, Globe, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { marketplaceItems as localItems } from '../data/marketplaceData';
import { MarketplaceItem } from '../types/marketplace';
import { MarketplaceService } from '../services/marketplaceService';

const MarketplacePage: React.FC = () => {
    const [items, setItems] = useState<MarketplaceItem[]>(localItems);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    useEffect(() => {
        const fetchItems = async () => {
            setIsLoading(true);
            try {
                const dbItems = await MarketplaceService.getItems();
                if (dbItems && dbItems.length > 0) {
                    setItems(dbItems);
                }
                // If DB is empty, we keep using localItems for demonstration
            } catch (err) {
                console.error('Failed to fetch items from Supabase', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchItems();
    }, []);

    const categories = ['All', 'Gaming', 'AI'];

    const filteredItems = items.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             item.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="pt-32 pb-24 min-h-screen bg-[#020408]">
            {/* Background Decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -translate-y-1/2" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[120px] translate-y-1/2" />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6"
                    >
                        <ShoppingBag className="w-4 h-4 text-purple-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400">
                            The SaaS Marketplace
                        </span>
                    </motion.div>
                    
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black italic tracking-tighter text-white mb-6"
                    >
                        BUSINESS IN A <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">BOX</span>
                    </motion.h1>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl mx-auto text-slate-400 text-lg"
                    >
                        Premium SaaS boilerplates and AI engines built by Revlo. 
                        Turnkey solutions that are launch-ready. Minor work, major results.
                    </motion.p>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search boilerplates..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        />
                    </div>
                    
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.1em] transition-all whitespace-nowrap ${
                                    selectedCategory === category
                                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                                        : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Marketplace Grid */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-24">
                        <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
                        <p className="text-slate-400 font-medium uppercase tracking-widest text-xs">Loading Marketplace...</p>
                    </div>
                ) : (
                    <div className="flex flex-wrap justify-center gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 max-w-sm w-full"
                                >
                                    {/* Image Container */}
                                    <div className="aspect-[16/9] overflow-hidden relative">
                                        <img 
                                            src={item.image} 
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#020408] to-transparent opacity-60" />
                                        
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            <div className="px-2 py-1 bg-purple-600/90 rounded text-[8px] font-black text-white uppercase tracking-[0.1em]">
                                                {item.category}
                                            </div>
                                            {item.status === 'Available' && (
                                                <div className="px-2 py-1 bg-emerald-500/90 rounded text-[8px] font-black text-white uppercase tracking-[0.1em] flex items-center gap-1">
                                                    <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                                                    Live
                                                </div>
                                            )}
                                        </div>

                                        <div className="absolute bottom-4 right-4 text-right">
                                            {item.originalPrice && (
                                                <div className="text-[10px] font-black text-slate-400 line-through decoration-purple-500/50 decoration-2 mb-[-4px]">
                                                    ${item.originalPrice}
                                                </div>
                                            )}
                                            <div className="text-2xl font-black text-white italic">
                                                ${item.price}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Sparkles className="w-3 h-3 text-purple-400" />
                                            <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">
                                                {item.launchTime} Launch
                                            </span>
                                        </div>
                                        
                                        <h3 className="text-xl font-black italic tracking-tighter text-white mb-2 group-hover:text-purple-400 transition-colors">
                                            {item.title}
                                        </h3>
                                        
                                        <p className="text-slate-400 text-sm mb-6 line-clamp-2">
                                            {item.description}
                                        </p>

                                        {/* Stats */}
                                        <div className="grid grid-cols-3 gap-4 mb-6 border-y border-white/5 py-4">
                                            {item.stats.map((stat, sIdx) => (
                                                <div key={sIdx} className="text-center">
                                                    <div className="text-[8px] font-black text-slate-500 uppercase tracking-wider mb-1">
                                                        {stat.label}
                                                    </div>
                                                    <div className="text-[10px] font-bold text-white uppercase">
                                                        {stat.value}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Features List */}
                                        <ul className="space-y-2 mb-8 flex-grow">
                                            {item.features.slice(0, 3).map((feature, fIdx) => (
                                                <li key={fIdx} className="flex items-center gap-2 text-[10px] text-slate-300">
                                                    <CheckCircle2 className="w-3 h-3 text-purple-500" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="flex flex-col gap-3">
                                            {item.demoUrl && (
                                                <a
                                                    href={item.demoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-500/10 hover:bg-purple-600/20 border border-purple-500/20 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 transition-all"
                                                >
                                                    <Globe className="w-3 h-3" />
                                                    View Live Demo
                                                </a>
                                            )}
                                            <div className="flex items-center gap-3">
                                                <Link
                                                    to={`/marketplace/${item.slug}`}
                                                    className="flex-grow flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all"
                                                >
                                                    Details
                                                </Link>
                                                <Link
                                                    to={`/marketplace/${item.slug}`}
                                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all shadow-lg shadow-purple-600/20"
                                                >
                                                    Purchase
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {/* Hire Us CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 p-12 bg-gradient-to-br from-purple-600/20 to-fuchsia-600/20 rounded-[2.5rem] border border-white/10 relative overflow-hidden text-center"
                >
                    <div className="absolute top-0 right-0 p-8 text-white/5">
                        <Rocket className="w-64 h-64 -rotate-12" />
                    </div>
                    
                    <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter text-white mb-6">
                        NEED A <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">CUSTOM</span> SOLUTION?
                    </h2>
                    
                    <p className="max-w-2xl mx-auto text-slate-400 mb-10 text-lg">
                        Love our boilerplates but want us to customize, brand, and launch it for you? 
                        Hire our team for a white-glove deployment.
                    </p>
                    
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full text-[12px] font-black uppercase tracking-[0.2em] hover:bg-purple-500 hover:text-white transition-all duration-300"
                    >
                        Hire Us to Launch
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default MarketplacePage;

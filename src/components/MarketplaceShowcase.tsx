import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Sparkles, Zap, ShieldCheck, Rocket, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { marketplaceItems } from '../data/marketplaceData';

const MarketplaceShowcase: React.FC = () => {
    // Show top 3 items
    const featuredItems = marketplaceItems.slice(0, 3);

    return (
        <section className="py-24 bg-[#020408] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[120px]" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6"
                        >
                            <ShoppingBag className="w-4 h-4 text-purple-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400">
                                SaaS Marketplace
                            </span>
                        </motion.div>
                        
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-black italic tracking-tighter text-white mb-6"
                        >
                            OWN THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">INFRASTRUCTURE</span>
                        </motion.h2>
                        
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-400 text-lg"
                        >
                            Skip the 6-month dev cycle. Buy our proprietary boilerplates, 
                            complete with domains and full source code ownership. Turnkey and ready to scale.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link
                            to="/marketplace"
                            className="group flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[12px] font-black uppercase tracking-[0.2em] text-white transition-all"
                        >
                            Browse All Boilerplates
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                <div className="flex flex-wrap justify-center gap-8">
                    {featuredItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 max-w-sm w-full"
                        >
                            <div className="aspect-video relative overflow-hidden">
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020408] to-transparent opacity-60" />
                                <div className="absolute top-4 left-4 px-2 py-1 bg-purple-600 rounded text-[8px] font-black text-white uppercase tracking-widest">
                                    {item.category}
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <h3 className="text-xl font-black italic tracking-tighter text-white mb-2 group-hover:text-purple-400 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-slate-500 text-sm mb-6 line-clamp-2 italic font-medium">
                                    {item.tagline}
                                </p>
                                
                                <div className="flex items-center justify-between">
                                    <div className="flex items-baseline gap-2">
                                        <div className="text-xl font-black text-white italic">
                                            ${item.price}
                                        </div>
                                        {item.originalPrice && (
                                            <div className="text-[10px] font-black text-slate-500 line-through decoration-purple-500/50">
                                                ${item.originalPrice}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {item.demoUrl && (
                                            <a
                                                href={item.demoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 bg-white/5 rounded-lg text-slate-400 hover:text-purple-400 transition-all"
                                                title="View Live Demo"
                                            >
                                                <Globe className="w-4 h-4" />
                                            </a>
                                        )}
                                        <Link
                                            to={`/marketplace/${item.slug}`}
                                            className="p-2 bg-white/5 rounded-lg text-slate-400 group-hover:text-white group-hover:bg-purple-600 transition-all"
                                        >
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-gradient-to-br from-purple-600/5 to-fuchsia-600/5 rounded-3xl border border-white/5"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/20">
                            <Zap className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                            <div className="text-[10px] font-black text-white uppercase tracking-widest mb-1">Instant Delivery</div>
                            <div className="text-[10px] text-slate-500 uppercase font-medium">Code access in minutes</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-fuchsia-500/10 rounded-xl flex items-center justify-center border border-fuchsia-500/20">
                            <ShieldCheck className="w-6 h-6 text-fuchsia-400" />
                        </div>
                        <div>
                            <div className="text-[10px] font-black text-white uppercase tracking-widest mb-1">Verified Code</div>
                            <div className="text-[10px] text-slate-500 uppercase font-medium">Tested & Production Ready</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20">
                            <Rocket className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                            <div className="text-[10px] font-black text-white uppercase tracking-widest mb-1">Scale Ready</div>
                            <div className="text-[10px] text-slate-500 uppercase font-medium">Built for high performance</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default MarketplaceShowcase;

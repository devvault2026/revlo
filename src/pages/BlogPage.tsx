import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { ArrowRight, Calendar, Clock, User, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const BlogPage = () => {
    return (
        <div className="min-h-screen bg-[#020408] text-white">
            <Helmet>
                <title>Intelligence Feed | REVLO AGENTIC INFRASTRUCTURE</title>
                <meta name="description" content="Operational intel on autonomous browser control, recursive sub-agents, and the future of AI operating systems." />
            </Helmet>

            <Navigation />

            <main className="pt-32 pb-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    {/* Header Section - High Trust / Institutional Feel */}
                    <div className="relative mb-24 lg:mb-32">
                        <div className="absolute -top-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 mb-8 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full"
                            >
                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Intelligence Feed // Live Updates</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-6xl md:text-8xl font-black font-display tracking-tighter italic uppercase text-white leading-[0.85] mb-10"
                            >
                                THE FUTURE OF <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">AUTONOMY.</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-xl text-slate-400 font-medium max-w-2xl leading-relaxed"
                            >
                                Deep-level documentation and strategic insights on the systems powering the next generation of autonomous business operations.
                            </motion.p>
                        </div>
                    </div>

                    {/* Blog Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {blogPosts.map((post, i) => (
                            <Link to={`/blog/${post.slug}`} key={post.slug} className="group">
                                <motion.article
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="relative h-full flex flex-col bg-[#05070a] border border-white/5 rounded-[40px] overflow-hidden hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_80px_rgba(255,255,255,0.03)]"
                                >
                                    {/* Image Container */}
                                    <div className="relative aspect-[16/9] overflow-hidden">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-[#05070a]/20 to-transparent" />

                                        <div className="absolute top-8 left-8">
                                            <span className="bg-black/80 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Container */}
                                    <div className="p-10 lg:p-14 flex flex-col flex-grow">
                                        <div className="flex items-center gap-6 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-8">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {post.date}
                                            </div>
                                            <div className="w-1 h-1 bg-white/10 rounded-full" />
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-3.5 h-3.5" />
                                                {post.readTime}
                                            </div>
                                        </div>

                                        <h2 className="text-3xl md:text-4xl font-black font-display italic tracking-tight uppercase text-white mb-6 leading-tight group-hover:text-red-500 transition-colors">
                                            {post.title}
                                        </h2>

                                        <p className="text-lg text-slate-400 font-medium leading-relaxed mb-10 line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        <div className="mt-auto flex items-center justify-between pt-10 border-t border-white/5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all border border-white/10">
                                                    <img src={post.authorImage} alt={post.author} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <div className="text-[10px] font-black text-white uppercase tracking-widest mb-0.5">{post.author}</div>
                                                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{post.authorRole}</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">
                                                Read Intel <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.article>
                            </Link>
                        ))}
                    </div>

                    {/* Trust Banner */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-32 p-12 lg:p-20 bg-gradient-to-br from-white/[0.03] to-transparent rounded-[60px] border border-white/5 relative overflow-hidden text-center"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <ArrowRight className="w-32 h-32 -rotate-45" />
                        </div>
                        <h3 className="text-3xl md:text-5xl font-black font-display italic tracking-tighter uppercase text-white mb-8">
                            STAY AHEAD OF THE <span className="text-red-600">SKEPTICS.</span>
                        </h3>
                        <p className="text-xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed mb-12">
                            The space moves faster than the newsletters. We document our winning strategies and engineering breakthroughs in real-time. Join the inner circle to receive tactical intel directly.
                        </p>
                        <Link to="/contact">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-5 bg-white text-black text-xs font-black uppercase tracking-[0.3em] rounded-2xl italic hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all"
                            >
                                Deploy Intelligence
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default BlogPage;

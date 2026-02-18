import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const BlogPage = () => {
    return (
        <div className="min-h-screen bg-[#020408] text-white pt-24 pb-20">
            <Helmet>
                <title>Revlo Insights | The Future of Autonomous AI</title>
                <meta name="description" content="Deep dives into AI infrastructure, autonomous agents, and the future of work. Read the latest from the Revlo engineering team." />
            </Helmet>

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col items-start mb-20">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-8">
                        <span className="text-[10px] font-black text-purple-400 uppercase tracking-[0.4em]">INTELLIGENCE_FEED</span>
                    </div>
                    <h1 className="text-5xl sm:text-7xl font-black font-display italic tracking-tight uppercase text-white leading-[0.85] mb-6">
                        OPERATIONAL <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">INSIGHTS.</span>
                    </h1>
                    <p className="text-xl text-slate-400 font-medium max-w-2xl leading-relaxed">
                        Deep dives into the architecture of autonomy. How we build, what we ship, and where the future of agency is heading.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, i) => (
                        <Link to={`/blog/${post.slug}`} key={post.slug} className="group">
                            <motion.article
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="h-full flex flex-col bg-[#080a10] border border-white/5 rounded-3xl overflow-hidden hover:border-purple-500/30 transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(168,85,247,0.15)]"
                            >
                                {/* Image */}
                                <div className="h-64 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#080a10] to-transparent z-10 opacity-60" />
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-widest rounded-lg border border-white/10">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-3 h-3" />
                                            {post.date}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-3 h-3" />
                                            {post.readTime}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-black italic tracking-tight text-white mb-4 leading-tight group-hover:text-purple-400 transition-colors">
                                        {post.title}
                                    </h3>

                                    <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-[1px]">
                                                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                                                    <User className="w-4 h-4 text-slate-300" />
                                                </div>
                                            </div>
                                            <span className="text-xs font-bold text-white uppercase tracking-wider">{post.author}</span>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-all text-purple-500">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </motion.article>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;

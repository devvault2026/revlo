import React, { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { blogPosts } from '../data/blogPosts';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, Calendar, User, Share2 } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const BlogPostPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = blogPosts.find(p => p.slug === slug);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    if (!post) {
        return <Navigate to="/404" replace />;
    }

    return (
        <div className="min-h-screen bg-[#020408] text-white">
            <Helmet>
                <title>{post.title} | Revlo Insights</title>
                <meta name="description" content={post.excerpt} />

                {/* Open Graph */}
                <meta property="og:type" content="article" />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.excerpt} />
                <meta property="og:image" content={post.image} />
                <meta property="og:url" content={`https://www.wearerevlo.com/blog/${post.slug}`} />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={post.title} />
                <meta name="twitter:description" content={post.excerpt} />
                <meta name="twitter:image" content={post.image} />
            </Helmet>

            <Navigation />

            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 origin-left z-50"
                style={{ scaleX }}
            />

            <article className="pt-32 pb-20">
                {/* Article Header */}
                <div className="max-w-4xl mx-auto px-6 mb-16">
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors mb-12"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Intelligence Feed
                    </Link>

                    <div className="flex items-center gap-3 mb-8">
                        <span className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest rounded-lg">
                            {post.category}
                        </span>
                        <div className="h-px w-12 bg-white/10" />
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            <Clock className="w-3 h-3" /> {post.readTime}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-display italic tracking-tight uppercase leading-[0.9] text-white mb-8">
                        {post.title}
                    </h1>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-y border-white/5 py-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 p-[1px]">
                                <div className="w-full h-full rounded-full bg-[#080a10] flex items-center justify-center">
                                    <User className="w-6 h-6 text-slate-400" />
                                </div>
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white uppercase tracking-wider mb-1">{post.author}</div>
                                <div className="text-xs text-slate-500 font-mono tracking-wide">{post.date}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full flex items-center gap-3 transition-all group">
                                <Share2 className="w-4 h-4 text-slate-400 group-hover:text-white" />
                                <span className="text-xs font-bold text-slate-400 group-hover:text-white uppercase tracking-wider">Share Intel</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Cover Image */}
                <div className="max-w-7xl mx-auto px-6 mb-20">
                    <div className="aspect-video relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-red-500/5">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020408] via-transparent to-transparent opacity-60" />
                    </div>
                </div>

                {/* Markdown Content */}
                <div className="max-w-3xl mx-auto px-6 font-medium text-lg text-slate-300 leading-relaxed">
                    <div className="prose prose-invert prose-lg max-w-none 
                        prose-headings:font-display prose-headings:italic prose-headings:uppercase prose-headings:tracking-tight 
                        prose-h1:text-5xl prose-h1:leading-[0.85] prose-h1:mb-8
                        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-white
                        prose-p:text-slate-400 prose-p:leading-8 prose-p:mb-6
                        prose-a:text-red-400 prose-a:no-underline hover:prose-a:text-red-300 hover:prose-a:underline
                        prose-strong:text-white prose-strong:font-bold
                        prose-ul:list-disc prose-ul:pl-6 prose-ul:text-slate-400 prose-li:mb-2
                        prose-img:rounded-2xl prose-img:border prose-img:border-white/10 prose-img:shadow-xl
                        prose-blockquote:border-l-4 prose-blockquote:border-red-500/50 prose-blockquote:bg-white/5 prose-blockquote:p-6 prose-blockquote:rounded-r-2xl prose-blockquote:italic
                    ">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {post.content}
                        </ReactMarkdown>
                    </div>

                    {/* Author Bio / Footer of Article */}
                    <div className="mt-20 pt-12 border-t border-white/5">
                        <div className="p-8 bg-[#080a10] border border-white/5 rounded-3xl flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-orange-500 p-[1px] flex-shrink-0">
                                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                                    <User className="w-8 h-8 text-slate-300" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-3">Written by {post.author}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                    Leading the autonomous revolution at Revlo. Building systems that scale indefinitely without human intervention.
                                </p>
                                <Link to="/contact" className="inline-flex items-center gap-2 text-xs font-black text-red-500 uppercase tracking-widest hover:tracking-[0.2em] transition-all">
                                    Work with the team <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            <Footer />
        </div>
    );
};

export default BlogPostPage;

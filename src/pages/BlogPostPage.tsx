import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { blogPosts } from '../data/blogPosts';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, User, Share2, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!post) {
        return <Navigate to="/404" replace />;
    }

    return (
        <div className="min-h-screen bg-[#020408] text-white selection:bg-red-500/30">
            <Helmet>
                <title>{post.title} | REVLO OPERATIONAL INTEL</title>
                <meta name="description" content={post.excerpt} />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.excerpt} />
                <meta property="og:image" content={post.image} />
            </Helmet>

            <Navigation />

            {/* Reading Progress Indicator */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-red-600 origin-left z-[70]"
                style={{ scaleX }}
            />

            <main className="pt-32 pb-40">
                <article className="max-w-4xl mx-auto px-6">
                    {/* Minimalist Top Meta */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center text-center mb-16"
                    >
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 hover:text-white transition-all mb-12 group"
                        >
                            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                            INTEL_FEED
                        </Link>

                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-8">
                            <ShieldCheck className="w-3 h-3 text-red-500" />
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/70">Verified_Operational_Data</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-display tracking-tighter uppercase leading-[0.9] text-white mb-10 max-w-3xl italic">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center justify-center gap-8 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-y border-white/5 py-8 w-full">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg overflow-hidden grayscale brightness-75 border border-white/10 group-hover:grayscale-0 transition-all">
                                    <img src={post.authorImage} alt={post.author} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="text-white text-[11px]">{post.author}</span>
                                    <span className="text-xs text-slate-600">Lead Operator</span>
                                </div>
                            </div>
                            <div className="w-px h-8 bg-white/5 hidden sm:block" />
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-slate-600" />
                                {post.date}
                            </div>
                            <div className="w-px h-8 bg-white/5 hidden sm:block" />
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-slate-600" />
                                {post.readTime}
                            </div>
                        </div>
                    </motion.div>

                    {/* High-Impact Featured Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative rounded-[48px] overflow-hidden border border-white/5 mb-24 shadow-2xl"
                    >
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full aspect-[21/9] object-cover"
                        />
                        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[48px]" />
                    </motion.div>

                    {/* CONTENT - MAXIMUM READABILITY */}
                    <div className="max-w-3xl mx-auto">
                        <div className="blog-body-text">
                            <style>{`
                                .blog-body-text {
                                    font-family: 'Inter', system-ui, sans-serif;
                                    font-size: 1.25rem;
                                    line-height: 1.8;
                                    color: #cbd5e1;
                                    letter-spacing: -0.011em;
                                }
                                .blog-body-text h2 {
                                    font-family: 'Outfit', sans-serif;
                                    font-size: 2.25rem;
                                    font-weight: 800;
                                    line-height: 1.1;
                                    letter-spacing: -0.04em;
                                    color: white;
                                    margin-top: 5rem;
                                    margin-bottom: 2rem;
                                    text-transform: uppercase;
                                    font-style: italic;
                                }
                                .blog-body-text p {
                                    margin-bottom: 2.5rem;
                                }
                                .blog-body-text strong {
                                    color: white;
                                    font-weight: 700;
                                }
                                .blog-body-text ul {
                                    margin: 3rem 0;
                                    padding-left: 0;
                                }
                                .blog-body-text li {
                                    margin-bottom: 1rem;
                                    padding-left: 2rem;
                                    position: relative;
                                }
                                .blog-body-text li::before {
                                    content: "";
                                    position: absolute;
                                    left: 0;
                                    top: 0.75rem;
                                    width: 12px;
                                    height: 1px;
                                    background: #dc2626;
                                }
                                .blog-body-text blockquote {
                                    margin: 4rem 0;
                                    padding: 3rem;
                                    background: #080a10;
                                    border-left: 4px solid #dc2626;
                                    font-size: 1.5rem;
                                    color: white;
                                    font-weight: 600;
                                    font-style: italic;
                                    line-height: 1.5;
                                    border-radius: 0 24px 24px 0;
                                }
                                .blog-body-text a {
                                    color: white;
                                    text-decoration: underline;
                                    text-underline-offset: 4px;
                                    text-decoration-color: rgba(220, 38, 38, 0.4);
                                    transition: all 0.2s;
                                }
                                .blog-body-text a:hover {
                                    text-decoration-color: #dc2626;
                                }
                                .blog-body-text hr {
                                    margin: 5rem 0;
                                    border: none;
                                    border-top: 1px solid rgba(255,255,255,0.05);
                                }
                            `}</style>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {post.content}
                            </ReactMarkdown>
                        </div>

                        {/* SHARE & TAGS */}
                        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Share Intel</span>
                                <div className="flex gap-2">
                                    {[1, 2, 3].map(i => (
                                        <button key={i} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                            <Share2 className="w-4 h-4" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3">
                                {['#AI', '#AUTOMATION', '#ALPHA'].map(tag => (
                                    <span key={tag} className="text-[9px] font-black uppercase tracking-widest text-slate-500 bg-white/5 px-2 py-1 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* AUTHOR SECTION - EARN TRUST */}
                        <div className="mt-32 p-12 bg-gradient-to-br from-[#080a10] to-transparent rounded-[48px] border border-white/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Sparkles className="w-32 h-32" />
                            </div>

                            <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left">
                                <div className="w-32 h-32 rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-white/10 rotate-3">
                                    <img src={post.authorImage} alt={post.author} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <div className="inline-block px-3 py-1 bg-red-500/10 text-red-500 text-[9px] font-black uppercase tracking-widest rounded-full mb-4">
                                        Operational_Lead
                                    </div>
                                    <h3 className="text-2xl font-black italic uppercase tracking-tight text-white mb-4">ABOUT {post.author.split(' ')[0]}</h3>
                                    <p className="text-slate-400 leading-relaxed mb-8">
                                        Directing the strategy and execution of Revlo's autonomous infrastructure.
                                        I build the systems that help brands acquire attention and scale without human friction.
                                    </p>
                                    <Link to="/contact" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-white hover:text-red-500 transition-all group">
                                        Apply for direct partnership <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
};

export default BlogPostPage;

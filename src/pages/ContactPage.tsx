import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Contact from '../components/Contact';

const ContactPage: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-[#020408] pt-32 pb-20 relative overflow-hidden"
        >
            <Helmet>
                <title>Book a Strategy Call | Revlo — Scale Your Vision</title>
                <meta name="description" content="Stop theorizing and start scaling. Get direct access to the architect behind IPO-grade AI systems. Book your strategy session today." />
                <meta property="og:title" content="Book a Strategy Call | Revlo — Scale Your Vision" />
                <meta property="og:description" content="Stop theorizing and start scaling. Get direct access to the architect behind IPO-grade AI systems." />
                <meta property="og:image" content="https://res.cloudinary.com/dpfapm0tl/image/upload/v1771259282/ChatGPT_Image_Feb_16_2026_11_27_50_AM_uorc1u.png" />
                <meta property="og:url" content="https://www.wearerevlo.com/contact" />
                <meta name="twitter:card" content="summary_large_image" />
                <link rel="canonical" href="https://www.wearerevlo.com/contact" />
            </Helmet>
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-grid-white opacity-5 pointer-events-none" />
            <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-[10%] right-[5%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />

            <div className="max-w-4xl mx-auto px-6 lg:px-8 mb-12 text-center relative z-10">
                <div className="inline-block px-4 py-2 glass rounded-full mb-8">
                    <span className="text-[10px] font-black text-purple-400 uppercase tracking-[0.4em]">
                        Let&apos;s Connect
                    </span>
                </div>

                <h1 className="text-6xl lg:text-8xl font-black font-display mb-10 tracking-tighter italic text-white leading-tight uppercase">
                    SCALE YOUR <span className="gradient-text-alt block lg:inline">VISION.</span>
                </h1>

                <p className="text-xl text-slate-400 leading-relaxed font-medium">
                    Stop theorizing and start scaling. I am ready to architect the systems that automate
                    your operations and multiply your revenue. Access your strategy session today.
                </p>
            </div>

            <div className="relative z-10">
                <Contact />
            </div>
        </motion.div>
    );
};

export default ContactPage;

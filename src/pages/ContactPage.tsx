import React from 'react';
import { motion } from 'framer-motion';
import Contact from '../components/Contact';

const ContactPage: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-white pt-32 pb-20"
        >
            <div className="max-w-4xl mx-auto px-6 lg:px-8 mb-12 text-center">
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200 rounded-full mb-6">
                    <span className="text-sm font-bold text-purple-700 uppercase tracking-wide">
                        Let's Talk
                    </span>
                </div>

                <h1 className="text-5xl lg:text-6xl font-black font-display mb-6">
                    Ready to <span className="gradient-text">Scale Your Brand?</span>
                </h1>

                <p className="text-xl text-slate-600 leading-relaxed">
                    Stop dreaming about 7-figure ARR. Let's make it your reality. Fill out the form below
                    and we'll be in touch within 24 hours to schedule your free strategy session.
                </p>
            </div>

            <Contact />
        </motion.div>
    );
};

export default ContactPage;

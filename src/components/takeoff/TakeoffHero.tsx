import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const TakeoffHero: React.FC = () => {
    return (
        <section className="relative min-h-[80vh] flex flex-col justify-center pt-32 pb-16 bg-[#0c0d10] overflow-hidden">
            {/* Blueprint Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none grayscale">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-50" />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl"
                >
                    <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter leading-[0.85] text-white uppercase italic text-left mb-8">
                        YOU SHOULDN'T BE<br />
                        <span className="text-orange-600">ESTIMATING AT NIGHT.</span>
                    </h1>

                    <p className="text-zinc-400 text-xl md:text-3xl font-bold leading-relaxed italic uppercase text-left mb-12">
                        You already worked a full day. <br />
                        <span className="text-white">Upload the plans and let Revlo do the takeoff and estimate for you.</span>
                    </p>

                    <div className="flex flex-col sm:flex-row items-start gap-8">
                        <Link to="/contact">
                            <button
                                className="px-12 py-8 bg-orange-600 text-white font-black uppercase tracking-[0.2em] italic rounded-lg hover:bg-orange-500 active:scale-95 transition-all shadow-xl flex items-center gap-6 group text-xl"
                            >
                                <FileUp className="w-6 h-6" />
                                UPLOAD PLANS — GET THE PRICE
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
                            </button>
                        </Link>
                    </div>

                    <p className="mt-12 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 italic text-left border-l-2 border-zinc-800 pl-6">
                        No sales calls. No contracts. No learning curve.
                    </p>
                </motion.div>
            </div>

            {/* Visual Anchor: Gritty Bottom Gradient */}
            <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#0c0d10] to-transparent z-20" />
        </section>
    );
};

export default TakeoffHero;

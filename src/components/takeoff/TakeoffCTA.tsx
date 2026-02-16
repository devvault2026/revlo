import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const TakeoffCTA: React.FC = () => {
    return (
        <section className="py-32 bg-[#0c0d10] relative overflow-hidden text-left">
            <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="max-w-4xl"
                >
                    <h2 className="text-6xl md:text-[8rem] font-black italic uppercase tracking-tighter mb-12 leading-[0.85] text-white">
                        STOP ESTIMATING<br />
                        <span className="text-orange-600">AT NIGHT.</span>
                    </h2>

                    <div className="flex flex-col gap-12 pt-8">
                        <Link to="/contact">
                            <button
                                className="px-14 py-12 bg-orange-600 text-white font-black uppercase tracking-[0.4em] italic rounded-lg hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center justify-start gap-8 group w-full max-w-2xl text-left"
                            >
                                <FileUp className="w-10 h-10 shrink-0" />
                                <span className="text-3xl md:text-5xl shrink-0 uppercase">UPLOAD PLANS</span>
                                <ArrowRight className="w-8 h-8 group-hover:translate-x-4 transition-transform ml-auto" />
                            </button>
                        </Link>

                        <div className="space-y-4 max-w-2xl">
                            <p className="text-2xl md:text-4xl font-black text-zinc-500 italic uppercase italic leading-tight">
                                You could have your estimate before dinner.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="mt-40 text-left border-t border-zinc-900 pt-12 max-w-6xl mx-auto px-6 opacity-30">
                <p className="text-[10px] font-black uppercase tracking-[1em] text-zinc-700 italic">SECURE BLUEPRINT VAULT • 2026</p>
            </div>

            {/* Visual Anchor: Large Fadeout Background Type */}
            <div className="absolute -bottom-20 -right-20 opacity-[0.02] pointer-events-none">
                <span className="text-[25rem] font-black italic uppercase text-white leading-none tracking-tighter">REVLO</span>
            </div>
        </section>
    );
};

export default TakeoffCTA;

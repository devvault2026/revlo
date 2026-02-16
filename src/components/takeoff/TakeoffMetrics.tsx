import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const AnimatedNumber: React.FC<{ value: string; suffix?: string; isNumber: boolean }> = ({ value, suffix = "", isNumber }) => {
    if (!isNumber) return <span className="text-6xl font-black text-white italic tracking-tighter uppercase">{value}{suffix}</span>;

    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    const spring = useSpring(0, { stiffness: 45, damping: 20 });
    const displayValue = useTransform(spring, (current) => Math.round(current));

    useEffect(() => {
        spring.set(numericValue);
    }, [numericValue, spring]);

    return (
        <span className="text-6xl md:text-7xl font-black text-white italic tracking-tighter uppercase">
            <motion.span>{displayValue}</motion.span>{suffix}
        </span>
    );
};

const TakeoffMetrics: React.FC = () => {
    return (
        <section className="py-24 bg-[#0a0c10] relative overflow-hidden text-center border-t border-zinc-800/50">
            <div className="max-w-6xl mx-auto px-6">
                <div className="mb-20 space-y-4">
                    <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter text-white">
                        THE <span className="text-orange-500">NEW STANDARD</span> OF<br />
                        ESTIMATING OUTPUT.
                    </h2>
                    <p className="text-zinc-500 font-bold uppercase tracking-[0.4em] text-xs italic">STOP MEASURING IN HOURS. START MEASURING IN SECONDS.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { label: "TIME PER ESTIMATE", before: "2–6 HOURS", after: "10", suffix: " MIN", isNum: true },
                        { label: "BIDS SENT PER WEEK", before: "5–7 BIDS", after: "25", suffix: "+", isNum: true },
                        { label: "NIGHTS ESTIMATING", before: "MOST NIGHTS", after: "ZERO", isNum: false }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-12 bg-zinc-900 border border-zinc-800 rounded-[2.5rem] group hover:border-orange-500/20 transition-all relative overflow-hidden shadow-2xl"
                        >
                            <div className="absolute top-0 inset-x-0 h-1.5 bg-zinc-800 group-hover:bg-orange-500/20 transition-colors" />

                            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-12 italic">{item.label}</p>

                            <div className="space-y-10">
                                <div className="space-y-2 opacity-20 group-hover:opacity-40 transition-opacity">
                                    <p className="text-[10px] font-black text-red-500 uppercase tracking-widest italic">THE OLD WAY</p>
                                    <p className="text-2xl font-black text-zinc-500 italic tracking-tighter line-through uppercase">{item.before}</p>
                                </div>

                                <div className="flex flex-col items-center">
                                    <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest italic mb-2">THE REVLO WAY</p>
                                    <div className="flex items-center justify-center gap-1">
                                        <AnimatedNumber value={item.after} suffix={item.suffix} isNumber={item.isNum} />
                                    </div>
                                </div>
                            </div>

                            {/* Industrial Bolt Decorations */}
                            {[...Array(4)].map((_, j) => (
                                <div key={j} className={`absolute w-1.5 h-1.5 bg-zinc-800 rounded-full ${j < 2 ? 'top-4' : 'bottom-4'} ${j % 2 === 0 ? 'left-4' : 'right-4'}`} />
                            ))}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TakeoffMetrics;

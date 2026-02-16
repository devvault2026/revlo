import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Moon, EyeOff, AlertTriangle, Clock } from 'lucide-react';

const TakeoffFatigue: React.FC = () => {
    return (
        <section className="py-24 bg-[#0a0c10] relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">

                    <div className="relative group order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-950 shadow-[0_0_60px_rgba(0,0,0,0.5)]"
                        >
                            <img
                                src="/stressed_contractor_night_1770761693628.png"
                                className="w-full h-full object-cover opacity-20 grayscale brightness-50 contrast-125"
                                alt="Estimating Fatigue"
                            />

                            {/* Gritty Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-transparent to-transparent opacity-90" />
                            <div className="absolute inset-0 border-[20px] border-[#0a0c10] pointer-events-none" />

                            <div className="absolute top-10 right-10 flex flex-col items-end">
                                <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl backdrop-blur-xl">
                                    <Clock className="text-red-500 mb-2" size={20} />
                                    <p className="text-2xl font-black text-white italic tabular-nums">02:24 <span className="text-xs text-zinc-500">AM</span></p>
                                </div>
                                <p className="mt-3 text-[9px] font-black uppercase text-red-500 tracking-[0.3em] animate-pulse">FATIGUE LEVEL: CRITICAL</p>
                            </div>

                            <div className="absolute bottom-10 left-10 space-y-2">
                                <div className="h-1 w-24 bg-red-500/20 rounded-full" />
                                <p className="text-xl font-black italic text-zinc-500 uppercase leading-none">
                                    BLURRY VISION.<br />
                                    <span className="text-zinc-600">ZERO FOCUS.</span><br />
                                    <span className="text-zinc-700">TOTAL RISK.</span>
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    <div className="space-y-12 order-1 lg:order-2">
                        <div className="space-y-4">
                            <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-white leading-[0.85]">
                                ESTIMATING<br />
                                <span className="text-orange-500">FATIGUE KILLS.</span>
                            </h2>
                            <p className="text-zinc-500 font-bold uppercase tracking-[0.4em] text-xs italic">THE 2 A.M. GRIND IS THE ENEMY OF YOUR MARGIN.</p>
                        </div>

                        <div className="space-y-4">
                            {[
                                { icon: Coffee, title: "RUSHED ESTIMATES", desc: "You rush the bid because you just want to sleep." },
                                { icon: EyeOff, title: "MISSED LINE ITEMS", desc: "Fatigued eyes miss $2,000 in material costs easily." },
                                { icon: AlertTriangle, title: "GUESSING VS. KNOWING", desc: "You start rounding up to 'finish faster'." },
                                { icon: Moon, title: "LOST MARGIN", desc: "Every clerical error comes directly out of your pocket." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-start gap-6 p-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl group hover:border-orange-500/30 transition-all"
                                >
                                    <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center border border-zinc-700 group-hover:bg-orange-500/10 group-hover:border-orange-500/30 transition-all shrink-0">
                                        <item.icon className="text-zinc-500 group-hover:text-orange-500" size={20} />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-lg font-black italic text-white uppercase tracking-tight leading-none">{item.title}</h4>
                                        <p className="text-zinc-500 text-sm font-bold italic">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="pt-8 text-center lg:text-left">
                            <p className="text-2xl md:text-3xl font-black text-white italic uppercase tracking-tighter">
                                REVLO DOESN'T <span className="text-orange-500 px-4 py-1 bg-orange-500/10 rounded-lg">GET TIRED.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TakeoffFatigue;

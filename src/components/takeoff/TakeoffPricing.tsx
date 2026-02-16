import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TakeoffPricing: React.FC = () => {
    return (
        <section className="py-24 bg-[#0a0b0e] border-t border-zinc-900 overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24">
                    <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter text-white leading-none text-left">
                        PRICING THAT<br />
                        <span className="text-zinc-600">FEELS OBVIOUS.</span>
                    </h2>
                    <p className="text-xl font-bold text-zinc-500 italic uppercase italic text-left md:text-right max-w-sm">
                        Stop overpaying for manual labor. Start investing in speed.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto items-stretch">
                    {/* Pay-as-you-bid */}
                    <div className="p-10 md:p-16 bg-[#0c0d10] border-2 border-zinc-800 rounded-lg flex flex-col justify-between group hover:border-zinc-700 transition-all">
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-black italic uppercase italic text-zinc-500 tracking-widest">PAY PER PLAN</h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-8xl font-black text-white italic tracking-tighter">$49</span>
                                </div>
                                <p className="text-xl font-bold text-orange-600 italic uppercase">“For one-off jobs”</p>
                            </div>

                            <ul className="space-y-6 border-t border-zinc-900 pt-12">
                                {[
                                    "Complete takeoff for one PDF set",
                                    "Categorized material list",
                                    "Marked-up validation PDF",
                                    "24-Hour turnaround",
                                    "No commitment"
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-center gap-4 text-zinc-400 text-lg font-bold italic uppercase italic">
                                        <div className="w-1.5 h-1.5 bg-zinc-800 rounded-full" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Link to="/contact">
                            <button className="mt-16 w-full py-8 bg-zinc-900 text-white font-black uppercase tracking-[0.3em] italic rounded hover:bg-zinc-800 border border-zinc-800 transition-all text-xl">
                                UPLOAD NOW
                            </button>
                        </Link>
                    </div>

                    {/* Estimator in a Box */}
                    <div className="p-10 md:p-16 bg-white text-black border-4 border-orange-600 rounded-lg flex flex-col justify-between relative shadow-[0_30px_60px_rgba(234,88,12,0.15)]">
                        {/* Most Popular Label (Plain) */}
                        <div className="absolute top-0 right-0 px-6 py-3 bg-orange-600 text-white font-black italic uppercase tracking-widest text-[10px]">
                            MOST POPULAR
                        </div>

                        <div className="space-y-12">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-black italic uppercase italic text-zinc-600 tracking-widest">ESTIMATOR IN A BOX</h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-8xl font-black text-black italic tracking-tighter">$497</span>
                                    <span className="text-2xl font-black text-zinc-400 uppercase">/ mo</span>
                                </div>
                                <p className="text-xl font-bold text-orange-600 italic uppercase">“Replaces a $4,000/month estimator”</p>
                            </div>

                            <ul className="space-y-6 border-t border-zinc-100 pt-12">
                                {[
                                    "UNLIMITED Takeoffs & Proposals",
                                    "Priority processing",
                                    "Custom unit rate matching",
                                    "Your branding on every PDF",
                                    "Direct account manager line",
                                    "First access to Voice-AI"
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-center gap-4 text-zinc-800 text-lg font-black italic uppercase italic">
                                        <div className="w-2.5 h-2.5 bg-orange-600 rounded-full" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Link to="/contact">
                            <button className="mt-16 w-full py-10 bg-black text-white font-black uppercase tracking-[0.4em] italic rounded hover:bg-zinc-900 transition-all text-2xl shadow-2xl">
                                GO UNLIMITED
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TakeoffPricing;

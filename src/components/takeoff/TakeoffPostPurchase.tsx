import React from 'react';
import { motion } from 'framer-motion';
import { FileUp, Cpu, Download, Send, CheckCircle2 } from 'lucide-react';

const TakeoffPostPurchase: React.FC = () => {
    const steps = [
        { icon: FileUp, title: "UPLOAD PLANS", detail: "Drop your PDF or DWG into the vault." },
        { icon: Cpu, title: "DIGITAL TAKEOFF", detail: "Our system counts every item with 99% accuracy." },
        { icon: Download, title: "REVIEW ESTIMATE", detail: "Get your XLSX material list and marked-up PDF." },
        { icon: Send, title: "SEND THE BID", detail: "Forward the professional quote to your client." },
        { icon: CheckCircle2, title: "GET THE WIN", detail: "Win the job based on speed and accuracy." }
    ];

    return (
        <section className="py-24 bg-[#0a0c10] relative overflow-hidden border-t border-zinc-900">
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white">
                        THE PATH TO THE <br />
                        <span className="text-orange-500">WINNING QUOTE.</span>
                    </h2>
                    <p className="mt-4 text-zinc-500 font-bold uppercase tracking-[0.3em] text-[10px] italic">WHAT HAPPENS THE SECOND YOU UPLOAD.</p>
                </div>

                <div className="relative max-w-5xl mx-auto py-12">
                    {/* The "Power Cable" Progress Line */}
                    <div className="absolute top-1/2 inset-x-0 h-1 bg-zinc-900 -translate-y-1/2 hidden md:block" />
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute top-1/2 left-0 h-1 bg-orange-600 shadow-[0_0_20px_rgba(234,88,12,0.4)] -translate-y-1/2 hidden md:block z-0"
                    />

                    <div className="grid md:grid-cols-5 gap-12">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className="relative z-10 group"
                            >
                                <div className="space-y-8 text-center">
                                    <div className="relative">
                                        <div className="w-16 h-16 bg-zinc-900 border-2 border-zinc-800 rounded-2xl mx-auto flex items-center justify-center text-zinc-500 shadow-2xl group-hover:border-orange-500 group-hover:text-orange-500 transition-all duration-500 group-hover:scale-110">
                                            <step.icon size={26} strokeWidth={2.5} />
                                        </div>
                                        <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-orange-600 rounded-full p-0.5">
                                            <CheckCircle2 size={12} className="text-white" />
                                        </div>
                                    </div>
                                    <div className="space-y-2 px-2">
                                        <h3 className="text-base font-black italic uppercase tracking-tight text-white italic">{step.title}</h3>
                                        <p className="text-[10px] font-bold text-zinc-600 italic uppercase tracking-widest leading-relaxed group-hover:text-zinc-400 transition-colors">{step.detail}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mt-20 flex flex-wrap justify-center gap-6">
                    {["NO CONTRACTS", "NO HIDDEN FEES", "NO BULLSHIT"].map((pill, i) => (
                        <div key={i} className="px-6 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg group hover:border-orange-500/20 transition-all cursor-default">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 group-hover:text-orange-500 italic flex items-center gap-3">
                                {pill}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TakeoffPostPurchase;

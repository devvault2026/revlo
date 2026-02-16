import React from 'react';
import { motion } from 'framer-motion';
import { FileUp, Cpu, Send } from 'lucide-react';

const TakeoffProcess: React.FC = () => {
    const steps = [
        {
            icon: FileUp,
            title: "Drop the plans",
            detail: "Upload your PDF or DWG set. I handle the ingestion."
        },
        {
            icon: Cpu,
            title: "Agent extracts data",
            detail: "AI identifies walls, doors, windows, and counts every item."
        },
        {
            icon: Send,
            title: "You send the bid",
            detail: "Receive a professional takeoff and draft estimate. Win the job."
        }
    ];

    return (
        <section className="py-24 bg-[#020408] border-y border-white/5 relative">
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 text-white leading-tight">
                        FROM PLAN TO PRICE —<br />
                        <span className="gradient-text italic text-4xl md:text-6xl">IN UNDER 10 MINUTES.</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, i) => (
                        <div key={i} className="relative group p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/5 transition-all">
                            <div className="absolute top-6 right-6 text-white/5 group-hover:text-purple-500/10 transition-colors pointer-events-none">
                                <span className="text-7xl font-black italic leading-none">{i + 1}</span>
                            </div>

                            <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/20">
                                <step.icon className="text-purple-400" size={28} />
                            </div>

                            <h3 className="text-xl font-black italic uppercase tracking-tight text-white mb-4 relative z-10">{step.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed italic relative z-10">{step.detail}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 p-10 bg-white/[0.03] border border-white/10 rounded-3xl text-center backdrop-blur-3xl">
                    <p className="text-xl md:text-2xl font-black italic text-white uppercase tracking-tight leading-relaxed">
                        "Your estimates done 5-10x faster <span className="text-purple-400 underline decoration-2 underline-offset-4">without hiring anyone new.</span>"
                    </p>
                </div>
            </div>
        </section>
    );
};

export default TakeoffProcess;

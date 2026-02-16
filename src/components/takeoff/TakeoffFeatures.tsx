import React from 'react';
import { motion } from 'framer-motion';
import { Ruler, ShoppingCart, ListChecks, DollarSign, Layers, Search } from 'lucide-react';

const TakeoffFeatures: React.FC = () => {
    const features = [
        {
            icon: <Ruler className="w-7 h-7" />,
            title: "MATERIAL COUNTS",
            desc: "Accurate counts for every stud, plate, and fixture. No more 'guesstimating' in your bids."
        },
        {
            icon: <Search className="w-7 h-7" />,
            title: "VISUAL VERIFICATION",
            desc: "Receive a color-coded PDF markup so you can verify exactly where every foot was counted."
        },
        {
            icon: <ListChecks className="w-7 h-7" />,
            title: "SCOPE DEFINITION",
            desc: "A professional summary that defines exactly what's included, so you don't get screwed on site."
        },
        {
            icon: <DollarSign className="w-7 h-7" />,
            title: "CUSTOM UNIT RATES",
            desc: "The system uses your actual labor and material pricing. The quote it creates is ready to send."
        },
        {
            icon: <Layers className="w-7 h-7" />,
            title: "LOGICAL GROUPING",
            desc: "Items are grouped by wall type, floor zone, or phase of work for easier project management."
        },
        {
            icon: <ShoppingCart className="w-7 h-7" />,
            title: "BUY-READY XLS",
            desc: "A clean Excel sheet ready to be sent to your supplier for final material pricing quotes."
        }
    ];

    return (
        <section className="py-24 bg-[#0a0c10] relative overflow-hidden border-t border-zinc-900">
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white">
                        THE <span className="text-orange-500">SPECIFICATIONS</span> OF<br />
                        A WINNING ESTIMATE.
                    </h2>
                    <p className="max-w-2xl mx-auto text-zinc-500 font-bold uppercase tracking-[0.3em] text-[11px] italic">
                        EVERYTHING YOUR CREW NEEDS TO BUILD.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="p-10 bg-zinc-900 border border-zinc-800 rounded-3xl hover:border-orange-500/20 transition-all group shadow-2xl relative"
                        >
                            <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center mb-8 border border-zinc-700 group-hover:bg-orange-500/10 group-hover:border-orange-500/30 transition-all">
                                <div className="text-zinc-500 group-hover:text-orange-500 transition-colors">
                                    {f.icon}
                                </div>
                            </div>
                            <h3 className="text-xl font-black italic uppercase tracking-tight text-white mb-4 italic leading-tight">{f.title}</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed font-bold italic group-hover:text-zinc-300 transition-colors">
                                {f.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TakeoffFeatures;

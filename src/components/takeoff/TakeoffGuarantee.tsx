import React from 'react';

const TakeoffGuarantee: React.FC = () => {
    return (
        <section className="py-24 bg-[#0a0b0e] border-y border-zinc-900 overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <div className="max-w-4xl mx-auto py-20 px-12 bg-zinc-900/40 border border-zinc-800 rounded-2xl relative">
                    <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white mb-8 italic leading-tight">
                        THE NO-QUESTIONS<br />
                        <span className="text-orange-600 underline decoration-orange-600/20 underline-offset-8">REDEMPTION GUARANTEE.</span>
                    </h2>

                    <p className="text-xl md:text-3xl font-black text-zinc-300 italic uppercase italic leading-tight max-w-2xl mx-auto">
                        If your first estimate isn’t usable, I redo it or refund you. <br />
                        <span className="text-white mt-4 block underline decoration-zinc-700 underline-offset-4">No questions asked.</span>
                    </p>

                    {/* Gritty Texture */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
                </div>

                <p className="mt-12 text-[10px] font-black uppercase tracking-[1em] text-zinc-700 italic">
                    REVLO SYSTEMS • EST 2026 • BUILT FOR TRADES
                </p>
            </div>
        </section>
    );
};

export default TakeoffGuarantee;

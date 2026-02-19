import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
    TakeoffHero,
    TakeoffSplitReality,
    TakeoffAgentWorkflow,
    TakeoffCTA,
    TakeoffBottleneck,
    TakeoffPricing,
    TakeoffWidget
} from '../components/takeoff';
import TakeoffMirror from '../components/takeoff/TakeoffMirror';
import TakeoffRelief from '../components/takeoff/TakeoffRelief';
import TakeoffReplacement from '../components/takeoff/TakeoffReplacement';
import TakeoffGuarantee from '../components/takeoff/TakeoffGuarantee';
import Navigation from '../components/Navigation';

const TakeoffAgentPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#0c0d10] text-zinc-100 font-sans selection:bg-orange-600 selection:text-white">
            <Helmet>
                <title>AI Takeoff & Estimating Agent | Revlo — Instant Accurate Bids for Contractors</title>
                <meta name="description" content="Stop wasting late nights on manual takeoffs. Our vision-enabled AI Agent analyzes PDF/DWG plans and returns measured quantities, material line-items, and draft pricing in minutes." />
                <meta property="og:title" content="AI Takeoff & Estimating Agent | Revlo" />
                <meta property="og:description" content="Our vision-enabled AI Agent analyzes blueprints and returns accurate bids in minutes, not hours." />
                <meta property="og:image" content="https://res.cloudinary.com/dpfapm0tl/image/upload/v1771259282/ChatGPT_Image_Feb_16_2026_11_27_50_AM_uorc1u.png" />
                <meta property="og:url" content="https://www.wearerevlo.com/takeoff-agent" />
                <meta name="twitter:card" content="summary_large_image" />
                <link rel="canonical" href="https://www.wearerevlo.com/takeoff-agent" />
            </Helmet>
            <Navigation />

            <main>
                {/* 1. HERO - THE PUNCH */}
                <TakeoffHero />

                {/* 2. THE MIRROR - THEIR LIFE */}
                <TakeoffMirror />

                {/* 3. THE DIFFERENCE - THE LEDGER */}
                <TakeoffSplitReality />

                {/* 4. KILL TECH FEAR - THE RELIEF */}
                <TakeoffRelief />

                {/* 5. STEP-BY-STEP - THE PROCESS */}
                <TakeoffAgentWorkflow />
                <TakeoffWidget />

                {/* 6. THE COST - THE WALLET HIT */}
                <TakeoffBottleneck />

                {/* 7. THE REPLACEMENT - THE ROI */}
                <TakeoffReplacement />

                {/* 8. PRICING - THE OBVIOUS CHOICE */}
                <TakeoffPricing />

                {/* 9. THE GUARANTEE - FEAR REMOVAL */}
                <TakeoffGuarantee />

                {/* 10. FINAL CTA - COMMAND */}
                <TakeoffCTA />
            </main>

            {/* Custom Industrial Scroll Indicator */}
            <div className="fixed bottom-10 left-10 hidden xl:flex flex-col gap-4 opacity-10 pointer-events-none">
                <div className="w-px h-24 bg-zinc-400 mx-auto" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] vertical-text italic">ESTIMATING OPS</span>
            </div>

            {/* Footer */}
            <footer className="py-20 bg-[#0a0b0e] border-t border-zinc-900 border-dashed">
                <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-orange-600 rounded-lg" />
                        <span className="text-2xl font-black italic uppercase tracking-tighter">REVLO</span>
                    </div>
                    <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest italic">
                        © 2026 REVLO SYSTEMS INC. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex gap-8">
                        {["Terms", "Privacy", "Support"].map((item, i) => (
                            <a key={i} href="#" className="text-zinc-600 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">{item}</a>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default TakeoffAgentPage;

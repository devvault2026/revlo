import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, Loader2, Zap, AlertTriangle, Download, Terminal, ChevronRight, Globe, Shield, Target, Cpu, Activity, Fingerprint, Lock, Star, Radiation } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useAnimationFrame } from 'framer-motion';
import LeadResult from '../features/scout-engine/components/LeadResult';
import KnowledgePanel from '../features/scout-engine/components/KnowledgePanel';
import { streamLeads, deepScanLead, enrichLeadData } from '../features/scout-engine/services/geminiService';
import { Lead, AppState } from '../features/scout-engine/types';

// Constants
// Constants removed: DAILY_LIMIT, VISITS_KEY

// Reactive Mini Bubble - Memoized to prevent "tripping out" during typing
const ReactiveBubble = React.memo(({ mouseX, mouseY }: { mouseX: any, mouseY: any }) => {
  // Use useMemo to ensure random values are generated ONLY ONCE per bubble instance
  const config = useMemo(() => ({
    xPercent: Math.random() * 100,
    startY: 110 + (Math.random() * 30),
    speed: Math.random() * 0.15 + 0.1,
    size: Math.random() * 5 + 2,
    brightness: 0.3 + Math.random() * 0.2
  }), []);

  const bubbleXOffset = useMotionValue(0);
  const bubbleYPos = useMotionValue(config.startY);

  const springX = useSpring(bubbleXOffset, { damping: 25, stiffness: 150 });

  useAnimationFrame(() => {
    const currentY = bubbleYPos.get();
    if (currentY < -20) {
      bubbleYPos.set(110 + Math.random() * 20);
    } else {
      bubbleYPos.set(currentY - config.speed);
    }

    const bubbleRealX = (window.innerWidth * (config.xPercent / 100)) + bubbleXOffset.get();
    const bubbleRealY = (window.innerHeight * (currentY / 100));

    const dx = mouseX.get() - bubbleRealX;
    const dy = mouseY.get() - bubbleRealY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 180) {
      const force = (180 - dist) / 180;
      bubbleXOffset.set(-dx * force * 0.7);
    } else {
      bubbleXOffset.set(0);
    }
  });

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${config.xPercent}%`,
        top: useTransform(bubbleYPos, (v) => `${v}%`),
        x: springX,
        width: config.size,
        height: config.size,
        borderRadius: '50%',
        backgroundColor: `rgba(168, 85, 247, ${config.brightness})`,
        boxShadow: `0 0 12px rgba(168, 85, 247, ${config.brightness + 0.1})`,
      }}
    />
  );
});

// Revlo Branded Glow Orb
const GlowSphere = React.memo(({ color, size, top, left, delay }: { color: string, size: number, top: string, left: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{
      opacity: [0.4, 0.8, 0.4],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 10 + Math.random() * 5,
      repeat: Infinity,
      ease: "easeInOut",
      delay
    }}
    style={{
      position: 'absolute',
      width: size,
      height: size,
      top,
      left,
      borderRadius: '50%',
      background: color,
      filter: 'blur(100px)',
      pointerEvents: 'none',
      zIndex: 0
    }}
  />
));

// Unified Branded Background System - Memoized to ignore typing state changes
const BackgroundSystem = React.memo(() => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Pre-generate random values for the deep floor orbs to avoid re-calculation
  const floorOrbs = useMemo(() => [...Array(5)].map((_, i) => i), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#010103]">
      {/* SECTIONED BRANDED ORBS */}
      <GlowSphere color="radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%)" size={800} top="-15%" left="-15%" delay={0} />
      <GlowSphere color="radial-gradient(circle, rgba(217, 70, 239, 0.2) 0%, transparent 70%)" size={600} top="-10%" left="30%" delay={2} />
      <GlowSphere color="radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, transparent 70%)" size={700} top="-10%" left="60%" delay={1} />
      <GlowSphere color="radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)" size={900} top="25%" left="-20%" delay={3} />
      <GlowSphere color="radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%)" size={900} top="25%" left="70%" delay={4} />

      {/* Extreme Deep Floor Orbs */}
      <div
        className="absolute bottom-0 inset-x-0 h-[60%] opacity-40"
        style={{
          background: 'radial-gradient(circle at bottom, rgba(126, 34, 206, 0.3) 0%, transparent 80%)',
          filter: 'blur(120px)',
        }}
      />

      {/* Reactive Stream */}
      {[...Array(50)].map((_, i) => (
        <ReactiveBubble key={`mini-${i}`} mouseX={mouseX} mouseY={mouseY} />
      ))}
    </div>
  );
});

// Continuous Clean Electric Bolt Tracer
const ElectricBolt = React.memo(() => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-20">
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        rx="28"
        fill="none"
        stroke="#d946ef"
        strokeWidth="2"
        className="animate-[bolt_3.5s_linear_infinite]"
        style={{
          strokeDasharray: '120 1000',
          filter: 'drop-shadow(0 0 10px #d946ef) drop-shadow(0 0 2px #fff)',
        }}
      />
    </svg>
  );
});

const RevloLogo = React.memo(({ size = "large" }: { size?: "small" | "large" }) => (
  <div className={`flex items-center select-none ${size === "large" ? "mb-10 flex-col" : ""}`}>
    <motion.div
      initial={size === "large" ? { opacity: 0, y: 15 } : {}}
      animate={size === "large" ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="flex items-center gap-0 group cursor-default"
    >
      <div className="relative">
        <img
          src="/logo.png"
          alt="Revlo"
          className={`object-contain brightness-0 invert relative z-10 transition-transform duration-700 group-hover:scale-105 ${size === "large" ? "w-28 h-28" : "w-10 h-10"}`}
        />
        {size === "large" && (
          <div className="absolute inset-0 bg-purple-600/15 blur-[50px] rounded-full scale-125" />
        )}
      </div>

      <div className={`flex items-center gap-3 ${size === "large" ? "-ml-3 mt-1" : "-ml-1"}`}>
        <span className={`font-black font-sans text-white italic tracking-tighter leading-none ${size === "large" ? "text-7xl" : "text-xl"}`}>
          REVLO
        </span>
        <div className={`flex flex-col ${size === "large" ? "mt-3" : "mt-0"}`}>
          <span className={`font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400 uppercase tracking-[0.3em] ${size === "large" ? "text-lg" : "text-[7px] leading-none"}`}>
            SCOUT
          </span>
          {size === "large" && (
            <span className="text-[8px] text-slate-500 uppercase tracking-[0.6em] font-bold opacity-50 italic">AI Reconnaissance</span>
          )}
        </div>
      </div>
    </motion.div>
  </div>
));

function App() {
  const [query, setQuery] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [isPanelExpanded, setIsPanelExpanded] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setAppState(AppState.SEARCHING);
    setIsStreaming(true);
    setLeads([]);
    setSelectedLead(null);

    try {
      const leadGenerator = streamLeads(query, 30);
      let count = 0;

      const enrichmentQueue: Promise<void>[] = [];

      for await (const lead of leadGenerator) {
        setAppState(AppState.RESULTS);

        // Add initial lead
        setLeads(prev => [...prev, lead]);

        if (count === 0) setSelectedLead(lead);
        count++;

        // AUTO-ENRICHMENT THREAD:
        // If lead is missing critical data, spawn a background enrichment task
        if (!lead.email || !lead.estimatedOwnerName || !lead.phoneNumber) {
          const enrichmentTask = (async () => {
            // Add artificial delay to prevent rate limit slamming if many leads come in fast
            await new Promise(r => setTimeout(r, count * 1500));
            try {
              const enrichedUpdates = await enrichLeadData(lead);

              setLeads(currentLeads => currentLeads.map(l => {
                if (l.id === lead.id) {
                  const merged = { ...l, ...enrichedUpdates };
                  // If this is the currently selected lead, update the view immediately
                  if (selectedLead?.id === l.id) setSelectedLead(merged);
                  return merged;
                }
                return l;
              }));
            } catch (err) {
              console.error("Auto-enrichment failed for", lead.businessName);
            }
          })();
          enrichmentQueue.push(enrichmentTask);
        }
      }

      if (count === 0) {
        setErrorMsg("Satellite Link Secured but no high-value targets identified. Refine search parameters.");
        setAppState(AppState.ERROR);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Encryption Error.");
      setAppState(AppState.ERROR);
    } finally {
      setIsStreaming(false);
    }
  };

  const handleDeepScan = async (lead: Lead) => {
    try {
      const enrichedData = await deepScanLead(lead);
      const updatedLead = { ...lead, ...enrichedData };
      setLeads(prev => prev.map(l => l.id === lead.id ? updatedLead : l));
      setSelectedLead(updatedLead);
    } catch (e) { }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#010103] text-white selection:bg-purple-500/20 overflow-hidden relative">
      <BackgroundSystem />
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.06]" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

      <AnimatePresence mode="wait">

        {appState === AppState.IDLE && (
          <div key="idle-screen" className="flex-1 flex flex-col items-center justify-center p-4 relative z-10 transition-all duration-1000">
            <RevloLogo />

            <div className="w-full relative px-6 mt-4 max-w-xl mx-auto mb-16">
              <form onSubmit={handleSearch} className="relative group w-full">
                <div className="absolute -inset-[2px] rounded-[1.8rem] overflow-visible pointer-events-none z-20">
                  <ElectricBolt />
                </div>

                <div className="relative flex items-center bg-[#070709]/90 backdrop-blur-md rounded-[1.75rem] border border-white/10 p-2.5 pr-3 shadow-[0_30px_70px_rgba(0,0,0,0.8)] group-hover:border-white/20 transition-all duration-500">
                  <div className="pl-5 pr-3 text-purple-500/30 group-hover:text-purple-400 transition-all">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                    className="flex-1 h-12 bg-transparent text-white placeholder-slate-900 focus:outline-none font-black italic text-xl tracking-tight uppercase"
                    placeholder="INITIATE RECON..."
                  />
                  <button
                    type="submit"
                    disabled={!query}
                    className="bg-white text-black h-10 w-10 rounded-2xl flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all transform active:scale-95 disabled:opacity-5"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </form>
            </div>

            <div className="flex gap-16 opacity-30 mt-4">
              {[Globe, Shield, Target].map((Icon, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="block text-[8px] font-black uppercase tracking-[0.4em] text-slate-500">{i === 0 ? 'Neural Net' : i === 1 ? 'Encrypted' : 'Precision'}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {(appState === AppState.SEARCHING || appState === AppState.RESULTS || appState === AppState.ERROR) && (
          <div key="results-screen" className="flex-1 flex flex-col h-screen overflow-hidden bg-black/60 backdrop-blur-3xl z-10 transition-all duration-1000">
            <header className="h-16 shrink-0 border-b border-white/5 flex items-center px-6 lg:px-8 bg-black/40 backdrop-blur-3xl z-30">
              <div className="cursor-pointer flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity" onClick={() => setAppState(AppState.IDLE)}>
                <img src="/logo.png" className="w-6 h-6 object-contain brightness-0 invert" alt="Revlo" />
                <span className="font-black text-sm tracking-widest text-white italic">REVLO <span className="text-purple-500">SCOUT</span></span>
              </div>
              <div className="ml-auto flex items-center gap-4">
                <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5">
                  <Activity className="w-3 h-3 text-green-500" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">System_Online</span>
                </div>
                <button onClick={() => { }} className="bg-white text-black px-5 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-xl italic hover:bg-purple-500 hover:text-white transition-all">Export Intelligence</button>
              </div>
            </header>

            {/* SPLIT PANE WORKSPACE */}
            <div className="flex-1 flex overflow-hidden relative">

              {/* LEFT PANE: LEAD COMMAND CENTER (LIST) */}
              <div className={`flex flex-col min-w-0 transition-all duration-500 ease-[bezier(0.23,1,0.32,1)] border-r border-white/5 ${selectedLead ? (isPanelExpanded ? 'w-0 opacity-0 overflow-hidden' : 'w-[45%] opacity-100') : 'w-full opacity-100'}`}>

                {/* List Toolbar */}
                <div className="h-14 shrink-0 border-b border-white/5 flex items-center px-8 justify-between bg-black/40 backdrop-blur-md sticky top-0 z-20">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-purple-500/10 rounded-lg">
                      <Target className="w-4 h-4 text-purple-500" />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">{leads.length} Targets Found</span>
                  </div>
                  {isStreaming && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/5 rounded-full border border-purple-500/10">
                      <Loader2 className="w-3 h-3 animate-spin text-purple-500" />
                      <span className="text-[9px] font-bold text-purple-400 uppercase tracking-widest animate-pulse">Scanning Sector...</span>
                    </div>
                  )}
                </div>

                {/* Scrollable List Area */}
                <div className="flex-1 overflow-y-auto w-full custom-scrollbar p-0 bg-black/20">
                  <AnimatePresence mode="popLayout">
                    {appState === AppState.SEARCHING && leads.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full w-full text-center p-10">
                        <Loader2 className="w-12 h-12 text-purple-500/50 animate-spin mb-6" />
                        <h2 className="text-xl font-black italic uppercase text-white/30 tracking-tight">Acquiring Sat-Link...</h2>
                      </div>
                    ) : appState === AppState.ERROR ? (
                      <div className="p-20 text-center uppercase font-black opacity-30 italic tracking-widest text-red-500">{errorMsg}</div>
                    ) : (
                      <div className="flex flex-col pb-20">
                        {leads.map((lead) => (
                          <LeadResult
                            key={lead.id}
                            lead={lead}
                            isSelected={selectedLead?.id === lead.id}
                            onSelect={(l) => {
                              setSelectedLead(l);
                              // Auto-collapse if switching leads to show context, unless user explicitly expanded
                              if (isPanelExpanded) setIsPanelExpanded(false);
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* RIGHT PANE: INTELLIGENCE PANEL (DETAIL) */}
              <AnimatePresence mode="wait">
                {selectedLead && (
                  <motion.div
                    key="detail-panel"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{
                      width: isPanelExpanded ? '100%' : '55%',
                      opacity: 1
                    }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                    className={`flex-1 flex flex-col bg-[#030304] z-20 shadow-[0_0_100px_rgba(0,0,0,0.8)] relative overflow-hidden ${isPanelExpanded ? 'absolute inset-0 z-50' : 'relative'}`}
                    style={{
                      minWidth: isPanelExpanded ? '100%' : '600px'
                    }}
                  >
                    <KnowledgePanel
                      lead={selectedLead}
                      isExpanded={isPanelExpanded}
                      onToggleExpand={() => setIsPanelExpanded(!isPanelExpanded)}
                      onClose={() => {
                        setSelectedLead(null);
                        setIsPanelExpanded(false);
                      }}
                      onStartCoach={() => { }}
                      onDeepScan={handleDeepScan}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        )}

      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.03); border-radius: 10px; }
        @keyframes bolt {
          from { stroke-dashoffset: 1120; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}

export default App;
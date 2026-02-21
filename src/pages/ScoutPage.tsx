// Scout Console Main Entry
import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Search, Loader2, Zap, AlertTriangle, Download, Terminal, ChevronRight, Globe,
  Shield, Target, Cpu, Activity, Fingerprint, Lock, Star, Radiation, Home,
  Brain, ToggleLeft, ToggleRight, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useAnimationFrame } from 'framer-motion';
import { Link } from 'react-router-dom';
import LeadResult from '../features/scout-engine/components/LeadResult';
import KnowledgePanel from '../features/scout-engine/components/KnowledgePanel';
import { streamLeads, deepScanLead, enrichLeadData } from '../features/scout-engine/services/geminiService';
import { Lead, AppState, EnrichmentMode } from '../features/scout-engine/types';
import LiveCoach from '../features/scout-engine/components/LiveCoach';
import PitchModal from '../features/scout-engine/components/PitchModal';
import CRMView from '../features/scout-engine/components/CRMView';
import EnrichmentJobNotifications from '../features/scout-engine/components/EnrichmentJobNotifications';
import { deepEnrichLead } from '../features/scout-engine/services/enrichmentService';
import { useAuth } from '../context/AuthContext';

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

function ScoutPage() {
  const { user, signOut, isSynced, syncError } = useAuth();
  const [query, setQuery] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'RECON' | 'CRM'>('RECON');
  const [selectedLeadIds, setSelectedLeadIds] = useState<Set<string>>(new Set());

  const [isPanelExpanded, setIsPanelExpanded] = useState(false);
  const [showCoach, setShowCoach] = useState(false);
  const [showPitch, setShowPitch] = useState(false);
  const [enrichmentMode, setEnrichmentMode] = useState<EnrichmentMode>('manual');

  const exportLeads = () => {
    if (leads.length === 0) return;
    const csvContent = "data:text/csv;charset=utf-8,"
      + ["Business Name,Industry,Location,Phone,Email,Website,Score"]
        .concat(leads.map(l => `${l.businessName},${l.industry},${l.location},${l.phoneNumber || ''},${l.email || ''},${l.website || ''},${l.leadScore}`))
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `revlo_recon_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleLeadSelection = (id: string) => {
    const next = new Set(selectedLeadIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedLeadIds(next);
  };

  const selectAllLeads = () => {
    if (selectedLeadIds.size === leads.length) {
      setSelectedLeadIds(new Set());
    } else {
      setSelectedLeadIds(new Set(leads.map(l => l.id)));
    }
  };

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

          // AUTO-DEEP ENRICHMENT (Deepseek + Brave Search)
          if (enrichmentMode === 'auto') {
            const deepEnrichTask = (async () => {
              await new Promise(r => setTimeout(r, count * 3000 + 2000)); // Stagger deep enrichments
              try {
                const dossier = await deepEnrichLead(lead);
                setLeads(currentLeads => currentLeads.map(l => {
                  if (l.id === lead.id) {
                    const enriched = {
                      ...l,
                      dossier,
                      isEnriched: true,
                      enrichmentStatus: 'complete' as const,
                      estimatedOwnerName: dossier.ownerName || l.estimatedOwnerName,
                      email: dossier.emailFound || l.email,
                      phoneNumber: dossier.phoneFound || l.phoneNumber,
                      painPoints: dossier.painPoints.length > 0 ? dossier.painPoints : l.painPoints,
                      suggestedPitch: dossier.tailoredPitch || l.suggestedPitch,
                      leadScore: dossier.opportunityScore || l.leadScore,
                    };
                    if (selectedLead?.id === l.id) setSelectedLead(enriched);
                    return enriched;
                  }
                  return l;
                }));
              } catch (err) {
                console.error('Auto deep enrichment failed for', lead.businessName, err);
              }
            })();
            enrichmentQueue.push(deepEnrichTask);
          }
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


      {/* TOP TACTICAL BAR */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[120] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      <AnimatePresence mode="wait">

        {appState === AppState.IDLE && (
          <div key="idle-screen" className="flex-1 flex flex-col items-center justify-center p-4 relative z-10 transition-all duration-1000">
            {/* Mission Home Navigation */}
            <Link to="/" className="fixed top-8 left-8 z-[110] flex items-center gap-3 group px-6 py-3 bg-[#0A0A0C]/80 backdrop-blur-2xl border border-white/5 rounded-2xl hover:border-purple-500/50 transition-all duration-500 group shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <Home className="w-4 h-4 text-purple-500 group-hover:scale-110 transition-transform" />
              <div className="flex flex-col items-start leading-none gap-1">
                <span className="text-[7px] font-black text-white/20 uppercase tracking-[0.4em]">Sovereign State</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-white group-hover:text-purple-400">OS HOME</span>
              </div>
            </Link>

            {/* Operative Bio-Metric PFP - RE-DESIGNED TO BE SLEEK & MINIMAL */}
            {user && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="fixed top-8 right-8 z-[110] group cursor-pointer"
                onClick={() => { }} // User context menu or same
              >
                <div className="relative w-12 h-12">
                  {/* Electrified Effect Halo */}
                  <svg className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="22"
                      fill="none"
                      stroke={syncError ? "#ef4444" : "#a855f7"}
                      strokeWidth="1.5"
                      strokeDasharray="4 8"
                      className="animate-[bolt_4s_linear_infinite]"
                      style={{ filter: `drop-shadow(0 0 8px ${syncError ? '#ef4444' : '#a855f7'})` }}
                    />
                  </svg>

                  <div className={`relative w-full h-full rounded-full p-[2px] bg-gradient-to-b ${syncError ? 'from-red-500/50 to-transparent' : 'from-purple-500/50 to-transparent'} z-10`}>
                    <div className="w-full h-full rounded-full overflow-hidden border border-white/10 group-hover:border-white/20 transition-all duration-500">
                      <img
                        src={user.imageUrl}
                        alt="Operative"
                        className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                  </div>

                  {/* Mini Tactical Status */}
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-[2px] border-[#010103] z-20 ${syncError ? 'bg-red-500' : 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]'}`} />
                </div>
              </motion.div>
            )}

            <RevloLogo />

            <div className="w-full relative px-6 mt-4 max-w-xl mx-auto mb-16">
              <form onSubmit={handleSearch} className="relative group w-full">
                <div className="absolute -inset-[2px] rounded-[1.8rem] overflow-visible pointer-events-none z-20">
                  <ElectricBolt />
                </div>

                <div className="relative flex items-center bg-[#070709]/95 backdrop-blur-2xl rounded-[1.75rem] border border-white/10 p-1.5 pr-2.5 shadow-[0_40px_100px_rgba(0,0,0,0.9)] group-hover:border-white/20 transition-all duration-700">
                  <div className="pl-6 pr-4 text-purple-500/20 group-hover:text-purple-500/40 transition-all duration-700">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                    className="flex-1 h-14 bg-transparent text-white placeholder-slate-900 focus:outline-none font-black italic text-2xl tracking-tight uppercase"
                    placeholder="INITIATE DEEP SCAN..."
                  />
                  <button
                    type="submit"
                    disabled={!query}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 relative overflow-hidden group/btn ${query ? 'bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:scale-105 active:scale-95' : 'bg-white/[0.03] text-white/10 cursor-not-allowed'}`}
                  >
                    <Search className={`w-5 h-5 transition-transform duration-500 ${query ? 'group-hover/btn:scale-110' : ''}`} />
                    {query && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity"
                      />
                    )}
                  </button>
                </div>
              </form>
              <div className="mt-6 flex justify-center gap-4 overflow-hidden py-2 whitespace-nowrap overflow-x-auto no-scrollbar opacity-30">
                {['Roofers', 'HVAC Miami', 'AI Agencies', 'Fine Dining'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-4 py-1.5 glass rounded-full text-[8px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
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
          <div key="results-screen" className="flex-1 flex flex-col h-screen overflow-hidden bg-[#010103] z-10 transition-all duration-1000">
            {/* FLOATING RESULTS HEADER - 100X TOP SHELF */}
            <header className="fixed top-6 left-6 right-6 h-16 flex items-center justify-between px-8 bg-black/40 backdrop-blur-3xl border border-white/5 rounded-3xl z-[130] shadow-2xl">
              <div
                className="cursor-pointer flex items-center gap-3 hover:scale-105 transition-all duration-500"
                onClick={() => setAppState(AppState.IDLE)}
              >
                <img src="/logo.png" className="w-7 h-7 object-contain brightness-0 invert" alt="Revlo" />
                <div className="flex flex-col">
                  <span className="text-[7px] font-black text-purple-500/50 uppercase tracking-[0.4em] mb-0.5 leading-none">Intelligence_Link</span>
                  <span className="font-black text-sm tracking-widest text-white italic leading-none">REVLO <span className="text-purple-500">SCOUT</span></span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                {/* SYSTEM TELEMETRY (Minimalist) */}
                <div className="hidden xl:flex items-center gap-8 px-6 py-2 bg-white/[0.02] rounded-2xl border border-white/5">
                  <div className="flex flex-col items-center">
                    <span className="text-[7px] font-black text-white/20 uppercase tracking-widest mb-1">Status</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[9px] font-black uppercase text-green-500/60">Online</span>
                    </div>
                  </div>
                  <div className="w-px h-4 bg-white/5" />
                  <div className="flex flex-col items-center">
                    <span className="text-[7px] font-black text-white/20 uppercase tracking-widest mb-1">Enrichment</span>
                    <span className="text-[9px] font-black uppercase text-purple-500/60">{enrichmentMode}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex bg-black/40 border border-white/5 p-1 rounded-2xl">
                    <button
                      onClick={() => setCurrentView('RECON')}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${currentView === 'RECON' ? 'bg-purple-500 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                    >
                      Recon
                    </button>
                    <button
                      onClick={() => setCurrentView('CRM')}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${currentView === 'CRM' ? 'bg-purple-500 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                    >
                      CRM
                      {selectedLeadIds.size > 0 && (
                        <span className="bg-purple-400 text-black px-1.5 py-0.5 rounded-md text-[8px]">{selectedLeadIds.size}</span>
                      )}
                    </button>
                  </div>

                  <button
                    onClick={exportLeads}
                    className="h-10 px-5 bg-white text-black text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-purple-500 hover:text-white transition-all duration-500 flex items-center gap-2 active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Export
                  </button>

                  {/* Reuse the premium PFP logic if needed, or keep it simple but sleek here */}
                  <div className="w-10 h-10 rounded-full p-[1px] bg-gradient-to-b from-purple-500/50 to-transparent">
                    <div className="w-full h-full rounded-full overflow-hidden border border-white/10 shadow-lg">
                      <img src={user?.imageUrl} className="w-full h-full object-cover" alt="User" />
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* SPACER FOR FIXED HEADER */}
            <div className="h-28 shrink-0" />

            {/* SPLIT PANE WORKSPACE */}
            <div className="flex-1 flex overflow-hidden relative">

              {/* LEFT PANE: LEAD COMMAND CENTER (LIST) */}
              <div className={`flex flex-col min-w-0 transition-all duration-500 ease-[bezier(0.23,1,0.32,1)] border-r border-white/5 ${selectedLead || currentView === 'CRM' ? (isPanelExpanded || currentView === 'CRM' ? 'w-0 opacity-0 overflow-hidden' : 'w-[45%] opacity-100') : 'w-full opacity-100'}`}>

                {/* List Toolbar */}
                <div className="h-14 shrink-0 border-b border-white/5 flex items-center px-8 justify-between bg-black/40 backdrop-blur-md sticky top-0 z-20">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={selectAllLeads}
                      className="p-1 px-2 border border-white/10 rounded-lg hover:border-purple-500/50 transition-all"
                    >
                      <div className={`w-3.5 h-3.5 rounded border transition-all ${selectedLeadIds.size === leads.length && leads.length > 0 ? 'bg-purple-500 border-purple-500' : 'border-white/20'}`} />
                    </button>
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-purple-500/10 rounded-lg">
                        <Target className="w-4 h-4 text-purple-500" />
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">{leads.length} Targets Found</span>
                    </div>
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
                            isMarked={selectedLeadIds.has(lead.id)}
                            onToggleMark={() => toggleLeadSelection(lead.id)}
                            onSelect={(l: Lead) => {
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

              {/* CRM View Overlay */}
              <AnimatePresence>
                {currentView === 'CRM' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex-1 flex flex-col bg-black/20 overflow-hidden"
                  >
                    <CRMView
                      selectedLeads={leads.filter(l => selectedLeadIds.has(l.id))}
                      onClose={() => setCurrentView('RECON')}
                      onRemoveLead={(id: string) => toggleLeadSelection(id)}
                      onUpdateLead={(updatedLead: Lead) => {
                        setLeads(prev => prev.map(l => l.id === updatedLead.id ? updatedLead : l));
                        if (selectedLead?.id === updatedLead.id) setSelectedLead(updatedLead);
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

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
                      onStartCoach={() => setShowCoach(true)}
                      onDeepScan={handleDeepScan}
                      onUpdateLead={(updatedLead) => {
                        setLeads(prev => prev.map(l => {
                          if (l.id === updatedLead.id) return updatedLead;
                          // If we are currently focused on this lead and its ID just transitioned (e.g. temp -> UUID)
                          if (selectedLead && l.id === selectedLead.id) return updatedLead;
                          return l;
                        }));
                        setSelectedLead(updatedLead);
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {showCoach && selectedLead && (
                <LiveCoach
                  businessName={selectedLead.businessName}
                  onClose={() => setShowCoach(false)}
                />
              )}

              {showPitch && selectedLead && (
                <PitchModal
                  lead={selectedLead}
                  onClose={() => setShowPitch(false)}
                />
              )}

            </div>
          </div>
        )}

      </AnimatePresence>

      {/* ENRICHMENT JOB NOTIFICATIONS (always visible) */}
      <EnrichmentJobNotifications />

      {/* AnimatePresence end already rendered above */}

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

export default ScoutPage;
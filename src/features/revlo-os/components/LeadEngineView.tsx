import React, { useState, useEffect, useRef } from 'react';
import {
    Search, Crosshair, Target, Brain, Code, Send, CheckCircle2,
    Loader2, Users, FileText, Mail, MapPin,
    Plus, Play, Zap, Settings2, Radar, Bot, Layers, BarChart2, Maximize2, Minimize2, AlertTriangle, Radiation, Globe, User, Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LeadCard from './LeadCard';
import WebsiteBuilderView from './WebsiteBuilderView';
import RevloInvoice from './RevloInvoice';
import StrategyEditor from './StrategyEditor';
import { Lead, LeadStatus, Settings, EngineSession, AgentProfile } from '../types';
import * as GeminiService from '../services/geminiService';
import { useToast } from '../context/ToastContext';
import NeuralLoader from './NeuralLoader';

interface LeadEngineViewProps {
    settings: Settings;
    sessions: EngineSession[];
    currentSessionId: string;
    onSwitchSession: (id: string) => void;
    onCreateSession: (name: string) => void;
    onDeleteSession: (id: string) => void;
    leads: Lead[];
    onUpdateLead: (lead: Lead) => Promise<void>;
    agents: AgentProfile[];
    onSendOutreach: (lead: Lead) => void;
}

const LeadEngineView: React.FC<LeadEngineViewProps> = ({
    settings, sessions, currentSessionId, onSwitchSession, onCreateSession, onDeleteSession, leads, onUpdateLead, agents, onSendOutreach
}) => {
    const { showToast } = useToast();

    const [ingestMode, setIngestMode] = useState<'auto' | 'enrich' | 'manual'>('auto');
    const [niche, setNiche] = useState(settings.niche);
    const [location, setLocation] = useState(settings.location);
    const [batchSize, setBatchSize] = useState(settings.scrapingBatchSize);
    const [leadCount, setLeadCount] = useState(10);
    const [autoPipeline, setAutoPipeline] = useState(false);
    const [scanMode, setScanMode] = useState<'niche' | 'zone'>('niche');
    const [csvInput, setCsvInput] = useState('');
    const [manualQuery, setManualQuery] = useState('');
    const [isLocating, setIsLocating] = useState(false);

    // Auto-detect location on mount
    useEffect(() => {
        if (!location || location === settings.location) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        try {
                            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
                            const data = await res.json();
                            const city = data.address?.city || data.address?.town || data.address?.village || '';
                            const state = data.address?.state || '';
                            const country = data.address?.country || '';
                            const readable = [city, state, country].filter(Boolean).join(', ');
                            if (readable) {
                                setLocation(readable);
                            } else {
                                setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
                            }
                        } catch {
                            setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
                        }
                    },
                    () => { /* silently fail on auto-detect */ }
                );
            }
        }
    }, []);

    // Agent Selection
    const [selectedAgentId, setSelectedAgentId] = useState<string>(agents[0]?.id || '');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [loadingStep, setLoadingStep] = useState<string>('');
    const [activeTab, setActiveTab] = useState('preview');
    const [outreachSent, setOutreachSent] = useState(false);

    const selectedLead = leads.find(l => l.id === selectedLeadId);
    const activeAgent = agents.find(a => a.id === selectedAgentId) || agents[0];

    const handleUseMyLocation = () => {
        if (!navigator.geolocation) {
            showToast("Geolocation is not supported by your browser", "error");
            return;
        }

        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
                    const data = await res.json();
                    const city = data.address?.city || data.address?.town || data.address?.village || '';
                    const state = data.address?.state || '';
                    const country = data.address?.country || '';
                    const readable = [city, state, country].filter(Boolean).join(', ');
                    if (readable) {
                        setLocation(readable);
                        showToast(`Location: ${readable}`, "success");
                    } else {
                        setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
                        showToast("Coordinates acquired", "success");
                    }
                } catch {
                    setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
                    showToast("Coordinates acquired", "success");
                }
                setIsLocating(false);
            },
            (error) => {
                console.error("Geolocation error:", error);
                showToast("Unable to retrieve location. Check permissions.", "error");
                setIsLocating(false);
            }
        );
    };

    const triggerChain = async (trigger: string) => {
        if (!activeAgent || !activeAgent.chaining) return;

        const chain = activeAgent.chaining.find(c => c.trigger === trigger);
        if (chain && chain.nextAgentId) {
            const nextAgent = agents.find(a => a.id === chain.nextAgentId);
            if (nextAgent) {
                console.log(`SYSTEM: Triggering handshake [${trigger}] -> ${nextAgent.name}`);
                showToast(`Neural Handshake: ${nextAgent.name} responding...`, "success");

                // Allow state to settle before next execution
                await new Promise(r => setTimeout(r, 1200));

                setSelectedAgentId(nextAgent.id);

                if (trigger === 'On Deep Dive Completion') {
                    handleGenerateStrategy();
                } else if (trigger === 'On PRD Completion') {
                    handleBuildSite();
                } else if (trigger === 'On Asset Compilation') {
                    setActiveTab('outreach');
                } else if (trigger === 'On Outreach Sent') {
                    showToast("Pipeline Cycle Complete", "success");
                }
            }
        }
    };

    const runFullPipelineOnLead = async (lead: Lead) => {
        setSelectedLeadId(lead.id);
        setActiveTab('dossier');
        let currentLeadState = { ...lead };

        try {
            // 1. INTEL & SCORING
            setLoadingStep(`[AUTO] Analyzing & Scoring ${currentLeadState.name}...`);
            const dossier = await GeminiService.generateDossier(settings.apiKey, currentLeadState);
            const scoreData = await GeminiService.scoreLead(settings.apiKey, currentLeadState);

            const effectiveNiche = scanMode === 'zone' ? (lead.type || "Local Business") : niche;
            const competitors = await GeminiService.analyzeCompetitors(settings.apiKey, effectiveNiche, location);

            currentLeadState = {
                ...currentLeadState,
                ...dossier,
                propensityScore: scoreData.score,
                psychologyProfile: scoreData.psychology,
                competitors,
                status: LeadStatus.DOSSIER_READY
            };
            await onUpdateLead(currentLeadState);

            // 2. STRATEGY (Using Agent)
            setLoadingStep(`[AUTO] ${activeAgent?.name || 'Agent'} is Strategizing...`);
            setActiveTab('strategy');
            const prd = await GeminiService.createPRD(settings.apiKey, currentLeadState, competitors, activeAgent);

            currentLeadState = { ...currentLeadState, prd, status: LeadStatus.STRATEGY_READY };
            await onUpdateLead(currentLeadState);

            // 3. BUILD (Multi-Page)
            setLoadingStep(`[AUTO] ${activeAgent?.name || 'Agent'} is Coding Site...`);
            setActiveTab('preview');
            const pages = await GeminiService.generateWebsiteCode(settings.apiKey, currentLeadState, prd, activeAgent);
            const outreach = await GeminiService.generateOutreach(settings.apiKey, currentLeadState, activeAgent);

            // 4. COMMERCIAL (Invoice & Script)
            setLoadingStep(`[AUTO] Creating Commercial Assets...`);
            const invoiceData = await GeminiService.generateInvoiceData(settings.apiKey, currentLeadState, prd);
            const voiceScript = await GeminiService.generateVoiceScript(settings.apiKey, currentLeadState);

            currentLeadState = {
                ...currentLeadState,
                siteStructure: pages,
                generatedSiteCode: pages['index.html'], // Fallback for old views
                outreachEmailSubject: outreach.emailSubject,
                outreachEmailBody: outreach.emailBody,
                outreachSmsBody: outreach.smsBody,
                voiceScript: voiceScript,
                invoice: {
                    amount: invoiceData.amount,
                    status: 'pending',
                    referenceId: `INV-${currentLeadState.id.substring(0, 6).toUpperCase()}`,
                    date: new Date().toISOString(),
                    packageName: invoiceData.packageName,
                    description: invoiceData.description
                },
                status: LeadStatus.OUTREACH_READY,
                dealValue: invoiceData.amount || 750
            };

            await onUpdateLead(currentLeadState);
            await new Promise(r => setTimeout(r, 1000));
            showToast(`Asset package compiled for ${currentLeadState.name}`, "success");

        } catch (e) {
            console.error(e);
            showToast("Pipeline execution error", "error");
        }
    };

    const handleAutoScout = async () => {
        // settings.apiKey check removed - relying on baked-in core

        setLoading(true);
        setLoadingStep(scanMode === 'zone' ? `Scanning Zone ${location}...` : `Scouting ${niche} in ${location}...`);

        try {
            let foundCount = 0;
            let firstLeadId: string | null = null;

            // Use streaming for instant results
            const allLeads = await GeminiService.scoutLeadsStreaming(
                settings.apiKey,
                niche,
                location,
                leadCount,
                scanMode,
                async (lead: Partial<Lead>) => {
                    // INSTANT CALLBACK - Lead appears immediately!
                    foundCount++;
                    setLoadingStep(`Found ${foundCount} prospect${foundCount > 1 ? 's' : ''}... Scanning for more...`);

                    const newLead: Lead = {
                        ...lead,
                        id: lead.id || crypto.randomUUID(),
                        status: lead.status || LeadStatus.SCOUTED,
                        createdAt: lead.createdAt || new Date().toISOString(),
                        painPoints: lead.painPoints || [],
                        competitors: lead.competitors || [],
                        messages: lead.messages || [],
                        calls: lead.calls || [],
                        techStack: lead.techStack || []
                    } as Lead;

                    await onUpdateLead(newLead);

                    // Select first lead found
                    if (!firstLeadId) {
                        firstLeadId = newLead.id;
                        setSelectedLeadId(newLead.id);
                    }

                    showToast(`🎯 Found: ${newLead.name}`, "success");
                }
            );

            if (allLeads.length > 0) {
                showToast(`Scan complete. Captured ${allLeads.length} prospects.`, "success");

                if (autoPipeline) {
                    setLoadingStep("Initializing Auto-Pipeline...");
                    for (const lead of allLeads) {
                        await runFullPipelineOnLead(lead as Lead);
                    }
                }
            } else {
                showToast("No prospects found. Try different parameters.", "warning");
            }
        } catch (e) {
            showToast("Engine scan failed.", "error");
            console.error("Scout error:", e);
        } finally {
            setLoading(false);
            setLoadingStep('');
        }
    };

    const handleDeepDive = async () => {
        if (!selectedLead || !settings.apiKey) return;
        setLoading(true);
        try {
            setLoadingStep("Scoring Lead & Analyzing Owner Psychology...");
            const dossierData = await GeminiService.generateDossier(settings.apiKey, selectedLead);
            const scoreData = await GeminiService.scoreLead(settings.apiKey, selectedLead);
            const competitors = await GeminiService.analyzeCompetitors(settings.apiKey, niche, location);

            const updatedLead: Lead = {
                ...selectedLead, ...dossierData, competitors,
                propensityScore: scoreData.score,
                psychologyProfile: scoreData.psychology,
                status: LeadStatus.DOSSIER_READY
            };
            await onUpdateLead(updatedLead);
            await triggerChain('On Deep Dive Completion');
        } catch (e) { console.error(e); } finally { setLoading(false); }
    };

    const handleGenerateStrategy = async () => {
        if (!selectedLead || !settings.apiKey) return;
        setLoading(true);
        try {
            const prd = await GeminiService.createPRD(settings.apiKey, selectedLead, selectedLead.competitors || [], activeAgent);
            const updatedLead = { ...selectedLead, prd, status: LeadStatus.STRATEGY_READY };
            await onUpdateLead(updatedLead);
            setActiveTab('strategy');
            await triggerChain('On PRD Completion');
        } catch (e) { console.error(e); } finally { setLoading(false); }
    };

    const handleBuildSite = async () => {
        if (!selectedLead || !settings.apiKey || !selectedLead.prd) return;
        setLoading(true);
        setLoadingStep(`Agent ${activeAgent?.name} is Building Multi-Page Site...`);
        try {
            const pages = await GeminiService.generateWebsiteCode(settings.apiKey, selectedLead, selectedLead.prd, activeAgent);
            const outreach = await GeminiService.generateOutreach(settings.apiKey, selectedLead, activeAgent);

            const updatedLead = {
                ...selectedLead,
                siteStructure: pages,
                generatedSiteCode: pages['index.html'],
                outreachEmailSubject: outreach.emailSubject,
                outreachEmailBody: outreach.emailBody,
                outreachSmsBody: outreach.smsBody,
                status: LeadStatus.OUTREACH_READY,
                dealValue: 750
            };
            await onUpdateLead(updatedLead);
            setActiveTab('preview');
            await triggerChain('On Asset Compilation');
        } catch (e) { console.error(e); } finally { setLoading(false); }
    };

    const handleSendOutreach = async () => {
        if (!selectedLead) return;
        onSendOutreach(selectedLead);
        setOutreachSent(true);
        await triggerChain('On Outreach Sent');
    };

    return (
        <div className="flex h-full bg-[#020408] text-slate-300 overflow-hidden">
            {/* Resizable Sidebar */}
            <div className={`transition-all duration-300 border-r border-white/5 bg-[#0a0c12]/80 backdrop-blur-xl flex flex-col h-full ${isSidebarCollapsed ? 'w-20' : 'w-96'}`}>

                {/* Sidebar Header */}
                <div className={`border-b border-white/5 transition-all duration-300 relative ${isSidebarCollapsed ? 'h-24 flex items-center justify-center p-0' : 'p-8'}`}>
                    {!isSidebarCollapsed ? (
                        <div className="animate-in fade-in duration-500">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-4 bg-purple-600 rounded-full shadow-[0_0_8px_rgba(147,51,234,0.5)]" />
                                    <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Deployment Index</h2>
                                </div>
                                <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-2 text-slate-500 hover:text-white transition-colors">
                                    <Minimize2 size={16} />
                                </button>
                            </div>
                            <h1 className="text-2xl font-black text-white tracking-tight leading-none mb-1 italic uppercase">Intelligence <span className="gradient-text">OS</span></h1>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Session:</span>
                                <select
                                    value={currentSessionId}
                                    onChange={(e) => onSwitchSession(e.target.value)}
                                    className="bg-transparent text-white text-[10px] font-black uppercase tracking-widest focus:outline-none cursor-pointer hover:text-purple-400 transition-colors"
                                >
                                    {sessions.map(s => <option key={s.id} value={s.id} className="bg-[#0a0c12] text-white font-black">{s.name}</option>)}
                                </select>
                            </div>
                        </div>
                    ) : (
                        <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-purple-400 hover:border-purple-500/50 transition-all shadow-xl">
                            <Maximize2 size={18} />
                        </button>
                    )}
                </div>

                {!isSidebarCollapsed && (
                    <div className="p-4 space-y-4 border-b border-white/5 bg-white/[0.02]">
                        {/* Compact Controls */}
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1 block">Target Location</label>
                                <div className="flex items-center bg-white/5 border border-white/10 rounded-lg group focus-within:border-purple-500/50 transition-all">
                                    <button
                                        onClick={handleUseMyLocation}
                                        disabled={isLocating}
                                        className="p-2 text-slate-600 hover:text-purple-500 transition-colors disabled:opacity-50"
                                        title="Use My Location"
                                    >
                                        {isLocating ? <Loader2 size={12} className="animate-spin" /> : <MapPin size={12} />}
                                    </button>
                                    <input
                                        value={location}
                                        onChange={e => setLocation(e.target.value)}
                                        className="w-full bg-transparent p-2 text-xs text-white focus:outline-none placeholder-slate-600 font-bold"
                                        placeholder="City, State or 'Accurate'"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1 block">Industry / Niche</label>
                                <div className="flex items-center bg-white/5 border border-white/10 rounded-lg group focus-within:border-purple-500/50 transition-all">
                                    <Target size={12} className="ml-2 text-slate-600 group-focus-within:text-purple-500" />
                                    <input
                                        value={niche}
                                        onChange={e => setNiche(e.target.value)}
                                        className="w-full bg-transparent p-2 text-xs text-white focus:outline-none placeholder-slate-600 font-bold"
                                        placeholder="Industry"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Lead Count Selector */}
                        <div>
                            <label className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1 block">Leads to Find</label>
                            <div className="flex items-center gap-2">
                                {[5, 10, 15, 25, 50].map(count => (
                                    <button
                                        key={count}
                                        onClick={() => setLeadCount(count)}
                                        className={`flex-1 py-1.5 text-[10px] font-black rounded-lg transition-all border ${leadCount === count
                                            ? 'border-purple-500/50 text-purple-400 bg-purple-500/10 shadow-[0_0_10px_rgba(147,51,234,0.15)]'
                                            : 'border-white/10 text-slate-500 bg-white/5 hover:border-white/20 hover:text-slate-300'
                                            }`}
                                    >
                                        {count}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex space-x-2">
                            <button onClick={() => setAutoPipeline(!autoPipeline)} className={`flex-1 border rounded-lg text-[10px] font-black tracking-widest py-2 transition-all uppercase ${autoPipeline ? 'border-purple-500/50 text-purple-400 bg-purple-500/10 shadow-[0_0_15px_rgba(147,51,234,0.1)]' : 'border-white/10 text-slate-500 bg-white/5 hover:border-white/20'}`}>
                                {autoPipeline ? 'FULL AUTO PIPE' : 'SCOUT ONLY'}
                            </button>
                            <button onClick={handleAutoScout} className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-black tracking-widest text-[10px] py-2 shadow-lg shadow-purple-500/20 active:scale-95 transition-all uppercase">
                                {loading ? <Loader2 className="animate-spin mx-auto" /> : 'IGNITE ENGINE'}
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
                    {!isSidebarCollapsed ? leads.map(lead => (
                        <LeadCard key={lead.id} lead={lead} isSelected={selectedLeadId === lead.id} onClick={() => setSelectedLeadId(lead.id)} />
                    )) : (
                        <div className="flex flex-col items-center space-y-4 pt-4">
                            {leads.map(lead => (
                                <div
                                    key={lead.id}
                                    onClick={() => setSelectedLeadId(lead.id)}
                                    className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${selectedLeadId === lead.id ? 'bg-purple-500 shadow-[0_0_10px_rgba(147,51,234,0.5)]' : 'bg-white/10 hover:bg-white/20'}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Main Workspace */}
            <div className="flex-1 flex flex-col bg-[#020408] relative">
                {loading && (
                    <div className="absolute inset-0 z-50 bg-[#020408]/60 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-500">
                        <NeuralLoader />
                        <div className="mt-12 text-center animate-pulse">
                            <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] mb-2 italic">Neural Ingestion Active</h3>
                            <p className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em] bg-purple-500/10 px-6 py-2 rounded-full border border-purple-500/20 shadow-lg shadow-purple-500/5">{loadingStep}</p>
                        </div>
                    </div>
                )}

                {selectedLead ? (
                    <>


                        {/* Header Actions */}
                        <div className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#0a0c12]/80 backdrop-blur-3xl z-30 sticky top-0">
                            <div className="flex items-center gap-6">
                                <div className="flex flex-col">
                                    <h2 className="text-lg font-black text-white uppercase italic tracking-tighter leading-none mb-1">{selectedLead.name}</h2>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full animate-pulse ${(selectedLead.status || LeadStatus.SCOUTED) === LeadStatus.OUTREACH_READY ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-purple-500 shadow-[0_0_8px_#a855f7]'}`} />
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">{(selectedLead.status ?? 'UNKNOWN').replace('_', ' ')}</span>
                                    </div>
                                </div>
                                <div className="w-px h-8 bg-white/5 mx-2" />
                                {/* Tabs */}
                                <div className="flex p-1 bg-white/5 rounded-2xl border border-white/5 overflow-hidden">
                                    {['dossier', 'strategy', 'preview', 'outreach'].map(tab => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`px-5 py-2 text-[10px] font-black rounded-xl uppercase transition-all tracking-[0.2em] relative ${activeTab === tab ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                                        >
                                            {activeTab === tab && (
                                                <motion.div layoutId="activeTab" className="absolute inset-0 bg-purple-600 rounded-xl -z-10 shadow-lg shadow-purple-500/20" />
                                            )}
                                            {tab === 'preview' ? 'Design' : tab === 'dossier' ? 'Research' : tab}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl group transition-all hover:border-purple-500/30">
                                    <Bot size={16} className="text-purple-500" />
                                    <select
                                        value={selectedAgentId}
                                        onChange={(e) => setSelectedAgentId(e.target.value)}
                                        className="bg-transparent text-[11px] font-black uppercase tracking-widest focus:outline-none cursor-pointer text-white pr-4 appearance-none"
                                    >
                                        {agents.map(a => <option key={a.id} value={a.id} className="bg-[#0a0c12] text-white font-black">{a.name}</option>)}
                                    </select>
                                </div>
                                <button
                                    onClick={() => runFullPipelineOnLead(selectedLead)}
                                    className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-purple-500/10 transition-all transform hover:scale-[1.02] active:scale-95 group overflow-hidden relative"
                                    title="Automate Entire Cycle"
                                >
                                    <Zap size={16} className="fill-current text-white animate-pulse" />
                                    <span>Deploy System</span>
                                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                                </button>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-hidden relative bg-[#020408]">
                            {activeTab === 'dossier' && (
                                <div className="p-10 overflow-y-auto h-full custom-scrollbar bg-[#020408]">
                                    <div className="max-w-6xl mx-auto space-y-10">

                                        {/* Row 1: High Level Metrics & Quick Actions */}
                                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                                            {/* Propensity Card */}
                                            <div className="bg-gradient-to-br from-purple-600/20 to-transparent border border-purple-500/30 rounded-3xl p-6 backdrop-blur-xl relative overflow-hidden group">
                                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
                                                    <Target size={80} className="text-white" />
                                                </div>
                                                <div className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-4">Neural Score</div>
                                                <div className="text-5xl font-black text-white tracking-tighter mb-2 italic">{selectedLead.propensityScore || (selectedLead.rating ? selectedLead.rating * 18 + Math.floor(Math.random() * 10) : '??')}%</div>
                                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Conversion Likelihood</div>
                                            </div>

                                            {/* Revenue Estimate Card */}
                                            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl relative group">
                                                <div className="text-[10px] font-black text-green-400 uppercase tracking-widest mb-4">Est. Revenue</div>
                                                <div className="text-3xl font-black text-white tracking-tight mb-2 uppercase">{selectedLead.revenueEstimate || 'CALCULATING'}</div>
                                                <div className="flex gap-1 mt-4">
                                                    {[1, 2, 3, 4, 5].map(i => (
                                                        <div key={i} className={`h-1 flex-1 rounded-full ${i <= 3 ? 'bg-green-500' : 'bg-white/10'}`} />
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Quick Actions Card */}
                                            <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl flex flex-col justify-between">
                                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Protocol Selection</div>
                                                <div className="flex gap-3">
                                                    {selectedLead.status === LeadStatus.SCOUTED && (
                                                        <button onClick={handleDeepDive} className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-purple-600/20 hover:border-purple-500/50 transition-all text-white group">
                                                            <Radar size={20} className="text-purple-500 group-hover:scale-110 transition-transform" />
                                                            <span className="text-[10px] font-black uppercase tracking-widest">Identify Owner</span>
                                                        </button>
                                                    )}
                                                    <button onClick={handleGenerateStrategy} className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-blue-600/20 hover:border-blue-500/50 transition-all text-white group">
                                                        <Brain size={20} className="text-blue-500 group-hover:scale-110 transition-transform" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest">Strategize</span>
                                                    </button>
                                                    <button onClick={handleBuildSite} className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-amber-600/20 hover:border-amber-500/50 transition-all text-white group">
                                                        <Code size={20} className="text-amber-500 group-hover:scale-110 transition-transform" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest">Build Site</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Row 2: Entity Intelligence & Tech */}
                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                            {/* Principal Surveillance */}
                                            <div className="lg:col-span-2 bg-white/5 border border-white/5 rounded-3xl overflow-hidden relative">
                                                <div className="p-8 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
                                                    <h3 className="text-sm font-black text-white uppercase italic tracking-widest flex items-center gap-3">
                                                        <User size={18} className="text-purple-500" /> Administrative Intelligence
                                                    </h3>
                                                    <div className="flex gap-2">
                                                        {selectedLead.socialMedia?.linkedin && (
                                                            <a href={selectedLead.socialMedia.linkedin} target="_blank" className="p-2 bg-blue-500/10 text-blue-400 rounded-xl hover:bg-blue-500/20 transition-all"><Search size={14} /></a>
                                                        )}
                                                        {selectedLead.socialMedia?.facebook && (
                                                            <a href={selectedLead.socialMedia.facebook} target="_blank" className="p-2 bg-blue-600/10 text-blue-600 rounded-xl hover:bg-blue-600/20 transition-all"><Users size={14} /></a>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="p-8 grid grid-cols-2 gap-8">
                                                    <div className="space-y-6">
                                                        <div>
                                                            <div className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Full Identity</div>
                                                            <div className="text-xl font-black text-white tracking-tighter uppercase">{selectedLead.ownerName || 'Detection Needed'}</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Direct Protocol</div>
                                                            <div className="text-sm font-bold text-slate-300 group cursor-pointer hover:text-purple-400 transition-colors flex items-center gap-2">
                                                                <Mail size={12} /> {selectedLead.ownerEmail || 'Email restricted'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/5 relative group">
                                                        <div className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                                                            <Zap size={10} className="text-amber-500" /> Psychology Fingerprint
                                                        </div>
                                                        <p className="text-xs text-slate-300 italic leading-relaxed font-bold">
                                                            "{selectedLead.psychologyProfile || 'Run research sequence to extract owner psychological triggers.'}"
                                                        </p>
                                                        <div className="absolute bottom-4 right-4 text-[7px] font-black text-slate-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Neural Class: A+</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Tech Orbit */}
                                            <div className="bg-white/5 border border-white/5 rounded-3xl p-8 backdrop-blur-md flex flex-col h-full">
                                                <h3 className="text-sm font-black text-white uppercase italic tracking-widest flex items-center gap-3 mb-8">
                                                    <Cpu size={18} className="text-blue-500" /> Tech Orbit
                                                </h3>
                                                <div className="flex-1 flex flex-col gap-3">
                                                    {selectedLead.techStack && selectedLead.techStack.length > 0 ? (
                                                        selectedLead.techStack.map((tech, i) => (
                                                            <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:border-blue-500/20 transition-all group">
                                                                <span className="text-[10px] font-black text-slate-300 group-hover:text-white uppercase tracking-widest">{tech}</span>
                                                                <CheckCircle2 size={12} className="text-blue-500" />
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border border-dashed border-white/10 rounded-2xl opacity-40">
                                                            <Layers size={32} className="mb-4 text-slate-600" />
                                                            <span className="text-[9px] font-black uppercase tracking-widest">No stack verified</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Row 3: Vulnerabilities & Competitive Landscape */}
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
                                            {/* Pain Points / Vulnerabilities */}
                                            <div className="bg-gradient-to-br from-red-600/5 to-transparent border border-red-500/10 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden">
                                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                                    <AlertTriangle size={120} className="text-red-500" />
                                                </div>
                                                <h3 className="text-sm font-black text-white uppercase italic tracking-widest flex items-center gap-3 mb-8">
                                                    <Radiation size={18} className="text-red-500" /> Core Vulnerabilities
                                                </h3>
                                                <div className="space-y-4">
                                                    {selectedLead.painPoints && selectedLead.painPoints.map((pain, i) => (
                                                        <div key={i} className="flex items-start gap-4 p-4 bg-red-500/5 rounded-2xl border border-red-500/10 hover:bg-red-500/10 transition-colors">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0 animate-pulse shadow-[0_0_8px_#ef4444]" />
                                                            <div className="text-[11px] font-black text-slate-300 uppercase tracking-tight leading-relaxed">{pain}</div>
                                                        </div>
                                                    ))}
                                                    {(!selectedLead.painPoints || selectedLead.painPoints.length === 0) && (
                                                        <div className="text-slate-500 text-xs font-black uppercase tracking-widest py-10 text-center border border-dashed border-white/5 rounded-2xl">Scanning for business friction...</div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Competitive Dominance */}
                                            <div className="bg-white/5 border border-white/5 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden h-full">
                                                <h3 className="text-sm font-black text-white uppercase italic tracking-widest flex items-center gap-3 mb-8">
                                                    <Radar size={18} className="text-amber-500" /> Sector Dominance
                                                </h3>
                                                <div className="space-y-4 h-[300px] overflow-y-auto custom-scrollbar pr-2">
                                                    {selectedLead.competitors?.map((c, i) => (
                                                        <div key={i} className="p-4 border border-white/10 bg-white/5 rounded-2xl hover:bg-white/10 transition-all flex justify-between items-center group">
                                                            <div className="flex-1">
                                                                <div className="text-[11px] font-black text-white uppercase tracking-tighter mb-1">{c.name}</div>
                                                                <div className="text-[10px] text-amber-500/70 font-bold leading-relaxed">{c.whyWinning}</div>
                                                            </div>
                                                            <Globe size={14} className="text-slate-600 group-hover:text-white transition-colors ml-4 shrink-0" />
                                                        </div>
                                                    ))}
                                                    {(!selectedLead.competitors || selectedLead.competitors.length === 0) && (
                                                        <div className="text-slate-500 text-xs font-black uppercase tracking-widest h-full flex items-center justify-center text-center border border-dashed border-white/5 rounded-2xl">Network empty. Competitors unknown.</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'strategy' && (
                                <StrategyEditor
                                    content={selectedLead.prd || "# Strategy Required\n\nInitialize the generation protocol to create a Product Requirements Document."}
                                    apiKey={settings.apiKey}
                                    agents={agents}
                                    onSave={async (newContent) => {
                                        await onUpdateLead({ ...selectedLead, prd: newContent });
                                        showToast("Intelligence Protocol Persisted", "success");
                                    }}
                                />
                            )}

                            {activeTab === 'preview' && (
                                <div className="absolute inset-0 bg-[#020408]">
                                    {selectedLead.siteStructure ? (
                                        <WebsiteBuilderView
                                            initialHtmlStructure={selectedLead.siteStructure}
                                            apiKey={settings.apiKey}
                                            agents={agents}
                                        />
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center text-slate-500">
                                            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/5 shadow-2xl">
                                                <Code size={44} className="text-slate-400" />
                                            </div>
                                            <h3 className="text-xl font-black text-white uppercase tracking-[0.2em] mb-4 italic">No Site Assets</h3>
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-8">Execute the build sequence to generate atomic high-fidelity code.</p>
                                            <button onClick={handleBuildSite} className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-purple-500/20 transition-all hover:scale-105 active:scale-95">Generate Asset Now</button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'invoice' && (
                                <div className="p-10 overflow-y-auto h-full custom-scrollbar flex items-center justify-center bg-slate-100">
                                    {selectedLead.invoice ? (
                                        <RevloInvoice
                                            clientName={selectedLead.name}
                                            amount={selectedLead.invoice.amount}
                                            status={selectedLead.invoice.status}
                                            referenceId={selectedLead.invoice.referenceId}
                                            date={new Date(selectedLead.invoice.date)}
                                            packageName={selectedLead.invoice.packageName}
                                            description={selectedLead.invoice.description}
                                        />
                                    ) : (
                                        <div className="text-center text-slate-400">
                                            <p className="font-bold uppercase tracking-widest text-xs">Run Pipeline to Generate Commercial Assets</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'outreach' && (
                                <div className="p-10 overflow-y-auto h-full custom-scrollbar">
                                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="bg-white/5 border border-white/5 p-8 rounded-3xl backdrop-blur-md shadow-2xl relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 -mr-16 -mt-16 rounded-full blur-2xl" />
                                            <div className="text-[10px] text-slate-500 uppercase mb-4 font-black tracking-widest flex items-center gap-3"><Mail className="w-5 h-5 text-blue-500" /> Outreach Payload</div>
                                            <div className="p-6 bg-black/50 rounded-2xl border border-white/5 text-sm text-slate-300 whitespace-pre-wrap leading-relaxed font-mono shadow-inner min-h-[300px]">{selectedLead.outreachEmailBody}</div>
                                        </div>
                                        <div className="flex flex-col justify-center items-center p-8 bg-white/5 border border-white/5 rounded-3xl backdrop-blur-md shadow-2xl relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 -mr-16 -mt-16 rounded-full blur-2xl" />
                                            <div className="mb-8 p-6 bg-green-500/10 text-green-400 rounded-3xl border border-green-500/20 shadow-lg shadow-green-500/10 group-hover:scale-110 transition-all">
                                                <Send size={40} />
                                            </div>
                                            <h3 className="text-2xl font-black text-white mb-3 uppercase italic tracking-tight">Deploy Sequence?</h3>
                                            <p className="text-slate-500 text-center mb-10 max-w-xs text-xs font-bold uppercase tracking-widest leading-relaxed">System will initiate high-precision outreach protocol via multi-channel matrix.</p>
                                            <button onClick={handleSendOutreach} className="w-full max-w-xs h-16 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-black rounded-2xl shadow-xl shadow-green-500/20 transition-all transform hover:scale-105 active:scale-95 uppercase tracking-[0.2em] text-[12px]">
                                                Execute Campaign
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-[#020408] relative overflow-hidden">
                        {/* Background Decoration */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[120px] -z-10" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] -z-10" />

                        <div className="w-28 h-28 bg-[#0a0c12] rounded-[32px] flex items-center justify-center mb-12 border border-white/10 shadow-2xl relative group overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Target size={44} className="text-purple-500 animate-pulse relative z-10" />
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full border-4 border-[#020408] shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                        </div>

                        <h2 className="text-3xl font-black text-white uppercase tracking-[0.4em] mb-6 italic">Neural Engine <span className="gradient-text">Standby</span></h2>
                        <p className="max-w-md mx-auto text-slate-500 font-black text-[10px] leading-relaxed uppercase tracking-[0.25em] opacity-80 mb-16">
                            Awaiting coordinate input or target selection to initialize high-fidelity research and deployment protocols.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl px-8">
                            {[
                                { icon: <Search size={28} />, title: "1. Scout Targets", desc: "Define your niche and location to populate the pipeline.", color: "group-hover:text-blue-500" },
                                { icon: <BarChart2 size={28} />, title: "2. Deep Dive", desc: "Execute atomic scoring and psychology profiling on a lead.", color: "group-hover:text-purple-500" },
                                { icon: <Zap size={28} />, title: "3. Chain Agents", desc: "Use handshake protocols to automate the entire build sequence.", color: "group-hover:text-amber-500" }
                            ].map((item, i) => (
                                <div key={i} className="p-8 bg-white/5 border border-white/5 rounded-3xl text-center hover:bg-white/[0.08] hover:border-white/10 transition-all group cursor-default shadow-xl">
                                    <div className={`mx-auto mb-6 text-slate-600 transition-all transform group-hover:scale-110 ${item.color}`}>
                                        {item.icon}
                                    </div>
                                    <h3 className="text-[11px] font-black uppercase text-white mb-3 tracking-widest">{item.title}</h3>
                                    <p className="text-[10px] text-slate-500 font-bold leading-relaxed uppercase tracking-tighter">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-24 flex items-center gap-6 text-slate-600">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] bg-white/5 border border-white/5 px-4 py-2 rounded-xl">Shift + S for Scout</span>
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] bg-white/5 border border-white/5 px-4 py-2 rounded-xl">Shift + A for Agents</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeadEngineView;

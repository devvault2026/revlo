import React, { useState, useEffect, useRef } from 'react';
import {
    Search, Crosshair, Target, Brain, Code, Send, CheckCircle2,
    Loader2, Users, FileText, Mail, MapPin,
    Plus, Play, Zap, Settings2, Radar, Bot, Layers, BarChart2, Maximize2, Minimize2, AlertTriangle
} from 'lucide-react';
import LeadCard from './LeadCard';
import WebsiteBuilderView from './WebsiteBuilderView';
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
    const [autoPipeline, setAutoPipeline] = useState(false);
    const [scanMode, setScanMode] = useState<'niche' | 'zone'>('niche');
    const [csvInput, setCsvInput] = useState('');
    const [manualQuery, setManualQuery] = useState('');

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

            currentLeadState = {
                ...currentLeadState,
                siteStructure: pages,
                generatedSiteCode: pages['index.html'], // Fallback for old views
                outreachEmailSubject: outreach.emailSubject,
                outreachEmailBody: outreach.emailBody,
                outreachSmsBody: outreach.smsBody,
                status: LeadStatus.OUTREACH_READY,
                dealValue: 750
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
        if (!settings.apiKey) {
            showToast("Configure AI API Key in Settings first.", "warning");
            return;
        }
        setLoading(true);
        setLoadingStep(scanMode === 'zone' ? `Scanning Zone ${location}...` : `Scouting ${niche} in ${location}...`);

        try {
            const found = await GeminiService.scoutLeads(settings.apiKey, niche, location, batchSize, scanMode);
            const newLeads = found as Lead[];
            for (const nL of newLeads) {
                await onUpdateLead(nL);
            }

            if (newLeads.length > 0) {
                showToast(`Scanned zone successfully. Found ${newLeads.length} prospects.`, "success");
                setSelectedLeadId(newLeads[0].id);
                if (autoPipeline) {
                    setLoadingStep("Initializing Auto-Pipeline...");
                    for (const lead of newLeads) { await runFullPipelineOnLead(lead); }
                }
            }
        } catch (e) {
            showToast("Engine scan failed.", "error");
        } finally { setLoading(false); setLoadingStep(''); }
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
        <div className="flex h-full bg-white text-slate-700 overflow-hidden">
            {/* Resizable Sidebar */}
            <div className={`transition-all duration-300 border-r border-slate-200 bg-white flex flex-col h-full ${isSidebarCollapsed ? 'w-20' : 'w-96'}`}>

                {/* Sidebar Header */}
                <div className={`border-b border-slate-100 bg-slate-50/30 transition-all duration-300 relative ${isSidebarCollapsed ? 'h-24 flex items-center justify-center p-0' : 'p-8'}`}>
                    {!isSidebarCollapsed ? (
                        <div className="animate-in fade-in duration-500">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-4 bg-purple-600 rounded-full" />
                                    <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Deployment Index</h2>
                                </div>
                                <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                                    <Minimize2 size={16} />
                                </button>
                            </div>
                            <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-1">Intelligence OS</h1>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Session:</span>
                                <select
                                    value={currentSessionId}
                                    onChange={(e) => onSwitchSession(e.target.value)}
                                    className="bg-transparent text-slate-900 text-[10px] font-black uppercase tracking-widest focus:outline-none cursor-pointer hover:text-purple-600 transition-colors"
                                >
                                    {sessions.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                </select>
                            </div>
                        </div>
                    ) : (
                        <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-purple-600 hover:border-purple-200 transition-all shadow-sm">
                            <Maximize2 size={18} />
                        </button>
                    )}
                </div>

                {!isSidebarCollapsed && (
                    <div className="p-4 space-y-4 border-b border-slate-200 bg-slate-50/50">
                        {/* Compact Controls */}
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="text-[10px] text-slate-500 uppercase font-bold">Target Location</label>
                                <div className="flex items-center bg-white border border-slate-200 rounded mt-1">
                                    <MapPin size={12} className="ml-2 text-slate-400" />
                                    <input
                                        value={location}
                                        onChange={e => setLocation(e.target.value)}
                                        className="w-full bg-transparent p-2 text-xs text-slate-900 focus:outline-none placeholder-slate-400"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] text-slate-500 uppercase font-bold">Industry / Niche</label>
                                <div className="flex items-center bg-white border border-slate-200 rounded mt-1">
                                    <Target size={12} className="ml-2 text-slate-400" />
                                    <input
                                        value={niche}
                                        onChange={e => setNiche(e.target.value)}
                                        className="w-full bg-transparent p-2 text-xs text-slate-900 focus:outline-none placeholder-slate-400"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-2">
                            <button onClick={() => setAutoPipeline(!autoPipeline)} className={`flex-1 border rounded text-[10px] font-bold py-2 ${autoPipeline ? 'border-purple-500 text-purple-600 bg-purple-50' : 'border-slate-300 text-slate-600 bg-white'}`}>
                                {autoPipeline ? 'FULL AUTO PIPE' : 'SCOUT ONLY'}
                            </button>
                            <button onClick={handleAutoScout} className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded font-bold text-xs py-2 shadow-lg">
                                {loading ? <Loader2 className="animate-spin mx-auto" /> : 'IGNITE ENGINE'}
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex-1 overflow-y-auto p-2 space-y-2">
                    {!isSidebarCollapsed ? leads.map(lead => (
                        <LeadCard key={lead.id} lead={lead} isSelected={selectedLeadId === lead.id} onClick={() => setSelectedLeadId(lead.id)} />
                    )) : (
                        <div className="flex flex-col items-center space-y-4 pt-4">
                            {leads.map(lead => (
                                <div
                                    key={lead.id}
                                    onClick={() => setSelectedLeadId(lead.id)}
                                    className={`w-3 h-3 rounded-full cursor-pointer ${selectedLeadId === lead.id ? 'bg-purple-600 ring-2 ring-purple-200' : 'bg-slate-300 hover:bg-slate-400'}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Main Workspace */}
            <div className="flex-1 flex flex-col bg-slate-50 relative">
                {loading && (
                    <div className="absolute inset-0 z-50 bg-white/20 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-500">
                        <NeuralLoader />
                        <div className="mt-12 text-center animate-pulse">
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.3em] mb-2">Neural Ingestion Active</h3>
                            <p className="text-[10px] font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-4 py-1.5 rounded-full border border-purple-100 shadow-sm">{loadingStep}</p>
                        </div>
                    </div>
                )}

                {selectedLead ? (
                    <>
                        {/* API Key Warning Banner */}
                        {!settings.apiKey && (
                            <div className="bg-amber-50 border-b border-amber-200 p-2 flex items-center justify-center gap-3">
                                <AlertTriangle size={14} className="text-amber-600" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-amber-800">Neural Configuration Required: Bridge Gemini 2.5 Flash in Settings to enable Engine operations</span>
                            </div>
                        )}

                        {/* Header Actions */}
                        <div className="h-14 border-b border-slate-200 flex items-center justify-between px-6 bg-white shadow-sm z-10">
                            <div className="flex items-center">
                                <h2 className="text-sm font-bold text-slate-900 mr-6">{selectedLead.name}</h2>
                                {/* Tabs */}
                                <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
                                    {['dossier', 'strategy', 'preview', 'outreach'].map(tab => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`px-3 py-1.5 text-[10px] font-bold rounded-md uppercase transition-all ${activeTab === tab ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                {/* Agent Personality Switcher */}
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg">
                                    <Bot size={14} className="text-purple-600" />
                                    <select
                                        value={selectedAgentId}
                                        onChange={(e) => setSelectedAgentId(e.target.value)}
                                        className="bg-transparent text-[10px] font-black uppercase tracking-widest focus:outline-none cursor-pointer text-slate-900 pr-4"
                                    >
                                        {agents.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                                    </select>
                                </div>
                                <div className="w-px h-6 bg-slate-200" />
                                {selectedLead.status === LeadStatus.SCOUTED && (
                                    <button onClick={handleDeepDive} className="p-2 text-slate-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="Deep Dive Analysis"><BarChart2 size={18} /></button>
                                )}
                                {selectedLead.status === LeadStatus.DOSSIER_READY && (
                                    <button onClick={handleGenerateStrategy} className="p-2 text-slate-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="Generate Strategy"><Brain size={18} /></button>
                                )}
                                {selectedLead.status === LeadStatus.STRATEGY_READY && (
                                    <button onClick={handleBuildSite} className="p-2 text-slate-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="Build Site"><Code size={18} /></button>
                                )}
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-hidden relative bg-slate-50">
                            {activeTab === 'dossier' && (
                                <div className="p-8 overflow-y-auto h-full">
                                    <div className="max-w-5xl mx-auto grid grid-cols-2 gap-8">
                                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                                            <h3 className="font-bold text-slate-900 mb-4 text-lg flex items-center gap-2"><Brain className="w-5 h-5 text-purple-500" /> Owner Intelligence</h3>
                                            <div className="space-y-4">
                                                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                                                    <div className="text-xs text-slate-500 uppercase font-bold mb-2">Psychology Profile</div>
                                                    <div className="text-sm text-slate-700 italic leading-relaxed">
                                                        "{selectedLead.psychologyProfile || 'Analysis pending...'}"
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                                            <h3 className="font-bold text-slate-900 mb-4 text-lg flex items-center gap-2"><Radar className="w-5 h-5 text-red-500" /> Market Threat</h3>
                                            {selectedLead.competitors?.map((c, i) => (
                                                <div key={i} className="mb-3 p-3 border-l-4 border-red-500 bg-red-50 rounded-r-lg">
                                                    <div className="text-sm font-bold text-slate-900">{c.name}</div>
                                                    <div className="text-xs text-slate-600">{c.whyWinning}</div>
                                                </div>
                                            ))}
                                            {!selectedLead.competitors && <div className="text-slate-500 text-sm">No competitor data.</div>}
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
                                <div className="absolute inset-0 bg-slate-100">
                                    {selectedLead.siteStructure ? (
                                        <WebsiteBuilderView
                                            initialHtmlStructure={selectedLead.siteStructure}
                                            apiKey={settings.apiKey}
                                            agents={agents}
                                        />
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center text-slate-400">
                                            <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mb-6">
                                                <Code size={40} className="text-slate-400" />
                                            </div>
                                            <p className="text-lg font-medium text-slate-600">No site asset generated yet.</p>
                                            <button onClick={handleBuildSite} className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold shadow-md transition-all">Generate Asset Now</button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'outreach' && (
                                <div className="p-8 overflow-y-auto h-full">
                                    <div className="max-w-5xl mx-auto grid grid-cols-2 gap-8">
                                        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
                                            <div className="text-xs text-slate-500 uppercase mb-2 font-bold flex items-center gap-2"><Mail className="w-4 h-4" /> Email Draft</div>
                                            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{selectedLead.outreachEmailBody}</div>
                                        </div>
                                        <div className="flex flex-col justify-center items-center p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
                                            <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-full">
                                                <Send size={32} />
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to Launch?</h3>
                                            <p className="text-slate-500 text-center mb-6 max-w-xs">This will initiate the automated outreach sequence via SendGrid & Twilio.</p>
                                            <button onClick={handleSendOutreach} className="w-full max-w-xs h-14 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-105">
                                                Deploy Campaign
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-white relative overflow-hidden">
                        {/* Background Decoration */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-50/50 rounded-full blur-3xl -z-10" />

                        <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mb-10 border border-slate-100 shadow-2xl relative">
                            <Target size={40} className="text-purple-600 animate-pulse" />
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
                        </div>

                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-[0.3em] mb-4">Neural Engine Standby</h2>
                        <p className="max-w-md mx-auto text-slate-500 font-bold text-xs leading-relaxed uppercase tracking-widest opacity-80 mb-12">
                            Awaiting coordinate input or target selection to initialize high-fidelity research and deployment protocols.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl px-4">
                            <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl text-center hover:bg-white hover:shadow-xl transition-all group">
                                <Search size={24} className="mx-auto mb-4 text-slate-400 group-hover:text-blue-600" />
                                <h3 className="text-[10px] font-black uppercase text-slate-900 mb-2">1. Scout Targets</h3>
                                <p className="text-[10px] text-slate-500 font-medium">Define your niche and location to populate the pipeline.</p>
                            </div>
                            <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl text-center hover:bg-white hover:shadow-xl transition-all group">
                                <BarChart2 size={24} className="mx-auto mb-4 text-slate-400 group-hover:text-purple-600" />
                                <h3 className="text-[10px] font-black uppercase text-slate-900 mb-2">2. Deep Dive</h3>
                                <p className="text-[10px] text-slate-500 font-medium">Execute atomic scoring and psychology profiling on a lead.</p>
                            </div>
                            <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl text-center hover:bg-white hover:shadow-xl transition-all group">
                                <Zap size={24} className="mx-auto mb-4 text-slate-400 group-hover:text-green-600" />
                                <h3 className="text-[10px] font-black uppercase text-slate-900 mb-2">3. Chain Agents</h3>
                                <p className="text-[10px] text-slate-500 font-medium">Use handshake protocols to automate the entire build sequence.</p>
                            </div>
                        </div>

                        <div className="mt-16 flex items-center gap-4 text-slate-400">
                            <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-lg">Shift + S for Scout</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-lg">Shift + A for Agents</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeadEngineView;

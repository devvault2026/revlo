import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lead } from '../types';
import {
    Users, Trash2, Send, CheckCircle2, AlertCircle, Loader2,
    Database, Zap, ArrowRight, ShieldCheck, BarChart3, Globe, Brain,
    Mail, Edit3, Rocket, Fingerprint, Activity, Sparkles, MessageSquare,
    ChevronRight, RefreshCcw, Save, X, Target
} from 'lucide-react';
import { generateOutreachEmail, OutreachPackage, sendZapierEmail } from '../services/outreachService';
import { deepEnrichLead } from '../services/enrichmentService';

interface CRMViewProps {
    selectedLeads: Lead[];
    onClose: () => void;
    onRemoveLead: (id: string) => void;
    onUpdateLead: (lead: Lead) => void;
}

const CRMView: React.FC<CRMViewProps> = ({ selectedLeads, onRemoveLead, onClose, onUpdateLead }) => {
    const [activeLeadId, setActiveLeadId] = useState<string | null>(selectedLeads[0]?.id || null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [processLabel, setProcessLabel] = useState("");
    const [drafts, setDrafts] = useState<Record<string, OutreachPackage>>({});
    const [zapierToken] = useState<string>("MjM4NDkwYzAtMDVlMi00MzNhLWI0MmQtY2M0YmFkNzFkNGJjOkRjOW1zYzJndndjMTJscUhCSmNvNWZWRGtNeVF5blhrTStHSGFPeFlwcTA9");

    const activeLead = selectedLeads.find(l => l.id === activeLeadId) || null;

    // Batch Research Logic
    const handleBatchResearch = async () => {
        setIsProcessing(true);
        setProcessLabel("Initiating Deep Recon...");

        for (const lead of selectedLeads) {
            if (!lead.isEnriched) {
                try {
                    setProcessLabel(`Enriching ${lead.businessName}...`);
                    const dossier = await deepEnrichLead(lead);
                    onUpdateLead({ ...lead, dossier, isEnriched: true });
                } catch (e) {
                    console.error("Research failed for", lead.businessName);
                }
            }
        }

        setIsProcessing(false);
        setProcessLabel("");
    };

    // Batch Outreach Forging
    const handleBatchForge = async () => {
        setIsProcessing(true);
        setProcessLabel("Forging Sovereign Outreach...");

        for (const lead of selectedLeads) {
            try {
                setProcessLabel(`Crafting for ${lead.businessName}...`);
                const pkg = await generateOutreachEmail(lead);
                setDrafts(prev => ({ ...prev, [lead.id]: pkg }));
            } catch (e) {
                console.error("Forge failed for", lead.businessName);
            }
        }

        setIsProcessing(false);
        setProcessLabel("");
    };

    // Batch Send via Zapier
    const handleBatchSend = async () => {
        setIsProcessing(true);
        setProcessLabel("Transmitting via Zapier SSL...");

        for (const lead of selectedLeads) {
            const draft = drafts[lead.id];
            if (draft && lead.outreachStatus !== 'sent') {
                try {
                    setProcessLabel(`Sending to ${lead.businessName}...`);
                    await sendZapierEmail(draft, lead, zapierToken);
                    onUpdateLead({ ...lead, outreachStatus: 'sent', sentAt: Date.now() });
                } catch (e) {
                    console.error("Send failed for", lead.businessName);
                }
            }
        }

        setIsProcessing(false);
        setProcessLabel("");
    };

    const handleIndividualResearch = async (lead: Lead) => {
        setIsProcessing(true);
        setProcessLabel(`Deep Scanning ${lead.businessName}...`);
        try {
            const dossier = await deepEnrichLead(lead);
            onUpdateLead({ ...lead, dossier, isEnriched: true });
        } catch (e) {
            console.error("Research failed for", lead.businessName);
        }
        setIsProcessing(false);
        setProcessLabel("");
    };

    const handleIndividualForge = async (lead: Lead) => {
        setIsProcessing(true);
        setProcessLabel(`Forging for ${lead.businessName}...`);
        try {
            const pkg = await generateOutreachEmail(lead);
            setDrafts(prev => ({ ...prev, [lead.id]: pkg }));
        } catch (e) {
            console.error("Forge failed for", lead.businessName);
        }
        setIsProcessing(false);
        setProcessLabel("");
    };

    const handleIndividualSend = async (lead: Lead) => {
        const draft = drafts[lead.id];
        if (!draft) return;
        setIsProcessing(true);
        setProcessLabel(`Transmitting to ${lead.businessName}...`);
        try {
            await sendZapierEmail(draft, lead, zapierToken);
            onUpdateLead({ ...lead, outreachStatus: 'sent', sentAt: Date.now() });
        } catch (e) {
            console.error("Send failed for", lead.businessName);
        }
        setIsProcessing(false);
        setProcessLabel("");
    };

    const updateDraft = (leadId: string, updates: Partial<OutreachPackage>) => {
        setDrafts(prev => ({
            ...prev,
            [leadId]: { ...prev[leadId], ...updates }
        }));
    };

    return (
        <div className="flex flex-col h-full bg-[#030304] border-l border-white/5 relative z-50">
            {/* Header */}
            <div className="h-20 shrink-0 border-b border-white/5 flex items-center px-10 justify-between bg-black/40 backdrop-blur-xl sticky top-0 z-30">
                <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-purple-500/10 rounded-xl border border-purple-500/20">
                        <Rocket className="w-5 h-5 text-purple-500" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em] mb-1 leading-none">Campaign Architect</span>
                        <h2 className="text-xl font-black italic uppercase tracking-tighter text-white leading-none">OUTREACH <span className="text-purple-500">COMMAND</span></h2>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleBatchResearch}
                        disabled={isProcessing || selectedLeads.length === 0}
                        className="h-10 px-4 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2"
                    >
                        <Brain className="w-3.5 h-3.5" />
                        Bulk Research
                    </button>
                    <button
                        onClick={handleBatchForge}
                        disabled={isProcessing || selectedLeads.length === 0}
                        className="h-10 px-4 bg-purple-500/10 border border-purple-500/20 rounded-xl text-[9px] font-black uppercase tracking-widest text-purple-400 hover:text-white hover:bg-purple-500 transition-all flex items-center gap-2"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        Forge Batch
                    </button>
                    <button
                        onClick={handleBatchSend}
                        disabled={isProcessing || selectedLeads.length === 0 || Object.keys(drafts).length === 0}
                        className="h-10 px-6 bg-emerald-500 text-black rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-emerald-400 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] active:scale-95"
                    >
                        <Send className="w-3.5 h-3.5" />
                        Deploy Campaign
                    </button>
                    <div className="w-px h-6 bg-white/10 mx-2" />
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/5 rounded-full transition-colors group"
                    >
                        <X className="w-5 h-5 text-slate-500 group-hover:text-white transition-all" />
                    </button>
                </div>
            </div>

            {/* Main Content Split View */}
            <div className="flex-1 flex overflow-hidden">

                {/* Left Column: Lead Queue */}
                <div className="w-80 shrink-0 border-r border-white/5 flex flex-col overflow-hidden bg-black/20">
                    <div className="p-6 border-b border-white/5">
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Active Queue ({selectedLeads.length})</span>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
                        {selectedLeads.map((lead) => (
                            <div
                                key={lead.id}
                                onClick={() => setActiveLeadId(lead.id)}
                                className={`w-full p-4 rounded-2xl border transition-all text-left flex items-center justify-between group cursor-pointer ${activeLeadId === lead.id
                                    ? 'bg-purple-500/10 border-purple-500/30'
                                    : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                                    }`}
                            >
                                <div className="flex flex-col min-w-0">
                                    <span className={`text-[10px] font-black italic uppercase truncate ${activeLeadId === lead.id ? 'text-white' : 'text-slate-400'}`}>
                                        {lead.businessName}
                                    </span>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[8px] font-bold text-slate-600 uppercase">{lead.industry}</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-800" />
                                        {lead.outreachStatus === 'sent' ? (
                                            <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                                                <CheckCircle2 className="w-2.5 h-2.5" /> Sent
                                            </span>
                                        ) : drafts[lead.id] ? (
                                            <span className="text-[8px] font-black text-purple-400 uppercase tracking-widest flex items-center gap-1">
                                                <Edit3 className="w-2.5 h-2.5" /> Draft Ready
                                            </span>
                                        ) : (
                                            <span className="text-[8px] font-black text-slate-700 uppercase tracking-widest">Awaiting Forge</span>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); onRemoveLead(lead.id); }}
                                    className="p-1.5 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Progress Bar Overlay */}
                    <AnimatePresence>
                        {isProcessing && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="p-6 bg-purple-600 text-white"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{processLabel}</span>
                                </div>
                                <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-white"
                                        animate={{ width: processLabel ? "60%" : "100%" }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Center: Email Architect */}
                <div className="flex-1 flex flex-col bg-black/40 relative">
                    {activeLead ? (
                        <div className="flex-1 flex flex-col overflow-hidden">
                            <div className="p-8 border-b border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => handleIndividualResearch(activeLead)}
                                        disabled={isProcessing}
                                        className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                                        title="Re-Scan Intelligence"
                                    >
                                        <RefreshCcw className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
                                    </button>
                                    <button
                                        onClick={() => handleIndividualForge(activeLead)}
                                        disabled={isProcessing}
                                        className="p-2.5 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400 hover:text-white hover:bg-purple-500 transition-all flex items-center gap-2"
                                        title="Forge Individual"
                                    >
                                        <Sparkles className="w-4 h-4" />
                                        <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Forge</span>
                                    </button>
                                    <button
                                        onClick={() => handleIndividualSend(activeLead)}
                                        disabled={isProcessing || !drafts[activeLead.id] || activeLead.outreachStatus === 'sent'}
                                        className={`p-2.5 rounded-xl transition-all flex items-center gap-2 ${activeLead.outreachStatus === 'sent'
                                            ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                            : 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                                            }`}
                                        title="Deploy Signal"
                                    >
                                        <Send className="w-4 h-4" />
                                        <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">
                                            {activeLead.outreachStatus === 'sent' ? 'Sent' : 'Deploy'}
                                        </span>
                                    </button>
                                    <div className="w-px h-6 bg-white/10 mx-2" />
                                    <div className="flex flex-col text-right">
                                        <h3 className="text-lg font-black italic uppercase text-white leading-none mb-1">Outreach <span className="text-purple-500">Architect</span></h3>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Target: {activeLead.businessName}</p>
                                    </div>
                                </div>

                                {activeLead.outreachStatus === 'sent' && (
                                    <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Campaign Delivered</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 overflow-y-auto custom-scrollbar p-10">
                                <div className="max-w-3xl mx-auto space-y-8">
                                    {/* Subject Line */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Psychological Hook (Subject)</label>
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                value={drafts[activeLead.id]?.subject || ""}
                                                onChange={(e) => updateDraft(activeLead.id, { subject: e.target.value })}
                                                placeholder="Subject Line will appear here after Forge..."
                                                className="w-full h-14 bg-white/[0.02] border border-white/10 rounded-2xl px-6 text-sm font-bold text-white focus:outline-none focus:border-purple-500/50 transition-all"
                                            />
                                            <Edit3 className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700 pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* Body Content */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Sovereign Content (Body)</label>
                                        <div className="relative group">
                                            <textarea
                                                value={drafts[activeLead.id]?.body || ""}
                                                onChange={(e) => updateDraft(activeLead.id, { body: e.target.value })}
                                                placeholder="Click 'Forge Batch' to generate hyper-personalized AI content..."
                                                className="w-full h-80 bg-white/[0.02] border border-white/10 rounded-3xl p-6 text-sm font-medium leading-normal text-slate-300 focus:outline-none focus:border-purple-500/50 transition-all custom-scrollbar resize-none"
                                            />
                                            <Edit3 className="absolute right-6 top-6 w-4 h-4 text-slate-800 pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* Intel Context Card */}
                                    <div className="p-8 bg-purple-500/5 border border-purple-500/10 rounded-3xl">
                                        <div className="flex items-center gap-3 mb-6">
                                            <Brain className="w-5 h-5 text-purple-400" />
                                            <span className="text-[11px] font-black text-purple-400 uppercase tracking-widest">Architectural Context</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-8">
                                            <div>
                                                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block mb-2">Primary Pain Point</span>
                                                <p className="text-xs font-bold text-slate-300 uppercase leading-relaxed">{activeLead.painPoints?.[0] || "Awaiting Reconstruction"}</p>
                                            </div>
                                            <div>
                                                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block mb-2">Revenue Leakage</span>
                                                <p className="text-xs font-bold text-emerald-500/80 italic">{activeLead.revenueLossEstimate || "Unknown Analysis"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-20 opacity-20">
                            <Target className="w-16 h-16 mb-6" />
                            <h3 className="text-2xl font-black italic uppercase tracking-tighter">No Active Target</h3>
                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] mt-2">Select a lead from the queue to start crafting</p>
                        </div>
                    )}
                </div>

                {/* Right Pane: Intelligence & Sources */}
                <div className="w-96 shrink-0 border-l border-white/5 flex flex-col bg-black/60 overflow-hidden">
                    <div className="p-8 border-b border-white/5">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recon Intel</span>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-6">
                        {activeLead?.dossier ? (
                            <>
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Business Overview</h4>
                                    <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                                        {activeLead.dossier.companyOverview}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Decision Maker</h4>
                                    <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                                            <Activity className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-white italic uppercase">{activeLead.dossier.ownerName || "Founder"}</p>
                                            <p className="text-[9px] font-bold text-slate-500 uppercase">{activeLead.dossier.ownerTitle || "Principal"}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-white/5">
                                    <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Zapier Dispatch Route</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center text-[10px]">
                                            <span className="text-slate-500 uppercase font-bold">Gmail Integration</span>
                                            <span className="text-emerald-500 font-black uppercase">Active</span>
                                        </div>
                                        <div className="flex justify-between items-center text-[10px]">
                                            <span className="text-slate-500 uppercase font-bold">Cold Email Policy</span>
                                            <span className="text-slate-300 font-black uppercase">Direct Personal</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center p-10 opacity-10">
                                <Fingerprint className="w-12 h-12 mb-4" />
                                <p className="text-[10px] font-black uppercase leading-loose">Deep Recon Data<br />Requires AI Initiation</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CRMView;

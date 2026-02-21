import React, { useState } from 'react';
import { Lead, LeadStage, EnrichmentJob, WebsitePRD } from '../types';
import { Phone, Globe, ShieldAlert, Zap, Mic, Mail, Facebook, Instagram, Linkedin, Link as LinkIcon, ScanSearch, Loader2, X, Target, User, Activity, Fingerprint, Maximize2, Minimize2, Star, CheckCircle2, ArrowRight, FileText, Palette, Send, Rocket, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import DossierPanel from './DossierPanel';
import { useAuth } from '../../../context/AuthContext';
import PRDPanel from './PRDPanel';
import { deepEnrichLead, getActiveJobs, subscribeToJobs } from '../services/enrichmentService';
import { generateWebsitePRD } from '../services/prdService';
import { generateDemoWebsite, saveDemoWebsite } from '../services/demoService';
import { generateOutreachEmail, OutreachPackage } from '../services/outreachService';
import { supabase } from '../../../lib/supabase';

interface KnowledgePanelProps {
  lead: Lead | null;
  onClose: () => void;
  onStartCoach: () => void;
  onDeepScan: (lead: Lead) => Promise<void>;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onUpdateLead: (lead: Lead) => void;
}

const KnowledgePanel: React.FC<KnowledgePanelProps> = ({ lead, onClose, onStartCoach, onDeepScan, isExpanded, onToggleExpand, onUpdateLead }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<'INTEL' | 'DOSSIER' | 'PRD' | 'WEB' | 'OUTREACH'>('INTEL');
  const [enrichmentError, setEnrichmentError] = useState<string | null>(null);
  const [outreachPackage, setOutreachPackage] = useState<OutreachPackage | null>(null);
  const [zapierToken, setZapierToken] = useState<string>("MjM4NDkwYzAtMDVlMi00MzNhLWI0MmQtY2M0YmFkNzFkNGJjOkRjOW1zYzJndndjMTJscUhCSmNvNWZWRGtNeVF5blhrTStHSGFPeFlwcTA9");
  const [isSending, setIsSending] = useState(false);
  const { user } = useAuth();
  const [outreachStatus, setOutreachStatus] = useState<'idle' | 'sending' | 'transmitted'>('idle');

  if (!lead) return null;

  const stages = [
    { key: LeadStage.SCOUTED, label: 'SCOUTED', icon: ScanSearch, color: 'text-purple-500' },
    { key: LeadStage.RESEARCH, label: 'RESEARCH', icon: Activity, color: 'text-blue-500' },
    { key: LeadStage.PRD, label: 'STRATEGY', icon: FileText, color: 'text-emerald-500' },
    { key: LeadStage.DESIGN, label: 'DESIGN', icon: Palette, color: 'text-fuchsia-500' },
    { key: LeadStage.OUTREACH, label: 'OUTREACH', icon: Send, color: 'text-orange-500' },
  ];

  const currentStageIndex = stages.findIndex(s => s.key === lead!.currentStage);

  const handleNextStage = async () => {
    if (!lead) return;
    setIsProcessing(true);
    setEnrichmentError(null);

    const nextStageMap: Record<LeadStage, LeadStage> = {
      [LeadStage.SCOUTED]: LeadStage.RESEARCH,
      [LeadStage.RESEARCH]: LeadStage.PRD,
      [LeadStage.PRD]: LeadStage.DESIGN,
      [LeadStage.DESIGN]: LeadStage.OUTREACH,
      [LeadStage.OUTREACH]: LeadStage.DONE,
      [LeadStage.DONE]: LeadStage.DONE,
    };

    const nextStage = nextStageMap[lead!.currentStage];

    // ENSURE CLOUD IDENTITY: Before doing PRD or Design, we MUST have a verified UUID in Supabase
    let currentId = lead.id;
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(currentId);
    const targetLead = lead; // Shadow for non-null access

    if (!isUuid && (lead!.currentStage === LeadStage.RESEARCH || lead!.currentStage === LeadStage.PRD)) {
      try {
        const { data: savedData } = await supabase
          .from('leads')
          .upsert({
            user_id: user?.id,
            name: lead!.businessName,
            industry: lead!.industry,
            location: lead!.location,
            website: lead!.website,
            status: lead!.currentStage
          }, { onConflict: 'name, location' })
          .select()
          .single();

        if (savedData) {
          currentId = savedData.id;
          const identityLead = { ...lead, id: currentId };
          onUpdateLead(identityLead);
          lead = identityLead;
        }
      } catch (e) {
        console.warn("Failed to secure cloud identity.");
      }
    }

    // INITIATE RESEARCH: Trigger the Deepseek + Brave Search deep enrichment
    if (lead.currentStage === LeadStage.SCOUTED) {
      setActiveTab('DOSSIER');
      try {
        const dossier = await deepEnrichLead(lead);

        // SYNC TO SUPABASE: Ensure the lead is persisted and we have a real UUID
        const { data: savedData, error: saveError } = await supabase
          .from('leads')
          .upsert({
            name: lead.businessName,
            industry: lead.industry,
            location: lead.location,
            website: lead.website,
            email: dossier.emailFound || lead.email,
            phone: dossier.phoneFound || lead.phoneNumber,
            status: nextStage,
            lead_score: dossier.opportunityScore || lead.leadScore,
            pain_points: dossier.painPoints
          }, { onConflict: 'name, location' })
          .select()
          .single();

        const updatedLead: Lead = {
          ...lead,
          id: savedData?.id || lead.id, // Replace temp ID with real UUID
          currentStage: nextStage,
          dossier,
          isEnriched: true,
          enrichmentStatus: 'complete',
          // Merge enriched data back into lead fields
          estimatedOwnerName: dossier.ownerName || lead.estimatedOwnerName,
          email: dossier.emailFound || lead.email,
          phoneNumber: dossier.phoneFound || lead.phoneNumber,
          painPoints: dossier.painPoints.length > 0 ? dossier.painPoints : lead.painPoints,
          suggestedPitch: dossier.tailoredPitch || lead.suggestedPitch,
          leadScore: dossier.opportunityScore || lead.leadScore,
          socials: {
            ...lead.socials,
            facebook: dossier.socialPresence.facebook || lead.socials?.facebook,
            instagram: dossier.socialPresence.instagram || lead.socials?.instagram,
            linkedin: dossier.socialPresence.linkedin || lead.socials?.linkedin,
            tiktok: dossier.socialPresence.tiktok || lead.socials?.tiktok,
          },
          gmbRating: dossier.reviewAnalysis.googleRating ?? lead.gmbRating,
          gmbReviewCount: dossier.reviewAnalysis.googleReviewCount ?? lead.gmbReviewCount,
        };
        onUpdateLead(updatedLead);
      } catch (err: any) {
        console.error('Deep enrichment failed:', err);
        setEnrichmentError(err.message || 'Enrichment pipeline failed');
        // Still advance stage but mark as failed
        onUpdateLead({ ...lead!, currentStage: nextStage, enrichmentStatus: 'failed' });
      }
      // GENERATE PRD: Trigger competitor analysis + Deepseek PRD generation
    } else if (lead.currentStage === LeadStage.RESEARCH) {
      setActiveTab('PRD');
      try {
        const prd = await generateWebsitePRD(lead);

        // SYNC PRD TO SUPABASE
        const { error: prdSaveError } = await supabase
          .from('leads')
          .update({
            prd: JSON.stringify(prd),
            status: nextStage,
            user_id: user?.id
          })
          .match({ id: lead.id });

        const updatedLead: Lead = {
          ...lead,
          currentStage: nextStage,
          prd,
        };
        onUpdateLead(updatedLead);
      } catch (err: any) {
        console.error('PRD generation failed:', err);
        setEnrichmentError(err.message || 'PRD generation pipeline failed');
        onUpdateLead({ ...lead, currentStage: nextStage });
      }
    } else if (lead.currentStage === LeadStage.PRD) {
      setActiveTab('WEB');
      try {
        if (!lead.prd) throw new Error("PRD must be generated before building demo.");
        const html = await generateDemoWebsite(lead, lead.prd);
        const slug = await saveDemoWebsite(lead.id, lead.businessName, html, user?.id);
        const updatedLead: Lead = {
          ...lead,
          currentStage: nextStage,
          generated_site_code: html,
          slug: slug
        };
        onUpdateLead(updatedLead);
      } catch (err: any) {
        console.error('Demo generation failed:', err);
        setEnrichmentError(err.message || 'Demo generation pipeline failed');
        onUpdateLead({ ...lead, currentStage: nextStage });
      }
    } else {
      // For other stages, keep existing behavior
      if (nextStage === LeadStage.OUTREACH) setActiveTab('OUTREACH');

      await new Promise(r => setTimeout(r, 1500));

      // SYNC STAGE UPDATE
      await supabase
        .from('leads')
        .update({ status: nextStage })
        .match({ id: lead.id });

      onUpdateLead({ ...lead, currentStage: nextStage });

      if (nextStage === LeadStage.RESEARCH && !lead.dossier) {
        setActiveTab('DOSSIER');
        await onDeepScan(lead);
      }
    }

    setIsProcessing(false);
  };

  const getButtonConfig = () => {
    switch (lead!.currentStage) {
      case LeadStage.SCOUTED: return { text: 'INITIATE RESEARCH', icon: Brain, tacticalClass: 'btn-tactical-purple' };
      case LeadStage.RESEARCH: return { text: 'GENERATE PRD', icon: FileText, tacticalClass: 'btn-tactical-emerald' };
      case LeadStage.PRD: return { text: 'CREATE DESIGN', icon: Palette, tacticalClass: 'btn-tactical-fuchsia' };
      case LeadStage.DESIGN: return { text: 'START OUTREACH', icon: Send, tacticalClass: 'btn-tactical-orange' };
      case LeadStage.OUTREACH: return { text: 'CAMPAIGN ACTIVE', icon: CheckCircle2, tacticalClass: 'btn-tactical' };
      default: return { text: 'MISSION COMPLETE', icon: CheckCircle2, tacticalClass: 'btn-tactical' };
    }
  };

  const btn = getButtonConfig();

  const socialLinks = [
    { key: 'facebook', icon: Facebook, color: 'text-blue-500', url: lead.socials?.facebook },
    { key: 'instagram', icon: Instagram, color: 'text-pink-500', url: lead.socials?.instagram },
    { key: 'linkedin', icon: Linkedin, color: 'text-blue-400', url: lead.socials?.linkedin },
    { key: 'tiktok', icon: Activity, color: 'text-white', label: 'TikTok', url: lead.socials?.tiktok },
    { key: 'x', icon: X, color: 'text-slate-200', url: lead.socials?.x },
  ].filter(s => s.url);

  return (
    <div
      className="bg-[#050507] h-full flex flex-col w-full relative"
    >
      {/* HEADER: MISSION CONTROL STYLE */}
      <div className="shrink-0 px-8 py-5 border-b border-white/5 bg-[#070709] flex items-center justify-between z-30">
        <div className="flex items-center gap-8">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1.5 opacity-60">
              <div className={`w-1.5 h-1.5 rounded-full ${lead.currentStage === LeadStage.DONE ? 'bg-green-500' : lead.dossier ? 'bg-blue-500 animate-pulse' : 'bg-red-500 animate-pulse'}`} />
              <span className="text-[7px] font-black uppercase tracking-[0.4em] text-slate-400">
                {lead.currentStage === LeadStage.DONE ? 'OPERATIONAL_READY' : 'ENGINE_STAGE: ' + lead.currentStage}
              </span>
            </div>
            <h2 className="text-lg font-black italic text-white uppercase tracking-tighter leading-none truncate max-w-[200px]">{lead.businessName}</h2>
          </div>

          <div className="h-10 w-px bg-white/5 mx-2" />

          {/* TABS - CLICKABLE ICONS VERSION */}
          <nav className="flex items-center gap-8">
            <button
              onClick={() => setActiveTab('INTEL')}
              className={`group flex flex - col items - center gap - 2 transition - all duration - 300`}
              title="Identity & Intel"
            >
              <Activity className={`w - 4.5 h - 4.5 transition - all duration - 500 ${activeTab === 'INTEL' ? 'text-white' : 'text-slate-600 group-hover:text-slate-400'} `} />
              <div className={`h - 0.5 rounded - full bg - purple - 500 transition - all duration - 500 ${activeTab === 'INTEL' ? 'w-4 opacity-100' : 'w-0 opacity-0'} `} />
            </button>

            <button
              onClick={() => setActiveTab('DOSSIER')}
              className={`group flex flex - col items - center gap - 2 transition - all duration - 300 relative`}
              title="Intelligence Dossier"
            >
              <Brain className={`w - 4.5 h - 4.5 transition - all duration - 500 ${activeTab === 'DOSSIER' ? 'text-white' : lead.dossier ? 'text-purple-500/60 group-hover:text-purple-400' : 'text-slate-700'} `} />
              <div className={`h - 0.5 rounded - full bg - purple - 500 transition - all duration - 500 ${activeTab === 'DOSSIER' ? 'w-4 opacity-100' : 'w-0 opacity-0'} `} />
              {lead.dossier && activeTab !== 'DOSSIER' && (
                <div className="absolute -top-1 -right-1 w-1 h-1 bg-green-500 rounded-full shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('PRD')}
              className={`group flex flex - col items - center gap - 2 transition - all duration - 300 relative`}
              title="Strategy & PRD"
            >
              <FileText className={`w - 4.5 h - 4.5 transition - all duration - 500 ${activeTab === 'PRD' ? 'text-white' : lead.prd ? 'text-emerald-500/60 group-hover:text-emerald-400' : 'text-slate-700'} `} />
              <div className={`h - 0.5 rounded - full bg - emerald - 500 transition - all duration - 500 ${activeTab === 'PRD' ? 'w-4 opacity-100' : 'w-0 opacity-0'} `} />
              {lead.prd && activeTab !== 'PRD' && (
                <div className="absolute -top-1 -right-1 w-1 h-1 bg-emerald-500 rounded-full shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('WEB')}
              className={`group flex flex - col items - center gap - 2 transition - all duration - 300`}
              title="Website Scan & Generate"
            >
              <Globe className={`w - 4.5 h - 4.5 transition - all duration - 500 ${activeTab === 'WEB' ? 'text-white' : 'text-slate-600 group-hover:text-slate-400'} `} />
              <div className={`h - 0.5 rounded - full bg - purple - 500 transition - all duration - 500 ${activeTab === 'WEB' ? 'w-4 opacity-100' : 'w-0 opacity-0'} `} />
            </button>

            <button
              onClick={() => setActiveTab('OUTREACH')}
              className={`group flex flex - col items - center gap - 2 transition - all duration - 300 relative`}
              title="Outreach Campaign"
            >
              <Send className={`w - 4.5 h - 4.5 transition - all duration - 500 ${activeTab === 'OUTREACH' ? 'text-white' : 'text-slate-600 group-hover:text-slate-400'} `} />
              <div className={`h - 0.5 rounded - full bg - orange - 500 transition - all duration - 500 ${activeTab === 'OUTREACH' ? 'w-4 opacity-100' : 'w-0 opacity-0'} `} />
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* PROGRESS STEPS (Condensed for space in non-expanded view) */}
          {!isExpanded && (
            <button
              onClick={handleNextStage}
              disabled={isProcessing || lead.currentStage === LeadStage.DONE}
              className={`btn - launch - next group / launch min - w - [110px] justify - center transition - all duration - 500 ${isProcessing ? 'opacity-90' : ''} `}
            >
              <svg height={18} width={18} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={`text - white / 80 group - hover / launch: text - white transition - all duration - 500 ${isProcessing ? 'animate-pulse' : ''} `}>
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="currentColor" />
              </svg>
              <div className="flex items-center gap-1 w-[45px] justify-center">
                {isProcessing ? (
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        className="w-1 h-1 bg-white rounded-full"
                      />
                    ))}
                  </div>
                ) : (
                  <span>NEXT</span>
                )}
              </div>
            </button>
          )}

          <div className="h-6 w-px bg-white/5 mx-1" />

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleExpand}
              className="w-10 h-10 flex items-center justify-center bg-white/[0.03] text-slate-500 hover:text-white hover:bg-white/[0.08] rounded-xl border border-white/5 transition-all duration-300"
              title={isExpanded ? "Collapse View" : "Expand Workspace"}
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl border border-red-500/20 transition-all duration-300 shadow-lg shadow-red-900/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Enrichment Error Banner */}
      {enrichmentError && (
        <div className="px-8 py-3 bg-red-500/10 border-b border-red-500/20 flex items-center gap-3">
          <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" />
          <span className="text-[10px] font-bold text-red-400">{enrichmentError}</span>
          <button onClick={() => setEnrichmentError(null)} className="ml-auto text-red-500 hover:text-white">
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto custom-scrollbar bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.03),transparent)]">

        {activeTab === 'PRD' ? (
          <div className={`${isExpanded ? 'max-w-6xl mx-auto' : ''} `}>
            {lead.prd ? (
              <PRDPanel prd={lead.prd} />
            ) : isProcessing && lead.currentStage === LeadStage.RESEARCH ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-12">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full animate-pulse" />
                  <Loader2 className="w-20 h-20 text-purple-600/40 animate-spin relative z-10" />
                </div>
                <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter mb-3">Compiling Strategy...</h3>
                <p className="text-[10px] text-purple-400/60 max-w-xs leading-relaxed uppercase font-black tracking-[0.2em] mb-8">
                  Analyzing competitor infrastructure & synthesizing $25k-grade website PRD via Deepseek V3
                </p>
                <div className="flex gap-2">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      className="w-1.5 h-1.5 bg-purple-500 rounded-full"
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-12">
                <FileText className="w-20 h-20 text-slate-800 mb-6" />
                <h3 className="text-lg font-black italic text-white/30 uppercase tracking-tight mb-3">No PRD Generated</h3>
                <p className="text-[11px] text-slate-600 max-w-sm leading-relaxed">
                  {lead.dossier
                    ? 'Use the Command Bar below to initiate competitor analysis and generate a comprehensive website PRD.'
                    : 'Complete the Research phase first to build a dossier, then you can generate a full website PRD.'}
                </p>
              </div>
            )}
          </div>
        ) : activeTab === 'DOSSIER' ? (
          <div className={`p - 8 lg: p - 12 ${isExpanded ? 'max-w-5xl mx-auto' : ''} `}>
            {lead.dossier ? (
              <DossierPanel dossier={lead.dossier} businessName={lead.businessName} />
            ) : isProcessing && lead.currentStage === LeadStage.SCOUTED ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-12">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full animate-pulse" />
                  <Brain className="w-20 h-20 text-blue-600/40 animate-pulse relative z-10" />
                </div>
                <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter mb-3">Building Intelligence...</h3>
                <p className="text-[10px] text-blue-400/60 max-w-xs leading-relaxed uppercase font-black tracking-[0.2em] mb-8">
                  Infiltrating social networks & parsing local market benchmarks via Brave Search
                </p>
                <div className="flex gap-2">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -10, 0], opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      className="w-1.5 h-1.5 bg-blue-500 rounded-full"
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-12">
                <Brain className="w-20 h-20 text-slate-800 mb-6" />
                <h3 className="text-lg font-black italic text-white/30 uppercase tracking-tight mb-3">No Dossier Available</h3>
                <p className="text-[11px] text-slate-600 max-w-sm leading-relaxed">
                  Initiate "Deep Research" via the Command Bar to build a comprehensive intelligence dossier for this lead.
                </p>
              </div>
            )}
          </div>
        ) : activeTab === 'INTEL' ? (
          <div className={`p - 8 lg: p - 12 ${isExpanded ? 'max-w-7xl mx-auto' : ''} `}>
            {/* GRID SYSTEM: ADAPTS TO VIEWPORT */}
            <div className={`grid gap - 12 ${isExpanded ? 'grid-cols-3' : 'grid-cols-1'} `}>

              {/* COLUMN 1: IDENTITY & CONTACT */}
              <div className="space-y-10">
                <section>
                  <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-600 mb-6 flex items-center gap-3">
                    <Fingerprint className="w-3.5 h-3.5" /> Identity_Profile
                  </h3>
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-6">
                    <div>
                      <span className="text-[8px] font-bold text-slate-600 uppercase tracking-[0.2em] block mb-2 flex justify-between">
                        Auth_Decision_Maker
                        {lead.isEnriched && lead.estimatedOwnerName ? (
                          <span className="text-green-500 flex items-center gap-1"><ShieldAlert className="w-2 h-2" /> VERIFIED</span>
                        ) : !lead.estimatedOwnerName ? (
                          <span className="text-purple-500 animate-pulse">SCANNING...</span>
                        ) : null}
                      </span>
                      <div className="text-lg font-black text-white italic tracking-tight uppercase flex items-center gap-3">
                        <User className="w-4 h-4 text-purple-500" />
                        {lead.estimatedOwnerName || '----'}
                      </div>
                    </div>

                    <div className="h-px bg-white/5" />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[8px] font-bold text-slate-600 uppercase tracking-[0.2em] block mb-2">Direct_Comm</span>
                        <a href={`tel:${lead.phoneNumber} `} className="text-[11px] font-mono font-bold text-blue-400 hover:text-white transition-colors block truncate">
                          {lead.phoneNumber || 'SIGNAL_LOST'}
                        </a>
                      </div>
                      <div>
                        <span className="text-[8px] font-bold text-slate-600 uppercase tracking-[0.2em] block mb-2">Intel_Origin</span>
                        <a href={`mailto:${lead.email} `} className="text-[11px] font-mono font-bold text-purple-400 hover:text-white transition-colors block truncate">
                          {lead.email || 'TRACE_FAILED'}
                        </a>
                      </div>
                    </div>

                    {socialLinks.length > 0 && (
                      <div className="pt-2">
                        <span className="text-[8px] font-bold text-slate-600 uppercase tracking-[0.2em] block mb-4">Network_Links</span>
                        <div className="flex gap-2">
                          {socialLinks.map((s) => (
                            s.url && s.url.length > 5 ? (
                              <a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center bg-white/[0.03] rounded-lg border border-white/5 hover:border-purple-500/50 hover:bg-purple-500/10 text-slate-500 hover:text-white transition-all">
                                <s.icon className="w-3.5 h-3.5" />
                              </a>
                            ) : null
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                <section>
                  <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-500 mb-6 flex items-center gap-3">
                    <Star className="w-3.5 h-3.5" /> GMB_Forensics
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl">
                      <span className="text-[8px] font-bold text-slate-600 uppercase tracking-[0.2em] block mb-2">Market_Rating</span>
                      <div className="flex items-end gap-2">
                        <span className="text-2xl font-black text-white italic leading-none">{lead.gmbRating || '0.0'}</span>
                        <div className="flex gap-0.5 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-2.5 h-2.5 ${(lead!.gmbRating || 0) > i ? 'text-yellow-500 fill-yellow-500' : 'text-white/10'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl">
                      <span className="text-[8px] font-bold text-slate-600 uppercase tracking-[0.2em] block mb-2">Social_Proof</span>
                      <div className="text-2xl font-black text-white italic leading-none truncate">
                        {lead.gmbReviewCount?.toLocaleString() || 'NODATA'}
                        <span className="text-[9px] text-slate-600 ml-2 uppercase tracking-tighter not-italic">Reviews</span>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-600 mb-6 flex items-center gap-3">
                    <Activity className="w-3.5 h-3.5" /> Threat_Level
                  </h3>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl text-center">
                      <div className="text-xl font-black italic text-white mb-1">{lead.leadScore}</div>
                      <div className="text-[7px] font-black text-slate-600 uppercase tracking-widest">Score</div>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl text-center col-span-3 flex flex-col justify-center items-start px-6">
                      <div className={`text-[10px] font-black uppercase tracking-widest ${lead!.digitalMaturity === 'Critical' ? 'text-red-500' : 'text-purple-400'}`}>
                        {lead!.digitalMaturity}_Maturity
                      </div>
                      <div className="text-[7px] font-bold text-slate-600 uppercase mt-1 tracking-tighter italic">Structural_Condition</div>
                    </div>
                  </div>
                </section>
              </div>

              {/* COLUMN 2: ANALYSIS & BLEED */}
              <div className="space-y-10">
                <section>
                  <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-red-500 mb-6 flex items-center gap-3">
                    <ShieldAlert className="w-3.5 h-3.5" /> Forensic_Defects
                  </h3>
                  <div className="space-y-2">
                    {lead.painPoints?.map((point, i) => (
                      <div key={i} className="bg-red-500/[0.03] border border-red-500/10 p-4 rounded-xl flex items-start gap-4 hover:bg-red-500/[0.05] transition-all">
                        <div className="w-1 h-1 rounded-full bg-red-600 mt-2 shrink-0 animate-pulse" />
                        <span className="text-[11px] font-bold text-slate-300 tracking-tight leading-relaxed">{point}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-orange-500 mb-6 flex items-center gap-3">
                    <Zap className="w-3.5 h-3.5" /> Revenue_Bleed_Metric
                  </h3>
                  <div className="bg-orange-500/5 border border-orange-500/10 p-8 rounded-3xl flex flex-col items-center justify-center text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.1),transparent)] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-4xl font-black italic text-orange-500 tracking-tighter mb-2 relative z-10 font-mono">
                      {lead.revenueLossEstimate || 'RECON_IN_PROGRESS'}
                    </span>
                    <p className="text-[9px] font-black text-orange-500/40 uppercase tracking-[0.3em] leading-tight relative z-10 max-w-[200px]">
                      Projected Annual Leak due to Infrastructure Deficit
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-green-500 mb-6 flex items-center gap-3">
                    <Activity className="w-3.5 h-3.5" /> Tactical_Execution_Plan
                  </h3>
                  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 px-3 py-1 bg-green-500/10 rounded-bl-xl border-b border-l border-green-500/20">
                      <span className="text-[8px] font-black uppercase tracking-widest text-green-400">{lead.serviceFit} Protocol</span>
                    </div>
                    <p className="text-[10px] font-medium text-slate-300 leading-relaxed mt-4 whitespace-pre-wrap font-mono">
                      {lead.suggestedWorkflow}
                    </p>
                  </div>
                </section>
              </div>

              {/* COLUMN 3: BENCHMARK & PITCH */}
              <div className={`space-y-10 ${isExpanded ? '' : 'lg:col-span-1'}`}>
                <section>
                  <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-500 mb-6 flex items-center gap-3">
                    <Target className="w-3.5 h-3.5" /> Market_Benchmark
                  </h3>
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
                    <div className="p-5 border-b border-white/5 bg-blue-500/[0.03]">
                      <span className="text-[8px] font-black text-blue-400 uppercase tracking-[0.3em] italic block">Sector_Leaders_Advantage</span>
                    </div>
                    <div className="p-6 space-y-4">
                      {lead.competitiveInsights?.competitorAdvantages?.map((adv, i) => (
                        <div key={i} className="flex items-start gap-3 text-[10px] font-bold text-slate-400 border-l-2 border-blue-500/30 pl-4 py-1">
                          {adv}
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-500 mb-6 flex items-center gap-3">
                    <Mic className="w-3.5 h-3.5" /> Pitch_Angle_Generator
                  </h3>
                  <div className="bg-[#0A0A0C] border border-purple-500/20 p-8 rounded-3xl relative group shadow-[0_0_40px_rgba(168,85,247,0.05)]">
                    <div className="absolute top-0 right-0 p-4 border-b border-l border-white/5 rounded-bl-2xl bg-white/[0.03] text-[7px] font-black text-purple-500 uppercase tracking-widest italic">
                      {lead.dossier ? 'AI_Enriched_Script' : 'High_Conversion_Script'}
                    </div>
                    <p className="text-sm text-slate-200 italic leading-relaxed relative z-10 font-serif">
                      "{lead.suggestedPitch}"
                    </p>
                    <div className="mt-8 flex gap-3">
                      <button
                        onClick={() => {
                          if (lead?.suggestedPitch) navigator.clipboard.writeText(lead.suggestedPitch);
                        }}
                        className="flex-1 py-3 bg-purple-500 text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-purple-600 transition-all font-sans"
                      >
                        Copy Dossier
                      </button>
                      <button onClick={() => lead && onDeepScan(lead)} className="flex-1 py-3 border border-white/10 text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                        {isProcessing ? <Loader2 className="w-3 h-3 animate-spin" /> : <ScanSearch className="w-3 h-3" />}
                        {isProcessing ? 'Scrutinizing...' : 'Forensic_Trace'}
                      </button>
                    </div>
                  </div>
                </section>
              </div>

            </div>
          </div>
        ) : activeTab === 'OUTREACH' ? (
          <div className={`p-8 lg:p-12 h-full flex flex-col ${isExpanded ? 'max-w-4xl mx-auto' : ''}`}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter mb-2">Strategic Outreach</h3>
                <p className="text-[10px] text-orange-500 font-black uppercase tracking-[0.2em]">Forging Irrefutable Offers via Personalization</p>
              </div>
              {!outreachPackage && (
                <button
                  onClick={async () => {
                    if (!lead) return;
                    setIsProcessing(true);
                    try {
                      const pkg = await generateOutreachEmail(lead);
                      setOutreachPackage(pkg);
                    } catch (e: any) {
                      setEnrichmentError(e.message);
                    } finally {
                      setIsProcessing(false);
                    }
                  }}
                  disabled={isProcessing}
                  className="px-6 py-3 bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-orange-500 transition-all flex items-center gap-3 shadow-[0_10px_30px_rgba(234,88,12,0.2)]"
                >
                  {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                  Generate Sovereign Campaign
                </button>
              )}
            </div>

            {outreachPackage ? (
              <div className="flex-1 flex flex-col gap-6 overflow-hidden">
                {/* EMAIL EDITOR */}
                <div className="bg-[#0A0A0C] border border-white/5 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
                  {/* Subject Line */}
                  <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center gap-4">
                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest shrink-0 w-12">Subject</span>
                    <input
                      type="text"
                      className="bg-transparent border-none text-white text-sm font-bold w-full focus:outline-none"
                      value={outreachPackage.subject}
                      onChange={(e) => setOutreachPackage({ ...outreachPackage, subject: e.target.value })}
                    />
                  </div>

                  {/* Body Text */}
                  <div className="flex-1 p-8">
                    <textarea
                      className="w-full h-full bg-transparent border-none text-slate-300 text-sm leading-relaxed focus:outline-none resize-none custom-scrollbar min-h-[300px]"
                      value={outreachPackage.body}
                      onChange={(e) => setOutreachPackage({ ...outreachPackage, body: e.target.value })}
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>

                  {/* Attachment Placeholder */}
                  <div className="p-4 bg-orange-500/5 border-t border-white/5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                      <Globe className="w-4 h-4 text-orange-500" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-white uppercase tracking-tight">Custom Demo Attached</span>
                      <span className="text-[7px] font-bold text-orange-500 opacity-60 uppercase">revlo.pro/demo/{lead.slug || 'active'}</span>
                    </div>
                  </div>
                </div>

                {/* ACTION BAR */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 px-6 py-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest mb-1">Targeting_Metric</span>
                      <span className="text-[10px] font-bold text-orange-500 uppercase font-mono">{outreachPackage.targetPainPoint}</span>
                    </div>
                    <div className="h-8 w-px bg-white/5 mx-4" />
                    <div className="flex flex-col">
                      <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest mb-1">Offer_Protocol</span>
                      <span className="text-[10px] font-bold text-emerald-500 uppercase font-mono">{outreachPackage.offerModel}</span>
                    </div>
                  </div>

                  <button
                    onClick={async () => {
                      if (!lead) return;
                      setIsSending(true);
                      setOutreachStatus('sending');
                      // Simulate Zapier Link Call
                      setTimeout(() => {
                        setIsSending(false);
                        setOutreachStatus('transmitted');
                        // After delay, reset or keep status
                        setTimeout(() => setOutreachStatus('idle'), 3000);
                      }, 2500);
                    }}
                    disabled={isSending || outreachStatus === 'transmitted'}
                    className={`h-full px-12 text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl active:scale-95 flex items-center gap-3 ${outreachStatus === 'transmitted' ? 'bg-green-600 text-white' : 'bg-white text-black hover:bg-orange-500 hover:text-white'
                      }`}
                  >
                    {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : outreachStatus === 'transmitted' ? <CheckCircle2 className="w-4 h-4" /> : <Rocket className="w-4 h-4" />}
                    {outreachStatus === 'transmitted' ? 'Campaign_Live' : isSending ? 'Transmitting...' : 'Deploy Campaign'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-30 group">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full group-hover:bg-orange-500/30 transition-all" />
                  <Mail className="w-24 h-24 text-orange-600/40 relative z-10" />
                </div>
                <h3 className="text-xl font-black italic text-white uppercase tracking-tighter mb-2">Campaign_Engine_Cold</h3>
                <p className="text-[10px] text-slate-500 max-w-[250px] uppercase font-black tracking-widest">Awaiting tactical generation command from command center</p>
              </div>
            )}
          </div>
        ) : activeTab === 'WEB' ? (
          <div className="h-full flex flex-col p-6 bg-black relative">
            {isProcessing && lead.currentStage === LeadStage.PRD && (
              <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center text-center p-12">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-fuchsia-500/20 blur-3xl rounded-full animate-pulse" />
                  <Palette className="w-20 h-20 text-fuchsia-600/40 animate-bounce relative z-10" />
                </div>
                <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter mb-3">Forging Irrefutable Design...</h3>
                <p className="text-[10px] text-fuchsia-400/60 max-w-xs leading-relaxed uppercase font-black tracking-[0.2em] mb-8">
                  Architecting premium static environment & injecting client DNA via Gemini 3 Pro
                </p>
                <div className="flex gap-2">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 2, 1], rotate: [0, 90, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                      className="w-2 h-2 bg-fuchsia-500 rounded-sm"
                    />
                  ))}
                </div>
              </div>
            )}
            <div className="flex-1 bg-white/[0.02] rounded-3xl border border-white/10 overflow-hidden relative group">
              {lead.generated_site_code ? (
                <iframe
                  srcDoc={lead.generated_site_code}
                  className="w-full h-full border-none"
                  title="Demo Preview"
                  sandbox="allow-scripts allow-forms allow-same-origin"
                />
              ) : lead.websitePreviewUrl ? (
                <iframe
                  src={lead.websitePreviewUrl}
                  className="w-full h-full border-none grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
                  title="Website Preview"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center">
                  <Globe className="w-16 h-16 text-slate-800 mb-6 animate-pulse" />
                  <span className="text-sm font-black uppercase tracking-widest text-slate-700">Digital_Vaccum_Detected</span>
                  <p className="text-[10px] text-slate-800 mt-2 uppercase tracking-widest">No existing web infrastructure found in sector scan</p>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                {lead.slug && (
                  <button
                    onClick={() => window.open(`/demo/${lead!.slug}`, '_blank')}
                    className="flex-1 py-4 bg-purple-600 text-white font-black uppercase text-[10px] tracking-widest rounded-xl shadow-2xl hover:bg-purple-500 transition-all transform hover:-translate-y-1"
                  >
                    Launch Live Deployment
                  </button>
                )}
                <button
                  onClick={() => window.open(lead!.websitePreviewUrl || '', '_blank')}
                  className="flex-1 py-4 bg-white/5 border border-white/10 text-white font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-white/10 transition-all"
                >
                  View Original Trace
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); border-radius: 10px; }
      `}</style>
      {/* FLOATING COMMAND BAR */}
      <div className="command-bar">
        <div className="flex flex-col">
          <span className="text-[7px] font-black uppercase tracking-[0.3em] text-slate-600 mb-0.5 leading-none">Intelligence_Link</span>
          <span className="text-[9px] font-bold text-slate-400 leading-none">Active Session</span>
        </div>
        <div className="w-px h-8 bg-white/10" />
        <button
          onClick={handleNextStage}
          disabled={isProcessing || lead.currentStage === LeadStage.DONE}
          className={`btn-tactical ${btn.tacticalClass} disabled:opacity-50 min-w-[200px] justify-center transition-all duration-300`}
        >
          {isProcessing && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
            />
          )}
          {isProcessing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <btn.icon className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          )}
          <span className="relative z-10">
            {isProcessing
              ? (lead.currentStage === LeadStage.SCOUTED ? 'DEEP SCANNING...' : lead.currentStage === LeadStage.RESEARCH ? 'BUILDING PRD...' : lead.currentStage === LeadStage.PRD ? 'DESIGNING DEMO...' : 'PROCESSING...')
              : btn.text}
          </span>
          {!isProcessing && lead.currentStage !== LeadStage.DONE && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
        </button>
      </div>
    </div>
  );
};

export default KnowledgePanel;
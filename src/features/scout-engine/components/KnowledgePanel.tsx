import React, { useState } from 'react';
import { Lead, LeadStage } from '../types';
import { Phone, Globe, ShieldAlert, Zap, Mic, Mail, Facebook, Instagram, Linkedin, Link as LinkIcon, ScanSearch, Loader2, X, Target, User, Activity, Fingerprint, Maximize2, Minimize2, Star, CheckCircle2, ArrowRight, FileText, Palette, Send } from 'lucide-react';
import { motion } from 'framer-motion';

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
  const [activeTab, setActiveTab] = useState<'INTEL' | 'WEB'>('INTEL');

  if (!lead) return null;

  const stages = [
    { key: LeadStage.SCOUTED, label: 'SCOUTED', icon: ScanSearch, color: 'text-purple-500' },
    { key: LeadStage.RESEARCH, label: 'RESEARCH', icon: Activity, color: 'text-blue-500' },
    { key: LeadStage.PRD, label: 'STRATEGY', icon: FileText, color: 'text-emerald-500' },
    { key: LeadStage.DESIGN, label: 'DESIGN', icon: Palette, color: 'text-fuchsia-500' },
    { key: LeadStage.OUTREACH, label: 'OUTREACH', icon: Send, color: 'text-orange-500' },
  ];

  const currentStageIndex = stages.findIndex(s => s.key === lead.currentStage);

  const handleNextStage = async () => {
    setIsProcessing(true);
    // Simulate AI processing
    await new Promise(r => setTimeout(r, 2000));

    const nextStageMap: Record<LeadStage, LeadStage> = {
      [LeadStage.SCOUTED]: LeadStage.RESEARCH,
      [LeadStage.RESEARCH]: LeadStage.PRD,
      [LeadStage.PRD]: LeadStage.DESIGN,
      [LeadStage.DESIGN]: LeadStage.OUTREACH,
      [LeadStage.OUTREACH]: LeadStage.DONE,
      [LeadStage.DONE]: LeadStage.DONE,
    };

    const nextStage = nextStageMap[lead.currentStage];
    onUpdateLead({ ...lead, currentStage: nextStage });
    setIsProcessing(false);

    if (nextStage === LeadStage.RESEARCH) {
      await onDeepScan(lead);
    }
  };

  const getButtonConfig = () => {
    switch (lead.currentStage) {
      case LeadStage.SCOUTED: return { text: 'INITIATE RESEARCH', icon: Activity, color: 'bg-blue-600' };
      case LeadStage.RESEARCH: return { text: 'GENERATE PRD', icon: FileText, color: 'bg-emerald-600' };
      case LeadStage.PRD: return { text: 'CREATE DESIGN', icon: Palette, color: 'bg-fuchsia-600' };
      case LeadStage.DESIGN: return { text: 'START OUTREACH', icon: Send, color: 'bg-orange-600' };
      case LeadStage.OUTREACH: return { text: 'CAMPAIGN ACTIVE', icon: CheckCircle2, color: 'bg-green-600' };
      default: return { text: 'MISSION COMPLETE', icon: CheckCircle2, color: 'bg-green-600' };
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
      <div className="shrink-0 px-8 py-6 border-b border-white/5 bg-black/40 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-2 h-2 rounded-full ${lead.currentStage === LeadStage.DONE ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`} />
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-500">
                {lead.currentStage === LeadStage.DONE ? 'OPERATIONAL_READY' : 'ENGINE_STAGE: ' + lead.currentStage}
              </span>
            </div>
            <h2 className="text-xl font-black italic text-white uppercase tracking-tighter leading-none">{lead.businessName}</h2>
          </div>

          <div className="h-10 w-px bg-white/5 mx-2" />

          {/* PROGRESS STEPS */}
          <div className="hidden lg:flex items-center gap-4">
            {stages.map((stage, idx) => {
              const Icon = stage.icon;
              const isActive = idx === currentStageIndex;
              const isCompleted = idx < currentStageIndex;
              return (
                <div key={stage.key} className="flex items-center gap-3">
                  <div className={`flex flex-col items-center gap-1.5 transition-all duration-500 ${isActive ? 'opacity-100 scale-110' : isCompleted ? 'opacity-50' : 'opacity-20'}`}>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${isActive ? `bg-white/10 ${stage.color} border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)]` : isCompleted ? 'border-green-500/30' : 'border-white/5'}`}>
                      {isCompleted ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Icon className={`w-4 h-4 ${isActive ? stage.color : 'text-slate-500'}`} />}
                    </div>
                    <span className="text-[7px] font-black tracking-widest uppercase">{stage.label}</span>
                  </div>
                  {idx < stages.length - 1 && (
                    <div className="w-6 h-px bg-white/5" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* DYNAMIC ACTION BUTTON */}
          <button
            onClick={handleNextStage}
            disabled={isProcessing || lead.currentStage === LeadStage.DONE}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-[10px] tracking-[0.15em] uppercase transition-all group overflow-hidden relative ${btn.color} text-white shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/10 hover:scale-[1.02] active:scale-95 disabled:opacity-50`}
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
            <span className="relative z-10">{isProcessing ? 'PROCESSING...' : btn.text}</span>
            {!isProcessing && lead.currentStage !== LeadStage.DONE && <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />}
          </button>

          <div className="h-8 w-px bg-white/5 mx-2" />

          <div className="flex gap-1 p-1 bg-white/[0.03] rounded-lg border border-white/5">
            <button
              onClick={() => setActiveTab('INTEL')}
              className={`text-[8px] font-black px-4 py-1.5 rounded-md tracking-widest uppercase transition-all ${activeTab === 'INTEL' ? 'bg-white text-black' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
            >
              DATA
            </button>
            <button
              onClick={() => setActiveTab('WEB')}
              className={`text-[8px] font-black px-4 py-1.5 rounded-md tracking-widest uppercase transition-all ${activeTab === 'WEB' ? 'bg-white text-black' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
            >
              WEB
            </button>
          </div>

          <button
            onClick={onToggleExpand}
            className="p-3 bg-white/[0.03] text-slate-500 hover:text-white rounded-xl border border-white/5 transition-all group"
            title={isExpanded ? "Collapse View" : "Expand Workspace"}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl border border-red-500/20 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.03),transparent)]">
        {activeTab === 'INTEL' ? (
          <div className={`p-8 lg:p-12 ${isExpanded ? 'max-w-7xl mx-auto' : ''}`}>
            {/* GRID SYSTEM: ADAPTS TO VIEWPORT */}
            <div className={`grid gap-12 ${isExpanded ? 'grid-cols-3' : 'grid-cols-1'}`}>

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
                        <a href={`tel:${lead.phoneNumber}`} className="text-[11px] font-mono font-bold text-blue-400 hover:text-white transition-colors block truncate">
                          {lead.phoneNumber || 'SIGNAL_LOST'}
                        </a>
                      </div>
                      <div>
                        <span className="text-[8px] font-bold text-slate-600 uppercase tracking-[0.2em] block mb-2">Intel_Origin</span>
                        <a href={`mailto:${lead.email}`} className="text-[11px] font-mono font-bold text-purple-400 hover:text-white transition-colors block truncate">
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
                            <Star key={i} className={`w-2.5 h-2.5 ${(lead.gmbRating || 0) > i ? 'text-yellow-500 fill-yellow-500' : 'text-white/10'}`} />
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
                      <div className={`text-[10px] font-black uppercase tracking-widest ${lead.digitalMaturity === 'Critical' ? 'text-red-500' : 'text-purple-400'}`}>
                        {lead.digitalMaturity}_Maturity
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
                      High_Conversion_Script
                    </div>
                    <p className="text-sm text-slate-200 italic leading-relaxed relative z-10 font-serif">
                      "{lead.suggestedPitch}"
                    </p>
                    <div className="mt-8 flex gap-3">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(lead.suggestedPitch);
                          // Optional: Add toast notification if available
                        }}
                        className="flex-1 py-3 bg-purple-500 text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-purple-600 transition-all font-sans"
                      >
                        Copy Dossier
                      </button>
                      <button onClick={() => onDeepScan(lead)} className="flex-1 py-3 border border-white/10 text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                        {isProcessing ? <Loader2 className="w-3 h-3 animate-spin" /> : <ScanSearch className="w-3 h-3" />}
                        {isProcessing ? 'Scrutinizing...' : 'Forensic_Trace'}
                      </button>
                    </div>
                  </div>
                </section>
              </div>

            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col p-6 bg-black">
            <div className="flex-1 bg-white/[0.02] rounded-3xl border border-white/10 overflow-hidden relative group">
              {lead.websitePreviewUrl ? (
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
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent flex gap-4">
                <button onClick={() => window.open(lead.websitePreviewUrl || '', '_blank')} className="flex-1 py-4 bg-white text-black font-black uppercase text-[10px] tracking-widest rounded-xl shadow-2xl hover:bg-purple-600 hover:text-white transition-all transform hover:-translate-y-1">Initialize Full External Access</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default KnowledgePanel;
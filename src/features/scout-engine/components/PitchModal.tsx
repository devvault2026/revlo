import React from 'react';
import { Lead } from '../types';
import { X, Copy, CheckCircle, Zap, Phone, Shield, Activity, Fingerprint, Cpu } from 'lucide-react';

interface PitchModalProps {
  lead: Lead | null;
  onClose: () => void;
}

const PitchModal: React.FC<PitchModalProps> = ({ lead, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!lead) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(lead.suggestedPitch);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-[#010103]/90 backdrop-blur-md">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-[2.5rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,1)] bg-[#070709] animate-fadeIn">

        {/* Scanline Effect Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[size:100%_2px,3px_100%] opacity-20" />

        {/* Header */}
        <div className="relative z-10 p-8 border-b border-white/5 bg-black/40 flex justify-between items-center backdrop-blur-3xl">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-red-600/10 rounded-2xl flex items-center justify-center border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
              <Shield className="w-7 h-7 text-red-500" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em]">Classified // Strategic Intel</span>
                <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
              </div>
              <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">
                Mission Briefing
              </h2>
            </div>
          </div>
          <button onClick={onClose} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all group">
            <X className="w-6 h-6 text-slate-500 group-hover:text-white transition-colors" />
          </button>
        </div>

        <div className="relative z-10 p-8 space-y-10 overflow-y-auto max-h-[70vh] custom-scrollbar">

          {/* Analysis Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Activity className="w-4 h-4 text-purple-400" />
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black">Digital Fingerprint Analysis</h3>
            </div>
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Fingerprint className="w-32 h-32 text-white" />
              </div>
              <p className="text-lg text-slate-300 leading-relaxed font-medium italic relative z-10">
                "{lead.onlinePresenceAnalysis}"
              </p>

              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                  <span className="text-[8px] text-slate-600 block uppercase font-black tracking-widest mb-2">Target Entity</span>
                  <span className="text-sm font-black text-white uppercase italic truncate block">
                    {lead.businessName}
                  </span>
                </div>
                <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                  <span className="text-[8px] text-slate-600 block uppercase font-black tracking-widest mb-2">Digital Maturity</span>
                  <span className={`text-sm font-black uppercase italic ${lead.digitalMaturity === 'Critical' ? 'text-red-500' : 'text-purple-400'}`}>
                    {lead.digitalMaturity}
                  </span>
                </div>
                <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                  <span className="text-[8px] text-slate-600 block uppercase font-black tracking-widest mb-2">Lead Score</span>
                  <span className="text-sm font-black text-white uppercase italic">
                    {lead.leadScore} / 100
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Pitch Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Cpu className="w-4 h-4 text-blue-400" />
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black">Execution Script // Cold Protocol</h3>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-5 py-2.5 text-[9px] font-black uppercase tracking-widest rounded-xl bg-white text-black hover:bg-purple-600 hover:text-white transition-all italic shadow-xl"
              >
                {copied ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied to Buffer' : 'Copy Protocol'}
              </button>
            </div>

            <div className="p-8 rounded-[2rem] bg-gradient-to-br from-slate-900 to-black border border-white/5 relative group shadow-inner">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 blur-3xl rounded-full" />
              <div className="relative z-10 whitespace-pre-wrap font-mono text-lg text-emerald-400/90 leading-relaxed">
                {lead.suggestedPitch || "Protocol Generation Failed. Re-run scan."}
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 opacity-20">
              <div className="h-px w-10 bg-white" />
              <span className="text-[8px] font-black uppercase tracking-[0.5em]">End Mission Intel</span>
              <div className="h-px w-10 bg-white" />
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-6 flex gap-6">
            <button onClick={onClose} className="flex-1 py-5 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-[0.2em] text-[10px] transition-all border border-white/5 italic">
              Abort Briefing
            </button>
            <a href={`tel:${lead.phoneNumber}`} className="flex-1 py-5 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-[0.2em] text-[10px] flex justify-center items-center gap-3 transition-all shadow-[0_0_30px_rgba(220,38,38,0.3)] italic">
              <Phone className="w-4 h-4" />
              Initiate Contact
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PitchModal;
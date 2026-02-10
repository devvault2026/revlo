import React from 'react';
import { Lead } from '../types';
import { MoreVertical, Globe, ShieldAlert, BarChart3, Lock, Target, ArrowRight, Activity, Mail, Phone, Star, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface LeadResultProps {
  lead: Lead;
  onSelect: (lead: Lead) => void;
  isSelected: boolean;
}

const LeadResult: React.FC<LeadResultProps> = ({ lead, onSelect, isSelected }) => {
  const hasEmail = lead.email && lead.email.includes('@');
  const hasPhone = lead.phoneNumber && lead.phoneNumber.length > 5;
  const hasSocials = Object.values(lead.socials || {}).some(v => !!v);

  return (
    <div
      onClick={() => onSelect(lead)}
      className={`group cursor-pointer w-full transition-all duration-300 border-b relative overflow-hidden backdrop-blur-sm pl-6 pr-8 py-5 flex items-center gap-6 ${isSelected
        ? 'bg-gradient-to-r from-purple-500/10 to-transparent border-purple-500/50'
        : 'bg-transparent border-white/5 hover:bg-white/[0.02] hover:border-white/10'
        }`}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <motion.div layoutId="selectionLine" className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.8)]" />
      )}

      {/* Main Status Icon - Larger and clearer */}
      <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-inner ${lead.website
        ? 'bg-purple-500/20 text-purple-300 shadow-purple-900/20'
        : 'bg-red-500/20 text-red-500 shadow-red-900/20 animate-pulse'
        }`}>
        {lead.website ? <Globe className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
      </div>

      {/* Business Identity */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-1">
          <h3 className={`font-sans font-black italic uppercase tracking-widest text-base truncate transition-colors ${isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
            {lead.businessName}
          </h3>
          {lead.digitalMaturity === 'Critical' && (
            <div className="px-2 py-0.5 rounded-sm bg-red-500/80 text-white text-[9px] font-black uppercase tracking-widest shadow-[0_0_10px_rgba(239,68,68,0.5)]">
              Critical
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 opacity-70 group-hover:opacity-100 transition-opacity">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{lead.industry}</span>
          <span className="w-1 h-1 rounded-full bg-slate-700" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-purple-400">{lead.location}</span>
        </div>
      </div>

      {/* Signal Grid - Cleaner icons */}
      <div className="flex items-center gap-6 shrink-0">
        <div className="flex gap-3 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
          <div className={`flex items-center gap-1 ${hasEmail ? 'text-purple-400' : 'text-slate-800'}`}>
            <Mail className="w-4 h-4" />
          </div>
          <div className={`flex items-center gap-1 ${hasPhone ? 'text-blue-400' : 'text-slate-800'}`}>
            <Phone className="w-4 h-4" />
          </div>
          <div className={`flex items-center gap-1 ${hasSocials ? 'text-fuchsia-400' : 'text-slate-800'}`}>
            <BarChart3 className="w-4 h-4" />
          </div>
        </div>

        {/* Score - More prominent */}
        <div className="text-right min-w-[60px] border-l border-white/10 pl-5 flex flex-col items-end">
          <div className={`font-sans text-2xl font-black italic leading-none shadow-black drop-shadow-lg ${lead.leadScore > 75 ? 'text-green-400' : lead.leadScore < 50 ? 'text-red-500' : 'text-white'}`}>
            {lead.leadScore}
          </div>
          <div className="text-[8px] font-black uppercase text-slate-600 tracking-wider mt-1">Score</div>
        </div>

        <ChevronRight className={`w-5 h-5 transition-all ${isSelected ? 'text-purple-500 translate-x-1' : 'text-slate-700 group-hover:text-white group-hover:translate-x-1'}`} />
      </div>
    </div>
  );
};

export default LeadResult;
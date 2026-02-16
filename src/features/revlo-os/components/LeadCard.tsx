import React from 'react';
import { Lead, LeadStatus } from '../types';
import { MapPin, Globe, AlertTriangle, CheckCircle, BarChart, Phone, User, TrendingUp, DollarSign } from 'lucide-react';

interface LeadCardProps {
  lead: Lead;
  isSelected: boolean;
  onClick: () => void;
}

const LeadCard: React.FC<LeadCardProps> = ({ lead, isSelected, onClick }) => {
  const hasWebsite = lead.website && lead.website.length > 0;

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border-2 cursor-pointer transition-all duration-500 relative overflow-hidden group flex flex-col min-h-[160px] ${isSelected
        ? 'bg-purple-600/10 border-purple-500 shadow-[0_0_30px_rgba(147,51,234,0.2)] -translate-y-1'
        : 'bg-[#0c0e14] border-white/5 hover:border-white/20 hover:bg-white/[0.04] hover:-translate-y-1 shadow-2xl'
        }`}
    >
      {/* Background Gradient Detail */}
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[80px] pointer-events-none transition-all duration-700 ${isSelected ? 'bg-purple-500/20' : 'bg-blue-500/5 group-hover:bg-purple-500/10'}`} />

      {/* Main Content Area */}
      <div className="p-5 flex-1 flex flex-col relative z-10">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-black text-white truncate text-xs uppercase tracking-tighter leading-none mb-1 group-hover:text-purple-400 transition-colors">
              {lead.name}
            </h3>
            <div className="flex items-center text-[9px] font-bold text-slate-500 tracking-tight italic">
              <MapPin size={10} className="mr-1 text-slate-600" />
              <span className="truncate">{(lead.address || 'Unknown Address').split(',')[0]}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 ml-2">
            <div className={`text-[8px] font-black px-2 py-0.5 rounded-lg border uppercase tracking-widest ${lead.propensityScore && lead.propensityScore > 70 ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'}`}>
              {lead.propensityScore ? `${lead.propensityScore}% MATCH` : 'NEW ENTRY'}
            </div>
            {!hasWebsite ? (
              <div className="flex items-center text-[7px] text-red-500 font-black tracking-[0.2em] uppercase bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-md">
                NO SITE
              </div>
            ) : (
              <div className="flex items-center text-[7px] text-blue-400 font-black tracking-[0.2em] uppercase bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-md">
                ACTIVE SITE
              </div>
            )}
          </div>
        </div>

        {/* Lead Intel Ribbon */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-2 p-1.5 bg-white/5 rounded-xl border border-white/5 group-hover:border-white/10 transition-all">
            <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
              <User size={10} className="text-blue-400" />
            </div>
            <div className="min-w-0">
              <div className="text-[7px] text-slate-600 font-black uppercase tracking-widest">Principal</div>
              <div className="text-[9px] text-white font-black truncate">{lead.ownerName || 'Unknown'}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-1.5 bg-white/5 rounded-xl border border-white/5 group-hover:border-white/10 transition-all">
            <div className="w-6 h-6 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
              <TrendingUp size={10} className="text-green-400" />
            </div>
            <div className="min-w-0">
              <div className="text-[7px] text-slate-600 font-black uppercase tracking-widest">Revenue</div>
              <div className="text-[9px] text-white font-black truncate">{lead.revenueEstimate || 'Scoping...'}</div>
            </div>
          </div>
        </div>

        {/* Dynamic Tags */}
        <div className="flex flex-wrap gap-1 mt-auto">
          {lead.techStack?.slice(0, 3).map((tech, i) => (
            <span key={i} className="text-[7px] font-black text-purple-400/70 px-1.5 py-0.5 bg-purple-500/5 rounded border border-purple-500/10 uppercase tracking-widest">
              {tech}
            </span>
          ))}
          {lead.painPoints?.slice(0, 1).map((point, i) => (
            <span key={i} className="text-[7px] font-black text-amber-500/70 px-1.5 py-0.5 bg-amber-500/5 rounded border border-amber-500/10 uppercase tracking-widest">
              {point.length > 15 ? point.substring(0, 15) + '...' : point}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Bar */}
      <div className={`px-5 py-2.5 border-t flex items-center justify-between relative z-10 transition-colors ${isSelected ? 'border-purple-500/20 bg-purple-500/5' : 'border-white/5 bg-black/40'}`}>
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${(lead.status || LeadStatus.SCOUTED) === LeadStatus.OUTREACH_READY ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-purple-500 shadow-[0_0_8px_#a855f7]'}`} />
          <span className={`text-[8px] font-black uppercase tracking-[0.2em] ${isSelected ? 'text-purple-400' : 'text-slate-500'}`}>
            {(lead.status || LeadStatus.SCOUTED) === LeadStatus.SCOUTED ? 'Intel Pending' : (lead.status || 'UNKNOWN').replace('_', ' ')}
          </span>
        </div>
        {lead.dealValue && (
          <div className="text-[9px] font-black text-white bg-white/5 px-2 py-0.5 rounded border border-white/5">
            ${lead.dealValue}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadCard;
import React from 'react';
import { Lead } from '../types';
import { MoreVertical, Globe, ShieldAlert, BarChart3, Lock } from 'lucide-react';

interface LeadResultProps {
  lead: Lead;
  onSelect: (lead: Lead) => void;
  isSelected: boolean;
}

const LeadResult: React.FC<LeadResultProps> = ({ lead, onSelect, isSelected }) => {
  return (
    <div 
      onClick={() => onSelect(lead)}
      className={`group cursor-pointer p-5 rounded-lg transition-all duration-300 border relative overflow-hidden ${
        isSelected 
          ? 'bg-revlo-card border-revlo-primary shadow-[0_0_15px_rgba(139,92,246,0.15)]' 
          : 'bg-revlo-card border-revlo-border hover:border-gray-600 hover:bg-[#141416]'
      }`}
    >
      {/* Selection Indicator Line */}
      {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1 bg-revlo-gradient"></div>}

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
           <div className={`w-8 h-8 rounded flex items-center justify-center ${lead.website ? 'bg-gray-800 text-revlo-accent' : 'bg-red-900/20 text-red-500'}`}>
              {lead.website ? <Globe className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
           </div>
           <div>
              <h3 className="font-display font-semibold text-lg text-white leading-none tracking-wide group-hover:text-revlo-primary transition-colors">
                {lead.businessName}
              </h3>
              <p className="text-xs text-revlo-muted mt-1">{lead.industry} • {lead.location}</p>
           </div>
        </div>
        <div className="text-right">
           <div className={`font-display text-2xl font-bold ${lead.leadScore > 80 ? 'text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500' : 'text-revlo-accent'}`}>
             {lead.leadScore}
           </div>
           <div className="text-[10px] uppercase text-gray-500 tracking-wider">Score</div>
        </div>
      </div>

      {/* Snippet Description */}
      <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-4 border-l-2 border-gray-800 pl-3">
        {lead.onlinePresenceAnalysis}
      </p>

      {/* Metadata Row */}
      <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
         <span className={`flex items-center gap-1.5 px-2 py-1 rounded bg-black/30 border border-white/5 ${lead.leadScore > 80 ? 'text-red-400 border-red-900/30' : 'text-green-400'}`}>
           <BarChart3 className="w-3 h-3" />
           {lead.leadScore > 80 ? 'CRITICAL SIGNAL' : 'QUALIFIED'}
         </span>
         <span className="flex items-center gap-1.5">
            <Lock className="w-3 h-3" />
            {lead.estimatedOwnerName || 'Unknown Owner'}
         </span>
         <span className={`${lead.gmbStatus === 'Non-Existent' ? 'text-red-500' : 'text-gray-400'}`}>
           GMB: {lead.gmbStatus}
         </span>
      </div>
    </div>
  );
};

export default LeadResult;
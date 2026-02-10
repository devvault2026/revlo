import React from 'react';
import { Lead } from '../types';
import { Phone, Globe, User, AlertTriangle, ExternalLink, BarChart3 } from 'lucide-react';

interface LeadCardProps {
  lead: Lead;
  onSelect: (lead: Lead) => void;
}

const LeadCard: React.FC<LeadCardProps> = ({ lead, onSelect }) => {
  // Color coding based on lead score
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-red-500'; // Hot lead (red hot)
    if (score >= 70) return 'text-orange-500';
    return 'text-blue-400';
  };

  const getBorderColor = (score: number) => {
    if (score >= 90) return 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]';
    if (score >= 70) return 'border-orange-500/30';
    return 'border-blue-500/20';
  };

  return (
    <div 
      onClick={() => onSelect(lead)}
      className={`glass-panel rounded-xl p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:bg-slate-800/80 border ${getBorderColor(lead.leadScore)} group`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
            {lead.businessName}
          </h3>
          <p className="text-sm text-slate-400">{lead.industry} • {lead.location}</p>
        </div>
        <div className="flex flex-col items-end">
          <div className={`text-3xl font-black ${getScoreColor(lead.leadScore)}`}>
            {lead.leadScore}
          </div>
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Lead Score</span>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center text-sm text-slate-300">
          <User className="w-4 h-4 mr-3 text-slate-500" />
          <span className="font-medium text-white">{lead.estimatedOwnerName || "Unknown Owner"}</span>
        </div>
        
        <div className="flex items-center text-sm text-slate-300">
          <Phone className="w-4 h-4 mr-3 text-slate-500" />
          <span>{lead.phoneNumber || "No Number"}</span>
        </div>

        <div className="flex items-center text-sm text-slate-300">
          <Globe className="w-4 h-4 mr-3 text-slate-500" />
          {lead.website ? (
            <a href={lead.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline flex items-center" onClick={(e) => e.stopPropagation()}>
              {lead.website} <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          ) : (
            <span className="text-red-400 flex items-center font-semibold">
              <AlertTriangle className="w-3 h-3 mr-1" /> No Website Detected
            </span>
          )}
        </div>
        
        <div className="flex items-center text-sm text-slate-300">
            <BarChart3 className="w-4 h-4 mr-3 text-slate-500" />
            <span className={`${lead.gmbStatus === 'Non-Existent' || lead.gmbStatus === 'Weak' ? 'text-red-400' : 'text-slate-300'}`}>
               GMB: {lead.gmbStatus}
            </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {lead.painPoints.map((point, idx) => (
          <span key={idx} className="px-2 py-1 rounded bg-red-500/10 text-red-400 text-xs font-medium border border-red-500/20">
            {point}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LeadCard;
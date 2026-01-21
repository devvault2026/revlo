import React from 'react';
import { Lead, LeadStatus } from '../types';
import { MapPin, Globe, AlertTriangle, CheckCircle, BarChart, Phone } from 'lucide-react';

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
      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'bg-slate-800 border-accent-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]' 
          : 'bg-slate-800/50 border-slate-700 hover:border-slate-500 hover:bg-slate-800'
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-slate-100 truncate pr-2">{lead.name}</h3>
        {!hasWebsite ? (
          <span className="flex items-center text-xs text-red-400 font-mono bg-red-400/10 px-2 py-0.5 rounded">
            <AlertTriangle size={12} className="mr-1" /> NO SITE
          </span>
        ) : (
             <span className="flex items-center text-xs text-yellow-400 font-mono bg-yellow-400/10 px-2 py-0.5 rounded">
            WEAK SITE
          </span>
        )}
      </div>
      
      <div className="space-y-1 text-sm text-slate-400">
        <div className="flex items-center">
          <MapPin size={14} className="mr-2 text-slate-500" />
          <span className="truncate">{lead.address}</span>
        </div>
        {lead.phone && (
            <div className="flex items-center">
            <Phone size={14} className="mr-2 text-slate-500" />
            <span className="truncate">{lead.phone}</span>
            </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between">
         <div className="flex items-center space-x-1">
             {/* Rating Stars mock */}
             {[1,2,3,4,5].map(i => (
                 <div key={i} className={`w-2 h-2 rounded-full ${i <= (lead.rating || 0) ? 'bg-accent-500' : 'bg-slate-600'}`}></div>
             ))}
             <span className="text-xs text-slate-500 ml-2">({lead.userRatingCount || 0})</span>
         </div>
         
         <div className={`text-xs px-2 py-1 rounded border ${
             lead.status === LeadStatus.OUTREACH_READY 
             ? 'border-green-500/30 text-green-400 bg-green-500/10' 
             : 'border-slate-600 text-slate-500'
         }`}>
             {lead.status === LeadStatus.SCOUTED ? 'Ready for Intel' : lead.status.replace('_', ' ')}
         </div>
      </div>
    </div>
  );
};

export default LeadCard;
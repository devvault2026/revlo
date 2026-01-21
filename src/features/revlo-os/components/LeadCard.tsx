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
      className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${isSelected
          ? 'bg-white border-purple-500 shadow-xl shadow-purple-600/10 -translate-y-1'
          : 'bg-white border-slate-100 hover:border-purple-200 hover:shadow-lg hover:-translate-y-0.5'
        }`}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-slate-900 truncate pr-2 text-sm">{lead.name}</h3>
        {!hasWebsite ? (
          <span className="flex items-center text-[9px] text-red-600 font-black tracking-widest uppercase bg-red-50 border border-red-100 px-2 py-1 rounded-lg">
            <AlertTriangle size={10} className="mr-1.5" /> Site Lacking
          </span>
        ) : (
          <span className="flex items-center text-[9px] text-amber-600 font-black tracking-widest uppercase bg-amber-50 border border-amber-100 px-2 py-1 rounded-lg">
            Optimization Gap
          </span>
        )}
      </div>

      <div className="space-y-1.5 text-xs font-medium text-slate-500">
        <div className="flex items-center">
          <MapPin size={14} className="mr-2 text-slate-300" />
          <span className="truncate">{lead.address}</span>
        </div>
        {lead.phone && (
          <div className="flex items-center">
            <Phone size={14} className="mr-2 text-slate-300" />
            <span className="truncate">{lead.phone}</span>
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
        <div className="flex items-center space-x-1.5">
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= (lead.rating || 0) ? 'bg-amber-400' : 'bg-slate-200'}`}></div>
            ))}
          </div>
          <span className="text-[10px] font-bold text-slate-400">({lead.userRatingCount || 0})</span>
        </div>

        <div className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border transition-colors ${lead.status === LeadStatus.OUTREACH_READY
            ? 'border-green-200 text-green-600 bg-green-50'
            : 'border-slate-100 text-slate-400 bg-slate-50'
          }`}>
          {lead.status === LeadStatus.SCOUTED ? 'Ready for Intel' : lead.status.replace('_', ' ')}
        </div>
      </div>
    </div>
  );
};

export default LeadCard;
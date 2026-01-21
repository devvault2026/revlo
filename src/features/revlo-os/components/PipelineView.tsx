import React from 'react';
import { Lead, LeadStatus } from '../types';
import { MoreHorizontal, GripVertical } from 'lucide-react';

interface PipelineViewProps {
  leads: Lead[];
  onMoveLead: (leadId: string, newStatus: LeadStatus) => void;
}

const PipelineView: React.FC<PipelineViewProps> = ({ leads, onMoveLead }) => {

  const columns = [
    { id: 'scout', title: 'Prospects', statuses: [LeadStatus.SCOUTED, LeadStatus.ANALYZING], color: 'border-slate-600' },
    { id: 'qualify', title: 'Qualified', statuses: [LeadStatus.DOSSIER_READY, LeadStatus.STRATEGY_READY], color: 'border-blue-500' },
    { id: 'pitch', title: 'Asset Ready', statuses: [LeadStatus.SITE_BUILT, LeadStatus.OUTREACH_READY], color: 'border-accent-500' },
    { id: 'sent', title: 'Contacted', statuses: [LeadStatus.CONTACTED], color: 'border-purple-500' },
    { id: 'reply', title: 'Negotiation', statuses: [LeadStatus.REPLIED], color: 'border-green-500' },
  ];

  const getLeadsForColumn = (statuses: LeadStatus[]) => {
    return leads.filter(l => statuses.includes(l.status));
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
      <div className="p-8 bg-white border-b border-slate-100">
        <div className="animate-in fade-in slide-in-from-left-2 duration-300">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-4 bg-purple-600 rounded-full" />
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Asset Trajectory</h2>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Pipeline OS</h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">Neural Conversion Stages</p>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex h-full p-8 space-x-6 min-w-max">
          {columns.map(col => (
            <div key={col.id} className="w-80 flex flex-col bg-slate-100/50 rounded-2xl border border-slate-200 h-full">
              {/* Column Header */}
              <div className={`p-5 border-b-2 ${col.color.replace('slate-600', 'slate-400')} bg-white rounded-t-2xl flex justify-between items-center shadow-sm`}>
                <span className="font-bold text-slate-800">{col.title}</span>
                <span className="text-xs font-bold bg-slate-100 border border-slate-200 px-3 py-1 rounded-full text-slate-600">
                  {getLeadsForColumn(col.statuses).length}
                </span>
              </div>

              {/* Column Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {getLeadsForColumn(col.statuses).map(lead => (
                  <div key={lead.id} className="bg-white p-5 rounded-xl border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all duration-300 group relative">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-slate-900 text-sm truncate">{lead.name}</h4>
                      <button className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50 transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>

                    <div className="text-xs text-slate-500 mb-4 truncate">{lead.address}</div>

                    {lead.dealValue ? (
                      <div className="text-[11px] font-bold text-green-700 bg-green-50 border border-green-100 px-3 py-1.5 rounded-lg inline-block mb-3">
                        ${lead.dealValue} CAD
                      </div>
                    ) : (
                      <div className="text-[11px] font-bold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg inline-block mb-3">
                        Qualifying...
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-2 pt-3 border-t border-slate-100">
                      <div className="flex space-x-1.5">
                        {[1, 2, 3].map(i => (
                          <div key={i} className={`w-2 h-2 rounded-full ${i <= (lead.rating || 0) / 2 ? 'bg-amber-400' : 'bg-slate-200'}`}></div>
                        ))}
                      </div>
                      <span className={`text-[10px] uppercase font-black tracking-widest ${lead.ownerName ? 'text-purple-600' : 'text-slate-400'}`}>
                        {lead.ownerName ? 'Enriched' : 'Raw'}
                      </span>
                    </div>
                  </div>
                ))}
                {getLeadsForColumn(col.statuses).length === 0 && (
                  <div className="text-center py-16 text-slate-300">
                    <GripVertical className="mx-auto mb-3 opacity-20" size={24} />
                    <span className="text-[10px] uppercase font-black tracking-widest">Empty</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PipelineView;
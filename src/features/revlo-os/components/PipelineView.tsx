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
    <div className="h-full flex flex-col bg-slate-950 overflow-hidden">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white">Deal Pipeline</h1>
      </div>
      
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex h-full p-6 space-x-6 min-w-max">
          {columns.map(col => (
            <div key={col.id} className="w-80 flex flex-col bg-slate-900/50 rounded-lg border border-slate-800 h-full">
              {/* Column Header */}
              <div className={`p-4 border-b-2 ${col.color} bg-slate-900 rounded-t-lg flex justify-between items-center`}>
                <span className="font-bold text-slate-200">{col.title}</span>
                <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400">
                  {getLeadsForColumn(col.statuses).length}
                </span>
              </div>
              
              {/* Column Body */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {getLeadsForColumn(col.statuses).map(lead => (
                  <div key={lead.id} className="bg-slate-800 p-4 rounded border border-slate-700 hover:border-slate-500 shadow-sm group relative">
                    <div className="flex justify-between items-start mb-2">
                       <h4 className="font-bold text-white text-sm truncate">{lead.name}</h4>
                       <button className="text-slate-500 hover:text-white"><MoreHorizontal size={14} /></button>
                    </div>
                    
                    <div className="text-xs text-slate-400 mb-3 truncate">{lead.address}</div>
                    
                    {lead.dealValue ? (
                        <div className="text-xs font-mono text-green-400 bg-green-400/10 px-2 py-1 rounded inline-block mb-2">
                            ${lead.dealValue} CAD
                        </div>
                    ) : (
                        <div className="text-xs font-mono text-slate-500 bg-slate-700/50 px-2 py-1 rounded inline-block mb-2">
                            Qualifying...
                        </div>
                    )}
                    
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-700/50">
                        <div className="flex space-x-1">
                             {[1,2,3].map(i => (
                                 <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= (lead.rating || 0)/2 ? 'bg-yellow-500' : 'bg-slate-600'}`}></div>
                             ))}
                        </div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                            {lead.ownerName ? 'Enriched' : 'Raw'}
                        </span>
                    </div>
                  </div>
                ))}
                {getLeadsForColumn(col.statuses).length === 0 && (
                    <div className="text-center py-10 opacity-30">
                        <GripVertical className="mx-auto mb-2" />
                        <span className="text-xs uppercase font-bold">Empty</span>
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
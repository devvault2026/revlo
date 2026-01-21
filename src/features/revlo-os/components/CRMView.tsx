import React, { useState } from 'react';
import { Lead, LeadStatus } from '../types';
import { Search, Filter, Mail, Phone, MoreHorizontal, ExternalLink, BarChart2 } from 'lucide-react';

interface CRMViewProps {
  leads: Lead[];
}

const CRMView: React.FC<CRMViewProps> = ({ leads }) => {
  const [filter, setFilter] = useState('');
  const [industryFilter, setIndustryFilter] = useState('All');

  const uniqueIndustries = Array.from(new Set(leads.map(l => l.type || 'Uncategorized')));

  const filteredLeads = leads.filter(l => {
    const matchesText = l.name.toLowerCase().includes(filter.toLowerCase()) || 
                        l.email?.toLowerCase().includes(filter.toLowerCase()) ||
                        l.status.toLowerCase().includes(filter.toLowerCase());
    const matchesIndustry = industryFilter === 'All' || (l.type || 'Uncategorized') === industryFilter;
    
    return matchesText && matchesIndustry;
  });

  const getScoreColor = (score?: number) => {
      if (!score) return 'bg-slate-700';
      if (score >= 80) return 'bg-green-500';
      if (score >= 50) return 'bg-yellow-500';
      return 'bg-red-500';
  };

  return (
    <div className="flex flex-col h-full bg-slate-950">
      <div className="p-6 border-b border-slate-800">
        <div className="flex justify-between items-center mb-4">
            <div>
                <h1 className="text-2xl font-bold text-white">Lead Database</h1>
                <p className="text-slate-500 text-sm">Master record of all scouted entities.</p>
            </div>
            <div className="flex space-x-2">
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
                    <input 
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:border-accent-500 focus:outline-none w-64"
                        placeholder="Search leads..."
                    />
                </div>
            </div>
        </div>
        
        {/* Filters */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
            <button 
                onClick={() => setIndustryFilter('All')}
                className={`px-3 py-1 rounded text-xs font-bold border ${industryFilter === 'All' ? 'bg-slate-800 text-white border-slate-600' : 'bg-slate-950 text-slate-500 border-slate-800 hover:border-slate-600'}`}
            >
                ALL
            </button>
            {uniqueIndustries.map(ind => (
                <button 
                    key={ind}
                    onClick={() => setIndustryFilter(ind)}
                    className={`px-3 py-1 rounded text-xs font-bold border whitespace-nowrap ${industryFilter === ind ? 'bg-slate-800 text-white border-slate-600' : 'bg-slate-950 text-slate-500 border-slate-800 hover:border-slate-600'}`}
                >
                    {ind}
                </button>
            ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
            <thead className="bg-slate-900 sticky top-0 z-10">
                <tr>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-800">Entity</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-800">Industry</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-800">Propensity Score</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-800">Status</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-800">Value</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-800"></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
                {filteredLeads.map(lead => (
                    <tr key={lead.id} className="hover:bg-slate-900/50 transition-colors group">
                        <td className="p-4">
                            <div className="font-medium text-white">{lead.name}</div>
                            <div className="text-xs text-slate-500">{lead.address}</div>
                        </td>
                        <td className="p-4">
                             <span className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded">{lead.type || 'Unknown'}</span>
                        </td>
                        <td className="p-4">
                            {lead.propensityScore ? (
                                <div className="flex items-center">
                                    <div className="flex-1 h-2 bg-slate-800 rounded-full w-24 mr-3 overflow-hidden">
                                        <div className={`h-full ${getScoreColor(lead.propensityScore)}`} style={{width: `${lead.propensityScore}%`}}></div>
                                    </div>
                                    <span className="text-xs font-bold text-white">{lead.propensityScore}</span>
                                </div>
                            ) : (
                                <span className="text-xs text-slate-600 italic">Pending Analysis</span>
                            )}
                        </td>
                        <td className="p-4">
                            <span className={`text-xs px-2 py-1 rounded font-medium border ${
                                lead.status === LeadStatus.REPLIED ? 'bg-green-900/30 text-green-400 border-green-800' :
                                lead.status === LeadStatus.CONTACTED ? 'bg-purple-900/30 text-purple-400 border-purple-800' :
                                lead.status === LeadStatus.OUTREACH_READY ? 'bg-accent-900/30 text-accent-400 border-accent-800' :
                                'bg-slate-800 text-slate-400 border-slate-700'
                            }`}>
                                {lead.status.replace('_', ' ')}
                            </span>
                        </td>
                        <td className="p-4">
                            {lead.dealValue ? (
                                <span className="text-green-400 font-mono font-bold">$ {lead.dealValue}</span>
                            ) : (
                                <span className="text-slate-600 font-mono">-</span>
                            )}
                        </td>
                        <td className="p-4 text-right">
                            <button className="text-slate-500 hover:text-white p-1 rounded hover:bg-slate-800">
                                <MoreHorizontal size={16} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {filteredLeads.length === 0 && (
            <div className="text-center py-20 text-slate-600">
                <p>No records found in database matching filters.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default CRMView;
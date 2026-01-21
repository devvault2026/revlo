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
        if (score >= 80) return 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.3)]';
        if (score >= 50) return 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.3)]';
        return 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.3)]';
    };

    return (
        <div className="flex flex-col h-full bg-white overflow-hidden">
            <div className="p-8 border-b border-slate-100 bg-slate-50/30">
                <div className="flex justify-between items-end mb-8">
                    <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-4 bg-purple-600 rounded-full" />
                            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Intel Directory</h2>
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Database OS</h1>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">Active Intelligence Nodes</p>
                    </div>
                    <div className="flex space-x-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                            <input
                                value={filter}
                                onChange={e => setFilter(e.target.value)}
                                className="bg-white border-2 border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-sm text-slate-900 focus:border-purple-500 focus:outline-none w-72 transition-colors"
                                placeholder="Search leads..."
                            />
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar shrink-0">
                    <button
                        onClick={() => setIndustryFilter('All')}
                        className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${industryFilter === 'All' ? 'bg-purple-600 text-white border-purple-600 shadow-lg' : 'bg-white text-slate-500 border-slate-200 hover:border-purple-300'}`}
                    >
                        ALL Entities
                    </button>
                    {uniqueIndustries.map(ind => (
                        <button
                            key={ind}
                            onClick={() => setIndustryFilter(ind)}
                            className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border whitespace-nowrap transition-all ${industryFilter === ind ? 'bg-purple-600 text-white border-purple-600 shadow-lg' : 'bg-white text-slate-500 border-slate-200 hover:border-purple-300'}`}
                        >
                            {ind}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-auto custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                    <thead className="bg-slate-50/50 backdrop-blur-sm sticky top-0 z-20">
                        <tr>
                            <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Prospect Intelligence</th>
                            <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Sector</th>
                            <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Propensity Index</th>
                            <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Operational Phase</th>
                            <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Est. Valuation</th>
                            <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredLeads.map(lead => (
                            <tr key={lead.id} className="hover:bg-purple-50/50 transition-colors group">
                                <td className="p-4">
                                    <div className="font-semibold text-slate-900">{lead.name}</div>
                                    <div className="text-xs text-slate-500 mt-0.5">{lead.address}</div>
                                </td>
                                <td className="p-4">
                                    <span className="text-xs font-medium text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg">{lead.type || 'Unknown'}</span>
                                </td>
                                <td className="p-4">
                                    {lead.propensityScore ? (
                                        <div className="flex items-center">
                                            <div className="flex-1 h-2.5 bg-slate-200 rounded-full w-24 mr-3 overflow-hidden">
                                                <div className={`h-full ${getScoreColor(lead.propensityScore)}`} style={{ width: `${lead.propensityScore}%` }}></div>
                                            </div>
                                            <span className="text-xs font-bold text-slate-900">{lead.propensityScore}</span>
                                        </div>
                                    ) : (
                                        <span className="text-xs text-slate-400 italic">Pending Analysis</span>
                                    )}
                                </td>
                                <td className="p-4">
                                    <span className={`text-xs px-3 py-1.5 rounded-lg font-semibold border-2 ${lead.status === LeadStatus.REPLIED ? 'bg-green-50 text-green-700 border-green-200' :
                                        lead.status === LeadStatus.CONTACTED ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                            lead.status === LeadStatus.OUTREACH_READY ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                                'bg-slate-50 text-slate-700 border-slate-200'
                                        }`}>
                                        {lead.status.replace('_', ' ')}
                                    </span>
                                </td>
                                <td className="p-4">
                                    {lead.dealValue ? (
                                        <span className="text-green-600 font-mono font-bold">$ {lead.dealValue}</span>
                                    ) : (
                                        <span className="text-slate-400 font-mono">-</span>
                                    )}
                                </td>
                                <td className="p-4 text-right">
                                    <button className="text-slate-400 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-100 transition-colors">
                                        <MoreHorizontal size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredLeads.length === 0 && (
                    <div className="flex-1 flex flex-col items-center justify-center py-32 text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-8 border border-slate-100 shadow-sm">
                            <BarChart2 size={32} className="text-purple-300 animate-pulse" />
                        </div>
                        <h2 className="text-lg font-black text-slate-900 uppercase tracking-[0.3em] leading-none mb-4">No Nodes Found</h2>
                        <p className="max-w-xs mx-auto text-slate-400 font-bold text-sm leading-relaxed uppercase tracking-widest opacity-60">Adjust your search parameters or sector filters to locate intelligence records.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CRMView;
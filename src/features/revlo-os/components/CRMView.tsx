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
        <div className="flex flex-col h-full bg-[#020408] overflow-hidden text-slate-300">
            <div className="p-10 border-b border-white/5 bg-[#0a0c12]/50 backdrop-blur-md">
                <div className="flex justify-between items-end mb-10">
                    <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-4 bg-purple-600 rounded-full shadow-[0_0_8px_rgba(147,51,234,0.5)]" />
                            <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Intel Directory</h2>
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight leading-none italic uppercase">Database <span className="gradient-text">OS</span></h1>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2">Active Intelligence Nodes</p>
                    </div>
                    <div className="flex space-x-3">
                        <div className="relative group">
                            <Search className="absolute left-4 top-3.5 text-slate-600 group-focus-within:text-purple-500 transition-colors" size={18} />
                            <input
                                value={filter}
                                onChange={e => setFilter(e.target.value)}
                                className="bg-white/5 border border-white/5 rounded-2xl pl-12 pr-6 py-3 text-sm text-white focus:border-purple-500/50 focus:outline-none w-80 transition-all placeholder-slate-600 font-bold shadow-2xl"
                                placeholder="Search leads..."
                            />
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar shrink-0">
                    <button
                        onClick={() => setIndustryFilter('All')}
                        className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${industryFilter === 'All' ? 'bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-500/20' : 'bg-white/5 text-slate-500 border-white/5 hover:border-white/20 hover:text-slate-300 shadow-xl'}`}
                    >
                        ALL Entities
                    </button>
                    {uniqueIndustries.map(ind => (
                        <button
                            key={ind}
                            onClick={() => setIndustryFilter(ind)}
                            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border whitespace-nowrap transition-all ${industryFilter === ind ? 'bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-500/20' : 'bg-white/5 text-slate-500 border-white/5 hover:border-white/20 hover:text-slate-300 shadow-xl'}`}
                        >
                            {ind}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-auto custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                    <thead className="bg-[#0a0c12]/80 backdrop-blur-xl sticky top-0 z-20">
                        <tr>
                            <th className="p-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/5">Prospect Intelligence</th>
                            <th className="p-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/5">Sector</th>
                            <th className="p-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/5">Propensity Index</th>
                            <th className="p-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/5">Operational Phase</th>
                            <th className="p-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/5">Est. Valuation</th>
                            <th className="p-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/5"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 bg-[#020408]">
                        {filteredLeads.map(lead => (
                            <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="p-6">
                                    <div className="font-black text-white text-sm uppercase italic tracking-tight">{lead.name}</div>
                                    <div className="text-[11px] text-slate-600 mt-1 font-bold">{lead.address}</div>
                                </td>
                                <td className="p-6">
                                    <span className="text-[10px] font-black text-slate-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 uppercase tracking-widest">{lead.type || 'Unknown'}</span>
                                </td>
                                <td className="p-6">
                                    {lead.propensityScore ? (
                                        <div className="flex items-center">
                                            <div className="flex-1 h-1.5 bg-white/5 rounded-full w-24 mr-4 overflow-hidden border border-white/5">
                                                <div className={`h-full ${getScoreColor(lead.propensityScore)}`} style={{ width: `${lead.propensityScore}%` }}></div>
                                            </div>
                                            <span className="text-[11px] font-black text-white">{lead.propensityScore}</span>
                                        </div>
                                    ) : (
                                        <span className="text-[10px] text-slate-600 italic font-black uppercase tracking-widest">Pending Analysis</span>
                                    )}
                                </td>
                                <td className="p-6">
                                    <span className={`text-[10px] px-3 py-1.5 rounded-lg font-black uppercase tracking-widest border transition-all ${lead.status === LeadStatus.REPLIED ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                        lead.status === LeadStatus.CONTACTED ? 'bg-purple-500/10 text-purple-400 border-purple-500/20 shadow-[0_0_15px_rgba(147,51,234,0.1)]' :
                                            lead.status === LeadStatus.OUTREACH_READY ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                'bg-white/5 text-slate-500 border-white/5'
                                        }`}>
                                        {lead.status.replace('_', ' ')}
                                    </span>
                                </td>
                                <td className="p-6">
                                    {lead.dealValue ? (
                                        <span className="text-green-500 font-mono font-black text-sm">$ {lead.dealValue}</span>
                                    ) : (
                                        <span className="text-slate-700 font-mono">-</span>
                                    )}
                                </td>
                                <td className="p-6 text-right">
                                    <button className="text-slate-600 hover:text-white p-2.5 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5">
                                        <MoreHorizontal size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredLeads.length === 0 && (
                    <div className="flex-1 flex flex-col items-center justify-center py-40 text-center">
                        <div className="w-24 h-24 bg-[#0a0c12] rounded-[32px] flex items-center justify-center mb-10 border border-white/10 shadow-2xl relative group overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent" />
                            <BarChart2 size={36} className="text-purple-500 animate-pulse relative z-10" />
                        </div>
                        <h2 className="text-xl font-black text-white uppercase tracking-[0.4em] leading-none mb-4 italic">No Nodes <span className="gradient-text">Found</span></h2>
                        <p className="max-w-xs mx-auto text-slate-600 font-black text-[10px] leading-relaxed uppercase tracking-[0.2em] opacity-80">Adjust your search parameters or sector filters to locate intelligence records.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CRMView;
import React from 'react';
import { motion } from 'framer-motion';
import { Lead, LeadStatus } from '../types';
import { TrendingUp, Users, Zap, DollarSign, Activity, ArrowUp, Target } from 'lucide-react';

interface DashboardViewProps {
  leads: Lead[];
}

const DashboardView: React.FC<DashboardViewProps> = ({ leads }) => {
  // Calculate Stats
  const totalLeads = leads.length;
  const contacted = leads.filter(l => l.status === LeadStatus.CONTACTED || l.status === LeadStatus.REPLIED).length;
  const replies = leads.filter(l => l.status === LeadStatus.REPLIED).length;

  // Estimate pipeline value ($750 CAD per qualified lead)
  const activePipelineLeads = leads.filter(l =>
    [LeadStatus.STRATEGY_READY, LeadStatus.SITE_BUILT, LeadStatus.OUTREACH_READY, LeadStatus.CONTACTED, LeadStatus.REPLIED].includes(l.status)
  );
  const pipelineValue = activePipelineLeads.length * 750;

  // Formatting helper
  const formatCurrency = (val: number) => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(val);

  const stats = [
    {
      label: 'Total Leads',
      value: totalLeads.toLocaleString(),
      change: '+12.5%',
      trend: 'up',
      icon: <Users className="w-6 h-6" />,
      gradient: 'from-purple-500 to-purple-400',
    },
    {
      label: 'Active Pipeline',
      value: formatCurrency(pipelineValue),
      change: '+18.7%',
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />,
      gradient: 'from-blue-500 to-blue-400',
    },
    {
      label: 'Outreach Sent',
      value: contacted.toLocaleString(),
      change: '+3',
      trend: 'up',
      icon: <Zap className="w-6 h-6" />,
      gradient: 'from-red-500 to-red-400',
    },
    {
      label: 'Conversations',
      value: replies.toLocaleString(),
      change: '+5.2%',
      trend: 'up',
      icon: <Target className="w-6 h-6" />,
      gradient: 'from-purple-500 to-purple-400',
    },
  ];

  const getStatusColor = (status: string) => {
    if (status === LeadStatus.REPLIED) return 'bg-green-100 text-green-700';
    if (status === LeadStatus.CONTACTED) return 'bg-purple-100 text-purple-700';
    if (status === LeadStatus.DOSSIER_READY) return 'bg-blue-100 text-blue-700';
    return 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-10 bg-white">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-4 bg-purple-600 rounded-full" />
              <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">System Overview</h2>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Intelligence Dashboard</h1>
          </div>
          <div className="flex bg-slate-100 rounded-xl p-1 border border-slate-200">
            <button className="px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-white text-slate-900 rounded-lg shadow-sm">Real-time</button>
            <button className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Historical</button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="bg-white rounded-[28px] p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-slate-50 to-white -mr-8 -mt-8 rounded-full opacity-50 group-hover:scale-110 transition-transform" />
              <div className="flex items-start justify-between mb-6">
                <div className={`p-4 bg-gradient-to-br ${stat.gradient} rounded-2xl text-white shadow-lg shadow-purple-100`}>
                  {stat.icon}
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase bg-green-50 text-green-600 border border-green-100">
                  <ArrowUp className="w-3 h-3" />
                  {stat.change}
                </div>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Intelligence Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full">
              <div className="p-8 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
                <h2 className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
                  <div className="w-2 h-4 bg-purple-600 rounded-full" />
                  Live Scout Stream
                </h2>
                <button className="text-[10px] font-black text-purple-600 hover:text-purple-700 uppercase tracking-widest border border-purple-100 px-4 py-2 rounded-xl bg-white transition-all shadow-sm">
                  View Repository
                </button>
              </div>
              <div className="p-4 overflow-y-auto max-h-[500px] custom-scrollbar">
                <div className="space-y-2">
                  {leads.slice(0, 10).map((lead, index) => (
                    <motion.div
                      key={lead.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-5 p-4 bg-white border border-transparent hover:border-slate-100 hover:bg-slate-50/50 rounded-2xl transition-all cursor-pointer group"
                    >
                      <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center text-white font-black text-lg transition-transform group-hover:scale-105">
                        {lead.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-slate-900 truncate tracking-tight">{lead.name}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate mt-1">
                          {lead.website || lead.address || 'Unknown Entity'}
                        </p>
                      </div>
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusColor(lead.status)}`}>
                        {lead.status.replace('_', ' ')}
                      </span>
                    </motion.div>
                  ))}
                  {leads.length === 0 && (
                    <div className="text-center py-20 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Waiting for primary data ingestion...</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Protocol Integrity Panel */}
          <div className="space-y-8">
            <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden p-8">
              <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Node Integrity</h2>
              <div className="space-y-8">
                <div className="p-8 bg-slate-50/80 border border-slate-100 rounded-[28px] shadow-sm relative overflow-hidden group hover:border-purple-200 transition-all">
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                    <Zap size={80} className="text-purple-600" />
                  </div>
                  <div className="flex items-center gap-4 mb-4 relative z-10">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.3)]"></div>
                    <p className="font-black text-slate-900 text-[10px] uppercase tracking-[0.3em]">Gemini 1.5 Pro</p>
                  </div>
                  <p className="text-xs text-slate-500 font-bold leading-relaxed mb-6 relative z-10 uppercase tracking-wide opacity-80">All neural nodes operational. Real-time analysis protocols are nominal and executing at 100% precision.</p>
                  <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden relative z-10 shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "94%" }}
                      transition={{ duration: 2, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between relative z-10">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Latency nominal</span>
                    <span className="text-[9px] font-black text-purple-600 uppercase tracking-widest">94% Efficiency</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-4 bg-slate-50/50 rounded-2xl border border-slate-100 transition-colors hover:border-purple-200">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Database Record</span>
                    <span className="text-sm font-black text-slate-900">{totalLeads}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-slate-50/50 rounded-2xl border border-slate-100 transition-colors hover:border-purple-200">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Operatives</span>
                    <span className="text-sm font-black text-slate-900">4 Nodes</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-slate-50/50 rounded-2xl border border-slate-100 transition-colors hover:border-purple-200">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Last Intelligence Sync</span>
                    <span className="text-[10px] font-black text-green-600 uppercase">Just Now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
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
      change: '+12.5%', // Mock change for now
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
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-black font-display mb-2">
          Welcome to <span className="gradient-text">Revlo OS</span>
        </h1>
        <p className="text-slate-600">Your growth engine dashboard - Track, manage, and scale your operations</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 bg-gradient-to-br ${stat.gradient} rounded-xl text-white`}>
                {stat.icon}
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold bg-green-100 text-green-700">
                <ArrowUp className="w-3 h-3" />
                {stat.change}
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
            <p className="text-3xl font-black gradient-text">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Recent Leads</h2>
                <button className="text-sm text-purple-600 hover:text-purple-700 font-semibold">
                  View All →
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {leads.slice(0, 5).map((lead, index) => (
                  <motion.div
                    key={lead.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-gradient-purple rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {lead.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 truncate">{lead.name}</p>
                      <p className="text-sm text-slate-600 truncate">{lead.website || lead.address}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusColor(lead.status)}`}>
                        {lead.status.replace('_', ' ')}
                      </span>
                    </div>
                  </motion.div>
                ))}
                {leads.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    No leads generated yet. Visit the Engine to start scouting.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions / System Status */}
        <div className="bg-white rounded-2xl border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-bold">System Status</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="font-bold text-slate-900">Gemini 2.5 Flash Online</p>
              </div>
              <p className="text-xs text-slate-600">Agents are ready to scout and research.</p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Database Size</span>
                <span className="font-semibold">{totalLeads} Records</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">API Status</span>
                <span className="font-semibold text-green-600">Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
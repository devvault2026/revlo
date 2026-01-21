import React from 'react';
import { Lead, LeadStatus } from '../types';
import { DollarSign, Users, Activity, TrendingUp, Bell } from 'lucide-react';

interface DashboardViewProps {
  leads: Lead[];
}

const DashboardView: React.FC<DashboardViewProps> = ({ leads }) => {
  // Calculate Stats
  const totalLeads = leads.length;
  const contacted = leads.filter(l => l.status === LeadStatus.CONTACTED || l.status === LeadStatus.REPLIED).length;
  const replies = leads.filter(l => l.status === LeadStatus.REPLIED).length;
  
  // Estimate pipeline value ($750 CAD per qualified lead)
  // Qualified = Has a strategy, built site, or in contact
  const activePipelineLeads = leads.filter(l => 
      [LeadStatus.STRATEGY_READY, LeadStatus.SITE_BUILT, LeadStatus.OUTREACH_READY, LeadStatus.CONTACTED, LeadStatus.REPLIED].includes(l.status)
  );

  const pipelineValue = activePipelineLeads.length * 750;

  // Potential is total leads * 750 (assuming 100% conversion for the metric display)
  const potentialValue = totalLeads * 750;

  return (
    <div className="p-8 h-full overflow-y-auto bg-slate-950 text-slate-200">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Executive Overview</h1>
        <p className="text-slate-500">Real-time intelligence on your agency's performance.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Users className="text-blue-500" size={24} />
            </div>
            <span className="text-xs font-mono text-green-400 bg-green-400/10 px-2 py-1 rounded">+12%</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{totalLeads}</div>
          <div className="text-sm text-slate-500">Total Scouted Leads</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-accent-500/10 rounded-lg">
              <DollarSign className="text-accent-500" size={24} />
            </div>
            <span className="text-xs font-mono text-slate-500">CAD</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">${pipelineValue.toLocaleString()}</div>
          <div className="text-sm text-slate-500">Active Pipeline Value</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <Activity className="text-purple-500" size={24} />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{contacted}</div>
          <div className="text-sm text-slate-500">Outreach Sent</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg shadow-lg">
           <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <TrendingUp className="text-green-500" size={24} />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{replies}</div>
          <div className="text-sm text-slate-500">Active Conversations</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 h-96">
        {/* Recent Activity */}
        <div className="col-span-2 bg-slate-900 border border-slate-800 rounded-lg p-6 overflow-hidden flex flex-col">
           <h3 className="text-lg font-bold text-white mb-4">Recent Intel Activity</h3>
           <div className="flex-1 overflow-y-auto space-y-3 pr-2">
             {leads.slice(0, 8).map((lead, i) => (
               <div key={lead.id} className="flex items-center p-3 bg-slate-950/50 rounded border border-slate-800/50">
                  <div className={`w-2 h-2 rounded-full mr-3 ${lead.status === LeadStatus.REPLIED ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                  <div className="flex-1">
                    <span className="font-medium text-slate-200">{lead.name}</span>
                    <span className="text-sm text-slate-500 mx-2">moved to</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                      {lead.status.replace('_', ' ')}
                    </span>
                  </div>
                  <span className="text-xs text-slate-600 font-mono">Just now</span>
               </div>
             ))}
             {leads.length === 0 && <div className="text-slate-500 text-center mt-10">No activity recorded.</div>}
           </div>
        </div>

        {/* Alerts / System Status */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 flex flex-col">
            <h3 className="text-lg font-bold text-white mb-4">System Status</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                 <div className="mt-1 mr-3"><Bell size={16} className="text-accent-500" /></div>
                 <div>
                   <p className="text-sm text-slate-300 font-medium">Gemini 2.5 Flash Online</p>
                   <p className="text-xs text-slate-500">Latency: 45ms</p>
                 </div>
              </div>
              <div className="mt-auto p-4 bg-slate-950 rounded border border-slate-800 text-center">
                 <div className="text-2xl font-bold text-accent-500">${potentialValue.toLocaleString()}</div>
                 <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">Total Market Cap (CAD)</div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Zap, DollarSign, ArrowUp, ArrowDown, Mail, Phone, Globe, Target } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const AdminPage: React.FC = () => {
    const stats = [
        {
            label: 'Total Leads',
            value: '12,458',
            change: '+12.5%',
            trend: 'up',
            icon: <Users className="w-6 h-6" />,
            gradient: 'from-purple-500 to-purple-400',
        },
        {
            label: 'Active Campaigns',
            value: '24',
            change: '+3',
            trend: 'up',
            icon: <Zap className="w-6 h-6" />,
            gradient: 'from-blue-500 to-blue-400',
        },
        {
            label: 'Conversion Rate',
            value: '42.3%',
            change: '+5.2%',
            trend: 'up',
            icon: <Target className="w-6 h-6" />,
            gradient: 'from-red-500 to-red-400',
        },
        {
            label: 'Revenue Generated',
            value: '$284K',
            change: '+18.7%',
            trend: 'up',
            icon: <DollarSign className="w-6 h-6" />,
            gradient: 'from-purple-500 to-purple-400',
        },
    ];

    const recentLeads = [
        {
            name: 'John Smith',
            email: 'john@techstartup.com',
            company: 'Tech Startup Inc',
            source: 'Website',
            status: 'new',
            value: '$15K',
        },
        {
            name: 'Sarah Johnson',
            email: 'sarah@growthco.com',
            company: 'Growth Co',
            source: 'LinkedIn',
            status: 'contacted',
            value: '$25K',
        },
        {
            name: 'Mike Chen',
            email: 'mike@scalable.io',
            company: 'Scalable.io',
            source: 'Referral',
            status: 'qualified',
            value: '$50K',
        },
        {
            name: 'Emily Davis',
            email: 'emily@ventures.com',
            company: 'Ventures LLC',
            source: 'Website',
            status: 'new',
            value: '$20K',
        },
    ];

    const activeCampaigns = [
        {
            name: 'SaaS Outbound Q1',
            type: 'Email',
            leads: 2_450,
            responses: 892,
            responseRate: '36.4%',
            status: 'active',
        },
        {
            name: 'LinkedIn ABM',
            type: 'Social',
            leads: 1_200,
            responses: 480,
            responseRate: '40.0%',
            status: 'active',
        },
        {
            name: 'Enterprise Nurture',
            type: 'Multi-channel',
            leads: 850,
            responses: 425,
            responseRate: '50.0%',
            status: 'active',
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new': return 'bg-blue-100 text-blue-700';
            case 'contacted': return 'bg-purple-100 text-purple-700';
            case 'qualified': return 'bg-green-100 text-green-700';
            case 'active': return 'bg-green-100 text-green-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <DashboardLayout>
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
                                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                    {stat.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                                    {stat.change}
                                </div>
                            </div>
                            <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                            <p className="text-3xl font-black gradient-text">{stat.value}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Two Column Layout */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Recent Leads */}
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
                                    {recentLeads.map((lead, index) => (
                                        <motion.div
                                            key={index}
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
                                                <p className="text-sm text-slate-600 truncate">{lead.company}</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusColor(lead.status)}`}>
                                                    {lead.status}
                                                </span>
                                                <span className="font-bold text-purple-600">{lead.value}</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Active Campaigns */}
                    <div>
                        <div className="bg-white rounded-2xl border border-slate-200">
                            <div className="p-6 border-b border-slate-200">
                                <h2 className="text-xl font-bold">Active Campaigns</h2>
                            </div>
                            <div className="p-6 space-y-4">
                                {activeCampaigns.map((campaign, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <p className="font-semibold text-slate-900">{campaign.name}</p>
                                                <p className="text-xs text-slate-600">{campaign.type}</p>
                                            </div>
                                            <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${getStatusColor(campaign.status)}`}>
                                                {campaign.status}
                                            </span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-600">Leads</span>
                                                <span className="font-semibold">{campaign.leads.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-600">Response Rate</span>
                                                <span className="font-semibold text-green-600">{campaign.responseRate}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-2xl p-8">
                    <h2 className="text-2xl font-black font-display mb-6">Quick Actions</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <button className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-slate-200 hover:border-purple-400 hover:shadow-lg transition-all">
                            <div className="p-3 bg-gradient-purple rounded-lg text-white">
                                <Users className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <p className="font-bold">Add New Lead</p>
                                <p className="text-sm text-slate-600">Manually add prospect</p>
                            </div>
                        </button>
                        <button className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all">
                            <div className="p-3 bg-gradient-blue rounded-lg text-white">
                                <Zap className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <p className="font-bold">Create Campaign</p>
                                <p className="text-sm text-slate-600">Launch new outreach</p>
                            </div>
                        </button>
                        <button className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-slate-200 hover:border-red-400 hover:shadow-lg transition-all">
                            <div className="p-3 bg-gradient-red rounded-lg text-white">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <p className="font-bold">View Analytics</p>
                                <p className="text-sm text-slate-600">Deep dive metrics</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminPage;

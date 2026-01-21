import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, Plus, Mail, Phone, Building, DollarSign, Calendar, MoreVertical } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const LeadsPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');

    const leads = [
        {
            id: 1,
            name: 'John Smith',
            email: 'john@techstartup.com',
            phone: '+1 (555) 123-4567',
            company: 'Tech Startup Inc',
            position: 'CEO',
            revenue: '$100K-500K',
            source: 'Website',
            status: 'new',
            value: '$15K',
            createdAt: '2026-01-20',
            lastContact: 'Never',
        },
        {
            id: 2,
            name: 'Sarah Johnson',
            email: 'sarah@growthco.com',
            phone: '+1 (555) 234-5678',
            company: 'Growth Co',
            position: 'CMO',
            revenue: '$500K-1M',
            source: 'LinkedIn',
            status: 'contacted',
            value: '$25K',
            createdAt: '2026-01-19',
            lastContact: '2 hours ago',
        },
        {
            id: 3,
            name: 'Mike Chen',
            email: 'mike@scalable.io',
            phone: '+1 (555) 345-6789',
            company: 'Scalable.io',
            position: 'Founder',
            revenue: '$1M+',
            source: 'Referral',
            status: 'qualified',
            value: '$50K',
            createdAt: '2026-01-18',
            lastContact: '1 day ago',
        },
        {
            id: 4,
            name: 'Emily Davis',
            email: 'emily@ventures.com',
            phone: '+1 (555) 456-7890',
            company: 'Ventures LLC',
            position: 'VP Marketing',
            revenue: '$100K-500K',
            source: 'Website',
            status: 'new',
            value: '$20K',
            createdAt: '2026-01-20',
            lastContact: 'Never',
        },
        {
            id: 5,
            name: 'David Wilson',
            email: 'david@innovations.com',
            phone: '+1 (555) 567-8901',
            company: 'Innovations Inc',
            position: 'CTO',
            revenue: '$500K-1M',
            source: 'Website',
            status: 'converted',
            value: '$75K',
            createdAt: '2026-01-15',
            lastContact: '3 days ago',
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new': return 'bg-blue-100 text-blue-700';
            case 'contacted': return 'bg-purple-100 text-purple-700';
            case 'qualified': return 'bg-yellow-100 text-yellow-700';
            case 'converted': return 'bg-green-100 text-green-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black font-display mb-2">
                            Lead <span className="gradient-text">Management</span>
                        </h1>
                        <p className="text-slate-600">Manage and nurture your pipeline</p>
                    </div>
                    <button className="px-6 py-3 bg-gradient-rainbow text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        Add New Lead
                    </button>
                </div>

                {/* Filters & Search */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search leads by name, email, or company..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
                            />
                        </div>
                        <div className="flex gap-3">
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
                            >
                                <option value="all">All Status</option>
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="qualified">Qualified</option>
                                <option value="converted">Converted</option>
                            </select>
                            <button className="px-4 py-3 border-2 border-slate-200 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2">
                                <Filter className="w-5 h-5" />
                                Filters
                            </button>
                            <button className="px-4 py-3 border-2 border-slate-200 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2">
                                <Download className="w-5 h-5" />
                                Export
                            </button>
                        </div>
                    </div>
                </div>

                {/* Leads Table */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                                        Lead
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                                        Contact
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                                        Company
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                                        Value
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                                        Last Contact
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {leads.map((lead, index) => (
                                    <motion.tr
                                        key={lead.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="hover:bg-slate-50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-purple rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                                    {lead.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-900">{lead.name}</p>
                                                    <p className="text-sm text-slate-600">{lead.position}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                                    <Mail className="w-4 h-4" />
                                                    {lead.email}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                                    <Phone className="w-4 h-4" />
                                                    {lead.phone}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-semibold text-slate-900">{lead.company}</p>
                                                <p className="text-sm text-slate-600">{lead.revenue}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-purple-600">{lead.value}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusColor(lead.status)}`}>
                                                {lead.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {lead.lastContact}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="p-2 hover:bg-slate-100 rounded-lg transition-all">
                                                <MoreVertical className="w-5 h-5 text-slate-600" />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default LeadsPage;

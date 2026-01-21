import React from 'react';
import { Settings as SettingsType } from '../types';
import { Save, Shield, Database, Brain, Mail, MessageSquare, Phone, Globe, Terminal, Cpu, Target } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface SettingsViewProps {
    settings: SettingsType;
    onUpdate: (s: SettingsType) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ settings, onUpdate }) => {
    const { showToast } = useToast();

    const handleSave = () => {
        showToast("System configuration updated", "success");
    };

    return (
        <div className="h-full bg-slate-50 text-slate-900 overflow-y-auto p-10 lg:p-16 custom-scrollbar">
            <div className="max-w-4xl mx-auto space-y-12">
                {/* Header */}
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-4 bg-purple-600 rounded-full" />
                            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Management Console</h2>
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">System Parameters</h1>
                    </div>
                </div>

                <div className="grid gap-8">
                    {/* AI Configuration */}
                    <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden p-10">
                        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-10 flex items-center">
                            <Brain className="mr-3 text-purple-600" size={16} /> Neural Processing Core
                        </h2>
                        <div className="grid gap-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] ml-1">Gemini Pro API Protocol</label>
                                <div className="relative">
                                    <Terminal className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                    <input
                                        type="password"
                                        value={settings.apiKey}
                                        onChange={(e) => onUpdate({ ...settings, apiKey: e.target.value })}
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-slate-900 focus:border-purple-500 focus:bg-white focus:outline-none transition-all shadow-inner"
                                        placeholder="Enter secure node key..."
                                    />
                                </div>
                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest ml-1">Current status: <span className="text-green-500">Encrypted Transition Active</span></p>
                            </div>
                        </div>
                    </div>

                    {/* VAPI Configuration */}
                    <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden p-10">
                        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-10 flex items-center">
                            <Phone className="mr-3 text-green-500" size={16} /> Telephony Bridge (VAPI)
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] ml-1">Private Node Access</label>
                                <input
                                    type="password"
                                    value={settings.vapi?.privateApiKey || ''}
                                    onChange={(e) => onUpdate({ ...settings, vapi: { ...(settings.vapi || {}), privateApiKey: e.target.value } as any })}
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-900 focus:border-green-500 focus:bg-white focus:outline-none transition-all"
                                    placeholder="Private Node ID..."
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] ml-1">Public Endpoint ID</label>
                                <input
                                    value={settings.vapi?.publicApiKey || ''}
                                    onChange={(e) => onUpdate({ ...settings, vapi: { ...(settings.vapi || {}), publicApiKey: e.target.value } as any })}
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-900 focus:border-green-500 focus:bg-white focus:outline-none transition-all"
                                    placeholder="Public Node ID..."
                                />
                            </div>
                            <div className="md:col-span-2 space-y-3">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] ml-1">Allocated Phone Number ID</label>
                                <div className="relative">
                                    <Cpu className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                    <input
                                        value={settings.vapi?.phoneNumberId || ''}
                                        onChange={(e) => onUpdate({ ...settings, vapi: { ...(settings.vapi || {}), phoneNumberId: e.target.value } as any })}
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-slate-900 focus:border-green-500 focus:bg-white focus:outline-none transition-all"
                                        placeholder="VAPI-PHONENUMBER-UID"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Operational Limits */}
                    <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden p-10">
                        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-10 flex items-center">
                            <Database className="mr-3 text-blue-500" size={16} /> Resource Allocation
                        </h2>
                        <div className="grid gap-10">
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em]">Scout Batch Density</label>
                                    <span className="text-xl font-black text-slate-900">{settings.scrapingBatchSize} <span className="text-[10px] text-slate-400">Leads/Cycle</span></span>
                                </div>
                                <input
                                    type="range"
                                    min="5"
                                    max="50"
                                    step="5"
                                    value={settings.scrapingBatchSize}
                                    onChange={(e) => onUpdate({ ...settings, scrapingBatchSize: parseInt(e.target.value) })}
                                    className="w-full h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-purple-600"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em]">Active Sector</label>
                                    <div className="relative">
                                        <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                        <input
                                            value={settings.location}
                                            onChange={(e) => onUpdate({ ...settings, location: e.target.value })}
                                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em]">Operational Niche</label>
                                    <div className="relative">
                                        <Target className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                        <input
                                            value={settings.niche}
                                            onChange={(e) => onUpdate({ ...settings, niche: e.target.value })}
                                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Final Action */}
                    <div className="flex justify-center pt-8">
                        <button
                            onClick={handleSave}
                            className="bg-purple-600 text-white px-12 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] flex items-center gap-4 transition-all hover:bg-purple-700 hover:scale-105 active:scale-95 shadow-xl shadow-purple-200"
                        >
                            <Save size={20} className="text-purple-200" />
                            Commit Configuration
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsView;
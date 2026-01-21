import React, { useState } from 'react';
import { Settings as SettingsType } from '../types';
import {
    Save, Shield, Database, Brain, Mail, MessageSquare,
    Phone, Globe, Terminal, Cpu, Target, User,
    CreditCard, Building2, LogOut, CheckCircle2, AlertTriangle, ExternalLink
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../../../context/AuthContext';
import { supabase } from '../../../lib/supabase';

interface SettingsViewProps {
    settings: SettingsType;
    onUpdate: (s: SettingsType) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ settings, onUpdate }) => {
    const { showToast } = useToast();
    const { user, profile, signOut, refreshProfile } = useAuth();
    const [updating, setUpdating] = useState(false);

    // Profile State
    const [fullName, setFullName] = useState(profile?.full_name || '');
    const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || '');

    const handleSaveConfig = () => {
        showToast("System configuration updated", "success");
    };

    const handleUpdateProfile = async () => {
        if (!user) return;
        setUpdating(true);
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ full_name: fullName, avatar_url: avatarUrl })
                .eq('id', user.id);

            if (error) throw error;
            await refreshProfile();
            showToast("Identity profile updated", "success");
        } catch (err) {
            showToast("Failed to update profile", "error");
        } finally {
            setUpdating(false);
        }
    };

    const tiers = {
        free: { label: 'FREE ORCHESTRATOR', color: 'slate' },
        pro: { label: 'PRO COMMANDER', color: 'purple' },
        enterprise: { label: 'ENTERPRISE OVERLORD', color: 'blue' }
    };

    const currentTier = profile?.subscription_tier || 'free';

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
                    <button
                        onClick={() => signOut()}
                        className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-100 transition-all border border-red-100"
                    >
                        <LogOut size={14} /> Kill Session
                    </button>
                </div>

                <div className="grid gap-12">
                    {/* 1. IDENTITY & SUBSCRIPTION */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Profile Section */}
                        <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-10 flex flex-col items-center">
                            <div className="relative group mb-8">
                                <div className="w-32 h-32 rounded-[2.5rem] bg-slate-100 overflow-hidden border-4 border-white shadow-xl">
                                    <img
                                        src={avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-2xl shadow-lg border border-slate-100 text-purple-600">
                                    <User size={18} />
                                </div>
                            </div>

                            <div className="w-full space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1 text-center block">Neural Designate</label>
                                    <input
                                        value={fullName}
                                        onChange={e => setFullName(e.target.value)}
                                        placeholder="Enter your name"
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-center text-sm font-black text-slate-900 focus:border-purple-500 focus:bg-white focus:outline-none transition-all"
                                    />
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Authenticated Node</div>
                                    <div className="text-xs font-bold text-slate-600 truncate">{user?.email}</div>
                                </div>
                                <button
                                    onClick={handleUpdateProfile}
                                    disabled={updating}
                                    className="w-full bg-slate-950 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-slate-800 transition-all disabled:opacity-50"
                                >
                                    {updating ? 'Syncing...' : 'Update Identity'}
                                </button>
                            </div>
                        </div>

                        {/* Subscription Card */}
                        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-[40px] shadow-2xl p-10 text-white flex flex-col">
                            <div className="flex justify-between items-start mb-10">
                                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                                    <CreditCard size={24} />
                                </div>
                                <span className="bg-white/20 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                                    {tiers[currentTier as keyof typeof tiers].label}
                                </span>
                            </div>

                            <h3 className="text-2xl font-black mb-2 italic">Neural Power Consumption</h3>
                            <p className="text-purple-100 text-sm font-medium mb-10">Manage your orchestration limits and resource nodes.</p>

                            <div className="space-y-4 mb-10">
                                <div className="flex justify-between text-xs font-black uppercase tracking-widest text-purple-200">
                                    <span>API Units Used</span>
                                    <span>{profile?.api_calls_made || 0} / {currentTier === 'free' ? '50' : '∞'}</span>
                                </div>
                                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-white rounded-full transition-all duration-1000"
                                        style={{ width: `${Math.min(((profile?.api_calls_made || 0) / 50) * 100, 100)}%` }}
                                    />
                                </div>
                            </div>

                            <div className="mt-auto">
                                <button className="w-full bg-white text-purple-700 py-5 rounded-3xl font-black text-[10px] uppercase tracking-[0.3em] shadow-lg hover:bg-purple-50 transition-all flex items-center justify-center gap-3">
                                    Manage Subscription <ExternalLink size={14} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 2. SYSTEM CONFIGURATION */}
                    <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden p-12">
                        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-12 flex items-center">
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
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2rem] pl-12 pr-6 py-5 text-sm font-bold text-slate-900 focus:border-purple-500 focus:bg-white focus:outline-none transition-all shadow-inner"
                                        placeholder="Enter secure node key..."
                                    />
                                </div>
                                <div className="flex items-center gap-2 ml-1">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Connection: <span className="text-green-500">Encrypted Transition Active</span></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* VAPI Configuration */}
                    <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden p-12">
                        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-12 flex items-center">
                            <Phone className="mr-3 text-green-500" size={16} /> Telephony Bridge (VAPI)
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] ml-1">Private Node Access</label>
                                <input
                                    type="password"
                                    value={settings.vapi?.privateApiKey || ''}
                                    onChange={(e) => onUpdate({ ...settings, vapi: { ...(settings.vapi || {}), privateApiKey: e.target.value } as any })}
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-5 text-sm font-bold text-slate-900 focus:border-green-500 focus:bg-white focus:outline-none transition-all"
                                    placeholder="Private Node ID..."
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] ml-1">Public Endpoint ID</label>
                                <input
                                    value={settings.vapi?.publicApiKey || ''}
                                    onChange={(e) => onUpdate({ ...settings, vapi: { ...(settings.vapi || {}), publicApiKey: e.target.value } as any })}
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-5 text-sm font-bold text-slate-900 focus:border-green-500 focus:bg-white focus:outline-none transition-all"
                                    placeholder="Public Node ID..."
                                />
                            </div>
                            <div className="md:col-span-2 space-y-4">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] ml-1">Allocated Phone Number ID</label>
                                <div className="relative">
                                    <Cpu className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                    <input
                                        value={settings.vapi?.phoneNumberId || ''}
                                        onChange={(e) => onUpdate({ ...settings, vapi: { ...(settings.vapi || {}), phoneNumberId: e.target.value } as any })}
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2rem] pl-12 pr-6 py-5 text-sm font-bold text-slate-900 focus:border-green-500 focus:bg-white focus:outline-none transition-all"
                                        placeholder="VAPI-PHONENUMBER-UID"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Operational Limits */}
                    <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden p-12">
                        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-12 flex items-center">
                            <Database className="mr-3 text-blue-500" size={16} /> Resource Allocation
                        </h2>
                        <div className="grid gap-12">
                            <div className="space-y-8">
                                <div className="flex justify-between items-center">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em]">Scout Batch Density</label>
                                    <span className="text-2xl font-black text-slate-900">{settings.scrapingBatchSize} <span className="text-[10px] text-slate-400">Leads/Cycle</span></span>
                                </div>
                                <input
                                    type="range"
                                    min="5"
                                    max="50"
                                    step="5"
                                    value={settings.scrapingBatchSize}
                                    onChange={(e) => onUpdate({ ...settings, scrapingBatchSize: parseInt(e.target.value) })}
                                    className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-purple-600"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em]">Active Sector</label>
                                    <div className="relative">
                                        <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                        <input
                                            value={settings.location}
                                            onChange={(e) => onUpdate({ ...settings, location: e.target.value })}
                                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2rem] pl-12 pr-6 py-5 text-sm font-bold text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em]">Operational Niche</label>
                                    <div className="relative">
                                        <Target className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                        <input
                                            value={settings.niche}
                                            onChange={(e) => onUpdate({ ...settings, niche: e.target.value })}
                                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2rem] pl-12 pr-6 py-5 text-sm font-bold text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Final Action */}
                    <div className="flex justify-center pt-8">
                        <button
                            onClick={handleSaveConfig}
                            className="bg-purple-600 text-white px-16 py-6 rounded-[3rem] font-black text-xs uppercase tracking-[0.4em] flex items-center gap-5 transition-all hover:bg-purple-700 hover:scale-105 active:scale-95 shadow-2xl shadow-purple-200"
                        >
                            <Save size={20} className="text-purple-200" />
                            Commit Global Parameters
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsView;
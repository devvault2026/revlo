import React, { useState, useEffect } from 'react';
import { Settings as SettingsType } from '../types';
import {
    Save, Shield, Database, Brain, Mail, MessageSquare,
    Phone, Globe, Terminal, Cpu, Target, User,
    CreditCard, Building2, LogOut, CheckCircle2, AlertTriangle, ExternalLink,
    Plus, Search, Loader2, Wifi, Trash2, Smartphone, AtSign // Added missing icons
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../../../context/AuthContext';
import { supabase } from '../../../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
import { validateApiKey } from '../services/geminiService';

interface SettingsViewProps {
    settings: SettingsType;
    onUpdate: (s: SettingsType) => void;
    onSaveExplicitly?: () => Promise<void>;
}

type Tab = 'overview' | 'communications' | 'organization' | 'neural';

interface ProvisionedIdentity {
    id: string;
    type: 'email' | 'phone';
    value: string;
    status: 'active' | 'provisioning' | 'failed';
    provider: 'revlo' | 'twilio' | 'google';
    cost: string;
    createdAt: string;
}

// --- Components ---

const IdentityCard: React.FC<{
    identity: ProvisionedIdentity;
    onRemove: (id: string) => void;
}> = ({ identity, onRemove }) => (
    <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${identity.type === 'email' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                {identity.type === 'email' ? <Mail size={20} /> : <Phone size={20} />}
            </div>
            <div>
                <div className="flex items-center gap-2">
                    <p className="font-bold text-slate-900">{identity.value}</p>
                    {identity.status === 'active' && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded-full">Active</span>
                    )}
                    {identity.status === 'provisioning' && (
                        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-[10px] font-bold uppercase rounded-full flex items-center gap-1">
                            <Loader2 size={8} className="animate-spin" /> Provisioning
                        </span>
                    )}
                </div>
                <p className="text-xs text-slate-500 font-medium">
                    {identity.provider === 'revlo' ? 'Revlo Secure Relay' : identity.provider === 'twilio' ? 'Twilio Voice Network' : 'Google Workspace Enterprise'} • {identity.cost}
                </p>
            </div>
        </div>
        <button
            onClick={() => onRemove(identity.id)}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
        >
            <Trash2 size={16} />
        </button>
    </div>
);

// --- Main View ---

const SettingsView: React.FC<SettingsViewProps> = ({ settings, onUpdate, onSaveExplicitly }) => {
    const { showToast } = useToast();
    const { user, profile, signOut, refreshProfile } = useAuth();
    console.log("DEBUG: SettingsView rendered with settings:", settings);

    // UI State
    const [activeTab, setActiveTab] = useState<Tab>('overview');
    const [updating, setUpdating] = useState(false);

    // Profile State
    const [fullName, setFullName] = useState(profile?.full_name || '');
    const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || '');
    const [isTestingKey, setIsTestingKey] = useState(false);
    const [keyStatus, setKeyStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');

    // Sync local state with profile updates
    useEffect(() => {
        if (profile) {
            setFullName(profile.full_name || '');
            setAvatarUrl(profile.avatar_url || '');
        }
    }, [profile]);

    // Provisioning State
    const [identities, setIdentities] = useState<ProvisionedIdentity[]>([]);
    const [isProvisioningEmail, setIsProvisioningEmail] = useState(false);
    const [isProvisioningPhone, setIsProvisioningPhone] = useState(false);
    const [newEmailPrefix, setNewEmailPrefix] = useState('');
    const [areaCode, setAreaCode] = useState('');

    // Load identities from metadata on mount
    useEffect(() => {
        const metadata = profile?.metadata as any;
        if (metadata?.identities) {
            setIdentities(metadata.identities as ProvisionedIdentity[]);
        }
    }, [profile]);

    // Save identities to supabase
    const saveIdentities = async (newIdentities: ProvisionedIdentity[]) => {
        if (!user) return;
        setIdentities(newIdentities);
        try {
            const currentMetadata = profile?.metadata as any || {};
            await supabase.from('profiles').update({
                metadata: { ...currentMetadata, identities: newIdentities }
            }).eq('id', user.id);
            refreshProfile();
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdateProfile = async () => {
        if (!user) return;
        setUpdating(true);
        try {
            console.log("SYSTEM: Syncing profile...", { fullName, avatarUrl });
            const { error } = await supabase
                .from('profiles')
                .update({
                    full_name: fullName,
                    avatar_url: avatarUrl,
                    updated_at: new Date().toISOString()
                })
                .eq('id', user.id);

            if (error) throw error;
            await refreshProfile();
            showToast("Identity parameters synchronized with core", "success");
        } catch (err: any) {
            console.error("Profile sync error:", err);
            showToast(`Profile sync failed: ${err.message || 'Unknown error'}`, "error");
        } finally {
            setUpdating(false);
        }
    };

    const handleTestKey = async () => {
        if (!settings.apiKey) {
            showToast("Enter an API key to initialize validation", "warning");
            return;
        }
        setIsTestingKey(true);
        setKeyStatus('idle');
        try {
            const isValid = await validateApiKey(settings.apiKey);
            if (isValid) {
                setKeyStatus('valid');
                showToast("Neural bridge established: Gemini Pro is active", "success");
                // Explicitly trigger a save if valid
                if (onSaveExplicitly) await onSaveExplicitly();
            } else {
                setKeyStatus('invalid');
                showToast("Neural link failed: Unauthorized or invalid key", "error");
            }
        } catch (err) {
            setKeyStatus('invalid');
            showToast("Connection protocol failure", "error");
        } finally {
            setIsTestingKey(false);
        }
    };

    const handleProvisionEmail = async () => {
        if (!newEmailPrefix) return;
        setIsProvisioningEmail(true);
        // Simulate API delay
        setTimeout(async () => {
            const newIdentity: ProvisionedIdentity = {
                id: crypto.randomUUID(),
                type: 'email',
                value: `${newEmailPrefix}@wearerevlo.com`,
                status: 'active',
                provider: 'revlo',
                cost: '$6.00/mo',
                createdAt: new Date().toISOString()
            };
            await saveIdentities([...identities, newIdentity]);
            setIsProvisioningEmail(false);
            setNewEmailPrefix('');
            showToast("New secure inbox provisioned", "success");
        }, 2000);
    };

    const handleProvisionPhone = async () => {
        if (!areaCode) return;
        setIsProvisioningPhone(true);
        // Simulate API delay
        setTimeout(async () => {
            // Generate random phone number
            const number = `+1 (${areaCode}) ${Math.floor(Math.random() * 899 + 100)}-${Math.floor(Math.random() * 8999 + 1000)}`;
            const newIdentity: ProvisionedIdentity = {
                id: crypto.randomUUID(),
                type: 'phone',
                value: number,
                status: 'active',
                provider: 'twilio',
                cost: '$2.00/mo',
                createdAt: new Date().toISOString()
            };
            await saveIdentities([...identities, newIdentity]);
            setIsProvisioningPhone(false);
            setAreaCode('');
            showToast("Dedicated line acquired", "success");
        }, 2500);
    };

    const handleRemoveIdentity = async (id: string) => {
        const newIdentities = identities.filter(i => i.id !== id);
        await saveIdentities(newIdentities);
        showToast("Identity resource released", "info");
    };

    // Tiers
    const tiers = {
        free: { label: 'FREE ORCHESTRATOR', color: 'slate' },
        pro: { label: 'PRO COMMANDER', color: 'purple' },
        enterprise: { label: 'ENTERPRISE OVERLORD', color: 'blue' }
    };
    const currentTier = profile?.subscription_tier || 'free';

    return (
        <div className="flex h-full bg-slate-50 overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-64 bg-white border-r border-slate-200 flex flex-col p-6">
                <div className="mb-8">
                    <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Console</h2>
                    <h1 className="text-xl font-black text-slate-900">Settings</h1>
                </div>

                <div className="space-y-1">
                    {[
                        { id: 'overview', label: 'Overview', icon: User },
                        { id: 'communications', label: 'Communications', icon: Wifi },
                        { id: 'organization', label: 'Organization', icon: Building2 },
                        { id: 'neural', label: 'Neural Configuration', icon: Brain },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as Tab)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id
                                ? 'bg-purple-50 text-purple-700 shadow-sm ring-1 ring-purple-100'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="mt-auto">
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
                <div className="max-w-4xl mx-auto">

                    {/* --- TAB: OVERVIEW --- */}
                    {activeTab === 'overview' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 mb-2">Identity & Access</h2>
                                    <p className="text-slate-500">Manage your neural presence and billing tier.</p>
                                </div>
                                <span className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest ${currentTier === 'pro' ? 'bg-purple-100 text-purple-700' : 'bg-slate-200 text-slate-600'
                                    }`}>
                                    {tiers[currentTier as keyof typeof tiers].label}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Edit Profile */}
                                <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                                    <div className="flex items-start gap-8">
                                        <div className="relative group">
                                            <div className="w-24 h-24 rounded-2xl bg-slate-100 overflow-hidden ring-4 ring-white shadow-lg">
                                                <img
                                                    src={avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
                                                    alt="Profile"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <button className="absolute -bottom-2 -right-2 p-2 bg-slate-900 text-white rounded-xl shadow-lg hover:scale-110 transition-transform">
                                                <User size={14} />
                                            </button>
                                        </div>
                                        <div className="flex-1 space-y-4">
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block">Display Name</label>
                                                <input
                                                    value={fullName}
                                                    onChange={e => setFullName(e.target.value)}
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block">Node ID</label>
                                                <div className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-500 cursor-not-allowed select-none">
                                                    {user?.id}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8 flex justify-end">
                                        <button
                                            onClick={handleUpdateProfile}
                                            disabled={updating}
                                            className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all disabled:opacity-50"
                                        >
                                            {updating ? 'Saving...' : 'Save Changes'}
                                        </button>
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-8 text-white flex flex-col justify-between shadow-xl">
                                    <div>
                                        <CreditCard className="mb-6 opacity-30" size={32} />
                                        <h3 className="text-2xl font-black mb-1">PRO Plan</h3>
                                        <p className="text-purple-200 text-sm">$97.00 / month</p>
                                    </div>
                                    <div className="mt-8">
                                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-purple-200 mb-2">
                                            <span>Credits</span>
                                            <span>85% Used</span>
                                        </div>
                                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                            <div className="h-full bg-white w-[85%] rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- TAB: COMMUNICATIONS --- */}
                    {activeTab === 'communications' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div>
                                <h2 className="text-3xl font-black text-slate-900 mb-2">Comms Infrastructure</h2>
                                <p className="text-slate-500">Provision dedicated email nodes and telephony bridges.</p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Email Provisioning */}
                                <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm h-full">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                            <Mail size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-slate-900">Email Nodes</h3>
                                            <p className="text-xs text-slate-500 font-medium">Google Workspace Enterprise</p>
                                        </div>
                                    </div>

                                    {/* List */}
                                    <div className="space-y-3 mb-8">
                                        {identities.filter(i => i.type === 'email').map(identity => (
                                            <IdentityCard key={identity.id} identity={identity} onRemove={handleRemoveIdentity} />
                                        ))}
                                        {identities.filter(i => i.type === 'email').length === 0 && (
                                            <div className="text-center py-6 border-2 border-dashed border-slate-100 rounded-xl text-slate-400 text-sm">
                                                No dedicated inboxes provisioned.
                                            </div>
                                        )}
                                    </div>

                                    {/* Action */}
                                    <div className="mt-auto pt-6 border-t border-slate-100">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">Provision New Inbox</label>
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <input
                                                    value={newEmailPrefix}
                                                    onChange={e => setNewEmailPrefix(e.target.value)}
                                                    placeholder="username"
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-32 py-3 font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                                />
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm pointer-events-none">
                                                    @wearerevlo.com
                                                </div>
                                            </div>
                                            <button
                                                onClick={handleProvisionEmail}
                                                disabled={isProvisioningEmail || !newEmailPrefix}
                                                className="bg-blue-600 text-white px-4 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center gap-2"
                                            >
                                                {isProvisioningEmail ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
                                            </button>
                                        </div>
                                        <p className="text-[10px] text-slate-400 mt-2 font-medium ml-1">
                                            Instant provisioning • $6.00/mo per seat • DKIM/SPF Ready
                                        </p>
                                    </div>
                                </div>

                                {/* Phone Provisioning */}
                                <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm h-full">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                                            <Smartphone size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-slate-900">Voice Bridges</h3>
                                            <p className="text-xs text-slate-500 font-medium">Twilio Network Grid</p>
                                        </div>
                                    </div>

                                    {/* List */}
                                    <div className="space-y-3 mb-8">
                                        {identities.filter(i => i.type === 'phone').map(identity => (
                                            <IdentityCard key={identity.id} identity={identity} onRemove={handleRemoveIdentity} />
                                        ))}
                                        {identities.filter(i => i.type === 'phone').length === 0 && (
                                            <div className="text-center py-6 border-2 border-dashed border-slate-100 rounded-xl text-slate-400 text-sm">
                                                No dedicated lines acquired.
                                            </div>
                                        )}
                                    </div>

                                    {/* Action */}
                                    <div className="mt-auto pt-6 border-t border-slate-100">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">Acquire Local Number</label>
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                <input
                                                    value={areaCode}
                                                    onChange={e => setAreaCode(e.target.value)}
                                                    maxLength={3}
                                                    placeholder="Area Code (e.g. 512)"
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 py-3 font-medium focus:ring-2 focus:ring-green-500 outline-none transition-all"
                                                />
                                            </div>
                                            <button
                                                onClick={handleProvisionPhone}
                                                disabled={isProvisioningPhone || areaCode.length < 3}
                                                className="bg-green-600 text-white px-4 rounded-xl font-bold hover:bg-green-700 disabled:opacity-50 transition-all flex items-center gap-2"
                                            >
                                                {isProvisioningPhone ? <Loader2 size={18} className="animate-spin" /> : 'Buy $2'}
                                            </button>
                                        </div>
                                        <p className="text-[10px] text-slate-400 mt-2 font-medium ml-1">
                                            SMS/Voice Capable • A2P 10DLC Compliant • Instant Activation
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- TAB: ORGANIZATION --- */}
                    {activeTab === 'organization' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div>
                                <h2 className="text-3xl font-black text-slate-900 mb-2">Organization</h2>
                                <p className="text-slate-500">Define operational parameters and market targeting.</p>
                            </div>

                            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden p-12">
                                <div className="grid gap-12">
                                    <div className="space-y-8">
                                        <div className="flex justify-between items-center">
                                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Scout Batch Density</label>
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
                                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Active Sector</label>
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
                                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Operational Niche</label>
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
                        </div>
                    )}

                    {/* --- TAB: NEURAL CONFIG --- */}
                    {activeTab === 'neural' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div>
                                <h2 className="text-3xl font-black text-slate-900 mb-2">Neural Configuration</h2>
                                <p className="text-slate-500">Advanced API connectivity and LLM parameters.</p>
                            </div>

                            {/* System Config */}
                            <div className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-sm space-y-8">
                                <h3 className="font-bold text-lg flex items-center gap-2">
                                    <Brain size={20} className="text-purple-600" />
                                    Gemini 2.0 Flash Neural Stack
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center ml-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">API Key</label>
                                        {keyStatus === 'valid' && <span className="text-[10px] font-black text-green-500 uppercase tracking-widest flex items-center gap-1"><CheckCircle2 size={10} /> Active</span>}
                                        {keyStatus === 'invalid' && <span className="text-[10px] font-black text-red-500 uppercase tracking-widest flex items-center gap-1"><AlertTriangle size={10} /> Link Severed</span>}
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="relative flex-1">
                                            <Terminal className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                            <input
                                                type="password"
                                                value={settings.apiKey}
                                                onChange={(e) => {
                                                    onUpdate({ ...settings, apiKey: e.target.value });
                                                    setKeyStatus('idle');
                                                }}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-[2rem] pl-12 pr-6 py-4 text-sm font-bold text-slate-900 focus:border-purple-500 focus:bg-white focus:outline-none transition-all font-mono"
                                                placeholder="sk-..."
                                            />
                                        </div>
                                        <button
                                            onClick={handleTestKey}
                                            disabled={isTestingKey}
                                            className="px-6 rounded-[2rem] bg-purple-600 text-white font-black uppercase tracking-widest text-[10px] hover:bg-purple-700 transition-all disabled:opacity-50 flex items-center gap-2"
                                        >
                                            {isTestingKey ? <Loader2 size={14} className="animate-spin" /> : <Wifi size={14} />}
                                            {isTestingKey ? 'Verifying...' : 'Test & Save'}
                                        </button>
                                    </div>
                                    <p className="text-[10px] text-slate-400 mt-2 font-medium ml-4 uppercase tracking-widest">
                                        Handshake protocol: Gemini-2.0-Flash Optimized • Encrypted Storage
                                    </p>
                                </div>
                            </div>

                            {/* VAPI Config */}
                            <div className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-sm space-y-8">
                                <h3 className="font-bold text-lg flex items-center gap-2">
                                    <Phone size={20} className="text-green-600" />
                                    VAPI Telephony Bridge
                                </h3>
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Private Key</label>
                                        <input
                                            type="password"
                                            value={settings.vapi?.privateApiKey || ''}
                                            onChange={(e) => onUpdate({ ...settings, vapi: { ...(settings.vapi || {}), privateApiKey: e.target.value } as any })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-green-500 outline-none transition-all font-mono"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Public Key</label>
                                        <input
                                            value={settings.vapi?.publicApiKey || ''}
                                            onChange={(e) => onUpdate({ ...settings, vapi: { ...(settings.vapi || {}), publicApiKey: e.target.value } as any })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-green-500 outline-none transition-all font-mono"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Assistant ID</label>
                                        <input
                                            value={settings.vapi?.phoneNumberId || ''}
                                            onChange={(e) => onUpdate({ ...settings, vapi: { ...(settings.vapi || {}), phoneNumberId: e.target.value } as any })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-green-500 outline-none transition-all font-mono"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SettingsView;
import React from 'react';
import { Settings } from '../types';
import { Save, Shield, Database, Brain, Mail, MessageSquare, Phone } from 'lucide-react';

interface SettingsViewProps {
    settings: Settings;
    onUpdate: (s: Settings) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ settings, onUpdate }) => {
    return (
        <div className="h-full bg-slate-50 text-slate-900 overflow-y-auto -m-8 p-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">System Configuration</h1>
                <p className="text-slate-600 mb-8">Manage AI parameters, scraping limits, and global preferences.</p>

                {/* AI Configuration */}
                <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                        <Brain className="mr-2 text-purple-600" /> AI Core
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Gemini API Key</label>
                            <input
                                type="password"
                                value={settings.apiKey}
                                onChange={(e) => onUpdate({ ...settings, apiKey: e.target.value })}
                                className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                                placeholder="sk-..."
                            />
                            <p className="text-xs text-slate-500 mt-1">Key is stored in local session only.</p>
                        </div>
                    </div>
                </div>

                {/* VAPI Telephony Configuration */}
                <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                        <Phone className="mr-2 text-green-600" /> VAPI Telephony (Voice Agent)
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Private API Key</label>
                            <input
                                type="password"
                                value={settings.vapi?.privateApiKey || ''}
                                onChange={(e) => onUpdate({ ...settings, vapi: { ...(settings.vapi || {}), privateApiKey: e.target.value } as any })}
                                className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
                                placeholder="VAPI Private Key..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Public API Key</label>
                            <input
                                value={settings.vapi?.publicApiKey || ''}
                                onChange={(e) => onUpdate({ ...settings, vapi: { ...(settings.vapi || {}), publicApiKey: e.target.value } as any })}
                                className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
                                placeholder="VAPI Public Key..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number ID</label>
                            <input
                                value={settings.vapi?.phoneNumberId || ''}
                                onChange={(e) => onUpdate({ ...settings, vapi: { ...(settings.vapi || {}), phoneNumberId: e.target.value } as any })}
                                className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
                                placeholder="VAPI Phone Number ID..."
                            />
                            <p className="text-xs text-slate-500 mt-1">Found in VAPI Dashboard &gt; Phone Numbers</p>
                        </div>
                    </div>
                </div>

                {/* Scraping Limits */}
                <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                        <Database className="mr-2 text-blue-600" /> Engine Parameters
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Batch Size (Leads per Scout)</label>
                            <div className="flex items-center space-x-4">
                                <input
                                    type="range"
                                    min="5"
                                    max="50"
                                    step="5"
                                    value={settings.scrapingBatchSize}
                                    onChange={(e) => onUpdate({ ...settings, scrapingBatchSize: parseInt(e.target.value) })}
                                    className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                                />
                                <span className="bg-slate-100 px-3 py-1 rounded-lg text-slate-900 font-mono border border-slate-200 w-16 text-center">
                                    {settings.scrapingBatchSize}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Default Niche</label>
                                <input
                                    value={settings.niche}
                                    onChange={(e) => onUpdate({ ...settings, niche: e.target.value })}
                                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Default Region</label>
                                <input
                                    value={settings.location}
                                    onChange={(e) => onUpdate({ ...settings, location: e.target.value })}
                                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Outreach Configuration (Sticky) */}
                <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                        <Mail className="mr-2 text-purple-600" /> Outreach & Gateway
                    </h2>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">SendGrid API Key</label>
                                <input
                                    type="password"
                                    value={settings.outreach.sendGridApiKey}
                                    onChange={(e) => onUpdate({ ...settings, outreach: { ...settings.outreach, sendGridApiKey: e.target.value } })}
                                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                                    placeholder="SG..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Sender Email</label>
                                <input
                                    value={settings.outreach.senderEmail}
                                    onChange={(e) => onUpdate({ ...settings, outreach: { ...settings.outreach, senderEmail: e.target.value } })}
                                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                                    placeholder="you@agency.com"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button className="bg-gradient-rainbow text-white px-6 py-2 rounded-lg font-medium flex items-center shadow-md hover:shadow-lg transition-all">
                        <Save size={18} className="mr-2" />
                        Save Configuration
                    </button>
                </div>

            </div>
        </div>
    );
};

export default SettingsView;
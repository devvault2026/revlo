import React from 'react';
import { Settings } from '../types';
import { Save, Shield, Database, Brain, Mail, MessageSquare, Phone } from 'lucide-react';

interface SettingsViewProps {
  settings: Settings;
  onUpdate: (s: Settings) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ settings, onUpdate }) => {
  return (
    <div className="p-8 h-full bg-slate-950 text-slate-200 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">System Configuration</h1>
        <p className="text-slate-500 mb-8">Manage AI parameters, scraping limits, and global preferences.</p>

        {/* AI Configuration */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Brain className="mr-2 text-accent-500" /> AI Core
            </h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Gemini API Key</label>
                    <input 
                        type="password"
                        value={settings.apiKey}
                        onChange={(e) => onUpdate({...settings, apiKey: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded px-4 py-2 text-white focus:border-accent-500 focus:outline-none"
                        placeholder="sk-..."
                    />
                    <p className="text-xs text-slate-600 mt-1">Key is stored in local session only.</p>
                </div>
            </div>
        </div>

        {/* VAPI Telephony Configuration */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Phone className="mr-2 text-green-500" /> VAPI Telephony (Voice Agent)
            </h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Private API Key</label>
                    <input 
                        type="password"
                        value={settings.vapi?.privateApiKey || ''}
                        onChange={(e) => onUpdate({...settings, vapi: {...(settings.vapi || {}), privateApiKey: e.target.value} as any})}
                        className="w-full bg-slate-950 border border-slate-800 rounded px-4 py-2 text-white focus:border-green-500 focus:outline-none"
                        placeholder="VAPI Private Key..."
                    />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Public API Key</label>
                    <input 
                        value={settings.vapi?.publicApiKey || ''}
                        onChange={(e) => onUpdate({...settings, vapi: {...(settings.vapi || {}), publicApiKey: e.target.value} as any})}
                        className="w-full bg-slate-950 border border-slate-800 rounded px-4 py-2 text-white focus:border-green-500 focus:outline-none"
                        placeholder="VAPI Public Key..."
                    />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Phone Number ID</label>
                    <input 
                        value={settings.vapi?.phoneNumberId || ''}
                        onChange={(e) => onUpdate({...settings, vapi: {...(settings.vapi || {}), phoneNumberId: e.target.value} as any})}
                        className="w-full bg-slate-950 border border-slate-800 rounded px-4 py-2 text-white focus:border-green-500 focus:outline-none"
                        placeholder="VAPI Phone Number ID..."
                    />
                    <p className="text-xs text-slate-600 mt-1">Found in VAPI Dashboard -> Phone Numbers</p>
                </div>
            </div>
        </div>

        {/* Scraping Limits */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Database className="mr-2 text-blue-500" /> Engine Parameters
            </h2>
            <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Batch Size (Leads per Scout)</label>
                    <div className="flex items-center space-x-4">
                        <input 
                            type="range"
                            min="5"
                            max="50"
                            step="5"
                            value={settings.scrapingBatchSize}
                            onChange={(e) => onUpdate({...settings, scrapingBatchSize: parseInt(e.target.value)})}
                            className="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-accent-500"
                        />
                        <span className="bg-slate-800 px-3 py-1 rounded text-white font-mono border border-slate-700 w-16 text-center">
                            {settings.scrapingBatchSize}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Default Niche</label>
                        <input 
                            value={settings.niche}
                            onChange={(e) => onUpdate({...settings, niche: e.target.value})}
                            className="w-full bg-slate-950 border border-slate-800 rounded px-4 py-2 text-white focus:border-accent-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Default Region</label>
                        <input 
                            value={settings.location}
                            onChange={(e) => onUpdate({...settings, location: e.target.value})}
                            className="w-full bg-slate-950 border border-slate-800 rounded px-4 py-2 text-white focus:border-accent-500 focus:outline-none"
                        />
                    </div>
                </div>
            </div>
        </div>

        {/* Outreach Configuration (Sticky) */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Mail className="mr-2 text-purple-500" /> Outreach & Gateway
            </h2>
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">SendGrid API Key</label>
                        <input 
                            type="password"
                            value={settings.outreach.sendGridApiKey}
                            onChange={(e) => onUpdate({...settings, outreach: {...settings.outreach, sendGridApiKey: e.target.value}})}
                            className="w-full bg-slate-950 border border-slate-800 rounded px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
                            placeholder="SG..."
                        />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Sender Email</label>
                        <input 
                            value={settings.outreach.senderEmail}
                            onChange={(e) => onUpdate({...settings, outreach: {...settings.outreach, senderEmail: e.target.value}})}
                            className="w-full bg-slate-950 border border-slate-800 rounded px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
                            placeholder="you@agency.com"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div className="flex justify-end">
             <button className="bg-primary-600 hover:bg-primary-500 text-white px-6 py-2 rounded font-medium flex items-center">
                 <Save size={18} className="mr-2" />
                 Save Configuration
             </button>
        </div>

      </div>
    </div>
  );
};

export default SettingsView;
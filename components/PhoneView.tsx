import React, { useState, useEffect } from 'react';
import { Lead, AgentProfile, VapiConfig, LeadStatus, CallLog } from '../types';
import { Phone, PhoneForwarded, PhoneMissed, Mic, Volume2, User, Activity, Globe, Play, Square, Settings } from 'lucide-react';
import * as VapiService from '../services/vapiService';

interface PhoneViewProps {
    leads: Lead[];
    agents: AgentProfile[];
    vapiConfig: VapiConfig;
    updateLead: (lead: Lead) => void;
}

const PhoneView: React.FC<PhoneViewProps> = ({ leads, agents, vapiConfig, updateLead }) => {
    // Only leads with phone numbers are valid targets
    const validLeads = leads.filter(l => l.phone && l.phone.length > 5);
    
    const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
    const [selectedAgentId, setSelectedAgentId] = useState<string>(agents[0]?.id || '');
    const [activeCallId, setActiveCallId] = useState<string | null>(null);
    const [callStatus, setCallStatus] = useState<string>('idle'); // idle, dialing, connected, ended
    const [callDuration, setCallDuration] = useState(0);
    
    const selectedLead = validLeads.find(l => l.id === selectedLeadId);
    const selectedAgent = agents.find(a => a.id === selectedAgentId);

    // Call Timer
    useEffect(() => {
        let interval: any;
        if (callStatus === 'connected') {
            interval = setInterval(() => setCallDuration(prev => prev + 1), 1000);
        } else {
            setCallDuration(0);
        }
        return () => clearInterval(interval);
    }, [callStatus]);

    // Simple Polling for status (Simulating socket)
    useEffect(() => {
        let poll: any;
        if (activeCallId && (callStatus === 'dialing' || callStatus === 'connected')) {
            poll = setInterval(async () => {
                const status = await VapiService.getCallStatus(vapiConfig, activeCallId);
                if (status) {
                    if (status.status === 'ended') {
                        setCallStatus('ended');
                        // Update lead history
                        if (selectedLead) {
                            const newCallLog: CallLog = {
                                id: crypto.randomUUID(),
                                vapiCallId: activeCallId,
                                status: 'completed',
                                durationSeconds: status.durationSeconds || 0,
                                timestamp: new Date().toISOString(),
                                summary: status.summary || "Call ended normally."
                            };
                            updateLead({
                                ...selectedLead,
                                status: LeadStatus.CALLED,
                                calls: [...(selectedLead.calls || []), newCallLog]
                            });
                        }
                        setActiveCallId(null);
                        clearInterval(poll);
                    } else if (status.status === 'in-progress') {
                        setCallStatus('connected');
                    }
                }
            }, 2000);
        }
        return () => clearInterval(poll);
    }, [activeCallId, callStatus, selectedLead, vapiConfig, updateLead]);

    const handleCall = async () => {
        if (!selectedLead || !selectedAgent) return;
        
        if (!vapiConfig.privateApiKey) {
            alert("VAPI Private Key missing in Settings.");
            return;
        }

        setCallStatus('dialing');
        
        const result = await VapiService.initiateOutboundCall(vapiConfig, selectedLead, selectedAgent);
        
        if (result.success && result.callId) {
            setActiveCallId(result.callId);
        } else {
            setCallStatus('idle');
            alert(`Call Failed: ${result.error}`);
        }
    };

    const handleHangup = () => {
        // In a real impl, we'd hit VAPI hangup endpoint. For now, we reset UI.
        setCallStatus('ended');
        setTimeout(() => setCallStatus('idle'), 1000);
        setActiveCallId(null);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex h-full bg-slate-950 text-slate-200">
            {/* Left: Lead Selector */}
            <div className="w-80 border-r border-slate-800 bg-slate-900 flex flex-col">
                <div className="p-4 border-b border-slate-800">
                    <h2 className="text-xl font-bold text-white flex items-center mb-1">
                        <Phone className="mr-2 text-accent-500" size={20}/> Voice Command
                    </h2>
                    <p className="text-xs text-slate-500">Autonomous Outbound Dispatch</p>
                </div>
                
                {/* Agent Selector */}
                <div className="p-4 border-b border-slate-800 bg-slate-900/50">
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Active Voice Agent</label>
                    <select 
                        value={selectedAgentId} 
                        onChange={e=>setSelectedAgentId(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white focus:border-accent-500 focus:outline-none"
                    >
                        {agents.map(a => <option key={a.id} value={a.id}>{a.name} ({a.role})</option>)}
                    </select>
                    {selectedAgent && (
                         <div className="mt-2 text-[10px] text-slate-400 flex items-center">
                             <Activity size={10} className="mr-1 text-green-500"/> 
                             Voice: {selectedAgent.voiceConfig?.voiceId || 'Default (ElevenLabs)'}
                         </div>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto">
                    {validLeads.map(lead => (
                        <div 
                            key={lead.id}
                            onClick={() => setSelectedLeadId(lead.id)}
                            className={`p-4 border-b border-slate-800 cursor-pointer hover:bg-slate-800/50 transition-colors ${selectedLeadId === lead.id ? 'bg-slate-800 border-l-2 border-l-accent-500' : ''}`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-bold text-sm text-white">{lead.name}</span>
                                {lead.status === LeadStatus.CALLED && <PhoneForwarded size={12} className="text-green-500"/>}
                            </div>
                            <div className="flex items-center text-xs text-slate-400 mb-1">
                                <Phone size={10} className="mr-1"/> {lead.phone}
                            </div>
                            <div className="flex items-center text-xs text-slate-500">
                                <Globe size={10} className="mr-1"/> {lead.website ? 'Has Site' : 'No Site'}
                            </div>
                        </div>
                    ))}
                    {validLeads.length === 0 && (
                        <div className="p-8 text-center text-slate-600">
                            No leads with phone numbers.
                        </div>
                    )}
                </div>
            </div>

            {/* Center: Active Call UI */}
            <div className="flex-1 flex flex-col relative overflow-hidden bg-slate-950">
                {selectedLead ? (
                    <div className="flex-1 flex flex-col items-center justify-center relative z-10 p-8">
                        
                        {/* Avatar / Profile */}
                        <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-6 transition-all duration-500 ${callStatus === 'connected' ? 'bg-green-500/20 border-4 border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)] animate-pulse' : 'bg-slate-800 border-4 border-slate-700'}`}>
                            <User size={48} className={callStatus === 'connected' ? 'text-green-500' : 'text-slate-500'} />
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-1">{selectedLead.name}</h2>
                        <p className="text-lg text-slate-400 mb-8 font-mono">{selectedLead.phone}</p>

                        {/* Status Indicator */}
                        <div className="mb-8 h-8">
                            {callStatus === 'dialing' && <span className="text-accent-500 font-bold animate-pulse uppercase tracking-widest">Dialing...</span>}
                            {callStatus === 'connected' && <span className="text-green-500 font-bold uppercase tracking-widest flex items-center"><Activity size={16} className="mr-2"/> Live Connection ({formatTime(callDuration)})</span>}
                            {callStatus === 'ended' && <span className="text-red-500 font-bold uppercase tracking-widest">Call Ended</span>}
                            {callStatus === 'idle' && <span className="text-slate-600 uppercase tracking-widest text-sm">Ready to Dispatch</span>}
                        </div>

                        {/* Controls */}
                        <div className="flex space-x-6">
                            {callStatus === 'idle' || callStatus === 'ended' ? (
                                <button 
                                    onClick={handleCall}
                                    className="w-16 h-16 rounded-full bg-green-600 hover:bg-green-500 flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                                >
                                    <Phone size={28} className="text-white" />
                                </button>
                            ) : (
                                <button 
                                    onClick={handleHangup}
                                    className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-500 flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                                >
                                    <Square size={24} className="text-white fill-current" />
                                </button>
                            )}
                        </div>

                        {/* Script Preview */}
                        <div className="mt-12 max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-lg p-6">
                            <h4 className="text-xs font-bold text-slate-500 uppercase mb-3 flex items-center"><Settings size={12} className="mr-1"/> Agent Script Protocol</h4>
                            <p className="text-sm text-slate-300 italic leading-relaxed">
                                "Hey, we found your site <span className="text-accent-500 font-bold">{selectedLead.website || 'domain'}</span> and noticed its a little wonky... we went ahead and took the initiative and built you out a demo to offer a new facelift. We fired you off an email a few minutes ago with all the info. You can call us back here anytime or check the link to book a time if you want us to claim it for you."
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-600">
                        <PhoneMissed size={48} className="mb-4 opacity-20" />
                        <p>Select a lead to initialize voice link.</p>
                    </div>
                )}
                
                {/* Visualization Background */}
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none flex items-center justify-center">
                    {/* Abstract wave or grid could go here */}
                    <div className="w-[800px] h-[800px] border border-slate-800 rounded-full flex items-center justify-center">
                         <div className="w-[600px] h-[600px] border border-slate-800 rounded-full flex items-center justify-center">
                             <div className="w-[400px] h-[400px] border border-slate-800 rounded-full"></div>
                         </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default PhoneView;
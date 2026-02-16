import React, { useState, useEffect } from 'react';
import { Lead, AgentProfile, VapiConfig, LeadStatus, CallLog } from '../types';
import { Phone, PhoneForwarded, PhoneMissed, Mic, Volume2, VolumeX, User, Activity, Globe, Play, Square, Settings } from 'lucide-react';
import * as VapiService from '../services/vapiService';
import { useToast } from '../context/ToastContext';

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
    const [callStatus, setCallStatus] = useState<string>('idle'); //idle, dialing, connected, ended
    const [callDuration, setCallDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);

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

    const { showToast } = useToast();

    const handleCall = async () => {
        if (!selectedLead || !selectedAgent) return;

        if (!vapiConfig.privateApiKey) {
            showToast("VAPI Private Key missing in Settings.", "warning");
            return;
        }

        setCallStatus('dialing');

        const result = await VapiService.initiateOutboundCall(vapiConfig, selectedLead, selectedAgent);

        if (result.success && result.callId) {
            setActiveCallId(result.callId);
            showToast(`Connection established with ${selectedLead.name}`, "success");
        } else {
            setCallStatus('idle');
            showToast(`Call Protocol Failed: ${result.error}`, "error");
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
        <div className="flex h-full bg-white text-slate-700 overflow-hidden">
            {/* Left: Lead Selector */}
            <div className="w-80 border-r border-slate-200 bg-slate-50 flex flex-col h-full overflow-x-hidden">
                <div className="p-8 border-b border-slate-200 bg-white">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-2 h-4 bg-purple-600 rounded-full" />
                        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Voice Directory</h2>
                    </div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-1">Dispatch OS</h1>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Autonomous Communication</p>
                </div>

                {/* Agent Selector */}
                <div className="p-6 border-b border-slate-200 bg-slate-50">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2.5">Active Voice Agent</label>
                    <div className="relative">
                        <select
                            value={selectedAgentId}
                            onChange={e => setSelectedAgentId(e.target.value)}
                            className="w-full bg-white border-2 border-slate-200 rounded-xl p-3 text-sm text-slate-900 font-bold focus:border-purple-500 focus:outline-none appearance-none transition-all shadow-sm"
                        >
                            {agents.map(a => <option key={a.id} value={a.id}>{a.name} ({a.role})</option>)}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <Settings size={14} />
                        </div>
                    </div>
                    {selectedAgent && (
                        <div className="mt-3 text-[10px] text-slate-500 flex items-center font-bold uppercase tracking-wider">
                            <Activity size={12} className="mr-2 text-green-500 drop-shadow-sm" />
                            Voice: <span className="text-purple-600 ml-1">{selectedAgent.voiceConfig?.voiceId || 'Default (ElevenLabs)'}</span>
                        </div>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto">
                    {validLeads.map(lead => (
                        <div
                            key={lead.id}
                            onClick={() => setSelectedLeadId(lead.id)}
                            className={`p-5 border-b border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors ${selectedLeadId === lead.id ? 'bg-white border-r-4 border-r-purple-600 shadow-sm' : ''}`}
                        >
                            <div className="flex justify-between items-start mb-1.5">
                                <span className="font-bold text-sm text-slate-900">{lead.name}</span>
                                {lead.status === LeadStatus.CALLED && <PhoneForwarded size={14} className="text-green-500" />}
                            </div>
                            <div className="flex items-center text-xs text-slate-500 mb-1.5 font-medium">
                                <Phone size={12} className="mr-2 opacity-50" /> {lead.phone}
                            </div>
                            <div className="flex items-center text-[10px] text-slate-400 font-black uppercase tracking-widest">
                                <Globe size={12} className="mr-2 opacity-50" /> {lead.website ? 'Has Site' : 'No Site'}
                            </div>
                        </div>
                    ))}
                    {validLeads.length === 0 && (
                        <div className="p-10 text-center text-slate-400">
                            <p className="font-bold uppercase tracking-widest text-[10px] opacity-60">No targets found</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Center: Active Call UI */}
            <div className="flex-1 flex flex-col relative overflow-hidden bg-slate-50/30 h-full">
                {selectedLead ? (
                    <div className="flex-1 flex flex-col items-center justify-center relative z-10 p-4 lg:p-8">

                        {/* Avatar / Profile */}
                        <div
                            className={`w-32 h-32 rounded-full flex items-center justify-center mb-6 transition-all duration-500 border-4 shadow-xl ${callStatus === 'connected'
                                ? 'bg-green-50 border-green-500 shadow-green-100 animate-pulse'
                                : 'bg-white border-slate-100'
                                }`}
                        >
                            <User size={48} className={callStatus === 'connected' ? 'text-green-500' : 'text-slate-300'} />
                        </div>

                        <h2 className="text-2xl font-black text-slate-900 mb-1">{selectedLead.name}</h2>
                        <p className="text-lg text-slate-500 mb-6 font-mono font-bold tracking-tighter">{selectedLead.phone}</p>

                        {/* Status Indicator */}
                        <div className="mb-6 h-10 flex items-center justify-center">
                            {callStatus === 'dialing' && <span className="text-purple-600 font-black animate-pulse uppercase tracking-[0.2em] text-xs">Initiating Dial...</span>}
                            {callStatus === 'connected' && (
                                <span className="text-green-600 font-black uppercase tracking-[0.2em] text-xs flex items-center bg-green-50 px-5 py-2 rounded-full border border-green-100 shadow-sm">
                                    <Activity size={14} className="mr-2.5" />
                                    Live Connection <span className="ml-2.5 text-slate-400 font-mono">({formatTime(callDuration)})</span>
                                </span>
                            )}
                            {callStatus === 'ended' && <span className="text-red-500 font-black uppercase tracking-[0.2em] text-xs">Signal Terminated</span>}
                            {callStatus === 'idle' && <span className="text-slate-400 font-black uppercase tracking-[0.15em] text-[10px]">Neural Bridge Optimized</span>}
                        </div>

                        {/* Call Controls */}
                        <div className="flex gap-4">
                            <button
                                onClick={() => setIsMuted(!isMuted)}
                                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md transition-all hover:scale-110 active:scale-95 ${isMuted ? 'bg-slate-200 text-slate-500' : 'bg-purple-50 text-purple-600 hover:bg-purple-100'}`}
                            >
                                {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
                            </button>

                            {callStatus === 'idle' || callStatus === 'ended' ? (
                                <button
                                    onClick={handleCall}
                                    className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center shadow-lg shadow-green-200 transition-all hover:scale-110 active:scale-95 group"
                                >
                                    <Phone size={28} className="text-white group-hover:rotate-12 transition-transform" />
                                </button>
                            ) : (
                                <button
                                    onClick={handleHangup}
                                    className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-400 flex items-center justify-center shadow-lg shadow-red-200 transition-all hover:scale-110 active:scale-95 group"
                                >
                                    <Square size={24} className="text-white fill-current group-hover:scale-90 transition-transform" />
                                </button>
                            )}
                        </div>

                        {/* Script Preview */}
                        <div className="mt-8 lg:mt-12 max-w-xl w-full bg-white border-2 border-slate-100 rounded-2xl p-6 shadow-sm relative group overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-purple-600 opacity-20 group-hover:opacity-100 transition-opacity"></div>
                            <h4 className="text-[10px] font-black text-slate-400 uppercase mb-3 flex items-center tracking-[0.2em]"><Settings size={14} className="mr-2 text-purple-600" /> Agent Script Protocol</h4>
                            <p className="text-sm text-slate-600 italic font-medium leading-relaxed">
                                {selectedLead.voiceScript ? (
                                    <span>"{selectedLead.voiceScript}"</span>
                                ) : (
                                    <span>"Hey, we found your site <span className="text-purple-600 font-bold not-italic underline decoration-2 underline-offset-4">{selectedLead.website || 'domain'}</span> and noticed its a little wonky... we went ahead and took the initiative and built you out a demo to offer a new facelift. We fired you off an email a few minutes ago with all the info. You can call us back here anytime or check the link to book a time if you want us to claim it for you."</span>
                                )}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-10 border border-slate-100 shadow-2xl">
                            <PhoneForwarded size={40} className="text-purple-300 animate-pulse" />
                        </div>
                        <h2 className="text-xl font-black text-slate-900 uppercase tracking-[0.3em] leading-none mb-4">Dispatch Inactive</h2>
                        <p className="max-w-xs mx-auto text-slate-400 font-bold text-sm leading-relaxed uppercase tracking-widest opacity-60">
                            Select an active target from the voice directory to initialize the neural communication bridge.
                        </p>
                    </div>
                )}

                {/* Visualization Background */}
                <div className="absolute inset-0 z-0 opacity-5 pointer-events-none flex items-center justify-center">
                    <div className="w-[800px] h-[800px] border border-slate-200 rounded-full flex items-center justify-center">
                        <div className="w-[600px] h-[600px] border border-slate-200 rounded-full flex items-center justify-center">
                            <div className="w-[400px] h-[400px] border border-slate-200 rounded-full flex items-center justify-center">
                                <div className="w-[200px] h-[200px] border border-slate-200 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PhoneView;
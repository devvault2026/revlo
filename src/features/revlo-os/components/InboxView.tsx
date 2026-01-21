import React, { useState } from 'react';
import { Lead, LeadStatus, Message } from '../types';
import { Search, Send, User, Reply, Phone, Mail, Maximize2, Minimize2 } from 'lucide-react';

interface InboxViewProps {
    leads: Lead[];
    onSendMessage: (leadId: string, content: string) => void;
}

const InboxView: React.FC<InboxViewProps> = ({ leads, onSendMessage }) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    // Filter for leads that have been contacted or replied
    const activeConversations = leads.filter(l =>
        [LeadStatus.CONTACTED, LeadStatus.REPLIED].includes(l.status) || (l.messages && l.messages.length > 0)
    );

    const [selectedLeadId, setSelectedLeadId] = useState<string | null>(activeConversations[0]?.id || null);
    const [replyText, setReplyText] = useState('');

    const selectedLead = leads.find(l => l.id === selectedLeadId);

    const handleSend = () => {
        if (!selectedLeadId || !replyText.trim()) return;
        onSendMessage(selectedLeadId, replyText);
        setReplyText('');
    };

    return (
        <div className="flex h-full bg-white overflow-hidden">

            {/* Thread List */}
            <div className={`transition-all duration-300 border-r border-slate-200 bg-slate-50 flex flex-col h-full ${isSidebarCollapsed ? 'w-20' : 'w-80'}`}>
                <div className={`border-b border-slate-100 bg-white transition-all duration-300 flex flex-col ${isSidebarCollapsed ? 'h-24 items-center justify-center p-0' : 'p-8'}`}>
                    {!isSidebarCollapsed ? (
                        <>
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-4 bg-purple-600 rounded-full" />
                                    <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Transmission Directory</h2>
                                </div>
                                <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                                    <Minimize2 size={16} />
                                </button>
                            </div>
                            <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-1">Comm Hub</h1>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-6">Active Data Streams</p>

                            <div className="relative">
                                <Search className="absolute left-3.5 top-3 text-slate-400" size={16} />
                                <input
                                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-900 focus:border-purple-500 focus:outline-none transition-all placeholder:text-slate-400 font-bold"
                                    placeholder="Find records..."
                                />
                            </div>
                        </>
                    ) : (
                        <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-purple-600 hover:border-purple-200 transition-all shadow-sm">
                            <Maximize2 size={18} />
                        </button>
                    )}
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
                    {activeConversations.map(lead => (
                        <div
                            key={lead.id}
                            onClick={() => setSelectedLeadId(lead.id)}
                            className={`p-4 rounded-2xl cursor-pointer transition-all border ${selectedLeadId === lead.id
                                ? 'bg-purple-600 text-white border-purple-600 shadow-xl'
                                : 'bg-white border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-200'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className={`font-black text-sm truncate pr-2 ${selectedLeadId === lead.id ? 'text-white' : 'text-slate-900'}`}>{lead.name}</span>
                                <span className="text-[9px] text-slate-400 shrink-0">2m</span>
                            </div>
                            <p className={`text-xs truncate ${selectedLeadId === lead.id ? 'text-purple-200' : 'text-slate-500'}`}>
                                {lead.messages?.[lead.messages.length - 1]?.content || lead.outreachEmailSubject || 'No messages yet'}
                            </p>
                        </div>
                    ))}
                    {activeConversations.length === 0 && (
                        <div className="p-10 text-center text-slate-400">
                            <p className="font-medium text-sm">No active transmissions.</p>
                            <p className="text-[10px] mt-3 uppercase font-black tracking-widest opacity-60">Initiate outreach via Engine OS</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Conversation Area */}
            <div className="flex-1 flex flex-col bg-slate-50/50 overflow-hidden">
                {selectedLead ? (
                    <>
                        <div className="p-6 border-b border-slate-100 bg-white flex justify-between items-center shadow-sm z-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-purple-200">
                                    {selectedLead.name.charAt(0)}
                                </div>
                                <div className="min-w-0">
                                    <h2 className="text-lg font-black text-slate-900 truncate tracking-tight">{selectedLead.name}</h2>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        Encryption Active
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2 text-slate-400">
                                <button className="p-2.5 hover:bg-slate-50 rounded-xl transition-colors"><Phone size={18} /></button>
                                <button className="p-2.5 hover:bg-slate-50 rounded-xl transition-colors"><Mail size={18} /></button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/30 custom-scrollbar">
                            {/* Initial Automated Message */}
                            {selectedLead.outreachEmailBody && (
                                <div className="flex justify-end">
                                    <div className="bg-purple-600 text-white rounded-3xl rounded-tr-none p-6 max-w-xl shadow-2xl shadow-purple-900/10 border border-purple-500">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-1.5 h-3 bg-purple-500 rounded-full" />
                                            <p className="text-[10px] text-purple-200 font-black uppercase tracking-widest">System Outreach</p>
                                        </div>
                                        <p className="text-sm leading-relaxed font-medium">{selectedLead.outreachEmailBody}</p>
                                        <span className="text-[9px] text-slate-500 mt-4 block text-right font-black uppercase tracking-[0.2em]">Transmission Finalized</span>
                                    </div>
                                </div>
                            )}

                            {/* Responses / Messages */}
                            {selectedLead.messages?.map(msg => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`rounded-3xl p-6 max-w-xl shadow-sm border ${msg.sender === 'user'
                                        ? 'bg-purple-600 text-white rounded-tr-none border-purple-500 shadow-purple-600/10'
                                        : 'bg-white border-slate-100 text-slate-800 rounded-tl-none shadow-slate-100'
                                        }`}>
                                        <p className="text-sm leading-relaxed font-medium">{msg.content}</p>
                                        <span className={`text-[9px] mt-3 block font-bold uppercase tracking-widest ${msg.sender === 'user' ? 'text-purple-200' : 'text-slate-400'}`}>
                                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Reply Input */}
                        <div className="p-6 bg-white border-t border-slate-100">
                            <div className="bg-slate-50 border-2 border-slate-100 rounded-[2rem] p-3 flex items-center gap-3 transition-all focus-within:border-purple-500 focus-within:bg-white focus-within:shadow-xl">
                                <input
                                    value={replyText}
                                    onChange={e => setReplyText(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                                    className="flex-1 bg-transparent border-none focus:outline-none px-4 text-sm font-bold text-slate-900"
                                    placeholder="Execute response protocol..."
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!replyText.trim()}
                                    className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg disabled:opacity-20 disabled:grayscale"
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-10 border border-slate-100 shadow-2xl">
                            <Reply size={40} className="text-purple-300 animate-pulse transform -scale-x-100" />
                        </div>
                        <h2 className="text-xl font-black text-slate-900 uppercase tracking-[0.3em] leading-none mb-4">Transmission Inactive</h2>
                        <p className="max-w-xs mx-auto text-slate-400 font-bold text-sm leading-relaxed uppercase tracking-widest opacity-60">Select a secure communication channel from the directory to begin protocol exchange.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InboxView;
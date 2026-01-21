import React, { useState } from 'react';
import { Lead, LeadStatus, Message } from '../types';
import { Search, Send, User, Reply } from 'lucide-react';

interface InboxViewProps {
  leads: Lead[];
  onSendMessage: (leadId: string, content: string) => void;
}

const InboxView: React.FC<InboxViewProps> = ({ leads, onSendMessage }) => {
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
    <div className="flex h-full bg-slate-950">
      
      {/* Thread List */}
      <div className="w-80 border-r border-slate-800 bg-slate-900 flex flex-col">
         <div className="p-4 border-b border-slate-800">
             <h2 className="text-xl font-bold text-white mb-4">Inbox</h2>
             <div className="relative">
                 <Search className="absolute left-3 top-2.5 text-slate-500" size={14} />
                 <input 
                    className="w-full bg-slate-950 border border-slate-800 rounded pl-9 pr-3 py-2 text-sm text-white focus:border-accent-500 focus:outline-none"
                    placeholder="Search threads..."
                 />
             </div>
         </div>
         <div className="flex-1 overflow-y-auto">
             {activeConversations.map(lead => (
                 <div 
                    key={lead.id}
                    onClick={() => setSelectedLeadId(lead.id)}
                    className={`p-4 border-b border-slate-800 cursor-pointer hover:bg-slate-800/50 transition-colors ${selectedLeadId === lead.id ? 'bg-slate-800 border-l-2 border-l-accent-500' : ''}`}
                 >
                     <div className="flex justify-between items-start mb-1">
                         <span className={`font-bold text-sm ${lead.status === LeadStatus.REPLIED ? 'text-green-400' : 'text-slate-200'}`}>{lead.name}</span>
                         <span className="text-[10px] text-slate-500">2m ago</span>
                     </div>
                     <p className="text-xs text-slate-400 truncate">
                         {lead.messages && lead.messages.length > 0 
                            ? lead.messages[lead.messages.length-1].content 
                            : 'Campaign initiated...'}
                     </p>
                 </div>
             ))}
             {activeConversations.length === 0 && (
                 <div className="p-8 text-center text-slate-600">
                     <p>No active conversations.</p>
                     <p className="text-xs mt-2">Launch campaigns from the Engine.</p>
                 </div>
             )}
         </div>
      </div>

      {/* Message View */}
      <div className="flex-1 flex flex-col">
          {selectedLead ? (
              <>
                <div className="p-4 border-b border-slate-800 bg-slate-900 flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-white">{selectedLead.name}</h3>
                        <p className="text-xs text-slate-400">{selectedLead.ownerName || 'Owner Unknown'} • {selectedLead.phone || 'No Phone'}</p>
                    </div>
                    <div className="flex space-x-2">
                        <button className="p-2 hover:bg-slate-800 rounded text-slate-400"><User size={18} /></button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Initial Automated Message */}
                    {selectedLead.outreachEmailBody && (
                        <div className="flex justify-end">
                            <div className="bg-blue-600/20 border border-blue-600/50 rounded-lg rounded-tr-none p-4 max-w-xl">
                                <p className="text-xs text-blue-300 font-bold mb-1 uppercase">Automated Outreach</p>
                                <p className="text-sm text-slate-200 whitespace-pre-wrap">{selectedLead.outreachEmailBody}</p>
                                <span className="text-[10px] text-slate-500 mt-2 block text-right">Sent by System</span>
                            </div>
                        </div>
                    )}

                    {/* Mock Responses / Messages */}
                    {selectedLead.messages?.map(msg => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`rounded-lg p-4 max-w-xl ${
                                msg.sender === 'user' 
                                ? 'bg-slate-800 border border-slate-700 rounded-tr-none' 
                                : 'bg-slate-800 border border-slate-700 rounded-tl-none'
                            }`}>
                                <p className="text-sm text-slate-200">{msg.content}</p>
                                <span className="text-[10px] text-slate-500 mt-2 block">{msg.timestamp}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 bg-slate-900 border-t border-slate-800">
                    <div className="relative">
                        <textarea 
                            value={replyText}
                            onChange={e => setReplyText(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 pr-12 text-sm text-white focus:border-accent-500 focus:outline-none resize-none h-20"
                            placeholder="Type your reply..."
                        />
                        <button 
                            onClick={handleSend}
                            className="absolute right-3 bottom-3 p-2 bg-accent-500 hover:bg-accent-400 text-slate-900 rounded-full transition-colors"
                        >
                            <Send size={16} />
                        </button>
                    </div>
                </div>
              </>
          ) : (
              <div className="flex-1 flex items-center justify-center text-slate-600">
                  <div className="text-center">
                      <Reply size={48} className="mx-auto mb-4 opacity-20" />
                      <p>Select a conversation to begin</p>
                  </div>
              </div>
          )}
      </div>
    </div>
  );
};

export default InboxView;
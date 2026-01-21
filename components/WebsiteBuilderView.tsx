import React, { useState, useEffect, useRef } from 'react';
import { AgentProfile } from '../types';
import { Monitor, Smartphone, RefreshCw, Send, Layers, Edit3, Code, Eye } from 'lucide-react';
import * as GeminiService from '../services/geminiService';

interface WebsiteBuilderViewProps {
  initialHtmlStructure?: { [key: string]: string }; // filename -> html
  apiKey: string;
  agents: AgentProfile[];
}

const WebsiteBuilderView: React.FC<WebsiteBuilderViewProps> = ({ initialHtmlStructure, apiKey, agents }) => {
  const [pages, setPages] = useState<{ [key: string]: string }>(initialHtmlStructure || { 'index.html': '<h1>No Site Generated</h1>' });
  const [activePage, setActivePage] = useState<string>('index.html');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [editPrompt, setEditPrompt] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState<string>(agents[0]?.id || '');

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Sync iframe when active page or content changes
  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(pages[activePage] || '');
        doc.close();
      }
    }
  }, [pages, activePage]);

  const handleAiEdit = async () => {
      if (!editPrompt.trim()) return;
      setIsEditing(true);
      
      const agent = agents.find(a => a.id === selectedAgentId);
      
      try {
          // Send current page HTML + Instruction
          const newHtml = await GeminiService.editWebsiteElement(apiKey, pages[activePage], editPrompt, agent);
          
          setPages(prev => ({
              ...prev,
              [activePage]: newHtml
          }));
          setEditPrompt('');
      } catch (e) {
          alert("Edit failed.");
          console.error(e);
      } finally {
          setIsEditing(false);
      }
  };

  return (
    <div className="flex h-full bg-slate-950 text-slate-200">
      
      {/* Left: Navigation & Controls */}
      <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
          <div className="p-4 border-b border-slate-800">
              <h3 className="font-bold text-white flex items-center"><Layers size={16} className="mr-2"/> Site Structure</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {Object.keys(pages).map(filename => (
                  <button 
                    key={filename}
                    onClick={() => setActivePage(filename)}
                    className={`w-full text-left px-3 py-2 rounded text-sm flex items-center ${activePage === filename ? 'bg-accent-500/10 text-accent-500 border border-accent-500/50' : 'text-slate-400 hover:bg-slate-800'}`}
                  >
                      <Code size={14} className="mr-2" /> {filename}
                  </button>
              ))}
          </div>

          <div className="p-4 border-t border-slate-800">
              <div className="flex items-center justify-between bg-slate-950 p-1 rounded mb-4">
                  <button onClick={()=>setViewMode('desktop')} className={`flex-1 flex justify-center py-1 rounded ${viewMode==='desktop'?'bg-slate-800 text-white':'text-slate-500'}`}><Monitor size={16}/></button>
                  <button onClick={()=>setViewMode('mobile')} className={`flex-1 flex justify-center py-1 rounded ${viewMode==='mobile'?'bg-slate-800 text-white':'text-slate-500'}`}><Smartphone size={16}/></button>
              </div>
          </div>
      </div>

      {/* Center: Preview */}
      <div className="flex-1 bg-slate-950 flex flex-col relative overflow-hidden">
          <div className="flex-1 flex items-center justify-center p-8 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
              <div 
                className={`bg-white transition-all duration-300 shadow-2xl overflow-hidden border border-slate-700 ${viewMode === 'mobile' ? 'w-[375px] h-[667px] rounded-3xl' : 'w-full h-full rounded-lg'}`}
              >
                  <iframe 
                    ref={iframeRef}
                    title="Live Builder"
                    className="w-full h-full"
                    sandbox="allow-scripts allow-same-origin"
                  />
              </div>
          </div>
          
          {/* Bottom: AI Editor Input */}
          <div className="h-48 bg-slate-900 border-t border-slate-800 p-4 flex flex-col z-10">
              <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-bold text-accent-500 flex items-center"><Edit3 size={14} className="mr-2"/> AI Pinpoint Editor</h4>
                  <select 
                    value={selectedAgentId}
                    onChange={(e) => setSelectedAgentId(e.target.value)}
                    className="bg-slate-800 text-xs text-white border border-slate-700 rounded px-2 py-1 focus:outline-none"
                  >
                      {agents.map(a => <option key={a.id} value={a.id}>Agent: {a.name}</option>)}
                  </select>
              </div>
              <div className="flex-1 flex space-x-2">
                  <textarea 
                    value={editPrompt}
                    onChange={e => setEditPrompt(e.target.value)}
                    disabled={isEditing}
                    placeholder={`Tell ${agents.find(a=>a.id===selectedAgentId)?.name || 'the AI'} what to change on this page (e.g. "Change the hero background to a dark gradient" or "Rewrite the services section to be more aggressive")...`}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded p-3 text-sm text-white focus:border-accent-500 focus:outline-none resize-none"
                  />
                  <button 
                    onClick={handleAiEdit}
                    disabled={isEditing || !editPrompt}
                    className="w-20 bg-accent-500 hover:bg-accent-400 text-slate-900 rounded font-bold flex flex-col items-center justify-center disabled:opacity-50"
                  >
                      {isEditing ? <RefreshCw size={20} className="animate-spin" /> : <Send size={20} />}
                      <span className="text-[10px] mt-1">{isEditing ? 'Working' : 'Apply'}</span>
                  </button>
              </div>
          </div>
      </div>

    </div>
  );
};

export default WebsiteBuilderView;
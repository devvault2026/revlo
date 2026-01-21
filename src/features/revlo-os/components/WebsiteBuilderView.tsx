import React, { useState, useEffect, useRef } from 'react';
import { AgentProfile } from '../types';
import { Monitor, Smartphone, RefreshCw, Send, Layers, Edit, Code, Eye, Sparkles } from 'lucide-react';

import * as GeminiService from '../services/geminiService';
import { useToast } from '../context/ToastContext';

interface WebsiteBuilderViewProps {
  initialHtmlStructure?: { [key: string]: string }; // filename -> html
  apiKey: string;
  agents: AgentProfile[];
}

const WebsiteBuilderView: React.FC<WebsiteBuilderViewProps> = ({ initialHtmlStructure, apiKey, agents }) => {
  const { showToast } = useToast();
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
      showToast("Design updated successfully", "success");
    } catch (e) {
      showToast("AI Morphing protocol failed", "error");
      console.error(e);
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="flex h-full bg-white text-slate-700 overflow-hidden">
      {/* Left: Navigation & Controls */}
      <div className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col overflow-x-hidden">
        <div className="p-8 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-4 bg-purple-600 rounded-full" />
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Site Mapper</h2>
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1">Files OS</h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-tight">Architecture Shell</p>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
          {Object.keys(pages).map(filename => (
            <button
              key={filename}
              onClick={() => setActivePage(filename)}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center ${activePage === filename ? 'bg-white text-purple-600 border border-purple-100 shadow-sm' : 'text-slate-400 hover:bg-slate-100'}`}
            >
              <Code size={14} className="mr-3 opacity-60" /> {filename}
            </button>
          ))}
        </div>

        <div className="p-6 border-t border-slate-200">
          <div className="flex items-center justify-between bg-white border border-slate-200 p-1.5 rounded-xl shadow-sm">
            <button onClick={() => setViewMode('desktop')} className={`flex-1 flex justify-center py-2 rounded-lg transition-all ${viewMode === 'desktop' ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' : 'text-slate-400 hover:bg-slate-50'}`}><Monitor size={18} /></button>
            <button onClick={() => setViewMode('mobile')} className={`flex-1 flex justify-center py-2 rounded-lg transition-all ${viewMode === 'mobile' ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' : 'text-slate-400 hover:bg-slate-50'}`}><Smartphone size={18} /></button>
          </div>
        </div>
      </div>

      {/* Center: Preview Container */}
      <div className="flex-1 bg-slate-50 flex flex-col relative overflow-hidden">
        {/* Top: Site Preview */}
        <div className="flex-1 overflow-auto bg-slate-100/50 p-6 lg:p-12 flex justify-center custom-scrollbar">
          <div className="w-full max-w-6xl h-fit bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-200/50">
            {pages[activePage] ? (
              <iframe
                ref={iframeRef}
                title="Preview"
                className="w-full min-h-[800px] border-none"
                sandbox="allow-scripts allow-same-origin"
              />
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center h-[600px]">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-8 border border-slate-100 shadow-xl">
                  <Sparkles size={32} className="text-purple-300 animate-pulse" />
                </div>
                <h2 className="text-lg font-black text-slate-900 uppercase tracking-[0.3em] leading-none mb-4">Synthesis Standby</h2>
                <p className="max-w-xs mx-auto text-slate-400 font-bold text-sm leading-relaxed uppercase tracking-widest opacity-60">Awaiting architecture signal to initialize site generation protocols.</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom: AI Editor Input */}
        <div className="h-64 bg-white border-t border-slate-100 p-8 flex flex-col z-10 shadow-[0_-4px_30px_rgba(0,0,0,0.03)] shrink-0">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center">
              <div className="w-1.5 h-3 bg-purple-600 rounded-full mr-3" />
              AI Architecture Core
            </h4>
            <div className="relative">
              <select
                value={selectedAgentId}
                onChange={(e) => setSelectedAgentId(e.target.value)}
                className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-600 border border-slate-200 rounded-full px-4 py-1.5 focus:outline-none appearance-none pr-8 transition-all hover:border-purple-200 cursor-pointer"
              >
                {agents.map(a => <option key={a.id} value={a.id}>Agent: {a.name}</option>)}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <RefreshCw size={10} />
              </div>
            </div>
          </div>
          <div className="flex-1 flex space-x-4">
            <textarea
              value={editPrompt}
              onChange={e => setEditPrompt(e.target.value)}
              disabled={isEditing}
              placeholder={`Communicate objectives to ${agents.find(a => a.id === selectedAgentId)?.name || 'the AI'}...`}
              className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-sm text-slate-800 focus:border-purple-500 focus:bg-white focus:outline-none resize-none transition-all placeholder:text-slate-400/70 font-medium"
            />
            <button
              onClick={handleAiEdit}
              disabled={isEditing || !editPrompt}
              className={`w-24 rounded-2xl font-black text-[11px] uppercase tracking-widest flex flex-col items-center justify-center transition-all ${isEditing || !editPrompt ? 'bg-slate-100 text-slate-400' : 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-600/20 active:scale-95'}`}
            >
              <div className={`mb-2 ${isEditing ? 'animate-spin' : ''}`}>
                {isEditing ? <RefreshCw size={24} /> : <Eye size={24} />}
              </div>
              <span>{isEditing ? 'Deploying' : 'Morph'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteBuilderView;
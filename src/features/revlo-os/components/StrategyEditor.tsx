import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import mermaid from 'mermaid';
import { Sparkles, Send, Edit3, Eye, Check, X, Maximize2, Minimize2, Share2, Download, Terminal, Settings } from 'lucide-react';
import * as GeminiService from '../services/geminiService';
import { AgentProfile } from '../types';

interface StrategyEditorProps {
    content: string;
    onSave: (newContent: string) => void;
    apiKey: string;
    agents: AgentProfile[];
}

// Mermaid component for rendering
const MermaidChart = ({ chart }: { chart: string }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current && chart) {
            ref.current.removeAttribute('data-processed');
            mermaid.contentLoaded();
        }
    }, [chart]);

    return (
        <div className="mermaid bg-white p-4 rounded-xl border border-slate-100 my-6 shadow-sm flex justify-center overflow-x-auto" ref={ref}>
            {chart}
        </div>
    );
};

const StrategyEditor: React.FC<StrategyEditorProps> = ({ content, onSave, apiKey, agents }) => {
    const [localContent, setLocalContent] = useState(content);
    const [viewMode, setViewMode] = useState<'edit' | 'preview'>('preview');
    const [instruction, setInstruction] = useState('');
    const [isRefining, setIsRefining] = useState(false);
    const [selectedAgentId, setSelectedAgentId] = useState(agents[0]?.id || '');

    useEffect(() => {
        mermaid.initialize({
            startOnLoad: true,
            theme: 'base',
            themeVariables: {
                primaryColor: '#8b5cf6',
                primaryTextColor: '#fff',
                primaryBorderColor: '#7c3aed',
                lineColor: '#cbd5e1',
                secondaryColor: '#f8fafc',
                tertiaryColor: '#fff',
            }
        });
    }, []);

    const handleRefine = async () => {
        if (!instruction.trim()) return;
        setIsRefining(true);
        try {
            const agent = agents.find(a => a.id === selectedAgentId);
            const refined = await GeminiService.refinePRD(apiKey, localContent, instruction, agent);
            setLocalContent(refined);
            setInstruction('');
            setViewMode('preview');
        } catch (e) {
            console.error("Refinement failed", e);
        } finally {
            setIsRefining(false);
        }
    };

    const handleSave = () => {
        onSave(localContent);
    };

    return (
        <div className="flex flex-col h-full bg-[#020408] text-slate-300">
            {/* Header Controls */}
            <div className="h-16 flex items-center justify-between px-8 border-b border-white/5 bg-[#0a0c12]/50 backdrop-blur-md shrink-0">
                <div className="flex items-center gap-4">
                    <div className="flex bg-white/5 p-1 rounded-xl border border-white/5 shadow-inner">
                        <button
                            onClick={() => setViewMode('preview')}
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'preview' ? 'bg-purple-600 text-white shadow-lg border border-purple-500/50' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            <Eye size={14} /> Preview
                        </button>
                        <button
                            onClick={() => setViewMode('edit')}
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'edit' ? 'bg-purple-600 text-white shadow-lg border border-purple-500/50' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            <Edit3 size={14} /> Source
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-500/10 active:scale-95">
                        <Check size={14} /> Persist Intel
                    </button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Main Workspace */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-10 relative bg-[#020408]">
                    <div className="max-w-4xl mx-auto">
                        {viewMode === 'edit' ? (
                            <textarea
                                value={localContent}
                                onChange={(e) => setLocalContent(e.target.value)}
                                className="w-full h-[calc(100vh-350px)] bg-transparent font-mono text-sm text-slate-300 focus:outline-none resize-none leading-relaxed"
                                placeholder="Enter intelligence markdown..."
                            />
                        ) : (
                            <div className="prose prose-invert prose-sm max-w-none">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        code({ node, inline, className, children, ...props }: any) {
                                            const match = /language-mermaid/.exec(className || '');
                                            return !inline && match ? (
                                                <MermaidChart chart={String(children).replace(/\n$/, '')} />
                                            ) : (
                                                <code className={`${className} bg-white/5 px-2 py-0.5 rounded border border-white/5 text-purple-400`} {...props}>
                                                    {children}
                                                </code>
                                            );
                                        },
                                        h1: ({ children }) => <h1 className="text-3xl font-black text-white tracking-tight mb-8 border-b border-white/5 pb-4 italic uppercase">{children}</h1>,
                                        h2: ({ children }) => <h2 className="text-xl font-black text-white tracking-tight mt-12 mb-6 flex items-center gap-3 uppercase tracking-widest text-xs"><div className="w-1.5 h-3 bg-purple-600 rounded-full shadow-[0_0_8px_rgba(147,51,234,0.5)]" /> {children}</h2>,
                                        p: ({ children }) => <p className="text-slate-400 leading-relaxed mb-6 font-medium">{children}</p>,
                                        li: ({ children }) => <li className="text-slate-400 font-medium mb-2">{children}</li>,
                                        strong: ({ children }) => <strong className="font-black text-white italic">{children}</strong>,
                                    }}
                                >
                                    {localContent}
                                </ReactMarkdown>
                            </div>
                        )}
                    </div>
                </div>

                {/* AI Refinement Sidebar */}
                <div className="w-96 border-l border-white/5 bg-[#0a0c12]/50 backdrop-blur-xl flex flex-col shrink-0 shadow-2xl">
                    <div className="p-8 border-b border-white/5 bg-white/[0.02]">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-4 bg-purple-600 rounded-full shadow-[0_0_8px_rgba(147,51,234,0.5)]" />
                            <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Refinement Core</h2>
                        </div>
                        <h3 className="text-lg font-black text-white tracking-tight leading-none mb-2 italic uppercase">AI <span className="gradient-text">Architect</span></h3>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Protocol Refinement</p>
                    </div>

                    <div className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar">
                        <div className="space-y-3">
                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <Settings size={12} className="text-purple-500" /> Active Creative Module
                            </label>
                            <div className="relative group">
                                <select
                                    value={selectedAgentId}
                                    onChange={(e) => setSelectedAgentId(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs font-black uppercase tracking-widest text-white focus:border-purple-500/50 focus:outline-none transition-all appearance-none cursor-pointer group-hover:border-white/20"
                                >
                                    {agents.map(a => <option key={a.id} value={a.id} className="bg-[#0a0c12] text-white font-black">{a.name} ({a.role})</option>)}
                                </select>
                                <div className="absolute right-4 top-3.5 pointer-events-none text-slate-600">
                                    <Edit3 size={14} />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <Terminal size={12} className="text-purple-500" /> Improvement Prompt
                            </label>
                            <textarea
                                value={instruction}
                                onChange={(e) => setInstruction(e.target.value)}
                                placeholder="e.g. Add a mermaid chart showing the lead lifecycle..."
                                className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-4 text-xs font-bold text-white placeholder:text-slate-600 focus:border-purple-500/50 focus:bg-white/10 focus:outline-none transition-all resize-none shadow-inner"
                            />
                        </div>

                        <button
                            onClick={handleRefine}
                            disabled={isRefining || !instruction.trim()}
                            className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 transition-all transform active:scale-95 ${isRefining || !instruction.trim() ? 'bg-white/5 text-slate-600 border border-white/5' : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500 shadow-xl shadow-purple-500/10'}`}
                        >
                            {isRefining ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Architecting...</span>
                                </>
                            ) : (
                                <>
                                    <Sparkles size={16} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Execute Refinement</span>
                                </>
                            )}
                        </button>
                    </div>

                    <div className="p-6 border-t border-white/5 bg-white/[0.02]">
                        <div className="flex items-center gap-4 text-slate-500">
                            <button className="flex-1 flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-white/5 hover:text-white transition-all group border border-transparent hover:border-white/5">
                                <Share2 size={16} className="group-hover:text-purple-500" />
                                <span className="text-[8px] font-black uppercase tracking-widest">Share</span>
                            </button>
                            <button className="flex-1 flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-white/5 hover:text-white transition-all group border border-transparent hover:border-white/5">
                                <Download size={16} className="group-hover:text-purple-500" />
                                <span className="text-[8px] font-black uppercase tracking-widest">Export</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StrategyEditor;

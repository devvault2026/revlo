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
        <div className="flex flex-col h-full bg-slate-50/50">
            {/* Header Controls */}
            <div className="h-16 flex items-center justify-between px-8 border-b border-slate-100 bg-white shrink-0">
                <div className="flex items-center gap-4">
                    <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner">
                        <button
                            onClick={() => setViewMode('preview')}
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'preview' ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <Eye size={14} /> Preview
                        </button>
                        <button
                            onClick={() => setViewMode('edit')}
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'edit' ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <Edit3 size={14} /> Source
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-700 transition-all shadow-lg active:scale-95">
                        <Check size={14} /> Persist Intel
                    </button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Main Workspace */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-10 relative">
                    <div className="max-w-4xl mx-auto">
                        {viewMode === 'edit' ? (
                            <textarea
                                value={localContent}
                                onChange={(e) => setLocalContent(e.target.value)}
                                className="w-full h-[calc(100vh-350px)] bg-transparent font-mono text-sm text-slate-700 focus:outline-none resize-none leading-relaxed"
                                placeholder="Enter markdown content..."
                            />
                        ) : (
                            <div className="prose prose-slate prose-sm max-w-none">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        code({ node, inline, className, children, ...props }: any) {
                                            const match = /language-mermaid/.exec(className || '');
                                            return !inline && match ? (
                                                <MermaidChart chart={String(children).replace(/\n$/, '')} />
                                            ) : (
                                                <code className={className} {...props}>
                                                    {children}
                                                </code>
                                            );
                                        },
                                        h1: ({ children }) => <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-8 border-b border-slate-100 pb-4">{children}</h1>,
                                        h2: ({ children }) => <h2 className="text-xl font-black text-slate-900 tracking-tight mt-12 mb-6 flex items-center gap-3 uppercase tracking-widest text-xs opacity-50"><div className="w-1.5 h-3 bg-purple-600 rounded-full" /> {children}</h2>,
                                        p: ({ children }) => <p className="text-slate-600 leading-relaxed mb-6 font-medium">{children}</p>,
                                        li: ({ children }) => <li className="text-slate-600 font-medium mb-2">{children}</li>,
                                        strong: ({ children }) => <strong className="font-black text-slate-900">{children}</strong>,
                                    }}
                                >
                                    {localContent}
                                </ReactMarkdown>
                            </div>
                        )}
                    </div>
                </div>

                {/* AI Refinement Sidebar */}
                <div className="w-96 border-l border-slate-100 bg-white flex flex-col shrink-0 shadow-[0_-20px_50px_rgba(0,0,0,0.02)]">
                    <div className="p-8 border-b border-slate-50 bg-slate-50/30">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-4 bg-purple-600 rounded-full" />
                            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Refinement Core</h2>
                        </div>
                        <h3 className="text-lg font-black text-slate-900 tracking-tight leading-none mb-2">AI Architect</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Protocol Refinement</p>
                    </div>

                    <div className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Settings size={12} className="text-purple-500" /> Active Creative Module
                            </label>
                            <select
                                value={selectedAgentId}
                                onChange={(e) => setSelectedAgentId(e.target.value)}
                                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-xs font-black uppercase tracking-widest text-slate-700 focus:border-purple-500 focus:outline-none transition-all appearance-none cursor-pointer"
                            >
                                {agents.map(a => <option key={a.id} value={a.id}>{a.name} ({a.role})</option>)}
                            </select>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Terminal size={12} className="text-purple-500" /> Improvement Prompt
                            </label>
                            <textarea
                                value={instruction}
                                onChange={(e) => setInstruction(e.target.value)}
                                placeholder="e.g. Add a mermaid chart showing the lead lifecycle, or refine the product vision section..."
                                className="w-full h-40 bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 text-xs font-bold text-slate-700 placeholder:text-slate-400 focus:border-purple-500 focus:bg-white focus:outline-none transition-all resize-none shadow-inner"
                            />
                        </div>

                        <button
                            onClick={handleRefine}
                            disabled={isRefining || !instruction.trim()}
                            className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 transition-all ${isRefining || !instruction.trim() ? 'bg-slate-100 text-slate-400' : 'bg-purple-600 text-white hover:bg-purple-700 shadow-xl shadow-purple-200 active:scale-95'}`}
                        >
                            {isRefining ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-slate-300 border-t-white rounded-full animate-spin" />
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

                    <div className="p-6 border-t border-slate-50 bg-slate-50/20">
                        <div className="flex items-center gap-4 text-slate-400">
                            <button className="flex-1 flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-white hover:text-slate-900 transition-all group">
                                <Share2 size={16} className="group-hover:text-purple-500" />
                                <span className="text-[8px] font-black uppercase tracking-widest">Share</span>
                            </button>
                            <button className="flex-1 flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-white hover:text-slate-900 transition-all group">
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

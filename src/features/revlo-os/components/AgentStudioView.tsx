import React, { useState, useEffect } from 'react';
import { AgentProfile, AgentResponsibility } from '../types';
import {
    Bot, Save, Trash2, Plus, Brain, Sparkles, Briefcase,
    Shield, Terminal, Sliders, FileJson, Play, RefreshCw, Layers,
    Code, Monitor
} from 'lucide-react';
import * as GeminiService from '../services/geminiService';

interface AgentStudioViewProps {
    agents: AgentProfile[];
    setAgents: React.Dispatch<React.SetStateAction<AgentProfile[]>>;
}

// Advanced Default Agents aligned with new architecture
const DEFAULT_AGENTS: AgentProfile[] = [
    {
        id: 'agent-1',
        name: 'Atlas',
        role: 'designer',
        version: 1,
        mandate: {
            objective: "Design brutalist, high-impact landing pages that force user attention to conversion points.",
            nonGoals: ["Do not create subtle designs", "Do not use serif fonts", "Do not ignore mobile layouts"],
            authority: 'execute'
        },
        responsibilities: [
            { id: 'r1', description: "Enforce 60/30/10 color rule", priority: 'high', severity: 'warn', enabled: true },
            { id: 'r2', description: "Ensure CTA is above the fold", priority: 'critical', severity: 'block', enabled: true },
            { id: 'r3', description: "Use massive typography for headers", priority: 'medium', severity: 'warn', enabled: true }
        ],
        outputContract: {
            allowedFormats: ['HTML', 'Tailwind'],
            requiredSections: ['Hero', 'Features', 'Footer'],
            forbiddenPatterns: ['Lorem Ipsum', 'Bootstrap']
        },
        behavior: {
            creativity: 80,
            verbosity: 'concise',
            tone: 'Bold, Direct, and Unapologetic'
        },
        stats: { projectsCompleted: 12, avgSatisfaction: 4.8 }
    }
];

const AgentStudioView: React.FC<AgentStudioViewProps> = ({ agents, setAgents }) => {
    const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'identity' | 'protocol' | 'output' | 'behavior' | 'lab'>('identity');

    // Form State
    const [formData, setFormData] = useState<AgentProfile | null>(null);

    // Lab State
    const [testInput, setTestInput] = useState('');
    const [testOutput, setTestOutput] = useState('');
    const [isTesting, setIsTesting] = useState(false);
    const [viewMode, setViewMode] = useState<'code' | 'preview'>('preview');

    // Initialize defaults if empty or migrate old agents
    useEffect(() => {
        if (agents.length === 0) {
            setAgents(DEFAULT_AGENTS);
        } else {
            // Migration check: if agents lack 'mandate', replace with defaults or migrate
            if (!agents[0].mandate) {
                console.warn("Detected legacy agents. Migrating...");
                setAgents(DEFAULT_AGENTS); // For this demo, we reset. In prod, we'd map fields.
            }
        }
    }, []);

    const handleSelect = (agent: AgentProfile) => {
        setSelectedAgentId(agent.id);
        setFormData(JSON.parse(JSON.stringify(agent))); // Deep copy
        setActiveTab('identity');
        setTestOutput('');
        setViewMode('preview');
    };

    const handleNew = () => {
        const newAgent: AgentProfile = {
            id: crypto.randomUUID(),
            name: 'New Operative',
            role: 'designer',
            version: 1,
            mandate: { objective: "Define primary objective...", nonGoals: [], authority: 'advise' },
            responsibilities: [],
            outputContract: { allowedFormats: ['Markdown'], requiredSections: [], forbiddenPatterns: [] },
            behavior: { creativity: 50, verbosity: 'detailed', tone: 'Professional' },
            stats: { projectsCompleted: 0, avgSatisfaction: 5.0 }
        };
        setAgents([...agents, newAgent]);
        handleSelect(newAgent);
    };

    const handleSave = () => {
        if (!formData) return;
        setAgents(prev => prev.map(a => a.id === formData.id ? formData : a));
        alert("Agent Logic Compiled & Saved.");
    };

    const handleDelete = (id: string) => {
        setAgents(prev => prev.filter(a => a.id !== id));
        setSelectedAgentId(null);
        setFormData(null);
    };

    const runTest = async () => {
        if (!formData || !testInput.trim()) return;
        setIsTesting(true);
        // Use the API key from local storage or environment (simplification for this view)
        const settings = JSON.parse(localStorage.getItem('revamp_settings') || '{}');
        const key = settings.apiKey;

        if (!key) {
            setTestOutput("Error: API Key missing in Settings.");
            setIsTesting(false);
            return;
        }

        try {
            const result = await GeminiService.testAgent(key, formData, testInput);
            setTestOutput(result);
            // Auto switch to preview if result looks like HTML
            if (result.trim().startsWith('<') && formData.role === 'designer') {
                setViewMode('preview');
            }
        } catch (e) {
            setTestOutput(`Error: ${e}`);
        } finally {
            setIsTesting(false);
        }
    };

    const addResponsibility = () => {
        if (!formData) return;
        const newResp: AgentResponsibility = {
            id: crypto.randomUUID(),
            description: "New Responsibility",
            priority: 'medium',
            severity: 'warn',
            enabled: true
        };
        setFormData({ ...formData, responsibilities: [...formData.responsibilities, newResp] });
    };

    const removeResponsibility = (rId: string) => {
        if (!formData) return;
        setFormData({ ...formData, responsibilities: formData.responsibilities.filter(r => r.id !== rId) });
    };

    const updateResponsibility = (rId: string, field: keyof AgentResponsibility, value: any) => {
        if (!formData) return;
        setFormData({
            ...formData,
            responsibilities: formData.responsibilities.map(r => r.id === rId ? { ...r, [field]: value } : r)
        });
    };

    const renderTabContent = () => {
        if (!formData) return null;

        switch (activeTab) {
            case 'identity':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="text-xs font-bold text-slate-600 uppercase">Designation</label>
                                <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 mt-1 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-600 uppercase">Role Class</label>
                                <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value as any })} className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 mt-1 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none">
                                    <option value="designer">Designer</option>
                                    <option value="copywriter">Copywriter</option>
                                    <option value="strategist">Strategist</option>
                                    <option value="analyst">Analyst</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-600 uppercase">Primary Mandate (Immutable Objective)</label>
                            <textarea value={formData.mandate.objective} onChange={e => setFormData({ ...formData, mandate: { ...formData.mandate, objective: e.target.value } })} className="w-full bg-white border border-slate-300 rounded-lg p-3 text-slate-900 mt-1 h-24 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-600 uppercase">Non-Goals (Comma Separated)</label>
                            <input
                                value={formData.mandate.nonGoals.join(', ')}
                                onChange={e => setFormData({ ...formData, mandate: { ...formData.mandate, nonGoals: e.target.value.split(',').map(s => s.trim()) } })}
                                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 mt-1 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                                placeholder="e.g. No backend code, No generic advice"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-600 uppercase">Authority Level</label>
                            <div className="flex space-x-4 mt-2">
                                {['advise', 'decide', 'execute'].map((auth) => (
                                    <button
                                        key={auth}
                                        onClick={() => setFormData({ ...formData, mandate: { ...formData.mandate, authority: auth as any } })}
                                        className={`px-4 py-2 rounded-lg border text-xs font-bold uppercase transition-all ${formData.mandate.authority === auth ? 'bg-purple-50 border-purple-500 text-purple-700 shadow-sm' : 'bg-white border-slate-300 text-slate-600 hover:border-slate-400'}`}
                                    >
                                        {auth}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'protocol':
                return (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-sm font-bold text-slate-900">Responsibility Matrix</h3>
                            <button onClick={addResponsibility} className="text-xs bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded-lg text-white flex items-center shadow-sm"><Plus size={12} className="mr-1" /> Add Rule</button>
                        </div>
                        <div className="space-y-2 max-h-[500px] overflow-y-auto">
                            {formData.responsibilities.map(r => (
                                <div key={r.id} className="bg-white border border-slate-200 rounded-lg p-3 flex items-start space-x-3 shadow-sm">
                                    <input type="checkbox" checked={r.enabled} onChange={e => updateResponsibility(r.id, 'enabled', e.target.checked)} className="mt-1.5 accent-purple-600" />
                                    <div className="flex-1 space-y-2">
                                        <input
                                            value={r.description}
                                            onChange={e => updateResponsibility(r.id, 'description', e.target.value)}
                                            className="w-full bg-transparent border-none text-sm text-slate-900 focus:ring-0 p-0 font-medium"
                                            placeholder="Rule description..."
                                        />
                                        <div className="flex space-x-2">
                                            <select value={r.priority} onChange={e => updateResponsibility(r.id, 'priority', e.target.value)} className="bg-slate-50 text-[10px] text-slate-700 border border-slate-200 rounded px-2 py-1 focus:outline-none focus:border-purple-500">
                                                <option value="low">Low Priority</option>
                                                <option value="medium">Medium Priority</option>
                                                <option value="high">High Priority</option>
                                                <option value="critical">Critical</option>
                                            </select>
                                            <select value={r.severity} onChange={e => updateResponsibility(r.id, 'severity', e.target.value)} className={`text-[10px] border rounded px-2 py-1 uppercase font-bold focus:outline-none ${r.severity === 'block' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                                                <option value="warn">Warn on Fail</option>
                                                <option value="block">Block on Fail</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button onClick={() => removeResponsibility(r.id)} className="text-slate-400 hover:text-red-600 transition-colors"><Trash2 size={14} /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'output':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                        <div>
                            <label className="text-xs font-bold text-slate-600 uppercase">Allowed Formats</label>
                            <input
                                value={formData.outputContract.allowedFormats.join(', ')}
                                onChange={e => setFormData({ ...formData, outputContract: { ...formData.outputContract, allowedFormats: e.target.value.split(',').map(s => s.trim()) } })}
                                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 mt-1 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                                placeholder="JSON, Markdown, HTML..."
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-600 uppercase">Required Sections</label>
                            <input
                                value={formData.outputContract.requiredSections.join(', ')}
                                onChange={e => setFormData({ ...formData, outputContract: { ...formData.outputContract, requiredSections: e.target.value.split(',').map(s => s.trim()) } })}
                                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 mt-1 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                                placeholder="Rationale, Code, Summary..."
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-600 uppercase">Forbidden Patterns (Strict)</label>
                            <input
                                value={formData.outputContract.forbiddenPatterns.join(', ')}
                                onChange={e => setFormData({ ...formData, outputContract: { ...formData.outputContract, forbiddenPatterns: e.target.value.split(',').map(s => s.trim()) } })}
                                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-red-700 placeholder-red-300 mt-1 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none"
                                placeholder="e.g. No apologizing, no generic intros..."
                            />
                        </div>
                    </div>
                );
            case 'behavior':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                        <div>
                            <div className="flex justify-between mb-1">
                                <label className="text-xs font-bold text-slate-600 uppercase">Creativity Temperature</label>
                                <span className="text-xs text-purple-600 font-bold">{formData.behavior.creativity}%</span>
                            </div>
                            <input
                                type="range"
                                min="0" max="100"
                                value={formData.behavior.creativity}
                                onChange={e => setFormData({ ...formData, behavior: { ...formData.behavior, creativity: parseInt(e.target.value) } })}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                            />
                            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                                <span>Deterministic</span>
                                <span>Hallucinogenic</span>
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-600 uppercase">Verbosity Ceiling</label>
                            <div className="grid grid-cols-3 gap-2 mt-2">
                                {['concise', 'detailed', 'verbose'].map(v => (
                                    <button
                                        key={v}
                                        onClick={() => setFormData({ ...formData, behavior: { ...formData.behavior, verbosity: v as any } })}
                                        className={`py-2 rounded-lg border text-xs font-bold capitalize transition-all ${formData.behavior.verbosity === v ? 'bg-blue-50 text-blue-700 border-blue-500 shadow-sm' : 'bg-white border-slate-300 text-slate-600 hover:border-slate-400'}`}
                                    >
                                        {v}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-600 uppercase">Tone Signature</label>
                            <input
                                value={formData.behavior.tone}
                                onChange={e => setFormData({ ...formData, behavior: { ...formData.behavior, tone: e.target.value } })}
                                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 mt-1 italic focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                                placeholder="e.g. Clinical, Witty, Aggressive..."
                            />
                        </div>
                    </div>
                );
            case 'lab':
                const isHtml = testOutput.trim().startsWith('<!DOCTYPE') || testOutput.trim().startsWith('<html') || testOutput.trim().startsWith('<div');

                return (
                    <div className="flex flex-col h-[600px] animate-in fade-in slide-in-from-bottom-2">
                        {/* Toolbar */}
                        <div className="flex justify-between items-center mb-2">
                            <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">Simulation Output</div>
                            <div className="flex bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                                <button
                                    onClick={() => setViewMode('preview')}
                                    disabled={!isHtml}
                                    className={`px-3 py-1 text-[10px] font-bold rounded-lg flex items-center transition-all ${viewMode === 'preview' ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-500 hover:text-slate-700 disabled:opacity-30'}`}
                                >
                                    <Monitor size={12} className="mr-1.5" /> Visual
                                </button>
                                <button
                                    onClick={() => setViewMode('code')}
                                    className={`px-3 py-1 text-[10px] font-bold rounded-lg flex items-center transition-all ${viewMode === 'code' ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    <Code size={12} className="mr-1.5" /> Code
                                </button>
                            </div>
                        </div>

                        {/* Display Area */}
                        <div className="flex-1 bg-white border border-slate-200 rounded-lg overflow-hidden relative mb-4 shadow-sm">
                            {isTesting ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-purple-600 bg-white/90 backdrop-blur-sm z-10">
                                    <RefreshCw className="animate-spin mb-3" size={32} />
                                    <span className="text-sm font-mono font-bold tracking-widest">EXECUTING AGENT PROTOCOL...</span>
                                </div>
                            ) : null}

                            {!testOutput && !isTesting ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                                    <Terminal size={48} className="mb-4 opacity-20" />
                                    <p className="font-mono text-xs text-slate-500">Waiting for input signal...</p>
                                </div>
                            ) : (
                                <>
                                    {viewMode === 'preview' && isHtml ? (
                                        <iframe
                                            title="Lab Preview"
                                            srcDoc={testOutput}
                                            className="w-full h-full bg-white"
                                            sandbox="allow-scripts allow-same-origin"
                                        />
                                    ) : (
                                        <textarea
                                            readOnly
                                            value={testOutput}
                                            className="w-full h-full bg-slate-50 p-4 font-mono text-xs text-emerald-700 focus:outline-none resize-none border-none"
                                        />
                                    )}
                                </>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="bg-white p-2 rounded-lg border border-slate-200 flex space-x-2 shadow-sm">
                            <input
                                value={testInput}
                                onChange={e => setTestInput(e.target.value)}
                                className="flex-1 bg-transparent border-none text-slate-900 focus:ring-0 text-sm p-2 font-mono focus:outline-none"
                                placeholder={formData.role === 'designer' ? "e.g. Design a hero section for a luxury watch brand..." : "Enter prompt to test agent behavior..."}
                                onKeyDown={e => e.key === 'Enter' && runTest()}
                            />
                            <button
                                onClick={runTest}
                                disabled={isTesting || !testInput.trim()}
                                className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-4 rounded-lg flex items-center justify-center disabled:opacity-50 transition-colors shadow-sm"
                            >
                                <Play size={18} fill="currentColor" />
                            </button>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="flex h-full bg-slate-50 text-slate-900 -m-8">
            {/* Sidebar List */}
            <div className="w-72 border-r border-slate-200 bg-white flex flex-col">
                <div className="p-4 border-b border-slate-200">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-slate-900 flex items-center tracking-tight">
                            <Bot className="mr-2 text-purple-600" size={20} /> AGENT_OS
                        </h2>
                        <button onClick={handleNew} className="p-1.5 bg-gradient-rainbow rounded text-white hover:shadow-lg transition-shadow">
                            <Plus size={16} />
                        </button>
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Active Operatives</div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {agents.map(agent => (
                        <div
                            key={agent.id}
                            onClick={() => handleSelect(agent)}
                            className={`p-4 border-b border-slate-100 cursor-pointer transition-all hover:bg-slate-50 ${selectedAgentId === agent.id ? 'bg-purple-50 border-l-2 border-l-purple-600' : ''}`}
                        >
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-sm text-slate-900">{agent.name}</span>
                                <span className="text-[10px] bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-slate-600">v{agent.version}</span>
                            </div>
                            <div className="text-xs text-slate-500 capitalize mb-2">{agent.role}</div>
                            <div className="flex space-x-1">
                                <div className={`w-1.5 h-1.5 rounded-full ${agent.stats.avgSatisfaction > 4.5 ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                <span className="text-[10px] text-slate-400">{agent.stats.projectsCompleted} Missions</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Engineering Console */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {formData ? (
                    <>
                        <div className="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between shadow-sm">
                            <div>
                                <h1 className="text-xl font-bold text-slate-900 flex items-center">
                                    {formData.name}
                                    <span className="ml-3 text-xs font-normal text-slate-500 border border-slate-200 px-2 py-0.5 rounded-lg uppercase tracking-wider bg-slate-50">
                                        {formData.role} Class
                                    </span>
                                </h1>
                            </div>
                            <div className="flex space-x-3">
                                <button onClick={() => handleDelete(formData.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"><Trash2 size={18} /></button>
                                <button onClick={handleSave} className="bg-gradient-rainbow text-white font-bold px-4 py-2 rounded-lg text-sm flex items-center shadow-md hover:shadow-lg transition-all">
                                    <Save size={16} className="mr-2" /> Compile & Save
                                </button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-slate-200 bg-white px-6 space-x-6 shadow-sm">
                            {[
                                { id: 'identity', label: 'Identity & Mandate', icon: Shield },
                                { id: 'protocol', label: 'Protocol Matrix', icon: Layers },
                                { id: 'output', label: 'Output Contract', icon: FileJson },
                                { id: 'behavior', label: 'Behavioral Core', icon: Sliders },
                                { id: 'lab', label: 'Test Lab', icon: Terminal }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`py-4 text-xs font-bold uppercase tracking-wider flex items-center border-b-2 transition-colors ${activeTab === tab.id ? 'border-purple-600 text-purple-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                                >
                                    <tab.icon size={14} className="mr-2" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
                            <div className="max-w-4xl mx-auto">
                                {renderTabContent()}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 border border-slate-200 shadow-sm">
                            <Brain size={32} className="opacity-20 text-slate-300" />
                        </div>
                        <p className="text-slate-500">Select an operative to engineer.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AgentStudioView;
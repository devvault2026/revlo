import React, { useState, useEffect } from 'react';
import { AgentProfile, AgentResponsibility } from '../types';
import {
    Bot, Save, Trash2, Plus, Brain, Sparkles, Briefcase,
    Shield, Terminal, Sliders, FileJson, Play, RefreshCw, Layers,
    Code, Monitor, ChevronRight, X, MapPin, Target, Loader2,
    CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import * as GeminiService from '../services/geminiService';
import { useToast } from '../context/ToastContext';

interface AgentStudioViewProps {
    agents: AgentProfile[];
    setAgents: React.Dispatch<React.SetStateAction<AgentProfile[]>>;
}

const DEFAULT_AGENTS: AgentProfile[] = [
    {
        id: 'agent-1',
        name: 'Alpha (Real Estate)',
        role: 'designer',
        version: 1,
        mandate: {
            objective: "Output GUARANTEED 5-7 page award-winning luxury real estate websites. Every asset must reflect a $25,000 market value. Focus on immersive property narratives and elite lead-capture optics.",
            nonGoals: ["Do not create basic templates", "Do not ignore SEO meta-structures", "Do not use low-res placeholders"],
            authority: 'execute'
        },
        responsibilities: [
            { id: 're1', description: "Enforce ultra-premium high-contrast typography", priority: 'critical', severity: 'block', enabled: true },
            { id: 're2', description: "Generate end-to-end property copy and value-rich content", priority: 'high', severity: 'warn', enabled: true },
            { id: 're3', description: "Optimize for 5-7 distinct strategy pages", priority: 'high', severity: 'warn', enabled: true }
        ],
        outputContract: {
            allowedFormats: ['Standalone HTML', 'Componentized React', 'Tailwind'],
            requiredSections: ['Cinematic Hero', 'Inventory Matrix', 'Agent Bios', 'Neighborhood Guides', 'Connect Portal'],
            forbiddenPatterns: ['Generic Real Estate Icons', 'Bright Blue Accents']
        },
        behavior: {
            creativity: 95,
            verbosity: 'detailed',
            tone: 'Exclusive, Sophisticated, and Authoritative'
        },
        capabilities: ['Massive Context Analysis', 'End-to-End Content Generation', 'Top-Grade Template Logic', 'Property Market Intelligence'],
        chaining: [],
        memoryType: 'persistent',
        stats: { projectsCompleted: 42, avgSatisfaction: 5.0 }
    },
    {
        id: 'agent-2',
        name: 'Titan (Legal)',
        role: 'strategist',
        version: 1,
        mandate: {
            objective: "Synthesize high-authority, 5-7 page legal powerhouse websites. Output value set at $25,000. Architect massive trust-gate systems and comprehensive practice area content.",
            nonGoals: ["Do not use generic legal stock images", "Do not simplify complex practice areas", "Do not ignore mobile accessibility"],
            authority: 'execute'
        },
        responsibilities: [
            { id: 'l1', description: "Enforce high-trust aesthetic with serif/sans-serif pairing", priority: 'critical', severity: 'block', enabled: true },
            { id: 'l2', description: "Generate detailed case studies and attorney profiles", priority: 'high', severity: 'warn', enabled: true },
            { id: 'l3', description: "Ensure end-to-end legal terminology accuracy", priority: 'high', severity: 'warn', enabled: true }
        ],
        outputContract: {
            allowedFormats: ['Modern HTML5', 'Tailwind CSS', 'Schema.org JSON'],
            requiredSections: ['Practice Matrix', 'Case Results', 'Attorney Roster', 'Legal Insights', 'Secure Consultation'],
            forbiddenPatterns: ['Mallet/Gavel Icons', 'Cheesy Stock People']
        },
        behavior: {
            creativity: 70,
            verbosity: 'detailed',
            tone: 'Prestige, Intellectual, and Powerful'
        },
        capabilities: ['Deep Legal Research', 'Complex Architecture Mapping', 'Top-Grade Academic Copywriting', 'Trust-Protocol Optimization'],
        chaining: [],
        memoryType: 'persistent',
        stats: { projectsCompleted: 35, avgSatisfaction: 4.9 }
    },
    {
        id: 'agent-3',
        name: 'Prime (Healthcare)',
        role: 'analyst',
        version: 1,
        mandate: {
            objective: "Deploy award-winning, 5-7 page private medical clinic digital systems. Minimum $25,000 value output. Prioritize patient confidence and end-to-end service education.",
            nonGoals: ["Do not use depressing clinical aesthetics", "Do not bury contact information", "Do not ignore patient privacy flows"],
            authority: 'execute'
        },
        responsibilities: [
            { id: 'h1', description: "Enforce clean, breathable layout with soft gradients", priority: 'critical', severity: 'block', enabled: true },
            { id: 'h2', description: "Generate detailed treatment guides and specialist bios", priority: 'high', severity: 'warn', enabled: true },
            { id: 'h3', description: "Synthesize comprehensive FAQs and Resource centers", priority: 'medium', severity: 'warn', enabled: true }
        ],
        outputContract: {
            allowedFormats: ['Accessible HTML', 'Headless UI Specs', 'Tailwind'],
            requiredSections: ['Specialist Profiles', 'Service Index', 'Patient Resources', 'Clinical Excellence', 'Appointment Gateway'],
            forbiddenPatterns: ['Red Cross Symbols', 'Harsh Primary Colors']
        },
        behavior: {
            creativity: 85,
            verbosity: 'detailed',
            tone: 'Empathetic, Expert, and Reassuring'
        },
        capabilities: ['Bio-Medical Understanding', 'Resource Library Compilation', 'Top-Grade Wellness Copywriting', 'Patient UX Heuristics'],
        chaining: [],
        memoryType: 'persistent',
        stats: { projectsCompleted: 28, avgSatisfaction: 5.0 }
    },
    {
        id: 'agent-4',
        name: 'Zenith (Tech)',
        role: 'designer',
        version: 1,
        mandate: {
            objective: "Architect unicorn-tier, 5-7 page SaaS/Fintech platforms. $25,000 value per deployment. Focus on ultra-modern interactive elements and comprehensive product narratives.",
            nonGoals: ["Do not use basic shadows", "Do not ignore dark/light mode parity", "Do not simplify product specs"],
            authority: 'execute'
        },
        responsibilities: [
            { id: 't1', description: "Enforce glassomorphic elements and micro-interactions", priority: 'critical', severity: 'block', enabled: true },
            { id: 't2', description: "Generate complex technical documentation and vision copy", priority: 'high', severity: 'warn', enabled: true },
            { id: 't3', description: "Build 5-7 page end-to-end user journey flows", priority: 'high', severity: 'warn', enabled: true }
        ],
        outputContract: {
            allowedFormats: ['Next.js Template Logic', 'Tailwind Configs', 'SVG Animations'],
            requiredSections: ['Product Core', 'Integration Suite', 'Developer Hub', 'Pricing Architect', 'Schedule Demo'],
            forbiddenPatterns: ['Cubic Bezier Defaults', 'Rounded Corners < 12px']
        },
        behavior: {
            creativity: 100,
            verbosity: 'concise',
            tone: 'Futuristic, High-Velocity, and Disruptive'
        },
        capabilities: ['Technical Spec Analysis', 'Interaction Scripting', 'Top-Grade Tech Storytelling', 'System Design Logic'],
        chaining: [],
        memoryType: 'persistent',
        stats: { projectsCompleted: 56, avgSatisfaction: 4.9 }
    },
    {
        id: 'agent-5',
        name: 'Velvet (Hospitality)',
        role: 'copywriter',
        version: 1,
        mandate: {
            objective: "Create 5-7 page boutique hotel/resort digital experiences. Guaranteed $25,000 value. Focus on high-emotion narratives and end-to-end luxury journey content.",
            nonGoals: ["Do not use generic booking forms", "Do not ignore local area storytelling", "Do not use claustrophobic layouts"],
            authority: 'execute'
        },
        responsibilities: [
            { id: 'ho1', description: "Enforce serif-dominated, elegant typography", priority: 'critical', severity: 'block', enabled: true },
            { id: 'ho2', description: "Generate room-level sensory copy and experience descriptions", priority: 'high', severity: 'warn', enabled: true },
            { id: 'ho3', description: "Ensure seamless storytelling across 5-7 pages", priority: 'high', severity: 'warn', enabled: true }
        ],
        outputContract: {
            allowedFormats: ['Premium HTML', 'CSS Variable Systems', 'Tailwind'],
            requiredSections: ['Cinematic Experience Hero', 'Accommodation Suite', 'Culinary Journeys', 'Local Curated Map', 'Reservation Portal'],
            forbiddenPatterns: ['Wrench/Tool Icons', 'Flat 2D Avatars']
        },
        behavior: {
            creativity: 90,
            verbosity: 'detailed',
            tone: 'Warm, Opulent, and Evocative'
        },
        capabilities: ['Sensory Copywriting', 'Hospitality Market Trends', 'Top-Grade Experience Mapping', 'Visual Storytelling Logic'],
        chaining: [],
        memoryType: 'persistent',
        stats: { projectsCompleted: 19, avgSatisfaction: 5.0 }
    }
];

const AgentStudioView: React.FC<AgentStudioViewProps> = ({ agents, setAgents }) => {
    const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'identity' | 'protocol' | 'orchestration' | 'lab'>('identity');
    const [formData, setFormData] = useState<AgentProfile | null>(null);
    const [testInput, setTestInput] = useState('');
    const [testOutput, setTestOutput] = useState('');
    const [isTesting, setIsTesting] = useState(false);
    const [viewMode, setViewMode] = useState<'code' | 'preview'>('preview');
    const { showToast } = useToast();

    useEffect(() => {
        if (agents.length === 0) setAgents(DEFAULT_AGENTS);
    }, []);

    const handleSelect = (agent: AgentProfile) => {
        setSelectedAgentId(agent.id);
        setFormData(JSON.parse(JSON.stringify(agent)));
        setActiveTab('identity');
        setTestOutput('');
    };

    const handleNew = () => {
        const newAgent: AgentProfile = {
            id: crypto.randomUUID(),
            name: 'New Operative',
            role: 'designer',
            version: 1,
            mandate: { objective: "Define objective...", nonGoals: [], authority: 'advise' },
            responsibilities: [],
            outputContract: { allowedFormats: ['Markdown'], requiredSections: [], forbiddenPatterns: [] },
            behavior: { creativity: 50, verbosity: 'detailed', tone: 'Professional' },
            capabilities: [],
            chaining: [],
            memoryType: 'ephemeral',
            stats: { projectsCompleted: 0, avgSatisfaction: 5.0 }
        };
        setAgents([...agents, newAgent]);
        handleSelect(newAgent);
    };

    const handleSave = () => {
        if (!formData) return;
        setAgents(prev => prev.map(a => a.id === formData.id ? formData : a));
        showToast("Intelligence node successfully merged and compiled.", "success");
    };

    const handleDelete = (id: string) => {
        setAgents(prev => prev.filter(a => a.id !== id));
        setSelectedAgentId(null);
        setFormData(null);
    };

    const runTest = async () => {
        if (!formData || !testInput.trim()) return;
        setIsTesting(true);
        setTestOutput('');
        const settings = JSON.parse(localStorage.getItem('revamp_settings') || '{}');
        const key = settings.apiKey;
        if (!key) {
            showToast("AI Node Key required for simulation.", "warning");
            setIsTesting(false);
            return;
        }
        try {
            await GeminiService.streamTestAgent(key, formData, testInput, (chunk) => {
                setTestOutput(prev => prev + chunk);
            });
            showToast("Simulated Synthesis Complete", "success");
        } catch (e) {
            setTestOutput(`System Error during synthesis: ${e}`);
            showToast("Synthesis Disruption", "error");
        } finally {
            setIsTesting(false);
        }
    };

    const updateResponsibility = (rId: string, field: keyof AgentResponsibility, value: any) => {
        if (!formData) return;
        setFormData({
            ...formData,
            responsibilities: formData.responsibilities.map(r => r.id === rId ? { ...r, [field]: value } : r)
        });
    };

    const addChainingNode = () => {
        if (!formData) return;
        setFormData({
            ...formData,
            chaining: [...formData.chaining, { nextAgentId: '', trigger: '' }]
        });
    };

    const renderTabContent = () => {
        if (!formData) return null;
        switch (activeTab) {
            case 'identity':
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Designation</label>
                                <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-slate-900 mt-2 focus:border-purple-500 focus:bg-white focus:outline-none shadow-inner font-black text-lg transition-all" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Role Class</label>
                                <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value as any })} className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-slate-900 mt-2 focus:border-purple-500 focus:bg-white focus:outline-none shadow-inner font-bold transition-all">
                                    <option value="designer">Designer</option>
                                    <option value="copywriter">Copywriter</option>
                                    <option value="strategist">Strategist</option>
                                    <option value="analyst">Analyst</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Capability Matrix</label>
                            <div className="grid grid-cols-3 gap-3 mt-3">
                                {['Web Search', 'CRM Access', 'UI Generation', 'Code Compilation', 'Email Dispatch', 'Vector Memory'].map(cap => (
                                    <button
                                        key={cap}
                                        onClick={() => {
                                            const caps = formData.capabilities.includes(cap)
                                                ? formData.capabilities.filter(c => c !== cap)
                                                : [...formData.capabilities, cap];
                                            setFormData({ ...formData, capabilities: caps });
                                        }}
                                        className={`p-4 rounded-2xl border-2 text-[10px] font-black uppercase tracking-widest flex items-center justify-between transition-all ${formData.capabilities.includes(cap)
                                            ? 'bg-purple-50 border-purple-200 text-purple-700 shadow-sm'
                                            : 'bg-white border-slate-50 text-slate-400 hover:border-slate-100'
                                            }`}
                                    >
                                        {cap}
                                        {formData.capabilities.includes(cap) && <RefreshCw size={12} className="text-purple-400" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Primary Mandate (Core Objective)</label>
                            <textarea value={formData.mandate.objective} onChange={e => setFormData({ ...formData, mandate: { ...formData.mandate, objective: e.target.value } })} className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-6 text-slate-900 mt-2 h-40 focus:border-purple-500 focus:bg-white focus:outline-none shadow-inner font-medium leading-relaxed transition-all" />
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Authority Level</label>
                                <div className="flex bg-slate-100 p-1.5 rounded-2xl mt-2 border border-slate-100">
                                    {['advise', 'decide', 'execute'].map((auth) => (
                                        <button
                                            key={auth}
                                            onClick={() => setFormData({ ...formData, mandate: { ...formData.mandate, authority: auth as any } })}
                                            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.mandate.authority === auth ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'} `}
                                        >
                                            {auth}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Memory Persistence</label>
                                <div className="flex bg-slate-100 p-1.5 rounded-2xl mt-2 border border-slate-100">
                                    {['ephemeral', 'persistent'].map((mem) => (
                                        <button
                                            key={mem}
                                            onClick={() => setFormData({ ...formData, memoryType: mem as any })}
                                            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.memoryType === mem ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'} `}
                                        >
                                            {mem}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'protocol':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                        <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                            <div>
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Responsibility Matrix</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Operational Constraints & Guardrails</p>
                            </div>
                            <button className="text-[10px] font-black uppercase tracking-widest bg-purple-600 text-white px-6 py-4 rounded-2xl flex items-center shadow-xl shadow-purple-200 hover:scale-105 transition-all"><Plus size={16} className="mr-2" /> Add Protocol</button>
                        </div>
                        <div className="grid gap-4">
                            {formData.responsibilities.map(r => (
                                <div key={r.id} className="bg-white border border-slate-50 rounded-3xl p-6 flex items-start gap-6 shadow-sm group hover:border-purple-200 transition-all hover:shadow-xl hover:shadow-slate-200/50">
                                    <input type="checkbox" checked={r.enabled} onChange={e => updateResponsibility(r.id, 'enabled', e.target.checked)} className="mt-1 w-6 h-6 accent-purple-600 rounded-xl" />
                                    <div className="flex-1 space-y-4">
                                        <input value={r.description} onChange={e => updateResponsibility(r.id, 'description', e.target.value)} className="w-full bg-transparent border-none text-base font-bold text-slate-900 focus:outline-none p-0" />
                                        <div className="flex gap-3">
                                            <div className="flex bg-slate-50 rounded-xl p-1">
                                                {['low', 'medium', 'high', 'critical'].map(p => (
                                                    <button
                                                        key={p}
                                                        onClick={() => updateResponsibility(r.id, 'priority', p)}
                                                        className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${r.priority === p ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-400 opacity-50'}`}
                                                    >
                                                        {p}
                                                    </button>
                                                ))}
                                            </div>
                                            <div className="flex bg-slate-50 rounded-xl p-1">
                                                {['warn', 'block'].map(s => (
                                                    <button
                                                        key={s}
                                                        onClick={() => updateResponsibility(r.id, 'severity', s)}
                                                        className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${r.severity === s ? 'bg-white text-red-600 shadow-sm' : 'text-slate-400 opacity-50'}`}
                                                    >
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <button className="text-slate-200 hover:text-red-500 transition-colors bg-slate-50 p-3 rounded-2xl"><Trash2 size={18} /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'orchestration':
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                        <div className="bg-purple-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-purple-200">
                            <div className="absolute top-0 right-0 opacity-10 -translate-y-4">
                                <RefreshCw size={240} className="animate-[spin_20s_linear_infinite]" />
                            </div>
                            <div className="relative z-10">
                                <h2 className="text-3xl font-black tracking-tight leading-none mb-4">Neural Chain Synthesis</h2>
                                <p className="max-w-md text-purple-100 font-bold text-sm leading-relaxed uppercase tracking-widest opacity-80">Link this agent to others to create automated intelligence workflows. Once an objective is met, synthesis triggers the next operative.</p>
                                <button
                                    onClick={addChainingNode}
                                    className="mt-8 bg-white text-purple-600 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center shadow-xl hover:scale-105 transition-all active:scale-95"
                                >
                                    <Plus size={16} className="mr-2" /> Initialize New Link
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {formData.chaining.length > 0 ? (
                                formData.chaining.map((link, idx) => (
                                    <div key={idx} className="bg-white border border-slate-100 rounded-[2rem] p-8 flex items-center gap-8 shadow-sm group hover:border-purple-200 transition-all">
                                        <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 font-black">
                                            {idx + 1}
                                        </div>
                                        <div className="flex-1 space-y-4">
                                            <div className="grid grid-cols-2 gap-6">
                                                <div>
                                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Synthesis Trigger</label>
                                                    <input
                                                        placeholder="e.g., On PRD Completion"
                                                        value={link.trigger}
                                                        onChange={e => {
                                                            const newChaining = [...formData.chaining];
                                                            newChaining[idx].trigger = e.target.value;
                                                            setFormData({ ...formData, chaining: newChaining });
                                                        }}
                                                        className="w-full bg-slate-50 border border-slate-50 rounded-xl p-3 text-xs font-bold focus:bg-white focus:outline-none focus:border-purple-200 mt-1 transition-all"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Next Operative</label>
                                                    <select
                                                        value={link.nextAgentId}
                                                        onChange={e => {
                                                            const newChaining = [...formData.chaining];
                                                            newChaining[idx].nextAgentId = e.target.value;
                                                            setFormData({ ...formData, chaining: newChaining });
                                                        }}
                                                        className="w-full bg-slate-50 border border-slate-50 rounded-xl p-3 text-xs font-bold focus:bg-white focus:outline-none focus:border-purple-200 mt-1 transition-all"
                                                    >
                                                        <option value="">Select Intelligence...</option>
                                                        {agents.filter(a => a.id !== formData.id).map(a => (
                                                            <option key={a.id} value={a.id}>{a.name} ({a.role})</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                const newChaining = [...formData.chaining];
                                                newChaining.splice(idx, 1);
                                                setFormData({ ...formData, chaining: newChaining });
                                            }}
                                            className="p-4 rounded-2xl bg-red-50 text-red-400 hover:text-red-600 transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-[2.5rem]">
                                    <Layers className="mx-auto text-slate-200 mb-6" size={48} />
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">No chain nodes configured</p>
                                </div>
                            )}
                        </div>
                    </div>
                );
            case 'lab':
                const isPossibleHtml = testOutput.trim().includes('<html') || testOutput.trim().includes('<!DOCTYPE') || testOutput.trim().includes('<div') || testOutput.toLowerCase().includes('tailwindcss');

                return (
                    <div className="flex flex-col h-[750px] animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {/* Lab Header */}
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2 h-4 bg-purple-600 rounded-full animate-pulse" />
                                    <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Neural Simulation Studio</h2>
                                </div>
                                <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Intelligence Sandbox</h3>
                            </div>

                            <div className="flex bg-slate-100/50 backdrop-blur-md rounded-[1.25rem] p-1.5 border border-slate-200/50 shadow-inner">
                                <button
                                    onClick={() => setViewMode('preview')}
                                    className={`px-8 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 ${viewMode === 'preview' ? 'bg-white text-purple-600 shadow-md scale-[1.02]' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    <Monitor size={14} /> Live Render
                                </button>
                                <button
                                    onClick={() => setViewMode('code')}
                                    className={`px-8 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 ${viewMode === 'code' ? 'bg-white text-slate-900 shadow-md scale-[1.02]' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    <Terminal size={14} /> Neural Code
                                </button>
                            </div>
                        </div>

                        {/* Professional Split Layout */}
                        <div className="flex-1 flex gap-8 overflow-hidden">
                            {/* Controller Panel */}
                            <div className="w-[420px] flex flex-col gap-6 shrink-0">
                                <div className="flex-1 bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/40 flex flex-col relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                                        <Bot size={120} />
                                    </div>

                                    <div className="flex-1 flex flex-col">
                                        <div className="flex justify-between items-center mb-6">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Objective Input</label>
                                            <div className="flex gap-1.5">
                                                <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                                                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                                                <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                                            </div>
                                        </div>
                                        <textarea
                                            value={testInput}
                                            onChange={e => setTestInput(e.target.value)}
                                            placeholder="Deploy a neural objective... (e.g. Architect a $25k Real Estate Site for Jaryd Paquette)"
                                            className="flex-1 w-full bg-slate-50 border-2 border-slate-100 rounded-3xl p-6 text-sm font-bold text-slate-800 focus:bg-white focus:border-purple-500 focus:outline-none transition-all resize-none shadow-inner placeholder:text-slate-300"
                                        />
                                    </div>

                                    <button
                                        onClick={runTest}
                                        disabled={isTesting || !testInput.trim()}
                                        className={`mt-6 h-20 rounded-3xl flex items-center justify-center gap-4 transition-all relative overflow-hidden group/btn ${isTesting || !testInput.trim() ? 'bg-slate-50 text-slate-300 pointer-events-none' : 'bg-purple-600 text-white hover:bg-purple-700 shadow-2xl shadow-purple-200 active:scale-95'}`}
                                    >
                                        {isTesting && (
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: '100%' }}
                                                transition={{ duration: 15, ease: "linear" }}
                                                className="absolute inset-0 bg-purple-500"
                                            />
                                        )}
                                        <div className="relative z-10 flex items-center gap-3">
                                            {isTesting ? (
                                                <>
                                                    <RefreshCw className="animate-spin" size={20} />
                                                    <span className="text-xs font-black uppercase tracking-[0.3em]">Synthesizing...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Play size={20} fill="currentColor" />
                                                    <span className="text-xs font-black uppercase tracking-[0.3em]">Initialize Neural Build</span>
                                                </>
                                            )}
                                        </div>
                                    </button>
                                </div>

                                {/* Status Card */}
                                <div className="bg-slate-900 rounded-[2rem] p-6 shadow-2xl flex items-center gap-5 border border-slate-800">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${isTesting ? 'bg-purple-500 animate-pulse' : 'bg-slate-800'}`}>
                                        <Target className={isTesting ? 'text-white' : 'text-slate-600'} size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Operative Status</p>
                                        <p className="text-xs font-bold text-white uppercase tracking-wider">
                                            {isTesting ? 'Signal Transmission Active' : testOutput ? 'Synthesis Complete' : 'Awaiting Injection'}
                                        </p>
                                    </div>
                                    {isTesting && (
                                        <div className="flex gap-1">
                                            {[1, 2, 3].map(i => (
                                                <motion.div
                                                    key={i}
                                                    animate={{ height: [8, 16, 8] }}
                                                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                                                    className="w-1 bg-purple-500 rounded-full"
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Dynamic Workspace */}
                            <div className="flex-1 bg-white border border-slate-100 rounded-[3rem] shadow-2xl shadow-slate-200/50 relative overflow-hidden flex flex-col">
                                <div className="h-14 bg-slate-50/50 border-b border-slate-100 flex items-center px-8 justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{viewMode === 'preview' ? 'Viewport' : 'Terminal Output'}</span>
                                    </div>
                                    {testOutput && isPossibleHtml && viewMode === 'code' && (
                                        <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-lg border border-green-100 animate-in fade-in zoom-in">
                                            <CheckCircle2 size={12} />
                                            <span className="text-[9px] font-black uppercase tracking-widest">Valid Code Pattern Detected</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 relative overflow-hidden">
                                    {testOutput ? (
                                        viewMode === 'preview' ? (
                                            <div className="w-full h-full relative">
                                                <iframe
                                                    srcDoc={testOutput}
                                                    className="w-full h-full border-none"
                                                    sandbox="allow-scripts allow-forms allow-same-origin"
                                                />
                                                {isTesting && (
                                                    <div className="absolute top-6 right-6 flex items-center gap-3 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-purple-100 animate-in slide-in-from-right-4">
                                                        <div className="relative">
                                                            <div className="w-4 h-4 border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
                                                        </div>
                                                        <span className="text-[10px] font-black text-purple-900 uppercase tracking-widest">Streaming Intelligence...</span>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="w-full h-full bg-[#0F172A] p-0 overflow-hidden flex flex-col">
                                                <div className="bg-slate-800/50 h-10 flex items-center px-6 gap-2 shrink-0">
                                                    <Terminal size={12} className="text-slate-500" />
                                                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">root@revlo-os:~/neural-stream</span>
                                                </div>
                                                <pre className="flex-1 p-8 text-[13px] font-mono text-blue-300 overflow-y-auto custom-scrollbar leading-relaxed">
                                                    <code className="block">
                                                        {testOutput}
                                                        {isTesting && <span className="inline-block w-2.5 h-5 bg-purple-500 ml-1 animate-pulse align-middle" />}
                                                    </code>
                                                </pre>
                                            </div>
                                        )
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center text-slate-200 transition-all">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-purple-500/10 blur-[60px] rounded-full animate-pulse" />
                                                <div className="w-32 h-32 bg-slate-50 rounded-[3rem] flex items-center justify-center border border-slate-50 shadow-inner relative z-10">
                                                    <Terminal size={56} className="opacity-10" />
                                                </div>
                                            </div>
                                            <div className="mt-10 text-center relative z-10">
                                                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Workspace Empty</p>
                                                <p className="text-[9px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Awaiting Signal Injection...</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return <div className="py-20 text-center text-slate-300 uppercase font-black tracking-widest text-[10px]">Module Pending Implementation</div>;
        }
    };

    return (
        <div className="flex h-full bg-slate-50 text-slate-900 overflow-hidden font-display">
            {/* Sidebar List */}
            <div className="w-80 border-r border-slate-100 bg-white flex flex-col overflow-x-hidden">
                <div className="p-8 border-b border-slate-50 bg-slate-50/20">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-4 bg-purple-600 rounded-full" />
                            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Deployment Index</h2>
                        </div>
                        <button onClick={handleNew} className="p-3 bg-white border border-slate-100 rounded-2xl text-purple-600 hover:bg-purple-50 hover:border-purple-100 hover:shadow-lg transition-all hover:scale-105 active:scale-95 shadow-sm">
                            <Plus size={20} />
                        </button>
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter leading-none mb-1">Operative OS</h1>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Active Intelligence Nodes</p>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
                    {agents.map(agent => (
                        <button
                            key={agent.id}
                            onClick={() => handleSelect(agent)}
                            className={`w-full p-5 rounded-[2rem] cursor-pointer transition-all text-left flex items-center gap-4 group ${selectedAgentId === agent.id
                                ? 'bg-purple-50 border border-purple-100 shadow-xl shadow-purple-100/50'
                                : 'bg-white border border-transparent hover:bg-slate-50'
                                }`}
                        >
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-all ${selectedAgentId === agent.id ? 'bg-purple-600 text-white shadow-lg' : 'bg-slate-100 text-slate-400 group-hover:bg-purple-100 group-hover:text-purple-600'}`}>
                                {agent.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className={`font-black truncate text-sm tracking-tight ${selectedAgentId === agent.id ? 'text-slate-900' : 'text-slate-600'}`}>{agent.name}</p>
                                <p className={`text-[9px] uppercase font-black tracking-widest mt-0.5 ${selectedAgentId === agent.id ? 'text-purple-600' : 'text-slate-400'}`}>
                                    CLASS: {agent.role}
                                </p>
                            </div>
                            {selectedAgentId === agent.id && <ChevronRight size={14} className="text-purple-400" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Engineering Console */}
            <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/30 backdrop-blur-sm">
                {formData ? (
                    <>
                        <div className="h-24 border-b border-slate-50 bg-white/80 backdrop-blur-md px-10 flex items-center justify-between shadow-sm shrink-0">
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-purple-200">
                                    <Bot size={24} />
                                </div>
                                <h1 className="text-2xl font-black text-slate-900 flex items-center gap-4 uppercase tracking-tighter">
                                    {formData.name}
                                    <span className="text-[9px] bg-purple-600 text-white px-3 py-1.5 rounded-xl tracking-widest shadow-sm">v{formData.version}.0-CORE</span>
                                </h1>
                            </div>
                            <div className="flex gap-4">
                                <button onClick={() => handleDelete(formData.id)} className="p-4 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"><Trash2 size={24} /></button>
                                <button onClick={handleSave} className="bg-purple-600 text-white font-black px-10 py-5 rounded-3xl text-[10px] uppercase tracking-widest flex items-center shadow-2xl shadow-purple-200 hover:shadow-purple-300 transition-all hover:scale-[1.05] active:scale-[0.95]">
                                    <Save size={18} className="mr-3" /> Commit operative
                                </button>
                            </div>
                        </div>

                        <div className="flex border-b border-slate-50 bg-white px-10 space-x-10 shrink-0">
                            {[
                                { id: 'identity', label: 'Mandate', icon: Shield },
                                { id: 'protocol', label: 'Protocol', icon: Layers },
                                { id: 'orchestration', label: 'Orchestration', icon: RefreshCw },
                                { id: 'lab', label: 'Sim Lab', icon: Terminal }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`py-6 text-[10px] font-black uppercase tracking-widest flex items-center border-b-2 transition-all relative ${activeTab === tab.id ? 'border-purple-600 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                                >
                                    <tab.icon size={16} className="mr-3" />
                                    {tab.label}
                                    {activeTab === tab.id && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />}
                                </button>
                            ))}
                        </div>

                        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
                            <div className="max-w-5xl mx-auto">
                                {renderTabContent()}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                        <div className="w-40 h-40 bg-white rounded-[3rem] flex items-center justify-center mb-10 border border-slate-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] relative">
                            <div className="absolute inset-0 bg-purple-50 rounded-[3rem] animate-pulse opacity-40" />
                            <Brain size={64} className="text-purple-400 relative z-10" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-[0.4em] leading-none mb-6">Core Inactive</h2>
                        <p className="max-w-xs mx-auto text-slate-400 font-bold text-[11px] leading-loose uppercase tracking-[0.2em] opacity-60">
                            Neural pathways ready for injection. <br />
                            Select an intelligence node from the directory to begin engineering protocols.
                        </p>
                    </div>
                )}
            </div>
        </div >
    );
};

export default AgentStudioView;
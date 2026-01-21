import React, { useState } from 'react';
import {
    Book, ChevronRight, Cpu, Phone, Users, Layers, Settings,
    Terminal, Shield, Search, Zap, Globe, MessageSquare, Bot,
    TriangleAlert, CircleCheck, Workflow, Code, Database, Radio,
    Brain, FileText, PlayCircle, CircleHelp, Server, Activity
} from 'lucide-react';

interface DocSection {
    id: string;
    title: string;
    icon: React.ReactNode;
    articles: DocArticle[];
}

interface DocArticle {
    id: string;
    title: string;
    content: React.ReactNode;
}

const DocsView: React.FC = () => {
    const [activeSectionId, setActiveSectionId] = useState('onboarding');
    const [activeArticleId, setActiveArticleId] = useState('vision');
    const [searchQuery, setSearchQuery] = useState('');

    const sections: DocSection[] = [
        {
            id: 'onboarding',
            title: 'Onboarding & Core Concepts',
            icon: <Shield size={18} />,
            articles: [
                {
                    id: 'vision',
                    title: 'System Vision & Capabilities',
                    content: (
                        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Hero */}
                            <div className="bg-gradient-to-br from-white to-slate-50 border-2 border-slate-100 rounded-3xl p-10 relative overflow-hidden shadow-xl shadow-slate-200/40">
                                <div className="absolute top-0 right-0 p-12 opacity-5 transform translate-x-12 -translate-y-12">
                                    <Globe size={400} className="text-purple-600" />
                                </div>
                                <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Revlo OS <span className="text-purple-600">Enterprise</span></h1>
                                <p className="text-xl text-slate-600 max-w-3xl leading-relaxed font-medium">
                                    Revlo OS is an <strong className="text-slate-900">Autonomous Agent Operating System</strong> designed to replace the manual labor of a digital agency.
                                    Instead of hiring a Scout, a Strategist, a Developer, and a Sales Rep, you configure AI Agents to execute these roles in a continuous, high-speed loop.
                                </p>
                            </div>

                            {/* Core Capabilities Grid */}
                            <div className="grid grid-cols-2 gap-8">
                                <div className="bg-white p-8 rounded-3xl border-2 border-slate-50 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-blue-100">
                                        <Search className="text-blue-600" size={28} />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-3">1. Hyper-Local Scouting</h3>
                                    <p className="text-slate-600 leading-relaxed font-medium">
                                        Uses live Google Maps API data to scan entire zip codes or specific niches.
                                        It identifies businesses with <strong className="text-slate-900 border-b-2 border-blue-100">low ratings</strong>, <strong className="text-slate-900 border-b-2 border-blue-100">missing websites</strong>, or <strong className="text-slate-900 border-b-2 border-blue-100">poor SEO</strong>.
                                    </p>
                                </div>
                                <div className="bg-white p-8 rounded-3xl border-2 border-slate-50 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="bg-purple-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-purple-100">
                                        <Brain className="text-purple-600" size={28} />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-3">2. Psychological Profiling</h3>
                                    <p className="text-slate-600 leading-relaxed font-medium">
                                        The 'Analyst' agent reads owner replies to reviews to build a personality dossier.
                                        It determines if a lead is <span className="text-slate-900 font-bold italic">"Ego-driven"</span> or <span className="text-slate-900 font-bold italic">"Growth-minded"</span> to tailor the pitch.
                                    </p>
                                </div>
                                <div className="bg-white p-8 rounded-3xl border-2 border-slate-50 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="bg-indigo-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-indigo-100">
                                        <Code className="text-indigo-600" size={28} />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-3">3. Generative Development</h3>
                                    <p className="text-slate-600 leading-relaxed font-medium">
                                        The 'Builder' agent writes production-ready HTML/Tailwind code for multi-page websites based on a custom strategy doc (PRD), deploying a live preview instantly.
                                    </p>
                                </div>
                                <div className="bg-white p-8 rounded-3xl border-2 border-slate-50 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="bg-green-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-green-100">
                                        <Phone className="text-green-600" size={28} />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-3">4. Voice Autonomy</h3>
                                    <p className="text-slate-600 leading-relaxed font-medium">
                                        Integration with VAPI.ai allows agents to physically call leads via telephony, hold natural conversations, and handle objections in real-time.
                                    </p>
                                </div>
                            </div>

                            {/* Workflow Diagram */}
                            <div className="mt-12">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">The Autonomous Loop</h3>
                                <div className="flex items-center justify-between bg-white p-10 rounded-[2rem] border-2 border-slate-100 shadow-inner">
                                    <div className="text-center group">
                                        <div className="bg-slate-50 p-4 rounded-2xl mb-3 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all border border-slate-200 group-hover:border-blue-200"><Globe size={24} className="text-slate-400 group-hover:text-blue-600" /></div>
                                        <div className="text-[10px] font-black text-slate-500 group-hover:text-blue-600 tracking-widest uppercase">INGEST</div>
                                    </div>
                                    <div className="h-0.5 bg-slate-100 flex-1 mx-6"></div>
                                    <div className="text-center group">
                                        <div className="bg-slate-50 p-4 rounded-2xl mb-3 group-hover:bg-purple-50 group-hover:text-purple-600 transition-all border border-slate-200 group-hover:border-purple-200"><Brain size={24} className="text-slate-400 group-hover:text-purple-600" /></div>
                                        <div className="text-[10px] font-black text-slate-500 group-hover:text-purple-600 tracking-widest uppercase">ANALYZE</div>
                                    </div>
                                    <div className="h-0.5 bg-slate-100 flex-1 mx-6"></div>
                                    <div className="text-center group">
                                        <div className="bg-slate-50 p-4 rounded-2xl mb-3 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all border border-slate-200 group-hover:border-indigo-200"><FileText size={24} className="text-slate-400 group-hover:text-indigo-600" /></div>
                                        <div className="text-[10px] font-black text-slate-500 group-hover:text-indigo-600 tracking-widest uppercase">STRATEGIZE</div>
                                    </div>
                                    <div className="h-0.5 bg-slate-100 flex-1 mx-6"></div>
                                    <div className="text-center group">
                                        <div className="bg-slate-50 p-4 rounded-2xl mb-3 group-hover:bg-purple-50 group-hover:text-purple-600 transition-all border border-slate-200 group-hover:border-purple-200"><Code size={24} className="text-slate-400 group-hover:text-purple-600" /></div>
                                        <div className="text-[10px] font-black text-slate-500 group-hover:text-purple-600 tracking-widest uppercase">BUILD</div>
                                    </div>
                                    <div className="h-0.5 bg-slate-100 flex-1 mx-6"></div>
                                    <div className="text-center group">
                                        <div className="bg-slate-50 p-4 rounded-2xl mb-3 group-hover:bg-green-50 group-hover:text-green-600 transition-all border border-slate-200 group-hover:border-green-200"><Phone size={24} className="text-slate-400 group-hover:text-green-600" /></div>
                                        <div className="text-[10px] font-black text-slate-500 group-hover:text-green-600 tracking-widest uppercase">CLOSE</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                },
                {
                    id: 'first-run',
                    title: 'First Run Walkthrough',
                    content: (
                        <div className="space-y-8">
                            <h1 className="text-4xl font-black text-slate-900 mb-8 border-b-4 border-purple-600 w-fit pb-2">Your First Campaign</h1>

                            <div className="relative border-l-4 border-slate-100 ml-4 pl-12 space-y-16">
                                {/* Step 1 */}
                                <div className="relative">
                                    <div className="absolute -left-[60px] top-0 w-10 h-10 rounded-2xl bg-white border-2 border-slate-100 shadow-md flex items-center justify-center text-sm font-black text-purple-600">1</div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-3">Configure Intelligence</h3>
                                    <p className="text-slate-600 font-medium mb-6">
                                        Before the engine can start, it needs a brain. Navigate to <strong>Settings</strong> (Bottom Left Gear Icon).
                                    </p>
                                    <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 text-sm font-mono text-slate-700 leading-relaxed shadow-inner">
                                        1. Enter your Gemini API Key.<br />
                                        2. Set Batch Size to 5 (Recommended for testing).<br />
                                        3. Set Region to your target city (e.g., "Austin, TX").
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className="relative">
                                    <div className="absolute -left-[60px] top-0 w-10 h-10 rounded-2xl bg-white border-2 border-slate-100 shadow-md flex items-center justify-center text-sm font-black text-blue-600">2</div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-3">Select Your Operative</h3>
                                    <p className="text-slate-600 font-medium mb-6">
                                        Go to the <strong>Engine</strong> tab. In the sidebar, you will see an "Agent Selector".
                                        By default, "Atlas" (Designer) is selected.
                                    </p>
                                    <div className="flex items-center space-x-4 bg-blue-50 p-5 rounded-2xl border-2 border-blue-100 text-blue-700 text-sm font-bold shadow-sm">
                                        <Bot size={20} className="text-blue-500" />
                                        <span>Tip: You can engineer new agents in the "Agents" tab later.</span>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className="relative">
                                    <div className="absolute -left-[60px] top-0 w-10 h-10 rounded-2xl bg-white border-2 border-slate-100 shadow-md flex items-center justify-center text-sm font-black text-purple-600">3</div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-3">Ignite the Engine</h3>
                                    <p className="text-slate-600 font-medium mb-6">
                                        Click the <span className="text-white font-black bg-purple-600 px-4 py-1.5 rounded-full text-xs tracking-widest shadow-lg shadow-purple-600/20">IGNITE ENGINE</span> button in the Engine sidebar.
                                    </p>
                                    <ul className="space-y-3">
                                        <li className="flex items-center text-slate-600 font-medium"><CircleCheck size={16} className="text-green-500 mr-3" /> System queries Google Maps API</li>
                                        <li className="flex items-center text-slate-600 font-medium"><CircleCheck size={16} className="text-green-500 mr-3" /> Vulnerability filters applied</li>
                                        <li className="flex items-center text-slate-600 font-medium"><CircleCheck size={16} className="text-green-500 mr-3" /> Live lead hydration</li>
                                    </ul>
                                </div>

                                {/* Step 4 */}
                                <div className="relative">
                                    <div className="absolute -left-[60px] top-0 w-10 h-10 rounded-2xl bg-white border-2 border-slate-100 shadow-md flex items-center justify-center text-sm font-black text-green-600">4</div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-3">Execute Pipeline</h3>
                                    <p className="text-slate-600 font-medium mb-6">
                                        Click on a lead. Navigation tabs will dynamically update based on the lead's state.
                                    </p>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="text-center bg-white p-5 rounded-2xl border-2 border-slate-100 shadow-sm">
                                            <div className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1">State A</div>
                                            <div className="font-black text-slate-900 text-xs">Analysis</div>
                                        </div>
                                        <div className="text-center bg-white p-5 rounded-2xl border-2 border-slate-100 shadow-sm">
                                            <div className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1">State B</div>
                                            <div className="font-black text-purple-600 text-xs text-glow-purple">Strategy</div>
                                        </div>
                                        <div className="text-center bg-white p-5 rounded-2xl border-2 border-slate-100 shadow-sm">
                                            <div className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1">State C</div>
                                            <div className="font-black text-blue-600 text-xs text-glow-blue">Deployment</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            ]
        },
        {
            id: 'engine',
            title: 'Lead Engine (The Scout)',
            icon: <Zap size={18} />,
            articles: [
                {
                    id: 'scouting-logic',
                    title: 'Search Algorithms',
                    content: (
                        <div className="space-y-8">
                            <h1 className="text-4xl font-black text-slate-900 mb-6">Search Algorithms</h1>
                            <p className="text-lg text-slate-600 font-medium leading-relaxed">
                                The Engine is not just a scraper; it is a <span className="text-slate-900 font-black underline decoration-purple-500 decoration-4">high-resolution filter</span>. It uses two primary algorithms to determine if a business is a viable lead.
                            </p>

                            <div className="space-y-10 mt-10">
                                {/* Niche Mode */}
                                <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/30">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-3xl font-black text-slate-900">Mode A: Niche Precision</h3>
                                        <span className="bg-purple-50 text-purple-600 text-[10px] px-4 py-1.5 rounded-full font-black tracking-widest uppercase border border-purple-100 shadow-sm">VERTICAL TARGET</span>
                                    </div>
                                    <p className="text-slate-600 font-medium mb-8 text-lg">
                                        Best for specialized campaigns (e.g., "I only help Dentists").
                                    </p>
                                    <div className="bg-slate-50 p-8 rounded-3xl border-2 border-slate-100 shadow-inner">
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Algorithmic Filter</h4>
                                        <code className="text-sm text-purple-600 font-mono block leading-relaxed bg-white p-6 rounded-2xl border border-purple-50">
                                            IF (Niche == "Dentist") AND<br />
                                            (Website == NULL OR Rating &lt; 4.2)<br />
                                            THEN ADD_TO_SESSION
                                        </code>
                                    </div>
                                </div>

                                {/* Zone Mode */}
                                <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/30">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-3xl font-black text-slate-900">Mode B: Zone Domination</h3>
                                        <span className="bg-blue-50 text-blue-600 text-[10px] px-4 py-1.5 rounded-full font-black tracking-widest uppercase border border-blue-100 shadow-sm">GEO SWEEP</span>
                                    </div>
                                    <p className="text-slate-600 font-medium mb-8 text-lg">
                                        Best for "City Takeover" campaigns. It ignores vertical and sweeps a zip code for <strong>ANY</strong> vulnerable business.
                                    </p>
                                    <div className="bg-slate-50 p-8 rounded-3xl border-2 border-slate-100 shadow-inner">
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Algorithmic Filter</h4>
                                        <code className="text-sm text-blue-600 font-mono block leading-relaxed bg-white p-6 rounded-2xl border border-blue-50">
                                            IF (Location == "78704") AND<br />
                                            (Website == NULL)<br />
                                            THEN ADD_TO_SESSION
                                        </code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                },
                {
                    id: 'scoring-system',
                    title: 'Propensity Scoring',
                    content: (
                        <div className="space-y-10">
                            <h1 className="text-4xl font-black text-slate-900 mb-6">Propensity Scoring</h1>
                            <p className="text-lg text-slate-600 font-medium leading-relaxed">
                                The system assigns a <span className="text-purple-600 font-black bg-purple-50 px-3 py-1 rounded-xl border border-purple-100">Propensity Score (0-100)</span> to every lead. This represents the statistical likelihood of a conversion.
                            </p>

                            <div className="grid grid-cols-3 gap-8 mt-10">
                                <div className="bg-white p-8 rounded-[2rem] border-2 border-slate-50 shadow-lg shadow-slate-200/40">
                                    <div className="text-5xl font-black text-slate-900 mb-3 tracking-tighter">30%</div>
                                    <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-4">Revenue Band</div>
                                    <p className="text-xs text-slate-500 font-bold leading-relaxed">High-margin businesses prioritized (Roofers &gt; Cafes).</p>
                                </div>
                                <div className="bg-white p-8 rounded-[2rem] border-2 border-slate-50 shadow-lg shadow-slate-200/40">
                                    <div className="text-5xl font-black text-purple-600 mb-3 tracking-tighter">40%</div>
                                    <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-4">Pain Vector</div>
                                    <p className="text-xs text-slate-500 font-bold leading-relaxed">Mobile accessibility, SEO health, and site existence.</p>
                                </div>
                                <div className="bg-white p-8 rounded-[2rem] border-2 border-slate-50 shadow-lg shadow-slate-200/40">
                                    <div className="text-5xl font-black text-blue-600 mb-3 tracking-tighter">30%</div>
                                    <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-4">Sentiment Map</div>
                                    <p className="text-xs text-slate-500 font-bold leading-relaxed">Owner responsiveness to digital feedback channels.</p>
                                </div>
                            </div>
                        </div>
                    )
                }
            ]
        },
        {
            id: 'agent-studio',
            title: 'Agent Studio (The Operative)',
            icon: <Bot size={18} />,
            articles: [
                {
                    id: 'mandates',
                    title: 'Engineering Mandates',
                    content: (
                        <div className="space-y-8">
                            <h1 className="text-4xl font-black text-slate-900 mb-6">Mandates & Non-Goals</h1>
                            <p className="text-lg text-slate-600 font-medium leading-relaxed">
                                Revlo OS Agents are not standard chatbots. They are <strong className="text-slate-900">Bounded Systems</strong> constrained by strict operational mandates.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                                {/* The Mandate */}
                                <div className="bg-white border-2 border-slate-100 rounded-3xl p-8 shadow-lg shadow-slate-200/30">
                                    <div className="flex items-center mb-5">
                                        <div className="bg-green-50 p-2 rounded-xl mr-4 border border-green-100 shadow-inner">
                                            <CircleCheck className="text-green-600" size={24} />
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900">The Mandate</h3>
                                    </div>
                                    <p className="text-slate-600 font-medium mb-6">
                                        The single immutable objective. The Agent will sacrifice any distraction to achieve this specific output.
                                    </p>
                                    <div className="bg-slate-50 p-6 rounded-2xl border-2 border-green-100/50 shadow-inner">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3">Core Directive</span>
                                        <p className="text-sm text-green-700 italic font-bold">"Design high-contrast, brutalist landing pages that funnel every user toward the checkout action."</p>
                                    </div>
                                </div>

                                {/* Non-Goals */}
                                <div className="bg-white border-2 border-slate-100 rounded-3xl p-8 shadow-lg shadow-slate-200/30">
                                    <div className="flex items-center mb-5">
                                        <div className="bg-red-50 p-2 rounded-xl mr-4 border border-red-100 shadow-inner">
                                            <TriangleAlert className="text-red-600" size={24} />
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900">Non-Goals</h3>
                                    </div>
                                    <p className="text-slate-600 font-medium mb-6">
                                        Explicit negative constraints. These prevent "AI Drift" and ensure the output remains sharp and professional.
                                    </p>
                                    <div className="space-y-3">
                                        <div className="text-xs text-red-600 bg-red-50 px-4 py-2.5 rounded-xl border border-red-100 font-bold uppercase tracking-wide">"Do NOT use serif fonts."</div>
                                        <div className="text-xs text-red-600 bg-red-50 px-4 py-2.5 rounded-xl border border-red-100 font-bold uppercase tracking-wide">"Do NOT apologize for delays."</div>
                                        <div className="text-xs text-red-600 bg-red-50 px-4 py-2.5 rounded-xl border border-red-100 font-bold uppercase tracking-wide">"Do NOT create subtle gradients."</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                },
                {
                    id: 'matrix',
                    title: 'The Responsibility Matrix',
                    content: (
                        <div className="space-y-8">
                            <h1 className="text-4xl font-black text-slate-900 mb-6">The Responsibility Matrix</h1>
                            <p className="text-lg text-slate-600 font-medium leading-relaxed">
                                The Matrix is the prioritized logic engine. It determines the order of operations and safety protocols for the Agent.
                            </p>

                            <div className="overflow-hidden rounded-[2rem] border-2 border-slate-100 bg-white shadow-xl shadow-slate-200/40">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50 border-b-2 border-slate-100">
                                        <tr>
                                            <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Priority</th>
                                            <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Severity</th>
                                            <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Effect</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        <tr className="hover:bg-slate-50/50 transition-colors">
                                            <td className="p-6"><span className="text-red-600 font-black text-lg">CRITICAL</span></td>
                                            <td className="p-6"><span className="bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase border border-red-100 tracking-widest">HALT</span></td>
                                            <td className="p-6 text-slate-600 font-medium">Generation fails immediately on violation. Enforces safety and hard brand rules.</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50/50 transition-colors">
                                            <td className="p-6"><span className="text-purple-600 font-black text-lg">HIGH</span></td>
                                            <td className="p-6"><span className="bg-purple-50 text-purple-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase border border-purple-100 tracking-widest">ADAPT</span></td>
                                            <td className="p-6 text-slate-600 font-medium">Agent attempts internal correction. Proceeds only with explicit system flagging.</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50/50 transition-colors">
                                            <td className="p-6"><span className="text-blue-600 font-black text-lg">MEDIUM</span></td>
                                            <td className="p-6"><span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase border border-blue-100 tracking-widest">STYLE</span></td>
                                            <td className="p-6 text-slate-600 font-medium">Stylistic preferences. Agent will attempt but drop if logic conflicts arise.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                }
            ]
        },
        {
            id: 'voice-command',
            title: 'Voice Command (VAPI)',
            icon: <Phone size={18} />,
            articles: [
                {
                    id: 'vapi-setup',
                    title: 'Telephony Configuration',
                    content: (
                        <div className="space-y-8">
                            <h1 className="text-4xl font-black text-slate-900 mb-6">Telephony Setup</h1>
                            <p className="text-lg text-slate-600 font-medium leading-relaxed">
                                Revlo OS integrates with <strong className="text-slate-900">VAPI.ai</strong> to enable low-latency, real-time voice conversations.
                            </p>

                            <div className="bg-white border-2 border-slate-100 rounded-[2rem] p-10 shadow-xl shadow-slate-200/30">
                                <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center">
                                    <Settings className="mr-3 text-slate-400" size={24} /> Required Credentials
                                </h3>
                                <div className="space-y-8">
                                    <div className="flex items-start">
                                        <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-xs font-black text-slate-400 mr-4 mt-1">01</div>
                                        <div>
                                            <h4 className="text-lg font-black text-slate-900 mb-1">Private API Key</h4>
                                            <p className="text-slate-500 text-sm font-medium">Obtained from VAPI Dashboard <ChevronRight size={12} className="inline mx-1 opacity-50" /> API Keys.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-xs font-black text-slate-400 mr-4 mt-1">02</div>
                                        <div>
                                            <h4 className="text-lg font-black text-slate-900 mb-1">Public API Key</h4>
                                            <p className="text-slate-500 text-sm font-medium">Used for client-side call initialization and telemetry.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-xs font-black text-slate-400 mr-4 mt-1">03</div>
                                        <div>
                                            <h4 className="text-lg font-black text-slate-900 mb-1">Phone Number ID</h4>
                                            <p className="text-slate-500 text-sm font-medium">Assigned to your purchased outbound telephony node.</p>
                                            <div className="mt-4 p-4 bg-purple-50 rounded-2xl border border-purple-100 text-[10px] font-black text-purple-600 uppercase tracking-widest">
                                                Minimum Operational Cost: $2.00 / month / Number
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                },
                {
                    id: 'vapi-protocol',
                    title: 'Dynamic Context Injection',
                    content: (
                        <div className="space-y-8">
                            <h1 className="text-4xl font-black text-slate-900 mb-6">Context Injection</h1>
                            <p className="text-lg text-slate-600 font-medium leading-relaxed">
                                Revlo OS injects a <strong className="text-slate-900">Real-Time Prompt Packet</strong> into the call stream at the sub-millisecond level of connection.
                            </p>

                            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-2xl shadow-purple-900/5 overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <Cpu size={120} className="text-purple-400" />
                                </div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">The Packet Structure</h4>
                                <div className="font-mono text-sm text-purple-400 leading-relaxed overflow-x-auto whitespace-pre">
                                    {`{
  "systemPrompt": "
     IDENTITY: You are Alex, a Strategist at Revlo OS.
     CONTEXT: You are calling {LeadName}.
     INTEL: The owner is {OwnerName}. Their website is {WebsiteStatus}.
     MISSION: Inform them we built a demo at {DemoUrl}.
     OBJECTION HANDLING:
     - If 'Not interested': Offer free link via email.
     - If 'How much': 'The demo is free, the service is $750'.
  "
}`}
                                </div>
                                <div className="mt-8 pt-8 border-t border-slate-800 flex items-center text-slate-500 text-xs font-bold uppercase tracking-widest">
                                    <Radio size={14} className="mr-2 text-green-500 animate-pulse" /> Live Link Stream Active
                                </div>
                            </div>
                        </div>
                    )
                }
            ]
        },
        {
            id: 'automation',
            title: 'Workflow Automation',
            icon: <Workflow size={18} />,
            articles: [
                {
                    id: 'auto-pipeline',
                    title: 'The Auto-Pipeline',
                    content: (
                        <div className="space-y-8">
                            <h1 className="text-4xl font-black text-slate-900 mb-6">The Autonomous Pipeline</h1>
                            <p className="text-lg text-slate-600 font-medium leading-relaxed">
                                Activating <span className="text-purple-600 font-black bg-purple-50 px-4 py-1.5 rounded-full border border-purple-100 text-[10px] tracking-widest shadow-sm">FULL AUTO</span> enables the high-speed sequential chaining of agents.
                            </p>

                            <div className="relative pl-12 space-y-12 mt-10 before:absolute before:left-5 before:top-2 before:bottom-2 before:w-1 before:bg-slate-100">
                                <div className="relative group">
                                    <div className="absolute -left-12 top-1 w-10 h-10 bg-white rounded-2xl border-2 border-slate-100 shadow-md flex items-center justify-center text-sm font-black text-slate-400 group-hover:border-purple-200 group-hover:text-purple-600 transition-all">1</div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-2">Ingestion (Scout)</h3>
                                    <p className="text-slate-600 font-medium leading-relaxed">Lead is identified via Google Maps. Basic metadata (Phone, Address, Lat/Long) is captured and encrypted.</p>
                                </div>
                                <div className="relative group">
                                    <div className="absolute -left-12 top-1 w-10 h-10 bg-white rounded-2xl border-2 border-slate-100 shadow-md flex items-center justify-center text-sm font-black text-slate-400 group-hover:border-blue-200 group-hover:text-blue-600 transition-all">2</div>
                                    <h3 className="text-2xl font-black text-blue-600">Enrichment (Analyst)</h3>
                                    <p className="text-slate-600 font-medium leading-relaxed">System searches specifically for "Owner Name" and analyzes the business's reviews to build the "Psychology Profile".</p>
                                </div>
                                <div className="relative group">
                                    <div className="absolute -left-12 top-1 w-10 h-10 bg-white rounded-2xl border-2 border-slate-100 shadow-md flex items-center justify-center text-sm font-black text-slate-400 group-hover:border-purple-200 group-hover:text-purple-600 transition-all">3</div>
                                    <h3 className="text-2xl font-black text-purple-600">Strategy (Strategist)</h3>
                                    <p className="text-slate-600 font-medium leading-relaxed">A Product Requirement Doc (PRD) is written, outlining exactly how to beat the local competitors identified in step 2.</p>
                                </div>
                                <div className="relative group">
                                    <div className="absolute -left-12 top-1 w-10 h-10 bg-purple-600 rounded-2xl border-2 border-purple-500 shadow-lg shadow-purple-600/20 flex items-center justify-center text-sm font-black text-white">4</div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-3">Execution (Builder & Closer)</h3>
                                    <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-100 space-y-3 shadow-inner">
                                        <div className="flex items-center text-slate-600 font-bold text-sm"><CircleCheck size={16} className="text-green-500 mr-3" /> Multi-page website coded via PRD</div>
                                        <div className="flex items-center text-slate-600 font-bold text-sm"><CircleCheck size={16} className="text-green-500 mr-3" /> Targeted outreach assets drafted</div>
                                        <div className="flex items-center text-slate-600 font-bold text-sm"><CircleCheck size={16} className="text-green-500 mr-3" /> Status set to <span className="ml-2 bg-green-100 text-green-700 px-2 py-0.5 rounded-lg text-[10px] border border-green-200 font-black tracking-widest">OUTREACH_READY</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                },
                {
                    id: 'web-builder',
                    title: 'Generative Web Builder',
                    content: (
                        <div className="space-y-8">
                            <h1 className="text-4xl font-black text-slate-900 mb-6">The Generative Builder</h1>
                            <p className="text-lg text-slate-600 font-medium leading-relaxed">
                                Unlike other tools that generate static images, Revlo OS generates <strong className="text-slate-900 border-b-2 border-blue-100">production-ready code</strong>.
                            </p>

                            <div className="grid grid-cols-2 gap-8 mt-10">
                                <div className="bg-white border-2 border-slate-100 p-8 rounded-[2rem] shadow-lg shadow-slate-200/30">
                                    <h4 className="font-black text-slate-900 text-xl mb-6 flex items-center"><Code size={24} className="mr-3 text-blue-600" /> Tech Stack</h4>
                                    <ul className="space-y-4">
                                        <li className="flex items-center text-slate-600 font-bold text-sm"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3"></div> HTML5 Semantic Structure</li>
                                        <li className="flex items-center text-slate-600 font-bold text-sm"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3"></div> Tailwind CSS Library Integration</li>
                                        <li className="flex items-center text-slate-600 font-bold text-sm"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3"></div> Lucide / FontAwesome Core</li>
                                        <li className="flex items-center text-slate-600 font-bold text-sm"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3"></div> Google Fonts Master Class</li>
                                    </ul>
                                </div>
                                <div className="bg-white border-2 border-slate-100 p-8 rounded-[2rem] shadow-lg shadow-slate-200/30">
                                    <h4 className="font-black text-slate-900 text-xl mb-6 flex items-center"><Terminal size={24} className="mr-3 text-purple-600" /> Pinpoint Editor</h4>
                                    <p className="text-slate-600 font-medium leading-relaxed mb-6">
                                        Target specific DOM nodes for AI-rewriting without regenerating the entire site infrastructure.
                                    </p>
                                    <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 text-[10px] font-black text-purple-600 uppercase tracking-widest text-center">
                                        Precision UI Morphing Enabled
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            ]
        },
        {
            id: 'ops',
            title: 'Operations & Maintenance',
            icon: <Server size={18} />,
            articles: [
                {
                    id: 'billing',
                    title: 'API Costs & Limits',
                    content: (
                        <div className="space-y-8">
                            <h1 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">System Consumption</h1>

                            <div className="bg-amber-50 border-2 border-amber-100 p-8 rounded-[2rem] flex items-start shadow-xl shadow-amber-900/5">
                                <div className="bg-amber-100 p-3 rounded-2xl mr-6 border border-amber-200 text-amber-600">
                                    <TriangleAlert size={32} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-black text-amber-700 text-xl mb-2">Quota Warning</h4>
                                    <p className="text-amber-800 font-medium leading-relaxed opacity-80">
                                        "Full Auto" mode can consume significant API tokens at scale. It is mandatory to monitor your Google Cloud and VAPI consoles daily.
                                    </p>
                                </div>
                            </div>

                            <div className="overflow-hidden rounded-[2rem] border-2 border-slate-100 bg-white shadow-xl shadow-slate-200/40 mt-10">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50 border-b-2 border-slate-100">
                                        <tr>
                                            <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol Action</th>
                                            <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Est. Cost (USD)</th>
                                            <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Node Model</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
                                        <tr className="hover:bg-slate-50/50 transition-colors">
                                            <td className="p-6 font-bold text-slate-900">Scouting (Batch of 5)</td>
                                            <td className="p-6">~$0.02</td>
                                            <td className="p-6">Gemini 2.5 Flash</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50/50 transition-colors">
                                            <td className="p-6 font-bold text-slate-900">Deep Analysis (Dossier)</td>
                                            <td className="p-6">~$0.05</td>
                                            <td className="p-6">Gemini 3.0 Flash</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50/50 transition-colors">
                                            <td className="p-6 font-bold text-slate-900">Web Build (3-Page)</td>
                                            <td className="p-6">~$0.15</td>
                                            <td className="p-6 text-purple-600 font-black">Gemini 3.5 Pro</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50/50 transition-colors">
                                            <td className="p-6 font-bold text-slate-900">Voice Call (1 Min)</td>
                                            <td className="p-6">~$0.12</td>
                                            <td className="p-6">VAPI + GPT-4o</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                }
            ]
        }
    ];

    const activeSection = sections.find(s => s.id === activeSectionId);
    const activeArticle = activeSection?.articles.find(a => a.id === activeArticleId);

    // Search Logic
    const filteredSections = searchQuery
        ? sections.map(sec => ({
            ...sec,
            articles: sec.articles.filter(art =>
                art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                sec.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
        })).filter(sec => sec.articles.length > 0)
        : sections;

    return (
        <div className="flex h-full bg-white overflow-hidden select-none">
            {/* Module Directory */}
            <div className="w-80 border-r border-slate-200 bg-slate-50 flex flex-col overflow-x-hidden shrink-0">
                <div className="p-8 border-b border-slate-100 bg-white">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-2 h-4 bg-purple-600 rounded-full" />
                        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Operational Schema</h2>
                    </div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-1">Architecture</h1>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-6">System Documentation</p>

                    <div className="relative">
                        <Search className="absolute left-3.5 top-3 text-slate-400" size={16} />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-900 focus:border-purple-500 focus:outline-none transition-all placeholder:text-slate-400 font-bold"
                            placeholder="Search docs..."
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-3 space-y-8 custom-scrollbar">
                    {filteredSections.map(section => (
                        <div key={section.id} className="animate-in fade-in slide-in-from-left-2 duration-300">
                            <div className="px-4 mb-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center opacity-70">
                                {section.icon} <span className="ml-3">{section.title}</span>
                            </div>
                            <ul className="space-y-1">
                                {section.articles.map(article => (
                                    <li key={article.id}>
                                        <button
                                            onClick={() => { setActiveSectionId(section.id); setActiveArticleId(article.id); }}
                                            className={`w-full text-left px-4 py-3 text-sm rounded-xl flex items-center justify-between transition-all duration-300 group ${activeArticleId === article.id
                                                ? 'bg-white text-purple-600 font-bold border border-purple-100 shadow-lg shadow-purple-600/5'
                                                : 'text-slate-500 hover:text-slate-900 hover:bg-white/60'
                                                }`}
                                        >
                                            <span className="truncate">{article.title}</span>
                                            {activeArticleId === article.id && <ChevronRight size={14} className="text-purple-600" />}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="p-6 border-t border-slate-200 text-[10px] font-bold text-slate-400 text-center bg-white uppercase tracking-widest">
                    <p>RevampAI Enterprise v3.0</p>
                    <p className="mt-1 opacity-50">Secure Access Logged</p>
                </div>
            </div>

            {/* Reading Pane */}
            <div className="flex-1 overflow-y-auto bg-slate-50/30 relative">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

                <div className="max-w-4xl mx-auto p-12 lg:p-16 relative z-10">
                    {activeArticle ? (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Breadcrumbs */}
                            <div className="mb-10 flex items-center text-[10px] text-purple-600 font-black uppercase tracking-[0.2em] bg-purple-50 px-5 py-2 rounded-full border border-purple-100 w-fit shadow-sm">
                                {activeSection?.title} <ChevronRight size={10} className="mx-3 opacity-50" /> {activeArticle.title}
                            </div>

                            <div className="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-strong:text-slate-900 prose-li:text-slate-600">
                                {activeArticle.content}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-[70vh] text-slate-300">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 shadow-inner border border-slate-100">
                                <Book size={40} className="opacity-10" />
                            </div>
                            <h2 className="text-2xl font-black text-slate-400 mb-2">Initialize Research</h2>
                            <p className="max-w-sm text-center text-slate-400 font-medium">Select a schematic from the module directory to access detailed operational protocols.</p>
                            <div className="mt-8 flex space-x-2">
                                <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                                <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                                <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DocsView;
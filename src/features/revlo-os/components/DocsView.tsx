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
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Hero */}
                            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-10 -translate-y-10">
                                    <Globe size={300} />
                                </div>
                                <h1 className="text-4xl font-bold text-white mb-4">RevampAI Enterprise</h1>
                                <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
                                    RevampAI is an <strong>Autonomous Agent Operating System</strong> designed to replace the manual labor of a digital agency.
                                    Instead of hiring a Scout, a Strategist, a Developer, and a Sales Rep, you configure AI Agents to execute these roles in a continuous, high-speed loop.
                                </p>
                            </div>

                            {/* Core Capabilities Grid */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-800">
                                    <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                        <Search className="text-blue-400" size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">1. Hyper-Local Scouting</h3>
                                    <p className="text-slate-400 text-sm">
                                        Uses live Google Maps API data to scan entire zip codes or specific niches.
                                        It identifies businesses with <strong>low ratings</strong>, <strong>missing websites</strong>, or <strong>poor SEO</strong>.
                                    </p>
                                </div>
                                <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-800">
                                    <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                        <Brain className="text-purple-400" size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">2. Psychological Profiling</h3>
                                    <p className="text-slate-400 text-sm">
                                        The 'Analyst' agent reads owner replies to reviews to build a personality dossier.
                                        It determines if a lead is "Ego-driven", "Neglectful", or "Growth-minded" to tailor the pitch.
                                    </p>
                                </div>
                                <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-800">
                                    <div className="bg-indigo-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                        <Code className="text-indigo-400" size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">3. Generative Development</h3>
                                    <p className="text-slate-400 text-sm">
                                        The 'Builder' agent writes production-ready HTML/Tailwind code for multi-page websites based on a custom strategy doc (PRD), deploying a live preview instantly.
                                    </p>
                                </div>
                                <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-800">
                                    <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                        <Phone className="text-green-400" size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">4. Voice Autonomy</h3>
                                    <p className="text-slate-400 text-sm">
                                        Integration with VAPI.ai allows agents to physically call leads via telephony, hold natural conversations, and handle objections in real-time.
                                    </p>
                                </div>
                            </div>

                            {/* Workflow Diagram */}
                            <div className="mt-8">
                                <h3 className="text-lg font-bold text-white mb-4">The Autonomous Loop</h3>
                                <div className="flex items-center justify-between bg-slate-900 p-6 rounded-xl border border-slate-800">
                                    <div className="text-center group">
                                        <div className="bg-slate-800 p-3 rounded-full mb-2 group-hover:bg-blue-900 transition-colors"><Globe size={20} className="text-blue-400" /></div>
                                        <div className="text-xs font-bold text-slate-300">INGEST</div>
                                    </div>
                                    <div className="h-0.5 bg-slate-700 flex-1 mx-4"></div>
                                    <div className="text-center group">
                                        <div className="bg-slate-800 p-3 rounded-full mb-2 group-hover:bg-purple-900 transition-colors"><Brain size={20} className="text-purple-400" /></div>
                                        <div className="text-xs font-bold text-slate-300">ANALYZE</div>
                                    </div>
                                    <div className="h-0.5 bg-slate-700 flex-1 mx-4"></div>
                                    <div className="text-center group">
                                        <div className="bg-slate-800 p-3 rounded-full mb-2 group-hover:bg-indigo-900 transition-colors"><FileText size={20} className="text-indigo-400" /></div>
                                        <div className="text-xs font-bold text-slate-300">STRATEGIZE</div>
                                    </div>
                                    <div className="h-0.5 bg-slate-700 flex-1 mx-4"></div>
                                    <div className="text-center group">
                                        <div className="bg-slate-800 p-3 rounded-full mb-2 group-hover:bg-accent-900 transition-colors"><Code size={20} className="text-accent-400" /></div>
                                        <div className="text-xs font-bold text-slate-300">BUILD</div>
                                    </div>
                                    <div className="h-0.5 bg-slate-700 flex-1 mx-4"></div>
                                    <div className="text-center group">
                                        <div className="bg-slate-800 p-3 rounded-full mb-2 group-hover:bg-green-900 transition-colors"><Phone size={20} className="text-green-400" /></div>
                                        <div className="text-xs font-bold text-slate-300">CLOSE</div>
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
                        <div className="space-y-6">
                            <h1 className="text-3xl font-bold text-white mb-6">Your First Campaign</h1>

                            <div className="relative border-l-2 border-slate-800 pl-8 space-y-10">
                                {/* Step 1 */}
                                <div className="relative">
                                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-[10px] font-bold text-white">1</div>
                                    <h3 className="text-lg font-bold text-white mb-2">Configure Intelligence</h3>
                                    <p className="text-slate-400 text-sm mb-4">
                                        Before the engine can start, it needs a brain. Navigate to <strong>Settings</strong> (Bottom Left Gear Icon).
                                    </p>
                                    <div className="bg-slate-900 p-4 rounded border border-slate-800 text-sm font-mono text-slate-300">
                                        1. Enter your Gemini API Key.<br />
                                        2. Set Batch Size to 5 (Recommended for testing).<br />
                                        3. Set Region to your target city (e.g., "Austin, TX").
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className="relative">
                                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-[10px] font-bold text-white">2</div>
                                    <h3 className="text-lg font-bold text-white mb-2">Select Your Operative</h3>
                                    <p className="text-slate-400 text-sm mb-4">
                                        Go to the <strong>Engine</strong> tab. In the sidebar, you will see an "Agent Selector".
                                        By default, "Atlas" (Designer) is selected.
                                    </p>
                                    <div className="flex items-center space-x-2 bg-blue-900/20 p-3 rounded border border-blue-500/30 text-blue-200 text-xs">
                                        <Bot size={16} />
                                        <span>Tip: You can engineer new agents in the "Agents" tab later.</span>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className="relative">
                                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-[10px] font-bold text-white">3</div>
                                    <h3 className="text-lg font-bold text-white mb-2">Ignite the Engine</h3>
                                    <p className="text-slate-400 text-sm mb-4">
                                        Click the <span className="text-white font-bold bg-primary-600 px-2 py-0.5 rounded text-xs">GO</span> button in the Engine sidebar.
                                    </p>
                                    <ul className="list-disc list-inside text-slate-400 text-sm space-y-2">
                                        <li>The system will query Google Maps.</li>
                                        <li>It will filter out "good" businesses and find "vulnerable" ones.</li>
                                        <li>Leads will appear in the list as cards.</li>
                                    </ul>
                                </div>

                                {/* Step 4 */}
                                <div className="relative">
                                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-[10px] font-bold text-white">4</div>
                                    <h3 className="text-lg font-bold text-white mb-2">Execute Pipeline</h3>
                                    <p className="text-slate-400 text-sm mb-4">
                                        Click on a lead. You will see action buttons appear in the header based on the lead's status.
                                    </p>
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="text-center bg-slate-800 p-2 rounded border border-slate-700">
                                            <div className="text-[10px] uppercase font-bold text-slate-500">Step A</div>
                                            <div className="font-bold text-white text-xs">Analyze</div>
                                        </div>
                                        <div className="text-center bg-slate-800 p-2 rounded border border-slate-700">
                                            <div className="text-[10px] uppercase font-bold text-slate-500">Step B</div>
                                            <div className="font-bold text-accent-500 text-xs">Strategize</div>
                                        </div>
                                        <div className="text-center bg-slate-800 p-2 rounded border border-slate-700">
                                            <div className="text-[10px] uppercase font-bold text-slate-500">Step C</div>
                                            <div className="font-bold text-indigo-400 text-xs">Build</div>
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
                        <div className="space-y-6">
                            <h1 className="text-3xl font-bold text-white mb-4">Search Algorithms</h1>
                            <p className="text-slate-300">
                                The Engine is not just a scraper; it is a filter. It uses two primary algorithms to determine if a business is a viable lead.
                            </p>

                            <div className="space-y-6 mt-6">
                                {/* Niche Mode */}
                                <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-white">Mode A: Niche Precision</h3>
                                        <span className="bg-slate-800 text-slate-400 text-xs px-3 py-1 rounded-full font-mono">TARGET: VERTICAL</span>
                                    </div>
                                    <p className="text-slate-400 text-sm mb-4">
                                        Best for specialized campaigns (e.g., "I only help Dentists").
                                    </p>
                                    <div className="bg-slate-950 p-4 rounded border border-slate-800">
                                        <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Algorithmic Filter</h4>
                                        <code className="text-xs text-green-400 font-mono block">
                                            IF (Niche == "Dentist") AND<br />
                                            (Website == NULL OR Rating &lt; 4.2)<br />
                                            THEN ADD_TO_LIST
                                        </code>
                                    </div>
                                </div>

                                {/* Zone Mode */}
                                <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-white">Mode B: Zone Domination</h3>
                                        <span className="bg-red-900/20 text-red-400 text-xs px-3 py-1 rounded-full font-mono">TARGET: GEOGRAPHIC</span>
                                    </div>
                                    <p className="text-slate-400 text-sm mb-4">
                                        Best for "City Takeover" campaigns. It ignores vertical and sweeps a zip code for <strong>ANY</strong> vulnerable business.
                                    </p>
                                    <div className="bg-slate-950 p-4 rounded border border-slate-800">
                                        <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Algorithmic Filter</h4>
                                        <code className="text-xs text-red-400 font-mono block">
                                            IF (Location == "78704") AND<br />
                                            (Website == NULL)<br />
                                            THEN ADD_TO_LIST
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
                        <div className="space-y-6">
                            <h1 className="text-3xl font-bold text-white mb-4">Propensity Scoring</h1>
                            <p className="text-slate-300">
                                The system assigns a <span className="text-white font-bold">Propensity Score (0-100)</span> to every lead. This score represents the likelihood of a sale based on "Digital Pain" and "Financial Capability".
                            </p>

                            <div className="grid grid-cols-3 gap-4 mt-6">
                                <div className="bg-slate-900 p-4 rounded border border-slate-800">
                                    <div className="text-2xl font-bold text-white mb-1">30%</div>
                                    <div className="text-xs text-slate-500 uppercase">Revenue Potential</div>
                                    <p className="text-xs text-slate-400 mt-2">Does the business have high margins? (Roofers &gt; Cafes)</p>
                                </div>
                                <div className="bg-slate-900 p-4 rounded border border-slate-800">
                                    <div className="text-2xl font-bold text-white mb-1">40%</div>
                                    <div className="text-xs text-slate-500 uppercase">Digital Pain</div>
                                    <p className="text-xs text-slate-400 mt-2">Is the website missing? Is it mobile unresponsive?</p>
                                </div>
                                <div className="bg-slate-900 p-4 rounded border border-slate-800">
                                    <div className="text-2xl font-bold text-white mb-1">30%</div>
                                    <div className="text-xs text-slate-500 uppercase">Owner Psychology</div>
                                    <p className="text-xs text-slate-400 mt-2">Does the owner reply angrily to reviews? (High Emotional Investment)</p>
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
                        <div className="space-y-6">
                            <h1 className="text-3xl font-bold text-white mb-4">Mandates & Non-Goals</h1>
                            <p className="text-slate-300">
                                RevampAI Agents are not standard chatbots. They are <strong>Bounded Systems</strong> constrained by strict mandates.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                {/* The Mandate */}
                                <div className="bg-slate-900 border border-slate-800 rounded p-4">
                                    <div className="flex items-center mb-3">
                                        <CircleCheck className="text-green-500 mr-2" size={18} />
                                        <h3 className="font-bold text-white">The Mandate</h3>
                                    </div>
                                    <p className="text-sm text-slate-400 mb-4">
                                        The single immutable objective. The Agent will sacrifice all other considerations to achieve this.
                                    </p>
                                    <div className="bg-slate-950 p-3 rounded border border-green-900/30">
                                        <span className="text-xs font-bold text-slate-500 uppercase block mb-1">Example</span>
                                        <p className="text-sm text-green-300 italic">"Design high-contrast, brutalist landing pages that force the user's eye to the Checkout button."</p>
                                    </div>
                                </div>

                                {/* Non-Goals */}
                                <div className="bg-slate-900 border border-slate-800 rounded p-4">
                                    <div className="flex items-center mb-3">
                                        <TriangleAlert className="text-red-500 mr-2" size={18} />
                                        <h3 className="font-bold text-white">Non-Goals</h3>
                                    </div>
                                    <p className="text-sm text-slate-400 mb-4">
                                        Explicit negative constraints. These prevent "AI Drift" and generic output.
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="text-xs text-red-300 bg-red-900/10 px-2 py-1 rounded border border-red-900/30">"Do NOT use serif fonts."</li>
                                        <li className="text-xs text-red-300 bg-red-900/10 px-2 py-1 rounded border border-red-900/30">"Do NOT apologize in text."</li>
                                        <li className="text-xs text-red-300 bg-red-900/10 px-2 py-1 rounded border border-red-900/30">"Do NOT create subtle gradients."</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                },
                {
                    id: 'matrix',
                    title: 'The Responsibility Matrix',
                    content: (
                        <div className="space-y-6">
                            <h1 className="text-3xl font-bold text-white mb-4">The Responsibility Matrix</h1>
                            <p className="text-slate-300">
                                The Matrix is the prioritized logic engine. It determines the order of operations for the Agent.
                            </p>

                            <div className="overflow-hidden rounded-lg border border-slate-800">
                                <table className="w-full text-left bg-slate-900">
                                    <thead className="bg-slate-950 border-b border-slate-800">
                                        <tr>
                                            <th className="p-3 text-xs font-bold text-slate-500 uppercase">Priority</th>
                                            <th className="p-3 text-xs font-bold text-slate-500 uppercase">Severity</th>
                                            <th className="p-3 text-xs font-bold text-slate-500 uppercase">Effect</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800 text-sm text-slate-300">
                                        <tr>
                                            <td className="p-3"><span className="text-red-500 font-bold">CRITICAL</span></td>
                                            <td className="p-3"><span className="bg-red-900/20 text-red-400 px-2 py-0.5 rounded text-xs">BLOCK</span></td>
                                            <td className="p-3">If this rule is violated, the generation fails immediately. Use for Safety/Brand.</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3"><span className="text-accent-500 font-bold">HIGH</span></td>
                                            <td className="p-3"><span className="bg-yellow-900/20 text-yellow-400 px-2 py-0.5 rounded text-xs">WARN</span></td>
                                            <td className="p-3">Agent attempts to fix. If it fails, it proceeds but flags the output.</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3"><span className="text-blue-500 font-bold">MEDIUM</span></td>
                                            <td className="p-3"><span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded text-xs">IGNORE</span></td>
                                            <td className="p-3">Stylistic preferences. Agent will try but drop if conflicting with higher rules.</td>
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
                        <div className="space-y-6">
                            <h1 className="text-3xl font-bold text-white mb-4">Telephony Setup</h1>
                            <p className="text-slate-300">
                                RevampAI integrates with <strong>VAPI.ai</strong> to enable real-time voice conversations.
                            </p>

                            <div className="bg-slate-900 border border-slate-800 rounded p-6">
                                <h3 className="font-bold text-white mb-4">Required Credentials</h3>
                                <ol className="list-decimal list-inside space-y-4 text-sm text-slate-300">
                                    <li className="pl-2">
                                        <strong>Private API Key:</strong> Found in VAPI Dashboard -&gt; API Keys.
                                    </li>
                                    <li className="pl-2">
                                        <strong>Public API Key:</strong> Found in VAPI Dashboard -&gt; API Keys.
                                    </li>
                                    <li className="pl-2">
                                        <strong>Phone Number ID:</strong> Found in VAPI Dashboard -&gt; Phone Numbers.
                                        <div className="mt-2 ml-6 text-xs text-slate-500">
                                            Note: You must purchase a phone number in VAPI ($2/mo) to make outbound calls.
                                        </div>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    )
                },
                {
                    id: 'vapi-protocol',
                    title: 'Dynamic Context Injection',
                    content: (
                        <div className="space-y-6">
                            <h1 className="text-3xl font-bold text-white mb-4">Context Injection</h1>
                            <p className="text-slate-300">
                                How does the AI know what to say? RevampAI injects a <strong>Prompt Packet</strong> into the call stream at the moment of connection.
                            </p>

                            <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                                <h4 className="text-xs font-bold text-slate-500 uppercase mb-4">The Packet Structure</h4>
                                <div className="font-mono text-xs text-green-400 bg-slate-950 p-4 rounded border border-slate-800 overflow-x-auto">
                                    {`{
  "systemPrompt": "
     IDENTITY: You are Alex, a Strategist at RevampAI.
     CONTEXT: You are calling {LeadName}.
     INTEL: The owner is {OwnerName}. Their website is {WebsiteStatus}.
     MISSION: Inform them we have already built a demo at {DemoUrl}.
     OBJECTION HANDLING:
     - If they say 'Not interested': Ask if they want the free link emailed.
     - If they say 'How much': Say 'The demo is free, the service is $750'.
  "
}`}
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
                        <div className="space-y-6">
                            <h1 className="text-3xl font-bold text-white mb-4">The Autonomous Pipeline</h1>
                            <p className="text-slate-300">
                                Activating <span className="text-purple-400 font-bold bg-purple-900/20 border border-purple-500/50 px-1 rounded text-xs">FULL AUTO</span> enables the sequential chaining of agents.
                            </p>

                            <div className="relative pl-8 space-y-8 mt-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                                <div className="relative">
                                    <div className="absolute -left-8 top-1 w-6 h-6 bg-slate-800 rounded-full border-2 border-slate-600 flex items-center justify-center text-[10px] font-bold">1</div>
                                    <h3 className="font-bold text-white">Ingestion (Scout)</h3>
                                    <p className="text-sm text-slate-400">Lead is identified via Google Maps. Basic metadata (Phone, Address) is captured.</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-8 top-1 w-6 h-6 bg-blue-900 rounded-full border-2 border-blue-500 flex items-center justify-center text-[10px] font-bold">2</div>
                                    <h3 className="font-bold text-blue-400">Enrichment (Analyst)</h3>
                                    <p className="text-sm text-slate-400">System searches specifically for "Owner Name" and analyzes the business's reviews to build the "Psychology Profile".</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-8 top-1 w-6 h-6 bg-yellow-900 rounded-full border-2 border-yellow-500 flex items-center justify-center text-[10px] font-bold">3</div>
                                    <h3 className="font-bold text-yellow-400">Strategy (Strategist)</h3>
                                    <p className="text-sm text-slate-400">A Product Requirement Doc (PRD) is written, outlining exactly how to beat the local competitors identified in step 2.</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-8 top-1 w-6 h-6 bg-green-900 rounded-full border-2 border-green-500 flex items-center justify-center text-[10px] font-bold">4</div>
                                    <h3 className="font-bold text-green-400">Execution (Builder & Closer)</h3>
                                    <p className="text-sm text-slate-400">
                                        1. Multi-page website is coded based on the PRD.<br />
                                        2. Cold email is drafted.<br />
                                        3. Lead status moves to <strong>OUTREACH_READY</strong>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                },
                {
                    id: 'web-builder',
                    title: 'Generative Web Builder',
                    content: (
                        <div className="space-y-6">
                            <h1 className="text-3xl font-bold text-white mb-4">The Generative Builder</h1>
                            <p className="text-slate-300">
                                Unlike other tools that generate images of websites, RevampAI generates <strong>actual code</strong>.
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-900 border border-slate-800 p-4 rounded">
                                    <h4 className="font-bold text-white text-sm mb-2 flex items-center"><Code size={14} className="mr-2 text-blue-500" /> Tech Stack</h4>
                                    <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
                                        <li>HTML5 Semantic Structure</li>
                                        <li>Tailwind CSS (CDN)</li>
                                        <li>FontAwesome Icons</li>
                                        <li>Google Fonts</li>
                                    </ul>
                                </div>
                                <div className="bg-slate-900 border border-slate-800 p-4 rounded">
                                    <h4 className="font-bold text-white text-sm mb-2 flex items-center"><Terminal size={14} className="mr-2 text-accent-500" /> Pinpoint Editor</h4>
                                    <p className="text-xs text-slate-400">
                                        The "AI Pinpoint Editor" in the preview tab allows you to target specific DOM nodes for rewriting without regenerating the entire page structure.
                                    </p>
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
                        <div className="space-y-6">
                            <h1 className="text-3xl font-bold text-white mb-4">API Consumption</h1>
                            <div className="bg-yellow-900/20 border border-yellow-700/50 p-4 rounded flex items-start">
                                <TriangleAlert className="text-yellow-500 mr-3 flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-yellow-500 text-sm">Enterprise Warning</h4>
                                    <p className="text-xs text-yellow-200 mt-1">
                                        "Full Auto" mode can consume significant tokens. Monitor your Google Cloud Console.
                                    </p>
                                </div>
                            </div>

                            <table className="w-full text-left border-collapse mt-4">
                                <thead className="border-b border-slate-800 bg-slate-900">
                                    <tr>
                                        <th className="p-3 text-xs font-bold text-slate-500 uppercase">Action</th>
                                        <th className="p-3 text-xs font-bold text-slate-500 uppercase">Est. Cost</th>
                                        <th className="p-3 text-xs font-bold text-slate-500 uppercase">Model Used</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm text-slate-300 divide-y divide-slate-800">
                                    <tr>
                                        <td className="p-3">Scouting (Batch of 5)</td>
                                        <td className="p-3">~$0.02</td>
                                        <td className="p-3">Gemini 2.5 Flash</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3">Deep Analysis (Dossier)</td>
                                        <td className="p-3">~$0.05</td>
                                        <td className="p-3">Gemini 3.0 Flash</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3">Web Build (Multi-Page)</td>
                                        <td className="p-3">~$0.15</td>
                                        <td className="p-3">Gemini 3.0 Pro</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3">Voice Call (1 Min)</td>
                                        <td className="p-3">~$0.12</td>
                                        <td className="p-3">VAPI + GPT-3.5</td>
                                    </tr>
                                </tbody>
                            </table>
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
        <div className="flex h-full bg-slate-950 text-slate-200 font-sans">
            {/* Sidebar Navigation */}
            <div className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col shadow-2xl z-10">
                <div className="p-6 border-b border-slate-800 bg-slate-900">
                    <h2 className="text-xl font-bold text-white flex items-center mb-4 tracking-tight">
                        <Book className="mr-2 text-accent-500" size={24} /> Knowledge Base
                    </h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 text-slate-500" size={14} />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:border-accent-500 focus:outline-none transition-all focus:ring-1 focus:ring-accent-500"
                            placeholder="Search documentation..."
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto py-4 px-2 space-y-6 custom-scrollbar">
                    {filteredSections.map(section => (
                        <div key={section.id} className="animate-in fade-in slide-in-from-left-2 duration-300">
                            <div className="px-4 mb-2 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest flex items-center">
                                {section.icon} <span className="ml-2">{section.title}</span>
                            </div>
                            <ul className="space-y-0.5">
                                {section.articles.map(article => (
                                    <li key={article.id}>
                                        <button
                                            onClick={() => { setActiveSectionId(section.id); setActiveArticleId(article.id); }}
                                            className={`w-full text-left px-4 py-2.5 text-sm rounded-md flex items-center justify-between transition-all duration-200 group ${activeArticleId === article.id
                                                ? 'bg-accent-500/10 text-white font-medium border-l-2 border-accent-500'
                                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                                                }`}
                                        >
                                            <span className="truncate">{article.title}</span>
                                            {activeArticleId === article.id && <ChevronRight size={14} className="text-accent-500" />}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="p-4 border-t border-slate-800 text-[10px] text-slate-600 text-center bg-slate-900">
                    <p>RevampAI Enterprise v3.0</p>
                    <p>Secure Documentation Protocol</p>
                </div>
            </div>

            {/* Reading Pane */}
            <div className="flex-1 overflow-y-auto bg-slate-950 relative">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

                <div className="max-w-5xl mx-auto p-12 relative z-0">
                    {activeArticle ? (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Breadcrumbs */}
                            <div className="mb-8 flex items-center text-xs text-accent-500 font-bold uppercase tracking-widest bg-accent-500/5 inline-flex px-3 py-1 rounded-full border border-accent-500/20">
                                {activeSection?.title} <ChevronRight size={12} className="mx-2 opacity-50" /> {activeArticle.title}
                            </div>

                            <div className="prose prose-invert prose-slate max-w-none">
                                {activeArticle.content}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-[70vh] text-slate-600">
                            <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-6 shadow-xl border border-slate-800">
                                <Book size={32} className="opacity-20" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-500 mb-2">Welcome to RevampAI Docs</h2>
                            <p className="max-w-md text-center text-slate-600">Select a topic from the sidebar to access detailed schematics, workflow guides, and API documentation.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DocsView;
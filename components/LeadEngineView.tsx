
import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Crosshair, Target, Brain, Code, Send, CheckCircle2, 
  Loader2, Users, FileText, Mail, MapPin, 
  Plus, Play, Zap, Settings2, Radar, Bot, Layers, BarChart2, Maximize2, Minimize2
} from 'lucide-react';
import LeadCard from './LeadCard';
import WebsiteBuilderView from './WebsiteBuilderView';
import { Lead, LeadStatus, Settings, EngineSession, AgentProfile } from '../types';
import * as GeminiService from '../services/geminiService';

interface LeadEngineViewProps {
  settings: Settings;
  sessions: EngineSession[];
  currentSessionId: string;
  onSwitchSession: (id: string) => void;
  onCreateSession: (name: string) => void;
  onDeleteSession: (id: string) => void;
  leads: Lead[];
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
  agents: AgentProfile[];
}

const LeadEngineView: React.FC<LeadEngineViewProps> = ({ 
  settings, sessions, currentSessionId, onSwitchSession, onCreateSession, onDeleteSession, leads, setLeads, agents 
}) => {
  
  const [ingestMode, setIngestMode] = useState<'auto' | 'enrich' | 'manual'>('auto');
  const [niche, setNiche] = useState(settings.niche);
  const [location, setLocation] = useState(settings.location);
  const [batchSize, setBatchSize] = useState(settings.scrapingBatchSize);
  const [autoPipeline, setAutoPipeline] = useState(false); 
  const [scanMode, setScanMode] = useState<'niche' | 'zone'>('niche');
  const [csvInput, setCsvInput] = useState('');
  const [manualQuery, setManualQuery] = useState('');
  
  // Agent Selection
  const [selectedAgentId, setSelectedAgentId] = useState<string>(agents[0]?.id || '');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [activeTab, setActiveTab] = useState('preview');
  const [outreachSent, setOutreachSent] = useState(false);

  const selectedLead = leads.find(l => l.id === selectedLeadId);
  const activeAgent = agents.find(a => a.id === selectedAgentId);

  const runFullPipelineOnLead = async (lead: Lead) => {
      setSelectedLeadId(lead.id);
      setActiveTab('dossier');
      let currentLeadState = { ...lead };

      try {
          // 1. INTEL & SCORING
          setLoadingStep(`[AUTO] Analyzing & Scoring ${currentLeadState.name}...`);
          const dossier = await GeminiService.generateDossier(settings.apiKey, currentLeadState);
          const scoreData = await GeminiService.scoreLead(settings.apiKey, currentLeadState);
          
          const effectiveNiche = scanMode === 'zone' ? (lead.type || "Local Business") : niche;
          const competitors = await GeminiService.analyzeCompetitors(settings.apiKey, effectiveNiche, location);
          
          currentLeadState = { 
              ...currentLeadState, 
              ...dossier, 
              propensityScore: scoreData.score,
              psychologyProfile: scoreData.psychology,
              competitors, 
              status: LeadStatus.DOSSIER_READY 
          };
          setLeads(prev => prev.map(l => l.id === currentLeadState.id ? currentLeadState : l));
          
          // 2. STRATEGY (Using Agent)
          setLoadingStep(`[AUTO] ${activeAgent?.name || 'Agent'} is Strategizing...`);
          setActiveTab('strategy');
          const prd = await GeminiService.createPRD(settings.apiKey, currentLeadState, competitors, activeAgent);
          
          currentLeadState = { ...currentLeadState, prd, status: LeadStatus.STRATEGY_READY };
          setLeads(prev => prev.map(l => l.id === currentLeadState.id ? currentLeadState : l));

          // 3. BUILD (Multi-Page)
          setLoadingStep(`[AUTO] ${activeAgent?.name || 'Agent'} is Coding Site...`);
          setActiveTab('preview');
          const pages = await GeminiService.generateWebsiteCode(settings.apiKey, currentLeadState, prd, activeAgent);
          const outreach = await GeminiService.generateOutreach(settings.apiKey, currentLeadState, activeAgent);

          currentLeadState = {
              ...currentLeadState,
              siteStructure: pages,
              generatedSiteCode: pages['index.html'], // Fallback for old views
              outreachEmailSubject: outreach.emailSubject,
              outreachEmailBody: outreach.emailBody,
              outreachSmsBody: outreach.smsBody,
              status: LeadStatus.OUTREACH_READY,
              dealValue: 750
          };

          setLeads(prev => prev.map(l => l.id === currentLeadState.id ? currentLeadState : l));
          await new Promise(r => setTimeout(r, 1000));

      } catch (e) { console.error(e); }
  };

  const handleAutoScout = async () => {
    if (!settings.apiKey) return alert("Configure API Key first.");
    setLoading(true);
    setLoadingStep(scanMode === 'zone' ? `Scanning Zone ${location}...` : `Scouting ${niche} in ${location}...`);
    
    try {
      const found = await GeminiService.scoutLeads(settings.apiKey, niche, location, batchSize, scanMode);
      const newLeads = found as Lead[];
      setLeads(prev => [...prev, ...newLeads]); 
      
      if(newLeads.length > 0) {
          setSelectedLeadId(newLeads[0].id);
          if (autoPipeline) {
              setLoadingStep("Initializing Auto-Pipeline...");
              for (const lead of newLeads) { await runFullPipelineOnLead(lead); }
          }
      }
    } catch (e) { alert("Failed to scout."); } finally { setLoading(false); setLoadingStep(''); }
  };

  const handleDeepDive = async () => {
    if (!selectedLead || !settings.apiKey) return;
    setLoading(true);
    try {
        setLoadingStep("Scoring Lead & Analyzing Owner Psychology...");
        const dossierData = await GeminiService.generateDossier(settings.apiKey, selectedLead);
        const scoreData = await GeminiService.scoreLead(settings.apiKey, selectedLead);
        const competitors = await GeminiService.analyzeCompetitors(settings.apiKey, niche, location);
        
        const updatedLead: Lead = {
            ...selectedLead, ...dossierData, competitors,
            propensityScore: scoreData.score,
            psychologyProfile: scoreData.psychology,
            status: LeadStatus.DOSSIER_READY
        };
        setLeads(prev => prev.map(l => l.id === updatedLead.id ? updatedLead : l));
    } catch(e) { console.error(e); } finally { setLoading(false); }
  };

  const handleGenerateStrategy = async () => {
    if (!selectedLead || !settings.apiKey) return;
    setLoading(true);
    try {
        const prd = await GeminiService.createPRD(settings.apiKey, selectedLead, selectedLead.competitors || [], activeAgent);
        const updatedLead = { ...selectedLead, prd, status: LeadStatus.STRATEGY_READY };
        setLeads(prev => prev.map(l => l.id === updatedLead.id ? updatedLead : l));
        setActiveTab('strategy');
    } catch(e) { console.error(e); } finally { setLoading(false); }
  };

  const handleBuildSite = async () => {
     if (!selectedLead || !settings.apiKey || !selectedLead.prd) return;
     setLoading(true);
     setLoadingStep(`Agent ${activeAgent?.name} is Building Multi-Page Site...`);
     try {
         const pages = await GeminiService.generateWebsiteCode(settings.apiKey, selectedLead, selectedLead.prd, activeAgent);
         const outreach = await GeminiService.generateOutreach(settings.apiKey, selectedLead, activeAgent);
         
         const updatedLead = {
             ...selectedLead,
             siteStructure: pages,
             generatedSiteCode: pages['index.html'],
             outreachEmailSubject: outreach.emailSubject,
             outreachEmailBody: outreach.emailBody,
             outreachSmsBody: outreach.smsBody,
             status: LeadStatus.OUTREACH_READY,
             dealValue: 750
         };
         setLeads(prev => prev.map(l => l.id === updatedLead.id ? updatedLead : l));
         setActiveTab('preview');
     } catch(e) { console.error(e); } finally { setLoading(false); }
  };

  const handleSendOutreach = () => { setOutreachSent(true); alert("Sent!"); };

  return (
    <div className="flex h-full overflow-hidden relative">
      {/* Resizable Sidebar */}
      <div className={`transition-all duration-300 border-r border-slate-800 bg-slate-900/50 flex flex-col ${isSidebarCollapsed ? 'w-12' : 'w-96'}`}>
         
         {/* Sidebar Header */}
         <div className="p-3 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
            {!isSidebarCollapsed && (
                 <div className="flex items-center space-x-2">
                     <span className="text-xs font-bold text-slate-500 uppercase">Session:</span>
                     <select 
                        value={currentSessionId}
                        onChange={(e) => onSwitchSession(e.target.value)}
                        className="bg-transparent text-white text-xs font-bold focus:outline-none"
                     >
                        {sessions.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                     </select>
                 </div>
            )}
            <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="text-slate-500 hover:text-white">
                {isSidebarCollapsed ? <Maximize2 size={14}/> : <Minimize2 size={14}/>}
            </button>
         </div>

         {!isSidebarCollapsed && (
             <div className="p-4 space-y-4 border-b border-slate-800 bg-slate-900/30">
                 {/* Compact Controls */}
                 <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="text-[10px] text-slate-500 uppercase font-bold">Target Location</label>
                        <div className="flex items-center bg-slate-950 border border-slate-800 rounded mt-1">
                            <MapPin size={12} className="ml-2 text-slate-500"/>
                            <input 
                                value={location} 
                                onChange={e=>setLocation(e.target.value)} 
                                className="w-full bg-transparent p-2 text-xs text-white focus:outline-none" 
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-[10px] text-slate-500 uppercase font-bold">Industry / Niche</label>
                        <div className="flex items-center bg-slate-950 border border-slate-800 rounded mt-1">
                            <Target size={12} className="ml-2 text-slate-500"/>
                            <input 
                                value={niche} 
                                onChange={e=>setNiche(e.target.value)} 
                                className="w-full bg-transparent p-2 text-xs text-white focus:outline-none" 
                            />
                        </div>
                    </div>
                 </div>

                 <div className="flex space-x-2">
                     <button onClick={() => setAutoPipeline(!autoPipeline)} className={`flex-1 border rounded text-[10px] font-bold py-2 ${autoPipeline ? 'border-purple-500 text-purple-400 bg-purple-500/10' : 'border-slate-700 text-slate-500'}`}>
                        {autoPipeline ? 'FULL AUTO PIPE' : 'SCOUT ONLY'}
                     </button>
                     <button onClick={handleAutoScout} className="flex-1 bg-primary-600 hover:bg-primary-500 text-white rounded font-bold text-xs py-2 shadow-lg shadow-primary-600/20">
                         {loading ? <Loader2 className="animate-spin mx-auto"/> : 'IGNITE ENGINE'}
                     </button>
                 </div>
             </div>
         )}

         <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {!isSidebarCollapsed ? leads.map(lead => (
                <LeadCard key={lead.id} lead={lead} isSelected={selectedLeadId === lead.id} onClick={() => setSelectedLeadId(lead.id)} />
            )) : (
                <div className="flex flex-col items-center space-y-4 pt-4">
                    {leads.map(lead => (
                        <div 
                            key={lead.id} 
                            onClick={() => setSelectedLeadId(lead.id)}
                            className={`w-3 h-3 rounded-full cursor-pointer ${selectedLeadId === lead.id ? 'bg-accent-500 ring-2 ring-accent-500/50' : 'bg-slate-700 hover:bg-slate-500'}`}
                        />
                    ))}
                </div>
            )}
         </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col bg-slate-950 relative">
        {loading && (
             <div className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center">
                 <Loader2 className="w-12 h-12 text-accent-500 animate-spin mb-4" />
                 <h3 className="text-xl font-medium text-white">{loadingStep}</h3>
             </div>
        )}

        {selectedLead ? (
            <>
                {/* Header Actions */}
                <div className="h-12 border-b border-slate-800 flex items-center justify-between px-4 bg-slate-900">
                    <div className="flex items-center">
                        <h2 className="text-sm font-bold text-white mr-4">{selectedLead.name}</h2>
                        {/* Tabs */}
                        <div className="flex space-x-1 bg-slate-800 p-0.5 rounded">
                            {['dossier', 'strategy', 'preview', 'outreach'].map(tab => (
                                <button 
                                    key={tab} 
                                    onClick={() => setActiveTab(tab)} 
                                    className={`px-3 py-1 text-[10px] font-bold rounded uppercase transition-colors ${activeTab === tab ? 'bg-slate-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        {selectedLead.status === LeadStatus.SCOUTED && (
                            <button onClick={handleDeepDive} className="text-white hover:text-accent-500"><BarChart2 size={16}/></button>
                        )}
                        {selectedLead.status === LeadStatus.DOSSIER_READY && (
                            <button onClick={handleGenerateStrategy} className="text-white hover:text-accent-500"><Brain size={16}/></button>
                        )}
                        {selectedLead.status === LeadStatus.STRATEGY_READY && (
                            <button onClick={handleBuildSite} className="text-white hover:text-accent-500"><Code size={16}/></button>
                        )}
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-hidden relative">
                    {activeTab === 'dossier' && (
                        <div className="p-8 overflow-y-auto h-full">
                            <div className="max-w-4xl mx-auto grid grid-cols-2 gap-6">
                                <div className="bg-slate-900 border border-slate-800 rounded p-6">
                                    <h3 className="font-bold text-white mb-4 text-lg">Owner Intelligence</h3>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-slate-950 border border-slate-800 rounded">
                                            <div className="text-xs text-slate-500 uppercase font-bold mb-2">Psychology Profile</div>
                                            <div className="text-sm text-slate-300 italic leading-relaxed">
                                                "{selectedLead.psychologyProfile || 'Analysis pending...'}"
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-900 border border-slate-800 rounded p-6">
                                    <h3 className="font-bold text-white mb-4 text-lg">Market Threat</h3>
                                    {selectedLead.competitors?.map((c,i)=>(
                                        <div key={i} className="mb-3 p-3 border-l-2 border-red-500 bg-slate-950/50">
                                            <div className="text-sm font-bold text-white">{c.name}</div>
                                            <div className="text-xs text-slate-500">{c.whyWinning}</div>
                                        </div>
                                    ))}
                                    {!selectedLead.competitors && <div className="text-slate-600 text-sm">No competitor data.</div>}
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {activeTab === 'strategy' && (
                        <div className="p-8 overflow-y-auto h-full">
                            <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 p-8 rounded text-sm text-slate-300 whitespace-pre-wrap font-sans shadow-2xl">
                                {selectedLead.prd || "Strategy required."}
                            </div>
                        </div>
                    )}

                    {activeTab === 'preview' && (
                        <div className="absolute inset-0">
                            {selectedLead.siteStructure ? (
                                <WebsiteBuilderView 
                                    initialHtmlStructure={selectedLead.siteStructure} 
                                    apiKey={settings.apiKey}
                                    agents={agents}
                                />
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-slate-600">
                                    <Code size={48} className="mb-4 opacity-20"/>
                                    <p>No site asset generated yet.</p>
                                    <button onClick={handleBuildSite} className="mt-4 text-accent-500 hover:underline">Generate Asset Now</button>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'outreach' && (
                        <div className="p-8 overflow-y-auto h-full">
                            <div className="max-w-4xl mx-auto grid grid-cols-2 gap-6">
                                <div className="bg-slate-900 border border-slate-800 p-6 rounded">
                                    <div className="text-xs text-slate-500 uppercase mb-2 font-bold">Email Draft</div>
                                    <div className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">{selectedLead.outreachEmailBody}</div>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <button onClick={handleSendOutreach} className="w-full h-16 bg-green-600 hover:bg-green-500 text-white font-bold rounded text-lg shadow-lg mb-4">
                                        Deploy Campaign
                                    </button>
                                    <p className="text-xs text-slate-500 text-center">Will trigger SendGrid & Twilio Gateway</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </>
        ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-600">
                <Target size={64} className="mb-4 opacity-20" />
                <p className="text-lg font-medium">Engine Idle</p>
                <p className="text-sm mt-2">Select a target or press <span className="text-white font-mono bg-slate-800 px-1 rounded">Ctrl+K</span> to quick scout.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default LeadEngineView;

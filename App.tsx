
import React, { useState, useEffect, useMemo } from 'react';
import { LayoutDashboard, Briefcase, KanbanSquare, Inbox, Brain, Settings, Database, Bot, Phone, Book, Search, FileText } from 'lucide-react';
import { Lead, LeadStatus, Message, Settings as SettingsType, EngineSession, AgentProfile, VaultDocument } from './types';
import LeadEngineView from './components/LeadEngineView';
import DashboardView from './components/DashboardView';
import PipelineView from './components/PipelineView';
import InboxView from './components/InboxView';
import CRMView from './components/CRMView';
import SettingsView from './components/SettingsView';
import AgentStudioView from './components/AgentStudioView';
import PhoneView from './components/PhoneView';
import DocsView from './components/DocsView';
import VaultView from './components/VaultView';
import CommandPalette from './components/CommandPalette';
import * as GeminiService from './services/geminiService';

type View = 'dashboard' | 'engine' | 'agents' | 'crm' | 'pipeline' | 'inbox' | 'phone' | 'vault' | 'docs' | 'settings';

const DEFAULT_SETTINGS: SettingsType = {
    apiKey: process.env.API_KEY || '',
    scrapingBatchSize: 5,
    niche: 'Plumbers',
    location: 'Austin, TX',
    outreach: { sendGridApiKey: '', twilioAccountSid: '', twilioAuthToken: '', twilioFromNumber: '', senderEmail: '' },
    vapi: { privateApiKey: '', publicApiKey: '', phoneNumberId: '' }
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('engine');
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  
  const [settings, setSettings] = useState<SettingsType>(() => {
      const saved = localStorage.getItem('revamp_settings');
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [sessions, setSessions] = useState<EngineSession[]>(() => {
      const saved = localStorage.getItem('revamp_sessions');
      return saved ? JSON.parse(saved) : [{ id: 'default', name: 'General Session', createdAt: new Date().toISOString(), leads: [] }];
  });

  const [agents, setAgents] = useState<AgentProfile[]>(() => {
      const saved = localStorage.getItem('revamp_agents');
      return saved ? JSON.parse(saved) : [];
  });
  
  const [vaultDocs, setVaultDocs] = useState<VaultDocument[]>(() => {
      const saved = localStorage.getItem('revamp_vault');
      return saved ? JSON.parse(saved) : [];
  });

  const [currentSessionId, setCurrentSessionId] = useState<string>(sessions[0].id);

  useEffect(() => { localStorage.setItem('revamp_settings', JSON.stringify(settings)); }, [settings]);
  useEffect(() => { localStorage.setItem('revamp_sessions', JSON.stringify(sessions)); }, [sessions]);
  useEffect(() => { localStorage.setItem('revamp_agents', JSON.stringify(agents)); }, [agents]);
  useEffect(() => { localStorage.setItem('revamp_vault', JSON.stringify(vaultDocs)); }, [vaultDocs]);

  // Global Hotkey for Command Palette
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCommandOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const allLeads = useMemo(() => sessions.flatMap(s => s.leads), [sessions]);

  // Command Palette Handler
  const handleCommand = async (type: 'scout' | 'research' | 'nav', payload: any) => {
      if (type === 'nav') {
          setCurrentView(payload);
      } else if (type === 'scout') {
          setCurrentView('engine');
          if (!settings.apiKey) { alert('API Key Required'); return; }
          try {
            const newLeads = await GeminiService.scoutLeads(settings.apiKey, payload.niche, payload.location, payload.limit, 'niche');
            // Add to current session
            const validLeads = newLeads as Lead[];
            setSessions(prev => prev.map(s => s.id === currentSessionId ? { ...s, leads: [...s.leads, ...validLeads] } : s));
          } catch(e) { console.error(e); alert('Scout Failed'); }
      } else if (type === 'research') {
          if (!settings.apiKey) { alert('API Key Required'); return; }
          const result = await GeminiService.conductResearch(settings.apiKey, payload.topic);
          const newDoc: VaultDocument = {
              id: crypto.randomUUID(),
              title: result.title,
              type: 'research',
              content: result.content,
              tags: ['ai-research'],
              createdAt: new Date().toISOString()
          };
          setVaultDocs(prev => [newDoc, ...prev]);
          setCurrentView('vault');
      }
  };

  // Helper State handlers
  const handleCreateSession = (name: string) => {
      const newSession = { id: crypto.randomUUID(), name, createdAt: new Date().toISOString(), leads: [] };
      setSessions(prev => [...prev, newSession]);
      setCurrentSessionId(newSession.id);
  };
  const handleDeleteSession = (id: string) => {
      if (sessions.length <= 1) return;
      const newSessions = sessions.filter(s => s.id !== id);
      setSessions(newSessions);
      if (currentSessionId === id) setCurrentSessionId(newSessions[0].id);
  };
  const handleUpdateLead = (updatedLead: Lead) => {
      setSessions(prev => prev.map(s => ({ ...s, leads: s.leads.map(l => l.id === updatedLead.id ? updatedLead : l) })));
  };
  const handleMoveLead = (leadId: string, newStatus: LeadStatus) => {
      setSessions(prev => prev.map(s => ({ ...s, leads: s.leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l) })));
  };
  const handleSendMessage = (leadId: string, content: string) => {
      setSessions(prev => prev.map(s => ({
          ...s,
          leads: s.leads.map(l => l.id === leadId ? { ...l, status: LeadStatus.CONTACTED, messages: [...(l.messages||[]), {id:crypto.randomUUID(), sender:'user', content, timestamp:'Now', isRead:true}] } : l)
      })));
  };

  const currentSession = sessions.find(s => s.id === currentSessionId) || sessions[0];

  return (
    <div className="h-screen w-screen bg-slate-950 flex overflow-hidden text-slate-200 font-sans">
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} onCommand={handleCommand} />
      
      {/* Sidebar Navigation */}
      <div className="w-16 hover:w-56 transition-all duration-300 bg-slate-900 border-r border-slate-800 flex flex-col py-6 z-20 group">
        <div className="mb-8 px-4 flex items-center overflow-hidden">
            <Brain className="text-accent-500 min-w-[24px]" size={24} />
            <span className="ml-3 font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">RevampAI</span>
        </div>
        
        <nav className="flex-1 space-y-1 w-full px-2">
            <NavGroup title="Command Center" />
            <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} />
            
            <NavGroup title="Engine" />
            <NavItem icon={<Briefcase size={20} />} label="Lead Engine" active={currentView === 'engine'} onClick={() => setCurrentView('engine')} />
            <NavItem icon={<Bot size={20} />} label="Agents" active={currentView === 'agents'} onClick={() => setCurrentView('agents')} />
            
            <NavGroup title="CRM" />
            <NavItem icon={<Database size={20} />} label="Database" active={currentView === 'crm'} onClick={() => setCurrentView('crm')} />
            <NavItem icon={<KanbanSquare size={20} />} label="Pipeline" active={currentView === 'pipeline'} onClick={() => setCurrentView('pipeline')} />
            
            <NavGroup title="Inbox" />
            <NavItem icon={<Inbox size={20} />} label="Messages" active={currentView === 'inbox'} onClick={() => setCurrentView('inbox')} badge={allLeads.filter(l => l.status === LeadStatus.REPLIED).length} />
            <NavItem icon={<Phone size={20} />} label="Voice" active={currentView === 'phone'} onClick={() => setCurrentView('phone')} />
            
            <NavGroup title="Knowledge" />
            <NavItem icon={<FileText size={20} />} label="Vault" active={currentView === 'vault'} onClick={() => setCurrentView('vault')} />
            <NavItem icon={<Book size={20} />} label="Docs" active={currentView === 'docs'} onClick={() => setCurrentView('docs')} />
        </nav>
        
        <div className="mt-auto px-2">
             <NavItem icon={<Settings size={20} />} label="Settings" active={currentView === 'settings'} onClick={() => setCurrentView('settings')} />
        </div>
      </div>

      <div className="flex-1 flex flex-col relative overflow-hidden">
         {currentView === 'dashboard' && <DashboardView leads={allLeads} />}
         {currentView === 'engine' && (
             <LeadEngineView 
                settings={settings} sessions={sessions} currentSessionId={currentSessionId}
                onSwitchSession={setCurrentSessionId} onCreateSession={handleCreateSession} onDeleteSession={handleDeleteSession}
                leads={currentSession.leads} 
                setLeads={(update) => setSessions(prev => prev.map(s => s.id === currentSessionId ? { ...s, leads: typeof update === 'function' ? update(s.leads) : update } : s))}
                agents={agents}
             />
         )}
         {currentView === 'agents' && <AgentStudioView agents={agents} setAgents={setAgents} />}
         {currentView === 'crm' && <CRMView leads={allLeads} />}
         {currentView === 'pipeline' && <PipelineView leads={allLeads} onMoveLead={handleMoveLead} />}
         {currentView === 'inbox' && <InboxView leads={allLeads} onSendMessage={handleSendMessage} />}
         {currentView === 'phone' && <PhoneView leads={allLeads} agents={agents} vapiConfig={settings.vapi} updateLead={handleUpdateLead} />}
         {currentView === 'vault' && <VaultView documents={vaultDocs} setDocuments={setVaultDocs} />}
         {currentView === 'docs' && <DocsView />}
         {currentView === 'settings' && <SettingsView settings={settings} onUpdate={setSettings} />}
      </div>
    </div>
  );
};

const NavGroup: React.FC<{title: string}> = ({ title }) => (
    <div className="px-3 pt-4 pb-1">
        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">{title}</span>
    </div>
);

const NavItem: React.FC<{ icon: React.ReactNode, label: string, active: boolean, onClick: () => void, badge?: number }> = ({ icon, label, active, onClick, badge }) => (
    <button onClick={onClick} className={`w-full flex items-center px-3 py-2 rounded-lg transition-all duration-200 relative group/item ${active ? 'bg-accent-500/10 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
        <div className={`min-w-[24px] flex items-center justify-center ${active ? 'text-accent-500' : ''}`}>{icon}</div>
        <span className="ml-3 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">{label}</span>
        {active && <div className="absolute left-0 top-2 bottom-2 w-1 bg-accent-500 rounded-r-full"></div>}
        {badge && badge > 0 ? (
            <div className="absolute right-2 top-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white group-hover:opacity-100 opacity-0 transition-opacity">{badge}</div>
        ) : null}
    </button>
);

export default App;

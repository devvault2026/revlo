
import React, { useState, useEffect, useMemo } from 'react';
import { Lead, LeadStatus, Settings as SettingsType, EngineSession, AgentProfile, VaultDocument } from '../features/revlo-os/types';
import LeadEngineView from '../features/revlo-os/components/LeadEngineView';
import DashboardView from '../features/revlo-os/components/DashboardView';
import PipelineView from '../features/revlo-os/components/PipelineView';
import InboxView from '../features/revlo-os/components/InboxView';
import CRMView from '../features/revlo-os/components/CRMView';
import SettingsView from '../features/revlo-os/components/SettingsView';
import AgentStudioView from '../features/revlo-os/components/AgentStudioView';
import PhoneView from '../features/revlo-os/components/PhoneView';
import DocsView from '../features/revlo-os/components/DocsView';
import VaultView from '../features/revlo-os/components/VaultView';
import CommandPalette from '../features/revlo-os/components/CommandPalette';
import * as GeminiService from '../features/revlo-os/services/geminiService';
import RevloOSLayout, { View } from '../features/revlo-os/RevloOSLayout';

const DEFAULT_SETTINGS: SettingsType = {
    apiKey: '', // NOTE: process.env is not directly accessible in browser the same way, but let's leave it empty for now or rely on user settings
    scrapingBatchSize: 5,
    niche: 'Plumbers',
    location: 'Austin, TX',
    outreach: { sendGridApiKey: '', twilioAccountSid: '', twilioAuthToken: '', twilioFromNumber: '', senderEmail: '' },
    vapi: { privateApiKey: '', publicApiKey: '', phoneNumberId: '' }
};

const RevloOSAppPage: React.FC = () => {
    const [currentView, setCurrentView] = useState<View>('engine'); // Default to Engine if desired, or 'dashboard'
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
            } catch (e) { console.error(e); alert('Scout Failed'); }
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
            leads: s.leads.map(l => l.id === leadId ? { ...l, status: LeadStatus.CONTACTED, messages: [...(l.messages || []), { id: crypto.randomUUID(), sender: 'user', content, timestamp: 'Now', isRead: true }] } : l)
        })));
    };

    const currentSession = sessions.find(s => s.id === currentSessionId) || sessions[0];

    return (
        <div className="bg-slate-50 min-h-screen">
            <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} onCommand={handleCommand} />

            <RevloOSLayout currentView={currentView} setCurrentView={setCurrentView}>
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
            </RevloOSLayout>
        </div>
    );
};

export default RevloOSAppPage;

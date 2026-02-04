
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Lead, LeadStatus, Settings as SettingsType, EngineSession, AgentProfile, VaultDocument, SystemUsage } from '../features/revlo-os/types';
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
import * as EmailService from '../features/revlo-os/services/emailService';
import RevloOSLayout, { View } from '../features/revlo-os/RevloOSLayout';
import {
    supabase, upsertLead, getLeads, getVaultDocuments, upsertVaultDocument, deleteVaultDocument,
    getAgents, getSettings, upsertAgent, deleteAgent, upsertSettings
} from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { useToast } from '../features/revlo-os/context/ToastContext';

const DEFAULT_SETTINGS: SettingsType = {
    apiKey: '',
    scrapingBatchSize: 5,
    niche: 'Plumbers',
    location: 'Austin, TX',
    outreach: { sendGridApiKey: '', twilioAccountSid: '', twilioAuthToken: '', twilioFromNumber: '', senderEmail: '' },
    vapi: { privateApiKey: '', publicApiKey: '', phoneNumberId: '' }
};

const RevloOSAppPageContent: React.FC = () => {
    const { user, profile, refreshProfile } = useAuth();
    const { notifications, unreadCount } = useNotifications();
    const { showToast } = useToast();
    const [currentView, setCurrentView] = useState<View>('dashboard');

    // Remote State (Supabase)
    const [remoteLeads, setRemoteLeads] = useState<Lead[]>([]);
    const [sessions, setSessions] = useState<EngineSession[]>([
        { id: 'default', name: 'Main Pipeline', createdAt: new Date().toISOString(), leads: [] }
    ]);
    const [currentSessionId, setCurrentSessionId] = useState<string>('default');

    // Usage Tracking
    const [usage, setUsage] = useState<SystemUsage>({
        totalApiCalls: profile?.api_calls_made || 0,
        totalTokens: Number(profile?.tokens_consumed || 0),
        promptTokens: 0,
        completionTokens: 0,
        callsByModel: {}
    });

    // 1. Initial Data Load
    useEffect(() => {
        if (!user) return;

        const loadContent = async () => {
            try {
                // 1. Load Leads
                const leadData = await getLeads();
                const mappedLeads = (leadData || []).map(l => ({
                    ...l,
                    createdAt: l.created_at,
                    status: l.status as LeadStatus,
                    messages: (l.messages as any) || [],
                    competitors: (l.competitors as any) || []
                })) as unknown as Lead[];

                setRemoteLeads(mappedLeads);
                setSessions([{ id: 'default', name: 'Main Pipeline', createdAt: new Date().toISOString(), leads: mappedLeads }]);

                // 2. Load Agents
                let agentData = await getAgents(user.id);
                if (!agentData || agentData.length === 0) {
                    // Seed from defaults
                    const { DEFAULT_AGENTS } = await import('../features/revlo-os/components/AgentStudioView');
                    for (const defAgent of DEFAULT_AGENTS) {
                        // Map frontend camelCase to database snake_case
                        await upsertAgent({
                            id: defAgent.id,
                            name: defAgent.name,
                            role: defAgent.role,
                            version: defAgent.version,
                            mandate: defAgent.mandate,
                            responsibilities: defAgent.responsibilities,
                            output_contract: defAgent.outputContract,
                            behavior: defAgent.behavior,
                            capabilities: defAgent.capabilities,
                            chaining: defAgent.chaining,
                            memory_type: defAgent.memoryType,
                            stats: defAgent.stats,
                            user_id: user.id
                        });
                    }
                    agentData = await getAgents(user.id);
                }

                if (agentData && agentData.length > 0) {
                    setAgents(agentData.map(a => ({
                        id: a.id,
                        name: a.name,
                        role: a.role as any,
                        version: a.version || 1,
                        mandate: a.mandate as any,
                        responsibilities: a.responsibilities as any,
                        outputContract: a.output_contract as any,
                        behavior: a.behavior as any,
                        capabilities: a.capabilities as any,
                        chaining: a.chaining as any,
                        memoryType: a.memory_type as any,
                        stats: a.stats as any
                    })));
                }

                // 3. Load Settings
                const settingsData = await getSettings(user.id);
                if (settingsData) {
                    setSettings({
                        apiKey: settingsData.api_key || import.meta.env.VITE_GEMINI_API_KEY || '',
                        scrapingBatchSize: settingsData.scraping_batch_size || 5,
                        niche: settingsData.niche || 'Plumbers',
                        location: settingsData.location || 'Austin, TX',
                        outreach: (settingsData.outreach_config as any) || DEFAULT_SETTINGS.outreach,
                        vapi: (settingsData.vapi_config as any) || DEFAULT_SETTINGS.vapi
                    });
                }

                // 4. Load Vault
                const vaultData = await getVaultDocuments();
                setVaultDocs((vaultData || []).map(d => ({ ...d, createdAt: d.created_at, type: d.type as any, tags: d.tags || [] })) as any);

            } catch (err: any) {
                if (err?.name === 'AbortError') return;
                console.error('SYSTEM: Backend sync failed:', err?.message || err);
            }
        };

        loadContent();

        // 2. Real-time Subscription to Leads
        const channel = supabase
            .channel('public:leads')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, (payload) => {
                if (payload.eventType === 'INSERT') {
                    const newLead = payload.new as Lead;
                    setRemoteLeads(prev => [newLead, ...prev]);
                } else if (payload.eventType === 'UPDATE') {
                    const updatedLead = payload.new as Lead;
                    setRemoteLeads(prev => prev.map(l => l.id === updatedLead.id ? updatedLead : l));
                }
            })
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, [user]);

    // Update usage state when profile changes
    useEffect(() => {
        if (profile) {
            setUsage(prev => ({
                ...prev,
                totalApiCalls: profile.api_calls_made || 0,
                totalTokens: Number(profile.tokens_consumed || 0)
            }));
        }
    }, [profile]);

    // Sync usage back to Supabase (incremental logic)
    useEffect(() => {
        const unsub = GeminiService.onUsageUpdate(async (incremental) => {
            // Update local state by adding the incremental change
            setUsage(prev => ({
                ...prev,
                totalApiCalls: prev.totalApiCalls + incremental.calls,
                totalTokens: prev.totalTokens + incremental.totalTokens,
                promptTokens: prev.promptTokens + incremental.promptTokens,
                completionTokens: prev.completionTokens + incremental.completionTokens
            }));

            // Persist to Supabase by adding to DB current value (Best effort client-side increment)
            if (user && profile) {
                const newTotalCalls = (profile.api_calls_made || 0) + incremental.calls;
                const newTotalTokens = (profile.tokens_consumed || 0) + incremental.totalTokens;

                await supabase.from('profiles').update({
                    api_calls_made: newTotalCalls,
                    tokens_consumed: newTotalTokens
                }).eq('id', user.id);

                // We don't call refreshProfile here to avoid excessive fetch cycles
                // the local 'usage' state handles the UI. profile will sync eventually.
            }
        });
        return unsub;
    }, [user, profile]);

    const [settings, setSettings] = useState<SettingsType>(DEFAULT_SETTINGS);
    const [agents, setAgents] = useState<AgentProfile[]>([]);
    const [vaultDocs, setVaultDocs] = useState<VaultDocument[]>([]);

    const allLeads = useMemo(() => remoteLeads, [remoteLeads]);

    // --- ACTIONS ---

    const handleCreateSession = (name: string) => {
        const newSession = { id: crypto.randomUUID(), name, createdAt: new Date().toISOString(), leads: [] };
        setSessions(prev => [...prev, newSession]);
        setCurrentSessionId(newSession.id);
        showToast(`Operation ${name} initialized`, 'success');
    };

    const handleDeleteSession = (id: string) => {
        if (sessions.length <= 1) return;
        setSessions(prev => prev.filter(s => s.id !== id));
        if (currentSessionId === id) setCurrentSessionId(sessions[0].id);
        showToast('Operation archived', 'info');
    };

    const handleUpdateVaultDoc = async (doc: VaultDocument) => {
        try {
            await upsertVaultDocument({
                ...doc,
                created_at: doc.createdAt,
                user_id: user?.id,
                organization_id: profile?.organization_id
            } as any);
            // Refresh list (or update locally which we'll do via refresh or manual update state)
            const vaultData = await getVaultDocuments();
            setVaultDocs((vaultData || []).map(d => ({ ...d, createdAt: d.created_at, type: d.type as any, tags: d.tags || [] })) as any);
            showToast('Strategic asset archived', 'success');
        } catch (err) {
            showToast('Vault sync failed', 'error');
        }
    };

    const handleDeleteVaultDoc = async (id: string) => {
        try {
            await deleteVaultDocument(id);
            setVaultDocs(prev => prev.filter(d => d.id !== id));
            showToast('Dossier purged', 'info');
        } catch (err) {
            showToast('Purge failed', 'error');
        }
    };

    const handleUpdateLead = async (updatedLead: Lead) => {
        try {
            // IMMEDIATELY update local state so UI reflects changes instantly
            setRemoteLeads(prev => {
                const existingIndex = prev.findIndex(l => l.id === updatedLead.id);
                if (existingIndex >= 0) {
                    // Update existing lead
                    const updated = [...prev];
                    updated[existingIndex] = updatedLead;
                    return updated;
                } else {
                    // Add new lead at the beginning
                    return [updatedLead, ...prev];
                }
            });

            // Then persist to Supabase in background
            await upsertLead({
                ...updatedLead,
                created_at: updatedLead.createdAt,
                user_id: user?.id,
                organization_id: profile?.organization_id
            } as any);
        } catch (err) {
            console.error('Lead sync failed:', err);
            showToast('Sync failed', 'error');
        }
    };

    const handleMoveLead = async (leadId: string, newStatus: LeadStatus) => {
        const lead = remoteLeads.find(l => l.id === leadId);
        if (lead) {
            await handleUpdateLead({ ...lead, status: newStatus });
        }
    };

    const handleSendMessage = async (leadId: string, content: string) => {
        const lead = remoteLeads.find(l => l.id === leadId);
        if (lead && lead.email) {
            showToast(`Transmitting message to ${lead.email}...`, 'info');
            const result = await EmailService.sendEmail({
                to: lead.email,
                subject: `Update from Revlo OS: ${lead.name}`,
                text: content
            });

            if (result.success) {
                showToast('Email transmitted via SendGrid', 'success');
                const newMessage: any = { id: crypto.randomUUID(), sender: 'user', content, timestamp: new Date().toISOString(), isRead: true };
                await handleUpdateLead({
                    ...lead,
                    status: LeadStatus.CONTACTED,
                    messages: [...(lead.messages || []), newMessage]
                });
            } else {
                showToast(`Transmission failed: ${result.error}`, 'error');
            }
        }
    };

    const handleSendOutreach = async (lead: Lead) => {
        if (!lead.email || !lead.outreachEmailBody) {
            showToast('Missing lead email or outreach content', 'warning');
            return;
        }

        showToast(`Deploying automated campaign node to ${lead.email}...`, 'info');
        const result = await EmailService.sendEmail({
            to: lead.email,
            subject: lead.outreachEmailSubject || 'Custom Digital Asset Ready',
            text: lead.outreachEmailBody
        });

        if (result.success) {
            showToast('Outreach sequence initiated via SendGrid', 'success');
            await handleMoveLead(lead.id, LeadStatus.CONTACTED);
        } else {
            showToast(`Campaign deployment failed: ${result.error}`, 'error');
        }
    };

    const handleUpdateAgents = async (updatedAgents: AgentProfile[] | ((prev: AgentProfile[]) => AgentProfile[])) => {
        const nextAgents = typeof updatedAgents === 'function' ? updatedAgents(agents) : updatedAgents;

        // Sync deletions if list shrunk
        if (user && nextAgents.length < agents.length) {
            const removed = agents.filter(a => !nextAgents.some(na => na.id === a.id));
            for (const r of removed) {
                try {
                    await deleteAgent(r.id);
                } catch (err) {
                    console.error("Failed to delete agent:", r.id, err);
                }
            }
        }

        setAgents(nextAgents);

        // Sync changes/additions
        if (user) {
            try {
                for (const agent of nextAgents) {
                    // Map frontend camelCase to database snake_case properly
                    await upsertAgent({
                        id: agent.id,
                        name: agent.name,
                        role: agent.role,
                        version: agent.version,
                        mandate: agent.mandate,
                        responsibilities: agent.responsibilities,
                        output_contract: agent.outputContract,
                        behavior: agent.behavior,
                        capabilities: agent.capabilities,
                        chaining: agent.chaining,
                        memory_type: agent.memoryType,
                        stats: agent.stats,
                        user_id: user.id,
                        updated_at: new Date().toISOString()
                    });
                }
            } catch (err) {
                console.error("Agent sync failed", err);
            }
        }
    };

    const debouncedSyncSettings = useMemo(
        () => {
            let timeout: any;
            return (newSettings: SettingsType, userId: string) => {
                clearTimeout(timeout);
                timeout = setTimeout(async () => {
                    try {
                        console.log("SYSTEM: Synchronizing parameters with Supabase...");
                        await upsertSettings({
                            user_id: userId,
                            api_key: newSettings.apiKey,
                            scraping_batch_size: newSettings.scrapingBatchSize,
                            niche: newSettings.niche,
                            location: newSettings.location,
                            vapi_config: newSettings.vapi,
                            outreach_config: newSettings.outreach,
                            updated_at: new Date().toISOString()
                        });
                        showToast("System parameters synchronized", "success");
                    } catch (err: any) {
                        if (err?.name === 'AbortError') return;
                        console.error("Settings sync failed:", err);
                    }
                }, 500); // Faster feedback loop
            };
        },
        [showToast]
    );

    const handleSaveSettingsExplicitly = async () => {
        if (user) {
            try {
                await upsertSettings({
                    user_id: user.id,
                    api_key: settings.apiKey,
                    scraping_batch_size: settings.scrapingBatchSize,
                    niche: settings.niche,
                    location: settings.location,
                    vapi_config: settings.vapi,
                    outreach_config: settings.outreach,
                    updated_at: new Date().toISOString()
                });
                showToast("Parameters committed to core", "success");
            } catch (err) {
                showToast("Commit failure", "error");
            }
        }
    };

    const handleUpdateSettings = (newSettings: SettingsType) => {
        setSettings(newSettings);
        if (user) {
            debouncedSyncSettings(newSettings, user.id);
        }
    };

    // --- RENDER ---

    const currentSession = sessions.find(s => s.id === currentSessionId) || sessions[0];

    return (
        <div className="bg-slate-50 min-h-screen">
            <RevloOSLayout currentView={currentView} setCurrentView={setCurrentView}>
                {currentView === 'dashboard' && <DashboardView leads={allLeads} usage={usage} />}
                {currentView === 'engine' && (
                    <LeadEngineView
                        settings={settings} sessions={sessions} currentSessionId={currentSessionId}
                        onSwitchSession={setCurrentSessionId} onCreateSession={handleCreateSession} onDeleteSession={handleDeleteSession}
                        leads={allLeads}
                        onUpdateLead={handleUpdateLead}
                        agents={agents}
                        onSendOutreach={handleSendOutreach}
                    />
                )}
                {currentView === 'agents' && <AgentStudioView agents={agents} onUpdateAgents={handleUpdateAgents} />}
                {currentView === 'crm' && <CRMView leads={allLeads} />}
                {currentView === 'pipeline' && <PipelineView leads={allLeads} onMoveLead={handleMoveLead} />}
                {currentView === 'inbox' && <InboxView leads={allLeads} onSendMessage={handleSendMessage} />}
                {currentView === 'phone' && <PhoneView leads={allLeads} agents={agents} vapiConfig={settings.vapi} updateLead={handleUpdateLead} />}
                {currentView === 'vault' && <VaultView documents={vaultDocs} onUpdate={handleUpdateVaultDoc} onDelete={handleDeleteVaultDoc} />}
                {currentView === 'docs' && <DocsView />}
                {currentView === 'settings' && <SettingsView settings={settings} onUpdate={handleUpdateSettings} onSaveExplicitly={handleSaveSettingsExplicitly} />}

                {/* SUBSCRIPTION OVERLAY / GATE */}
                {profile?.subscription_tier === 'free' && usage.totalApiCalls > 50 && (
                    <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-6">
                        <div className="bg-white rounded-3xl p-10 max-w-lg text-center shadow-2xl">
                            <h2 className="text-3xl font-black text-slate-900 mb-4">Neural Limit Reached</h2>
                            <p className="text-slate-500 mb-8 font-medium italic">You've exhausted your free orchestration units. Upgrade to <b>PRO</b> to unlock unlimited lead generation and automated builds.</p>
                            <button className="w-full h-14 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl shadow-lg transition-all transform hover:scale-105">
                                Upgrade to Pro — $97/mo
                            </button>
                        </div>
                    </div>
                )}
            </RevloOSLayout>
        </div>
    );
};

const RevloOSAppPage: React.FC = () => {
    return (
        <RevloOSAppPageContent />
    );
};

export default RevloOSAppPage;

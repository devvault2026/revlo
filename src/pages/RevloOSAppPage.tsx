
import React, { useState, useEffect, useMemo } from 'react';
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
import { supabase, upsertLead, getLeads, getVaultDocuments, upsertVaultDocument, deleteVaultDocument } from '../lib/supabase';
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
                const data = await getLeads();
                // Map DB leads to UI Lead types if necessary
                const mappedLeads = (data || []).map(l => ({
                    ...l,
                    createdAt: l.created_at,
                    status: l.status as LeadStatus,
                    messages: (l.messages as any) || [],
                    competitors: (l.competitors as any) || []
                })) as unknown as Lead[];

                setRemoteLeads(mappedLeads);
                // For simplicity in this OS version, we put all leads in the default session 
                // but real-world would have sessions table.
                setSessions([{ id: 'default', name: 'Main Pipeline', createdAt: new Date().toISOString(), leads: mappedLeads }]);
            } catch (err) {
                console.error('Failed to sync with Supabase:', err);
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

    // Sync usage back to Supabase (debounced ideally, but here direct after Gemini completions)
    useEffect(() => {
        const unsub = GeminiService.onUsageUpdate(async (newUsage) => {
            setUsage(prev => ({
                ...prev,
                ...newUsage,
                totalApiCalls: (profile?.api_calls_made || 0) + newUsage.totalApiCalls,
                totalTokens: Number(profile?.tokens_consumed || 0) + newUsage.totalTokens
            }));

            // Persist to Supabase Profile
            if (user) {
                await supabase.from('profiles').update({
                    api_calls_made: (profile?.api_calls_made || 0) + newUsage.totalApiCalls,
                    tokens_consumed: Number(profile?.tokens_consumed || 0) + newUsage.totalTokens
                }).eq('id', user.id);
                refreshProfile();
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
            await upsertLead({
                ...updatedLead,
                created_at: updatedLead.createdAt,
                user_id: user?.id,
                organization_id: profile?.organization_id
            } as any);
            showToast('Lead intelligence synced', 'success');
        } catch (err) {
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
                {currentView === 'agents' && <AgentStudioView agents={agents} onUpdateAgents={setAgents} />}
                {currentView === 'crm' && <CRMView leads={allLeads} />}
                {currentView === 'pipeline' && <PipelineView leads={allLeads} onMoveLead={handleMoveLead} />}
                {currentView === 'inbox' && <InboxView leads={allLeads} onSendMessage={handleSendMessage} />}
                {currentView === 'phone' && <PhoneView leads={allLeads} agents={agents} vapiConfig={settings.vapi} updateLead={handleUpdateLead} />}
                {currentView === 'vault' && <VaultView documents={vaultDocs} onUpdate={handleUpdateVaultDoc} onDelete={handleDeleteVaultDoc} />}
                {currentView === 'docs' && <DocsView />}
                {currentView === 'settings' && <SettingsView settings={settings} onUpdate={setSettings} />}

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

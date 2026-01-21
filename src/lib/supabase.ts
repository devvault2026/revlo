import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials not found. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local');
}

export const supabase = createClient<Database>(
    supabaseUrl || '',
    supabaseAnonKey || '',
    {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
        },
    }
);

// --- TYPE EXPORTS ---
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type OSLead = Database['public']['Tables']['leads']['Row'];
export type Notification = Database['public']['Tables']['notifications']['Row'];
export type VaultDoc = Database['public']['Tables']['vault_documents']['Row'];

// --- AUTH HELPERS ---

export const signUp = async (email: string, password: string, metadata?: any) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: metadata
        }
    });
    if (error) throw error;
    return data;
};

export const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
};

export const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
};

export const getProfile = async (userId: string) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
    if (error) throw error;
    return data;
};

// --- DATA HELPERS ---

export const getLeads = async () => {
    const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
};

export const upsertLead = async (lead: Database['public']['Tables']['leads']['Insert']) => {
    const { data, error } = await supabase
        .from('leads')
        .upsert(lead)
        .select()
        .single();
    if (error) throw error;
    return data;
};

export const getNotifications = async (userId: string) => {
    const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
};

export const markNotificationAsRead = async (id: string) => {
    const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', id);
    if (error) throw error;
};

export const sendNotification = async (notif: Database['public']['Tables']['notifications']['Insert']) => {
    const { data, error } = await supabase
        .from('notifications')
        .insert(notif)
        .select()
        .single();
    if (error) throw error;
    return data;
};

// --- VAULT HELPERS ---

export const getVaultDocuments = async () => {
    const { data, error } = await supabase
        .from('vault_documents')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
};

export const upsertVaultDocument = async (doc: Database['public']['Tables']['vault_documents']['Insert']) => {
    const { data, error } = await supabase
        .from('vault_documents')
        .upsert(doc)
        .select()
        .single();
    if (error) throw error;
    return data;
};

export const deleteVaultDocument = async (id: string) => {
    const { error } = await supabase
        .from('vault_documents')
        .delete()
        .eq('id', id);
    if (error) throw error;
};
// --- AGENTS HELPERS ---

export const getAgents = async (userId: string) => {
    const { data, error } = await supabase
        .from('agents')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true });
    if (error) throw error;
    return data;
};

export const upsertAgent = async (agent: any) => {
    const { data, error } = await supabase
        .from('agents')
        .upsert(agent)
        .select()
        .single();
    if (error) throw error;
    return data;
};

export const deleteAgent = async (id: string) => {
    const { error } = await supabase
        .from('agents')
        .delete()
        .eq('id', id);
    if (error) throw error;
};

// --- SETTINGS HELPERS ---

export const getSettings = async (userId: string) => {
    const { data, error } = await supabase
        .from('settings')
        .select('*')
        .eq('user_id', userId)
        .single();
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is No rows found
    return data;
};

export const upsertSettings = async (settings: any) => {
    const { data, error } = await supabase
        .from('settings')
        .upsert(settings)
        .select()
        .single();
    if (error) throw error;
    return data;
};

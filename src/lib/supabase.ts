import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials not found. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local');
}

export const supabase = createClient(
    supabaseUrl || '',
    supabaseAnonKey || '',
    {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
        },
    }
);

// Database Tables Type Definitions
export interface Lead {
    id: string;
    created_at: string;
    name: string;
    email: string;
    company?: string;
    phone?: string;
    revenue_range?: string;
    message?: string;
    status: 'new' | 'contacted' | 'qualified' | 'converted';
    source: 'website' | 'chatbot' | 'referral' | 'other';
}

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string;
    expertise: string[];
    avatar_url?: string;
}

export interface Service {
    id: string;
    title: string;
    description: string;
    features: string[];
    icon: string;
    category: string;
}

// Helper Functions
export const insertLead = async (lead: Omit<Lead, 'id' | 'created_at' | 'status'>) => {
    const { data, error } = await supabase
        .from('leads')
        .insert([{ ...lead, status: 'new' }])
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const getTeamMembers = async () => {
    const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('created_at', { ascending: true });

    if (error) throw error;
    return data as TeamMember[];
};

export const getServices = async () => {
    const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: true });

    if (error) throw error;
    return data as Service[];
};

// Auth Helper Functions
export const signUp = async (email: string, password: string, metadata: any = {}) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: metadata,
        },
    });
    if (error) throw error;
    return data;
};

export const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) throw error;
    return data;
};

export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
};

export const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
};

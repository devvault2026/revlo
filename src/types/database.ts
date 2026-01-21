export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            agents: {
                Row: {
                    behavior: Json | null
                    capabilities: Json | null
                    chaining: Json | null
                    created_at: string
                    id: string
                    mandate: Json | null
                    memory_type: string | null
                    name: string
                    output_contract: Json | null
                    responsibilities: Json | null
                    role: string | null
                    stats: Json | null
                    updated_at: string
                    user_id: string | null
                    version: number | null
                }
                Insert: {
                    behavior?: Json | null
                    capabilities?: Json | null
                    chaining?: Json | null
                    created_at?: string
                    id?: string
                    mandate?: Json | null
                    memory_type?: string | null
                    name: string
                    output_contract?: Json | null
                    responsibilities?: Json | null
                    role?: string | null
                    stats?: Json | null
                    updated_at?: string
                    user_id?: string | null
                    version?: number | null
                }
                Update: {
                    behavior?: Json | null
                    capabilities?: Json | null
                    chaining?: Json | null
                    created_at?: string
                    id?: string
                    mandate?: Json | null
                    memory_type?: string | null
                    name?: string
                    output_contract?: Json | null
                    responsibilities?: Json | null
                    role?: string | null
                    stats?: Json | null
                    updated_at?: string
                    user_id?: string | null
                    version?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: "agents_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            leads: {
                Row: {
                    address: string | null
                    business_core: string | null
                    calls: Json | null
                    competitors: Json | null
                    created_at: string
                    deal_value: number | null
                    email: string | null
                    generated_site_code: string | null
                    id: string
                    last_contact_date: string | null
                    messages: Json | null
                    name: string
                    notes: string | null
                    organization_id: string | null
                    outreach_email_body: string | null
                    outreach_email_subject: string | null
                    outreach_sms_body: string | null
                    owner_email: string | null
                    owner_name: string | null
                    pain_points: string[] | null
                    prd: string | null
                    propensity_score: number | null
                    psychology_profile: string | null
                    rating: number | null
                    site_structure: Json | null
                    status: string | null
                    tags: string[] | null
                    phone: string | null
                    type: string | null
                    updated_at: string
                    user_id: string | null
                    user_rating_count: number | null
                    website: string | null
                }
                Insert: {
                    address?: string | null
                    business_core?: string | null
                    calls?: Json | null
                    competitors?: Json | null
                    created_at?: string
                    deal_value?: number | null
                    email?: string | null
                    generated_site_code?: string | null
                    id?: string
                    last_contact_date?: string | null
                    messages?: Json | null
                    name: string
                    notes?: string | null
                    organization_id?: string | null
                    outreach_email_body?: string | null
                    outreach_email_subject?: string | null
                    outreach_sms_body?: string | null
                    owner_email?: string | null
                    owner_name?: string | null
                    pain_points?: string[] | null
                    prd?: string | null
                    propensity_score?: number | null
                    psychology_profile?: string | null
                    rating?: number | null
                    site_structure?: Json | null
                    status?: string | null
                    tags?: string[] | null
                    phone?: string | null
                    type?: string | null
                    updated_at?: string
                    user_id?: string | null
                    user_rating_count?: number | null
                    website?: string | null
                }
                Update: {
                    address?: string | null
                    business_core?: string | null
                    calls?: Json | null
                    competitors?: Json | null
                    created_at?: string
                    deal_value?: number | null
                    email?: string | null
                    generated_site_code?: string | null
                    id?: string
                    last_contact_date?: string | null
                    messages?: Json | null
                    name?: string
                    notes?: string | null
                    organization_id?: string | null
                    outreach_email_body?: string | null
                    outreach_email_subject?: string | null
                    outreach_sms_body?: string | null
                    owner_email?: string | null
                    owner_name?: string | null
                    pain_points?: string[] | null
                    prd?: string | null
                    propensity_score?: number | null
                    psychology_profile?: string | null
                    rating?: number | null
                    site_structure?: Json | null
                    status?: string | null
                    tags?: string[] | null
                    phone?: string | null
                    type?: string | null
                    updated_at?: string
                    user_id?: string | null
                    user_rating_count?: number | null
                    website?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "leads_organization_id_fkey"
                        columns: ["organization_id"]
                        isOneToOne: false
                        referencedRelation: "organizations"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "leads_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            notifications: {
                Row: {
                    created_at: string
                    id: string
                    is_read: boolean | null
                    message: string
                    title: string
                    type: string | null
                    user_id: string | null
                }
                Insert: {
                    created_at?: string
                    id?: string
                    is_read?: boolean | null
                    message: string
                    title: string
                    type?: string | null
                    user_id?: string | null
                }
                Update: {
                    created_at?: string
                    id?: string
                    is_read?: boolean | null
                    message?: string
                    title?: string
                    type?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "notifications_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            organizations: {
                Row: {
                    created_at: string
                    id: string
                    logo_url: string | null
                    name: string
                    owner_id: string | null
                    slug: string | null
                    subscription_status: string | null
                }
                Insert: {
                    created_at?: string
                    id?: string
                    logo_url?: string | null
                    name: string
                    owner_id?: string | null
                    slug?: string | null
                    subscription_status?: string | null
                }
                Update: {
                    created_at?: string
                    id?: string
                    logo_url?: string | null
                    name?: string
                    owner_id?: string | null
                    slug?: string | null
                    subscription_status?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "organizations_owner_id_fkey"
                        columns: ["owner_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            profiles: {
                Row: {
                    api_calls_made: number | null
                    avatar_url: string | null
                    full_name: string | null
                    id: string
                    metadata: Json | null
                    onboarding_completed: boolean | null
                    organization_id: string | null
                    role: Database["public"]["Enums"]["user_role"] | null
                    subscription_tier: Database["public"]["Enums"]["subscription_tier"] | null
                    tokens_consumed: number | null
                    updated_at: string | null
                }
                Insert: {
                    api_calls_made?: number | null
                    avatar_url?: string | null
                    full_name?: string | null
                    id: string
                    metadata?: Json | null
                    onboarding_completed?: boolean | null
                    organization_id?: string | null
                    role?: Database["public"]["Enums"]["user_role"] | null
                    subscription_tier?: Database["public"]["Enums"]["subscription_tier"] | null
                    tokens_consumed?: number | null
                    updated_at?: string | null
                }
                Update: {
                    api_calls_made?: number | null
                    avatar_url?: string | null
                    full_name?: string | null
                    id?: string
                    metadata?: Json | null
                    onboarding_completed?: boolean | null
                    organization_id?: string | null
                    role?: Database["public"]["Enums"]["user_role"] | null
                    subscription_tier?: Database["public"]["Enums"]["subscription_tier"] | null
                    tokens_consumed?: number | null
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "profiles_id_fkey"
                        columns: ["id"]
                        isOneToOne: true
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            settings: {
                Row: {
                    api_key: string | null
                    location: string | null
                    niche: string | null
                    outreach_config: Json | null
                    scraping_batch_size: number | null
                    updated_at: string
                    user_id: string
                    vapi_config: Json | null
                }
                Insert: {
                    api_key?: string | null
                    location?: string | null
                    niche?: string | null
                    outreach_config?: Json | null
                    scraping_batch_size?: number | null
                    updated_at?: string
                    user_id: string
                    vapi_config?: Json | null
                }
                Update: {
                    api_key?: string | null
                    location?: string | null
                    niche?: string | null
                    outreach_config?: Json | null
                    scraping_batch_size?: number | null
                    updated_at?: string
                    user_id?: string
                    vapi_config?: Json | null
                }
                Relationships: [
                    {
                        foreignKeyName: "settings_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: true
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            vault_documents: {
                Row: {
                    content: string | null
                    created_at: string
                    id: string
                    organization_id: string | null
                    tags: string[] | null
                    title: string
                    type: string | null
                    user_id: string | null
                }
                Insert: {
                    content?: string | null
                    created_at?: string
                    id?: string
                    organization_id?: string | null
                    tags?: string[] | null
                    title: string
                    type?: string | null
                    user_id?: string | null
                }
                Update: {
                    content?: string | null
                    created_at?: string
                    id?: string
                    organization_id?: string | null
                    tags?: string[] | null
                    title?: string
                    type?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "vault_documents_organization_id_fkey"
                        columns: ["organization_id"]
                        isOneToOne: false
                        referencedRelation: "organizations"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "vault_documents_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            subscription_tier: "free" | "pro" | "enterprise"
            user_role: "super_admin" | "admin" | "agent" | "member"
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

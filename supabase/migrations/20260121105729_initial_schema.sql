-- REVLO OS INITIAL SCHEMA
-- Optimized for high-fidelity agentic operations

-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- 1. PROFILES (Extends Auth)
create table if not exists public.profiles (
    id uuid references auth.users on delete cascade primary key,
    full_name text,
    avatar_url text,
    subscription_tier text default 'free',
    api_calls_made bigint default 0,
    tokens_consumed bigint default 0,
    organization_id uuid,
    metadata jsonb default '{}'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. LEADS (CRM Core)
create table if not exists public.leads (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references auth.users on delete cascade,
    organization_id uuid,
    name text not null,
    email text,
    phone text,
    website text,
    address text,
    type text,
    status text default 'SCOUTED',
    rating decimal,
    user_rating_count integer,
    
    -- Intelligence Fields
    propensity_score integer default 0,
    psychology_profile text,
    business_core text,
    revenue_estimate text,
    pain_points jsonb default '[]'::jsonb,
    competitors jsonb default '[]'::jsonb,
    
    -- Strategic Assets
    prd text,
    site_structure jsonb default '{}'::jsonb,
    generated_site_code text,
    outreach_email_subject text,
    outreach_email_body text,
    outreach_sms_body text,
    
    -- CRM Metadata
    deal_value decimal default 0,
    messages jsonb default '[]'::jsonb,
    tags jsonb default '[]'::jsonb,
    
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. AGENTS (Stored Logic)
create table if not exists public.agents (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references auth.users on delete cascade,
    name text not null,
    role text,
    version integer default 1,
    mandate jsonb default '{}'::jsonb,
    responsibilities jsonb default '[]'::jsonb,
    output_contract jsonb default '{}'::jsonb,
    behavior jsonb default '{}'::jsonb,
    capabilities jsonb default '[]'::jsonb,
    chaining jsonb default '[]'::jsonb,
    memory_type text default 'persistent',
    stats jsonb default '{"projectsCompleted": 0, "avgSatisfaction": 5.0}'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. SYSTEM SETTINGS (Account Config)
create table if not exists public.settings (
    user_id uuid references auth.users on delete cascade primary key,
    api_key text,
    scraping_batch_size integer default 5,
    niche text default 'Plumbers',
    location text default 'Austin, TX',
    vapi_config jsonb default '{}'::jsonb,
    outreach_config jsonb default '{}'::jsonb,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.leads enable row level security;
alter table public.agents enable row level security;
alter table public.settings enable row level security;

-- Policies
create policy "Users can view their own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update their own profile" on public.profiles for update using (auth.uid() = id);

create policy "Users can manage their own leads" on public.leads
    for all using (auth.uid() = user_id);

create policy "Users can manage their own agents" on public.agents
    for all using (auth.uid() = user_id);

create policy "Users can manage their own settings" on public.settings
    for all using (auth.uid() = user_id);

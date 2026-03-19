-- Create marketplace items table
CREATE TABLE IF NOT EXISTS marketplace_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    tagline TEXT NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('SaaS', 'AI', 'Gaming', 'Infrastructure')),
    image TEXT NOT NULL,
    features TEXT[] NOT NULL,
    tech_stack TEXT[] NOT NULL,
    demo_url TEXT,
    stats JSONB NOT NULL DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'Available' CHECK (status IN ('Available', 'Coming Soon', 'Sold Out')),
    launch_time TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create orders table for marketplace
CREATE TABLE IF NOT EXISTS marketplace_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id),
    item_id UUID REFERENCES marketplace_items(id),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
    amount DECIMAL(10, 2) NOT NULL,
    stripe_session_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE marketplace_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_orders ENABLE ROW LEVEL SECURITY;

-- Allow public to read items
CREATE POLICY "Marketplace items are viewable by everyone" 
ON marketplace_items FOR SELECT 
TO public 
USING (true);

-- Allow authenticated users to view their own orders
CREATE POLICY "Users can view their own orders" 
ON marketplace_orders FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

-- Seed real data
INSERT INTO marketplace_items (
    slug, title, tagline, description, long_description, price, category, image, features, tech_stack, demo_url, stats, status, launch_time
) VALUES (
    'ghostwins',
    'GHOSTWINS - PROPRIETARY CASINO',
    'High-Volatility 8-Bit Crypto Gaming Arcade',
    'Complete proprietary crypto casino with custom 8-bit horror theme. Includes domain, source code, and full infrastructure deployment.',
    'GhostWins is a high-performance, proprietary casino engine built for founders who want to own their infrastructure 100%. 
    
    This is not a white-label—it''s your own custom-coded gaming arcade. When you purchase this boilerplate, you get:
    
    1. The Domain: ghostwins.xyz
    2. The Source Code: Full React 19 + TypeScript frontend with optimized game logic.
    3. The Infrastructure: Production-ready deployment setup for high-concurrency multiplayer.
    4. Custom Games: 5 retro-horror themed games including Ghost Crash, Shadow Mines, Phantom Plinko, Battle Spin (PvP), and Ghost Slots.
    
    Perfect for launching a sovereign crypto casino with provably fair mechanics and high-volatility "banger" gameplay.',
    4997.00,
    'Gaming',
    'https://res.cloudinary.com/dpfapm0tl/image/upload/v1771259282/ChatGPT_Image_Feb_16_2026_11_27_50_AM_uorc1u.png',
    ARRAY['Full Domain (ghostwins.xyz) Included', 'Sovereign Infrastructure Deployment', '5 Custom-Coded High-Volatility Games', 'Seed-based Provable Fairness', 'Real-time Multiplayer PvP Feeds', '8-Bit Horror Asset Manifest'],
    ARRAY['React 19', 'TypeScript', 'TailwindCSS', 'Recharts', 'Lucide React', 'Vite 6'],
    'https://www.ghostwins.xyz/',
    '[{"label": "Ownership", "value": "100% IP"}, {"label": "Volatility", "value": "Insane"}, {"label": "Setup", "value": "Turnkey"}]'::jsonb,
    'Available',
    'Instant'
) ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    tagline = EXCLUDED.tagline,
    description = EXCLUDED.description,
    long_description = EXCLUDED.long_description,
    price = EXCLUDED.price,
    category = EXCLUDED.category,
    image = EXCLUDED.image,
    features = EXCLUDED.features,
    tech_stack = EXCLUDED.tech_stack,
    demo_url = EXCLUDED.demo_url,
    stats = EXCLUDED.stats,
    status = EXCLUDED.status,
    launch_time = EXCLUDED.launch_time;

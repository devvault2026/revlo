import { MarketplaceItem } from '../types/marketplace';

export const marketplaceItems: MarketplaceItem[] = [
    {
        id: '1',
        slug: 'ghostwins',
        title: 'GHOSTWINS - PROPRIETARY CASINO',
        tagline: 'High-Volatility 8-Bit Crypto Gaming Arcade',
        description: 'Complete proprietary crypto casino with custom 8-bit horror theme. Includes domain, source code, and full infrastructure deployment.',
        longDescription: `
            GhostWins is a high-performance, proprietary casino engine built for founders who want to own their infrastructure 100%. 
            
            This isn't a white-label—it's your own custom-coded gaming arcade. When you purchase this boilerplate, you get:
            
            1. **The Domain**: ghostwins.xyz
            2. **The Source Code**: Full React 19 + TypeScript frontend with optimized game logic.
            3. **The Infrastructure**: Production-ready deployment setup for high-concurrency multiplayer.
            4. **Custom Games**: 5 retro-horror themed games including Ghost Crash, Shadow Mines, Phantom Plinko, Battle Spin (PvP), and Ghost Slots.
            
            Perfect for launching a sovereign crypto casino with provably fair mechanics and high-volatility "banger" gameplay.
        `,
        price: 4997,
        category: 'Gaming',
        image: 'https://res.cloudinary.com/dpfapm0tl/image/upload/v1771259282/ChatGPT_Image_Feb_16_2026_11_27_50_AM_uorc1u.png',
        features: [
            'Full Domain (ghostwins.xyz) Included',
            'Sovereign Infrastructure Deployment',
            '5 Custom-Coded High-Volatility Games',
            'Seed-based Provable Fairness',
            'Real-time Multiplayer PvP Feeds',
            '8-Bit Horror Asset Manifest'
        ],
        techStack: ['React 19', 'TypeScript', 'TailwindCSS', 'Recharts', 'Lucide React', 'Vite 6'],
        demoUrl: 'https://www.ghostwins.xyz/',
        stats: [
            { label: 'Ownership', value: '100% IP' },
            { label: 'Volatility', value: 'Insane' },
            { label: 'Setup', value: 'Turnkey' }
        ],
        status: 'Available',
        launchTime: 'Instant'
    }
];

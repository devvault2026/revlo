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
        price: 1500,
        originalPrice: 5000,
        category: 'Gaming',
        image: 'https://res.cloudinary.com/dpfapm0tl/image/upload/v1774182059/ChatGPT_Image_Mar_22_2026_08_20_04_AM_z7wczt.png',
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
    },
    {
        id: '2',
        slug: 'celest',
        title: 'CELEST - BEGINNER YOGA REIMAGINED',
        tagline: 'AI-powered, anatomically-validated yoga for everyone.',
        description: 'Revolutionary yoga learning platform making beginner yoga accessible and safe with AI safety validation and radical accessibility features.',
        longDescription: `
            Celest is a next-generation yoga learning and practice platform designed from the ground up for beginners who want to explore yoga without injury, intimidation, or equipment barriers.
            
            Built in Next.js with React 19, it combines cutting-edge AI with clinical yoga science to create an immersive, personalized practice experience. Unlike generic yoga apps, Celest isn't just a video library. It's a complete yoga ecosystem that understands anatomical safety, celebrates accessibility, and empowers every practitioner—regardless of mobility, background, or resources—to build a sustainable practice.
            
            Key Innovations:
            
            1. **Intelligent Pose Library with Anatomical Intelligence**:
               - 2,000+ AI-generated poses with Sanskrit and English names.
               - Anatomical focus mapping and clinical safety protocols.
               - Difficulty scaling (Beginner, Intermediate, Advanced).
            
            2. **Prop Swap Revolution**:
               - No yoga mat? No blocks? No problem.
               - Automatically suggests household alternatives (e.g., thick book for yoga block).
            
            3. **Radical Accessibility Framework**:
               - Native support for chair yoga, wall-assisted poses, bariatric modifications, and trauma-informed options.
            
            4. **AI Safety & Validation System**:
               - Real-time pose form validation using TensorFlow.js.
               - AI Safety Preview powered by Google Gemini for injury prevention.
            
            5. **The Prana Methodology**:
               - Holistic wellness scoring based on Breath, Movement, and Rest.
               - Daily "Prana Score" (0-100) tracking nervous system health.
        `,
        price: 1500,
        originalPrice: 5000,
        category: 'AI',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200',
        features: [
            '2,000+ AI-Generated Poses',
            'TensorFlow.js Real-time Pose Detection',
            'Prop Swap™ Household Alternative Mapping',
            'Prana Methodology™ Wellness Scoring',
            'Radical Accessibility Framework',
            'Full Next.js 16 + Supabase Stack'
        ],
        techStack: ['Next.js 16', 'React 19', 'TypeScript', 'Google Gemini', 'TensorFlow.js', 'Supabase', 'Clerk', 'Tailwind CSS v4', 'Framer Motion', 'Radix UI'],
        demoUrl: 'https://celest-beginner-yoga.vercel.app/',
        stats: [
            { label: 'Poses', value: '2,000+' },
            { label: 'AI Safety', value: 'Validated' },
            { label: 'Stack', value: 'Next.js 16' }
        ],
        status: 'Available',
        launchTime: 'Instant'
    }
];

export interface MarketplaceItem {
    id: string;
    slug: string;
    title: string;
    tagline: string;
    description: string;
    longDescription: string;
    price: number;
    originalPrice?: number;
    category: 'SaaS' | 'AI' | 'Gaming' | 'Infrastructure';
    image: string;
    features: string[];
    techStack: string[];
    demoUrl?: string;
    stats: {
        label: string;
        value: string;
    }[];
    status: 'Available' | 'Coming Soon' | 'Sold Out';
    launchTime: string; // e.g., "24 Hours", "1 Week"
}

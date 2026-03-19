import { supabase } from '../lib/supabase';
import { MarketplaceItem } from '../types/marketplace';

export class MarketplaceService {
    static async getItems(): Promise<MarketplaceItem[]> {
        const { data, error } = await supabase
            .from('marketplace_items')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching marketplace items:', error);
            // Fallback to empty if there's an error
            return [];
        }

        // Map snake_case from DB to camelCase if necessary (or just use them if they match)
        // Since I wrote the migration, I'll match the names.
        return (data || []).map((item: any) => ({
            ...item,
            longDescription: item.long_description,
            techStack: item.tech_stack,
            demoUrl: item.demo_url,
            launchTime: item.launch_time
        })) as unknown as MarketplaceItem[];
    }

    static async getItemBySlug(slug: string): Promise<MarketplaceItem | null> {
        const { data, error } = await supabase
            .from('marketplace_items')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error || !data) {
            console.error('Error fetching marketplace item:', error);
            return null;
        }

        return {
            ...data,
            longDescription: data.long_description,
            techStack: data.tech_stack,
            demoUrl: data.demo_url,
            launchTime: data.launch_time
        } as unknown as MarketplaceItem;
    }

    static async createCheckoutSession(itemId: string, userId: string): Promise<string | null> {
        // This would typically call a Vercel/Node.js API that interacts with Stripe
        // For now, we'll simulate it or provide a direct link to the contact/payment page.
        // In a real implementation, we'd do something like:
        // const response = await fetch('/api/create-checkout-session', { ... });
        // return (await response.json()).url;
        
        console.log('Initiating checkout for item:', itemId, 'for user:', userId);
        return null;
    }
}

export interface Lead {
  id: string;
  businessName: string;
  industry: string;
  location: string;
  website: string | null;
  websitePreviewUrl?: string | null; // Iframe preview
  phoneNumber: string | null;
  email: string | null;
  socials: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    tiktok?: string;
    x?: string;
  };
  estimatedOwnerName: string | null;
  gmbStatus: string; // Dynamic rating
  leadScore: number;
  onlinePresenceAnalysis: string;
  painPoints: string[];
  suggestedPitch: string;
  digitalMaturity: 'Critical' | 'Weak' | 'Average' | 'Strong';
  gmbRating: number | null;
  gmbReviewCount: number | null;
  competitiveInsights: {
    competitorAdvantages: string[];
    missedOpportunities: string[];
  };
  revenueLossEstimate: string;
  suggestedWorkflow: string; // Internal: How we will execute the work (User requested)
  serviceFit: 'Marketing' | 'AI Automation' | 'Web Design' | 'Full Stack';
  isEnriched?: boolean;
  enrichmentStatus?: 'pending' | 'scanning' | 'complete' | 'failed';
}

export enum AppState {
  IDLE = 'IDLE',
  SEARCHING = 'SEARCHING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}

export interface SearchFilters {
  location: string;
  niche: string;
}
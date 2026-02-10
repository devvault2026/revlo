export interface Lead {
  id: string;
  businessName: string;
  industry: string;
  location: string;
  website: string | null;
  phoneNumber: string | null;
  email: string | null; // New field
  socialProfiles: string[]; // New field (urls)
  estimatedOwnerName: string | null;
  gmbStatus: 'Weak' | 'Average' | 'Strong' | 'Non-Existent';
  leadScore: number; // 0-100
  onlinePresenceAnalysis: string;
  painPoints: string[];
  suggestedPitch: string;
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
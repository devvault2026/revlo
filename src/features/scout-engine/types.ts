export enum LeadStage {
  SCOUTED = 'SCOUTED',
  RESEARCH = 'RESEARCH',
  PRD = 'PRD',
  DESIGN = 'DESIGN',
  OUTREACH = 'OUTREACH',
  DONE = 'DONE'
}

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
  currentStage: LeadStage;
  // Deep enrichment dossier (populated by Deepseek + Brave pipeline)
  dossier?: EnrichmentDossier;
  // Website Design PRD (populated by competitor analysis + Deepseek pipeline)
  prd?: WebsitePRD;
  generated_site_code?: string;
  slug?: string;
  outreachStatus?: 'unsent' | 'sent';
  sentAt?: number;
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

// === DEEP ENRICHMENT TYPES ===

export type EnrichmentMode = 'auto' | 'manual';

export interface RevloOffer {
  id: string;
  name: string;
  url: string;
  description: string;
  idealFor: string[];
  priceRange: string;
  keyBenefits: string[];
}

export interface EnrichmentDossier {
  companyOverview: string;
  ownerName: string | null;
  ownerTitle: string | null;
  ownerLinkedIn: string | null;
  emailFound: string | null;
  phoneFound: string | null;
  websiteAnalysis: {
    hasWebsite: boolean;
    websiteQuality: 'None' | 'Poor' | 'Average' | 'Good' | 'Excellent' | 'Unknown';
    mobileOptimized: boolean | null;
    hasSSL: boolean | null;
    loadSpeed: 'Fast' | 'Average' | 'Slow' | 'Unknown';
    seoScore: 'Weak' | 'Average' | 'Strong' | 'Unknown';
    issues: string[];
  };
  socialPresence: {
    facebook: string | null;
    instagram: string | null;
    linkedin: string | null;
    tiktok: string | null;
    googleBusiness: string | null;
    socialScore: number;
    issues: string[];
  };
  reviewAnalysis: {
    googleRating: number | null;
    googleReviewCount: number | null;
    yelpRating: number | null;
    averageSentiment: 'Positive' | 'Mixed' | 'Negative' | 'No Reviews';
    commonComplaints: string[];
    commonPraises: string[];
  };
  competitorBenchmark: {
    topCompetitors: string[];
    competitorAdvantages: string[];
    leadAdvantages: string[];
    marketGaps: string[];
  };
  painPoints: string[];
  opportunityScore: number;
  revloRecommendation: {
    primaryService: RevloOffer;
    secondaryService?: RevloOffer;
    reasoning: string;
    estimatedImpact: string;
    urgency: 'Critical' | 'High' | 'Medium' | 'Low';
  };
  tailoredPitch: string;
  coldEmailSubject: string;
  followUpAngles: string[];
  enrichedAt: number;
  dataSourcesUsed: string[];
  researchQueries: string[];
}

export interface EnrichmentJob {
  id: string;
  leadId: string;
  leadName: string;
  status: 'queued' | 'running' | 'complete' | 'failed';
  progress: number; // 0-100
  startedAt: number;
  completedAt?: number;
  steps: string[];
}

// === WEBSITE DESIGN PRD TYPES ===

export interface CompetitorWebsite {
  name: string;
  url: string;
  strengths: string[];
  weaknesses: string[];
  designStyle: string;
  keyFeatures: string[];
  estimatedTraffic: string;
  techStack: string[];
  conversionTactics: string[];
  whyTheyWin: string;
}

export interface PRDSection {
  id: string;
  name: string;
  purpose: string;
  layout: string; // Detailed layout description (grid, flex, split, etc.)
  height: string; // e.g. "100vh", "auto min 600px"
  background: {
    type: 'solid' | 'gradient' | 'image' | 'video' | 'pattern';
    value: string; // CSS value or description
    overlay?: string; // Overlay CSS if needed
  };
  content: {
    headline?: {
      text: string;
      tag: 'h1' | 'h2' | 'h3';
      style: string; // Font size, weight, color description
      animation?: string;
    };
    subheadline?: {
      text: string;
      style: string;
    };
    bodyText?: string;
    bulletPoints?: string[];
    statistics?: Array<{ value: string; label: string }>;
    testimonials?: Array<{ quote: string; author: string; role: string; company?: string }>;
    cards?: Array<{
      title: string;
      description: string;
      icon: string;
      style: string;
    }>;
    images?: Array<{
      description: string;
      generationPrompt: string; // Prompt for AI image generation
      placement: string;
      dimensions: string;
      style: string; // rounded, shadow, border, etc.
    }>;
    formFields?: Array<{
      name: string;
      type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'checkbox';
      placeholder: string;
      required: boolean;
      options?: string[]; // For select fields
    }>;
  };
  cta?: {
    primaryText: string;
    primaryAction: string;
    primaryStyle: string; // Button style description
    secondaryText?: string;
    secondaryAction?: string;
    placement: string; // Where in the section
  };
  animations: {
    entrance: string; // e.g. "fade-up on scroll with 0.3s delay"
    hover?: string;
    scroll?: string; // Scroll-triggered animations
    parallax?: boolean;
    microInteractions?: string[];
  };
  responsive: {
    mobile: string; // Layout changes for mobile
    tablet: string; // Layout changes for tablet
    desktop: string; // Full desktop layout
  };
}

export interface PRDPage {
  id: string;
  name: string;
  slug: string; // URL path
  title: string; // Page title for SEO
  metaDescription: string;
  purpose: string;
  sections: PRDSection[];
  navigation: {
    showInHeader: boolean;
    showInFooter: boolean;
    label: string;
  };
}

export interface WebsitePRD {
  // === META ===
  generatedAt: number;
  version: string;
  projectName: string;
  clientName: string;
  industry: string;
  location: string;

  // === EXECUTIVE SUMMARY ===
  executiveSummary: string;
  projectGoals: string[];
  targetAudience: string;
  uniqueValueProposition: string;

  // === COMPETITOR ANALYSIS ===
  competitorAnalysis: {
    competitors: CompetitorWebsite[];
    industryTrends: string[];
    designTrends: string[];
    whatWinnersDoDifferently: string;
    strategyForClient: string;
  };

  // === BRAND & DESIGN SYSTEM ===
  designSystem: {
    designPhilosophy: string; // Overall vibe and feel
    colorPalette: {
      primary: string; // hex
      secondary: string; // hex
      accent: string; // hex
      background: string; // hex
      surface: string; // hex
      text: string; // hex
      textSecondary: string; // hex
      success: string; // hex
      warning: string; // hex
      error: string; // hex
      gradient: string; // CSS gradient
    };
    typography: {
      headingFont: string; // Google Font name
      bodyFont: string; // Google Font name
      headingWeight: string;
      bodyWeight: string;
      baseSize: string; // e.g. "16px"
      scaleRatio: string; // e.g. "1.25 Major Third"
      lineHeight: string;
      letterSpacing: string;
    };
    spacing: {
      sectionPadding: string;
      componentGap: string;
      containerMaxWidth: string;
    };
    borderRadius: string;
    shadows: string;
    iconStyle: string; // e.g. "Lucide, outlined, 24px"
    imageStyle: string; // e.g. "rounded-xl, slight shadow, no borders"
    buttonStyle: {
      primary: string;
      secondary: string;
      ghost: string;
      sizing: string;
    };
  };

  // === PAGES ===
  pages: PRDPage[];

  // === GLOBAL COMPONENTS ===
  globalComponents: {
    header: {
      style: string;
      sticky: boolean;
      transparent: boolean;
      logo: string;
      navItems: string[];
      ctaButton: string;
      mobileMenu: string;
      animation: string;
    };
    footer: {
      style: string;
      columns: Array<{
        title: string;
        links: string[];
      }>;
      socialLinks: string[];
      copyright: string;
      newsletter?: boolean;
    };
    chatbot: {
      enabled: boolean;
      position: string;
      triggerText: string;
      welcomeMessage: string;
      brandColor: string;
      avatar: string;
      suggestedQuestions: string[];
    };
    cookieBanner?: {
      enabled: boolean;
      text: string;
      style: string;
    };
  };

  // === FORMS ===
  forms: Array<{
    id: string;
    name: string;
    page: string; // Which page it appears on
    fields: Array<{
      name: string;
      type: string;
      placeholder: string;
      required: boolean;
      validation?: string;
    }>;
    submitButton: string;
    successMessage: string;
    style: string;
  }>;

  // === SEO STRATEGY ===
  seoStrategy: {
    primaryKeywords: string[];
    secondaryKeywords: string[];
    localSEO: boolean;
    schemaMarkup: string[];
    ogImage: string;
    twitterCard: string;
  };

  // === PERFORMANCE SPECS ===
  performanceSpecs: {
    targetLoadTime: string;
    lazyLoading: boolean;
    imageOptimization: string;
    caching: string;
    cdn: boolean;
  };

  // === IMAGE GENERATION PROMPTS ===
  imagePrompts: Array<{
    id: string;
    page: string;
    section: string;
    description: string;
    prompt: string; // Full AI image generation prompt
    dimensions: string;
    style: string;
  }>;

  // === TECH RECOMMENDATIONS ===
  techStack: {
    framework: string;
    styling: string;
    hosting: string;
    analytics: string;
    forms: string;
    chatbot: string;
  };

  // === LAUNCH CHECKLIST ===
  launchChecklist: string[];

  // === DATA SOURCES ===
  researchSources: string[];
}

export enum LeadStatus {
  SCOUTED = 'SCOUTED',
  ANALYZING = 'ANALYZING',
  DOSSIER_READY = 'DOSSIER_READY',
  STRATEGY_READY = 'STRATEGY_READY',
  SITE_BUILT = 'SITE_BUILT',
  OUTREACH_READY = 'OUTREACH_READY',
  CONTACTED = 'CONTACTED',
  CALLED = 'CALLED',
  REPLIED = 'REPLIED',
  CLOSED_WON = 'CLOSED_WON',
  CLOSED_LOST = 'CLOSED_LOST'
}

export interface OutreachConfig {
  sendGridApiKey: string;
  twilioAccountSid: string;
  twilioAuthToken: string;
  twilioFromNumber: string;
  senderEmail: string;
}

export interface VapiConfig {
  privateApiKey: string;
  publicApiKey: string;
  phoneNumberId: string;
}

export interface Settings {
  apiKey: string;
  scrapingBatchSize: number;
  niche: string;
  location: string;
  outreach: OutreachConfig;
  vapi: VapiConfig;
}

export interface EngineSession {
  id: string;
  name: string;
  createdAt: string;
  leads: Lead[];
}

// --- AGENT OPERATING SYSTEM TYPES ---

export interface AgentMandate {
  objective: string;
  nonGoals: string[];
  authority: 'advise' | 'decide' | 'execute';
}

export interface AgentResponsibility {
  id: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  severity: 'warn' | 'block';
  enabled: boolean;
}

export interface AgentOutputContract {
  allowedFormats: string[];
  requiredSections: string[];
  forbiddenPatterns: string[];
}

export interface AgentBehavior {
  creativity: number;
  verbosity: 'concise' | 'detailed' | 'verbose';
  tone: string;
}

export interface AgentVoiceConfig {
  voiceId: string;
  stability: number;
  similarityBoost: number;
  provider: '11labs' | 'playht' | 'deepgram';
}

export interface AgentProfile {
  id: string;
  name: string;
  role: 'designer' | 'copywriter' | 'strategist' | 'analyst';
  version: number;
  mandate: AgentMandate;
  responsibilities: AgentResponsibility[];
  outputContract: AgentOutputContract;
  behavior: AgentBehavior;
  voiceConfig?: AgentVoiceConfig;
  capabilities: string[];
  chaining: {
    nextAgentId: string;
    trigger: string;
  }[];
  memoryType: 'ephemeral' | 'persistent';
  stats: {
    projectsCompleted: number;
    avgSatisfaction: number;
  };
}

export interface Lead {
  id: string;
  name: string;
  type: string;
  address: string;
  rating?: number;
  userRatingCount?: number;
  website?: string;
  phone?: string;
  email?: string;
  status: LeadStatus;
  notes?: string;
  createdAt: string;
  ownerName?: string;
  ownerEmail?: string;
  businessCore?: string;
  revenueEstimate?: string;
  painPoints?: string[];
  propensityScore?: number;
  psychologyProfile?: string;
  competitors?: Competitor[];
  prd?: string;
  siteStructure?: { [filename: string]: string };
  generatedSiteCode?: string;
  outreachEmailSubject?: string;
  outreachEmailBody?: string;
  outreachSmsBody?: string;
  lastContactDate?: string;
  dealValue?: number;
  messages?: Message[];
  calls?: CallLog[];
}

export interface Message {
  id: string;
  sender: 'user' | 'lead';
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface CallLog {
  id: string;
  vapiCallId: string;
  status: 'queued' | 'ringing' | 'in-progress' | 'completed' | 'failed' | 'no-answer';
  durationSeconds: number;
  summary?: string;
  timestamp: string;
  recordingUrl?: string;
}

export interface Competitor {
  name: string;
  website: string;
  strengths: string[];
  weaknesses: string[];
  whyWinning: string;
}

export interface VaultDocument {
  id: string;
  title: string;
  type: 'research' | 'uploaded' | 'note';
  content: string; // Markdown content
  tags: string[];
  createdAt: string;
  sourceUrl?: string;
}
export interface SystemUsage {
  totalApiCalls: number;
  totalTokens: number;
  promptTokens: number;
  completionTokens: number;
  callsByModel: { [model: string]: number };
}

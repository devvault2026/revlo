# REVLO OS - Complete System Overview
**Version:** 1.0-CORE  
**Classification:** Multi-Agent Intelligence Platform for Lead-to-Launch Automation  
**Last Updated:** 2026-01-21

---

## 🎯 EXECUTIVE SUMMARY

**Revlo OS** is a state-of-the-art, AI-powered growth automation platform designed to transform raw business leads into fully deployed, high-value digital assets. The system leverages **custom multi-agent orchestration**, **real-time AI synthesis**, and **automated workflow chaining** to deliver $25,000+ value websites with minimal human intervention.

### Core Value Proposition
- **Input:** Business niche, location, and minimal lead data
- **Output:** Award-winning 5-7 page websites with custom content, strategy, and outreach—ready for deployment
- **Differentiation:** Autonomous intelligence nodes with specialized industry expertise, real-time streaming synthesis, and neural chain automation

---

## 🏗️ SYSTEM ARCHITECTURE

### Technology Stack
```
Frontend:     React 18 + TypeScript + Vite
Styling:      Tailwind CSS (Custom Design System)
State:        Zustand (Global State Management)
AI Core:      Google Gemini AI (gemini-3-flash-preview, gemini-3-pro-preview)
Motion:       Framer Motion (UI Animations)
Voice:        Vapi AI (Voice Intelligence)
Icons:        Lucide React
Routing:      React Router DOM
Markdown:     React Markdown + Remark GFM
Diagrams:     Mermaid.js
```

### Project Structure
```
revlo/
├── src/
│   ├── features/
│   │   └── revlo-os/
│   │       ├── components/          # All UI modules
│   │       ├── services/            # AI & external services
│   │       ├── context/             # React contexts
│   │       ├── types.ts             # TypeScript interfaces
│   │       ├── RevloOSLayout.tsx    # Main shell
│   │       └── store.ts             # Zustand store
│   ├── pages/
│   │   └── RevloOSAppPage.tsx       # Entry point
│   └── main.tsx
├── public/
└── package.json
```

---

## 📦 CORE MODULES (VIEWS)

### 1. **Dashboard View** (`DashboardView.tsx`)
**Purpose:** Mission Control - Real-time operational overview

**Features:**
- Live lead stream with recent activity
- System performance metrics (conversion rate, avg. satisfaction, total deployments)
- Quick-action tiles for critical workflows
- Ambient status indicators ("System Active")

**Data Sources:**
- `EngineSession[]` (active lead processing sessions)
- Aggregated analytics from all leads

---

### 2. **Lead Engine View** (`LeadEngineView.tsx`)
**Purpose:** The heart of the system—autonomous lead processing pipeline

**Workflow Stages:**
1. **Scout** → AI-powered lead discovery
2. **Deep Dive** → Competitive intelligence gathering
3. **PRD** → Product Requirements Document synthesis
4. **Build** → Multi-page website generation
5. **Deploy** → Asset compilation and outreach preparation

**Key Features:**
- **Auto-Orchestration:** Agent chaining for multi-step automation
- **AI Lead Scouting:** Niche/location-based prospect discovery
- **Competitor Analysis:** Uses Google Search to identify market gaps
- **PRD Editor:** Iterative refinement with Mermaid diagram support
- **Site Preview:** Live iframe rendering of generated websites
- **Neural Chain Handoffs:** Automatically triggers next agent based on completion triggers

**Agent Integration:**
- Respects agent `capabilities`, `chaining`, and `memoryType`
- Uses `compileAgentInstruction()` to inject agent personality into AI prompts

---

### 3. **Agent Studio View** (`AgentStudioView.tsx`)
**Purpose:** Intelligence Node Engineering Console

**Capabilities:**
- **Agent Creation/Editing:** Full CRUD for custom operatives
- **Configuration Tabs:**
  - **Identity (Mandate):** Define objectives, non-goals, authority level
  - **Protocol:** Manage responsibilities, output contracts, behavioral parameters
  - **Orchestration:** Configure neural chain synthesis (agent-to-agent handoffs)
  - **Sim Lab:** Real-time streaming test environment with live rendering

**Pre-Configured Master Agents:**
1. **Alpha (Real Estate):** Luxury property narratives, lead-capture systems
2. **Titan (Legal):** Corporate legal authority, practice area content
3. **Prime (Healthcare):** Patient confidence flows, treatment guides
4. **Zenith (Tech):** SaaS/Fintech platforms, product documentation
5. **Velvet (Hospitality):** Sensory boutique experiences, luxury storytelling

**Neural Studio Features:**
- **Split-Pane IDE Layout:** Controller panel + Dynamic workspace
- **Real-Time Streaming:** Token-by-token AI synthesis visualization
- **Auto-Pattern Detection:** Identifies valid HTML/CSS patterns
- **Live Rendering:** Instant iframe preview of generated code

---

### 4. **CRM View** (`CRMView.tsx`)
**Purpose:** Lead database management

**Features:**
- Grid display of all leads with status badges
- Industry filtering (Real Estate, Legal, Healthcare, Tech, Hospitality)
- Quick actions (view details, edit, delete)
- Status-based UI indicators (Scouting, Analyzing, Building, Ready)

**Data Model:**
```typescript
interface Lead {
  id: string;
  name: string;
  industry: string;
  location: string;
  businessCore: string;
  status: LeadStatus;
  createdAt: Date;
  competitors?: Competitor[];
  customSite?: { [filename: string]: string }; // Multi-page HTML
}
```

---

### 5. **Pipeline View** (`PipelineView.tsx`)
**Purpose:** Kanban-style lead progression tracking

**Stages:**
- New Leads
- Qualified
- Building
- Ready to Deploy
- Deployed

**Interactions:**
- Drag-and-drop between stages
- Status-based filtering
- Quick preview of lead details

---

### 6. **Inbox View** (`InboxView.tsx`)
**Purpose:** Unified communication hub

**Features:**
- **Message Threads:** Lead-specific conversations
- **Automated Messaging:** AI-generated email/SMS outreach
- **Integration Hooks:** Placeholder for CRM sync (Salesforce, HubSpot)

**Data Flow:**
- Messages linked to `Lead.id`
- Outreach generated via `generateOutreach()` in `geminiService.ts`

---

### 7. **Voice View** (`PhoneView.tsx`)
**Purpose:** Voice intelligence and call management

**Features:**
- **Vapi AI Integration:** Real-time voice synthesis
- Call logs with transcripts
- Voice assistant configuration

**Architecture:**
- Uses `@vapi-ai/web` SDK
- Stores call metadata in localStorage
- Links calls to lead records

---

### 8. **Vault View** (`VaultView.tsx`)
**Purpose:** Research intelligence repository

**Features:**
- Document library for strategic research
- AI-powered research synthesis (via `conductResearch()`)
- Categorized storage (Market Trends, Competitor Intel, etc.)

**Data Model:**
```typescript
interface VaultDocument {
  id: string;
  title: string;
  content: string; // Markdown
  tags: string[];
  createdAt: Date;
}
```

---

### 9. **Docs View** (`DocsView.tsx`)
**Purpose:** Internal operational documentation

**Features:**
- SOPs, training materials, technical guides
- Markdown rendering with Mermaid support
- Version control for documentation

---

### 10. **Settings View** (`SettingsView.tsx`)
**Purpose:** System configuration

**Settings:**
- **Google AI API Key:** Required for all AI operations
- **Vapi AI API Key:** Voice intelligence
- **Default Agent:** Fallback for unassigned tasks
- **Auto-Scout:** Toggle automated lead discovery

**Storage:** All settings persisted to `localStorage`

---

## 🤖 INTELLIGENT AGENT SYSTEM

### Agent Architecture

**Core Concept:** Agents are specialized AI personas with unique:
- **Mandates:** Primary objectives and non-goals
- **Responsibilities:** Task-level protocols with priority/severity
- **Output Contracts:** Allowed formats, required sections, forbidden patterns
- **Behaviors:** Creativity level, verbosity, tone signature
- **Capabilities:** Tools and skills (e.g., "Web Search", "Technical Spec Analysis")
- **Chaining:** Triggers for downstream agent activation
- **Memory Type:** Ephemeral (session-only) vs. Persistent (cross-session context)

### Agent Compilation Process

When an agent is used, `compileAgentInstruction()` generates a comprehensive system prompt:

```typescript
export const compileAgentInstruction = (agent: AgentProfile): string => {
  return `
    IDENTITY PROTOCOL:
    Designation: ${agent.name}
    Role Class: ${agent.role.toUpperCase()}
    Authority Level: ${agent.mandate.authority.toUpperCase()}
    Neural Persistence: ${agent.memoryType.toUpperCase()}
    
    CAPABILITY MATRIX:
    ${agent.capabilities.map(c => `- ${c}`).join('\n')}
    
    ORCHESTRATION CHAIN:
    ${agent.chaining.map(l => `- Trigger: "${l.trigger}" -> Deploy: ${l.nextAgentId}`).join('\n')}
    
    PRIMARY MANDATE:
    "${agent.mandate.objective}"
    
    [... full mandate, responsibilities, output contract, behaviors]
  `;
};
```

This prompt is injected into every Gemini AI call for that agent, ensuring consistent persona adherence.

---

## 🔄 END-TO-END LEAD WORKFLOW

### Full Pipeline Example

**Scenario:** User wants to build a site for a real estate agent in Miami

1. **Lead Engine → Scout**
   - User enters "Real Estate" + "Miami"
   - Clicks "Auto-Scout"
   - AI calls `scoutLeads()` → Returns 5 prospects
   - User selects "Jaryd Paquette - Luxury Waterfront Specialist"

2. **Deep Dive**
   - Clicks "Deep Dive"
   - AI calls `enrichLead()` → Extracts business core, unique value
   - AI calls `analyzeCompetitors()` → Identifies top 3 competitors
   - Results displayed in lead detail panel

3. **Generate PRD**
   - Clicks "Generate Strategy"
   - AI calls `createPRD()` with agent="Alpha (Real Estate)"
   - Returns full Markdown PRD with:
     - Executive Summary
     - Competitive Positioning
     - Feature Requirements
     - Mermaid user journey diagram
   - User can refine with `refinePRD()` for iterative improvements

4. **Build Website**
   - Clicks "Build Site"
   - AI calls `generateWebsiteCode()` with:
     - Agent's `outputContract.requiredSections` (e.g., Hero, Properties, Contact)
     - PRD context
     - $25,000 value constraint
   - Returns JSON of 5-7 HTML files:
     ```json
     {
       "index.html": "<!DOCTYPE html>...",
       "properties.html": "...",
       "about.html": "...",
       "contact.html": "...",
       "testimonials.html": "..."
     }
     ```
   - Files displayed in Site Preview iframe

5. **Neural Chain Handoff** (if configured)
   - Upon PRD completion, `triggerChain()` checks agent's `chaining` array
   - If trigger matches "On PRD Completion", activates next agent
   - Shows "Neural Handshake" toast
   - Next agent continues pipeline

6. **Deploy & Outreach**
   - Clicks "Deploy"
   - AI calls `generateOutreach()` → Creates email/SMS copy
   - System compiles all assets for delivery
   - Status updates to "Ready"

---

## 🧠 AI SERVICE LAYER (`geminiService.ts`)

### Key Functions

| Function | Purpose | Model | Tools |
|----------|---------|-------|-------|
| `scoutLeads()` | Discover leads by niche/location | gemini-3-flash | Google Search |
| `enrichLead()` | Extract business intelligence | gemini-3-flash | Google Search |
| `analyzeCompetitors()` | Competitive analysis | gemini-3-flash | Google Search |
| `createPRD()` | Generate Product Requirements Document | gemini-3-flash | None |
| `refinePRD()` | Iteratively improve PRD | gemini-3-flash | None |
| `generateWebsiteCode()` | Multi-page website synthesis | gemini-3-flash | None (JSON mode) |
| `editWebsiteElement()` | Edit existing HTML | gemini-3-flash | None |
| `generateOutreach()` | Email/SMS copywriting | gemini-3-flash | None (JSON mode) |
| `streamTestAgent()` | Real-time agent testing | gemini-3-flash | None (Streaming) |
| `conductResearch()` | Research synthesis | gemini-3-pro | Google Search |

### Agent Integration Pattern

All AI functions accept an optional `agent?: AgentProfile` parameter:

```typescript
const systemInstruction = agent 
  ? compileAgentInstruction(agent) 
  : "Act as a Senior Strategist.";

const response = await ai.models.generateContent({
  model: "gemini-3-flash-preview",
  contents: prompt,
  config: { systemInstruction }
});
```

This ensures every AI interaction is **persona-aware**.

---

## 🎨 DESIGN SYSTEM

### Theme: "Mission Purple" Lights-Only Branding

**Core Principles:**
- **Zero Dark Backgrounds:** All UI surfaces use light tones (white, slate-50, purple-50)
- **Mission Purple Accents:** `bg-purple-600`, `text-purple-600` for primary actions
- **Glassomorphism:** `backdrop-blur-md`, `bg-white/90` for premium layering
- **High-Performance Micro-Animations:** Framer Motion for every interaction
- **Tactical Typography:** `font-black`, `uppercase`, `tracking-widest`

### Key UI Patterns

**Status Indicators:**
```tsx
<div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-full">
  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
  <span className="text-[10px] font-black text-purple-700 uppercase tracking-widest">
    System Active
  </span>
</div>
```

**Notification Bell:**
```tsx
<button className="relative p-2.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-xl">
  <Bell className="w-5 h-5" />
  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-purple-600 border-2 border-white rounded-full animate-pulse" />
</button>
```

**Mac-Style Window Chrome:**
```tsx
<div className="h-12 bg-slate-50/80 backdrop-blur-md border-b border-slate-100 flex items-center px-5 gap-4">
  <div className="flex gap-2">
    <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
    <div className="w-3 h-3 rounded-full bg-[#28C840]" />
  </div>
</div>
```

---

## 🔐 DATA PERSISTENCE

### Storage Strategy

**Current:** `localStorage` (all data client-side)

**Stored Data:**
```typescript
localStorage['revamp_settings']      // Settings
localStorage['revamp_sessions']      // EngineSession[]
localStorage['revamp_agents']        // AgentProfile[]
localStorage['revamp_vaultDocs']     // VaultDocument[]
localStorage['vapi_calls']           // CallLog[]
```

**Future Integration Points:**
- Supabase for multi-user persistence
- PostgreSQL for relational data
- S3/CDN for static asset hosting

---

## ⚡ PERFORMANCE OPTIMIZATIONS

1. **Zustand Store:** Minimal re-renders via selective subscriptions
2. **Lazy Loading:** Code splitting for heavy modules (Mermaid, Monaco)
3. **AI Streaming:** Real-time token delivery reduces perceived latency
4. **Iframe Sandboxing:** `allow-scripts allow-forms allow-same-origin` for secure previews
5. **Animation Budget:** Framer Motion with `layoutId` for shared element transitions

---

## 🚀 DEPLOYMENT ARCHITECTURE

### Current Setup
```
Development:  npm run dev (Vite dev server)
Build:        npm run build (TypeScript + Vite production bundle)
Preview:      npm run preview (Local production server)
```

### Production Deployment (Recommended)
- **Vercel/Netlify:** Zero-config hosting for React apps
- **Environment Variables:** 
  - `VITE_GEMINI_API_KEY` (optional, if not using localStorage)
  - `VITE_VAPI_API_KEY`

---

## 🧪 TESTING & DEBUGGING

### Agent Sim Lab
- **Purpose:** Isolated agent testing without lead context
- **Features:**
  - Real-time streaming synthesis
  - Live rendering for HTML output
  - Terminal-style code preview
  - Auto-pattern detection

### Debug Tools
- **Browser DevTools:** React DevTools extension recommended
- **Console Logging:** All AI service calls log to console
- **Toast Notifications:** User-facing feedback for all critical operations

---

## 📊 ANALYTICS & METRICS

### Tracked Metrics (Dashboard)
- **Total Deployments:** Count of leads with status="Ready"
- **Conversion Rate:** (Deployed / Total Leads) * 100
- **Avg. Satisfaction:** Mean of all `lead.satisfactionScore`
- **Active Sessions:** Live EngineSession count

### Future Enhancements
- Time-to-deploy tracking
- Per-agent performance analytics
- Revenue attribution (if integrated with payments)

---

## 🔮 ROADMAP & FUTURE FEATURES

### Planned Enhancements

1. **Multi-User Support**
   - Authentication (Clerk, Auth0)
   - Role-based access control (Admin, Agent, Viewer)

2. **Supabase Integration**
   - Real-time collaborative editing
   - Centralized lead database
   - File storage for generated assets

3. **Advanced Agent Features**
   - Custom tool integration (Zapier, Make)
   - Memory graph persistence (cross-session context)
   - Agent marketplace (community-shared operatives)

4. **Deployment Automation**
   - One-click Vercel/Netlify deployment
   - Custom domain management
   - SSL certificate automation

5. **Billing & Monetization**
   - Usage-based pricing
   - White-label licensing
   - Enterprise multi-tenant architecture

---

## 🛡️ SECURITY CONSIDERATIONS

### Current State
- **API Key Storage:** localStorage (client-side only)
- **No Authentication:** Open access (demo mode)

### Production Requirements
1. **API Key Management:** Move to secure backend proxy
2. **User Authentication:** Implement OAuth 2.0
3. **Rate Limiting:** Protect AI endpoints from abuse
4. **Data Encryption:** Encrypt sensitive lead data at rest

---

## 📚 KEY DEPENDENCIES

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | 18.2.0 | UI library |
| `@google/genai` | 1.38.0 | Gemini AI SDK |
| `framer-motion` | 11.0.0 | Animations |
| `zustand` | 4.5.0 | State management |
| `lucide-react` | 0.562.0 | Icons |
| `mermaid` | 11.12.2 | Diagram rendering |
| `react-markdown` | 10.1.0 | Markdown rendering |
| `@vapi-ai/web` | 2.5.2 | Voice AI |

---

## 🎓 LEARNING RESOURCES

### For Developers
- **Gemini AI Docs:** https://ai.google.dev/
- **Framer Motion:** https://www.framer.com/motion/
- **Zustand Guide:** https://zustand-demo.pmnd.rs/

### For Users
- **Agent Configuration Best Practices:** See `AgentStudioView.tsx` examples
- **PRD Refinement Tips:** Use specific, actionable instructions
- **Workflow Chaining:** Design triggers based on completion states

---

## 🐛 KNOWN ISSUES & LIMITATIONS

1. **No Persistent Storage:** Data lost on browser refresh (use localStorage export/import)
2. **Client-Side AI Keys:** Not production-ready (implement backend proxy)
3. **No Undo/Redo:** Lead edits are permanent
4. **Limited Error Handling:** AI failures may require manual retry
5. **No Multi-Page Site Editor:** Can only edit individual HTML files

---

## 🤝 CONTRIBUTION GUIDELINES

### Code Standards
- **TypeScript Strict Mode:** All `.ts` and `.tsx` files
- **Tailwind-Only Styling:** No inline styles or CSS modules
- **Component Naming:** PascalCase for files, camelCase for instances
- **Function Comments:** JSDoc for all exported functions

### Git Workflow
1. Feature branches: `feature/agent-chaining-v2`
2. Commit messages: "feat: implement neural stream protocol"
3. PR reviews required for core modules

---

## 📞 SUPPORT & COMMUNITY

- **GitHub Issues:** Bug reports and feature requests
- **Discord:** Community discussions (coming soon)
- **Email:** support@revlo.agency (placeholder)

---

## ✅ SYSTEM HEALTH CHECKLIST

Before production deployment, verify:

- [ ] All API keys configured in environment
- [ ] Agent prompts tested for edge cases
- [ ] UI tested on mobile, tablet, desktop
- [ ] AI streaming works in production build
- [ ] All localStorage data can be exported
- [ ] Error boundaries implemented
- [ ] Performance profiling complete (Lighthouse score >90)
- [ ] Security audit completed (OWASP Top 10)

---

## 🏁 CONCLUSION

**Revlo OS** represents a paradigm shift in growth automation, combining:
- **Multi-agent orchestration** for specialized expertise
- **Real-time AI synthesis** for immediate feedback
- **Neural chain automation** for hands-off workflows
- **State-of-the-art UI/UX** for premium user experience

The system is currently in **MVP** state, ready for:
- Beta user testing
- Enterprise pilot programs
- Integration with production backend infrastructure

**Next Critical Path:** Implement Supabase integration and multi-user authentication for production readiness.

---

**Document Version:** 1.0  
**Last Updated:** 2026-01-21  
**Maintained By:** Revlo Engineering Team

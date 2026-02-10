import React, { useState, useRef } from 'react';
import { Search, Loader2, Zap, AlertTriangle, Download, Terminal, ChevronRight } from 'lucide-react';
import LeadResult from './components/LeadResult';
import KnowledgePanel from './components/KnowledgePanel';
import LiveCoach from './components/LiveCoach';
import { streamLeads, deepScanLead } from './services/geminiService';
import { Lead, AppState } from './types';

// Revlo Logo Component
const RevloLogo = ({ size = "large" }: { size?: "small" | "large" }) => (
  <div className={`flex items-center select-none ${size === "large" ? "mb-8 flex-col" : "mr-4"}`}>
    <div className="flex items-center gap-4">
      <div className={`relative flex items-center justify-center bg-black border-2 border-white rounded-2xl font-display font-black italic tracking-tighter ${size === "large" ? "w-16 h-16 text-3xl" : "w-10 h-10 text-xl"}`}>
        <span className="text-white relative z-10">R</span>
      </div>
      {(size === "small" || size === "large") && (
        <div className={`flex items-center font-display font-black italic text-white tracking-tighter ${size === "large" ? "text-6xl" : "text-2xl"}`}>
          REVLO
          <span className={`ml-2 font-sans font-bold not-italic text-slate-500 uppercase tracking-[0.3em] ${size === "large" ? "text-sm mt-3" : "text-[10px] mt-1"}`}>
            SCOUT
          </span>
        </div>
      )}
    </div>
    {size === "large" && (
      <div className="text-center mt-4">
        <p className="text-slate-500 tracking-[0.4em] text-[10px] uppercase font-black">Global AI Growth Intelligence</p>
      </div>
    )}
  </div>
);

function App() {
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState<number>(10);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isCoaching, setIsCoaching] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const listEndRef = useRef<HTMLDivElement>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setAppState(AppState.SEARCHING);
    setIsStreaming(true);
    setLeads([]);
    setSelectedLead(null);
    setErrorMsg(null);

    try {
      const leadGenerator = streamLeads(query, limit);
      let count = 0;
      for await (const lead of leadGenerator) {
        setAppState(AppState.RESULTS);
        setLeads(prev => [...prev, lead]);
        if (count === 0) setSelectedLead(lead);
        count++;
      }
    } catch (err: any) {
      console.error(err);
      if (leads.length === 0) {
        setAppState(AppState.ERROR);
        setErrorMsg(err.message || "Connection terminated.");
      }
    } finally {
      setIsStreaming(false);
    }
  };

  const handleDeepScan = async (lead: Lead) => {
    try {
      const enrichedData = await deepScanLead(lead);
      const updatedLead = { ...lead, ...enrichedData };
      setLeads(prev => prev.map(l => l.id === lead.id ? updatedLead : l));
      setSelectedLead(updatedLead);
    } catch (e) {
      console.error("Deep scan failed ui", e);
    }
  };

  const exportToCSV = () => {
    if (leads.length === 0) return;
    const headers = ["Business Name", "Industry", "Location", "Owner", "Phone", "Email", "Website", "Score", "GMB Status", "Pitch", "Socials"];
    const rows = leads.map(l => [
      `"${l.businessName}"`,
      `"${l.industry}"`,
      `"${l.location}"`,
      `"${l.estimatedOwnerName}"`,
      `"${l.phoneNumber}"`,
      `"${l.email || ''}"`,
      `"${l.website || ''}"`,
      l.leadScore,
      `"${l.gmbStatus}"`,
      `"${l.suggestedPitch.replace(/"/g, '""')}"`,
      `"${(l.socialProfiles || []).join(', ')}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `revlo_scout_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-revlo-bg text-revlo-text selection:bg-revlo-primary selection:text-white">

      {/* Home State */}
      {appState === AppState.IDLE && (
        <div className="flex-1 flex flex-col items-center justify-center p-4 -mt-10 relative overflow-hidden">
          {/* Background Ambient Effects */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-revlo-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

          <RevloLogo />

          <form onSubmit={handleSearch} className="w-full max-w-[700px] relative z-10">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-revlo-primary to-revlo-secondary rounded-lg opacity-50 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex items-center bg-[#0F0F11] rounded-lg">
                <div className="pl-4 text-gray-500">
                  <Terminal className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full h-[56px] pl-4 pr-32 bg-transparent text-white placeholder-gray-600 focus:outline-none font-mono text-sm"
                  placeholder="ENTER TARGET PARAMETERS (e.g. 'Roofers in Miami')"
                />
                <div className="absolute right-2 flex items-center">
                  <select
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                    className="bg-[#18181B] text-xs text-gray-400 border border-gray-700 rounded px-2 py-1 mr-2 focus:outline-none focus:border-revlo-primary"
                  >
                    <option value={10}>10 Targets</option>
                    <option value={25}>25 Targets</option>
                    <option value={50}>50 Targets</option>
                    <option value={100}>100 Targets</option>
                  </select>
                  <button type="submit" className="bg-white text-black p-2 rounded hover:bg-gray-200 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-4 justify-center">
              <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-widest">
                <Zap className="w-3 h-3 text-revlo-secondary" />
                <span>AI Powered Analysis</span>
              </div>
              <div className="w-px h-3 bg-gray-800"></div>
              <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-widest">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span>System Online</span>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Results State */}
      {(appState === AppState.SEARCHING || appState === AppState.RESULTS || appState === AppState.ERROR) && (
        <div className="flex-1 flex flex-col h-screen overflow-hidden bg-revlo-bg">
          {/* Header */}
          <header className="h-[80px] border-b border-revlo-border flex items-center px-6 sticky top-0 bg-[#050505]/90 backdrop-blur z-20 shrink-0">
            <div className="cursor-pointer flex items-center" onClick={() => { setAppState(AppState.IDLE); setQuery(''); setLeads([]); }}>
              <RevloLogo size="small" />
            </div>

            <form onSubmit={handleSearch} className="flex-1 max-w-[600px] relative ml-8 hidden sm:block">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-[40px] pl-4 pr-12 rounded bg-[#0F0F11] border border-gray-800 focus:border-revlo-primary focus:outline-none text-sm text-white placeholder-gray-600 font-mono transition-colors"
              />
              <button type="submit" className="absolute right-0 top-0 h-full px-4 text-gray-400 hover:text-white">
                {isStreaming ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              </button>
            </form>

            <div className="ml-auto flex items-center gap-4">
              {leads.length > 0 && (
                <button
                  onClick={exportToCSV}
                  className="flex items-center gap-2 px-4 py-2 bg-[#0F0F11] border border-gray-800 text-gray-300 rounded text-xs font-medium hover:border-revlo-primary hover:text-white transition-all uppercase tracking-wide"
                >
                  <Download className="w-3 h-3" />
                  Export Data
                </button>
              )}
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 flex overflow-hidden">

            {/* Left: SERP */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 max-w-[900px] mx-auto scroll-smooth w-full">
              {appState === AppState.SEARCHING && leads.length === 0 ? (
                <div className="flex flex-col items-start pt-12 w-full">
                  <div className="flex items-center gap-3 mb-6 text-revlo-primary">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span className="font-mono text-sm tracking-widest">INITIALIZING SCAN SEQUENCE FOR "{query.toUpperCase()}"...</span>
                  </div>
                  {/* Dark Skeleton UI */}
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-full mb-6 opacity-50">
                      <div className="h-24 bg-[#0F0F11] rounded border border-gray-800 animate-pulse"></div>
                    </div>
                  ))}
                </div>
              ) : appState === AppState.ERROR ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500 px-4 text-center border border-red-900/20 bg-red-900/5 rounded-lg m-8">
                  <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
                  <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-2">Scan Terminated</h3>
                  <p className="text-sm max-w-md font-mono text-red-400">
                    {errorMsg || "Connection to intelligence network failed."}
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-6 px-6 py-2 bg-red-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-red-700"
                  >
                    Retry Sequence
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6 border-b border-gray-800 pb-2">
                    <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                      Targets Identified: {leads.length} // Time: {isStreaming ? 'CALCULATING...' : `${leads.length * 0.12}s`}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {leads.map((lead, idx) => (
                      <div key={lead.id} className="animate-in slide-in-from-bottom-2 fade-in duration-500" style={{ animationDelay: `${idx * 0.05}s` }}>
                        <LeadResult
                          lead={lead}
                          isSelected={selectedLead?.id === lead.id}
                          onSelect={setSelectedLead}
                        />
                      </div>
                    ))}

                    {isStreaming && (
                      <div className="py-8 flex justify-center">
                        <div className="flex items-center gap-3 px-4 py-2 bg-[#0F0F11] border border-revlo-primary/30 rounded-full text-revlo-primary text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(139,92,246,0.1)]">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Processing Neural Stream...
                        </div>
                      </div>
                    )}
                    <div ref={listEndRef} />
                  </div>
                </>
              )}
            </div>

            {/* Right: Knowledge Panel */}
            <KnowledgePanel
              lead={selectedLead}
              onClose={() => setSelectedLead(null)}
              onStartCoach={() => setIsCoaching(true)}
              onDeepScan={handleDeepScan}
            />
          </div>
        </div>
      )}

      {/* Live Coach Overlay */}
      {isCoaching && selectedLead && (
        <LiveCoach
          businessName={selectedLead.businessName}
          onClose={() => setIsCoaching(false)}
        />
      )}
    </div>
  );
}

export default App;
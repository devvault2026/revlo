import React from 'react';
import { Lead } from '../types';
import { X, Copy, CheckCircle, Zap, Phone } from 'lucide-react';

interface PitchModalProps {
  lead: Lead | null;
  onClose: () => void;
}

const PitchModal: React.FC<PitchModalProps> = ({ lead, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!lead) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(lead.suggestedPitch);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="glass-panel w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-fadeIn">
        
        {/* Header */}
        <div className="sticky top-0 z-10 p-6 border-b border-white/10 bg-slate-900/95 flex justify-between items-center backdrop-blur-md">
           <div>
             <h2 className="text-2xl font-bold text-white flex items-center gap-2">
               <Zap className="w-6 h-6 text-yellow-400" />
               Strategy & Pitch
             </h2>
             <p className="text-sm text-slate-400">Target: {lead.businessName}</p>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
             <X className="w-6 h-6 text-slate-400" />
           </button>
        </div>

        <div className="p-6 space-y-8">
          
          {/* Analysis Section */}
          <div className="space-y-3">
            <h3 className="text-sm uppercase tracking-wider text-slate-500 font-bold">Digital Audit</h3>
            <div className="p-4 rounded-lg bg-slate-800/50 border border-white/5">
              <p className="text-slate-300 leading-relaxed">
                {lead.onlinePresenceAnalysis}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                 <div className="p-3 bg-black/20 rounded border border-white/5">
                    <span className="text-xs text-slate-500 block">Website Status</span>
                    <span className={`font-semibold ${!lead.website ? 'text-red-400' : 'text-slate-200'}`}>
                        {lead.website ? 'Active' : 'Missing / Broken'}
                    </span>
                 </div>
                 <div className="p-3 bg-black/20 rounded border border-white/5">
                    <span className="text-xs text-slate-500 block">GMB Health</span>
                    <span className="font-semibold text-slate-200">{lead.gmbStatus}</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Pitch Section */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
                <h3 className="text-sm uppercase tracking-wider text-primary font-bold">Generated Cold Call Script</h3>
                <button 
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  {copied ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copied' : 'Copy Script'}
                </button>
            </div>
            
            <div className="p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-primary/20 relative group">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary rounded-l-xl"></div>
              <pre className="whitespace-pre-wrap font-sans text-lg text-slate-200 leading-relaxed">
                {lead.suggestedPitch}
              </pre>
            </div>
            <p className="text-xs text-slate-500 italic text-center">
                *This script is auto-generated based on the business's specific digital weaknesses.*
            </p>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-white/10 flex gap-4">
             <button onClick={onClose} className="flex-1 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold transition-colors">
               Close Analysis
             </button>
             <a href={`tel:${lead.phoneNumber}`} className="flex-1 py-3 rounded-lg bg-primary hover:bg-blue-600 text-white font-semibold flex justify-center items-center gap-2 transition-colors shadow-lg shadow-blue-500/20">
               <Phone className="w-5 h-5" />
               Call Now
             </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PitchModal;
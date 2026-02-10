import React, { useState } from 'react';
import { Lead } from '../types';
import { Phone, Globe, ShieldAlert, Zap, Mic, Mail, Facebook, Instagram, Linkedin, Link as LinkIcon, ScanSearch, Loader2, X } from 'lucide-react';

interface KnowledgePanelProps {
  lead: Lead | null;
  onClose: () => void;
  onStartCoach: () => void;
  onDeepScan: (lead: Lead) => Promise<void>;
}

const KnowledgePanel: React.FC<KnowledgePanelProps> = ({ lead, onClose, onStartCoach, onDeepScan }) => {
  const [isScanning, setIsScanning] = useState(false);

  if (!lead) return null;

  const handleDeepScan = async () => {
    setIsScanning(true);
    await onDeepScan(lead);
    setIsScanning(false);
  };

  const getSocialIcon = (url: string) => {
    if (url.includes('facebook')) return <Facebook className="w-4 h-4 text-blue-500" />;
    if (url.includes('instagram')) return <Instagram className="w-4 h-4 text-pink-500" />;
    if (url.includes('linkedin')) return <Linkedin className="w-4 h-4 text-blue-400" />;
    return <LinkIcon className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="w-full lg:w-[420px] bg-[#0A0A0C] border-l border-revlo-border h-[calc(100vh-80px)] overflow-y-auto hidden md:block animate-in slide-in-from-right duration-300">
      
      {/* Header Image / Status */}
      <div className="h-32 bg-[#121214] relative overflow-hidden">
        <div className="absolute inset-0 bg-revlo-glow opacity-30"></div>
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 bg-black/50 text-white rounded-full hover:bg-white/20">
            <X className="w-4 h-4" />
        </button>

        {lead.leadScore > 80 && (
            <div className="absolute bottom-4 left-4 bg-gradient-to-r from-red-600 to-orange-600 text-white text-[10px] font-bold px-3 py-1 rounded-sm shadow-lg tracking-widest uppercase font-display">
                High Priority Target
            </div>
        )}
      </div>

      <div className="p-6">
        <h2 className="text-3xl font-display font-bold text-white mb-1 uppercase tracking-tight">{lead.businessName}</h2>
        <span className="text-gray-400 text-sm font-light tracking-wide">{lead.industry} • {lead.location}</span>

        {/* Action Grid */}
        <div className="grid grid-cols-4 gap-2 my-8">
          <a href={`tel:${lead.phoneNumber}`} className="flex flex-col items-center gap-2 group p-2 rounded hover:bg-white/5 transition-colors">
             <div className="w-10 h-10 rounded-lg border border-gray-700 bg-[#18181B] flex items-center justify-center group-hover:border-revlo-primary group-hover:text-revlo-primary text-gray-300 transition-all">
               <Phone className="w-5 h-5" />
             </div>
             <span className="text-[10px] uppercase tracking-wider text-gray-500">Call</span>
          </a>
          
          <button onClick={() => window.open(lead.website || '#', '_blank')} disabled={!lead.website} className="flex flex-col items-center gap-2 group p-2 rounded hover:bg-white/5 transition-colors disabled:opacity-30">
             <div className="w-10 h-10 rounded-lg border border-gray-700 bg-[#18181B] flex items-center justify-center group-hover:border-blue-500 group-hover:text-blue-500 text-gray-300 transition-all">
               <Globe className="w-5 h-5" />
             </div>
             <span className="text-[10px] uppercase tracking-wider text-gray-500">Web</span>
          </button>

          <button onClick={onStartCoach} className="flex flex-col items-center gap-2 group p-2 rounded hover:bg-white/5 transition-colors">
             <div className="w-10 h-10 rounded-lg border border-gray-700 bg-[#18181B] flex items-center justify-center group-hover:border-revlo-secondary group-hover:text-revlo-secondary text-gray-300 transition-all">
               <Mic className="w-5 h-5" />
             </div>
             <span className="text-[10px] uppercase tracking-wider text-gray-500">Coach</span>
          </button>

           <button onClick={handleDeepScan} disabled={isScanning} className="flex flex-col items-center gap-2 group p-2 rounded hover:bg-white/5 transition-colors">
             <div className="w-10 h-10 rounded-lg border border-gray-700 bg-[#18181B] flex items-center justify-center group-hover:border-white group-hover:text-white text-gray-300 transition-all">
               {isScanning ? <Loader2 className="w-5 h-5 animate-spin text-white" /> : <ScanSearch className="w-5 h-5" />}
             </div>
             <span className="text-[10px] uppercase tracking-wider text-gray-500">Deep Scan</span>
          </button>
        </div>

        {/* Data Sections */}
        <div className="space-y-6">
            
            {/* Contact Intel */}
            <div className="border border-white/5 bg-[#121214] p-4 rounded-lg">
                <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4 font-bold">Contact Intelligence</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                         <span className="text-sm text-gray-400">Email Status</span>
                         {lead.email ? (
                            <a href={`mailto:${lead.email}`} className="text-sm text-revlo-primary hover:text-white transition-colors">{lead.email}</a>
                         ) : (
                            <span className="text-sm text-red-500 font-mono">NOT FOUND</span>
                         )}
                    </div>
                    {lead.socialProfiles && lead.socialProfiles.length > 0 && (
                        <div className="flex items-center justify-between pt-2 border-t border-white/5">
                            <span className="text-sm text-gray-400">Social Graph</span>
                            <div className="flex gap-2">
                                {lead.socialProfiles.map((url, i) => (
                                <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="p-1.5 bg-gray-800 rounded hover:bg-gray-700 transition-colors">
                                    {getSocialIcon(url)}
                                </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Vulnerabilities */}
            <div>
                <h3 className="text-xs uppercase tracking-widest text-revlo-secondary mb-3 font-bold flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4" /> Detected Vulnerabilities
                </h3>
                <div className="space-y-2">
                    {lead.painPoints.map((point, i) => (
                    <div key={i} className="text-sm text-gray-300 bg-red-500/10 border border-red-500/20 p-3 rounded flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 shadow-[0_0_8px_red]"></span>
                        {point}
                    </div>
                    ))}
                </div>
            </div>

            {/* Pitch */}
            <div>
                <h3 className="text-xs uppercase tracking-widest text-revlo-primary mb-3 font-bold flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Attack Vector (Pitch)
                </h3>
                <div className="bg-[#121214] p-5 rounded-lg border border-white/5 relative group">
                    <p className="text-sm text-gray-300 italic leading-relaxed font-serif">"{lead.suggestedPitch}"</p>
                    <button 
                        onClick={() => navigator.clipboard.writeText(lead.suggestedPitch)}
                        className="absolute top-2 right-2 text-[10px] uppercase bg-revlo-primary text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        Copy
                    </button>
                </div>
            </div>

            {/* Owner */}
            <div className="pt-4 border-t border-white/5 flex justify-between items-end">
                <div>
                    <h3 className="text-[10px] uppercase tracking-widest text-gray-600 mb-1">Decision Maker</h3>
                    <p className="text-lg text-white font-display font-medium">{lead.estimatedOwnerName}</p>
                </div>
                <div className="text-right">
                    <h3 className="text-[10px] uppercase tracking-widest text-gray-600 mb-1">Direct Line</h3>
                    <p className="text-lg text-white font-mono">{lead.phoneNumber}</p>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default KnowledgePanel;
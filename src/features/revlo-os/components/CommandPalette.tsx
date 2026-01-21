
import React, { useState, useEffect, useRef } from 'react';
import { Search, Globe, Command, Loader2, ArrowRight } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onCommand: (type: 'scout' | 'research' | 'nav', payload: any) => Promise<void>;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onCommand }) => {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'Enter' && input.trim()) {
      setIsProcessing(true);
      
      const lower = input.toLowerCase();

      // Scout Pattern: "Find [number] [niche] in [location]"
      const scoutMatch = input.match(/find (\d+) (.*) in (.*)/i);
      
      // Research Pattern: "Research [topic]" or "Find research on [topic]"
      const researchMatch = input.match(/(?:research|find research on|find info on) (.*)/i);

      try {
        if (scoutMatch) {
          const limit = parseInt(scoutMatch[1]);
          const niche = scoutMatch[2];
          const location = scoutMatch[3];
          await onCommand('scout', { limit, niche, location });
          onClose();
        } else if (researchMatch) {
          const topic = researchMatch[1];
          await onCommand('research', { topic });
          onClose();
        } else if (lower.includes('dashboard')) {
             await onCommand('nav', 'dashboard'); onClose();
        } else if (lower.includes('engine')) {
             await onCommand('nav', 'engine'); onClose();
        } else if (lower.includes('vault')) {
             await onCommand('nav', 'vault'); onClose();
        } else {
             // Default fallback: General Scout
             // If query looks like a location/niche pair
             await onCommand('scout', { limit: 5, niche: input, location: 'Global' }); // Fallback
             onClose();
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsProcessing(false);
        setInput('');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] bg-slate-950/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center px-4 border-b border-slate-800">
          <Command className="text-slate-500 mr-3" size={20} />
          <input 
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 h-16 bg-transparent text-lg text-white placeholder-slate-500 focus:outline-none"
            placeholder="Find 5 roofers in Austin... or Research AI trends..."
          />
          {isProcessing && <Loader2 className="animate-spin text-accent-500" size={20} />}
        </div>
        
        {!isProcessing && !input && (
          <div className="p-4 bg-slate-950/50">
            <div className="text-xs font-bold text-slate-500 uppercase mb-2 ml-2">Quick Actions</div>
            <div className="grid grid-cols-2 gap-2">
               <div className="p-2 hover:bg-slate-800 rounded flex items-center cursor-pointer text-slate-400 hover:text-white transition-colors">
                  <Globe size={16} className="mr-2 text-blue-500"/> Find 10 Dentists in Miami
               </div>
               <div className="p-2 hover:bg-slate-800 rounded flex items-center cursor-pointer text-slate-400 hover:text-white transition-colors">
                  <Search size={16} className="mr-2 text-purple-500"/> Research Competitors
               </div>
            </div>
            <div className="mt-4 flex justify-between px-2 text-[10px] text-slate-600">
                <span><strong className="text-slate-500">Enter</strong> to execute</span>
                <span><strong className="text-slate-500">Esc</strong> to close</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommandPalette;

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, X, ArrowRight, Zap, Bot, Database, Briefcase, Phone, Book } from 'lucide-react';

interface CommandAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  shortcut?: string;
  category: string;
  onExecute: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: any) => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onNavigate }) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const actions: CommandAction[] = [
    { id: 'dash', title: 'Open Dashboard', description: 'Real-time overview of operations', icon: <Zap className="w-4 h-4" />, category: 'Navigation', onExecute: () => onNavigate('dashboard') },
    { id: 'engine', title: 'Ignite Lead Engine', description: 'Scout new prospects and niches', icon: <Briefcase className="w-4 h-4" />, category: 'Navigation', onExecute: () => onNavigate('engine') },
    { id: 'agents', title: 'Agent Studio', description: 'Configure AI operative logic', icon: <Bot className="w-4 h-4" />, category: 'Navigation', onExecute: () => onNavigate('agents') },
    { id: 'crm', title: 'View Database', description: 'Manage enriched lead records', icon: <Database className="w-4 h-4" />, category: 'Navigation', onExecute: () => onNavigate('crm') },
    { id: 'phone', title: 'Voice Command', description: 'Initialize VAPI outbound calls', icon: <Phone className="w-4 h-4" />, category: 'Navigation', onExecute: () => onNavigate('phone') },
    { id: 'docs', title: 'Research Vault', description: 'Access operational documentation', icon: <Book className="w-4 h-4" />, category: 'Navigation', onExecute: () => onNavigate('docs') },
  ];

  const filteredActions = actions.filter(action =>
    action.title.toLowerCase().includes(search.toLowerCase()) ||
    action.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredActions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredActions.length) % filteredActions.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredActions[selectedIndex]) {
          filteredActions[selectedIndex].onExecute();
          onClose();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredActions, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="fixed inset-0 bg-slate-400/15 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="w-full max-w-xl bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[3rem] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.1)] overflow-hidden relative saturate-150"
          >
            {/* Search Bar */}
            <div className="flex items-center px-10 py-8 border-b border-white/40 bg-white/20">
              <Search className="w-5 h-5 text-slate-500 mr-4" />
              <input
                ref={inputRef}
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Execute command or research..."
                className="flex-1 bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none font-black text-2xl tracking-tighter"
              />
              <div className="flex items-center gap-1.5 px-3 py-1 bg-white/60 rounded-xl border border-white/50 shadow-sm">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ESC</span>
              </div>
            </div>

            {/* Actions List */}
            <div className="max-h-[480px] overflow-y-auto p-5 custom-scrollbar">
              {filteredActions.length > 0 ? (
                <div className="space-y-2">
                  {filteredActions.map((action, index) => (
                    <button
                      key={action.id}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        action.onExecute();
                        onClose();
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center p-5 rounded-[2.5rem] transition-all text-left group relative ${selectedIndex === index
                        ? 'bg-white/95 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] translate-x-1 border border-white/80 ring-1 ring-black/[0.03]'
                        : 'text-slate-500 hover:bg-white/20 hover:text-slate-900 border border-transparent'
                        }`}
                    >
                      <div className={`p-3.5 rounded-2xl mr-5 transition-all shadow-sm ${selectedIndex === index
                        ? 'bg-purple-600 text-white scale-110 shadow-xl shadow-purple-200'
                        : 'bg-white/40 border border-white/50 text-slate-400 group-hover:text-purple-600 group-hover:bg-white group-hover:scale-105'
                        }`}>
                        {React.cloneElement(action.icon as React.ReactElement, { size: 20 })}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`font-black text-sm uppercase tracking-widest ${selectedIndex === index ? 'text-slate-900' : 'text-slate-500 opacity-60'}`}>
                          {action.title}
                        </div>
                        <div className={`text-[11px] font-bold truncate mt-1 ${selectedIndex === index ? 'text-purple-600 opacity-80' : 'text-slate-400 opacity-40'}`}>
                          {action.description}
                        </div>
                      </div>
                      <div className={`transition-all duration-500 ${selectedIndex === index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                        <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center border border-slate-100 shadow-sm">
                          <ChevronRightIcon className="w-4 h-4 text-purple-600" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-24 text-center">
                  <div className="w-20 h-20 bg-white/60 backdrop-blur-md rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border border-white shadow-inner">
                    <X className="w-10 h-10 text-slate-200" />
                  </div>
                  <h3 className="text-slate-900 font-black uppercase tracking-[0.3em] text-xs">No matching protocols</h3>
                  <p className="text-slate-400 font-bold text-[10px] mt-2 uppercase tracking-widest opacity-60">Awaiting valid command input...</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-white/60 backdrop-blur-md border-t border-white/40 px-8 py-5 flex items-center justify-between">
              <div className="flex gap-8">
                <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <kbd className="px-2 py-1.5 bg-white rounded-xl border border-white shadow-sm text-slate-600 font-sans min-w-[28px] text-center">↑↓</kbd>
                    <span>Navigate</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <kbd className="px-3 py-1.5 bg-white rounded-xl border border-white shadow-sm text-slate-600 font-sans">ENTER</kbd>
                    <span>Select</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-4 bg-purple-600 rounded-full" />
                <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em]">Revlo Intelligence Engine</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ChevronRightIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default CommandPalette;

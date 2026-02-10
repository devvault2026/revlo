import React, { useEffect, useState, useRef } from 'react';
import { Mic, MicOff, X, Activity, Volume2 } from 'lucide-react';
import { LiveCoachService } from '../services/liveCoachService';

interface LiveCoachProps {
  onClose: () => void;
  businessName: string;
}

const LiveCoach: React.FC<LiveCoachProps> = ({ onClose, businessName }) => {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState("Initializing System...");
  const serviceRef = useRef<LiveCoachService | null>(null);

  useEffect(() => {
    const initCoach = async () => {
      try {
        if (!process.env.API_KEY) return;
        serviceRef.current = new LiveCoachService(process.env.API_KEY);
        await serviceRef.current.connect(
          (msg) => console.log(msg),
          (err) => setStatus("Connection Error")
        );
        setIsActive(true);
        setStatus("AI Listening...");
      } catch (e) {
        console.error(e);
        setStatus("Microphone Access Denied");
      }
    };

    initCoach();

    return () => {
      serviceRef.current?.disconnect();
    };
  }, []);

  const toggleSession = () => {
    if (isActive) {
      serviceRef.current?.disconnect();
      setIsActive(false);
      setStatus("Systems Paused");
    } else {
      onClose(); 
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-10 fade-in duration-300">
      <div className="bg-[#0F0F11] rounded-lg shadow-2xl border border-revlo-border w-80 overflow-hidden flex flex-col backdrop-blur-xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-revlo-bg to-[#1a1a1c] p-4 flex justify-between items-center border-b border-white/5">
          <div className="flex items-center gap-2">
            <Activity className={`w-4 h-4 text-revlo-secondary ${isActive ? 'animate-pulse' : ''}`} />
            <span className="font-display font-bold text-white tracking-wide">REVLO COACH</span>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 flex flex-col items-center justify-center space-y-6">
           <div className="relative">
              {isActive && (
                <div className="absolute inset-0 rounded-full border-2 border-revlo-primary opacity-50 animate-ping"></div>
              )}
              <div className="w-24 h-24 rounded-full bg-[#18181B] border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.1)]">
                <Volume2 className={`w-10 h-10 ${isActive ? 'text-revlo-primary' : 'text-gray-600'}`} />
              </div>
           </div>

           <div className="text-center">
             <h3 className="font-medium text-white text-sm uppercase tracking-widest">Live Analysis</h3>
             <p className="text-xs text-gray-500 mt-1">{businessName}</p>
             <p className={`text-xs mt-3 font-mono ${isActive ? 'text-green-500' : 'text-red-500'}`}>
               [{status}]
             </p>
           </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/5 bg-[#0A0A0C] flex justify-center">
          <button 
            onClick={toggleSession}
            className={`flex items-center gap-2 px-6 py-2.5 rounded text-sm font-medium transition-all uppercase tracking-wider ${
                isActive 
                ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/30' 
                : 'bg-revlo-primary text-white hover:bg-revlo-primary/90 shadow-[0_0_10px_rgba(139,92,246,0.3)]'
            }`}
          >
            {isActive ? <><MicOff className="w-4 h-4"/> Terminate</> : <><Mic className="w-4 h-4"/> Activate</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveCoach;
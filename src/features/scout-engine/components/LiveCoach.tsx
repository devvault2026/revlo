import React, { useEffect, useState, useRef } from 'react';
import { Mic, MicOff, X, Activity, Volume2, Shield, Zap, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LiveCoachService } from '../services/liveCoachService';

interface LiveCoachProps {
  onClose: () => void;
  businessName: string;
}

const LiveCoach: React.FC<LiveCoachProps> = ({ onClose, businessName }) => {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState("INITIALIZING_CORES...");
  const serviceRef = useRef<LiveCoachService | null>(null);

  useEffect(() => {
    const initCoach = async () => {
      try {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) return;
        serviceRef.current = new LiveCoachService(apiKey);
        await serviceRef.current.connect(
          (msg) => console.log(msg),
          (err) => setStatus("DECRYPT_ERROR")
        );
        setIsActive(true);
        setStatus("ADVISOR_ONLINE_LISTENING");
      } catch (e) {
        console.error(e);
        setStatus("MIC_AUTH_DENIED");
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
      setStatus("SYSTEMS_STANDBY");
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        className="bg-[#0A0A0C]/90 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 w-96 overflow-hidden flex flex-col shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
      >
        {/* Cinematic Header */}
        <div className="p-6 pb-2 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl transition-all duration-500 ${isActive ? 'bg-fuchsia-500/10 text-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.3)]' : 'bg-slate-500/10 text-slate-500'}`}>
              <Activity className={`w-5 h-5 ${isActive ? 'animate-pulse' : ''}`} />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-black italic text-white text-lg leading-none tracking-tighter uppercase">Neural Advisor</span>
              <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.4em] mt-1 italic">Tactical Overdrive v4.2</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-600 hover:text-white transition-colors bg-white/5 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Neural Interface Body */}
        <div className="p-10 flex flex-col items-center justify-center relative">
          {/* Animated Background Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-40 h-40 rounded-full border border-fuchsia-500/30"
            />
            <motion.div
              animate={{ scale: [1.2, 1.8, 1.2], opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, delay: 1 }}
              className="absolute w-40 h-40 rounded-full border border-purple-500/20"
            />
          </div>

          <div className="relative group/orb mb-8">
            {isActive && (
              <div className="absolute -inset-8 bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse" />
            )}
            <div className={`w-36 h-36 rounded-full border-2 transition-all duration-700 flex items-center justify-center relative z-10 ${isActive
                ? 'bg-[#0F0F12] border-fuchsia-500/50 shadow-[0_0_60px_rgba(217,70,239,0.2)]'
                : 'bg-[#0F0F12] border-white/5 shadow-none'
              }`}>
              <Volume2 className={`w-14 h-14 transition-all duration-500 ${isActive ? 'text-fuchsia-400 scale-110' : 'text-slate-800'}`} />

              {/* Spinning Ring */}
              {isActive && (
                <div className="absolute inset-2 border-t-2 border-r-2 border-fuchsia-500/30 rounded-full animate-spin" style={{ animationDuration: '3s' }} />
              )}
            </div>
          </div>

          <div className="text-center relative z-10">
            <h3 className="font-sans font-black text-white text-xs uppercase tracking-[0.3em] italic mb-2">Analyzing Target Frequency</h3>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{businessName}</p>

            <motion.div
              animate={isActive ? { opacity: [0.5, 1, 0.5] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
              className={`mt-6 font-mono text-[10px] font-black tracking-widest px-4 py-2 rounded-lg border flex items-center gap-3 ${isActive
                  ? 'text-fuchsia-400 border-fuchsia-500/20 bg-fuchsia-500/5'
                  : 'text-red-700 border-red-500/20 bg-red-500/5'
                }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-fuchsia-500 animate-ping' : 'bg-red-800'}`} />
              {status}
            </motion.div>
          </div>
        </div>

        {/* Command Footer */}
        <div className="p-8 border-t border-white/5 bg-white/5 backdrop-blur-3xl flex justify-center group/footer">
          <button
            onClick={toggleSession}
            className={`w-full flex items-center justify-center gap-4 py-6 rounded-3xl text-[11px] font-black transition-all duration-500 uppercase tracking-[0.4em] italic relative overflow-hidden ${isActive
              ? 'bg-red-600/10 text-red-500 border border-red-500/30 hover:bg-red-600 hover:text-white'
              : 'bg-white text-black hover:bg-fuchsia-600 hover:text-white shadow-2xl overflow-hidden'
              }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
            {isActive ? (
              <><MicOff className="w-5 h-5 transition-transform group-hover/footer:rotate-12" /> Terminate Link</>
            ) : (
              <><Zap className="w-5 h-5 transition-transform group-hover/footer:scale-125" /> Activate Advisor</>
            )}
          </button>
        </div>
      </motion.div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default LiveCoach;
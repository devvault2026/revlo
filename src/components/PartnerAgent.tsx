import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    Send,
    Mic,
    Volume2,
    VolumeX,
    MessageSquare,
    Zap,
    Cpu,
    Loader2,
    Check
} from 'lucide-react';
import { chatWithAgent } from '../features/revlo-os/services/geminiService';
import { generateSpeech } from '../features/revlo-os/services/openaiService';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import mermaid from 'mermaid';
import { Maximize2, Download } from 'lucide-react';

// Mermaid Rendering Component
const MermaidChart = ({ chart, onExpand }: { chart: string; onExpand: () => void }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        mermaid.initialize({ startOnLoad: true, theme: 'dark' });
        if (ref.current && chart) {
            ref.current.removeAttribute('data-processed');
            mermaid.contentLoaded();
        }
    }, [chart]);

    return (
        <div className="relative group">
            <div
                className="mermaid bg-white/5 p-4 rounded-xl border border-white/10 my-4 flex justify-center overflow-x-auto cursor-pointer hover:bg-white/10 transition-all"
                ref={ref}
                onClick={onExpand}
            >
                {chart}
            </div>
            <button
                onClick={onExpand}
                className="absolute top-6 right-2 p-1.5 bg-black/60 rounded-lg text-white/40 opacity-0 group-hover:opacity-100 transition-all hover:text-white"
            >
                <Maximize2 className="w-4 h-4" />
            </button>
        </div>
    );
};

interface Message {
    role: 'user' | 'assistant';
    content: string;
    isSpeaking?: boolean;
}

const PartnerAgent: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Neural Link established. I am Revlo. How shall we scale your operations today?" }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
    const [expandedChart, setExpandedChart] = useState<string | null>(null);

    const scrollRef = useRef<HTMLDivElement>(null);
    const activeAudioRef = useRef<HTMLAudioElement | null>(null);

    const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
    const OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setIsLoading(true);

        // Convert messages to Gemini format (role: 'user'/'model', parts: [{text}])
        // CRITICAL: Gemini history MUST start with a 'user' message. 
        // We skip the initial assistant greeting to satisfy this requirement.
        const geminiHistory = messages
            .filter((m, i) => !(i === 0 && m.role === 'assistant'))
            .map(m => ({
                role: (m.role === 'assistant' ? 'model' : 'user') as 'model' | 'user',
                parts: [{ text: m.content }]
            }));

        try {
            let fullResponse = '';
            await chatWithAgent(GEMINI_KEY, geminiHistory, userMsg, "gemini-3-flash", (chunk) => {
                fullResponse += chunk;
            });

            const assistantMsg: Message = { role: 'assistant', content: fullResponse };
            setMessages(prev => [...prev, assistantMsg]);

            if (isVoiceEnabled) {
                speakText(fullResponse, messages.length + 1);
            }
        } catch (error) {
            console.error("Agent Error:", error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Protocol interrupted. Please re-establish link." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const speakText = async (text: string, index: number) => {
        if (!OPENAI_KEY) return;

        // Stop any current audio
        if (activeAudioRef.current) {
            activeAudioRef.current.pause();
            setMessages(prev => prev.map((m, i) => i === index ? { ...m, isSpeaking: false } : m));
        }

        try {
            setMessages(prev => prev.map((m, i) => i === index ? { ...m, isSpeaking: true } : m));
            const buffer = await generateSpeech(OPENAI_KEY, text.replace(/[*#_`]/g, ''));
            const blob = new Blob([buffer], { type: 'audio/mpeg' });
            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);
            activeAudioRef.current = audio;

            audio.onended = () => {
                setMessages(prev => prev.map((m, i) => i === index ? { ...m, isSpeaking: false } : m));
            };
            audio.play();
        } catch (err) {
            console.error("TTS Failed:", err);
            setMessages(prev => prev.map((m, i) => i === index ? { ...m, isSpeaking: false } : m));
        }
    };

    const toggleVoice = () => {
        setIsVoiceEnabled(!isVoiceEnabled);
        if (isVoiceEnabled && activeAudioRef.current) {
            activeAudioRef.current.pause();
            setMessages(prev => prev.map(m => ({ ...m, isSpeaking: false })));
        }
    };

    return (
        <div className="fixed bottom-10 right-10 z-[100000]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="absolute bottom-24 right-0 w-[450px] h-[650px] bg-[#0A0D14] border border-white/10 rounded-[32px] shadow-[0_32px_128px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
                    >
                        {/* Chat Header */}
                        <div className="p-6 bg-white/5 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-blue-600/20 flex items-center justify-center border border-blue-500/20">
                                    <Cpu className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-white text-sm font-black uppercase tracking-widest italic">Revlo Agent</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-[9px] text-white/40 font-bold uppercase tracking-widest leading-none">Intelligence Active</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={toggleVoice}
                                    className={`p-2 rounded-xl border transition-all ${isVoiceEnabled ? 'bg-blue-600/20 border-blue-500/20 text-blue-400' : 'bg-white/5 border-white/5 text-white/20'}`}
                                >
                                    {isVoiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                                </button>
                                <button onClick={() => setIsOpen(false)} className="p-2 text-white/20 hover:text-white transition-all">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-gradient-to-b from-transparent to-blue-900/5"
                        >
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] p-4 rounded-2xl ${msg.role === 'user'
                                        ? 'bg-blue-600 text-white rounded-tr-none'
                                        : 'bg-white/5 border border-white/10 text-slate-300 rounded-tl-none'
                                        }`}>
                                        <div className="prose prose-invert prose-sm max-w-none">
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm]}
                                                components={{
                                                    code({ node, inline, className, children, ...props }: any) {
                                                        const match = /language-mermaid/.exec(className || '');
                                                        return !inline && match ? (
                                                            <MermaidChart
                                                                chart={String(children).replace(/\n$/, '')}
                                                                onExpand={() => setExpandedChart(String(children))}
                                                            />
                                                        ) : (
                                                            <code className={className} {...props}>
                                                                {children}
                                                            </code>
                                                        );
                                                    }
                                                }}
                                            >
                                                {msg.content}
                                            </ReactMarkdown>
                                        </div>
                                        {msg.role === 'assistant' && (
                                            <div className="mt-3 flex justify-end">
                                                <button
                                                    onClick={() => speakText(msg.content, i)}
                                                    className={`p-1.5 rounded-lg transition-all ${msg.isSpeaking ? 'bg-blue-600 text-white animate-pulse' : 'text-white/20 hover:text-white/40'}`}
                                                >
                                                    <Volume2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none">
                                        <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-6 bg-black/40 border-t border-white/5">
                            <div className="relative flex items-center gap-3">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Execute tactical query..."
                                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-white/10"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={isLoading}
                                    className="p-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-2xl transition-all shadow-lg shadow-blue-600/20"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Launch Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-20 h-20 bg-[#0A0D14] border border-white/10 rounded-full flex items-center justify-center shadow-3xl text-blue-400 hover:text-white transition-all relative overflow-hidden group"
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 opacity-20 group-hover:opacity-40 transition-all" />
                <MessageSquare className="w-8 h-8 relative z-10" />
                {!isOpen && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-4 border-[#020408] animate-pulse" />
                )}
            </motion.button>

            {/* Expanded Chart Modal */}
            <AnimatePresence>
                {expandedChart && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100001] bg-black/90 backdrop-blur-xl flex items-center justify-center p-10 cursor-zoom-out"
                        onClick={() => setExpandedChart(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="bg-white p-12 rounded-[40px] shadow-3xl max-w-[90vw] max-h-[90vh] overflow-auto flex items-center justify-center"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setExpandedChart(null)}
                                className="absolute top-10 right-10 p-4 text-white/40 hover:text-white transition-all bg-white/5 rounded-full"
                            >
                                <X className="w-8 h-8" />
                            </button>
                            <div className="mermaid scale-150 transform transition-transform">
                                {expandedChart}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PartnerAgent;

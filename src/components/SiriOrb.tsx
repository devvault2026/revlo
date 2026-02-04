import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SiriOrbProps {
    isActive: boolean; // Is the agent "visible/awake"
    isListening: boolean; // Is the user currently speaking
    isSpeaking: boolean; // Is the agent currently speaking
    audioLevel: number; // 0 to 1
}

const SiriOrb: React.FC<SiriOrbProps> = ({ isActive, isListening, isSpeaking, audioLevel }) => {
    // Dynamic scale based on activity and audio levels
    const baseScale = isListening || isSpeaking ? 1.1 : 1.0;
    const reactiveScale = baseScale + (audioLevel * 0.8);

    // Neural Layers (Blurred gradients for a liquid feel)
    const layers = useMemo(() => [
        { color: 'rgba(59, 130, 246, 0.4)', blur: '60px', speed: 8 }, // Blue
        { color: 'rgba(168, 85, 247, 0.4)', blur: '80px', speed: 10 }, // Purple
        { color: 'rgba(236, 72, 153, 0.3)', blur: '70px', speed: 12 }, // Pink
    ], []);

    return (
        <div className="relative w-64 h-64 flex items-center justify-center">
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        {/* Dynamic Aura Glow */}
                        {layers.map((layer, i) => (
                            <motion.div
                                key={i}
                                className="absolute inset-0 rounded-full"
                                animate={{
                                    scale: [1, 1.2 * reactiveScale, 1],
                                    rotate: [0, 360],
                                    opacity: isListening || isSpeaking ? 0.6 : 0.4
                                }}
                                transition={{
                                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                                    rotate: { duration: layer.speed, repeat: Infinity, ease: "linear" }
                                }}
                                style={{
                                    backgroundColor: layer.color,
                                    filter: `blur(${layer.blur})`,
                                }}
                            />
                        ))}

                        {/* The Living Core Orb */}
                        <motion.div
                            className="w-40 h-40 rounded-full relative z-10 overflow-hidden shadow-[0_0_80px_rgba(255,255,255,0.1)] border border-white/5"
                            animate={{
                                scale: reactiveScale,
                                backgroundColor: isListening ? '#3B82F6' : (isSpeaking ? '#8B5CF6' : '#1E293B'),
                            }}
                            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                        >
                            {/* Inner Plasma Mesh */}
                            <div className="absolute inset-0 bg-black/40" />
                            <motion.div
                                className="absolute inset-[-50%] bg-gradient-to-tr from-blue-700 via-purple-600 to-pink-500 opacity-80"
                                animate={{
                                    rotate: [0, 360],
                                }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                style={{ filter: 'blur(30px)' }}
                            />

                            {/* Lighting up effect when user talks */}
                            <AnimatePresence>
                                {isListening && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0.6 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-white mix-blend-overlay"
                                        style={{ filter: 'blur(10px)' }}
                                    />
                                )}
                            </AnimatePresence>

                            {/* Center Point */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    className="w-3 h-3 rounded-full bg-white opacity-40 blur-[2px]"
                                    animate={{ scale: [1, 2, 1], opacity: [0.2, 0.4, 0.2] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />
                            </div>
                        </motion.div>

                        {/* Neural Ripple Ring */}
                        {(isListening || isSpeaking) && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1.5 + audioLevel }}
                                transition={{ duration: 0.1 }}
                                className="absolute w-full h-full border border-white/10 rounded-full"
                            />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SiriOrb;

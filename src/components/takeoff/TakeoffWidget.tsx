import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Download, CheckCircle, Loader2 } from 'lucide-react';

const TakeoffWidget: React.FC = () => {
    const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'ready'>('idle');
    const [progress, setProgress] = useState(0);

    const startProcess = () => {
        setStatus('uploading');
        let p = 0;
        const interval = setInterval(() => {
            p += 10;
            setProgress(p);
            if (p >= 100) {
                clearInterval(interval);
                setStatus('processing');
                setTimeout(() => setStatus('ready'), 2000);
            }
        }, 50);
    };

    return (
        <div className="bg-[#0c0d10] border-y border-zinc-900 overflow-hidden" id="upload-portal">
            <div className="max-w-6xl mx-auto px-6 py-24">
                <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
                    <div className="max-w-md space-y-8">
                        <h3 className="text-3xl md:text-5xl font-black italic uppercase italic text-white tracking-tighter leading-none">
                            TEST THE <span className="text-orange-600">PERFORMANCE.</span>
                        </h3>
                        <p className="text-xl font-bold text-zinc-500 italic uppercase italic leading-relaxed">
                            Drop a blueprint set here. <br />
                            See how fast the takeoff comes back. <br />
                            <span className="text-white">No account required.</span>
                        </p>
                    </div>

                    <div className="flex-1 w-full max-w-2xl bg-zinc-900/50 border border-zinc-800 rounded-lg p-8 relative overflow-hidden group">
                        <AnimatePresence mode="wait">
                            {status === 'idle' && (
                                <motion.div
                                    key="idle"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={startProcess}
                                    className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded py-20 bg-zinc-950/50 cursor-pointer hover:border-zinc-700 transition-all"
                                >
                                    <Upload className="text-zinc-700 mb-6 group-hover:text-orange-600 transition-colors" size={48} />
                                    <h4 className="text-2xl font-black italic uppercase italic text-white mb-2">UPLOAD BLUEPRINTS</h4>
                                    <p className="text-xs font-black text-zinc-600 uppercase tracking-widest italic">PDF OR DWG ONLY</p>
                                </motion.div>
                            )}

                            {(status === 'uploading' || status === 'processing') && (
                                <motion.div
                                    key="processing"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="py-20 flex flex-col items-center"
                                >
                                    <div className="w-full max-w-xs h-2 bg-zinc-900 rounded-full overflow-hidden mb-8">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            className="h-full bg-orange-600"
                                        />
                                    </div>
                                    <div className="flex items-center gap-4 text-white">
                                        <Loader2 className="animate-spin text-orange-600" size={20} />
                                        <span className="text-xl font-black italic uppercase italic tracking-widest">
                                            {status === 'uploading' ? 'UPLOADING...' : 'ESTIMATING...'}
                                        </span>
                                    </div>
                                </motion.div>
                            )}

                            {status === 'ready' && (
                                <motion.div
                                    key="ready"
                                    className="space-y-8"
                                >
                                    <div className="p-6 bg-orange-600/5 border border-orange-600/20 flex items-center gap-6">
                                        <div className="w-12 h-12 bg-orange-600 text-white flex items-center justify-center shrink-0">
                                            <CheckCircle size={24} strokeWidth={3} />
                                        </div>
                                        <div className="text-left">
                                            <h5 className="text-xl font-black italic uppercase italic text-white leading-none">ESTIMATE READY.</h5>
                                            <p className="text-xs font-bold text-orange-500 uppercase tracking-widest italic mt-1">TOTAL LINE ITEMS: 184</p>
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="p-8 bg-zinc-950 border border-zinc-800 flex flex-col items-start gap-6 hover:border-zinc-700 transition-all cursor-pointer">
                                            <FileText className="text-zinc-600" size={32} />
                                            <div className="text-left">
                                                <p className="text-base font-black italic uppercase italic text-white">MATERIAL LIST</p>
                                                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-tighter mt-1">.XLSX FORMAT</p>
                                            </div>
                                            <Download className="text-zinc-800 ml-auto" size={20} />
                                        </div>
                                        <div className="p-8 bg-zinc-950 border border-zinc-800 flex flex-col items-start gap-6 hover:border-zinc-700 transition-all cursor-pointer">
                                            <FileText className="text-zinc-600" size={32} />
                                            <div className="text-left">
                                                <p className="text-base font-black italic uppercase italic text-white">PROPOSAL DRAFT</p>
                                                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-tighter mt-1">.PDF FORMAT</p>
                                            </div>
                                            <Download className="text-zinc-800 ml-auto" size={20} />
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="text-[10px] font-black uppercase tracking-widest text-zinc-700 hover:text-orange-500 transition-colors"
                                    >
                                        START NEW TEST
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TakeoffWidget;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, XCircle, ChevronDown, ChevronUp, Activity, Zap, X } from 'lucide-react';
import { EnrichmentJob } from '../types';
import { subscribeToJobs, dismissJob } from '../services/enrichmentService';
import { subscribeToPRDJobs, dismissPRDJob } from '../services/prdService';

const EnrichmentJobNotifications: React.FC = () => {
    const [enrichmentJobs, setEnrichmentJobs] = useState<EnrichmentJob[]>([]);
    const [prdJobs, setPrdJobs] = useState<EnrichmentJob[]>([]);
    const [isExpanded, setIsExpanded] = useState(true);
    const [isMinimized, setIsMinimized] = useState(false);

    useEffect(() => {
        const unsubEnrichment = subscribeToJobs((updatedJobs) => {
            setEnrichmentJobs(updatedJobs);
        });
        const unsubPRD = subscribeToPRDJobs((updatedJobs) => {
            setPrdJobs(updatedJobs);
        });
        return () => {
            unsubEnrichment();
            unsubPRD();
        };
    }, []);

    const jobs = [...enrichmentJobs, ...prdJobs].sort((a, b) => (b.startedAt || 0) - (a.startedAt || 0));

    if (jobs.length === 0) return null;

    const activeCount = jobs.filter(j => j.status === 'running' || j.status === 'queued').length;
    const completedCount = jobs.filter(j => j.status === 'complete').length;

    if (isMinimized) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed bottom-6 right-6 z-[200]"
            >
                <button
                    onClick={() => setIsMinimized(false)}
                    className="relative flex items-center gap-3 px-5 py-3 bg-[#0A0A0C]/95 backdrop-blur-2xl border border-purple-500/30 rounded-2xl shadow-[0_0_40px_rgba(168,85,247,0.15)] hover:border-purple-500/60 transition-all group"
                >
                    {activeCount > 0 && (
                        <div className="absolute -top-2 -right-2 w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-[9px] font-black text-white">{activeCount}</span>
                        </div>
                    )}
                    <Activity className="w-4 h-4 text-purple-500 animate-pulse" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">
                        {activeCount > 0 ? `${activeCount} ACTIVE` : `${completedCount} DONE`}
                    </span>
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-[200] w-[420px] max-h-[500px] flex flex-col bg-[#070709]/95 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.8),0_0_40px_rgba(168,85,247,0.08)] overflow-hidden"
        >
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-black/40">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Zap className="w-4 h-4 text-purple-500" />
                        {activeCount > 0 && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full animate-ping" />
                        )}
                    </div>
                    <div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">
                            Enrichment Jobs
                        </h3>
                        <p className="text-[8px] text-slate-600 font-bold uppercase tracking-widest">
                            {activeCount} Active · {completedCount} Complete
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-1.5 text-slate-500 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                    >
                        {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
                    </button>
                    <button
                        onClick={() => setIsMinimized(true)}
                        className="p-1.5 text-slate-500 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            {/* Job List */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-y-auto custom-scrollbar"
                    >
                        <div className="p-3 space-y-2">
                            {jobs.map((job) => (
                                <motion.div
                                    key={job.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="bg-white/[0.02] border border-white/5 rounded-xl p-4 relative overflow-hidden group"
                                >
                                    {/* Progress Bar Underlay */}
                                    {job.status === 'running' && (
                                        <div
                                            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-purple-600 to-fuchsia-500 transition-all duration-700"
                                            style={{ width: `${job.progress}%` }}
                                        />
                                    )}

                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2.5">
                                            {job.status === 'running' || job.status === 'queued' ? (
                                                <Loader2 className="w-3.5 h-3.5 text-purple-500 animate-spin" />
                                            ) : job.status === 'complete' ? (
                                                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                                            ) : (
                                                <XCircle className="w-3.5 h-3.5 text-red-500" />
                                            )}
                                            <span className="text-[10px] font-black text-white uppercase tracking-wider truncate max-w-[200px]">
                                                {job.leadName}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[9px] font-bold uppercase tracking-widest ${job.status === 'running' ? 'text-purple-400' :
                                                job.status === 'complete' ? 'text-green-400' :
                                                    job.status === 'failed' ? 'text-red-400' :
                                                        'text-slate-500'
                                                }`}>
                                                {job.status === 'running' ? `${job.progress}%` : job.status}
                                            </span>
                                            {(job.status === 'complete' || job.status === 'failed') && (
                                                <button
                                                    onClick={() => job.id.startsWith('prd_') ? dismissPRDJob(job.id) : dismissJob(job.id)}
                                                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-600 hover:text-white transition-all"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Latest Step */}
                                    {job.steps.length > 0 && (
                                        <p className="text-[9px] text-slate-500 font-medium truncate pl-6">
                                            {job.steps[job.steps.length - 1]}
                                        </p>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.03); border-radius: 10px; }
      `}</style>
        </motion.div>
    );
};

export default EnrichmentJobNotifications;

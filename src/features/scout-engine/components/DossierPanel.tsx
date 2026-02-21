import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Building2, User, Mail, Phone, Globe, Star, ShieldAlert, Target,
    Zap, TrendingUp, ExternalLink, Copy, CheckCircle, BarChart3,
    MessageSquare, AlertTriangle, Award, ChevronRight, Briefcase,
    Search, Clock, Database
} from 'lucide-react';
import { EnrichmentDossier } from '../types';

interface DossierPanelProps {
    dossier: EnrichmentDossier;
    businessName: string;
}

const DossierPanel: React.FC<DossierPanelProps> = ({ dossier, businessName }) => {
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const urgencyColors: Record<string, string> = {
        'Critical': 'text-red-500 bg-red-500/10 border-red-500/30',
        'High': 'text-orange-500 bg-orange-500/10 border-orange-500/30',
        'Medium': 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30',
        'Low': 'text-blue-500 bg-blue-500/10 border-blue-500/30'
    };

    const qualityColors: Record<string, string> = {
        'None': 'text-red-500',
        'Poor': 'text-red-400',
        'Average': 'text-yellow-400',
        'Good': 'text-green-400',
        'Excellent': 'text-emerald-400',
        'Unknown': 'text-slate-500'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            {/* DOSSIER HEADER */}
            <div className="bg-gradient-to-br from-purple-500/5 to-fuchsia-500/5 border border-purple-500/10 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 bg-purple-500/10 rounded-bl-2xl border-b border-l border-purple-500/20">
                    <span className="text-[8px] font-black text-purple-400 uppercase tracking-[0.3em]">
                        Deep Intel Dossier
                    </span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                    <Database className="w-3.5 h-3.5 text-purple-500" />
                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.4em]">
                        Enriched {new Date(dossier.enrichedAt).toLocaleString()}
                    </span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                    {dossier.companyOverview}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                    {dossier.dataSourcesUsed.map((src, i) => (
                        <span key={i} className="text-[7px] font-bold uppercase tracking-widest text-slate-600 px-2 py-1 bg-white/[0.03] rounded-lg border border-white/5">
                            {src}
                        </span>
                    ))}
                </div>
            </div>

            {/* DECISION MAKER */}
            <section>
                <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-600 mb-4 flex items-center gap-3">
                    <User className="w-3.5 h-3.5" /> Decision_Maker_Intel
                </h3>
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest block mb-1">Name</span>
                            <span className="text-sm font-black text-white italic">{dossier.ownerName || '---'}</span>
                        </div>
                        <div>
                            <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest block mb-1">Title</span>
                            <span className="text-sm font-bold text-slate-400">{dossier.ownerTitle || '---'}</span>
                        </div>
                    </div>
                    <div className="h-px bg-white/5" />
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest block mb-1">Email</span>
                            {dossier.emailFound ? (
                                <button
                                    onClick={() => copyToClipboard(dossier.emailFound!, 'email')}
                                    className="text-[11px] font-mono font-bold text-purple-400 hover:text-white transition-colors flex items-center gap-2 group"
                                >
                                    {dossier.emailFound}
                                    {copiedField === 'email' ? <CheckCircle className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100" />}
                                </button>
                            ) : (
                                <span className="text-[11px] font-mono text-red-500/60">NOT_FOUND</span>
                            )}
                        </div>
                        <div>
                            <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest block mb-1">Phone</span>
                            {dossier.phoneFound ? (
                                <a href={`tel:${dossier.phoneFound}`} className="text-[11px] font-mono font-bold text-blue-400 hover:text-white transition-colors">
                                    {dossier.phoneFound}
                                </a>
                            ) : (
                                <span className="text-[11px] font-mono text-red-500/60">NOT_FOUND</span>
                            )}
                        </div>
                    </div>
                    {dossier.ownerLinkedIn && (
                        <a href={dossier.ownerLinkedIn} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[10px] font-bold text-blue-400 hover:text-white transition-colors mt-2">
                            <ExternalLink className="w-3 h-3" /> LinkedIn Profile
                        </a>
                    )}
                </div>
            </section>

            {/* WEBSITE ANALYSIS */}
            <section>
                <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-500 mb-4 flex items-center gap-3">
                    <Globe className="w-3.5 h-3.5" /> Website_Forensics
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl text-center">
                        <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest block mb-2">Quality</span>
                        <span className={`text-sm font-black italic ${qualityColors[dossier.websiteAnalysis.websiteQuality]}`}>
                            {dossier.websiteAnalysis.websiteQuality}
                        </span>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl text-center">
                        <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest block mb-2">Mobile</span>
                        <span className={`text-sm font-black italic ${dossier.websiteAnalysis.mobileOptimized ? 'text-green-400' : dossier.websiteAnalysis.mobileOptimized === false ? 'text-red-500' : 'text-slate-600'}`}>
                            {dossier.websiteAnalysis.mobileOptimized === null ? '---' : dossier.websiteAnalysis.mobileOptimized ? 'YES' : 'NO'}
                        </span>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl text-center">
                        <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest block mb-2">Speed</span>
                        <span className={`text-sm font-black italic ${dossier.websiteAnalysis.loadSpeed === 'Fast' ? 'text-green-400' : dossier.websiteAnalysis.loadSpeed === 'Slow' ? 'text-red-500' : 'text-slate-400'}`}>
                            {dossier.websiteAnalysis.loadSpeed}
                        </span>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl text-center">
                        <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest block mb-2">SEO</span>
                        <span className={`text-sm font-black italic ${dossier.websiteAnalysis.seoScore === 'Strong' ? 'text-green-400' : dossier.websiteAnalysis.seoScore === 'Weak' ? 'text-red-500' : 'text-slate-400'}`}>
                            {dossier.websiteAnalysis.seoScore}
                        </span>
                    </div>
                </div>
                {dossier.websiteAnalysis.issues.length > 0 && (
                    <div className="mt-3 space-y-1.5">
                        {dossier.websiteAnalysis.issues.map((issue, i) => (
                            <div key={i} className="flex items-start gap-2 text-[10px] text-red-400/80 font-medium">
                                <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" />
                                {issue}
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* SOCIAL PRESENCE */}
            <section>
                <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-fuchsia-500 mb-4 flex items-center gap-3">
                    <BarChart3 className="w-3.5 h-3.5" /> Social_Presence
                </h3>
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Social Score</span>
                        <div className="flex items-center gap-2">
                            <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-1000 ${dossier.socialPresence.socialScore > 60 ? 'bg-green-500' : dossier.socialPresence.socialScore > 30 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                    style={{ width: `${dossier.socialPresence.socialScore}%` }}
                                />
                            </div>
                            <span className="text-sm font-black text-white italic">{dossier.socialPresence.socialScore}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                        {[
                            { key: 'facebook', label: 'FB', url: dossier.socialPresence.facebook },
                            { key: 'instagram', label: 'IG', url: dossier.socialPresence.instagram },
                            { key: 'linkedin', label: 'LI', url: dossier.socialPresence.linkedin },
                            { key: 'tiktok', label: 'TT', url: dossier.socialPresence.tiktok },
                            { key: 'google', label: 'GMB', url: dossier.socialPresence.googleBusiness },
                        ].map(social => (
                            <div key={social.key} className={`text-center p-2 rounded-lg border ${social.url ? 'border-green-500/20 bg-green-500/5' : 'border-white/5 bg-white/[0.01]'}`}>
                                {social.url ? (
                                    <a href={social.url} target="_blank" rel="noopener noreferrer" className="text-[9px] font-black text-green-400 uppercase">{social.label}</a>
                                ) : (
                                    <span className="text-[9px] font-black text-slate-700 uppercase">{social.label}</span>
                                )}
                            </div>
                        ))}
                    </div>
                    {dossier.socialPresence.issues.length > 0 && (
                        <div className="mt-3 space-y-1.5">
                            {dossier.socialPresence.issues.map((issue, i) => (
                                <div key={i} className="text-[9px] text-slate-500 font-medium flex items-start gap-2">
                                    <span className="w-1 h-1 rounded-full bg-fuchsia-500 mt-1 shrink-0" />
                                    {issue}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* REVIEW ANALYSIS */}
            <section>
                <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-yellow-500 mb-4 flex items-center gap-3">
                    <Star className="w-3.5 h-3.5" /> Review_Intelligence
                </h3>
                <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl text-center">
                        <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest block mb-2">Google</span>
                        <div className="flex items-center justify-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <span className="text-lg font-black text-white italic">{dossier.reviewAnalysis.googleRating || '---'}</span>
                        </div>
                        <span className="text-[8px] text-slate-600">{dossier.reviewAnalysis.googleReviewCount || 0} reviews</span>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl text-center">
                        <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest block mb-2">Yelp</span>
                        <span className="text-lg font-black text-white italic">{dossier.reviewAnalysis.yelpRating || '---'}</span>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl text-center">
                        <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest block mb-2">Sentiment</span>
                        <span className={`text-[10px] font-black uppercase italic ${dossier.reviewAnalysis.averageSentiment === 'Positive' ? 'text-green-400' :
                            dossier.reviewAnalysis.averageSentiment === 'Negative' ? 'text-red-500' :
                                dossier.reviewAnalysis.averageSentiment === 'Mixed' ? 'text-yellow-400' :
                                    'text-slate-600'
                            }`}>
                            {dossier.reviewAnalysis.averageSentiment}
                        </span>
                    </div>
                </div>
                {dossier.reviewAnalysis.commonComplaints.length > 0 && (
                    <div className="bg-red-500/[0.03] border border-red-500/10 rounded-xl p-4 mb-2">
                        <span className="text-[8px] font-black text-red-500 uppercase tracking-widest block mb-2">Common Complaints</span>
                        {dossier.reviewAnalysis.commonComplaints.map((c, i) => (
                            <div key={i} className="text-[10px] text-slate-400 font-medium flex items-start gap-2 mb-1">
                                <span className="w-1 h-1 rounded-full bg-red-500 mt-1.5 shrink-0" />
                                {c}
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* COMPETITOR BENCHMARK */}
            <section>
                <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-cyan-500 mb-4 flex items-center gap-3">
                    <Target className="w-3.5 h-3.5" /> Competitive_Landscape
                </h3>
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-4">
                    {dossier.competitorBenchmark.topCompetitors.length > 0 && (
                        <div>
                            <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest block mb-2">Key Competitors</span>
                            <div className="flex flex-wrap gap-2">
                                {dossier.competitorBenchmark.topCompetitors.map((c, i) => (
                                    <span key={i} className="text-[9px] font-bold text-cyan-400 px-3 py-1 bg-cyan-500/5 border border-cyan-500/10 rounded-lg">{c}</span>
                                ))}
                            </div>
                        </div>
                    )}
                    {dossier.competitorBenchmark.marketGaps.length > 0 && (
                        <div>
                            <span className="text-[8px] font-bold text-green-500 uppercase tracking-widest block mb-2">Market Gaps (Opportunities)</span>
                            {dossier.competitorBenchmark.marketGaps.map((gap, i) => (
                                <div key={i} className="text-[10px] text-slate-400 font-medium flex items-start gap-2 mb-1">
                                    <TrendingUp className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                                    {gap}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* PAIN POINTS */}
            {dossier.painPoints.length > 0 && (
                <section>
                    <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-red-500 mb-4 flex items-center gap-3">
                        <ShieldAlert className="w-3.5 h-3.5" /> Identified_Pain_Points
                    </h3>
                    <div className="space-y-2">
                        {dossier.painPoints.map((point, i) => (
                            <div key={i} className="bg-red-500/[0.03] border border-red-500/10 p-4 rounded-xl flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0 animate-pulse" />
                                <span className="text-[11px] font-bold text-slate-300">{point}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* REVLO RECOMMENDATION */}
            <section>
                <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-emerald-500 mb-4 flex items-center gap-3">
                    <Award className="w-3.5 h-3.5" /> Revlo_Service_Recommendation
                </h3>
                <div className="bg-gradient-to-br from-emerald-500/5 to-green-500/5 border border-emerald-500/20 rounded-3xl p-6 relative overflow-hidden">
                    <div className={`absolute top-3 right-3 px-3 py-1 rounded-lg border text-[8px] font-black uppercase tracking-widest ${urgencyColors[dossier.revloRecommendation.urgency]}`}>
                        {dossier.revloRecommendation.urgency} Urgency
                    </div>

                    <div className="mb-4 mt-2">
                        <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest block mb-2">Recommended Service</span>
                        <a
                            href={dossier.revloRecommendation.primaryService.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-black text-emerald-400 italic uppercase tracking-tight hover:text-white transition-colors flex items-center gap-2"
                        >
                            {dossier.revloRecommendation.primaryService.name}
                            <ExternalLink className="w-4 h-4" />
                        </a>
                        <span className="text-[9px] text-slate-500 font-bold">{dossier.revloRecommendation.primaryService.priceRange}</span>
                    </div>

                    {dossier.revloRecommendation.secondaryService && (
                        <div className="mb-4 pl-4 border-l border-emerald-500/20">
                            <span className="text-[8px] text-slate-600 font-bold uppercase tracking-widest block mb-1">Also Consider</span>
                            <span className="text-[11px] font-bold text-slate-400">{dossier.revloRecommendation.secondaryService.name}</span>
                        </div>
                    )}

                    <div className="space-y-3 mt-4">
                        <div>
                            <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest block mb-1">Why This Service</span>
                            <p className="text-[11px] text-slate-300 leading-relaxed">{dossier.revloRecommendation.reasoning}</p>
                        </div>
                        <div>
                            <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest block mb-1">Expected Impact</span>
                            <p className="text-[11px] text-emerald-400 font-bold italic">{dossier.revloRecommendation.estimatedImpact}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* COLD EMAIL / PITCH */}
            <section>
                <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-500 mb-4 flex items-center gap-3">
                    <MessageSquare className="w-3.5 h-3.5" /> Cold_Outreach_Protocol
                </h3>
                <div className="bg-[#0A0A0C] border border-purple-500/20 rounded-3xl p-6 relative group">
                    <div className="mb-4">
                        <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest block mb-2">Subject Line</span>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white italic">{dossier.coldEmailSubject}</span>
                            <button
                                onClick={() => copyToClipboard(dossier.coldEmailSubject, 'subject')}
                                className="p-1 text-slate-600 hover:text-white transition-colors"
                            >
                                {copiedField === 'subject' ? <CheckCircle className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                            </button>
                        </div>
                    </div>
                    <div className="h-px bg-white/5 my-4" />
                    <div>
                        <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest block mb-3">Email Body</span>
                        <p className="text-sm text-slate-200 italic leading-relaxed font-serif whitespace-pre-wrap">
                            {dossier.tailoredPitch}
                        </p>
                    </div>
                    <div className="mt-6 flex gap-3">
                        <button
                            onClick={() => copyToClipboard(`Subject: ${dossier.coldEmailSubject}\n\n${dossier.tailoredPitch}`, 'fullEmail')}
                            className={`flex-1 btn-tactical ${copiedField === 'fullEmail' ? 'btn-tactical-emerald' : 'btn-tactical-purple'} justify-center`}
                        >
                            {copiedField === 'fullEmail' ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            {copiedField === 'fullEmail' ? 'COPIED' : 'COPY_FULL_EMAIL'}
                        </button>
                    </div>
                </div>
            </section>

            {/* FOLLOW-UP ANGLES */}
            {dossier.followUpAngles.length > 0 && (
                <section>
                    <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-orange-500 mb-4 flex items-center gap-3">
                        <Briefcase className="w-3.5 h-3.5" /> Follow_Up_Strategies
                    </h3>
                    <div className="space-y-2">
                        {dossier.followUpAngles.map((angle, i) => (
                            <div key={i} className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex items-center gap-3 group hover:border-orange-500/20 transition-all cursor-pointer"
                                onClick={() => copyToClipboard(angle, `angle-${i}`)}>
                                <ChevronRight className="w-3 h-3 text-orange-500 shrink-0" />
                                <span className="text-[10px] text-slate-400 font-medium flex-1">{angle}</span>
                                {copiedField === `angle-${i}` ? <CheckCircle className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3 text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity" />}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* OPPORTUNITY SCORE */}
            <section className="pb-8">
                <div className="bg-gradient-to-r from-purple-500/5 via-fuchsia-500/5 to-blue-500/5 border border-white/10 rounded-3xl p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08),transparent)] opacity-50" />
                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.5em] block mb-3 relative z-10">
                        Opportunity Score
                    </span>
                    <div className="text-6xl font-black italic text-white mb-2 relative z-10 tracking-tighter drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                        {dossier.opportunityScore}
                    </div>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest relative z-10">
                        / 100 — {dossier.opportunityScore >= 80 ? 'HOT LEAD' : dossier.opportunityScore >= 60 ? 'STRONG PROSPECT' : dossier.opportunityScore >= 40 ? 'WORTH PURSUING' : 'NEEDS NURTURING'}
                    </span>
                </div>
            </section>
        </motion.div>
    );
};

export default DossierPanel;

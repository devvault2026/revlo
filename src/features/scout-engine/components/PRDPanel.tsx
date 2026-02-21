import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText, Palette, Layout, Globe, Target, Image, Code, CheckSquare,
    ChevronDown, ChevronUp, Star, BarChart3, Eye, Layers, Type, Box,
    Smartphone, Tablet, Monitor, MessageSquare, Search, Zap, Copy,
    CheckCircle, ExternalLink, TrendingUp, Shield, Award, Users,
    Paintbrush, Sparkles, Hash, MousePointer
} from 'lucide-react';
import { WebsitePRD, CompetitorWebsite, PRDPage, PRDSection } from '../types';

interface PRDPanelProps {
    prd: WebsitePRD;
}

// === COPY UTILITY ===
const useCopy = () => {
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const copy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };
    return { copiedId, copy };
};

// === COLLAPSIBLE SECTION WRAPPER ===
const CollapsibleSection: React.FC<{
    title: string;
    icon: React.ReactNode;
    defaultOpen?: boolean;
    badge?: string;
    accentColor?: string;
    children: React.ReactNode;
}> = ({ title, icon, defaultOpen = false, badge, accentColor = 'purple', children }) => {
    const [open, setOpen] = useState(defaultOpen);
    const colors: Record<string, string> = {
        purple: 'from-purple-500/20 to-fuchsia-500/10 border-purple-500/30',
        blue: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30',
        green: 'from-green-500/20 to-emerald-500/10 border-green-500/30',
        amber: 'from-amber-500/20 to-yellow-500/10 border-amber-500/30',
        red: 'from-red-500/20 to-rose-500/10 border-red-500/30',
        cyan: 'from-cyan-500/20 to-teal-500/10 border-cyan-500/30',
    };

    return (
        <div className="mb-4">
            <button
                onClick={() => setOpen(!open)}
                className={`w-full flex items-center justify-between px-5 py-4 rounded-xl bg-gradient-to-r ${colors[accentColor] || colors.purple} border backdrop-blur-sm transition-all duration-300 hover:brightness-110 group`}
            >
                <div className="flex items-center gap-3">
                    <div className="opacity-70 group-hover:opacity-100 transition-opacity">{icon}</div>
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/90">{title}</span>
                    {badge && (
                        <span className="px-2 py-0.5 rounded-full bg-white/10 text-[8px] font-bold text-white/60 uppercase tracking-widest">{badge}</span>
                    )}
                </div>
                {open ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-4 pb-2 px-2">{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// === COLOR SWATCH ===
const ColorSwatch: React.FC<{ hex: string; label: string }> = ({ hex, label }) => {
    const { copiedId, copy } = useCopy();
    return (
        <button
            onClick={() => copy(hex, label)}
            className="flex flex-col items-center gap-2 group cursor-pointer"
        >
            <div
                className="w-12 h-12 rounded-xl border border-white/10 shadow-lg group-hover:scale-110 transition-transform"
                style={{ backgroundColor: hex }}
            />
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">{label}</span>
            <span className="text-[9px] font-mono text-slate-600 group-hover:text-purple-400 transition-colors">
                {copiedId === label ? '✓ Copied' : hex}
            </span>
        </button>
    );
};

// === COMPETITOR CARD ===
const CompetitorCard: React.FC<{ competitor: CompetitorWebsite; index: number }> = ({ competitor, index }) => {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className="bg-white/[0.03] rounded-xl border border-white/5 p-5 hover:border-white/10 transition-all">
            <div className="flex items-start justify-between mb-3">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded">#{index + 1}</span>
                        <h4 className="text-sm font-black text-white uppercase tracking-wide">{competitor.name}</h4>
                    </div>
                    {competitor.url && (
                        <a href={competitor.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-400 hover:underline flex items-center gap-1">
                            <ExternalLink className="w-3 h-3" />{competitor.url}
                        </a>
                    )}
                </div>
                <span className="text-[8px] font-bold text-slate-500 uppercase bg-white/5 px-2 py-1 rounded">{competitor.estimatedTraffic}</span>
            </div>

            <p className="text-[10px] text-slate-400 mb-3 italic">"{competitor.designStyle}"</p>

            <div className="flex items-center gap-2 mb-3 flex-wrap">
                {competitor.techStack?.slice(0, 4).map((tech, i) => (
                    <span key={i} className="text-[8px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">{tech}</span>
                ))}
            </div>

            <button onClick={() => setExpanded(!expanded)} className="text-[9px] text-purple-400 font-bold uppercase tracking-widest hover:text-purple-300">
                {expanded ? '▴ Collapse' : '▾ Full Analysis'}
            </button>

            <AnimatePresence>
                {expanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="mt-4 space-y-3">
                            <div>
                                <span className="text-[8px] font-black text-green-400 uppercase tracking-widest block mb-1">✓ Strengths</span>
                                {competitor.strengths?.map((s, i) => (
                                    <p key={i} className="text-[10px] text-slate-400 pl-3 border-l-2 border-green-500/30 mb-1">{s}</p>
                                ))}
                            </div>
                            <div>
                                <span className="text-[8px] font-black text-red-400 uppercase tracking-widest block mb-1">✗ Weaknesses</span>
                                {competitor.weaknesses?.map((w, i) => (
                                    <p key={i} className="text-[10px] text-slate-400 pl-3 border-l-2 border-red-500/30 mb-1">{w}</p>
                                ))}
                            </div>
                            <div>
                                <span className="text-[8px] font-black text-amber-400 uppercase tracking-widest block mb-1">⚡ Conversion Tactics</span>
                                {competitor.conversionTactics?.map((t, i) => (
                                    <p key={i} className="text-[10px] text-slate-400 pl-3 border-l-2 border-amber-500/30 mb-1">{t}</p>
                                ))}
                            </div>
                            <div className="bg-purple-500/5 rounded-lg p-3 border border-purple-500/10">
                                <span className="text-[8px] font-black text-purple-400 uppercase tracking-widest block mb-1">🏆 Why They Win</span>
                                <p className="text-[10px] text-slate-300">{competitor.whyTheyWin}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// === PAGE SECTION RENDERER ===
const SectionBlock: React.FC<{ section: PRDSection; sectionIndex: number }> = ({ section, sectionIndex }) => {
    const [expanded, setExpanded] = useState(false);
    const { copiedId, copy } = useCopy();

    return (
        <div className="bg-white/[0.02] rounded-xl border border-white/5 p-4 hover:border-purple-500/20 transition-all group">
            <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-purple-500/60">S{sectionIndex + 1}</span>
                    <h5 className="text-[11px] font-black text-white uppercase tracking-wide">{section.name}</h5>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[8px] py-0.5 px-2 rounded bg-white/5 text-slate-500 font-mono">{section.height}</span>
                    <button onClick={() => setExpanded(!expanded)} className="text-[8px] text-purple-400 font-bold">
                        {expanded ? '▴' : '▾'}
                    </button>
                </div>
            </div>

            <p className="text-[9px] text-slate-500 mb-2 italic">{section.purpose}</p>

            {/* Layout + Background Quick Preview */}
            <div className="flex gap-2 flex-wrap mb-2">
                <span className="text-[8px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">{section.layout?.substring(0, 50)}{section.layout?.length > 50 ? '...' : ''}</span>
                <span className="text-[8px] px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20">BG: {section.background?.type}</span>
                {section.animations?.parallax && <span className="text-[8px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">Parallax</span>}
            </div>

            <AnimatePresence>
                {expanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="mt-3 space-y-3 pt-3 border-t border-white/5">
                            {/* Layout Details */}
                            <div>
                                <span className="text-[8px] font-black text-purple-400 uppercase tracking-widest flex items-center gap-1 mb-1">
                                    <Layout className="w-3 h-3" /> Layout
                                </span>
                                <p className="text-[10px] text-slate-400">{section.layout}</p>
                            </div>

                            {/* Background */}
                            <div>
                                <span className="text-[8px] font-black text-purple-400 uppercase tracking-widest flex items-center gap-1 mb-1">
                                    <Paintbrush className="w-3 h-3" /> Background
                                </span>
                                <p className="text-[10px] text-slate-400">Type: {section.background?.type}</p>
                                <p className="text-[10px] text-slate-400 font-mono">{section.background?.value}</p>
                                {section.background?.overlay && <p className="text-[10px] text-slate-400 font-mono">Overlay: {section.background.overlay}</p>}
                            </div>

                            {/* Content */}
                            {section.content?.headline && (
                                <div>
                                    <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-1 mb-1">
                                        <Type className="w-3 h-3" /> Headline ({section.content.headline.tag})
                                    </span>
                                    <p className="text-xs font-bold text-white">{section.content.headline.text}</p>
                                    <p className="text-[9px] text-slate-500 italic">{section.content.headline.style}</p>
                                    {section.content.headline.animation && (
                                        <p className="text-[9px] text-amber-400/60 mt-1">Animation: {section.content.headline.animation}</p>
                                    )}
                                </div>
                            )}

                            {section.content?.subheadline && (
                                <div>
                                    <span className="text-[8px] font-black text-blue-400/70 uppercase tracking-widest mb-1 block">Subheadline</span>
                                    <p className="text-[10px] text-slate-300">{section.content.subheadline.text}</p>
                                </div>
                            )}

                            {section.content?.bodyText && (
                                <div>
                                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1 block">Body Text</span>
                                    <p className="text-[10px] text-slate-400">{section.content.bodyText}</p>
                                </div>
                            )}

                            {/* Stats */}
                            {section.content?.statistics && section.content.statistics.length > 0 && (
                                <div>
                                    <span className="text-[8px] font-black text-green-400 uppercase tracking-widest flex items-center gap-1 mb-2">
                                        <BarChart3 className="w-3 h-3" /> Statistics
                                    </span>
                                    <div className="grid grid-cols-3 gap-2">
                                        {section.content.statistics.map((stat, i) => (
                                            <div key={i} className="bg-white/[0.03] rounded-lg p-2 text-center border border-white/5">
                                                <div className="text-sm font-black text-white">{stat.value}</div>
                                                <div className="text-[8px] text-slate-500 uppercase tracking-wider">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Cards */}
                            {section.content?.cards && section.content.cards.length > 0 && (
                                <div>
                                    <span className="text-[8px] font-black text-cyan-400 uppercase tracking-widest flex items-center gap-1 mb-2">
                                        <Box className="w-3 h-3" /> Cards ({section.content.cards.length})
                                    </span>
                                    <div className="grid grid-cols-2 gap-2">
                                        {section.content.cards.map((card, i) => (
                                            <div key={i} className="bg-white/[0.03] rounded-lg p-3 border border-white/5">
                                                <div className="text-[9px] text-purple-400 mb-1">{card.icon}</div>
                                                <div className="text-[10px] font-bold text-white mb-1">{card.title}</div>
                                                <div className="text-[9px] text-slate-500">{card.description}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Images */}
                            {section.content?.images && section.content.images.length > 0 && (
                                <div>
                                    <span className="text-[8px] font-black text-fuchsia-400 uppercase tracking-widest flex items-center gap-1 mb-2">
                                        <Image className="w-3 h-3" /> Images ({section.content.images.length})
                                    </span>
                                    {section.content.images.map((img, i) => (
                                        <div key={i} className="bg-fuchsia-500/5 rounded-lg p-3 border border-fuchsia-500/10 mb-2">
                                            <p className="text-[9px] text-slate-400 mb-1"><strong>Description:</strong> {img.description}</p>
                                            <p className="text-[9px] text-slate-500 mb-1"><strong>Placement:</strong> {img.placement} | {img.dimensions}</p>
                                            <div className="flex items-center justify-between">
                                                <p className="text-[8px] text-fuchsia-400/70 italic flex-1">Prompt: {img.generationPrompt?.substring(0, 100)}...</p>
                                                <button
                                                    onClick={() => copy(img.generationPrompt || '', `img-${i}`)}
                                                    className="text-[8px] text-purple-400 hover:text-purple-300 flex items-center gap-1"
                                                >
                                                    {copiedId === `img-${i}` ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Testimonials */}
                            {section.content?.testimonials && section.content.testimonials.length > 0 && (
                                <div>
                                    <span className="text-[8px] font-black text-amber-400 uppercase tracking-widest flex items-center gap-1 mb-2">
                                        <Star className="w-3 h-3" /> Testimonials
                                    </span>
                                    {section.content.testimonials.map((t, i) => (
                                        <div key={i} className="bg-amber-500/5 rounded-lg p-3 border border-amber-500/10 mb-2">
                                            <p className="text-[10px] text-slate-300 italic">"{t.quote}"</p>
                                            <p className="text-[9px] text-amber-400 mt-1">— {t.author}, {t.role}{t.company ? `, ${t.company}` : ''}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* CTA */}
                            {section.cta && (
                                <div className="bg-green-500/5 rounded-lg p-3 border border-green-500/10">
                                    <span className="text-[8px] font-black text-green-400 uppercase tracking-widest flex items-center gap-1 mb-2">
                                        <MousePointer className="w-3 h-3" /> Call to Action
                                    </span>
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <p className="text-[10px] text-white font-bold">Primary: {section.cta.primaryText}</p>
                                            <p className="text-[9px] text-slate-500">{section.cta.primaryStyle}</p>
                                        </div>
                                        {section.cta.secondaryText && (
                                            <div>
                                                <p className="text-[10px] text-white/70 font-bold">Secondary: {section.cta.secondaryText}</p>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-[8px] text-green-400/60 mt-1">Placement: {section.cta.placement}</p>
                                </div>
                            )}

                            {/* Animations */}
                            <div>
                                <span className="text-[8px] font-black text-amber-400 uppercase tracking-widest flex items-center gap-1 mb-1">
                                    <Sparkles className="w-3 h-3" /> Animations
                                </span>
                                <p className="text-[9px] text-slate-400">Entrance: {section.animations?.entrance}</p>
                                {section.animations?.hover && <p className="text-[9px] text-slate-400">Hover: {section.animations.hover}</p>}
                                {section.animations?.scroll && <p className="text-[9px] text-slate-400">Scroll: {section.animations.scroll}</p>}
                                {section.animations?.microInteractions?.map((m, i) => (
                                    <p key={i} className="text-[9px] text-amber-400/50">• {m}</p>
                                ))}
                            </div>

                            {/* Responsive */}
                            <div>
                                <span className="text-[8px] font-black text-cyan-400 uppercase tracking-widest flex items-center gap-1 mb-1">
                                    <Smartphone className="w-3 h-3" /> Responsive
                                </span>
                                <div className="grid grid-cols-3 gap-2">
                                    <div className="bg-white/[0.02] rounded-lg p-2 text-center">
                                        <Smartphone className="w-3 h-3 text-cyan-500 mx-auto mb-1" />
                                        <p className="text-[8px] text-slate-400">{section.responsive?.mobile}</p>
                                    </div>
                                    <div className="bg-white/[0.02] rounded-lg p-2 text-center">
                                        <Tablet className="w-3 h-3 text-cyan-500 mx-auto mb-1" />
                                        <p className="text-[8px] text-slate-400">{section.responsive?.tablet}</p>
                                    </div>
                                    <div className="bg-white/[0.02] rounded-lg p-2 text-center">
                                        <Monitor className="w-3 h-3 text-cyan-500 mx-auto mb-1" />
                                        <p className="text-[8px] text-slate-400">{section.responsive?.desktop}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// === PAGE RENDERER ===
const PageBlock: React.FC<{ page: PRDPage; pageIndex: number }> = ({ page, pageIndex }) => {
    const [expanded, setExpanded] = useState(pageIndex === 0);
    const pageColors = ['purple', 'blue', 'green', 'amber', 'cyan', 'red'];
    const color = pageColors[pageIndex % pageColors.length];

    return (
        <div className="mb-4">
            <button
                onClick={() => setExpanded(!expanded)}
                className={`w-full flex items-center justify-between px-5 py-4 rounded-xl bg-gradient-to-r from-${color}-500/10 to-transparent border border-${color}-500/20 transition-all hover:border-${color}-500/40 group`}
            >
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono font-black text-slate-500">P{pageIndex + 1}</span>
                    <div className="text-left">
                        <span className="text-[11px] font-black uppercase tracking-[0.15em] text-white block">{page.name}</span>
                        <span className="text-[9px] text-slate-500 font-mono">{page.slug}</span>
                    </div>
                    <span className="text-[8px] px-2 py-0.5 rounded bg-white/5 text-slate-500 font-bold">{page.sections?.length || 0} sections</span>
                </div>
                {expanded ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
            </button>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-4 pl-4 space-y-3">
                            {/* Page Meta */}
                            <div className="bg-white/[0.02] rounded-lg p-3 border border-white/5">
                                <p className="text-[9px] text-purple-400 font-bold mb-1">SEO Title: <span className="text-white font-normal">{page.title}</span></p>
                                <p className="text-[9px] text-slate-500 italic">{page.metaDescription}</p>
                                <p className="text-[9px] text-slate-600 mt-1">Purpose: {page.purpose}</p>
                            </div>

                            {/* Sections */}
                            {page.sections?.map((section, si) => (
                                <SectionBlock key={section.id || si} section={section} sectionIndex={si} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


// ============================================================
// MAIN PRD PANEL
// ============================================================
const PRDPanel: React.FC<PRDPanelProps> = ({ prd }) => {
    const { copiedId, copy } = useCopy();
    const ds = prd.designSystem;
    const totalSections = prd.pages?.reduce((sum, p) => sum + (p.sections?.length || 0), 0) || 0;

    const handleExportPRD = () => {
        const blob = new Blob([JSON.stringify(prd, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${prd.clientName?.replace(/\s+/g, '_') || 'website'}_PRD_v${prd.version}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleCopyAllPrompts = () => {
        const prompts = prd.imagePrompts?.map(p => `[${p.page} — ${p.section}]\n${p.prompt}`).join('\n\n---\n\n') || '';
        navigator.clipboard.writeText(prompts);
        copy('all', 'all-prompts');
    };

    return (
        <div className="h-full overflow-y-auto custom-scrollbar px-5 py-6 space-y-4">

            {/* === HEADER STATS === */}
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h2 className="text-lg font-black text-white uppercase tracking-tight italic">
                        {prd.projectName}
                    </h2>
                    <p className="text-[9px] text-slate-500 uppercase tracking-widest">
                        v{prd.version} • Generated {new Date(prd.generatedAt).toLocaleDateString()}
                    </p>
                </div>
                <button
                    onClick={handleExportPRD}
                    className="btn-tactical btn-tactical-purple"
                >
                    <FileText className="w-3.5 h-3.5" />
                    EXPORT_PRD_JSON
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-3">
                {[
                    { label: 'Pages', value: prd.pages?.length || 0, icon: <Layers className="w-3.5 h-3.5 text-purple-500" /> },
                    { label: 'Sections', value: totalSections, icon: <Layout className="w-3.5 h-3.5 text-blue-500" /> },
                    { label: 'Competitors', value: prd.competitorAnalysis?.competitors?.length || 0, icon: <Target className="w-3.5 h-3.5 text-red-500" /> },
                    { label: 'Images', value: prd.imagePrompts?.length || 0, icon: <Image className="w-3.5 h-3.5 text-fuchsia-500" /> },
                ].map((stat, i) => (
                    <div key={i} className="bg-white/[0.03] rounded-xl border border-white/5 p-3 text-center">
                        <div className="flex justify-center mb-1">{stat.icon}</div>
                        <div className="text-xl font-black text-white">{stat.value}</div>
                        <div className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* === EXECUTIVE SUMMARY === */}
            <CollapsibleSection title="Executive Summary" icon={<FileText className="w-4 h-4 text-purple-400" />} defaultOpen accentColor="purple">
                <p className="text-[11px] text-slate-300 leading-relaxed mb-4">{prd.executiveSummary}</p>

                <div className="mb-4">
                    <span className="text-[8px] font-black text-purple-400 uppercase tracking-widest mb-2 block">Project Goals</span>
                    <div className="space-y-1.5">
                        {prd.projectGoals?.map((goal, i) => (
                            <div key={i} className="flex items-start gap-2">
                                <CheckCircle className="w-3 h-3 text-green-500 shrink-0 mt-0.5" />
                                <span className="text-[10px] text-slate-400">{goal}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/[0.03] rounded-lg p-3 border border-white/5">
                        <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest block mb-1">Target Audience</span>
                        <p className="text-[10px] text-slate-400">{prd.targetAudience}</p>
                    </div>
                    <div className="bg-white/[0.03] rounded-lg p-3 border border-white/5">
                        <span className="text-[8px] font-black text-green-400 uppercase tracking-widest block mb-1">Value Proposition</span>
                        <p className="text-[10px] text-slate-400">{prd.uniqueValueProposition}</p>
                    </div>
                </div>
            </CollapsibleSection>

            {/* === COMPETITOR ANALYSIS === */}
            <CollapsibleSection
                title="Competitor Analysis"
                icon={<Target className="w-4 h-4 text-red-400" />}
                badge={`${prd.competitorAnalysis?.competitors?.length || 0} analyzed`}
                accentColor="red"
            >
                <div className="space-y-3 mb-4">
                    {prd.competitorAnalysis?.competitors?.map((comp, i) => (
                        <CompetitorCard key={i} competitor={comp} index={i} />
                    ))}
                </div>

                {/* Strategy Summary */}
                <div className="bg-purple-500/5 rounded-xl p-4 border border-purple-500/10 mb-4">
                    <span className="text-[8px] font-black text-purple-400 uppercase tracking-widest block mb-2">🎯 What Winners Do Differently</span>
                    <p className="text-[10px] text-slate-300 leading-relaxed">{prd.competitorAnalysis?.whatWinnersDoDifferently}</p>
                </div>

                <div className="bg-green-500/5 rounded-xl p-4 border border-green-500/10 mb-4">
                    <span className="text-[8px] font-black text-green-400 uppercase tracking-widest block mb-2">📋 Strategy for {prd.clientName}</span>
                    <p className="text-[10px] text-slate-300 leading-relaxed">{prd.competitorAnalysis?.strategyForClient}</p>
                </div>

                {/* Trends */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest block mb-2">Industry Trends</span>
                        {prd.competitorAnalysis?.industryTrends?.map((t, i) => (
                            <div key={i} className="flex items-center gap-2 mb-1">
                                <TrendingUp className="w-3 h-3 text-blue-500" />
                                <span className="text-[9px] text-slate-400">{t}</span>
                            </div>
                        ))}
                    </div>
                    <div>
                        <span className="text-[8px] font-black text-fuchsia-400 uppercase tracking-widest block mb-2">Design Trends</span>
                        {prd.competitorAnalysis?.designTrends?.map((t, i) => (
                            <div key={i} className="flex items-center gap-2 mb-1">
                                <Paintbrush className="w-3 h-3 text-fuchsia-500" />
                                <span className="text-[9px] text-slate-400">{t}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </CollapsibleSection>

            {/* === DESIGN SYSTEM === */}
            <CollapsibleSection title="Design System" icon={<Palette className="w-4 h-4 text-fuchsia-400" />} accentColor="purple">
                <p className="text-[10px] text-slate-400 italic mb-4">"{ds?.designPhilosophy}"</p>

                {/* Color Palette */}
                <span className="text-[8px] font-black text-purple-400 uppercase tracking-widest block mb-3">Color Palette</span>
                <div className="flex flex-wrap gap-4 mb-6">
                    {ds?.colorPalette && Object.entries(ds.colorPalette).filter(([k]) => k !== 'gradient').map(([key, hex]) => (
                        <ColorSwatch key={key} hex={hex as string} label={key} />
                    ))}
                </div>
                {ds?.colorPalette?.gradient && (
                    <div className="mb-6">
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block mb-2">Gradient</span>
                        <div className="h-10 rounded-xl" style={{ background: ds.colorPalette.gradient }} />
                        <p className="text-[8px] font-mono text-slate-600 mt-1">{ds.colorPalette.gradient}</p>
                    </div>
                )}

                {/* Typography */}
                <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest block mb-3">Typography</span>
                <div className="grid grid-cols-2 gap-3 mb-6">
                    {ds?.typography && Object.entries(ds.typography).map(([key, value]) => (
                        <div key={key} className="bg-white/[0.03] rounded-lg p-3 border border-white/5">
                            <span className="text-[8px] text-slate-500 uppercase tracking-wider block mb-1">{key.replace(/([A-Z])/g, ' $1')}</span>
                            <span className="text-[10px] text-white font-bold">{value as string}</span>
                        </div>
                    ))}
                </div>

                {/* Button Styles */}
                <span className="text-[8px] font-black text-green-400 uppercase tracking-widest block mb-3">Button Styles</span>
                <div className="space-y-2 mb-4">
                    {ds?.buttonStyle && Object.entries(ds.buttonStyle).map(([key, value]) => (
                        <div key={key} className="bg-white/[0.02] rounded-lg p-3 border border-white/5 flex items-center gap-3">
                            <span className="text-[8px] text-slate-500 uppercase tracking-wider w-20 shrink-0">{key}</span>
                            <span className="text-[9px] text-slate-400 font-mono">{value as string}</span>
                        </div>
                    ))}
                </div>

                {/* Spacing & Misc */}
                <div className="grid grid-cols-3 gap-3">
                    {ds?.spacing && Object.entries(ds.spacing).map(([key, value]) => (
                        <div key={key} className="bg-white/[0.03] rounded-lg p-3 border border-white/5 text-center">
                            <span className="text-[8px] text-slate-500 uppercase tracking-wider block mb-1">{key.replace(/([A-Z])/g, ' $1')}</span>
                            <span className="text-[10px] text-white font-bold">{value as string}</span>
                        </div>
                    ))}
                </div>
            </CollapsibleSection>

            {/* === PAGES (THE BIG ONE) === */}
            <CollapsibleSection
                title="Pages & Sections"
                icon={<Layers className="w-4 h-4 text-blue-400" />}
                defaultOpen
                badge={`${prd.pages?.length || 0} pages / ${totalSections} sections`}
                accentColor="blue"
            >
                {prd.pages?.map((page, pi) => (
                    <PageBlock key={page.id || pi} page={page} pageIndex={pi} />
                ))}
            </CollapsibleSection>

            {/* === GLOBAL COMPONENTS === */}
            <CollapsibleSection title="Global Components" icon={<Box className="w-4 h-4 text-green-400" />} accentColor="green">
                {/* Header */}
                <div className="bg-white/[0.02] rounded-xl p-4 border border-white/5 mb-3">
                    <span className="text-[8px] font-black text-purple-400 uppercase tracking-widest block mb-2">Header / Navigation</span>
                    {prd.globalComponents?.header && Object.entries(prd.globalComponents.header).map(([key, value]) => (
                        <div key={key} className="flex items-start gap-2 mb-1">
                            <span className="text-[8px] text-slate-500 uppercase w-24 shrink-0">{key.replace(/([A-Z])/g, ' $1')}</span>
                            <span className="text-[9px] text-slate-400">{Array.isArray(value) ? value.join(', ') : String(value)}</span>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="bg-white/[0.02] rounded-xl p-4 border border-white/5 mb-3">
                    <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest block mb-2">Footer</span>
                    <p className="text-[9px] text-slate-400 mb-2">Style: {prd.globalComponents?.footer?.style}</p>
                    <div className="grid grid-cols-2 gap-2">
                        {prd.globalComponents?.footer?.columns?.map((col, i) => (
                            <div key={i} className="bg-white/[0.02] rounded-lg p-2">
                                <span className="text-[8px] font-bold text-white block mb-1">{col.title}</span>
                                {col.links?.map((link, li) => (
                                    <span key={li} className="text-[8px] text-slate-500 block">{link}</span>
                                ))}
                            </div>
                        ))}
                    </div>
                    <p className="text-[8px] text-slate-600 mt-2">{prd.globalComponents?.footer?.copyright}</p>
                </div>

                {/* Chatbot */}
                {prd.globalComponents?.chatbot?.enabled && (
                    <div className="bg-green-500/5 rounded-xl p-4 border border-green-500/10 mb-3">
                        <span className="text-[8px] font-black text-green-400 uppercase tracking-widest flex items-center gap-1 mb-2">
                            <MessageSquare className="w-3 h-3" /> Chatbot Configuration
                        </span>
                        {Object.entries(prd.globalComponents.chatbot).map(([key, value]) => (
                            <div key={key} className="flex items-start gap-2 mb-1">
                                <span className="text-[8px] text-slate-500 uppercase w-28 shrink-0">{key.replace(/([A-Z])/g, ' $1')}</span>
                                <span className="text-[9px] text-slate-400">{Array.isArray(value) ? value.join(' | ') : String(value)}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Cookie Banner */}
                {prd.globalComponents?.cookieBanner?.enabled && (
                    <div className="bg-white/[0.02] rounded-xl p-4 border border-white/5">
                        <span className="text-[8px] font-black text-amber-400 uppercase tracking-widest block mb-2">Cookie Banner</span>
                        <p className="text-[9px] text-slate-400">{prd.globalComponents.cookieBanner.text}</p>
                        <p className="text-[8px] text-slate-600 mt-1">Style: {prd.globalComponents.cookieBanner.style}</p>
                    </div>
                )}
            </CollapsibleSection>

            {/* === FORMS === */}
            {prd.forms && prd.forms.length > 0 && (
                <CollapsibleSection title="Forms" icon={<CheckSquare className="w-4 h-4 text-amber-400" />} badge={`${prd.forms.length} forms`} accentColor="amber">
                    {prd.forms.map((form, fi) => (
                        <div key={fi} className="bg-white/[0.02] rounded-xl p-4 border border-white/5 mb-3">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <span className="text-[11px] font-black text-white uppercase tracking-wide">{form.name}</span>
                                    <span className="text-[8px] text-slate-500 block">Page: {form.page}</span>
                                </div>
                            </div>
                            <div className="space-y-2 mb-3">
                                {form.fields?.map((field, ffi) => (
                                    <div key={ffi} className="flex items-center gap-3 bg-white/[0.02] rounded-lg p-2 border border-white/5">
                                        <span className="text-[8px] text-purple-400 font-mono w-20 shrink-0">{field.type}</span>
                                        <span className="text-[9px] text-white flex-1">{field.name}</span>
                                        <span className="text-[8px] text-slate-500">{field.placeholder}</span>
                                        {field.required && <span className="text-[7px] text-red-400 font-bold">REQ</span>}
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-[8px] text-green-400">Submit: {form.submitButton}</span>
                                <span className="text-[8px] text-slate-500">Success: {form.successMessage}</span>
                            </div>
                        </div>
                    ))}
                </CollapsibleSection>
            )}

            {/* === IMAGE PROMPTS === */}
            {prd.imagePrompts && prd.imagePrompts.length > 0 && (
                <CollapsibleSection title="Image Generation Prompts" icon={<Image className="w-4 h-4 text-fuchsia-400" />} badge={`${prd.imagePrompts.length} images`} accentColor="purple">
                    <button
                        onClick={handleCopyAllPrompts}
                        className="mb-4 btn-tactical btn-tactical-fuchsia"
                    >
                        {copiedId === 'all-prompts' ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedId === 'all-prompts' ? 'COPIED_ALL' : 'COPY_ALL_PROMPTS'}
                    </button>

                    {prd.imagePrompts.map((img, i) => (
                        <div key={i} className="bg-white/[0.02] rounded-xl p-4 border border-white/5 mb-3 hover:border-fuchsia-500/20 transition-all">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-mono font-bold text-fuchsia-500/60">IMG-{i + 1}</span>
                                    <span className="text-[10px] font-bold text-white">{img.description}</span>
                                </div>
                                <button
                                    onClick={() => copy(img.prompt, `prompt-${i}`)}
                                    className="text-[8px] text-purple-400 hover:text-purple-300 flex items-center gap-1"
                                >
                                    {copiedId === `prompt-${i}` ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                    {copiedId === `prompt-${i}` ? 'Copied' : 'Copy'}
                                </button>
                            </div>
                            <div className="flex gap-2 mb-2">
                                <span className="text-[8px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-400">{img.page}</span>
                                <span className="text-[8px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400">{img.section}</span>
                                <span className="text-[8px] px-2 py-0.5 rounded bg-white/5 text-slate-400 font-mono">{img.dimensions}</span>
                            </div>
                            <p className="text-[9px] text-slate-400 bg-black/30 rounded-lg p-3 font-mono leading-relaxed">{img.prompt}</p>
                        </div>
                    ))}
                </CollapsibleSection>
            )}

            {/* === SEO STRATEGY === */}
            <CollapsibleSection title="SEO Strategy" icon={<Search className="w-4 h-4 text-green-400" />} accentColor="green">
                <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                        <span className="text-[8px] font-black text-green-400 uppercase tracking-widest block mb-2">Primary Keywords</span>
                        <div className="flex flex-wrap gap-1">
                            {prd.seoStrategy?.primaryKeywords?.map((kw, i) => (
                                <span key={i} className="text-[8px] px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20">{kw}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest block mb-2">Secondary Keywords</span>
                        <div className="flex flex-wrap gap-1">
                            {prd.seoStrategy?.secondaryKeywords?.map((kw, i) => (
                                <span key={i} className="text-[8px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">{kw}</span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="bg-white/[0.02] rounded-lg p-3 border border-white/5">
                    <p className="text-[9px] text-slate-400">Local SEO: {prd.seoStrategy?.localSEO ? '✓ Enabled' : '✗ Disabled'}</p>
                    <p className="text-[9px] text-slate-400 mt-1">Schema Markup: {prd.seoStrategy?.schemaMarkup?.join(', ')}</p>
                </div>
            </CollapsibleSection>

            {/* === TECH STACK === */}
            <CollapsibleSection title="Tech Stack" icon={<Code className="w-4 h-4 text-cyan-400" />} accentColor="cyan">
                <div className="grid grid-cols-2 gap-3">
                    {prd.techStack && Object.entries(prd.techStack).map(([key, value]) => (
                        <div key={key} className="bg-white/[0.03] rounded-xl p-3 border border-white/5 flex items-center gap-3">
                            <Hash className="w-3.5 h-3.5 text-cyan-500" />
                            <div>
                                <span className="text-[8px] text-slate-500 uppercase tracking-wider block">{key}</span>
                                <span className="text-[10px] text-white font-bold">{value as string}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CollapsibleSection>

            {/* === LAUNCH CHECKLIST === */}
            {prd.launchChecklist && prd.launchChecklist.length > 0 && (
                <CollapsibleSection title="Launch Checklist" icon={<Zap className="w-4 h-4 text-amber-400" />} accentColor="amber">
                    <div className="space-y-2">
                        {prd.launchChecklist.map((item, i) => (
                            <div key={i} className="flex items-center gap-3 bg-white/[0.02] rounded-lg p-3 border border-white/5">
                                <div className="w-5 h-5 rounded border border-white/10 flex items-center justify-center text-[8px] text-slate-500 font-mono">{i + 1}</div>
                                <span className="text-[10px] text-slate-400">{item}</span>
                            </div>
                        ))}
                    </div>
                </CollapsibleSection>
            )}

            {/* === RESEARCH SOURCES === */}
            {prd.researchSources && prd.researchSources.length > 0 && (
                <div className="mt-6 pt-4 border-t border-white/5">
                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest block mb-2">Research Queries Used</span>
                    <div className="flex flex-wrap gap-1">
                        {prd.researchSources.map((src, i) => (
                            <span key={i} className="text-[7px] text-slate-600 bg-white/[0.02] px-2 py-0.5 rounded font-mono">{src}</span>
                        ))}
                    </div>
                </div>
            )}

            {/* Bottom padding */}
            <div className="h-20" />
        </div>
    );
};

export default PRDPanel;

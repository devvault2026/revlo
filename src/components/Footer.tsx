import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#020408] text-white py-24 border-t border-white/5 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-purple-900/10 to-transparent opacity-50" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    {/* Brand */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-0">
                            <span className="text-3xl font-black font-display text-white italic tracking-tighter">REVLO</span>
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2">AGENCY</span>
                        </div>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-xs italic">
                            Scaling premium brands through strategic leverage,
                            managed operations, and elite acquisition systems.
                        </p>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-8">Capabilities</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/services" className="text-sm font-medium text-slate-500 hover:text-white transition-all uppercase tracking-[0.2em]">
                                    Brand Strategy
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="text-sm font-medium text-slate-500 hover:text-white transition-all uppercase tracking-[0.2em]">
                                    Managed Growth
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="text-sm font-medium text-slate-500 hover:text-white transition-all uppercase tracking-[0.2em]">
                                    Media Buying
                                </Link>
                            </li>
                            <li>
                                <Link to="/ghl-automation" className="text-sm font-medium text-slate-500 hover:text-white transition-all uppercase tracking-[0.2em]">
                                    GHL Automation
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="text-sm font-medium text-slate-500 hover:text-white transition-all uppercase tracking-[0.2em]">
                                    Sales Automation
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-8">Partnership</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/team" className="text-sm font-medium text-slate-500 hover:text-white transition-all uppercase tracking-[0.2em]">
                                    The Architect
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="text-sm font-medium text-slate-500 hover:text-white transition-all uppercase tracking-[0.2em]">
                                    Partner Portal
                                </Link>
                            </li>
                            <li>
                                <Link to="/results" className="text-sm font-medium text-slate-500 hover:text-white transition-all uppercase tracking-[0.2em]">
                                    Success Stories
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-sm font-medium text-slate-500 hover:text-white transition-all uppercase tracking-[0.2em]">
                                    Contact Me
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-8">Portal Access</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/login" className="text-sm font-medium text-slate-500 hover:text-white transition-all uppercase tracking-[0.2em]">
                                    Partner Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className="text-sm font-medium text-slate-500 hover:text-white transition-all uppercase tracking-[0.2em]">
                                    Client Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">
                        © {currentYear} REVLO AGENCY. STRATEGY & GROWTH.
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.3)]" />
                        <span className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">Partner Status: ACTIVE</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};


export default Footer;

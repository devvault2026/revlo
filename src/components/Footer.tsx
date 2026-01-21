import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-white py-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-2xl font-black font-display gradient-text">REVLO</span>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">AGENCY</span>
                        </div>
                        <p className="text-slate-400 leading-relaxed">
                            Scaling brands to 7-figure ARR through proprietary AI technology and
                            40+ years combined marketing expertise.
                        </p>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Services</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/services" className="text-slate-400 hover:text-white transition-colors">
                                    Brand Identity
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="text-slate-400 hover:text-white transition-colors">
                                    Growth Hacking
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="text-slate-400 hover:text-white transition-colors">
                                    Media Buying
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="text-slate-400 hover:text-white transition-colors">
                                    Lead Generation
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/team" className="text-slate-400 hover:text-white transition-colors">
                                    Team
                                </Link>
                            </li>
                            <li>
                                <Link to="/revlo-os" className="text-slate-400 hover:text-white transition-colors">
                                    Revlo OS
                                </Link>
                            </li>
                            <li>
                                <Link to="/results" className="text-slate-400 hover:text-white transition-colors">
                                    Results
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Resources</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/admin" className="text-slate-400 hover:text-white transition-colors">
                                    Admin
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className="text-slate-400 hover:text-white transition-colors">
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">
                        © {currentYear} Revlo Agency. All rights reserved.
                    </p>
                    <p className="text-slate-500 text-sm">
                        Built with precision. Powered by AI.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

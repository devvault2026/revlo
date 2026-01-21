import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useAppStore } from '../store/appStore';

const Navigation: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { isMenuOpen, toggleMenu, closeMenu } = useAppStore();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        closeMenu();
    }, [location, closeMenu]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Team', path: '/team' },
        { name: 'Revlo OS', path: '/revlo-os' },
        { name: 'Results', path: '/results' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-slate-200'
                : 'bg-white/80 backdrop-blur-md'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-0 group">
                        <img src="/logo.png" alt="Revlo" className="w-20 h-20 object-contain" />
                        <div className="flex items-center gap-2 -ml-3">
                            <span className="text-2xl font-black font-display gradient-text">
                                REVLO
                            </span>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                AGENCY
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link, index) => (
                            <motion.div
                                key={link.path}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    to={link.path}
                                    className={`relative font-medium text-sm transition-colors group ${location.pathname === link.path
                                        ? 'text-purple-600'
                                        : 'text-slate-600 hover:text-slate-900'
                                        }`}
                                >
                                    {link.name}
                                    <span
                                        className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-rainbow transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                                            }`}
                                    />
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <Link to="/contact" className="hidden md:block">
                        <motion.button
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-rainbow text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Book a Call
                        </motion.button>
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden bg-white border-t border-slate-200"
                >
                    <div className="px-6 py-4 space-y-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${location.pathname === link.path
                                    ? 'bg-purple-50 text-purple-700'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link to="/contact" className="block">
                            <button className="w-full px-4 py-3 bg-gradient-rainbow text-white font-semibold rounded-lg shadow-lg">
                                Book a Call
                            </button>
                        </Link>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
};

export default Navigation;

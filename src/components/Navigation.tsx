import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { useAuth } from '../context/AuthContext';

const Navigation: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { isMenuOpen, toggleMenu, closeMenu } = useAppStore();
    const location = useLocation();
    const { user } = useAuth();

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
        { name: 'Solutions', path: '/services' },
        { name: 'Build', path: '/elite-development' },
        { name: 'Takeoff', path: '/takeoff-agent' },
        { name: 'Team', path: '/team' },
        { name: 'SCOUT', path: '/scout' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-[#020408]/80 backdrop-blur-2xl border-b border-white/5'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-0 group">
                        <img src="/logo.png" alt="Revlo" className="w-20 h-20 object-contain brightness-0 invert" />
                        <div className="flex items-center gap-2 -ml-3">
                            <span className="text-2xl font-black font-display text-white italic tracking-tighter">
                                REVLO
                            </span>
                            <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em]">
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
                                    className={`relative font-black text-[10px] uppercase tracking-[0.2em] transition-colors group flex items-center gap-2 ${location.pathname === link.path
                                        ? 'text-white'
                                        : link.name === 'SCOUT' ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400 hover:text-white' : 'text-slate-500 hover:text-white'
                                        }`}
                                >
                                    {link.name}
                                    {link.name === 'SCOUT' && (
                                        <div className="flex items-center gap-1 px-1.5 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded text-[7px] text-purple-400 leading-none">
                                            <Sparkles className="w-2 h-2" />
                                            AI
                                        </div>
                                    )}
                                    <span
                                        className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-rainbow transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                                            }`}
                                    />
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Buttons Container */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* START PARTNER PORTAL BUTTON - HIDDEN FOR NOW */}
                        {/* <style>{`
                            .electric-button {
                                --h-button: 48px;
                                --w-button: 102px;
                                --round: 0.75rem;
                                cursor: pointer;
                                position: relative;
                                display: inline-flex;
                                align-items: center;
                                justify-content: center;
                                overflow: hidden;
                                transition: all 0.25s ease;
                                background: radial-gradient(
                                    65.28% 65.28% at 50% 100%,
                                    rgba(223, 113, 255, 0.8) 0%,
                                    rgba(223, 113, 255, 0) 100%
                                  ),
                                  linear-gradient(0deg, #7a5af8, #7a5af8);
                                border-radius: var(--round);
                                border: none;
                                outline: none;
                                padding: 12px 18px;
                            }
                            .electric-button::before,
                            .electric-button::after {
                                content: "";
                                position: absolute;
                                inset: var(--space);
                                transition: all 0.5s ease-in-out;
                                border-radius: calc(var(--round) - var(--space));
                                z-index: 0;
                            }
                            .electric-button::before {
                                --space: 1px;
                                background: linear-gradient(
                                  177.95deg,
                                  rgba(255, 255, 255, 0.19) 0%,
                                  rgba(255, 255, 255, 0) 100%
                                );
                            }
                            .electric-button::after {
                                --space: 2px;
                                background: radial-gradient(
                                    65.28% 65.28% at 50% 100%,
                                    rgba(223, 113, 255, 0.8) 0%,
                                    rgba(223, 113, 255, 0) 100%
                                  ),
                                  linear-gradient(0deg, #7a5af8, #7a5af8);
                            }
                            .electric-button:active {
                                transform: scale(0.95);
                            }

                            .fold {
                                z-index: 1;
                                position: absolute;
                                top: 0;
                                right: 0;
                                height: 1rem;
                                width: 1rem;
                                display: inline-block;
                                transition: all 0.5s ease-in-out;
                                background: radial-gradient(
                                  100% 75% at 55%,
                                  rgba(223, 113, 255, 0.8) 0%,
                                  rgba(223, 113, 255, 0) 100%
                                );
                                box-shadow: 0 0 3px black;
                                border-bottom-left-radius: 0.5rem;
                                border-top-right-radius: var(--round);
                            }
                            .fold::after {
                                content: "";
                                position: absolute;
                                top: 0;
                                right: 0;
                                width: 150%;
                                height: 150%;
                                transform: rotate(45deg) translateX(0%) translateY(-18px);
                                background-color: #e8e8e8;
                                pointer-events: none;
                            }
                            .electric-button:hover .fold {
                                margin-top: -1rem;
                                margin-right: -1rem;
                            }

                            .points_wrapper {
                                overflow: hidden;
                                width: 100%;
                                height: 100%;
                                pointer-events: none;
                                position: absolute;
                                z-index: 1;
                            }

                            .points_wrapper .point {
                                bottom: -10px;
                                position: absolute;
                                animation: floating-points infinite ease-in-out;
                                pointer-events: none;
                                width: 2px;
                                height: 2px;
                                background-color: #fff;
                                border-radius: 9999px;
                                }
                            @keyframes floating-points {
                                0% {
                                    transform: translateY(0);
                                }
                                85% {
                                    opacity: 0;
                                }
                                100% {
                                    transform: translateY(-55px);
                                    opacity: 0;
                                }
                            }
                            .points_wrapper .point:nth-child(1) {
                                left: 10%;
                                opacity: 1;
                                animation-duration: 2.35s;
                                animation-delay: 0.2s;
                            }
                            .points_wrapper .point:nth-child(2) {
                                left: 30%;
                                opacity: 0.7;
                                animation-duration: 2.5s;
                                animation-delay: 0.5s;
                            }
                            .points_wrapper .point:nth-child(3) {
                                left: 25%;
                                opacity: 0.8;
                                animation-duration: 2.2s;
                                animation-delay: 0.1s;
                            }
                            .points_wrapper .point:nth-child(4) {
                                left: 44%;
                                opacity: 0.6;
                                animation-duration: 2.05s;
                            }
                            .points_wrapper .point:nth-child(5) {
                                left: 50%;
                                opacity: 1;
                                animation-duration: 1.9s;
                            }
                            .points_wrapper .point:nth-child(6) {
                                left: 75%;
                                opacity: 0.5;
                                animation-duration: 1.5s;
                                animation-delay: 1.5s;
                            }
                            .points_wrapper .point:nth-child(7) {
                                left: 88%;
                                opacity: 0.9;
                                animation-duration: 2.2s;
                                animation-delay: 0.2s;
                            }
                            .points_wrapper .point:nth-child(8) {
                                left: 58%;
                                opacity: 0.8;
                                animation-duration: 2.25s;
                                animation-delay: 0.2s;
                            }
                            .points_wrapper .point:nth-child(9) {
                                left: 98%;
                                opacity: 0.6;
                                animation-duration: 2.6s;
                                animation-delay: 0.1s;
                            }
                            .points_wrapper .point:nth-child(10) {
                                left: 65%;
                                opacity: 1;
                                animation-duration: 2.5s;
                                animation-delay: 0.2s;
                            }

                            .inner {
                                z-index: 2;
                                gap: 6px;
                                position: relative;
                                width: 100%;
                                color: white;
                                display: inline-flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 16px;
                                font-weight: 500;
                                line-height: 1.5;
                                transition: color 0.2s ease-in-out;
                            }

                            .inner svg.icon {
                                width: 18px;
                                height: 18px;
                                transition: fill 0.1s linear;
                            }

                            .electric-button:focus svg.icon {
                                fill: white;
                            }
                            .electric-button:hover svg.icon {
                                fill: transparent;
                                animation:
                                  dasharray 1s linear forwards,
                                  filled 0.1s linear forwards 0.95s;
                            }
                            @keyframes dasharray {
                                from {
                                    stroke-dasharray: 0 0 0 0;
                                }
                                to {
                                    stroke-dasharray: 68 68 0 0;
                                }
                            }
                            @keyframes filled {
                                to {
                                    fill: white;
                                }
                            }
                        `}</style>

                        <Link
                            to={user ? "/revlo-os" : "/login"}
                            className="electric-button"
                        >
                            <span className="fold"></span>

                            <div className="points_wrapper">
                                <i className="point"></i>
                                <i className="point"></i>
                                <i className="point"></i>
                                <i className="point"></i>
                                <i className="point"></i>
                                <i className="point"></i>
                                <i className="point"></i>
                                <i className="point"></i>
                                <i className="point"></i>
                                <i className="point"></i>
                            </div>

                            <span className="inner uppercase tracking-widest text-[10px] font-black italic">
                                <svg
                                    className="icon"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.5"
                                >
                                    <polyline points="13.18 1.37 13.18 9.64 21.45 9.64 10.82 22.63 10.82 14.36 2.55 14.36 13.18 1.37" />
                                </svg>
                                {user ? 'PARTNER PORTAL' : 'LOGIN'}
                            </span>
                        </Link> */}
                        {/* END PARTNER PORTAL BUTTON */}

                        {/* CTA Button */}
                        <Link to="/contact">
                            <motion.button
                                className="flex items-center gap-2 px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 italic"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Book a Call
                            </motion.button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {
                isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#020408] border-t border-white/5"
                    >
                        <div className="px-6 py-4 space-y-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`block w-full text-left px-4 py-3 rounded-lg font-black uppercase tracking-widest text-[10px] transition-all ${location.pathname === link.path
                                        ? 'bg-white/5 text-white'
                                        : 'text-slate-500 hover:text-white'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link to="/contact" className="block">
                                <button className="w-full px-4 py-3 bg-white text-black font-black uppercase tracking-widest text-[10px] italic rounded-lg shadow-lg">
                                    Book a Call
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                )
            }
        </motion.nav >
    );
};

export default Navigation;

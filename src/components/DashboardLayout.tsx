import React from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    Zap,
    BarChart3,
    Settings,
    LogOut,
    ChevronRight,
    Menu,
    X
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, profile, signOut } = useAuth();

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const menuItems = [
        { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', path: '/admin' },
        { icon: <Users className="w-5 h-5" />, label: 'Leads', path: '/admin/leads' },
        { icon: <Zap className="w-5 h-5" />, label: 'Campaigns', path: '/admin/campaigns' },
        { icon: <BarChart3 className="w-5 h-5" />, label: 'Analytics', path: '/admin/analytics' },
        { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/admin/settings' },
    ];

    return (
        <div className="flex h-screen bg-slate-50">
            {/* Sidebar */}
            <motion.aside
                initial={{ x: -300 }}
                animate={{ x: isSidebarOpen ? 0 : -300 }}
                transition={{ duration: 0.3 }}
                className={`fixed lg:relative z-40 h-full bg-white border-r border-slate-200 ${isSidebarOpen ? 'w-64' : 'w-0'
                    } lg:w-64 transition-all duration-300`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-slate-200">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-black font-display gradient-text">REVLO</span>
                            <span className="text-xs font-bold text-slate-400 uppercase">OS</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">Growth Engine</p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2">
                        {menuItems.map((item, index) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={index}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive
                                        ? 'bg-gradient-rainbow text-white shadow-lg'
                                        : 'text-slate-600 hover:bg-slate-100'
                                        }`}
                                >
                                    <span className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}>
                                        {item.icon}
                                    </span>
                                    <span className="font-semibold">{item.label}</span>
                                    {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Section */}
                    <div className="p-4 border-t border-slate-200">
                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50">
                            <div className="w-10 h-10 bg-gradient-purple rounded-full flex items-center justify-center text-white font-bold">
                                {profile?.full_name?.charAt(0) || user?.email?.charAt(0) || 'A'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold truncate">{profile?.full_name || 'Admin User'}</p>
                                <p className="text-xs text-slate-500 truncate">{user?.email || 'admin@revlo.agency'}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="w-full mt-3 flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-red-600 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </motion.aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <header className="bg-white border-b border-slate-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                        >
                            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>

                        <div className="flex items-center gap-4 ml-auto">
                            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-full">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-sm font-semibold text-purple-700">System Active</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;

import React from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Briefcase,
    KanbanSquare,
    Inbox,
    Settings,
    Database,
    Bot,
    Phone,
    Book,
    FileText,
    LogOut,
    ChevronRight,
    Menu,
    Bell
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CommandPalette from './components/CommandPalette';
import { useAuth } from '../../context/AuthContext';

export type View = 'dashboard' | 'engine' | 'agents' | 'crm' | 'pipeline' | 'inbox' | 'phone' | 'vault' | 'docs' | 'settings';

interface RevloOSLayoutProps {
    children: React.ReactNode;
    currentView: View;
    setCurrentView: (view: View) => void;
}

const RevloOSLayout: React.FC<RevloOSLayoutProps> = ({ children, currentView, setCurrentView }) => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
    const [isCommandPaletteOpen, setIsCommandPaletteOpen] = React.useState(false);

    // Auth Hook
    const { user, profile, signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            // Optimistic navigation + direct cleanup
            console.log("Initializing secure sign-out sequence...");
            await signOut();
            navigate('/login', { replace: true });
        } catch (error) {
            console.error("Sign out process interrupted:", error);
            // Forced fallback redirect
            window.location.href = '/login';
        }
    };

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsCommandPaletteOpen(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const menuItems: { icon: React.ReactNode; label: string; view: View; group?: string }[] = [
        { group: "Monitoring", icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', view: 'dashboard' },
        { group: "Growth", icon: <Briefcase className="w-5 h-5" />, label: 'Lead Engine', view: 'engine' },
        { group: "Growth", icon: <Bot className="w-5 h-5" />, label: 'Agents', view: 'agents' },
        { group: "CRM", icon: <Database className="w-5 h-5" />, label: 'Database', view: 'crm' },
        { group: "CRM", icon: <KanbanSquare className="w-5 h-5" />, label: 'Pipeline', view: 'pipeline' },
        { group: "Inbox", icon: <Inbox className="w-5 h-5" />, label: 'Messages', view: 'inbox' },
        { group: "Inbox", icon: <Phone className="w-5 h-5" />, label: 'Voice', view: 'phone' },
        { group: "Resources", icon: <FileText className="w-5 h-5" />, label: 'Library', view: 'vault' },
        { group: "Resources", icon: <Book className="w-5 h-5" />, label: 'Docs', view: 'docs' },
        { group: "Settings", icon: <Settings className="w-5 h-5" />, label: 'Settings', view: 'settings' },
    ];

    // Group items
    const groupedItems = menuItems.reduce((acc, item) => {
        const group = item.group || 'Other';
        if (!acc[group]) acc[group] = [];
        acc[group].push(item);
        return acc;
    }, {} as Record<string, typeof menuItems>);

    const groups = ["Monitoring", "Growth", "CRM", "Inbox", "Resources", "Settings"];

    return (
        <div className="flex h-screen bg-[#020408] text-slate-200 overflow-hidden select-none">
            {/* Ambient Background Glows */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-md z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{
                    x: typeof window !== 'undefined' && window.innerWidth < 1024 ? (isSidebarOpen ? 0 : -300) : 0,
                    width: isSidebarCollapsed ? 90 : 280
                }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className={`fixed lg:relative z-[100] h-full bg-[#0a0c12]/80 backdrop-blur-xl border-r border-white/5 shadow-2xl lg:shadow-none`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo Section */}
                    <div className={`border-b border-white/5 relative transition-all duration-300 ${isSidebarCollapsed ? 'p-5' : 'p-8'}`}>
                        {isSidebarCollapsed ? (
                            <div className="flex items-center justify-center">
                                <div className="p-2 bg-gradient-rainbow rounded-xl shadow-lg shadow-purple-500/10">
                                    <img src="/logo.png" alt="R" className="w-6 h-6 object-contain brightness-0 invert" />
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-gradient-rainbow rounded-2xl shadow-xl shadow-purple-500/10">
                                    <img src="/logo.png" alt="Revlo" className="w-8 h-8 object-contain brightness-0 invert" />
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-2xl font-black font-display tracking-tight text-white">REVLO</span>
                                        <span className="text-[10px] font-black bg-purple-600 text-white px-1.5 py-0.5 rounded-md leading-none shadow-sm shadow-purple-200 uppercase tracking-widest">Portal</span>
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Partner Network</p>
                                </div>
                            </div>
                        )}

                        {/* Collapse Button - Desktop Only */}
                        <button
                            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                            className="hidden lg:flex absolute -right-3.5 top-8 w-7 h-7 bg-[#0a0c12] border border-white/10 rounded-full items-center justify-center shadow-md hover:shadow-lg hover:border-purple-500/50 transition-all z-50 group"
                        >
                            <ChevronRight className={`w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-transform ${isSidebarCollapsed ? '' : 'rotate-180'}`} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className={`flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar ${isSidebarCollapsed ? 'px-3' : 'px-5'} py-8 space-y-10`}>
                        {groups.map((group) => (
                            <div key={group}>
                                {!isSidebarCollapsed ? (
                                    <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4 px-3 opacity-60">{group}</div>
                                ) : (
                                    <div className="h-px bg-white/5 mb-6 mx-2" />
                                )}
                                <div className="space-y-1.5">
                                    {groupedItems[group]?.map((item, index) => {
                                        const isActive = currentView === item.view;
                                        return (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    setCurrentView(item.view);
                                                    if (window.innerWidth < 1024) setIsSidebarOpen(false);
                                                }}
                                                className={`w-full flex items-center transition-all duration-300 group relative ${isSidebarCollapsed ? 'justify-center py-3' : 'gap-3.5 px-4 py-3'
                                                    } rounded-2xl ${isActive
                                                        ? 'bg-purple-500/10 text-white shadow-sm border border-purple-500/20'
                                                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                                    }`}
                                            >
                                                <span className={`${isActive ? 'text-purple-400' : 'text-slate-500 group-hover:text-slate-300'} transition-colors`}>
                                                    {item.icon}
                                                </span>
                                                {!isSidebarCollapsed && (
                                                    <span className={`font-black text-sm tracking-tight ${isActive ? 'text-white' : ''}`}>{item.label}</span>
                                                )}

                                                {/* Tooltip for collapsed mode */}
                                                {isSidebarCollapsed && (
                                                    <div className="absolute left-[110%] bg-[#0a0c12] border border-white/10 text-white text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-all transform group-hover:translate-x-1 whitespace-nowrap z-50 shadow-2xl">
                                                        {item.label}
                                                    </div>
                                                )}

                                                {isActive && !isSidebarCollapsed && (
                                                    <motion.div
                                                        layoutId="active-pill"
                                                        className="ml-auto w-1 h-3 bg-purple-500 rounded-full"
                                                    />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </nav>

                    {/* Footer / User Section */}
                    <div className={`border-t border-white/5 transition-all duration-300 ${isSidebarCollapsed ? 'p-3' : 'p-6'}`}>
                        {isSidebarCollapsed ? (
                            <div className="flex justify-center mb-4">
                                <img
                                    src={user?.imageUrl}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-purple-500/20"
                                />
                            </div>
                        ) : (
                            <div className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-2xl p-4 mb-4">
                                <img
                                    src={user?.imageUrl}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-purple-500/20"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-black text-white truncate">{user?.fullName || 'User'}</p>
                                    <p className="text-[11px] font-bold text-slate-500 truncate tracking-tight">
                                        {user?.primaryEmailAddress?.emailAddress}
                                    </p>
                                </div>
                            </div>
                        )}


                        {/* SECURE SIGN OUT */}
                        <button
                            type="button"
                            onClick={async (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                try {
                                    localStorage.clear();
                                    sessionStorage.clear();
                                    await signOut();
                                    window.location.replace('/login');
                                } catch (err) {
                                    window.location.replace('/login');
                                }
                            }}
                            className={`w-full mt-4 flex items-center transition-all duration-300 group relative z-50 ${isSidebarCollapsed ? 'justify-center py-4' : 'gap-3 px-4 py-3 bg-white/5 hover:bg-red-500/10 rounded-2xl border border-white/5 hover:border-red-500/20 shadow-sm'}`}
                        >
                            <LogOut className={`w-4 h-4 ${isSidebarCollapsed ? 'text-slate-500 group-hover:text-red-500' : 'text-slate-500 group-hover:text-red-500'} transition-colors`} />
                            {!isSidebarCollapsed && (
                                <span className="text-[10px] font-black text-slate-500 group-hover:text-red-400 uppercase tracking-[0.2em] transition-colors">
                                    Sign Out
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
                {/* Top Bar */}
                <header className="bg-[#0a0c12]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between z-20">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="lg:hidden p-2 text-slate-400 hover:bg-white/5 rounded-xl"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    {!isSidebarOpen && (
                        <div className="lg:hidden flex items-center gap-2">
                            <span className="text-xl font-black tracking-tight text-white">REVLO</span>
                        </div>
                    )}

                    <div className="flex items-center gap-5 ml-auto">
                        <button className="relative p-2.5 text-slate-500 hover:text-purple-400 hover:bg-purple-500/10 rounded-xl transition-all active:scale-90 group">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-purple-500 border-2 border-[#0a0c12] rounded-full animate-pulse shadow-sm shadow-purple-500/20" />
                        </button>

                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full shadow-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Service Active</span>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-hidden relative flex flex-col">
                    <div className="flex-1 p-3 lg:p-6 flex flex-col h-full overflow-hidden">
                        {/* the "Mac App" Container */}
                        <motion.div
                            key={currentView}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                            className="flex-1 bg-[#0a0c12]/40 backdrop-blur-xl rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/5 overflow-hidden flex flex-col"
                        >
                            {/* Window Title Bar */}
                            <div className="h-12 bg-white/5 backdrop-blur-md border-b border-white/5 flex items-center px-5 gap-4 flex-shrink-0 select-none">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-inner opacity-80" />
                                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-inner opacity-80" />
                                    <div className="w-3 h-3 rounded-full bg-[#28C840] shadow-inner opacity-80" />
                                </div>
                                <div className="flex-1 flex justify-center items-center">
                                    <div className="flex items-center gap-2 px-4 py-1.5 bg-black/20 border border-white/5 rounded-full shadow-sm">
                                        <span className="text-slate-500">
                                            {menuItems.find(m => m.view === currentView)?.icon}
                                        </span>
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                            {menuItems.find(m => m.view === currentView)?.label || "Partner Portal"}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-16" /> {/* Balance spacer */}
                            </div>

                            {/* App Content */}
                            <div className="flex-1 relative overflow-hidden">
                                {children}
                            </div>
                        </motion.div>
                    </div>
                </main>

                <CommandPalette
                    isOpen={isCommandPaletteOpen}
                    onClose={() => setIsCommandPaletteOpen(false)}
                    onNavigate={setCurrentView}
                />
            </div>
        </div>
    );
};

export default RevloOSLayout;

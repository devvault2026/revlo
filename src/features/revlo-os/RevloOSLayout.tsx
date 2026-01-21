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
    X
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

export type View = 'dashboard' | 'engine' | 'agents' | 'crm' | 'pipeline' | 'inbox' | 'phone' | 'vault' | 'docs' | 'settings';

interface RevloOSLayoutProps {
    children: React.ReactNode;
    currentView: View;
    setCurrentView: (view: View) => void;
}

const RevloOSLayout: React.FC<RevloOSLayoutProps> = ({ children, currentView, setCurrentView }) => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

    const menuItems: { icon: React.ReactNode; label: string; view: View; group?: string }[] = [
        { group: "Command Center", icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', view: 'dashboard' },
        { group: "Engine", icon: <Briefcase className="w-5 h-5" />, label: 'Lead Engine', view: 'engine' },
        { group: "Engine", icon: <Bot className="w-5 h-5" />, label: 'Agents', view: 'agents' },
        { group: "CRM", icon: <Database className="w-5 h-5" />, label: 'Database', view: 'crm' },
        { group: "CRM", icon: <KanbanSquare className="w-5 h-5" />, label: 'Pipeline', view: 'pipeline' },
        { group: "Inbox", icon: <Inbox className="w-5 h-5" />, label: 'Messages', view: 'inbox' },
        { group: "Inbox", icon: <Phone className="w-5 h-5" />, label: 'Voice', view: 'phone' },
        { group: "Knowledge", icon: <FileText className="w-5 h-5" />, label: 'Vault', view: 'vault' },
        { group: "Knowledge", icon: <Book className="w-5 h-5" />, label: 'Docs', view: 'docs' },
        { group: "Settings", icon: <Settings className="w-5 h-5" />, label: 'Settings', view: 'settings' },
    ];

    // Group items
    const groupedItems = menuItems.reduce((acc, item) => {
        const group = item.group || 'Other';
        if (!acc[group]) acc[group] = [];
        acc[group].push(item);
        return acc;
    }, {} as Record<string, typeof menuItems>);

    const groups = ["Command Center", "Engine", "CRM", "Inbox", "Knowledge", "Settings"];

    return (
        <div className="flex h-screen bg-slate-50">
            {/* Sidebar */}
            <motion.aside
                initial={{ x: -300 }}
                animate={{ x: isSidebarOpen ? 0 : -300, width: isSidebarCollapsed ? 80 : 256 }}
                transition={{ duration: 0.3 }}
                className={`fixed lg:relative z-40 h-full bg-white border-r border-slate-200 transition-all duration-300`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className={`border-b border-slate-200 ${isSidebarCollapsed ? 'p-4' : 'p-6'} transition-all`}>
                        {isSidebarCollapsed ? (
                            <div className="flex items-center justify-center">
                                <img src="/logo.png" alt="Revlo" className="w-8 h-8 object-contain" />
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center gap-3">
                                    <img src="/logo.png" alt="Revlo" className="w-10 h-10 object-contain" />
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-black font-display gradient-text">REVLO</span>
                                            <span className="text-xs font-bold text-slate-400 uppercase">OS</span>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-0.5">Growth Engine</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className={`flex-1 overflow-y-auto ${isSidebarCollapsed ? 'p-2' : 'p-4'} space-y-6 transition-all`}>
                        {groups.map((group) => (
                            <div key={group}>
                                {!isSidebarCollapsed && (
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-4">{group}</div>
                                )}
                                <div className="space-y-1">
                                    {groupedItems[group]?.map((item, index) => {
                                        const isActive = currentView === item.view;
                                        return (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentView(item.view)}
                                                className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center px-2' : 'gap-3 px-4'} py-2.5 rounded-xl transition-all group ${isActive
                                                    ? 'bg-gradient-rainbow text-white shadow-md'
                                                    : 'text-slate-600 hover:bg-slate-100'
                                                    }`}
                                                title={isSidebarCollapsed ? item.label : undefined}
                                            >
                                                <span className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600 transition-colors'}>
                                                    {item.icon}
                                                </span>
                                                {!isSidebarCollapsed && (
                                                    <>
                                                        <span className="font-semibold text-sm">{item.label}</span>
                                                        {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                                                    </>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </nav>

                    {/* Collapse Toggle Button */}
                    <div className="border-t border-slate-200 p-2">
                        <button
                            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                            title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                        >
                            <ChevronRight className={`w-4 h-4 transition-transform ${isSidebarCollapsed ? 'rotate-0' : 'rotate-180'}`} />
                            {!isSidebarCollapsed && <span>Collapse</span>}
                        </button>
                    </div>

                    {/* User Section */}
                    {!isSidebarCollapsed && (
                        <div className="p-4 border-t border-slate-200">
                            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50">
                                <div className="w-10 h-10 bg-gradient-purple rounded-full flex items-center justify-center text-white font-bold">
                                    A
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold">Admin User</p>
                                    <p className="text-xs text-slate-500">admin@revlo.agency</p>
                                </div>
                            </div>
                            <button className="w-full mt-3 flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-red-600 transition-colors">
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
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
                <main className="flex-1 overflow-y-auto bg-slate-50">
                    <div className="h-full p-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default RevloOSLayout;

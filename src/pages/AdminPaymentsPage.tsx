import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Shield, Lock, LogOut, Check, X, RefreshCw, Settings, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
type Payment = {
    id: string;
    client_name: string;
    amount: number;
    status: 'pending' | 'paid' | 'rejected';
    reference_id: string;
    created_at: string;
};

type AdminUser = {
    username: string;
    pin_code: string;
};

const AdminPaymentsPage = () => {
    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState<string>('');

    // Login Form State
    const [username, setUsername] = useState('');
    const [pin, setPin] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    // Dashboard State
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'payments' | 'settings'>('payments');

    // Settings State
    const [newPin, setNewPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [pinMessage, setPinMessage] = useState('');

    useEffect(() => {
        // Check local session for "payments_admin_session"
        const session = sessionStorage.getItem('payments_admin_session');
        if (session) {
            setIsAuthenticated(true);
            setCurrentUser(session);
            fetchPayments();
        }
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggingIn(true);
        setLoginError('');

        try {
            // Check against admin_access table
            const { data, error } = await supabase
                .from('admin_access')
                .select('*')
                .eq('username', username)
                .single();

            if (error || !data) {
                setLoginError('User not found.');
                setIsLoggingIn(false);
                return;
            }

            if (data.pin_code === pin) {
                setIsAuthenticated(true);
                setCurrentUser(data.username);
                sessionStorage.setItem('payments_admin_session', data.username);
                fetchPayments();
            } else {
                setLoginError('Invalid PIN.');
            }
        } catch (err) {
            console.error(err);
            setLoginError('An error occurred.');
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('payments_admin_session');
        setIsAuthenticated(false);
        setCurrentUser('');
        setPayments([]);
        setUsername('');
        setPin('');
    };

    const fetchPayments = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('payments')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            // Cast strictly for TS
            setPayments(data as any);
        }
        setLoading(false);
    };

    const togglePaymentStatus = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'pending' ? 'paid' : 'pending';

        // Optimistic update
        setPayments(payments.map(p => p.id === id ? { ...p, status: newStatus as any } : p));

        const { error } = await supabase
            .from('payments')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) {
            console.error("Failed to update payment status", error);
            fetchPayments(); // Revert on error
        }
    };

    const handleUpdatePin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPin !== confirmPin) {
            setPinMessage('PINs do not match');
            return;
        }
        if (newPin.length < 6) {
            setPinMessage('PIN must be at least 6 digits');
            return;
        }

        try {
            const { error } = await supabase
                .from('admin_access')
                .update({ pin_code: newPin })
                .eq('username', currentUser);

            if (error) throw error;
            setPinMessage('PIN updated successfully!');
            setNewPin('');
            setConfirmPin('');
        } catch (err) {
            setPinMessage('Failed to update PIN.');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700"
                >
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                            <Lock className="w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Revlo Admin</h1>
                        <p className="text-slate-400 text-sm">Restricted Payments Access</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Admin Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                placeholder="Jaryd"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">6-Digit PIN</label>
                            <input
                                type="password"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                maxLength={6}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors tracking-widest text-center text-lg"
                                placeholder="••••••"
                            />
                        </div>

                        {loginError && (
                            <p className="text-red-400 text-center text-sm">{loginError}</p>
                        )}

                        <button
                            type="submit"
                            disabled={isLoggingIn}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition-all"
                        >
                            {isLoggingIn ? 'Verifying...' : 'Access Portal'}
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-slate-900 text-white py-4 px-6 md:px-8 flex justify-between items-center shadow-lg">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold">A</div>
                    <span className="font-bold tracking-tight">Revlo Payments</span>
                </div>
                <div className="flex items-center gap-6">
                    <span className="text-slate-400 text-sm flex items-center gap-2">
                        <User className="w-4 h-4" /> {currentUser}
                    </span>
                    <button
                        onClick={handleLogout}
                        className="text-slate-400 hover:text-white transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
                {/* Tabs */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setActiveTab('payments')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'payments' ? 'bg-white shadow text-purple-600' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Transactions
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'settings' ? 'bg-white shadow text-purple-600' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        My Settings
                    </button>
                </div>

                {activeTab === 'payments' ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h2 className="font-bold text-slate-800 text-lg">Recent Transfers</h2>
                            <button
                                onClick={fetchPayments}
                                className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all"
                            >
                                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 py-4 font-bold text-xs text-slate-500 uppercase tracking-wider">Reference</th>
                                        <th className="px-6 py-4 font-bold text-xs text-slate-500 uppercase tracking-wider">Client</th>
                                        <th className="px-6 py-4 font-bold text-xs text-slate-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-4 font-bold text-xs text-slate-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-4 font-bold text-xs text-slate-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 font-bold text-xs text-slate-500 uppercase tracking-wider text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {payments.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                                                No payments recorded yet.
                                            </td>
                                        </tr>
                                    ) : (
                                        payments.map((payment) => (
                                            <tr key={payment.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4 font-mono text-sm text-slate-600">{payment.reference_id}</td>
                                                <td className="px-6 py-4 font-medium text-slate-900">{payment.client_name}</td>
                                                <td className="px-6 py-4 text-slate-600">${payment.amount.toLocaleString()}</td>
                                                <td className="px-6 py-4 text-slate-500 text-sm">{new Date(payment.created_at).toLocaleDateString()} {new Date(payment.created_at).toLocaleTimeString()}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${payment.status === 'paid' ? 'bg-green-100 text-green-800' :
                                                        payment.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                            'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {payment.status.toUpperCase()}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    {payment.status !== 'paid' ? (
                                                        <button
                                                            onClick={() => togglePaymentStatus(payment.id, payment.status)}
                                                            className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center justify-end gap-1 ml-auto"
                                                        >
                                                            <Check className="w-4 h-4" /> Mark Paid
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => togglePaymentStatus(payment.id, payment.status)}
                                                            className="text-slate-400 hover:text-slate-500 font-medium text-xs flex items-center justify-end gap-1 ml-auto"
                                                        >
                                                            Revert
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-md mx-auto">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Settings className="w-5 h-5 text-purple-600" />
                                Security Settings
                            </h2>
                            <p className="text-slate-500 mb-6">Update your 6-digit access PIN.</p>

                            <form onSubmit={handleUpdatePin} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">New PIN</label>
                                    <input
                                        type="password"
                                        maxLength={6}
                                        value={newPin}
                                        onChange={(e) => setNewPin(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Confirm PIN</label>
                                    <input
                                        type="password"
                                        maxLength={6}
                                        value={confirmPin}
                                        onChange={(e) => setConfirmPin(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                    />
                                </div>

                                {pinMessage && (
                                    <p className={`text-sm ${pinMessage.includes('success') ? 'text-green-600' : 'text-red-500'}`}>
                                        {pinMessage}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition-all mt-2"
                                >
                                    Update PIN
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPaymentsPage;

import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertTriangle, Info, AlertCircle } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = 'info') => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            removeToast(id);
        }, 5000);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3 pointer-events-none">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <ToastComponent key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

const ToastComponent: React.FC<{ toast: Toast; onRemove: () => void }> = ({ toast, onRemove }) => {
    const icons = {
        success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
        error: <AlertCircle className="w-5 h-5 text-red-500" />,
        warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
        info: <Info className="w-5 h-5 text-blue-500" />,
    };

    const colors = {
        success: 'border-emerald-100 bg-emerald-50/50 shadow-emerald-100/20',
        error: 'border-red-100 bg-red-50/50 shadow-red-100/20',
        warning: 'border-amber-100 bg-amber-50/50 shadow-amber-100/20',
        info: 'border-blue-100 bg-blue-50/50 shadow-blue-100/20',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className={`pointer-events-auto flex items-center gap-4 p-4 pl-5 rounded-2xl border-2 bg-white shadow-2xl ${colors[toast.type]} min-w-[320px] max-w-md backdrop-blur-md`}
        >
            <div className="flex-shrink-0 relative">
                <div className="absolute -inset-2 bg-gradient-rainbow opacity-10 blur-xl rounded-full" />
                <div className="relative w-10 h-10 bg-white rounded-xl shadow-inner border border-slate-100 flex items-center justify-center">
                    <img src="/logo.png" alt="R" className="w-5 h-5 object-contain" />
                </div>
            </div>

            <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Revlo System</span>
                    <div className="w-1 h-3 bg-slate-200 rounded-full" />
                    {icons[toast.type]}
                </div>
                <p className="text-sm font-bold text-slate-900 leading-tight">
                    {toast.message}
                </p>
            </div>

            <button
                onClick={onRemove}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"
            >
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within a ToastProvider');
    return context;
};

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, Notification, getNotifications, markNotificationAsRead } from '../lib/supabase';
import { useAuth } from './AuthContext';
import { useToast } from '../features/revlo-os/context/ToastContext';

interface NotificationContextType {
    notifications: Notification[];
    unreadCount: number;
    markAsRead: (id: string) => Promise<void>;
    loading: boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const { showToast } = useToast();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    const unreadCount = notifications.filter(n => !n.is_read).length;

    const fetchNotifs = async () => {
        if (!user) return;
        try {
            const data = await getNotifications(user.id);
            setNotifications(data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user) {
            setNotifications([]);
            setLoading(false);
            return;
        }

        fetchNotifs();

        // Subscribe to real-time notifications
        const channel = supabase
            .channel(`public:notifications:user_id=eq.${user.id}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'notifications',
                filter: `user_id=eq.${user.id}`
            }, (payload) => {
                const newNotif = payload.new as Notification;
                setNotifications(prev => [newNotif, ...prev]);
                showToast(newNotif.title, 'info');

                // Play notification sound
                const audio = new Audio('https://res.cloudinary.com/dolij7wjr/video/upload/v1768969521/new-message-alert-430414_on46qr.mp3');
                audio.play().catch(() => { });
            })
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'notifications',
                filter: `user_id=eq.${user.id}`
            }, (payload) => {
                const updatedNotif = payload.new as Notification;
                setNotifications(prev => prev.map(n => n.id === updatedNotif.id ? updatedNotif : n));
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user]);

    const markAsRead = async (id: string) => {
        try {
            await markNotificationAsRead(id);
            // Local state will be updated by real-time listener if we wanted, 
            // but let's just update local state for immediate feedback
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
        } catch (error) {
            console.error('Error marking as read:', error);
        }
    };

    return (
        <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, loading }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
};

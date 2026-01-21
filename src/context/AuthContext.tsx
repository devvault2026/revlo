import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, getProfile, Profile } from '../lib/supabase';

interface AuthContextType {
    user: User | null;
    profile: Profile | null;
    loading: boolean;
    signOut: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async (userId: string) => {
        try {
            const data = await getProfile(userId);
            setProfile(data);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    useEffect(() => {
        let mounted = true;

        const initAuth = async () => {
            // Safety timeout to prevent infinite loading
            const timeoutId = setTimeout(() => {
                if (mounted && loading) {
                    console.warn("Auth initialization timed out, forcing load completion.");
                    setLoading(false);
                }
            }, 3000);

            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (mounted) {
                    setUser(session?.user ?? null);
                    if (session?.user) {
                        await fetchProfile(session.user.id);
                    }
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
            } finally {
                clearTimeout(timeoutId);
                if (mounted) setLoading(false);
            }
        };

        initAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (!mounted) return;

            setUser(session?.user ?? null);
            if (session?.user) {
                await fetchProfile(session.user.id);
            } else {
                setProfile(null);
            }
            // Ensure loading is false after any auth state change
            setLoading(false);
        });

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    const refreshProfile = async () => {
        if (user) {
            await fetchProfile(user.id);
        }
    };

    return (
        <AuthContext.Provider value={{ user, profile, loading, signOut, refreshProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

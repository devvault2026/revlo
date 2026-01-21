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
        } catch (error: any) {
            if (error?.message?.includes("signal is aborted") || error?.name === 'AbortError') return;
            // Only log actual errors, not 'no rows found' which is expected for new users
            if (error?.code !== 'PGRST116') {
                console.error('CRITICAL: Profile fetch failed:', error?.message || error);
            } else {
                console.log('SYSTEM: Profile not yet initialized for user.');
            }
        }
    };

    useEffect(() => {
        let mounted = true;

        const initAuth = async () => {
            // Safety timeout - extended to 8s for cold starts
            const timeoutId = setTimeout(() => {
                if (mounted && loading) {
                    console.warn("AUTH_GATE: Initialization taking longer than expected. Bypassing gate...");
                    setLoading(false);
                }
            }, 8000);

            try {
                // Get initial state
                console.log("AUTH_GATE: Querying session...");
                const { data: { session }, error } = await supabase.auth.getSession();

                if (error) {
                    // Handle AbortError specifically
                    if (error.name === 'AbortError') {
                        console.warn("AUTH_GATE: Session query aborted. Retrying via state listener...");
                    } else {
                        throw error;
                    }
                }

                if (mounted) {
                    const currentUser = session?.user ?? null;
                    setUser(currentUser);
                    if (currentUser) {
                        await fetchProfile(currentUser.id);
                    }
                }
            } catch (error: any) {
                if (error?.message?.includes("signal is aborted") || error?.name === 'AbortError') return;
                console.error('AUTH_GATE: Failed to initialize session:', error?.message || error);
            } finally {
                clearTimeout(timeoutId);
                if (mounted) setLoading(false);
            }
        };

        initAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (!mounted) return;

            console.log(`AUTH_GATE: State changed [${event}]`);
            const currentUser = session?.user ?? null;
            setUser(currentUser);

            if (currentUser) {
                try {
                    await fetchProfile(currentUser.id);
                } catch (error: any) {
                    if (error?.message?.includes("signal is aborted") || error?.name === 'AbortError') return;
                    console.error('AUTH_GATE: Profile fetch failed:', error);
                }
            } else {
                setProfile(null);
            }

            if (mounted) setLoading(false);
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

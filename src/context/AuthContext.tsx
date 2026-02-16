import React, { createContext, useContext } from 'react';
import { useUser, useClerk, useSession } from '@clerk/clerk-react';
import { Profile, supabase } from '../lib/supabase';

interface AuthContextType {
    user: any;
    profile: Profile | null;
    loading: boolean;
    signOut: () => Promise<void>;
    refreshProfile: () => Promise<void>;
    isSynced: boolean;
    syncError: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, isLoaded } = useUser();
    const { session } = useSession();
    const { signOut } = useClerk();
    const [profile, setProfile] = React.useState<Profile | null>(null);
    const [loadingProfile, setLoadingProfile] = React.useState(false);
    const [isSynced, setIsSynced] = React.useState(false);
    const [syncError, setSyncError] = React.useState(false);

    const refreshProfile = React.useCallback(async () => {
        if (!user) return;
        setLoadingProfile(true);
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (error && error.code === 'PGRST116') {
                // Create profile if missing
                const { data: newProfile, error: createError } = await supabase
                    .from('profiles')
                    .insert({
                        id: user.id,
                        email: user.primaryEmailAddress?.emailAddress,
                        full_name: user.fullName || '',
                        avatar_url: user.imageUrl || ''
                    })
                    .select()
                    .single();
                if (!createError) setProfile(newProfile);
            } else if (!error) {
                setProfile(data);
            }
        } catch (err) {
            console.error('Profile sync failed:', err);
        } finally {
            setLoadingProfile(false);
        }
    }, [user]);

    // Sync Clerk Session with Supabase
    React.useEffect(() => {
        const syncSupabase = async () => {
            if (session) {
                try {
                    const token = await session.getToken({ template: 'supabase' });
                    if (token) {
                        await supabase.auth.setSession({
                            access_token: token,
                            refresh_token: '', // Clerk handles refreshing
                        });
                        // After setting session, load/refresh profile
                        await refreshProfile();
                        setIsSynced(true);
                    }
                } catch (err) {
                    console.error('Supabase JWT template not found in Clerk. Please check your Clerk dashboard configuration.', err);
                    setSyncError(true);
                    // Don't set isSynced to true, but maybe allow site to load anyway
                }
            } else {
                // Clear supabase session on logout
                await supabase.auth.signOut();
                setProfile(null);
            }
        };

        syncSupabase();
    }, [session, refreshProfile]);

    const value = {
        user: user || null,
        profile,
        loading: !isLoaded || loadingProfile,
        signOut: async () => { await signOut(); },
        refreshProfile,
        isSynced,
        syncError,
    };

    return (
        <AuthContext.Provider value={value}>
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

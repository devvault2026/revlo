import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NeuralLoader from '../features/revlo-os/components/NeuralLoader';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: 'super_admin' | 'admin' | 'member';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
    const { user, profile, loading } = useAuth();

    if (loading) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-[#020408]">
                <NeuralLoader />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Role-based protection: super_admin can see anything, otherwise check match
    if (requiredRole && profile?.role !== 'super_admin' && profile?.role !== requiredRole) {
        return (
            <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-950 text-white p-6 text-center">
                <h1 className="text-6xl font-black mb-4">403</h1>
                <p className="text-slate-400 text-xl font-bold mb-8 uppercase tracking-widest">Access Forbidden: Missing Authorization Clearence</p>
                <Navigate to="/revlo-os" replace />
            </div>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;

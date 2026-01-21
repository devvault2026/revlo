import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const user = useAppStore((state) => state.user);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;

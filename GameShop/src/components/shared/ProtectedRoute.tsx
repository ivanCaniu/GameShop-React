import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
    children: ReactNode;
    requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
    const { currentUser, loading } = useAuth();
    // TODO: Replace with actual admin email or role check from Firestore
    const ADMIN_EMAIL = 'admin@gameshop.com';

    if (loading) {
        return <div className="text-center py-20">Cargando...</div>;
    }

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    if (requireAdmin && currentUser.email !== ADMIN_EMAIL) {
        // Option: Redirect to home or show "Unauthorized"
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;

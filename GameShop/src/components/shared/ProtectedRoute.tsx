import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
    children: ReactNode;
    requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return <div className="text-center py-20">Cargando...</div>;
    }

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    if (requireAdmin && currentUser.role !== 'admin') {
        // Redirigir a home o mostrar "No Autorizado"
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;

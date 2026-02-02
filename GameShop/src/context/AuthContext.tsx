import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import toast from 'react-hot-toast';
import type { Order, UserProfile } from '../types';
import { api } from '../services/api';

interface AuthContextType {
    currentUser: UserProfile | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    addOrder: (order: Order) => Promise<void>;
    toggleWishlist: (productId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    // Initial load
    useEffect(() => {
        const storedUser = localStorage.getItem('gameshop_session');
        const token = localStorage.getItem('token');

        if (storedUser) {
            try {
                const parsed = JSON.parse(storedUser);
                // Si es usuario normal (tiene uid real de mongo) y NO hay token, limpiar sesión
                if (parsed.uid && !parsed.uid.startsWith('google_') && !token) {
                    console.warn("Sesión encontrada pero sin token. Cerrando sesión...");
                    localStorage.removeItem('gameshop_session');
                    setCurrentUser(null);
                } else {
                    // Resto de la lógica de hidratación...
                    if (!parsed.orders) parsed.orders = [];
                    if (!parsed.wishlist) parsed.wishlist = [];
                    setCurrentUser(parsed);
                }
            } catch (e) {
                console.error("Session parse error", e);
                localStorage.removeItem('gameshop_session');
            }
        }
        setLoading(false);

        // Listener para cierre de sesión global (ej: 401 desde api)
        const handleForceLogout = () => {
            logout();
        };

        window.addEventListener('auth:logout', handleForceLogout);
        return () => window.removeEventListener('auth:logout', handleForceLogout);
    }, []);

    const saveUserSession = (user: UserProfile) => {
        // Ensure wishlist always exists before saving
        const userToSave = {
            ...user,
            wishlist: user.wishlist || [],
            orders: user.orders || []
        };
        setCurrentUser(userToSave);
        localStorage.setItem('gameshop_session', JSON.stringify(userToSave));

        // Also update the user in the main "database"
        const users = JSON.parse(localStorage.getItem('gameshop_users') || '[]');
        const userIndex = users.findIndex((u: any) => u.uid === user.uid);

        if (userIndex >= 0) {
            users[userIndex] = { ...users[userIndex], ...userToSave };
        } else {
            users.push(userToSave);
        }

        localStorage.setItem('gameshop_users', JSON.stringify(users));
    };



    // ... (existing imports)

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            // Using the new API Helper
            const data = await api.post<any>('/auth/login', { email, password });

            // Backend returns: { token, user: { id, name, email, role } }
            const userProfile: UserProfile = {
                uid: data.user.id,
                email: data.user.email,
                displayName: data.user.name,
                role: data.user.role,
                orders: [],
                wishlist: []
            };

            localStorage.setItem('token', data.token);
            saveUserSession(userProfile);

        } catch (error) {
            setLoading(false);
            throw error;
        }
        setLoading(false);
    };

    const register = async (email: string, password: string) => {
        setLoading(true);
        try {
            // Using the new API Helper
            const data = await api.post<any>('/auth/register', {
                name: email.split('@')[0],
                email,
                password
            });

            const userProfile: UserProfile = {
                uid: data.user.id,
                email: data.user.email,
                displayName: data.user.name,
                role: data.user.role,
                orders: [],
                wishlist: []
            };

            localStorage.setItem('token', data.token);
            saveUserSession(userProfile);

        } catch (error) {
            setLoading(false);
            throw error;
        }
        setLoading(false);
    };

    const logout = async () => {
        setCurrentUser(null);
        localStorage.removeItem('gameshop_session');
        localStorage.removeItem('token');
    };

    const loginWithGoogle = async () => {
        toast.success("En modo demo, usaremos un usuario de prueba.");
        // Intentar encontrar usuario mock de google
        const users = JSON.parse(localStorage.getItem('gameshop_users') || '[]');
        let mockUser = users.find((u: any) => u.uid === 'google_user_123');

        if (!mockUser) {
            mockUser = { uid: 'google_user_123', email: 'test@gmail.com', displayName: 'Test Gamer', orders: [] };
            users.push(mockUser);
            localStorage.setItem('gameshop_users', JSON.stringify(users));
        }

        saveUserSession(mockUser);
    };

    const addOrder = async (order: Order) => {
        if (!currentUser) return;

        // Security check: If no token, forbid action
        if (!localStorage.getItem('token') && !currentUser.uid.startsWith('google_')) {
            toast.error("Sesión inválida. Por favor inicia sesión nuevamente.");
            await logout();
            return;
        }

        // 1. Get fresh data from "database" to avoid stale state
        let users = JSON.parse(localStorage.getItem('gameshop_users') || '[]');
        let userIndex = users.findIndex((u: any) => u.uid === currentUser.uid);

        // Si no existe el usuario en la DB local (ej: registrado vía backend), crearlo
        if (userIndex === -1) {
            const newUser = { ...currentUser, orders: [] };
            users.push(newUser);
            userIndex = users.length - 1;
        }

        const userFromDb = users[userIndex];
        const currentOrders = userFromDb.orders || [];

        // 2. Create updated user object
        const updatedUser = {
            ...userFromDb,
            orders: [order, ...currentOrders]
        };

        // 3. Save back to database
        users[userIndex] = updatedUser;
        localStorage.setItem('gameshop_users', JSON.stringify(users));

        // 4. Update session and state
        // IMPORTANT: We only store profile info in session, not password
        const sessionUser: UserProfile = {
            uid: updatedUser.uid,
            email: updatedUser.email,
            displayName: updatedUser.displayName,
            orders: updatedUser.orders
        };

        localStorage.setItem('gameshop_session', JSON.stringify(sessionUser));
        setCurrentUser(sessionUser);
    };

    const toggleWishlist = async (productId: string) => {
        if (!currentUser) return;

        // 1. Refresh data
        let users = JSON.parse(localStorage.getItem('gameshop_users') || '[]');
        let userIndex = users.findIndex((u: any) => u.uid === currentUser.uid);

        // Si no existe, crearlo
        if (userIndex === -1) {
            const newUser = { ...currentUser, wishlist: [] };
            users.push(newUser);
            userIndex = users.length - 1;
        }

        const userFromDb = users[userIndex];
        const currentWishlist = userFromDb.wishlist || [];

        let newWishlist;
        if (currentWishlist.includes(productId)) {
            newWishlist = currentWishlist.filter((id: string) => id !== productId);
        } else {
            newWishlist = [...currentWishlist, productId];
        }

        // 2. Update DB
        const updatedUser = { ...userFromDb, wishlist: newWishlist };
        users[userIndex] = updatedUser;
        localStorage.setItem('gameshop_users', JSON.stringify(users));

        // 3. Update Session
        const sessionUser: UserProfile = {
            ...currentUser,
            wishlist: newWishlist
        };
        localStorage.setItem('gameshop_session', JSON.stringify(sessionUser));
        setCurrentUser(sessionUser);
    };

    const value = {
        currentUser,
        loading,
        login,
        register,
        logout,
        loginWithGoogle,
        addOrder,
        toggleWishlist
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

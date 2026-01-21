import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Order, UserProfile } from '../types';

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
        if (storedUser) {
            try {
                // Ensure orders array exists
                const parsed = JSON.parse(storedUser);
                if (!parsed.orders) parsed.orders = [];
                setCurrentUser(parsed);
            } catch (e) {
                console.error("Session parse error", e);
                localStorage.removeItem('gameshop_session');
            }
        }
        setLoading(false);
    }, []);

    const saveUserSession = (user: UserProfile) => {
        setCurrentUser(user);
        localStorage.setItem('gameshop_session', JSON.stringify(user));

        // Also update the user in the main "database"
        const users = JSON.parse(localStorage.getItem('gameshop_users') || '[]');
        // Use merge to avoid losing password or other fields not in UserProfile
        const updatedUsers = users.map((u: any) => u.uid === user.uid ? { ...u, ...user } : u);
        localStorage.setItem('gameshop_users', JSON.stringify(updatedUsers));
    };

    const login = async (email: string, password: string) => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));

        try {
            const users = JSON.parse(localStorage.getItem('gameshop_users') || '[]');
            const foundUser = users.find((u: any) => u.email === email && u.password === password);

            if (foundUser) {
                // Determine user profile
                const userProfile: UserProfile = {
                    uid: foundUser.uid,
                    email: foundUser.email,
                    displayName: foundUser.displayName,
                    orders: foundUser.orders || []
                };
                saveUserSession(userProfile);
            } else {
                throw new Error('Credenciales inválidas');
            }
        } catch (error) {
            setLoading(false);
            throw error;
        }
        setLoading(false);
    };

    const register = async (email: string, password: string) => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));

        try {
            const users = JSON.parse(localStorage.getItem('gameshop_users') || '[]');
            const existing = users.find((u: any) => u.email === email);

            if (existing) {
                throw new Error('Este correo ya está registrado');
            }

            const hash = Math.random().toString(36).substring(7);
            const newUser = {
                uid: `user_${hash}`,
                email,
                password,
                displayName: email.split('@')[0],
                orders: []
            };

            users.push(newUser);
            localStorage.setItem('gameshop_users', JSON.stringify(users));

            const userProfile: UserProfile = {
                uid: newUser.uid,
                email: newUser.email,
                displayName: newUser.displayName,
                orders: []
            };

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
    };

    const loginWithGoogle = async () => {
        alert("En modo demo, usaremos un usuario de prueba.");
        // Try to find existing google mock user
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

        // 1. Get fresh data from "database" to avoid stale state
        const users = JSON.parse(localStorage.getItem('gameshop_users') || '[]');
        const userIndex = users.findIndex((u: any) => u.uid === currentUser.uid);

        if (userIndex === -1) {
            console.error("User not found in database");
            return;
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
        const users = JSON.parse(localStorage.getItem('gameshop_users') || '[]');
        const userIndex = users.findIndex((u: any) => u.uid === currentUser.uid);

        if (userIndex === -1) return;

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

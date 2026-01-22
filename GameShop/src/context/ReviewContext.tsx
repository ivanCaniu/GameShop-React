import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Review } from '../types';

interface ReviewContextType {
    reviews: Review[];
    addReview: (review: Omit<Review, 'id' | 'date' | 'userName'>) => void;
    getReviewsByProduct: (productId: string) => Review[];
    getAverageRating: (productId: string) => number;
    getReviewCount: (productId: string) => number;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const useReviews = () => {
    const context = useContext(ReviewContext);
    if (!context) {
        throw new Error('useReviews must be used within a ReviewProvider');
    }
    return context;
};

// Mock initial reviews
const initialReviews: Review[] = [
    {
        id: '1',
        productId: '1', // God of War
        userId: 'user1',
        userName: 'KratosFan',
        rating: 5,
        comment: '¡Obra maestra! La historia es increíble y el gameplay es brutal.',
        date: '2023-11-15'
    },
    {
        id: '2',
        productId: '1',
        userId: 'user2',
        userName: 'GamerChile',
        rating: 4,
        comment: 'Muy bueno, pero un poco corto para mi gusto.',
        date: '2023-11-16'
    }
];

export const ReviewProvider = ({ children }: { children: ReactNode }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize from localStorage
    useEffect(() => {
        const storedReviews = localStorage.getItem('gameshop_reviews');
        if (storedReviews) {
            try {
                setReviews(JSON.parse(storedReviews));
            } catch (e) {
                console.error("Failed to parse reviews", e);
                setReviews(initialReviews);
            }
        } else {
            setReviews(initialReviews);
        }
        setIsInitialized(true);
    }, []);

    // Save to localStorage
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('gameshop_reviews', JSON.stringify(reviews));
        }
    }, [reviews, isInitialized]);

    const addReview = (reviewData: Omit<Review, 'id' | 'date' | 'userName'>) => {
        // Get user info from somewhere or pass it in. For now we assume the auth context handles user identity, 
        // but here we might need to fetch the current user name if not passed.
        // In a real app the backend would handle date and ID.

        // We need to get the current user's name. Since we don't have access to AuthContext here directly without circular dependency potentially,
        // we'll require the component calling this to pass the userName or we fetch it from stored user profile if possible.
        // For simplicity, let's update the signature to accept userName or handle it in the component.
        // Actually, let's keep it simple and assume the caller passes the necessary info or we mock the missing parts if needed.
        // Wait, the interface says `addReview` receives omitted User Name. Let's fix that.
        // We will fetch the username from localStorage for now strictly to keep context clean, or better, change the signature.

        const currentUserStr = localStorage.getItem('gameshop_session');
        let userName = 'Anonymous';
        if (currentUserStr) {
            const user = JSON.parse(currentUserStr);
            userName = user.name || user.email.split('@')[0];
        }

        const newReview: Review = {
            ...reviewData,
            id: Date.now().toString(),
            date: new Date().toISOString().split('T')[0],
            userName: userName
        };
        setReviews(prev => [newReview, ...prev]);
    };

    const getReviewsByProduct = (productId: string) => {
        return reviews.filter(r => r.productId === productId);
    };

    const getAverageRating = (productId: string) => {
        const productReviews = getReviewsByProduct(productId);
        if (productReviews.length === 0) return 0;
        const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
        return Number((sum / productReviews.length).toFixed(1));
    };

    const getReviewCount = (productId: string) => {
        return getReviewsByProduct(productId).length;
    };

    return (
        <ReviewContext.Provider value={{ reviews, addReview, getReviewsByProduct, getAverageRating, getReviewCount }}>
            {children}
        </ReviewContext.Provider>
    );
};

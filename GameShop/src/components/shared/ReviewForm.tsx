import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useReviews } from '../../context/ReviewContext';
import StarRating from './StarRating';
import Button from '../ui/Button';

interface ReviewFormProps {
    productId: string;
    onSuccess?: () => void;
}

const ReviewForm = ({ productId, onSuccess }: ReviewFormProps) => {
    const { currentUser } = useAuth();
    const { addReview } = useReviews();

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!currentUser) {
        return (
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 text-center">
                <p className="text-gray-400 mb-4">Inicia sesión para dejar tu opinión.</p>
                <Button variant="outline" onClick={() => window.location.href = '/login'}>
                    Iniciar Sesión
                </Button>
            </div>
        );
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) return;

        setIsSubmitting(true);

        // Simulate network delay
        setTimeout(() => {
            addReview({
                productId,
                userId: currentUser.uid,
                rating,
                comment
            });

            setComment('');
            setRating(5);
            setIsSubmitting(false);
            if (onSuccess) onSuccess();
        }, 500);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
            <h3 className="text-xl font-bold text-white mb-4">Escribe una reseña</h3>

            <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-2">Tu valoración</label>
                <StarRating rating={rating} interactive onChange={setRating} size={28} />
            </div>

            <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-2">Tu comentario</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-black/30 border border-gray-700 rounded-lg p-3 text-white focus:border-[var(--color-accent)] focus:outline-none transition-colors min-h-[100px]"
                    placeholder="¿Qué te pareció este juego?"
                    required
                />
            </div>

            <Button disabled={isSubmitting} className="w-full">
                {isSubmitting ? 'Publicando...' : 'Publicar Reseña'}
            </Button>
        </form>
    );
};

export default ReviewForm;

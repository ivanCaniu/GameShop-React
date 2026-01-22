import { useReviews } from '../../context/ReviewContext';
import StarRating from './StarRating';
import { User } from 'lucide-react';

interface ReviewListProps {
    productId: string;
}

const ReviewList = ({ productId }: ReviewListProps) => {
    const { getReviewsByProduct } = useReviews();
    const reviews = getReviewsByProduct(productId);

    if (reviews.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                <p>Todavía no hay reseñas para este juego.</p>
                <p className="text-sm">¡Sé el primero en opinar!</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-800 pb-6 last:border-0 hover:bg-white/5 transition-colors p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-400">
                                <User size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-white text-sm">{review.userName}</p>
                                <span className="text-xs text-gray-500">{review.date}</span>
                            </div>
                        </div>
                        <StarRating rating={review.rating} size={16} />
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed pl-[52px]">
                        {review.comment}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default ReviewList;

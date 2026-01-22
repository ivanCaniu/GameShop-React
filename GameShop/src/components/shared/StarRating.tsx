import { Star, StarHalf } from 'lucide-react';

interface StarRatingProps {
    rating: number;
    maxRating?: number;
    size?: number;
    interactive?: boolean;
    onChange?: (rating: number) => void;
    className?: string;
}

const StarRating = ({
    rating,
    maxRating = 5,
    size = 20,
    interactive = false,
    onChange,
    className = ""
}: StarRatingProps) => {
    const stars = [];

    // Round to nearest half for display, but keep full integer for interactive
    const displayRating = interactive ? Math.round(rating) : rating;

    for (let i = 1; i <= maxRating; i++) {
        let StarIcon = Star;
        let fill = "none";
        let color = "currentColor";

        // Full star
        if (displayRating >= i) {
            fill = "#eab308"; // yellow-500
            color = "#eab308";
        }
        // Half star (approximate logic for display)
        else if (!interactive && displayRating >= i - 0.5) {
            StarIcon = StarHalf;
            fill = "#eab308";
            color = "#eab308";
        }
        // Empty star
        else {
            color = "#4b5563"; // gray-600
        }

        const Wrapper = interactive ? 'button' : 'span';
        const wrapperProps = interactive
            ? {
                type: "button" as const,
                onClick: () => onChange && onChange(i),
                className: `cursor-pointer hover:scale-110 transition-transform ${className}`
            }
            : {
                className: `cursor-default ${className}`
            };

        stars.push(
            <Wrapper
                key={i}
                {...wrapperProps}
            >
                <StarIcon size={size} fill={fill} color={color} />
            </Wrapper>
        );
    }

    return (
        <div className="flex gap-1 items-center">
            {stars}
        </div>
    );
};

export default StarRating;

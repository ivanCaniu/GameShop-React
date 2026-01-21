import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
    children: ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

const Card = ({ children, className = '', hoverEffect = false }: CardProps) => {
    return (
        <motion.div
            whileHover={hoverEffect ? { y: -5, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)' } : {}}
            className={`bg-[var(--color-bg-secondary)] border border-white/5 rounded-xl overflow-hidden shadow-lg ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default Card;

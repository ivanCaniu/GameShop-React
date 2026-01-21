import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    children: ReactNode;
    isLoading?: boolean;
}

const Button = ({
    variant = 'primary',
    size = 'md',
    children,
    isLoading,
    className = '',
    ...props
}: ButtonProps) => {
    const baseStyles = "relative inline-flex items-center justify-center font-bold tracking-wider uppercase transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed clip-path-polygon";

    const variants = {
        primary: "bg-[var(--color-accent)] text-black hover:bg-emerald-400 focus:ring-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)]",
        secondary: "bg-[var(--color-neon-blue)] text-white hover:bg-sky-400 focus:ring-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.4)]",
        danger: "bg-[var(--color-neon-pink)] text-white hover:bg-pink-400 focus:ring-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.4)]",
        outline: "bg-transparent border-2 border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-black shadow-[0_0_10px_rgba(16,185,129,0.2)]"
    };

    const sizes = {
        sm: "px-4 py-1 text-xs",
        md: "px-6 py-2 text-sm",
        lg: "px-8 py-3 text-base"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props as HTMLMotionProps<"button">} // Type assertion for framer-motion compatibility
        >
            {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : null}
            {children}
        </motion.button>
    );
};

export default Button;

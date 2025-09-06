import type { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    variant?: 'default' | 'glass' | 'bordered';
    padding?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
}

const Card = ({
    children,
    className = '',
    variant = 'default',
    padding = 'md',
    onClick
}: CardProps) => {
    const baseClasses = 'rounded-xl';

    const variantClasses = {
        default: 'bg-gray-800',
        glass: 'bg-black/20 backdrop-blur-sm',
        bordered: 'bg-gray-800 border border-gray-600',
    };

    const paddingClasses = {
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`;

    return (
        <div className={classes} onClick={onClick}>
            {children}
        </div>
    );
};

export default Card;

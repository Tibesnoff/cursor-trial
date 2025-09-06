import type { ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode;
    onClick?: (e?: React.MouseEvent) => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const Button = ({
    children,
    onClick,
    disabled = false,
    variant = 'primary',
    size = 'md',
    className = ''
}: ButtonProps) => {
    const baseClasses = 'font-semibold rounded transition-all focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variantClasses = {
        primary: 'bg-blue-600 hover:bg-blue-500 text-white focus:ring-blue-500',
        secondary: 'bg-gray-600 hover:bg-gray-500 text-white focus:ring-gray-500',
        success: 'bg-green-600 hover:bg-green-500 text-white focus:ring-green-500',
        danger: 'bg-red-600 hover:bg-red-500 text-white focus:ring-red-500',
        warning: 'bg-yellow-600 hover:bg-yellow-500 text-white focus:ring-yellow-500',
    };

    const sizeClasses = {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };

    const disabledClasses = disabled
        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
        : '';

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;

    return (
        <button
            className={classes}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;

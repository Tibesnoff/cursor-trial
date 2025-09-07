import React, { useState } from 'react';

interface DropdownTabProps {
    label: string;
    emoji: string;
    children: React.ReactNode;
    isActive?: boolean;
    className?: string;
}

const DropdownTab: React.FC<DropdownTabProps> = ({
    label,
    emoji,
    children,
    isActive = false,
    className = '',
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={`relative ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Main Tab Button */}
            <button
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${isActive
                        ? 'bg-blue-600 text-white shadow-lg'
                        : isHovered
                            ? 'bg-gray-200 text-gray-800'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-lg">{emoji}</span>
                <span className="font-medium">{label}</span>
                <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                        }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {(isHovered || isOpen) && (
                <div className="absolute left-full top-0 ml-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[200px] z-50">
                    {children}
                </div>
            )}
        </div>
    );
};

interface DropdownTabItemProps {
    label: string;
    emoji: string;
    isActive?: boolean;
    onClick: () => void;
    className?: string;
}

export const DropdownTabItem: React.FC<DropdownTabItemProps> = ({
    label,
    emoji,
    isActive = false,
    onClick,
    className = '',
}) => {
    return (
        <button
            className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-100 transition-colors duration-150 ${isActive ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                } ${className}`}
            onClick={onClick}
        >
            <span className="text-lg">{emoji}</span>
            <span className="font-medium">{label}</span>
        </button>
    );
};

export default DropdownTab;

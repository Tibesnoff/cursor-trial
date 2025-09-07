import React from 'react';

interface NavSubItemProps {
    label: string;
    emoji: string;
    isActive?: boolean;
    onClick: () => void;
}

export const NavSubItem: React.FC<NavSubItemProps> = ({
    label,
    emoji,
    isActive = false,
    onClick,
}) => {
    return (
        <button
            className={`flex items-center justify-center space-x-2 px-3 h-full font-medium text-sm transition-all duration-200 whitespace-nowrap flex-1 dropdown-button ${isActive
                ? 'bg-blue-500 text-white'
                : 'bg-gray-600 text-gray-200 hover:bg-blue-600 hover:text-white'
                }`}
            onClick={onClick}
        >
            <span className="text-sm">{emoji}</span>
            <span>{label}</span>
        </button>
    );
};

export default NavSubItem;

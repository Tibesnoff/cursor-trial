import React, { useState, useRef, useEffect } from 'react';
import './CustomNavItem.css';

interface NavItemProps {
    label: string;
    emoji: string;
    isActive?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

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

const CustomNavItem: React.FC<NavItemProps> = ({
    label,
    emoji,
    isActive = false,
    children,
    onClick,
    className = '',
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Get sub-items from children
    const subItems = React.Children.toArray(children)
        .filter((child): child is React.ReactElement<NavSubItemProps> =>
            React.isValidElement(child) && child.type === NavSubItem
        );

    // Handle nav button click - cycle through dropdown tabs
    const handleNavButtonClick = () => {
        if (subItems.length > 0) {
            // Find the currently active sub-item
            const currentActiveIndex = subItems.findIndex(subItem => subItem.props.isActive);

            // Cycle to next tab
            const nextIndex = (currentActiveIndex + 1) % subItems.length;

            // Call the onClick of the next sub-item
            const nextSubItem = subItems[nextIndex];
            if (nextSubItem && nextSubItem.props.onClick) {
                nextSubItem.props.onClick();
            }
        } else if (onClick) {
            // If no sub-items, use the original onClick
            onClick();
        }
    };

    // If no children, render as a simple button
    if (!children) {
        return (
            <button
                className={`w-full flex items-center justify-start space-x-3 h-12 px-4 rounded-lg font-medium transition-all duration-200 ${isActive
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                    } ${className}`}
                onClick={onClick}
            >
                <span className="text-lg flex-shrink-0">{emoji}</span>
                <span className="truncate">{label}</span>
            </button>
        );
    }

    return (
        <div
            ref={containerRef}
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
        >
            {/* Main nav button */}
            <button
                className={`w-full flex items-center justify-start space-x-3 h-12 px-4 font-medium transition-all duration-200 ${isActive
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                    } ${isDropdownOpen ? 'rounded-l-lg rounded-r-none' : 'rounded-lg'} ${className}`}
                onClick={handleNavButtonClick}
            >
                <span className="text-lg flex-shrink-0">{emoji}</span>
                <span className="truncate">{label}</span>
            </button>

            {/* Custom dropdown */}
            {isDropdownOpen && subItems.length > 0 && (
                <div className="absolute left-full top-0 h-12 flex items-center bg-gray-700 border border-gray-500 border-l-0 rounded-r-lg shadow-lg z-50">
                    {subItems.map((subItem, index) => (
                        <NavSubItem
                            key={index}
                            label={subItem.props.label}
                            emoji={subItem.props.emoji}
                            isActive={subItem.props.isActive}
                            onClick={subItem.props.onClick}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomNavItem;
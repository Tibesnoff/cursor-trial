import React, { useState, useRef, useEffect } from 'react';
import { NavSubItem } from './NavSubItem';
import './CustomNavItem.css';

interface NavItemProps {
    label: string;
    emoji: string;
    isActive?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    className?: string;
    unlockCost?: Record<string, number | undefined>;
    status?: 'unlocked' | 'available' | 'locked';
}

const CustomNavItem: React.FC<NavItemProps> = ({
    label,
    emoji,
    isActive = false,
    children,
    onClick,
    className = '',
    unlockCost,
    status = 'unlocked',
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
        .filter((child): child is React.ReactElement<{ isActive?: boolean; onClick: () => void; label: string; emoji: string }> =>
            React.isValidElement(child) && child.type === NavSubItem
        );

    // Format unlock cost for display
    const formatUnlockCost = (cost: Record<string, number | undefined>) => {
        const parts = [];
        if (cost.quantumEnergy) parts.push(`${cost.quantumEnergy.toLocaleString()} ⚡`);
        if (cost.quantumCrystals) parts.push(`${cost.quantumCrystals.toLocaleString()} 💎`);
        if (cost.researchData) parts.push(`${cost.researchData.toLocaleString()} 🧪`);
        if (cost.defensePoints) parts.push(`${cost.defensePoints.toLocaleString()} 🛡️`);
        return parts.join(' + ');
    };


    // Handle nav button click - cycle through dropdown tabs
    const handleNavButtonClick = () => {
        if (status === 'locked') {
            return; // Don't do anything if locked
        }

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
                className={`w-full flex items-center justify-start space-x-3 h-16 px-4 rounded-lg font-medium transition-all duration-200 ${status === 'locked'
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    : status === 'available'
                        ? 'bg-yellow-600 text-white hover:bg-yellow-500'
                        : isActive
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                    } ${className}`}
                onClick={status === 'locked' ? undefined : onClick}
                disabled={status === 'locked'}
            >
                <span className="text-lg flex-shrink-0">{emoji}</span>
                <div className="flex flex-col items-start">
                    <span className="truncate">{label}</span>
                    {unlockCost && status !== 'unlocked' && (
                        <span className={`text-xs ${status === 'available'
                            ? 'text-yellow-300'
                            : 'text-gray-400'
                            }`}>
                            {formatUnlockCost(unlockCost)}
                        </span>
                    )}
                </div>
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
                className={`w-full flex items-center justify-start space-x-3 h-16 px-4 font-medium transition-all duration-200 ${status === 'locked'
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    : status === 'available'
                        ? 'bg-yellow-600 text-white hover:bg-yellow-500'
                        : isActive
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                    } ${isDropdownOpen ? 'rounded-l-lg rounded-r-none' : 'rounded-lg'} ${className}`}
                onClick={status === 'locked' ? undefined : handleNavButtonClick}
                disabled={status === 'locked'}
            >
                <span className="text-lg flex-shrink-0">{emoji}</span>
                <div className="flex flex-col items-start">
                    <span className="truncate">{label}</span>
                    {unlockCost && status !== 'unlocked' && (
                        <span className={`text-xs ${status === 'available'
                            ? 'text-yellow-300'
                            : 'text-gray-400'
                            }`}>
                            {formatUnlockCost(unlockCost)}
                        </span>
                    )}
                </div>
            </button>

            {/* Custom dropdown */}
            {isDropdownOpen && subItems.length > 0 && (
                <div className="absolute left-full top-0 h-16 flex items-center bg-gray-700 border border-gray-500 border-l-0 rounded-r-lg shadow-lg z-50">
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

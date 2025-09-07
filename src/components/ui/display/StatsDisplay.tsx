import React from 'react';

interface StatItem {
    label: string;
    value: string | number;
    emoji?: string;
    color?: string;
}

interface StatsDisplayProps {
    stats: StatItem[];
    title?: string;
    className?: string;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats, title, className = "" }) => {
    return (
        <div className={`bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-gray-500/30 ${className}`}>
            {title && (
                <h3 className="text-lg font-bold text-white mb-3 text-center">{title}</h3>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {stats.map((stat, index) => (
                    <div key={index} className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">
                            {stat.emoji && <span className="mr-1">{stat.emoji}</span>}
                            {stat.label}:
                        </span>
                        <span className={`text-sm font-bold ${stat.color || 'text-white'}`}>
                            {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatsDisplay;

import React from 'react';
import { Button, Card } from 'src/components/ui';
import type { CollectorConfig, BuildingCost } from 'src/types';

interface CollectorCardProps {
    collector: CollectorConfig;
    count: number;
    actualCost: BuildingCost;
    affordable: boolean;
    resourceEmoji: string;
    onBuy: () => void;
    formatCost: (cost: BuildingCost) => string;
}

const CollectorCard: React.FC<CollectorCardProps> = ({
    collector,
    count,
    actualCost,
    affordable,
    resourceEmoji,
    onBuy,
    formatCost,
}) => {
    const collectorProduction = collector.baseProduction * count;

    return (
        <Card
            className={`p-4 border transition-all duration-200 hover:scale-105 ${affordable
                ? 'border-green-500/50 hover:border-green-400/70 bg-green-900/10'
                : 'border-gray-600/50 bg-gray-900/10'
                }`}
        >
            {/* Collector Header */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                    <span className="text-2xl">{collector.emoji}</span>
                    <div>
                        <h4 className="font-bold text-white">{collector.name}</h4>
                        <p className="text-xs text-gray-400">
                            {count} owned
                        </p>
                    </div>
                </div>
            </div>

            {/* Production Stats */}
            <div className="bg-black/30 rounded-lg p-3 mb-3">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-300">Current:</span>
                    <span className="text-sm font-bold text-green-400">
                        {collectorProduction.toLocaleString()} {resourceEmoji}/sec
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Per unit:</span>
                    <span className="text-sm text-blue-400">
                        +{collector.baseProduction.toLocaleString()} {resourceEmoji}/sec
                    </span>
                </div>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-300 mb-4 leading-relaxed">
                {collector.description}
            </p>

            {/* Build Button */}
            <Button
                onClick={onBuy}
                variant={affordable ? "primary" : "secondary"}
                size="sm"
                className="w-full"
                disabled={!affordable}
            >
                🔨 Build ({formatCost(actualCost)})
            </Button>
        </Card>
    );
};

export default CollectorCard;

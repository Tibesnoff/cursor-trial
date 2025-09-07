import React from 'react';
import type { CollectorConfig, BuildingCost } from 'src/types';
import CollectorCard from './CollectorCard';

interface CollectorsGridProps {
    collectors: CollectorConfig[];
    collectorCounts: Record<string, number>;
    resourceEmoji: string;
    resourceName: string;
    calculateActualCost: (collector: CollectorConfig) => BuildingCost;
    canAfford: (cost: BuildingCost) => boolean;
    formatCost: (cost: BuildingCost) => string;
    buyActions: Record<string, () => void>;
}

const CollectorsGrid: React.FC<CollectorsGridProps> = ({
    collectors,
    collectorCounts,
    resourceEmoji,
    resourceName,
    calculateActualCost,
    canAfford,
    formatCost,
    buyActions,
}) => {
    return (
        <div className="bg-gradient-to-br from-gray-900/30 to-slate-900/30 backdrop-blur-sm rounded-xl p-6 border border-gray-500/30">
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">🏭 {resourceName} Collectors</h3>
                <p className="text-gray-300">
                    Build collectors to increase your passive {resourceName.toLowerCase()} generation
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {collectors.map(collector => {
                    const count = collectorCounts[collector.id] || 0;
                    const actualCost = calculateActualCost(collector);
                    const affordable = canAfford(actualCost);

                    return (
                        <CollectorCard
                            key={collector.id}
                            collector={collector}
                            count={count}
                            actualCost={actualCost}
                            affordable={affordable}
                            resourceEmoji={resourceEmoji}
                            onBuy={buyActions[collector.id]}
                            formatCost={formatCost}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default CollectorsGrid;

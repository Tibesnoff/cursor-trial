import { useGameState } from 'src/hooks';
import type { CollectorConfig } from 'src/types';
import { CollectSection, ProductionSection, CollectorsGrid } from 'src/components/collectors';

interface CollectorScreenProps {
    title: string;
    description: string;
    collectors: CollectorConfig[];
    collectorCounts: Record<string, number>;
    production: number;
    clickPower: number;
    buyActions: Record<string, () => void>;
    onCollect: () => void;
    onUpgradeClick: () => void;
    resourceEmoji: string;
    resourceName: string;
    clickUpgradeCost?: any;
}

const CollectorScreen = ({
    title,
    description,
    collectors,
    collectorCounts,
    production,
    clickPower,
    buyActions,
    onCollect,
    onUpgradeClick,
    resourceEmoji,
    resourceName,
    clickUpgradeCost,
}: CollectorScreenProps) => {
    const { resources, upgrades } = useGameState();

    const calculateActualCost = (collector: CollectorConfig) => {
        const count = collectorCounts[collector.id] || 0;
        const multiplier = Math.pow(collector.costMultiplier, count);

        const actualCost: any = {};
        Object.entries(collector.baseCost).forEach(([resource, amount]) => {
            if (amount) {
                actualCost[resource] = Math.floor(amount * multiplier);
            }
        });
        return actualCost;
    };

    const canAfford = (cost: any) => {
        return Object.entries(cost).every(([resource, amount]) => {
            if (!amount) return true;
            return (resources[resource as keyof typeof resources] || 0) >= (amount as number);
        });
    };

    const formatCost = (cost: any) => {
        const parts = [];
        if (cost.quantumEnergy) parts.push(`${cost.quantumEnergy.toLocaleString()} ⚡`);
        if (cost.quantumCrystals) parts.push(`${cost.quantumCrystals.toLocaleString()} 💎`);
        if (cost.researchData) parts.push(`${cost.researchData.toLocaleString()} 🧪`);
        if (cost.defensePoints) parts.push(`${cost.defensePoints.toLocaleString()} 🛡️`);
        return parts.join(' + ');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
                <p className="text-gray-300">{description}</p>
            </div>

            {/* Top Section - Collect and Production Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CollectSection
                    resourceEmoji={resourceEmoji}
                    resourceName={resourceName}
                    clickUpgradeCost={clickUpgradeCost}
                    canAfford={canAfford}
                    formatCost={formatCost}
                    onCollect={onCollect}
                    onUpgradeClick={onUpgradeClick}
                />

                <ProductionSection
                    resourceEmoji={resourceEmoji}
                    production={production}
                    clickPower={clickPower}
                    efficiency={(upgrades.collectorEfficiency - 1) * 100}
                />
            </div>

            {/* Bottom Section - Collectors */}
            <CollectorsGrid
                collectors={collectors}
                collectorCounts={collectorCounts}
                resourceEmoji={resourceEmoji}
                resourceName={resourceName}
                calculateActualCost={calculateActualCost}
                canAfford={canAfford}
                formatCost={formatCost}
                buyActions={buyActions}
            />
        </div>
    );
};

export default CollectorScreen;

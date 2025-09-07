import { useGameState } from 'src/hooks';
import type { CollectorConfig, BuildingCost } from 'src/types';
import { CollectSection, ProductionSection, CollectorsGrid } from 'src/components/collectors';
import { calculateCollectorEfficiency, calculateCostReduction } from 'src/utils/upgradeCalculations';

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
    clickUpgradeCost?: BuildingCost;
    clickPowerIncrease?: number;
    collectorType: 'energy' | 'crystal';
    // Autoclicker props
    autoClickerLevel?: number;
    autoClickerSpeed?: number;
    autoClickerEfficiency?: number;
    autoClickerUpgradeCost?: BuildingCost;
    onAutoClickerUpgrade?: () => void;
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
    clickPowerIncrease = 1,
    collectorType,
    // Autoclicker props
    autoClickerLevel = 0,
    autoClickerSpeed = 0,
    autoClickerEfficiency = 1,
    autoClickerUpgradeCost,
    onAutoClickerUpgrade,
}: CollectorScreenProps) => {
    const { resources, upgrades } = useGameState();

    const calculateActualCost = (collector: CollectorConfig) => {
        const count = collectorCounts[collector.id] || 0;
        const multiplier = Math.pow(collector.costMultiplier, count);
        const costReduction = calculateCostReduction({ upgrades } as any);

        const actualCost: Record<string, number> = {};
        Object.entries(collector.baseCost).forEach(([resource, amount]) => {
            if (amount) {
                const baseCost = Math.floor(amount * multiplier);
                const reducedCost = Math.floor(baseCost * (1 - costReduction));
                actualCost[resource] = reducedCost;
            }
        });
        return actualCost;
    };

    const canAfford = (cost: BuildingCost) => {
        return Object.entries(cost).every(([resource, amount]) => {
            if (!amount) return true;
            return (resources[resource as keyof typeof resources] || 0) >= (amount as number);
        });
    };

    const formatCost = (cost: BuildingCost) => {
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
                    clickUpgradeCost={clickUpgradeCost || {}}
                    clickPowerIncrease={clickPowerIncrease}
                    canAfford={canAfford}
                    formatCost={formatCost}
                    onCollect={onCollect}
                    onUpgradeClick={onUpgradeClick}
                    autoClickerLevel={autoClickerLevel}
                    autoClickerSpeed={autoClickerSpeed}
                    autoClickerEfficiency={autoClickerEfficiency}
                    autoClickerUpgradeCost={autoClickerUpgradeCost}
                    onAutoClickerUpgrade={onAutoClickerUpgrade}
                />

                <ProductionSection
                    resourceEmoji={resourceEmoji}
                    production={production}
                    clickPower={clickPower}
                    efficiency={(calculateCollectorEfficiency({ upgrades } as any, collectorType) - 1) * 100}
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

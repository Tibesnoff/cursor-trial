import { useGameState } from 'src/hooks';
import { Button } from 'src/components/ui';
import { Card } from 'src/components/ui';
import type { CollectorConfig } from 'src/types';

interface CollectorScreenProps {
    title: string;
    description: string;
    collectors: CollectorConfig[];
    collectorCounts: Record<string, number>;
    production: number;
    clickPower: number;
    buyActions: Record<string, () => void>;
    onCollect: () => void;
    resourceEmoji: string;
    resourceName: string;
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
    resourceEmoji,
    resourceName,
}: CollectorScreenProps) => {
    const { resources } = useGameState();

    const canAfford = (cost: any) => {
        return Object.entries(cost).every(([resource, amount]) => {
            if (!amount) return true;
            return (resources[resource as keyof typeof resources] || 0) >= (amount as number);
        });
    };

    const formatCost = (cost: any) => {
        const parts = [];
        if (cost.quantumEnergy) parts.push(`${cost.quantumEnergy} ⚡`);
        if (cost.quantumCrystals) parts.push(`${cost.quantumCrystals} 💎`);
        if (cost.researchData) parts.push(`${cost.researchData} 🧪`);
        if (cost.defensePoints) parts.push(`${cost.defensePoints} 🛡️`);
        return parts.join(' + ');
    };

    return (
        <div className="space-y-6">
            {/* Main Clicker */}
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-8 border border-blue-500/30 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
                <p className="text-gray-300 mb-6">{description}</p>
                <Button
                    onClick={onCollect}
                    variant="primary"
                    size="lg"
                    className="text-4xl p-8 rounded-full hover:scale-105 transition-transform"
                >
                    {resourceEmoji} Collect {resourceName}
                </Button>
            </div>

            {/* Production Summary */}
            <Card className="bg-black/20 backdrop-blur-sm border border-green-500/30 p-6">
                <h3 className="text-xl font-bold text-white mb-4">{resourceName} Production</h3>
                <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">
                        {production.toLocaleString()} {resourceEmoji}/sec
                    </div>
                    <p className="text-gray-300">
                        Total {resourceName.toLowerCase()} production from all collectors
                    </p>
                    <div className="mt-2 text-lg text-blue-400">
                        +{clickPower} {resourceEmoji} per click
                    </div>
                </div>
            </Card>

            {/* Collectors */}
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
                <h3 className="text-xl font-bold text-white mb-4">{resourceName} Collectors</h3>
                <p className="text-gray-300 mb-6">
                    Build collectors to increase your passive {resourceName.toLowerCase()} generation
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {collectors.map(collector => {
                        const affordable = canAfford(collector.baseCost);
                        const count = collectorCounts[collector.id] || 0;
                        const collectorProduction = collector.baseProduction * count;
                        const collectorClickPower = collector.clickPower * count;

                        return (
                            <Card
                                key={collector.id}
                                className={`p-4 border ${affordable
                                    ? 'border-green-500/50 hover:border-green-400/70'
                                    : 'border-gray-600/50'
                                    } transition-colors`}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">{collector.emoji}</span>
                                        <div>
                                            <h4 className="font-semibold text-white">{collector.name}</h4>
                                            <p className="text-sm text-gray-400">
                                                {count} owned
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-bold text-green-400">
                                            {collectorProduction.toLocaleString()} {resourceEmoji}/sec
                                        </div>
                                        <div className="text-sm text-blue-400">
                                            +{collectorClickPower} {resourceEmoji}/click
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    onClick={buyActions[collector.id]}
                                    variant={affordable ? "primary" : "secondary"}
                                    size="sm"
                                    className="w-full"
                                    disabled={!affordable}
                                >
                                    Build ({formatCost(collector.baseCost)})
                                </Button>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CollectorScreen;

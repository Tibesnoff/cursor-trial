import { useGameState, useGameActions } from 'src/hooks';
import { Button } from 'src/components/ui';
import { Card } from 'src/components/ui';

const QuantumCollectorScreen = () => {
    const { resources, buildings, upgrades } = useGameState();
    const { click, buyBasicCollector, buyQuantumReactor, buyStellarForge, buyVoidExtractor } = useGameActions();

    // Calculate energy production from energy buildings
    const calculateEnergyProduction = () => {
        const energyBuildings = [
            { type: 'basicCollectors', baseProduction: 1, count: buildings.basicCollectors },
            { type: 'quantumReactors', baseProduction: 5, count: buildings.quantumReactors },
            { type: 'stellarForges', baseProduction: 500, count: buildings.stellarForges },
            { type: 'voidExtractors', baseProduction: 2500, count: buildings.voidExtractors },
        ];

        let totalProduction = 0;
        energyBuildings.forEach(building => {
            totalProduction += building.baseProduction * building.count;
        });

        // Apply collector efficiency upgrade
        const efficiencyMultiplier = 1 + upgrades.collectorEfficiency * 0.1;
        return Math.floor(totalProduction * efficiencyMultiplier);
    };

    const energyProduction = calculateEnergyProduction();

    const energyBuildings = [
        {
            id: 'basicCollectors',
            name: 'Basic Collector',
            emoji: '⚡',
            count: buildings.basicCollectors,
            baseProduction: 1,
            cost: { quantumEnergy: 10 },
            action: buyBasicCollector,
        },
        {
            id: 'quantumReactors',
            name: 'Quantum Reactor',
            emoji: '🔬',
            count: buildings.quantumReactors,
            baseProduction: 5,
            cost: { quantumEnergy: 50, quantumCrystals: 5 },
            action: buyQuantumReactor,
        },
        {
            id: 'stellarForges',
            name: 'Stellar Forge',
            emoji: '⭐',
            count: buildings.stellarForges,
            baseProduction: 500,
            cost: { quantumEnergy: 5000, quantumCrystals: 50 },
            action: buyStellarForge,
        },
        {
            id: 'voidExtractors',
            name: 'Void Extractor',
            emoji: '🌀',
            count: buildings.voidExtractors,
            baseProduction: 2500,
            cost: { quantumEnergy: 25000, quantumCrystals: 250 },
            action: buyVoidExtractor,
        },
    ];

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
                <h2 className="text-2xl font-bold text-white mb-4">⚡ Quantum Collector</h2>
                <p className="text-gray-300 mb-6">
                    Click to harvest quantum energy from the cosmic void
                </p>
                <Button
                    onClick={click}
                    variant="primary"
                    size="lg"
                    className="text-4xl p-8 rounded-full hover:scale-105 transition-transform"
                >
                    ⚡ Collect Energy
                </Button>
            </div>

            {/* Energy Production Summary */}
            <Card className="bg-black/20 backdrop-blur-sm border border-green-500/30 p-6">
                <h3 className="text-xl font-bold text-white mb-4">Energy Production</h3>
                <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">
                        {energyProduction.toLocaleString()} ⚡/sec
                    </div>
                    <p className="text-gray-300">
                        Total energy production from all collectors
                    </p>
                </div>
            </Card>

            {/* Energy Buildings */}
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
                <h3 className="text-xl font-bold text-white mb-4">Energy Collectors</h3>
                <p className="text-gray-300 mb-6">
                    Build energy collectors to increase your passive energy generation
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {energyBuildings.map(building => {
                        const affordable = canAfford(building.cost);
                        const production = building.baseProduction * building.count;
                        
                        return (
                            <Card
                                key={building.id}
                                className={`p-4 border ${
                                    affordable 
                                        ? 'border-green-500/50 hover:border-green-400/70' 
                                        : 'border-gray-600/50'
                                } transition-colors`}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">{building.emoji}</span>
                                        <div>
                                            <h4 className="font-semibold text-white">{building.name}</h4>
                                            <p className="text-sm text-gray-400">
                                                {building.count} owned
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-bold text-green-400">
                                            {production.toLocaleString()} ⚡/sec
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    onClick={building.action}
                                    variant={affordable ? "primary" : "secondary"}
                                    size="sm"
                                    className="w-full"
                                    disabled={!affordable}
                                >
                                    Build ({formatCost(building.cost)})
                                </Button>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default QuantumCollectorScreen;

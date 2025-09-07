import { useGameState, useGameActions } from 'src/hooks';
import { RESEARCH_FACILITIES } from 'src/config';
import type { BuildingCost } from 'src/types';

const ScienceProduction = () => {
    const { research, resources } = useGameState();
    const { buyResearchLab, buyDataCenter, buyQuantumComputer, buyNeuralNetwork } = useGameActions();

    const calculateActualCost = (facility: { costMultiplier: number; baseCost: BuildingCost }, currentCount: number) => {
        const multiplier = Math.pow(facility.costMultiplier, currentCount);
        const actualCost: Record<string, number> = {};
        Object.entries(facility.baseCost).forEach(([resource, amount]) => {
            if (amount && typeof amount === 'number') {
                actualCost[resource] = Math.floor(amount * multiplier);
            }
        });
        return actualCost;
    };

    const canAfford = (cost: Record<string, number | undefined>) => {
        return Object.entries(cost).every(([resource, amount]) => {
            if (!amount) return true;
            return (resources[resource as keyof typeof resources] || 0) >= (amount as number);
        });
    };

    const formatCost = (cost: Record<string, number | undefined>) => {
        const parts = [];
        if (cost.quantumEnergy) parts.push(`${cost.quantumEnergy.toLocaleString()} ⚡`);
        if (cost.quantumCrystals) parts.push(`${cost.quantumCrystals.toLocaleString()} 💎`);
        if (cost.researchData) parts.push(`${cost.researchData.toLocaleString()} 🧪`);
        return parts.join(' + ');
    };

    const buyActions = {
        researchLabs: buyResearchLab,
        dataCenters: buyDataCenter,
        quantumComputers: buyQuantumComputer,
        neuralNetworks: buyNeuralNetwork,
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="text-2xl mr-2">🧪</span>
                    Research Facilities
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {RESEARCH_FACILITIES.map((facility) => {
                        const count = research[facility.id as keyof typeof research] || 0;
                        const cost = calculateActualCost(facility, count);
                        const canBuy = canAfford(cost);
                        const buyAction = buyActions[facility.id as keyof typeof buyActions];

                        return (
                            <div
                                key={facility.id}
                                className={`bg-gray-50 rounded-lg p-4 border-2 transition-all duration-200 ${canBuy ? 'border-gray-200 hover:border-blue-300' : 'border-gray-100 opacity-60'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">{facility.emoji}</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-800">{facility.name}</h4>
                                            <p className="text-sm text-gray-600">Owned: {count}</p>
                                        </div>
                                    </div>
                                    <button
                                        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${canBuy
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                            : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                            }`}
                                        onClick={buyAction}
                                        disabled={!canBuy}
                                    >
                                        Build
                                    </button>
                                </div>

                                <p className="text-sm text-gray-600 mb-3">{facility.description}</p>

                                <div className="text-xs text-gray-500">
                                    <div>Cost: {formatCost(cost)}</div>
                                    <div>Production: {facility.baseProduction} research/sec</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ScienceProduction;

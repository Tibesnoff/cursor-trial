import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    buyBasicCollector,
    buyQuantumReactor,
    buyEnergyHarvester,
    buyCosmicGenerator,
    buyStellarForge,
    buyVoidExtractor,
} from '../store/slices/gameSlice';

interface Building {
    id: string;
    name: string;
    description: string;
    emoji: string;
    baseCost: number;
    costMultiplier: number;
    baseProduction: number;
    count: number;
    action: () => void;
    category: string;
}

interface ResearchCategory {
    id: string;
    name: string;
    emoji: string;
    description: string;
    buildings: Building[];
}

const BuildingsPanel = () => {
    const dispatch = useAppDispatch();
    const { quantumEnergy, buildings } = useAppSelector(state => ({
        quantumEnergy: state.game.resources.quantumEnergy,
        buildings: state.game.buildings,
    }));

    const [activeCategory, setActiveCategory] = useState('basic');

    const getBuildingCost = (baseCost: number, multiplier: number, count: number) => {
        return Math.floor(baseCost * Math.pow(multiplier, count));
    };

    const canAfford = (cost: number) => quantumEnergy >= cost;

    const researchCategories: ResearchCategory[] = [
        {
            id: 'basic',
            name: 'Basic Research',
            emoji: '🔬',
            description: 'Fundamental quantum energy collection',
            buildings: [
                {
                    id: 'basicCollectors',
                    name: 'Basic Collector',
                    description: 'Harvests quantum energy from the void',
                    emoji: '⚡',
                    baseCost: 10,
                    costMultiplier: 1.15,
                    baseProduction: 1,
                    count: buildings.basicCollectors,
                    action: () => dispatch(buyBasicCollector()),
                    category: 'basic',
                },
                {
                    id: 'quantumReactors',
                    name: 'Quantum Reactor',
                    description: 'Advanced energy generation through quantum fusion',
                    emoji: '🔬',
                    baseCost: 50,
                    costMultiplier: 1.2,
                    baseProduction: 5,
                    count: buildings.quantumReactors,
                    action: () => dispatch(buyQuantumReactor()),
                    category: 'basic',
                },
            ],
        },
        {
            id: 'stellar',
            name: 'Stellar Engineering',
            emoji: '⭐',
            description: 'Harness the power of stars',
            buildings: [
                {
                    id: 'energyHarvesters',
                    name: 'Energy Harvester',
                    description: 'Massive arrays that capture stellar radiation',
                    emoji: '🛰️',
                    baseCost: 200,
                    costMultiplier: 1.25,
                    baseProduction: 20,
                    count: buildings.energyHarvesters,
                    action: () => dispatch(buyEnergyHarvester()),
                    category: 'stellar',
                },
                {
                    id: 'stellarForges',
                    name: 'Stellar Forge',
                    description: 'Creates energy by forging new stars',
                    emoji: '⭐',
                    baseCost: 5000,
                    costMultiplier: 1.35,
                    baseProduction: 500,
                    count: buildings.stellarForges,
                    action: () => dispatch(buyStellarForge()),
                    category: 'stellar',
                },
            ],
        },
        {
            id: 'cosmic',
            name: 'Cosmic Manipulation',
            emoji: '🌌',
            description: 'Control the fabric of reality',
            buildings: [
                {
                    id: 'cosmicGenerators',
                    name: 'Cosmic Generator',
                    description: 'Harnesses the power of entire star systems',
                    emoji: '🌌',
                    baseCost: 1000,
                    costMultiplier: 1.3,
                    baseProduction: 100,
                    count: buildings.cosmicGenerators,
                    action: () => dispatch(buyCosmicGenerator()),
                    category: 'cosmic',
                },
                {
                    id: 'voidExtractors',
                    name: 'Void Extractor',
                    description: 'Extracts pure energy from the fabric of space-time',
                    emoji: '🌀',
                    baseCost: 25000,
                    costMultiplier: 1.4,
                    baseProduction: 2500,
                    count: buildings.voidExtractors,
                    action: () => dispatch(buyVoidExtractor()),
                    category: 'cosmic',
                },
            ],
        },
    ];

    const activeCategoryData = researchCategories.find(cat => cat.id === activeCategory);

    return (
        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                🧪 Quantum Research Lab
            </h3>

            {/* Category Tabs */}
            <div className="flex space-x-2 mb-4">
                {researchCategories.map(category => (
                    <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${activeCategory === category.id
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                    >
                        <div className="flex items-center justify-center space-x-1">
                            <span>{category.emoji}</span>
                            <span className="hidden sm:inline">{category.name}</span>
                        </div>
                    </button>
                ))}
            </div>

            {/* Active Category Description */}
            {activeCategoryData && (
                <div className="mb-4 p-3 bg-gray-800/50 rounded-lg">
                    <div className="text-sm text-gray-300 mb-1">
                        {activeCategoryData.emoji} {activeCategoryData.name}
                    </div>
                    <div className="text-xs text-gray-400">
                        {activeCategoryData.description}
                    </div>
                </div>
            )}

            {/* Buildings Grid */}
            <div className="grid grid-cols-1 gap-3">
                {activeCategoryData?.buildings.map(building => {
                    const cost = getBuildingCost(
                        building.baseCost,
                        building.costMultiplier,
                        building.count
                    );
                    const affordable = canAfford(cost);

                    return (
                        <div key={building.id} className="bg-gray-800/50 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl">{building.emoji}</span>
                                    <div>
                                        <div className="font-semibold text-white">
                                            {building.name}
                                        </div>
                                        <div className="text-sm text-gray-300">
                                            {building.baseProduction} energy/sec
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-cyan-400 font-mono text-lg">
                                        {building.count}
                                    </div>
                                </div>
                            </div>

                            <div className="text-sm text-gray-400 mb-3">
                                {building.description}
                            </div>

                            <button
                                onClick={building.action}
                                disabled={!affordable}
                                className={`w-full py-2 px-4 rounded-lg font-semibold transition-all ${affordable
                                        ? 'bg-green-600 hover:bg-green-500 text-white'
                                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                Research ({cost.toLocaleString()} ⚡)
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BuildingsPanel;

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
import type { BuildingInstance } from '../store/slices/gameSlice';
import BuildingManagementModal from './BuildingManagementModal';

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
    recommendedWorkers: {
        engineers?: number;
        scientists?: number;
        technicians?: number;
        operators?: number;
        researchers?: number;
        architects?: number;
    };
}

const BuildingsScreen = () => {
    const dispatch = useAppDispatch();
    const { quantumEnergy, buildings, buildingInstances, workers } = useAppSelector(state => ({
        quantumEnergy: state.game.resources.quantumEnergy,
        buildings: state.game.buildings,
        buildingInstances: state.game.buildingInstances,
        workers: state.game.workers,
    }));

    const [selectedBuilding, setSelectedBuilding] = useState<BuildingInstance | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getBuildingCost = (baseCost: number, multiplier: number, count: number) => {
        return Math.floor(baseCost * Math.pow(multiplier, count));
    };

    const canAfford = (cost: number) => quantumEnergy >= cost;

    const handleBuildingClick = (building: BuildingInstance) => {
        setSelectedBuilding(building);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedBuilding(null);
    };

    const getWorkerBonus = (recommendations: Building['recommendedWorkers']) => {
        let bonus = 1;
        Object.entries(recommendations).forEach(([workerType, recommended]) => {
            if (!recommended) return;
            const current = workers[workerType as keyof typeof workers];
            const ratio = Math.min(current / recommended, 1); // Cap at 100% of recommended
            bonus += ratio * 0.5; // 50% bonus per fully staffed recommendation
        });
        return bonus;
    };

    const buildingsList: Building[] = [
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
            recommendedWorkers: {},
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
            recommendedWorkers: { engineers: 1 },
        },
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
            recommendedWorkers: { engineers: 2, technicians: 1 },
        },
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
            recommendedWorkers: { scientists: 1, engineers: 3, operators: 1 },
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
            recommendedWorkers: { researchers: 1, architects: 1, engineers: 5 },
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
            recommendedWorkers: { researchers: 2, architects: 2, scientists: 2, operators: 3 },
        },
    ];

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">🏗️ Construction Site</h2>
                <p className="text-blue-200">Build and expand your quantum empire</p>
            </div>

            {/* Building Construction */}
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
                <h3 className="text-xl font-bold text-white mb-4">🏭 Construct New Buildings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {buildingsList.map(building => {
                        const cost = getBuildingCost(
                            building.baseCost,
                            building.costMultiplier,
                            building.count
                        );
                        const affordable = canAfford(cost);

                        return (
                            <div key={building.id} className="bg-gray-800/50 rounded-lg p-4">
                                <div className="flex items-center space-x-3 mb-3">
                                    <span className="text-2xl">{building.emoji}</span>
                                    <div>
                                        <h4 className="font-semibold text-white">{building.name}</h4>
                                        <p className="text-sm text-gray-300">{building.baseProduction} energy/sec</p>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400 mb-3">{building.description}</p>
                                <div className="text-sm text-cyan-400 mb-3">Owned: {building.count}</div>
                                <button
                                    onClick={building.action}
                                    disabled={!affordable}
                                    className={`w-full py-2 px-3 rounded text-sm font-semibold transition-all ${affordable
                                        ? 'bg-green-600 hover:bg-green-500 text-white'
                                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    {affordable
                                        ? `Build (${cost.toLocaleString()} ⚡)`
                                        : `Need ${cost.toLocaleString()} ⚡`}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Building Instances */}
            {buildingInstances.length > 0 && (
                <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
                    <h3 className="text-xl font-bold text-white mb-4">🏢 Manage Your Buildings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {buildingInstances.map(building => {
                            const buildingInfo = buildingsList.find(b => b.id === building.type);
                            if (!buildingInfo) return null;

                            const totalAssignedWorkers = Object.values(building.assignedWorkers).reduce((sum, count) => sum + count, 0);

                            return (
                                <div
                                    key={building.id}
                                    onClick={() => handleBuildingClick(building)}
                                    className="bg-gray-800/50 rounded-lg p-4 cursor-pointer hover:bg-gray-700/50 transition-all border border-gray-600 hover:border-blue-500"
                                >
                                    <div className="flex items-center space-x-3 mb-3">
                                        <span className="text-2xl">{buildingInfo.emoji}</span>
                                        <div>
                                            <h4 className="font-semibold text-white">{buildingInfo.name}</h4>
                                            <p className="text-sm text-gray-300">Level {building.level}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-sm text-cyan-400">
                                            Production: {buildingInfo.baseProduction * building.level} energy/sec
                                        </div>
                                        <div className="text-sm text-green-400">
                                            Workers: {totalAssignedWorkers}
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            Click to manage
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Modal */}
            {selectedBuilding && (
                <BuildingManagementModal
                    building={selectedBuilding}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default BuildingsScreen;

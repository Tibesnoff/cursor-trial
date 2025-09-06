import { useState } from 'react';
import { useGameState, useGameActions } from 'src/hooks';
import { BUILDING_GROUPS } from 'src/constants';
import { BuildingCard } from 'src/components/common';
import BuildingManagementModal from 'src/components/game/BuildingManagementModal';

const BuildingsScreen = () => {
    const { buildings } = useGameState();
    const actions = useGameActions();

    const [selectedBuildingType, setSelectedBuildingType] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedBuildingType(null);
    };

    // Create building groups with actions
    const buildingGroups = BUILDING_GROUPS.map(group => ({
        ...group,
        buildings: getBuildingsForGroup(group.id, buildings, actions)
    }));

    return (
        <div className="space-y-6">
            {/* Building Construction Groups */}
            <div className="space-y-8">
                {buildingGroups.map(group => (
                    <div key={group.id} className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-white mb-2">{group.name}</h3>
                            <p className="text-gray-300">{group.description}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {group.buildings.map(building => (
                                <BuildingCard
                                    key={building.id}
                                    building={building}
                                    onBuild={building.action}
                                    onClick={() => {
                                        setSelectedBuildingType(building.id);
                                        setIsModalOpen(true);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Building Instances */}

            {/* Modal */}
            {selectedBuildingType && (
                <BuildingManagementModal
                    buildingType={selectedBuildingType}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

// Helper functions
function getBuildingsForGroup(groupId: string, buildings: any, actions: any) {
    const buildingConfigs = {
        energy: [
            {
                id: 'basicCollectors',
                name: 'Basic Collector',
                description: 'Harvests quantum energy from the void',
                emoji: '⚡',
                baseCost: 10,
                costMultiplier: 1.15,
                baseProduction: 1,
                count: buildings.basicCollectors,
                action: actions.buyBasicCollector,
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
                action: actions.buyQuantumReactor,
                recommendedWorkers: { engineers: 1 },
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
                action: actions.buyStellarForge,
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
                action: actions.buyVoidExtractor,
                recommendedWorkers: { researchers: 2, architects: 2, scientists: 2, operators: 3 },
            },
        ],
        materials: [
            {
                id: 'crystalMines',
                name: 'Crystal Mine',
                description: 'Extracts quantum crystals from dimensional pockets',
                emoji: '💎',
                baseCost: 100,
                costMultiplier: 1.2,
                baseProduction: 2,
                count: buildings.crystalMines,
                action: actions.buyCrystalMine,
                recommendedWorkers: { engineers: 1, technicians: 1 },
            },
            {
                id: 'quantumRefineries',
                name: 'Quantum Refinery',
                description: 'Refines raw crystals into pure quantum matter',
                emoji: '⚗️',
                baseCost: 500,
                costMultiplier: 1.25,
                baseProduction: 10,
                count: buildings.quantumRefineries,
                action: actions.buyQuantumRefinery,
                recommendedWorkers: { scientists: 1, engineers: 2 },
            },
            {
                id: 'matterSynthesizers',
                name: 'Matter Synthesizer',
                description: 'Creates matter from pure energy and quantum fields',
                emoji: '🔮',
                baseCost: 2000,
                costMultiplier: 1.3,
                baseProduction: 50,
                count: buildings.matterSynthesizers,
                action: actions.buyMatterSynthesizer,
                recommendedWorkers: { researchers: 1, scientists: 2, engineers: 1 },
            },
            {
                id: 'dimensionalExtractors',
                name: 'Dimensional Extractor',
                description: 'Pulls exotic matter from parallel dimensions',
                emoji: '🌌',
                baseCost: 10000,
                costMultiplier: 1.35,
                baseProduction: 250,
                count: buildings.dimensionalExtractors,
                action: actions.buyDimensionalExtractor,
                recommendedWorkers: { researchers: 2, architects: 1, scientists: 1 },
            },
        ],
        research: [
            {
                id: 'researchLabs',
                name: 'Research Lab',
                description: 'Basic facility for quantum research and experimentation',
                emoji: '🧪',
                baseCost: 300,
                costMultiplier: 1.2,
                baseProduction: 3,
                count: buildings.researchLabs,
                action: actions.buyResearchLab,
                recommendedWorkers: { scientists: 1, researchers: 1 },
            },
            {
                id: 'dataCenters',
                name: 'Data Center',
                description: 'Processes vast amounts of quantum information',
                emoji: '💻',
                baseCost: 1500,
                costMultiplier: 1.25,
                baseProduction: 15,
                count: buildings.dataCenters,
                action: actions.buyDataCenter,
                recommendedWorkers: { technicians: 2, operators: 1 },
            },
            {
                id: 'quantumComputers',
                name: 'Quantum Computer',
                description: 'Performs calculations across infinite parallel universes',
                emoji: '🖥️',
                baseCost: 7500,
                costMultiplier: 1.3,
                baseProduction: 75,
                count: buildings.quantumComputers,
                action: actions.buyQuantumComputer,
                recommendedWorkers: { researchers: 2, scientists: 1, engineers: 1 },
            },
            {
                id: 'neuralNetworks',
                name: 'Neural Network',
                description: 'AI systems that learn and evolve quantum technologies',
                emoji: '🧠',
                baseCost: 30000,
                costMultiplier: 1.35,
                baseProduction: 375,
                count: buildings.neuralNetworks,
                action: actions.buyNeuralNetwork,
                recommendedWorkers: { researchers: 3, architects: 1, scientists: 2 },
            },
        ],
        defense: [
            {
                id: 'powerGrids',
                name: 'Power Grid',
                description: 'Distributes energy efficiently across your empire',
                emoji: '⚡',
                baseCost: 200,
                costMultiplier: 1.2,
                baseProduction: 1,
                count: buildings.powerGrids,
                action: actions.buyPowerGrid,
                recommendedWorkers: { engineers: 1, technicians: 1 },
            },
            {
                id: 'transportHubs',
                name: 'Transport Hub',
                description: 'Enables instant transportation across dimensions',
                emoji: '🚀',
                baseCost: 1000,
                costMultiplier: 1.25,
                baseProduction: 5,
                count: buildings.transportHubs,
                action: actions.buyTransportHub,
                recommendedWorkers: { operators: 2, engineers: 1 },
            },
            {
                id: 'defenseSystems',
                name: 'Defense System',
                description: 'Protects your empire from cosmic threats',
                emoji: '🛡️',
                baseCost: 5000,
                costMultiplier: 1.3,
                baseProduction: 25,
                count: buildings.defenseSystems,
                action: actions.buyDefenseSystem,
                recommendedWorkers: { engineers: 2, technicians: 1, operators: 1 },
            },
            {
                id: 'communicationArrays',
                name: 'Communication Array',
                description: 'Enables communication across infinite realities',
                emoji: '📡',
                baseCost: 20000,
                costMultiplier: 1.35,
                baseProduction: 125,
                count: buildings.communicationArrays,
                action: actions.buyCommunicationArray,
                recommendedWorkers: { architects: 1, engineers: 2, operators: 2 },
            },
        ],
    };

    return buildingConfigs[groupId as keyof typeof buildingConfigs] || [];
}


export default BuildingsScreen;

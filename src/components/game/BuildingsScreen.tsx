import { useState } from 'react';
import { useGameState, useGameActions } from 'src/hooks';
import { BUILDING_GROUPS } from 'src/config';
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

    // Action mapping for buildings
    const actionMap: Record<string, () => void> = {
        basicCollectors: actions.buyBasicCollector,
        quantumReactors: actions.buyQuantumReactor,
        stellarForges: actions.buyStellarForge,
        voidExtractors: actions.buyVoidExtractor,
        crystalMines: actions.buyCrystalMine,
        quantumRefineries: actions.buyQuantumRefinery,
        matterSynthesizers: actions.buyMatterSynthesizer,
        dimensionalExtractors: actions.buyDimensionalExtractor,
        researchLabs: actions.buyResearchLab,
        dataCenters: actions.buyDataCenter,
        quantumComputers: actions.buyQuantumComputer,
        neuralNetworks: actions.buyNeuralNetwork,
        powerGrids: actions.buyPowerGrid,
        transportHubs: actions.buyTransportHub,
        defenseSystems: actions.buyDefenseSystem,
        communicationArrays: actions.buyCommunicationArray,
    };

    // Create building groups with actions
    const buildingGroups = BUILDING_GROUPS.map(group => ({
        ...group,
        buildings: group.buildings.map(buildingConfig => ({
            ...buildingConfig,
            count: buildings[buildingConfig.id as keyof typeof buildings],
            action: actionMap[buildingConfig.id] || (() => { })
        }))
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

export default BuildingsScreen;

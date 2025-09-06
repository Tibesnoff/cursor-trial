import { useGameState, useGameActions } from 'src/hooks';
import { RESEARCH_FACILITIES } from 'src/config';
import { BuildingCard, ResearchTree } from 'src/components/common';

const ScienceScreen = () => {
    const { research } = useGameState();
    const actions = useGameActions();

    const handleBuildingClick = (buildingType: string) => {
        // For now, just show a simple alert - we'll implement proper modals later
        console.log(`Clicked on ${buildingType}`);
    };

    const actionMap: Record<string, () => void> = {
        researchLabs: actions.buyResearchLab,
        dataCenters: actions.buyDataCenter,
        quantumComputers: actions.buyQuantumComputer,
        neuralNetworks: actions.buyNeuralNetwork,
    };

    const facilityGroups = [
        {
            id: 'research',
            name: '🧪 Research Facilities',
            description: 'Build facilities to generate research data for the research tree',
            color: 'green',
            buildings: RESEARCH_FACILITIES.map(facility => ({
                ...facility,
                count: research[facility.id as keyof typeof research],
                action: actionMap[facility.id] || (() => { })
            }))
        }
    ];

    const handleResearchNodeClick = (nodeId: string) => {
        actions.unlockResearchNode(nodeId);
    };

    return (
        <div className="space-y-6">
            {/* Research Facilities Section */}
            <div className="space-y-8">
                {facilityGroups.map(group => (
                    <div key={group.id} className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-white mb-2">{group.name}</h3>
                            <p className="text-gray-300">{group.description}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {group.buildings.map(building => (
                                <BuildingCard
                                    key={building.id}
                                    building={building}
                                    onBuild={building.action}
                                    onClick={() => handleBuildingClick(building.id)}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Research Tree Section */}
            <div className="space-y-6">
                <div>
                    <h3 className="text-3xl font-bold text-white mb-2">🔬 Research Tree</h3>
                    <p className="text-gray-300 text-lg">Unlock new technologies and bonuses through research</p>
                </div>

                {/* Research Tree Visualization */}
                <ResearchTree onNodeClick={handleResearchNodeClick} />
            </div>
        </div>
    );
};

export default ScienceScreen;

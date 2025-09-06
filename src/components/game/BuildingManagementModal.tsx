import { useGameState, useGameActions } from 'src/hooks';
import { Button, Card } from 'src/components/ui';

interface BuildingManagementModalProps {
    buildingType: string;
    isOpen: boolean;
    onClose: () => void;
}

const BuildingManagementModal = ({ buildingType, isOpen, onClose }: BuildingManagementModalProps) => {
    const { resources, buildings } = useGameState();
    const { quantumEnergy } = resources;
    const actions = useGameActions();

    if (!isOpen) return null;

    const buildingInfo = getBuildingInfo(buildingType);
    const buildingCount = buildings[buildingType as keyof typeof buildings] || 0;
    const upgradeCost = Math.floor(100 * Math.pow(2, buildingCount - 1));
    const canUpgrade = quantumEnergy >= upgradeCost;


    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-xl border border-blue-500/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="p-6 border-b border-gray-700">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <span className="text-4xl">{buildingInfo.emoji}</span>
                            <div>
                                <h2 className="text-2xl font-bold text-white">{buildingInfo.name}</h2>
                                <p className="text-gray-400">Level {buildingCount}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white text-2xl"
                        >
                            ×
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Building Stats */}
                    <Card variant="bordered" padding="md">
                        <h3 className="text-lg font-semibold text-white mb-3">Building Statistics</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-sm text-gray-400">Base Production</div>
                                <div className="text-xl text-cyan-400 font-mono">{buildingInfo.baseProduction} energy/sec</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-400">Total Production</div>
                                <div className="text-xl text-green-400 font-mono">{buildingInfo.baseProduction * buildingCount} energy/sec</div>
                            </div>
                        </div>
                    </Card>


                    {/* Building Upgrade */}
                    <Card variant="bordered" padding="md">
                        <h3 className="text-lg font-semibold text-white mb-3">⬆️ Build More</h3>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-white">Build another {buildingInfo.name}</div>
                                <div className="text-sm text-gray-400">
                                    Increases total production by {buildingInfo.baseProduction} energy/sec
                                </div>
                            </div>
                            <Button
                                onClick={() => {
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

                                    const action = actionMap[buildingType];
                                    if (action) {
                                        action();
                                    }
                                }}
                                disabled={!canUpgrade}
                                variant={canUpgrade ? 'primary' : 'secondary'}
                                size="md"
                            >
                                {canUpgrade
                                    ? `Build (${upgradeCost.toLocaleString()} ⚡)`
                                    : `Insufficient Energy (${upgradeCost.toLocaleString()} ⚡)`}
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

function getBuildingInfo(type: string) {
    const buildingTypes = {
        // Energy Buildings
        basicCollectors: { name: 'Basic Collector', emoji: '⚡', baseProduction: 1 },
        quantumReactors: { name: 'Quantum Reactor', emoji: '🔬', baseProduction: 5 },
        stellarForges: { name: 'Stellar Forge', emoji: '⭐', baseProduction: 500 },
        voidExtractors: { name: 'Void Extractor', emoji: '🌀', baseProduction: 2500 },
        // Material Buildings
        crystalMines: { name: 'Crystal Mine', emoji: '💎', baseProduction: 2 },
        quantumRefineries: { name: 'Quantum Refinery', emoji: '⚗️', baseProduction: 10 },
        matterSynthesizers: { name: 'Matter Synthesizer', emoji: '🔮', baseProduction: 50 },
        dimensionalExtractors: { name: 'Dimensional Extractor', emoji: '🌌', baseProduction: 250 },
        // Research Buildings
        researchLabs: { name: 'Research Lab', emoji: '🧪', baseProduction: 3 },
        dataCenters: { name: 'Data Center', emoji: '💻', baseProduction: 15 },
        quantumComputers: { name: 'Quantum Computer', emoji: '🖥️', baseProduction: 75 },
        neuralNetworks: { name: 'Neural Network', emoji: '🧠', baseProduction: 375 },
        // Defense Buildings
        powerGrids: { name: 'Power Grid', emoji: '⚡', baseProduction: 1 },
        transportHubs: { name: 'Transport Hub', emoji: '🚀', baseProduction: 5 },
        defenseSystems: { name: 'Defense System', emoji: '🛡️', baseProduction: 25 },
        communicationArrays: { name: 'Communication Array', emoji: '📡', baseProduction: 125 },
    };
    return buildingTypes[type as keyof typeof buildingTypes] || { name: 'Unknown', emoji: '❓', baseProduction: 1 };
}

export default BuildingManagementModal;

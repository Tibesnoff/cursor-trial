import { useAppDispatch, useAppSelector } from '../store/hooks';
import { assignWorkerToBuilding, unassignWorkerFromBuilding, upgradeBuilding } from '../store/slices/gameSlice';
import type { BuildingInstance } from '../store/slices/gameSlice';

interface BuildingManagementModalProps {
    building: BuildingInstance;
    isOpen: boolean;
    onClose: () => void;
}

const BuildingManagementModal = ({ building, isOpen, onClose }: BuildingManagementModalProps) => {
    const dispatch = useAppDispatch();
    const { quantumEnergy, workers } = useAppSelector(state => ({
        quantumEnergy: state.game.resources.quantumEnergy,
        workers: state.game.workers,
    }));

    if (!isOpen) return null;

    const getBuildingInfo = (type: string) => {
        const buildingTypes = {
            basicCollectors: { name: 'Basic Collector', emoji: '⚡', baseProduction: 1 },
            quantumReactors: { name: 'Quantum Reactor', emoji: '🔬', baseProduction: 5 },
            energyHarvesters: { name: 'Energy Harvester', emoji: '🛰️', baseProduction: 20 },
            cosmicGenerators: { name: 'Cosmic Generator', emoji: '🌌', baseProduction: 100 },
            stellarForges: { name: 'Stellar Forge', emoji: '⭐', baseProduction: 500 },
            voidExtractors: { name: 'Void Extractor', emoji: '🌀', baseProduction: 2500 },
        };
        return buildingTypes[type as keyof typeof buildingTypes] || { name: 'Unknown', emoji: '❓', baseProduction: 1 };
    };

    const buildingInfo = getBuildingInfo(building.type);
    const upgradeCost = Math.floor(100 * Math.pow(2, building.level - 1));
    const canUpgrade = quantumEnergy >= upgradeCost;

    const handleAssignWorker = (workerType: keyof BuildingInstance['assignedWorkers']) => {
        dispatch(assignWorkerToBuilding({ buildingId: building.id, workerType }));
    };

    const handleUnassignWorker = (workerType: keyof BuildingInstance['assignedWorkers']) => {
        dispatch(unassignWorkerFromBuilding({ buildingId: building.id, workerType }));
    };

    const handleUpgrade = () => {
        dispatch(upgradeBuilding({ buildingId: building.id }));
    };

    const workerTypes = [
        { key: 'engineers', name: 'Engineers', emoji: '🔧', color: 'blue' },
        { key: 'technicians', name: 'Technicians', emoji: '⚙️', color: 'green' },
        { key: 'scientists', name: 'Scientists', emoji: '🧪', color: 'purple' },
        { key: 'operators', name: 'Operators', emoji: '🎛️', color: 'yellow' },
        { key: 'researchers', name: 'Researchers', emoji: '🔬', color: 'cyan' },
        { key: 'architects', name: 'Architects', emoji: '🏗️', color: 'orange' },
    ] as const;

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
                                <p className="text-gray-400">Level {building.level}</p>
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
                    <div className="bg-gray-800/50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-white mb-3">Building Statistics</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-sm text-gray-400">Base Production</div>
                                <div className="text-xl text-cyan-400 font-mono">{buildingInfo.baseProduction} energy/sec</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-400">Level Multiplier</div>
                                <div className="text-xl text-green-400 font-mono">{building.level}x</div>
                            </div>
                        </div>
                    </div>

                    {/* Worker Assignment */}
                    <div className="bg-gray-800/50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-white mb-3">👥 Worker Assignment</h3>
                        <div className="space-y-3">
                            {workerTypes.map(worker => {
                                const assigned = building.assignedWorkers[worker.key];
                                const available = workers[worker.key];
                                const canAssign = available > 0;
                                const canUnassign = assigned > 0;

                                return (
                                    <div key={worker.key} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-xl">{worker.emoji}</span>
                                            <div>
                                                <div className="text-white font-medium">{worker.name}</div>
                                                <div className="text-sm text-gray-400">
                                                    Assigned: {assigned} | Available: {available}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleUnassignWorker(worker.key)}
                                                disabled={!canUnassign}
                                                className={`px-3 py-1 rounded text-sm font-semibold ${canUnassign
                                                    ? 'bg-red-600 hover:bg-red-500 text-white'
                                                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                                    }`}
                                            >
                                                -
                                            </button>
                                            <button
                                                onClick={() => handleAssignWorker(worker.key)}
                                                disabled={!canAssign}
                                                className={`px-3 py-1 rounded text-sm font-semibold ${canAssign
                                                    ? 'bg-green-600 hover:bg-green-500 text-white'
                                                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                                    }`}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Building Upgrade */}
                    <div className="bg-gray-800/50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-white mb-3">⬆️ Building Upgrade</h3>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-white">Upgrade to Level {building.level + 1}</div>
                                <div className="text-sm text-gray-400">
                                    Increases production multiplier by 1x
                                </div>
                            </div>
                            <button
                                onClick={handleUpgrade}
                                disabled={!canUpgrade}
                                className={`px-6 py-3 rounded-lg font-semibold ${canUpgrade
                                    ? 'bg-blue-600 hover:bg-blue-500 text-white'
                                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                {canUpgrade
                                    ? `Upgrade (${upgradeCost.toLocaleString()} ⚡)`
                                    : `Insufficient Energy (${upgradeCost.toLocaleString()} ⚡)`}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuildingManagementModal;

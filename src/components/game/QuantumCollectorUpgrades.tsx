import { useGameState, useGameActions } from 'src/hooks';

const QuantumCollectorUpgrades = () => {
    const { upgrades } = useGameState();
    const { upgradeCollectorEfficiency } = useGameActions();

    const efficiencyCost = Math.floor(50000 * Math.pow(2, upgrades.collectorEfficiency - 1));

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="text-2xl mr-2">⚡</span>
                    Energy Collector Upgrades
                </h3>

                <div className="space-y-4">
                    {/* Collector Efficiency Upgrade */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <h4 className="text-lg font-semibold text-gray-800 mb-1">
                                    Collector Efficiency
                                </h4>
                                <p className="text-gray-600 text-sm mb-2">
                                    Increases energy production from all collectors by 10% per level
                                </p>
                                <div className="text-sm text-gray-500">
                                    Current Level: {upgrades.collectorEfficiency} (+{((upgrades.collectorEfficiency - 1) * 10).toFixed(1)}% production)
                                </div>
                            </div>
                            <div className="ml-4">
                                <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                                    onClick={upgradeCollectorEfficiency}
                                >
                                    Upgrade
                                </button>
                                <div className="text-xs text-gray-500 mt-1 text-center">
                                    {efficiencyCost.toLocaleString()} ⚡
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Future upgrades can be added here */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 opacity-50">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <h4 className="text-lg font-semibold text-gray-800 mb-1">
                                    Auto-Collector
                                </h4>
                                <p className="text-gray-600 text-sm mb-2">
                                    Automatically collect energy every few seconds
                                </p>
                                <div className="text-sm text-gray-500">
                                    Coming Soon
                                </div>
                            </div>
                            <div className="ml-4">
                                <button
                                    className="bg-gray-400 text-white px-4 py-2 rounded-lg font-medium cursor-not-allowed"
                                    disabled
                                >
                                    Locked
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuantumCollectorUpgrades;

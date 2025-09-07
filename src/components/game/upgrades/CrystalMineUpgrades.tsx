import { useGameState, useGameActions } from 'src/hooks';

const CrystalMineUpgrades = () => {
    const { upgrades } = useGameState();
    const { upgradeCrystalEfficiency } = useGameActions();

    const efficiencyCost = Math.floor(10000 * Math.pow(1.5, upgrades.crystalEfficiency - 1));

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="text-2xl mr-2">💎</span>
                    Crystal Mine Upgrades
                </h3>

                <div className="space-y-4">
                    {/* Crystal Efficiency Upgrade */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <h4 className="text-lg font-semibold text-gray-800 mb-1">
                                    Crystal Efficiency
                                </h4>
                                <p className="text-gray-600 text-sm mb-2">
                                    Increases crystal production from all mines by 50% per level
                                </p>
                                <div className="text-sm text-gray-500">
                                    Current Level: {upgrades.crystalEfficiency} (+{((upgrades.crystalEfficiency - 1) * 50).toFixed(1)}% production)
                                </div>
                            </div>
                            <div className="ml-4">
                                <button
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                                    onClick={upgradeCrystalEfficiency}
                                >
                                    Upgrade
                                </button>
                                <div className="text-xs text-gray-500 mt-1 text-center">
                                    {efficiencyCost.toLocaleString()} 💎
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Future upgrades can be added here */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 opacity-50">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <h4 className="text-lg font-semibold text-gray-800 mb-1">
                                    Crystal Refinement
                                </h4>
                                <p className="text-gray-600 text-sm mb-2">
                                    Convert basic crystals into higher quality ones
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

export default CrystalMineUpgrades;

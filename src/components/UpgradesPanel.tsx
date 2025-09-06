import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    upgradeClickPower,
    upgradeCollectorEfficiency,
} from '../store/slices/gameSlice';

const UpgradesPanel = () => {
    const dispatch = useAppDispatch();
    const { quantumEnergy, clickPower, collectorEfficiency } = useAppSelector(
        state => ({
            quantumEnergy: state.game.resources.quantumEnergy,
            clickPower: state.game.upgrades.clickPower,
            collectorEfficiency: state.game.upgrades.collectorEfficiency,
        })
    );

    const getClickPowerCost = () => {
        return Math.floor(50 * Math.pow(1.5, clickPower - 1));
    };

    const getCollectorEfficiencyCost = () => {
        return Math.floor(100 * Math.pow(2, collectorEfficiency - 1));
    };

    const canAffordClickPower = quantumEnergy >= getClickPowerCost();
    const canAffordCollectorEfficiency =
        quantumEnergy >= getCollectorEfficiencyCost();

    const handleUpgradeClickPower = () => {
        if (canAffordClickPower) {
            dispatch(upgradeClickPower());
        }
    };

    const handleUpgradeCollectorEfficiency = () => {
        if (canAffordCollectorEfficiency) {
            dispatch(upgradeCollectorEfficiency());
        }
    };

    return (
        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/30">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                ⚡ Upgrades
            </h3>

            <div className="space-y-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <div className="font-semibold text-white">Click Power</div>
                            <div className="text-sm text-gray-300">
                                Current: +{clickPower} energy per click
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleUpgradeClickPower}
                        disabled={!canAffordClickPower}
                        className={`w-full py-2 px-4 rounded-lg font-semibold transition-all ${canAffordClickPower
                                ? 'bg-yellow-600 hover:bg-yellow-500 text-white'
                                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        Upgrade ({getClickPowerCost().toLocaleString()} ⚡)
                    </button>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <div className="font-semibold text-white">
                                Collector Efficiency
                            </div>
                            <div className="text-sm text-gray-300">
                                Current: {collectorEfficiency}x energy generation
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleUpgradeCollectorEfficiency}
                        disabled={!canAffordCollectorEfficiency}
                        className={`w-full py-2 px-4 rounded-lg font-semibold transition-all ${canAffordCollectorEfficiency
                                ? 'bg-yellow-600 hover:bg-yellow-500 text-white'
                                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        Upgrade ({getCollectorEfficiencyCost().toLocaleString()} ⚡)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpgradesPanel;

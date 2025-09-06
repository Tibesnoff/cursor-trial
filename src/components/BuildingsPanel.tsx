import { useAppDispatch, useAppSelector } from '../store/hooks';
import { buyBasicCollector } from '../store/slices/gameSlice';

const BuildingsPanel = () => {
    const dispatch = useAppDispatch();
    const { quantumEnergy, basicCollectors } = useAppSelector(state => ({
        quantumEnergy: state.game.resources.quantumEnergy,
        basicCollectors: state.game.buildings.basicCollectors,
    }));

    const getBasicCollectorCost = () => {
        return Math.floor(10 * Math.pow(1.15, basicCollectors));
    };

    const canAffordBasicCollector = quantumEnergy >= getBasicCollectorCost();

    const handleBuyBasicCollector = () => {
        if (canAffordBasicCollector) {
            dispatch(buyBasicCollector());
        }
    };

    return (
        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                🏭 Buildings
            </h3>

            <div className="space-y-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <div className="font-semibold text-white">Basic Collector</div>
                            <div className="text-sm text-gray-300">
                                Generates 1 energy per second
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-cyan-400 font-mono">{basicCollectors}</div>
                        </div>
                    </div>

                    <button
                        onClick={handleBuyBasicCollector}
                        disabled={!canAffordBasicCollector}
                        className={`w-full py-2 px-4 rounded-lg font-semibold transition-all ${canAffordBasicCollector
                                ? 'bg-green-600 hover:bg-green-500 text-white'
                                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        Buy ({getBasicCollectorCost().toLocaleString()} ⚡)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BuildingsPanel;

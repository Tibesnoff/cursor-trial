import { useAppDispatch, useAppSelector } from '../store/hooks';
import { click } from '../store/slices/gameSlice';

const MainClicker = () => {
    const dispatch = useAppDispatch();
    const clickPower = useAppSelector(state => state.game.upgrades.clickPower);

    const handleClick = () => {
        dispatch(click());
    };

    return (
        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-8 border border-purple-500/30">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-6">
                    Quantum Energy Collector
                </h2>

                <div className="mb-8">
                    <button
                        onClick={handleClick}
                        className="group relative inline-flex items-center justify-center p-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                        <div className="relative text-4xl">⚡</div>
                    </button>
                </div>

                <div className="text-lg text-blue-200">
                    Click Power:{' '}
                    <span className="text-cyan-400 font-bold">+{clickPower}</span> energy
                    per click
                </div>

                <div className="mt-4 text-sm text-gray-300">
                    Click the quantum collector to harvest energy from the void
                </div>
            </div>
        </div>
    );
};

export default MainClicker;

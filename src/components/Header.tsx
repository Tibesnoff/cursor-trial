import { useAppSelector } from '../store/hooks';

const Header = () => {
    const { quantumEnergy, quantumCrystals, researchData, defensePoints } = useAppSelector(state => ({
        quantumEnergy: state.game.resources.quantumEnergy,
        quantumCrystals: state.game.resources.quantumCrystals,
        researchData: state.game.resources.researchData,
        defensePoints: state.game.resources.defensePoints,
    }));

    return (
        <header className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
                Quantum Clicker
            </h1>
            <p className="text-xl text-blue-200 mb-4">
                Harvest quantum energy and build your cosmic empire
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 border border-cyan-500/30">
                    <div className="text-cyan-400 font-mono text-lg">⚡ {quantumEnergy.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">Quantum Energy</div>
                </div>
                <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 border border-purple-500/30">
                    <div className="text-purple-400 font-mono text-lg">💎 {quantumCrystals.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">Quantum Crystals</div>
                </div>
                <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 border border-green-500/30">
                    <div className="text-green-400 font-mono text-lg">🧪 {researchData.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">Research Data</div>
                </div>
                <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 border border-red-500/30">
                    <div className="text-red-400 font-mono text-lg">🛡️ {defensePoints.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">Defense</div>
                </div>
            </div>
        </header>
    );
};

export default Header;

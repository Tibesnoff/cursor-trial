import { useAppSelector } from '../store/hooks';

const Header = () => {
    const quantumEnergy = useAppSelector(
        state => state.game.resources.quantumEnergy
    );

    return (
        <header className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
                Quantum Clicker
            </h1>
            <p className="text-xl text-blue-200 mb-4">
                Harvest quantum energy and build your cosmic empire
            </p>
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-blue-500/30">
                <div className="text-2xl font-mono text-cyan-400">
                    ⚡ {quantumEnergy.toLocaleString()} Quantum Energy
                </div>
            </div>
        </header>
    );
};

export default Header;

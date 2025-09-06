import { ResourceDisplay } from 'src/components/common';
import { useGameActions } from 'src/hooks';

const Header = () => {
    const actions = useGameActions();

    const handleDevMode = () => {
        // Give max resources
        actions.giveMaxResources();
        // Unlock all tabs
        actions.unlockAllTabs();
    };

    return (
        <header className="text-center mb-8 relative">
            {/* Development Button */}
            <button
                onClick={handleDevMode}
                className="absolute top-0 right-0 bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded-lg font-bold transition-colors"
                title="Development Mode: Max Resources + Unlock All Tabs"
            >
                DEV
            </button>

            <div className="mb-6">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Quantum Clicker
                </h1>
                <p className="text-lg text-gray-300 font-medium">
                    Harvest quantum energy and build your cosmic empire
                </p>
            </div>
            <div className="max-w-4xl mx-auto">
                <ResourceDisplay />
            </div>
        </header>
    );
};

export default Header;

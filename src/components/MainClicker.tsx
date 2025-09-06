import { useGameActions } from 'src/hooks';
import { Button } from 'src/components/ui';

const MainClicker = () => {
    const { click } = useGameActions();

    return (
        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-8 border border-blue-500/30 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">⚡ Quantum Collector</h2>
            <p className="text-gray-300 mb-6">
                Click to harvest quantum energy from the cosmic void
            </p>
            <Button
                onClick={click}
                variant="primary"
                size="lg"
                className="text-4xl p-8 rounded-full hover:scale-105 transition-transform"
            >
                ⚡ Collect Energy
            </Button>
        </div>
    );
};

export default MainClicker;
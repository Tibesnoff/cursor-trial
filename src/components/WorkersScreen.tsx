import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    hireEngineer,
    hireScientist,
    hireTechnician,
    hireOperator,
    hireResearcher,
    hireArchitect,
} from '../store/slices/gameSlice';

interface Worker {
    id: string;
    name: string;
    description: string;
    emoji: string;
    baseCost: number;
    costMultiplier: number;
    count: number;
    action: () => void;
    effect: string;
    bonus: string;
}

const WorkersScreen = () => {
    const dispatch = useAppDispatch();
    const { quantumEnergy, workers } = useAppSelector(state => ({
        quantumEnergy: state.game.resources.quantumEnergy,
        workers: state.game.workers,
    }));

    const getWorkerCost = (baseCost: number, multiplier: number, count: number) => {
        return Math.floor(baseCost * Math.pow(multiplier, count));
    };

    const canAfford = (cost: number) => quantumEnergy >= cost;

    const workersList: Worker[] = [
        {
            id: 'engineers',
            name: 'Quantum Engineers',
            description: 'Design and maintain quantum energy systems',
            emoji: '🔧',
            baseCost: 25,
            costMultiplier: 1.2,
            count: workers.engineers,
            action: () => dispatch(hireEngineer()),
            effect: '+10% building efficiency per engineer',
            bonus: 'Required for advanced constructions',
        },
        {
            id: 'technicians',
            name: 'Field Technicians',
            description: 'Operate and maintain energy collection equipment',
            emoji: '⚙️',
            baseCost: 50,
            costMultiplier: 1.22,
            count: workers.technicians,
            action: () => dispatch(hireTechnician()),
            effect: '+5% overall efficiency per technician',
            bonus: 'Improves all building performance',
        },
        {
            id: 'scientists',
            name: 'Quantum Scientists',
            description: 'Research new energy generation methods',
            emoji: '🧪',
            baseCost: 100,
            costMultiplier: 1.25,
            count: workers.scientists,
            action: () => dispatch(hireScientist()),
            effect: 'Unlocks advanced building technologies',
            bonus: 'Required for cosmic-level constructions',
        },
        {
            id: 'operators',
            name: 'System Operators',
            description: 'Monitor and optimize energy production systems',
            emoji: '🎛️',
            baseCost: 200,
            costMultiplier: 1.3,
            count: workers.operators,
            action: () => dispatch(hireOperator()),
            effect: '+15% energy production per operator',
            bonus: 'Significant production multiplier',
        },
        {
            id: 'researchers',
            name: 'Theoretical Researchers',
            description: 'Push the boundaries of quantum energy science',
            emoji: '🔬',
            baseCost: 500,
            costMultiplier: 1.35,
            count: workers.researchers,
            action: () => dispatch(hireResearcher()),
            effect: '+20% energy production per researcher',
            bonus: 'Highest production multiplier',
        },
        {
            id: 'architects',
            name: 'Cosmic Architects',
            description: 'Design massive stellar-scale energy systems',
            emoji: '🏗️',
            baseCost: 1000,
            costMultiplier: 1.4,
            count: workers.architects,
            action: () => dispatch(hireArchitect()),
            effect: 'Required for stellar and void constructions',
            bonus: 'Enables reality-bending technologies',
        },
    ];

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">👥 Personnel Management</h2>
                <p className="text-blue-200">Hire specialists to optimize your quantum operations</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {workersList.map(worker => {
                    const cost = getWorkerCost(worker.baseCost, worker.costMultiplier, worker.count);
                    const affordable = canAfford(cost);

                    return (
                        <div key={worker.id} className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
                            <div className="flex items-center space-x-4 mb-4">
                                <span className="text-4xl">{worker.emoji}</span>
                                <div>
                                    <h3 className="text-xl font-bold text-white">{worker.name}</h3>
                                    <p className="text-gray-300">Current: {worker.count}</p>
                                </div>
                            </div>

                            <p className="text-gray-400 mb-4">{worker.description}</p>

                            <div className="mb-4 p-3 bg-gray-800/50 rounded-lg">
                                <div className="text-sm text-cyan-400 mb-1">Effect:</div>
                                <div className="text-sm text-white">{worker.effect}</div>
                                <div className="text-sm text-yellow-400 mt-1">{worker.bonus}</div>
                            </div>

                            <button
                                onClick={worker.action}
                                disabled={!affordable}
                                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${affordable
                                        ? 'bg-blue-600 hover:bg-blue-500 text-white'
                                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                {affordable
                                    ? `Hire (${cost.toLocaleString()} ⚡)`
                                    : `Insufficient Energy (${cost.toLocaleString()} ⚡)`}
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Worker Summary */}
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/30">
                <h3 className="text-xl font-bold text-white mb-4">👥 Personnel Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {workersList.map(worker => (
                        <div key={worker.id} className="text-center">
                            <div className="text-2xl mb-1">{worker.emoji}</div>
                            <div className="text-sm text-gray-300">{worker.name}</div>
                            <div className="text-lg text-cyan-400 font-mono">{worker.count}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WorkersScreen;

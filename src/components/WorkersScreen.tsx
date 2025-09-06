import { useGameState, useGameActions } from 'src/hooks';
import { WORKER_TYPES } from 'src/constants';
import { Button, Card } from 'src/components/ui';

const WorkersScreen = () => {
    const { workers, resources } = useGameState();
    const {
        hireEngineer,
        hireScientist,
        hireTechnician,
        hireOperator,
        hireResearcher,
        hireArchitect
    } = useGameActions();

    const workerCosts = {
        engineers: 100,
        scientists: 150,
        technicians: 75,
        operators: 200,
        researchers: 300,
        architects: 500,
    };

    const canAfford = (cost: number) => resources.quantumEnergy >= cost;

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">👥 Personnel Management</h2>
                <p className="text-blue-200">Hire specialists to boost your empire's efficiency</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {WORKER_TYPES.map(worker => {
                    const cost = workerCosts[worker.key as keyof typeof workerCosts];
                    const affordable = canAfford(cost);
                    const count = workers[worker.key];

                    return (
                        <Card key={worker.key} variant="bordered" className="hover:bg-gray-700/50 transition-all">
                            <div className="text-center">
                                <div className="text-4xl mb-3">{worker.emoji}</div>
                                <h3 className="text-xl font-bold text-white mb-2">{worker.name}</h3>
                                <p className="text-sm text-gray-300 mb-4">
                                    Current: {count} workers
                                </p>
                                <Button
                                    onClick={() => {
                                        switch (worker.key) {
                                            case 'engineers': hireEngineer(); break;
                                            case 'scientists': hireScientist(); break;
                                            case 'technicians': hireTechnician(); break;
                                            case 'operators': hireOperator(); break;
                                            case 'researchers': hireResearcher(); break;
                                            case 'architects': hireArchitect(); break;
                                        }
                                    }}
                                    disabled={!affordable}
                                    variant={affordable ? 'success' : 'secondary'}
                                    size="md"
                                    className="w-full"
                                >
                                    {affordable
                                        ? `Hire (${cost.toLocaleString()} ⚡)`
                                        : `Need ${cost.toLocaleString()} ⚡`}
                                </Button>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default WorkersScreen;
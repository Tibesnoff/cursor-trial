import { useGameState } from 'src/hooks';
import { Card } from 'src/components/ui';

const StatisticsPanel = () => {
    const { statistics, buildings } = useGameState();

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours}h ${minutes}m ${secs}s`;
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">📊 Statistics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Game Statistics */}
                <Card variant="bordered" padding="md">
                    <h3 className="text-lg font-semibold text-white mb-4">Game Statistics</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-300">Total Clicks:</span>
                            <span className="text-cyan-400 font-mono">{statistics.totalClicks.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">Total Energy Earned:</span>
                            <span className="text-cyan-400 font-mono">{statistics.totalEnergyEarned.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">Play Time:</span>
                            <span className="text-cyan-400 font-mono">{formatTime(statistics.playTime)}</span>
                        </div>
                    </div>
                </Card>

                {/* Building Counts */}
                <Card variant="bordered" padding="md">
                    <h3 className="text-lg font-semibold text-white mb-4">Buildings</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-300">Basic Collectors:</span>
                            <span className="text-cyan-400">{buildings.basicCollectors}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">Quantum Reactors:</span>
                            <span className="text-cyan-400">{buildings.quantumReactors}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">Stellar Forges:</span>
                            <span className="text-cyan-400">{buildings.stellarForges}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">Void Extractors:</span>
                            <span className="text-cyan-400">{buildings.voidExtractors}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">Crystal Mines:</span>
                            <span className="text-cyan-400">{buildings.crystalMines}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">Research Labs:</span>
                            <span className="text-cyan-400">{buildings.researchLabs}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">Defense Systems:</span>
                            <span className="text-cyan-400">{buildings.defenseSystems}</span>
                        </div>
                    </div>
                </Card>

            </div>
        </div>
    );
};

export default StatisticsPanel;
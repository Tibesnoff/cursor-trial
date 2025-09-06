import { useGameState } from 'src/hooks';
import { Card } from 'src/components/ui';

const StatisticsPanel = () => {
    const { statistics, energyCollectors, crystalCollectors, facilities } = useGameState();

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

                {/* Collector Counts */}
                <Card variant="bordered" padding="md">
                    <h3 className="text-lg font-semibold text-white mb-4">Collectors</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-300">Energy Collectors:</span>
                            <span className="text-cyan-400">{energyCollectors.basicCollectors + energyCollectors.quantumReactors + energyCollectors.stellarForges + energyCollectors.voidExtractors}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">Crystal Collectors:</span>
                            <span className="text-purple-400">{crystalCollectors.basicMines + crystalCollectors.quantumDrills + crystalCollectors.stellarExtractors + crystalCollectors.voidHarvesters}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">Total Facilities:</span>
                            <span className="text-green-400">{Object.values(facilities).reduce((sum, count) => sum + count, 0)}</span>
                        </div>
                    </div>
                </Card>

            </div>
        </div>
    );
};

export default StatisticsPanel;
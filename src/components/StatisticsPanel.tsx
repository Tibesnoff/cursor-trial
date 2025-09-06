import { useAppSelector } from '../store/hooks';

const StatisticsPanel = () => {
    const { totalClicks, totalEnergyEarned, playTime, basicCollectors } =
        useAppSelector(state => ({
            totalClicks: state.game.statistics.totalClicks,
            totalEnergyEarned: state.game.statistics.totalEnergyEarned,
            playTime: state.game.statistics.playTime,
            basicCollectors: state.game.buildings.basicCollectors,
        }));

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (hours > 0) {
            return `${hours}h ${minutes}m ${secs}s`;
        } else if (minutes > 0) {
            return `${minutes}m ${secs}s`;
        } else {
            return `${secs}s`;
        }
    };

    const energyPerSecond = basicCollectors;

    return (
        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/30">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                📊 Statistics
            </h3>

            <div className="space-y-3">
                <div className="flex justify-between">
                    <span className="text-gray-300">Total Clicks:</span>
                    <span className="text-cyan-400 font-mono">
                        {totalClicks.toLocaleString()}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-300">Energy Earned:</span>
                    <span className="text-cyan-400 font-mono">
                        {totalEnergyEarned.toLocaleString()}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-300">Play Time:</span>
                    <span className="text-cyan-400 font-mono">
                        {formatTime(playTime)}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-300">Energy/sec:</span>
                    <span className="text-cyan-400 font-mono">{energyPerSecond}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-300">Collectors:</span>
                    <span className="text-cyan-400 font-mono">{basicCollectors}</span>
                </div>
            </div>
        </div>
    );
};

export default StatisticsPanel;

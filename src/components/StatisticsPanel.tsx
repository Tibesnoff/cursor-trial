import { useAppSelector } from '../store/hooks';

const StatisticsPanel = () => {
    const { totalClicks, totalEnergyEarned, playTime, buildings, workers } =
        useAppSelector(state => ({
            totalClicks: state.game.statistics.totalClicks,
            totalEnergyEarned: state.game.statistics.totalEnergyEarned,
            playTime: state.game.statistics.playTime,
            buildings: state.game.buildings,
            workers: state.game.workers,
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

    // Calculate base production
    const baseProduction =
        buildings.basicCollectors * 1 +
        buildings.quantumReactors * 5 +
        buildings.energyHarvesters * 20 +
        buildings.cosmicGenerators * 100 +
        buildings.stellarForges * 500 +
        buildings.voidExtractors * 2500;

    // Calculate worker bonuses
    const engineerBonus = 1 + workers.engineers * 0.1;
    const technicianBonus = 1 + workers.technicians * 0.05;
    const operatorBonus = 1 + workers.operators * 0.15;
    const researcherBonus = 1 + workers.researchers * 0.2;
    const totalBonus = engineerBonus * technicianBonus * operatorBonus * researcherBonus;

    const energyPerSecond = Math.floor(baseProduction * totalBonus);

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
                    <span className="text-gray-300">Basic Collectors:</span>
                    <span className="text-cyan-400 font-mono">{buildings.basicCollectors}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-300">Quantum Reactors:</span>
                    <span className="text-cyan-400 font-mono">{buildings.quantumReactors}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-300">Energy Harvesters:</span>
                    <span className="text-cyan-400 font-mono">{buildings.energyHarvesters}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-300">Cosmic Generators:</span>
                    <span className="text-cyan-400 font-mono">{buildings.cosmicGenerators}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-300">Stellar Forges:</span>
                    <span className="text-cyan-400 font-mono">{buildings.stellarForges}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-300">Void Extractors:</span>
                    <span className="text-cyan-400 font-mono">{buildings.voidExtractors}</span>
                </div>

                <div className="border-t border-gray-600 my-3"></div>

                <div className="flex justify-between">
                    <span className="text-gray-300">Engineers:</span>
                    <span className="text-cyan-400 font-mono">{workers.engineers}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-300">Technicians:</span>
                    <span className="text-cyan-400 font-mono">{workers.technicians}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-300">Scientists:</span>
                    <span className="text-cyan-400 font-mono">{workers.scientists}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-300">Operators:</span>
                    <span className="text-cyan-400 font-mono">{workers.operators}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-300">Researchers:</span>
                    <span className="text-cyan-400 font-mono">{workers.researchers}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-300">Architects:</span>
                    <span className="text-cyan-400 font-mono">{workers.architects}</span>
                </div>

                <div className="border-t border-gray-600 my-3"></div>

                <div className="flex justify-between">
                    <span className="text-gray-300">Base Production:</span>
                    <span className="text-cyan-400 font-mono">{baseProduction}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-300">Worker Bonus:</span>
                    <span className="text-cyan-400 font-mono">{totalBonus.toFixed(2)}x</span>
                </div>
            </div>
        </div>
    );
};

export default StatisticsPanel;

import { useGameState } from 'src/hooks';

const AnalyticsTab = () => {
    const { statistics, resources, energyCollectors, crystalCollectors, research, defense } = useGameState();

    const totalCollectors = Object.values(energyCollectors).reduce((sum, count) => sum + count, 0) +
        Object.values(crystalCollectors).reduce((sum, count) => sum + count, 0);

    const totalFacilities = Object.values(research).reduce((sum, count) => sum + count, 0) +
        Object.values(defense).reduce((sum, count) => sum + count, 0);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="text-2xl mr-2">📊</span>
                    Game Statistics
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Resource Stats */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-700">Resources</h4>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total Energy Earned:</span>
                                <span className="font-medium">{statistics.totalEnergyEarned.toLocaleString()} ⚡</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total Crystals Earned:</span>
                                <span className="font-medium">{statistics.totalCrystalsEarned.toLocaleString()} 💎</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Current Energy:</span>
                                <span className="font-medium">{resources.quantumEnergy.toLocaleString()} ⚡</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Current Crystals:</span>
                                <span className="font-medium">{resources.quantumCrystals.toLocaleString()} 💎</span>
                            </div>
                        </div>
                    </div>

                    {/* Building Stats */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-700">Buildings</h4>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total Collectors:</span>
                                <span className="font-medium">{totalCollectors}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total Facilities:</span>
                                <span className="font-medium">{totalFacilities}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total Clicks:</span>
                                <span className="font-medium">{statistics.totalClicks.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Play Time:</span>
                                <span className="font-medium">{Math.floor(statistics.playTime / 60)} minutes</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsTab;

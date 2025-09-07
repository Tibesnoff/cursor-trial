import { useGameState } from 'src/hooks';

const AchievementsTab = () => {
    const { achievements, statistics } = useGameState();

    // Define achievement definitions
    const achievementDefinitions = [
        {
            id: 'first_click',
            name: 'First Click',
            description: 'Click for the first time',
            emoji: '👆',
            condition: (stats: { totalClicks: number }) => stats.totalClicks >= 1,
            unlocked: achievements.includes('first_click'),
        },
        {
            id: 'hundred_clicks',
            name: 'Click Master',
            description: 'Click 100 times',
            emoji: '🎯',
            condition: (stats: { totalClicks: number }) => stats.totalClicks >= 100,
            unlocked: achievements.includes('hundred_clicks'),
        },
        {
            id: 'thousand_clicks',
            name: 'Click Legend',
            description: 'Click 1,000 times',
            emoji: '👑',
            condition: (stats: { totalClicks: number }) => stats.totalClicks >= 1000,
            unlocked: achievements.includes('thousand_clicks'),
        },
        {
            id: 'first_collector',
            name: 'Builder',
            description: 'Build your first collector',
            emoji: '🏗️',
            condition: (stats: { totalEnergyEarned: number }) => stats.totalEnergyEarned >= 15, // Cost of first collector
            unlocked: achievements.includes('first_collector'),
        },
        {
            id: 'energy_millionaire',
            name: 'Energy Millionaire',
            description: 'Earn 1,000,000 energy',
            emoji: '💰',
            condition: (stats: { totalEnergyEarned: number }) => stats.totalEnergyEarned >= 1000000,
            unlocked: achievements.includes('energy_millionaire'),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="text-2xl mr-2">🏆</span>
                    Achievements
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievementDefinitions.map((achievement) => {
                        const isUnlocked = achievement.unlocked || achievement.condition(statistics);

                        return (
                            <div
                                key={achievement.id}
                                className={`rounded-lg p-4 border-2 transition-all duration-200 ${isUnlocked
                                    ? 'bg-yellow-50 border-yellow-200'
                                    : 'bg-gray-50 border-gray-200 opacity-60'
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <span className={`text-3xl ${isUnlocked ? '' : 'grayscale'}`}>
                                        {achievement.emoji}
                                    </span>
                                    <div className="flex-1">
                                        <h4 className={`font-semibold ${isUnlocked ? 'text-yellow-800' : 'text-gray-600'}`}>
                                            {achievement.name}
                                        </h4>
                                        <p className={`text-sm ${isUnlocked ? 'text-yellow-700' : 'text-gray-500'}`}>
                                            {achievement.description}
                                        </p>
                                        {isUnlocked && (
                                            <div className="text-xs text-yellow-600 font-medium mt-1">
                                                ✓ Unlocked
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AchievementsTab;

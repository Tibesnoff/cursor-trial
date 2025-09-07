import { useState } from 'react';
import { useGameActions } from 'src/hooks';
import { CRYSTAL_UPGRADES, UPGRADE_CATEGORIES } from 'src/config/upgrades';
import UpgradeCard from '../../collectors/UpgradeCard';

const CrystalMineUpgrades = () => {
    const { buyUpgrade } = useGameActions();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const handleBuyUpgrade = async (upgradeId: string) => {
        try {
            console.log('Attempting to buy upgrade:', upgradeId);
            await buyUpgrade(upgradeId);
            console.log('Upgrade purchased successfully:', upgradeId);
        } catch (error) {
            console.error('Failed to buy upgrade:', error);
            alert(`Failed to buy upgrade: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    const filteredUpgrades = selectedCategory === 'all'
        ? CRYSTAL_UPGRADES
        : CRYSTAL_UPGRADES.filter(upgrade => upgrade.category === selectedCategory);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">💎 Crystal Upgrades</h2>
                <p className="text-gray-300 text-lg">Enhance your crystal mining capabilities</p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
                <button
                    className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${selectedCategory === 'all'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    onClick={() => setSelectedCategory('all')}
                >
                    All Upgrades
                </button>
                {Object.entries(UPGRADE_CATEGORIES).map(([key, category]) => (
                    <button
                        key={key}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${selectedCategory === key
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                        onClick={() => setSelectedCategory(key)}
                    >
                        {category.emoji} {category.name}
                    </button>
                ))}
            </div>

            {/* Upgrades Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUpgrades.map((upgrade) => (
                    <UpgradeCard
                        key={upgrade.id}
                        upgrade={upgrade}
                        onBuy={handleBuyUpgrade}
                    />
                ))}
            </div>

            {/* Category Description */}
            {selectedCategory !== 'all' && (
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
                    <h3 className="text-lg font-semibold text-white mb-2">
                        {UPGRADE_CATEGORIES[selectedCategory as keyof typeof UPGRADE_CATEGORIES]?.emoji}{' '}
                        {UPGRADE_CATEGORIES[selectedCategory as keyof typeof UPGRADE_CATEGORIES]?.name}
                    </h3>
                    <p className="text-gray-300">
                        {UPGRADE_CATEGORIES[selectedCategory as keyof typeof UPGRADE_CATEGORIES]?.description}
                    </p>
                </div>
            )}
        </div>
    );
};

export default CrystalMineUpgrades;
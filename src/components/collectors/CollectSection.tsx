import React from 'react';
import { Button } from 'src/components/ui';
import type { BuildingCost } from 'src/types';

interface CollectSectionProps {
    resourceEmoji: string;
    resourceName: string;
    clickUpgradeCost: BuildingCost;
    clickPowerIncrease: number;
    canAfford: (cost: BuildingCost) => boolean;
    formatCost: (cost: BuildingCost) => string;
    onCollect: () => void;
    onUpgradeClick: () => void;
}

const CollectSection: React.FC<CollectSectionProps> = ({
    resourceEmoji,
    resourceName,
    clickUpgradeCost,
    clickPowerIncrease,
    canAfford,
    formatCost,
    onCollect,
    onUpgradeClick,
}) => {
    return (
        <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
            <h3 className="text-xl font-bold text-white mb-4 text-center">🎯 Active Collection</h3>

            {/* Main Collect Button */}
            <div className="text-center mb-4">
                <Button
                    onClick={onCollect}
                    variant="primary"
                    size="lg"
                    className="text-3xl p-6 rounded-full hover:scale-105 transition-transform w-full shadow-lg"
                >
                    {resourceEmoji} Collect {resourceName}
                </Button>
            </div>

            {/* Click Upgrade Button */}
            <div className="bg-black/30 rounded-lg p-4 text-center">
                <Button
                    onClick={onUpgradeClick}
                    variant="primary"
                    size="sm"
                    className="w-full"
                    disabled={!clickUpgradeCost || !canAfford(clickUpgradeCost)}
                >
                    ⬆️ +{clickPowerIncrease} Click ({formatCost(clickUpgradeCost || {})})
                </Button>
            </div>
        </div>
    );
};

export default CollectSection;

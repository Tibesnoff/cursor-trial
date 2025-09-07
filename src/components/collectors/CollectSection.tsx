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
    // Autoclicker props
    autoClickerLevel?: number;
    autoClickerSpeed?: number;
    autoClickerEfficiency?: number;
    autoClickerUpgradeCost?: BuildingCost;
    onAutoClickerUpgrade?: () => void;
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
    // Autoclicker props
    autoClickerLevel = 0,
    autoClickerSpeed = 0,
    autoClickerEfficiency = 1,
    autoClickerUpgradeCost,
    onAutoClickerUpgrade,
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

            {/* Auto Clicker Section */}
            {autoClickerLevel > 0 && (
                <div className="bg-black/30 rounded-lg p-4 text-center">
                    <h4 className="text-lg font-bold text-white mb-2">🤖 Auto Clicker</h4>
                    <div className="text-sm text-gray-300 mb-2">
                        <div>Level: {autoClickerLevel}</div>
                        <div>Speed: {autoClickerSpeed.toFixed(2)} clicks/sec</div>
                        <div>Efficiency: +{Math.round((autoClickerEfficiency - 1) * 100)}%</div>
                    </div>
                    {onAutoClickerUpgrade && autoClickerUpgradeCost && (
                        <Button
                            onClick={onAutoClickerUpgrade}
                            variant="secondary"
                            size="sm"
                            className="w-full"
                            disabled={!canAfford(autoClickerUpgradeCost)}
                        >
                            ⬆️ Upgrade Auto Clicker ({formatCost(autoClickerUpgradeCost)})
                        </Button>
                    )}
                </div>
            )}

            {/* Auto Clicker Purchase Button (if not owned) */}
            {autoClickerLevel === 0 && onAutoClickerUpgrade && autoClickerUpgradeCost && (
                <div className="bg-black/30 rounded-lg p-4 text-center">
                    <h4 className="text-lg font-bold text-white mb-2">🤖 Auto Clicker</h4>
                    <p className="text-sm text-gray-300 mb-3">
                        Automatically clicks for you (faster with higher levels)
                    </p>
                    <Button
                        onClick={onAutoClickerUpgrade}
                        variant="secondary"
                        size="sm"
                        className="w-full"
                        disabled={!canAfford(autoClickerUpgradeCost)}
                    >
                        🤖 Buy Auto Clicker ({formatCost(autoClickerUpgradeCost)})
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CollectSection;

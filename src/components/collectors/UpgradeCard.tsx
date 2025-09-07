import React from 'react';
import type { UpgradeConfig, BuildingCost } from '../../types';
import { calculateUpgradeCost, canAffordUpgrade, checkPrerequisites, isMaxLevel, getCurrentUpgradeLevel } from '../../store/actions/upgradeActions';
import { ALL_UPGRADES } from '../../config/upgrades';
import type { RootState } from '../../store';
import { useAppSelector } from '../../store/hooks';
import { calculateClickPowerIncrease } from '../../utils/upgradeCalculations';

interface UpgradeCardProps {
    upgrade: UpgradeConfig;
    onBuy: (upgradeId: string) => void;
}

const UpgradeCard: React.FC<UpgradeCardProps> = ({ upgrade, onBuy }) => {
    const state = useAppSelector((rootState: RootState) => rootState);

    const currentLevel = getCurrentUpgradeLevel(state, upgrade.id);
    const cost = calculateUpgradeCost(upgrade.id, currentLevel, state);
    const canAfford = canAffordUpgrade(state, upgrade.id, currentLevel);
    const prerequisitesMet = checkPrerequisites(state, upgrade.id);
    const atMaxLevel = isMaxLevel(state, upgrade.id);

    // Debug logging (only for first upgrade)
    if (upgrade.id === 'energy_click_boost') {
        console.log(`UpgradeCard ${upgrade.id}:`, {
            currentLevel,
            cost,
            canAfford,
            prerequisitesMet,
            atMaxLevel,
            resources: state.game.resources
        });
    }

    const canBuy = canAfford && prerequisitesMet && !atMaxLevel;

    const formatCost = (cost: BuildingCost): string => {
        const parts = [];
        if (cost.quantumEnergy) parts.push(`${cost.quantumEnergy.toLocaleString()} ⚡`);
        if (cost.quantumCrystals) parts.push(`${cost.quantumCrystals.toLocaleString()} 💎`);
        if (cost.researchData) parts.push(`${cost.researchData.toLocaleString()} 🧪`);
        if (cost.defensePoints) parts.push(`${cost.defensePoints.toLocaleString()} 🛡️`);
        return parts.join(' + ');
    };

    const getEffectDescription = (): string => {
        const { effect } = upgrade;
        const levelBonus = currentLevel * effect.value;

        // For click power upgrades, show the actual click power increase with modifiers
        if (effect.target === 'click_power') {
            const collectorType = upgrade.collectorType === 'both' ? 'energy' : upgrade.collectorType;
            const actualIncrease = calculateClickPowerIncrease(state.game, upgrade.id, collectorType as 'energy' | 'crystal');

            switch (effect.type) {
                case 'additive':
                    return `+${actualIncrease} per click (Base: +${effect.value})`;
                case 'multiplier':
                    return `+${actualIncrease} per click (${effect.value}x multiplier)`;
                default:
                    return `+${actualIncrease} per click`;
            }
        }

        // For other upgrade types, use the original logic
        switch (effect.type) {
            case 'additive':
                return `+${effect.value} per level (Current: +${levelBonus})`;
            case 'multiplier':
                return `${effect.value}x per level (Current: ${Math.pow(effect.value, currentLevel).toFixed(1)}x)`;
            case 'percentage':
                return `+${effect.value}% per level (Current: +${levelBonus}%)`;
            case 'special':
                return 'Special effect';
            default:
                return 'Unknown effect';
        }
    };

    const getCategoryColor = (): string => {
        switch (upgrade.category) {
            case 'click_power':
                return 'border-yellow-500 bg-yellow-500/10';
            case 'efficiency':
                return 'border-green-500 bg-green-500/10';
            case 'cost_reduction':
                return 'border-blue-500 bg-blue-500/10';
            case 'special':
                return 'border-purple-500 bg-purple-500/10';
            default:
                return 'border-gray-500 bg-gray-500/10';
        }
    };

    return (
        <div className={`rounded-lg border-2 p-4 transition-all duration-200 ${getCategoryColor()} ${canBuy ? 'hover:shadow-lg hover:scale-105' : 'opacity-60'
            } flex flex-col h-full`}>
            {/* Header with Category Badge */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3 flex-1">
                    <span className="text-2xl">{upgrade.emoji}</span>
                    <div className="flex-1">
                        <h3 className="font-bold text-white text-lg">{upgrade.name}</h3>
                        <p className="text-sm text-gray-300">
                            Level {currentLevel}/{upgrade.maxLevel}
                        </p>
                    </div>
                </div>

                {/* Category Badge - Fixed position */}
                <span className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300 ml-2 flex-shrink-0">
                    {upgrade.category.replace('_', ' ').toUpperCase()}
                </span>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm mb-3 flex-shrink-0">{upgrade.description}</p>

            {/* Effect */}
            <div className="mb-3 flex-shrink-0">
                <p className="text-sm text-gray-400">
                    <span className="font-medium">Effect:</span> {getEffectDescription()}
                </p>
            </div>

            {/* Cost */}
            <div className="mb-3 flex-shrink-0">
                <p className="text-sm text-gray-400">
                    <span className="font-medium">Cost:</span> {formatCost(cost)}
                </p>
            </div>

            {/* Prerequisites */}
            {upgrade.prerequisites && upgrade.prerequisites.length > 0 && (
                <div className="mb-3 flex-shrink-0">
                    <p className="text-sm text-gray-400 mb-1">
                        <span className="font-medium">Prerequisites:</span>
                    </p>
                    <div className="text-xs text-gray-500">
                        {upgrade.prerequisites.map((prereqId, index) => {
                            const prereqUpgrade = ALL_UPGRADES.find(u => u.id === prereqId);
                            const prereqMet = prereqUpgrade ?
                                (prereqUpgrade.collectorType === 'energy' ?
                                    (state.game.upgrades.energyUpgrades[prereqId] || 0) >= 1 :
                                    prereqUpgrade.collectorType === 'crystal' ?
                                        (state.game.upgrades.crystalUpgrades[prereqId] || 0) >= 1 :
                                        (state.game.upgrades.universalUpgrades[prereqId] || 0) >= 1
                                ) : false;

                            return (
                                <div key={prereqId} className="flex items-center space-x-1">
                                    <span className={prereqMet ? 'text-green-400' : 'text-red-400'}>
                                        {prereqMet ? '✓' : '✗'}
                                    </span>
                                    <span className={prereqMet ? 'text-green-300' : 'text-red-300'}>
                                        {prereqUpgrade?.name || prereqId}
                                    </span>
                                    {index < upgrade.prerequisites!.length - 1 && <span className="text-gray-500">,</span>}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Spacer to push button to bottom */}
            <div className="flex-1"></div>

            {/* Upgrade Button - Fixed at bottom */}
            <button
                className={`w-full px-4 py-2 rounded-lg font-medium transition-colors duration-200 mt-3 ${canBuy
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                onClick={() => {
                    console.log('UpgradeCard button clicked for:', upgrade.id);
                    console.log('canBuy:', canBuy);
                    onBuy(upgrade.id);
                }}
                disabled={!canBuy}
            >
                {atMaxLevel ? 'MAX LEVEL' : `UPGRADE (${formatCost(cost)})`}
            </button>
        </div>
    );
};

export default UpgradeCard;

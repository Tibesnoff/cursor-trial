import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import type { BuildingCost } from '../../types';
import { ALL_UPGRADES } from '../../config/upgrades';
import { incrementUpgrade, deductCost } from '../slices/gameSlice';
import { calculateCostReduction } from '../../utils/upgradeCalculations';

// Helper function to calculate upgrade cost
const calculateUpgradeCost = (
  upgradeId: string,
  currentLevel: number,
  state?: RootState
): BuildingCost => {
  const upgrade = ALL_UPGRADES.find(u => u.id === upgradeId);
  if (!upgrade) return {};

  const multiplier = Math.pow(upgrade.costMultiplier, currentLevel);
  const costReduction = state ? calculateCostReduction(state.game) : 0;

  const cost: BuildingCost = {};

  Object.entries(upgrade.baseCost).forEach(([resource, amount]) => {
    if (amount) {
      const baseCost = Math.floor(amount * multiplier);
      const reducedCost = Math.floor(baseCost * (1 - costReduction));
      cost[resource as keyof BuildingCost] = reducedCost;
    }
  });

  return cost;
};

// Helper function to check if upgrade can be afforded
const canAffordUpgrade = (
  state: RootState,
  upgradeId: string,
  currentLevel: number
): boolean => {
  const cost = calculateUpgradeCost(upgradeId, currentLevel, state);
  return Object.entries(cost).every(([resource, amount]) => {
    if (!amount) return true;
    return (
      (state.game.resources[resource as keyof typeof state.game.resources] ||
        0) >= amount
    );
  });
};

// Helper function to check prerequisites
const checkPrerequisites = (state: RootState, upgradeId: string): boolean => {
  const upgrade = ALL_UPGRADES.find(u => u.id === upgradeId);
  if (!upgrade || !upgrade.prerequisites) return true;

  return upgrade.prerequisites.every(prereqId => {
    const prereqUpgrade = ALL_UPGRADES.find(u => u.id === prereqId);
    if (!prereqUpgrade) return false;

    // Check if prerequisite is at level 1 or higher
    if (prereqUpgrade.collectorType === 'energy') {
      return (state.game.upgrades.energyUpgrades[prereqId] || 0) >= 1;
    } else if (prereqUpgrade.collectorType === 'crystal') {
      return (state.game.upgrades.crystalUpgrades[prereqId] || 0) >= 1;
    } else if (prereqUpgrade.collectorType === 'both') {
      return (state.game.upgrades.universalUpgrades[prereqId] || 0) >= 1;
    }
    return false;
  });
};

// Helper function to check max level
const isMaxLevel = (state: RootState, upgradeId: string): boolean => {
  const upgrade = ALL_UPGRADES.find(u => u.id === upgradeId);
  if (!upgrade) return true;

  // -1 means unlimited upgrades
  if (upgrade.maxLevel === -1) return false;

  const currentLevel = getCurrentUpgradeLevel(state, upgradeId);
  return currentLevel >= upgrade.maxLevel;
};

// Helper function to get current upgrade level
const getCurrentUpgradeLevel = (
  state: RootState,
  upgradeId: string
): number => {
  const upgrade = ALL_UPGRADES.find(u => u.id === upgradeId);
  if (!upgrade) return 0;

  if (upgrade.collectorType === 'energy') {
    return state.game.upgrades.energyUpgrades[upgradeId] || 0;
  } else if (upgrade.collectorType === 'crystal') {
    return state.game.upgrades.crystalUpgrades[upgradeId] || 0;
  } else if (upgrade.collectorType === 'both') {
    return state.game.upgrades.universalUpgrades[upgradeId] || 0;
  }
  return 0;
};

// Action to buy an upgrade
export const buyUpgrade = createAsyncThunk(
  'upgrades/buyUpgrade',
  async (upgradeId: string, { getState, dispatch }) => {
    const state = getState() as RootState;

    // Check if upgrade exists
    const upgrade = ALL_UPGRADES.find(u => u.id === upgradeId);
    if (!upgrade) {
      throw new Error(`Upgrade ${upgradeId} not found`);
    }

    const currentLevel = getCurrentUpgradeLevel(state, upgradeId);

    // Check if already at max level
    if (isMaxLevel(state, upgradeId)) {
      throw new Error(`Upgrade ${upgradeId} is already at maximum level`);
    }

    // Check prerequisites
    if (!checkPrerequisites(state, upgradeId)) {
      throw new Error(`Prerequisites not met for upgrade ${upgradeId}`);
    }

    // Check if can afford
    if (!canAffordUpgrade(state, upgradeId, currentLevel)) {
      throw new Error(`Cannot afford upgrade ${upgradeId}`);
    }

    // Deduct cost and increment upgrade
    const cost = calculateUpgradeCost(upgradeId, currentLevel, state);
    dispatch(deductCost({ cost }));
    dispatch(incrementUpgrade(upgradeId));

    return { upgradeId, newLevel: currentLevel + 1 };
  }
);

// Note: incrementUpgrade and deductCost are imported from gameSlice

// Action to get upgrade cost
export const getUpgradeCost = createAction<{
  upgradeId: string;
  cost: BuildingCost;
}>('upgrades/getUpgradeCost');

// Action to check if upgrade can be bought
export const canBuyUpgrade = createAction<{
  upgradeId: string;
  canBuy: boolean;
}>('upgrades/canBuyUpgrade');

// Legacy upgrade actions (kept for compatibility)
export const upgradeClickPower = createAction<BuildingCost>(
  'upgrades/upgradeClickPower'
);
export const upgradeCrystalClickPower = createAction<BuildingCost>(
  'upgrades/upgradeCrystalClickPower'
);

// Export helper functions for use in components
export {
  calculateUpgradeCost,
  canAffordUpgrade,
  checkPrerequisites,
  isMaxLevel,
  getCurrentUpgradeLevel,
};

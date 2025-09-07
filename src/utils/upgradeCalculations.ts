import { ALL_UPGRADES } from '../config/upgrades';
import type { GameState } from '../types';

/**
 * Calculate total click power from energy upgrades
 */
export const calculateEnergyClickPower = (state: GameState): number => {
  let totalClickPower = 1; // Base click power

  // Debug logging
  console.log('Calculating energy click power:', {
    energyUpgrades: state.upgrades.energyUpgrades,
    universalUpgrades: state.upgrades.universalUpgrades,
  });

  // Add click power from energy upgrades
  Object.entries(state.upgrades.energyUpgrades).forEach(
    ([upgradeId, level]) => {
      const upgrade = ALL_UPGRADES.find(u => u.id === upgradeId);
      if (upgrade && upgrade.effect.target === 'click_power') {
        if (upgrade.effect.type === 'additive') {
          totalClickPower += upgrade.effect.value * level;
        } else if (upgrade.effect.type === 'multiplier') {
          totalClickPower *= Math.pow(upgrade.effect.value, level);
        }
      }
    }
  );

  // Add click power from universal upgrades
  Object.entries(state.upgrades.universalUpgrades).forEach(
    ([upgradeId, level]) => {
      const upgrade = ALL_UPGRADES.find(u => u.id === upgradeId);
      if (upgrade && upgrade.effect.target === 'click_power') {
        if (upgrade.effect.type === 'additive') {
          totalClickPower += upgrade.effect.value * level;
        } else if (upgrade.effect.type === 'multiplier') {
          totalClickPower *= Math.pow(upgrade.effect.value, level);
        }
      }
    }
  );

  return Math.floor(totalClickPower);
};

/**
 * Calculate total click power from crystal upgrades
 */
export const calculateCrystalClickPower = (state: GameState): number => {
  let totalClickPower = 1; // Base click power

  // Add click power from crystal upgrades
  Object.entries(state.upgrades.crystalUpgrades).forEach(
    ([upgradeId, level]) => {
      const upgrade = ALL_UPGRADES.find(u => u.id === upgradeId);
      if (upgrade && upgrade.effect.target === 'click_power') {
        if (upgrade.effect.type === 'additive') {
          totalClickPower += upgrade.effect.value * level;
        } else if (upgrade.effect.type === 'multiplier') {
          totalClickPower *= Math.pow(upgrade.effect.value, level);
        }
      }
    }
  );

  // Add click power from universal upgrades
  Object.entries(state.upgrades.universalUpgrades).forEach(
    ([upgradeId, level]) => {
      const upgrade = ALL_UPGRADES.find(u => u.id === upgradeId);
      if (upgrade && upgrade.effect.target === 'click_power') {
        if (upgrade.effect.type === 'additive') {
          totalClickPower += upgrade.effect.value * level;
        } else if (upgrade.effect.type === 'multiplier') {
          totalClickPower *= Math.pow(upgrade.effect.value, level);
        }
      }
    }
  );

  return Math.floor(totalClickPower);
};

/**
 * Calculate collector efficiency multiplier from upgrades
 */
export const calculateCollectorEfficiency = (
  state: GameState,
  collectorType: 'energy' | 'crystal'
): number => {
  let efficiency = 1; // Base efficiency

  const upgradeMap =
    collectorType === 'energy'
      ? state.upgrades.energyUpgrades
      : state.upgrades.crystalUpgrades;

  // Add efficiency from specific collector type upgrades
  Object.entries(upgradeMap).forEach(([upgradeId, level]) => {
    const upgrade = ALL_UPGRADES.find(u => u.id === upgradeId);
    if (upgrade && upgrade.effect.target === 'collector_efficiency') {
      if (upgrade.effect.type === 'percentage') {
        efficiency += (upgrade.effect.value / 100) * level;
      }
    }
  });

  // Add efficiency from universal upgrades
  Object.entries(state.upgrades.universalUpgrades).forEach(
    ([upgradeId, level]) => {
      const upgrade = ALL_UPGRADES.find(u => u.id === upgradeId);
      if (upgrade && upgrade.effect.target === 'collector_efficiency') {
        if (upgrade.effect.type === 'percentage') {
          efficiency += (upgrade.effect.value / 100) * level;
        }
      }
    }
  );

  return efficiency;
};

/**
 * Calculate cost reduction from upgrades
 */
export const calculateCostReduction = (state: GameState): number => {
  let costReduction = 0; // Base cost reduction

  // Add cost reduction from all upgrade types
  const allUpgrades = [
    ...Object.entries(state.upgrades.energyUpgrades),
    ...Object.entries(state.upgrades.crystalUpgrades),
    ...Object.entries(state.upgrades.universalUpgrades),
  ];

  allUpgrades.forEach(([upgradeId, level]) => {
    const upgrade = ALL_UPGRADES.find(u => u.id === upgradeId);
    if (upgrade && upgrade.effect.target === 'cost_reduction') {
      if (upgrade.effect.type === 'percentage') {
        costReduction += (upgrade.effect.value / 100) * level;
      }
    }
  });

  return Math.min(costReduction, 0.95); // Cap at 95% reduction
};

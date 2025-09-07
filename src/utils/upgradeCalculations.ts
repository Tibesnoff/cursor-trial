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

/**
 * Calculate the click power increase from the next upgrade
 */
export const calculateClickPowerIncrease = (
  state: GameState,
  upgradeId: string,
  collectorType: 'energy' | 'crystal'
): number => {
  const upgrade = ALL_UPGRADES.find(u => u.id === upgradeId);
  if (!upgrade || upgrade.effect.target !== 'click_power') return 0;

  const currentLevel = getCurrentUpgradeLevel(
    { game: state } as any,
    upgradeId
  );

  if (upgrade.effect.type === 'additive') {
    // For additive upgrades, calculate the actual increase with all modifiers
    const currentClickPower =
      collectorType === 'energy'
        ? calculateEnergyClickPower(state)
        : calculateCrystalClickPower(state);

    // Create a temporary state with the next level of this upgrade
    const tempState = {
      ...state,
      upgrades: {
        ...state.upgrades,
        energyUpgrades: { ...state.upgrades.energyUpgrades },
        crystalUpgrades: { ...state.upgrades.crystalUpgrades },
        universalUpgrades: { ...state.upgrades.universalUpgrades },
      },
    };

    if (upgrade.collectorType === 'energy') {
      tempState.upgrades.energyUpgrades[upgradeId] = currentLevel + 1;
    } else if (upgrade.collectorType === 'crystal') {
      tempState.upgrades.crystalUpgrades[upgradeId] = currentLevel + 1;
    } else if (upgrade.collectorType === 'both') {
      tempState.upgrades.universalUpgrades[upgradeId] = currentLevel + 1;
    }

    // Calculate the new click power with the upgrade
    const newClickPower =
      collectorType === 'energy'
        ? calculateEnergyClickPower(tempState)
        : calculateCrystalClickPower(tempState);

    return Math.floor(newClickPower - currentClickPower);
  } else if (upgrade.effect.type === 'multiplier') {
    // For multiplier upgrades, calculate the increase in total click power
    const currentClickPower =
      collectorType === 'energy'
        ? calculateEnergyClickPower(state)
        : calculateCrystalClickPower(state);

    // Calculate what the click power would be with one more level
    const newMultiplier = Math.pow(upgrade.effect.value, currentLevel + 1);
    const oldMultiplier = Math.pow(upgrade.effect.value, currentLevel);

    // Calculate the base click power (without this multiplier)
    const baseClickPower = currentClickPower / oldMultiplier;

    // Calculate the new click power
    const newClickPower = baseClickPower * newMultiplier;

    return Math.floor(newClickPower - currentClickPower);
  }

  return 0;
};

// Helper function to get current upgrade level (duplicated from upgradeActions for this file)
const getCurrentUpgradeLevel = (state: any, upgradeId: string): number => {
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

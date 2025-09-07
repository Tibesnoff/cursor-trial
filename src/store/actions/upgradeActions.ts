import type { GameState } from 'src/types';

export const upgradeClickPower = (state: GameState) => {
  // Tiered scaling similar to collectors: 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 100, 150, 200, 250, 300, 1000, 1500, 2000, 2500, 3000, 10000...
  let cost: number;
  const level = state.upgrades.clickPower;

  if (level < 20) {
    // Tier 1: 5-100 (linear +5)
    cost = 5 + level * 5;
  } else if (level < 40) {
    // Tier 2: 100-2000 (linear +100)
    cost = 100 + (level - 20) * 100;
  } else if (level < 60) {
    // Tier 3: 2000-4000 (linear +100)
    cost = 2000 + (level - 40) * 100;
  } else if (level < 80) {
    // Tier 4: 4000-6000 (linear +100)
    cost = 4000 + (level - 60) * 100;
  } else {
    // Tier 5+: 6000+ (exponential 1.1x)
    cost = Math.floor(6000 * Math.pow(1.1, level - 80));
  }

  // Apply cost reduction from research
  const finalCost = Math.floor(cost * (1 - state.upgrades.clickCostReduction));

  if (state.resources.quantumEnergy >= finalCost) {
    state.resources.quantumEnergy -= finalCost;
    // Each upgrade adds more click power: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 25, 30, 35, 40, 45, 50...
    const clickPowerIncrease = Math.max(
      1,
      Math.floor(state.upgrades.clickPower / 10) + 1
    );
    state.upgrades.clickPower += clickPowerIncrease;
  }
};

export const upgradeCollectorEfficiency = (state: GameState) => {
  const cost = Math.floor(
    50000 * Math.pow(2, state.upgrades.collectorEfficiency - 1)
  );
  if (state.resources.quantumEnergy >= cost) {
    state.resources.quantumEnergy -= cost;
    state.upgrades.collectorEfficiency += 1;
  }
};

export const upgradeCrystalClickPower = (state: GameState) => {
  // Tiered scaling for crystals: 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 50, 80, 110, 140, 170, 500, 800, 1100, 1400, 1700, 5000...
  let cost: number;
  const level = state.upgrades.crystalClickPower;

  if (level < 20) {
    // Tier 1: 3-60 (linear +3)
    cost = 3 + level * 3;
  } else if (level < 40) {
    // Tier 2: 60-1200 (linear +60)
    cost = 60 + (level - 20) * 60;
  } else if (level < 60) {
    // Tier 3: 1200-2400 (linear +60)
    cost = 1200 + (level - 40) * 60;
  } else if (level < 80) {
    // Tier 4: 2400-3600 (linear +60)
    cost = 2400 + (level - 60) * 60;
  } else {
    // Tier 5+: 3600+ (exponential 1.1x)
    cost = Math.floor(3600 * Math.pow(1.1, level - 80));
  }

  // Apply cost reduction from research
  const finalCost = Math.floor(cost * (1 - state.upgrades.clickCostReduction));

  if (state.resources.quantumCrystals >= finalCost) {
    state.resources.quantumCrystals -= finalCost;
    // Each upgrade adds more click power: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 25, 30, 35, 40, 45, 50...
    const clickPowerIncrease = Math.max(
      1,
      Math.floor(state.upgrades.crystalClickPower / 10) + 1
    );
    state.upgrades.crystalClickPower += clickPowerIncrease;
  }
};

export const upgradeCrystalEfficiency = (state: GameState) => {
  const cost = Math.floor(
    10000 * Math.pow(1.5, state.upgrades.crystalEfficiency - 1)
  );
  if (state.resources.quantumCrystals >= cost) {
    state.resources.quantumCrystals -= cost;
    state.upgrades.crystalEfficiency += 1;
  }
};

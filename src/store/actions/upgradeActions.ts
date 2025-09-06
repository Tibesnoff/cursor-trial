import type { GameState } from 'src/types';

export const upgradeClickPower = (state: GameState) => {
  const cost = Math.floor(10 * Math.pow(1.5, state.upgrades.clickPower - 1));
  if (state.resources.quantumEnergy >= cost) {
    state.resources.quantumEnergy -= cost;
    // Each upgrade adds more click power: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 25, 30, 35, 40, 45, 50...
    const clickPowerIncrease = Math.max(1, Math.floor(state.upgrades.clickPower / 10) + 1);
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
  const cost = Math.floor(
    5 * Math.pow(1.5, state.upgrades.crystalClickPower - 1)
  );
  if (state.resources.quantumCrystals >= cost) {
    state.resources.quantumCrystals -= cost;
    // Each upgrade adds more click power: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 25, 30, 35, 40, 45, 50...
    const clickPowerIncrease = Math.max(1, Math.floor(state.upgrades.crystalClickPower / 10) + 1);
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

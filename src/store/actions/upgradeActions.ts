import type { GameState } from 'src/types';

export const upgradeClickPower = (state: GameState) => {
  const cost = Math.floor(10000 * Math.pow(2, state.upgrades.clickPower - 1));
  if (state.resources.quantumEnergy >= cost) {
    state.resources.quantumEnergy -= cost;
    state.upgrades.clickPower += 1;
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
    5000 * Math.pow(1.5, state.upgrades.crystalClickPower - 1)
  );
  if (state.resources.quantumCrystals >= cost) {
    state.resources.quantumCrystals -= cost;
    state.upgrades.crystalClickPower += 1;
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

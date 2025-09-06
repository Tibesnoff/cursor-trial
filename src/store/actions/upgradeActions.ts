import type { GameState } from 'src/types';

export const upgradeClickPower = (state: GameState) => {
  const cost = Math.floor(100 * Math.pow(2, state.upgrades.clickPower - 1));
  if (state.resources.quantumEnergy >= cost) {
    state.resources.quantumEnergy -= cost;
    state.upgrades.clickPower += 1;
  }
};

export const upgradeCollectorEfficiency = (state: GameState) => {
  const cost = Math.floor(
    500 * Math.pow(2, state.upgrades.collectorEfficiency - 1)
  );
  if (state.resources.quantumEnergy >= cost) {
    state.resources.quantumEnergy -= cost;
    state.upgrades.collectorEfficiency += 1;
  }
};

import type { GameState } from '../../types';

// Helper functions for cost checking and deduction
const canAffordCost = (state: GameState, cost: any): boolean => {
  return Object.entries(cost).every(([resource, amount]) => {
    if (!amount) return true;
    return (
      (state.resources[resource as keyof typeof state.resources] || 0) >=
      (amount as number)
    );
  });
};

const deductCost = (state: GameState, cost: any) => {
  Object.entries(cost).forEach(([resource, amount]) => {
    if (amount) {
      state.resources[resource as keyof typeof state.resources] -=
        amount as number;
    }
  });
};

// Energy Collector Actions
export const buyBasicCollector = (state: GameState) => {
  const cost = { quantumEnergy: 1000 };
  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.energyCollectors.basicCollectors += 1;
  }
};

export const buyQuantumReactor = (state: GameState) => {
  const cost = { quantumEnergy: 10000, quantumCrystals: 500 };
  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.energyCollectors.quantumReactors += 1;
  }
};

export const buyStellarForge = (state: GameState) => {
  const cost = { quantumEnergy: 100000, quantumCrystals: 5000 };
  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.energyCollectors.stellarForges += 1;
  }
};

export const buyVoidExtractor = (state: GameState) => {
  const cost = { quantumEnergy: 1000000, quantumCrystals: 50000 };
  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.energyCollectors.voidExtractors += 1;
  }
};

// Crystal Collector Actions
export const buyBasicMine = (state: GameState) => {
  const cost = { quantumEnergy: 5000 };
  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.crystalCollectors.basicMines += 1;
  }
};

export const buyQuantumDrill = (state: GameState) => {
  const cost = { quantumEnergy: 50000, quantumCrystals: 2500 };
  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.crystalCollectors.quantumDrills += 1;
  }
};

export const buyStellarExtractor = (state: GameState) => {
  const cost = { quantumEnergy: 500000, quantumCrystals: 25000 };
  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.crystalCollectors.stellarExtractors += 1;
  }
};

export const buyVoidHarvester = (state: GameState) => {
  const cost = { quantumEnergy: 5000000, quantumCrystals: 250000 };
  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.crystalCollectors.voidHarvesters += 1;
  }
};

import type { GameState, BuildingCost } from '../../types';
import { ENERGY_COLLECTORS, CRYSTAL_COLLECTORS } from '../../config';

// Helper functions for cost checking and deduction
const canAffordCost = (
  state: GameState,
  cost: Record<string, number | undefined>
): boolean => {
  return Object.entries(cost).every(([resource, amount]) => {
    if (!amount) return true;
    return (
      (state.resources[resource as keyof typeof state.resources] || 0) >=
      (amount as number)
    );
  });
};

const deductCost = (
  state: GameState,
  cost: Record<string, number | undefined>
) => {
  Object.entries(cost).forEach(([resource, amount]) => {
    if (amount) {
      state.resources[resource as keyof typeof state.resources] -=
        amount as number;
    }
  });
};

// Helper function to calculate actual cost based on current count
const calculateActualCost = (
  collector: { costMultiplier: number; baseCost: BuildingCost },
  currentCount: number
) => {
  const multiplier = Math.pow(collector.costMultiplier, currentCount);
  const actualCost: Record<string, number> = {};
  Object.entries(collector.baseCost).forEach(([resource, amount]) => {
    if (amount && typeof amount === 'number') {
      actualCost[resource] = Math.floor(amount * multiplier);
    }
  });
  return actualCost;
};

// Energy Collector Actions
export const buyBasicCollector = (state: GameState) => {
  const collector = ENERGY_COLLECTORS.find(c => c.id === 'basicCollectors')!;
  const currentCount = state.energyCollectors.basicCollectors;
  const cost = calculateActualCost(collector, currentCount);
  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.energyCollectors.basicCollectors += 1;
  }
};

export const buyQuantumReactor = (state: GameState) => {
  const collector = ENERGY_COLLECTORS.find(c => c.id === 'quantumReactors')!;
  const currentCount = state.energyCollectors.quantumReactors;
  const cost = calculateActualCost(collector, currentCount);
  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.energyCollectors.quantumReactors += 1;
  }
};

export const buyStellarForge = (state: GameState) => {
  const collector = ENERGY_COLLECTORS.find(c => c.id === 'stellarForges')!;
  const currentCount = state.energyCollectors.stellarForges;
  const cost = calculateActualCost(collector, currentCount);
  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.energyCollectors.stellarForges += 1;
  }
};

export const buyVoidExtractor = (state: GameState) => {
  const collector = ENERGY_COLLECTORS.find(c => c.id === 'voidExtractors')!;
  const currentCount = state.energyCollectors.voidExtractors;
  const cost = calculateActualCost(collector, currentCount);
  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.energyCollectors.voidExtractors += 1;
  }
};

export const buyDimensionalRift = (state: GameState) => {
  const collector = ENERGY_COLLECTORS.find(c => c.id === 'dimensionalRifts')!;
  const currentCount = state.energyCollectors.dimensionalRifts;
  const cost = calculateActualCost(collector, currentCount);
  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.energyCollectors.dimensionalRifts += 1;
  }
};

export const buyCosmicGenerator = (state: GameState) => {
  const collector = ENERGY_COLLECTORS.find(c => c.id === 'cosmicGenerators')!;
  const currentCount = state.energyCollectors.cosmicGenerators;
  const cost = calculateActualCost(collector, currentCount);
  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.energyCollectors.cosmicGenerators += 1;
  }
};

// Crystal Collector Actions
export const buyBasicMine = (state: GameState) => {
  const collector = CRYSTAL_COLLECTORS.find(c => c.id === 'basicMines')!;
  const currentCount = state.crystalCollectors.basicMines;
  const cost = calculateActualCost(collector, currentCount);
  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.crystalCollectors.basicMines += 1;
  }
};

export const buyQuantumDrill = (state: GameState) => {
  const collector = CRYSTAL_COLLECTORS.find(c => c.id === 'quantumDrills')!;
  const currentCount = state.crystalCollectors.quantumDrills;
  const cost = calculateActualCost(collector, currentCount);
  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.crystalCollectors.quantumDrills += 1;
  }
};

export const buyStellarExtractor = (state: GameState) => {
  const collector = CRYSTAL_COLLECTORS.find(c => c.id === 'stellarExtractors')!;
  const currentCount = state.crystalCollectors.stellarExtractors;
  const cost = calculateActualCost(collector, currentCount);
  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.crystalCollectors.stellarExtractors += 1;
  }
};

export const buyVoidHarvester = (state: GameState) => {
  const collector = CRYSTAL_COLLECTORS.find(c => c.id === 'voidHarvesters')!;
  const currentCount = state.crystalCollectors.voidHarvesters;
  const cost = calculateActualCost(collector, currentCount);
  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.crystalCollectors.voidHarvesters += 1;
  }
};

export const buyDimensionalMine = (state: GameState) => {
  const collector = CRYSTAL_COLLECTORS.find(c => c.id === 'dimensionalMines')!;
  const currentCount = state.crystalCollectors.dimensionalMines;
  const cost = calculateActualCost(collector, currentCount);
  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.crystalCollectors.dimensionalMines += 1;
  }
};

export const buyCosmicRefinery = (state: GameState) => {
  const collector = CRYSTAL_COLLECTORS.find(c => c.id === 'cosmicRefineries')!;
  const currentCount = state.crystalCollectors.cosmicRefineries;
  const cost = calculateActualCost(collector, currentCount);
  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.crystalCollectors.cosmicRefineries += 1;
  }
};

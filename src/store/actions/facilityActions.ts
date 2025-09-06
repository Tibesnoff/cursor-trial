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

// Material facilities removed - crystal production now handled by Crystal Mine tab

// Research Facility Actions
export const buyResearchLab = (state: GameState) => {
  const cost = { quantumEnergy: 500, quantumCrystals: 25 };
  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.facilities.researchLabs += 1;
  }
};

export const buyDataCenter = (state: GameState) => {
  const cost = { quantumEnergy: 2500, quantumCrystals: 125, researchData: 50 };
  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.facilities.dataCenters += 1;
  }
};

export const buyQuantumComputer = (state: GameState) => {
  const cost = {
    quantumEnergy: 12500,
    quantumCrystals: 625,
    researchData: 250,
  };
  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.facilities.quantumComputers += 1;
  }
};

export const buyNeuralNetwork = (state: GameState) => {
  const cost = {
    quantumEnergy: 50000,
    quantumCrystals: 2500,
    researchData: 1000,
  };
  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.facilities.neuralNetworks += 1;
  }
};

// Defense Facility Actions
export const buyPowerGrid = (state: GameState) => {
  const cost = { quantumEnergy: 200, quantumCrystals: 10 };
  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.facilities.powerGrids += 1;
  }
};

export const buyTransportHub = (state: GameState) => {
  const cost = { quantumEnergy: 1000, quantumCrystals: 50, researchData: 25 };
  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.facilities.transportHubs += 1;
  }
};

export const buyDefenseSystem = (state: GameState) => {
  const cost = { quantumEnergy: 5000, quantumCrystals: 250, researchData: 125 };
  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.facilities.defenseSystems += 1;
  }
};

export const buyCommunicationArray = (state: GameState) => {
  const cost = {
    quantumEnergy: 20000,
    quantumCrystals: 1000,
    researchData: 500,
  };
  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.facilities.communicationArrays += 1;
  }
};

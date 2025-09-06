import type { GameState } from 'src/types';

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

export const buyPowerGrid = (state: GameState) => {
  const currentCount = state.defense.powerGrids;
  const cost = {
    quantumEnergy: Math.floor(20000 * Math.pow(1.2, currentCount)),
    quantumCrystals: Math.floor(1000 * Math.pow(1.2, currentCount)),
  };

  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.defense.powerGrids += 1;
  }
};

export const buyTransportHub = (state: GameState) => {
  const currentCount = state.defense.transportHubs;
  const cost = {
    quantumEnergy: Math.floor(100000 * Math.pow(1.3, currentCount)),
    quantumCrystals: Math.floor(5000 * Math.pow(1.3, currentCount)),
    researchData: Math.floor(2500 * Math.pow(1.3, currentCount)),
  };

  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.defense.transportHubs += 1;
  }
};

export const buyDefenseSystem = (state: GameState) => {
  const currentCount = state.defense.defenseSystems;
  const cost = {
    quantumEnergy: Math.floor(500000 * Math.pow(1.4, currentCount)),
    quantumCrystals: Math.floor(25000 * Math.pow(1.4, currentCount)),
    researchData: Math.floor(12500 * Math.pow(1.4, currentCount)),
  };

  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.defense.defenseSystems += 1;
  }
};

export const buyCommunicationArray = (state: GameState) => {
  const currentCount = state.defense.communicationArrays;
  const cost = {
    quantumEnergy: Math.floor(2000000 * Math.pow(1.5, currentCount)),
    quantumCrystals: Math.floor(100000 * Math.pow(1.5, currentCount)),
    researchData: Math.floor(50000 * Math.pow(1.5, currentCount)),
  };

  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.defense.communicationArrays += 1;
  }
};

export const unlockDefenseUpgrade = (
  _state: GameState,
  action: { payload: string }
) => {
  const upgradeId = action.payload;

  // For now, just track unlocked upgrades (we'll implement proper cost checking later)
  // This will be used when we implement the defense upgrade system
  console.log(`Unlocked defense upgrade: ${upgradeId}`);
};

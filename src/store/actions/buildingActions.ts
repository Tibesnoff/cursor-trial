import type { GameState, BuildingCost } from 'src/types';

// Helper function to check if player can afford multi-resource cost
export const canAffordCost = (
  cost: BuildingCost,
  resources: GameState['resources']
): boolean => {
  return Object.entries(cost).every(([resource, amount]) => {
    if (!amount) return true;
    return (resources[resource as keyof typeof resources] || 0) >= amount;
  });
};

// Helper function to deduct multi-resource cost
export const deductCost = (
  cost: BuildingCost,
  resources: GameState['resources']
): void => {
  Object.entries(cost).forEach(([resource, amount]) => {
    if (amount) {
      resources[resource as keyof typeof resources] -= amount;
    }
  });
};

// Generic building purchase function
export const createBuildingPurchaseAction = (
  buildingId: keyof GameState['buildings'],
  baseCost: BuildingCost,
  costMultiplier: number
) => {
  return (state: GameState) => {
    const cost: BuildingCost = {};
    Object.entries(baseCost).forEach(([resource, amount]) => {
      if (amount) {
        cost[resource as keyof BuildingCost] = Math.floor(
          amount * Math.pow(costMultiplier, state.buildings[buildingId])
        );
      }
    });

    if (canAffordCost(cost, state.resources)) {
      deductCost(cost, state.resources);
      state.buildings[buildingId] += 1;
    }
  };
};

// Energy Buildings
export const buyBasicCollector = createBuildingPurchaseAction(
  'basicCollectors',
  { quantumEnergy: 10 },
  1.15
);

export const buyQuantumReactor = createBuildingPurchaseAction(
  'quantumReactors',
  { quantumEnergy: 50, quantumCrystals: 5 },
  1.2
);

export const buyStellarForge = createBuildingPurchaseAction(
  'stellarForges',
  { quantumEnergy: 5000, quantumCrystals: 50 },
  1.35
);

export const buyVoidExtractor = createBuildingPurchaseAction(
  'voidExtractors',
  { quantumEnergy: 25000, quantumCrystals: 250 },
  1.4
);

// Material Buildings
export const buyCrystalMine = createBuildingPurchaseAction(
  'crystalMines',
  { quantumEnergy: 100 },
  1.2
);

export const buyQuantumRefinery = createBuildingPurchaseAction(
  'quantumRefineries',
  { quantumEnergy: 500, quantumCrystals: 20 },
  1.25
);

export const buyMatterSynthesizer = createBuildingPurchaseAction(
  'matterSynthesizers',
  { quantumEnergy: 2000, quantumCrystals: 100 },
  1.3
);

export const buyDimensionalExtractor = createBuildingPurchaseAction(
  'dimensionalExtractors',
  { quantumEnergy: 10000, quantumCrystals: 500 },
  1.35
);

// Research Buildings
export const buyResearchLab = createBuildingPurchaseAction(
  'researchLabs',
  { quantumEnergy: 300, quantumCrystals: 10 },
  1.2
);

export const buyDataCenter = createBuildingPurchaseAction(
  'dataCenters',
  { quantumEnergy: 1500, quantumCrystals: 50 },
  1.25
);

export const buyQuantumComputer = createBuildingPurchaseAction(
  'quantumComputers',
  { quantumEnergy: 7500, quantumCrystals: 300 },
  1.3
);

export const buyNeuralNetwork = createBuildingPurchaseAction(
  'neuralNetworks',
  { quantumEnergy: 30000, quantumCrystals: 1200 },
  1.35
);

// Defense Buildings
export const buyPowerGrid = createBuildingPurchaseAction(
  'powerGrids',
  { quantumEnergy: 200, quantumCrystals: 5 },
  1.2
);

export const buyTransportHub = createBuildingPurchaseAction(
  'transportHubs',
  { quantumEnergy: 1000, quantumCrystals: 25, researchData: 10 },
  1.25
);

export const buyDefenseSystem = createBuildingPurchaseAction(
  'defenseSystems',
  { quantumEnergy: 5000, quantumCrystals: 100, researchData: 50 },
  1.3
);

export const buyCommunicationArray = createBuildingPurchaseAction(
  'communicationArrays',
  { quantumEnergy: 20000, quantumCrystals: 500, researchData: 200 },
  1.35
);

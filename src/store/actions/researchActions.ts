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

export const buyResearchLab = (state: GameState) => {
  const currentCount = state.research.researchLabs;
  const cost = {
    quantumEnergy: Math.floor(500 * Math.pow(1.3, currentCount)),
    quantumCrystals: Math.floor(25 * Math.pow(1.3, currentCount)),
  };

  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.research.researchLabs += 1;
  }
};

export const buyDataCenter = (state: GameState) => {
  const currentCount = state.research.dataCenters;
  const cost = {
    quantumEnergy: Math.floor(2500 * Math.pow(1.4, currentCount)),
    quantumCrystals: Math.floor(125 * Math.pow(1.4, currentCount)),
    researchData: Math.floor(50 * Math.pow(1.4, currentCount)),
  };

  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.research.dataCenters += 1;
  }
};

export const buyQuantumComputer = (state: GameState) => {
  const currentCount = state.research.quantumComputers;
  const cost = {
    quantumEnergy: Math.floor(12500 * Math.pow(1.5, currentCount)),
    quantumCrystals: Math.floor(625 * Math.pow(1.5, currentCount)),
    researchData: Math.floor(250 * Math.pow(1.5, currentCount)),
  };

  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.research.quantumComputers += 1;
  }
};

export const buyNeuralNetwork = (state: GameState) => {
  const currentCount = state.research.neuralNetworks;
  const cost = {
    quantumEnergy: Math.floor(50000 * Math.pow(1.6, currentCount)),
    quantumCrystals: Math.floor(2500 * Math.pow(1.6, currentCount)),
    researchData: Math.floor(1000 * Math.pow(1.6, currentCount)),
  };

  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.research.neuralNetworks += 1;
  }
};

export const unlockResearchNode = (
  state: GameState,
  action: { payload: string }
) => {
  const nodeId = action.payload;

  // Check if node is already unlocked or completed
  if (
    state.researchTree.unlocked.includes(nodeId) ||
    state.researchTree.completed.includes(nodeId)
  ) {
    return;
  }

  // Find the research node to get its cost
  const researchNodes = [
    { id: 'basic_research', cost: { researchData: 0 } },
    { id: 'quantum_theory', cost: { researchData: 100 } },
    { id: 'energy_efficiency', cost: { researchData: 250, quantumEnergy: 50 } },
    {
      id: 'stellar_harvesting',
      cost: { researchData: 1000, quantumEnergy: 500, quantumCrystals: 25 },
    },
    {
      id: 'void_manipulation',
      cost: { researchData: 5000, quantumEnergy: 2500, quantumCrystals: 125 },
    },
    {
      id: 'crystal_refinement',
      cost: { researchData: 300, quantumCrystals: 30 },
    },
    {
      id: 'dimensional_mining',
      cost: { researchData: 1500, quantumEnergy: 750, quantumCrystals: 50 },
    },
    {
      id: 'quantum_crystallography',
      cost: { researchData: 7500, quantumEnergy: 3750, quantumCrystals: 250 },
    },
    { id: 'defense_systems', cost: { researchData: 400, defensePoints: 20 } },
    {
      id: 'shield_technology',
      cost: { researchData: 2000, quantumEnergy: 1000, defensePoints: 100 },
    },
    {
      id: 'weapon_systems',
      cost: {
        researchData: 10000,
        quantumEnergy: 5000,
        quantumCrystals: 500,
        defensePoints: 500,
      },
    },
    {
      id: 'ship_design',
      cost: { researchData: 5000, quantumEnergy: 2500, quantumCrystals: 250 },
    },
    {
      id: 'combat_systems',
      cost: {
        researchData: 15000,
        quantumEnergy: 7500,
        quantumCrystals: 750,
        defensePoints: 1000,
      },
    },
    {
      id: 'fleet_command',
      cost: {
        researchData: 50000,
        quantumEnergy: 25000,
        quantumCrystals: 2500,
        defensePoints: 5000,
      },
    },
  ];

  const node = researchNodes.find(n => n.id === nodeId);
  if (!node) return;

  // Check if we can afford the cost
  const canAfford = canAffordCost(state, node.cost);

  if (canAfford) {
    // Deduct the cost
    deductCost(state, node.cost);

    // Add to unlocked
    state.researchTree.unlocked.push(nodeId);
  }
};

export const completeResearchNode = (
  state: GameState,
  action: { payload: string }
) => {
  const nodeId = action.payload;

  // Check if node is unlocked but not completed
  if (
    state.researchTree.unlocked.includes(nodeId) &&
    !state.researchTree.completed.includes(nodeId)
  ) {
    state.researchTree.completed.push(nodeId);
    // Remove from unlocked list
    state.researchTree.unlocked = state.researchTree.unlocked.filter(
      id => id !== nodeId
    );
  }
};

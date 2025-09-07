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
    quantumEnergy: Math.floor(50000 * Math.pow(1.3, currentCount)),
    quantumCrystals: Math.floor(2500 * Math.pow(1.3, currentCount)),
  };

  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.research.researchLabs += 1;
  }
};

export const buyDataCenter = (state: GameState) => {
  const currentCount = state.research.dataCenters;
  const cost = {
    quantumEnergy: Math.floor(250000 * Math.pow(1.4, currentCount)),
    quantumCrystals: Math.floor(12500 * Math.pow(1.4, currentCount)),
    researchData: Math.floor(5000 * Math.pow(1.4, currentCount)),
  };

  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.research.dataCenters += 1;
  }
};

export const buyQuantumComputer = (state: GameState) => {
  const currentCount = state.research.quantumComputers;
  const cost = {
    quantumEnergy: Math.floor(1250000 * Math.pow(1.5, currentCount)),
    quantumCrystals: Math.floor(62500 * Math.pow(1.5, currentCount)),
    researchData: Math.floor(25000 * Math.pow(1.5, currentCount)),
  };

  if (canAffordCost(state, cost)) {
    deductCost(state, cost);
    state.research.quantumComputers += 1;
  }
};

export const buyNeuralNetwork = (state: GameState) => {
  const currentCount = state.research.neuralNetworks;
  const cost = {
    quantumEnergy: Math.floor(5000000 * Math.pow(1.6, currentCount)),
    quantumCrystals: Math.floor(250000 * Math.pow(1.6, currentCount)),
    researchData: Math.floor(100000 * Math.pow(1.6, currentCount)),
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
    {
      id: 'click_amplification',
      cost: { researchData: 150, quantumEnergy: 25 },
    },
    {
      id: 'quantum_clicking',
      cost: { researchData: 500, quantumEnergy: 100, quantumCrystals: 10 },
    },
    { id: 'energy_efficiency', cost: { researchData: 250, quantumEnergy: 50 } },
    {
      id: 'stellar_harvesting',
      cost: {
        researchData: 100000,
        quantumEnergy: 50000,
        quantumCrystals: 2500,
      },
    },
    {
      id: 'void_manipulation',
      cost: { researchData: 5000, quantumEnergy: 2500, quantumCrystals: 125 },
    },
    {
      id: 'click_efficiency',
      cost: { researchData: 2000, quantumEnergy: 1000, quantumCrystals: 50 },
    },
    {
      id: 'multi_click',
      cost: { researchData: 8000, quantumEnergy: 4000, quantumCrystals: 200 },
    },
    {
      id: 'crystal_refinement',
      cost: { researchData: 30000, quantumCrystals: 3000 },
    },
    {
      id: 'dimensional_mining',
      cost: {
        researchData: 150000,
        quantumEnergy: 75000,
        quantumCrystals: 5000,
      },
    },
    {
      id: 'quantum_crystallography',
      cost: {
        researchData: 750000,
        quantumEnergy: 375000,
        quantumCrystals: 25000,
      },
    },
    {
      id: 'defense_systems',
      cost: { researchData: 40000, defensePoints: 2000 },
    },
    {
      id: 'shield_technology',
      cost: {
        researchData: 200000,
        quantumEnergy: 100000,
        defensePoints: 10000,
      },
    },
    {
      id: 'weapon_systems',
      cost: {
        researchData: 1000000,
        quantumEnergy: 500000,
        quantumCrystals: 50000,
        defensePoints: 50000,
      },
    },
    {
      id: 'ship_design',
      cost: {
        researchData: 500000,
        quantumEnergy: 250000,
        quantumCrystals: 25000,
      },
    },
    {
      id: 'combat_systems',
      cost: {
        researchData: 1500000,
        quantumEnergy: 750000,
        quantumCrystals: 75000,
        defensePoints: 100000,
      },
    },
    {
      id: 'fleet_command',
      cost: {
        researchData: 5000000,
        quantumEnergy: 2500000,
        quantumCrystals: 250000,
        defensePoints: 500000,
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

    // Apply research effects
    applyResearchEffects(state, nodeId);
  }
};

// Helper function to apply research effects
const applyResearchEffects = (state: GameState, nodeId: string) => {
  // Import RESEARCH_NODES to get the effects
  const { RESEARCH_NODES } = require('../../config/research');
  const node = RESEARCH_NODES.find(n => n.id === nodeId);

  if (!node) return;

  node.effects.forEach(effect => {
    switch (effect.type) {
      case 'click_multiplier':
        state.upgrades.clickMultiplier *= effect.value;
        break;
      case 'click_bonus':
        state.upgrades.clickBonus += effect.value;
        break;
      case 'click_cost_reduction':
        state.upgrades.clickCostReduction += effect.value;
        break;
      case 'click_chance':
        state.upgrades.clickChance += effect.value;
        break;
      // Add other effect types as needed
      default:
        break;
    }
  });
};

import type { BuildingCost } from 'src/types';

export interface BuildingConfig {
  id: string;
  name: string;
  description: string;
  emoji: string;
  baseCost: BuildingCost;
  costMultiplier: number;
  baseProduction: number;
  recommendedWorkers: {
    engineers?: number;
    scientists?: number;
    technicians?: number;
    operators?: number;
    researchers?: number;
    architects?: number;
  };
}

export const ENERGY_BUILDINGS: BuildingConfig[] = [
  {
    id: 'basicCollectors',
    name: 'Basic Collector',
    description: 'Harvests quantum energy from the void',
    emoji: '⚡',
    baseCost: { quantumEnergy: 10 },
    costMultiplier: 1.15,
    baseProduction: 1,
    recommendedWorkers: {},
  },
  {
    id: 'quantumReactors',
    name: 'Quantum Reactor',
    description: 'Advanced energy generation through quantum fusion',
    emoji: '🔬',
    baseCost: { quantumEnergy: 50, quantumCrystals: 5 },
    costMultiplier: 1.2,
    baseProduction: 5,
    recommendedWorkers: { engineers: 1 },
  },
  {
    id: 'stellarForges',
    name: 'Stellar Forge',
    description: 'Creates energy by forging new stars',
    emoji: '⭐',
    baseCost: { quantumEnergy: 5000, quantumCrystals: 50 },
    costMultiplier: 1.35,
    baseProduction: 500,
    recommendedWorkers: { researchers: 1, architects: 1, engineers: 5 },
  },
  {
    id: 'voidExtractors',
    name: 'Void Extractor',
    description: 'Extracts pure energy from the fabric of space-time',
    emoji: '🌀',
    baseCost: { quantumEnergy: 25000, quantumCrystals: 250 },
    costMultiplier: 1.4,
    baseProduction: 2500,
    recommendedWorkers: {
      researchers: 2,
      architects: 2,
      scientists: 2,
      operators: 3,
    },
  },
];

export const MATERIAL_BUILDINGS: BuildingConfig[] = [
  {
    id: 'crystalMines',
    name: 'Crystal Mine',
    description: 'Extracts quantum crystals from dimensional pockets',
    emoji: '💎',
    baseCost: { quantumEnergy: 100 },
    costMultiplier: 1.2,
    baseProduction: 2,
    recommendedWorkers: { engineers: 1, technicians: 1 },
  },
  {
    id: 'quantumRefineries',
    name: 'Quantum Refinery',
    description: 'Refines raw crystals into pure quantum matter',
    emoji: '⚗️',
    baseCost: { quantumEnergy: 500, quantumCrystals: 20 },
    costMultiplier: 1.25,
    baseProduction: 10,
    recommendedWorkers: { scientists: 1, engineers: 2 },
  },
  {
    id: 'matterSynthesizers',
    name: 'Matter Synthesizer',
    description: 'Creates matter from pure energy and quantum fields',
    emoji: '🔮',
    baseCost: { quantumEnergy: 2000, quantumCrystals: 100 },
    costMultiplier: 1.3,
    baseProduction: 50,
    recommendedWorkers: { researchers: 1, scientists: 2, engineers: 1 },
  },
  {
    id: 'dimensionalExtractors',
    name: 'Dimensional Extractor',
    description: 'Pulls exotic matter from parallel dimensions',
    emoji: '🌌',
    baseCost: { quantumEnergy: 10000, quantumCrystals: 500 },
    costMultiplier: 1.35,
    baseProduction: 250,
    recommendedWorkers: { researchers: 2, architects: 1, scientists: 1 },
  },
];

export const RESEARCH_BUILDINGS: BuildingConfig[] = [
  {
    id: 'researchLabs',
    name: 'Research Lab',
    description: 'Basic facility for quantum research and experimentation',
    emoji: '🧪',
    baseCost: { quantumEnergy: 300, quantumCrystals: 10 },
    costMultiplier: 1.2,
    baseProduction: 3,
    recommendedWorkers: { scientists: 1, researchers: 1 },
  },
  {
    id: 'dataCenters',
    name: 'Data Center',
    description: 'Processes vast amounts of quantum information',
    emoji: '💻',
    baseCost: { quantumEnergy: 1500, quantumCrystals: 50 },
    costMultiplier: 1.25,
    baseProduction: 15,
    recommendedWorkers: { technicians: 2, operators: 1 },
  },
  {
    id: 'quantumComputers',
    name: 'Quantum Computer',
    description: 'Performs calculations across infinite parallel universes',
    emoji: '🖥️',
    baseCost: { quantumEnergy: 7500, quantumCrystals: 300 },
    costMultiplier: 1.3,
    baseProduction: 75,
    recommendedWorkers: { researchers: 2, scientists: 1, engineers: 1 },
  },
  {
    id: 'neuralNetworks',
    name: 'Neural Network',
    description: 'AI systems that learn and evolve quantum technologies',
    emoji: '🧠',
    baseCost: {
      quantumEnergy: 30000,
      quantumCrystals: 1200,
    },
    costMultiplier: 1.35,
    baseProduction: 375,
    recommendedWorkers: { researchers: 3, architects: 1, scientists: 2 },
  },
];

export const DEFENSE_BUILDINGS: BuildingConfig[] = [
  {
    id: 'powerGrids',
    name: 'Power Grid',
    description: 'Distributes energy efficiently across your empire',
    emoji: '⚡',
    baseCost: { quantumEnergy: 200, quantumCrystals: 5 },
    costMultiplier: 1.2,
    baseProduction: 1,
    recommendedWorkers: { engineers: 1, technicians: 1 },
  },
  {
    id: 'transportHubs',
    name: 'Transport Hub',
    description: 'Enables instant transportation across dimensions',
    emoji: '🚀',
    baseCost: { quantumEnergy: 1000, quantumCrystals: 25, researchData: 10 },
    costMultiplier: 1.25,
    baseProduction: 5,
    recommendedWorkers: { operators: 2, engineers: 1 },
  },
  {
    id: 'defenseSystems',
    name: 'Defense System',
    description: 'Protects your empire from cosmic threats',
    emoji: '🛡️',
    baseCost: { quantumEnergy: 5000, quantumCrystals: 100, researchData: 50 },
    costMultiplier: 1.3,
    baseProduction: 25,
    recommendedWorkers: { engineers: 2, technicians: 1, operators: 1 },
  },
  {
    id: 'communicationArrays',
    name: 'Communication Array',
    description: 'Enables communication across infinite realities',
    emoji: '📡',
    baseCost: { quantumEnergy: 20000, quantumCrystals: 500, researchData: 200 },
    costMultiplier: 1.35,
    baseProduction: 125,
    recommendedWorkers: { architects: 1, engineers: 2, operators: 2 },
  },
];

export const ALL_BUILDINGS = [
  ...ENERGY_BUILDINGS,
  ...MATERIAL_BUILDINGS,
  ...RESEARCH_BUILDINGS,
  ...DEFENSE_BUILDINGS,
];

export const BUILDING_GROUPS = [
  {
    id: 'energy',
    name: '⚡ Energy Production',
    description: 'Buildings that generate quantum energy',
    color: 'blue',
    buildings: ENERGY_BUILDINGS,
  },
  {
    id: 'materials',
    name: '💎 Material Processing',
    description: 'Buildings that produce quantum crystals for upgrades',
    color: 'purple',
    buildings: MATERIAL_BUILDINGS,
  },
  {
    id: 'research',
    name: '🧪 Research & Development',
    description:
      'Buildings that generate research data for advanced technologies',
    color: 'green',
    buildings: RESEARCH_BUILDINGS,
  },
  {
    id: 'defense',
    name: '🛡️ Defense Systems',
    description: 'Buildings that provide defense points for system protection',
    color: 'red',
    buildings: DEFENSE_BUILDINGS,
  },
];

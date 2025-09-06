import type { FacilityConfig } from 'src/types';

// Material facilities removed - crystal production now handled by Crystal Mine tab

export const RESEARCH_FACILITIES: FacilityConfig[] = [
  {
    id: 'researchLabs',
    name: 'Research Lab',
    description: 'Generates basic research data for the research tree',
    emoji: '🧪',
    baseCost: { quantumEnergy: 500, quantumCrystals: 25 },
    costMultiplier: 1.3,
    baseProduction: 3,
    category: 'research',
  },
  {
    id: 'dataCenters',
    name: 'Data Center',
    description: 'Processes vast amounts of information for research',
    emoji: '💻',
    baseCost: { quantumEnergy: 2500, quantumCrystals: 125, researchData: 50 },
    costMultiplier: 1.4,
    baseProduction: 15,
    category: 'research',
  },
  {
    id: 'quantumComputers',
    name: 'Quantum Computer',
    description: 'Performs calculations across infinite parallel universes',
    emoji: '🖥️',
    baseCost: { quantumEnergy: 12500, quantumCrystals: 625, researchData: 250 },
    costMultiplier: 1.5,
    baseProduction: 75,
    category: 'research',
  },
  {
    id: 'neuralNetworks',
    name: 'Neural Network',
    description: 'AI systems that learn and evolve quantum technologies',
    emoji: '🧠',
    baseCost: {
      quantumEnergy: 50000,
      quantumCrystals: 2500,
      researchData: 1000,
    },
    costMultiplier: 1.6,
    baseProduction: 375,
    category: 'research',
  },
];

export const DEFENSE_FACILITIES: FacilityConfig[] = [
  {
    id: 'powerGrids',
    name: 'Power Grid',
    description: 'Provides energy to defense systems',
    emoji: '⚡',
    baseCost: { quantumEnergy: 200, quantumCrystals: 10 },
    costMultiplier: 1.2,
    baseProduction: 1,
    category: 'defense',
  },
  {
    id: 'transportHubs',
    name: 'Transport Hub',
    description: 'Facilitates rapid deployment of defense units',
    emoji: '🚀',
    baseCost: { quantumEnergy: 1000, quantumCrystals: 50, researchData: 25 },
    costMultiplier: 1.3,
    baseProduction: 5,
    category: 'defense',
  },
  {
    id: 'defenseSystems',
    name: 'Defense System',
    description: 'Automated turrets and shields for planetary defense',
    emoji: '🛡️',
    baseCost: { quantumEnergy: 5000, quantumCrystals: 250, researchData: 125 },
    costMultiplier: 1.4,
    baseProduction: 25,
    category: 'defense',
  },
  {
    id: 'communicationArrays',
    name: 'Communication Array',
    description: 'Enables communication across infinite realities',
    emoji: '📡',
    baseCost: {
      quantumEnergy: 20000,
      quantumCrystals: 1000,
      researchData: 500,
    },
    costMultiplier: 1.5,
    baseProduction: 125,
    category: 'defense',
  },
];

export const ALL_FACILITIES = [...RESEARCH_FACILITIES, ...DEFENSE_FACILITIES];

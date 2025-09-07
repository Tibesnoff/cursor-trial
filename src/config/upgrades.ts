import type { BuildingCost } from '../types';

export interface UpgradeConfig {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: 'click_power' | 'efficiency' | 'cost_reduction' | 'special';
  baseCost: BuildingCost;
  costMultiplier: number;
  maxLevel: number;
  effect: {
    type: 'multiplier' | 'additive' | 'percentage' | 'special';
    value: number;
    target:
      | 'click_power'
      | 'collector_efficiency'
      | 'cost_reduction'
      | 'special';
  };
  prerequisites?: string[];
  collectorType: 'energy' | 'crystal' | 'both';
}

// Energy Collector Upgrades
export const ENERGY_UPGRADES: UpgradeConfig[] = [
  // Click Power Upgrades
  {
    id: 'energy_click_boost',
    name: 'Energy Click Boost',
    description: 'Increases energy gained per click',
    emoji: '⚡',
    category: 'click_power',
    baseCost: { quantumEnergy: 25 },
    costMultiplier: 1.3,
    maxLevel: 50,
    effect: {
      type: 'additive',
      value: 1,
      target: 'click_power',
    },
    collectorType: 'energy',
  },
  {
    id: 'quantum_amplifier',
    name: 'Quantum Amplifier',
    description: 'Multiplies click power by 1.5x',
    emoji: '🔬',
    category: 'click_power',
    baseCost: { quantumEnergy: 1000, quantumCrystals: 50 },
    costMultiplier: 2.0,
    maxLevel: 10,
    effect: {
      type: 'multiplier',
      value: 1.5,
      target: 'click_power',
    },
    prerequisites: ['energy_click_boost'],
    collectorType: 'energy',
  },
  {
    id: 'void_harvester',
    name: 'Void Harvester',
    description: 'Extracts energy from the quantum void',
    emoji: '🌌',
    category: 'click_power',
    baseCost: { quantumEnergy: 10000, quantumCrystals: 500 },
    costMultiplier: 2.5,
    maxLevel: 5,
    effect: {
      type: 'multiplier',
      value: 2.0,
      target: 'click_power',
    },
    prerequisites: ['quantum_amplifier'],
    collectorType: 'energy',
  },

  // Efficiency Upgrades
  {
    id: 'collector_optimization',
    name: 'Collector Optimization',
    description: 'Increases all energy collector efficiency by 10%',
    emoji: '⚙️',
    category: 'efficiency',
    baseCost: { quantumEnergy: 500 },
    costMultiplier: 1.8,
    maxLevel: 20,
    effect: {
      type: 'percentage',
      value: 10,
      target: 'collector_efficiency',
    },
    collectorType: 'energy',
  },
  {
    id: 'quantum_synchronization',
    name: 'Quantum Synchronization',
    description: 'Synchronizes collectors for 25% efficiency boost',
    emoji: '🔄',
    category: 'efficiency',
    baseCost: { quantumEnergy: 5000, quantumCrystals: 200 },
    costMultiplier: 2.2,
    maxLevel: 8,
    effect: {
      type: 'percentage',
      value: 25,
      target: 'collector_efficiency',
    },
    prerequisites: ['collector_optimization'],
    collectorType: 'energy',
  },
  {
    id: 'stellar_harness',
    name: 'Stellar Harness',
    description: 'Harnesses stellar energy for 50% efficiency boost',
    emoji: '⭐',
    category: 'efficiency',
    baseCost: { quantumEnergy: 50000, quantumCrystals: 2000 },
    costMultiplier: 3.0,
    maxLevel: 5,
    effect: {
      type: 'percentage',
      value: 50,
      target: 'collector_efficiency',
    },
    prerequisites: ['quantum_synchronization'],
    collectorType: 'energy',
  },

  // Cost Reduction Upgrades
  {
    id: 'efficient_construction',
    name: 'Efficient Construction',
    description: 'Reduces collector costs by 5%',
    emoji: '🏗️',
    category: 'cost_reduction',
    baseCost: { quantumEnergy: 1000 },
    costMultiplier: 2.0,
    maxLevel: 15,
    effect: {
      type: 'percentage',
      value: 5,
      target: 'cost_reduction',
    },
    collectorType: 'energy',
  },
  {
    id: 'quantum_blueprints',
    name: 'Quantum Blueprints',
    description: 'Advanced blueprints reduce costs by 15%',
    emoji: '📐',
    category: 'cost_reduction',
    baseCost: { quantumEnergy: 10000, quantumCrystals: 500 },
    costMultiplier: 2.5,
    maxLevel: 8,
    effect: {
      type: 'percentage',
      value: 15,
      target: 'cost_reduction',
    },
    prerequisites: ['efficient_construction'],
    collectorType: 'energy',
  },

  // Special Upgrades
  {
    id: 'auto_clicker',
    name: 'Auto Clicker',
    description: 'Automatically clicks every 5 seconds',
    emoji: '🤖',
    category: 'special',
    baseCost: { quantumEnergy: 5000, quantumCrystals: 100 },
    costMultiplier: 3.0,
    maxLevel: 3,
    effect: {
      type: 'special',
      value: 1,
      target: 'special',
    },
    collectorType: 'energy',
  },
  {
    id: 'energy_overflow',
    name: 'Energy Overflow',
    description: 'Chance for 2x energy on click',
    emoji: '💥',
    category: 'special',
    baseCost: { quantumEnergy: 15000, quantumCrystals: 1000 },
    costMultiplier: 4.0,
    maxLevel: 5,
    effect: {
      type: 'percentage',
      value: 20,
      target: 'special',
    },
    prerequisites: ['auto_clicker'],
    collectorType: 'energy',
  },
];

// Crystal Collector Upgrades
export const CRYSTAL_UPGRADES: UpgradeConfig[] = [
  // Click Power Upgrades
  {
    id: 'crystal_click_boost',
    name: 'Crystal Click Boost',
    description: 'Increases crystals gained per click',
    emoji: '💎',
    category: 'click_power',
    baseCost: { quantumCrystals: 15 },
    costMultiplier: 1.3,
    maxLevel: 50,
    effect: {
      type: 'additive',
      value: 1,
      target: 'click_power',
    },
    collectorType: 'crystal',
  },
  {
    id: 'crystal_amplifier',
    name: 'Crystal Amplifier',
    description: 'Multiplies crystal click power by 1.5x',
    emoji: '🔮',
    category: 'click_power',
    baseCost: { quantumCrystals: 500, quantumEnergy: 2000 },
    costMultiplier: 2.0,
    maxLevel: 10,
    effect: {
      type: 'multiplier',
      value: 1.5,
      target: 'click_power',
    },
    prerequisites: ['crystal_click_boost'],
    collectorType: 'crystal',
  },
  {
    id: 'dimensional_mining',
    name: 'Dimensional Mining',
    description: 'Mines crystals from parallel dimensions',
    emoji: '🌀',
    category: 'click_power',
    baseCost: { quantumCrystals: 5000, quantumEnergy: 10000 },
    costMultiplier: 2.5,
    maxLevel: 5,
    effect: {
      type: 'multiplier',
      value: 2.0,
      target: 'click_power',
    },
    prerequisites: ['crystal_amplifier'],
    collectorType: 'crystal',
  },

  // Efficiency Upgrades
  {
    id: 'mining_optimization',
    name: 'Mining Optimization',
    description: 'Increases all crystal collector efficiency by 10%',
    emoji: '⛏️',
    category: 'efficiency',
    baseCost: { quantumCrystals: 250 },
    costMultiplier: 1.8,
    maxLevel: 20,
    effect: {
      type: 'percentage',
      value: 10,
      target: 'collector_efficiency',
    },
    collectorType: 'crystal',
  },
  {
    id: 'crystal_synchronization',
    name: 'Crystal Synchronization',
    description: 'Synchronizes crystal collectors for 25% efficiency boost',
    emoji: '💠',
    category: 'efficiency',
    baseCost: { quantumCrystals: 2500, quantumEnergy: 5000 },
    costMultiplier: 2.2,
    maxLevel: 8,
    effect: {
      type: 'percentage',
      value: 25,
      target: 'collector_efficiency',
    },
    prerequisites: ['mining_optimization'],
    collectorType: 'crystal',
  },
  {
    id: 'cosmic_refinement',
    name: 'Cosmic Refinement',
    description: 'Refines crystals with cosmic energy for 50% efficiency boost',
    emoji: '✨',
    category: 'efficiency',
    baseCost: { quantumCrystals: 25000, quantumEnergy: 50000 },
    costMultiplier: 3.0,
    maxLevel: 5,
    effect: {
      type: 'percentage',
      value: 50,
      target: 'collector_efficiency',
    },
    prerequisites: ['crystal_synchronization'],
    collectorType: 'crystal',
  },

  // Cost Reduction Upgrades
  {
    id: 'efficient_mining',
    name: 'Efficient Mining',
    description: 'Reduces crystal collector costs by 5%',
    emoji: '🔧',
    category: 'cost_reduction',
    baseCost: { quantumCrystals: 500 },
    costMultiplier: 2.0,
    maxLevel: 15,
    effect: {
      type: 'percentage',
      value: 5,
      target: 'cost_reduction',
    },
    collectorType: 'crystal',
  },
  {
    id: 'crystal_blueprints',
    name: 'Crystal Blueprints',
    description: 'Advanced crystal blueprints reduce costs by 15%',
    emoji: '📊',
    category: 'cost_reduction',
    baseCost: { quantumCrystals: 5000, quantumEnergy: 10000 },
    costMultiplier: 2.5,
    maxLevel: 8,
    effect: {
      type: 'percentage',
      value: 15,
      target: 'cost_reduction',
    },
    prerequisites: ['efficient_mining'],
    collectorType: 'crystal',
  },

  // Special Upgrades
  {
    id: 'crystal_auto_miner',
    name: 'Crystal Auto Miner',
    description: 'Automatically mines crystals every 5 seconds',
    emoji: '⛏️',
    category: 'special',
    baseCost: { quantumCrystals: 2500, quantumEnergy: 5000 },
    costMultiplier: 3.0,
    maxLevel: 3,
    effect: {
      type: 'special',
      value: 1,
      target: 'special',
    },
    collectorType: 'crystal',
  },
  {
    id: 'crystal_overflow',
    name: 'Crystal Overflow',
    description: 'Chance for 2x crystals on click',
    emoji: '💎',
    category: 'special',
    baseCost: { quantumCrystals: 15000, quantumEnergy: 30000 },
    costMultiplier: 4.0,
    maxLevel: 5,
    effect: {
      type: 'percentage',
      value: 20,
      target: 'special',
    },
    prerequisites: ['crystal_auto_miner'],
    collectorType: 'crystal',
  },
];

// Combined upgrades that affect both types
export const UNIVERSAL_UPGRADES: UpgradeConfig[] = [
  {
    id: 'quantum_synergy',
    name: 'Quantum Synergy',
    description: 'Energy and crystal collectors boost each other by 10%',
    emoji: '🔗',
    category: 'special',
    baseCost: { quantumEnergy: 50000, quantumCrystals: 10000 },
    costMultiplier: 5.0,
    maxLevel: 3,
    effect: {
      type: 'percentage',
      value: 10,
      target: 'special',
    },
    collectorType: 'both',
  },
  {
    id: 'cosmic_ascension',
    name: 'Cosmic Ascension',
    description: 'All collectors gain 25% efficiency and click power',
    emoji: '🌟',
    category: 'special',
    baseCost: { quantumEnergy: 100000, quantumCrystals: 50000 },
    costMultiplier: 10.0,
    maxLevel: 1,
    effect: {
      type: 'percentage',
      value: 25,
      target: 'special',
    },
    prerequisites: ['quantum_synergy'],
    collectorType: 'both',
  },
];

export const ALL_UPGRADES = [
  ...ENERGY_UPGRADES,
  ...CRYSTAL_UPGRADES,
  ...UNIVERSAL_UPGRADES,
];

export const UPGRADE_CATEGORIES = {
  click_power: {
    name: 'Click Power',
    emoji: '👆',
    description: 'Increases resources gained per click',
  },
  efficiency: {
    name: 'Efficiency',
    emoji: '⚙️',
    description: 'Boosts passive collector production',
  },
  cost_reduction: {
    name: 'Cost Reduction',
    emoji: '💰',
    description: 'Reduces building and upgrade costs',
  },
  special: {
    name: 'Special Effects',
    emoji: '✨',
    description: 'Unique bonuses and multipliers',
  },
};

import type { DefenseUpgrade } from 'src/types';

export const DEFENSE_UPGRADES: DefenseUpgrade[] = [
  // Infrastructure
  {
    id: 'basic_infrastructure',
    name: 'Basic Infrastructure',
    description: 'Fundamental defense infrastructure',
    emoji: '🏗️',
    cost: { defensePoints: 0 },
    effects: [
      {
        type: 'unlock',
        value: 1,
        description: 'Unlocks basic defense capabilities',
      },
    ],
    category: 'infrastructure',
  },
  {
    id: 'power_distribution',
    name: 'Power Distribution',
    description: 'Efficient energy distribution for defense systems',
    emoji: '⚡',
    cost: { defensePoints: 100, quantumEnergy: 50 },
    effects: [
      { type: 'shield', value: 0.1, description: '+10% shield efficiency' },
    ],
    category: 'infrastructure',
  },
  {
    id: 'communication_network',
    name: 'Communication Network',
    description: 'Secure communication between defense installations',
    emoji: '📡',
    cost: { defensePoints: 500, quantumEnergy: 250, quantumCrystals: 25 },
    effects: [
      {
        type: 'detection',
        value: 0.2,
        description: '+20% threat detection range',
      },
    ],
    category: 'infrastructure',
  },

  // Shields
  {
    id: 'energy_shields',
    name: 'Energy Shields',
    description: 'Basic energy barrier protection',
    emoji: '🔰',
    cost: { defensePoints: 200, quantumEnergy: 100 },
    effects: [
      { type: 'shield', value: 0.3, description: '+30% shield strength' },
    ],
    category: 'shields',
  },
  {
    id: 'quantum_shields',
    name: 'Quantum Shields',
    description: 'Advanced quantum field manipulation for protection',
    emoji: '🌀',
    cost: { defensePoints: 1000, quantumEnergy: 500, quantumCrystals: 50 },
    effects: [
      { type: 'shield', value: 0.6, description: '+60% shield strength' },
    ],
    category: 'shields',
  },
  {
    id: 'dimensional_barriers',
    name: 'Dimensional Barriers',
    description: 'Create barriers between dimensions for ultimate protection',
    emoji: '🌌',
    cost: { defensePoints: 5000, quantumEnergy: 2500, quantumCrystals: 250 },
    effects: [
      { type: 'shield', value: 1.2, description: '+120% shield strength' },
    ],
    category: 'shields',
  },

  // Weapons
  {
    id: 'plasma_cannons',
    name: 'Plasma Cannons',
    description: 'High-energy plasma weaponry',
    emoji: '💥',
    cost: { defensePoints: 300, quantumEnergy: 150, quantumCrystals: 15 },
    effects: [
      { type: 'weapon', value: 0.4, description: '+40% weapon damage' },
    ],
    category: 'weapons',
  },
  {
    id: 'quantum_torpedoes',
    name: 'Quantum Torpedoes',
    description: 'Torpedoes that phase through shields',
    emoji: '🚀',
    cost: { defensePoints: 1500, quantumEnergy: 750, quantumCrystals: 75 },
    effects: [
      { type: 'weapon', value: 0.8, description: '+80% weapon damage' },
    ],
    category: 'weapons',
  },
  {
    id: 'void_disruptors',
    name: 'Void Disruptors',
    description: 'Weapons that tear holes in space-time',
    emoji: '⚡',
    cost: { defensePoints: 7500, quantumEnergy: 3750, quantumCrystals: 375 },
    effects: [
      { type: 'weapon', value: 1.5, description: '+150% weapon damage' },
    ],
    category: 'weapons',
  },

  // Intelligence
  {
    id: 'sensor_arrays',
    name: 'Sensor Arrays',
    description: 'Advanced detection and scanning systems',
    emoji: '📡',
    cost: { defensePoints: 400, quantumEnergy: 200, quantumCrystals: 20 },
    effects: [
      { type: 'detection', value: 0.3, description: '+30% threat detection' },
    ],
    category: 'intelligence',
  },
  {
    id: 'quantum_radar',
    name: 'Quantum Radar',
    description: 'Detect threats across multiple dimensions',
    emoji: '🔍',
    cost: { defensePoints: 2000, quantumEnergy: 1000, quantumCrystals: 100 },
    effects: [
      { type: 'detection', value: 0.7, description: '+70% threat detection' },
    ],
    category: 'intelligence',
  },
  {
    id: 'precognition_systems',
    name: 'Precognition Systems',
    description: 'Predict threats before they materialize',
    emoji: '🔮',
    cost: { defensePoints: 10000, quantumEnergy: 5000, quantumCrystals: 500 },
    effects: [
      { type: 'detection', value: 1.2, description: '+120% threat detection' },
    ],
    category: 'intelligence',
  },

  // Ships (Future Battle System)
  {
    id: 'scout_ships',
    name: 'Scout Ships',
    description: 'Fast reconnaissance vessels for exploration',
    emoji: '🛸',
    cost: { defensePoints: 1000, quantumEnergy: 500, quantumCrystals: 50 },
    effects: [
      {
        type: 'ship',
        value: 1,
        description: 'Unlocks scout ship construction',
      },
    ],
    category: 'ships',
  },
  {
    id: 'fighter_ships',
    name: 'Fighter Ships',
    description: 'Light combat vessels for skirmishes',
    emoji: '⚔️',
    cost: { defensePoints: 5000, quantumEnergy: 2500, quantumCrystals: 250 },
    effects: [
      {
        type: 'ship',
        value: 2,
        description: 'Unlocks fighter ship construction',
      },
    ],
    category: 'ships',
  },
  {
    id: 'battleships',
    name: 'Battleships',
    description: 'Heavy capital ships for major conflicts',
    emoji: '🚢',
    cost: { defensePoints: 25000, quantumEnergy: 12500, quantumCrystals: 1250 },
    effects: [
      {
        type: 'ship',
        value: 3,
        description: 'Unlocks battleship construction',
      },
    ],
    category: 'ships',
  },
];

export const DEFENSE_CATEGORIES = [
  { id: 'infrastructure', name: 'Infrastructure', emoji: '🏗️', color: 'gray' },
  { id: 'shields', name: 'Shields', emoji: '🔰', color: 'blue' },
  { id: 'weapons', name: 'Weapons', emoji: '💥', color: 'red' },
  { id: 'intelligence', name: 'Intelligence', emoji: '📡', color: 'yellow' },
  { id: 'ships', name: 'Ships', emoji: '🚀', color: 'green' },
];

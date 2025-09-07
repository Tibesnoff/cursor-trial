import type { ResearchNode } from 'src/types';

export const RESEARCH_NODES: ResearchNode[] = [
  // Foundation Research
  {
    id: 'basic_research',
    name: 'Basic Research',
    description: 'Fundamental understanding of quantum mechanics',
    emoji: '🔬',
    cost: { researchData: 0 },
    prerequisites: [],
    effects: [
      {
        type: 'unlock',
        value: 1,
        description: 'Unlocks basic research capabilities',
      },
    ],
    category: 'foundation',
  },
  {
    id: 'quantum_theory',
    name: 'Quantum Theory',
    description: 'Advanced understanding of quantum field theory',
    emoji: '⚛️',
    cost: { researchData: 100 },
    prerequisites: ['basic_research'],
    effects: [
      { type: 'energy', value: 0.1, description: '+10% energy production' },
    ],
    category: 'foundation',
  },
  {
    id: 'click_amplification',
    name: 'Click Amplification',
    description:
      'Enhance manual collection efficiency through quantum resonance',
    emoji: '👆',
    cost: { researchData: 150, quantumEnergy: 25 },
    prerequisites: ['quantum_theory'],
    effects: [
      { type: 'click_multiplier', value: 1.5, description: '+50% click power' },
    ],
    category: 'foundation',
  },
  {
    id: 'quantum_clicking',
    name: 'Quantum Clicking',
    description: 'Master the art of quantum-enhanced manual collection',
    emoji: '⚡',
    cost: { researchData: 500, quantumEnergy: 100, quantumCrystals: 10 },
    prerequisites: ['click_amplification'],
    effects: [
      { type: 'click_bonus', value: 10, description: '+10 base click power' },
    ],
    category: 'foundation',
  },

  // Energy Research
  {
    id: 'energy_efficiency',
    name: 'Energy Efficiency',
    description: 'Optimize energy collection and storage systems',
    emoji: '⚡',
    cost: { researchData: 250, quantumEnergy: 50 },
    prerequisites: ['quantum_theory'],
    effects: [
      { type: 'energy', value: 0.2, description: '+20% energy production' },
    ],
    category: 'energy',
  },
  {
    id: 'stellar_harvesting',
    name: 'Stellar Harvesting',
    description: 'Harness the power of stars for massive energy generation',
    emoji: '⭐',
    cost: { researchData: 1000, quantumEnergy: 500, quantumCrystals: 25 },
    prerequisites: ['energy_efficiency'],
    effects: [
      { type: 'energy', value: 0.5, description: '+50% energy production' },
      {
        type: 'unlock',
        value: 1,
        description: 'Unlocks advanced energy collectors',
      },
    ],
    category: 'energy',
  },
  {
    id: 'void_manipulation',
    name: 'Void Manipulation',
    description: 'Extract energy directly from the fabric of space-time',
    emoji: '🌀',
    cost: { researchData: 5000, quantumEnergy: 2500, quantumCrystals: 125 },
    prerequisites: ['stellar_harvesting'],
    effects: [
      { type: 'energy', value: 1.0, description: '+100% energy production' },
    ],
    category: 'energy',
  },
  {
    id: 'click_efficiency',
    name: 'Click Efficiency',
    description: 'Optimize click upgrade costs through advanced algorithms',
    emoji: '🎯',
    cost: { researchData: 2000, quantumEnergy: 1000, quantumCrystals: 50 },
    prerequisites: ['energy_efficiency'],
    effects: [
      {
        type: 'click_cost_reduction',
        value: 0.25,
        description: '-25% click upgrade costs',
      },
    ],
    category: 'energy',
  },
  {
    id: 'multi_click',
    name: 'Multi-Click',
    description:
      'Quantum entanglement allows single clicks to trigger multiple times',
    emoji: '👥',
    cost: { researchData: 8000, quantumEnergy: 4000, quantumCrystals: 200 },
    prerequisites: ['void_manipulation'],
    effects: [
      {
        type: 'click_chance',
        value: 0.15,
        description: '15% chance for double clicks',
      },
    ],
    category: 'energy',
  },

  // Crystal Research
  {
    id: 'crystal_refinement',
    name: 'Crystal Refinement',
    description: 'Improve crystal extraction and processing techniques',
    emoji: '💎',
    cost: { researchData: 300, quantumCrystals: 30 },
    prerequisites: ['quantum_theory'],
    effects: [
      { type: 'crystal', value: 0.15, description: '+15% crystal production' },
    ],
    category: 'crystal',
  },
  {
    id: 'dimensional_mining',
    name: 'Dimensional Mining',
    description: 'Access crystal deposits in parallel dimensions',
    emoji: '🕳️',
    cost: { researchData: 1500, quantumEnergy: 750, quantumCrystals: 50 },
    prerequisites: ['crystal_refinement'],
    effects: [
      { type: 'crystal', value: 0.4, description: '+40% crystal production' },
      {
        type: 'unlock',
        value: 1,
        description: 'Unlocks advanced crystal collectors',
      },
    ],
    category: 'crystal',
  },
  {
    id: 'quantum_crystallography',
    name: 'Quantum Crystallography',
    description: 'Master the art of creating perfect quantum crystals',
    emoji: '✨',
    cost: { researchData: 7500, quantumEnergy: 3750, quantumCrystals: 250 },
    prerequisites: ['dimensional_mining'],
    effects: [
      { type: 'crystal', value: 0.8, description: '+80% crystal production' },
    ],
    category: 'crystal',
  },

  // Defense Research
  {
    id: 'defense_systems',
    name: 'Defense Systems',
    description: 'Develop basic defensive technologies',
    emoji: '🛡️',
    cost: { researchData: 400, defensePoints: 20 },
    prerequisites: ['quantum_theory'],
    effects: [
      {
        type: 'defense',
        value: 0.1,
        description: '+10% defense point generation',
      },
    ],
    category: 'defense',
  },
  {
    id: 'shield_technology',
    name: 'Shield Technology',
    description: 'Create energy barriers to protect your installations',
    emoji: '🔰',
    cost: { researchData: 2000, quantumEnergy: 1000, defensePoints: 100 },
    prerequisites: ['defense_systems'],
    effects: [
      {
        type: 'defense',
        value: 0.3,
        description: '+30% defense point generation',
      },
      { type: 'unlock', value: 1, description: 'Unlocks shield systems' },
    ],
    category: 'defense',
  },
  {
    id: 'weapon_systems',
    name: 'Weapon Systems',
    description: 'Develop offensive capabilities for future conflicts',
    emoji: '⚔️',
    cost: {
      researchData: 10000,
      quantumEnergy: 5000,
      quantumCrystals: 500,
      defensePoints: 500,
    },
    prerequisites: ['shield_technology'],
    effects: [
      {
        type: 'defense',
        value: 0.6,
        description: '+60% defense point generation',
      },
      { type: 'unlock', value: 1, description: 'Unlocks weapon systems' },
    ],
    category: 'defense',
  },

  // Ship Research (Future Battle System)
  {
    id: 'ship_design',
    name: 'Ship Design',
    description: 'Basic understanding of spacecraft construction',
    emoji: '🚀',
    cost: { researchData: 5000, quantumEnergy: 2500, quantumCrystals: 250 },
    prerequisites: ['weapon_systems'],
    effects: [
      {
        type: 'ship',
        value: 1,
        description: 'Unlocks basic ship construction',
      },
    ],
    category: 'ship',
  },
  {
    id: 'combat_systems',
    name: 'Combat Systems',
    description: 'Advanced weaponry and defensive systems for ships',
    emoji: '⚔️',
    cost: {
      researchData: 15000,
      quantumEnergy: 7500,
      quantumCrystals: 750,
      defensePoints: 1000,
    },
    prerequisites: ['ship_design'],
    effects: [
      { type: 'ship', value: 2, description: 'Unlocks combat ship designs' },
    ],
    category: 'ship',
  },
  {
    id: 'fleet_command',
    name: 'Fleet Command',
    description: 'Coordinate multiple ships in battle formations',
    emoji: '🎖️',
    cost: {
      researchData: 50000,
      quantumEnergy: 25000,
      quantumCrystals: 2500,
      defensePoints: 5000,
    },
    prerequisites: ['combat_systems'],
    effects: [
      { type: 'ship', value: 3, description: 'Unlocks fleet management' },
    ],
    category: 'ship',
  },
];

export const RESEARCH_CATEGORIES = [
  { id: 'foundation', name: 'Foundation', emoji: '🔬', color: 'blue' },
  { id: 'energy', name: 'Energy', emoji: '⚡', color: 'yellow' },
  { id: 'crystal', name: 'Crystal', emoji: '💎', color: 'purple' },
  { id: 'defense', name: 'Defense', emoji: '🛡️', color: 'red' },
  { id: 'ship', name: 'Ship', emoji: '🚀', color: 'green' },
];

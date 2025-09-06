import type { WorkerType, ResourceType } from '../types';

export const WORKER_TYPES: WorkerType[] = [
  { key: 'engineers', name: 'Engineers', emoji: '🔧', color: 'blue' },
  { key: 'technicians', name: 'Technicians', emoji: '⚙️', color: 'green' },
  { key: 'scientists', name: 'Scientists', emoji: '🧪', color: 'purple' },
  { key: 'operators', name: 'Operators', emoji: '🎛️', color: 'yellow' },
  { key: 'researchers', name: 'Researchers', emoji: '🔬', color: 'cyan' },
  { key: 'architects', name: 'Architects', emoji: '🏗️', color: 'orange' },
];

export const RESOURCE_TYPES: ResourceType[] = [
  {
    key: 'quantumEnergy',
    name: 'Quantum Energy',
    emoji: '⚡',
    color: 'text-cyan-300',
    borderColor: 'border-cyan-400/50',
  },
  {
    key: 'quantumCrystals',
    name: 'Quantum Crystals',
    emoji: '💎',
    color: 'text-purple-300',
    borderColor: 'border-purple-400/50',
  },
  {
    key: 'researchData',
    name: 'Research Data',
    emoji: '🧪',
    color: 'text-green-300',
    borderColor: 'border-green-400/50',
  },
  {
    key: 'defensePoints',
    name: 'Defense',
    emoji: '🛡️',
    color: 'text-red-300',
    borderColor: 'border-red-400/50',
  },
];

export const GAME_CONFIG = {
  PASSIVE_GENERATION_INTERVAL: 1000, // 1 second
  PLAY_TIME_UPDATE_INTERVAL: 1000, // 1 second
  WORKER_BONUS_PER_RECOMMENDATION: 0.5, // 50% bonus per fully staffed recommendation
  GLOBAL_ENGINEER_BONUS: 0.05, // 5% per engineer
  GLOBAL_TECHNICIAN_BONUS: 0.03, // 3% per technician
  GLOBAL_OPERATOR_BONUS: 0.08, // 8% per operator
  GLOBAL_RESEARCHER_BONUS: 0.1, // 10% per researcher
} as const;

import type { BuildingGroup, WorkerType, ResourceType } from '../types';

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
    color: 'cyan-400',
    borderColor: 'cyan-500/30',
  },
  {
    key: 'quantumCrystals',
    name: 'Quantum Crystals',
    emoji: '💎',
    color: 'purple-400',
    borderColor: 'purple-500/30',
  },
  {
    key: 'researchData',
    name: 'Research Data',
    emoji: '🧪',
    color: 'green-400',
    borderColor: 'green-500/30',
  },
  {
    key: 'defensePoints',
    name: 'Defense',
    emoji: '🛡️',
    color: 'red-400',
    borderColor: 'red-500/30',
  },
];

export const BUILDING_GROUPS: Omit<BuildingGroup, 'buildings'>[] = [
  {
    id: 'energy',
    name: '⚡ Energy Production',
    description: 'Buildings that generate quantum energy',
    color: 'cyan',
  },
  {
    id: 'materials',
    name: '💎 Material Processing',
    description: 'Buildings that produce quantum crystals for upgrades',
    color: 'purple',
  },
  {
    id: 'research',
    name: '🧪 Research & Development',
    description:
      'Buildings that generate research data for advanced technologies',
    color: 'green',
  },
  {
    id: 'defense',
    name: '🛡️ Defense Systems',
    description: 'Buildings that provide defense points for system protection',
    color: 'red',
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

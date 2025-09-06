import type { ResourceType } from '../types';

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
} as const;

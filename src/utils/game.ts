import type { Building } from '../types';

export const getBuildingCost = (
  baseCost: number,
  multiplier: number,
  count: number
): number => {
  return Math.floor(baseCost * Math.pow(multiplier, count));
};

export const canAfford = (
  cost: number,
  availableResources: number
): boolean => {
  return availableResources >= cost;
};

export const getWorkerBonus = (
  recommendations: Building['recommendedWorkers'],
  currentWorkers: Record<string, number>
): number => {
  let bonus = 1;
  Object.entries(recommendations).forEach(([workerType, recommended]) => {
    if (!recommended) return;
    const current = currentWorkers[workerType] || 0;
    const ratio = Math.min(current / recommended, 1);
    bonus += ratio * 0.5; // 50% bonus per fully staffed recommendation
  });
  return bonus;
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

export const getResourceProductionText = (
  buildingId: string,
  baseProduction: number
): string => {
  if (
    buildingId.includes('Collector') ||
    buildingId.includes('Reactor') ||
    buildingId.includes('Forge') ||
    buildingId.includes('Extractor')
  ) {
    return `${baseProduction} energy/sec`;
  }
  if (
    buildingId.includes('Mine') ||
    buildingId.includes('Refinery') ||
    buildingId.includes('Synthesizer')
  ) {
    return `${baseProduction} crystals/sec`;
  }
  if (
    buildingId.includes('Lab') ||
    buildingId.includes('Center') ||
    buildingId.includes('Computer') ||
    buildingId.includes('Network')
  ) {
    return `${baseProduction} research/sec`;
  }
  if (
    buildingId.includes('Grid') ||
    buildingId.includes('Hub') ||
    buildingId.includes('System') ||
    buildingId.includes('Array')
  ) {
    return `${baseProduction} defense/sec`;
  }
  return `${baseProduction}/sec`;
};

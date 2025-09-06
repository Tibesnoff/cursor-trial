import type { BuildingCost } from '../types';

export const getBuildingCost = (
  baseCost: BuildingCost,
  multiplier: number,
  count: number
): BuildingCost => {
  const cost: BuildingCost = {};
  Object.entries(baseCost).forEach(([resource, amount]) => {
    if (amount) {
      cost[resource as keyof BuildingCost] = Math.floor(
        amount * Math.pow(multiplier, count)
      );
    }
  });
  return cost;
};

export const canAfford = (
  cost: BuildingCost,
  availableResources: Record<string, number>
): boolean => {
  return Object.entries(cost).every(([resource, amount]) => {
    if (!amount) return true;
    return (availableResources[resource] || 0) >= amount;
  });
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

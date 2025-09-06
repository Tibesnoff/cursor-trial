import type { GameState } from 'src/types';
import { getWorkerBonus } from 'src/utils';

export const generatePassiveEnergy = (state: GameState) => {
  const { buildings, workers, upgrades } = state;

  // Calculate base production from all buildings
  const buildingConfigs = [
    // Energy Buildings
    { type: 'basicCollectors', baseProduction: 1, recommendedWorkers: {} },
    {
      type: 'quantumReactors',
      baseProduction: 5,
      recommendedWorkers: { engineers: 1 },
    },
    {
      type: 'stellarForges',
      baseProduction: 500,
      recommendedWorkers: { researchers: 1, architects: 1, engineers: 5 },
    },
    {
      type: 'voidExtractors',
      baseProduction: 2500,
      recommendedWorkers: {
        researchers: 2,
        architects: 2,
        scientists: 2,
        operators: 3,
      },
    },

    // Material Buildings
    {
      type: 'crystalMines',
      baseProduction: 2,
      recommendedWorkers: { engineers: 1, technicians: 1 },
    },
    {
      type: 'quantumRefineries',
      baseProduction: 10,
      recommendedWorkers: { scientists: 1, engineers: 2 },
    },
    {
      type: 'matterSynthesizers',
      baseProduction: 50,
      recommendedWorkers: { researchers: 1, scientists: 2, engineers: 1 },
    },
    {
      type: 'dimensionalExtractors',
      baseProduction: 250,
      recommendedWorkers: { researchers: 2, architects: 1, scientists: 1 },
    },

    // Research Buildings
    {
      type: 'researchLabs',
      baseProduction: 3,
      recommendedWorkers: { scientists: 1, researchers: 1 },
    },
    {
      type: 'dataCenters',
      baseProduction: 15,
      recommendedWorkers: { technicians: 2, operators: 1 },
    },
    {
      type: 'quantumComputers',
      baseProduction: 75,
      recommendedWorkers: { researchers: 2, scientists: 1, engineers: 1 },
    },
    {
      type: 'neuralNetworks',
      baseProduction: 375,
      recommendedWorkers: { researchers: 3, architects: 1, scientists: 2 },
    },

    // Defense Buildings
    {
      type: 'powerGrids',
      baseProduction: 1,
      recommendedWorkers: { engineers: 1, technicians: 1 },
    },
    {
      type: 'transportHubs',
      baseProduction: 5,
      recommendedWorkers: { operators: 2, engineers: 1 },
    },
    {
      type: 'defenseSystems',
      baseProduction: 25,
      recommendedWorkers: { engineers: 2, technicians: 1, operators: 1 },
    },
    {
      type: 'communicationArrays',
      baseProduction: 125,
      recommendedWorkers: { architects: 1, engineers: 2, operators: 2 },
    },
  ];

  let totalEnergyProduction = 0;
  let totalCrystalProduction = 0;
  let totalResearchProduction = 0;
  let totalDefenseProduction = 0;

  buildingConfigs.forEach(config => {
    const buildingCount = buildings[config.type as keyof typeof buildings] || 0;
    if (buildingCount > 0) {
      const workerBonus = getWorkerBonus(config.recommendedWorkers, workers);
      const production = config.baseProduction * buildingCount * workerBonus;

      // Categorize production by building type
      if (
        config.type.includes('Collector') ||
        config.type.includes('Reactor') ||
        config.type.includes('Forge') ||
        config.type.includes('Extractor')
      ) {
        totalEnergyProduction += production;
      } else if (
        config.type.includes('Mine') ||
        config.type.includes('Refinery') ||
        config.type.includes('Synthesizer')
      ) {
        totalCrystalProduction += production;
      } else if (
        config.type.includes('Lab') ||
        config.type.includes('Center') ||
        config.type.includes('Computer') ||
        config.type.includes('Network')
      ) {
        totalResearchProduction += production;
      } else if (
        config.type.includes('Grid') ||
        config.type.includes('Hub') ||
        config.type.includes('System') ||
        config.type.includes('Array')
      ) {
        totalDefenseProduction += production;
      }
    }
  });

  // Apply collector efficiency upgrade
  const efficiencyMultiplier = 1 + upgrades.collectorEfficiency * 0.1;
  totalEnergyProduction *= efficiencyMultiplier;

  // Add resources
  state.resources.quantumEnergy += totalEnergyProduction;
  state.resources.quantumCrystals += totalCrystalProduction;
  state.resources.researchData += totalResearchProduction;
  state.resources.defensePoints += totalDefenseProduction;
};

export const updatePlayTime = (state: GameState) => {
  state.statistics.playTime += 1;
};

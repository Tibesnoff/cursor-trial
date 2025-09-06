import type { GameState } from 'src/types';

export const generatePassiveEnergy = (state: GameState) => {
  const { buildings } = state;

  // Calculate production from non-energy buildings only
  const buildingConfigs = [
    // Material Buildings
    {
      type: 'crystalMines',
      baseProduction: 2,
    },
    {
      type: 'quantumRefineries',
      baseProduction: 10,
    },
    {
      type: 'matterSynthesizers',
      baseProduction: 50,
    },
    {
      type: 'dimensionalExtractors',
      baseProduction: 250,
    },

    // Research Buildings
    {
      type: 'researchLabs',
      baseProduction: 3,
    },
    {
      type: 'dataCenters',
      baseProduction: 15,
    },
    {
      type: 'quantumComputers',
      baseProduction: 75,
    },
    {
      type: 'neuralNetworks',
      baseProduction: 375,
    },

    // Defense Buildings
    {
      type: 'powerGrids',
      baseProduction: 1,
    },
    {
      type: 'transportHubs',
      baseProduction: 5,
    },
    {
      type: 'defenseSystems',
      baseProduction: 25,
    },
    {
      type: 'communicationArrays',
      baseProduction: 125,
    },
  ];

  let totalCrystalProduction = 0;
  let totalResearchProduction = 0;
  let totalDefenseProduction = 0;

  buildingConfigs.forEach(config => {
    const buildingCount = buildings[config.type as keyof typeof buildings] || 0;
    if (buildingCount > 0) {
      const production = config.baseProduction * buildingCount;

      // Categorize production by building type
      if (
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

  // Add resources (no energy production from facilities)
  state.resources.quantumCrystals += totalCrystalProduction;
  state.resources.researchData += totalResearchProduction;
  state.resources.defensePoints += totalDefenseProduction;
};

export const generateEnergyFromCollectors = (state: GameState) => {
  const { buildings, upgrades } = state;

  // Calculate energy production from energy buildings only
  const energyBuildings = [
    {
      type: 'basicCollectors',
      baseProduction: 1,
      count: buildings.basicCollectors,
    },
    {
      type: 'quantumReactors',
      baseProduction: 5,
      count: buildings.quantumReactors,
    },
    {
      type: 'stellarForges',
      baseProduction: 500,
      count: buildings.stellarForges,
    },
    {
      type: 'voidExtractors',
      baseProduction: 2500,
      count: buildings.voidExtractors,
    },
  ];

  let totalEnergyProduction = 0;
  energyBuildings.forEach(building => {
    totalEnergyProduction += building.baseProduction * building.count;
  });

  // Apply collector efficiency upgrade
  const efficiencyMultiplier = 1 + upgrades.collectorEfficiency * 0.1;
  totalEnergyProduction *= efficiencyMultiplier;

  // Add energy to resources
  state.resources.quantumEnergy += totalEnergyProduction;
};

export const updatePlayTime = (state: GameState) => {
  state.statistics.playTime += 1;
};

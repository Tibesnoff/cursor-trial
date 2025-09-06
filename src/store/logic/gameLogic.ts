import type { GameState } from 'src/types';

export const generatePassiveEnergy = (state: GameState) => {
  const { facilities } = state;

  // Calculate production from facilities only
  const facilityConfigs = [
    // Research Facilities
    {
      type: 'researchLabs',
      baseProduction: 3,
      category: 'research',
    },
    {
      type: 'dataCenters',
      baseProduction: 15,
      category: 'research',
    },
    {
      type: 'quantumComputers',
      baseProduction: 75,
      category: 'research',
    },
    {
      type: 'neuralNetworks',
      baseProduction: 375,
      category: 'research',
    },

    // Defense Facilities
    {
      type: 'powerGrids',
      baseProduction: 1,
      category: 'defense',
    },
    {
      type: 'transportHubs',
      baseProduction: 5,
      category: 'defense',
    },
    {
      type: 'defenseSystems',
      baseProduction: 25,
      category: 'defense',
    },
    {
      type: 'communicationArrays',
      baseProduction: 125,
      category: 'defense',
    },
  ];

  let totalResearchProduction = 0;
  let totalDefenseProduction = 0;

  facilityConfigs.forEach(config => {
    const facilityCount =
      facilities[config.type as keyof typeof facilities] || 0;
    if (facilityCount > 0) {
      const production = config.baseProduction * facilityCount;

      // Categorize production by facility type
      if (config.category === 'research') {
        totalResearchProduction += production;
      } else if (config.category === 'defense') {
        totalDefenseProduction += production;
      }
    }
  });

  // Add resources (no energy or crystal production from facilities)
  state.resources.researchData += totalResearchProduction;
  state.resources.defensePoints += totalDefenseProduction;
};

export const generateEnergyFromCollectors = (state: GameState) => {
  const { energyCollectors, crystalCollectors, upgrades } = state;

  // Calculate energy production from energy collectors
  const energyProduction =
    energyCollectors.basicCollectors * 1 +
    energyCollectors.quantumReactors * 5 +
    energyCollectors.stellarForges * 50 +
    energyCollectors.voidExtractors * 500;

  // Calculate crystal production from crystal collectors
  const crystalProduction =
    crystalCollectors.basicMines * 1 +
    crystalCollectors.quantumDrills * 5 +
    crystalCollectors.stellarExtractors * 50 +
    crystalCollectors.voidHarvesters * 500;

  // Apply efficiency upgrades
  const energyEfficiencyMultiplier = 1 + upgrades.collectorEfficiency * 0.1;
  const crystalEfficiencyMultiplier = 1 + upgrades.crystalEfficiency * 0.1;

  // Add resources
  state.resources.quantumEnergy += Math.floor(
    energyProduction * energyEfficiencyMultiplier
  );
  state.resources.quantumCrystals += Math.floor(
    crystalProduction * crystalEfficiencyMultiplier
  );
};

export const updatePlayTime = (state: GameState) => {
  state.statistics.playTime += 1;
};

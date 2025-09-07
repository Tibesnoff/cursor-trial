import type { GameState } from 'src/types';
import { calculateCollectorEfficiency, calculateEnergyClickPower } from '../../utils/upgradeCalculations';

export const generatePassiveEnergy = (state: GameState) => {
  const { research, defense } = state;

  // Calculate research data production
  const researchProduction =
    research.researchLabs * 3 +
    research.dataCenters * 15 +
    research.quantumComputers * 75 +
    research.neuralNetworks * 375;

  // Calculate defense points production
  const defenseProduction =
    defense.powerGrids * 1 +
    defense.transportHubs * 5 +
    defense.defenseSystems * 25 +
    defense.communicationArrays * 125;

  state.resources.researchData += researchProduction;
  state.resources.defensePoints += defenseProduction;
};

export const generateEnergyFromCollectors = (state: GameState) => {
  const { energyCollectors, crystalCollectors } = state;

  // Calculate energy production from energy collectors (including all tiers)
  const energyProduction =
    energyCollectors.basicCollectors * 1 +
    energyCollectors.quantumReactors * 5 +
    energyCollectors.stellarForges * 50 +
    energyCollectors.voidExtractors * 500 +
    energyCollectors.dimensionalRifts * 5000 +
    energyCollectors.cosmicGenerators * 50000;

  // Calculate crystal production from crystal collectors (including all tiers)
  const crystalProduction =
    crystalCollectors.basicMines * 1 +
    crystalCollectors.quantumDrills * 5 +
    crystalCollectors.stellarExtractors * 50 +
    crystalCollectors.voidHarvesters * 500 +
    crystalCollectors.dimensionalMines * 5000 +
    crystalCollectors.cosmicRefineries * 50000;

  // Apply efficiency upgrades from new upgrade system
  const energyEfficiencyMultiplier = calculateCollectorEfficiency(
    state,
    'energy'
  );
  const crystalEfficiencyMultiplier = calculateCollectorEfficiency(
    state,
    'crystal'
  );

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

export const processAutoClicker = (state: GameState) => {
  const autoClickerLevel = state.upgrades.energyUpgrades.auto_clicker || 0;
  
  if (autoClickerLevel > 0) {
    // Calculate autoclicker speed (faster with higher levels)
    const clickInterval = Math.max(1, 5 - autoClickerLevel); // 5s, 4s, 3s, 2s, 1s
    
    // Check if it's time to auto-click (every X seconds)
    if (state.statistics.playTime % clickInterval === 0) {
      // Calculate energy gained from autoclicker (same as manual click)
      let energyGained = calculateEnergyClickPower(state);
      
      // Apply click multiplier from research (legacy)
      energyGained *= state.upgrades.clickMultiplier;
      
      // Apply click chance (multi-click) (legacy)
      if (state.upgrades.clickChance > 0 && Math.random() < state.upgrades.clickChance) {
        energyGained *= 2; // Double click
      }
      
      // Add energy collector click power bonuses (legacy)
      energyGained += state.energyCollectors.basicCollectors * 1;
      energyGained += state.energyCollectors.quantumReactors * 2;
      energyGained += state.energyCollectors.stellarForges * 5;
      energyGained += state.energyCollectors.voidExtractors * 10;
      
      // Apply autoclicker efficiency bonus
      const autoClickerEfficiency = 1 + (autoClickerLevel * 0.1); // 10% bonus per level
      energyGained = Math.floor(energyGained * autoClickerEfficiency);
      
      state.resources.quantumEnergy += energyGained;
      state.statistics.totalEnergyEarned += energyGained;
    }
  }
};

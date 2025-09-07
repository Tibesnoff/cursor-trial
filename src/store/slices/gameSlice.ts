import { createSlice } from '@reduxjs/toolkit';
import type { GameState } from '../../types';
import * as collectorActions from '../actions/collectorActions';
import * as researchActions from '../actions/researchActions';
import * as defenseActions from '../actions/defenseActions';
import * as upgradeActions from '../actions/upgradeActions';
import {
  generatePassiveEnergy as generatePassiveEnergyLogic,
  generateEnergyFromCollectors as generateEnergyFromCollectorsLogic,
  updatePlayTime as updatePlayTimeLogic,
} from '../logic/gameLogic';

const initialState: GameState = {
  resources: {
    quantumEnergy: 0,
    quantumCrystals: 0,
    researchData: 0,
    defensePoints: 0,
  },
  // Energy Collectors (now modifiers/upgrades)
  energyCollectors: {
    basicCollectors: 0,
    quantumReactors: 0,
    stellarForges: 0,
    voidExtractors: 0,
    dimensionalRifts: 0,
    cosmicGenerators: 0,
  },
  // Crystal Collectors (new system)
  crystalCollectors: {
    basicMines: 0,
    quantumDrills: 0,
    stellarExtractors: 0,
    voidHarvesters: 0,
    dimensionalMines: 0,
    cosmicRefineries: 0,
  },
  // Research Facilities (generate research data)
  research: {
    researchLabs: 0,
    dataCenters: 0,
    quantumComputers: 0,
    neuralNetworks: 0,
  },
  // Defense Infrastructure (generate defense points)
  defense: {
    powerGrids: 0,
    transportHubs: 0,
    defenseSystems: 0,
    communicationArrays: 0,
  },
  upgrades: {
    clickPower: 1,
    collectorEfficiency: 1,
    crystalClickPower: 1,
    crystalEfficiency: 1,
    // Research-based click upgrades
    clickMultiplier: 1,
    clickBonus: 0,
    clickCostReduction: 0,
    clickChance: 0,
  },
  researchTree: {
    unlocked: ['basic_research'],
    completed: [],
  },
  unlockedTabs: ['clicker', 'stats'], // Start with quantum collector and analytics unlocked
  achievements: [],
  statistics: {
    totalClicks: 0,
    totalEnergyEarned: 0,
    totalCrystalsEarned: 0,
    playTime: 0,
  },
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    // Core Actions
    clickEnergy: state => {
      // Calculate energy gained from click power + research bonuses
      let energyGained = state.upgrades.clickPower + state.upgrades.clickBonus;

      // Apply click multiplier from research
      energyGained *= state.upgrades.clickMultiplier;

      // Apply click chance (multi-click)
      if (
        state.upgrades.clickChance > 0 &&
        Math.random() < state.upgrades.clickChance
      ) {
        energyGained *= 2; // Double click
      }

      // Add energy collector click power bonuses
      energyGained += state.energyCollectors.basicCollectors * 1;
      energyGained += state.energyCollectors.quantumReactors * 2;
      energyGained += state.energyCollectors.stellarForges * 5;
      energyGained += state.energyCollectors.voidExtractors * 10;

      state.resources.quantumEnergy += energyGained;
      state.statistics.totalClicks += 1;
      state.statistics.totalEnergyEarned += energyGained;
    },

    clickCrystals: state => {
      // Calculate crystals gained from click power + research bonuses
      let crystalGained =
        state.upgrades.crystalClickPower + state.upgrades.clickBonus;

      // Apply click multiplier from research
      crystalGained *= state.upgrades.clickMultiplier;

      // Apply click chance (multi-click)
      if (
        state.upgrades.clickChance > 0 &&
        Math.random() < state.upgrades.clickChance
      ) {
        crystalGained *= 2; // Double click
      }

      // Add crystal collector click power bonuses
      crystalGained += state.crystalCollectors.basicMines * 1;
      crystalGained += state.crystalCollectors.quantumDrills * 2;
      crystalGained += state.crystalCollectors.stellarExtractors * 5;
      crystalGained += state.crystalCollectors.voidHarvesters * 10;

      state.resources.quantumCrystals += crystalGained;
      state.statistics.totalClicks += 1;
      state.statistics.totalCrystalsEarned += crystalGained;
    },

    unlockTab: (state, action) => {
      const { tabId, cost } = action.payload;
      if (!state.unlockedTabs.includes(tabId)) {
        // Deduct costs
        if (cost.quantumEnergy) {
          state.resources.quantumEnergy -= cost.quantumEnergy;
        }
        if (cost.quantumCrystals) {
          state.resources.quantumCrystals -= cost.quantumCrystals;
        }
        if (cost.researchData) {
          state.resources.researchData -= cost.researchData;
        }

        state.unlockedTabs.push(tabId);
      }
    },

    // Development actions
    giveMaxResources: state => {
      state.resources.quantumEnergy = 999999999;
      state.resources.quantumCrystals = 999999999;
      state.resources.researchData = 999999999;
      state.resources.defensePoints = 999999999;
    },

    unlockAllTabs: state => {
      state.unlockedTabs = [
        'clicker',
        'crystals',
        'science',
        'defense',
        'stats',
      ];
    },

    // Save/Load actions
    loadGameState: (state, action) => {
      const loadedState = action.payload;
      if (loadedState) {
        // Replace entire state with loaded data
        Object.assign(state, loadedState);
      }
    },

    resetGameState: state => {
      // Reset to initial state
      Object.assign(state, initialState);
    },

    // Energy Collector Actions
    buyBasicCollector: collectorActions.buyBasicCollector,
    buyQuantumReactor: collectorActions.buyQuantumReactor,
    buyStellarForge: collectorActions.buyStellarForge,
    buyVoidExtractor: collectorActions.buyVoidExtractor,
    buyDimensionalRift: collectorActions.buyDimensionalRift,
    buyCosmicGenerator: collectorActions.buyCosmicGenerator,

    // Crystal Collector Actions
    buyBasicMine: collectorActions.buyBasicMine,
    buyQuantumDrill: collectorActions.buyQuantumDrill,
    buyStellarExtractor: collectorActions.buyStellarExtractor,
    buyVoidHarvester: collectorActions.buyVoidHarvester,
    buyDimensionalMine: collectorActions.buyDimensionalMine,
    buyCosmicRefinery: collectorActions.buyCosmicRefinery,

    // Research Facility Actions
    buyResearchLab: researchActions.buyResearchLab,
    buyDataCenter: researchActions.buyDataCenter,
    buyQuantumComputer: researchActions.buyQuantumComputer,
    buyNeuralNetwork: researchActions.buyNeuralNetwork,

    // Defense Facility Actions
    buyPowerGrid: defenseActions.buyPowerGrid,
    buyTransportHub: defenseActions.buyTransportHub,
    buyDefenseSystem: defenseActions.buyDefenseSystem,
    buyCommunicationArray: defenseActions.buyCommunicationArray,

    // Upgrade Actions
    upgradeClickPower: upgradeActions.upgradeClickPower,
    upgradeCollectorEfficiency: upgradeActions.upgradeCollectorEfficiency,
    upgradeCrystalClickPower: upgradeActions.upgradeCrystalClickPower,
    upgradeCrystalEfficiency: upgradeActions.upgradeCrystalEfficiency,

    // Research Actions
    unlockResearchNode: researchActions.unlockResearchNode,
    completeResearchNode: researchActions.completeResearchNode,

    // Game Logic Actions
    generatePassiveEnergy: generatePassiveEnergyLogic,
    generateEnergyFromCollectors: generateEnergyFromCollectorsLogic,
    updatePlayTime: updatePlayTimeLogic,
  },
});

export const { actions } = gameSlice;
export const {
  clickEnergy,
  clickCrystals,
  // Energy Collector Actions
  buyBasicCollector,
  buyQuantumReactor,
  buyStellarForge,
  buyVoidExtractor,
  buyDimensionalRift,
  buyCosmicGenerator,
  // Crystal Collector Actions
  buyBasicMine,
  buyQuantumDrill,
  buyStellarExtractor,
  buyVoidHarvester,
  buyDimensionalMine,
  buyCosmicRefinery,
  // Facility Actions
  buyResearchLab,
  buyDataCenter,
  buyQuantumComputer,
  buyNeuralNetwork,
  buyPowerGrid,
  buyTransportHub,
  buyDefenseSystem,
  buyCommunicationArray,
  // Upgrade Actions
  upgradeClickPower,
  upgradeCollectorEfficiency,
  upgradeCrystalClickPower,
  upgradeCrystalEfficiency,
  // Research Actions
  unlockResearchNode,
  completeResearchNode,
  // Game Logic Actions
  generatePassiveEnergy,
  generateEnergyFromCollectors,
  updatePlayTime,
  // Tab Actions
  unlockTab,
  // Development Actions
  giveMaxResources,
  unlockAllTabs,
  // Save/Load Actions
  loadGameState,
  resetGameState,
} = gameSlice.actions;

export default gameSlice.reducer;

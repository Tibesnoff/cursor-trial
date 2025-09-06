import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { GameState } from '../../types';

const initialState: GameState = {
  resources: {
    quantumEnergy: 0,
    quantumCrystals: 0,
    researchData: 0,
    defensePoints: 0,
  },
  buildings: {
    // Energy Buildings
    basicCollectors: 0,
    quantumReactors: 0,
    stellarForges: 0,
    voidExtractors: 0,
    // Material Buildings
    crystalMines: 0,
    quantumRefineries: 0,
    matterSynthesizers: 0,
    dimensionalExtractors: 0,
    // Research Buildings
    researchLabs: 0,
    dataCenters: 0,
    quantumComputers: 0,
    neuralNetworks: 0,
    // Defense Buildings
    powerGrids: 0,
    transportHubs: 0,
    defenseSystems: 0,
    communicationArrays: 0,
  },
  workers: {
    engineers: 0,
    scientists: 0,
    technicians: 0,
    operators: 0,
    researchers: 0,
    architects: 0,
  },
  upgrades: {
    clickPower: 1,
    collectorEfficiency: 1,
  },
  achievements: [],
  statistics: {
    totalClicks: 0,
    totalEnergyEarned: 0,
    playTime: 0,
  },
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    click: state => {
      const energyGained = state.upgrades.clickPower;
      state.resources.quantumEnergy += energyGained;
      state.statistics.totalClicks += 1;
      state.statistics.totalEnergyEarned += energyGained;
    },
    buyBasicCollector: state => {
      const cost = Math.floor(
        10 * Math.pow(1.15, state.buildings.basicCollectors)
      );
      if (state.resources.quantumEnergy >= cost) {
        state.resources.quantumEnergy -= cost;
        state.buildings.basicCollectors += 1;
      }
    },
    buyQuantumReactor: state => {
      const cost = Math.floor(
        50 * Math.pow(1.2, state.buildings.quantumReactors)
      );
      if (state.resources.quantumEnergy >= cost) {
        state.resources.quantumEnergy -= cost;
        state.buildings.quantumReactors += 1;
      }
    },
    buyStellarForge: state => {
      const cost = Math.floor(
        5000 * Math.pow(1.35, state.buildings.stellarForges)
      );
      if (state.resources.quantumEnergy >= cost) {
        state.resources.quantumEnergy -= cost;
        state.buildings.stellarForges += 1;
      }
    },
    buyVoidExtractor: state => {
      const cost = Math.floor(
        25000 * Math.pow(1.4, state.buildings.voidExtractors)
      );
      if (state.resources.quantumEnergy >= cost) {
        state.resources.quantumEnergy -= cost;
        state.buildings.voidExtractors += 1;
      }
    },
    // Material Buildings
    buyCrystalMine: state => {
      const cost = Math.floor(
        100 * Math.pow(1.2, state.buildings.crystalMines)
      );
      if (state.resources.quantumEnergy >= cost) {
        state.resources.quantumEnergy -= cost;
        state.buildings.crystalMines += 1;
      }
    },
    buyQuantumRefinery: state => {
      const cost = Math.floor(
        500 * Math.pow(1.25, state.buildings.quantumRefineries)
      );
      if (state.resources.quantumEnergy >= cost) {
        state.resources.quantumEnergy -= cost;
        state.buildings.quantumRefineries += 1;
      }
    },
    buyMatterSynthesizer: state => {
      const cost = Math.floor(
        2000 * Math.pow(1.3, state.buildings.matterSynthesizers)
      );
      if (state.resources.quantumEnergy >= cost) {
        state.resources.quantumEnergy -= cost;
        state.buildings.matterSynthesizers += 1;
      }
    },
    buyDimensionalExtractor: state => {
      const cost = Math.floor(
        10000 * Math.pow(1.35, state.buildings.dimensionalExtractors)
      );
      if (state.resources.quantumEnergy >= cost) {
        state.resources.quantumEnergy -= cost;
        state.buildings.dimensionalExtractors += 1;
      }
    },
    // Research Buildings
    buyResearchLab: state => {
      const cost = Math.floor(
        300 * Math.pow(1.2, state.buildings.researchLabs)
      );
      if (state.resources.quantumEnergy >= cost) {
        state.resources.quantumEnergy -= cost;
        state.buildings.researchLabs += 1;
      }
    },
    buyDataCenter: state => {
      const cost = Math.floor(
        1500 * Math.pow(1.25, state.buildings.dataCenters)
      );
      if (state.resources.quantumEnergy >= cost) {
        state.resources.quantumEnergy -= cost;
        state.buildings.dataCenters += 1;
      }
    },
    buyQuantumComputer: state => {
      const cost = Math.floor(
        7500 * Math.pow(1.3, state.buildings.quantumComputers)
      );
      if (state.resources.quantumEnergy >= cost) {
        state.resources.quantumEnergy -= cost;
        state.buildings.quantumComputers += 1;
      }
    },
    buyNeuralNetwork: state => {
      const cost = Math.floor(
        30000 * Math.pow(1.35, state.buildings.neuralNetworks)
      );
      if (state.resources.quantumEnergy >= cost) {
        state.resources.quantumEnergy -= cost;
        state.buildings.neuralNetworks += 1;
      }
    },
    // Infrastructure Buildings
    buyPowerGrid: state => {
      const cost = Math.floor(200 * Math.pow(1.2, state.buildings.powerGrids));
      if (state.resources.quantumEnergy >= cost) {
        state.resources.quantumEnergy -= cost;
        state.buildings.powerGrids += 1;
      }
    },
    buyTransportHub: state => {
      const cost = Math.floor(
        1000 * Math.pow(1.25, state.buildings.transportHubs)
      );
      if (state.resources.quantumEnergy >= cost) {
        state.resources.quantumEnergy -= cost;
        state.buildings.transportHubs += 1;
      }
    },
    buyDefenseSystem: state => {
      const cost = Math.floor(
        5000 * Math.pow(1.3, state.buildings.defenseSystems)
      );
      if (state.resources.quantumEnergy >= cost) {
        state.resources.quantumEnergy -= cost;
        state.buildings.defenseSystems += 1;
      }
    },
    buyCommunicationArray: state => {
      const cost = Math.floor(
        20000 * Math.pow(1.35, state.buildings.communicationArrays)
      );
      if (state.resources.quantumEnergy >= cost) {
        state.resources.quantumEnergy -= cost;
        state.buildings.communicationArrays += 1;
      }
    },
    hireEngineer: state => {
      const cost = Math.floor(25 * Math.pow(1.2, state.workers.engineers));
      if (state.resources.quantumEnergy >= cost) {
        state.resources.quantumEnergy -= cost;
        state.workers.engineers += 1;
      }
    },
    hireScientist: state => {
      const cost = Math.floor(100 * Math.pow(1.25, state.workers.scientists));
      if (state.resources.quantumEnergy >= cost) {
        state.resources.quantumEnergy -= cost;
        state.workers.scientists += 1;
      }
    },
    hireTechnician: state => {
      const cost = Math.floor(50 * Math.pow(1.22, state.workers.technicians));
      if (state.resources.quantumEnergy >= cost) {
        state.resources.quantumEnergy -= cost;
        state.workers.technicians += 1;
      }
    },
    hireOperator: state => {
      const cost = Math.floor(200 * Math.pow(1.3, state.workers.operators));
      if (state.resources.quantumEnergy >= cost) {
        state.resources.quantumEnergy -= cost;
        state.workers.operators += 1;
      }
    },
    hireResearcher: state => {
      const cost = Math.floor(500 * Math.pow(1.35, state.workers.researchers));
      if (state.resources.quantumEnergy >= cost) {
        state.resources.quantumEnergy -= cost;
        state.workers.researchers += 1;
      }
    },
    hireArchitect: state => {
      const cost = Math.floor(1000 * Math.pow(1.4, state.workers.architects));
      if (state.resources.quantumEnergy >= cost) {
        state.resources.quantumEnergy -= cost;
        state.workers.architects += 1;
      }
    },
    upgradeClickPower: state => {
      const cost = Math.floor(
        50 * Math.pow(1.5, state.upgrades.clickPower - 1)
      );
      if (state.resources.quantumEnergy >= cost) {
        state.resources.quantumEnergy -= cost;
        state.upgrades.clickPower += 1;
      }
    },
    upgradeCollectorEfficiency: state => {
      const cost = Math.floor(
        100 * Math.pow(2, state.upgrades.collectorEfficiency - 1)
      );
      if (state.resources.quantumEnergy >= cost) {
        state.resources.quantumEnergy -= cost;
        state.upgrades.collectorEfficiency += 1;
      }
    },
    addAchievement: (state, action: PayloadAction<string>) => {
      if (!state.achievements.includes(action.payload)) {
        state.achievements.push(action.payload);
      }
    },
    updatePlayTime: (state, action: PayloadAction<number>) => {
      state.statistics.playTime = action.payload;
    },
    generatePassiveEnergy: state => {
      // Calculate building-specific worker bonuses
      const getBuildingWorkerBonus = (recommendations: any) => {
        let bonus = 1;
        Object.entries(recommendations).forEach(([workerType, recommended]) => {
          if (!recommended) return;
          const current =
            state.workers[workerType as keyof typeof state.workers];
          const ratio = Math.min(current / (recommended as number), 1);
          bonus += ratio * 0.5; // 50% bonus per fully staffed recommendation
        });
        return bonus;
      };

      // Building configurations with recommended workers and resource production
      const buildingConfigs = [
        // Energy Buildings
        {
          count: state.buildings.basicCollectors,
          energyProduction: 1,
          crystalProduction: 0,
          researchProduction: 0,
          defenseProduction: 0,
          recommendedWorkers: {},
        },
        {
          count: state.buildings.quantumReactors,
          energyProduction: 5,
          crystalProduction: 0,
          researchProduction: 0,
          defenseProduction: 0,
          recommendedWorkers: { engineers: 1 },
        },
        {
          count: state.buildings.stellarForges,
          energyProduction: 500,
          crystalProduction: 0,
          researchProduction: 0,
          defenseProduction: 0,
          recommendedWorkers: { researchers: 1, architects: 1, engineers: 5 },
        },
        {
          count: state.buildings.voidExtractors,
          energyProduction: 2500,
          crystalProduction: 0,
          researchProduction: 0,
          defenseProduction: 0,
          recommendedWorkers: {
            researchers: 2,
            architects: 2,
            scientists: 2,
            operators: 3,
          },
        },
        // Material Buildings
        {
          count: state.buildings.crystalMines,
          energyProduction: 0,
          crystalProduction: 2,
          researchProduction: 0,
          defenseProduction: 0,
          recommendedWorkers: { engineers: 1, technicians: 1 },
        },
        {
          count: state.buildings.quantumRefineries,
          energyProduction: 0,
          crystalProduction: 10,
          researchProduction: 0,
          defenseProduction: 0,
          recommendedWorkers: { scientists: 1, engineers: 2 },
        },
        {
          count: state.buildings.matterSynthesizers,
          energyProduction: 0,
          crystalProduction: 50,
          researchProduction: 0,
          defenseProduction: 0,
          recommendedWorkers: { researchers: 1, scientists: 2, engineers: 1 },
        },
        {
          count: state.buildings.dimensionalExtractors,
          energyProduction: 0,
          crystalProduction: 250,
          researchProduction: 0,
          defenseProduction: 0,
          recommendedWorkers: { researchers: 2, architects: 1, scientists: 1 },
        },
        // Research Buildings
        {
          count: state.buildings.researchLabs,
          energyProduction: 0,
          crystalProduction: 0,
          researchProduction: 3,
          defenseProduction: 0,
          recommendedWorkers: { scientists: 1, researchers: 1 },
        },
        {
          count: state.buildings.dataCenters,
          energyProduction: 0,
          crystalProduction: 0,
          researchProduction: 15,
          defenseProduction: 0,
          recommendedWorkers: { technicians: 2, operators: 1 },
        },
        {
          count: state.buildings.quantumComputers,
          energyProduction: 0,
          crystalProduction: 0,
          researchProduction: 75,
          defenseProduction: 0,
          recommendedWorkers: { researchers: 2, scientists: 1, engineers: 1 },
        },
        {
          count: state.buildings.neuralNetworks,
          energyProduction: 0,
          crystalProduction: 0,
          researchProduction: 375,
          defenseProduction: 0,
          recommendedWorkers: { researchers: 3, architects: 1, scientists: 2 },
        },
        // Defense Buildings
        {
          count: state.buildings.powerGrids,
          energyProduction: 0,
          crystalProduction: 0,
          researchProduction: 0,
          defenseProduction: 1,
          recommendedWorkers: { engineers: 1, technicians: 1 },
        },
        {
          count: state.buildings.transportHubs,
          energyProduction: 0,
          crystalProduction: 0,
          researchProduction: 0,
          defenseProduction: 5,
          recommendedWorkers: { operators: 2, engineers: 1 },
        },
        {
          count: state.buildings.defenseSystems,
          energyProduction: 0,
          crystalProduction: 0,
          researchProduction: 0,
          defenseProduction: 25,
          recommendedWorkers: { engineers: 2, technicians: 1, operators: 1 },
        },
        {
          count: state.buildings.communicationArrays,
          energyProduction: 0,
          crystalProduction: 0,
          researchProduction: 0,
          defenseProduction: 125,
          recommendedWorkers: { architects: 1, engineers: 2, operators: 2 },
        },
      ];

      // Calculate total production with building-specific bonuses
      let totalEnergyProduction = 0;
      let totalCrystalProduction = 0;
      let totalResearchProduction = 0;
      let totalDefenseProduction = 0;

      buildingConfigs.forEach(building => {
        const workerBonus = getBuildingWorkerBonus(building.recommendedWorkers);
        totalEnergyProduction +=
          building.count * building.energyProduction * workerBonus;
        totalCrystalProduction +=
          building.count * building.crystalProduction * workerBonus;
        totalResearchProduction +=
          building.count * building.researchProduction * workerBonus;
        totalDefenseProduction +=
          building.count * building.defenseProduction * workerBonus;
      });

      // Global worker bonuses (for overall efficiency)
      const globalEngineerBonus = 1 + state.workers.engineers * 0.05; // 5% per engineer
      const globalTechnicianBonus = 1 + state.workers.technicians * 0.03; // 3% per technician
      const globalOperatorBonus = 1 + state.workers.operators * 0.08; // 8% per operator
      const globalResearcherBonus = 1 + state.workers.researchers * 0.1; // 10% per researcher

      const globalBonus =
        globalEngineerBonus *
        globalTechnicianBonus *
        globalOperatorBonus *
        globalResearcherBonus;

      // Apply global bonuses and collector efficiency
      const passiveEnergy = Math.floor(
        totalEnergyProduction * globalBonus * state.upgrades.collectorEfficiency
      );
      const passiveCrystals = Math.floor(totalCrystalProduction * globalBonus);
      const passiveResearch = Math.floor(totalResearchProduction * globalBonus);
      const passiveDefense = Math.floor(totalDefenseProduction * globalBonus);

      // Add resources
      state.resources.quantumEnergy += passiveEnergy;
      state.resources.quantumCrystals += passiveCrystals;
      state.resources.researchData += passiveResearch;
      state.resources.defensePoints += passiveDefense;

      state.statistics.totalEnergyEarned += passiveEnergy;
    },
  },
});

export const {
  click,
  buyBasicCollector,
  buyQuantumReactor,
  buyStellarForge,
  buyVoidExtractor,
  buyCrystalMine,
  buyQuantumRefinery,
  buyMatterSynthesizer,
  buyDimensionalExtractor,
  buyResearchLab,
  buyDataCenter,
  buyQuantumComputer,
  buyNeuralNetwork,
  buyPowerGrid,
  buyTransportHub,
  buyDefenseSystem,
  buyCommunicationArray,
  hireEngineer,
  hireScientist,
  hireTechnician,
  hireOperator,
  hireResearcher,
  hireArchitect,
  upgradeClickPower,
  upgradeCollectorEfficiency,
  addAchievement,
  updatePlayTime,
  generatePassiveEnergy,
} = gameSlice.actions;

export default gameSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import type { GameState } from '../../types';
import * as buildingActions from '../actions/buildingActions';
import * as workerActions from '../actions/workerActions';
import * as upgradeActions from '../actions/upgradeActions';
import {
  generatePassiveEnergy as generatePassiveEnergyLogic,
  updatePlayTime as updatePlayTimeLogic,
} from '../logic/gameLogic';

const initialState: GameState = {
  resources: {
    quantumEnergy: 0,
    quantumCrystals: 0,
    researchData: 0,
    defensePoints: 0,
  },
  buildings: {
    basicCollectors: 0,
    quantumReactors: 0,
    stellarForges: 0,
    voidExtractors: 0,
    crystalMines: 0,
    quantumRefineries: 0,
    matterSynthesizers: 0,
    dimensionalExtractors: 0,
    researchLabs: 0,
    dataCenters: 0,
    quantumComputers: 0,
    neuralNetworks: 0,
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
    // Core Actions
    click: state => {
      const energyGained = state.upgrades.clickPower;
      state.resources.quantumEnergy += energyGained;
      state.statistics.totalClicks += 1;
      state.statistics.totalEnergyEarned += energyGained;
    },

    // Building Actions
    buyBasicCollector: buildingActions.buyBasicCollector,
    buyQuantumReactor: buildingActions.buyQuantumReactor,
    buyStellarForge: buildingActions.buyStellarForge,
    buyVoidExtractor: buildingActions.buyVoidExtractor,
    buyCrystalMine: buildingActions.buyCrystalMine,
    buyQuantumRefinery: buildingActions.buyQuantumRefinery,
    buyMatterSynthesizer: buildingActions.buyMatterSynthesizer,
    buyDimensionalExtractor: buildingActions.buyDimensionalExtractor,
    buyResearchLab: buildingActions.buyResearchLab,
    buyDataCenter: buildingActions.buyDataCenter,
    buyQuantumComputer: buildingActions.buyQuantumComputer,
    buyNeuralNetwork: buildingActions.buyNeuralNetwork,
    buyPowerGrid: buildingActions.buyPowerGrid,
    buyTransportHub: buildingActions.buyTransportHub,
    buyDefenseSystem: buildingActions.buyDefenseSystem,
    buyCommunicationArray: buildingActions.buyCommunicationArray,

    // Worker Actions
    hireEngineer: workerActions.hireEngineer,
    hireTechnician: workerActions.hireTechnician,
    hireScientist: workerActions.hireScientist,
    hireOperator: workerActions.hireOperator,
    hireResearcher: workerActions.hireResearcher,
    hireArchitect: workerActions.hireArchitect,

    // Upgrade Actions
    upgradeClickPower: upgradeActions.upgradeClickPower,
    upgradeCollectorEfficiency: upgradeActions.upgradeCollectorEfficiency,

    // Game Logic Actions
    generatePassiveEnergy: generatePassiveEnergyLogic,
    updatePlayTime: updatePlayTimeLogic,
  },
});

export const { actions } = gameSlice;
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
  hireTechnician,
  hireScientist,
  hireOperator,
  hireResearcher,
  hireArchitect,
  upgradeClickPower,
  upgradeCollectorEfficiency,
  generatePassiveEnergy,
  updatePlayTime,
} = gameSlice.actions;

export default gameSlice.reducer;

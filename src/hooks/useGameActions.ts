import { useAppDispatch } from '../store/hooks';
import {
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
  unlockResearchNode,
  completeResearchNode,
  unlockTab,
  giveMaxResources,
  unlockAllTabs,
  loadGameState,
  resetGameState,
} from '../store/slices/gameSlice';

export const useGameActions = () => {
  const dispatch = useAppDispatch();

  return {
    // Click actions
    clickEnergy: () => dispatch(clickEnergy()),
    clickCrystals: () => dispatch(clickCrystals()),

    // Energy Collector Actions
    buyBasicCollector: () => dispatch(buyBasicCollector()),
    buyQuantumReactor: () => dispatch(buyQuantumReactor()),
    buyStellarForge: () => dispatch(buyStellarForge()),
    buyVoidExtractor: () => dispatch(buyVoidExtractor()),
    buyDimensionalRift: () => dispatch(buyDimensionalRift()),
    buyCosmicGenerator: () => dispatch(buyCosmicGenerator()),

    // Crystal Collector Actions
    buyBasicMine: () => dispatch(buyBasicMine()),
    buyQuantumDrill: () => dispatch(buyQuantumDrill()),
    buyStellarExtractor: () => dispatch(buyStellarExtractor()),
    buyVoidHarvester: () => dispatch(buyVoidHarvester()),
    buyDimensionalMine: () => dispatch(buyDimensionalMine()),
    buyCosmicRefinery: () => dispatch(buyCosmicRefinery()),

    // Facility Actions
    buyResearchLab: () => dispatch(buyResearchLab()),
    buyDataCenter: () => dispatch(buyDataCenter()),
    buyQuantumComputer: () => dispatch(buyQuantumComputer()),
    buyNeuralNetwork: () => dispatch(buyNeuralNetwork()),
    buyPowerGrid: () => dispatch(buyPowerGrid()),
    buyTransportHub: () => dispatch(buyTransportHub()),
    buyDefenseSystem: () => dispatch(buyDefenseSystem()),
    buyCommunicationArray: () => dispatch(buyCommunicationArray()),

    // Upgrade actions
    upgradeClickPower: () => dispatch(upgradeClickPower()),
    upgradeCollectorEfficiency: () => dispatch(upgradeCollectorEfficiency()),
    upgradeCrystalClickPower: () => dispatch(upgradeCrystalClickPower()),
    upgradeCrystalEfficiency: () => dispatch(upgradeCrystalEfficiency()),

    unlockResearchNode: (nodeId: string) =>
      dispatch(unlockResearchNode(nodeId)),
    completeResearchNode: (nodeId: string) =>
      dispatch(completeResearchNode(nodeId)),

    // Tab actions
    unlockTab: (tabId: string, cost: any) =>
      dispatch(unlockTab({ tabId, cost })),

    // Development actions
    giveMaxResources: () => dispatch(giveMaxResources()),
    unlockAllTabs: () => dispatch(unlockAllTabs()),

    // Save/Load actions
    loadGameState: (state: any) => dispatch(loadGameState(state)),
    resetGameState: () => dispatch(resetGameState()),
  };
};

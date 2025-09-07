import { useAppDispatch } from '../store/hooks';
import type { GameState } from '../types';
import { buyUpgrade } from '../store/actions/upgradeActions';
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
  // New Upgrade System
  incrementUpgrade,
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
    clickEnergy: () => dispatch(clickEnergy(undefined)),
    clickCrystals: () => dispatch(clickCrystals(undefined)),

    // Energy Collector Actions
    buyBasicCollector: () => dispatch(buyBasicCollector(undefined)),
    buyQuantumReactor: () => dispatch(buyQuantumReactor(undefined)),
    buyStellarForge: () => dispatch(buyStellarForge(undefined)),
    buyVoidExtractor: () => dispatch(buyVoidExtractor(undefined)),
    buyDimensionalRift: () => dispatch(buyDimensionalRift(undefined)),
    buyCosmicGenerator: () => dispatch(buyCosmicGenerator(undefined)),

    // Crystal Collector Actions
    buyBasicMine: () => dispatch(buyBasicMine(undefined)),
    buyQuantumDrill: () => dispatch(buyQuantumDrill(undefined)),
    buyStellarExtractor: () => dispatch(buyStellarExtractor(undefined)),
    buyVoidHarvester: () => dispatch(buyVoidHarvester(undefined)),
    buyDimensionalMine: () => dispatch(buyDimensionalMine(undefined)),
    buyCosmicRefinery: () => dispatch(buyCosmicRefinery(undefined)),

    // Facility Actions
    buyResearchLab: () => dispatch(buyResearchLab(undefined)),
    buyDataCenter: () => dispatch(buyDataCenter(undefined)),
    buyQuantumComputer: () => dispatch(buyQuantumComputer(undefined)),
    buyNeuralNetwork: () => dispatch(buyNeuralNetwork(undefined)),
    buyPowerGrid: () => dispatch(buyPowerGrid(undefined)),
    buyTransportHub: () => dispatch(buyTransportHub(undefined)),
    buyDefenseSystem: () => dispatch(buyDefenseSystem(undefined)),
    buyCommunicationArray: () => dispatch(buyCommunicationArray(undefined)),

    // Upgrade actions
    upgradeClickPower: () => dispatch(upgradeClickPower(undefined)),
    upgradeCollectorEfficiency: () =>
      dispatch(upgradeCollectorEfficiency(undefined)),
    upgradeCrystalClickPower: () =>
      dispatch(upgradeCrystalClickPower(undefined)),
    upgradeCrystalEfficiency: () =>
      dispatch(upgradeCrystalEfficiency(undefined)),
    // New Upgrade System
    buyUpgrade: (upgradeId: string) => dispatch(buyUpgrade(upgradeId)),
    incrementUpgrade: (upgradeId: string) =>
      dispatch(incrementUpgrade(upgradeId)),

    unlockResearchNode: (nodeId: string) =>
      dispatch(unlockResearchNode(nodeId)),
    completeResearchNode: (nodeId: string) =>
      dispatch(completeResearchNode(nodeId)),

    // Tab actions
    unlockTab: (tabId: string, cost: Record<string, number | undefined>) =>
      dispatch(unlockTab({ tabId, cost })),

    // Development actions
    giveMaxResources: () => dispatch(giveMaxResources(undefined)),
    unlockAllTabs: () => dispatch(unlockAllTabs(undefined)),

    // Save/Load actions
    loadGameState: (state: GameState) => dispatch(loadGameState(state)),
    resetGameState: () => dispatch(resetGameState(undefined)),
  };
};

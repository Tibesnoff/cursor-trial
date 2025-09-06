import { useAppDispatch } from '../store/hooks';
import {
  clickEnergy,
  clickCrystals,
  // Energy Collector Actions
  buyBasicCollector,
  buyQuantumReactor,
  buyStellarForge,
  buyVoidExtractor,
  // Crystal Collector Actions
  buyBasicMine,
  buyQuantumDrill,
  buyStellarExtractor,
  buyVoidHarvester,
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

    // Crystal Collector Actions
    buyBasicMine: () => dispatch(buyBasicMine()),
    buyQuantumDrill: () => dispatch(buyQuantumDrill()),
    buyStellarExtractor: () => dispatch(buyStellarExtractor()),
    buyVoidHarvester: () => dispatch(buyVoidHarvester()),

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
  };
};

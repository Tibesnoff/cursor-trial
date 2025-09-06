import { useAppDispatch } from '../store/hooks';
import {
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
  upgradeClickPower,
  upgradeCollectorEfficiency,
} from '../store/slices/gameSlice';

export const useGameActions = () => {
  const dispatch = useAppDispatch();

  return {
    // Click actions
    click: () => dispatch(click()),

    // Building purchase actions
    buyBasicCollector: () => dispatch(buyBasicCollector()),
    buyQuantumReactor: () => dispatch(buyQuantumReactor()),
    buyStellarForge: () => dispatch(buyStellarForge()),
    buyVoidExtractor: () => dispatch(buyVoidExtractor()),
    buyCrystalMine: () => dispatch(buyCrystalMine()),
    buyQuantumRefinery: () => dispatch(buyQuantumRefinery()),
    buyMatterSynthesizer: () => dispatch(buyMatterSynthesizer()),
    buyDimensionalExtractor: () => dispatch(buyDimensionalExtractor()),
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
  };
};

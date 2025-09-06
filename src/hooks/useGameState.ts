import { useAppSelector } from '../store/hooks';

export const useGameState = () => {
  return useAppSelector(state => state.game);
};

export const useResources = () => {
  return useAppSelector(state => state.game.resources);
};

export const useEnergyCollectors = () => {
  return useAppSelector(state => state.game.energyCollectors);
};

export const useCrystalCollectors = () => {
  return useAppSelector(state => state.game.crystalCollectors);
};

export const useFacilities = () => {
  return useAppSelector(state => state.game.facilities);
};

export const useUpgrades = () => {
  return useAppSelector(state => state.game.upgrades);
};

export const useStatistics = () => {
  return useAppSelector(state => state.game.statistics);
};

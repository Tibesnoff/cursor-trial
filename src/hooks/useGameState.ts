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

export const useResearch = () => {
  return useAppSelector(state => state.game.research);
};

export const useDefense = () => {
  return useAppSelector(state => state.game.defense);
};

export const useResearchTree = () => {
  return useAppSelector(state => state.game.researchTree);
};

export const useUpgrades = () => {
  return useAppSelector(state => state.game.upgrades);
};

export const useStatistics = () => {
  return useAppSelector(state => state.game.statistics);
};

export const useUnlockedTabs = () => {
  return useAppSelector(state => state.game.unlockedTabs);
};

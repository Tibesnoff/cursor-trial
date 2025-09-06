import { useAppSelector } from '../store/hooks';

export const useGameState = () => {
  return useAppSelector(state => state.game);
};

export const useResources = () => {
  return useAppSelector(state => state.game.resources);
};

export const useBuildings = () => {
  return useAppSelector(state => state.game.buildings);
};

export const useWorkers = () => {
  return useAppSelector(state => state.game.workers);
};

export const useUpgrades = () => {
  return useAppSelector(state => state.game.upgrades);
};

export const useStatistics = () => {
  return useAppSelector(state => state.game.statistics);
};

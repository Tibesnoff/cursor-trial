import type { GameState } from 'src/types';

// Worker hiring actions
export const hireEngineer = (state: GameState) => {
  const cost = Math.floor(50 * Math.pow(1.2, state.workers.engineers));
  if (state.resources.quantumEnergy >= cost) {
    state.resources.quantumEnergy -= cost;
    state.workers.engineers += 1;
  }
};

export const hireTechnician = (state: GameState) => {
  const cost = Math.floor(100 * Math.pow(1.25, state.workers.technicians));
  if (state.resources.quantumEnergy >= cost) {
    state.resources.quantumEnergy -= cost;
    state.workers.technicians += 1;
  }
};

export const hireScientist = (state: GameState) => {
  const cost = Math.floor(200 * Math.pow(1.3, state.workers.scientists));
  if (state.resources.quantumEnergy >= cost) {
    state.resources.quantumEnergy -= cost;
    state.workers.scientists += 1;
  }
};

export const hireOperator = (state: GameState) => {
  const cost = Math.floor(500 * Math.pow(1.35, state.workers.operators));
  if (state.resources.quantumEnergy >= cost) {
    state.resources.quantumEnergy -= cost;
    state.workers.operators += 1;
  }
};

export const hireResearcher = (state: GameState) => {
  const cost = Math.floor(1000 * Math.pow(1.4, state.workers.researchers));
  if (state.resources.quantumEnergy >= cost) {
    state.resources.quantumEnergy -= cost;
    state.workers.researchers += 1;
  }
};

export const hireArchitect = (state: GameState) => {
  const cost = Math.floor(2500 * Math.pow(1.45, state.workers.architects));
  if (state.resources.quantumEnergy >= cost) {
    state.resources.quantumEnergy -= cost;
    state.workers.architects += 1;
  }
};

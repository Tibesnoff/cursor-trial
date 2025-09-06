import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface GameState {
  resources: {
    quantumEnergy: number;
  };
  buildings: {
    basicCollectors: number;
  };
  upgrades: {
    clickPower: number;
    collectorEfficiency: number;
  };
  achievements: string[];
  statistics: {
    totalClicks: number;
    totalEnergyEarned: number;
    playTime: number;
  };
}

const initialState: GameState = {
  resources: {
    quantumEnergy: 0,
  },
  buildings: {
    basicCollectors: 0,
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
      const passiveEnergy =
        state.buildings.basicCollectors * state.upgrades.collectorEfficiency;
      state.resources.quantumEnergy += passiveEnergy;
      state.statistics.totalEnergyEarned += passiveEnergy;
    },
  },
});

export const {
  click,
  buyBasicCollector,
  upgradeClickPower,
  upgradeCollectorEfficiency,
  addAchievement,
  updatePlayTime,
  generatePassiveEnergy,
} = gameSlice.actions;

export default gameSlice.reducer;

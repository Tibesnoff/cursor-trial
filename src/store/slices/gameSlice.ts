import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface BuildingInstance {
  id: string;
  type: string;
  level: number;
  assignedWorkers: {
    engineers: number;
    scientists: number;
    technicians: number;
    operators: number;
    researchers: number;
    architects: number;
  };
}

export interface GameState {
  resources: {
    quantumEnergy: number;
  };
  buildings: {
    basicCollectors: number;
    quantumReactors: number;
    energyHarvesters: number;
    cosmicGenerators: number;
    stellarForges: number;
    voidExtractors: number;
  };
  buildingInstances: BuildingInstance[];
  workers: {
    engineers: number;
    scientists: number;
    technicians: number;
    operators: number;
    researchers: number;
    architects: number;
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
    quantumReactors: 0,
    energyHarvesters: 0,
    cosmicGenerators: 0,
    stellarForges: 0,
    voidExtractors: 0,
  },
  buildingInstances: [],
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

        // Create new building instance
        const newInstance: BuildingInstance = {
          id: `basicCollector_${Date.now()}`,
          type: 'basicCollectors',
          level: 1,
          assignedWorkers: {
            engineers: 0,
            scientists: 0,
            technicians: 0,
            operators: 0,
            researchers: 0,
            architects: 0,
          },
        };
        state.buildingInstances.push(newInstance);
      }
    },
    buyQuantumReactor: state => {
      const cost = Math.floor(
        50 * Math.pow(1.2, state.buildings.quantumReactors)
      );
      if (state.resources.quantumEnergy >= cost) {
        state.resources.quantumEnergy -= cost;
        state.buildings.quantumReactors += 1;

        // Create new building instance
        const newInstance: BuildingInstance = {
          id: `quantumReactor_${Date.now()}`,
          type: 'quantumReactors',
          level: 1,
          assignedWorkers: {
            engineers: 0,
            scientists: 0,
            technicians: 0,
            operators: 0,
            researchers: 0,
            architects: 0,
          },
        };
        state.buildingInstances.push(newInstance);
      }
    },
    buyEnergyHarvester: state => {
      const cost = Math.floor(
        200 * Math.pow(1.25, state.buildings.energyHarvesters)
      );
      if (state.resources.quantumEnergy >= cost) {
        state.resources.quantumEnergy -= cost;
        state.buildings.energyHarvesters += 1;

        // Create new building instance
        const newInstance: BuildingInstance = {
          id: `energyHarvester_${Date.now()}`,
          type: 'energyHarvesters',
          level: 1,
          assignedWorkers: {
            engineers: 0,
            scientists: 0,
            technicians: 0,
            operators: 0,
            researchers: 0,
            architects: 0,
          },
        };
        state.buildingInstances.push(newInstance);
      }
    },
    buyCosmicGenerator: state => {
      const cost = Math.floor(
        1000 * Math.pow(1.3, state.buildings.cosmicGenerators)
      );
      if (state.resources.quantumEnergy >= cost) {
        state.resources.quantumEnergy -= cost;
        state.buildings.cosmicGenerators += 1;

        // Create new building instance
        const newInstance: BuildingInstance = {
          id: `cosmicGenerator_${Date.now()}`,
          type: 'cosmicGenerators',
          level: 1,
          assignedWorkers: {
            engineers: 0,
            scientists: 0,
            technicians: 0,
            operators: 0,
            researchers: 0,
            architects: 0,
          },
        };
        state.buildingInstances.push(newInstance);
      }
    },
    buyStellarForge: state => {
      const cost = Math.floor(
        5000 * Math.pow(1.35, state.buildings.stellarForges)
      );
      if (state.resources.quantumEnergy >= cost) {
        state.resources.quantumEnergy -= cost;
        state.buildings.stellarForges += 1;

        // Create new building instance
        const newInstance: BuildingInstance = {
          id: `stellarForge_${Date.now()}`,
          type: 'stellarForges',
          level: 1,
          assignedWorkers: {
            engineers: 0,
            scientists: 0,
            technicians: 0,
            operators: 0,
            researchers: 0,
            architects: 0,
          },
        };
        state.buildingInstances.push(newInstance);
      }
    },
    buyVoidExtractor: state => {
      const cost = Math.floor(
        25000 * Math.pow(1.4, state.buildings.voidExtractors)
      );
      if (state.resources.quantumEnergy >= cost) {
        state.resources.quantumEnergy -= cost;
        state.buildings.voidExtractors += 1;

        // Create new building instance
        const newInstance: BuildingInstance = {
          id: `voidExtractor_${Date.now()}`,
          type: 'voidExtractors',
          level: 1,
          assignedWorkers: {
            engineers: 0,
            scientists: 0,
            technicians: 0,
            operators: 0,
            researchers: 0,
            architects: 0,
          },
        };
        state.buildingInstances.push(newInstance);
      }
    },
    hireEngineer: state => {
      const cost = Math.floor(25 * Math.pow(1.2, state.workers.engineers));
      if (state.resources.quantumEnergy >= cost) {
        state.resources.quantumEnergy -= cost;
        state.workers.engineers += 1;
      }
    },
    hireScientist: state => {
      const cost = Math.floor(100 * Math.pow(1.25, state.workers.scientists));
      if (state.resources.quantumEnergy >= cost) {
        state.resources.quantumEnergy -= cost;
        state.workers.scientists += 1;
      }
    },
    hireTechnician: state => {
      const cost = Math.floor(50 * Math.pow(1.22, state.workers.technicians));
      if (state.resources.quantumEnergy >= cost) {
        state.resources.quantumEnergy -= cost;
        state.workers.technicians += 1;
      }
    },
    hireOperator: state => {
      const cost = Math.floor(200 * Math.pow(1.3, state.workers.operators));
      if (state.resources.quantumEnergy >= cost) {
        state.resources.quantumEnergy -= cost;
        state.workers.operators += 1;
      }
    },
    hireResearcher: state => {
      const cost = Math.floor(500 * Math.pow(1.35, state.workers.researchers));
      if (state.resources.quantumEnergy >= cost) {
        state.resources.quantumEnergy -= cost;
        state.workers.researchers += 1;
      }
    },
    hireArchitect: state => {
      const cost = Math.floor(1000 * Math.pow(1.4, state.workers.architects));
      if (state.resources.quantumEnergy >= cost) {
        state.resources.quantumEnergy -= cost;
        state.workers.architects += 1;
      }
    },
    assignWorkerToBuilding: (
      state,
      action: PayloadAction<{
        buildingId: string;
        workerType: keyof BuildingInstance['assignedWorkers'];
      }>
    ) => {
      const { buildingId, workerType } = action.payload;
      const building = state.buildingInstances.find(b => b.id === buildingId);
      const availableWorkers = state.workers[workerType];

      if (building && availableWorkers > 0) {
        building.assignedWorkers[workerType] += 1;
        state.workers[workerType] -= 1;
      }
    },
    unassignWorkerFromBuilding: (
      state,
      action: PayloadAction<{
        buildingId: string;
        workerType: keyof BuildingInstance['assignedWorkers'];
      }>
    ) => {
      const { buildingId, workerType } = action.payload;
      const building = state.buildingInstances.find(b => b.id === buildingId);

      if (building && building.assignedWorkers[workerType] > 0) {
        building.assignedWorkers[workerType] -= 1;
        state.workers[workerType] += 1;
      }
    },
    upgradeBuilding: (state, action: PayloadAction<{ buildingId: string }>) => {
      const { buildingId } = action.payload;
      const building = state.buildingInstances.find(b => b.id === buildingId);

      if (building) {
        const upgradeCost = Math.floor(100 * Math.pow(2, building.level - 1));
        if (state.resources.quantumEnergy >= upgradeCost) {
          state.resources.quantumEnergy -= upgradeCost;
          building.level += 1;
        }
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
      // Calculate building-specific worker bonuses
      const getBuildingWorkerBonus = (recommendations: any) => {
        let bonus = 1;
        Object.entries(recommendations).forEach(([workerType, recommended]) => {
          if (!recommended) return;
          const current =
            state.workers[workerType as keyof typeof state.workers];
          const ratio = Math.min(current / (recommended as number), 1);
          bonus += ratio * 0.5; // 50% bonus per fully staffed recommendation
        });
        return bonus;
      };

      // Building configurations with recommended workers
      const buildingConfigs = [
        {
          count: state.buildings.basicCollectors,
          baseProduction: 1,
          recommendedWorkers: {},
        },
        {
          count: state.buildings.quantumReactors,
          baseProduction: 5,
          recommendedWorkers: { engineers: 1 },
        },
        {
          count: state.buildings.energyHarvesters,
          baseProduction: 20,
          recommendedWorkers: { engineers: 2, technicians: 1 },
        },
        {
          count: state.buildings.cosmicGenerators,
          baseProduction: 100,
          recommendedWorkers: { scientists: 1, engineers: 3, operators: 1 },
        },
        {
          count: state.buildings.stellarForges,
          baseProduction: 500,
          recommendedWorkers: { researchers: 1, architects: 1, engineers: 5 },
        },
        {
          count: state.buildings.voidExtractors,
          baseProduction: 2500,
          recommendedWorkers: {
            researchers: 2,
            architects: 2,
            scientists: 2,
            operators: 3,
          },
        },
      ];

      // Calculate total production with building-specific bonuses
      let totalProduction = 0;
      buildingConfigs.forEach(building => {
        const workerBonus = getBuildingWorkerBonus(building.recommendedWorkers);
        totalProduction +=
          building.count * building.baseProduction * workerBonus;
      });

      // Global worker bonuses (for overall efficiency)
      const globalEngineerBonus = 1 + state.workers.engineers * 0.05; // 5% per engineer
      const globalTechnicianBonus = 1 + state.workers.technicians * 0.03; // 3% per technician
      const globalOperatorBonus = 1 + state.workers.operators * 0.08; // 8% per operator
      const globalResearcherBonus = 1 + state.workers.researchers * 0.1; // 10% per researcher

      const globalBonus =
        globalEngineerBonus *
        globalTechnicianBonus *
        globalOperatorBonus *
        globalResearcherBonus;

      const passiveEnergy = Math.floor(
        totalProduction * globalBonus * state.upgrades.collectorEfficiency
      );
      state.resources.quantumEnergy += passiveEnergy;
      state.statistics.totalEnergyEarned += passiveEnergy;
    },
  },
});

export const {
  click,
  buyBasicCollector,
  buyQuantumReactor,
  buyEnergyHarvester,
  buyCosmicGenerator,
  buyStellarForge,
  buyVoidExtractor,
  hireEngineer,
  hireScientist,
  hireTechnician,
  hireOperator,
  hireResearcher,
  hireArchitect,
  assignWorkerToBuilding,
  unassignWorkerFromBuilding,
  upgradeBuilding,
  upgradeClickPower,
  upgradeCollectorEfficiency,
  addAchievement,
  updatePlayTime,
  generatePassiveEnergy,
} = gameSlice.actions;

export default gameSlice.reducer;

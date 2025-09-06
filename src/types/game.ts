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
    quantumCrystals: number;
    researchData: number;
    defensePoints: number;
  };
  buildings: {
    // Energy Buildings
    basicCollectors: number;
    quantumReactors: number;
    stellarForges: number;
    voidExtractors: number;
    // Material Buildings
    crystalMines: number;
    quantumRefineries: number;
    matterSynthesizers: number;
    dimensionalExtractors: number;
    // Research Buildings
    researchLabs: number;
    dataCenters: number;
    quantumComputers: number;
    neuralNetworks: number;
    // Defense Buildings
    powerGrids: number;
    transportHubs: number;
    defenseSystems: number;
    communicationArrays: number;
  };
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

export interface Building {
  id: string;
  name: string;
  description: string;
  emoji: string;
  baseCost: number;
  costMultiplier: number;
  baseProduction: number;
  count: number;
  action: () => void;
  recommendedWorkers: {
    engineers?: number;
    scientists?: number;
    technicians?: number;
    operators?: number;
    researchers?: number;
    architects?: number;
  };
}

export interface BuildingGroup {
  id: string;
  name: string;
  description: string;
  color: string;
  buildings: Building[];
}

export interface WorkerType {
  key: keyof BuildingInstance['assignedWorkers'];
  name: string;
  emoji: string;
  color: string;
}

export interface ResourceType {
  key: keyof GameState['resources'];
  name: string;
  emoji: string;
  color: string;
  borderColor: string;
}

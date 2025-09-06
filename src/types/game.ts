export interface GameState {
  resources: {
    quantumEnergy: number;
    quantumCrystals: number;
    researchData: number;
    defensePoints: number;
  };
  // Energy Collectors (now modifiers/upgrades)
  energyCollectors: {
    basicCollectors: number;
    quantumReactors: number;
    stellarForges: number;
    voidExtractors: number;
  };
  // Crystal Collectors (new system)
  crystalCollectors: {
    basicMines: number;
    quantumDrills: number;
    stellarExtractors: number;
    voidHarvesters: number;
  };
  // Facilities (buildings) - now more expensive and expanded
  facilities: {
    // Research Facilities
    researchLabs: number;
    dataCenters: number;
    quantumComputers: number;
    neuralNetworks: number;
    // Defense Infrastructure
    powerGrids: number;
    transportHubs: number;
    defenseSystems: number;
    communicationArrays: number;
  };
  upgrades: {
    clickPower: number;
    collectorEfficiency: number;
    crystalClickPower: number;
    crystalEfficiency: number;
  };
  achievements: string[];
  statistics: {
    totalClicks: number;
    totalEnergyEarned: number;
    totalCrystalsEarned: number;
    playTime: number;
  };
}

export interface BuildingCost {
  quantumEnergy?: number;
  quantumCrystals?: number;
  researchData?: number;
  defensePoints?: number;
}

export interface Building {
  id: string;
  name: string;
  description: string;
  emoji: string;
  baseCost: BuildingCost;
  costMultiplier: number;
  baseProduction: number;
  count: number;
  action: () => void;
}

export interface BuildingGroup {
  id: string;
  name: string;
  description: string;
  color: string;
  buildings: Building[];
}

export interface ResourceType {
  key: keyof GameState['resources'];
  name: string;
  emoji: string;
  color: string;
  borderColor: string;
}

export interface CollectorConfig {
  id: string;
  name: string;
  description: string;
  emoji: string;
  baseCost: BuildingCost;
  costMultiplier: number;
  baseProduction: number;
  clickPower: number; // How much it adds to click power
}

export interface FacilityConfig {
  id: string;
  name: string;
  description: string;
  emoji: string;
  baseCost: BuildingCost;
  costMultiplier: number;
  baseProduction: number;
  category: 'material' | 'research' | 'defense';
}

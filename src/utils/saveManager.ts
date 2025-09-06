import type { GameState } from '../types';

// Simple encryption key (in production, this would be more secure)
const ENCRYPTION_KEY = 'quantum-clicker-2024-dev-key';

// Simple XOR encryption/decryption
function encrypt(text: string, key: string): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(
      text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    );
  }
  return result;
}

function decrypt(encryptedText: string, key: string): string {
  return encrypt(encryptedText, key); // XOR is symmetric
}

// Convert GameState to a compact string representation
export function serializeGameState(state: GameState): string {
  const saveData = {
    // Resources
    r: {
      qe: state.resources.quantumEnergy,
      qc: state.resources.quantumCrystals,
      rd: state.resources.researchData,
      dp: state.resources.defensePoints,
    },
    // Energy Collectors
    ec: {
      bc: state.energyCollectors.basicCollectors,
      qr: state.energyCollectors.quantumReactors,
      sf: state.energyCollectors.stellarForges,
      ve: state.energyCollectors.voidExtractors,
    },
    // Crystal Collectors
    cc: {
      bm: state.crystalCollectors.basicMines,
      qd: state.crystalCollectors.quantumDrills,
      se: state.crystalCollectors.stellarExtractors,
      vh: state.crystalCollectors.voidHarvesters,
    },
    // Research Facilities
    rf: {
      rl: state.research.researchLabs,
      dc: state.research.dataCenters,
      qc: state.research.quantumComputers,
      nn: state.research.neuralNetworks,
    },
    // Defense Infrastructure
    di: {
      pg: state.defense.powerGrids,
      th: state.defense.transportHubs,
      ds: state.defense.defenseSystems,
      ca: state.defense.communicationArrays,
    },
    // Upgrades
    u: {
      cp: state.upgrades.clickPower,
      ce: state.upgrades.collectorEfficiency,
      ccp: state.upgrades.crystalClickPower,
      cce: state.upgrades.crystalEfficiency,
    },
    // Research Tree
    rt: {
      u: state.researchTree.unlocked,
      c: state.researchTree.completed,
    },
    // Unlocked Tabs
    ut: state.unlockedTabs,
    // Achievements
    a: state.achievements,
    // Statistics
    s: {
      tc: state.statistics.totalClicks,
      tee: state.statistics.totalEnergyEarned,
      tce: state.statistics.totalCrystalsEarned,
      pt: state.statistics.playTime,
    },
  };

  // Convert to JSON string
  const jsonString = JSON.stringify(saveData);

  // Encrypt the data
  const encrypted = encrypt(jsonString, ENCRYPTION_KEY);

  // Convert to base64 for safe string transport
  return btoa(encrypted);
}

// Convert string back to GameState
export function deserializeGameState(encodedData: string): GameState | null {
  try {
    // Decode from base64
    const encrypted = atob(encodedData);

    // Decrypt the data
    const decrypted = decrypt(encrypted, ENCRYPTION_KEY);

    // Parse JSON
    const saveData = JSON.parse(decrypted);

    // Convert back to GameState format
    return {
      resources: {
        quantumEnergy: saveData.r.qe || 0,
        quantumCrystals: saveData.r.qc || 0,
        researchData: saveData.r.rd || 0,
        defensePoints: saveData.r.dp || 0,
      },
      energyCollectors: {
        basicCollectors: saveData.ec.bc || 0,
        quantumReactors: saveData.ec.qr || 0,
        stellarForges: saveData.ec.sf || 0,
        voidExtractors: saveData.ec.ve || 0,
      },
      crystalCollectors: {
        basicMines: saveData.cc.bm || 0,
        quantumDrills: saveData.cc.qd || 0,
        stellarExtractors: saveData.cc.se || 0,
        voidHarvesters: saveData.cc.vh || 0,
      },
      research: {
        researchLabs: saveData.rf.rl || 0,
        dataCenters: saveData.rf.dc || 0,
        quantumComputers: saveData.rf.qc || 0,
        neuralNetworks: saveData.rf.nn || 0,
      },
      defense: {
        powerGrids: saveData.di.pg || 0,
        transportHubs: saveData.di.th || 0,
        defenseSystems: saveData.di.ds || 0,
        communicationArrays: saveData.di.ca || 0,
      },
      upgrades: {
        clickPower: saveData.u.cp || 1,
        collectorEfficiency: saveData.u.ce || 1,
        crystalClickPower: saveData.u.ccp || 1,
        crystalEfficiency: saveData.u.cce || 1,
      },
      researchTree: {
        unlocked: saveData.rt.u || ['basic_research'],
        completed: saveData.rt.c || [],
      },
      unlockedTabs: saveData.ut || ['clicker', 'stats'],
      achievements: saveData.a || [],
      statistics: {
        totalClicks: saveData.s.tc || 0,
        totalEnergyEarned: saveData.s.tee || 0,
        totalCrystalsEarned: saveData.s.tce || 0,
        playTime: saveData.s.pt || 0,
      },
    };
  } catch (error) {
    console.error('Failed to deserialize game state:', error);
    return null;
  }
}

// Save to localStorage
export function saveToLocalStorage(state: GameState): boolean {
  try {
    const saveString = serializeGameState(state);
    localStorage.setItem('quantum-clicker-save', saveString);
    return true;
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
    return false;
  }
}

// Load from localStorage
export function loadFromLocalStorage(): GameState | null {
  try {
    const saveString = localStorage.getItem('quantum-clicker-save');
    if (!saveString) return null;

    return deserializeGameState(saveString);
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return null;
  }
}

// Export save data as a string (for manual copying/sharing)
export function exportSaveData(state: GameState): string {
  return serializeGameState(state);
}

// Import save data from a string
export function importSaveData(saveString: string): GameState | null {
  return deserializeGameState(saveString);
}

// Clear all save data
export function clearSaveData(): void {
  localStorage.removeItem('quantum-clicker-save');
}

// Check if save data exists
export function hasSaveData(): boolean {
  return localStorage.getItem('quantum-clicker-save') !== null;
}

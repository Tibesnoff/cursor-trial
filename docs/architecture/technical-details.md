# Technical Implementation Details

## 🛠️ Technology Stack

### Frontend Framework
- **React 18**: Modern React with concurrent features
- **TypeScript**: Full type safety and better developer experience
- **Vite**: Fast build tool and development server

### State Management
- **Redux Toolkit**: Modern Redux with less boilerplate
- **RTK Query**: Data fetching and caching (future use)
- **Immer**: Immutable state updates

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **Ant Design**: UI component library (minimal usage)
- **CSS Modules**: Component-scoped styles

### Development Tools
- **ESLint**: Code linting and quality
- **Prettier**: Code formatting
- **TypeScript Compiler**: Type checking
- **Vite HMR**: Hot module replacement

## 🏗️ Architecture Patterns

### 1. **Component Architecture**

#### Functional Components with Hooks
```typescript
const CollectorCard: React.FC<CollectorCardProps> = ({
  collector,
  count,
  onBuy,
  canAfford,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="collector-card">
      {/* Component JSX */}
    </div>
  );
};
```

#### Custom Hooks for Logic
```typescript
const useGameState = () => {
  const resources = useAppSelector(state => state.game.resources);
  const collectors = useAppSelector(state => state.game.energyCollectors);
  
  return { resources, collectors };
};
```

### 2. **State Management Pattern**

#### Redux Toolkit Slices
```typescript
const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    collectEnergy: (state, action) => {
      state.resources.quantumEnergy += action.payload;
    },
    buyCollector: (state, action) => {
      const { collectorType, cost } = action.payload;
      // Deduct cost and increment collector
    },
  },
});
```

#### Action Creators
```typescript
export const buyBasicCollector = createAction<BuildingCost>('collectors/buyBasicCollector');

export const buyBasicCollectorAsync = createAsyncThunk(
  'collectors/buyBasicCollector',
  async (cost: BuildingCost, { getState, dispatch }) => {
    const state = getState() as RootState;
    if (canAffordCost(state.game, cost)) {
      dispatch(deductCost(cost));
      dispatch(incrementCollector('basicCollector'));
    }
  }
);
```

### 3. **Configuration Pattern**

#### Centralized Game Data
```typescript
export const ENERGY_COLLECTORS = {
  basicCollector: {
    id: 'basicCollector',
    name: 'Basic Collector',
    emoji: '⚡',
    baseCost: { quantumEnergy: 10 },
    baseProduction: { quantumEnergy: 1 },
    costMultiplier: 1.15,
  },
  // ... more collectors
};
```

#### Type-Safe Configuration
```typescript
interface CollectorConfig {
  id: string;
  name: string;
  emoji: string;
  baseCost: BuildingCost;
  baseProduction: BuildingCost;
  costMultiplier: number;
}
```

## 🔄 Data Flow Architecture

### 1. **User Interaction Flow**
```
User Click → Event Handler → Action Dispatch → Redux Store → Component Re-render
```

### 2. **Resource Generation Flow**
```
Game Loop → Production Calculation → Resource Update → UI Update → Save State
```

### 3. **Save/Load Flow**
```
Game State → Serialization → XOR Encryption → Base64 Encoding → Local Storage
```

## 🎯 Performance Optimizations

### 1. **React Performance**

#### Memoization
```typescript
const ExpensiveComponent = React.memo(({ data }) => {
  const processedData = useMemo(() => {
    return expensiveCalculation(data);
  }, [data]);
  
  const handleClick = useCallback(() => {
    // Handle click
  }, []);
  
  return <div onClick={handleClick}>{processedData}</div>;
});
```

#### Selective Re-renders
```typescript
// Only re-render when specific state changes
const resources = useAppSelector(state => state.game.resources);
const collectors = useAppSelector(state => state.game.energyCollectors);
```

### 2. **State Management Performance**

#### Normalized State
```typescript
interface GameState {
  resources: {
    quantumEnergy: number;
    quantumCrystals: number;
    researchData: number;
    defensePoints: number;
  };
  // Flat structure for efficient updates
  energyCollectors: Record<string, number>;
  crystalCollectors: Record<string, number>;
}
```

#### Efficient Selectors
```typescript
const selectTotalEnergyProduction = createSelector(
  [(state: RootState) => state.game.energyCollectors],
  (collectors) => {
    return Object.entries(collectors).reduce((total, [type, count]) => {
      const collector = ENERGY_COLLECTORS[type];
      return total + (collector.baseProduction.quantumEnergy * count);
    }, 0);
  }
);
```

### 3. **Bundle Optimization**

#### Code Splitting
```typescript
const LazyComponent = React.lazy(() => import('./LazyComponent'));

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <LazyComponent />
  </Suspense>
);
```

#### Tree Shaking
```typescript
// Import only what you need
import { createAction } from '@reduxjs/toolkit';
import { useState } from 'react';
```

## 🔐 Security Implementation

### 1. **Save Data Encryption**

#### XOR Encryption
```typescript
const encrypt = (data: string, key: string): string => {
  let result = '';
  for (let i = 0; i < data.length; i++) {
    result += String.fromCharCode(
      data.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    );
  }
  return btoa(result); // Base64 encode
};
```

#### Secure Key Generation
```typescript
const generateKey = (): string => {
  return btoa(Math.random().toString(36).substring(2, 15));
};
```

### 2. **Input Validation**

#### Type Guards
```typescript
const isValidGameState = (data: unknown): data is GameState => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'resources' in data &&
    'energyCollectors' in data
  );
};
```

#### Sanitization
```typescript
const sanitizeInput = (input: string): string => {
  return input.replace(/[<>]/g, ''); // Remove potential XSS
};
```

## 📊 Data Management

### 1. **Local Storage Strategy**

#### Automatic Saving
```typescript
const useAutoSave = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      saveGameState();
    }, 30000); // Save every 30 seconds
    
    return () => clearInterval(interval);
  }, []);
};
```

#### Save on Unload
```typescript
useEffect(() => {
  const handleBeforeUnload = () => {
    saveGameState();
  };
  
  window.addEventListener('beforeunload', handleBeforeUnload);
  return () => window.removeEventListener('beforeunload', handleBeforeUnload);
}, []);
```

### 2. **State Persistence**

#### Serialization
```typescript
const serializeGameState = (state: GameState): string => {
  return JSON.stringify({
    resources: state.resources,
    energyCollectors: state.energyCollectors,
    crystalCollectors: state.crystalCollectors,
    research: state.research,
    defense: state.defense,
    upgrades: state.upgrades,
    statistics: state.statistics,
    unlockedTabs: state.unlockedTabs,
  });
};
```

#### Deserialization with Validation
```typescript
const deserializeGameState = (data: string): GameState | null => {
  try {
    const parsed = JSON.parse(data);
    if (isValidGameState(parsed)) {
      return parsed;
    }
  } catch (error) {
    console.error('Failed to deserialize game state:', error);
  }
  return null;
};
```

## 🎮 Game Logic Implementation

### 1. **Resource Calculation**

#### Production Calculation
```typescript
const calculateProduction = (
  collectors: Record<string, number>,
  collectorConfigs: Record<string, CollectorConfig>
): number => {
  return Object.entries(collectors).reduce((total, [type, count]) => {
    const config = collectorConfigs[type];
    return total + (config.baseProduction.quantumEnergy * count);
  }, 0);
};
```

#### Cost Calculation
```typescript
const calculateCost = (
  baseCost: BuildingCost,
  count: number,
  multiplier: number
): BuildingCost => {
  const scaledCost = Math.floor(baseCost.quantumEnergy * Math.pow(multiplier, count));
  return { quantumEnergy: scaledCost };
};
```

### 2. **Research Tree Logic**

#### Prerequisite Checking
```typescript
const canResearch = (
  nodeId: string,
  researchTree: Record<string, boolean>
): boolean => {
  const node = RESEARCH_NODES[nodeId];
  return node.prerequisites.every(prereq => researchTree[prereq]);
};
```

#### Effect Application
```typescript
const applyResearchEffects = (state: GameState): GameState => {
  const effects = getActiveResearchEffects(state.researchTree);
  
  return {
    ...state,
    upgrades: {
      ...state.upgrades,
      clickMultiplier: state.upgrades.clickMultiplier + effects.clickMultiplier,
      clickBonus: state.upgrades.clickBonus + effects.clickBonus,
    },
  };
};
```

## 🔧 Development Tools Integration

### 1. **TypeScript Configuration**

#### Strict Type Checking
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
```

#### Path Mapping
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "src/*": ["src/*"]
    }
  }
}
```

### 2. **ESLint Configuration**

#### React Rules
```json
{
  "extends": [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "@typescript-eslint/recommended"
  ],
  "rules": {
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": "error"
  }
}
```

### 3. **Vite Configuration**

#### Build Optimization
```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
        },
      },
    },
  },
});
```

This technical documentation provides deep insights into the implementation details and architectural decisions of the Quantum Clicker game.

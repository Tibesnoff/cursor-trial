# Project Structure & Architecture

## 📁 Directory Structure

```
src/
├── components/              # React components organized by purpose
│   ├── collectors/         # Collector-related components
│   │   ├── CollectorCard.tsx
│   │   ├── CollectorsGrid.tsx
│   │   ├── CollectSection.tsx
│   │   ├── ProductionSection.tsx
│   │   └── index.ts
│   ├── common/             # Shared components
│   │   ├── CollectorScreen.tsx
│   │   ├── ResearchTree.tsx
│   │   └── index.ts
│   ├── game/               # Game-specific components
│   │   ├── screens/        # Main game screens
│   │   │   ├── QuantumCollectorScreen.tsx
│   │   │   ├── CrystalMineScreen.tsx
│   │   │   ├── ScienceScreen.tsx
│   │   │   ├── DefenseScreen.tsx
│   │   │   ├── MiscScreen.tsx
│   │   │   └── index.ts
│   │   ├── tabs/           # Tab components
│   │   │   ├── AnalyticsTab.tsx
│   │   │   ├── SettingsTab.tsx
│   │   │   ├── AchievementsTab.tsx
│   │   │   └── index.ts
│   │   ├── upgrades/       # Upgrade components
│   │   │   ├── QuantumCollectorUpgrades.tsx
│   │   │   ├── CrystalMineUpgrades.tsx
│   │   │   └── index.ts
│   │   ├── Header.tsx
│   │   └── index.ts
│   ├── navigation/         # Navigation components
│   │   ├── CustomNavItem.tsx
│   │   ├── CustomNavItem.css
│   │   ├── NavSubItem.tsx
│   │   └── index.ts
│   ├── ui/                 # Reusable UI components
│   │   ├── display/        # Display components
│   │   │   ├── StickyResourceBar.tsx
│   │   │   ├── CostDisplay.tsx
│   │   │   ├── StatsDisplay.tsx
│   │   │   ├── ResourceDisplay.tsx
│   │   │   └── index.ts
│   │   ├── forms/          # Form components
│   │   │   ├── SaveManager.tsx
│   │   │   └── index.ts
│   │   ├── layout/         # Layout components
│   │   │   ├── PageHeader.tsx
│   │   │   └── index.ts
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── index.ts
│   ├── GameContainer.tsx   # Main game container
│   ├── SidebarNavigation.tsx
│   ├── TopNavigation.tsx
│   ├── StatisticsPanel.tsx
│   └── index.ts
├── config/                 # Game configuration
│   ├── collectors.ts
│   ├── defense.ts
│   ├── research.ts
│   └── index.ts
├── constants/              # Game constants
│   ├── game.ts
│   └── index.ts
├── hooks/                  # Custom React hooks
│   ├── useAutoSave.ts
│   ├── useGameActions.ts
│   ├── useGameState.ts
│   └── index.ts
├── store/                  # Redux store and logic
│   ├── actions/            # Redux actions
│   │   ├── collectorActions.ts
│   │   ├── defenseActions.ts
│   │   ├── researchActions.ts
│   │   ├── upgradeActions.ts
│   │   └── index.ts
│   ├── logic/              # Game logic functions
│   │   └── gameLogic.ts
│   ├── slices/             # Redux slices
│   │   └── gameSlice.ts
│   ├── hooks.ts
│   └── index.ts
├── types/                  # TypeScript type definitions
│   ├── game.ts
│   └── index.ts
├── utils/                  # Utility functions
│   ├── clickCalculations.ts
│   ├── game.ts
│   ├── saveManager.ts
│   └── index.ts
├── App.tsx
├── main.tsx
├── index.css
└── vite-env.d.ts
```

## 🏗️ Architecture Overview

### Component Organization

#### 1. **Collectors** (`src/components/collectors/`)
Components specifically for collector management and display:
- `CollectorCard`: Individual collector display with purchase options
- `CollectorsGrid`: Grid layout for multiple collectors
- `CollectSection`: Active collection (click button, upgrades)
- `ProductionSection`: Passive production display

#### 2. **Common** (`src/components/common/`)
Shared components used across multiple game areas:
- `BuildingCard`: Generic building display component
- `CollectorScreen`: Reusable collector screen layout
- `DropdownTab`: Tab dropdown functionality
- `ResearchTree`: Interactive research tree visualization

#### 3. **Game** (`src/components/game/`)
Game-specific components organized by function:

**Screens** (`screens/`): Main game screens for each tab
- `QuantumCollectorScreen`: Energy collection and management
- `CrystalMineScreen`: Crystal collection and management
- `ScienceScreen`: Research tree and science production
- `DefenseScreen`: Defense systems (placeholder)
- `MiscScreen`: Analytics, settings, achievements

**Tabs** (`tabs/`): Individual tab content components
- `AnalyticsTab`: Game statistics and analytics
- `SettingsTab`: Game settings and save management
- `AchievementsTab`: Achievement system (placeholder)

**Upgrades** (`upgrades/`): Upgrade and production components
- `QuantumCollectorUpgrades`: Energy-specific upgrades
- `CrystalMineUpgrades`: Crystal-specific upgrades
- `ScienceProduction`: Science production management

#### 4. **Navigation** (`src/components/navigation/`)
Navigation-specific components:
- `CustomNavItem`: Custom navigation item with dropdown support
- `NavSubItem`: Sub-navigation item component
- `CustomNavItem.css`: Navigation-specific styles

#### 5. **UI** (`src/components/ui/`)
Reusable UI components organized by purpose:

**Display** (`display/`): Information display components
- `StickyResourceBar`: Persistent resource display
- `CostDisplay`: Cost formatting and display
- `StatsDisplay`: Statistics display
- `ResourceDisplay`: Resource information display

**Forms** (`forms/`): Form and input components
- `SaveManager`: Save/load functionality

**Layout** (`layout/`): Layout and structural components
- `PageHeader`: Page header component

### State Management

#### Redux Store Structure
```typescript
interface GameState {
  // Resources
  resources: {
    quantumEnergy: number;
    quantumCrystals: number;
    researchData: number;
    defensePoints: number;
  };
  
  // Collectors
  energyCollectors: Record<string, number>;
  crystalCollectors: Record<string, number>;
  
  // Research & Defense
  research: Record<string, boolean>;
  defense: Record<string, number>;
  researchTree: Record<string, boolean>;
  
  // Upgrades
  upgrades: {
    clickPower: number;
    crystalClickPower: number;
    clickMultiplier: number;
    clickBonus: number;
    clickCostReduction: number;
    clickChance: number;
  };
  
  // Statistics
  statistics: {
    totalClicks: number;
    totalEnergyEarned: number;
    totalCrystalsEarned: number;
    playTime: number;
  };
  
  // UI State
  unlockedTabs: string[];
  activeTab: string;
}
```

#### Action Organization
- **collectorActions.ts**: All collector-related actions (buy, upgrade, collect)
- **researchActions.ts**: Research tree and science actions
- **defenseActions.ts**: Defense system actions (future)
- **upgradeActions.ts**: Click power and efficiency upgrades

### Configuration System

#### Game Configuration Files
- **collectors.ts**: Collector definitions, costs, and production rates
- **research.ts**: Research tree nodes and effects
- **defense.ts**: Defense upgrades and systems
- **buildings.ts**: Legacy building system (being phased out)

### Utility Functions

#### Core Utilities
- **saveManager.ts**: Save/load system with encryption
- **clickCalculations.ts**: Click power and upgrade calculations
- **game.ts**: General game utility functions

### Custom Hooks

#### State Management Hooks
- **useGameState.ts**: Redux state selectors
- **useGameActions.ts**: Redux action dispatchers
- **useAutoSave.ts**: Automatic save functionality

## 🔄 Data Flow

### 1. User Interaction Flow
```
User Click → Action Dispatch → Redux Store Update → Component Re-render
```

### 2. Resource Generation Flow
```
Collectors → Production Calculation → Resource Update → UI Update
```

### 3. Save/Load Flow
```
Game State → Serialization → Encryption → Local Storage
Local Storage → Decryption → Deserialization → Game State
```

## 🎯 Design Patterns

### 1. **Component Composition**
- Small, focused components that can be composed together
- Clear separation of concerns between display and logic
- Reusable components with configurable props

### 2. **State Management**
- Centralized state in Redux store
- Immutable state updates
- Action-based state changes

### 3. **Configuration-Driven**
- Game data separated from code logic
- Easy to modify game balance without code changes
- Type-safe configuration with TypeScript

### 4. **Modular Architecture**
- Clear folder structure with specific purposes
- Index files for clean imports
- Separation of UI, logic, and data

## 🚀 Performance Considerations

### 1. **Component Optimization**
- React.memo for expensive components
- useCallback for event handlers
- useMemo for expensive calculations

### 2. **State Management**
- Selective subscriptions to avoid unnecessary re-renders
- Normalized state structure
- Efficient action dispatching

### 3. **Bundle Optimization**
- Code splitting by route/feature
- Tree shaking for unused code
- Optimized imports

This architecture provides a solid foundation for a scalable, maintainable incremental game with clear separation of concerns and efficient state management.

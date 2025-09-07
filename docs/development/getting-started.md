# Development Guide

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+**: Required for modern JavaScript features
- **Yarn**: Package manager (recommended over npm)
- **Git**: Version control
- **VS Code**: Recommended IDE with TypeScript support

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd cursor-trial

# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build
```

### Available Scripts
- `yarn dev` - Start development server with hot reload
- `yarn build` - Build optimized production bundle
- `yarn lint` - Run ESLint for code quality
- `yarn lint:fix` - Automatically fix ESLint errors
- `yarn format` - Format code with Prettier
- `yarn format:check` - Check code formatting

## 🏗️ Development Workflow

### 1. **Setting Up Your Environment**
```bash
# Install VS Code extensions (recommended)
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension bradlc.vscode-tailwindcss
code --install-extension esbenp.prettier-vscode
code --install-extension ms-vscode.vscode-eslint
```

### 2. **Project Structure Understanding**
- **Components**: Organized by purpose (collectors, game, ui, navigation)
- **Store**: Redux state management with actions and slices
- **Config**: Game configuration files (collectors, research, etc.)
- **Types**: TypeScript type definitions
- **Utils**: Utility functions and helpers

### 3. **Adding New Features**

#### Adding a New Collector
1. **Define in config** (`src/config/collectors.ts`):
```typescript
export const NEW_COLLECTOR = {
  id: 'newCollector',
  name: 'New Collector',
  emoji: '🆕',
  description: 'A new type of collector',
  baseCost: { quantumEnergy: 1000 },
  baseProduction: { quantumEnergy: 10 },
  costMultiplier: 1.15,
};
```

2. **Add to Redux state** (`src/store/slices/gameSlice.ts`):
```typescript
interface GameState {
  energyCollectors: {
    // ... existing collectors
    newCollector: number;
  };
}
```

3. **Create actions** (`src/store/actions/collectorActions.ts`):
```typescript
export const buyNewCollector = createAction<BuildingCost>('collectors/buyNewCollector');
```

4. **Update reducer** to handle the new action

#### Adding a New Research Node
1. **Define in config** (`src/config/research.ts`):
```typescript
export const NEW_RESEARCH = {
  id: 'newResearch',
  name: 'New Research',
  description: 'Unlocks new capabilities',
  cost: { researchData: 100 },
  effects: ['new_effect'],
  prerequisites: ['existingResearch'],
};
```

2. **Add to research tree** and update effects handling

#### Adding a New UI Component
1. **Create component file** in appropriate folder
2. **Add to index.ts** for clean imports
3. **Update parent components** to use new component
4. **Add TypeScript types** if needed

### 4. **Code Style Guidelines**

#### TypeScript
- Use strict type checking
- Define interfaces for all props and state
- Avoid `any` type - use specific types instead
- Use type guards for runtime type checking

#### React Components
- Use functional components with hooks
- Keep components small and focused
- Use proper prop types and default values
- Implement proper error boundaries

#### Redux
- Use Redux Toolkit for all state management
- Keep actions simple and focused
- Use selectors for derived state
- Maintain immutable state updates

#### Styling
- Use Tailwind CSS classes
- Follow mobile-first responsive design
- Use consistent spacing and colors
- Create reusable component styles

### 5. **Testing Strategy**

#### Unit Tests
```bash
# Add testing framework (when implemented)
yarn add -D @testing-library/react @testing-library/jest-dom vitest
```

#### Component Testing
- Test component rendering
- Test user interactions
- Test prop handling
- Test error states

#### State Testing
- Test action creators
- Test reducers
- Test selectors
- Test async actions

### 6. **Performance Optimization**

#### React Performance
- Use `React.memo` for expensive components
- Use `useCallback` for event handlers
- Use `useMemo` for expensive calculations
- Avoid unnecessary re-renders

#### Bundle Optimization
- Use dynamic imports for code splitting
- Optimize images and assets
- Remove unused dependencies
- Use tree shaking effectively

#### Game Performance
- Optimize large number calculations
- Use efficient data structures
- Implement proper cleanup
- Monitor memory usage

### 7. **Debugging**

#### Development Tools
- **React DevTools**: Component inspection
- **Redux DevTools**: State debugging
- **VS Code Debugger**: Breakpoint debugging
- **Browser DevTools**: Network and performance

#### Common Issues
- **State not updating**: Check action dispatching
- **Component not re-rendering**: Check dependencies
- **Type errors**: Verify type definitions
- **Build failures**: Check import paths

### 8. **Git Workflow**

#### Branch Strategy
- `main`: Production-ready code
- `develop`: Integration branch
- `feature/*`: New features
- `bugfix/*`: Bug fixes
- `hotfix/*`: Critical fixes

#### Commit Messages
```
feat: add new collector type
fix: resolve click upgrade cost calculation
docs: update README with new features
refactor: reorganize component structure
test: add unit tests for collector actions
```

### 9. **Deployment**

#### Development Deployment
```bash
# Build for development
yarn build

# Serve locally
yarn preview
```

#### Production Deployment
```bash
# Build optimized bundle
yarn build

# Deploy to hosting service
# (Vercel, Netlify, GitHub Pages, etc.)
```

### 10. **Contributing Guidelines**

#### Code Review Process
1. Create feature branch
2. Implement changes with tests
3. Run linting and formatting
4. Create pull request
5. Address review feedback
6. Merge to main branch

#### Documentation
- Update README for major changes
- Add JSDoc comments for complex functions
- Update type definitions
- Document breaking changes

#### Quality Checklist
- [ ] Code follows style guidelines
- [ ] TypeScript types are correct
- [ ] Components are properly tested
- [ ] Performance is acceptable
- [ ] Documentation is updated
- [ ] No console errors or warnings

## 🔧 Troubleshooting

### Common Development Issues

#### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules yarn.lock
yarn install
yarn build
```

#### Type Errors
- Check import paths
- Verify type definitions
- Update TypeScript version if needed

#### Hot Reload Issues
- Restart development server
- Clear browser cache
- Check for syntax errors

#### Performance Issues
- Use React DevTools Profiler
- Check for memory leaks
- Optimize expensive operations

This development guide provides a comprehensive overview of how to work with the Quantum Clicker codebase effectively.

import { useGameState, useGameActions } from 'src/hooks';
import { ENERGY_COLLECTORS } from 'src/config';
import { CollectorScreen } from 'src/components/common';

const QuantumCollectorScreen = () => {
    const { energyCollectors, upgrades } = useGameState();
    const { clickEnergy, buyBasicCollector, buyQuantumReactor, buyStellarForge, buyVoidExtractor, buyDimensionalRift, buyCosmicGenerator, upgradeClickPower } = useGameActions();

    // Calculate energy production from collectors
    const calculateEnergyProduction = () => {
        const production =
            energyCollectors.basicCollectors * 1 +
            energyCollectors.quantumReactors * 5 +
            energyCollectors.stellarForges * 50 +
            energyCollectors.voidExtractors * 500 +
            energyCollectors.dimensionalRifts * 5000 +
            energyCollectors.cosmicGenerators * 50000;

        // Apply collector efficiency upgrade
        const efficiencyMultiplier = 1 + upgrades.collectorEfficiency * 0.1;
        return Math.floor(production * efficiencyMultiplier);
    };

    // Click power is now just from upgrades
    const clickPower = upgrades.clickPower;

    const energyProduction = calculateEnergyProduction();

    // Calculate click upgrade cost (matches upgradeActions.ts)
    const clickUpgradeCost = {
        quantumEnergy: Math.floor(10 * Math.pow(1.5, upgrades.clickPower - 1))
    };

    const buyActions = {
        basicCollectors: buyBasicCollector,
        quantumReactors: buyQuantumReactor,
        stellarForges: buyStellarForge,
        voidExtractors: buyVoidExtractor,
        dimensionalRifts: buyDimensionalRift,
        cosmicGenerators: buyCosmicGenerator,
    };

    return (
        <CollectorScreen
            title="⚡ Quantum Collector"
            description="Click to harvest quantum energy from the cosmic void"
            collectors={ENERGY_COLLECTORS}
            collectorCounts={energyCollectors}
            production={energyProduction}
            clickPower={clickPower}
            buyActions={buyActions}
            onCollect={clickEnergy}
            onUpgradeClick={upgradeClickPower}
            resourceEmoji="⚡"
            resourceName="Energy"
            clickUpgradeCost={clickUpgradeCost}
        />
    );
};

export default QuantumCollectorScreen;

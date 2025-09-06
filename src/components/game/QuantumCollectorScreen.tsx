import { useGameState, useGameActions } from 'src/hooks';
import { ENERGY_COLLECTORS } from 'src/config';
import { CollectorScreen } from 'src/components/common';

const QuantumCollectorScreen = () => {
    const { energyCollectors, upgrades } = useGameState();
    const { clickEnergy, buyBasicCollector, buyQuantumReactor, buyStellarForge, buyVoidExtractor } = useGameActions();

    // Calculate energy production from collectors
    const calculateEnergyProduction = () => {
        const production =
            energyCollectors.basicCollectors * 1 +
            energyCollectors.quantumReactors * 5 +
            energyCollectors.stellarForges * 50 +
            energyCollectors.voidExtractors * 500;

        // Apply collector efficiency upgrade
        const efficiencyMultiplier = 1 + upgrades.collectorEfficiency * 0.1;
        return Math.floor(production * efficiencyMultiplier);
    };

    // Calculate click power from collectors
    const calculateClickPower = () => {
        return energyCollectors.basicCollectors * 1 +
            energyCollectors.quantumReactors * 2 +
            energyCollectors.stellarForges * 5 +
            energyCollectors.voidExtractors * 10;
    };

    const energyProduction = calculateEnergyProduction();
    const clickPower = calculateClickPower();

    const buyActions = {
        basicCollectors: buyBasicCollector,
        quantumReactors: buyQuantumReactor,
        stellarForges: buyStellarForge,
        voidExtractors: buyVoidExtractor,
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
            resourceEmoji="⚡"
            resourceName="Energy"
        />
    );
};

export default QuantumCollectorScreen;

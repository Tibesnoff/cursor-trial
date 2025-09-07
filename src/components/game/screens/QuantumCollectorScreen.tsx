import { useGameState, useGameActions } from 'src/hooks';
import { ENERGY_COLLECTORS } from 'src/config';
import { CollectorScreen } from 'src/components/common';
import { calculateClickPowerIncrease } from 'src/utils/clickCalculations';
import QuantumCollectorUpgrades from '../upgrades/QuantumCollectorUpgrades';

interface QuantumCollectorScreenProps {
    activeSubTab?: 'collectors' | 'upgrades';
}

const QuantumCollectorScreen = ({ activeSubTab = 'collectors' }: QuantumCollectorScreenProps) => {
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

    // Calculate click upgrade cost (matches upgradeActions.ts tiered scaling)
    const calculateClickUpgradeCost = (level: number) => {
        if (level < 20) {
            return 5 + level * 5;
        } else if (level < 40) {
            return 100 + (level - 20) * 100;
        } else if (level < 60) {
            return 2000 + (level - 40) * 100;
        } else if (level < 80) {
            return 4000 + (level - 60) * 100;
        } else {
            return Math.floor(6000 * Math.pow(1.1, level - 80));
        }
    };

    const baseCost = calculateClickUpgradeCost(upgrades.clickPower);
    const finalCost = Math.floor(baseCost * (1 - upgrades.clickCostReduction));

    const clickUpgradeCost = {
        quantumEnergy: finalCost
    };

    // Calculate click power increase for next upgrade
    const clickPowerIncrease = calculateClickPowerIncrease(upgrades.clickPower);

    const buyActions = {
        basicCollectors: buyBasicCollector,
        quantumReactors: buyQuantumReactor,
        stellarForges: buyStellarForge,
        voidExtractors: buyVoidExtractor,
        dimensionalRifts: buyDimensionalRift,
        cosmicGenerators: buyCosmicGenerator,
    };

    return (
        <div className="space-y-6">
            {activeSubTab === 'collectors' && (
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
                    clickPowerIncrease={clickPowerIncrease}
                />
            )}

            {activeSubTab === 'upgrades' && <QuantumCollectorUpgrades />}
        </div>
    );
};

export default QuantumCollectorScreen;

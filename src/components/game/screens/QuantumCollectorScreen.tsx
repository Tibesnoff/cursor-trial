import { useGameState, useGameActions } from 'src/hooks';
import { ENERGY_COLLECTORS } from 'src/config';
import { CollectorScreen } from 'src/components/common';
import { calculateEnergyClickPower, calculateCollectorEfficiency, calculateClickPowerIncrease, calculateAutoClickerSpeed, calculateAutoClickerEfficiency } from 'src/utils/upgradeCalculations';
import { calculateUpgradeCost, getCurrentUpgradeLevel } from 'src/store/actions/upgradeActions';
import QuantumCollectorUpgrades from '../upgrades/QuantumCollectorUpgrades';

interface QuantumCollectorScreenProps {
    activeSubTab?: 'collectors' | 'upgrades';
}

const QuantumCollectorScreen = ({ activeSubTab = 'collectors' }: QuantumCollectorScreenProps) => {
    const { energyCollectors, upgrades } = useGameState();
    const { clickEnergy, buyBasicCollector, buyQuantumReactor, buyStellarForge, buyVoidExtractor, buyDimensionalRift, buyCosmicGenerator, buyUpgrade } = useGameActions();

    // Calculate energy production from collectors
    const calculateEnergyProduction = () => {
        const production =
            energyCollectors.basicCollectors * 1 +
            energyCollectors.quantumReactors * 5 +
            energyCollectors.stellarForges * 50 +
            energyCollectors.voidExtractors * 500 +
            energyCollectors.dimensionalRifts * 5000 +
            energyCollectors.cosmicGenerators * 50000;

        // Apply collector efficiency from new upgrade system
        const efficiencyMultiplier = calculateCollectorEfficiency({ upgrades } as any, 'energy');
        return Math.floor(production * efficiencyMultiplier);
    };

    // Click power from new upgrade system
    const clickPower = calculateEnergyClickPower({ upgrades } as any);

    const energyProduction = calculateEnergyProduction();

    // Calculate click upgrade cost using new upgrade system
    const clickUpgradeId = 'energy_click_boost';
    const currentClickUpgradeLevel = getCurrentUpgradeLevel({ game: { upgrades } } as any, clickUpgradeId);
    const clickUpgradeCost = calculateUpgradeCost(clickUpgradeId, currentClickUpgradeLevel, { game: { upgrades } } as any);

    // Calculate click power increase for next upgrade
    const clickPowerIncrease = calculateClickPowerIncrease({ upgrades } as any, clickUpgradeId, 'energy');

    // Calculate autoclicker information
    const autoClickerLevel = upgrades.energyUpgrades.auto_clicker || 0;
    const autoClickerSpeed = calculateAutoClickerSpeed(autoClickerLevel);
    const autoClickerEfficiency = calculateAutoClickerEfficiency(autoClickerLevel);

    // Calculate autoclicker upgrade cost
    const autoClickerUpgradeId = 'auto_clicker';
    const currentAutoClickerLevel = getCurrentUpgradeLevel({ game: { upgrades } } as any, autoClickerUpgradeId);
    const autoClickerUpgradeCost = calculateUpgradeCost(autoClickerUpgradeId, currentAutoClickerLevel, { game: { upgrades } } as any);

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
                    onUpgradeClick={() => buyUpgrade(clickUpgradeId)}
                    resourceEmoji="⚡"
                    resourceName="Energy"
                    clickUpgradeCost={clickUpgradeCost}
                    clickPowerIncrease={clickPowerIncrease}
                    collectorType="energy"
                    autoClickerLevel={autoClickerLevel}
                    autoClickerSpeed={autoClickerSpeed}
                    autoClickerEfficiency={autoClickerEfficiency}
                    autoClickerUpgradeCost={autoClickerUpgradeCost}
                    onAutoClickerUpgrade={() => buyUpgrade(autoClickerUpgradeId)}
                />
            )}

            {activeSubTab === 'upgrades' && <QuantumCollectorUpgrades />}
        </div>
    );
};

export default QuantumCollectorScreen;

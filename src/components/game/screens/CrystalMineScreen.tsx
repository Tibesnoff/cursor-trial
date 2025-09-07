import { useGameState, useGameActions } from 'src/hooks';
import { CRYSTAL_COLLECTORS } from 'src/config';
import { CollectorScreen } from 'src/components/common';
import { calculateCrystalClickPowerIncrease } from 'src/utils/clickCalculations';
import CrystalMineUpgrades from '../upgrades/CrystalMineUpgrades';

interface CrystalMineScreenProps {
    activeSubTab?: 'collectors' | 'upgrades';
}

const CrystalMineScreen = ({ activeSubTab = 'collectors' }: CrystalMineScreenProps) => {
    const { crystalCollectors, upgrades } = useGameState();
    const { clickCrystals, buyBasicMine, buyQuantumDrill, buyStellarExtractor, buyVoidHarvester, buyDimensionalMine, buyCosmicRefinery, upgradeCrystalClickPower } = useGameActions();

    // Calculate crystal production from collectors
    const calculateCrystalProduction = () => {
        const production =
            crystalCollectors.basicMines * 1 +
            crystalCollectors.quantumDrills * 5 +
            crystalCollectors.stellarExtractors * 50 +
            crystalCollectors.voidHarvesters * 500 +
            crystalCollectors.dimensionalMines * 5000 +
            crystalCollectors.cosmicRefineries * 50000;

        // Apply crystal efficiency upgrade
        const efficiencyMultiplier = 1 + upgrades.crystalEfficiency * 0.1;
        return Math.floor(production * efficiencyMultiplier);
    };

    // Click power is now just from upgrades
    const clickPower = upgrades.crystalClickPower;

    const crystalProduction = calculateCrystalProduction();

    // Calculate click upgrade cost (matches upgradeActions.ts tiered scaling)
    const calculateCrystalClickUpgradeCost = (level: number) => {
        if (level < 20) {
            return 3 + level * 3;
        } else if (level < 40) {
            return 60 + (level - 20) * 60;
        } else if (level < 60) {
            return 1200 + (level - 40) * 60;
        } else if (level < 80) {
            return 2400 + (level - 60) * 60;
        } else {
            return Math.floor(3600 * Math.pow(1.1, level - 80));
        }
    };

    const baseCost = calculateCrystalClickUpgradeCost(upgrades.crystalClickPower);
    const finalCost = Math.floor(baseCost * (1 - upgrades.clickCostReduction));

    const clickUpgradeCost = {
        quantumCrystals: finalCost
    };

    // Calculate crystal click power increase for next upgrade
    const clickPowerIncrease = calculateCrystalClickPowerIncrease(upgrades.crystalClickPower);

    const buyActions = {
        basicMines: buyBasicMine,
        quantumDrills: buyQuantumDrill,
        stellarExtractors: buyStellarExtractor,
        voidHarvesters: buyVoidHarvester,
        dimensionalMines: buyDimensionalMine,
        cosmicRefineries: buyCosmicRefinery,
    };

    return (
        <div className="space-y-6">
            {activeSubTab === 'collectors' && (
                <CollectorScreen
                    title="💎 Crystal Mine"
                    description="Click to extract quantum crystals from dimensional pockets"
                    collectors={CRYSTAL_COLLECTORS}
                    collectorCounts={crystalCollectors}
                    production={crystalProduction}
                    clickPower={clickPower}
                    buyActions={buyActions}
                    onCollect={clickCrystals}
                    onUpgradeClick={upgradeCrystalClickPower}
                    resourceEmoji="💎"
                    resourceName="Crystals"
                    clickUpgradeCost={clickUpgradeCost}
                    clickPowerIncrease={clickPowerIncrease}
                />
            )}

            {activeSubTab === 'upgrades' && <CrystalMineUpgrades />}
        </div>
    );
};

export default CrystalMineScreen;

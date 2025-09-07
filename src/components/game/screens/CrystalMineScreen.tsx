import { useGameState, useGameActions } from 'src/hooks';
import { CRYSTAL_COLLECTORS } from 'src/config';
import { CollectorScreen } from 'src/components/common';
import { calculateCrystalClickPower, calculateCollectorEfficiency, calculateClickPowerIncrease } from 'src/utils/upgradeCalculations';
import { calculateUpgradeCost, getCurrentUpgradeLevel } from 'src/store/actions/upgradeActions';
import CrystalMineUpgrades from '../upgrades/CrystalMineUpgrades';

interface CrystalMineScreenProps {
    activeSubTab?: 'collectors' | 'upgrades';
}

const CrystalMineScreen = ({ activeSubTab = 'collectors' }: CrystalMineScreenProps) => {
    const { crystalCollectors, upgrades } = useGameState();
    const { clickCrystals, buyBasicMine, buyQuantumDrill, buyStellarExtractor, buyVoidHarvester, buyDimensionalMine, buyCosmicRefinery, buyUpgrade } = useGameActions();

    // Calculate crystal production from collectors
    const calculateCrystalProduction = () => {
        const production =
            crystalCollectors.basicMines * 1 +
            crystalCollectors.quantumDrills * 5 +
            crystalCollectors.stellarExtractors * 50 +
            crystalCollectors.voidHarvesters * 500 +
            crystalCollectors.dimensionalMines * 5000 +
            crystalCollectors.cosmicRefineries * 50000;

        // Apply crystal efficiency from new upgrade system
        const efficiencyMultiplier = calculateCollectorEfficiency({ upgrades } as any, 'crystal');
        return Math.floor(production * efficiencyMultiplier);
    };

    // Click power from new upgrade system
    const clickPower = calculateCrystalClickPower({ upgrades } as any);

    const crystalProduction = calculateCrystalProduction();

    // Calculate click upgrade cost using new upgrade system
    const clickUpgradeId = 'crystal_click_boost';
    const currentClickUpgradeLevel = getCurrentUpgradeLevel({ game: { upgrades } } as any, clickUpgradeId);
    const clickUpgradeCost = calculateUpgradeCost(clickUpgradeId, currentClickUpgradeLevel, { game: { upgrades } } as any);

    // Calculate click power increase for next upgrade
    const clickPowerIncrease = calculateClickPowerIncrease({ upgrades } as any, clickUpgradeId, 'crystal');

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
                    onUpgradeClick={() => buyUpgrade(clickUpgradeId)}
                    resourceEmoji="💎"
                    resourceName="Crystals"
                    clickUpgradeCost={clickUpgradeCost}
                    clickPowerIncrease={clickPowerIncrease}
                    collectorType="crystal"
                />
            )}

            {activeSubTab === 'upgrades' && <CrystalMineUpgrades />}
        </div>
    );
};

export default CrystalMineScreen;

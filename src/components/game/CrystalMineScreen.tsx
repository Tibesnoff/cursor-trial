import { useGameState, useGameActions } from 'src/hooks';
import { CRYSTAL_COLLECTORS } from 'src/config';
import { CollectorScreen } from 'src/components/common';

const CrystalMineScreen = () => {
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

    // Calculate click upgrade cost (matches upgradeActions.ts)
    const clickUpgradeCost = {
        quantumCrystals: Math.floor(5 * Math.pow(1.5, upgrades.crystalClickPower - 1))
    };

    const buyActions = {
        basicMines: buyBasicMine,
        quantumDrills: buyQuantumDrill,
        stellarExtractors: buyStellarExtractor,
        voidHarvesters: buyVoidHarvester,
        dimensionalMines: buyDimensionalMine,
        cosmicRefineries: buyCosmicRefinery,
    };

    return (
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
        />
    );
};

export default CrystalMineScreen;

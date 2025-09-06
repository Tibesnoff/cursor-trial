import { useGameState, useGameActions } from 'src/hooks';
import { CRYSTAL_COLLECTORS } from 'src/config';
import { CollectorScreen } from 'src/components/common';

const CrystalMineScreen = () => {
    const { crystalCollectors, upgrades } = useGameState();
    const { clickCrystals, buyBasicMine, buyQuantumDrill, buyStellarExtractor, buyVoidHarvester } = useGameActions();

    // Calculate crystal production from collectors
    const calculateCrystalProduction = () => {
        const production =
            crystalCollectors.basicMines * 1 +
            crystalCollectors.quantumDrills * 5 +
            crystalCollectors.stellarExtractors * 50 +
            crystalCollectors.voidHarvesters * 500;

        // Apply crystal efficiency upgrade
        const efficiencyMultiplier = 1 + upgrades.crystalEfficiency * 0.1;
        return Math.floor(production * efficiencyMultiplier);
    };

    // Calculate click power from collectors
    const calculateClickPower = () => {
        return crystalCollectors.basicMines * 1 +
            crystalCollectors.quantumDrills * 2 +
            crystalCollectors.stellarExtractors * 5 +
            crystalCollectors.voidHarvesters * 10;
    };

    const crystalProduction = calculateCrystalProduction();
    const clickPower = calculateClickPower();

    const buyActions = {
        basicMines: buyBasicMine,
        quantumDrills: buyQuantumDrill,
        stellarExtractors: buyStellarExtractor,
        voidHarvesters: buyVoidHarvester,
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
            resourceEmoji="💎"
            resourceName="Crystals"
        />
    );
};

export default CrystalMineScreen;

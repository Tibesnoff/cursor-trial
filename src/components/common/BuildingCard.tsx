import type { Building } from 'src/types';
import { getBuildingCost, canAfford, getResourceProductionText } from 'src/utils';
import { useResources } from 'src/hooks';
import { Button, Card } from 'src/components/ui';

interface BuildingCardProps {
    building: Building;
    onBuild: () => void;
    onClick?: () => void;
}

const BuildingCard = ({ building, onBuild, onClick }: BuildingCardProps) => {
    const resources = useResources();

    const cost = getBuildingCost(building.baseCost, building.costMultiplier, building.count);
    const affordable = canAfford(cost, resources);
    const productionText = getResourceProductionText(building.id, building.baseProduction);

    const formatCost = (costObj: typeof cost) => {
        const costParts = [];
        if (costObj.quantumEnergy) costParts.push(`${costObj.quantumEnergy.toLocaleString()} ⚡`);
        if (costObj.quantumCrystals) costParts.push(`${costObj.quantumCrystals.toLocaleString()} 💎`);
        if (costObj.researchData) costParts.push(`${costObj.researchData.toLocaleString()} 🧪`);
        if (costObj.defensePoints) costParts.push(`${costObj.defensePoints.toLocaleString()} 🛡️`);
        return costParts.join(' + ');
    };

    return (
        <Card
            variant="bordered"
            className="hover:bg-gray-700/50 transition-all cursor-pointer h-full flex flex-col"
            onClick={onClick}
        >
            <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">{building.emoji}</span>
                <div>
                    <h4 className="font-semibold text-white">{building.name}</h4>
                    <p className="text-sm text-gray-300">{productionText}</p>
                </div>
            </div>
            <p className="text-xs text-gray-400 mb-3 flex-grow">{building.description}</p>
            <div className="text-sm text-cyan-400 mb-3">Owned: {building.count}</div>
            <Button
                onClick={(e?: React.MouseEvent) => {
                    e?.stopPropagation();
                    onBuild();
                }}
                disabled={!affordable}
                variant={affordable ? 'success' : 'secondary'}
                size="sm"
                className="w-full mt-auto"
            >
                {affordable
                    ? `Build (${formatCost(cost)})`
                    : `Need ${formatCost(cost)}`}
            </Button>
        </Card>
    );
};

export default BuildingCard;

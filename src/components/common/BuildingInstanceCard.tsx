import type { BuildingInstance } from 'src/types';
import { Card } from 'src/components/ui';

interface BuildingInstanceCardProps {
    building: BuildingInstance;
    buildingInfo: {
        name: string;
        emoji: string;
        baseProduction: number;
    };
    onClick: () => void;
}

const BuildingInstanceCard = ({ building, buildingInfo, onClick }: BuildingInstanceCardProps) => {
    const totalAssignedWorkers = Object.values(building.assignedWorkers).reduce((sum: number, count: number) => sum + count, 0);

    return (
        <Card
            variant="bordered"
            className="cursor-pointer hover:bg-gray-700/50 transition-all border-gray-600 hover:border-blue-500"
            onClick={onClick}
        >
            <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">{buildingInfo.emoji}</span>
                <div>
                    <h4 className="font-semibold text-white">{buildingInfo.name}</h4>
                    <p className="text-sm text-gray-300">Level {building.level}</p>
                </div>
            </div>
            <div className="space-y-2">
                <div className="text-sm text-cyan-400">
                    Production: {buildingInfo.baseProduction * building.level} energy/sec
                </div>
                <div className="text-sm text-green-400">
                    Workers: {totalAssignedWorkers}
                </div>
                <div className="text-xs text-gray-400">
                    Click to manage
                </div>
            </div>
        </Card>
    );
};

export default BuildingInstanceCard;

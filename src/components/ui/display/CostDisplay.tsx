import React from 'react';
import type { BuildingCost } from 'src/types';

interface CostDisplayProps {
    cost: BuildingCost;
    className?: string;
}

const CostDisplay: React.FC<CostDisplayProps> = ({ cost, className = "" }) => {
    const formatCost = (cost: BuildingCost) => {
        const parts = [];
        if (cost.quantumEnergy) parts.push(`${cost.quantumEnergy.toLocaleString()} ⚡`);
        if (cost.quantumCrystals) parts.push(`${cost.quantumCrystals.toLocaleString()} 💎`);
        if (cost.researchData) parts.push(`${cost.researchData.toLocaleString()} 🧪`);
        if (cost.defensePoints) parts.push(`${cost.defensePoints.toLocaleString()} 🛡️`);
        return parts.join(' + ');
    };

    return (
        <span className={`text-sm ${className}`}>
            {formatCost(cost)}
        </span>
    );
};

export default CostDisplay;

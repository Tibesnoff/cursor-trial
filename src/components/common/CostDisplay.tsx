import React from 'react';

interface CostDisplayProps {
    cost: any;
    className?: string;
}

const CostDisplay: React.FC<CostDisplayProps> = ({ cost, className = "" }) => {
    const formatCost = (cost: any) => {
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

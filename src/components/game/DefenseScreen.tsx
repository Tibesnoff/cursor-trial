import { useState } from 'react';
import { useGameState, useGameActions } from 'src/hooks';
import { DEFENSE_FACILITIES, DEFENSE_UPGRADES, DEFENSE_CATEGORIES } from 'src/config';
import { Button, Card } from 'src/components/ui';
import { BuildingCard } from 'src/components/common';

const DefenseScreen = () => {
    const { resources, defense } = useGameState();
    const actions = useGameActions();
    const [selectedCategory, setSelectedCategory] = useState<string>('infrastructure');

    const handleBuildingClick = (buildingType: string) => {
        // For now, just show a simple alert - we'll implement proper modals later
        console.log(`Clicked on ${buildingType}`);
    };

    const actionMap: Record<string, () => void> = {
        powerGrids: actions.buyPowerGrid,
        transportHubs: actions.buyTransportHub,
        defenseSystems: actions.buyDefenseSystem,
        communicationArrays: actions.buyCommunicationArray,
    };

    const facilityGroups = [
        {
            id: 'defense',
            name: '🛡️ Defense Infrastructure',
            description: 'Build facilities to generate defense points for upgrades and future ship systems',
            color: 'red',
            buildings: DEFENSE_FACILITIES.map(facility => ({
                ...facility,
                count: defense[facility.id as keyof typeof defense],
                action: actionMap[facility.id] || (() => { })
            }))
        }
    ];

    const filteredDefenseUpgrades = DEFENSE_UPGRADES.filter(upgrade => upgrade.category === selectedCategory);
    const canAffordUpgrade = (upgrade: any) => {
        return Object.entries(upgrade.cost).every(([resource, amount]) => {
            if (!amount) return true;
            return (resources[resource as keyof typeof resources] || 0) >= (amount as number);
        });
    };

    const formatCost = (cost: any) => {
        return Object.entries(cost)
            .map(([resource, amount]) => {
                const emojiMap: Record<string, string> = {
                    defensePoints: '🛡️',
                    quantumEnergy: '⚡',
                    quantumCrystals: '💎',
                };
                return `${amount} ${emojiMap[resource] || ''}`;
            })
            .join(' + ');
    };

    return (
        <div className="space-y-6">
            {/* Defense Facilities Section */}
            <div className="space-y-8">
                {facilityGroups.map(group => (
                    <div key={group.id} className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-red-500/30">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-white mb-2">{group.name}</h3>
                            <p className="text-gray-300">{group.description}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {group.buildings.map(building => (
                                <BuildingCard
                                    key={building.id}
                                    building={building}
                                    onBuild={building.action}
                                    onClick={() => handleBuildingClick(building.id)}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Defense Upgrades Section */}
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-red-500/30">
                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">🛡️ Defense Upgrades</h3>
                    <p className="text-gray-300">Enhance your defensive capabilities and prepare for future battles</p>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {DEFENSE_CATEGORIES.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                ${selectedCategory === category.id
                                    ? 'bg-red-600 text-white shadow-lg'
                                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/70'
                                }`}
                        >
                            {category.emoji} {category.name}
                        </button>
                    ))}
                </div>

                {/* Defense Upgrades */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredDefenseUpgrades.map(upgrade => {
                        const canAfford = canAffordUpgrade(upgrade);

                        return (
                            <Card key={upgrade.id} variant="bordered" padding="md" className="h-full flex flex-col">
                                <div className="flex items-center space-x-3 mb-3">
                                    <span className="text-3xl">{upgrade.emoji}</span>
                                    <h4 className="text-xl font-semibold text-white">{upgrade.name}</h4>
                                </div>
                                <p className="text-gray-400 text-sm mb-4 flex-grow">{upgrade.description}</p>

                                <div className="space-y-2 mb-4">
                                    <div className="text-sm text-gray-300">
                                        Cost: <span className="font-bold text-white">{formatCost(upgrade.cost)}</span>
                                    </div>
                                    <div className="text-sm text-gray-300">
                                        Effects: {upgrade.effects.map(effect => effect.description).join(', ')}
                                    </div>
                                </div>

                                <Button
                                    onClick={() => {
                                        if (canAfford) {
                                            // TODO: Implement defense upgrade system
                                            console.log(`Purchase defense upgrade: ${upgrade.id}`);
                                        }
                                    }}
                                    disabled={!canAfford}
                                    variant={canAfford ? 'primary' : 'secondary'}
                                    size="md"
                                    className="mt-auto"
                                >
                                    {canAfford ? 'Upgrade' : 'Insufficient Resources'}
                                </Button>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DefenseScreen;

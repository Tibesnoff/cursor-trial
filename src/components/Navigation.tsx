import { useGameState, useGameActions, useUnlockedTabs } from 'src/hooks';

interface NavigationProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

interface TabConfig {
    id: string;
    name: string;
    emoji: string;
    unlockCost?: {
        quantumEnergy?: number;
        quantumCrystals?: number;
        researchData?: number;
    };
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
    const { resources } = useGameState();
    const unlockedTabs = useUnlockedTabs();
    const actions = useGameActions();

    const tabs: TabConfig[] = [
        { id: 'clicker', name: 'Quantum Collector', emoji: '⚡' }, // Always unlocked
        { 
            id: 'crystals', 
            name: 'Crystal Mine', 
            emoji: '💎',
            unlockCost: { quantumEnergy: 10000 }
        },
        { 
            id: 'science', 
            name: 'Science', 
            emoji: '🧪',
            unlockCost: { quantumEnergy: 100000, quantumCrystals: 5000 }
        },
        { 
            id: 'defense', 
            name: 'Defense', 
            emoji: '🛡️',
            unlockCost: { quantumEnergy: 1000000, quantumCrystals: 50000, researchData: 1000 }
        },
        { id: 'stats', name: 'Analytics', emoji: '📊' }, // Always unlocked
    ];

    const getTabStatus = (tab: TabConfig) => {
        if (!tab.unlockCost) return 'unlocked'; // Always unlocked tabs
        if (unlockedTabs.includes(tab.id)) return 'unlocked';

        // Check if player can afford to unlock
        const canAfford = Object.entries(tab.unlockCost).every(([resource, amount]) => {
            if (!amount) return true;
            return (resources[resource as keyof typeof resources] || 0) >= amount;
        });

        return canAfford ? 'available' : 'locked';
    };

    const handleTabClick = (tab: TabConfig) => {
        const status = getTabStatus(tab);

        if (status === 'available' && tab.unlockCost) {
            // Unlock the tab
            actions.unlockTab(tab.id, tab.unlockCost);
            onTabChange(tab.id);
        } else if (status === 'unlocked') {
            // Switch to unlocked tab
            onTabChange(tab.id);
        }
        // Do nothing if locked
    };

    const getTabStyle = (tab: TabConfig) => {
        const status = getTabStatus(tab);

        switch (status) {
            case 'unlocked':
                return activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg' // Active state
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'; // Unlocked but not active
            case 'available':
                return 'bg-yellow-600 text-white hover:bg-yellow-500 shadow-lg'; // Can be unlocked
            case 'locked':
            default:
                return 'bg-gray-800 text-gray-500 cursor-not-allowed'; // Locked
        }
    };

    const formatCost = (cost: any) => {
        return Object.entries(cost)
            .map(([resource, amount]) => {
                const emojiMap: Record<string, string> = {
                    quantumEnergy: '⚡',
                    quantumCrystals: '💎',
                    researchData: '🧪',
                };
                return `${amount} ${emojiMap[resource] || ''}`;
            })
            .join(' + ');
    };

    return (
        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30 mb-6">
            <div className="flex space-x-2">
                {tabs.map(tab => {
                    const status = getTabStatus(tab);
                    const isClickable = status !== 'locked';

                    return (
                        <button
                            key={tab.id}
                            onClick={() => isClickable && handleTabClick(tab)}
                            disabled={!isClickable}
                            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${getTabStyle(tab)}`}
                        >
                            <div className="flex flex-col items-center space-y-1">
                                <div className="flex items-center space-x-2">
                                    <span className="text-lg">{tab.emoji}</span>
                                    <span className="hidden sm:inline text-sm">{tab.name}</span>
                                </div>
                                {status === 'available' && tab.unlockCost && (
                                    <div className="text-xs opacity-80">
                                        {formatCost(tab.unlockCost)}
                                    </div>
                                )}
                                {status === 'locked' && tab.unlockCost && (
                                    <div className="text-xs opacity-60">
                                        {formatCost(tab.unlockCost)}
                                    </div>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Navigation;

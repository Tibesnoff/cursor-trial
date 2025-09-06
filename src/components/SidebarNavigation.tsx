import { useGameState, useGameActions, useUnlockedTabs } from 'src/hooks';

interface SidebarNavigationProps {
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

const SidebarNavigation = ({ activeTab, onTabChange }: SidebarNavigationProps) => {
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
                    ? 'bg-blue-600 text-white shadow-lg border-l-4 border-blue-400' // Active state
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border-l-4 border-transparent'; // Unlocked but not active
            case 'available':
                return 'bg-yellow-600 text-white hover:bg-yellow-500 shadow-lg border-l-4 border-yellow-400'; // Can be unlocked
            case 'locked':
            default:
                return 'bg-gray-800 text-gray-500 cursor-not-allowed border-l-4 border-transparent'; // Locked
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
            });
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-black/90 backdrop-blur-md border-r border-gray-600/50 shadow-2xl z-40">
                <div className="p-4 relative h-full">
                    {/* Header */}
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-white">Quantum Clicker</h2>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="space-y-2">
                        {tabs.map(tab => {
                            const status = getTabStatus(tab);
                            const isClickable = status !== 'locked';

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => isClickable && handleTabClick(tab)}
                                    disabled={!isClickable}
                                    className={`w-full text-left py-3 px-4 rounded-lg font-semibold transition-all ${getTabStyle(tab)}`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <span className="text-xl">{tab.emoji}</span>
                                        <div className="flex-1">
                                            <div className="text-sm font-medium">{tab.name}</div>
                                            {status === 'available' && tab.unlockCost && (
                                                <div className="text-xs opacity-80 mt-1 space-y-0.5">
                                                    {formatCost(tab.unlockCost).map((cost, index) => (
                                                        <div key={index}>{cost}</div>
                                                    ))}
                                                </div>
                                            )}
                                            {status === 'locked' && tab.unlockCost && (
                                                <div className="text-xs opacity-60 mt-1 space-y-0.5">
                                                    {formatCost(tab.unlockCost).map((cost, index) => (
                                                        <div key={index}>{cost}</div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Development Button */}
                <div className="absolute bottom-4 left-4 right-4">
                    <button
                        onClick={() => {
                            // Give max resources
                            actions.giveMaxResources();
                            // Unlock all tabs
                            actions.unlockAllTabs();
                        }}
                        className="w-full bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-2 rounded-lg font-bold transition-colors"
                        title="Development Mode: Max Resources + Unlock All Tabs"
                    >
                        DEV MODE
                    </button>
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-gray-600/50 shadow-2xl z-40">
                <div className="px-2 py-2">
                    <div className="flex space-x-1">
                        {tabs.map(tab => {
                            const status = getTabStatus(tab);
                            const isClickable = status !== 'locked';

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => isClickable && handleTabClick(tab)}
                                    disabled={!isClickable}
                                    className={`flex-1 py-2 px-1 rounded-lg font-semibold transition-all ${getTabStyle(tab)}`}
                                >
                                    <div className="flex flex-col items-center space-y-1">
                                        <span className="text-lg">{tab.emoji}</span>
                                        <div className="text-xs text-center leading-tight">
                                            {tab.name.split(' ')[0]}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SidebarNavigation;

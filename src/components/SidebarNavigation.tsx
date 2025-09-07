import { useGameActions, useUnlockedTabs, useResources } from 'src/hooks';
import { CustomNavItem, NavSubItem } from 'src/components/navigation';

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
    const resources = useResources();
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
        { id: 'misc', name: 'Misc', emoji: '📋' }, // Always unlocked
    ];

    // Define sub-tabs for each main tab
    const getSubTabs = (tabId: string) => {
        switch (tabId) {
            case 'clicker':
                return [
                    { id: 'clicker-collectors', name: 'Collectors', emoji: '⚡' },
                    { id: 'clicker-upgrades', name: 'Upgrades', emoji: '⬆️' },
                ];
            case 'crystals':
                return [
                    { id: 'crystals-collectors', name: 'Collectors', emoji: '💎' },
                    { id: 'crystals-upgrades', name: 'Upgrades', emoji: '⬆️' },
                ];
            case 'science':
                return [
                    { id: 'science-research', name: 'Research Tree', emoji: '🌳' },
                ];
            case 'misc':
                return [
                    { id: 'misc-analytics', name: 'Analytics', emoji: '📊' },
                    { id: 'misc-settings', name: 'Settings', emoji: '⚙️' },
                    { id: 'misc-achievements', name: 'Achievements', emoji: '🏆' },
                ];
            default:
                return [];
        }
    };

    const getTabStatus = (tab: TabConfig) => {
        if (!tab.unlockCost) return 'unlocked'; // Always unlocked tabs
        if (unlockedTabs.includes(tab.id)) return 'unlocked';

        // Check if player can afford to unlock
        const canAfford = Object.entries(tab.unlockCost).every(([resource, amount]) => {
            if (!amount) return true;
            return (resources[resource as keyof typeof resources] || 0) >= amount;
        });

        // Debug logging
        console.log(`Tab ${tab.id} status:`, {
            hasUnlockCost: !!tab.unlockCost,
            isUnlocked: unlockedTabs.includes(tab.id),
            canAfford,
            resources,
            unlockCost: tab.unlockCost
        });

        return canAfford ? 'available' : 'locked';
    };

    const handleTabClick = (tab: TabConfig) => {
        const status = getTabStatus(tab);

        console.log(`Tab ${tab.id} clicked:`, {
            status,
            hasUnlockCost: !!tab.unlockCost,
            unlockCost: tab.unlockCost
        });

        if (status === 'available' && tab.unlockCost) {
            // Unlock the tab
            console.log(`Unlocking tab ${tab.id} with cost:`, tab.unlockCost);
            actions.unlockTab(tab.id, tab.unlockCost);
            onTabChange(tab.id);
        } else if (status === 'unlocked') {
            // Switch to unlocked tab
            console.log(`Switching to unlocked tab ${tab.id}`);
            onTabChange(tab.id);
        } else {
            console.log(`Tab ${tab.id} is locked, cannot click`);
        }
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

    // Removed unused formatCost function

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
                            const subTabs = getSubTabs(tab.id);
                            const isActive = activeTab.startsWith(tab.id);

                            return (
                                <CustomNavItem
                                    key={tab.id}
                                    label={tab.name}
                                    emoji={tab.emoji}
                                    isActive={isActive}
                                    onClick={() => isClickable && handleTabClick(tab)}
                                    unlockCost={tab.unlockCost}
                                    status={status}
                                >
                                    {subTabs.map(subTab => (
                                        <NavSubItem
                                            key={subTab.id}
                                            label={subTab.name}
                                            emoji={subTab.emoji}
                                            isActive={activeTab === subTab.id}
                                            onClick={() => onTabChange(subTab.id)}
                                        />
                                    ))}
                                </CustomNavItem>
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

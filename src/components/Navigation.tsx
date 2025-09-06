interface NavigationProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
    const tabs = [
        { id: 'clicker', name: 'Quantum Collector', emoji: '⚡' },
        { id: 'buildings', name: 'Facilities', emoji: '🏭' },
        { id: 'stats', name: 'Analytics', emoji: '📊' },
    ];

    return (
        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30 mb-6">
            <div className="flex space-x-2">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${activeTab === tab.id
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                    >
                        <div className="flex items-center justify-center space-x-2">
                            <span className="text-lg">{tab.emoji}</span>
                            <span className="hidden sm:inline">{tab.name}</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Navigation;

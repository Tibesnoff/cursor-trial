import React from 'react';
import { useGameState } from 'src/hooks';

const StickyResourceBar: React.FC = () => {
    const { resources } = useGameState();

    const formatNumber = (num: number) => {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1) + 'B';
        } else if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toLocaleString();
    };

    return (
        <>
            {/* Desktop - Right Sidebar */}
            <div className="hidden lg:block fixed top-4 right-4 z-50 bg-black/80 backdrop-blur-md rounded-xl p-3 border border-gray-600/50 shadow-2xl w-48">
                <div className="space-y-3">
                    {/* Quantum Energy */}
                    <div className="flex items-center space-x-3">
                        <span className="text-2xl">⚡</span>
                        <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-300">Energy</div>
                            <div className="text-sm font-bold text-yellow-400 truncate">
                                {formatNumber(resources.quantumEnergy)}
                            </div>
                        </div>
                    </div>

                    {/* Quantum Crystals */}
                    <div className="flex items-center space-x-3">
                        <span className="text-2xl">💎</span>
                        <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-300">Crystals</div>
                            <div className="text-sm font-bold text-blue-400 truncate">
                                {formatNumber(resources.quantumCrystals)}
                            </div>
                        </div>
                    </div>

                    {/* Research Data */}
                    <div className="flex items-center space-x-3">
                        <span className="text-2xl">🧪</span>
                        <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-300">Research</div>
                            <div className="text-sm font-bold text-purple-400 truncate">
                                {formatNumber(resources.researchData)}
                            </div>
                        </div>
                    </div>

                    {/* Defense Points */}
                    <div className="flex items-center space-x-3">
                        <span className="text-2xl">🛡️</span>
                        <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-300">Defense</div>
                            <div className="text-sm font-bold text-red-400 truncate">
                                {formatNumber(resources.defensePoints)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile - Top Bar */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-600/50 shadow-lg">
                <div className="px-4 py-2">
                    <div className="grid grid-cols-2 gap-2">
                        {/* Row 1 */}
                        <div className="flex items-center space-x-2">
                            <span className="text-lg">⚡</span>
                            <div className="min-w-0 flex-1">
                                <div className="text-xs text-gray-300">Energy</div>
                                <div className="text-sm font-bold text-yellow-400 truncate">
                                    {formatNumber(resources.quantumEnergy)}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-lg">💎</span>
                            <div className="min-w-0 flex-1">
                                <div className="text-xs text-gray-300">Crystals</div>
                                <div className="text-sm font-bold text-blue-400 truncate">
                                    {formatNumber(resources.quantumCrystals)}
                                </div>
                            </div>
                        </div>
                        {/* Row 2 */}
                        <div className="flex items-center space-x-2">
                            <span className="text-lg">🧪</span>
                            <div className="min-w-0 flex-1">
                                <div className="text-xs text-gray-300">Research</div>
                                <div className="text-sm font-bold text-purple-400 truncate">
                                    {formatNumber(resources.researchData)}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-lg">🛡️</span>
                            <div className="min-w-0 flex-1">
                                <div className="text-xs text-gray-300">Defense</div>
                                <div className="text-sm font-bold text-red-400 truncate">
                                    {formatNumber(resources.defensePoints)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StickyResourceBar;

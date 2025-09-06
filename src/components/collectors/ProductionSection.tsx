import React from 'react';

interface ProductionSectionProps {
    resourceEmoji: string;
    production: number;
    clickPower: number;
    efficiency: number;
}

const ProductionSection: React.FC<ProductionSectionProps> = ({
    resourceEmoji,
    production,
    clickPower,
    efficiency,
}) => {
    return (
        <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
            <h3 className="text-xl font-bold text-white mb-4 text-center">⚡ Production</h3>

            <div className="text-center">
                {/* Production Stats Side by Side */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Per Second */}
                    <div className="bg-black/30 rounded-lg p-3">
                        <div className="text-2xl font-bold text-green-400 mb-1">
                            {production.toLocaleString()}
                        </div>
                        <div className="text-sm text-green-300 mb-1">
                            {resourceEmoji} per second
                        </div>
                        <div className="text-xs text-gray-400">
                            From collectors
                        </div>
                    </div>

                    {/* Per Click */}
                    <div className="bg-black/30 rounded-lg p-3">
                        <div className="text-2xl font-bold text-blue-400 mb-1">
                            {clickPower.toLocaleString()}
                        </div>
                        <div className="text-sm text-blue-300 mb-1">
                            {resourceEmoji} per click
                        </div>
                        <div className="text-xs text-gray-400">
                            From upgrades
                        </div>
                    </div>
                </div>

                {/* Collector Efficiency Info */}
                <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-sm text-gray-300 mb-1">Collector Efficiency Bonus</p>
                    <div className="text-sm text-blue-400 mb-1">
                        +{efficiency.toFixed(0)}%
                    </div>
                    <div className="text-xs text-gray-400">
                        Multiplies all collector production
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductionSection;
import { useGameActions } from 'src/hooks';
import { ResearchTree } from 'src/components/common';
import ScienceProduction from './ScienceProduction';

interface ScienceScreenProps {
    activeSubTab?: 'research' | 'production';
}

const ScienceScreen = ({ activeSubTab = 'research' }: ScienceScreenProps) => {
    const actions = useGameActions();

    // Removed unused building-related code since we moved it to ScienceProduction

    const handleResearchNodeClick = (nodeId: string) => {
        actions.unlockResearchNode(nodeId);
    };

    return (
        <div className="space-y-6">
            {activeSubTab === 'research' && (
                <div className="space-y-6">
                    {/* Research Tree Section */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-3xl font-bold text-white mb-2">🔬 Research Tree</h3>
                            <p className="text-gray-300 text-lg">Unlock new technologies and bonuses through research</p>
                        </div>

                        {/* Research Tree Visualization */}
                        <ResearchTree onNodeClick={handleResearchNodeClick} />
                    </div>
                </div>
            )}

            {activeSubTab === 'production' && <ScienceProduction />}
        </div>
    );
};

export default ScienceScreen;

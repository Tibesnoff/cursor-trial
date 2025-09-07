import { useGameActions } from 'src/hooks';
import { ResearchTree } from 'src/components/common';

const ScienceScreen = () => {
    const actions = useGameActions();

    const handleResearchNodeClick = (nodeId: string) => {
        actions.unlockResearchNode(nodeId);
    };

    return (
        <div className="space-y-6">
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
        </div>
    );
};

export default ScienceScreen;

import { SaveManager } from 'src/components/common';

const SettingsTab = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="text-2xl mr-2">⚙️</span>
                    Game Settings
                </h3>

                <div className="space-y-6">
                    {/* Save/Load Section */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-700 mb-3">Save & Load</h4>
                        <SaveManager />
                    </div>

                    {/* Future settings can be added here */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h4 className="text-lg font-semibold text-gray-700 mb-2">Display Settings</h4>
                        <p className="text-gray-600 text-sm">Coming Soon</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h4 className="text-lg font-semibold text-gray-700 mb-2">Audio Settings</h4>
                        <p className="text-gray-600 text-sm">Coming Soon</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsTab;

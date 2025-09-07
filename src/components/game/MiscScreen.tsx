import AnalyticsTab from './AnalyticsTab';
import SettingsTab from './SettingsTab';
import AchievementsTab from './AchievementsTab';

interface MiscScreenProps {
    activeSubTab?: 'analytics' | 'settings' | 'achievements';
}

const MiscScreen = ({ activeSubTab = 'analytics' }: MiscScreenProps) => {

    return (
        <div className="space-y-6">
            {activeSubTab === 'analytics' && <AnalyticsTab />}
            {activeSubTab === 'settings' && <SettingsTab />}
            {activeSubTab === 'achievements' && <AchievementsTab />}
        </div>
    );
};

export default MiscScreen;

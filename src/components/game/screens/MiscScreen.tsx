import AnalyticsTab from '../tabs/AnalyticsTab';
import SettingsTab from '../tabs/SettingsTab';
import AchievementsTab from '../tabs/AchievementsTab';

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

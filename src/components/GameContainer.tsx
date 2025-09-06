import { useState, useEffect } from 'react';
import { useAppDispatch } from 'src/store/hooks';
import {
    generatePassiveEnergy,
    updatePlayTime,
} from 'src/store/slices/gameSlice';
import { Header, BuildingsScreen } from 'src/components/game';
import Navigation from 'src/components/Navigation';
import MainClicker from 'src/components/MainClicker';
import WorkersScreen from 'src/components/WorkersScreen';
import StatisticsPanel from 'src/components/StatisticsPanel';

const GameContainer = () => {
    const dispatch = useAppDispatch();
    const [activeTab, setActiveTab] = useState('clicker');

    // Passive energy generation
    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(generatePassiveEnergy());
        }, 1000); // Generate energy every second

        return () => clearInterval(interval);
    }, [dispatch]);

    // Play time tracking
    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(updatePlayTime());
        }, 1000);

        return () => clearInterval(interval);
    }, [dispatch]);

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'clicker':
                return (
                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                        <div className="xl:col-span-2">
                            <MainClicker />
                        </div>
                        <div className="xl:col-span-2">
                            <StatisticsPanel />
                        </div>
                    </div>
                );
            case 'buildings':
                return <BuildingsScreen />;
            case 'workers':
                return <WorkersScreen />;
            case 'stats':
                return <StatisticsPanel />;
            default:
                return <MainClicker />;
        }
    };

    return (
        <div className="w-full min-h-screen px-4 py-8">
            <Header />
            <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="max-w-7xl mx-auto">
                {renderActiveTab()}
            </div>
        </div>
    );
};

export default GameContainer;

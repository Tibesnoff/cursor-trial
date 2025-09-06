import { useState, useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import {
    generatePassiveEnergy,
    updatePlayTime,
} from '../store/slices/gameSlice';
import Header from './Header';
import Navigation from './Navigation';
import MainClicker from './MainClicker';
import BuildingsScreen from './BuildingsScreen';
import WorkersScreen from './WorkersScreen';
import StatisticsPanel from './StatisticsPanel';

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
        const startTime = Date.now();
        const interval = setInterval(() => {
            const playTime = Math.floor((Date.now() - startTime) / 1000);
            dispatch(updatePlayTime(playTime));
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

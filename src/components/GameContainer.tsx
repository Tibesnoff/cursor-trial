import { useState, useEffect } from 'react';
import { useAppDispatch } from 'src/store/hooks';
import {
    generatePassiveEnergy,
    generateEnergyFromCollectors,
    updatePlayTime,
} from 'src/store/slices/gameSlice';
import { Header, BuildingsScreen, QuantumCollectorScreen } from 'src/components/game';
import Navigation from 'src/components/Navigation';
import StatisticsPanel from 'src/components/StatisticsPanel';

const GameContainer = () => {
    const dispatch = useAppDispatch();
    const [activeTab, setActiveTab] = useState('clicker');

    // Passive resource generation (crystals, research, defense)
    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(generatePassiveEnergy());
        }, 1000); // Generate resources every second

        return () => clearInterval(interval);
    }, [dispatch]);

    // Energy generation from collectors
    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(generateEnergyFromCollectors());
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
                return <QuantumCollectorScreen />;
            case 'buildings':
                return <BuildingsScreen />;
            case 'stats':
                return <StatisticsPanel />;
            default:
                return <QuantumCollectorScreen />;
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

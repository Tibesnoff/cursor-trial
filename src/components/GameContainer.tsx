import { useState, useEffect } from 'react';
import { useAppDispatch } from 'src/store/hooks';
import {
    generatePassiveEnergy,
    generateEnergyFromCollectors,
    updatePlayTime,
} from 'src/store/slices/gameSlice';
import { Header, QuantumCollectorScreen, CrystalMineScreen, ScienceScreen, DefenseScreen, MiscScreen } from 'src/components/game';
import SidebarNavigation from 'src/components/SidebarNavigation';
import { StickyResourceBar } from 'src/components/ui';
import { useAutoSave } from 'src/hooks/useAutoSave';
import { loadFromLocalStorage } from 'src/utils/saveManager';
import { loadGameState } from 'src/store/slices/gameSlice';

const GameContainer = () => {
    const dispatch = useAppDispatch();
    const [activeTab, setActiveTab] = useState('clicker');

    // Enable auto-save
    useAutoSave();

    // Load saved game on startup
    useEffect(() => {
        const savedState = loadFromLocalStorage();
        if (savedState) {
            dispatch(loadGameState(savedState));
        }
    }, [dispatch]);

    // Passive resource generation (crystals, research, defense)
    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(generatePassiveEnergy(undefined));
        }, 1000); // Generate resources every second

        return () => clearInterval(interval);
    }, [dispatch]);

    // Energy generation from collectors
    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(generateEnergyFromCollectors(undefined));
        }, 1000); // Generate energy every second

        return () => clearInterval(interval);
    }, [dispatch]);

    // Play time tracking
    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(updatePlayTime(undefined));
        }, 1000);

        return () => clearInterval(interval);
    }, [dispatch]);

    const renderActiveTab = () => {
        switch (activeTab) {
            // Quantum Collector tabs
            case 'clicker':
            case 'clicker-collectors':
                return <QuantumCollectorScreen activeSubTab="collectors" />;
            case 'clicker-upgrades':
                return <QuantumCollectorScreen activeSubTab="upgrades" />;

            // Crystal Mine tabs
            case 'crystals':
            case 'crystals-collectors':
                return <CrystalMineScreen activeSubTab="collectors" />;
            case 'crystals-upgrades':
                return <CrystalMineScreen activeSubTab="upgrades" />;

            // Science tabs
            case 'science':
            case 'science-research':
                return <ScienceScreen />;

            // Defense tab
            case 'defense':
                return <DefenseScreen />;

            // Misc tabs
            case 'misc':
            case 'misc-analytics':
                return <MiscScreen activeSubTab="analytics" />;
            case 'misc-settings':
                return <MiscScreen activeSubTab="settings" />;
            case 'misc-achievements':
                return <MiscScreen activeSubTab="achievements" />;

            default:
                return <QuantumCollectorScreen activeSubTab="collectors" />;
        }
    };

    return (
        <div className="w-full min-h-screen">
            <StickyResourceBar />
            <SidebarNavigation activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="lg:ml-64 px-4 py-8 lg:pt-8 pt-20 pb-20 lg:pb-8">
                <Header />
                <div className="max-w-6xl mx-auto">
                    {renderActiveTab()}
                </div>
            </div>
        </div>
    );
};

export default GameContainer;

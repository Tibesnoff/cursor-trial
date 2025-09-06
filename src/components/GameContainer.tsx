import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import {
    generatePassiveEnergy,
    updatePlayTime,
} from '../store/slices/gameSlice';
import Header from './Header';
import MainClicker from './MainClicker';
import BuildingsPanel from './BuildingsPanel';
import UpgradesPanel from './UpgradesPanel';
import StatisticsPanel from './StatisticsPanel';

const GameContainer = () => {
    const dispatch = useAppDispatch();

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

    return (
        <div className="w-full min-h-screen px-4 py-8">
            <Header />

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mt-8 max-w-7xl mx-auto">
                {/* Main Game Area */}
                <div className="xl:col-span-2">
                    <MainClicker />
                </div>

                {/* Side Panels */}
                <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-6">
                    <BuildingsPanel />
                    <UpgradesPanel />
                    <StatisticsPanel />
                </div>
            </div>
        </div>
    );
};

export default GameContainer;

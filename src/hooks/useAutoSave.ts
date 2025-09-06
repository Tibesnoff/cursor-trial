import { useEffect, useRef } from 'react';
import { useGameState } from './useGameState';
import { saveToLocalStorage } from 'src/utils/saveManager';

// Auto-save every 30 seconds
const AUTO_SAVE_INTERVAL = 30000;

export const useAutoSave = () => {
  const gameState = useGameState();
  const lastSaveRef = useRef<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();

      // Only save if enough time has passed and we have some progress
      if (now - lastSaveRef.current >= AUTO_SAVE_INTERVAL) {
        const success = saveToLocalStorage(gameState);
        if (success) {
          lastSaveRef.current = now;
          console.log('Auto-saved game state');
        }
      }
    }, AUTO_SAVE_INTERVAL);

    return () => clearInterval(interval);
  }, [gameState]);

  // Save on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveToLocalStorage(gameState);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [gameState]);
};

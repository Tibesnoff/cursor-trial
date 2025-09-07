/**
 * Calculate the click power increase for the next upgrade
 */
export const calculateClickPowerIncrease = (
  currentClickPower: number
): number => {
  return Math.max(1, Math.floor(currentClickPower / 10) + 1);
};

/**
 * Calculate the crystal click power increase for the next upgrade
 */
export const calculateCrystalClickPowerIncrease = (
  currentCrystalClickPower: number
): number => {
  return Math.max(1, Math.floor(currentCrystalClickPower / 10) + 1);
};


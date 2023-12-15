import { getAuthenticatedUser } from './auths';

const  {xp}  = getAuthenticatedUser();

const rank = calculateRank();

function calculateRank() {
  const currentLevel = Math.floor(Math.sqrt(xp / 10));
  const nextLevelPoints = (currentLevel + 1) ** 2 * 10;
  const progressToNextLevel =
    ((xp - currentLevel ** 2 * 10) / (nextLevelPoints - currentLevel ** 2 * 10)) * 100;

  return {
    level: currentLevel,
    progressPercentage: Math.floor(progressToNextLevel),
  };
}

function getPlayerRank() {
    return rank
}

export default  getPlayerRank ;

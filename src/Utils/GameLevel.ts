import env from '../env';

export const getCurrentGameLevel = () => (Game.rooms[env.roomName].energyCapacityAvailable > 300 ? 2 : 1);

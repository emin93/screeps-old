import env from '../env';

export const getCurrentGameLevel = () => {
  const controller = Game.rooms[env.roomName].controller;

  if (!controller) {
    return 1;
  }

  if (controller.level > 1) {
    return 1;
  }

  return controller.level;
};

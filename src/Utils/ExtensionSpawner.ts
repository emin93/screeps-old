import env from '../env';

export const getExtensions = () =>
  Game.rooms[env.roomName].find(FIND_STRUCTURES, {
    filter: structure => structure.structureType === STRUCTURE_EXTENSION,
  });

export const getExtensionConstructionSites = () =>
  Game.rooms[env.roomName].find(FIND_CONSTRUCTION_SITES, {
    filter: constructionSite => constructionSite.structureType === STRUCTURE_EXTENSION,
  });

export const getMaxExtensions = () => {
  const controller = Game.rooms[env.roomName].controller;

  if (!controller || controller.level === 1) {
    return 0;
  }

  return (controller.level - 1) * 5;
};

export default () => {
  const maxExtensions = getMaxExtensions();
  const spawn = Game.spawns[env.spawnName];

  const extensions = getExtensions();
  const extensionConstructionSites = getExtensionConstructionSites();

  const totalExtensions = extensions.length + extensionConstructionSites.length;

  if (totalExtensions >= maxExtensions) {
    return;
  }

  const newPos = new RoomPosition(spawn.pos.x, spawn.pos.y, env.roomName);
};

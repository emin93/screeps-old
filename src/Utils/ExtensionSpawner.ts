import env from '../env';

export default () => {
  const controller = Game.rooms[env.roomName].controller;

  if (!controller) {
    return;
  }

  const level = controller.level;

  if (level === 1) {
    return;
  }

  const maxExtensions = level * 5;
  const spawn = Game.spawns[env.spawnName];
  const room = Game.rooms[env.roomName];

  const extensions = room.find(FIND_STRUCTURES, {
    filter: structure => structure.structureType === STRUCTURE_EXTENSION,
  });

  const extensionConstructionSites = room.find(FIND_CONSTRUCTION_SITES, {
    filter: constructionSite => constructionSite.structureType === STRUCTURE_EXTENSION,
  });

  const extensionCount = extensions.length + extensionConstructionSites.length;

  if (extensionCount >= maxExtensions) {
    return;
  }

  const newPos = new RoomPosition(spawn.pos.x + extensionCount, spawn.pos.y, env.roomName);
  newPos.createConstructionSite(STRUCTURE_EXTENSION);
};

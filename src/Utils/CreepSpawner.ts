import BaseCreepMemory from 'Creeps/BaseCreepMemory';

export default () => {
  const creeps = Object.keys(Game.creeps).map(name => Game.creeps[name]);
  const builders = creeps.filter(creep => (<BaseCreepMemory>creep.memory).role === 'builder');
  const harvesters = creeps.filter(creep => (<BaseCreepMemory>creep.memory).role === 'harvester');
  const upgraders = creeps.filter(creep => (<BaseCreepMemory>creep.memory).role === 'upgrader');

  const availableEnery = Game.rooms['E5N8'].energyAvailable;

  if (availableEnery < 200) {
    return;
  }

  let role;
  let index;

  if (builders.length < 2) {
    role = 'builder';
    index = builders.length;
  }

  if (upgraders.length < 2) {
    role = 'upgrader';
    index = upgraders.length;
  }

  if (harvesters.length < 2) {
    role = 'harvester';
    index = harvesters.length;
  }

  if (!role) {
    return;
  }

  Game.spawns['Spawn1'].spawnCreep([WORK, MOVE, CARRY], `${role}${index}`, { memory: { role } });
};

import BaseCreepMemory from './Creeps/BaseCreepMemory';
import build from './Creeps/Builder';
import harvest from './Creeps/Harvester';
import upgrade from './Creeps/Upgrader';
import rangeDefend from './Creeps/Ranger';
import meleeDefend from './Creeps/Melee';
import collectGarbage from './Utils/GarbageCollector';
import spawnCreeps from './Utils/CreepSpawner';

export const loop = () => {
  collectGarbage();
  spawnCreeps();

  Object.keys(Game.creeps).forEach(name => {
    const creep = Game.creeps[name];
    const memory = <BaseCreepMemory>creep.memory;

    if (memory.role === 'harvester') {
      harvest(creep);
    }

    if (memory.role === 'builder') {
      build(creep);
    }

    if (memory.role === 'upgrader') {
      upgrade(creep);
    }

    if (memory.role === 'ranger') {
      rangeDefend(creep);
    }

    if (memory.role === 'melee') {
      meleeDefend(creep);
    }
  });
};

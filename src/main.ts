import BaseCreepMemory, { CreepRole } from './Creeps/BaseCreepMemory';
import build from './Creeps/Builder';
import harvest from './Creeps/Harvester';
import upgrade from './Creeps/Upgrader';
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
  });
};

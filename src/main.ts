import { BaseCreepMemory } from './Creeps/Base';
import meleeDefend from './Creeps/Defenders/Melee';
import rangeDefend from './Creeps/Defenders/Ranger';
import build from './Creeps/Workers/Builder';
import harvest from './Creeps/Workers/Harvester';
import upgrade from './Creeps/Workers/Upgrader';
import recycleCreeps from './Utils/CreepRecycler';
import renewCreeps from './Utils/CreepRenewer';
import spawnCreeps from './Utils/CreepSpawner';
import collectGarbage from './Utils/GarbageCollector';

export const loop = () => {
  collectGarbage();
  spawnCreeps();
  recycleCreeps();
  renewCreeps();

  Object.keys(Game.creeps).forEach(name => {
    const creep = Game.creeps[name];
    const memory = <BaseCreepMemory>creep.memory;

    if (memory.isRecycling) {
      return;
    }

    if (memory.isRenewing) {
      return;
    }

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

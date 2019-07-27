import BaseCreepMemory from './Creeps/BaseCreepMemory';
import Builder from './Creeps/Builder';
import Harvester from './Creeps/Harvester';
import Upgrader from './Creeps/Upgrader';
import collectGarbage from './Utils/GarbageCollector';

export const loop = () => {
  collectGarbage();

  Object.keys(Game.creeps).forEach(name => {
    const creep = Game.creeps[name];
    const memory = <BaseCreepMemory>creep.memory;

    switch (memory.role) {
      case 'builder':
        Builder(creep);
        break;
      case 'harvester':
        Harvester(creep);
        break;
      case 'upgrader':
        Upgrader(creep);
        break;
    }
  });
};

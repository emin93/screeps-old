import { BaseCreepMemory } from './Creeps/Base';
import meleeDefend from './Creeps/Defenders/Melee';
import rangeDefend from './Creeps/Defenders/Ranger';
import build from './Creeps/Workers/Builder';
import harvest from './Creeps/Workers/Harvester';
import repair from './Creeps/Workers/Repairer';
import upgrade from './Creeps/Workers/Upgrader';
import tower from './Tower';
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

    if (memory.job === 'recycling' || memory.job === 'renewing') {
      return;
    }

    switch (memory.role) {
      case 'harvester':
        harvest(creep);
        break;
      case 'builder':
        build(creep);
        break;
      case 'upgrader':
        upgrade(creep);
        break;
      case 'repairer':
        repair(creep);
        break;
      case 'ranger':
        rangeDefend(creep);
        break;
      case 'melee':
        meleeDefend(creep);
        break;
      default:
        harvest(creep);
    }
  });

  Object.keys(Game.structures).forEach(name => {
    const structure = Game.structures[name];

    if (structure.structureType !== STRUCTURE_TOWER) {
      return;
    }

    tower(<StructureTower>structure);
  });
};

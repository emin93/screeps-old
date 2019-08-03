import { BaseCreepMemory, workerMoveOpts } from '../Base';
import harvest from './Harvester';

export default (creep: Creep) => {
  const memory = <BaseCreepMemory>creep.memory;

  if (memory.job !== 'harvesting' && creep.carry.energy == 0) {
    memory.job = 'harvesting';
  }

  if (memory.job !== 'repairing' && creep.carry.energy == creep.carryCapacity) {
    memory.job = 'repairing';
  }

  if (memory.job === 'repairing') {
    const structure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: structure => {
        if (structure.structureType === STRUCTURE_WALL) {
          return structure.hits < 10000;
        }

        return structure.hits < structure.hitsMax;
      },
    });

    if (!structure) {
      harvest(creep);
      return;
    }

    if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
      creep.moveTo(structure, workerMoveOpts);
    }

    return;
  }

  harvest(creep);
};

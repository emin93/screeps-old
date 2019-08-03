import { BaseCreepMemory, workerMoveOpts, workerMoveToSourceOpts } from '../Base';
import harvest from './Harvester';

interface UpgraderMemory extends BaseCreepMemory {
  isRepairing: boolean;
}

export default (creep: Creep) => {
  const memory = <UpgraderMemory>creep.memory;

  if (memory.isRepairing && creep.carry.energy == 0) {
    memory.isRepairing = false;
  }

  if (!memory.isRepairing && creep.carry.energy == creep.carryCapacity) {
    memory.isRepairing = true;
  }

  if (memory.isRepairing) {
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

  const sources = creep.room.find(FIND_SOURCES);

  if (sources.length && creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
    creep.moveTo(sources[0], workerMoveToSourceOpts);
  }
};

import { BaseCreepMemory, workerMoveOpts } from '../Base';
import upgrade from './Upgrader';

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
    const structures = creep.room.find(FIND_STRUCTURES, {
      filter: structure => {
        if (structure.structureType === STRUCTURE_WALL) {
          return structure.hits < 10000;
        }

        return structure.hits < structure.hitsMax;
      },
    });

    if (!structures.length) {
      upgrade(creep);
      return;
    }

    if (creep.repair(structures[0]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(structures[0], workerMoveOpts);
    }

    return;
  }

  const sources = creep.room.find(FIND_SOURCES);

  if (sources.length && creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
    creep.moveTo(sources[0], workerMoveOpts);
  }
};

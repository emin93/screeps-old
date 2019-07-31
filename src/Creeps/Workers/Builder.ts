import { BaseCreepMemory, workerMoveOpts, workerMoveToSourceOpts } from '../Base';
import harvest from './Harvester';

export interface BuilderMemory extends BaseCreepMemory {
  isBuilding: boolean;
}

export default (creep: Creep) => {
  const memory = <BuilderMemory>creep.memory;

  if (memory.isBuilding && creep.carry.energy == 0) {
    memory.isBuilding = false;
  }

  if (!memory.isBuilding && creep.carry.energy == creep.carryCapacity) {
    memory.isBuilding = true;
  }

  if (memory.isBuilding) {
    const targets = creep.room.find(FIND_CONSTRUCTION_SITES);

    if (!targets.length) {
      harvest(creep);
      return;
    }

    if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0], workerMoveOpts);
    }

    return;
  }

  const sources = creep.room.find(FIND_SOURCES);

  if (sources.length && creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
    creep.moveTo(sources[0], workerMoveToSourceOpts);
  }
};

import { BaseCreepMemory, workerMoveOpts } from '../Base';

interface UpgraderMemory extends BaseCreepMemory {
  isUpgrading: boolean;
}

export default (creep: Creep) => {
  const memory = <UpgraderMemory>creep.memory;

  if (memory.isUpgrading && creep.carry.energy == 0) {
    memory.isUpgrading = false;
  }

  if (!memory.isUpgrading && creep.carry.energy == creep.carryCapacity) {
    memory.isUpgrading = true;
  }

  if (memory.isUpgrading) {
    if (!creep.room.controller) {
      return;
    }

    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller, workerMoveOpts);
    }

    return;
  }

  const sources = creep.room.find(FIND_SOURCES);

  if (sources.length && creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
    creep.moveTo(sources[0], workerMoveOpts);
  }
};

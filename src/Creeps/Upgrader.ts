import BaseCreepMemory from './BaseCreepMemory';

interface UpgraderMemory extends BaseCreepMemory {
  isUpgrading: boolean;
}

export default (creep: Creep) => {
  const memory = <UpgraderMemory>creep.memory;

  if (memory.isUpgrading && creep.carry.energy == 0) {
    memory.isUpgrading = false;
    creep.say('🔄 harvest');
  }
  if (!memory.isUpgrading && creep.carry.energy == creep.carryCapacity) {
    memory.isUpgrading = true;
    creep.say('⚡ upgrade');
  }

  if (memory.isUpgrading) {
    if (!creep.room.controller) {
      return;
    }

    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
    }
  } else {
    var sources = creep.room.find(FIND_SOURCES);
    if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
    }
  }
};

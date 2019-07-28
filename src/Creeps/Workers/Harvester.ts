import { BaseCreepMemory } from '../Base';

export interface HarvesterMemory extends BaseCreepMemory {
  isHarvesting: boolean;
}

export default (creep: Creep) => {
  const memory = <HarvesterMemory>creep.memory;

  if (creep.carry.energy === 0) {
    memory.isHarvesting = true;
  }

  if (creep.carry.energy === creep.carryCapacity) {
    memory.isHarvesting = false;
  }

  if (memory.isHarvesting) {
    const droppedResources = creep.room.find(FIND_DROPPED_RESOURCES);

    if (droppedResources.length > 0) {
      if (creep.pickup(droppedResources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(droppedResources[0]);
      }
    } else {
      const sources = creep.room.find(FIND_SOURCES);

      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0]);
      }
    }

    return;
  }

  const targets = creep.room.find(FIND_STRUCTURES, {
    filter: structure => {
      return (
        (structure.structureType == STRUCTURE_EXTENSION ||
          structure.structureType == STRUCTURE_SPAWN ||
          structure.structureType == STRUCTURE_TOWER) &&
        structure.energy < structure.energyCapacity
      );
    },
  });

  if (targets.length > 0) {
    if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0]);
    }
  }
};

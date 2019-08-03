import { BaseCreepMemory, workerMoveOpts, workerMoveToSourceOpts } from '../Base';

export default (creep: Creep) => {
  const memory = <BaseCreepMemory>creep.memory;

  if (memory.job !== 'harvesting' && creep.carry.energy === 0) {
    memory.job = 'harvesting';
  }

  if (memory.job !== 'replenishing' && creep.carry.energy === creep.carryCapacity) {
    memory.job = 'replenishing';
  }

  if (memory.job === 'harvesting') {
    const droppedResource = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);

    if (droppedResource) {
      if (creep.pickup(droppedResource) == ERR_NOT_IN_RANGE) {
        creep.moveTo(droppedResource, workerMoveToSourceOpts);
      }
    } else {
      const source = creep.pos.findClosestByRange(FIND_SOURCES, {
        filter: source => source.energy > 0,
      });

      if (source && creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, workerMoveToSourceOpts);
      }
    }

    return;
  }

  const target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: structure =>
      (structure.structureType === STRUCTURE_EXTENSION ||
        structure.structureType === STRUCTURE_SPAWN ||
        structure.structureType === STRUCTURE_TOWER) &&
      structure.energy < structure.energyCapacity,
  });

  if (!target) {
    if (creep.room.controller && creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller, workerMoveOpts);
    }

    return;
  }

  if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    creep.moveTo(target, workerMoveOpts);
  }
};

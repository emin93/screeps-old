import { BaseCreepMemory, workerMoveOpts } from '../Base';
import harvest from './Harvester';

export default (creep: Creep) => {
  const memory = <BaseCreepMemory>creep.memory;

  if (memory.job !== 'harvesting' && creep.carry.energy == 0) {
    memory.job = 'harvesting';
  }

  if (memory.job !== 'upgrading' && creep.carry.energy == creep.carryCapacity) {
    memory.job = 'upgrading';
  }

  if (memory.job === 'upgrading') {
    if (!creep.room.controller) {
      return;
    }

    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller, workerMoveOpts);
    }

    return;
  }

  harvest(creep);
};

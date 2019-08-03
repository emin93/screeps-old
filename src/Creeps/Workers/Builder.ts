import { BaseCreepMemory, workerMoveOpts } from '../Base';
import harvest from './Harvester';

export default (creep: Creep) => {
  const memory = <BaseCreepMemory>creep.memory;

  if (memory.job !== 'harvesting' && creep.carry.energy == 0) {
    memory.job = 'harvesting';
  }

  if (memory.job !== 'building' && creep.carry.energy == creep.carryCapacity) {
    memory.job = 'building';
  }

  if (memory.job === 'building') {
    const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

    if (!target) {
      harvest(creep);
      return;
    }

    if (creep.build(target) == ERR_NOT_IN_RANGE) {
      creep.moveTo(target, workerMoveOpts);
    }

    return;
  }

  harvest(creep);
};

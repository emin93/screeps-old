import { BaseCreepMemory } from '../Base';

export interface BuilderMemory extends BaseCreepMemory {
  isBuilding: boolean;
}

export default (creep: Creep) => {
  const memory = <BuilderMemory>creep.memory;

  if (memory.isBuilding && creep.carry.energy == 0) {
    memory.isBuilding = false;
    creep.say('🔄 harvesting');
  }

  if (!memory.isBuilding && creep.carry.energy == creep.carryCapacity) {
    memory.isBuilding = true;
    creep.say('🚧 building');
  }

  if (memory.isBuilding) {
    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    if (targets.length) {
      if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
      }
    }
  } else {
    var sources = creep.room.find(FIND_SOURCES);
    if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
    }
  }
};

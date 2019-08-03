import { BaseCreepMemory } from '../Creeps/Base';
import env from '../env';

export default () => {
  const room = Game.rooms[env.roomName];

  const dyingCreeps = room.find(FIND_CREEPS, {
    filter: creep => {
      const memory = <BaseCreepMemory>creep.memory;

      return memory.job === 'renewing' || (creep.ticksToLive && creep.ticksToLive <= 100);
    },
  });

  if (!dyingCreeps.length) {
    return;
  }

  const creep = dyingCreeps[0];
  const memory = <BaseCreepMemory>creep.memory;

  if (memory.job !== 'renewing') {
    memory.job = 'renewing';
  }

  const spawn = Game.spawns[env.spawnName];

  const response = spawn.renewCreep(creep);

  if (response === ERR_NOT_IN_RANGE) {
    creep.moveTo(spawn.pos, { visualizePathStyle: { stroke: '#ff42f2', opacity: 0.7 } });
    return;
  }

  if ((response === OK && creep.ticksToLive && creep.ticksToLive > memory.level * 200) || room.energyAvailable < 100) {
    if (memory.type === 'worker') {
      memory.job = 'harvesting';
    } else {
      memory.job = 'patrolling';
    }
  }
};

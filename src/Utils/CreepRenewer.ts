import { BaseCreepMemory } from '../Creeps/Base';
import env from '../env';

export default () =>
  Object.values(Game.creeps).forEach(creep => {
    if (!creep.ticksToLive) {
      return;
    }

    const memory = <BaseCreepMemory>creep.memory;

    if (memory.job !== 'renewing' && creep.ticksToLive <= 50) {
      memory.job = 'renewing';
    }

    if (memory.job !== 'renewing') {
      return;
    }

    const spawn = Game.spawns[env.spawnName];

    const response = spawn.renewCreep(creep);

    if (response === ERR_NOT_IN_RANGE) {
      creep.moveTo(spawn.pos, { visualizePathStyle: { stroke: '#ff42f2', opacity: 0.7 } });
      return;
    }

    if (response === OK && creep.ticksToLive > memory.level * 150) {
      memory.job = 'returning';
    }
  });

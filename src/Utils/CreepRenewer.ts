import { BaseCreepMemory } from '../Creeps/Base';
import env from '../env';

export default () =>
  Object.keys(Game.creeps)
    .sort()
    .map(name => Game.creeps[name])
    .forEach(creep => {
      if (!creep.ticksToLive) {
        return;
      }

      const memory = <BaseCreepMemory>creep.memory;

      if (memory.job !== 'renewing' && creep.ticksToLive <= 80) {
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
        if (memory.type === 'worker') {
          memory.job = 'harvesting';
        } else {
          memory.job = 'patrolling';
        }
      }
    });

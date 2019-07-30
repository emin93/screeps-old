import { BaseCreepMemory } from '../Creeps/Base';
import env from '../env';

export default () =>
  Object.keys(Game.creeps)
    .map(name => Game.creeps[name])
    .forEach(creep => {
      if (!creep.ticksToLive) {
        return;
      }

      const memory = <BaseCreepMemory>creep.memory;

      if (!memory.isRenewing && creep.ticksToLive <= 50) {
        memory.isRenewing = true;
      }

      if (!memory.isRenewing) {
        return;
      }

      const spawn = Game.spawns[env.spawnName];

      const response = spawn.renewCreep(creep);

      if (response === ERR_NOT_IN_RANGE) {
        creep.moveTo(spawn.pos);
        return;
      }

      if (response === OK && creep.ticksToLive > memory.level * 150) {
        memory.isRenewing = false;
      }
    });

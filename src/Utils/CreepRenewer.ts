import { BaseCreepMemory } from '../Creeps/Base';
import env from '../env';

export default () => {
  const renewableCreeps = Object.keys(Game.creeps)
    .map(name => Game.creeps[name])
    .filter(creep => {
      if (!creep.ticksToLive) {
        return false;
      }

      const memory = <BaseCreepMemory>creep.memory;

      return creep.ticksToLive <= 50 || memory.isRenewing;
    });

  if (!renewableCreeps.length) {
    return;
  }

  const creep = renewableCreeps[0];
  const memory = <BaseCreepMemory>creep.memory;

  if (!memory.isRenewing) {
    memory.isRenewing = true;
  }

  const spawn = Game.spawns[env.spawnName];

  const response = spawn.renewCreep(creep);

  if (response === ERR_NOT_IN_RANGE) {
    creep.moveTo(spawn.pos);
    return;
  }

  if (response === OK && creep.ticksToLive && creep.ticksToLive >= 300) {
    memory.isRenewing = false;
  }
};

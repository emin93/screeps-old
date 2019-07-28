import { BaseCreepMemory } from '../Creeps/Base';
import env from '../env';

export default () => {
  const renewableCreeps = Object.keys(Game.creeps)
    .map(name => Game.creeps[name])
    .filter(creep => {
      if (!creep.ticksToLive) {
        return false;
      }

      return creep.ticksToLive <= 100;
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

  if (response === OK && creep.ticksToLive && creep.ticksToLive >= 500) {
    memory.isRenewing = false;
  }
};

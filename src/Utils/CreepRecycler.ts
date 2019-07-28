import { BaseCreepMemory } from '../Creeps/Base';
import env from '../env';
import { getCurrentGameLevel } from './GameLevel';

export default () => {
  const creeps = Object.keys(Game.creeps).map(name => Game.creeps[name]);
  const level = getCurrentGameLevel();

  creeps.forEach(creep => {
    const memory = <BaseCreepMemory>creep.memory;

    if (memory.level >= level) {
      return;
    }

    if (!memory.isRecycling) {
      memory.isRecycling = true;
    }

    const spawn = Game.spawns[env.spawnName];

    if (spawn.recycleCreep(creep) === ERR_NOT_IN_RANGE) {
      creep.moveTo(spawn.pos);
    }
  });
};

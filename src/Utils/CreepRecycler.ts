import { BaseCreepMemory } from '../Creeps/Base';
import { getCurrentGameLevel } from './GameLevel';
import env from 'env';

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

    if (spawn.recycleCreep(creep)) {
      return;
    }

    creep.moveTo(spawn.pos);
  });
};

import { BaseCreepMemory } from '../Creeps/Base';
import env from '../env';
import { getCurrentGameLevel } from './GameLevel';

export default () => {
  const level = getCurrentGameLevel();

  const availableEnergy = Game.rooms[env.roomName].energyAvailable;
  if (availableEnergy < 300) {
    return;
  }

  const underleveledCreeps = Object.keys(Game.creeps)
    .map(name => Game.creeps[name])
    .filter(creep => {
      const memory = <BaseCreepMemory>creep.memory;

      return memory.level < level || memory.isRecycling;
    });

  if (!underleveledCreeps.length) {
    return;
  }

  const creep = underleveledCreeps[0];
  const memory = <BaseCreepMemory>creep.memory;

  if (!memory.isRecycling) {
    memory.isRecycling = true;
  }

  const spawn = Game.spawns[env.spawnName];

  if (spawn.recycleCreep(creep) === ERR_NOT_IN_RANGE) {
    creep.moveTo(spawn.pos);
  }
};

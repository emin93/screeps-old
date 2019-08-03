import { BaseCreepMemory } from '../Creeps/Base';
import env from '../env';
import { getExtensions, getMaxExtensions } from './ExtensionSpawner';
import { getCurrentGameLevel } from './GameLevel';

export default () => {
  const level = getCurrentGameLevel();

  const room = Game.rooms[env.roomName];
  const availableEnergyInPercent = (room.energyAvailable / room.energyCapacityAvailable) * 100;
  if (availableEnergyInPercent < 90 || getExtensions().length < getMaxExtensions()) {
    return;
  }

  const underleveledCreeps = Object.keys(Game.creeps)
    .sort()
    .map(name => Game.creeps[name])
    .filter(creep => {
      const memory = <BaseCreepMemory>creep.memory;

      return memory.job === 'recycling' || memory.level < level;
    });

  if (!underleveledCreeps.length) {
    return;
  }

  const creep = underleveledCreeps[0];
  const memory = <BaseCreepMemory>creep.memory;

  if (memory.job !== 'recycling') {
    memory.job = 'recycling';
  }

  const spawn = Game.spawns[env.spawnName];

  if (creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(spawn, { visualizePathStyle: { stroke: '#000000', opacity: 1 } });

    return;
  }

  spawn.recycleCreep(creep);
};

import { BaseCreepMemory, CreepRole, getBodyForRoleLevel } from '../Creeps/Base';
import env from '../env';
import { getCurrentGameLevel } from './GameLevel';

const getIdealNextRole = (creeps: Creep[]): CreepRole | null => {
  const builders = creeps.filter(creep => (<BaseCreepMemory>creep.memory).role === 'builder');
  const harvesters = creeps.filter(creep => (<BaseCreepMemory>creep.memory).role === 'harvester');
  const upgraders = creeps.filter(creep => (<BaseCreepMemory>creep.memory).role === 'upgrader');
  const rangers = creeps.filter(creep => (<BaseCreepMemory>creep.memory).role === 'ranger');
  const melees = creeps.filter(creep => (<BaseCreepMemory>creep.memory).role === 'melee');

  if (harvesters.length < 2) {
    return 'harvester';
  }

  if (upgraders.length < 2) {
    return 'upgrader';
  }

  if (rangers.length < 2) {
    return 'ranger';
  }

  if (melees.length < 2) {
    return 'melee';
  }

  if (builders.length < 2) {
    return 'builder';
  }

  return null;
};

export default () => {
  const creeps = Object.keys(Game.creeps).map(name => Game.creeps[name]);

  const level = getCurrentGameLevel();
  const role = getIdealNextRole(creeps);

  if (!role) {
    return;
  }

  const body = getBodyForRoleLevel(role, level);
  const id = Date.now();

  Game.spawns[env.spawnName].spawnCreep(body, `${role}${id}`, { memory: { role, level } });
};

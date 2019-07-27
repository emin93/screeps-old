import BaseCreepMemory from '../Creeps/BaseCreepMemory';
import env from '../env';

const workerBody = [WORK, MOVE, MOVE, CARRY];
const rangerBody = [RANGED_ATTACK, MOVE, MOVE, CARRY];
const meleeBody = [ATTACK, MOVE, MOVE, CARRY];

export default () => {
  const creeps = Object.keys(Game.creeps).map(name => Game.creeps[name]);
  const builders = creeps.filter(creep => (<BaseCreepMemory>creep.memory).role === 'builder');
  const harvesters = creeps.filter(creep => (<BaseCreepMemory>creep.memory).role === 'harvester');
  const upgraders = creeps.filter(creep => (<BaseCreepMemory>creep.memory).role === 'upgrader');
  const rangers = creeps.filter(creep => (<BaseCreepMemory>creep.memory).role === 'ranger');
  const melees = creeps.filter(creep => (<BaseCreepMemory>creep.memory).role === 'melee');

  const availableEnergy = Game.rooms[env.roomName].energyAvailable;

  if (availableEnergy < 250) {
    return;
  }

  let role;
  let index;
  let body;

  if (builders.length < 2) {
    role = 'builder';
    index = builders.length;
    body = workerBody;
  }

  if (rangers.length < 2) {
    role = 'ranger';
    index = rangers.length;
    body = rangerBody;
  }

  if (melees.length < 2) {
    role = 'melee';
    index = melees.length;
    body = meleeBody;
  }

  if (upgraders.length < 2) {
    role = 'upgrader';
    index = upgraders.length;
    body = workerBody;
  }

  if (harvesters.length < 2) {
    role = 'harvester';
    index = harvesters.length;
    body = workerBody;
  }

  if (!body) {
    return;
  }

  Game.spawns[env.spawnName].spawnCreep(body, `${role}${index}`, { memory: { role } });
};

import BaseCreepMemory from '../Creeps/BaseCreepMemory';
import env from '../env';

const workerBody1 = [WORK, MOVE, MOVE, CARRY];
const workerBody2 = [WORK, WORK, MOVE, MOVE, CARRY, CARRY];
const rangerBody1 = [RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE];
const rangerBody2 = [RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE];
const meleeBody1 = [ATTACK, ATTACK, MOVE, MOVE];
const meleeBody2 = [ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE];

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

    if (availableEnergy > 300) {
      body = workerBody2;
    } else {
      body = workerBody1;
    }
  }

  if (rangers.length < 2) {
    role = 'ranger';
    index = rangers.length;

    if (availableEnergy > 300) {
      body = rangerBody2;
    } else {
      body = rangerBody1;
    }
  }

  if (melees.length < 2) {
    role = 'melee';
    index = melees.length;

    if (availableEnergy > 300) {
      body = meleeBody2;
    } else {
      body = meleeBody1;
    }
  }

  if (upgraders.length < 2) {
    role = 'upgrader';
    index = upgraders.length;

    if (availableEnergy > 300) {
      body = workerBody2;
    } else {
      body = workerBody1;
    }
  }

  if (harvesters.length < 2) {
    role = 'harvester';
    index = harvesters.length;

    if (availableEnergy > 300) {
      body = workerBody2;
    } else {
      body = workerBody1;
    }
  }

  if (!body) {
    return;
  }

  Game.spawns[env.spawnName].spawnCreep(body, `${role}${index}`, { memory: { role } });
};

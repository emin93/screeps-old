import { defenderMoveOpts, defenderMoveToEnemyOpts, BaseCreepMemory } from './Base';

export default (creep: Creep) => {
  const memory = <BaseCreepMemory>creep.memory;
  const flag = Game.flags['Flag1'];

  if (!flag) {
    return;
  }

  let closestTarget: any = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

  if (!closestTarget) {
    closestTarget = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
  }

  if (memory.job !== 'defending' && closestTarget && creep.pos.inRangeTo(flag, 5)) {
    memory.job = 'defending';
  }

  if (memory.job !== 'patrolling' && !closestTarget) {
    memory.job = 'patrolling';
  }

  if (memory.job === 'patrolling') {
    creep.moveTo(flag, defenderMoveOpts);
    return;
  }

  if (!closestTarget) {
    return;
  }

  if (memory.role === 'ranger') {
    if (creep.rangedAttack(closestTarget) === ERR_NOT_IN_RANGE) {
      creep.moveTo(closestTarget, defenderMoveToEnemyOpts);
    }
  } else if (memory.role === 'melee') {
    if (creep.attack(closestTarget) === ERR_NOT_IN_RANGE) {
      creep.moveTo(closestTarget, defenderMoveToEnemyOpts);
    }
  }
};

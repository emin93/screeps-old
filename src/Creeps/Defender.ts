import { defenderMoveOpts, defenderMoveToEnemyOpts, BaseCreepMemory } from './Base';

export default (creep: Creep) => {
  const memory = <BaseCreepMemory>creep.memory;
  const flag = Game.flags['Flag1'];

  if (!flag) {
    return;
  }

  const closestEnemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

  if (memory.job !== 'defending' && closestEnemy) {
    memory.job = 'defending';
  }

  if (memory.job !== 'patrolling' && !closestEnemy) {
    memory.job = 'patrolling';
  }

  if (memory.job === 'patrolling') {
    creep.moveTo(flag.pos, defenderMoveOpts);
    return;
  }

  if (!closestEnemy) {
    return;
  }

  if (memory.role === 'ranger') {
    if (creep.rangedAttack(closestEnemy) === ERR_NOT_IN_RANGE) {
      creep.moveTo(closestEnemy.pos, defenderMoveToEnemyOpts);
    }
  } else if (memory.role === 'melee') {
    if (creep.attack(closestEnemy) === ERR_NOT_IN_RANGE) {
      creep.moveTo(closestEnemy.pos, defenderMoveToEnemyOpts);
    }
  }
};

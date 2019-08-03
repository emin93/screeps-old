import { defenderMoveOpts, defenderMoveToEnemyOpts, BaseCreepMemory } from '../Base';

export default (creep: Creep) => {
  const memory = <BaseCreepMemory>creep.memory;
  const closestEnemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

  if (memory.job !== 'defending' && closestEnemy) {
    memory.job = 'defending';
  }

  if (memory.job === 'defending' && !closestEnemy) {
    memory.job = 'patrolling';
  }

  if (memory.job === 'patrolling') {
    const flag = creep.pos.findClosestByRange(FIND_FLAGS);
    if (!flag) {
      return;
    }

    creep.moveTo(flag, defenderMoveOpts);
    return;
  }

  if (closestEnemy && creep.attack(closestEnemy) === ERR_NOT_IN_RANGE) {
    creep.moveTo(closestEnemy, defenderMoveToEnemyOpts);
  }
};

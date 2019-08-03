import { defenderMoveOpts, defenderMoveToEnemyOpts, BaseCreepMemory } from '../Base';

export default (creep: Creep, attack: (target: Creep) => CreepActionReturnCode) => {
  const memory = <BaseCreepMemory>creep.memory;
  const flag = Game.flags['Flag1'];

  if (!flag) {
    return;
  }

  const closestEnemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
  const isCloseToFlag = creep.pos.inRangeTo(flag, 5);

  if (memory.job !== 'defending' && closestEnemy && isCloseToFlag) {
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

  if (attack(closestEnemy) === ERR_NOT_IN_RANGE) {
    creep.moveTo(closestEnemy.pos, defenderMoveToEnemyOpts);
  }
};

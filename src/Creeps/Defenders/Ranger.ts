import { defenderMoveOpts, defenderMoveToEnemyOpts } from '../Base';

export default (creep: Creep) => {
  const closestEnemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

  if (!closestEnemy) {
    const flag = creep.pos.findClosestByRange(FIND_FLAGS);
    if (!flag) {
      return;
    }

    creep.moveTo(flag, defenderMoveOpts);
    return;
  }

  if (creep.rangedAttack(closestEnemy) === ERR_NOT_IN_RANGE) {
    creep.moveTo(closestEnemy, defenderMoveToEnemyOpts);
  }
};

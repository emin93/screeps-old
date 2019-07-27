export default (creep: Creep) => {
  const closestEnemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

  if (!closestEnemy) {
    const flag = creep.pos.findClosestByRange(FIND_FLAGS);
    if (!flag) {
      return;
    }

    creep.moveTo(flag);
    return;
  }

  if (creep.attack(closestEnemy) === ERR_NOT_IN_RANGE) {
    creep.moveTo(closestEnemy);
  }
};

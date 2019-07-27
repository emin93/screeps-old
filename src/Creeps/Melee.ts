export default (creep: Creep) => {
  const closestEnemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

  if (!closestEnemy) {
    return;
  }

  creep.attack(closestEnemy);
};

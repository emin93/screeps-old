export default (tower: StructureTower) => {
  const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: structure => structure.hits < structure.hitsMax,
  });

  if (closestDamagedStructure && closestDamagedStructure.structureType !== STRUCTURE_WALL) {
    tower.repair(closestDamagedStructure);
  }

  const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
  if (closestHostile) {
    tower.attack(closestHostile);
  }
};

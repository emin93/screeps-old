export default (tower: StructureTower) => {
  const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: structure => structure.structureType !== STRUCTURE_WALL && structure.hits < structure.hitsMax,
  });

  if (closestDamagedStructure) {
    tower.repair(closestDamagedStructure);
  }

  const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
  if (closestHostile) {
    tower.attack(closestHostile);
  }
};

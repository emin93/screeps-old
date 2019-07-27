export default interface BaseCreepMemory extends CreepMemory {
  role: 'builder' | 'harvester' | 'upgrader';
}

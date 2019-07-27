export type CreepRole = 'builder' | 'harvester' | 'upgrader' | 'ranger' | 'melee';

export default interface BaseCreepMemory extends CreepMemory {
  role: CreepRole;
}

export type CreepRole = 'builder' | 'harvester' | 'upgrader';

export default interface BaseCreepMemory extends CreepMemory {
  role: CreepRole;
}

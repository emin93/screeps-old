export type CreepRole = 'builder' | 'harvester' | 'upgrader' | 'ranger' | 'melee';
export type CreepType = 'defender' | 'worker';

export interface BaseCreepMemory extends CreepMemory {
  role: CreepRole;
  level: number;
  isRecycling: boolean;
}

export const getTypeByRole = (role: CreepRole): CreepType => {
  const typeByRole: { [role: string]: CreepType } = {
    builder: 'worker',
    harvester: 'worker',
    upgrader: 'worker',
    ranger: 'defender',
    melee: 'defender',
  };

  return typeByRole[role];
};

export const getBodyForRoleLevel = (role: CreepRole, level: number): BodyPartConstant[] => {
  const bodys = {
    worker: {
      1: [WORK, MOVE, MOVE, CARRY],
      2: [WORK, WORK, MOVE, MOVE, CARRY, CARRY],
    },
    defender: {
      ranger: {
        1: [RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE],
        2: [RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE],
      },
      melee: {
        1: [ATTACK, ATTACK, MOVE, MOVE],
        2: [ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE],
      },
    },
  };

  const type = getTypeByRole(role);
  const body = bodys[type];

  if (body[level]) {
    return body[level];
  }

  return body[role][level];
};

export type CreepRole = 'builder' | 'harvester' | 'upgrader' | 'repairer' | 'ranger' | 'melee';
export type CreepType = 'defender' | 'worker';

export interface BaseCreepMemory extends CreepMemory {
  role: CreepRole;
  level: number;
  isRecycling: boolean;
  isRenewing: boolean;
}

export const getTypeByRole = (role: CreepRole): CreepType => {
  const typeByRole: { [role: string]: CreepType } = {
    builder: 'worker',
    harvester: 'worker',
    upgrader: 'worker',
    repairer: 'worker',
    ranger: 'defender',
    melee: 'defender',
  };

  return typeByRole[role];
};

export const getBodyForRoleLevel = (role: CreepRole, level: number): BodyPartConstant[] => {
  const workerBodys = [
    [WORK, MOVE, MOVE, CARRY],
    [WORK, WORK, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY],
    [WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY],
  ];
  const rangerBodys = [
    [RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE],
    [RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE, MOVE],
    [TOUGH, TOUGH, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE, MOVE],
  ];
  const meleeBodys = [
    [ATTACK, ATTACK, MOVE, MOVE],
    [ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE],
    [TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE],
  ];

  const type = getTypeByRole(role);
  let body: BodyPartConstant[];

  if (type === 'worker') {
    body = workerBodys[level - 1];
  } else {
    if (role === 'ranger') {
      body = rangerBodys[level - 1];
    } else {
      body = meleeBodys[level - 1];
    }
  }

  return body;
};

export const workerMoveOpts: MoveToOpts = {
  visualizePathStyle: { stroke: '#9a91ff' },
};

export const defenderMoveOpts: MoveToOpts = {
  visualizePathStyle: { stroke: '#ff9191' },
};

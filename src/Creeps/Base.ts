export type CreepRole = 'builder' | 'harvester' | 'upgrader' | 'repairer' | 'ranger' | 'melee';
export type CreepType = 'defender' | 'worker';
export type CreepJob =
  | 'building'
  | 'harvesting'
  | 'repairing'
  | 'replenishing'
  | 'upgrading'
  | 'recycling'
  | 'renewing'
  | 'defending'
  | 'patrolling';

const workerBodys = [
  [
    ...Array.from({ length: 2 }).map(() => MOVE),
    ...Array.from({ length: 1 }).map(() => WORK),
    ...Array.from({ length: 1 }).map(() => CARRY),
  ],
  [
    ...Array.from({ length: 4 }).map(() => MOVE),
    ...Array.from({ length: 2 }).map(() => WORK),
    ...Array.from({ length: 2 }).map(() => CARRY),
  ],
  [
    ...Array.from({ length: 7 }).map(() => MOVE),
    ...Array.from({ length: 2 }).map(() => WORK),
    ...Array.from({ length: 3 }).map(() => CARRY),
  ],
  [
    ...Array.from({ length: 11 }).map(() => MOVE),
    ...Array.from({ length: 4 }).map(() => WORK),
    ...Array.from({ length: 4 }).map(() => CARRY),
  ],
];

const rangerBodys = [
  [
    ...Array.from({ length: 1 }).map(() => TOUGH),
    ...Array.from({ length: 2 }).map(() => MOVE),
    ...Array.from({ length: 1 }).map(() => RANGED_ATTACK),
  ],
  [
    ...Array.from({ length: 3 }).map(() => TOUGH),
    ...Array.from({ length: 5 }).map(() => MOVE),
    ...Array.from({ length: 1 }).map(() => RANGED_ATTACK),
  ],
  [
    ...Array.from({ length: 6 }).map(() => TOUGH),
    ...Array.from({ length: 7 }).map(() => MOVE),
    ...Array.from({ length: 2 }).map(() => RANGED_ATTACK),
  ],
  [
    ...Array.from({ length: 16 }).map(() => TOUGH),
    ...Array.from({ length: 14 }).map(() => MOVE),
    ...Array.from({ length: 2 }).map(() => RANGED_ATTACK),
  ],
];

const meleeBodys = [
  [
    ...Array.from({ length: 1 }).map(() => TOUGH),
    ...Array.from({ length: 2 }).map(() => MOVE),
    ...Array.from({ length: 1 }).map(() => ATTACK),
  ],
  [
    ...Array.from({ length: 3 }).map(() => TOUGH),
    ...Array.from({ length: 5 }).map(() => MOVE),
    ...Array.from({ length: 2 }).map(() => ATTACK),
  ],
  [
    ...Array.from({ length: 6 }).map(() => TOUGH),
    ...Array.from({ length: 7 }).map(() => MOVE),
    ...Array.from({ length: 3 }).map(() => ATTACK),
  ],
  [
    ...Array.from({ length: 16 }).map(() => TOUGH),
    ...Array.from({ length: 14 }).map(() => MOVE),
    ...Array.from({ length: 3 }).map(() => ATTACK),
  ],
];

export interface BaseCreepMemory extends CreepMemory {
  role: CreepRole;
  level: number;
  job: CreepJob;
  type: CreepType;
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
  visualizePathStyle: { stroke: '#00eb42', opacity: 0.7 },
};

export const workerMoveToSourceOpts: MoveToOpts = {
  visualizePathStyle: { stroke: '#ebeb05', opacity: 0.7 },
};

export const defenderMoveOpts: MoveToOpts = {
  visualizePathStyle: { stroke: '#ffffff', opacity: 0.7 },
};

export const defenderMoveToEnemyOpts: MoveToOpts = {
  visualizePathStyle: { stroke: '#ff0000', opacity: 1 },
};

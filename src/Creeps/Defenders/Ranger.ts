import defend from './Defender';

export default (creep: Creep) => defend(creep, creep.rangedAttack);

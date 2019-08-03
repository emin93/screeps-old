export default () =>
  Memory.creeps && Object.keys(Memory.creeps).forEach(name => !Game.creeps[name] && delete Memory.creeps[name]);

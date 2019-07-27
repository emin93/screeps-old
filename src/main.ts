import collectGarbage from './Utils/GarbageCollector';

export const loop = () => {
  collectGarbage();

  console.log('yo');
};

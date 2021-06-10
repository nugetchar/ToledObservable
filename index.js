export class Fleuve {
  constructor(source) {
    let _innerSource = source;

    const subscribers = [];

    this.next = (...events) => {
      // (A || B) && !(A && B) 
      const onlyFunctions = events.every(event => isFunction(event));
      const onlyScalar = events.every(event => !isFunction(event)); 
      if (!onlyFunctions && !onlyScalar) {
        throw new Error('Please provide either only scalar values or only functions');
      }
      events.forEach(event => {
        if (isFunction(event)) {
          _innerSource = event(_innerSource);
        } else {
          _innerSource = event;
        }
        subscribers.forEach((f) => f(_innerSource));
      })
    };

    this.subscribe = (f) => {
      if (!isFunction(f)) {
        throw new Error('Please provide a function');
      }
      subscribers.push(f);
      f(_innerSource);
    };

    this.pipe = (...functions) => {
      const fns = filterNonFunctions(...functions);
      const obs = new Observable();
      if (fns.length > 0) {
        const res = fns.slice(1).reduce((val, fn) => fn(val), fns[0](_innerSource));
        obs.next(res);
      }
      return obs;
    };

    const filterNonFunctions = (...fns) => fns.filter((f) => isFunction(f));

    const isFunction = (fn) => typeof fn === 'function';
  }
}

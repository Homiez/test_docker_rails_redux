export default function clientMiddleware(client) {
  return ({dispatch, getState}) => {
    return next => action => {
      console.log('clientMiddlewar0');
      if (typeof action === 'function') {
        console.log('clientMiddlewar1');
        return action(dispatch, getState);
      }

      const { promise, types, ...rest } = action; // eslint-disable-line no-redeclare
      if (!promise) {
        console.log('clientMiddlewar2');
        console.log(action);
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      console.log('-------clientMiddlewar1-----');
      console.log(types);
      next({...rest, type: REQUEST});
      return promise(client).then(
        (result) => next({...rest, result, type: SUCCESS}),
        (error) => next({...rest, error, type: FAILURE})
      ).catch((error)=> {
        console.error('MIDDLEWARE ERROR:', error);
        next({...rest, error, type: FAILURE});
      });
    };
  };
}

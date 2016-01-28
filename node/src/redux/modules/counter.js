const INCREMENT = 'redux-example/counter/INCREMENT';

const initialState = {
  count: 0
};

export default function reducer(state = initialState, action = {}) {
  console.log('increment reducer');
  switch (action.type) {
    case INCREMENT:
      const {count} = state;
      return {
        count: count + 1
      };
    default:
      return state;
  }
}

export function increment() {
  console.log('increment!');
  return {
    type: INCREMENT
  };
}

const LOAD = 'redux-example/MESSAGE_LOAD';
const LOAD_SUCCESS = 'redux-example/MESSAGE_LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/MESSAGE_LOAD_FAIL';

const initialState = {
  loaded: false,
  data: null
};

export default function reducer(state = initialState, action = {}) {
  console.log('message func');
  console.log(action.type);
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loaded: true,
        data: action.result
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        messages: state.data.push(action.result)
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function load(data) {
  console.log('~~~~~~~~~~~~~~~modules:message.js');
  console.log(data);
  const action = {};
  const parsedData = JSON.parse(data);
  if (parsedData.message) {
    console.log('msg');
    console.log(parsedData.message);
    action.type = LOAD_SUCCESS;
    action.result = parsedData.message;
  } else {
    console.log('array');
    action.type = LOAD;
    action.result = JSON.parse(parsedData.messages);
  }
  return action;
}

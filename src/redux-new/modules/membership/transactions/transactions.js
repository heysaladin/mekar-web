const LOAD = 'membership/transactions/LOAD';
const LOAD_SUCCESS = 'membership/transactions/LOAD_SUCCESS';
const LOAD_FAIL = 'membership/transactions/LOAD_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case LOAD:
    return {
      ...state,
      data: null,
      loading: true
    };
  case LOAD_SUCCESS:
    return {
      ...state,
      loading: false,
      loaded: true,
      data: action.result,
      error: null
    };
  case LOAD_FAIL:
    return {
      ...state,
      loading: false,
      loaded: false,
      data: null,
      error: action.error
    };
  default:
    return state;
  }
}

export function isLoaded(globalState) {
  return false;
}

export function load(params) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/membership/transactions', {
      data: params
    })
  };
}

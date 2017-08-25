const LOAD = 'public/provinces/LOAD';
const LOAD_SUCCESS = 'public/provinces/LOAD_SUCCESS';
const LOAD_FAIL = 'public/provinces/LOAD_FAIL';

const initialState = {
  provincesError: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data,
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
  return globalState.provinces && globalState.provinces.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/system/provinces')
  };
}

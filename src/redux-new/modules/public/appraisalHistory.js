const LOAD = 'public/appraisalHistory/LOAD';
const LOAD_SUCCESS = 'public/appraisalHistory/LOAD_SUCCESS';
const LOAD_FAIL = 'public/appraisalHistory/LOAD_FAIL';

const initialState = {
  loaded: false
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
  return globalState.appraisalHistory && globalState.appraisalHistory.loaded;
}

export function load(params) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/simulation/appraisalHistory/' + params.id, {
      data: params
    })
  };
}

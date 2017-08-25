const LOAD = 'membership/transactionDetail/LOAD';
const LOAD_SUCCESS = 'membership/transactionDetail/LOAD_SUCCESS';
const LOAD_FAIL = 'membership/transactionDetail/LOAD_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
        data: null
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
  return globalState.transactionDetail && globalState.transactionDetail.loaded;
}

export function load(params) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/membership/transaction/id/' + params.transactionId, {
      data: params
    })
  };
}

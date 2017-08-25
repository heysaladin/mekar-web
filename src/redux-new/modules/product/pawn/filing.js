const VALIDATE_RECOMMENDATION_CODE = 'pawn/filing/VALIDATE_RECOMMENDATION_CODE';
const VALIDATE_RECOMMENDATION_CODE_SUCCESS = 'pawn/filing/VALIDATE_RECOMMENDATION_CODE';
const VALIDATE_RECOMMENDATION_CODE_FAIL = 'pawn/filing/VALIDATE_RECOMMENDATION_CODE';
const VALIDATE_VOUCHER_STORE = 'pawn/filing/VALIDATE_VOUCHER_STORE';
const VALIDATE_VOUCHER_STORE_SUCCESS = 'pawn/filing/VALIDATE_VOUCHER_STORE';
const VALIDATE_VOUCHER_STORE_FAIL = 'pawn/filing/VALIDATE_VOUCHER_STORE';
const LOAD = 'pawn/filing/LOAD';
const LOAD_SUCCESS = 'pawn/filing/LOAD_SUCCESS';
const LOAD_FAIL = 'pawn/filing/LOAD_FAIL';
const SAVE = 'pawn/filing/SAVE';
const SAVE_SUCCESS = 'pawn/filing/SAVE_SUCCESS';
const SAVE_FAIL = 'pawn/filing/SAVE_FAIL';

const initialState = {
  filingError: {}
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
    case SAVE:
      return state; // 'saving' flag handled by redux-form
    case SAVE_SUCCESS:
      return {
        ...state,
        data: action.result,
      };
    case SAVE_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        filingError: {
          ...state.filingError,
          [action.id]: action.error
        }
      } : state;
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.filing && globalState.filing.loaded;
}

export function load(params) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/simulation/appraisal/id/' + params.simulationId, {
      data: params
    })
  };
}

export function save(values) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    promise: (client) => client.post('/filing/new', {
      data: values
    })
  };
}

export function validateRecommendationCode(values) {
  return {
    types: [VALIDATE_RECOMMENDATION_CODE, VALIDATE_RECOMMENDATION_CODE_SUCCESS, VALIDATE_RECOMMENDATION_CODE_FAIL],
    promise: (client) => client.post('/filing/validateRecommendationCode', {
      data: values
    })
  };
}

export function validateVoucherStore(values) {
  return {
    types: [VALIDATE_VOUCHER_STORE, VALIDATE_VOUCHER_STORE_SUCCESS, VALIDATE_VOUCHER_STORE_FAIL],
    promise: (client) => client.post('/filing/validateVoucherStore', {
      data: values
    })
  };
}

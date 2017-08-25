const LOAD = 'redux-example/widgets/LOAD';
const LOAD_SUCCESS = 'redux-example/widgets/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/widgets/LOAD_FAIL';
const SIMULATE = 'pawn/simulate/SIMULATE';
const SIMULATE_SUCCESS = 'pawn/simulate/SIMULATE_SUCCESS';
const SIMULATE_FAIL = 'pawn/simulate/SIMULATE_FAIL';

const initialState = {
  loaded: false,
  simulateError: {}
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
    case SIMULATE:
      return {
        ...state,
        calculating: true,
        calculatingData: null,
      }; // 'saving' flag handled by redux-form
    case SIMULATE_SUCCESS:
      return {
        ...state,
        calculating: false,
        calculatingData: action.result,
      };
    case SIMULATE_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        calculating: false,
        calculatingData: null,
        simulateError: {
          ...state.simulateError,
          [action.id]: action.error
        }
      } : state;
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.simulationData && globalState.simulationData.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/pawn/getSimulationData')
  };
}

export function pawn(values) {
  return {
    types: [SIMULATE, SIMULATE_SUCCESS, SIMULATE_FAIL],
    promise: (client) => client.post('/simulation/price', {
      data: values
    })
  };
}

export function simulate(values) {
  let url = null;

  // switch (values.category) {
  // case 'emas':
  //   url = '/pawn/partnerRegister/emas';
  //   break;
  // case 'sepeda-motor':
  //   url = '/pawn/partnerRegister/sepeda-motor';
  //   break;
  // case 'laptop':
  //   url = '/pawn/partnerRegister/laptop';
  //   break;
  // case 'handphone':
  //   url = '/pawn/partnerRegister/handphone';
  //   break;
  // case 'kamera':
  //   url = '/pawn/partnerRegister/kamera';
  //   break;
  // case 'tablet-pc':
  //   url = '/pawn/partnerRegister/tablet-pc';
  //   break;
  // case 'mobil':
  //   url = '/pawn/partnerRegister/mobil';
  //   break;
  // default:
  //   url = '/notfound'
  //   break;
  // }

  // sementara masih 1 url
  url = '/simulation/appraise';

  return {
    types: [SIMULATE, SIMULATE_SUCCESS, SIMULATE_FAIL],
    promise: (client) => client.post(url, {
      data: values
    })
  };
}

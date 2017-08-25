const LOAD_CITY = 'public/city/LOAD_CITY';
const LOAD_CITY_SUCCESS = 'public/city/LOAD_CITY_SUCCESS';
const LOAD_CITY_FAIL = 'public/city/LOAD_CITY_FAIL';

const LOAD_PROVINCE = 'public/city/LOAD_PROVINCE';
const LOAD_PROVINCE_SUCCESS = 'public/city/LOAD_PROVINCE_SUCCESS';
const LOAD_PROVINCE_FAIL = 'public/city/LOAD_PROVINCE_FAIL';

const initialState = {
  cityError: {},
  data: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_CITY:
      return {
        ...state,
        loading: true,
        data: []
      };
    case LOAD_CITY_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data,
        error: null
      };
    case LOAD_CITY_FAIL:
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
  return globalState.city && globalState.city.loaded;
}

export function city(params) {
  return {
    types: [LOAD_PROVINCE, LOAD_PROVINCE_SUCCESS, LOAD_PROVINCE_FAIL],
    promise: (client) => client.get('/system/provinces/id/' + params.provinceId + '/cities', {
      data: params
    })
  };
}

export function citySingle(params) {
  return {
    types: [LOAD_CITY, LOAD_CITY_SUCCESS, LOAD_CITY_FAIL],
    promise: (client) => client.get('/system/cities/id/' + params.cityId, {
      data: params
    })
  };
}
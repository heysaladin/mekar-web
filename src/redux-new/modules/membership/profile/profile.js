import {load as loadAuth} from 'redux/modules/auth';

const LOAD = 'public/profile/LOAD';
const LOAD_SUCCESS = 'public/profile/LOAD_SUCCESS';
const LOAD_FAIL = 'public/profile/LOAD_FAIL';
const SAVE = 'public/profile/SAVE';
const SAVE_SUCCESS = 'public/profile/SAVE_SUCCESS';
const SAVE_FAIL = 'public/profile/SAVE_FAIL';
const CHANGEPASSWORD = 'public/profile/CHANGEPASSWORD';
const CHANGEPASSWORD_SUCCESS = 'public/profile/CHANGEPASSWORD_SUCCESS';
const CHANGEPASSWORD_FAIL = 'public/profile/CHANGEPASSWORD_FAIL';

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
    case SAVE:
      return state; // 'saving' flag handled by redux-form
    case SAVE_SUCCESS:
      return {data: state.data, saveError: state.saveError};
    case SAVE_FAIL:
      return typeof action.error === 'string'
        ? {
          saveError: state.saveError
        }
        : state;
    case CHANGEPASSWORD:
      return state; // 'saving' flag handled by redux-form
    case CHANGEPASSWORD_SUCCESS:
      return {data: state.data, saveError: state.saveError};
    case CHANGEPASSWORD_FAIL:
      return typeof action.error === 'string'
        ? {
          saveError: state.saveError
        }
        : state;
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.profile && globalState.profile.loaded;
}

export function load(params) {
  return {
    types: [
      LOAD, LOAD_SUCCESS, LOAD_FAIL
    ],
    promise: (client) => client.post('/membership/profile', {data: params})
  };
}

export function save(params) {
  return {
    types: [
      SAVE, SAVE_SUCCESS, SAVE_FAIL
    ],
    promise: (client) => client.put('/membership/profile', {data: params})
  };
}

export function saveAndReloadAuth(params) {
  return (dispatch) => {
    return dispatch(save(params))
    .then(() => {
      return dispatch(loadAuth());
    });
  };
}

export function changePassword(params) {
  return {
    types: [
      CHANGEPASSWORD, CHANGEPASSWORD_SUCCESS, CHANGEPASSWORD_FAIL
    ],
    promise: (client) => client.put('/membership/profile/password', {data: params})
  };
}

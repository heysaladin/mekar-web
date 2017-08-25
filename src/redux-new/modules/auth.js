import cookie from 'js-cookie';

const LOAD = 'pinjam/auth/LOAD';
const LOAD_SUCCESS = 'pinjam/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'pinjam/auth/LOAD_FAIL';
const LOGIN = 'pinjam/auth/LOGIN';
const LOGIN_SUCCESS = 'pinjam/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'pinjam/auth/LOGIN_FAIL';
const LOGOUT = 'pinjam/auth/LOGOUT';
const LOGOUT_SUCCESS = 'pinjam/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'pinjam/auth/LOGOUT_FAIL';
const FORGOTPASSWORD = 'pinjam/auth/FORGOTPASSWORD';
const FORGOTPASSWORD_SUCCESS = 'pinjam/auth/FORGOTPASSWORD_SUCCESS';
const FORGOTPASSWORD_FAIL = 'pinjam/auth/FORGOTPASSWORD_FAIL';
const RECOVERYPASSWORD = 'pinjam/auth/RECOVERYPASSWORD';
const RECOVERYPASSWORD_SUCCESS = 'pinjam/auth/RECOVERYPASSWORD_SUCCESS';
const RECOVERYPASSWORD_FAIL = 'pinjam/auth/RECOVERYPASSWORD_FAIL';

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
      token: action.result.data.token,
      identity: action.result.data // or null for test non login
    };
  case LOAD_FAIL:
    return {
      ...state,
      loading: false,
      loaded: false,
      error: action.error
    };
  case LOGIN:
    return {
      ...state,
      loggingIn: false
    };
  case LOGIN_SUCCESS:
    return {
      ...state,
      loggingIn: true,
      token: action.result.data.token,
      identity: action.result.data.user
    };
  case LOGIN_FAIL:
    return {
      ...state,
      loggingIn: false,
      token: null,
      identity: null,
      loginError: action.error
    };
  case LOGOUT:
    return {
      ...state,
      loggingOut: true
    };
  case LOGOUT_SUCCESS:
    return {
      ...state,
      loggingOut: false,
      token: null,
      identity: null
    };
  case LOGOUT_FAIL:
    return {
      ...state,
      loggingOut: false,
      logoutError: action.error
    };
  case FORGOTPASSWORD:
    return state; // 'saving' flag handled by redux-form
  case FORGOTPASSWORD_SUCCESS:
    return {
      data: state.data,
      saveError: state.saveError
    };
  case FORGOTPASSWORD_FAIL:
    return typeof action.error === 'string' ? {
      saveError: state.saveError
    } : state;
  case RECOVERYPASSWORD:
    return state; // 'saving' flag handled by redux-form
  case RECOVERYPASSWORD_SUCCESS:
    return {
      data: state.data,
      saveError: state.saveError
    };
  case RECOVERYPASSWORD_FAIL:
    return typeof action.error === 'string' ? {
      saveError: state.saveError
    } : state;
  default:
    return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

function setCookie(result) {
  const {
    data
  } = result;
  // const options = result.expires ? { expires: result.expires / (60 * 60 * 24 * 1000) } : undefined;
  const options = {
    expires: (60 * 60 * 24 * 1000)
  };
  cookie.set('pinjamID', data.id, options);
  cookie.set('pinjamToken', data.token, options);
  return result;
}

export function load(params) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/membership/loadAuth', {
      data: {}
    })
  };
}

export function login(identity) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/account/login', {
        data: identity
      })
      .then(setCookie)
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: () => {
      cookie.set('pinjamID', null, {
        expires: -1
      });
      cookie.set('pinjamToken', null, {
        expires: -1
      });
      localStorage.clear();
      sessionStorage.clear();

      return Promise.resolve();
    }
  };
}

export function forgotPassword(identity) {
  return {
    types: [FORGOTPASSWORD, FORGOTPASSWORD_SUCCESS, FORGOTPASSWORD_FAIL],
    promise: (client) => client.post('/account/forgot-password', {
      data: identity
    })
  };
}

export function recoveryPassword(params) {
  return {
    types: [RECOVERYPASSWORD, RECOVERYPASSWORD_SUCCESS, RECOVERYPASSWORD_FAIL],
    promise: (client) => client.post('/account/change-password', {
      data: params
    })
  };
}

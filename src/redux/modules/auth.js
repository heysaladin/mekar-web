// import app, { restApp, socket } from 'app';
import app, { restApp } from 'app';
import { SubmissionError } from 'redux-form';
import cookie from 'js-cookie';

const LOAD = 'pinjam/auth/LOAD';
const LOAD_SUCCESS = 'pinjam/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'pinjam/auth/LOAD_FAIL';
const LOGIN = 'pinjam/auth/LOGIN';
const LOGIN_SUCCESS = 'pinjam/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'pinjam/auth/LOGIN_FAIL';
const REGISTER = 'pinjam/auth/REGISTER';
const REGISTER_SUCCESS = 'pinjam/auth/REGISTER_SUCCESS';
const REGISTER_FAIL = 'pinjam/auth/REGISTER_FAIL';
const LOGOUT = 'pinjam/auth/LOGOUT';
const LOGOUT_SUCCESS = 'pinjam/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'pinjam/auth/LOGOUT_FAIL';

const userService = restApp.service('users');

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
        accessToken: action.result.data.token,
        user: { id: action.result.data.id }
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
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        accessToken: action.result.data.token,
        user: { id: action.result.data.id }
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        loginError: action.error
      };
    case REGISTER:
      return {
        ...state,
        registeringIn: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registeringIn: false
      };
    case REGISTER_FAIL:
      return {
        ...state,
        registeringIn: false,
        registerError: action.error
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
        accessToken: null,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    default:
      return state;
  }
}

const catchValidation = error => {
  if (error.error.message) {
    if (error.error.message === 'Validation failed' && error.data) {
      throw new SubmissionError(error.error.data);
    }
    throw new SubmissionError({ _error: error.error.message });
  }
  return Promise.reject(error.error);
};

function setToken(client, response) {
  const { data } = response;

  // set manually the JWT for both instances of feathers/client
  app.set('accessToken', data.token);
  restApp.set('accessToken', data.token);
  client.setJwtToken(data.token);

  return response;
}

function setCookie(response) {
  const options = response.data.expires ? { expires: response.data.expires / (60 * 60 * 24 * 1000) } : undefined;
  cookie.set('pinjam-token', app.get('accessToken'), options);
  cookie.set('pinjam-id', response.data.id);
  return response;
}

/*
* Actions
* * * * */

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

// export function load() {
//   return {
//     types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
//     promise: () => restApp.authenticate()
//   };
// }
export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/membership/loadAuth', {
      data: { userId: 18514 }
    })
    .then(response => {
      console.log(response);
      return response;
    })
  };
}

export function register(data) {
  return {
    types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
    promise: () => userService.create(data).catch(catchValidation)
  };
}

/** HOLD: for multiple strategy, including social media */
// export function login(strategy, data, validation = true) {
//   const socketId = socket.io.engine.id;
//   return {
//     types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
//     promise: client => restApp.authenticate({
//       ...data,
//       strategy,
//       socketId
//     })
//       .then(response => setToken(client, response))
//       .then(setCookie)
//       .then(response => {
//         app.set('user', response.user);
//         return response;
//       })
//       .catch(validation ? catchValidation : error => Promise.reject(error))
//   };
// }

export function login(strategy, data, validation = true) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/account/login', {
      data
    })
      .then(response => setToken(client, response))
      .then(setCookie)
      .then(response => {
        app.set('user', { id: response.data.id });
        return response;
      })
      .catch(validation ? catchValidation : error => Promise.reject(error))
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: client => app.logout()
      .then(() => {
        setToken(client, { accessToken: null });

        cookie.set('pinjam-id', null, {
          expires: -1
        });
        cookie.set('pinjam-token', null, {
          expires: -1
        });
        localStorage.clear();
        sessionStorage.clear();
      })
  };
}

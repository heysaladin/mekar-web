const SAVE = 'pinjam/register/SAVE';
const SAVE_SUCCESS = 'pinjam/register/SAVE_SUCCESS';
const SAVE_FAIL = 'pinjam/register/SAVE_FAIL';

const initialState = {
  loaded: false,
  saveError: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SAVE:
      return state; // 'saving' flag handled by redux-form
    case SAVE_SUCCESS:
      return {
        data: state.data,
        saveError: state.saveError
      };
    case SAVE_FAIL:
      return typeof action.error === 'string' ? {
        saveError: state.saveError
      } : state;
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.register && globalState.register.loaded;
}

export function save(register) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    promise: (client) => client.post('/account/register', {
      data: register
    })
  };
}

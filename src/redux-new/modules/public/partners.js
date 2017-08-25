const SAVE = 'public/partners/SAVE';
const SAVE_SUCCESS = 'public/partners/SAVE_SUCCESS';
const SAVE_FAIL = 'public/partners/SAVE_FAIL';

const initialState = {
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

export function save(params) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    promise: (client) => client.post('/mitra/new', {
      data: params
    })
  };
}

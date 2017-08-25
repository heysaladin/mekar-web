const SAVE = 'public/careers/SAVE';
const SAVE_SUCCESS = 'public/careers/SAVE_SUCCESS';
const SAVE_FAIL = 'public/careers/SAVE_FAIL';

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
    promise: (client) => client.post('/pawn/partnerRegister', {
      data: params
    })
  };
}

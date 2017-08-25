const LOAD = 'pawn/confirmation/LOAD';
const LOAD_SUCCESS = 'pawn/confirmation/LOAD_SUCCESS';
const LOAD_FAIL = 'pawn/confirmation/LOAD_FAIL';
const CONFIRMATION = 'pawn/confirmation/CONFIRMATION';
const CONFIRMATION_SUCCESS = 'pawn/confirmation/CONFIRMATION_SUCCESS';
const CONFIRMATION_FAIL = 'pawn/confirmation/CONFIRMATION_FAIL';

const initialState = {
  confirmationError: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case CONFIRMATION:
    return state; // 'saving' flag handled by redux-form
  case CONFIRMATION_SUCCESS:
    return {
      ...state,
      data: action.result,
    };
  case CONFIRMATION_FAIL:
    return typeof action.error === 'string' ? {
      ...state,
      confirmationError: {
        ...state.confirmationError,
        [action.id]: action.error
      }
    } : state;
  default:
    return state;
  }
}

export function confirmation(values) {
  return {
    types: [CONFIRMATION, CONFIRMATION_SUCCESS, CONFIRMATION_FAIL],
    promise: (client) => client.post('/membership/transaction/confirmation', {
      data: values
    })
  };
}

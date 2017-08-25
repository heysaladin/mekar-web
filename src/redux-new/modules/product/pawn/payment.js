const PAYMENT = 'pawn/payment/PAYMENT';
const PAYMENT_SUCCESS = 'pawn/payment/PAYMENT_SUCCESS';
const PAYMENT_FAIL = 'pawn/payment/PAYMENT_FAIL';

const initialState = {
  paymentError: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case PAYMENT:
      return state; // 'saving' flag handled by redux-form
    case PAYMENT_SUCCESS:
      return {
        ...state,
        data: action.result,
      };
    case PAYMENT_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        paymentError: {
          ...state.paymentError,
          [action.id]: action.error
        }
      } : state;
    default:
      return state;
  }
}

export function payment(values) {
  return {
    types: [PAYMENT, PAYMENT_SUCCESS, PAYMENT_FAIL],
    promise: (client) => client.post('/membership/transaction/payment', {
      data: values
    })
  };
}

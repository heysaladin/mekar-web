import dataConstant from '../../../../data/constant.json';

const FILING = 'pawn/filing/FILING';
const FILING_SUCCESS = 'pawn/filing/FILING_SUCCESS';
const FILING_FAIL = 'pawn/filing/FILING_FAIL';

const initialState = {
  loaded: false,
  filingError: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case FILING:
    return state; // 'saving' flag handled by redux-form
  case FILING_SUCCESS:
    return {
      ...state,
      data: action.result,
    };
  case FILING_FAIL:
    return typeof action.error === 'string' ? {
      ...state,
      filingError: {
        ...state.filingError,
        [action.id]: action.error
      }
    } : state;
  default:
    return state;
  }
}

export function filing(values) {

  let url = null;

  switch (values.type) {
  case dataConstant.LOAN_BUSINESS:
    // url = '/pinjaman/bussiness';
    url = '/loan/business';
    break;
  case dataConstant.LOAN_FACTORING:
    url = '/pinjaman/factoring';
    break;
  case dataConstant.LOAN_EMPLOYEE:
    url = '/pinjaman/employee';
    break;
  default:
    url = '/notfound'
    break;
  }

  return {
    types: [FILING, FILING_SUCCESS, FILING_FAIL],
    promise: (client) => client.post(url, {
      data: values
    })
  };
}

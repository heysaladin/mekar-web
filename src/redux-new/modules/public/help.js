const CONTACTUS_SAVE = 'public/help/contacUs/CONTACTUS_SAVE';
const CONTACTUS_SAVE_SUCCESS = 'public/help/contacUs/CONTACTUS_SAVE_SUCCESS';
const CONTACTUS_SAVE_FAIL = 'public/help/contacUs/CONTACTUS_SAVE_FAIL';

const initialState = {
  contactUsError: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CONTACTUS_SAVE:
      return state; // 'saving' flag handled by redux-form
    case CONTACTUS_SAVE_SUCCESS:
      return {
        data: state.data,
        contactUsError: state.contactUsError
      };
    case CONTACTUS_SAVE_FAIL:
      return typeof action.error === 'string' ? {
        contactUsError: state.contactUsError
      } : state;
    default:
      return state;
  }
}

export function contactUs(params) {
  return {
    types: [CONTACTUS_SAVE, CONTACTUS_SAVE_SUCCESS, CONTACTUS_SAVE_FAIL],
    promise: (client) => client.post('/help/contact-us', {
      data: params
    })
  };
}

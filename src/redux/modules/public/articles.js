const LOAD = 'public/articles/LOAD';
const LOAD_SUCCESS = 'public/articles/LOAD_SUCCESS';
const LOAD_FAIL = 'public/articles/LOAD_FAIL';

const initialState = {
  articlesError: {},
  data: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
        data: []
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
        data: [],
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.articles && globalState.articles.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/articles')
  };
}

import { createStore } from 'redux';

const initialState = {
  currentMatch: null,
  mode: 'INACTIVE',
  searchResults: {},
  settings: {},
  query: null,
};

const store = createStore((previous, action) => {
  switch (action.type) {
    case 'CHANGE_MODE':
      return Object.assign({}, previous, {
        mode: action.mode,
      });
    case 'UPDATE_CURRENT_MATCH':
      return Object.assign({}, previous, {
        currentMatch: action.currentMatch,
      });
    case 'UPDATE_SEARCH_RESULTS':
      return Object.assign({}, previous, {
        searchResults: action.searchResults,
      });
    case 'UPDATE_SETTINGS':
      return Object.assign({}, previous, {
        settings: action.settings,
      });
    case 'UPDATE_QUERY':
      return Object.assign({}, previous, {
        query: action.query,
      });
    default:
      return previous;
  }
}, initialState);

export default store;

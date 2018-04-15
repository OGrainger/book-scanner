import Store from '../store/history';

export const initialState = Store;

export default function historyReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_HISTORY': {
      return {
        ...state,
        books: action.data.books || [],
        loading: false,
        error: null,
      };
    }
    case 'SAVE_BOOK': {
      return {
        ...state,
        books: action.data.books || [],
        error: null,
      };
    }
    case 'RESET_HISTORY': {
      return {
        ...state,
        books: [],
        error: null,
      };
    }
    case 'HISTORY_ERROR': {
      return {
        ...state,
        error: action.data,
      };
    }
    default:
      console.log(state);
      return state;
  }
}

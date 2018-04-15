import Store from '../store/scan';

export const initialState = Store;

export default function bookReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_BOOK': {
      return {
        ...state,
        book: action.data || [],
        error: null,
      };
    }

    case 'BOOK_ERROR': {
      return {
        ...state,
        error: action.data,
      };
    }
    default:
      return state;
  }
}

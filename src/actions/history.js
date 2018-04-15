import * as storage from 'react-native/Libraries/Storage/AsyncStorage';

export function getHistory() {
  return dispatch => new Promise(resolve => storage.getItem('history')
    .then(history => resolve(dispatch({
      type: 'GET_HISTORY',
      data: JSON.parse(history) || { books: [] },
    }))).catch(e => console.log(e)));
}

export function saveBookToHistory(book) {
  return dispatch => new Promise(resolve => storage.getItem('history')
    .then((history) => {
      const parsedHistory = (history === null ? { books: [] } : JSON.parse(history));
      parsedHistory.books.push(book);
      return storage.setItem('history', JSON.stringify(parsedHistory));
    })
    .then(() => storage.getItem('history'))
    .then(history => resolve(dispatch({
      type: 'SAVE_BOOK',
      data: JSON.parse(history),
    })))
    .catch(e => console.log(e)));

}

export function resetHistory() {
  return dispatch => storage.clear()
    .then(() => dispatch({
      type: 'RESET_HISTORY',
    }));
}

export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'HISTORY_ERROR',
    data: message.toString(),
  })));
}

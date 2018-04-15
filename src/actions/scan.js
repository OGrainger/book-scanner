import Api from '../constants/api';

export function getBookFromISBN(isbn) {
  const url = Api.baseURL;
  console.log(`FETCHING : ${url}${isbn} ...`);
  // eslint-disable-next-line no-undef
  return dispatch => new Promise(resolve => fetch(url + isbn)
    .then(r => r.json())
    .then((results) => {
      if (parseInt(results.totalItems, 10) === 0) {
        return resolve(dispatch({
          type: 'BOOK_ERROR',
          data: `No book found with ISBN : ${isbn}`,
        }));
      }
      const book = results.items[0];
      return resolve(dispatch({
        type: 'GET_BOOK',
        data: book,
      }));
    }).catch(e => console.log(e)));
}

export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'BOOK_ERROR',
    data: message,
  })));
}

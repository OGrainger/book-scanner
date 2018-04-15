import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getHistory, resetHistory, setError } from '../actions/history';

class BooksContainer extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    History: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string || PropTypes.shape({}),
      books: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
    getHistory: PropTypes.func.isRequired,
    resetHistory: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
  };

  static defaultProps = {
    match: null,
  };

  componentDidMount = () => this.fetchBooks();

  fetchBooks = () => this.props.getHistory()
    .catch((err) => {
      console.log(`Error: ${err}`);
      return this.props.setError(err);
    });

  reset = () => this.props.resetHistory()
    .catch((err) => {
      console.log(`Error: ${err}`);
      return this.props.setError(err);
    });

  render = () => {
    const { Layout, History, match } = this.props;
    const id = (match && match.params && match.params.id) ? match.params.id : null;
    /* console.log('--- HISTORY STATE ----');
    console.log(books);
    console.log('--- /HISTORY STATE ---'); */


    return (
      <Layout
        bookId={id}
        error={History.error}
        loading={History.loading}
        books={History.books}
        reset={() => this.reset()}
        reFetch={() => this.fetchBooks()}
      />
    );
  }
}

const mapStateToProps = state => ({
  History: state.history || {},
});

const mapDispatchToProps = {
  getHistory,
  resetHistory,
  setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksContainer);

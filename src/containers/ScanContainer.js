import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { saveBookToHistory, setError } from '../actions/history';
import { getBookFromISBN } from '../actions/scan';

class ScanContainer extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    scan: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.string,
      ISBN: PropTypes.string,
    }).isRequired,
    saveBookToHistory: PropTypes.func.isRequired,
    getBookFromISBN: PropTypes.func.isRequired,
  };

  saveBook = scannedISBN => this.props.getBookFromISBN(scannedISBN)
    .then(r => (r.type === 'BOOK_ERROR' ? Promise.reject(r.data) : this.props.saveBookToHistory(r.data)))
    .then(r => Actions.Book({
      match: {
        params: {
          id: r.data.books[r.data.books.length - 1].id,
        },
      },
    }))
    .catch(() => {
      // Error is managed elsewhere
    });

  render = () => {
    const { scan, Layout } = this.props;
    return (
      <Layout
        error={scan.error}
        save={item => this.saveBook(item)}
        loading={scan.loading}
      />
    );
  }
}

const mapStateToProps = state => ({
  scan: state.scan || {},
});

const mapDispatchToProps = {
  saveBookToHistory,
  getBookFromISBN,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScanContainer);

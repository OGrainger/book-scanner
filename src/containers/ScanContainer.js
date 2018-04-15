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
    setError: PropTypes.func.isRequired,
  };

  saveBook = scannedISBN => this.props.getBookFromISBN(scannedISBN)
    .then(r => this.props.saveBookToHistory(r.data))
    .then((r) => {
      return Actions.Book({ match: { params: { id: r.data.id } } });
    }).catch((err) => {
      console.log(`Error: ${err}`);
      return this.props.setError(err);
    });

  render = () => {
    const { scan, Layout } = this.props;
    /* console.log('--- SCAN STATE ---');
    console.log(scan);
    console.log('--- / SCAN STATE ---'); */
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
  setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScanContainer);

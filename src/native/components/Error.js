import React from 'react';
import PropTypes from 'prop-types';
import { Text, H3, Card } from 'native-base';

const Error = ({ title, content }) => (

  <Card style={{ paddingHorizontal: 6 }}>
    <H3>{title}</H3>
    <Text>{content}</Text>
  </Card>
);

Error.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

Error.defaultProps = {
  title: 'ERROR',
  content: 'An unexpected error came up',
};

export default Error;

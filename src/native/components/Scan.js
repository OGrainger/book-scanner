import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, Button, Input, Item, Form } from 'native-base';
import Spacer from './Spacer';
import Loading from './Loading';
import Error from './Error';

const Scan = ({
  error,
  save,
  loading,
}) => {
  // Loading
  if (loading) return <Loading />;
  let changedISBN;

  const onSave = () => (changedISBN && changedISBN !== null ? save(changedISBN) : null);

  const onChangeISBN = (text) => {
    changedISBN = text;
  };

  return (
    <Container>
      <Content padder>
        {error !== null && <Error content={error} />}
        <Form>
          <Item>
            <Input
              onChangeText={text => onChangeISBN(text)}
              placeholder="ISBN number"
            />
          </Item>
        </Form>
        <Spacer size={25} />
        <Button
          title="SEARCH"
          block
          bordered
          onPress={() => onSave()}
        >
          <Text>SCAN</Text>
        </Button>
      </Content>
    </Container>
  );
};

Scan.propTypes = {
  error: PropTypes.string,
  save: PropTypes.func,
  loading: PropTypes.bool,
};

Scan.defaultProps = {
  error: null,
  save: null,
  loading: false,
};

export default Scan;

import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, RefreshControl, Image } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Button, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Error from './Error';
import Spacer from './Spacer';

const BookListing = ({
  error,
  loading,
  books,
  reFetch,
  reset,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id;
  const onPress = item => Actions.Book({ match: { params: { id: item.id } } });
  const onReset = () => reset();

  return (
    <Container>
      <Content padder>
        {books && books.length > 0 &&
        <Button
          danger
          block
          bordered
          small
          onPress={() => onReset()}
          title="RESET_HISTORY"
        >
          <Text>RESET HISTORY</Text>
        </Button>}
        {(!books || books.length === 0) &&
        <View>
          <Text>NO BOOKS SCANNED</Text>
        </View>}
        <Spacer size={25} />
        <FlatList
          inverted
          numColumns={1}
          data={books}
          renderItem={({ item }) => (
            <Card style={{ paddingHorizontal: 6 }}>
              <Spacer size={10} />
              <CardItem cardBody>
                <Body>
                  <Spacer size={5} />
                  <Text style={{ fontWeight: 'bold' }}>{item.volumeInfo && item.volumeInfo.title}</Text>
                  <Text
                    style={{ fontWeight: '100' }}
                  >{item.volumeInfo && item.volumeInfo.authors && item.volumeInfo.authors.length > 0 && item.volumeInfo.authors.join(', ')}
                  </Text>
                  <Spacer size={15} />
                </Body>
              </CardItem>
              {(item.volumeInfo && item.volumeInfo.imageLinks) &&
              <CardItem cardBody>
                <Image
                  source={{ uri: item.volumeInfo.imageLinks.thumbnail }}
                  resizeMode="contain"
                  style={{
                    height: 200,
                    width: null,
                    flex: 1,
                    borderRadius: 2,
                  }}
                />
              </CardItem>}
              <Spacer size={15} />
              <Button
                block
                bordered
                small
                onPress={() => onPress(item)}
              >
                <Text>View book details...</Text>
              </Button>
              <Spacer size={5} />
            </Card>
          )}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={reFetch}
            />
          }
        />

        <Spacer size={20} />
      </Content>
    </Container>
  );
};

BookListing.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  books: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  reFetch: PropTypes.func,
  reset: PropTypes.func,
};

BookListing.defaultProps = {
  error: null,
  reFetch: null,
  reset: null,
};

export default BookListing;

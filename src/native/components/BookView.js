import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { Container, Content, Card, CardItem, Body, H3, List, ListItem, Text } from 'native-base';
import ErrorMessages from '../../constants/errors';
import Error from './Error';
import Spacer from './Spacer';

const BookView = ({
  error,
  books,
  bookId,
}) => {
  // Error
  if (error) return <Error content={error} />;

  // Get this Book from all books
  let book = null;
  if (bookId && books) {
    book = books.find(item => item.id === bookId);
  }

  // Book not found
  if (!book) return <Error content={ErrorMessages.book404} />;

  return (
    <Container>
      <Content padder>
        <H3>{book.volumeInfo.title}</H3>
        <Text>by {book.volumeInfo.authors.join(', ')}</Text>
        <Spacer size={15} />
        {(book.volumeInfo.imageLinks) &&
        <Image source={{ uri: book.volumeInfo.imageLinks.thumbnail }} resizeMode="contain" style={{ height: 300, width: null, flex: 1 }} />}
        <Spacer size={25} />

        <Card>
          <CardItem header bordered>
            <Text>About this book</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{book.volumeInfo.description}</Text>
            </Body>
          </CardItem>
        </Card>
        <Spacer size={20} />
      </Content>
    </Container>
  );
};

BookView.propTypes = {
  error: PropTypes.string,
  bookId: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

BookView.defaultProps = {
  error: null,
};

export default BookView;

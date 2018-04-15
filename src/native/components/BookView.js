import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { Container, Content, Card, CardItem, Body, H2, H3, List, ListItem, Text } from 'native-base';
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
        <H2>{book.volumeInfo && book.volumeInfo.title}</H2>
        <H3>{book.volumeInfo && book.volumeInfo.subtitle}</H3>
        <Spacer size={15} />
        <Text>by {book.volumeInfo && book.volumeInfo.authors && book.volumeInfo.authors.length > 0 && book.volumeInfo.authors.join(', ')}</Text>
        <Spacer size={15} />

        {book.volumeInfo && book.volumeInfo.description &&
        <Card>
          <CardItem>
            {(book.volumeInfo && book.volumeInfo.imageLinks) &&
            <Image
              source={{ uri: book.volumeInfo.imageLinks.thumbnail }}
              resizeMode="contain"
              style={{ height: 200, width: null, flex: 1 }}
            />}
          </CardItem>
        </Card>}
        <Spacer size={20} />

        {book.volumeInfo && book.volumeInfo.description &&
        <Card>
          <CardItem>
            <Body>
              <Text>{book.volumeInfo.description}</Text>
            </Body>
          </CardItem>
        </Card>}
        <Spacer size={20} />
        <Card>
          <CardItem header bordered>
            <Text>Details</Text>
          </CardItem>
          <CardItem>
            <Body>
              {book.volumeInfo && book.volumeInfo.categories
              && book.volumeInfo.categories.length === 1 &&
              <Text>Category : {book.volumeInfo.categories.join('')}</Text>}
              {book.volumeInfo && book.volumeInfo.categories
              && book.volumeInfo.categories.length > 1 &&
              <Text>Categories : {book.volumeInfo.categories.join(', ')}</Text>}

              <Spacer size={5} />
              {book.volumeInfo && book.volumeInfo.pageCount &&
              <Text>Page count : {book.volumeInfo.pageCount}</Text>}


              <Spacer size={5} />
              {book.volumeInfo && book.volumeInfo.publishedDate &&
              <Text>Published date : {book.volumeInfo.publishedDate}</Text>}

              <Spacer size={5} />
              {book.volumeInfo && book.volumeInfo.publisher &&
              <Text>Publisher : {book.volumeInfo.publisher}</Text>}
              <Spacer size={5} />
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

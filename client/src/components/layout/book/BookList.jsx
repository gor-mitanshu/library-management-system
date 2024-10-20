import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

const BookList = () => {
     const [books, setBooks] = useState([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          const fetchBooks = async () => {
               try {
                    const response = await axios.get('http://localhost:8080/api/library/books');
                    setBooks(response.data.data);
               } catch (error) {
                    console.error('Error fetching books:', error);
               } finally {
                    setLoading(false);
               }
          };
          fetchBooks();
     }, []);

     if (loading) {
          return <div className="text-center">Loading...</div>;
     }

     return (
          <Container className="mt-4">
               <Row>
                    { books.map((book) => (
                         <Col key={ book._id } xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 } className="mb-4">
                              <Card>
                                   <Card.Img variant="top" src={ book.imageUrl } alt={ book.title } />
                                   <Card.Body>
                                        <Card.Title>{ book.title }</Card.Title>
                                        <Card.Text>by { book.author }</Card.Text>
                                        <Link to={ `/books/${book._id}` }>
                                             <Button variant="primary">View Details</Button>
                                        </Link>
                                   </Card.Body>
                              </Card>
                         </Col>
                    )) }
               </Row>
          </Container>
     );
};

export default BookList;
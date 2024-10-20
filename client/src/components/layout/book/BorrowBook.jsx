import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col } from 'react-bootstrap';

const BorrowedBooks = () => {
     const [borrowedBooks, setBorrowedBooks] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);

     useEffect(() => {
          const fetchBorrowedBooks = async () => {
               try {
                    const response = await axios.get('http://localhost:8080/api/library/borrowed');
                    setBorrowedBooks(response.data.data);
               } catch (error) {
                    console.error('Error fetching borrowed books:', error);
                    setError('An error occurred while fetching borrowed books.');
               } finally {
                    setLoading(false);
               }
          };
          fetchBorrowedBooks();
     }, []);

     if (loading) {
          return <div className="text-center mt-5"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
     }

     if (error) {
          return <div className="text-center mt-4 alert alert-danger">{ error }</div>;
     }

     return (
          <Container className="mt-4">
               <h2>Your Borrowed Books</h2>
               <Row>
                    { borrowedBooks.map((book) => (
                         <Col key={ book._id } xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 } className="mb-4">
                              <Card>
                                   <Card.Img variant="top" src={ book.imageUrl } alt={ book.title } />
                                   <Card.Body>
                                        <Card.Title>{ book.title }</Card.Title>
                                        <Card.Text>by { book.author }</Card.Text>
                                   </Card.Body>
                              </Card>
                         </Col>
                    )) }
               </Row>
          </Container>
     );
};

export default BorrowedBooks;
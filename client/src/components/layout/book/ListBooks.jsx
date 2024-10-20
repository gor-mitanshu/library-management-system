import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ListBooks = ({ books }) => {
     return (
          <Row>
               { books.map((book) => (
                    <Col key={ book._id } xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 } className="mb-4">
                         <Card className="h-100 book-card">
                              <Card.Img variant="top" src={ book.images } alt={ book.title } className="book-cover" />
                              <Card.Body className="d-flex flex-column">
                                   <Card.Title>{ book.title }</Card.Title>
                                   <Card.Text className="text-muted">by { book.author }</Card.Text>
                                   <Card.Text className="book-description">
                                        { book.description }
                                   </Card.Text>
                                   <div className="mt-auto">
                                        <Link to={ `/books/${book._id}` }>
                                             <Button variant="primary" className="w-100">View Details</Button>
                                        </Link>
                                   </div>
                              </Card.Body>
                         </Card>
                    </Col>
               )) }
          </Row>)
}

export default ListBooks
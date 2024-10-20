import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';

const AddBook = () => {
     const [bookData, setBookData] = useState({
          title: '',
          author: '',
          description: '',
          images: ''
     });
     const [error, setError] = useState('');
     const navigate = useNavigate();

     // Handle form input changes
     const handleChange = (e) => {
          setBookData({
               ...bookData,
               [e.target.name]: e.target.value,
          });
     };

     // Handle form submission
     const handleSubmit = async (e) => {
          const accessToken = localStorage.getItem('token');
          e.preventDefault();
          try {
               // Post the new book data to the server
               const response = await axios.post('http://localhost:8080/api/library/addbook', bookData, {
                    headers: {
                         Authorization: `Bearer ${accessToken}`,
                    },
               });
               if (response.status === 200) {
                    toast.success("Book added successfully")
                    navigate('/books');
               }
          } catch (error) {
               setError('Error adding the book. Please try again.');
          }
     };

     return (
          <Container className="mt-4">
               <h2>Add a New Book</h2>
               { error && <div className="alert alert-danger">{ error }</div> }

               <Form onSubmit={ handleSubmit }>
                    <Form.Group controlId="formTitle">
                         <Form.Label>Book Title</Form.Label>
                         <Form.Control
                              type="text"
                              name="title"
                              value={ bookData.title }
                              onChange={ handleChange }
                              required
                         />
                    </Form.Group>

                    <Form.Group controlId="formAuthor" className="mt-3">
                         <Form.Label>Author</Form.Label>
                         <Form.Control
                              type="text"
                              name="author"
                              value={ bookData.author }
                              onChange={ handleChange }
                              required
                         />
                    </Form.Group>

                    <Form.Group controlId="formDescription" className="mt-3">
                         <Form.Label>Description</Form.Label>
                         <Form.Control
                              as="textarea"
                              rows={ 3 }
                              name="description"
                              value={ bookData.description }
                              onChange={ handleChange }
                              required
                         />
                    </Form.Group>

                    <Form.Group controlId="formImages" className="mt-3">
                         <Form.Label>Image URL</Form.Label>
                         <Form.Control
                              type="text"
                              name="images"
                              value={ bookData.images }
                              onChange={ handleChange }
                         />
                    </Form.Group>

                    <button type="button" className="mt-4 btn btn-danger me-2" onClick={ () => navigate('/books') }>
                         Cancel
                    </button>
                    <Button type="submit" className="mt-4" variant="primary">
                         Add Book
                    </Button>
               </Form>
          </Container>
     );
};

export default AddBook;
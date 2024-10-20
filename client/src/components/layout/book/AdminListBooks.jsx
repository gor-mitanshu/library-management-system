import { AgGridReact } from 'ag-grid-react';
import React, { useState } from 'react';
import { Button, Container, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminListBooks = ({ books, fetchBooks }) => {
     const [selectedBook, setSelectedBook] = useState(null);
     const [showEditModal, setShowEditModal] = useState(false);
     const [editFormData, setEditFormData] = useState({
          title: '',
          author: '',
          description: '',
     });

     const columnsDefs = [
          { field: 'title', headerName: 'Title', minWidth: 150 },
          { field: 'author', headerName: 'Author', minWidth: 150 },
          {
               field: 'genre',
               headerName: 'Genre',
               minWidth: 200,
               valueFormatter: (params) => params.value.join(', '), // Display genre as a comma-separated string
          },
          {
               field: 'description',
               headerName: 'Description',
               minWidth: 300,
               wrapText: true,
               autoHeight: true,
               cellRenderer: (params) => {
                    const maxLength = 100; // Truncate description to 100 characters
                    return params.value.length > maxLength
                         ? `${params.value.substring(0, maxLength)}...`
                         : params.value;
               },
          },
          {
               field: 'available',
               headerName: 'Available',
               minWidth: 150,
               cellRenderer: (params) => (params.value ? 'Yes' : 'No'), // Show Yes/No for boolean values
          },
          {
               field: 'borrowed',
               headerName: 'Borrowed',
               minWidth: 150,
               cellRenderer: (params) => (params.value ? 'Yes' : 'No'),
          },
          {
               field: 'returned',
               headerName: 'Returned',
               minWidth: 150,
               cellRenderer: (params) => (params.value ? 'Yes' : 'No'),
          },
          {
               field: 'createdAt',
               headerName: 'Created At',
               minWidth: 200,
               valueFormatter: (params) => new Date(params.value).toLocaleDateString(), // Format date
          },
          {
               field: 'updatedAt',
               headerName: 'Updated At',
               minWidth: 200,
               valueFormatter: (params) => new Date(params.value).toLocaleDateString(), // Format date
          },
          {
               headerName: 'Actions',
               field: 'actions',
               minWidth: 200,
               pinned: 'right',
               cellRenderer: (params) => (
                    <div style={ { display: 'flex', justifyContent: 'center', gap: '10px' } }>
                         <Button variant="warning" onClick={ () => handleEdit(params.data) }>
                              Edit
                         </Button>
                         <Button variant="danger" onClick={ () => handleDelete(params.data._id) }>
                              Delete
                         </Button>
                    </div>
               ),
          },
     ];


     // Handle edit click
     const handleEdit = (book) => {
          setSelectedBook(book);
          setEditFormData({
               title: book.title,
               author: book.author,
               description: book.description,
          });
          setShowEditModal(true); // Open modal
     };

     // Handle form input changes
     const handleFormChange = (e) => {
          const { name, value } = e.target;
          setEditFormData((prevData) => ({
               ...prevData,
               [name]: value,
          }));
     };

     // Submit updated book details
     const handleFormSubmit = async () => {
          try {
               const token = localStorage.getItem('token');
               const response = await axios.put(
                    `http://localhost:8080/api/library/updatebook/${selectedBook._id}`,
                    editFormData,
                    {
                         headers: {
                              Authorization: `Bearer ${token}`,
                         },
                    }
               );
               if (response) {
                    toast.success('Book updated successfully');
                    setShowEditModal(false); // Close modal
               }
               fetchBooks(); // Refresh book list
          } catch (error) {
               console.error('Error updating book:', error);
               toast.error('Error updating book');
          }
     };

     // Handle delete book
     const handleDelete = async (bookId) => {
          Swal.fire({
               title: 'Are you sure?',
               text: "You won't be able to revert this!",
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Yes, delete it!',
          }).then(async (result) => {
               if (result.isConfirmed) {
                    try {
                         const token = localStorage.getItem('token');
                         await axios.delete(`http://localhost:8080/api/library/deletebook/${bookId}`, {
                              headers: {
                                   Authorization: `Bearer ${token}`,
                              },
                         });
                         Swal.fire('Deleted!', 'The book has been deleted.', 'success');
                         toast.success('The book has been deleted');
                         fetchBooks();
                    } catch (error) {
                         Swal.fire('Error!', 'There was a problem deleting the book.', 'error');
                         console.error('Delete book error:', error);
                    }
               }
          });
     };

     return (
          <Container className="mt-4">
               <h2>Your Borrowed Books</h2>
               <div style={ { height: 500, width: '100%', overflow: "auto" } } className="ag- theme - quartz">
                    <AgGridReact
                         rowData={ books }
                         columnDefs={ columnsDefs }
                         domLayout="autoHeight"
                         animateRows={ true }
                    />
               </div>

               {/* Edit Modal */ }
               <Modal show={ showEditModal } onHide={ () => setShowEditModal(false) }>
                    <Modal.Header closeButton>
                         <Modal.Title>Edit Book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         <Form>
                              <Form.Group controlId="formTitle">
                                   <Form.Label>Title</Form.Label>
                                   <Form.Control
                                        type="text"
                                        name="title"
                                        value={ editFormData.title }
                                        onChange={ handleFormChange }
                                   />
                              </Form.Group>

                              <Form.Group controlId="formAuthor" className="mt-3">
                                   <Form.Label>Author</Form.Label>
                                   <Form.Control
                                        type="text"
                                        name="author"
                                        value={ editFormData.author }
                                        onChange={ handleFormChange }
                                   />
                              </Form.Group>

                              <Form.Group controlId="formDescription" className="mt-3">
                                   <Form.Label>Description</Form.Label>
                                   <Form.Control
                                        as="textarea"
                                        rows={ 3 }
                                        name="description"
                                        value={ editFormData.description }
                                        onChange={ handleFormChange }
                                   />
                              </Form.Group>
                         </Form>
                    </Modal.Body>
                    <Modal.Footer>
                         <Button variant="secondary" onClick={ () => setShowEditModal(false) }>
                              Close
                         </Button>
                         <Button variant="primary" onClick={ handleFormSubmit }>
                              Save Changes
                         </Button>
                    </Modal.Footer>
               </Modal>
          </Container >
     );
};

export default AdminListBooks;
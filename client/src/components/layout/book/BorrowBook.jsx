import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const BorrowedBooks = () => {
     const [borrowedBooks, setBorrowedBooks] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);

     useEffect(() => {
          const fetchBorrowedBooks = async () => {
               try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get('http://localhost:8080/api/library/borrowed-books', {
                         headers: {
                              Authorization: `Bearer ${token}`,
                         },
                    });
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

     const returnBook = async (id) => {
          const result = await Swal.fire({
               title: 'Are you sure?',
               text: 'You are about to return this book!',
               icon: 'warning',
               showCancelButton: true,
               confirmButtonText: 'Yes, return it!',
               cancelButtonText: 'No, keep it',
          });

          if (result.isConfirmed) {
               try {
                    const token = localStorage.getItem('token');
                    await axios.post(`http://localhost:8080/api/library/return/${id}`, {}, {
                         headers: {
                              Authorization: `Bearer ${token}`,
                         },
                    });
                    toast.success(`Book with ID: ${id} has been returned successfully!`);

                    // Refresh the list of borrowed books
                    const response = await axios.get('http://localhost:8080/api/library/borrowed-books', {
                         headers: {
                              Authorization: `Bearer ${token}`,
                         },
                    });
                    setBorrowedBooks(response.data.data);
               } catch (error) {
                    console.error('Error returning book:', error);
                    toast.error('Could not return the book. Please try again.');
               }
          }
     };

     if (loading) {
          return (
               <div className="text-center mt-5">
                    <div className="spinner-border" role="status">
                         <span className="visually-hidden">Loading...</span>
                    </div>
               </div>
          );
     }

     if (error) {
          return <div className="text-center mt-4 alert alert-danger">{ error }</div>;
     }

     const columnsDefs = [
          { field: 'title', headerName: "Title", minWidth: 150 },
          { field: 'author', headerName: "Author", minWidth: 150 },
          { field: 'description', headerName: "Description", minWidth: 300, wrapText: true, autoHeight: true },
          { field: 'createdAt', headerName: "Borrowed Date", minWidth: 200, valueFormatter: (params) => new Date(params.value).toLocaleDateString() },
          { field: 'updatedAt', headerName: "Return By", minWidth: 200, valueFormatter: (params) => new Date(params.value).toLocaleDateString() },
          {
               headerName: 'Actions',
               field: 'actions',
               minWidth: 150,
               cellRenderer: (params) => (
                    <Button variant="primary" onClick={ () => returnBook(params.data._id) }>
                         Return Book
                    </Button>
               ),
          },
     ];

     return (
          <Container className="mt-4">
               <h2>Your Borrowed Books</h2>
               <div style={ { height: 500, width: "100%" } } className='ag-theme-quartz'>
                    <AgGridReact
                         rowData={ borrowedBooks }
                         columnDefs={ columnsDefs }
                         domLayout='autoHeight'
                         animateRows={ true }
                    />
               </div>
          </Container>
     );
};

export default BorrowedBooks;
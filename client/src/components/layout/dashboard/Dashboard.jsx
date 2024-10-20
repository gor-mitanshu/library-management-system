import React, { useEffect, useState } from "react";
import axios from "axios";
import ApexCharts from "react-apexcharts";
import { BsBook, BsBookHalf, BsArrowDown, BsArrowUp, BsPeople } from "react-icons/bs";

const Dashboard = () => {
     const [stats, setStats] = useState({
          totalBooks: 0,
          totalBorrowed: 0,
          totalReturned: 0,
          availableBooks: 0,
          totalUsers: 0
     });

     const [bookData, setBookData] = useState([]);
     const [role, setRole] = useState(""); // State to store the role of the user

     useEffect(() => {
          const fetchData = async () => {
               try {
                    // Fetch the total stats
                    const response = await axios.get('http://localhost:8080/api/library/stats');
                    setStats(response.data);

                    // Fetch book data for chart
                    const bookResponse = await axios.get('http://localhost:8080/api/library/books');
                    setBookData(bookResponse.data.data);

                    // Get token from local storage and decode it to get the role
                    const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
                    if (token) {
                         const payload = token.split('.')[1];
                         const decodedPayload = JSON.parse(atob(payload));
                         console.log(decodedPayload)
                         setRole(decodedPayload.user.role);
                    }
               } catch (error) {
                    console.error("Error fetching data", error);
               }
          };

          fetchData();
     }, []);

     // Prepare chart data for Bar Chart
     const chartData = {
          series: [{
               name: "Borrowed Books",
               data: bookData.map(book => {
                    const borrowDate = new Date(book.borrowDate);
                    return isNaN(borrowDate) ? null : [borrowDate.toLocaleDateString(), 1];
               }).filter(date => date !== null)
          }],
          options: {
               chart: {
                    type: 'bar',
                    zoom: { enabled: false }
               },
               xaxis: {
                    type: 'category',
                    categories: bookData.map(book => {
                         const borrowDate = new Date(book.borrowDate);
                         return isNaN(borrowDate) ? null : borrowDate.toLocaleDateString();
                    }).filter(date => date !== null),
                    title: { text: 'Date' }
               },
               title: {
                    text: 'Books Borrowed Over Time',
                    align: 'left'
               },
               dataLabels: { enabled: false },
               plotOptions: {
                    bar: { horizontal: false, columnWidth: '55%', endingShape: 'rounded' }
               },
               stroke: { show: true, width: 2, colors: ['transparent'] },
               fill: { opacity: 1 }
          }
     };

     return (
          <div className="container">
               <h1 className="mt-4">Dashboard</h1>

               <div className="row">
                    {/* Conditionally Render the Total Users Card if role is not admin */ }
                    { role === "admin" && (
                         <div className="col-md-3 mb-4">
                              <div className="card shadow-sm">
                                   <div className="card-header d-flex align-items-center">
                                        <BsPeople className="me-2 text-warning" size={ 24 } />
                                        Total Users
                                   </div>
                                   <div className="card-body text-center">
                                        <h5 className="card-title">{ stats.totalUsers }</h5>
                                   </div>
                              </div>
                         </div>
                    ) }

                    {/* Card: Total Books Available */ }
                    <div className="col-md-3 mb-4">
                         <div className="card shadow-sm">
                              <div className="card-header d-flex align-items-center">
                                   <BsBook className="me-2 text-success" size={ 24 } />
                                   Total Books Available
                              </div>
                              <div className="card-body text-center">
                                   <h5 className="card-title">{ stats.availableBooks }</h5>
                              </div>
                         </div>
                    </div>

                    {/* Card: Total Books Borrowed */ }
                    <div className="col-md-3 mb-4">
                         <div className="card shadow-sm">
                              <div className="card-header d-flex align-items-center">
                                   <BsBookHalf className="me-2 text-primary" size={ 24 } />
                                   Total Books Borrowed
                              </div>
                              <div className="card-body text-center">
                                   <h5 className="card-title">{ stats.totalBorrowed }</h5>
                              </div>
                         </div>
                    </div>

                    {/* Card: Total Books Returned */ }
                    <div className="col-md-3 mb-4">
                         <div className="card shadow-sm">
                              <div className="card-header d-flex align-items-center">
                                   <BsArrowDown className="me-2 text-info" size={ 24 } />
                                   Total Books Returned
                              </div>
                              <div className="card-body text-center">
                                   <h5 className="card-title">{ stats.totalReturned }</h5>
                              </div>
                         </div>
                    </div>

                    {/* Card: Total Books */ }
                    <div className="col-md-3 mb-4">
                         <div className="card shadow-sm">
                              <div className="card-header d-flex align-items-center">
                                   <BsArrowUp className="me-2 text-danger" size={ 24 } />
                                   Total Books
                              </div>
                              <div className="card-body text-center">
                                   <h5 className="card-title">{ stats.totalBooks }</h5>
                              </div>
                         </div>
                    </div>
               </div>

               {/* Chart: Borrowed Books Over Time */ }
               <div className="mb-4">
                    <ApexCharts
                         options={ chartData.options }
                         series={ chartData.series }
                         type="bar"
                         height={ 350 }
                    />
               </div>
          </div>
     );
};

export default Dashboard;
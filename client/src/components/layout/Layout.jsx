import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaHome, FaUser, FaBook, FaSignOutAlt } from 'react-icons/fa';
import '../../assets/styles/layout.css';
import { toast } from 'react-toastify';

const Layout = () => {
     const navigate = useNavigate();
     const [isSidebarOpen, setIsSidebarOpen] = useState(true);

     const toggleSidebar = () => {
          setIsSidebarOpen(prevState => !prevState);
     };

     const handleLogout = () => {
          localStorage.removeItem('token');
          navigate("/login");
          toast.success("Logged Out Successfully");
     };

     return (
          <div className="layout">
               {/* Navbar */ }
               <Navbar className="navbar-custom" expand="lg">
                    <Container>
                         <Navbar.Brand style={ { color: "#fff" } }>Library Management System</Navbar.Brand>
                         <Navbar.Toggle aria-controls="basic-navbar-nav" />

                         <Button variant="outline-light" onClick={ handleLogout } className="nav-item">
                              <FaSignOutAlt /> <span className="d-none d-md-inline">Logout</span>
                         </Button>
                    </Container>
               </Navbar>

               <div className={ `d-flex flex-column flex-md-row ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}` }>
                    {/* Sidebar */ }
                    <div className={ `sidebar ${isSidebarOpen ? 'open' : 'closed'}` }>
                         <Button className="toggle-btn" onClick={ toggleSidebar } aria-label="Toggle Sidebar">
                              <GiHamburgerMenu />
                         </Button>
                         <h4 className={ `sidebar-title ${isSidebarOpen ? 'visible' : 'hidden'}` } style={ { marginTop: '50px' } }>
                              Menu
                         </h4>
                         <Nav className="flex-column">
                              <Link to="/dashboard" className="nav-link"><FaHome /> Dashboard</Link>
                              <Link to="/profile" className="nav-link"><FaUser /> Profile</Link>
                              <Link to="/books" className="nav-link"><FaBook /> Books</Link>
                              <Link to="/borrowed" className="nav-link"><FaBook /> Borrowed Books</Link>
                         </Nav>
                    </div>

                    {/* Main Content */ }
                    <div className="main-content">
                         <Outlet />
                    </div>
               </div>
          </div>
     );
};

export default Layout;
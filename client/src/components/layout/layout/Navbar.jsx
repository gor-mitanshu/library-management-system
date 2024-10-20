import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const NavbarComponent = () => {
     const menuItems = [
          { text: "Change Password", link: "/" },
          { text: "Logout", link: "/" },
     ];

     const navigate = useNavigate();

     const handleLogout = () => {
          Swal.fire({
               title: 'Confirm logout',
               text: "Are you sure you want to log out?",
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Yes, logout!'
          }).then((result) => {
               if (result.isConfirmed) {
                    localStorage.removeItem("token");
                    navigate("/login");
                    toast.success("Logout Successfully");
               } else {
                    return;
               }
          })
     };

     return (
          <nav className="navbar navbar-expand-lg navbar-light p-3 px-md-4">
               <div className="w-100 d-block">
                    <div className="row justify-content-between align-items-center">
                         <div className="col-8 d-lg-block d-none">
                              <h1>Library Management Sysytem</h1>
                         </div>
                         <div className="col-lg-4 col-12 d-flex align-items-center justify-content-end">
                              <div className="mx-2">
                                   <div className="dropdown">
                                        <button
                                             className="btn dropdown-toggle"
                                             type="button"
                                             id="dropdownMenuButton"
                                             data-bs-toggle="dropdown"
                                             aria-expanded="false"
                                        >
                                             { <FontAwesomeIcon icon={ faBell } className="fs-5" /> }
                                        </button>
                                        <ul
                                             className="dropdown-menu dropdown-menu-end"
                                             aria-labelledby="dropdownMenuButton"
                                        >
                                             { menuItems.map((item) => (
                                                  <li key={ item.text } className="d-flex align-items-center">
                                                       <button
                                                            className="dropdown-item"
                                                            href="/"
                                                            onClick={ item.text === "Logout" ? handleLogout : null }
                                                       >
                                                            { item.text }
                                                       </button>
                                                  </li>
                                             )) }
                                        </ul>
                                   </div>
                                   {/* <Dropdown
                                        icon={ <FontAwesomeIcon icon={ faBell } className="fs-5" /> }
                                        menuItems={ menuItems }
                                   /> */}
                              </div>
                              <div>
                                   <div className="dropdown">
                                        <button
                                             className="btn dropdown-toggle"
                                             type="button"
                                             id="dropdownMenuButton"
                                             data-bs-toggle="dropdown"
                                             aria-expanded="false"
                                        >
                                             { <img
                                                  src={ 'https://via.placeholder.com/600x800' }
                                                  alt="user_img"
                                                  height={ "25px" }
                                                  width={ "25px" }
                                             /> }
                                        </button>
                                        <ul
                                             className="dropdown-menu dropdown-menu-end"
                                             aria-labelledby="dropdownMenuButton"
                                        >
                                             { menuItems.map((item) => (
                                                  <li key={ item.text } className="d-flex align-items-center">
                                                       <button
                                                            className="dropdown-item"
                                                            href="/"
                                                            onClick={ item.text === "Logout" ? handleLogout : null }
                                                       >
                                                            { item.text }
                                                       </button>
                                                  </li>
                                             )) }
                                        </ul>
                                   </div>
                                   {/* <Dropdown
                                        icon={
                                             <img
                                                  src={ 'https://via.placeholder.com/600x800' }
                                                  alt="user_img"
                                                  height={ "25px" }
                                                  width={ "25px" }
                                             />
                                        }
                                        menuItems={ menuItems }
                                   /> */}
                              </div>
                         </div>
                    </div>
               </div>
          </nav>
     );
};

export default NavbarComponent;
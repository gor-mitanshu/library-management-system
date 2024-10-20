import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Logo from '../../../assets/images/logo.png'
import React from "react";

const menuItems = [
     {
          id: 1,
          title: "Dashboard",
          link: "/dashboard",
          icon: "bi-columns-gap",
          color: "blue",
          content: null,
     },
     {
          id: 2,
          title: "My Profile",
          link: "/profile",
          icon: "bi-person-fill",
          color: "darkgrey",
     },
     {
          id: 3,
          title: "Books",
          link: "/books",
          icon: "bi-person-video2",
          color: "orange",
          content: null,
     },
     {
          id: 4,
          title: "Borrowed Books",
          link: "/borrowed",
          icon: "bi-calendar3",
          color: "purple",
     }
];

const Sidebar = ({ open, handleDrawerOpen }) => {
     const location = useLocation();

     return (
          <div
               className={ `sidebar ${open ? "" : "sidebar-sm"}` }
               onMouseEnter={ () => {
                    handleDrawerOpen(true);
               } }
               onMouseLeave={ () => {
                    handleDrawerOpen(false);
               } }
          >
               <div
                    style={ { minWidth: "260px" } }
                    className="d-flex align-items-center justify-content-between p-3"
               >
                    <Link
                         onClick={ () => {
                              handleDrawerOpen(true);
                         } }
                         style={ { width: "50%" } }
                         className="d-flex align-items-center py-2"
                    >
                         <img src={ Logo } width={ "50%" } height={ "100%" } alt="Logo" />
                    </Link>
                    <div>
                         { open ? (
                              <div
                                   className="text-end d-flex d-lg-none"
                                   onClick={ () => {
                                        handleDrawerOpen(false);
                                   } }
                                   role="button"
                              >
                                   <FontAwesomeIcon icon={ faTimes } size="lg" />
                              </div>
                         ) : (
                              ""
                         ) }
                    </div>
               </div>

               <div className="sidebar-content">
                    <div className="accordion" id="sideBarMenuAccordion">
                         { menuItems.map((item) => (
                              <React.Fragment key={ item.id }>
                                   { item.content ? (
                                        <div className="accordion-item border-0 menu-item-wrapper">
                                             <button
                                                  className={ `accordion-button collapsed menu-item ${location.pathname.includes(item.link) ? "menu-active" : ""
                                                       } ${open ? "" : "collapsed"}` }
                                                  // onClick={() => handleAccordionClick(item)}
                                                  onClick={ () => {
                                                       handleDrawerOpen(true);
                                                  } }
                                                  type="button"
                                                  data-bs-toggle="collapse"
                                                  data-bs-target={ `#collapse${item.id}` }
                                                  aria-expanded={ open ? true : false }
                                                  aria-controls={ `collapse${item.id}` }
                                             >
                                                  <i className={ `bi ${item.icon}` }></i>
                                                  <h6 className="m-0">{ item.title }</h6>
                                             </button>
                                             <div
                                                  id={ open ? `collapse${item.id}` : "" }
                                                  className={ `accordion-collapse collapse ${open ? "" : "hide"
                                                       } ` }
                                                  aria-labelledby={ `heading${item.id}` }
                                                  data-bs-parent="#sideBarMenuAccordion"
                                             >
                                                  <div className="accordion-body list-item-body">
                                                       { item.content.map((subItem, index) => (
                                                            <Link
                                                                 onClick={ () => {
                                                                      handleDrawerOpen(false);
                                                                 } }
                                                                 key={ index }
                                                                 to={ subItem.link }
                                                                 className={ `menu-item ${location.pathname === subItem.link
                                                                      ? "nav-active"
                                                                      : ""
                                                                      }` }
                                                            >
                                                                 <div className="sidebar-dash"></div>
                                                                 <h6 className="m-0">{ subItem.title }</h6>
                                                            </Link>
                                                       )) }
                                                  </div>
                                             </div>
                                        </div>
                                   ) : (
                                        <div className="menu-item-wrapper">
                                             <Link
                                                  to={ item.link }
                                                  onClick={ () => {
                                                       handleDrawerOpen(false);
                                                  } }
                                                  className={ `menu-item ${location.pathname === item.link ? "nav-active" : ""
                                                       }` }
                                             >
                                                  <i className={ `bi ${item.icon}` }></i>
                                                  <h6 className="m-0">{ item.title }</h6>
                                             </Link>
                                        </div>
                                   ) }
                              </React.Fragment>
                         )) }
                    </div>
               </div>
          </div>
     );
};

export default Sidebar;
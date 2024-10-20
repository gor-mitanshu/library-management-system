import React, { useState } from "react";
import "./index.css";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
     const [open, setOpen] = useState(false);

     const handleDrawerOpen = (isOpen) => {
          isOpen ? setOpen(true) : setOpen(false);
     };

     return (
          <>
               <div className="layout">
                    <Sidebar open={ open } handleDrawerOpen={ handleDrawerOpen } />
                    <div className="content-wrapper">
                         <Navbar />
                         <div className="content p-3 p-md-4">
                              <Outlet />
                         </div>
                    </div>
               </div>
          </>
     );
};

export default Layout;
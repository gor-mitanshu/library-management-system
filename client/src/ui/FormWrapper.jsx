import React from "react";
import loginVector from "../assets/images/login-vector.jpg"

const FormWrapper = ({ children, title }) => {
     return (
          <>
               <div className="vh-100 container">
                    <div className="d-flex align-items-center justify-content-center h-100 position-relative">
                         <div className="col-12 col-md-10">
                              <div className="row align-items-center">
                                   <div className="col-12 col-lg-7 text-center text-lg-start">
                                        <img src={ loginVector } height={ "90%" } width={ "90%" } className="object-fit-contain d-none d-lg-block" alt="" />
                                   </div>
                                   <div className="col-12 col-lg-5 p-5 p-lg-3 p-xxl-5">
                                        <h1 className="mb-5 text-center text-lg-start">{ title }</h1>
                                        { children }
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </>
     );
};

export default FormWrapper;
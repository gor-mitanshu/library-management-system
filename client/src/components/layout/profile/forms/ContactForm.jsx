import React from "react";

const ContactForm = ({
     formData,
     formErrors,
     handleInputChange,
     handleCancel
}) => {
     return (
          <>
               <div className="row">
                    {/* Email */ }
                    <div className="col-md-12">
                         <div className="form-group row">
                              <div className="col mb-3">
                                   <label htmlFor="email" className="font-weight-bold">
                                        Email:
                                   </label>
                                   <input
                                        type="email"
                                        className="form-control no-focus-box-shadow"
                                        placeholder="Enter Your Email"
                                        name="email"
                                        value={ formData.email }
                                        onChange={ handleInputChange }
                                   />
                                   { formErrors.email && (
                                        <small className="text-danger">{ formErrors.email }</small>
                                   ) }
                              </div>
                         </div>
                    </div>
                    {/* Phone Number */ }
                    <div className="col-md-12">
                         <div className="form-group row">
                              <div className="col mb-3">
                                   <label htmlFor="phone" className="font-weight-bold">
                                        Phone Number:
                                   </label>
                                   <input
                                        type="number"
                                        className="form-control no-focus-box-shadow"
                                        placeholder="Enter Your Phone Number"
                                        name="phone"
                                        value={ formData.phone }
                                        onChange={ handleInputChange }
                                   />
                                   { formErrors.phone && (
                                        <small className="text-danger">{ formErrors.phone }</small>
                                   ) }
                              </div>
                         </div>
                    </div>
               </div>
               <button className="btn btn-danger me-2" type="button" onClick={ handleCancel }>Cancel</button>
               <button className="btn btn-primary">Save</button>
          </>
     );
};

export default ContactForm;

import React from "react";

const AddressForm = ({ formData, handleInputChange, formErrors, handleCancel }) => {
     return (
          <>
               <div className="row">
                    <div className="col-md-12">
                         <div className="form-group row">
                              <div className="col mb-3">
                                   <label htmlFor="address" className="font-weight-bold">
                                        Current Address:
                                   </label>
                                   <textarea
                                        type="text"
                                        className="form-control no-focus-box-shadow"
                                        placeholder="Full Address"
                                        name="address"
                                        value={ formData.address }
                                        onChange={ handleInputChange }
                                        style={ { height: "120px" } }
                                   />
                                   { formErrors.address && (
                                        <small className="text-danger">
                                             { formErrors.address }
                                        </small>
                                   ) }
                              </div>
                         </div>
                    </div>
               </div>
               <button className="btn btn-danger me-2" onClick={ handleCancel } type="button">Cancel</button>
               <button className="btn btn-primary">Save</button>
          </>
     );
};

export default AddressForm;
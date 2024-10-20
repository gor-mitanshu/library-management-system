import React from "react";

const ProfileForm = ({
     formData,
     handleInputChange,
     formErrors,
     handleCancel,
}) => {
     // Format the date as YYYY-MM-DD
     const formattedDate = formData.dob ? new Date(formData.dob).toISOString().split('T')[0] : '';

     // Static gender options
     const genderOptions = [
          { label: "Male", value: "Male" },
          { label: "Female", value: "Female" },
          { label: "Other", value: "Other" },
     ];

     return (
          <>
               <div className="pb-3 text-center">
                    <img
                         src={ 'https://via.placeholder.com/600x800' }
                         alt="User"
                         style={ {
                              width: "100px",
                              height: "100px",
                              borderRadius: "50%",
                         } }
                    />
               </div>
               <div className="form-group">
                    <div className="row">
                         {/* Firstname */ }
                         <div className="col-md-6">
                              <div className="form-group row">
                                   <div className="col mb-3">
                                        <label htmlFor="firstName" className="font-weight-bold">
                                             Firstname:
                                        </label>
                                        <input
                                             type="text"
                                             className="form-control no-focus-box-shadow"
                                             placeholder="Firstname"
                                             name="firstName"
                                             value={ formData.firstName }
                                             onChange={ handleInputChange }
                                        />
                                        { formErrors.firstName && (
                                             <small className="text-danger">{ formErrors.firstName }</small>
                                        ) }
                                   </div>
                              </div>
                         </div>
                         {/* Lastname */ }
                         <div className="col-md-6">
                              <div className="form-group row">
                                   <div className="col mb-3">
                                        <label htmlFor="lastName" className="font-weight-bold">
                                             Lastname:
                                        </label>
                                        <input
                                             type="text"
                                             className="form-control no-focus-box-shadow"
                                             placeholder="Lastname"
                                             name="lastName"
                                             value={ formData.lastName }
                                             onChange={ handleInputChange }
                                        />
                                        { formErrors.lastName && (
                                             <small className="text-danger">{ formErrors.lastName }</small>
                                        ) }
                                   </div>
                              </div>
                         </div>
                    </div>

                    <div className="row">
                         {/* Date of Birth */ }
                         <div className="col-md-6">
                              <div className="form-group row">
                                   <div className="col mb-2">
                                        <label className="form-label">Birth Date:</label>
                                        <input
                                             type="date"
                                             className="form-control no-focus-box-shadow"
                                             name="dob"
                                             value={ formattedDate }
                                             onChange={ handleInputChange }
                                        />
                                        { formErrors.dob && (
                                             <small className="text-danger">{ formErrors.dob }</small>
                                        ) }
                                   </div>
                              </div>
                         </div>
                         {/* Gender */ }
                         <div className="col-md-6">
                              <div className="form-group row">
                                   <div className="col mb-2">
                                        <label className="form-label">Gender:</label>
                                        <div>
                                             { genderOptions.map((option) => (
                                                  <div className="form-check form-check-inline" key={ option.value }>
                                                       <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="gender"
                                                            id={ option.value }
                                                            value={ option.value }
                                                            checked={ formData.gender === option.value } // Check against the value from formData
                                                            onChange={ handleInputChange }
                                                       />
                                                       <label className="form-check-label" htmlFor={ option.value }>
                                                            { option.label }
                                                       </label>
                                                  </div>
                                             )) }
                                             { formErrors.gender && (
                                                  <small className="text-danger">{ formErrors.gender }</small>
                                             ) }
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>

                    <button type="button" className="btn btn-danger me-2" onClick={ handleCancel }>
                         Cancel
                    </button>
                    <button type="submit" className="btn btn-primary ">
                         Save
                    </button>
               </div>
          </>
     );
};

export default ProfileForm;

const ProfileForm = ({
     formData,
     handleInputChange,
     formErrors,
     handleCancel,
}) => {
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
                         {/* lastname */ }
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
                                             placeholder="Date of Birth"
                                             name="dob"
                                             value={ formData.dob }
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
                                             <div className="form-check form-check-inline">
                                                  <input
                                                       className="form-check-input"
                                                       type="radio"
                                                       name="gender"
                                                       id="Male"
                                                       value="Male"
                                                       checked={ formData.gender === "Male" }
                                                       onChange={ handleInputChange }
                                                  />
                                                  <label className="form-check-label" htmlFor="Male">
                                                       Male
                                                  </label>
                                             </div>
                                             <div className="form-check form-check-inline">
                                                  <input
                                                       className="form-check-input"
                                                       type="radio"
                                                       name="gender"
                                                       id="Female"
                                                       value="Female"
                                                       checked={ formData.gender === "Female" }
                                                       onChange={ handleInputChange }
                                                  />
                                                  <label className="form-check-label" htmlFor="Female">
                                                       Female
                                                  </label>
                                             </div>
                                             <div className="form-check form-check-inline">
                                                  <input
                                                       className="form-check-input"
                                                       type="radio"
                                                       name="gender"
                                                       id="Others"
                                                       value="Others"
                                                       checked={ formData.gender === "Others" }
                                                       onChange={ handleInputChange }
                                                  />
                                                  <label className="form-check-label" htmlFor="Others">
                                                       Other
                                                  </label>
                                             </div>
                                             { formErrors.gender && (
                                                  <small className="text-danger">{ formErrors.gender }</small>
                                             ) }
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>

                    <div className="row">
                         {/* Blood Group */ }
                         <div className="col-md-6">
                              <div className="form-group row">
                                   <div className="col mb-3">
                                        <label htmlFor="blood_group" className="font-weight-bold">
                                             Blood Group:
                                        </label>
                                        <input
                                             type="text"
                                             className="form-control no-focus-box-shadow"
                                             placeholder="Blood Group"
                                             name="blood_group"
                                             value={ formData.blood_group }
                                             onChange={ handleInputChange }
                                        />
                                        { formErrors.blood_group && (
                                             <small className="text-danger">
                                                  { formErrors.blood_group }
                                             </small>
                                        ) }
                                   </div>
                              </div>
                         </div>
                         {/* Marital Status */ }
                         <div className="col-md-6">
                              <div className="form-group row">
                                   <div className="col mb-3">
                                        <label htmlFor="marital_status" className="font-weight-bold">
                                             Marital Status:
                                        </label>
                                        <input
                                             type="text"
                                             className="form-control no-focus-box-shadow"
                                             placeholder="Marital Status"
                                             name="marital_status"
                                             value={ formData.marital_status }
                                             onChange={ handleInputChange }
                                        />
                                        { formErrors.marital_status && (
                                             <small className="text-danger">
                                                  { formErrors.marital_status }
                                             </small>
                                        ) }
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

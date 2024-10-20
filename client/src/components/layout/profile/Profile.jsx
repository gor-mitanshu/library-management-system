import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2';
import Card from '../../../ui/Card';
import ProfileForm from './forms/ProfileForm';
import { toast } from 'react-toastify';
import ContactForm from './forms/ContactForm';
import AddressForm from './forms/AddressForm';

const profileInitialState = {
     firstName: "",
     lastName: "",
     dob: "",
     gender: "",
     blood_group: "",
     marital_status: "",
     email: "",
     phone: "",
     address: "",
}

const Profile = () => {
     const [editMode, setEditMode] = useState({
          personalProfile: false,
          contactInformation: false,
          address: false,
     });

     const [formData, setFormData] = useState({ ...profileInitialState, });
     const [user, setUser] = useState({})
     const initialUser = useRef({ ...profileInitialState, });
     const [formErrors, setFormErrors] = useState(profileInitialState);

     const handleInputChange = (e) => {
          const { name, value } = e.target;
          setFormData({
               ...formData,
               [name]: value,
          });

          setFormErrors({
               ...formErrors,
               [name]: "",
          });
     };

     // Handle Edit Click
     const handleEditClick = (section) => {
          setEditMode((prevEditMode) => ({
               ...prevEditMode,
               [section]: true,
          }));
     };
     //Handle Cancel Click
     const handleCancelClick = (section) => {
          if (hasChanges(formData)) {
               Swal.fire({
                    title: "Are you sure?",
                    text: "Changes will not be saved.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Don't Save!",
               }).then((result) => {
                    if (result.isConfirmed) {
                         setFormData(user)
                         setEditMode((prevEditMode) => ({
                              ...prevEditMode,
                              [section]: false,
                         }));

                         // Reset validation errors for all fields in the specific card
                         if (section === "personalProfile") {
                              setFormErrors((prevFormErrors) => ({
                                   ...prevFormErrors,
                                   firstName: "",
                                   lastName: "",
                                   dob: "",
                                   gender: "",
                                   blood_group: "",
                                   marital_status: "",
                              }));
                         } else if (section === "contactInformation") {
                              setFormErrors((prevFormErrors) => ({
                                   ...prevFormErrors,
                                   email: "",
                                   phone: "",
                              }));
                         } else if (section === "address") {
                              setFormErrors((prevFormErrors) => ({
                                   ...prevFormErrors,
                                   address: "",
                              }));
                         }
                    }
               });
          } else {
               setFormData(user)
               setEditMode((prevEditMode) => ({
                    ...prevEditMode,
                    [section]: false,
               }));

               // Reset validation errors for all fields in the specific card
               if (section === "personalProfile") {
                    setFormErrors((prevFormErrors) => ({
                         ...prevFormErrors,
                         firstName: "",
                         lastName: "",
                         dob: "",
                         gender: "",
                         blood_group: "",
                         marital_status: "",
                    }));
               } else if (section === "contactInformation") {
                    setFormErrors((prevFormErrors) => ({
                         ...prevFormErrors,
                         email: "",
                         phone: "",
                    }));
               } else if (section === "address") {
                    setFormErrors((prevFormErrors) => ({
                         ...prevFormErrors,
                         address: "",
                    }));
               }
          }
     };

     // Get the User
     const getUser = useCallback(async () => {
          const accessToken = localStorage.getItem('token');
          if (accessToken) {
               const res = await axios.get(`${process.env.REACT_APP_API}/api/auth/profile`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
               });
               const { user } = res.data;
               setFormData(user);
               setUser(user);
               initialUser.current = user
          }
     }, []);

     useEffect(() => {
          getUser();
     }, [getUser]);

     // Update the data
     const handleSubmit = async (e) => {
          e.preventDefault();
          // Error Handling
          let errors = {};
          // Validate each field based on the section
          // Personal Profile Section
          if (editMode.personalProfile) {
               if (!formData.firstName.trim()) {
                    errors.firstName = "First name is required";
               }
               if (!formData.lastName.trim()) {
                    errors.lastName = "Last name is required";
               }
               if (!formData.dob) {
                    errors.dob = "Date of birth is required";
               }
               if (!formData.gender) {
                    errors.gender = "Gender is required";
               }
          }
          // Contact Information Section
          if (editMode.contactInformation) {
               if (!/\S+@\S+\.\S+/.test(formData.email)) {
                    errors.email = "Invalid email address";
               }
               if (!/^\d{10}$/.test(formData.phone)) {
                    errors.phone = "Phone number must be 10 digits";
               }
          }
          // Address Section
          if (editMode.address) {
               if (!formData.address) {
                    errors.address = "Address is required";
               }
          }

          setFormErrors(errors);
          // If there are no errors, you can submit the form
          if (Object.keys(errors).length === 0) {
               const accessToken = localStorage.getItem('token');
               try {
                    if (accessToken) {
                         const response = await axios.put(
                              `${process.env.REACT_APP_API}/api/auth/update-profile/${formData._id}`, formData, {
                              headers: {
                                   Authorization: `Bearer ${accessToken}`,
                              },
                         }
                         );
                         if (response) {
                              toast.success(response.data.message);
                              getUser();
                              setEditMode({
                                   personalProfile: false,
                                   contactInformation: false,
                                   address: false,
                              });
                         }
                    }
               } catch (error) {
                    console.error("Error updating profile:", error);
               }
          }
     };

     const hasChanges = (changedData) => {
          return (
               changedData.firstName !== initialUser.current.firstName ||
               changedData.lastName !== initialUser.current.lastName ||
               changedData.dob !== initialUser.current.dob ||
               changedData.gender !== initialUser.current.gender ||
               changedData.email !== initialUser.current.email ||
               changedData.phone !== initialUser.current.phone ||
               changedData.address !== initialUser.current.address
          );
     };

     const formatedDate = user.dob;
     const newDate = new Date(formatedDate);
     return (
          <div>
               <div>
                    <form onSubmit={ handleSubmit }>
                         <div className="row">
                              {/* Card 1 */ }
                              <div className="col-md-6">
                                   {/* Personal Profile */ }
                                   <Card
                                        title="Personal Profile"
                                        editMode={ editMode.personalProfile }
                                        handleEditClick={ () => handleEditClick("personalProfile") }
                                        handleCancelClick={ () => handleCancelClick("personalProfile") }
                                   >
                                        { editMode.personalProfile ? (
                                             <>
                                                  <ProfileForm
                                                       formData={ formData }
                                                       formErrors={ formErrors }
                                                       handleInputChange={ handleInputChange }
                                                       hasChanges={ hasChanges }
                                                       handleCancel={ () => handleCancelClick("personalProfile") }
                                                  />
                                             </>
                                        ) : (
                                             <div className="user-details d-flex align-items-center flex-wrap">
                                                  <div className="py-4 py-xl-0 col-12 col-xl-5 text-center">
                                                       <img
                                                            // src={ `${process.env.REACT_APP_API}/images/${user.image}` }
                                                            src={ 'https://via.placeholder.com/600x800' }
                                                            alt="User"
                                                            className="h-50 w-75 rounded-circle"
                                                       />
                                                  </div>
                                                  <div className="col-12 col-xl-7">
                                                       <p>
                                                            <strong>Name: </strong>{ " " }
                                                            { user.firstName && user.lastName
                                                                 ? user.firstName + " " + user.lastName
                                                                 : "-" }
                                                       </p>
                                                       <p>
                                                            <strong>Date of Birth: </strong>{ " " }
                                                            { user.dob
                                                                 ? newDate.toLocaleDateString("en-US", {
                                                                      day: "numeric",
                                                                      month: "short",
                                                                      year: "numeric",
                                                                 })
                                                                 : "-" }
                                                       </p>
                                                       <p>
                                                            <strong>Gender: </strong>
                                                            { user.gender ? user.gender : "-" }
                                                       </p>
                                                  </div>
                                             </div>
                                        ) }
                                   </Card>

                                   {/* Contact Information */ }
                                   <Card title="Contact Information" style={ { marginTop: "10px" } }>
                                        { editMode.contactInformation ? (
                                             <>
                                                  <ContactForm
                                                       formData={ formData }
                                                       formErrors={ formErrors }
                                                       handleInputChange={ handleInputChange }
                                                       handleCancel={ () => handleCancelClick("personalProfile") }
                                                  />
                                             </>
                                        ) : (
                                             <>
                                                  <p>
                                                       <strong>Email:</strong> { user.email }
                                                  </p>
                                                  <p>
                                                       <strong>Phone Number:</strong> { user.phone }
                                                  </p>
                                             </>
                                        ) }
                                   </Card>
                              </div>

                              {/* Card 2 */ }
                              <div className="col-md-6">
                                   {/* Address */ }
                                   <Card
                                        title="Address"
                                        editMode={ editMode.address }
                                        handleEditClick={ () => handleEditClick("address") }
                                        handleCancelClick={ () => handleCancelClick("address") }
                                   >
                                        { editMode.address ? (
                                             <>
                                                  <AddressForm
                                                       formData={ formData }
                                                       formErrors={ formErrors }
                                                       handleInputChange={ handleInputChange }
                                                       handleCancel={ () => handleCancelClick("address") }
                                                  />
                                             </>
                                        ) : (
                                             <>
                                                  <p>
                                                       { user.address ? user.address : "-" }
                                                  </p>
                                             </>
                                        ) }
                                   </Card>
                              </div>
                         </div>
                    </form>
               </div>
          </div>
     )
}

export default Profile
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../../assets/styles/register.css';
import FormWrapper from '../../ui/FormWrapper';
import { registerValidations } from '../../utils/validations';

const Register = () => {
     const [formData, setFormData] = useState({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          dob: '',
          gender: '',
          address: '',
          password: '',
          image: null,
     });
     const [errors, setErrors] = useState({});
     const [loading, setLoading] = useState(false);
     const [showPassword, setShowPassword] = useState(false);
     const navigate = useNavigate();

     const handleClickShowPassword = () => setShowPassword((prev) => !prev);

     const handleChange = (e, fieldName) => {
          const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });

          // Validate the field that changed
          const newErrors = registerValidations({
               [name]: value,
          });

          setErrors(newErrors);
     };

     const handleImageChange = (e) => {
          const file = e.target.files[0];
          if (file) {
               setFormData({ ...formData, image: file }); // Set the image file in state
          }
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          setLoading(true);

          // Validate all fields
          const newErrors = registerValidations(formData);
          setErrors(newErrors);

          if (Object.keys(newErrors).length === 0) {
               const formDataToSend = new FormData();
               // Append each form field to FormData
               Object.keys(formData).forEach(key => {
                    formDataToSend.append(key, formData[key]);
               });

               try {
                    const res = await axios.post('http://localhost:8080/api/auth/register', formDataToSend, {
                         headers: {
                              'Content-Type': 'multipart/form-data',
                         },
                    });

                    if (res && res.data) {
                         setLoading(false);
                         toast.success(res.data.message);
                         navigate('/login');
                    } else {
                         console.log(res);
                    }
               } catch (error) {
                    if (error.name === "AxiosError" && error.message === "Network Error") {
                         toast.error("Connection to server lost");
                    } else {
                         toast.error("Something went wrong");
                    }
               }
          }

          setLoading(false);
     };

     return (
          <FormWrapper title={ "Create an Account" }>
               <div>
                    <form className="row">
                         {/* First Name */ }
                         <div className="col-12">
                              <div className={ `form-input-wrapper ${errors.firstName ? "error-form-input" : ""}` }>
                                   <i className="bi bi-person-fill prefix-icon"></i>
                                   <input
                                        type="text"
                                        className="form-input"
                                        name="firstName"
                                        value={ formData.firstName }
                                        onChange={ (e) => handleChange(e, "firstName") }
                                        placeholder="Enter Your First Name"
                                   />
                              </div>
                              <div className="input-error">{ errors.firstName }</div>
                         </div>

                         {/* Last Name */ }
                         <div className="col-12">
                              <div className={ `form-input-wrapper ${errors.lastName ? "error-form-input" : ""}` }>
                                   <i className="bi bi-person-fill prefix-icon"></i>
                                   <input
                                        type="text"
                                        className="form-input"
                                        name="lastName"
                                        value={ formData.lastName }
                                        onChange={ (e) => handleChange(e, "lastName") }
                                        placeholder="Enter Your Last Name"
                                   />
                              </div>
                              <div className="input-error">{ errors.lastName }</div>
                         </div>

                         {/* Email */ }
                         <div className="col-12">
                              <div className={ `form-input-wrapper ${errors.email ? "error-form-input" : ""}` }>
                                   <i className="bi bi-envelope-fill prefix-icon"></i>
                                   <input
                                        type="email"
                                        className="form-input"
                                        name="email"
                                        value={ formData.email }
                                        onChange={ (e) => handleChange(e, "email") }
                                        placeholder="Enter Your Email"
                                   />
                              </div>
                              <div className="input-error">{ errors.email }</div>
                         </div>

                         {/* Phone */ }
                         <div className="col-12">
                              <div className={ `form-input-wrapper ${errors.phone ? "error-form-input" : ""}` }>
                                   <i className="bi bi-telephone-fill prefix-icon"></i>
                                   <input
                                        type="number"
                                        className="form-input"
                                        name="phone"
                                        value={ formData.phone }
                                        onChange={ (e) => handleChange(e, "phone") }
                                        placeholder="Enter Your Phone Number"
                                   />
                              </div>
                              <div className="input-error">{ errors.phone }</div>
                         </div>

                         {/* Date of Birth (DOB) */ }
                         <div className="col-12">
                              <div className={ `form-input-wrapper ${errors.dob ? "error-form-input" : ""}` }>
                                   <i className="bi bi-calendar-fill prefix-icon"></i>
                                   <input
                                        type="date"
                                        className="form-input"
                                        name="dob"
                                        value={ formData.dob }
                                        onChange={ (e) => handleChange(e, "dob") }
                                   />
                              </div>
                              <div className="input-error">{ errors.dob }</div>
                         </div>

                         {/* Gender */ }
                         <div className="col-12">
                              <div className={ `form-input-wrapper ${errors.gender ? "error-form-input" : ""}` }>
                                   <i className="bi bi-gender-ambiguous prefix-icon"></i>
                                   <select
                                        className="form-input"
                                        name="gender"
                                        value={ formData.gender }
                                        onChange={ (e) => handleChange(e, "gender") }
                                   >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                   </select>
                              </div>
                              <div className="input-error">{ errors.gender }</div>
                         </div>

                         {/* Address */ }
                         <div className="col-12">
                              <div className={ `form-input-wrapper ${errors.address ? "error-form-input" : ""}` }>
                                   <i className="bi bi-house-fill prefix-icon"></i>
                                   <input
                                        type="text"
                                        className="form-input"
                                        name="address"
                                        value={ formData.address }
                                        onChange={ (e) => handleChange(e, "address") }
                                        placeholder="Enter Your Address"
                                   />
                              </div>
                              <div className="input-error">{ errors.address }</div>
                         </div>

                         {/* Password */ }
                         <div className="col-12">
                              <div className={ `form-input-wrapper ${errors.password ? "error-form-input" : ""}` }>
                                   <i className="bi bi-lock-fill prefix-icon"></i>
                                   <input
                                        type={ showPassword ? "text" : "password" }
                                        className="form-input"
                                        name="password"
                                        value={ formData.password }
                                        onChange={ (e) => handleChange(e, "password") }
                                        placeholder="Enter a Strong Password"
                                   />
                                   { !showPassword ? (
                                        <i
                                             onClick={ handleClickShowPassword }
                                             className="bi bi-eye-fill postfix-icon"
                                        ></i>
                                   ) : (
                                        <i
                                             onClick={ handleClickShowPassword }
                                             className="bi bi-eye-slash-fill postfix-icon"
                                        ></i>
                                   ) }
                              </div>
                              <div className="input-error">{ errors.password }</div>
                         </div>

                         {/* Image Upload */ }
                         <div className="col-12">
                              <div className={ `form-input-wrapper` }>
                                   <i className="bi bi-image-fill prefix-icon"></i>
                                   <input
                                        type="file"
                                        className="form-input"
                                        name="image"
                                        accept="image/png, image/jpeg"
                                        onChange={ handleImageChange }
                                   />
                              </div>
                              <div className="input-error">{ errors.image }</div>
                         </div>

                         {/* Already have an account? */ }
                         <div className="col-12">
                              Already have an account?{ " " }
                              <Link to={ "/login" } className="text-decoration-none">
                                   Sign in
                              </Link>
                         </div>

                         {/* Submit and Cancel Buttons */ }
                         <div className="col-12 mt-4 d-flex justify-content-center">
                              <button type="button" className="btn btn-danger mx-2" onClick={ () => navigate('/login') }>
                                   Cancel
                              </button>
                              <button type="submit" className="btn btn-primary" onClick={ handleSubmit } disabled={ loading }>
                                   { loading ? "Loading..." : "Create Account" }
                              </button>
                         </div>

                         {/* Display Default User Image */ }
                         { formData.image && (
                              <img src={ URL.createObjectURL(formData.image) } alt="Uploaded" className="uploaded-image" />
                         ) }
                    </form>
               </div>
          </FormWrapper>
     );
};

export default Register;
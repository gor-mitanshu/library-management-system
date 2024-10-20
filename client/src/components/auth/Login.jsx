import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import FormWrapper from "../../ui/FormWrapper";
// import "../../UI/formWrapper/FormWrapper.css";
import "../../ui/styles/formWrapper.css";

const Login = () => {
     const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
     const [errors, setErrors] = useState({});
     const [loading, setLoading] = useState(false);
     const [showPassword, setShowPassword] = useState(false);
     const navigate = useNavigate();

     const handleClickShowPassword = () => setShowPassword((prev) => !prev);

     useEffect(() => {
          const savedEmail = localStorage.getItem('email');
          const savedPassword = localStorage.getItem('password');
          if (savedEmail) {
               setFormData((prevData) => ({ ...prevData, email: savedEmail }));
          }
          if (savedPassword) {
               setFormData((prevData) => ({ ...prevData, password: savedPassword }));
          }
     }, []);

     const handleChange = (e) => {
          const { name, value, type, checked } = e.target;
          setFormData({
               ...formData,
               [name]: type === 'checkbox' ? checked : value,
          });

          // Validate the field on change
          if (name === 'email' && !value) {
               setErrors((prevErrors) => ({ ...prevErrors, email: 'Email is required' }));
          } else if (name === 'email') {
               setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
          }

          if (name === 'password' && !value) {
               setErrors((prevErrors) => ({ ...prevErrors, password: 'Password is required' }));
          } else if (name === 'password') {
               setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
          }
     };

     const validateForm = () => {
          const newErrors = {};
          if (!formData.email) newErrors.email = 'Email is required';
          if (!formData.password) newErrors.password = 'Password is required';
          setErrors(newErrors);
          return Object.keys(newErrors).length === 0;
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          if (validateForm()) {
               try {
                    setLoading(true);
                    const response = await axios.post('http://localhost:8080/api/auth/login', formData);
                    setLoading(false);

                    if (response.data.token) {
                         localStorage.setItem('token', response.data.token);
                    }

                    if (formData.rememberMe) {
                         localStorage.setItem('email', formData.email);
                         localStorage.setItem('password', formData.password);
                    } else {
                         localStorage.removeItem('email');
                         localStorage.removeItem('password');
                    }

                    toast.success('Login successful!');
                    navigate('/dashboard');
               } catch (error) {
                    setLoading(false);
                    if (error.response) {
                         setErrors({ form: error.response.data.message });
                         toast.error(error.response.data.message);
                    } else {
                         toast.error('Something went wrong!');
                    }
               }
          }
     };

     return (
          <FormWrapper title={ "Welcome back :)" }>
               <div>
                    <div className="d-flex flex-column">
                         <form onSubmit={ handleSubmit }>
                              <div className="text-start">
                                   <div
                                        className={ `form-input-wrapper ${errors.email ? "error-form-input" : ""
                                             }` }
                                   >
                                        <i className="bi bi-person-fill prefix-icon"></i>
                                        <input
                                             type="text"
                                             className="form-input"
                                             id="email"
                                             placeholder="Enter Your Email"
                                             name="email"
                                             value={ formData.email }
                                             onChange={ (e) => handleChange(e, "email") }
                                        />
                                   </div>
                                   <div className="input-error">{ errors.email }</div>
                              </div>
                              <div className="text-start">
                                   <div
                                        className={ `form-input-wrapper ${errors.password ? "error-form-input" : ""
                                             }` }
                                   >
                                        <i className="bi bi-lock-fill prefix-icon"></i>
                                        <input
                                             type={ showPassword ? "text" : "password" }
                                             className="form-input"
                                             id="password"
                                             placeholder="Enter Your Password"
                                             name="password"
                                             value={ formData.password }
                                             onChange={ (e) => handleChange(e, "password") }
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

                              <div>
                                   <Link to="/forgetpassword" className="text-decoration-none">
                                        Forgot Password?
                                   </Link>
                              </div>

                              <div className="mt-4">
                                   <button type="submit" className="btn btn-primary px-4" disabled={ loading }>
                                        Sign in
                                   </button>
                                   <Link to={ "/register" } className="btn btn-light px-4 ms-3">
                                        Create Account
                                   </Link>
                              </div>
                         </form>
                    </div>
               </div>
          </FormWrapper>
     );
};

export default Login;
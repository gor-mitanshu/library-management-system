import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../assets/styles/register.css';
import { Eye, EyeSlash } from 'react-bootstrap-icons';

const Register = () => {
     const [formData, setFormData] = useState({
          name: '',
          email: '',
          password: '',
          phone: ''
     });
     const [errors, setErrors] = useState({});
     const [loading, setLoading] = useState(false);
     const [showPassword, setShowPassword] = useState(false);
     const navigate = useNavigate();

     const handleTogglePassword = () => {
          setShowPassword(!showPassword);
     };

     const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData({
               ...formData,
               [name]: value
          });
          validateField(name, value);
     };

     const validateField = (name, value) => {
          let newErrors = { ...errors };

          if (name === 'name' && !value) {
               newErrors.name = 'Name is required';
          } else {
               delete newErrors.name;
          }

          if (name === 'email') {
               if (!value) {
                    newErrors.email = 'Email is required';
               } else if (!/\S+@\S+\.\S+/.test(value)) {
                    newErrors.email = 'Email is invalid';
               } else {
                    delete newErrors.email;
               }
          }

          if (name === 'password') {
               if (!value) {
                    newErrors.password = 'Password is required';
               } else if (value.length < 6) {
                    newErrors.password = 'Password must be at least 6 characters';
               } else {
                    delete newErrors.password;
               }
          }

          if (name === 'phone') {
               if (!value) {
                    newErrors.phone = 'Phone number is required';
               } else if (!/^\d{10}$/.test(value)) {
                    newErrors.phone = 'Phone number must be 10 digits';
               } else {
                    delete newErrors.phone;
               }
          }

          setErrors(newErrors);
     };

     const validateForm = () => {
          const newErrors = {};
          if (!formData.name) newErrors.name = 'Name is required';
          if (!formData.email) newErrors.email = 'Email is required';
          if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
          if (!formData.password) newErrors.password = 'Password is required';
          if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
          if (!formData.phone) newErrors.phone = 'Phone number is required';
          if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits';
          setErrors(newErrors);
          return Object.keys(newErrors).length === 0;
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          if (validateForm()) {
               try {
                    setLoading(true);
                    const response = await axios.post('http://localhost:8080/api/auth/register', formData);
                    if (response) {
                         setLoading(false);
                         toast.success('Registration successful!');
                         navigate('/login');
                    }
               } catch (error) {
                    setLoading(false);
                    console.error('Error:', error);
                    if (error.response) {
                         toast.error(error.response.data.message || 'An error occurred!');
                         setErrors({ form: error.response.data.message });
                    } else {
                         toast.error('Something went wrong!');
                    }
               }
          }
     };

     return (
          <Container fluid className="d-flex justify-content-center align-items-center" style={ { minHeight: '100vh' } }>
               <Row className="w-100">
                    <Col md={ 6 } className="d-none d-md-block p-0">
                         <div className="register-image-container">
                              <img
                                   src="https://via.placeholder.com/600x800"
                                   alt="Register"
                                   className="img-fluid vh-100 w-100"
                                   style={ { objectFit: 'cover' } }
                              />
                         </div>
                    </Col>

                    <Col md={ 6 } className="d-flex align-items-center justify-content-center">
                         <Card className="w-75">
                              <Card.Body>
                                   <h3 className="text-center mb-4">Register</h3>
                                   <Form onSubmit={ handleSubmit }>
                                        { errors.form && <p className="text-danger text-center">{ errors.form }</p> }
                                        <Form.Group className="mb-3" controlId="formName">
                                             <Form.Label>Name</Form.Label>
                                             <Form.Control
                                                  type="text"
                                                  placeholder="Enter name"
                                                  name="name"
                                                  value={ formData.name }
                                                  onChange={ handleChange }
                                                  isInvalid={ !!errors.name }
                                             />
                                             <Form.Control.Feedback type="invalid">
                                                  { errors.name }
                                             </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formEmail">
                                             <Form.Label>Email address</Form.Label>
                                             <Form.Control
                                                  type="email"
                                                  placeholder="Enter email"
                                                  name="email"
                                                  value={ formData.email }
                                                  onChange={ handleChange }
                                                  isInvalid={ !!errors.email }
                                             />
                                             <Form.Control.Feedback type="invalid">
                                                  { errors.email }
                                             </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formPhone">
                                             <Form.Label>Phone Number</Form.Label>
                                             <Form.Control
                                                  type="text"
                                                  placeholder="Enter phone number"
                                                  name="phone"
                                                  value={ formData.phone }
                                                  onChange={ handleChange }
                                                  isInvalid={ !!errors.phone }
                                             />
                                             <Form.Control.Feedback type="invalid">
                                                  { errors.phone }
                                             </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formPassword">
                                             <Form.Label>Password</Form.Label>
                                             <div className="position-relative">
                                                  <Form.Control
                                                       type={ showPassword ? 'text' : 'password' } // Toggle input type based on state
                                                       placeholder="Enter password"
                                                       name="password"
                                                       value={ formData.password }
                                                       onChange={ handleChange }
                                                       isInvalid={ !!errors.password }
                                                  />
                                                  <span
                                                       className="position-absolute"
                                                       style={ { right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' } }
                                                       onClick={ handleTogglePassword }
                                                  >
                                                       { showPassword ? <EyeSlash size={ 20 } /> : <Eye size={ 20 } /> }
                                                  </span>
                                                  <Form.Control.Feedback type="invalid">
                                                       { errors.password }
                                                  </Form.Control.Feedback>
                                             </div>
                                        </Form.Group>

                                        <Button variant="primary" type="submit" className="w-100 mb-3" disabled={ loading }>
                                             { loading ? <Spinner animation="border" size="sm" /> : 'Register' }
                                        </Button>

                                        <div className="text-center">
                                             <p>
                                                  Already have an account?{ ' ' }
                                                  <Link to="/login" className="text-decoration-none">
                                                       Login
                                                  </Link>
                                             </p>
                                        </div>
                                   </Form>
                              </Card.Body>
                         </Card>
                    </Col>
               </Row>
          </Container>
     );
};

export default Register;
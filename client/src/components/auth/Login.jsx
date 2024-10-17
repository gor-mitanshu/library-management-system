import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../../assets/styles/login.css';

const Login = () => {
     const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
     const [errors, setErrors] = useState({});
     const [loading, setLoading] = useState(false);
     const navigate = useNavigate();

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

                    console.log('Login successful', response.data);
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
          <Container fluid className="d-flex justify-content-center align-items-center" style={ { minHeight: '100vh' } }>
               <Row className="w-100">
                    <Col md={ 6 } className="d-none d-md-block p-0">
                         <div className="login-image-container">
                              <img
                                   src="https://via.placeholder.com/600x800"
                                   alt="Login"
                                   className="img-fluid vh-100 w-100"
                                   style={ { objectFit: 'cover' } }
                              />
                         </div>
                    </Col>

                    <Col md={ 6 } className="d-flex align-items-center justify-content-center">
                         <Card className="w-75">
                              <Card.Body>
                                   <h3 className="text-center mb-4">Login</h3>
                                   <Form onSubmit={ handleSubmit }>
                                        { errors.form && <p className="text-danger text-center">{ errors.form }</p> }
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

                                        <Form.Group className="mb-3" controlId="formPassword">
                                             <Form.Label>Password</Form.Label>
                                             <Form.Control
                                                  type="password"
                                                  placeholder="Enter password"
                                                  name="password"
                                                  value={ formData.password }
                                                  onChange={ handleChange }
                                                  isInvalid={ !!errors.password }
                                             />
                                             <Form.Control.Feedback type="invalid">
                                                  { errors.password }
                                             </Form.Control.Feedback>
                                        </Form.Group>

                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                             <Form.Check
                                                  type="checkbox"
                                                  label="Remember Me"
                                                  name="rememberMe"
                                                  checked={ formData.rememberMe }
                                                  onChange={ handleChange }
                                             />
                                             <Link to="/forgot-password" className="text-decoration-none">
                                                  Forgot Password?
                                             </Link>
                                        </div>

                                        <Button variant="primary" type="submit" className="w-100 mb-3" disabled={ loading }>
                                             { loading ? <Spinner animation="border" size="sm" /> : 'Login' }
                                        </Button>

                                        <div className="text-center">
                                             <p>
                                                  Don't have an account?{ ' ' }
                                                  <Link to="/signup" className="text-decoration-none">
                                                       Sign up
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

export default Login;
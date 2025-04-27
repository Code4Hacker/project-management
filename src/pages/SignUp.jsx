import React from 'react';
import { useForm } from 'react-hook-form';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { SIGN_IN } from '../constants/routes';
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { baseURL } from '../baseURL';

const Signup = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    watch 
  } = useForm();
  const navigate = useNavigate();
  const password = watch('password', '');

  const onSubmit = async (data) => {
    const loadingToast = toast.loading('Creating account...');
    
    try {
  
      const response = await axios.post(`${baseURL}/register/`, {
        username: data.username,
        email: data.email,
        password: data.password,
        confirm_Password: data.confirmPassword, 
        first_name: data.firstName,
        last_name: data.lastName
      }, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      toast.dismiss(loadingToast);
      toast.success('Account created successfully! You can now sign in.');
      navigate(SIGN_IN);
      console.log(response)
    } catch (error) {
      toast.dismiss(loadingToast);
      
      // Log the full error response for debugging
      console.error('Full error response:', error);
      
      if (error.response) {
        // Server responded with error status
        if (error.response.data) {
          // Handle validation errors
          if (typeof error.response.data === 'object') {
            // Convert object errors to string
            const errorMessages = Object.entries(error.response.data)
              .map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors.join(' ') : errors}`)
              .join('\n');
            toast.error(errorMessages);
          } else {
            toast.error(error.response.data.detail || 'Registration failed');
          }
        } else {
          toast.error('Registration failed. Please try again.');
        }
      } else if (error.request) {
        toast.error('No response from server. Please check your connection.');
      } else {
        toast.error(`Request error: ${error.message}`);
      }
    }
  };

  return (
    <Container fluid className="auth-container">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col md={5} className="mx-auto">
          <Card className="auth-card shadow">
            <Card.Body>
              <h2 className="text-center mb-4">Create Account</h2>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        {...register('firstName', { 
                          required: 'First name is required',
                          maxLength: {
                            value: 30,
                            message: 'First name cannot exceed 30 characters'
                          }
                        })}
                        isInvalid={!!errors.firstName}
                        placeholder="Enter first name"
                      />
                      {errors.firstName && (
                        <Form.Control.Feedback type="invalid">
                          {errors.firstName.message}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        {...register('lastName', { 
                          required: 'Last name is required',
                          maxLength: {
                            value: 30,
                            message: 'Last name cannot exceed 30 characters'
                          }
                        })}
                        isInvalid={!!errors.lastName}
                        placeholder="Enter last name"
                      />
                      {errors.lastName && (
                        <Form.Control.Feedback type="invalid">
                          {errors.lastName.message}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    {...register('username', { 
                      required: 'Username is required',
                      pattern: {
                        value: /^[a-zA-Z0-9_.-]+$/,
                        message: 'Username can only contain letters, numbers, underscores, dots, and hyphens'
                      },
                      minLength: {
                        value: 3,
                        message: 'Username must be at least 3 characters'
                      },
                      maxLength: {
                        value: 30,
                        message: 'Username cannot exceed 30 characters'
                      }
                    })}
                    isInvalid={!!errors.username}
                    placeholder="Enter username"
                  />
                  {errors.username && (
                    <Form.Control.Feedback type="invalid">
                      {errors.username.message}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    isInvalid={!!errors.email}
                    placeholder="Enter email"
                  />
                  {errors.email && (
                    <Form.Control.Feedback type="invalid">
                      {errors.email.message}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    {...register('password', { 
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters'
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+/,
                        message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
                      }
                    })}
                    isInvalid={!!errors.password}
                    placeholder="Enter password"
                  />
                  <Form.Text className="text-muted">
                    At least 8 characters with uppercase, lowercase, and number
                  </Form.Text>
                  {errors.password && (
                    <Form.Control.Feedback type="invalid">
                      {errors.password.message}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    {...register('confirmPassword', { 
                      required: 'Please confirm your password',
                      validate: value => 
                        value === password || 'Passwords do not match'
                    })}
                    isInvalid={!!errors.confirmPassword}
                    placeholder="Confirm password"
                  />
                  {errors.confirmPassword && (
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword.message}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </Button>
              </Form>
            </Card.Body>
          </Card>

          <div className="text-center mt-4">
            <span className="text-muted">Already have an account? </span>
            <Link to={SIGN_IN} className="text-decoration-none">
              Sign In
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
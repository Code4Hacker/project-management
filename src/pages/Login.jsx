import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { HOME, SIGN_UP } from '../constants/routes';
import { baseURL } from '../baseURL';
import toast from 'react-hot-toast';
import axios from 'axios';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  
  const onSubmit = async (data) => {
    const loadingToast = toast.loading('Creating account...');
    
    try {
  
      const response = await axios.post(`${baseURL}/login/`, {
        username_or_email: data.email,
        password: data.password
      }, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      toast.dismiss(loadingToast);
      toast.success('Sign In successfully!');
      console.log(response.data.user)
      localStorage.setItem("user", JSON.stringify(response.data.user))

      navigate(HOME);
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
  useEffect(() => {
    const user = window.localStorage.getItem("user");
    if(user !== null){
      navigate(HOME)
    }
  });
  return (
    <Container fluid className="auth-container">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col md={5} className="mx-auto">
          <Card className="auth-card">
            <Card.Body>
              <h2 className="text-center mb-4">Welcome Back</h2>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    isInvalid={!!errors.email}
                    placeholder="Enter email"
                  />
                  {errors.email && (
                    <Form.Control.Feedback type="invalid">
                      {errors.email.message}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    {...register('password', { required: 'Password is required' })}
                    isInvalid={!!errors.password}
                    placeholder="Enter password"
                  />
                  {errors.password && (
                    <Form.Control.Feedback type="invalid">
                      {errors.password.message}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mb-3">
                  Sign In
                </Button>

                <div className="text-center mt-3">
                  <Link to="/forgot-password" className="text-decoration-none">
                    Forgot Password?
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>

          <div className="text-center mt-4">
            <span className="text-muted">Don't have an account? </span>
            <Link to={SIGN_UP} className="text-decoration-none">
              Sign Up
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
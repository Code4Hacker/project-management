import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { HOME, SIGN_UP } from '../constants/routes';
import toast from 'react-hot-toast';
import useFetch from '../hooks/useFetch';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { fetchData, loading } = useFetch();

  const onSubmit = async (input) => {
    const loadingToast = toast.loading('Logging in...');
    
    try {
      const { code, message, data } = await fetchData({
        reqType: "post",
        api: "/login",
        body: {
          username: input.email,
          password: input.password
        }
      });

      if(code !== 9000) {
        toast.dismiss(loadingToast);
        toast.error(message);
      } else {
        toast.dismiss(loadingToast);
        toast.success(message);
        
        localStorage.setItem("user", JSON.stringify(data));
        navigate(HOME);
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      
      console.error('Full error response:', error);
      
      if (error.response) {
        if (error.response.data) {
          if (typeof error.response.data === 'object') {
            const errorMessages = Object.entries(error.response.data)
              .map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors.join(' ') : errors}`)
              .join('\n');
            toast.error(errorMessages);
          } else {
            toast.error(error.response.data.detail || 'Login failed');
          }
        } else {
          toast.error('Login failed. Please try again.');
        }
      } else if (error.request) {
        toast.error('No response from server. Please check your connection.');
      } else {
        toast.error(`Request error: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if(user !== null) {
      navigate(HOME);
    }
  }, [navigate]);

  return (
    <Container fluid className="auth-container">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col md={5} className="mx-auto">
          <Card className="auth-card">
            <Card.Body>
              <h2 className="text-center mb-4">Welcome Back</h2>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label>Enter Email / Username</Form.Label>
                  <Form.Control
                    type="text"
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

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 mb-3"
                  disabled={loading}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
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
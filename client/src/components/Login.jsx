import { useState } from 'react';
import { Form, Button, Alert, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import './style.css'

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const extractErrorMessage = (htmlString) => {
    const startIndex = htmlString.indexOf('<pre>');
    const endIndex = htmlString.indexOf('</pre>', startIndex);
  
    if (startIndex !== -1 && endIndex !== -1) {
      const errorMessage = htmlString.substring(startIndex + 5, endIndex);
      return errorMessage.trim();
    } else {
      return 'An error occurred';
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    async function validateLogin() {
      try {
        await props.handleLogin(username, password);
        navigate('/');
      }catch(error) {
        const errorMessage = extractErrorMessage(error.message);
        setErrorMessage(errorMessage);
        setShow(true);
      }
    }
    validateLogin();
    
}

  return (
    <Row className="vh-100 justify-content-center mt-4">
    <Col xs={8} md={5} lg={4} >
    <h1 className="pb-3">Login</h1>

      <Form  onSubmit={handleSubmit}>
          <Alert
            dismissible
            show={show}
            onClose={() => setShow(false)}
            variant="danger">
            {errorMessage}
          </Alert>
          <Form.Group className="mb-1" controlId="username">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={username} placeholder="Example: john.doe@polito.it"
              onChange={(ev) => setUsername(ev.target.value)}
              required={true}
            />
          </Form.Group>
          <Form.Group className="mb-1" controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password} placeholder="Enter the password."
              onChange={(ev) => setPassword(ev.target.value)}
              required={true} minLength={6}
              autoComplete='current password'
            />
          </Form.Group>
          <div className='loginButtons'>
            <Button className="loginButton" type="submit">Login</Button>
            <Button className='footerButton' onClick={() => {navigate('/')}}> Go Back To Home Page </Button>
          </div>
      </Form>
      </Col>
      </Row>

  )
};

export { Login };
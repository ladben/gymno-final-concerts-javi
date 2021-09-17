// huseHistory
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

// import { Error } from "../../interfaces";

// import config from '../../config';

import './Login.scss';
// ChangeEvent, useState
import { SyntheticEvent } from "react";

interface LoginProps {}
 
const Login: React.FC<LoginProps> = () => {
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('SUbmitted');
  }


  return (
    <div className="form">
      <div className="texts">
        <h1>Login to use our site</h1>
        <p className="message">This is some informative text</p>
      </div>
      <Container>
        <Form className="needs-validation" onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <FloatingLabel controlId="floatingInputUsername" label="Username">
              {/* form.control needs value from state and onChange method */}
              <Form.Control required name="username" type="text" placeholder="Username" />
              <div className="invalid-tooltip">
                {/* can come from some state */}
                This field is required!
              </div>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <FloatingLabel controlId="floatingInputPassword" label="Password">
              {/* form.control needs value from state and onChange method */}
              <Form.Control required name="username" type="password" placeholder="Password" />
              <div className="invalid-tooltip">
                {/* can come from some state */}
                This field is required!
              </div>
            </FloatingLabel>
          </Form.Group>

          <div className="form-buttons">
            <Button variant="primary" type="submit">
              Login
            </Button>

            <Link to="/">
              <Button variant="primary">
                Go back
              </Button>
            </Link>
          </div>
        </Form>
      </Container>
    </div>
  );
}
 
export default Login;
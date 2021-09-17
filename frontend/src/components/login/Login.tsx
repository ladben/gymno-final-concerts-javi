import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { Error } from "../../interfaces";

import config from '../../config';

import './Login.scss';


const toggleClass = (element: HTMLElement, classToRemove: string, classToAdd: string) => {
  element.classList.remove(classToRemove);
  element.classList.add(classToAdd);
}

const removeValidatingClasses = (form: HTMLFormElement) => {
  const username: HTMLInputElement = form.elements.namedItem('username') as HTMLInputElement;
  const password: HTMLInputElement = form.elements.namedItem('password') as HTMLInputElement;
  const elements: Array<HTMLInputElement> = [
    username, password
  ];

  elements.forEach(e => {
    e.classList.remove('is-invalid');
    e.classList.remove('is-valid');
  });
}

interface LoginProps {}
 
const Login: React.FC<LoginProps> = () => {
  const history = useHistory();
  const localStorage: Storage = window.localStorage;

  const initialFormValues = {
    username: '',
    password: ''
  }

  const initialInputErrorMessages = {
    required: 'This field is required.',
    invalid: 'Invalid username or password.'
  }

  const [formValues, setFormValues] = useState(initialFormValues);
  const [userNameError, setUserNameError] = useState(initialInputErrorMessages.required);
  const [passwordError, setPasswordError] = useState(initialInputErrorMessages.required);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.classList.remove('is-invalid');
    // setUserNameError(initialInputErrorMessages.required);
    // setPasswordError(initialInputErrorMessages.required);
    switch (event.target.id) {
      case 'floatingInputUsername':
        setFormValues({
          username: event.target.value,
          password: formValues.password
        });
        break;
      case 'floatingInputPassword':
        setFormValues({
          username: formValues.username,
          password: event.target.value
        });
        break;
      default:
        setFormValues({
          username: '',
          password: ''
        });
        break;
    }
  }

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const form: HTMLFormElement = event.target as HTMLFormElement;
    removeValidatingClasses(form);
    toggleClass(form, 'needs-validation', 'was-validated');

    if (form.checkValidity()) {
      const body = {
        username: formValues.username,
        password: formValues.password
      }
      fetch(`${config.url}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'error') {
          toggleClass(form, 'was-validated', 'needs-validation');
          const error: Error = data as Error;
          switch (error.message) {
            case 'Username is required.':
              setUserNameError(error.message);
              toggleClass((form.elements.namedItem('username') as HTMLInputElement), 'is-valid', 'is-invalid');
              break;

            case 'Password is required.':
              setPasswordError(error.message);
              toggleClass((form.elements.namedItem('password') as HTMLInputElement), 'is-valid', 'is-invalid');
              break;

            case 'Username or password is incorrect.':
              setUserNameError(error.message);
              setPasswordError(error.message);
              toggleClass((form.elements.namedItem('username') as HTMLInputElement), 'is-valid', 'is-invalid');
              toggleClass((form.elements.namedItem('password') as HTMLInputElement), 'is-valid', 'is-invalid');
              break;

            default:
              setUserNameError('Something went wrong.');
              setPasswordError('Something went wrong.');
              toggleClass((form.elements.namedItem('username') as HTMLInputElement), 'is-valid', 'is-invalid');
              toggleClass((form.elements.namedItem('password') as HTMLInputElement), 'is-valid', 'is-invalid');
              break;
          }
        } else {
          localStorage.setItem('authorization', data.authorization);
          history.push('/');
        }
      })
      .catch(error => console.log(error));
    }
  }


  return (
    <div className="form">
      <div className="texts">
        <h1>Login to use our site</h1>
        <p className="message">and start your musical journey</p>
      </div>
      <Container>
        <Form className="needs-validation" onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <FloatingLabel controlId="floatingInputUsername" label="Username">
              <Form.Control required name="username" type="text" placeholder="Username" value={formValues.username} onChange={handleInputChange} />
              <div className="invalid-tooltip">
                { userNameError }
              </div>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <FloatingLabel controlId="floatingInputPassword" label="Password">
              <Form.Control required name="password" type="password" placeholder="Password" value={formValues.password} onChange={handleInputChange} />
              <div className="invalid-tooltip">
                { passwordError }
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
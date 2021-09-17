import { Link, useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { Error } from "../../interfaces";

import config from '../../config';

import './Register.scss';
import { ChangeEvent, SyntheticEvent, useState } from "react";

const removeValidatingClasses = (form: HTMLFormElement) => {
  const lastname: HTMLInputElement = form.elements.namedItem('lastname') as HTMLInputElement;
  const firstname: HTMLInputElement = form.elements.namedItem('firstname') as HTMLInputElement;
  const username: HTMLInputElement = form.elements.namedItem('username') as HTMLInputElement;
  const password: HTMLInputElement = form.elements.namedItem('password') as HTMLInputElement;
  const elements: Array<HTMLInputElement> = [
    lastname, firstname, username, password
  ];
  elements.forEach(e => {
    e.classList.remove('is-valid');
    e.classList.remove('is-invalid');
  });
}

const toggleClass = (input: HTMLElement, classToRemove: string, classToAdd: string) => {
 input.classList.remove(classToRemove);
 input.classList.add(classToAdd);
}

interface RegisterProps {}
 
const Register: React.FC<RegisterProps> = () => {
  const history = useHistory();
  
  const initialFormValues = {
    firstname: '',
    lastname: '',
    username: '',
    password: ''
  }

  const initialInputErrorMessages = {
    required: 'This field is required!',
    passwordLength: 'Password needs to be at least 6 characters long!',
  }

  const [formValues, setFormValues] = useState(initialFormValues);
  const [userNameError, setUserNameError] = useState(initialInputErrorMessages.required);
  const [fullNameError, setFullNameError] = useState(initialInputErrorMessages.required);
  const [passwordError, setPasswordError] = useState(initialInputErrorMessages.passwordLength);
  const [success, setSuccess] = useState('Please fill out the form.');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.classList.remove('is-invalid');
    setUserNameError(initialInputErrorMessages.required);
    setFullNameError(initialInputErrorMessages.required);
    setPasswordError(initialInputErrorMessages.passwordLength);
    switch (event.target.id) {
      case 'floatingInputFirstname':
        setFormValues({
          firstname: event.target.value,
          lastname: formValues.lastname,
          username: formValues.username,
          password: formValues.password
        });
        break;
      
      case 'floatingInputLastname':
        setFormValues({
          firstname: formValues.firstname,
          lastname: event.target.value,
          username: formValues.username,
          password: formValues.password
        });
        break;
      
      case 'floatingInputUsername':
        setFormValues({
          firstname: formValues.firstname,
          lastname: formValues.lastname,
          username: event.target.value,
          password: formValues.password
        });
        break;

      case 'floatingPassword':
        setFormValues({
          firstname: formValues.firstname,
          lastname: formValues.lastname,
          username: formValues.username,
          password: event.target.value
        });
        break;

      default:
        setFormValues({
          firstname: '',
          lastname: '',
          username: '',
          password: ''
        });
        break;
    }
  }

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.target as HTMLFormElement;
    removeValidatingClasses(form);
    form.classList.remove('needs-validation');
    form.classList.add('was-validated');
    if (form.checkValidity()) {
      const body = {
        lastname: formValues.lastname,
        firstname: formValues.firstname,
        username: formValues.username,
        password: formValues.password
      }
      fetch(`${config.url}/api/registration`, {
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
            case 'Full name is required.':
              setFullNameError(error.message);
              toggleClass((form.elements.namedItem('firstname') as HTMLInputElement), 'is-valid', 'is-invalid');
              toggleClass((form.elements.namedItem('lastname') as HTMLInputElement), 'is-valid', 'is-invalid');
              break;
            case 'Username is required.':
              setUserNameError(error.message);
              toggleClass((form.elements.namedItem('username') as HTMLInputElement), 'is-valid', 'is-invalid');
              break;
            case 'Username is already taken.':
              setUserNameError(error.message);
              toggleClass((form.elements.namedItem('username') as HTMLInputElement), 'is-valid', 'is-invalid');
              break;
            case 'Password is required.':
              setPasswordError(error.message);
              toggleClass((form.elements.namedItem('password') as HTMLInputElement), 'is-valid', 'is-invalid');
              break;
          }
        } else {
          setSuccess('Successful registration');
          setTimeout(()=> {
            history.push('/');
          }, 2000);
        }
      })
      .catch(error => console.log(error));
    }
  }

  return (
    <div className="form">
      <div className="texts">
        <h1>
          Register for our site
        </h1>
        <p className="message">{success}</p>
      </div>
      <Container>
        <Form className="needs-validation" onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3" controlId="formBasicFistname">
            <FloatingLabel controlId="floatingInputFirstname" label="First name">
              <Form.Control required name="firstname" type="text" placeholder="First name" value={formValues.firstname} onChange={handleInputChange}/>
              <div className="invalid-tooltip">
                {fullNameError}
              </div>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLastname">
            <FloatingLabel controlId="floatingInputLastname" label="Last name">
              <Form.Control required name="lastname" type="text" placeholder="Last name" value={formValues.lastname} onChange={handleInputChange}/>
              <div className="invalid-tooltip">
                {fullNameError}
              </div>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicUsername">
            <FloatingLabel controlId="floatingInputUsername" label="Username">
              <Form.Control required name="username" type="text" placeholder="Username" value={formValues.username} onChange={handleInputChange}/>
              <div className="invalid-tooltip">
                {userNameError}
              </div>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control pattern=".{6,}" required name="password" type="password" placeholder="Password" value={formValues.password} onChange={handleInputChange} />
              <div className="invalid-tooltip">
                {passwordError}
              </div>
            </FloatingLabel>
            <Form.Text className="text-muted">
              Your password should constist of at least 6 characters.
            </Form.Text>
          </Form.Group>

          <div className="form-buttons">
            <Button variant="primary" type="submit">
              Submit
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
 
export default Register;
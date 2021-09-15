import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import './Register.scss';
import { ChangeEvent, SyntheticEvent, useState } from "react";

interface RegisterProps {}
 
const Register: React.FC<RegisterProps> = () => {
  const initialFormValues = {
    firstname: '',
    lastname: '',
    username: '',
    password: ''
  }

  const [formValues, setFormValues] = useState(initialFormValues);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('This field is required!');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
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
    const form = event.target as HTMLFormElement;
    event.preventDefault();
    event.stopPropagation();
    if (formValues.password.length < 6) {
      setPasswordErrorMessage('Password needs to be at least 6 characters long!');
    }
    form.classList.add('was-validated');
  }

  return (
    <div className="register-form">
      <h1>
        Register for our site
      </h1>
      <Container>
        <Form className="needs-validation" onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3" controlId="formBasicFistname">
            <FloatingLabel controlId="floatingInputFirstname" label="First name">
              <Form.Control required name="random" type="text" placeholder="First name" value={formValues.firstname} onChange={handleInputChange}/>
              <div className="invalid-tooltip">
                This field is required!
              </div>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLastname">
            <FloatingLabel controlId="floatingInputLastname" label="Last name">
              <Form.Control required type="text" placeholder="Last name" value={formValues.lastname} onChange={handleInputChange}/>
              <div className="invalid-tooltip">
                This field is required!
              </div>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicUsername">
            <FloatingLabel controlId="floatingInputUsername" label="Username">
              <Form.Control required type="text" placeholder="Username" value={formValues.username} onChange={handleInputChange}/>
              <div className="invalid-tooltip">
                This field is required!
              </div>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control required type="password" placeholder="Password" value={formValues.password} onChange={handleInputChange} />
              <div className="invalid-tooltip">
                {passwordErrorMessage}
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
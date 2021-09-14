import { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import Input from "../common/input/Input";

import './Register.scss';

interface RegisterProps {}
 
const Register: React.FC<RegisterProps> = () => {

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    console.log('Submitted');
  }

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit}>
        <Input value="" type="text" placeholder="Name" onChange={()=>{console.log('name changed')}} />
        <Link to="/">
          <button>Go back</button>
        </Link>
      </form>
    </div>
  );
}
 
export default Register;
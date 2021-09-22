import { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import LoggedInAs from "../common/hello-user/LoggedInAs";

interface MainProps {}
 
const Main: React.FC<MainProps> = () => {
  const localStorage: Storage = window.localStorage;
  // CREATE backend endpoint for getting payload from token
  const firstname = 'Bence';
  const lastname = 'Ladányi';

  const handleLogout = (event: SyntheticEvent) => {
    localStorage.removeItem('authorization');
  }

  return (
    <div>
      <LoggedInAs firstname={firstname} lastname={lastname} />
      <button onClick={handleLogout}>
        <Link to="/">
          LogOut
        </Link>
      </button>
    </div>
  );
}
 
export default Main;
import { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import HelloUser from "../common/hello-user/HelloUser";

interface MainProps {}
 
const Main: React.FC<MainProps> = () => {
  const localStorage: Storage = window.localStorage;

  const handleLogout = (event: SyntheticEvent) => {
    localStorage.removeItem('authorization');
  }

  return (
    <div>
      <HelloUser firstname="Bence" lastname="Ladányi" />
      <button onClick={handleLogout}>
        <Link to="/">
          LogOut
        </Link>
      </button>
    </div>
  );
}
 
export default Main;
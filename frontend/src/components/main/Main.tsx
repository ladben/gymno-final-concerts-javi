import { SyntheticEvent } from "react";
import { Link } from "react-router-dom";

interface MainProps {}
 
const Main: React.FC<MainProps> = () => {
  const localStorage: Storage = window.localStorage;

  const handleLogout = (event: SyntheticEvent) => {
    localStorage.removeItem('authorization');
  }

  return (
    <button onClick={handleLogout}>
      <Link to="/">
        LogOut
      </Link>
    </button>
  );
}
 
export default Main;
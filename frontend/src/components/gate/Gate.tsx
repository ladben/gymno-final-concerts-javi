import { useHistory } from "react-router";

interface GateProps {}
 
const Gate: React.FC<GateProps> = () => {
  const localStorage: Storage = window.localStorage;
  const history = useHistory();

  if (localStorage.getItem('authorization')) {
    history.push('/welcome');
  } else {
    history.push('/landing');
  }

  return (<div>Redirect</div>);
}
 
export default Gate;
import { Link } from 'react-router-dom';

import LandingPageButton from './button/LandingPageButton';

import './LandingPage.scss';

interface LandingPageProps {}
 
const LandingPage: React.FC<LandingPageProps> = () => {
  const localStorage: Storage = window.localStorage;

  return (
    <div className="welcome">
      { localStorage.getItem('authorization') && <div><h1>Authorized</h1></div> }
      <h1>
        <span className="accent">
          Concert Pilgrim
        </span> is an easy way to organise your <span className="accent">
          live music experience!
        </span>
      </h1>
      <div className="buttons">
        <Link to="/register">
          <LandingPageButton text="Join us" className="filled"/>
        </Link>
        <Link to="/login">
          <LandingPageButton text="Sign in" className="empty"/>
        </Link>
      </div>
    </div>
  );
}
 
export default LandingPage;
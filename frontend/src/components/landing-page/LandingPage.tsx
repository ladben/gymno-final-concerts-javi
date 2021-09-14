import LandingPageButton from './button/LandingPageButton';
import './LandingPage.scss';

interface LandingPageProps {}
 
const LandingPage: React.FC<LandingPageProps> = () => {
  return (
    <div className="welcome">
      <h1>
        <span className="accent">
          Concert Pilgrim
        </span> is an easy way to organise your <span className="accent">
          live music experience!
        </span>
      </h1>
      <div className="buttons">
        <LandingPageButton text="Join us" className="filled"/>
        <LandingPageButton text="Sign in" className="empty"/>
      </div>
    </div>
  );
}
 
export default LandingPage;
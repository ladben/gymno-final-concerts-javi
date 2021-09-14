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
        <button className="filled">Join us</button>
        <button className="empty">Sign in</button>
      </div>
    </div>
  );
}
 
export default LandingPage;
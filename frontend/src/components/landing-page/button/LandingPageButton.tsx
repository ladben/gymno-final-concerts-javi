import './LandingPageButton.scss';

interface LandingPageButtonProps {
  className: string;
  text: string;
}
 
const LandingPageButton: React.FC<LandingPageButtonProps> = ({className, text}) => {
  return (
    <button className={className}>{text}</button>
  );
}
 
export default LandingPageButton;
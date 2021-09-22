import './LoggedInAs.scss';

interface LoggedInAsProps {
  firstname: string,
  lastname: string
}
 
const LoggedInAs: React.FC<LoggedInAsProps> = ({firstname, lastname}) => {
  return (
    <div className="hello-user">
      {`Logged in as ${firstname} ${lastname}`}
    </div>
  );
}
 
export default LoggedInAs;
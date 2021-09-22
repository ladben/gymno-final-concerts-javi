import './HelloUser.scss';

interface HelloUserProps {
  firstname: string,
  lastname: string
}
 
const HelloUser: React.FC<HelloUserProps> = ({firstname, lastname}) => {
  return (
    <div className="hello-user">
      {`Hello ${firstname} ${lastname}`}
    </div>
  );
}
 
export default HelloUser;
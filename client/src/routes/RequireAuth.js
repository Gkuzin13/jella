import { useContext } from 'react';
import { AuthContext } from '../config/Auth';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children, redirectTo }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to={redirectTo} />;
};

export default RequireAuth;

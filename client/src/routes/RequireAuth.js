import { useContext } from 'react';
import { Navigate } from "react-router-dom";
import { AuthContext } from "../config/Auth";

const RequireAuth = ({ children, redirectTo }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to={redirectTo} />;
};

export default RequireAuth;

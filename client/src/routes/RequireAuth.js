import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../config/Auth";

const RequireAuth = ({ children, redirectTo }) => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) return null;

  return user ? children : <Navigate to={redirectTo} />;
};

export default RequireAuth;

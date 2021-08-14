import { useContext } from 'react';
import { AuthContext } from '../config/Auth';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ children, ...rest }) => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Route
      {...rest}
      render={() => {
        return !user ? children : <Redirect to={`/${user.username}/boards`} />;
      }}
    />
  );
};

export default PublicRoute;

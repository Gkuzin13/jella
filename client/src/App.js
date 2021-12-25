import { Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './config/Auth';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import BoardPage from './pages/BoardPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import RequireAuth from './routes/RequireAuth';
import NotFound from './pages/NotFound';
import Loader from './components/Loader';

function App() {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />

        <Route
          path={`/${user?.username}`}
          element={
            <RequireAuth redirectTo='/notfound'>
              <Home />
            </RequireAuth>
          }
        />

        <Route
          path='/b/:id/:boardTitle'
          element={
            <RequireAuth redirectTo='/notfound'>
              <BoardPage />
            </RequireAuth>
          }
        />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

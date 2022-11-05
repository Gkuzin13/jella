import { lazy, Suspense, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import { AuthContext } from "./config/Auth";
import LandingPage from "./pages/LandingPage";
import RequireAuth from "./routes/RequireAuth";

const Home = lazy(() => import("./pages/Home"));
const BoardPage = lazy(() => import("./pages/BoardPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route
            path={`/${user?.username}`}
            element={
              <RequireAuth redirectTo="/notfound">
                <Home />
              </RequireAuth>
            }
          />

          <Route
            path="/b/:id/:boardTitle"
            element={
              <RequireAuth redirectTo="/notfound">
                <BoardPage />
              </RequireAuth>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;

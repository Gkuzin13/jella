import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import MiniLoader from "../components/MiniLoader";
import { AuthContext } from "../config/Auth";
import api from "../config/axiosConfig";
import { createUserHomeUrl } from "../utils/string";

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const { email, username, password } = e.target.elements;

    setLoading(true);
    setError(null);

    try {
      const { data } = await api.post("auth/signup", {
        email: email.value,
        username: username.value,
        password: password.value,
      });

      if (data.error) {
        setLoading(false);
        setError(data.error);
        return;
      }

      if (data.id) {
        setLoading(false);
        setUser(data);
        navigate(createUserHomeUrl(data.username));
      }
    } catch (error) {
      setError(error);
    }
  };

  if (user) {
    return <Navigate to={createUserHomeUrl(user.username)} />;
  }

  return (
    <div>
      <div className="bg-main w-full h-full -z-10 fixed"></div>
      <div className="flex justify-center flex-col items-center pt-2">
        <Link
          to="/"
          className="font-bold text-5xl text-gray-700  my-6 md:my-12"
        >
          Jella
        </Link>
        <div className="md:bg-white p-12 md:shadow-lg rounded-md">
          <form
            onSubmit={(e) => handleSignup(e)}
            className="flex flex-col justify-center"
          >
            <h2 className="text-lg text-center font-medium text-gray-600 mb-10 w-96">
              Sign up for your account
            </h2>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              required
              className="border rounded-md shadow-sm p-2 bg-white mb-4"
            />
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              maxLength="64"
              required
              className="border rounded-md shadow-sm p-2 bg-white mb-4"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              minLength="8"
              required
              className="border rounded-md shadow-sm p-2 bg-white mb-4"
            />

            <div className="mb-4 text-red-600 rounded-md w-0 min-w-full">
              <span>{error ? error : null}</span>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white font-medium text-md py-2 shadow mb-5
              hover:bg-blue-700 rounded-md transition-colors duration-150"
            >
              {loading ? <MiniLoader color={true} /> : "Sign Up"}
            </button>
          </form>
          <div className="text-center mt-4">
            <span className=" text-gray-600">Already have an account? </span>
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-700 p-1 transition-colors duration-150"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

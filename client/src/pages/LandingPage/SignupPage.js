import { useContext } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../config/Auth';
import api from '../../config/axiosConfig';

const SignupPage = () => {
  const { setIsLoading, setUser } = useContext(AuthContext);
  const history = useHistory();

  const handleSignup = async (e) => {
    e.preventDefault();

    const { email, username, password } = e.target.elements;

    try {
      // Sign up user
      const { data } = await api.post('/signup', {
        email: email.value,
        username: username.value,
        password: password.value,
      });

      if (data) {
        setUser(() => data);
        setIsLoading(() => false);
        history.push(`/${data.username}/boards`);
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className='bg-main w-full h-full -z-10 fixed'></div>
      <div className='flex justify-center flex-col items-center'>
        <div className='text-4xl font-bold my-10'>LOGO</div>
        <div className='bg-white p-12 shadow-lg rounded-sm '>
          <form
            onSubmit={(e) => handleSignup(e)}
            className='flex flex-col justify-center'>
            <h2 className='text-lg text-center font-medium text-gray-600 mb-10 w-96'>
              Sign up for your account
            </h2>
            <input
              type='email'
              name='email'
              placeholder='Enter email'
              required
              className=' border-2 shadow-sm p-2 bg-gray-50 mb-4 '
            />
            <input
              type='text'
              name='username'
              placeholder='Enter Username'
              required
              className=' border-2 shadow-sm p-2 bg-gray-50 mb-4'
            />
            <input
              type='password'
              name='password'
              placeholder='Enter password'
              required
              className=' border-2 shadow-sm p-2 bg-gray-50 mb-4'
            />
            <button
              type='submit'
              className='bg-green-100 text-green-600 font-medium text-lg p-1 shadow mb-5 
              hover:bg-green-200 transition-colors duration-150'>
              Sign Up
            </button>
          </form>
          <div className='text-center mt-4'>
            <span className=' text-gray-600'>Already have an account?</span>
            <Link
              to='/login'
              className='font-medium text-blue-500 hover:text-blue-600 p-1 transition-colors duration-150'>
              {' '}
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

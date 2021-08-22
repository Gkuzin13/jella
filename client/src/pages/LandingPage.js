import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Types } from 'mongoose';
import MiniLoader from '../components/MiniLoader';
import { AuthContext } from '../config/Auth';
import api from '../config/axiosConfig';
import { ReactComponent as BoardImg } from '../assets/boardplanner.svg';

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(AuthContext);

  const handleGuestLogin = async () => {
    setIsLoading(true);

    try {
      const { data } = await api.post('/login/guest', {
        email: `${Types.ObjectId().toHexString()}@mail.com`,
        password: '123456781',
      });
      console.log(data);

      if (data.error) {
        setIsLoading(false);
        return;
      }
      setIsLoading(false);

      if (data.username) {
        setUser(() => data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className='bg-main w-full h-full -z-10 fixed top-0'></div>
      <div className='flex justify-between items-center lg:pb-16 pt-8 px-8 lg:px-24'>
        <a href='/' className='font-bold text-4xl text-blue-900'>
          Jella
        </a>
        <div>
          <Link
            to='/login'
            className='bg-transparent border border-blue-600 text-blue-600 py-2 px-4 shadow font-medium 
              rounded-sm hover:bg-white hover:text-blue-700 transition-colors duration-150 mr-6 '>
            Log In
          </Link>
          <Link
            to='/signup'
            className='bg-blue-600 border border-blue-600 text-white py-2 px-4 shadow font-medium 
              rounded-sm hover:bg-blue-700 transition-colors duration-150 '>
            Sign Up
          </Link>
        </div>
      </div>

      <div className='flex flex-col items-center justify-center lg:my-10 mx-auto w-11/12 lg:w-4/5 lg:flex-row'>
        <div className=' lg:w-11/12 h- pt-12'>
          <h1 className='text-4xl lg:text-5xl lg:mb-8 text-gray-800 font-bold h-full leading-tight text-center lg:text-left'>
            Easily build your <strong className='text-gray-900'>Kanban</strong>{' '}
            board within minutes.
          </h1>
          <p className='text-2xl mt-2 text-center text-gray-900 lg:text-left'>
            Track your projects, and reach new productivity peaks. From high
            rises to the home office, the way you work is unique—accomplish it
            all with Jella.
          </p>
          <div className='mt-12 text-xl flex items-center text-center mb-10'>
            <button
              onClick={() => handleGuestLogin()}
              aria-label='Continue as a guest user button'
              className='bg-blue-600 text-white py-2.5 px-8 shadow font-medium 
              rounded-sm hover:bg-blue-700 transition-colors duration-150 w-full lg:w-1/2 whitespace-nowrap'>
              {isLoading ? <MiniLoader color={true} /> : 'Continue as Guest'}
            </button>
          </div>
        </div>

        <div className='w-full h-full min-w-max pb-12 lg:pl-32'>
          <BoardImg alt='People plan on board' width='100%' height='100%' />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

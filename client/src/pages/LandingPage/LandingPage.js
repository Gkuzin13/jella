import { Link } from 'react-router-dom';
import { ReactComponent as BoardImg } from '../../images/boardplanner.svg';

const LandingPage = () => {
  return (
    <div>
      <div className='bg-main w-full h-full -z-10 fixed'></div>
      <div>
        <span>LOGO</span>
      </div>

      <div className='flex flex-col items-center justify-center my-10 mx-auto w-4/5 lg:flex-row'>
        <div className=' w-2/3 mr-10'>
          <h1 className='text-5xl font-bold h-full leading-tight'>
            Company helps teams move work forward.
          </h1>
          <h3 className='text-2xl mt-2'>
            Collaborate, manage projects, and reach new productivity peaks. From
            high rises to the home office, the way your team works is
            unique—accomplish it all with Company
          </h3>
          <div className='mt-8 text-xl '>
            <Link
              to='/signup'
              className='bg-green-100 text-green-700 py-2.5 px-8 shadow font-medium 
              rounded-sm hover:shadow-md transition-shadow duration-150'>
              Sign up
            </Link>
            <button
              type='button'
              className='ml-6 bg-blue-100 text-blue-700 py-2 px-8 shadow font-medium 
              rounded-sm hover:shadow-md transition-shadow duration-150'>
              Continue as Guest
            </button>
          </div>
        </div>

        <BoardImg alt='People plan on board' />
      </div>
    </div>
  );
};

export default LandingPage;

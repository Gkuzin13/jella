import Loader from '../components/Loader';

const ConfirmBox = ({ handleFunc, id, setConfirmBox, isLoading }) => {
  return (
    <div
      className='flex items-center justify-center bg-black bg-opacity-30 
    w-full h-screen z-10 fixed top-0 left-0'>
      <div
        className='flex items-center flex-col
       bg-white p-4 shadow-xl w-96'>
        <div className='flex items-center flex-row pb-4 relative px-2'>
          <span className='text-lg text-gray-500'>Delete this board?</span>
          <button
            onClick={() => setConfirmBox({ id: '', isOpen: false })}
            className='flex text-gray-500 hover:text-gray-700 absolute -right-24 transition-colors duration-150'>
            <span className='material-icons'>close</span>
          </button>
        </div>
        <div className='w-full border mb-3'></div>
        <p className=' text-gray-700'>
          All lists and cards will be permanently deleted. This action cannot be
          undone.
        </p>

        <button
          onClick={() => handleFunc(id)}
          type='button'
          className='bg-gray-100 hover:bg-red-100 text-red-600 px-4 py-2 mt-5 font-medium 
          w-full shadow-sm transition-colors duration-150'>
          {!isLoading ? "Yes, i'm sure" : <Loader />}
        </button>
      </div>
    </div>
  );
};

export default ConfirmBox;

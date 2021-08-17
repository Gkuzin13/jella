import { Link } from 'react-router-dom';

const HomeBoards = ({ boards, setConfirmBox }) => {
  if (!boards.length) {
    return (
      <div className='flex flex-col items-start'>
        <div className='flex items-center mb-3 text-gray-600'>
          <span className='material-icons-outlined text-3xl mr-2'>
            space_dashboard
          </span>
          <h2 className='text-2xl font-medium'>Your Boards</h2>
        </div>
        <p className='font-medium text-md text-gray-500'>
          Create a board to begin.
        </p>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-start px-4'>
      <div className='flex items-center mb-3 text-gray-800'>
        <span className='material-icons-outlined text-3xl mr-2'>
          space_dashboard
        </span>
        <h2 className='text-2xl font-medium'>Your Boards</h2>
      </div>
      {boards.map((board) => {
        return (
          <div
            key={board._id}
            className='flex cursor-pointer mb-5 hover:text-blue-500 border-2 h-24 w-32'>
            <Link
              to={`/b/${board._id}/${board.boardTitle}`}
              className='bg-gray-50 text-blue-600 hover:text-blue-700 hover:shadow-md py-3 px-4 font-medium 
              rounded-sm shadow flex flex-col justify-between'
              aria-label='Go to selected board'>
              <span className='text-2xl break-words'>{board.boardTitle}</span>
              <span className='font-medium text-sm mt-1.5 text-gray-600'>
                Data Created:
                <strong> {new Date(board.createdAt).toDateString()}</strong>
              </span>
            </Link>

            <button
              onClick={() => setConfirmBox({ id: board._id, isOpen: true })}
              type='button'
              className='text-white bg-red-500 p-0.5 flex items-center 
              rounded-sm transition-colors duration-150 shadow'>
              <span className='material-icons-outlined'>delete_outline</span>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default HomeBoards;

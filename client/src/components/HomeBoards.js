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
    <div className='flex flex-col items-start'>
      <div className='flex items-center mb-3 text-gray-600'>
        <span className='material-icons-outlined text-3xl mr-2'>
          space_dashboard
        </span>
        <h2 className='text-2xl font-medium'>Your Boards</h2>
      </div>
      {boards.map((board) => {
        return (
          <div
            key={board._id}
            className='flex items-center group cursor-pointer mb-5 hover:text-blue-500 '>
            <Link
              to={`/b/${board._id}/${board.boardTitle}`}
              className='bg-gray-50 hover:text-blue-600 py-3 px-6 font-medium rounded-sm shadow 
                flex flex-col'
              aria-label='Go to selected board'>
              <span className='text-2xl'>{board.boardTitle}</span>
              <span className='font-medium text-sm mt-1.5 text-gray-500'>
                Created At:
                <strong> {new Date(board.createdAt).toDateString()}</strong>
              </span>
            </Link>

            <button
              onClick={() => setConfirmBox({ id: board._id, isOpen: true })}
              type='button'
              className='text-gray-300 bg-gray-50 p-0.5 ml-2 opacity-0 flex items-center 
                rounded-sm group-hover:opacity-100 hover:text-red-500 hover:bg-red-50 
                transition-opacity duration-150'>
              <span className='material-icons-outlined text-3xl'>
                delete_outline
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default HomeBoards;

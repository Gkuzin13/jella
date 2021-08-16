import { useState } from 'react';
import MiniLoader from './MiniLoader';

const BoardForm = ({ handleNewBoard }) => {
  const [boardTitle, setBoardTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    await handleNewBoard(boardTitle);
  };

  const handleOnChange = (e) => {
    setBoardTitle(e.target.value);
  };
  return (
    <div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className='flex items-center mb-16 w-full'>
        <input
          onChange={(e) => handleOnChange(e)}
          value={boardTitle}
          name='boardTitle'
          required
          placeholder='Enter a title for this board...'
          className='py-1 px-2 mr-4 rounded-sm border-2 shadow-sm text-lg font-medium focus:outline-blue'
          autoComplete='off'
        />
        <button
          type='submit'
          className='bg-green-600 px-4 w-44 h-10 hover:shadow-lg whitespace-nowrap 
          transition-all duration-150'>
          {isLoading ? (
            <MiniLoader color={false} />
          ) : (
            <div className='flex items-center justify-evenly text-white'>
              <span className='material-icons-outlined'>add</span>
              <span className='text-lg px-1.5 font-medium'>Create board</span>
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default BoardForm;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import UserControl from './UserControl';
import boardApi from '../api/boardApi';

const BoardNav = ({ boardData, user, setBoardData }) => {
  const [textValue, setTextValue] = useState(boardData.title);

  const handleOnChange = (e) => {
    setTextValue(e.target.value);
  };

  const handleBoardUpdate = async () => {
    if (textValue === boardData.title) {
      return;
    }
    const updatedBoard = { ...boardData, title: textValue };
    setBoardData(() => updatedBoard);

    try {
      await boardApi.update(updatedBoard.id, updatedBoard.title);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex justify-between items-center py-2 px-6'>
      <div className='flex items-center text-2xl font-medium my-4'>
        <Link
          aria-label='Back to home'
          className='flex items-center  px-1 mr-1 text-blue-600 hover:text-blue-700 rounded-sm transition-colors duration-150'
          to={`/${user.username}/boards`}>
          <span className='material-icons-outlined mr-1.5 text-3xl'>home</span>
          <span>Boards</span>
        </Link>
        <span className='text-2xl font-medium'> / </span>
        <h2 className='font-medium bg-transparent px-2 text-xl hidden'>
          {textValue}
        </h2>
        <input
          onBlur={() => handleBoardUpdate()}
          onChange={(e) => handleOnChange(e)}
          className='font-medium bg-transparent w-full px-1 mx-1 focus:outline-blue text-2xl'
          value={textValue}
          name='cardTitle'
          maxLength='32'
          autoComplete='off'
        />
      </div>

      <UserControl />
    </div>
  );
};

export default BoardNav;

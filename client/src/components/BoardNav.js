import { Link } from 'react-router-dom';
import UserControl from './UserControl';
import boardApi from '../api/boardApi';
import EditableText from './EditableText';

const BoardNav = ({ boardData, user, setBoardData }) => {
  const handleBoardUpdate = async (updatedTitle) => {
    const updatedBoard = { ...boardData, title: updatedTitle };
    setBoardData(() => updatedBoard);

    try {
      await boardApi.update(updatedBoard.id, updatedBoard.title);
    } catch (error) {
      console.log(error);
    }
  };

  const titleStyle = {
    style:
      'font-medium bg-transparent w-full px-1 mx-1 focus:outline-blue text-2xl cursor-pointer',
  };

  return (
    <div className='flex justify-between items-center py-2 px-6'>
      <div className='flex items-center text-2xl font-medium my-4'>
        <Link
          to={`/${user.username}/boards`}
          aria-label='Back to home'
          className='flex items-center  px-1 mr-1 text-blue-600 hover:text-blue-700 
          rounded-sm transition-colors duration-150'>
          <span className='material-icons-outlined mr-1.5 text-3xl'>home</span>
          <span>Boards</span>
        </Link>
        <span className='text-2xl font-medium'> / </span>
        <EditableText
          style={titleStyle.style}
          dataText={boardData.title}
          dataUpdateFunc={handleBoardUpdate}
        />
      </div>

      <UserControl />
    </div>
  );
};

export default BoardNav;

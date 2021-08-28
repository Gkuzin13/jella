import { Link } from 'react-router-dom';
import UserControl from '../UserControl';
import boardApi from '../../api/boardApi';
import EditableText from '../EditableText';

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
      'font-bold text-gray-800 bg-transparent w-full px-0.5 mx-1.5 focus:outline-blue text-xl cursor-pointer',
  };

  return (
    <div className='bg-white bg-opacity-95 flex justify-between items-center py-3 px-6 mb-4 shadow'>
      <div className='flex items-center text-xl font-bold'>
        <Link
          to={`/${user.username}/boards`}
          aria-label='Back to home'
          className='flex items-center opacity-90 px-1 py-0.5 mr-0.5 text-gray-500 hover:text-gray-600 transition-colors 
          duration-100'>
          <span className='material-icons-outlined mr-1'>home</span>
          Boards
        </Link>

        <span className='text-gray-500'> / </span>

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

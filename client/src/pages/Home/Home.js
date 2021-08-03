import { useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../config/Auth';
import api from '../../config/axiosConfig';
import UserControl from '../../components/UserControl';

const Home = () => {
  const [userBoards, setUserBoards] = useState();

  const history = useHistory();

  const { user } = useContext(AuthContext);
  console.log(userBoards, user);

  useEffect(() => {
    const getUserBoards = async () => {
      try {
        const { data } = await api.get('/user/boards');

        if (data) {
          setUserBoards(() => [...data]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUserBoards();

    return () => setUserBoards([]);
  }, [user]);

  const handleNewBoard = async (e) => {
    e.preventDefault();
    const { boardTitle } = e.target.elements;
    try {
      const { data } = await api.post('/b/', {
        boardTitle: boardTitle.value,
        creatorId: user.id,
      });

      if (data) {
        history.push(`/b/${data._id}/${data.boardTitle}`);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (userBoards === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className='m-4'>
      <div className='flex justify-between mb-10'>
        <h1 className='my-4 text-2xl text-blue-500 font-medium'>
          Welcome, {user.username}
        </h1>
        <UserControl user={user} />
      </div>

      <form
        onSubmit={(e) => handleNewBoard(e)}
        className='flex items-center mb-16'>
        <input
          name='boardTitle'
          required
          placeholder='Enter a title for this board...'
          className='py-1 px-2 rounded-sm border-2  shadow-sm'
          autoComplete='off'
        />
        <button
          type='submit'
          className='bg-gray-50 text-green-500 py-1 px-2 shadow-sm hover:bg-green-50
          rounded-sm ml-5 text-lg flex items-center transition-colors duration-150 '>
          <span className='material-icons-outlined mr-1'>add</span>
          <span className='font-medium pr-1.5'>Create board</span>
        </button>
      </form>

      <div className='flex flex-col items-start'>
        <div className='flex items-center mb-3 text-gray-600'>
          <span className='material-icons-outlined text-3xl mr-2'>
            space_dashboard
          </span>
          <h2 className='text-3xl font-medium'>Your Boards</h2>
        </div>
        {userBoards.map((board) => {
          return (
            <div
              key={board._id}
              className='flex items-center group cursor-pointer mb-3.5 hover:text-blue-500 '>
              <Link
                to={`/b/${board._id}/${board.boardTitle}`}
                className='bg-gray-100 hover:text-blue-600 hover:bg-blue-50 py-2 px-3.5 font-medium rounded-sm 
                flex flex-col'
                aria-label='Go to selected board'>
                <span className=' text-2xl '>{board.boardTitle}</span>
                <span className=' text-sm font-normal mt-1.5 text-gray-500'>
                  Last Edited:
                  <strong> {new Date(board.updatedAt).toDateString()}</strong>
                </span>
              </Link>
              <button
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
    </div>
  );
};

export default Home;

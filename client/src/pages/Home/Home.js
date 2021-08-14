import { useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../config/Auth';
import api from '../../config/axiosConfig';
import UserControl from '../../components/UserControl';
import ConfirmBox from '../../components/ConfirmBox';
import boardApi from '../../api/boardApi';
import Loader from '../../components/Loader';

const Home = () => {
  const [userBoards, setUserBoards] = useState([]);
  const [confirmBox, setConfirmBox] = useState({ id: null, isOpen: false });
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const { data } = await api.get(`/${user.id}/boards`);

        if (data.error) {
          return console.log(data.error);
        }

        setUserBoards(() => [...data]);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();

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

  const handleDelBoard = async (id) => {
    const filteredBoards = [...userBoards].filter((board) => board._id !== id);
    setUserBoards(filteredBoards);

    await boardApi.deleteBoard(id);

    setConfirmBox({ id: '', isOpen: false });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='m-4'>
      {confirmBox.isOpen ? (
        <ConfirmBox
          handleFunc={handleDelBoard}
          id={confirmBox.id}
          setConfirmBox={setConfirmBox}
          isLoading={isLoading}
        />
      ) : null}
      <div className='flex items-center justify-between mb-10'>
        <h1 className='my-4 text-2xl text-blue-600 font-medium'>
          Welcome, {user.username}
        </h1>
        <UserControl user={user} />
      </div>

      <form
        onSubmit={(e) => handleNewBoard(e)}
        className='flex items-center mb-16 w-full'>
        <input
          name='boardTitle'
          required
          placeholder='Enter a title for this board...'
          className='py-1 px-2 mr-4 rounded-sm border-2 shadow-sm text-lg font-medium focus:outline-blue'
          autoComplete='off'
        />
        <button
          type='submit'
          className='bg-green-600 text-white py-1.5 px-2.5 shadow-sm hover:shadow-lg
          rounded-sm text-lg flex items-center transition-shadow duration-150 my-2'>
          <span className='material-icons-outlined mr-1'>add</span>
          <span className='font-medium pr-1.5 whitespace-nowrap'>
            Create board
          </span>
        </button>
      </form>

      <div className='flex flex-col items-start'>
        <div className='flex items-center mb-3 text-gray-600'>
          <span className='material-icons-outlined text-3xl mr-2'>
            space_dashboard
          </span>
          <h2 className='text-2xl font-medium'>Your Boards</h2>
        </div>
        {!userBoards.length ? (
          <p className='font-medium text-md text-gray-500'>
            Create a board to begin.
          </p>
        ) : (
          userBoards.map((board) => {
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
          })
        )}
      </div>
    </div>
  );
};

export default Home;

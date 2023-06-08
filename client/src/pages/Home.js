import { Suspense, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import boardApi from '../api/boardApi';
import BoardCreateForm from '../components/Board/BoardCreateForm';
import HomeBoards from '../components/Board/HomeBoards';
import BoardDeleteForm from '../components/Board/BoardDeleteForm';
import Loader from '../components/Loader';
import MiniLoader from '../components/MiniLoader';
import UserControl from '../components/UserControl';
import { AuthContext } from '../config/Auth';
import CreateBoardCTA from '../components/Board/CreateBoardCTA';

const BOARD_DIALOGS = {
  createBoard: 'create-board',
  deleteBoard: 'delete-board',
};

const Home = () => {
  const [userBoards, setUserBoards] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [activeDialog, setActiveDialog] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(() => true);
    (async () => {
      try {
        const { data } = await boardApi.getAll(user.id);

        if (data.error) {
          return console.log(data.error);
        }

        setUserBoards(() => [...data]);
        setIsLoading(() => false);
      } catch (error) {
        navigate('notfound');
      }
    })();

    return () => {
      setUserBoards([]);
      setIsLoading(() => false);
      setSelectedBoardId(null);
    };
  }, [user, navigate]);

  const handleCreateBoard = async (boardTitle) => {
    const newBoard = {
      boardTitle,
      creatorId: user.id,
    };

    try {
      setIsLoading(true);

      const { data } = await boardApi.create(newBoard);

      if (data) {
        navigate(`/b/${data._id}/${data.boardTitle}`);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setActiveDialog(null);
    }
  };

  const handleDeleteBoard = async () => {
    if (!selectedBoardId) {
      return;
    }

    try {
      setIsLoading(true);

      await boardApi.delete(selectedBoardId);

      const filteredBoards = userBoards.filter(
        (board) => board._id !== selectedBoardId
      );
      setUserBoards(filteredBoards);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setActiveDialog(null);
    }
  };

  const handleBoardDeleteClick = (id) => {
    setSelectedBoardId(id);
    setActiveDialog(BOARD_DIALOGS.deleteBoard);
  };

  return (
    <Suspense fallback={<Loader />}>
      <div className='fixed w-full h-full overflow-hidden'>
        <div className='bg-homePage absolute h-full w-full -z-10'></div>
        <BoardCreateForm
          open={activeDialog === BOARD_DIALOGS.createBoard}
          isLoading={isLoading}
          onClose={() => setActiveDialog(null)}
          onAction={handleCreateBoard}
        />
        <BoardDeleteForm
          open={activeDialog === BOARD_DIALOGS.deleteBoard}
          onClose={() => setActiveDialog(null)}
          isLoading={isLoading}
          onAction={handleDeleteBoard}
        />
        <div className='flex items-center bg-white justify-between mb-8 px-6 py-3 md:px-16 shadow-sm'>
          <h1 className='font-bold text-3xl text-blue-900'>Jella</h1>
          <UserControl />
        </div>
        <div className='flex justify-center items-center'>
          <div className='flex flex-col md:flex-row-reverse justify-between gap-x-24 w-full max-w-7xl mx-auto mt-2'>
            <CreateBoardCTA
              onClick={() => setActiveDialog(BOARD_DIALOGS.createBoard)}
            />
            {isLoading && !activeDialog ? (
              <div className='w-full'>
                <MiniLoader />
              </div>
            ) : (
              <HomeBoards
                boards={userBoards}
                onBoardDeleteClick={handleBoardDeleteClick}
              />
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Home;

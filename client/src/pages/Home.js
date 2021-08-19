import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import boardApi from '../api/boardApi';
import UserControl from '../components/UserControl';
import ConfirmBox from '../components/ConfirmBox';
import Loader from '../components/Loader';
import BoardForm from '../components/Board/BoardForm';
import HomeBoards from '../components/HomeBoards';
import { AnimatePresence } from 'framer-motion';

const Home = ({ user }) => {
  const [userBoards, setUserBoards] = useState([]);
  const [confirmBox, setConfirmBox] = useState({ id: null, isOpen: false });
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const { data } = await boardApi.getAll(user.id);

        if (data.error) {
          return console.log(data.error);
        }

        setUserBoards(() => [...data]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      setUserBoards([]);
      setIsLoading(false);
      setConfirmBox({ id: null, isOpen: false });
    };
  }, [user]);

  const handleNewBoard = async (boardTitle) => {
    const newBoard = {
      boardTitle,
      creatorId: user.id,
    };

    try {
      const { data } = await boardApi.create(newBoard);

      if (data) {
        history.push(`/b/${data._id}/${data.boardTitle}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelBoard = async (id) => {
    try {
      await boardApi.delete(id);

      const filteredBoards = [...userBoards].filter(
        (board) => board._id !== id
      );
      setUserBoards(filteredBoards);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className='bg-main absolute w-full h-screen -z-10'></div>

      <AnimatePresence>
        {confirmBox.isOpen && (
          <ConfirmBox
            handleFunc={handleDelBoard}
            id={confirmBox.id}
            setConfirmBox={setConfirmBox}
            confirmBox={confirmBox}
          />
        )}
      </AnimatePresence>
      <div className='flex items-center justify-between mb-10 px-4 py-1 lg:px-12'>
        <h1 className='my-4 text-2xl text-blue-600 font-medium'>
          Welcome, {user.username}
        </h1>
        <UserControl user={user} />
      </div>

      <BoardForm userId={user.id} handleNewBoard={handleNewBoard} />

      <HomeBoards boards={userBoards} setConfirmBox={setConfirmBox} />
    </div>
  );
};

export default Home;

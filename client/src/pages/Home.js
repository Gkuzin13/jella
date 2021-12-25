import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import boardApi from '../api/boardApi';
import UserControl from '../components/UserControl';
import ConfirmBox from '../components/ConfirmBox';
import Loader from '../components/Loader';
import BoardForm from '../components/Board/BoardForm';
import HomeBoards from '../components/Board/HomeBoards';
import { AnimatePresence } from 'framer-motion';
import { AuthContext } from '../config/Auth';

const Home = () => {
  const [userBoards, setUserBoards] = useState([]);
  const [confirmBox, setConfirmBox] = useState({ id: null, isOpen: false });
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await boardApi.getAll(user.id);

        if (data.error) {
          return console.log(data.error);
        }

        setUserBoards(() => [...data]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        navigate('notfound');
      }
    })();

    return () => {
      setUserBoards([]);
      setIsLoading(false);
      setConfirmBox({ id: null, isOpen: false });
    };
  }, [user, navigate]);

  const handleNewBoard = async (boardTitle) => {
    const newBoard = {
      boardTitle,
      creatorId: user.id,
    };

    try {
      const { data } = await boardApi.create(newBoard);

      if (data) {
        navigate(`/b/${data._id}/${data.boardTitle}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelBoard = async (id) => {
    try {
      await boardApi.delete(id);

      const filteredBoards = userBoards.filter((board) => board._id !== id);
      setUserBoards(filteredBoards);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='fixed w-full h-full overflow-hidden'>
      <div className='bg-homePage absolute h-full w-full -z-10'></div>
      <AnimatePresence>
        {confirmBox.isOpen && (
          <ConfirmBox
            handleFunc={handleDelBoard}
            setConfirmBox={setConfirmBox}
            confirmBox={confirmBox}
          />
        )}
      </AnimatePresence>

      <div className='flex items-center bg-white justify-between mb-8 px-6 py-3 md:px-16 shadow-sm'>
        <h1 className='font-bold text-3xl text-blue-900'>Jella</h1>
        <UserControl />
      </div>

      <div className='flex justify-center items-center'>
        <div className='flex flex-col md:flex-row-reverse justify-around gap-x-24 w-full mt-2'>
          <BoardForm userId={user.id} handleNewBoard={handleNewBoard} />
          <HomeBoards boards={userBoards} setConfirmBox={setConfirmBox} />
        </div>
      </div>
    </div>
  );
};

export default Home;

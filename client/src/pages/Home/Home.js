import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../config/Auth';
import api from '../../config/axiosConfig';

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

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { status } = await api.get('/logout');

      if (status === 200) {
        history.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    <div>
      <form onSubmit={(e) => handleLogout(e)}>
        <button type='submit'>Log Out</button>
      </form>
      <form onSubmit={(e) => handleNewBoard(e)}>
        <input placeholder='Title' name='boardTitle' />
        <button type='submit'>New Board</button>
      </form>

      {userBoards.map((board) => {
        return (
          <div key={board._id}>
            <a href={`/b/${board._id}/${board.boardTitle}`}>
              {board.boardTitle}
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default Home;

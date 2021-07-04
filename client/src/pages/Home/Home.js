import { useEffect, useState } from 'react';
import { useHistory, Switch, Route } from 'react-router-dom';
import api from '../../config/axiosConfig';

const Home = ({ user }) => {
  const [userBoards, setUserBoards] = useState();
  const history = useHistory();
  console.log(userBoards);

  useEffect(() => {
    const getUserBoards = async () => {
      try {
        const { data } = await api.get(`/${user.username}/boards`);

        setUserBoards(() => [...data]);
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
      const res = await api.get('/logout');

      if (res.status === 200) {
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
      const { data } = await api.post('/b', {
        boardTitle: boardTitle.value,
        creatorId: user.id,
      });

      history.push(`/b/${data._id}`);
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
            <a href={`/b/${board._id}`}>{board.boardTitle}</a>
          </div>
        );
      })}
    </div>
  );
};

export default Home;

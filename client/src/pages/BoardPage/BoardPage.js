import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../config/Auth';
import api from '../../config/axiosConfig';

const BoardPage = () => {
  const [boardData, setBoardData] = useState();

  const { user } = useContext(AuthContext);

  const { id } = useParams();

  useEffect(() => {
    const getBoard = async () => {
      try {
        const { data } = await api.get(`/b/${id}`);

        setBoardData(() => data);
      } catch (error) {
        console.log(error);
      }
    };

    getBoard();

    return () => setBoardData();
  }, [id]);

  return (
    <div>
      <a href={`/${user.username}/boards`}>Home</a>
      {boardData
        ? [boardData.board].map((b) => {
            return <span key={b?._id}>{b?.boardTitle}</span>;
          })
        : null}
    </div>
  );
};

export default BoardPage;

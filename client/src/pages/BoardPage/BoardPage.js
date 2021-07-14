import { useEffect, useContext, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../config/Auth';
import api from '../../config/axiosConfig';
import List from '../../components/List';
import ListForm from '../../components/ListForm';
import { reducer, ACTIONS } from '../../reducers/reducers';
import Loader from '../../components/Loader';

const BoardPage = () => {
  const [boardData, dispatch] = useReducer(reducer, []);
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    const getBoard = async () => {
      try {
        const { data } = await api.get(`/b/${id}`);

        if (data) {
          dispatch({
            type: ACTIONS.SET_BOARD,
            data: { board: data.board, lists: data.lists },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    getBoard();
  }, [id]);

  const handleListDelete = async (id) => {
    try {
      const res = await api.delete(`/1/lists/${id}`);

      if (res.status === 200) {
        dispatch({
          type: ACTIONS.DELETE_LIST,
          data: id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(boardData);

  if (boardData.length === 0) {
    return <Loader />;
  }

  return (
    <div className='flex justify-start items-start'>
      <a href={`/${user.username}/boards`}>Home</a>
      {boardData.lists.map((list) => {
        return (
          <List
            key={list._id}
            listData={list}
            handleListDelete={handleListDelete}
            dispatch={dispatch}
          />
        );
      })}
      <ListForm boardId={id} dispatch={dispatch} />
    </div>
  );
};

export default BoardPage;

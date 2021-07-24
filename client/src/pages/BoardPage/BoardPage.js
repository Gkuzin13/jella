import { useEffect, useContext, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../config/Auth';
import api from '../../config/axiosConfig';
import List from '../../components/List';
import ListForm from '../../components/ListForm';
import { reducer, ACTIONS } from '../../reducers/reducers';
import Loader from '../../components/Loader';
import CardDetailsBox from '../../components/CardDetailsBox';

const BoardPage = () => {
  const [boardData, dispatch] = useReducer(reducer, []);
  const [selectedCard, setSelectedCard] = useState({}, { isOpen: false });

  const { user } = useContext(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    const getBoard = async () => {
      try {
        const { data } = await api.get(`/b/${id}`);

        dispatch({
          type: ACTIONS.SET_BOARD,
          data: data,
        });
      } catch (error) {
        console.log(error);
      }
    };

    getBoard();
  }, [id]);

  const toggleCardBox = (card, isOpen) => {
    setSelectedCard({ ...card, isOpen });
  };

  if (!boardData.lists) {
    return <Loader />;
  }

  return (
    <div className='flex justify-start items-start'>
      {!selectedCard.isOpen ? null : (
        <CardDetailsBox
          selectedCard={selectedCard}
          toggleCardBox={toggleCardBox}
          dispatch={dispatch}
          subtasks={boardData.subtasks}
        />
      )}

      <a href={`/${user.username}/boards`}>Home</a>

      {boardData.lists.map((list) => {
        return (
          <List
            key={list._id}
            listData={list}
            cards={boardData.cards}
            dispatch={dispatch}
            toggleCardBox={toggleCardBox}
          />
        );
      })}
      <ListForm boardId={id} dispatch={dispatch} />
    </div>
  );
};

export default BoardPage;

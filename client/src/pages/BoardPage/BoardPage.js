import { useEffect, useContext, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import { AuthContext } from '../../config/Auth';
import api from '../../config/axiosConfig';
import { reducer, ACTIONS } from '../../hooks/reducers/reducers';
import Loader from '../../components/Loader';
import CardDetailsBox from '../../components/CardDetailsBox/CardDetailsBox';
import BoardCanvas from '../../components/BoardCanvas';

const BoardPage = () => {
  const [boardData, dispatch] = useReducer(reducer, []);
  const [selectedCard, setSelectedCard] = useState({}, { isOpen: false });

  const { user } = useContext(AuthContext);
  const { id } = useParams();

  console.log(boardData);

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

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const { destination, type, draggableId } = result;

    if (type === 'LIST') {
      dispatch({
        type: ACTIONS,
      });
    }

    console.log(result);
  };

  if (!boardData.lists) {
    return <Loader />;
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className='flex flex-col justify-start items-start '>
        {!selectedCard.isOpen ? null : (
          <CardDetailsBox
            selectedCard={selectedCard}
            toggleCardBox={toggleCardBox}
            dispatch={dispatch}
            subtasks={boardData.subtasks}
          />
        )}

        <a href={`/${user.username}/boards`}>Home</a>

        <BoardCanvas
          boardData={boardData}
          dispatch={dispatch}
          toggleCardBox={toggleCardBox}
        />
      </div>
    </DragDropContext>
  );
};

export default BoardPage;

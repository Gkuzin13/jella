import { useEffect, useContext, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import { AuthContext } from '../../config/Auth';
import api from '../../config/axiosConfig';
import {
  listReducer,
  cardReducer,
  checklistReducer,
  ACTIONS,
} from '../../hooks/reducers/reducers';
import Loader from '../../components/Loader';
import CardDetailsBox from '../../components/CardDetailsBox/CardDetailsBox';
import BoardCanvas from '../../components/BoardCanvas';
import { updateList } from '../../api/listController';
import { updateCard } from '../../api/cardController';
import { setNewPos } from '../../utils/reorderer';

const BoardPage = () => {
  const [boardData, setBoardData] = useState(null);
  const [lists, dispatchLists] = useReducer(listReducer, []);
  const [cards, dispatchCards] = useReducer(cardReducer, []);
  const [subtasks, dispatchSubtasks] = useReducer(checklistReducer, []);
  const [selectedCard, setSelectedCard] = useState({}, { isOpen: false });

  const { user } = useContext(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    const getBoard = async () => {
      try {
        const { data } = await api.get(`/b/${id}`);

        setBoardData({ title: data.boardTitle, id: data._id });

        dispatchLists({
          type: ACTIONS.SET_LISTS,
          data: { lists: data.lists },
        });

        dispatchCards({
          type: ACTIONS.SET_CARDS,
          data: { cards: data.cards },
        });

        dispatchSubtasks({
          type: ACTIONS.SET_CHECKLIST,
          data: { subtasks: data.subtasks },
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

    const { destination, type, draggableId, source } = result;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'CARD') {
      dispatchCards({
        type: ACTIONS.REORDER_CARD,
        data: { destination, source, draggableId },
      });

      return;
    }

    if (type === 'LIST') {
      dispatchLists({
        type: ACTIONS.REORDER_LIST,
        data: { destination, source },
      });
      return;
    }
  };

  console.log(cards);

  if (!boardData) {
    return <Loader />;
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className='flex flex-col justify-start items-start '>
        {!selectedCard.isOpen ? null : (
          <CardDetailsBox
            subtasks={subtasks}
            selectedCard={selectedCard}
            toggleCardBox={toggleCardBox}
            dispatch={dispatchCards}
          />
        )}

        <a href={`/${user.username}/boards`}>Home</a>

        <h1>{boardData.title}</h1>

        <BoardCanvas
          boardId={boardData.id}
          lists={lists}
          cards={cards}
          subtasks={subtasks}
          dispatchLists={dispatchLists}
          dispatchCards={dispatchCards}
          toggleCardBox={toggleCardBox}
        />
      </div>
    </DragDropContext>
  );
};

export default BoardPage;

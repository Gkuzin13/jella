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
import cardReorderer from '../../utils/cardReorderer';
import { setNewPos } from '../../utils/setNewPos';

const BoardPage = () => {
  const [boardData, setBoardData] = useState(null);
  const [lists, dispatchLists] = useReducer(listReducer, []);
  const [cards, dispatchCards] = useReducer(cardReducer, []);
  const [selectedCard, setSelectedCard] = useState({}, { isOpen: false });

  const { user } = useContext(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    const getBoardData = async () => {
      try {
        const { data } = await api.get(`/b/${id}`);

        setBoardData({ title: data.boardTitle, id: data._id });

        dispatchLists({
          type: ACTIONS.SET_LISTS,
          data: data.lists,
        });
        dispatchCards({
          type: ACTIONS.SET_CARDS,
          data: data.cards,
        });
      } catch (error) {
        console.log(error);
      }
    };

    getBoardData();
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
      const { allCards, updatedCard } = cardReorderer(
        cards,
        destination,
        source,
        draggableId
      );
      dispatchCards({
        type: ACTIONS.REORDER_CARD,
        data: allCards,
      });

      updateCard(updatedCard);
      return;
    }

    if (type === 'LIST') {
      const listsCopy = [...lists];
      const draggedList = listsCopy[source.index];

      listsCopy.splice(source.index, 1);
      listsCopy.splice(destination.index, 0, draggedList);

      const updatedList = {
        ...draggedList,
        position: setNewPos(listsCopy, destination),
      };

      listsCopy.splice(destination.index, 1, updatedList);

      dispatchLists({
        type: ACTIONS.REORDER_LIST,
        data: listsCopy,
      });

      updateList(updatedList);
      return;
    }
  };

  if (!boardData) {
    return <Loader />;
  }

  console.log(cards);

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className='flex flex-col justify-start items-start '>
        {!selectedCard.isOpen ? null : (
          <CardDetailsBox
            selectedCard={selectedCard}
            toggleCardBox={toggleCardBox}
            dispatchCards={dispatchCards}
          />
        )}

        <a href={`/${user.username}/boards`}>Home</a>

        <h1>{boardData.title}</h1>

        <BoardCanvas
          boardId={boardData.id}
          lists={lists}
          cards={cards}
          dispatchLists={dispatchLists}
          dispatchCards={dispatchCards}
          toggleCardBox={toggleCardBox}
        />
      </div>
    </DragDropContext>
  );
};

export default BoardPage;

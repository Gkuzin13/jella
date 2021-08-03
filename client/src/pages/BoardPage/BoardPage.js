import { useEffect, useContext, useReducer, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import { AuthContext } from '../../config/Auth';
import api from '../../config/axiosConfig';
import {
  listReducer,
  cardReducer,
  ACTIONS,
} from '../../hooks/reducers/reducers';
import Loader from '../../components/Loader';
import CardDetailsBox from '../../components/CardDetailsBox/CardDetailsBox';
import BoardCanvas from '../../components/BoardCanvas';
import { updateList } from '../../api/listController';
import { updateCard } from '../../api/cardController';
import cardReorderer from '../../utils/cardReorderer';
import { setNewPos } from '../../utils/setNewPos';
import UserControl from '../../components/UserControl';

const BoardPage = () => {
  const [boardData, setBoardData] = useState(null);
  const [lists, dispatchLists] = useReducer(listReducer, []);
  const [cards, dispatchCards] = useReducer(cardReducer, []);
  const [selectedCard, setSelectedCard] = useState('', { isOpen: false });

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

    return () => {
      dispatchLists({
        type: ACTIONS.SET_LISTS,
        data: [],
      });
      dispatchCards({
        type: ACTIONS.SET_CARDS,
        data: [],
      });
    };
  }, [id]);

  const toggleCardBox = (cardId, isOpen) => {
    setSelectedCard({ cardId, isOpen });
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
    }
  };

  if (!boardData) {
    return <Loader />;
  }

  return (
    <div className='m-4'>
      <div className='flex flex-col justify-start items-start '>
        {!selectedCard.isOpen ? null : (
          <CardDetailsBox
            cards={cards}
            cardId={selectedCard.cardId}
            toggleCardBox={toggleCardBox}
            dispatchCards={dispatchCards}
          />
        )}
        <div className='flex justify-between w-full'>
          <div className='flex items-center text-2xl font-medium my-4 mx-3'>
            <Link
              aria-label='Back to home'
              className='flex items-center  px-1 mr-1 text-blue-500 rounded-sm hover:bg-blue-50 transition-colors duration-150'
              to={`/${user.username}/boards`}>
              <span className='material-icons-outlined mr-1.5 text-3xl'>
                view_week
              </span>
              <span>Boards</span>
            </Link>

            <div className='rounded-sm'>
              <span> / {boardData.title}</span>
            </div>
          </div>
          <UserControl />
        </div>

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <BoardCanvas
            boardId={boardData.id}
            lists={lists}
            cards={cards}
            dispatchLists={dispatchLists}
            dispatchCards={dispatchCards}
            toggleCardBox={toggleCardBox}
          />
        </DragDropContext>
      </div>
    </div>
  );
};

export default BoardPage;

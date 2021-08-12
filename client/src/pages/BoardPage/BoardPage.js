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
import listApi from '../../api/listApi';
import cardApi from '../../api/cardApi';
import cardReorderer from '../../utils/cardReorderer';
import UserControl from '../../components/UserControl';
import listReorderer from '../../utils/listReorderer';

const BoardPage = () => {
  const [boardData, setBoardData] = useState(null);
  const [lists, dispatchLists] = useReducer(listReducer, []);
  const [cards, dispatchCards] = useReducer(cardReducer, []);
  const [selectedCard, setSelectedCard] = useState('', { isOpen: false });

  const { user } = useContext(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/b/${id}`);

        setBoardData({ title: data.boardTitle, id: data._id });
        dispatchLists({
          type: ACTIONS.SET_LISTS,
          payload: data.lists,
        });
        dispatchCards({
          type: ACTIONS.SET_CARDS,
          payload: data.cards,
        });
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      setBoardData(null);
      dispatchLists({
        type: ACTIONS.SET_LISTS,
        payload: [],
      });
      dispatchCards({
        type: ACTIONS.SET_CARDS,
        payload: [],
      });
    };
  }, [id]);

  const toggleCardBox = (cardId, isOpen) => {
    setSelectedCard({ cardId, isOpen });
  };

  const handleOnDragEnd = async (result) => {
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
        payload: allCards,
      });

      return cardApi.updateCard(updatedCard);
    }

    const { updatedLists, updatedList } = listReorderer(
      lists,
      destination,
      source
    );

    dispatchLists({
      type: ACTIONS.REORDER_LIST,
      payload: updatedLists,
    });

    listApi.updateList(updatedList);
  };

  if (!boardData) {
    return <Loader />;
  }

  return (
    <div className=' h-screen flex flex-col'>
      <div className='bg-main absolute w-full h-screen -z-10'></div>
      {!selectedCard.isOpen ? null : (
        <CardDetailsBox
          cards={cards}
          lists={lists}
          cardId={selectedCard.cardId}
          toggleCardBox={toggleCardBox}
          dispatchCards={dispatchCards}
        />
      )}
      <div className='flex justify-between items-center py-2 px-1'>
        <div className='flex items-center text-2xl font-medium my-4 mx-3 '>
          <Link
            aria-label='Back to home'
            className='flex items-center  px-1 mr-1 text-blue-500 rounded-sm transition-colors duration-150'
            to={`/${user.username}/boards`}>
            <span className='material-icons-outlined mr-1.5 text-3xl'>
              view_week
            </span>
            <span>Boards</span>
          </Link>

          <div>
            <span> / {boardData.title}</span>
          </div>
        </div>
        <UserControl />
      </div>

      <div className='flex h-full overflow-x-auto'>
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

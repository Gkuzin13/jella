import { useMemo } from 'react';
import ObjectId from 'bson-objectid';
import { Droppable } from 'react-beautiful-dnd';
import cardApi from '../../api/cardApi';
import ACTIONS from '../../reducers/actions';
import { getAppendedItemPos } from '../../utils/itemPos';
import Card from './Card';
import CardForm from './CardForm';

const CardsContainer = ({ listData, cards, dispatchCards, toggleCardBox }) => {
  const sortedCards = useMemo(() => {
    return cards.sort((a, b) => a.position - b.position);
  }, [cards]);

  const handleNewCard = async (title) => {
    const newCard = {
      _id: ObjectId().toHexString(),
      cardTitle: title,
      position: getAppendedItemPos(cards),
      listId: listData._id,
      boardId: listData.boardId,
      createdAt: Date.now(),
    };

    dispatchCards({
      type: ACTIONS.CREATE_CARD,
      payload: newCard,
    });

    try {
      await cardApi.create(newCard);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <CardForm handleNewCard={handleNewCard} />
      <Droppable droppableId={listData._id} direction='vertical' type='CARD'>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`mx-2 px-1 mt-1 mb-2 pb-1.5 rounded-md transition-colors duration-750 ${
              snapshot.isDraggingOver && 'bg-green-100'
            }`}
          >
            {sortedCards.map((card, index) => {
              return (
                <Card
                  key={card._id}
                  index={index}
                  cardData={card}
                  toggleCardBox={toggleCardBox}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default CardsContainer;

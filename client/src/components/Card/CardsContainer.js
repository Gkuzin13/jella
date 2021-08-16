import { Droppable } from 'react-beautiful-dnd';
import { Types } from 'mongoose';
import { appendItem } from '../../utils/setNewPos';
import ACTIONS from '../../reducers/actions';
import Card from './Card';
import CardForm from './CardForm';
import cardApi from '../../api/cardApi';

const CardsContainer = ({ listData, cards, dispatchCards, toggleCardBox }) => {
  const handleNewCard = async (title) => {
    const newCard = {
      _id: Types.ObjectId().toHexString(),
      cardTitle: title,
      position: appendItem(cards),
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

      <Droppable droppableId={listData._id} type='CARD' direction='vertical'>
        {(provided, snapshot) => (
          <div
            className={`pt-1.5 pb-0.5 px-2.5 ${
              snapshot.isDraggingOver && 'bg-green-100'
            }`}
            {...provided.droppableProps}
            ref={provided.innerRef}>
            {cards.map((card, index) => {
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

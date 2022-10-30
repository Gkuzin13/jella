import ObjectId from "bson-objectid";
import { Droppable } from "react-beautiful-dnd";
import cardApi from "../../api/cardApi";
import ACTIONS from "../../reducers/actions";
import { appendItem } from "../../utils/setNewPos";
import Card from "./Card";
import CardForm from "./CardForm";

const CardsContainer = ({ listData, cards, dispatchCards, toggleCardBox }) => {
  const handleNewCard = async (title) => {
    const newCard = {
      _id: ObjectId().toHexString(),
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
      <Droppable droppableId={listData._id} direction='vertical' type='CARD'>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`mx-2 px-1 mt-1 pt-1 mb-1.5 pb-px rounded-sm transition-colors duration-750 ${
              snapshot.isDraggingOver && "bg-green-100"
            }`}
          >
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

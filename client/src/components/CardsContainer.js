import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';
import CardForm from './CardForm';

const CardsContainer = ({
  listId,
  subtasks,
  cards,
  dispatchCards,
  toggleCardBox,
}) => {
  return (
    <Droppable droppableId={listId} type='CARD'>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {cards.map((card, index) => {
            return (
              <Card
                key={card._id}
                index={index}
                cardData={card}
                subtasks={subtasks}
                toggleCardBox={toggleCardBox}
              />
            );
          })}
          {provided.placeholder}
          <CardForm
            listCards={cards}
            listId={listId}
            dispatchCards={dispatchCards}
          />
        </div>
      )}
    </Droppable>
  );
};

export default CardsContainer;

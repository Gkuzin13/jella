import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';

const CardsContainer = ({ listId, cards, toggleCardBox }) => {
  return (
    <Droppable droppableId={listId} type='CARD' direction='vertical'>
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
  );
};

export default CardsContainer;

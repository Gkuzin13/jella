import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';

const CardsContainer = ({ listId, cards, toggleCardBox }) => {
  return (
    <Droppable droppableId={listId} type='CARD' direction='vertical'>
      {(provided) => (
        <div
          className='mt-2'
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

import { setNewPos } from './setNewPos';

const cardReorderer = (cards, destination, source, draggableId) => {
  const sourceListId = source.droppableId;
  const targetListId = destination.droppableId;

  const targetCards = cards.filter((card) => card.listId === targetListId);
  const sourceCards = cards.filter((card) => card.listId === sourceListId);
  const restCards = cards.filter(
    (card) => card.listId !== targetListId && card.listId !== sourceListId
  );
  const draggedCard = cards.find((card) => card._id === draggableId);

  if (sourceListId === targetListId) {
    targetCards.splice(source.index, 1);
    targetCards.splice(destination.index, 0, draggedCard);

    const updatedCard = {
      ...draggedCard,
      position: setNewPos(targetCards, destination),
    };
    targetCards.splice(destination.index, 1, updatedCard);

    const newPos = updatedCard.position;

    if (!Number.isInteger(newPos) && newPos % 1 < 0.1) {
      let num = 16384;

      for (let card of targetCards) {
        card.position = num;
        num += 16384;
      }
    }

    return { allCards: [...restCards, ...targetCards], updatedCard };
  }

  sourceCards.splice(source.index, 1);
  targetCards.splice(destination.index, 0, draggedCard);

  const updatedCard = {
    ...draggedCard,
    position: setNewPos(targetCards, destination),
    listId: targetListId,
  };

  targetCards.splice(destination.index, 1, updatedCard);

  const newPos = updatedCard.position;

  if (!Number.isInteger(newPos) && newPos % 1 < 0.1) {
    let num = 16384;

    for (let card of targetCards) {
      card.position = num;
      num += 16384;
    }
  }

  return {
    allCards: [...restCards, ...sourceCards, ...targetCards],
    updatedCard,
  };
};

export default cardReorderer;

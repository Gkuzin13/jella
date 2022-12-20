import { getNewItemPos } from "./itemPos";
import { isTooClose, resetItemsOrder } from "./reorderer";

const cardReorderer = (cards, destination, source, draggableId) => {
  const targetListId = destination.droppableId;
  const sourceListId = source.droppableId;

  let targetCards = cards.filter((card) => card.listId === targetListId);
  let sourceCards = cards.filter((card) => card.listId === sourceListId);
  const restCards = cards.filter((card) => {
    return card.listId !== targetListId && card.listId !== sourceListId;
  });

  const draggedCard = cards.find((card) => card._id === draggableId);

  const isDraggingInSameList = targetListId === sourceListId;

  if (!isDraggingInSameList) {
    sourceCards.splice(source.index, 1);
  } else {
    targetCards.splice(source.index, 1);
  }

  targetCards.splice(destination.index, 0, draggedCard);

  const updatedCard = {
    ...draggedCard,
    position: getNewItemPos(targetCards, destination.index),
    listId: targetListId,
  };

  targetCards.splice(destination.index, 1, updatedCard);

  const processedCards = isTooClose(updatedCard.position)
    ? resetItemsOrder(targetCards)
    : targetCards;

  if (isDraggingInSameList) {
    return { allCards: [...restCards, ...processedCards], updatedCard };
  }

  return {
    allCards: [...restCards, ...sourceCards, ...processedCards],
    updatedCard,
  };
};

export default cardReorderer;

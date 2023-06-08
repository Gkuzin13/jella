import { FIRST_ITEM_POS, getNewItemPos } from './itemPos';

export const isTooClose = (number) => {
  return !Number.isInteger(number) && number % 1 < 0.1;
};

export const resetItemsOrder = (items) => {
  let sortedItems = items.sort((a, b) => a.position - b.position);
  let position = FIRST_ITEM_POS;

  for (const item of sortedItems) {
    item.position = position;
    position += FIRST_ITEM_POS;
  }

  return sortedItems;
};

export function reorderItemsBetweenLists(items, destination, source, itemId) {
  const targetListId = destination.droppableId;
  const sourceListId = source.droppableId;
  const isDraggingInSameList = targetListId === sourceListId;

  const draggedItem = items.find((item) => item._id === itemId);
  const destinationList = items
    .filter((item) => item.listId === targetListId)
    .sort((a, b) => a.position - b.position);
  const sourceList = items
    .filter((item) => item.listId === sourceListId)
    .sort((a, b) => a.position - b.position);
  const restitems = items.filter((item) => {
    return item.listId !== targetListId && item.listId !== sourceListId;
  });

  if (!isDraggingInSameList) {
    sourceList.splice(source.index, 1);
  } else {
    destinationList.splice(source.index, 1);
  }

  destinationList.splice(destination.index, 0, draggedItem);

  const updatedItem = {
    ...draggedItem,
    position: getNewItemPos(destinationList, destination.index),
    listId: targetListId,
  };

  destinationList[destination.index] = updatedItem;

  const reorderedList = isTooClose(updatedItem.position)
    ? resetItemsOrder(destinationList)
    : destinationList;

  if (isDraggingInSameList) {
    return [...restitems, ...reorderedList];
  }

  return [...restitems, ...sourceList, ...reorderedList];
}

export function reorderItems(items, destination, source, itemId) {
  const itemsCopy = [...items];
  const draggedItem = items.find((item) => item._id === itemId);

  itemsCopy.splice(source.index, 1);
  itemsCopy.splice(destination.index, 0, draggedItem);

  const updatedItem = {
    ...draggedItem,
    position: getNewItemPos(itemsCopy, destination.index),
  };

  itemsCopy[destination.index] = updatedItem;

  const updatedItems = isTooClose(updatedItem.position)
    ? resetItemsOrder(itemsCopy)
    : itemsCopy;

  return updatedItems;
}

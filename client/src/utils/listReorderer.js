import { getNewItemPos } from "./itemPos";
import { isTooClose, resetItemsOrder } from "./reorderer";

const listReorderer = (lists, destination, source) => {
  const listsCopy = [...lists];
  const draggedList = listsCopy[source.index];

  listsCopy.splice(source.index, 1);
  listsCopy.splice(destination.index, 0, draggedList);

  const updatedList = {
    ...draggedList,
    position: getNewItemPos(listsCopy, destination.index),
  };

  listsCopy.splice(destination.index, 1, updatedList);

  const updatedLists = isTooClose(updatedList.position)
    ? resetItemsOrder(listsCopy)
    : listsCopy;

  return { updatedLists, updatedList };
};

export default listReorderer;

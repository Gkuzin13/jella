import { setNewPos } from './setNewPos';

const listReorderer = (lists, destination, source) => {
  const listsCopy = [...lists];
  const draggedList = listsCopy[source.index];

  listsCopy.splice(source.index, 1);
  listsCopy.splice(destination.index, 0, draggedList);

  const updatedList = {
    ...draggedList,
    position: setNewPos(listsCopy, destination),
  };

  listsCopy.splice(destination.index, 1, updatedList);

  const newPos = updatedList.position;

  if (!Number.isInteger(newPos) && newPos % 1 < 0.1) {
    let num = 16384;

    for (let card of listsCopy) {
      card.position = num;
      num += 16384;
    }
  }

  return { updatedLists: listsCopy, updatedList };
};

export default listReorderer;

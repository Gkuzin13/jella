import { setNewPos } from '../../utils/reorderer';

export const ACTIONS = {
  SET_LISTS: 'set-lists',
  CREATE_LIST: 'create-list',
  EDIT_LIST: 'edit-list',
  DELETE_LIST: 'delete-list',
  REORDER_LIST: 'reorder-list',
  SET_CARDS: 'set-cards',
  CREATE_CARD: 'create-card',
  EDIT_CARD: 'edit-card',
  DELETE_CARD: 'delete-card',
  REORDER_CARD: 'reorder-card',
  SET_CHECKLIST: 'set-checklist',
  CREATE_SUBTASK: 'create-subtask',
  EDIT_SUBTASK: 'edit-subtask',
  DELETE_SUBTASK: 'delete-subtask',
  UPDATE_PRIORITY: 'update-priority',
  REORDER_SUBTASK: 'reorder-subtask',
};

export const listReducer = (lists, action) => {
  const { data } = action;

  switch (action.type) {
    case ACTIONS.SET_LISTS:
      return data.lists.sort((a, b) => a.position - b.position);
    case ACTIONS.CREATE_LIST:
      return lists.concat(data);

    case ACTIONS.EDIT_LIST:
      const updatedLists = lists.map((list) => {
        return list._id === data._id ? data : list;
      });

      return updatedLists;

    case ACTIONS.DELETE_LIST:
      const filteredLists = lists.filter((list) => {
        return list._id !== data ? list : null;
      });

      return filteredLists;

    case ACTIONS.REORDER_LIST:
      const listsCopy = [...lists];
      const draggedList = listsCopy[data.source.index];

      listsCopy.splice(data.source.index, 1);

      listsCopy.splice(data.destination.index, 0, draggedList);

      listsCopy.splice(data.destination.index, 1, {
        ...draggedList,
        position: setNewPos(listsCopy, data.destination),
      });

      return listsCopy;

    default:
      return lists;
  }
};

export const cardReducer = (cards, action) => {
  const { data } = action;

  switch (action.type) {
    case ACTIONS.SET_CARDS:
      return data.cards.sort((a, b) => a.position - b.position);

    case ACTIONS.CREATE_CARD:
      return cards.concat(data);

    case ACTIONS.EDIT_CARD:
      const updatedCards = cards.map((card) => {
        return card._id === data._id ? data : card;
      });

      return updatedCards;

    case ACTIONS.DELETE_CARD:
      const filteredCards = cards.filter((card) => {
        return card._id !== data.id ? card : null;
      });

      return filteredCards;

    case ACTIONS.UPDATE_PRIORITY:
      const newCardsPriority = cards.map((card) => {
        return card._id === data.cardId
          ? { ...card, priority: data.priority }
          : card;
      });
      return newCardsPriority;

    case ACTIONS.REORDER_CARD:
      const sourceList = data.source.droppableId;
      const targetList = data.destination.droppableId;

      if (sourceList === targetList) {
        const listCards = cards.filter((card) => card.listId === targetList);
        const sourceCards = cards.filter((card) => card.listId !== sourceList);
        const draggedCard = cards.find((card) => card._id === data.draggableId);

        listCards.splice(data.source.index, 1);
        listCards.splice(data.destination.index, 0, draggedCard);
        listCards.splice(data.destination.index, 1, {
          ...draggedCard,
          position: setNewPos(listCards, data.destination),
        });

        return [...sourceCards, ...listCards];
      } else {
        const listCards = cards.filter((card) => card.listId === targetList);
        const sourceCards = cards.filter((card) => card.listId === sourceList);
        const draggedCard = cards.find((card) => card._id === data.draggableId);

        sourceCards.splice(data.source.index, 1);

        listCards.splice(data.destination.index, 0, draggedCard);
        listCards.splice(data.destination.index, 1, {
          ...draggedCard,
          position: setNewPos(listCards, data.destination),
          listId: targetList,
        });

        return [...sourceCards, ...listCards];
      }

    default:
      return cards;
  }
};

export const checklistReducer = (subtasks, action) => {
  const { data } = action;

  switch (action.type) {
    case ACTIONS.SET_CHECKLIST:
      return data.subtasks.sort((a, b) => a.position - b.position);

    case ACTIONS.CREATE_SUBTASK:
      return subtasks.concat(data);

    case ACTIONS.EDIT_SUBTASK:
      const updatedChecklist = subtasks.map((task) => {
        return task._id !== data.taskId
          ? task
          : { ...task, isDone: data.isDone };
      });

      return updatedChecklist;

    case ACTIONS.DELETE_SUBTASK:
      const filteredChecklists = subtasks.filter((task) => {
        return task._id !== data.taskId ? task : null;
      });
      return filteredChecklists;

    case ACTIONS.REORDER_SUBTASK:
      const updatedSubtasksPos = subtasks
        .map((task) => {
          return task._id === data.draggableId
            ? { ...task, position: data.newPos }
            : task;
        })
        .sort((a, b) => {
          return a.position - b.position;
        });

      return updatedSubtasksPos;

    default:
      return subtasks;
  }
};

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
      return data.sort((a, b) => a.position - b.position);
    case ACTIONS.CREATE_LIST:
      const listsCopy = [...lists];
      return listsCopy.concat(data);

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
      return data;

    default:
      return lists;
  }
};

export const cardReducer = (cards, action) => {
  const { data } = action;

  switch (action.type) {
    case ACTIONS.SET_CARDS:
      return data.sort((a, b) => a.position - b.position);

    case ACTIONS.CREATE_CARD:
      const cardsCopy = [...cards];
      return cardsCopy.concat(data);

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
      return data;

    case ACTIONS.CREATE_SUBTASK:
      const updatedCard = [...cards].map((card) => {
        return card._id === data.id
          ? { ...card, subtasks: card.subtasks.concat(data.newSubtask) }
          : card;
      });

      return updatedCard;

    case ACTIONS.EDIT_SUBTASK:
      const { subtasks: tasksToEdit } = data.selectedCard;
      const updatedSubtask = tasksToEdit.map((t) => {
        return t._id === data.taskId ? { ...t, isDone: data.isDone } : t;
      });

      const editedCards = cards.map((card) => {
        return card._id === data.selectedCard._id
          ? { ...card, subtasks: updatedSubtask }
          : card;
      });

      return editedCards;

    case ACTIONS.DELETE_SUBTASK:
      const { subtasks: tasksToDel } = data.selectedCard;
      const filteredSubtasks = tasksToDel.filter((t) => t._id !== data.taskId);

      const cardSubtasks = cards.map((card) => {
        return card._id === data.selectedCard._id
          ? { ...card, subtasks: filteredSubtasks }
          : card;
      });

      return cardSubtasks;

    case ACTIONS.REORDER_SUBTASK:
      const updatedSubtasks = cards.map((card) => {
        return card._id === data.cardId
          ? { ...card, subtasks: data.subtasksCopy }
          : card;
      });

      return updatedSubtasks;

    default:
      return cards;
  }
};

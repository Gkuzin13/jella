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
      const { subtasks } = cards.find((card) => card._id === data.cardId);
      const updatedStatus = subtasks.map((s) => {
        return s._id === data.taskId ? { ...s, isDone: data.isDone } : s;
      });

      const updatedCardsStatus = cards.map((card) => {
        return card._id === data.cardId
          ? { ...card, subtasks: updatedStatus }
          : card;
      });

      return updatedCardsStatus;

    case ACTIONS.DELETE_SUBTASK:
      const filteredChecklists = cards.filter((task) => {
        return task._id !== data.taskId ? task : null;
      });
      return filteredChecklists;

    case ACTIONS.REORDER_SUBTASK:
      const updatedSubtasksPos = cards
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
      return cards;
  }
};

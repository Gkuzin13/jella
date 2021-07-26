export const ACTIONS = {
  SET_BOARD: 'set-board',
  CREATE_LIST: 'create-list',
  EDIT_LIST: 'edit-list',
  DELETE_LIST: 'delete-list',
  CREATE_CARD: 'create-card',
  EDIT_CARD: 'edit-card',
  DELETE_CARD: 'delete-card',
  CREATE_SUBTASK: 'create-subtask',
  EDIT_SUBTASK: 'edit-subtask',
  DELETE_SUBTASK: 'delete-subtask',
  UPDATE_PRIORITY: 'update-priority',
};

export const reducer = (boardData, action) => {
  switch (action.type) {
    case ACTIONS.SET_BOARD:
      return action.data;

    case ACTIONS.CREATE_LIST:
      return { ...boardData, lists: boardData.lists.concat(action.data) };

    case ACTIONS.EDIT_LIST:
      const updatedLists = boardData.lists.map((list) => {
        return list._id === action.data._id ? action.data : list;
      });

      return { ...boardData, lists: updatedLists };

    case ACTIONS.DELETE_LIST:
      return {
        ...boardData,
        lists: boardData.lists.filter((list) => {
          return list._id !== action.data ? list : null;
        }),
      };

    case ACTIONS.CREATE_CARD:
      return { ...boardData, cards: boardData.cards.concat(action.data) };

    case ACTIONS.EDIT_CARD:
      const updatedCards = boardData.cards.map((card) => {
        return card._id === action.data._id ? action.data : card;
      });

      return { ...boardData, cards: updatedCards };

    case ACTIONS.DELETE_CARD:
      const filteredCards = boardData.cards.filter((card) => {
        return card._id !== action.data._id ? card : null;
      });

      return { ...boardData, cards: filteredCards };

    case ACTIONS.CREATE_SUBTASK:
      return { ...boardData, subtasks: boardData.subtasks.concat(action.data) };

    case ACTIONS.EDIT_SUBTASK:
      const updatedChecklists = boardData.subtasks.map((task) => {
        return task._id !== action.data.taskId
          ? task
          : { ...task, isDone: action.data.isDone };
      });

      return { ...boardData, subtasks: updatedChecklists };

    case ACTIONS.DELETE_SUBTASK:
      const filteredChecklists = boardData.subtasks.filter((task) => {
        return task._id !== action.data.taskId ? task : null;
      });
      return { ...boardData, subtasks: filteredChecklists };

    case ACTIONS.UPDATE_PRIORITY:
      const newCardsPriority = boardData.cards.map((card) => {
        return card._id === action.data.cardId
          ? { ...card, priority: action.data.priority }
          : card;
      });

      return { ...boardData, cards: newCardsPriority };

    default:
      return boardData;
  }
};

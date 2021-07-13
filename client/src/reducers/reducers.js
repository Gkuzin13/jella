export const ACTIONS = {
  SET_BOARD: 'set-board',
  CREATE_LIST: 'create-list',
  EDIT_LIST: 'edit-list',
  DELETE_LIST: 'delete-list',
  CREATE_CARD: 'create-card',
  EDIT_CARD: 'edit-card',
  DELETE_CARD: 'delete-card',
};

export const reducer = (boardData, action) => {
  switch (action.type) {
    case ACTIONS.SET_BOARD:
      return action.data;

    case ACTIONS.CREATE_LIST:
      return { ...boardData, lists: boardData.lists.concat(action.data) };

    case ACTIONS.DELETE_LIST:
      return {
        ...boardData,
        lists: boardData.lists.filter((list) => {
          return list._id !== action.data ? list : null;
        }),
      };

    case ACTIONS.CREATE_CARD:
      const updatedLists = boardData.lists.map((list) => {
        if (list._id === action.data.listId) {
          const updatedList = {
            ...list,
            cards: list.cards.concat(action.data),
          };

          return updatedList;
        }

        return list;
      });

      return { board: boardData.board, lists: updatedLists };

    default:
      return boardData;
  }
};

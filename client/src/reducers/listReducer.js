import ACTIONS from "./actions";

const listReducer = (lists, action) => {
  const { payload: data } = action;

  switch (action.type) {
    case ACTIONS.SET_LISTS:
      return data.sort((a, b) => a.position - b.position);

    case ACTIONS.CREATE_LIST:
      return [...lists, data];

    case ACTIONS.EDIT_LIST: {
      const updatedLists = lists.map((list) => {
        return list._id === data._id ? data : list;
      });

      return updatedLists;
    }
    case ACTIONS.DELETE_LIST: {
      const filteredLists = lists.filter((list) => {
        return list._id !== data ? list : null;
      });

      return filteredLists;
    }
    case ACTIONS.REORDER_LIST:
      return data;

    default:
      return lists;
  }
};

export default listReducer;

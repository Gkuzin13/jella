import ACTIONS from './actions';

const cardReducer = (cards, action) => {
  const { payload: data } = action;

  switch (action.type) {
    case ACTIONS.SET_CARDS:
      return data.sort((a, b) => a.position - b.position);

    case ACTIONS.CREATE_CARD: {
      const cardsCopy = [...cards];
      return cardsCopy.concat(data);
    }
    case ACTIONS.EDIT_CARD: {
      const updatedCards = cards.map((card) => {
        return card._id === data._id ? data : card;
      });

      return updatedCards;
    }
    case ACTIONS.DELETE_CARD: {
      const filteredCards = cards.filter((card) => {
        return card._id !== data.id ? card : null;
      });

      return filteredCards;
    }
    case ACTIONS.UPDATE_PRIORITY: {
      const newCardsPriority = cards.map((card) => {
        return card._id === data.cardId
          ? { ...card, priority: data.priority }
          : card;
      });
      return newCardsPriority;
    }
    case ACTIONS.REORDER_CARD:
      return data;

    case ACTIONS.CREATE_SUBTASK: {
      const updatedCard = [...cards].map((card) => {
        return card._id === data.id
          ? { ...card, subtasks: [...(card.subtasks || []), data.newSubtask] }
          : card;
      });

      return updatedCard;
    }
    case ACTIONS.EDIT_SUBTASK: {
      const { subtasks } = data.selectedCard;
      const editedSubtasks = subtasks.map((subtask) => {
        return subtask._id === data.updatedSubtask._id
          ? data.updatedSubtask
          : subtask;
      });

      const editedCards = cards.map((card) => {
        return card._id === data.selectedCard._id
          ? { ...card, subtasks: editedSubtasks }
          : card;
      });

      return editedCards;
    }
    case ACTIONS.DELETE_SUBTASK: {
      const { subtasks: subtasksToDel } = data.selectedCard;
      const filteredSubtasks = subtasksToDel.filter(
        (t) => t._id !== data.subtaskId
      );

      const cardSubtasks = cards.map((card) => {
        return card._id === data.selectedCard._id
          ? { ...card, subtasks: filteredSubtasks }
          : card;
      });

      return cardSubtasks;
    }
    case ACTIONS.REORDER_SUBTASK: {
      const updatedSubtasks = cards.map((card) => {
        return card._id === data.cardId
          ? { ...card, subtasks: data.subtasks }
          : card;
      });

      return updatedSubtasks;
    }
    default:
      return cards;
  }
};

export default cardReducer;

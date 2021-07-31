import { useState } from 'react';
import { ACTIONS } from '../../hooks/reducers/reducers';
import EditableText from '../../hooks/EditableText';
import CheckList from '../CardDetailsBox/CheckList';
import CardPriority from '../CardDetailsBox/CardPriority';
import CardDescription from '../CardDetailsBox/CardDescription';
import CardDate from './CardDate';
import { deleteCard, updateCard } from '../../api/cardController';

const CardDetailsBox = ({
  toggleCardBox,
  selectedCard,
  subtasks,
  dispatch,
}) => {
  const [descForm, setDescForm] = useState(false);

  const cardSubTasks = subtasks.filter((task) => {
    return task.cardId === selectedCard._id;
  });
  const { cardTitle, description } = selectedCard;

  const handleCardUpdate = (card) => {
    dispatch({
      type: ACTIONS.EDIT_CARD,
      data: card,
    });
    updateCard(card);
  };

  const handleCardDelete = () => {
    dispatch({
      type: ACTIONS.DELETE_CARD,
      data: { id: selectedCard._id },
    });

    toggleCardBox({}, false);

    deleteCard(selectedCard._id);
  };

  const handleDescUpdate = (descValue) => {
    const updatedCard = { ...selectedCard, description: descValue };

    toggleCardBox(updatedCard, true);
    setDescForm(false);
    handleCardUpdate(updatedCard);
  };

  const handleTitleUpdate = (value) => {
    const updatedCard = { ...selectedCard, cardTitle: value };

    handleCardUpdate(updatedCard);
  };

  return (
    <div className='fixed top-0 right-0 left-0 bottom-0 overflow-auto bg-opacity-40 bg-black z-10'>
      <div className='grid place-items-center py-20'>
        <div className='flex flex-col p-6 pb-12 w-5/6 bg-white shadow-2xl'>
          <button
            className='flex items-center self-end hover:bg-gray-200 p-1'
            onClick={() => toggleCardBox()}>
            <span className='material-icons text-gray-500'>close</span>
          </button>
          <div className='flex justify-between items-center mb-5 text-gray-800'>
            <div className='text-xl flex items-center'>
              <span className='material-icons mr-2.5'>video_label</span>
              <EditableText
                value={cardTitle}
                handleTitleUpdate={handleTitleUpdate}
              />
            </div>
          </div>

          <CardDescription
            setDescForm={setDescForm}
            descForm={descForm}
            handleDescUpdate={handleDescUpdate}
            description={description}
          />
          <CheckList
            dispatch={dispatch}
            selectedCard={selectedCard}
            subtasks={cardSubTasks}
          />
          <CardPriority dispatch={dispatch} selectedCard={selectedCard} />
          <CardDate selectedCard={selectedCard} />

          <div className='self-end py-2'>
            <button
              onClick={() => handleCardDelete()}
              className='bg-red-300 hover:bg-red-500 px-3 py-1 rounded-sm shadow-md text-white transition-colors duration-75'>
              Delete Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetailsBox;

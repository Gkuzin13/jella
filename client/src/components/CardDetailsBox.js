import { useState } from 'react';
import api from '../config/axiosConfig';
import { ACTIONS } from '../reducers/reducers';
import DescriptionForm from './DescriptionForm';
import EditableText from '../hooks/EditableText';
import CheckList from './CheckList';

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

  const updateCard = async (card) => {
    try {
      dispatch({
        type: ACTIONS.EDIT_CARD,
        data: card,
      });

      await api.put(`/1/cards/${selectedCard._id}/`, card);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCardDelete = async () => {
    try {
      await api.delete(`/1/cards/${selectedCard._id}`);

      dispatch({
        type: ACTIONS.DELETE_CARD,
        data: selectedCard,
      });

      toggleCardBox({}, false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDescUpdate = (e) => {
    e.preventDefault();

    const { description } = e.target;
    const updatedCard = { ...selectedCard, description: description.value };

    toggleCardBox(updatedCard, true);
    setDescForm(false);
    updateCard(updatedCard);
  };

  const handleTitleUpdate = (value) => {
    const updatedCard = { ...selectedCard, cardTitle: value };

    updateCard(updatedCard);
  };

  return (
    <div className='flex items-center justify-center w-full absolute h-full top-0 bg-opacity-40 bg-black z-10'>
      <div className='sticky flex flex-col px-8 py-6 w-3/4 bg-white shadow-xl'>
        <button
          className='flex items-center self-end hover:bg-gray-200 p-1'
          onClick={() => toggleCardBox()}>
          <span className='material-icons'>close</span>
        </button>
        <div className='flex justify-between items-center mb-5 text-gray-800'>
          <div className='text-xl flex items-center'>
            <span className='material-icons mr-3'>video_label</span>
            <EditableText
              value={cardTitle}
              handleTitleUpdate={handleTitleUpdate}
            />
          </div>
        </div>
        <div className='my-3'>
          <div className='flex items-center text-gray-800'>
            <span className='material-icons mr-3'>description</span>
            <span className='font-semibold text-xl'>Description</span>
          </div>
          <DescriptionForm
            setDescForm={setDescForm}
            descForm={descForm}
            handleDescUpdate={handleDescUpdate}
            description={description}
          />
        </div>

        <CheckList
          dispatch={dispatch}
          selectedCard={selectedCard}
          subtasks={cardSubTasks}
        />

        <div>
          <div className='flex items-center font-semibold text-xl text-gray-800'>
            <span className='material-icons mr-3'>event</span>
            <h2>Date Added</h2>
          </div>

          <span>{selectedCard.createdAt}</span>
        </div>

        <div className='self-end py-2'>
          <button
            onClick={() => handleCardDelete()}
            className='bg-red-300 hover:bg-red-500 px-3 py-1 rounded-sm shadow-md text-white transition-colors duration-75'>
            Delete Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardDetailsBox;

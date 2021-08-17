import { useRef } from 'react';
import { motion } from 'framer-motion';
import useClickOutside from '../../hooks/useClickOutside';
import ACTIONS from '../../reducers/actions';
import Checklist from '../CardDetailsBox/Checklist';
import CardPriority from '../CardDetailsBox/CardPriority';
import CardDescription from '../CardDetailsBox/CardDescription';
import CardDate from './CardDate';
import cardApi from '../../api/cardApi';
import EditableText from '../EditableText';

const CardDetailsBox = ({
  cards,
  lists,
  dispatchCards,
  toggleCardBox,
  cardBox,
}) => {
  const selectedCard = cards.find((card) => card._id === cardBox.cardId);
  const { listTitle } = lists.find((list) => list._id === selectedCard.listId);

  const boxRef = useRef();

  useClickOutside(boxRef, cardBox, () => {
    toggleCardBox('', false);
  });

  const handleCardUpdate = async (updatedCard) => {
    dispatchCards({
      type: ACTIONS.EDIT_CARD,
      payload: updatedCard,
    });

    try {
      await cardApi.update(updatedCard);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCardDelete = async () => {
    dispatchCards({
      type: ACTIONS.DELETE_CARD,
      payload: { id: selectedCard._id },
    });

    toggleCardBox('', false);
    cardApi.delete(selectedCard._id);
  };

  const handleTitleUpdate = (updatedTitle) => {
    handleCardUpdate({ ...selectedCard, cardTitle: updatedTitle });
  };

  const titleStyle = {
    style:
      'font-medium bg-transparent w-full px-2 resize-none focus:outline-blue text-xl cursor-text',
  };

  return (
    <motion.div
      transition={{ duration: 0.075 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='fixed top-0 right-0 left-0 bottom-0 overflow-auto bg-opacity-30 
    bg-black z-20'>
      <motion.div
        transition={{ duration: 0.075 }}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className='grid place-items-center py-20'>
        <div
          className='flex flex-col justify-between relative p-6 w-11/12 lg:w-2/4 lg:px-10 
        bg-white shadow-2xl'>
          <button
            className='flex items-center absolute right-0 top-0 m-4 hover:bg-gray-100 group 
            transition-colors duration-150 p-1.5 mb-2'
            onClick={() => toggleCardBox()}>
            <span className='material-icons text-gray-500 group-hover:text-gray-600'>
              close
            </span>
          </button>

          <div className='flex items-start w-full mb-6 mt-8'>
            <span className='material-icons-outlined mr-1'>video_label</span>
            <div className='w-full'>
              <EditableText
                style={titleStyle.style}
                dataText={selectedCard.cardTitle}
                dataUpdateFunc={handleTitleUpdate}
              />
              <p className='text-gray-600 pl-2 leading-loose'>
                <strong>{listTitle}</strong> list
              </p>
            </div>
          </div>

          <CardDescription
            handleCardUpdate={handleCardUpdate}
            selectedCard={selectedCard}
          />
          <Checklist
            dispatchCards={dispatchCards}
            selectedCard={selectedCard}
          />
          <CardPriority
            handleCardUpdate={handleCardUpdate}
            selectedCard={selectedCard}
          />
          <CardDate selectedCard={selectedCard} />

          <div className='self-end py-2 mt-6'>
            <button
              onClick={() => handleCardDelete()}
              className='bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 
              font-medium px-3 py-1 rounded-sm transition-colors duration-75'>
              Delete Card
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CardDetailsBox;

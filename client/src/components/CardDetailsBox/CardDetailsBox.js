import { motion } from 'framer-motion';
import { useEffect, useRef } from "react";
import cardApi from "../../api/cardApi";
import ACTIONS from "../../reducers/actions";
import CardDescription from '../CardDetailsBox/CardDescription';
import CardPriority from "../CardDetailsBox/CardPriority";
import Checklist from "../CardDetailsBox/Checklist";
import EditableText from '../EditableText';
import CardDate from "./CardDate";

const CardDetailsBox = ({
  cards,
  lists,
  dispatchCards,
  toggleCardBox,
  cardBox,
}) => {
  const selectedCard = cards.find((card) => card._id === cardBox.cardId);
  const { listTitle } = lists.find((list) => list._id === selectedCard.listId);

  const wrapperRef = useRef();

  useEffect(() => {
    const closeBox = (e) => {
      if (e.target.parentNode === wrapperRef.current) {
        toggleCardBox('', false);
      }
    };
    document.addEventListener('click', closeBox);

    return () => document.removeEventListener('click', closeBox);
  }, [toggleCardBox]);

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
    style: 'font-medium px-2 focus:outline-blue text-xl',
  };

  return (
    <motion.div
      transition={{ duration: 0.15 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={wrapperRef}
      className="fixed top-0 right-0 left-0 bottom-0 overflow-auto bg-opacity-30
    bg-black z-20"
    >
      <motion.div
        transition={{ duration: 0.1 }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="grid place-items-center py-20"
      >
        <div
          className="flex flex-col justify-between relative p-6 w-11/12 lg:w-2/4 lg:px-10
        bg-white shadow-2xl"
        >
          <span
            role="button"
            onClick={() => toggleCardBox()}
            className="material-icons text-gray-500 absolute right-0 top-0 m-4 hover:bg-gray-100
            transition-colors duration-150 p-1.5 mb-2"
          >
            close
          </span>
          <div className="flex items-start w-full mb-6 mt-8">
            <span className="material-icons-outlined mr-1">video_label</span>
            <div className="w-full">
              <EditableText
                style={titleStyle.style}
                dataText={selectedCard.cardTitle}
                dataUpdateFunc={handleTitleUpdate}
              />
              <p className="text-gray-600 pl-2 leading-loose">
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
          <div className="self-end py-3 mt-6">
            <button
              onClick={() => handleCardDelete()}
              className="bg-gray-100 text-gray-500 hover:text-red-600
              font-medium px-3 py-1 shadow-sm rounded-sm transition-colors duration-150"
            >
              Delete Card
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CardDetailsBox;

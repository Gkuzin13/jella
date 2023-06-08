import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import CardsContainer from '../Card/CardsContainer';
import EditableText from '../EditableText';
import ListOptionsBox from './ListOptionsBox';

const List = ({
  listData,
  cards,
  handleListUpdate,
  handleListDelete,
  dispatchCards,
  toggleCardBox,
  index,
}) => {
  const [listOptionsBox, setlistOptionsBox] = useState(false);

  const handleListOptionsClick = (e) => {
    e.stopPropagation();
    toggleOptionsBox();
  };

  const toggleOptionsBox = () => {
    setlistOptionsBox(() => !listOptionsBox);
  };

  const handleTitleUpdate = (updatedTitle) => {
    handleListUpdate({ ...listData, listTitle: updatedTitle });
  };

  const titleStyle =
    'font-medium focus:bg-white focus:text-black text-white p-0.5 mx-0.5 focus:outline-none';

  const coverColor = `bg-${listData.coverColor}-600`;

  return (
    <Draggable key={listData._id} draggableId={listData._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='flex flex-col flex-shrink-0 bg-gray-100 bg-opacity-90 shadow-lg w-76 mr-4 rounded-md'
        >
          <div
            className={`flex justify-between items-center py-1.5 px-2 rounded-t-md rounded-b-none ${coverColor}`}
          >
            <EditableText
              style={titleStyle}
              dataText={listData.listTitle}
              dataUpdateFunc={handleTitleUpdate}
            />
            <div className='relative self-start'>
              <button
                aria-label='Open list options'
                onClick={(e) => handleListOptionsClick(e)}
                className='flex justify-center p-1 hover:bg-gray-50 hover:bg-opacity-20'
              >
                <span className='material-icons text-white'>more_horiz</span>
              </button>

              {listOptionsBox && (
                <AnimatePresence>
                  <ListOptionsBox
                    toggleOptionsBox={toggleOptionsBox}
                    handleListDelete={handleListDelete}
                    handleListUpdate={handleListUpdate}
                    listData={listData}
                  />
                </AnimatePresence>
              )}
            </div>
          </div>

          <CardsContainer
            cards={cards}
            listData={listData}
            toggleCardBox={toggleCardBox}
            dispatchCards={dispatchCards}
          />
        </div>
      )}
    </Draggable>
  );
};

export default List;

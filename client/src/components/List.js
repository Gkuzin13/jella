import { useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { deleteList, updateList } from '../api/listController';
import ClickOutside from '../hooks/ClickOutside';
import EditableText from '../hooks/EditableText';
import { ACTIONS } from '../hooks/reducers/reducers';
import CardsContainer from './CardsContainer';
import ListActionsBox from './ListActionsBox';

const List = ({
  listData,
  cards,
  subtasks,
  dispatchLists,
  dispatchCards,
  toggleCardBox,
  index,
}) => {
  const [listActionsBox, setListActionsBox] = useState(false);

  const listCards = cards.filter((card) => card.listId === listData._id);

  const boxRef = useRef();

  ClickOutside(boxRef, listActionsBox, () => {
    toggleActionsBox(!listActionsBox);
  });

  const toggleActionsBox = () => {
    setListActionsBox(!listActionsBox);
  };

  const handleTitleUpdate = (value) => {
    const updatedList = { ...listData, listTitle: value };

    dispatchLists({
      type: ACTIONS.EDIT_LIST,
      data: updatedList,
    });

    updateList(updatedList);
  };

  const handleListDelete = (id) => {
    dispatchLists({
      type: ACTIONS.DELETE_LIST,
      data: id,
    });
    setListActionsBox(false);

    deleteList(id);
  };

  return (
    <Draggable draggableId={listData._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='cursor-pointer flex flex-col flex-shrink-0 bg-gray-50 shadow-md w-64 mx-1.5 rounded-sm'>
          <div className=' flex justify-between items-center py-2 px-2'>
            <EditableText
              value={listData.listTitle}
              handleTitleUpdate={handleTitleUpdate}
            />
            <div>
              <button
                onClick={() => setListActionsBox(!listActionsBox)}
                className='relative flex justify-center p-1 opacity-50 hover:bg-gray-300'>
                <span className='material-icons'>more_horiz</span>
              </button>

              {!listActionsBox ? null : (
                <ListActionsBox
                  toggleActionsBox={toggleActionsBox}
                  boxRef={boxRef}
                  handleListDelete={handleListDelete}
                  listId={listData._id}
                />
              )}
            </div>
          </div>

          <CardsContainer
            cards={listCards}
            subtasks={subtasks}
            listId={listData._id}
            dispatchCards={dispatchCards}
            toggleCardBox={toggleCardBox}
          />
        </div>
      )}
    </Draggable>
  );
};

export default List;

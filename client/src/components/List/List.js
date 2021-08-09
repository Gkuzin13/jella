import { useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import listApi from '../../api/listApi';
import ClickOutside from '../../hooks/ClickOutside';
import EditableText from '../../hooks/EditableText';
import { ACTIONS } from '../../hooks/reducers/reducers';
import CardsContainer from '../Card/CardsContainer';
import ListActionsBox from '../List/ListActionsBox';

const List = ({
  listData,
  cards,
  dispatchLists,
  dispatchCards,
  toggleCardBox,
  index,
}) => {
  const [listActionsBox, setListActionsBox] = useState(false);

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
      payload: updatedList,
    });

    listApi.updateList(updatedList);
  };

  const handleListDelete = (id) => {
    dispatchLists({
      type: ACTIONS.DELETE_LIST,
      payload: id,
    });

    setListActionsBox(false);
    listApi.deleteList(id);
  };

  return (
    <Draggable draggableId={listData._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='flex flex-col flex-shrink-0 max-h-full bg-gray-100 
          shadow w-72 mx-2 p-1 rounded-sm '>
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
            cards={cards}
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

import List from '../List/List';
import ListForm from '../List/ListForm';
import { Types } from 'mongoose';
import { Droppable } from 'react-beautiful-dnd';
import { appendItem } from '../../utils/setNewPos';
import listApi from '../../api/listApi';
import ACTIONS from '../../reducers/actions';

const BoardCanvas = ({
  boardId,
  lists,
  cards,
  dispatchLists,
  dispatchCards,
  toggleCardBox,
}) => {
  const handleNewList = async (title) => {
    const newList = {
      _id: Types.ObjectId().toHexString(),
      listTitle: title,
      position: appendItem(lists),
      coverColor: 'gray',
      boardId,
    };

    dispatchLists({
      type: ACTIONS.CREATE_LIST,
      payload: newList,
    });

    try {
      await listApi.create(newList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleListUpdate = async (updatedList) => {
    dispatchLists({
      type: ACTIONS.EDIT_LIST,
      payload: updatedList,
    });

    try {
      await listApi.update(updatedList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleListDelete = async (id) => {
    dispatchLists({
      type: ACTIONS.DELETE_LIST,
      payload: id,
    });

    try {
      await listApi.delete(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Droppable droppableId={boardId} direction='horizontal' type='LIST'>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className='flex flex-nowrap items-start px-3'>
          {lists.map((list, index) => {
            const listCards = cards.filter((card) => card.listId === list._id);
            return (
              <List
                key={list._id}
                index={index}
                listData={list}
                cards={listCards}
                handleListUpdate={handleListUpdate}
                handleListDelete={handleListDelete}
                dispatchCards={dispatchCards}
                toggleCardBox={toggleCardBox}
              />
            );
          })}
          {provided.placeholder}

          <ListForm handleNewList={handleNewList} lists={lists.length} />
        </div>
      )}
    </Droppable>
  );
};

export default BoardCanvas;

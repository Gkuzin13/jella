import { useMemo } from 'react';
import ObjectId from 'bson-objectid';
import { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import listApi from '../../api/listApi';
import ACTIONS from '../../reducers/actions';
import { getAppendedItemPos } from '../../utils/itemPos';
import List from '../List/List';
import ListForm from '../List/ListForm';

const BoardCanvas = ({
  boardId,
  lists,
  cards,
  dispatchLists,
  dispatchCards,
  toggleCardBox,
}) => {
  const [enabled, setEnabled] = useState(false);

  const sortedLists = useMemo(() => {
    return lists.sort((a, b) => a.position - b.position);
  }, [lists]);

  const listCardsMap = useMemo(() => {
    return cards.reduce((acc, card) => {
      if (card.listId in acc && Array.isArray(acc[card.listId])) {
        acc[card.listId].push(card);
      } else {
        acc[card.listId] = [card];
      }
      return acc;
    }, {});
  }, [cards]);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  const handleNewList = async (title) => {
    const newList = {
      _id: ObjectId().toHexString(),
      listTitle: title,
      position: getAppendedItemPos(lists),
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

  if (!enabled) {
    return null;
  }

  return (
    <Droppable droppableId={boardId} direction='horizontal' type='LIST'>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className='flex flex-nowrap items-start px-3'
        >
          {sortedLists.map((list, index) => {
            return (
              <List
                key={list._id}
                index={index}
                listData={list}
                cards={listCardsMap[list._id] ?? []}
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
